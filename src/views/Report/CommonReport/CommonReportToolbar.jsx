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
    Checkbox,
    Button,
    Divider
} from '@mui/joy'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import DownloadIcon from '@mui/icons-material/Download'
import ClearIcon from '@mui/icons-material/Clear'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import moment from 'moment'

const CommonReportToolbar = ({
    dailyDateFrom,
    setDailyDateFrom,
    dailyDateTo,
    setDailyDateTo,
    SearchDetails,
    loading,
    tableDataLength,
    filteredDataLength,
    onExportClick,
    selectedDepartment,
    setSelectedDepartment,
    departmentList,
    excludeOncology,
    setExcludeOncology,
    excludeObservation,
    setExcludeObservation,
    onlyWithDischargeAnnounced,
    setOnlyWithDischargeAnnounced,
    searchTerm,
    setSearchTerm
}) => {
    const hasData = tableDataLength > 0

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

                {/* RIGHT SIDE: SUMMARY BADGE & EXPORT BUTTON */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                            onChange={(e, newValue) => setSelectedDepartment(newValue || 'ALL')}
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

                {/* 2) WITHOUT ONCOLOGY DAY CARE TOGGLE PILL */}
                <Box
                    onClick={() => hasData && setExcludeOncology(!excludeOncology)}
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 1.5,
                        height: 36,
                        borderRadius: '6px',
                        cursor: hasData ? 'pointer' : 'default',
                        opacity: hasData ? 1 : 0.6,
                        userSelect: 'none',
                        border: '1px solid',
                        borderColor: excludeOncology ? '#3b82f6' : '#cbd5e1',
                        bgcolor: excludeOncology ? '#eff6ff' : '#f8fafc',
                        transition: 'all 0.2s ease',
                        '&:hover': hasData ? {
                            borderColor: '#3b82f6',
                            bgcolor: '#f0f7ff'
                        } : {}
                    }}
                >
                    <CssVarsProvider>
                        <Checkbox
                            size="sm"
                            color="primary"
                            checked={excludeOncology}
                            onChange={e => setExcludeOncology(e.target.checked)}
                            disabled={!hasData}
                            sx={{ pointerEvents: 'none' }}
                        />
                    </CssVarsProvider>
                    <Typography
                        level="body-xs"
                        sx={{
                            fontWeight: 600,
                            fontSize: '12.5px',
                            color: excludeOncology ? '#1d4ed8' : '#334155'
                        }}
                    >
                        Without Oncology Day Care
                    </Typography>
                </Box>

                {/* 3) WITHOUT OBSERVATION (ADMISSION REASON) TOGGLE PILL */}
                <Box
                    onClick={() => hasData && setExcludeObservation(!excludeObservation)}
                    title="Exclude patients with Admission Reason as Observation"
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 1.5,
                        height: 36,
                        borderRadius: '6px',
                        cursor: hasData ? 'pointer' : 'default',
                        opacity: hasData ? 1 : 0.6,
                        userSelect: 'none',
                        border: '1px solid',
                        borderColor: excludeObservation ? '#3b82f6' : '#cbd5e1',
                        bgcolor: excludeObservation ? '#eff6ff' : '#f8fafc',
                        transition: 'all 0.2s ease',
                        '&:hover': hasData ? {
                            borderColor: '#3b82f6',
                            bgcolor: '#f0f7ff'
                        } : {}
                    }}
                >
                    <CssVarsProvider>
                        <Checkbox
                            size="sm"
                            color="primary"
                            checked={excludeObservation}
                            onChange={e => setExcludeObservation(e.target.checked)}
                            disabled={!hasData}
                            sx={{ pointerEvents: 'none' }}
                        />
                    </CssVarsProvider>
                    <Typography
                        level="body-xs"
                        sx={{
                            fontWeight: 600,
                            fontSize: '12.5px',
                            color: excludeObservation ? '#1d4ed8' : '#334155'
                        }}
                    >
                        Without Observation
                    </Typography>
                </Box>

                {/* 4) DISCHARGE ANNOUNCED ONLY TOGGLE PILL */}
                <Box
                    onClick={() => hasData && setOnlyWithDischargeAnnounced(!onlyWithDischargeAnnounced)}
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 1.5,
                        height: 36,
                        borderRadius: '6px',
                        cursor: hasData ? 'pointer' : 'default',
                        opacity: hasData ? 1 : 0.6,
                        userSelect: 'none',
                        border: '1px solid',
                        borderColor: onlyWithDischargeAnnounced ? '#3b82f6' : '#cbd5e1',
                        bgcolor: onlyWithDischargeAnnounced ? '#eff6ff' : '#f8fafc',
                        transition: 'all 0.2s ease',
                        '&:hover': hasData ? {
                            borderColor: '#3b82f6',
                            bgcolor: '#f0f7ff'
                        } : {}
                    }}
                >
                    <CssVarsProvider>
                        <Checkbox
                            size="sm"
                            color="primary"
                            checked={onlyWithDischargeAnnounced}
                            onChange={e => setOnlyWithDischargeAnnounced(e.target.checked)}
                            disabled={!hasData}
                            sx={{ pointerEvents: 'none' }}
                        />
                    </CssVarsProvider>
                    <Typography
                        level="body-xs"
                        sx={{
                            fontWeight: 600,
                            fontSize: '12.5px',
                            color: onlyWithDischargeAnnounced ? '#1d4ed8' : '#334155'
                        }}
                    >
                        Discharge Announced Only
                    </Typography>
                </Box>

                {/* 5) REAL-TIME SEARCH KEYWORD FILTER */}
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 260, ml: 'auto' }}>
                    <CssVarsProvider>
                        <Input
                            size="sm"
                            placeholder="Search by patient, IP no, doctor, bed..."
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
        </Sheet>
    )
}

export default memo(CommonReportToolbar)
