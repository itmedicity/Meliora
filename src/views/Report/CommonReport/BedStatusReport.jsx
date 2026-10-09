import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as XLSX from 'xlsx'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import { axiosellider } from 'src/views/Axios/Axios'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import { getallNurseStationMaster } from 'src/api/CommonApiCRF'
import { useQuery } from '@tanstack/react-query'
import BedStatusToolbar from './BedStatusToolbar'
import BedStatusKpiCards from './BedStatusKpiCards'
import BedStatusTable from './BedStatusTable'

const BedStatusReport = () => {
    const history = useNavigate()

    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasFetched, setHasFetched] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedOutlet, setSelectedOutlet] = useState('ALL')

    const backToSetting = useCallback(() => {
        history('/Home/Reports')
    }, [history])

    const { data: getallnursestation } = useQuery({
        queryKey: ['getallnsmaster'],
        queryFn: () => getallNurseStationMaster(),
    })

    // API Call to fetch current bed status
    // Endpoint: router.post('/BedStatus', checkToken, getBedStatusReport)
    // Mounted under /api/supplierList in His_Api_Clone
    const fetchBedStatus = useCallback(async () => {
        setLoading(true)
        try {
            let nurseStations = getallnursestation
            if (!Array.isArray(nurseStations) || nurseStations.length === 0) {
                nurseStations = await getallNurseStationMaster()
            }

            const result = await axiosellider.post('/supplierList/BedStatus', {})
            const { data, success, message } = result.data
            if (success === 2 && Array.isArray(data)) {
                if (data.length === 0) {
                    infoNotify('No Bed Status records found')
                    setTableData([])
                } else {
                    // Only take bed_count from getallnursestation - never take bed count from BedStatus API
                    const mergedData = data.map(item => {
                        const matching = nurseStations?.filter(
                            ns => String(ns.fb_ns_code).trim().toUpperCase() === String(item.NS_CODE).trim().toUpperCase()
                        )
                        const totalBedCount = matching && matching.length > 0
                            ? matching.reduce((sum, ns) => sum + Number(ns.bed_count || 0), 0)
                            : 0

                        return {
                            ...item,
                            bed_count: totalBedCount,
                            BED_COUNT: totalBedCount
                        }
                    })
                    setTableData(mergedData)
                }
            } else if (success === 1) {
                infoNotify(message || 'No Data Found')
                setTableData([])
            } else {
                infoNotify(message || 'Unable to fetch Bed Status data')
                setTableData([])
            }
        } catch (error) {
            console.error('Error fetching bed status:', error)
            infoNotify('Failed to fetch Bed Status data from server')
            setTableData([])
        } finally {
            setLoading(false)
            setHasFetched(true)
        }
    }, [getallnursestation])

    // Re-sync tableData with bed_count whenever getallnursestation updates
    useEffect(() => {
        if (Array.isArray(getallnursestation) && getallnursestation.length > 0) {
            setTableData(prevData => {
                if (!Array.isArray(prevData) || prevData.length === 0) return prevData
                return prevData.map(item => {
                    const matching = getallnursestation.filter(
                        ns => String(ns.fb_ns_code).trim().toUpperCase() === String(item.NS_CODE).trim().toUpperCase()
                    )
                    const totalBedCount = matching.length > 0
                        ? matching.reduce((sum, ns) => sum + Number(ns.bed_count || 0), 0)
                        : 0

                    return {
                        ...item,
                        bed_count: totalBedCount,
                        BED_COUNT: totalBedCount
                    }
                })
            })
        }
    }, [getallnursestation])

    // Filter out stations where Total Beds count is 0 (only view data with bed count from getallnursestation)
    const nonZeroBedData = useMemo(() => {
        return tableData.filter(row => {
            const total = Number(row.bed_count ?? 0)
            return !isNaN(total) && total > 0
        })
    }, [tableData])

    // Distinct outlet names for filter dropdown (from stations with active beds)
    const outletList = useMemo(() => {
        const outlets = new Set()
        nonZeroBedData.forEach(row => {
            if (row.OUTLET_NAME && String(row.OUTLET_NAME).trim()) {
                outlets.add(String(row.OUTLET_NAME).trim())
            }
        })
        return Array.from(outlets).sort()
    }, [nonZeroBedData])

    // Filtered data based on outlet selection and search keyword
    const filteredData = useMemo(() => {
        let result = nonZeroBedData

        if (selectedOutlet && selectedOutlet !== 'ALL') {
            result = result.filter(row => row.OUTLET_NAME === selectedOutlet)
        }

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim()
            result = result.filter(row => {
                const station = (row.NURSING_STATION || '').toLowerCase()
                const outlet = (row.OUTLET_NAME || '').toLowerCase()
                return station.includes(term) || outlet.includes(term)
            })
        }

        return result
    }, [nonZeroBedData, selectedOutlet, searchTerm])

    // Summary statistics calculated from the active/filtered rows
    const summaryStats = useMemo(() => {
        const stats = {
            totalStations: filteredData.length,
            totalBeds: 0,
            occupiedBeds: 0,
            admittedPatients: 0,
            remainingBeds: 0,
            discharged: 0,
            availableBeds: 0,
            notReady: 0
        }

        filteredData.forEach(row => {
            const total = Number(row.bed_count ?? 0)
            stats.totalBeds += isNaN(total) ? 0 : total
            stats.occupiedBeds += Number(row.OCCUPIED_BEDS || 0)
            stats.admittedPatients += Number(row.ADMITTED_PATIENTS || 0)
            stats.discharged += Number(row.DISCHARGED || 0)
            stats.availableBeds += Number(row.AVAILABLE_BEDS || 0)
            stats.notReady += Number(row.NOT_READY || 0)
        })

        stats.remainingBeds = stats.totalBeds - stats.admittedPatients

        const occupancyRate = stats.totalBeds > 0
            ? ((stats.admittedPatients / stats.totalBeds) * 100).toFixed(1)
            : '0.0'

        return { ...stats, occupancyRate }
    }, [filteredData])

    // Excel Export
    const handleExportExcel = useCallback(() => {
        if (!filteredData || filteredData.length === 0) {
            warningNotify('No data available to export')
            return
        }

        const exportRows = filteredData.map((item, index) => {
            const totalBeds = Number(item.bed_count ?? 0)
            const admittedPatients = Number(item.ADMITTED_PATIENTS || 0)
            const remainingBeds = totalBeds - admittedPatients
            const occupancyPct = totalBeds > 0 ? ((admittedPatients / totalBeds) * 100).toFixed(1) + '%' : '0%'

            return {
                'Sl No': index + 1,
                'Nursing Station': item.NURSING_STATION || 'N/A',
                'Outlet / Location': item.OUTLET_NAME || 'N/A',
                'Total Beds': totalBeds,
                'Admitted Patients': admittedPatients,
                'Remaining Beds': remainingBeds,
                'Discharged': Number(item.DISCHARGED || 0),
                'Available Beds': Number(item.AVAILABLE_BEDS || 0),
                'Not Ready Beds': Number(item.NOT_READY || 0),
                'Occupancy Rate': occupancyPct
            }
        })

        // Add summary row at bottom
        exportRows.push({
            'Sl No': 'TOTAL',
            'Nursing Station': `${summaryStats.totalStations} Stations`,
            'Outlet / Location': '',
            'Total Beds': summaryStats.totalBeds,
            'Admitted Patients': summaryStats.admittedPatients,
            'Remaining Beds': summaryStats.remainingBeds,
            'Discharged': summaryStats.discharged,
            'Available Beds': summaryStats.availableBeds,
            'Not Ready Beds': summaryStats.notReady,
            'Occupancy Rate': `${summaryStats.occupancyRate}%`
        })

        const worksheet = XLSX.utils.json_to_sheet(exportRows)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Bed Status Report')

        const now = new Date()
        const dateStr = now.toISOString().slice(0, 10)
        XLSX.writeFile(workbook, `Bed_Status_Report_${dateStr}.xlsx`)
    }, [filteredData, summaryStats])

    const handleClearFilters = useCallback(() => {
        setSearchTerm('')
        setSelectedOutlet('ALL')
    }, [])

    return (
        <CardMasterClose title="BED STATUS REPORT" close={backToSetting}>
            <BedStatusToolbar
                loading={loading}
                hasFetched={hasFetched}
                fetchBedStatus={fetchBedStatus}
                selectedOutlet={selectedOutlet}
                setSelectedOutlet={setSelectedOutlet}
                outletList={outletList}
                totalActiveStations={nonZeroBedData.length}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleExportExcel={handleExportExcel}
                exportDisabled={filteredData.length === 0}
            />

            {hasFetched && filteredData.length > 0 && (
                <BedStatusKpiCards summaryStats={summaryStats} />
            )}

            <BedStatusTable
                loading={loading}
                hasFetched={hasFetched}
                filteredData={filteredData}
                nonZeroBedCount={nonZeroBedData.length}
                summaryStats={summaryStats}
                onClearFilters={handleClearFilters}
            />
        </CardMasterClose>
    )
}

export default memo(BedStatusReport)