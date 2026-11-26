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

const IcuReadmissionTable = ({
    loading,
    tableDataLength,
    filteredData,
    columns,
    formatCellValue,
    readmissionStats,
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
                    <Typography level="body-sm" sx={{ color: '#666' }}>Fetching ICU readmission report data...</Typography>
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
                                let headerBg = '#f1f5f9' // general
                                if (col.group === 'timestamp') headerBg = '#e0f2fe' // light blue for timestamps
                                if (col.group === 'tat') headerBg = '#ede9fe' // light purple for duration
                                if (col.group === 'status') headerBg = '#ffedd5' // light orange for status

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
                            <tr key={row.IP_NO ? `${row.IP_NO}_${row.ICU_RELEASE_TIME || ''}_${index}` : index}>
                                {columns.map(col => {
                                    let val = row[col.key]
                                    if (col.key === "SLNO") {
                                        val = index + 1
                                    }
                                    const displayVal = formatCellValue(val, col.group === 'tat')

                                    // Hours to readmit with colored chip badge
                                    if (col.key === "HOURS_TO_READMIT") {
                                        const hrsNum = row.HOURS_TO_READMIT_NUM
                                        if (hrsNum !== null && hrsNum !== undefined && !isNaN(hrsNum)) {
                                            const chipColor = hrsNum <= 24 ? 'danger' : 'warning'
                                            const displayStr = row.READMIT_DURATION_DISPLAY || `${hrsNum} hrs`
                                            return (
                                                <td key={col.key} style={{ textAlign: 'center' }}>
                                                    <Chip
                                                        size="sm"
                                                        variant="soft"
                                                        color={chipColor}
                                                        sx={{ fontSize: '11px', fontWeight: 700, px: 1, minHeight: 20 }}
                                                    >
                                                        {displayStr}
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

                                    // Readmission Category column
                                    if (col.key === "READMIT_CATEGORY") {
                                        const cat = row.READMIT_CATEGORY
                                        if (cat && cat !== '-') {
                                            const isUnder24 = cat.includes('24') && !cat.includes('48')
                                            return (
                                                <td key={col.key} style={{ textAlign: 'center' }}>
                                                    <Chip
                                                        size="sm"
                                                        variant="solid"
                                                        color={isUnder24 ? 'danger' : 'warning'}
                                                        sx={{ fontSize: '11px', fontWeight: 700, px: 1, minHeight: 20 }}
                                                    >
                                                        {cat}
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

                                    // Monospace font styling for timestamps
                                    if (col.group === 'timestamp') {
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

                    {/* STICKY FOOTER DISPLAYING SUMMARY TOTALS */}
                    {filteredData.length > 0 && readmissionStats && readmissionStats.hasData && (
                        <tfoot>
                            <tr
                                style={{
                                    backgroundColor: '#fff7ed',
                                    position: 'sticky',
                                    bottom: 0,
                                    zIndex: 2,
                                    boxShadow: '0 -2px 6px rgba(0,0,0,0.06)'
                                }}
                            >
                                <td
                                    colSpan={11}
                                    style={{
                                        textAlign: 'right',
                                        paddingRight: '16px',
                                        fontWeight: 700,
                                        fontSize: '12.5px',
                                        color: '#334155',
                                        borderTop: '2px solid #fdba74'
                                    }}
                                >
                                    {selectedDoctor !== 'ALL' && selectedDepartment !== 'ALL'
                                        ? `Average ICU Readmission Time (${selectedDoctor} - ${selectedDepartment}):`
                                        : selectedDoctor !== 'ALL'
                                            ? `Average ICU Readmission Time (${selectedDoctor}):`
                                            : selectedDepartment !== 'ALL'
                                                ? `Average ICU Readmission Time (${selectedDepartment}):`
                                                : 'Overall Average ICU Readmission Time:'}
                                </td>
                                <td
                                    style={{
                                        textAlign: 'center',
                                        fontFamily: 'monospace',
                                        fontWeight: 800,
                                        fontSize: '13px',
                                        color: '#c2410c',
                                        borderTop: '2px solid #fdba74'
                                    }}
                                >
                                    {readmissionStats.formattedAvgHours}
                                </td>
                                <td
                                    style={{
                                        textAlign: 'center',
                                        borderTop: '2px solid #fdba74'
                                    }}
                                >
                                    <Chip
                                        size="sm"
                                        variant="solid"
                                        color={readmissionStats.level === 'danger' ? 'danger' : 'warning'}
                                        sx={{ fontWeight: 700, fontSize: '11px', px: 1 }}
                                    >
                                        Avg: {readmissionStats.displayString}
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

export default memo(IcuReadmissionTable)
