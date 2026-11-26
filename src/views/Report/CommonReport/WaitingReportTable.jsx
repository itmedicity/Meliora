import React, { memo, useMemo } from 'react'
import {
    Box,
    CircularProgress,
    Table,
    Typography,
    Sheet,
    Chip,
    Tooltip
} from '@mui/joy'

const WaitingReportTable = ({
    loading,
    tableDataLength,
    filteredData,
    columns,
    formatCellValue,
    averageStats,
    selectedDepartment,
    selectedDoctor
}) => {
    const totalWidth = useMemo(() => {
        return columns.reduce((acc, col) => acc + col.width, 0)
    }, [columns])

    return (
        <Sheet
            variant="outlined"
            sx={{
                mt: 1.5,
                width: '100%',
                borderRadius: '8px',
                overflow: 'auto',
                maxHeight: '58vh',
                bgcolor: '#ffffff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
            }}
        >
            {loading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, gap: 1.5 }}>
                    <CircularProgress size="lg" color="primary" />
                    <Typography level="body-sm" sx={{ color: '#666' }}>Fetching waiting time report data...</Typography>
                </Box>
            ) : filteredData.length === 0 ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 10 }}>
                    <Typography level="body-md" sx={{ color: '#888' }}>
                        {tableDataLength === 0 ? 'No Data Available. Select date range and click Search.' : 'No matching records found for the filter.'}
                    </Typography>
                </Box>
            ) : (
                <Table
                    borderAxis="both"
                    stickyHeader
                    size="sm"
                    hoverRow
                    sx={{
                        minWidth: `${totalWidth}px`,
                        tableLayout: 'fixed',
                        '& th': {
                            fontSize: '12px',
                            fontWeight: 600,
                            py: 1,
                            px: 1,
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                            verticalAlign: 'middle',
                            borderBottom: '2px solid #cbd5e1',
                            borderRight: '1px solid #e2e8f0'
                        },
                        '& td': {
                            fontSize: '12.5px',
                            py: 0.8,
                            px: 1,
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
                            backgroundColor: '#f1f5f9'
                        }
                    }}
                >
                    <thead>
                        <tr>
                            {columns?.map(col => {
                                // Soft color-coding by column group (same as Discharge Report)
                                let headerBg = '#f1f5f9' // general
                                if (col.group === 'timestamp') headerBg = '#e0f2fe' // light blue for timestamps
                                if (col.group === 'tat') headerBg = '#ede9fe' // light purple for TAT

                                return (
                                    <th
                                        key={col.key}
                                        style={{
                                            width: `${col.width}px`,
                                            textAlign: col.align,
                                            backgroundColor: headerBg,
                                            color: '#1e293b',
                                            padding: 0
                                        }}
                                    >
                                        <Tooltip
                                            title={
                                                <Box sx={{ p: 0.5, textAlign: 'center' }}>
                                                    <Typography
                                                        level="body-xs"
                                                        sx={{
                                                            color: '#94a3b8',
                                                            fontWeight: 600,
                                                            fontSize: '11px',
                                                            mb: 0.3,
                                                            textTransform: 'uppercase'
                                                        }}
                                                    >
                                                        {col.label}
                                                    </Typography>
                                                    <Typography
                                                        level="body-sm"
                                                        sx={{
                                                            color: '#ffffff',
                                                            fontWeight: 500,
                                                            fontSize: '12px',
                                                            lineHeight: 1.4
                                                        }}
                                                    >
                                                        {col.tooltipMl}
                                                    </Typography>
                                                </Box>
                                            }
                                            arrow
                                            placement="top"
                                            variant="solid"
                                            sx={{
                                                bgcolor: '#0f172a',
                                                color: '#ffffff',
                                                maxWidth: 280,
                                                borderRadius: '6px',
                                                boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                                                zIndex: 9999
                                            }}
                                        >
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    width: '100%',
                                                    padding: '8px',
                                                    cursor: 'help'
                                                }}
                                            >
                                                {col.label}
                                            </span>
                                        </Tooltip>
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData?.map((row, index) => (
                            <tr key={row.PTNO ? `${row.PTNO}_${row.VISITDATE || ''}_${index}` : index}>
                                {columns.map(col => {
                                    let val = row[col.key]
                                    if (col.key === "SLNO") {
                                        val = index + 1
                                    }
                                    const displayVal = formatCellValue(val, col.group === 'tat')

                                    // Waiting Time in Minutes with colored Chip badge (<= 26 mins is green, above is red)
                                    if (col.key === "WAITING_MINUTES") {
                                        if (val !== null && val !== undefined && !isNaN(val)) {
                                            const mins = Number(val)
                                            const chipColor = mins <= 26 ? 'success' : 'danger'

                                            return (
                                                <td key={col.key} style={{ textAlign: 'center' }}>
                                                    <Chip
                                                        size="sm"
                                                        variant="soft"
                                                        color={chipColor}
                                                        sx={{ fontSize: '11px', fontWeight: 600, px: 1, minHeight: 20 }}
                                                    >
                                                        {mins} min
                                                    </Chip>
                                                </td>
                                            )
                                        }
                                        return (
                                            <td key={col.key} style={{ textAlign: 'center', color: '#94a3b8' }}>
                                                -
                                            </td>
                                        )
                                    }

                                    // Monospace font styling for TAT / Waiting interval column
                                    if (col.group === 'tat') {
                                        return (
                                            <td
                                                key={col.key}
                                                style={{
                                                    textAlign: col.align,
                                                    fontFamily: 'monospace',
                                                    fontSize: '12px',
                                                    color: displayVal === '-' ? '#94a3b8' : '#1e293b'
                                                }}
                                                title={displayVal !== '-' ? displayVal : ''}
                                            >
                                                {displayVal}
                                            </td>
                                        )
                                    }

                                    return (
                                        <td
                                            key={col.key}
                                            style={{
                                                textAlign: col.align
                                            }}
                                            title={displayVal !== '-' ? displayVal : ''}
                                        >
                                            {displayVal}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>

                    {/* STICKY FOOTER DISPLAYING AVERAGE TIME TAKEN BY PATIENT TO SEE DOCTOR */}
                    {filteredData.length > 0 && averageStats && averageStats.hasData && (
                        <tfoot>
                            <tr
                                style={{
                                    backgroundColor: '#f8fafc',
                                    position: 'sticky',
                                    bottom: 0,
                                    zIndex: 2,
                                    boxShadow: '0 -2px 6px rgba(0,0,0,0.06)'
                                }}
                            >
                                <td
                                    colSpan={7}
                                    style={{
                                        textAlign: 'right',
                                        paddingRight: '16px',
                                        fontWeight: 700,
                                        fontSize: '12.5px',
                                        color: '#334155',
                                        borderTop: '2px solid #cbd5e1'
                                    }}
                                >
                                    {selectedDoctor !== 'ALL' && selectedDepartment !== 'ALL'
                                        ? `Average Time to See Doctor (${selectedDoctor} - ${selectedDepartment}):`
                                        : selectedDoctor !== 'ALL'
                                            ? `Average Time to See Doctor (${selectedDoctor}):`
                                            : selectedDepartment !== 'ALL'
                                                ? `Average Time to See Doctor (${selectedDepartment}):`
                                                : 'Overall Average Time to See Doctor:'}
                                </td>
                                <td
                                    style={{
                                        textAlign: 'center',
                                        fontFamily: 'monospace',
                                        fontWeight: 800,
                                        fontSize: '13px',
                                        color: '#1e293b',
                                        borderTop: '2px solid #cbd5e1'
                                    }}
                                >
                                    {averageStats.formattedHHMMSS}
                                </td>
                                <td
                                    style={{
                                        textAlign: 'center',
                                        borderTop: '2px solid #cbd5e1'
                                    }}
                                >
                                    <Chip
                                        size="sm"
                                        variant="solid"
                                        color={averageStats.level === 'optimal' ? 'success' : 'danger'}
                                        sx={{ fontWeight: 700, fontSize: '11px', px: 1 }}
                                    >
                                        {averageStats.displayString}
                                    </Chip>
                                </td>
                            </tr>
                        </tfoot>
                    )}
                </Table>
            )}
        </Sheet>
    )
}

export default memo(WaitingReportTable)
