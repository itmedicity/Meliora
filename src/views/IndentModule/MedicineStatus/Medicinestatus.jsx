import React, { memo, useCallback, useState } from 'react'
import {
    Box,
    Button,
    Typography,
    Sheet,
    Card,
    Divider,
    Stack,
    Grid,
    Input,
    Chip,
    Avatar,
} from '@mui/joy'
import { Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DescriptionIcon from '@mui/icons-material/Description'
import DownloadIcon from '@mui/icons-material/Download'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import MedicationIcon from '@mui/icons-material/Medication'
import CusIconButton from 'src/views/Components/CusIconButton'
import { useQuery } from '@tanstack/react-query'
import { getAppointmentsByRepId, getCertificateDetailsByToken } from 'src/api/masterApi'
import MedicineFilesViewModal from './MedicineFilesViewModal'

const Medicinestatus = () => {
    const history = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    const [openCertModal, setOpenCertModal] = useState(false)
    const [certData, setCertData] = useState([])
    const [selectedTokenInfo, setSelectedTokenInfo] = useState(null)

    const handleOpenCertificates = async (row) => {
        setSelectedTokenInfo({ prefix: row.prefix, token_number: row.tokenno })
        const data = await getCertificateDetailsByToken(row.token_id)
        setCertData(data)
        setOpenCertModal(true)
    }

    const backtoSetting = useCallback(() => {
        history('/Home')
    }, [history])

    const { data: fetchedAppointments = [] } = useQuery({
        queryKey: ['appointmentsByRepId', 616],
        queryFn: () => getAppointmentsByRepId(616),
        enabled: true,
    });
    const apiData = Array.isArray(fetchedAppointments) ? fetchedAppointments.map((item, index) => ({
        slNo: index + 1,
        appointmentDate: item.appointmentdate ? new Date(item.appointmentdate).toLocaleDateString('en-GB') : 'N/A',
        tokenNo: item.tokenno ? `${item.prefix || ''}${item.tokenno}` : 'N/A',
        medicineName: item.medicinename || 'N/A',
        status: 'Approved',
        token_id: item.token_id,
        prefix: item.prefix,
        tokenno: item.tokenno
    })) : [];

    // Filter data based on search
    const filteredData = apiData.filter(row =>
        row.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.tokenNo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    console.log(filteredData);

    // Common premium shadow
    const premiumShadow = '0px 4px 20px rgba(0, 0, 0, 0.03)'
    const hoverShadow = '0px 8px 25px rgba(0, 0, 0, 0.08)'

    return (
        <Paper sx={{ borderRadius: 0, width: '100%', minHeight: '100vh', backgroundColor: '#F8FAFC', pb: 4 }}>
            <MedicineFilesViewModal
                open={openCertModal}
                onClose={() => setOpenCertModal(false)}
                detailsData={certData}
                tokenCount={selectedTokenInfo}
            />
            {/* Top Navigation Bar */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
                    px: { xs: 2, sm: 4 },
                    py: 2,
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                        variant="solid"
                        sx={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            color: '#FFFFFF',
                            boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)',
                            width: 42,
                            height: 42
                        }}
                    >
                        <LocalHospitalIcon sx={{ fontSize: '22px' }} />
                    </Avatar>
                    <Box>
                        <Typography
                            level="h4"
                            sx={{
                                fontWeight: 800,
                                color: '#0F172A',
                                fontSize: '18px',
                                fontFamily: 'Outfit, Inter, sans-serif',
                                letterSpacing: '-0.02em'
                            }}
                        >
                            Medicine Details
                        </Typography>
                        <Typography level="body-xs" sx={{ color: '#64748B', fontWeight: 500, fontSize: '12px' }}>
                            Monitor and manage your active indents & approvals
                        </Typography>
                    </Box>
                </Box>
                <CusIconButton size="sm" variant="outlined" sx={{ borderColor: '#E2E8F0', color: '#64748B', '&:hover': { bgcolor: '#F1F5F9', color: '#0F172A' } }} onClick={backtoSetting}>
                    <CloseIcon fontSize="small" />
                </CusIconButton>
            </Box>

            <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: '1400px', margin: '0 auto' }}>
                {/* 1. Stat Cards Overview Grid */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid xs={12} sm={4}>
                        <Card
                            variant="plain"
                            sx={{
                                borderRadius: '16px',
                                p: 2.5,
                                backgroundColor: '#FFFFFF',
                                boxShadow: premiumShadow,
                                border: '1px solid #F1F5F9',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'pointer',
                                '&:hover': { transform: 'translateY(-4px)', boxShadow: hoverShadow }
                            }}
                        >
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(99, 102, 241, 0.1)', color: '#6366F1', display: 'flex' }}>
                                    <MedicationIcon sx={{ fontSize: '24px' }} />
                                </Box>
                                <Box>
                                    <Typography level="body-xs" sx={{ fontWeight: 700, color: '#94A3B8', fontSize: '11px', letterSpacing: '0.05em' }}>TOTAL INDENTS</Typography>
                                    <Typography level="h3" sx={{ fontWeight: 800, color: '#0F172A', fontSize: '24px', lineHeight: 1.2 }}>{apiData.length}</Typography>
                                </Box>
                            </Stack>
                        </Card>
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <Card
                            variant="plain"
                            sx={{
                                borderRadius: '16px',
                                p: 2.5,
                                backgroundColor: '#FFFFFF',
                                boxShadow: premiumShadow,
                                border: '1px solid #F1F5F9',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'pointer',
                                '&:hover': { transform: 'translateY(-4px)', boxShadow: hoverShadow }
                            }}
                        >
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex' }}>
                                    <AssignmentTurnedInIcon sx={{ fontSize: '24px' }} />
                                </Box>
                                <Box>
                                    <Typography level="body-xs" sx={{ fontWeight: 700, color: '#94A3B8', fontSize: '11px', letterSpacing: '0.05em' }}>APPROVED INDENTS</Typography>
                                    <Typography level="h3" sx={{ fontWeight: 800, color: '#0F172A', fontSize: '24px', lineHeight: 1.2 }}>{apiData.length}</Typography>
                                </Box>
                            </Stack>
                        </Card>
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <Card
                            variant="plain"
                            sx={{
                                borderRadius: '16px',
                                p: 2.5,
                                backgroundColor: '#FFFFFF',
                                boxShadow: premiumShadow,
                                border: '1px solid #F1F5F9',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'pointer',
                                '&:hover': { transform: 'translateY(-4px)', boxShadow: hoverShadow }
                            }}
                        >
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', display: 'flex' }}>
                                    <HourglassEmptyIcon sx={{ fontSize: '24px' }} />
                                </Box>
                                <Box>
                                    <Typography level="body-xs" sx={{ fontWeight: 700, color: '#94A3B8', fontSize: '11px', letterSpacing: '0.05em' }}>PENDING REVIEWS</Typography>
                                    <Typography level="h3" sx={{ fontWeight: 800, color: '#0F172A', fontSize: '24px', lineHeight: 1.2 }}>0</Typography>
                                </Box>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>

                {/* 2. Control & Search Utility Bar */}
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 3 }}
                >
                    <Input
                        placeholder="Search by medicine or token..."
                        startDecorator={<SearchIcon sx={{ fontSize: '20px', color: '#94A3B8' }} />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            width: { xs: '100%', sm: '360px' },
                            borderRadius: '12px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                            border: '1px solid #E2E8F0',
                            backgroundColor: '#FFFFFF',
                            py: 1,
                            px: 1.5,
                            '&::before': { display: 'none' },
                            '&:focus-within': { borderColor: '#6366F1', boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)' },
                            transition: 'all 0.2s'
                        }}
                    />
                    <Button
                        variant="outlined"
                        color="neutral"
                        startDecorator={<FilterAltIcon />}
                        sx={{
                            borderRadius: '12px',
                            fontWeight: 600,
                            color: '#475569',
                            borderColor: '#E2E8F0',
                            backgroundColor: '#FFFFFF',
                            width: { xs: '100%', sm: 'auto' },
                            px: 3,
                            py: 1,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                            '&:hover': { backgroundColor: '#F8FAFC', borderColor: '#CBD5E1' }
                        }}
                    >
                        Filter Results
                    </Button>
                </Stack>

                {/* 3. DESKTOP VIEW: High-end Minimalist Data Table (Visible on md and up) */}
                <Sheet
                    variant="plain"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        width: '100%',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: premiumShadow,
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #F1F5F9'
                    }}
                >
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter, sans-serif' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                                <th style={{ width: '60px', textAlign: 'center', fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '16px' }}>#</th>
                                <th style={{ width: '180px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '16px' }}>Date</th>
                                <th style={{ width: '180px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '16px' }}>Token No</th>
                                <th style={{ textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '16px' }}>Medicine Name</th>
                                <th style={{ width: '450px', textAlign: 'right', fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '16px 24px' }}>Actions & Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData?.map((row) => (
                                <tr
                                    key={row.slNo}
                                    style={{
                                        borderBottom: '1px solid #F1F5F9',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#F8FAFC';
                                        e.currentTarget.style.transform = 'scale(1.002)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    <td style={{ textAlign: 'center', fontWeight: 600, color: '#94A3B8', fontSize: '14px', padding: '16px' }}>
                                        {row.slNo.toString().padStart(2, '0')}
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <Stack direction="row" spacing={1.2} alignItems="center">
                                            <Box sx={{ p: 0.5, borderRadius: '6px', bgcolor: '#F1F5F9', color: '#64748B', display: 'flex' }}>
                                                <CalendarMonthIcon sx={{ fontSize: '16px' }} />
                                            </Box>
                                            <span style={{ fontWeight: 500, fontSize: '14px', color: '#334155' }}>{row.appointmentDate}</span>
                                        </Stack>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <Stack direction="row" spacing={1.2} alignItems="center">
                                            <Box sx={{ p: 0.5, borderRadius: '6px', bgcolor: 'rgba(99, 102, 241, 0.1)', color: '#6366F1', display: 'flex' }}>
                                                <ConfirmationNumberIcon sx={{ fontSize: '16px' }} />
                                            </Box>
                                            <span style={{ fontWeight: 700, fontSize: '14px', color: '#4F46E5' }}>{row.tokenNo}</span>
                                        </Stack>
                                    </td>
                                    <td style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A', padding: '16px' }}>
                                        {row.medicineName}
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1.5 }}>
                                            {/* Status Chip */}
                                            <Chip
                                                variant="soft"
                                                color="success"
                                                size="sm"
                                                startDecorator={<CheckCircleIcon sx={{ fontSize: '14px' }} />}
                                                sx={{
                                                    fontWeight: 700,
                                                    borderRadius: '8px',
                                                    fontSize: '11px',
                                                    py: 0.5,
                                                    px: 1.5,
                                                    bgcolor: 'rgba(16, 185, 129, 0.15)',
                                                    color: '#059669'
                                                }}
                                            >
                                                Approved
                                            </Chip>

                                            <Button
                                                variant="outlined"
                                                color="neutral"
                                                size="sm"
                                                onClick={() => handleOpenCertificates(row)}
                                                startDecorator={<DescriptionIcon sx={{ fontSize: '16px' }} />}
                                                sx={{
                                                    borderRadius: '8px',
                                                    fontWeight: 600,
                                                    fontSize: '13px',
                                                    color: '#475569',
                                                    borderColor: '#E2E8F0',
                                                    transition: 'all 0.2s',
                                                    '&:hover': { bgcolor: '#F8FAFC', color: '#0F172A' }
                                                }}
                                            >
                                                Certificates
                                            </Button>

                                            <Button
                                                variant="solid"
                                                size="sm"
                                                startDecorator={<DownloadIcon sx={{ fontSize: '16px' }} />}
                                                sx={{
                                                    borderRadius: '8px',
                                                    fontWeight: 600,
                                                    fontSize: '13px',
                                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                                    color: '#FFFFFF',
                                                    boxShadow: '0 4px 10px rgba(99, 102, 241, 0.25)',
                                                    transition: 'all 0.2s',
                                                    '&:hover': {
                                                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                                        boxShadow: '0 6px 15px rgba(99, 102, 241, 0.4)',
                                                        transform: 'translateY(-1px)'
                                                    }
                                                }}
                                            >
                                                Form
                                            </Button>
                                        </Box>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Sheet>

                {/* 4. MOBILE VIEW: Card-based list for smaller viewports */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 2 }}>
                    {filteredData?.map((row) => (
                        <Card
                            key={row.slNo}
                            variant="plain"
                            sx={{
                                borderRadius: '16px',
                                backgroundColor: '#FFFFFF',
                                p: 2.5,
                                boxShadow: premiumShadow,
                                border: '1px solid #F1F5F9',
                                transition: 'transform 0.2s',
                                '&:active': { transform: 'scale(0.98)' }
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box sx={{ display: 'flex', gap: 1.5 }}>
                                    <Avatar
                                        variant="solid"
                                        sx={{
                                            bgcolor: 'rgba(99, 102, 241, 0.1)',
                                            color: '#6366F1',
                                            fontWeight: 800,
                                            fontSize: '12px',
                                            width: 32,
                                            height: 32,
                                            borderRadius: '8px'
                                        }}
                                    >
                                        {row.slNo}
                                    </Avatar>
                                    <Box>
                                        <Typography level="title-md" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                                            {row.medicineName}
                                        </Typography>
                                        <Typography level="body-xs" sx={{ fontWeight: 700, color: '#4F46E5', mt: 0.5 }}>
                                            {row.tokenNo}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Chip
                                    variant="soft"
                                    color="success"
                                    size="sm"
                                    startDecorator={<CheckCircleIcon sx={{ fontSize: '12px' }} />}
                                    sx={{ fontWeight: 700, borderRadius: '6px', fontSize: '10px', bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#059669' }}
                                >
                                    Approved
                                </Chip>
                            </Box>

                            <Divider sx={{ mb: 2, bgcolor: '#F1F5F9' }} />

                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2.5 }}>
                                <Box sx={{ p: 0.5, borderRadius: '6px', bgcolor: '#F1F5F9', color: '#64748B', display: 'flex' }}>
                                    <CalendarMonthIcon sx={{ fontSize: '14px' }} />
                                </Box>
                                <Typography level="body-sm" sx={{ color: '#475569', fontWeight: 600 }}>
                                    {row.appointmentDate}
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1.5} sx={{ width: '100%' }}>
                                <Button
                                    variant="outlined"
                                    color="neutral"
                                    onClick={() => handleOpenCertificates(row)}
                                    startDecorator={<DescriptionIcon sx={{ fontSize: '16px' }} />}
                                    sx={{
                                        flex: 1,
                                        borderRadius: '10px',
                                        fontWeight: 600,
                                        fontSize: '13px',
                                        borderColor: '#E2E8F0',
                                        color: '#475569'
                                    }}
                                >
                                    Certificates
                                </Button>

                                <Button
                                    variant="solid"
                                    startDecorator={<DownloadIcon sx={{ fontSize: '16px' }} />}
                                    sx={{
                                        flex: 1,
                                        borderRadius: '10px',
                                        fontWeight: 600,
                                        fontSize: '13px',
                                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                        color: '#FFFFFF',
                                        boxShadow: '0 4px 10px rgba(99, 102, 241, 0.25)'
                                    }}
                                >
                                    Form
                                </Button>
                            </Stack>
                        </Card>
                    ))}
                </Box>

                {/* Footer Section */}
                <Box
                    sx={{
                        mt: 6,
                        pt: 3,
                        borderTop: '1px solid #E2E8F0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2
                    }}
                >
                    <Typography
                        level="body-xs"
                        sx={{
                            color: '#94A3B8',
                            fontWeight: 600,
                            fontFamily: 'Outfit, Inter, sans-serif',
                            letterSpacing: '0.02em'
                        }}
                    >
                        Travancore Medicity Medical College Hospital
                    </Typography>
                    <Typography
                        level="body-xs"
                        sx={{
                            color: '#94A3B8',
                            fontWeight: 500,
                            fontFamily: 'Outfit, Inter, sans-serif'
                        }}
                    >
                        © {new Date().getFullYear()} Meliora System. All rights reserved.
                    </Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export default memo(Medicinestatus)
