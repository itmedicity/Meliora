import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import * as XLSX from 'xlsx'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import { axiosellider } from 'src/views/Axios/Axios'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import { columns, formatCellValue, calculateAverageWaitingTime } from './WaitingReportColumns'
import WaitingReportToolbar from './WaitingReportToolbar'
import WaitingReportTable from './WaitingReportTable'

// Helper to calculate turnaround / waiting time string in HH:mm:ss format
const computeTatString = (startDateStr, endDateStr) => {
    if (!startDateStr || !endDateStr) return '-'
    const start = moment(startDateStr, 'DD/MM/YYYY HH:mm:ss')
    const end = moment(endDateStr, 'DD/MM/YYYY HH:mm:ss')
    if (!start.isValid() || !end.isValid()) return '-'

    const diffSeconds = end.diff(start, 'seconds')
    const isNegative = diffSeconds < 0
    const absDiff = Math.abs(diffSeconds)
    const hours = Math.floor(absDiff / 3600)
    const minutes = Math.floor((absDiff % 3600) / 60)
    const seconds = absDiff % 60
    return `${isNegative ? '-' : ''}${hours < 10 ? '0' : ''}${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

// Helper to calculate waiting time in minutes
const computeMinutes = (startDateStr, endDateStr) => {
    if (!startDateStr || !endDateStr) return null
    const start = moment(startDateStr, 'DD/MM/YYYY HH:mm:ss')
    const end = moment(endDateStr, 'DD/MM/YYYY HH:mm:ss')
    if (!start.isValid() || !end.isValid()) return null
    return end.diff(start, 'minutes')
}

const WaitingReport = () => {
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
            const result = await axiosellider.post('/supplierList/waitingtimeReport', searchdata)
            const { data, success, message } = result.data || {}

            if (success === 2 && Array.isArray(data)) {
                const processed = data.map(item => {
                    const dept = (item.SPECIALITY_NAME || item.DEPARTMENT_NAME || '').trim()
                    const visitDate = item.VISITDATE || item.VISIT_DATE
                    const consultTime = item.CONSULTSTART_TIME || item.CONSULT_START_DATE

                    let tatTime = item.TAT_ANSMT_MEDRET_REQ || item.WAITING_TIME
                    if (!tatTime || tatTime === '::' || tatTime === '-') {
                        tatTime = computeTatString(visitDate, consultTime)
                    }

                    let tatMins = item.CONSULT_INITIAL_TIME !== undefined && item.CONSULT_INITIAL_TIME !== null && item.CONSULT_INITIAL_TIME !== ''
                        ? Number(item.CONSULT_INITIAL_TIME)
                        : computeMinutes(visitDate, consultTime)

                    return {
                        ...item,
                        SPECIALITY_NAME: dept || '-',
                        DOCTOR: item.DOCTOR || item.DOCTOR_NAME || '-',
                        PATIENT_NAME: item.PATIENT_NAME || '-',
                        PTNO: item.PTNO || item.PATIENT_NO || '-',
                        VISITDATE: visitDate || '-',
                        CONSULTSTART_TIME: consultTime || '-',
                        WAITING_TIME: tatTime || '-',
                        WAITING_MINUTES: tatMins !== null && !isNaN(tatMins) ? tatMins : null
                    }
                })
                setTableData(processed)
            } else {
                infoNotify(message || "No Data Found")
                setTableData([])
            }
        } catch (err) {
            console.error("Waiting report fetch error:", err)
            infoNotify("Failed to fetch report data")
            setTableData([])
        } finally {
            setLoading(false)
        }
    }, [searchdata])

    // Distinct departments from fetched data
    const departmentList = useMemo(() => {
        const depts = new Set()
        tableData.forEach(row => {
            if (row.SPECIALITY_NAME && String(row.SPECIALITY_NAME).trim() && row.SPECIALITY_NAME !== '-') {
                depts.add(String(row.SPECIALITY_NAME).trim())
            }
        })
        return Array.from(depts).sort()
    }, [tableData])

    // Distinct doctors from fetched data (scoped to selected department if chosen)
    const doctorList = useMemo(() => {
        const docs = new Set()
        tableData.forEach(row => {
            if (selectedDepartment && selectedDepartment !== 'ALL') {
                if (row.SPECIALITY_NAME === selectedDepartment && row.DOCTOR && row.DOCTOR.trim() && row.DOCTOR !== '-') {
                    docs.add(String(row.DOCTOR).trim())
                }
            } else {
                if (row.DOCTOR && row.DOCTOR.trim() && row.DOCTOR !== '-') {
                    docs.add(String(row.DOCTOR).trim())
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
            result = result.filter(row => row.SPECIALITY_NAME === selectedDepartment)
        }

        // 2) Doctor-wise filter
        if (selectedDoctor && selectedDoctor !== 'ALL') {
            result = result.filter(row => row.DOCTOR === selectedDoctor)
        }

        // 3) Real-time text search filter across OP consultation fields
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim()
            result = result.filter(row => {
                return (
                    (row.PATIENT_NAME && String(row.PATIENT_NAME).toLowerCase().includes(term)) ||
                    (row.PTNO && String(row.PTNO).toLowerCase().includes(term)) ||
                    (row.DOCTOR && String(row.DOCTOR).toLowerCase().includes(term)) ||
                    (row.SPECIALITY_NAME && String(row.SPECIALITY_NAME).toLowerCase().includes(term)) ||
                    (row.VISITDATE && String(row.VISITDATE).toLowerCase().includes(term)) ||
                    (row.CONSULTSTART_TIME && String(row.CONSULTSTART_TIME).toLowerCase().includes(term)) ||
                    (row.WAITING_TIME && String(row.WAITING_TIME).toLowerCase().includes(term)) ||
                    (row.WAITING_MINUTES !== null && String(row.WAITING_MINUTES).includes(term))
                )
            })
        }

        return result
    }, [tableData, selectedDepartment, selectedDoctor, searchTerm])

    // Calculate the average waiting time taken by the patient to see the doctor
    const averageStats = useMemo(() => {
        return calculateAverageWaitingTime(filteredData)
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

        // Add summary row for Average Waiting Time at bottom of Excel export
        if (averageStats && averageStats.hasData) {
            const avgRow = {}
            columns.forEach(col => {
                if (col.key === "SLNO") avgRow[col.label] = ""
                else if (col.key === "PATIENT_NAME") avgRow[col.label] = "AVERAGE WAITING TIME"
                else if (col.key === "SPECIALITY_NAME") avgRow[col.label] = selectedDepartment !== 'ALL' ? selectedDepartment : 'All Departments'
                else if (col.key === "DOCTOR") avgRow[col.label] = selectedDoctor !== 'ALL' ? selectedDoctor : 'All Doctors'
                else if (col.key === "WAITING_TIME") avgRow[col.label] = averageStats.formattedHHMMSS
                else if (col.key === "WAITING_MINUTES") avgRow[col.label] = `${averageStats.displayString} (${averageStats.avgMinutes} mins)`
                else avgRow[col.label] = ""
            })
            exportRows.push(avgRow)
        }

        const worksheet = XLSX.utils.json_to_sheet(exportRows)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "OP Waiting Time Report")
        const deptSuffix = selectedDepartment && selectedDepartment !== 'ALL' ? `_${selectedDepartment.replace(/[^a-zA-Z0-9]/g, '_')}` : ''
        const doctorSuffix = selectedDoctor && selectedDoctor !== 'ALL' ? `_${selectedDoctor.replace(/[^a-zA-Z0-9]/g, '_')}` : ''
        XLSX.writeFile(workbook, `Waiting_Time_OP_Consultation_${dailyDateFrom}_to_${dailyDateTo}${deptSuffix}${doctorSuffix}.xlsx`)
    }, [filteredData, dailyDateFrom, dailyDateTo, selectedDepartment, selectedDoctor, averageStats])

    return (
        <CardMasterClose title="WAITING TIME FOR OP CONSULTATION REPORT" close={backToSetting}>
            <WaitingReportToolbar
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
                averageStats={averageStats}
            />
            <WaitingReportTable
                loading={loading}
                tableDataLength={tableData.length}
                filteredData={filteredData}
                columns={columns}
                formatCellValue={formatCellValue}
                averageStats={averageStats}
                selectedDepartment={selectedDepartment}
                selectedDoctor={selectedDoctor}
            />
        </CardMasterClose>
    )
}

export default memo(WaitingReport)
