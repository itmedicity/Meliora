import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Input,
    Option,
    Select,
    Sheet,
    Table,
    Tooltip,
    Typography
} from '@mui/joy'
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import DownloadIcon from '@mui/icons-material/Download'
import RefreshIcon from '@mui/icons-material/Refresh'
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import * as XLSX from 'xlsx'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import { axiosellider } from 'src/views/Axios/Axios'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import { getallNurseStationMaster } from 'src/api/CommonApiCRF'
import { useQuery } from '@tanstack/react-query'

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

    console.log(getallnursestation);

    // API Call to fetch current bed status
    // Endpoint: router.post('/BedStatus', checkToken, getBedStatusReport)
    // Mounted under /api/supplierList in His_Api_Clone
    const fetchBedStatus = useCallback(async () => {
        setLoading(true)
        try {
            const result = await axiosellider.post('/supplierList/BedStatus', {})
            const { data, success, message } = result.data
            console.log(data);
            if (success === 2 && Array.isArray(data)) {
                if (data.length === 0) {
                    infoNotify('No Bed Status records found')
                    setTableData([])
                } else {
                    // Merge bed_count from getallnursestation data by matching NS_CODE with fb_ns_code
                    const mergedData = data.map(item => {
                        const matching = getallnursestation?.filter(
                            ns => String(ns.fb_ns_code).trim().toUpperCase() === String(item.NS_CODE).trim().toUpperCase()
                        )
                        const totalBedCount = matching && matching.length > 0
                            ? matching.reduce((sum, ns) => sum + Number(ns.bed_count || 0), 0)
                            : Number(item.BED_COUNT ?? 0)

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
                        : Number(item.bed_count ?? item.BED_COUNT ?? 0)

                    return {
                        ...item,
                        bed_count: totalBedCount,
                        BED_COUNT: totalBedCount
                    }
                })
            })
        }
    }, [getallnursestation])

    // Distinct outlet names for filter dropdown
    const outletList = useMemo(() => {
        const outlets = new Set()
        tableData.forEach(row => {
            if (row.OUTLET_NAME && String(row.OUTLET_NAME).trim()) {
                outlets.add(String(row.OUTLET_NAME).trim())
            }
        })
        return Array.from(outlets).sort()
    }, [tableData])

    // Filtered data based on outlet selection and search keyword
    const filteredData = useMemo(() => {
        let result = tableData

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
    }, [tableData, selectedOutlet, searchTerm])

    // Summary statistics calculated from the active/filtered rows
    const summaryStats = useMemo(() => {
        const stats = {
            totalStations: filteredData.length,
            totalBeds: 0,
            occupiedBeds: 0,
            admittedPatients: 0,
            availableBeds: 0,
            notReady: 0
        }

        filteredData.forEach(row => {
            const total = Number(row.bed_count ?? row.BED_COUNT ?? 0)
            stats.totalBeds += isNaN(total) ? 0 : total
            stats.occupiedBeds += Number(row.OCCUPIED_BEDS || 0)
            stats.admittedPatients += Number(row.ADMITTED_PATIENTS || 0)
            stats.availableBeds += Number(row.AVAILABLE_BEDS || 0)
            stats.notReady += Number(row.NOT_READY || 0)
        })

        const occupancyRate = stats.totalBeds > 0
            ? ((stats.occupiedBeds / stats.totalBeds) * 100).toFixed(1)
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
            const totalBeds = Number(item.bed_count ?? item.BED_COUNT ?? 0)
            const occupied = Number(item.OCCUPIED_BEDS || 0)
            const occupancyPct = totalBeds > 0 ? ((occupied / totalBeds) * 100).toFixed(1) + '%' : '0%'

            return {
                'Sl No': index + 1,
                'Nursing Station': item.NURSING_STATION || 'N/A',
                'Outlet / Location': item.OUTLET_NAME || 'N/A',
                'Total Beds': totalBeds,
                'Occupied Beds': occupied,
                'Admitted Patients': Number(item.ADMITTED_PATIENTS || 0),
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
            'Occupied Beds': summaryStats.occupiedBeds,
            'Admitted Patients': summaryStats.admittedPatients,
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

    return (
        <CardMasterClose title="BED STATUS REPORT" close={backToSetting}>
            {/* TOOLBAR CONTROLS */}
            <Sheet
                variant="outlined"
                sx={{
                    p: 2,
                    mt: 1,
                    borderRadius: '10px',
                    bgcolor: '#ffffff',
                    boxShadow: '0 2px 8px -2px rgba(15, 23, 42, 0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 1.5
                    }}
                >
                    {/* PRIMARY ACTION BUTTON */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                        <Button
                            variant="solid"
                            color="primary"
                            size="md"
                            startDecorator={
                                loading ? <CircularProgress size="sm" thickness={3} /> : <HotelOutlinedIcon />
                            }
                            onClick={fetchBedStatus}
                            disabled={loading}
                            sx={{
                                fontWeight: 600,
                                px: 2.5,
                                py: 1,
                                borderRadius: '8px',
                                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)'
                                }
                            }}
                        >
                            {loading ? 'Fetching Status...' : 'Show Current Bed Status'}
                        </Button>

                        {hasFetched && (
                            <Tooltip title="Refresh Current Bed Status" variant="plain">
                                <Button
                                    variant="outlined"
                                    color="neutral"
                                    size="md"
                                    onClick={fetchBedStatus}
                                    disabled={loading}
                                    startDecorator={<RefreshIcon />}
                                    sx={{ borderRadius: '8px' }}
                                >
                                    Refresh
                                </Button>
                            </Tooltip>
                        )}
                    </Box>

                    {/* SEARCH & FILTER CONTROLS */}
                    {hasFetched && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                            {/* Outlet Filter */}
                            <Box sx={{ minWidth: 200 }}>
                                <Select
                                    size="sm"
                                    value={selectedOutlet}
                                    onChange={(e, val) => setSelectedOutlet(val || 'ALL')}
                                    placeholder="Filter by Outlet"
                                    sx={{ borderRadius: '8px', bgcolor: '#f8fafc' }}
                                >
                                    <Option value="ALL">All Outlets ({tableData.length})</Option>
                                    {outletList.map(outlet => (
                                        <Option key={outlet} value={outlet}>
                                            {outlet}
                                        </Option>
                                    ))}
                                </Select>
                            </Box>

                            {/* Search Box */}
                            <Input
                                size="sm"
                                placeholder="Search station or outlet..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                startDecorator={<SearchOutlinedIcon />}
                                sx={{
                                    width: { xs: '100%', sm: 220 },
                                    borderRadius: '8px',
                                    bgcolor: '#f8fafc'
                                }}
                            />

                            {/* Export to Excel */}
                            <Button
                                variant="outlined"
                                color="success"
                                size="sm"
                                startDecorator={<DownloadIcon />}
                                onClick={handleExportExcel}
                                disabled={filteredData.length === 0}
                                sx={{
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    borderColor: '#10b981',
                                    color: '#047857',
                                    '&:hover': {
                                        bgcolor: '#ecfdf5',
                                        borderColor: '#059669'
                                    }
                                }}
                            >
                                Export Excel
                            </Button>
                        </Box>
                    )}
                </Box>
            </Sheet>

            {/* KPI SUMMARY CARDS */}
            {hasFetched && filteredData.length > 0 && (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(3, 1fr)',
                            md: 'repeat(6, 1fr)'
                        },
                        gap: 1.5,
                        mt: 1.5
                    }}
                >
                    {/* Stations */}
                    <Sheet
                        variant="outlined"
                        sx={{
                            p: 1.5,
                            borderRadius: '10px',
                            bgcolor: '#f8fafc',
                            borderLeft: '4px solid #64748b',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography level="body-xs" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                                Stations
                            </Typography>
                            <MeetingRoomOutlinedIcon sx={{ fontSize: 18, color: '#64748b' }} />
                        </Box>
                        <Typography level="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
                            {summaryStats.totalStations}
                        </Typography>
                    </Sheet>

                    {/* Total Beds */}
                    <Sheet
                        variant="outlined"
                        sx={{
                            p: 1.5,
                            borderRadius: '10px',
                            bgcolor: '#eff6ff',
                            borderLeft: '4px solid #3b82f6',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography level="body-xs" sx={{ color: '#1d4ed8', fontWeight: 600, textTransform: 'uppercase' }}>
                                Total Beds
                            </Typography>
                            <HotelOutlinedIcon sx={{ fontSize: 18, color: '#3b82f6' }} />
                        </Box>
                        <Typography level="h4" sx={{ fontWeight: 700, color: '#1e40af' }}>
                            {summaryStats.totalBeds}
                        </Typography>
                    </Sheet>

                    {/* Available Beds */}
                    <Sheet
                        variant="outlined"
                        sx={{
                            p: 1.5,
                            borderRadius: '10px',
                            bgcolor: '#f0fdf4',
                            borderLeft: '4px solid #22c55e',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography level="body-xs" sx={{ color: '#15803d', fontWeight: 600, textTransform: 'uppercase' }}>
                                Available Beds
                            </Typography>
                            <CheckCircleOutlineIcon sx={{ fontSize: 18, color: '#22c55e' }} />
                        </Box>
                        <Typography level="h4" sx={{ fontWeight: 700, color: '#166534' }}>
                            {summaryStats.availableBeds}
                        </Typography>
                    </Sheet>

                    {/* Occupied Beds */}
                    <Sheet
                        variant="outlined"
                        sx={{
                            p: 1.5,
                            borderRadius: '10px',
                            bgcolor: '#fefce8',
                            borderLeft: '4px solid #eab308',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography level="body-xs" sx={{ color: '#a16207', fontWeight: 600, textTransform: 'uppercase' }}>
                                Occupied Beds
                            </Typography>
                            <HotelOutlinedIcon sx={{ fontSize: 18, color: '#eab308' }} />
                        </Box>
                        <Typography level="h4" sx={{ fontWeight: 700, color: '#854d0e' }}>
                            {summaryStats.occupiedBeds}
                        </Typography>
                    </Sheet>

                    {/* Admitted Patients */}
                    <Sheet
                        variant="outlined"
                        sx={{
                            p: 1.5,
                            borderRadius: '10px',
                            bgcolor: '#faf5ff',
                            borderLeft: '4px solid #a855f7',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography level="body-xs" sx={{ color: '#7e22ce', fontWeight: 600, textTransform: 'uppercase' }}>
                                Admitted Patients
                            </Typography>
                            <PeopleAltOutlinedIcon sx={{ fontSize: 18, color: '#a855f7' }} />
                        </Box>
                        <Typography level="h4" sx={{ fontWeight: 700, color: '#6b21a8' }}>
                            {summaryStats.admittedPatients}
                        </Typography>
                    </Sheet>

                    {/* Not Ready */}
                    <Sheet
                        variant="outlined"
                        sx={{
                            p: 1.5,
                            borderRadius: '10px',
                            bgcolor: '#fff1f2',
                            borderLeft: '4px solid #f43f5e',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography level="body-xs" sx={{ color: '#be123c', fontWeight: 600, textTransform: 'uppercase' }}>
                                Not Ready
                            </Typography>
                            <WarningAmberIcon sx={{ fontSize: 18, color: '#f43f5e' }} />
                        </Box>
                        <Typography level="h4" sx={{ fontWeight: 700, color: '#9f1239' }}>
                            {summaryStats.notReady}
                        </Typography>
                    </Sheet>
                </Box>
            )}

            {/* DATA TABLE CONTAINER */}
            <Sheet
                variant="outlined"
                sx={{
                    mt: 1.5,
                    width: '100%',
                    borderRadius: '10px',
                    overflow: 'auto',
                    maxHeight: '60vh',
                    bgcolor: '#ffffff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}
            >
                {loading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 12, gap: 1.5 }}>
                        <CircularProgress size="lg" color="primary" />
                        <Typography level="body-md" sx={{ color: '#475569', fontWeight: 500 }}>
                            Fetching real-time bed status from HIS...
                        </Typography>
                    </Box>
                ) : !hasFetched ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 12, gap: 2 }}>
                        <HotelOutlinedIcon sx={{ fontSize: 52, color: '#94a3b8' }} />
                        <Typography level="title-md" sx={{ color: '#475569', fontWeight: 600 }}>
                            Current Bed Status
                        </Typography>
                        <Typography level="body-sm" sx={{ color: '#64748b', maxWidth: 450, textAlign: 'center' }}>
                            Click the <strong>Show Current Bed Status</strong> button above to load live bed occupancy, admissions, and available beds across all nursing stations.
                        </Typography>
                    </Box>
                ) : filteredData.length === 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, gap: 1 }}>
                        <Typography level="body-md" sx={{ color: '#64748b', fontWeight: 500 }}>
                            {tableData.length === 0
                                ? 'No Bed Status records found in the database.'
                                : 'No matching stations or outlets found for the current search/filter.'}
                        </Typography>
                        {tableData.length > 0 && (
                            <Button
                                size="sm"
                                variant="plain"
                                color="primary"
                                onClick={() => {
                                    setSearchTerm('')
                                    setSelectedOutlet('ALL')
                                }}
                            >
                                Clear filters
                            </Button>
                        )}
                    </Box>
                ) : (
                    <Table
                        borderAxis="both"
                        stickyHeader
                        size="sm"
                        hoverRow
                        sx={{
                            minWidth: 850,
                            tableLayout: 'fixed',
                            '& th': {
                                fontSize: '12.5px',
                                fontWeight: 700,
                                py: 1.2,
                                px: 1.5,
                                backgroundColor: '#f1f5f9',
                                color: '#1e293b',
                                verticalAlign: 'middle',
                                borderBottom: '2px solid #cbd5e1',
                                borderRight: '1px solid #e2e8f0'
                            },
                            '& td': {
                                fontSize: '13px',
                                py: 1,
                                px: 1.5,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                borderRight: '1px solid #e2e8f0',
                                borderBottom: '1px solid #e2e8f0'
                            },
                            '& tbody tr:nth-of-type(even)': {
                                backgroundColor: '#f8fafc'
                            },
                            '& tbody tr:hover': {
                                backgroundColor: '#eff6ff'
                            },
                            '& tfoot th': {
                                py: 1.2,
                                px: 1.5,
                                backgroundColor: '#e2e8f0',
                                color: '#0f172a',
                                fontWeight: 700,
                                fontSize: '13px',
                                borderTop: '2px solid #94a3b8'
                            }
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={{ width: '65px', textAlign: 'center' }}>Sl No</th>
                                <th style={{ width: '260px', textAlign: 'left' }}>Nursing Station</th>
                                <th style={{ width: '180px', textAlign: 'left' }}>Outlet / Location</th>
                                <th style={{ width: '110px', textAlign: 'center' }}>Total Beds</th>
                                <th style={{ width: '120px', textAlign: 'center' }}>Occupied Beds</th>
                                <th style={{ width: '135px', textAlign: 'center' }}>Admitted Patients</th>
                                <th style={{ width: '125px', textAlign: 'center' }}>Available Beds</th>
                                <th style={{ width: '110px', textAlign: 'center' }}>Not Ready</th>
                                <th style={{ width: '130px', textAlign: 'center' }}>Occupancy %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, index) => {
                                const totalBeds = Number(row.bed_count ?? row.BED_COUNT ?? 0)
                                const occupied = Number(row.OCCUPIED_BEDS || 0)
                                const available = Number(row.AVAILABLE_BEDS || 0)
                                const notReady = Number(row.NOT_READY || 0)
                                const admitted = Number(row.ADMITTED_PATIENTS || 0)

                                const occupancyRate = totalBeds > 0 ? ((occupied / totalBeds) * 100).toFixed(1) : '0.0'
                                const occupancyVal = parseFloat(occupancyRate)

                                return (
                                    <tr key={row.NS_CODE ?? `${row.NURSING_STATION}_${index}`}>
                                        <td style={{ textAlign: 'center', color: '#64748b', fontWeight: 500 }}>
                                            {index + 1}
                                        </td>
                                        <td style={{ textAlign: 'left', fontWeight: 600, color: '#1e293b' }}>
                                            {row.NURSING_STATION || '-'}
                                        </td>
                                        <td style={{ textAlign: 'left' }}>
                                            {row.OUTLET_NAME ? (
                                                <Chip
                                                    size="sm"
                                                    variant="soft"
                                                    color="neutral"
                                                    sx={{ borderRadius: '6px', fontSize: '11.5px', fontWeight: 500 }}
                                                >
                                                    {row.OUTLET_NAME}
                                                </Chip>
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                        <td style={{ textAlign: 'center', fontWeight: 600, color: '#0f172a' }}>
                                            {totalBeds}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <Chip
                                                size="sm"
                                                variant="soft"
                                                color={occupied > 0 ? 'warning' : 'neutral'}
                                                sx={{ borderRadius: '6px', fontWeight: 600, minWidth: 36 }}
                                            >
                                                {occupied}
                                            </Chip>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <Chip
                                                size="sm"
                                                variant="soft"
                                                color={admitted > 0 ? 'primary' : 'neutral'}
                                                sx={{ borderRadius: '6px', fontWeight: 600, minWidth: 36 }}
                                            >
                                                {admitted}
                                            </Chip>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <Chip
                                                size="sm"
                                                variant="soft"
                                                color={available > 0 ? 'success' : 'neutral'}
                                                sx={{ borderRadius: '6px', fontWeight: 600, minWidth: 36 }}
                                            >
                                                {available}
                                            </Chip>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <Chip
                                                size="sm"
                                                variant="soft"
                                                color={notReady > 0 ? 'danger' : 'neutral'}
                                                sx={{ borderRadius: '6px', fontWeight: 600, minWidth: 36 }}
                                            >
                                                {notReady}
                                            </Chip>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <Chip
                                                size="sm"
                                                variant="solid"
                                                color={
                                                    occupancyVal >= 90
                                                        ? 'danger'
                                                        : occupancyVal >= 70
                                                            ? 'warning'
                                                            : 'success'
                                                }
                                                sx={{ borderRadius: '6px', fontWeight: 600, minWidth: 54 }}
                                            >
                                                {occupancyRate}%
                                            </Chip>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th style={{ textAlign: 'center' }}>TOTAL</th>
                                <th style={{ textAlign: 'left' }}>
                                    {summaryStats.totalStations} Stations
                                </th>
                                <th style={{ textAlign: 'left' }}>-</th>
                                <th style={{ textAlign: 'center', color: '#1e40af' }}>
                                    {summaryStats.totalBeds}
                                </th>
                                <th style={{ textAlign: 'center', color: '#854d0e' }}>
                                    {summaryStats.occupiedBeds}
                                </th>
                                <th style={{ textAlign: 'center', color: '#6b21a8' }}>
                                    {summaryStats.admittedPatients}
                                </th>
                                <th style={{ textAlign: 'center', color: '#166534' }}>
                                    {summaryStats.availableBeds}
                                </th>
                                <th style={{ textAlign: 'center', color: '#9f1239' }}>
                                    {summaryStats.notReady}
                                </th>
                                <th style={{ textAlign: 'center' }}>
                                    <Chip
                                        size="sm"
                                        variant="solid"
                                        color={
                                            parseFloat(summaryStats.occupancyRate) >= 90
                                                ? 'danger'
                                                : parseFloat(summaryStats.occupancyRate) >= 70
                                                    ? 'warning'
                                                    : 'success'
                                        }
                                        sx={{ borderRadius: '6px', fontWeight: 700 }}
                                    >
                                        {summaryStats.occupancyRate}%
                                    </Chip>
                                </th>
                            </tr>
                        </tfoot>
                    </Table>
                )}
            </Sheet>
        </CardMasterClose>
    )
}

export default memo(BedStatusReport)