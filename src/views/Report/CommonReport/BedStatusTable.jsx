import React, { memo } from 'react'
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Sheet,
    Table,
    Typography
} from '@mui/joy'
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined'

const BedStatusTable = ({
    loading,
    hasFetched,
    filteredData,
    nonZeroBedCount,
    summaryStats,
    onClearFilters
}) => {
    return (
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
                        {nonZeroBedCount === 0
                            ? 'No Bed Status records with active beds found in the database.'
                            : 'No matching stations or outlets found for the current search/filter.'}
                    </Typography>
                    {nonZeroBedCount > 0 && (
                        <Button
                            size="sm"
                            variant="plain"
                            color="primary"
                            onClick={onClearFilters}
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
                        minWidth: 980,
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
                            <th style={{ width: '135px', textAlign: 'center' }}>Admitted Patients</th>
                            <th style={{ width: '130px', textAlign: 'center' }}>Remaining Beds</th>
                            <th style={{ width: '120px', textAlign: 'center' }}>Discharged</th>
                            <th style={{ width: '125px', textAlign: 'center' }}>Available Beds</th>
                            <th style={{ width: '110px', textAlign: 'center' }}>Not Ready</th>
                            <th style={{ width: '130px', textAlign: 'center' }}>Occupancy %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row, index) => {
                            const totalBeds = Number(row.bed_count ?? 0)
                            const available = Number(row.AVAILABLE_BEDS || 0)
                            const notReady = Number(row.NOT_READY || 0)
                            const admitted = Number(row.ADMITTED_PATIENTS || 0)
                            const remainingBeds = totalBeds - admitted
                            const discharged = Number(row.DISCHARGED || 0)

                            const occupancyRate = totalBeds > 0 ? ((admitted / totalBeds) * 100).toFixed(1) : '0.0'
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
                                            color={remainingBeds > 0 ? 'success' : remainingBeds < 0 ? 'danger' : 'neutral'}
                                            sx={{ borderRadius: '6px', fontWeight: 600, minWidth: 36 }}
                                        >
                                            {remainingBeds}
                                        </Chip>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Chip
                                            size="sm"
                                            variant="soft"
                                            color={discharged > 0 ? 'warning' : 'neutral'}
                                            sx={{ borderRadius: '6px', fontWeight: 600, minWidth: 36 }}
                                        >
                                            {discharged}
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
                            <th style={{ textAlign: 'center', color: '#6b21a8' }}>
                                {summaryStats.admittedPatients}
                            </th>
                            <th style={{ textAlign: 'center', color: '#0369a1' }}>
                                {summaryStats.remainingBeds}
                            </th>
                            <th style={{ textAlign: 'center', color: '#b45309' }}>
                                {summaryStats.discharged}
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
    )
}

export default memo(BedStatusTable)
