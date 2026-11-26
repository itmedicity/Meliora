import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import * as XLSX from 'xlsx'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import { axiosellider } from 'src/views/Axios/Axios'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import { columns, formatCellValue, computeReadmitDuration, calculateIcuReadmissionStats } from './IcuReadmissionColumns'
import IcuReadmissionToolbar from './IcuReadmissionToolbar'
import IcuReadmissionTable from './IcuReadmissionTable'

const IcuReadmission = () => {
    const history = useNavigate()
    const [tableData, setTableData] = useState([])
    const [dailyDateFrom, setDailyDateFrom] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [dailyDateTo, setDailyDateTo] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [selectedDepartment, setSelectedDepartment] = useState('ALL')
    const [selectedDoctor, setSelectedDoctor] = useState('ALL')
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

    const SearchDetails = useCallback(async () => {
        setLoading(true)
        try {
            const result = await axiosellider.post('/supplierList/icureadmissionReport', searchdata)
            const { data, success, message } = result.data || {}

            if (success === 2 && Array.isArray(data)) {
                if (data.length === 0) {
                    infoNotify("No ICU Readmission Data Found for the selected date range")
                    setTableData([])
                } else {
                    const processed = data.map(item => {
                        const dept = (item.DPC_DESC || item.DEPARTMENT_NAME || item.SPECIALITY_NAME || '').trim()
                        const doctor = (item.DOC_NAME || item.DOCTOR || '').trim()
                        const nurseStation = (item.NSC_DESC || item.NURSTATION_NAME || '').trim()
                        const bedNo = (item.BDC_NO || item.BED_NO || '').trim()
                        const ptName = (item.PTC_PTNAME || item.PATIENT_NAME || '').trim()
                        const ipNo = item.IP_NO || item.ADMISS_NO || '-'
                        const ptNo = item.PT_NO || item.PATIENT_NO || item.PTNO || '-'
                        const allocTime = item.ICU_ALLOCAT_TIME || '-'
                        const releaseTime = item.ICU_RELEASE_TIME || '-'
                        const readmitTime = item.READMIT_TIME || '-'

                        const durationInfo = computeReadmitDuration(releaseTime, readmitTime, item.HOURS_TO_READMIT)

                        return {
                            ...item,
                            IP_NO: ipNo,
                            PT_NO: ptNo,
                            PTC_PTNAME: ptName || '-',
                            DPC_DESC: dept || '-',
                            DOC_NAME: doctor || '-',
                            NSC_DESC: nurseStation || '-',
                            BDC_NO: bedNo || '-',
                            ICU_ALLOCAT_TIME: allocTime,
                            ICU_RELEASE_TIME: releaseTime,
                            READMIT_TIME: readmitTime,
                            HOURS_TO_READMIT: durationInfo.hours !== null ? `${durationInfo.hours} hrs` : '-',
                            HOURS_TO_READMIT_NUM: durationInfo.hours,
                            READMIT_DURATION_DISPLAY: durationInfo.displayString,
                            READMIT_CATEGORY: durationInfo.category
                        }
                    })
                    setTableData(processed)
                }
            } else {
                infoNotify(message || "No Data Found")
                setTableData([])
            }
        } catch (err) {
            console.error("ICU readmission report fetch error:", err)
            infoNotify("Failed to fetch ICU readmission report data")
            setTableData([])
        } finally {
            setLoading(false)
        }
    }, [searchdata])

    // Distinct departments from fetched data
    const departmentList = useMemo(() => {
        const depts = new Set()
        tableData.forEach(row => {
            if (row.DPC_DESC && String(row.DPC_DESC).trim() && row.DPC_DESC !== '-') {
                depts.add(String(row.DPC_DESC).trim())
            }
        })
        return Array.from(depts).sort()
    }, [tableData])

    // Distinct doctors from fetched data (scoped to selected department if chosen)
    const doctorList = useMemo(() => {
        const docs = new Set()
        tableData.forEach(row => {
            if (selectedDepartment && selectedDepartment !== 'ALL') {
                if (row.DPC_DESC === selectedDepartment && row.DOC_NAME && row.DOC_NAME.trim() && row.DOC_NAME !== '-') {
                    docs.add(String(row.DOC_NAME).trim())
                }
            } else {
                if (row.DOC_NAME && row.DOC_NAME.trim() && row.DOC_NAME !== '-') {
                    docs.add(String(row.DOC_NAME).trim())
                }
            }
        })
        return Array.from(docs).sort()
    }, [tableData, selectedDepartment])

    // Filtered data based on Department, Doctor, and Real-time Search
    const filteredData = useMemo(() => {
        let result = tableData

        // 1) Department-wise filter
        if (selectedDepartment && selectedDepartment !== 'ALL') {
            result = result.filter(row => row.DPC_DESC === selectedDepartment)
        }

        // 2) Doctor-wise filter
        if (selectedDoctor && selectedDoctor !== 'ALL') {
            result = result.filter(row => row.DOC_NAME === selectedDoctor)
        }

        // 3) Real-time text search filter across all relevant fields
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim()
            result = result.filter(row => {
                return (
                    (row.PTC_PTNAME && String(row.PTC_PTNAME).toLowerCase().includes(term)) ||
                    (row.PT_NO && String(row.PT_NO).toLowerCase().includes(term)) ||
                    (row.IP_NO && String(row.IP_NO).toLowerCase().includes(term)) ||
                    (row.DOC_NAME && String(row.DOC_NAME).toLowerCase().includes(term)) ||
                    (row.DPC_DESC && String(row.DPC_DESC).toLowerCase().includes(term)) ||
                    (row.NSC_DESC && String(row.NSC_DESC).toLowerCase().includes(term)) ||
                    (row.BDC_NO && String(row.BDC_NO).toLowerCase().includes(term)) ||
                    (row.ICU_ALLOCAT_TIME && String(row.ICU_ALLOCAT_TIME).toLowerCase().includes(term)) ||
                    (row.ICU_RELEASE_TIME && String(row.ICU_RELEASE_TIME).toLowerCase().includes(term)) ||
                    (row.READMIT_TIME && String(row.READMIT_TIME).toLowerCase().includes(term)) ||
                    (row.HOURS_TO_READMIT && String(row.HOURS_TO_READMIT).toLowerCase().includes(term)) ||
                    (row.READMIT_CATEGORY && String(row.READMIT_CATEGORY).toLowerCase().includes(term))
                )
            })
        }

        return result
    }, [tableData, selectedDepartment, selectedDoctor, searchTerm])

    // Summary KPI statistics
    const readmissionStats = useMemo(() => {
        return calculateIcuReadmissionStats(filteredData)
    }, [filteredData])

    // Excel export handler
    const onExportClick = useCallback(() => {
        if (!filteredData || filteredData.length === 0) {
            warningNotify("No data available to export")
            return
        }

        const exportRows = filteredData.map((item, index) => {
            const row = {}
            columns.forEach(col => {
                let val = item[col.key]
                if (col.key === "SLNO") {
                    val = index + 1
                }
                row[col.label] = formatCellValue(val, col.group === 'tat')
            })
            return row
        })

        // Add summary row for Average Readmission Hours & Total Patients at bottom of Excel export
        if (readmissionStats && readmissionStats.hasData) {
            const avgRow = {}
            columns.forEach(col => {
                if (col.key === "SLNO") avgRow[col.label] = ""
                else if (col.key === "IP_NO") avgRow[col.label] = "SUMMARY"
                else if (col.key === "PT_NO") avgRow[col.label] = `Total: ${readmissionStats.count} Patients`
                else if (col.key === "PTC_PTNAME") avgRow[col.label] = `≤ 24h: ${readmissionStats.within24Count} (${readmissionStats.within24Pct}%) | 24-48h: ${readmissionStats.between24And48Count} (${readmissionStats.between24And48Pct}%)`
                else if (col.key === "DPC_DESC") avgRow[col.label] = selectedDepartment !== 'ALL' ? selectedDepartment : 'All Departments'
                else if (col.key === "DOC_NAME") avgRow[col.label] = selectedDoctor !== 'ALL' ? selectedDoctor : 'All Doctors'
                else if (col.key === "NSC_DESC") avgRow[col.label] = ""
                else if (col.key === "BDC_NO") avgRow[col.label] = ""
                else if (col.key === "HOURS_TO_READMIT") avgRow[col.label] = `Avg: ${readmissionStats.formattedAvgHours}`
                else if (col.key === "READMIT_CATEGORY") avgRow[col.label] = `Avg: ${readmissionStats.displayString}`
                else avgRow[col.label] = ""
            })
            exportRows.push(avgRow)
        }

        const worksheet = XLSX.utils.json_to_sheet(exportRows)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "ICU Readmission Report")
        const deptSuffix = selectedDepartment && selectedDepartment !== 'ALL' ? `_${selectedDepartment.replace(/[^a-zA-Z0-9]/g, '_')}` : ''
        const doctorSuffix = selectedDoctor && selectedDoctor !== 'ALL' ? `_${selectedDoctor.replace(/[^a-zA-Z0-9]/g, '_')}` : ''
        XLSX.writeFile(workbook, `ICU_Readmission_Report_${dailyDateFrom}_to_${dailyDateTo}${deptSuffix}${doctorSuffix}.xlsx`)
    }, [filteredData, dailyDateFrom, dailyDateTo, selectedDepartment, selectedDoctor, readmissionStats])

    return (
        <CardMasterClose title="ICU READMISSION WITHIN 48 HOURS REPORT" close={backToSetting}>
            <IcuReadmissionToolbar
                dailyDateFrom={dailyDateFrom}
                setDailyDateFrom={setDailyDateFrom}
                dailyDateTo={dailyDateTo}
                setDailyDateTo={setDailyDateTo}
                SearchDetails={SearchDetails}
                loading={loading}
                tableDataLength={tableData.length}
                filteredDataLength={filteredData.length}
                onExportClick={onExportClick}
                selectedDepartment={selectedDepartment}
                setSelectedDepartment={setSelectedDepartment}
                departmentList={departmentList}
                selectedDoctor={selectedDoctor}
                setSelectedDoctor={setSelectedDoctor}
                doctorList={doctorList}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                readmissionStats={readmissionStats}
            />
            <IcuReadmissionTable
                loading={loading}
                tableDataLength={tableData.length}
                filteredData={filteredData}
                columns={columns}
                formatCellValue={formatCellValue}
                readmissionStats={readmissionStats}
                selectedDepartment={selectedDepartment}
                selectedDoctor={selectedDoctor}
            />
        </CardMasterClose>
    )
}

export default memo(IcuReadmission)
