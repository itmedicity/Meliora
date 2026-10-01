import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import * as XLSX from 'xlsx'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import { axiosellider } from 'src/views/Axios/Axios'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import { columns, formatCellValue } from './CommonReportColumns'
import CommonReportToolbar from './CommonReportToolbar'
import CommonReportTable from './CommonReportTable'

const CommonReport = () => {
    const history = useNavigate()
    const [tableData, setTableData] = useState([])
    const [dailyDateFrom, setDailyDateFrom] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [dailyDateTo, setDailyDateTo] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [selectedDepartment, setSelectedDepartment] = useState('ALL')
    const [excludeOncology, setExcludeOncology] = useState(false)
    const [excludeObservation, setExcludeObservation] = useState(false)
    const [onlyWithDischargeAnnounced, setOnlyWithDischargeAnnounced] = useState(false)
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

    const SearchDetails = useCallback(() => {
        setLoading(true)
        const GetCensusDetails = async param => {
            const result = await axiosellider.post('/supplierList/CommonReport', param)
            return result.data
        }
        GetCensusDetails(searchdata)
            .then(value => {
                const { data, success, message } = value
                if (success === 2 && Array.isArray(data)) {
                    // Deduplicate data by ADMISS_NO / IP_NO
                    const seen = new Set()
                    const unique = []
                    data.forEach(item => {
                        const key = item.ADMISS_NO || item.IP_NO || (item.PATIENT_NO ? `${item.PATIENT_NO}_${item.ADMIS_DATE_TIME}` : null)
                        if (!key || !seen.has(key)) {
                            if (key) seen.add(key)
                            unique.push(item)
                        }
                    })
                    setTableData(unique)
                } else {
                    infoNotify(message || "No Data Found")
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
    }, [searchdata])

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

    // Filtered data based on:
    // 1) Department selection
    // 2) Exclude ONCOLOGY DAY CARE
    // 3) Exclude OBSERVATION (Admission Reason)
    // 4) Only with DISCHARGE ANNOUNCED (exclude rows without Discharge Announced)
    // 5) Deduplication by Admission Number
    // 6) Search keyword
    const filteredData = useMemo(() => {
        let result = tableData

        // 1) Department wise filter
        if (selectedDepartment && selectedDepartment !== 'ALL') {
            result = result.filter(row => row.DEPARTMENT_NAME === selectedDepartment)
        }

        // 2) Without ONCOLOGY DAY CARE filter
        if (excludeOncology) {
            result = result.filter(row => {
                const dept = (row.DEPARTMENT_NAME || '').toUpperCase().trim()
                const nurseStation = (row.NURSTATION_NAME || '').toUpperCase().trim()
                const isOncologyDept = dept.includes('ONCOLOGY DAY CARE') || dept.includes('ONCOLOGY DAYCARE')
                const isOncologyStation = nurseStation.includes('ONCOLOGY DAY CARE') || nurseStation.includes('ONCOLOGY DAYCARE')
                return !isOncologyDept && !isOncologyStation
            })
        }

        // 3) Without OBSERVATION filter (Admission Reason)
        if (excludeObservation) {
            result = result.filter(row => {
                const reason = (row.ADMISS_REASON || '').toUpperCase().trim()
                const isObservation = reason.includes('OBSERVATION') || reason === 'OBS'
                return !isObservation
            })
        }

        // 4) Discharge Announced filter (exclude rows without Discharge Announced)
        if (onlyWithDischargeAnnounced) {
            result = result.filter(row => {
                const val = row.DIS_ANNOUNCED
                if (val === null || val === undefined) return false
                const trimmed = String(val).trim()
                return trimmed !== '' && trimmed !== '-' && trimmed !== '--' && trimmed.toLowerCase() !== 'null'
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
                    (row.DISCHARGE_STATUS && String(row.DISCHARGE_STATUS).toLowerCase().includes(term))
                )
            })
        }

        return result
    }, [tableData, selectedDepartment, excludeOncology, excludeObservation, onlyWithDischargeAnnounced, searchTerm])

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

        const worksheet = XLSX.utils.json_to_sheet(exportRows)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Common Report")
        const deptSuffix = selectedDepartment && selectedDepartment !== 'ALL' ? `_${selectedDepartment}` : ''
        const oncoSuffix = excludeOncology ? '_without_Oncology' : ''
        const obsSuffix = excludeObservation ? '_without_Observation' : ''
        const dischSuffix = onlyWithDischargeAnnounced ? '_with_Disch_Announced' : ''
        XLSX.writeFile(workbook, `Common_Report_${dailyDateFrom}_to_${dailyDateTo}${deptSuffix}${oncoSuffix}${obsSuffix}${dischSuffix}.xlsx`)
    }, [filteredData, dailyDateFrom, dailyDateTo, selectedDepartment, excludeOncology, excludeObservation, onlyWithDischargeAnnounced])

    return (
        <CardMasterClose title=" DISCHARGE TAT REPORT" close={backToSetting}>
            <CommonReportToolbar
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
                excludeOncology={excludeOncology}
                setExcludeOncology={setExcludeOncology}
                excludeObservation={excludeObservation}
                setExcludeObservation={setExcludeObservation}
                onlyWithDischargeAnnounced={onlyWithDischargeAnnounced}
                setOnlyWithDischargeAnnounced={setOnlyWithDischargeAnnounced}
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

export default memo(CommonReport)
