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
import HotelIcon from '@mui/icons-material/Hotel'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import moment from 'moment'

const IcuReadmissionToolbar = ({
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
    readmissionStats
}) => {
    const hasData = tableDataLength > 0
    const isFiltered = (selectedDepartment && selectedDepartment !== 'ALL') || (selectedDoctor && selectedDoctor !== 'ALL')

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
                {/* DATE RANGE & SEARCH BUTTON */}
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
                    {hasData && readmissionStats && readmissionStats.hasData && (
                        <Tooltip title="Average duration between ICU release and readmission" arrow placement="top">
                            <Chip
                                variant="soft"
                                color="warning"
                                size="md"
                                startDecorator={<AccessTimeIcon sx={{ fontSize: 17 }} />}
                                sx={{ fontWeight: 700, height: 34, borderRadius: '6px', px: 1.5 }}
                            >
                                Avg Readmit: {readmissionStats.displayString}
                            </Chip>
                        </Tooltip>
                    )}

                    {hasData && (
                        <Chip
                            variant="soft"
                            color={filteredDataLength !== tableDataLength ? "warning" : "primary"}
                            size="md"
                            startDecorator={<HotelIcon sx={{ fontSize: 17 }} />}
                            sx={{ fontWeight: 600, height: 34, borderRadius: '6px', px: 1.5 }}
                        >
                            {filteredDataLength !== tableDataLength
                                ? `Showing ${filteredDataLength} of ${tableDataLength}`
                                : `Total Readmissions: ${tableDataLength}`}
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

            {/* ROW 2: DEPARTMENT FILTER, DOCTOR FILTER, AND LIVE SEARCH */}
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

                {/* 3) REAL-TIME KEYWORD SEARCH FILTER */}
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 260, ml: 'auto' }}>
                    <CssVarsProvider>
                        <Input
                            size="sm"
                            placeholder="Search by patient, IP no, doctor, dept..."
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

            {/* ROW 3: ICU READMISSION KPI SUMMARY BANNER */}
            {hasData && readmissionStats && (
                <>
                    <Divider sx={{ my: 0.1, bgcolor: '#f1f5f9' }} />
                    <Box
                        sx={{
                            p: 1.5,
                            borderRadius: '8px',
                            bgcolor: '#fff7ed',
                            border: '1.5px solid',
                            borderColor: '#fed7aa',
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 1.5,
                            transition: 'all 0.25s ease'
                        }}
                    >
                        {/* LEFT: ICON & AVERAGE HOURS VALUE */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box
                                sx={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: '#ffedd5',
                                    color: '#c2410c'
                                }}
                            >
                                <WarningAmberIcon sx={{ fontSize: 26 }} />
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
                                        ? `ICU Readmission Summary — ${selectedDoctor} (${selectedDepartment})`
                                        : selectedDoctor !== 'ALL'
                                            ? `ICU Readmission Summary — ${selectedDoctor}`
                                            : selectedDepartment !== 'ALL'
                                                ? `ICU Readmission Summary — ${selectedDepartment}`
                                                : 'Hospital ICU Readmissions within 48 Hours'}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                                    <Typography
                                        level="h4"
                                        sx={{
                                            fontWeight: 800,
                                            fontSize: '1.45rem',
                                            color: '#c2410c'
                                        }}
                                    >
                                        Avg: {readmissionStats.displayString}
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
                                        ⏱ {readmissionStats.formattedAvgHours}
                                    </Chip>
                                </Box>
                            </Box>
                        </Box>

                        {/* RIGHT: READMISSION COUNTS & CLINICAL BREAKDOWN */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                            <Chip
                                variant="soft"
                                color="neutral"
                                size="sm"
                                sx={{ fontWeight: 600, fontSize: '12px' }}
                            >
                                Total: {readmissionStats.count} Patients
                            </Chip>

                            {readmissionStats.within24Count > 0 && (
                                <Tooltip title="Critical: Patients returned to ICU within 24 hours of transfer out" arrow placement="top">
                                    <Chip
                                        variant="solid"
                                        color="danger"
                                        size="sm"
                                        sx={{ fontWeight: 700, fontSize: '11px', px: 1.2 }}
                                    >
                                        ≤ 24h: {readmissionStats.within24Count} ({readmissionStats.within24Pct}%)
                                    </Chip>
                                </Tooltip>
                            )}

                            {readmissionStats.between24And48Count > 0 && (
                                <Tooltip title="Patients returned to ICU between 24 and 48 hours of transfer out" arrow placement="top">
                                    <Chip
                                        variant="solid"
                                        color="warning"
                                        size="sm"
                                        sx={{ fontWeight: 700, fontSize: '11px', px: 1.2 }}
                                    >
                                        24–48h: {readmissionStats.between24And48Count} ({readmissionStats.between24And48Pct}%)
                                    </Chip>
                                </Tooltip>
                            )}

                            {/* {readmissionStats.minHours > 0 && (
                                <Chip
                                    variant="outlined"
                                    color="neutral"
                                    size="sm"
                                    sx={{ fontWeight: 600, fontSize: '11px' }}
                                >
                                    Quickest: {readmissionStats.minHours} hrs
                                </Chip>
                            )} */}
                        </Box>
                    </Box>
                </>
            )}
        </Sheet>
    )
}

export default memo(IcuReadmissionToolbar)
