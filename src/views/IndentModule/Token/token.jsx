import { Box, Button, Typography, Select, Option, Sheet, Stack, Divider, Avatar, Input, Card } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton'
import TextComponent from 'src/views/Components/TextComponent'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import SearchIcon from '@mui/icons-material/Search'
import DescriptionIcon from '@mui/icons-material/Description'
import DownloadIcon from '@mui/icons-material/Download'

import { fetchLoginDetails, getScheduleDatesThisMonth, getAppointmentsByRepId, getCertificateDetailsByToken } from 'src/api/masterApi'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import MedicalFilesModal from './MedicalFilesModal'
import { warningNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import MedicineFilesViewModal from '../MedicineStatus/MedicineFilesViewModal'
import { generateTokenPdf } from './TokenPdf'
import FillIndentDetailsModal from './FillIndentDetailsModal'
import EditNoteIcon from '@mui/icons-material/EditNote'

const Token = () => {
    const history = useNavigate()
    const [selectedDate, setSelectedDate] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [tokendata, setTokenData] = useState(0)
    const [bookedCount, setBookedCount] = useState(0)

    // Table states
    const [searchTerm, setSearchTerm] = useState('')
    const [openCertModal, setOpenCertModal] = useState(false)
    const [openIndentModal, setOpenIndentModal] = useState(false)
    const [certData, setCertData] = useState([])
    const [selectedTokenInfo, setSelectedTokenInfo] = useState(null)

    const handleOpenCertificates = async (row) => {
        setSelectedTokenInfo({ prefix: row.prefix, token_number: row.tokenno })
        const data = await getCertificateDetailsByToken(row.token_id)
        setCertData(data)
        setOpenCertModal(true)
    }

    const handleDownloadToken = (row) => {
        generateTokenPdf(row, loginDetails)
    }

    const backtoSetting = useCallback(() => {
        history('/Home')
    }, [history])

    const handleBookToken = useCallback(async () => {
        if (!selectedDate) {
            warningNotify("Select a Booking Date")
            return
        }
        try {
            const res = await axioslogin.get('/indent/getTotalTokenCount')
            const { success, data } = res.data
            if (success === 1 && data && data.length > 0) {
                setTokenData(data[0])

            } else {
                setTokenData(0)
            }
        } catch (error) {
            console.error(error)
            setTokenData(0)
        }
        setModalOpen(true)
    }, [selectedDate])

    const { data: scheduleData } = useQuery({
        queryKey: ['getScheduleDatesThisMonth'],
        queryFn: getScheduleDatesThisMonth,
    })

    const { data: loginDetails } = useQuery({
        queryKey: ['loginDetails', 679],
        queryFn: () => fetchLoginDetails(679),
    });

    // Appointments query for the table
    const { data: fetchedAppointments = [] } = useQuery({
        queryKey: ['appointmentsByRepId', 616],
        queryFn: () => getAppointmentsByRepId(616),
        enabled: true,
    });

    const apiData = Array.isArray(fetchedAppointments) ? fetchedAppointments.map((item, index) => ({
        slNo: index + 1,
        appointmentDate: item.appointmentdate ? new Date(item.appointmentdate).toLocaleDateString('en-GB') : 'N/A',
        tokenNo: item.tokenno ? `${item.prefix || ''}${item.tokenno}` : 'N/A',
        medicineName: item.department_name || 'N/A',
        status: 'Approved',
        token_id: item.token_id,
        prefix: item.prefix,
        tokenno: item.tokenno
    })) : [];

    const filteredData = apiData.filter(row =>
        row.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.tokenNo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const premiumShadow = '0px 4px 20px rgba(0, 0, 0, 0.03)'

    // Handler function for dropdown change
    const handleDateChange = useCallback(async (event, newValue) => {
        const date = newValue || ''
        setSelectedDate(date)
        if (date) {
            try {
                const res = await axioslogin.get('/indent/getBookedTokenCount', {
                    params: { appointmentdate: date }
                })
                const { success, data } = res.data
                if (success === 1 && data && data.length > 0) {
                    setBookedCount(data[0].total_booked || 0)
                } else {
                    setBookedCount(0)
                }
            } catch (error) {
                console.error(error)
                setBookedCount(0)
            }
        } else {
            setBookedCount(0)
        }
    }, [])


    return (
        <Paper sx={{ borderRadius: 0, width: '100%', minHeight: '85vh', backgroundColor: '#F8FAFC' }}>
            {/* Header section */}
            <Box sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: '#D0D0D0', backgroundColor: '#FFFFFF', p: 1 }}>
                <TextComponent
                    sx={{
                        color: '#5A676C',
                        fontWeight: 510,
                        flex: 1,
                        m: 0.5,
                        pl: 1,
                        fontFamily: 'Arial'
                    }}
                    text="Token Information"
                />
                <Box>
                    <CusIconButton size="sm" variant="outlined" color="primary" onClick={backtoSetting}>
                        <CloseIcon fontSize="small" />
                    </CusIconButton>
                </Box>
            </Box>

            {/* Premium Dashboard Row */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 3,
                    p: 4,
                    justifyContent: 'center',
                    alignItems: 'stretch'
                }}
            >
                {/* 1. Next Booking Date Box */}
                <Box
                    sx={{
                        flex: 1,
                        minWidth: '280px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 12px 20px -8px rgba(124, 58, 237, 0.15)',
                            borderColor: '#C7D2FE'
                        }
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography level="body-sm" sx={{ fontWeight: 600, color: '#64748B', letterSpacing: '0.05em' }}>
                            NEXT BOOKING DATE
                        </Typography>
                        <Box sx={{ p: 1, borderRadius: '12px', backgroundColor: '#EEF2FF', color: '#4F46E5', display: 'flex' }}>
                            <CalendarMonthIcon />
                        </Box>
                    </Box>

                    <Select
                        value={selectedDate}
                        onChange={handleDateChange}
                        placeholder="Select Booking Date"
                        size="sm"
                        sx={{
                            width: '100%',
                            borderRadius: '10px',
                            mb: 1.5,
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            fontWeight: 700,
                            color: '#1E293B',
                            '&:hover': {
                                borderColor: '#94A3B8'
                            }
                        }}
                    >
                        {Array.isArray(scheduleData) && scheduleData.map((item) => {
                            try {
                                const formatted = moment(item.schedule_date).format('DD-MM-YYYY')
                                return (
                                    <Option key={item.date_slno} value={item.schedule_date}>
                                        {formatted}
                                    </Option>
                                )
                            } catch (e) {
                                return null
                            }
                        })}
                    </Select>

                    <Typography level="body-xs" sx={{ color: '#94A3B8' }}>
                        Earliest scheduled date available
                    </Typography>
                </Box>

                {/* 2. Total Bookings Box */}
                <Box
                    sx={{
                        flex: 1,
                        minWidth: '280px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 12px 20px -8px rgba(124, 58, 237, 0.15)',
                            borderColor: '#C7D2FE'
                        }
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography level="body-sm" sx={{ fontWeight: 600, color: '#64748B', letterSpacing: '0.05em' }}>
                            TOTAL BOOKINGS
                        </Typography>
                        <Box sx={{ p: 1, borderRadius: '12px', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex' }}>
                            <InsertInvitationIcon />
                        </Box>
                    </Box>
                    <Typography level="h3" sx={{ fontWeight: 700, color: '#1E293B', mb: 1 }}>
                        {bookedCount}
                    </Typography>
                    <Typography level="body-xs" sx={{ color: '#94A3B8' }}>
                        Booked tokens count for selected date
                    </Typography>
                </Box>

                {/* 3. Book Token Box */}
                <Box
                    sx={{
                        flex: 1,
                        minWidth: '280px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 12px 20px -8px rgba(124, 58, 237, 0.15)',
                            borderColor: '#C7D2FE'
                        }
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography level="body-sm" sx={{ fontWeight: 600, color: '#64748B', letterSpacing: '0.05em' }}>
                            RESERVE TOKEN
                        </Typography>
                        <Box sx={{ p: 1, borderRadius: '12px', backgroundColor: '#FDF2F8', color: '#DB2777', display: 'flex' }}>
                            <ConfirmationNumberIcon />
                        </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Button
                            variant="solid"
                            size="md"
                            onClick={handleBookToken}
                            sx={{
                                width: '100%',
                                borderRadius: '10px',
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #7c51a1, #6d5391ff)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #875db5, #6e3f9e)',
                                }
                            }}
                        >
                            Book Token
                        </Button>
                    </Box>
                    <Typography level="body-xs" sx={{ color: '#94A3B8' }}>
                        Reserve token for next scheduled date
                    </Typography>
                </Box>
            </Box>

            {/* Injected Table Section from MedicineStatus */}
            <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: '100%', margin: '0 auto', mt: 2 }}>
                {/* Control & Search Utility Bar */}
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

                </Stack>

                {/* DESKTOP VIEW */}
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
                                {/* <th style={{ textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '16px' }}>Medicine Name</th> */}
                                <th style={{ width: '650px', textAlign: 'right', fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '16px 24px' }}>Actions & Status</th>
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
                                    {/* <td style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A', padding: '16px' }}>
                                        {row.medicineName}
                                    </td> */}
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1.5 }}>
                                            {/* <Chip
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
                                            </Chip> */}

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
                                                onClick={() => handleDownloadToken(row)}
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
                                                Download token
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                size="sm"
                                                onClick={() => setOpenIndentModal(true)}
                                                startDecorator={<EditNoteIcon sx={{ fontSize: '16px' }} />}
                                                sx={{
                                                    borderRadius: '8px',
                                                    fontWeight: 600,
                                                    fontSize: '13px',
                                                    color: '#10B981',
                                                    borderColor: '#10B981',
                                                    transition: 'all 0.2s',
                                                    '&:hover': { bgcolor: '#ECFDF5', borderColor: '#059669', color: '#059669' }
                                                }}
                                            >
                                                Fill Indent Details
                                            </Button>
                                        </Box>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Sheet>

                {/* MOBILE VIEW */}
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
                                        {/* <Typography level="title-md" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                                            {row.medicineName}
                                        </Typography> */}
                                        <Typography level="body-xs" sx={{ fontWeight: 700, color: '#4F46E5', mt: 0.5 }}>
                                            {row.tokenNo}
                                        </Typography>
                                    </Box>
                                </Box>
                                {/* <Chip
                                    variant="soft"
                                    color="success"
                                    size="sm"
                                    startDecorator={<CheckCircleIcon sx={{ fontSize: '12px' }} />}
                                    sx={{ fontWeight: 700, borderRadius: '6px', fontSize: '10px', bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#059669' }}
                                >
                                    Approved
                                </Chip> */}
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

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: '100%' }}>
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
                                        color: '#475569',
                                        width: '100%'
                                    }}
                                >
                                    Certificates
                                </Button>

                                <Button
                                    variant="solid"
                                    onClick={() => handleDownloadToken(row)}
                                    startDecorator={<DownloadIcon sx={{ fontSize: '16px' }} />}
                                    sx={{
                                        flex: 1,
                                        borderRadius: '10px',
                                        fontWeight: 600,
                                        fontSize: '13px',
                                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                        color: '#FFFFFF',
                                        boxShadow: '0 4px 10px rgba(99, 102, 241, 0.25)',
                                        width: '100%'
                                    }}
                                >
                                    Download token
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={() => setOpenIndentModal(true)}
                                    startDecorator={<EditNoteIcon sx={{ fontSize: '16px' }} />}
                                    sx={{
                                        flex: 1,
                                        borderRadius: '10px',
                                        fontWeight: 600,
                                        fontSize: '13px',
                                        color: '#10B981',
                                        borderColor: '#10B981',
                                        width: '100%'
                                    }}
                                >
                                    Fill Indent
                                </Button>
                            </Stack>
                        </Card>
                    ))}
                </Box>
            </Box>

            <MedicineFilesViewModal
                open={openCertModal}
                onClose={() => setOpenCertModal(false)}
                detailsData={certData}
                tokenCount={selectedTokenInfo}
            />

            <FillIndentDetailsModal
                open={openIndentModal}
                onClose={() => setOpenIndentModal(false)}
            />

            <MedicalFilesModal open={modalOpen} onClose={() => setModalOpen(false)} loginDetails={loginDetails} tokenCount={tokendata}
                selectedDate={selectedDate} bookedTokenCount={bookedCount} />
        </Paper>
    )
}

export default memo(Token)