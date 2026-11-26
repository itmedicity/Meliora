import React, { memo } from 'react'
import {
    Box,
    CssVarsProvider,
    Input,
    Typography,
    Sheet,
    Chip,
    Select,
    Option,
    Button,
    Divider,
    Tooltip
} from '@mui/joy'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import DownloadIcon from '@mui/icons-material/Download'
import ClearIcon from '@mui/icons-material/Clear'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PersonIcon from '@mui/icons-material/Person'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import moment from 'moment'

const WaitingReportToolbar = ({
    dailyDateFrom,
    setDailyDateFrom,
    dailyDateTo,
    setDailyDateTo,
    SearchDetails,
    loading,
    tableDataLength,
    filteredDataLength,
    onExportClick,
    showExport = true,
    selectedDepartment,
    setSelectedDepartment,
    departmentList = [],
    selectedDoctor,
    setSelectedDoctor,
    doctorList = [],
    searchTerm,
    setSearchTerm,
    averageStats
}) => {
    const hasData = tableDataLength > 0
    const isFiltered = (selectedDepartment && selectedDepartment !== 'ALL') || (selectedDoctor && selectedDoctor !== 'ALL')

    const getChipColor = (lvl) => {
        if (lvl === 'optimal') return 'success'
        return 'danger'
    }

    return (
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
            {/* ROW 1: PRIMARY DATE CONTROLS, SEARCH, AND EXPORT */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1.5
                }}
            >
                {/* DATE RANGE & PRIMARY SEARCH BUTTON */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
                    {/* FROM DATE */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography level="body-xs" sx={{ fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                            From
                        </Typography>
                        <CssVarsProvider>
                            <Input
                                size="sm"
                                type="date"
                                name="dailyDateFrom"
                                value={dailyDateFrom}
                                startDecorator={<CalendarMonthIcon sx={{ color: '#4f46e5', fontSize: 18 }} />}
                                slotProps={{
                                    input: {
                                        max: moment(new Date()).format('YYYY-MM-DD')
                                    }
                                }}
                                onChange={e => setDailyDateFrom(e.target.value)}
                                sx={{ minWidth: 165, height: 36, borderRadius: '6px' }}
                            />
                        </CssVarsProvider>
                    </Box>

                    {/* TO DATE */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography level="body-xs" sx={{ fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                            To
                        </Typography>
                        <CssVarsProvider>
                            <Input
                                size="sm"
                                type="date"
                                name="dailyDateTo"
                                value={dailyDateTo}
                                startDecorator={<CalendarMonthIcon sx={{ color: '#4f46e5', fontSize: 18 }} />}
                                slotProps={{
                                    input: {
                                        max: moment(new Date()).format('YYYY-MM-DD')
                                    }
                                }}
                                onChange={e => setDailyDateTo(e.target.value)}
                                sx={{ minWidth: 165, height: 36, borderRadius: '6px' }}
                            />
                        </CssVarsProvider>
                    </Box>

                    {/* SEARCH REPORT BUTTON */}
                    <Button
                        size="sm"
                        variant="solid"
                        color="primary"
                        onClick={SearchDetails}
                        loading={loading}
                        startDecorator={<SearchOutlinedIcon />}
                        sx={{
                            height: 36,
                            px: 2.2,
                            borderRadius: '6px',
                            fontWeight: 600,
                            bgcolor: '#4f46e5',
                            '&:hover': { bgcolor: '#4338ca' },
                            boxShadow: '0 1px 3px rgba(79, 70, 229, 0.3)'
                        }}
                    >
                        Search Report
                    </Button>
                </Box>

                {/* RIGHT SIDE: SUMMARY BADGES & EXPORT BUTTON */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                    {hasData && averageStats && averageStats.hasData && (
                        <Tooltip title="Average time taken by patient to see the doctor" arrow placement="top">
                            <Chip
                                variant="soft"
                                color={getChipColor(averageStats.level)}
                                size="md"
                                startDecorator={<TimerOutlinedIcon sx={{ fontSize: 17 }} />}
                                sx={{ fontWeight: 700, height: 34, borderRadius: '6px', px: 1.5 }}
                            >
                                Avg Wait: {averageStats.displayString}
                            </Chip>
                        </Tooltip>
                    )}

                    {hasData && (
                        <Chip
                            variant="soft"
                            color={filteredDataLength !== tableDataLength ? "warning" : "primary"}
                            size="md"
                            sx={{ fontWeight: 600, height: 34, borderRadius: '6px', px: 1.5 }}
                        >
                            {filteredDataLength !== tableDataLength
                                ? `Showing ${filteredDataLength} of ${tableDataLength}`
                                : `Total Records: ${tableDataLength}`}
                        </Chip>
                    )}

                    {showExport && Boolean(onExportClick) && (
                        <Button
                            size="sm"
                            variant="outlined"
                            color="success"
                            onClick={onExportClick}
                            disabled={filteredDataLength === 0}
                            startDecorator={<DownloadIcon />}
                            sx={{
                                height: 36,
                                px: 2,
                                borderRadius: '6px',
                                fontWeight: 600,
                                borderColor: '#16a34a',
                                color: '#16a34a',
                                '&:hover': { bgcolor: '#f0fdf4', borderColor: '#15803d' }
                            }}
                        >
                            Export Excel
                        </Button>
                    )}
                </Box>
            </Box>

            {/* HORIZONTAL DIVIDER */}
            <Divider sx={{ my: 0.2, bgcolor: '#f1f5f9' }} />

            {/* ROW 2: ADVANCED FILTERS AND LIVE SEARCH */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: 1.5
                }}
            >
                {/* 1) DEPARTMENT SELECTOR */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 260 }}>
                    <Typography level="body-xs" sx={{ fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Dept
                    </Typography>
                    <CssVarsProvider>
                        <Select
                            size="sm"
                            value={selectedDepartment}
                            onChange={(e, newValue) => {
                                setSelectedDepartment(newValue || 'ALL')
                                setSelectedDoctor('ALL')
                            }}
                            placeholder="All Departments"
                            disabled={!hasData}
                            startDecorator={<FilterAltIcon sx={{ color: '#4f46e5', fontSize: 18 }} />}
                            sx={{
                                flex: 1,
                                height: 36,
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: 500
                            }}
                        >
                            <Option value="ALL">All Departments ({departmentList.length})</Option>
                            {departmentList.map(dept => (
                                <Option key={dept} value={dept}>
                                    {dept}
                                </Option>
                            ))}
                        </Select>
                    </CssVarsProvider>
                </Box>

                {/* 2) DOCTOR SELECTOR */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 240 }}>
                    <Typography level="body-xs" sx={{ fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Doctor
                    </Typography>
                    <CssVarsProvider>
                        <Select
                            size="sm"
                            value={selectedDoctor}
                            onChange={(e, newValue) => setSelectedDoctor(newValue || 'ALL')}
                            placeholder="All Doctors"
                            disabled={!hasData}
                            startDecorator={<PersonIcon sx={{ color: '#4f46e5', fontSize: 18 }} />}
                            sx={{
                                flex: 1,
                                height: 36,
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: 500
                            }}
                        >
                            <Option value="ALL">All Doctors ({doctorList.length})</Option>
                            {doctorList.map(doc => (
                                <Option key={doc} value={doc}>
                                    {doc}
                                </Option>
                            ))}
                        </Select>
                    </CssVarsProvider>
                </Box>

                {/* 3) REAL-TIME SEARCH KEYWORD FILTER */}
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 260, ml: 'auto' }}>
                    <CssVarsProvider>
                        <Input
                            size="sm"
                            placeholder="Search by patient, OP no, doctor, dept..."
                            value={searchTerm}
                            disabled={!hasData}
                            onChange={e => setSearchTerm(e.target.value)}
                            startDecorator={<SearchOutlinedIcon sx={{ color: '#94a3b8', fontSize: 18 }} />}
                            endDecorator={
                                searchTerm ? (
                                    <ClearIcon
                                        fontSize="small"
                                        sx={{ cursor: 'pointer', color: '#888', '&:hover': { color: '#000' } }}
                                        onClick={() => setSearchTerm('')}
                                    />
                                ) : null
                            }
                            sx={{
                                width: '100%',
                                height: 36,
                                borderRadius: '6px',
                                fontSize: '13px'
                            }}
                        />
                    </CssVarsProvider>
                </Box>
            </Box>

            {/* ROW 3: AVERAGE WAITING TIME BANNER (HIGHLIGHTS ON SELECTION) */}
            {hasData && averageStats && (
                <>
                    <Divider sx={{ my: 0.1, bgcolor: '#f1f5f9' }} />
                    <Box
                        sx={{
                            p: 1.5,
                            borderRadius: '8px',
                            bgcolor: isFiltered
                                ? (averageStats.level === 'optimal' ? '#f0fdf4' : '#fef2f2')
                                : '#f8fafc',
                            border: '1.5px solid',
                            borderColor: isFiltered
                                ? (averageStats.level === 'optimal' ? '#86efac' : '#fca5a5')
                                : '#e2e8f0',
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 1.5,
                            transition: 'all 0.25s ease'
                        }}
                    >
                        {/* LEFT: ICON & AVERAGE VALUE */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box
                                sx={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: averageStats.level === 'optimal' ? '#dcfce7' : '#fee2e2',
                                    color: averageStats.level === 'optimal' ? '#15803d' : '#b91c1c'
                                }}
                            >
                                <TimerOutlinedIcon sx={{ fontSize: 26 }} />
                            </Box>
                            <Box>
                                <Typography
                                    level="body-xs"
                                    sx={{
                                        fontWeight: 700,
                                        color: isFiltered ? '#1e293b' : '#64748b',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}
                                >
                                    {selectedDoctor !== 'ALL' && selectedDepartment !== 'ALL'
                                        ? `Average Time to See Doctor — ${selectedDoctor} (${selectedDepartment})`
                                        : selectedDoctor !== 'ALL'
                                        ? `Average Time to See Doctor — ${selectedDoctor}`
                                        : selectedDepartment !== 'ALL'
                                        ? `Average Time to See Doctor — ${selectedDepartment}`
                                        : 'Overall Hospital OP Average Time to See Doctor'}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                                    <Typography
                                        level="h4"
                                        sx={{
                                            fontWeight: 800,
                                            fontSize: '1.45rem',
                                            color: averageStats.level === 'optimal' ? '#15803d' : '#b91c1c'
                                        }}
                                    >
                                        {averageStats.displayString}
                                    </Typography>
                                    <Chip
                                        size="sm"
                                        variant="outlined"
                                        sx={{
                                            fontFamily: 'monospace',
                                            fontWeight: 700,
                                            fontSize: '12px',
                                            color: '#334155',
                                            borderColor: '#cbd5e1'
                                        }}
                                    >
                                        ⏱ {averageStats.formattedHHMMSS}
                                    </Chip>
                                </Box>
                            </Box>
                        </Box>

                        {/* RIGHT: CONSULTATIONS COUNT & STATUS BENCHMARK */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                            <Chip
                                variant="soft"
                                color="neutral"
                                size="sm"
                                sx={{ fontWeight: 600, fontSize: '12px' }}
                            >
                                Evaluated: {averageStats.count} Consultations
                            </Chip>

                            <Chip
                                variant="solid"
                                color={getChipColor(averageStats.level)}
                                size="sm"
                                sx={{ fontWeight: 700, fontSize: '11px', px: 1.2 }}
                            >
                                {averageStats.level === 'optimal'
                                    ? 'Within Target (≤ 26 mins)'
                                    : 'High Wait Time (> 26 mins)'}
                            </Chip>
                        </Box>
                    </Box>
                </>
            )}
        </Sheet>
    )
}

export default memo(WaitingReportToolbar)
