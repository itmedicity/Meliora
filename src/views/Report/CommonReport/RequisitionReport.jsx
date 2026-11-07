import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import { axiosellider } from 'src/views/Axios/Axios'
import { infoNotify } from 'src/views/Common/CommonCode'
import { columns, formatCellValue } from './CommonReportColumns'
import CommonReportToolbar from './CommonReportToolbar'
import CommonReportTable from './CommonReportTable'

// Helper to calculate turnaround time (TAT) string in HH:mm:ss format (or -HH:mm:ss if negative)
const computeTatString = (startDateStr, endDateStr) => {
    if (!startDateStr || !endDateStr) return null
    const start = moment(startDateStr, 'DD/MM/YYYY HH:mm:ss')
    const end = moment(endDateStr, 'DD/MM/YYYY HH:mm:ss')
    if (!start.isValid() || !end.isValid()) return null

    const diffSeconds = end.diff(start, 'seconds')
    const isNegative = diffSeconds < 0
    const absDiff = Math.abs(diffSeconds)
    const hours = Math.floor(absDiff / 3600)
    const minutes = Math.floor((absDiff % 3600) / 60)
    const seconds = absDiff % 60
    return `${isNegative ? '-' : ''}${hours < 10 ? '0' : ''}${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

// Helper to format receipt date string to DD/MM/YYYY HH:mm:ss
const formatReceiptDate = (rawDate) => {
    if (!rawDate) return null
    const str = String(rawDate).trim()
    if (/^\d{2}\/\d{2}\/\d{4}/.test(str)) {
        return str
    }
    const m = moment(rawDate)
    if (m.isValid()) {
        return m.format('DD/MM/YYYY HH:mm:ss')
    }
    return str
}

// Helper to ensure date string is formatted in 24-hour time: DD/MM/YYYY HH:mm:ss
const format24HourDate = (rawDate) => {
    if (!rawDate) return null
    const str = String(rawDate).trim()
    if (/[ap]m$/i.test(str)) {
        const m = moment(str, 'DD/MM/YYYY hh:mm:ss A')
        if (m.isValid()) return m.format('DD/MM/YYYY HH:mm:ss')
    }
    if (/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/.test(str)) {
        return str
    }
    const m = moment(rawDate)
    if (m.isValid()) {
        return m.format('DD/MM/YYYY HH:mm:ss')
    }
    return str
}

const RequisitionReport = () => {
    const history = useNavigate()
    const [tableData, setTableData] = useState([])
    const [dailyDateFrom, setDailyDateFrom] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [dailyDateTo, setDailyDateTo] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [selectedDepartment, setSelectedDepartment] = useState('ALL')
    const [selectedBillType, setSelectedBillType] = useState('ALL')
    const [excludeOncology, setExcludeOncology] = useState(false)
    const [excludeObservation, setExcludeObservation] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)

    const backToSetting = useCallback(() => {
        history(`/Home/Reports`)
    }, [history])

    const searchdata = useMemo(() => {
        return {
            census_datefrom: moment(new Date(dailyDateFrom)).format('YYYY-MM-DD'),
            census_dateto: moment(new Date(dailyDateTo)).format('YYYY-MM-DD')
        }
    }, [dailyDateFrom, dailyDateTo])

    const cleaningSearchData = useMemo(() => {
        return {
            census_datefrom: moment(new Date(dailyDateFrom)).format('YYYY-MM-DD'),
            census_dateto: moment(new Date(dailyDateTo)).add(1, 'days').format('YYYY-MM-DD')
        }
    }, [dailyDateFrom, dailyDateTo])

    const SearchDetails = useCallback(() => {
        setLoading(true)

        const GetRequisitionDetails = async param => {
            const result = await axiosellider.post('/supplierList/requisitionReport', param)
            return result.data
        }

        const GetCreditReceiptDetails = async param => {
            const result = await axiosellider.post('/supplierList/CreditReceipt', param)
            return result.data
        }

        const GetBedCleaningDetails = async param => {
            const result = await axiosellider.post('/supplierList/BedCleaning', param)
            return result.data
        }

        Promise.all([
            GetRequisitionDetails(searchdata),
            GetCreditReceiptDetails(searchdata).catch(err => {
                console.error("Credit receipt fetch failed:", err)
                return { success: 1, data: [] }
            }),
            GetBedCleaningDetails(cleaningSearchData).catch(err => {
                console.error("Bed cleaning fetch failed:", err)
                return { success: 1, data: [] }
            })
        ])
            .then(([reqVal, creditVal, cleaningVal]) => {
                const { data: reqData, success: reqSuccess, message: reqMessage } = reqVal || {}
                const { data: creditData, success: creditSuccess } = creditVal || {}
                const { data: cleaningData, success: cleaningSuccess } = cleaningVal || {}

                if (reqSuccess === 2 && Array.isArray(reqData)) {
                    // Build map of credit receipts by IP number
                    const creditReceiptMap = new Map()
                    if (creditSuccess === 2 && Array.isArray(creditData)) {
                        creditData.forEach(cr => {
                            const rawIp = cr.IPNO ?? cr.IP_NO
                            const receiptDate = formatReceiptDate(cr.RECEIPT_DATE)
                            if (rawIp !== undefined && rawIp !== null && receiptDate) {
                                const ipStr = String(rawIp).trim()
                                if (!creditReceiptMap.has(ipStr)) {
                                    creditReceiptMap.set(ipStr, receiptDate)
                                }
                                const num = parseInt(ipStr, 10)
                                if (!isNaN(num) && !creditReceiptMap.has(String(num))) {
                                    creditReceiptMap.set(String(num), receiptDate)
                                }
                            }
                        })
                    }

                    // Build map of bed cleaning details by BED_NO
                    const bedCleaningMap = new Map()
                    if (cleaningSuccess === 2 && Array.isArray(cleaningData)) {
                        cleaningData.forEach(cl => {
                            if (cl.BED_NO) {
                                const bedKey = String(cl.BED_NO).trim().toUpperCase()
                                if (!bedCleaningMap.has(bedKey)) {
                                    bedCleaningMap.set(bedKey, {
                                        CLN_REQ: format24HourDate(cl.CLN_REQ),
                                        CLN_COMPLETED: format24HourDate(cl.CLN_COMPLETED),
                                        TAT_CL_REW_CL_COMP: cl.TAT_CL_REW_CL_COMP || null
                                    })
                                }
                            }
                        })
                    }

                    // Deduplicate and merge credit receipt date and bed cleaning details
                    const seen = new Set()
                    const unique = []
                    reqData.forEach(item => {
                        const key = item.ADMISS_NO || item.IP_NO || (item.PATIENT_NO ? `${item.PATIENT_NO}_${item.ADMIS_DATE_TIME}` : null)
                        if (!key || !seen.has(key)) {
                            if (key) seen.add(key)

                            // Check if bill type is CREDIT
                            const billType = String(item.BILL_TYPES || '').trim().toUpperCase()
                            if (billType === 'CREDIT') {
                                const itemIp = item.ADMISS_NO || item.IP_NO
                                if (itemIp !== undefined && itemIp !== null) {
                                    const ipStr = String(itemIp).trim()
                                    const numStr = String(parseInt(ipStr, 10))
                                    const matchedReceipt = creditReceiptMap.get(ipStr) || creditReceiptMap.get(numStr)

                                    if (matchedReceipt) {
                                        item.RECEIPT_DATE = matchedReceipt

                                        // Recalculate TAT: Disch Bill -> Receipt if BILL_DATE is present
                                        if (item.BILL_DATE && (!item.TAT_DISBILL_RECEIPT || item.TAT_DISBILL_RECEIPT === '::' || item.TAT_DISBILL_RECEIPT === '-')) {
                                            const tat = computeTatString(item.BILL_DATE, matchedReceipt)
                                            if (tat) item.TAT_DISBILL_RECEIPT = tat
                                        }

                                        // Recalculate TAT: Receipt -> Patient Out if PATIENT_OUT is present
                                        if (item.PATIENT_OUT && (!item.TAT_RECEIPT_PTOUT || item.TAT_RECEIPT_PTOUT === '::' || item.TAT_RECEIPT_PTOUT === '-')) {
                                            const tat = computeTatString(matchedReceipt, item.PATIENT_OUT)
                                            if (tat) item.TAT_RECEIPT_PTOUT = tat
                                        }
                                    }
                                }
                            }

                            // Merge bed cleaning details by BED_NO
                            const bedKey = item.BED_NO ? String(item.BED_NO).trim().toUpperCase() : null
                            if (bedKey && bedCleaningMap.has(bedKey)) {
                                const cleaning = bedCleaningMap.get(bedKey)
                                item.CLN_REQ = cleaning.CLN_REQ
                                item.CLN_COMPLETED = cleaning.CLN_COMPLETED
                                item.TAT_CL_REW_CL_COMP = cleaning.TAT_CL_REW_CL_COMP
                            } else {
                                item.CLN_REQ = null
                                item.CLN_COMPLETED = null
                                item.TAT_CL_REW_CL_COMP = null
                            }

                            unique.push(item)
                        }
                    })

                    setTableData(unique)
                } else {
                    infoNotify(reqMessage || "No Data Found")
                    setTableData([])
                }
            })
            .catch(err => {
                console.error(err)
                infoNotify("Failed to fetch report data")
                setTableData([])
            })
            .finally(() => {
                setLoading(false)
            })
    }, [searchdata, cleaningSearchData])

    // Distinct departments from fetched data
    const departmentList = useMemo(() => {
        const depts = new Set()
        tableData.forEach(row => {
            if (row.DEPARTMENT_NAME && String(row.DEPARTMENT_NAME).trim()) {
                depts.add(String(row.DEPARTMENT_NAME).trim())
            }
        })
        return Array.from(depts).sort()
    }, [tableData])

    // Distinct bill types from fetched data
    const billTypeList = useMemo(() => {
        const types = new Set()
        tableData.forEach(row => {
            if (row.BILL_TYPES && String(row.BILL_TYPES).trim()) {
                types.add(String(row.BILL_TYPES).trim().toUpperCase())
            }
        })
        if (tableData.length > 0) {
            types.add('CASH')
            types.add('CREDIT')
        }
        return Array.from(types).sort()
    }, [tableData])

    // Filtered data based on:
    // 1) Department selection
    // 2) Bill Type selection
    // 3) Exclude ONCOLOGY DAY CARE
    // 4) Exclude OBSERVATION (Admission Reason)
    // 5) Deduplication by Admission Number
    // 6) Search keyword
    const filteredData = useMemo(() => {
        let result = tableData

        // 1) Department wise filter
        if (selectedDepartment && selectedDepartment !== 'ALL') {
            result = result.filter(row => row.DEPARTMENT_NAME === selectedDepartment)
        }

        // 2) Bill Type filter
        if (selectedBillType && selectedBillType !== 'ALL') {
            result = result.filter(row => {
                const bType = (row.BILL_TYPES || '').trim().toUpperCase()
                return bType === selectedBillType.toUpperCase()
            })
        }

        // 3) Without ONCOLOGY DAY CARE filter
        if (excludeOncology) {
            result = result.filter(row => {
                const dept = (row.DEPARTMENT_NAME || '').toUpperCase().trim()
                const nurseStation = (row.NURSTATION_NAME || '').toUpperCase().trim()
                const isOncologyDept = dept.includes('ONCOLOGY DAY CARE') || dept.includes('ONCOLOGY DAYCARE')
                const isOncologyStation = nurseStation.includes('ONCOLOGY DAY CARE') || nurseStation.includes('ONCOLOGY DAYCARE')
                return !isOncologyDept && !isOncologyStation
            })
        }

        // 4) Without OBSERVATION filter (Admission Reason)
        if (excludeObservation) {
            result = result.filter(row => {
                const reason = (row.ADMISS_REASON || '').toUpperCase().trim()
                const isObservation = reason.includes('OBSERVATION') || reason === 'OBS'
                return !isObservation
            })
        }

        // 5) Ensure unique rows by ADMISS_NO / IP_NO
        const seen = new Set()
        result = result.filter(row => {
            const key = row.ADMISS_NO || row.IP_NO || (row.PATIENT_NO ? `${row.PATIENT_NO}_${row.ADMIS_DATE_TIME}` : null)
            if (!key) return true
            if (seen.has(key)) return false
            seen.add(key)
            return true
        })

        // 6) Real-time text search filter across common patient fields
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim()
            result = result.filter(row => {
                return (
                    (row.PATIENT_NAME && String(row.PATIENT_NAME).toLowerCase().includes(term)) ||
                    (row.PATIENT_NO && String(row.PATIENT_NO).toLowerCase().includes(term)) ||
                    (row.ADMISS_NO && String(row.ADMISS_NO).toLowerCase().includes(term)) ||
                    (row.DOCTOR_NAME && String(row.DOCTOR_NAME).toLowerCase().includes(term)) ||
                    (row.DEPARTMENT_NAME && String(row.DEPARTMENT_NAME).toLowerCase().includes(term)) ||
                    (row.NURSTATION_NAME && String(row.NURSTATION_NAME).toLowerCase().includes(term)) ||
                    (row.BED_NO && String(row.BED_NO).toLowerCase().includes(term)) ||
                    (row.BILL_TYPES && String(row.BILL_TYPES).toLowerCase().includes(term)) ||
                    (row.ADMISS_REASON && String(row.ADMISS_REASON).toLowerCase().includes(term)) ||
                    (row.DISCHARGE_STATUS && String(row.DISCHARGE_STATUS).toLowerCase().includes(term)) ||
                    (row.CLN_REQ && String(row.CLN_REQ).toLowerCase().includes(term)) ||
                    (row.CLN_COMPLETED && String(row.CLN_COMPLETED).toLowerCase().includes(term)) ||
                    (row.TAT_CL_REW_CL_COMP && String(row.TAT_CL_REW_CL_COMP).toLowerCase().includes(term))
                )
            })
        }

        return result
    }, [tableData, selectedDepartment, selectedBillType, excludeOncology, excludeObservation, searchTerm])

    return (
        <CardMasterClose title=" DISCHARGE REQUISITION REPORT" close={backToSetting}>
            <CommonReportToolbar
                dailyDateFrom={dailyDateFrom}
                setDailyDateFrom={setDailyDateFrom}
                dailyDateTo={dailyDateTo}
                setDailyDateTo={setDailyDateTo}
                SearchDetails={SearchDetails}
                loading={loading}
                tableDataLength={tableData.length}
                filteredDataLength={filteredData.length}
                showExport={false}
                selectedDepartment={selectedDepartment}
                setSelectedDepartment={setSelectedDepartment}
                departmentList={departmentList}
                selectedBillType={selectedBillType}
                setSelectedBillType={setSelectedBillType}
                billTypeList={billTypeList}
                excludeOncology={excludeOncology}
                setExcludeOncology={setExcludeOncology}
                excludeObservation={excludeObservation}
                setExcludeObservation={setExcludeObservation}
                showDischargeAnnounced={false}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <CommonReportTable
                loading={loading}
                tableDataLength={tableData.length}
                filteredData={filteredData}
                columns={columns}
                formatCellValue={formatCellValue}
            />
        </CardMasterClose>
    )
}

export default memo(RequisitionReport)
