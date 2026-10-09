import React, { memo, useState } from 'react'
import {
    Box,
    Button,
    CircularProgress,
    Input,
    Option,
    Select,
    Sheet,
    Tooltip
} from '@mui/joy'
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined'
import RefreshIcon from '@mui/icons-material/Refresh'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import DownloadIcon from '@mui/icons-material/Download'

const BedStatusToolbar = ({
    loading,
    hasFetched,
    fetchBedStatus,
    selectedOutlet,
    setSelectedOutlet,
    outletList,
    totalActiveStations,
    searchTerm,
    setSearchTerm,
    handleExportExcel,
    exportDisabled
}) => {
    const [isExporting, setIsExporting] = useState(false)

    const handleExport = () => {
        if (exportDisabled || isExporting) return
        setIsExporting(true)
        handleExportExcel()
        setTimeout(() => setIsExporting(false), 900)
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
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1.5
                }}
            >
                {/* PRIMARY ACTION BUTTONS */}
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
                                startDecorator={
                                    <RefreshIcon
                                        className="refresh-btn-icon"
                                        sx={{
                                            fontSize: 20,
                                            color: loading ? '#2563eb' : '#475569',
                                            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            animation: loading ? 'smoothSpin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite' : 'none',
                                            '@keyframes smoothSpin': {
                                                '0%': { transform: 'rotate(0deg)' },
                                                '100%': { transform: 'rotate(360deg)' }
                                            }
                                        }}
                                    />
                                }
                                sx={{
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    borderColor: loading ? '#93c5fd' : '#cbd5e1',
                                    color: loading ? '#1e40af' : '#334155',
                                    bgcolor: loading ? '#eff6ff' : '#ffffff',
                                    boxShadow: loading
                                        ? '0 0 0 3px rgba(59, 130, 246, 0.2), 0 2px 8px rgba(37, 99, 235, 0.12)'
                                        : '0 1px 3px rgba(15, 23, 42, 0.05)',
                                    transition: 'all 0.25s ease',
                                    '&:hover:not(:disabled)': {
                                        bgcolor: '#eff6ff',
                                        borderColor: '#3b82f6',
                                        color: '#1e40af',
                                        transform: 'translateY(-1px)',
                                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)',
                                        '& .refresh-btn-icon': {
                                            color: '#2563eb',
                                            transform: loading ? 'none' : 'rotate(180deg)'
                                        }
                                    },
                                    '&:active:not(:disabled)': {
                                        transform: 'scale(0.97)',
                                        '& .refresh-btn-icon': {
                                            transform: 'rotate(360deg)'
                                        }
                                    }
                                }}
                            >
                                {loading ? 'Refreshing...' : 'Refresh'}
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
                                <Option value="ALL">All Outlets ({totalActiveStations})</Option>
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
                            startDecorator={
                                <DownloadIcon
                                    className="download-icon"
                                    sx={{
                                        fontSize: 18,
                                        transition: 'transform 0.25s ease',
                                        animation: isExporting ? 'downloadBounce 0.6s ease-in-out infinite' : 'none',
                                        '@keyframes downloadBounce': {
                                            '0%, 100%': { transform: 'translateY(0)' },
                                            '50%': { transform: 'translateY(4px)' }
                                        }
                                    }}
                                />
                            }
                            onClick={handleExport}
                            disabled={exportDisabled || isExporting}
                            sx={{
                                borderRadius: '8px',
                                fontWeight: 600,
                                borderColor: isExporting ? '#059669' : '#10b981',
                                color: '#047857',
                                bgcolor: isExporting ? '#dcfce7' : '#ffffff',
                                boxShadow: isExporting
                                    ? '0 0 0 3px rgba(16, 185, 129, 0.25), 0 2px 8px rgba(16, 185, 129, 0.2)'
                                    : '0 1px 3px rgba(15, 23, 42, 0.05)',
                                transition: 'all 0.25s ease',
                                '&:hover:not(:disabled)': {
                                    bgcolor: '#ecfdf5',
                                    borderColor: '#059669',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
                                    '& .download-icon': {
                                        transform: 'translateY(2px)'
                                    }
                                },
                                '&:active:not(:disabled)': {
                                    transform: 'scale(0.96)',
                                    '& .download-icon': {
                                        transform: 'translateY(4px)'
                                    }
                                }
                            }}
                        >
                            {isExporting ? 'Exporting...' : 'Export Excel'}
                        </Button>
                    </Box>
                )}
            </Box>
        </Sheet>
    )
}

export default memo(BedStatusToolbar)
