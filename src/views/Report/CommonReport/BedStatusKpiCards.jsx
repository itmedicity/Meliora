import React, { memo } from 'react'
import { Box, Sheet, Typography } from '@mui/joy'
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined'
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

const BedStatusKpiCards = ({ summaryStats }) => {
    return (
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
                    borderRadius: '12px',
                    bgcolor: '#f8fafc',
                    borderLeft: '4px solid #64748b',
                    boxShadow: '0 2px 8px -2px rgba(15, 23, 42, 0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.8,
                    transition: 'all 0.25s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 16px -2px rgba(100, 116, 139, 0.2)',
                        '& .animated-kpi-icon': {
                            transform: 'scale(1.15)'
                        }
                    }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography level="body-xs" sx={{ color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                        Stations
                    </Typography>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '8px',
                            bgcolor: '#e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(100, 116, 139, 0.15)',
                            '& .animated-kpi-icon': {
                                fontSize: 19,
                                color: '#475569',
                                transition: 'transform 0.2s ease',
                                animation: 'floatStation 2.4s ease-in-out infinite'
                            },
                            '@keyframes floatStation': {
                                '0%, 100%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-3.5px)' }
                            }
                        }}
                    >
                        <MeetingRoomOutlinedIcon className="animated-kpi-icon" />
                    </Box>
                </Box>
                <Typography level="h4" sx={{ fontWeight: 800, color: '#1e293b', fontSize: '1.45rem' }}>
                    {summaryStats.totalStations}
                </Typography>
            </Sheet>

            {/* Total Beds */}
            <Sheet
                variant="outlined"
                sx={{
                    p: 1.5,
                    borderRadius: '12px',
                    bgcolor: '#eff6ff',
                    borderLeft: '4px solid #3b82f6',
                    boxShadow: '0 2px 8px -2px rgba(37, 99, 235, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.8,
                    transition: 'all 0.25s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 16px -2px rgba(37, 99, 235, 0.2)',
                        '& .animated-kpi-icon': {
                            transform: 'scale(1.15)'
                        }
                    }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography level="body-xs" sx={{ color: '#1d4ed8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                        Total Beds
                    </Typography>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '8px',
                            bgcolor: '#dbeafe',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(59, 130, 246, 0.2)',
                            '& .animated-kpi-icon': {
                                fontSize: 19,
                                color: '#2563eb',
                                transition: 'transform 0.2s ease',
                                animation: 'pulseTotalBeds 2.0s ease-in-out infinite'
                            },
                            '@keyframes pulseTotalBeds': {
                                '0%, 100%': { transform: 'scale(1)' },
                                '50%': { transform: 'scale(1.18)' }
                            }
                        }}
                    >
                        <HotelOutlinedIcon className="animated-kpi-icon" />
                    </Box>
                </Box>
                <Typography level="h4" sx={{ fontWeight: 800, color: '#1e40af', fontSize: '1.45rem' }}>
                    {summaryStats.totalBeds}
                </Typography>
            </Sheet>

            {/* Available Beds */}
            <Sheet
                variant="outlined"
                sx={{
                    p: 1.5,
                    borderRadius: '12px',
                    bgcolor: '#f0fdf4',
                    borderLeft: '4px solid #22c55e',
                    boxShadow: '0 2px 8px -2px rgba(22, 101, 52, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.8,
                    transition: 'all 0.25s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 16px -2px rgba(34, 197, 94, 0.2)',
                        '& .animated-kpi-icon': {
                            transform: 'scale(1.15)'
                        }
                    }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography level="body-xs" sx={{ color: '#15803d', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                        Available Beds
                    </Typography>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '8px',
                            bgcolor: '#dcfce7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(34, 197, 94, 0.2)',
                            '& .animated-kpi-icon': {
                                fontSize: 19,
                                color: '#16a34a',
                                transition: 'transform 0.2s ease',
                                animation: 'pulseAvailable 2.2s ease-in-out infinite'
                            },
                            '@keyframes pulseAvailable': {
                                '0%, 100%': { transform: 'scale(1)' },
                                '20%': { transform: 'scale(1.18)' },
                                '40%': { transform: 'scale(1)' },
                                '60%': { transform: 'scale(1.12)' },
                                '80%': { transform: 'scale(1)' }
                            }
                        }}
                    >
                        <CheckCircleOutlineIcon className="animated-kpi-icon" />
                    </Box>
                </Box>
                <Typography level="h4" sx={{ fontWeight: 800, color: '#166534', fontSize: '1.45rem' }}>
                    {summaryStats.availableBeds}
                </Typography>
            </Sheet>

            {/* Occupied Beds */}
            <Sheet
                variant="outlined"
                sx={{
                    p: 1.5,
                    borderRadius: '12px',
                    bgcolor: '#fefce8',
                    borderLeft: '4px solid #eab308',
                    boxShadow: '0 2px 8px -2px rgba(161, 98, 7, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.8,
                    transition: 'all 0.25s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 16px -2px rgba(234, 179, 8, 0.2)',
                        '& .animated-kpi-icon': {
                            transform: 'scale(1.15)'
                        }
                    }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography level="body-xs" sx={{ color: '#a16207', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                        Occupied Beds
                    </Typography>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '8px',
                            bgcolor: '#fef08a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(234, 179, 8, 0.2)',
                            '& .animated-kpi-icon': {
                                fontSize: 19,
                                color: '#ca8a04',
                                transition: 'transform 0.2s ease',
                                animation: 'swayOccupied 2.2s ease-in-out infinite'
                            },
                            '@keyframes swayOccupied': {
                                '0%, 100%': { transform: 'translateY(0) scale(1)' },
                                '50%': { transform: 'translateY(-3px) scale(1.12)' }
                            }
                        }}
                    >
                        <HotelOutlinedIcon className="animated-kpi-icon" />
                    </Box>
                </Box>
                <Typography level="h4" sx={{ fontWeight: 800, color: '#854d0e', fontSize: '1.45rem' }}>
                    {summaryStats.occupiedBeds}
                </Typography>
            </Sheet>

            {/* Admitted Patients */}
            <Sheet
                variant="outlined"
                sx={{
                    p: 1.5,
                    borderRadius: '12px',
                    bgcolor: '#faf5ff',
                    borderLeft: '4px solid #a855f7',
                    boxShadow: '0 2px 8px -2px rgba(126, 34, 206, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.8,
                    transition: 'all 0.25s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 16px -2px rgba(168, 85, 247, 0.2)',
                        '& .animated-kpi-icon': {
                            transform: 'scale(1.15)'
                        }
                    }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography level="body-xs" sx={{ color: '#7e22ce', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                        Admitted Patients
                    </Typography>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '8px',
                            bgcolor: '#f3e8ff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(168, 85, 247, 0.2)',
                            '& .animated-kpi-icon': {
                                fontSize: 19,
                                color: '#9333ea',
                                transition: 'transform 0.2s ease',
                                animation: 'peopleBounce 2.6s ease-in-out infinite'
                            },
                            '@keyframes peopleBounce': {
                                '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                                '25%': { transform: 'translateY(-2px) rotate(-4deg)' },
                                '75%': { transform: 'translateY(-2px) rotate(4deg)' }
                            }
                        }}
                    >
                        <PeopleAltOutlinedIcon className="animated-kpi-icon" />
                    </Box>
                </Box>
                <Typography level="h4" sx={{ fontWeight: 800, color: '#6b21a8', fontSize: '1.45rem' }}>
                    {summaryStats.admittedPatients}
                </Typography>
            </Sheet>

            {/* Not Ready */}
            <Sheet
                variant="outlined"
                sx={{
                    p: 1.5,
                    borderRadius: '12px',
                    bgcolor: '#fff1f2',
                    borderLeft: '4px solid #f43f5e',
                    boxShadow: '0 2px 8px -2px rgba(190, 18, 60, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.8,
                    transition: 'all 0.25s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 16px -2px rgba(244, 63, 94, 0.2)',
                        '& .animated-kpi-icon': {
                            transform: 'scale(1.15)'
                        }
                    }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography level="body-xs" sx={{ color: '#be123c', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                        Not Ready
                    </Typography>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '8px',
                            bgcolor: '#ffe4e6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(244, 63, 94, 0.2)',
                            '& .animated-kpi-icon': {
                                fontSize: 19,
                                color: '#e11d48',
                                transition: 'transform 0.2s ease',
                                animation: 'cautionWobble 2.2s ease-in-out infinite'
                            },
                            '@keyframes cautionWobble': {
                                '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
                                '20%': { transform: 'scale(1.16) rotate(-7deg)' },
                                '40%': { transform: 'scale(1.16) rotate(7deg)' },
                                '60%': { transform: 'scale(1.1) rotate(0deg)' },
                                '80%': { transform: 'scale(1)' }
                            }
                        }}
                    >
                        <WarningAmberIcon className="animated-kpi-icon" />
                    </Box>
                </Box>
                <Typography level="h4" sx={{ fontWeight: 800, color: '#9f1239', fontSize: '1.45rem' }}>
                    {summaryStats.notReady}
                </Typography>
            </Sheet>
        </Box>
    )
}

export default memo(BedStatusKpiCards)
