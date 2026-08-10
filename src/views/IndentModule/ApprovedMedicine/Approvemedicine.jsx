import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Typography, Button, Table, Sheet, Tooltip, IconButton, Input } from '@mui/joy';
import { format } from 'date-fns';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import { exportToCSV, exportToPDF } from './ExportUtils';
import { getCertificateDetailsByToken, getApprovedMedicines } from 'src/api/masterApi';
import ViewCertificateModal from './ViewCertificateModal';

const TruncatedCell = ({ text, width = 150 }) => (
    <Tooltip title={text || ''} placement="top">
        <Typography sx={{
            maxWidth: width,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '13px',
            color: 'neutral.700'
        }}>
            {text || '-'}
        </Typography>
    </Tooltip>
);

const Approvemedicine = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openCertModal, setOpenCertModal] = useState(false);
    const [certData, setCertData] = useState(null);

    const { data: approvedMedicines = [], isLoading } = useQuery({
        queryKey: ['approvedMedicines'],
        queryFn: getApprovedMedicines,
    });

    const handleViewCertificates = async (medicine) => {
        if (!medicine?.tokenid) {
            console.error("No token ID available");
            return;
        }
        const data = await getCertificateDetailsByToken(medicine.tokenid);
        setCertData(data);
        setOpenCertModal(true);
    };

    const filteredMedicines = approvedMedicines.filter(medicine => {
        const query = searchQuery.toLowerCase();
        return (
            (medicine.full_token_no || medicine.tokenno || '').toLowerCase().includes(query) ||
            (medicine.rep_name || '').toLowerCase().includes(query) ||
            (medicine.medicinename || '').toLowerCase().includes(query) ||
            (medicine.companyname || '').toLowerCase().includes(query) ||
            (medicine.description || '').toLowerCase().includes(query) ||
            (medicine.offerdetails || '').toLowerCase().includes(query)
        );
    });

    return (
        <Box sx={{ p: 3, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <Sheet
                variant="outlined"
                sx={{
                    p: 3,
                    borderRadius: 'lg',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    backgroundColor: '#ffffff',
                    border: 'none'
                }}
            >
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography level="h4" sx={{ fontWeight: '700', color: '#1e293b' }}>
                        Approved Medicine Details
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Input
                            startDecorator={<SearchIcon />}
                            placeholder="Search details..."
                            size="sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{ width: 250 }}
                        />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="Export to CSV" placement="top">
                                <IconButton
                                    size="sm"
                                    onClick={() => exportToCSV(filteredMedicines)}
                                    sx={{
                                        bgcolor: '#10b981',
                                        borderRadius: 'sm',
                                        boxShadow: 'sm',
                                        '&:hover': { bgcolor: '#059669' }
                                    }}
                                >
                                    <InsertDriveFileOutlinedIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Export to PDF" placement="top">
                                <IconButton
                                    color="danger"
                                    variant="solid"
                                    size="sm"
                                    onClick={() => exportToPDF(filteredMedicines)}
                                    sx={{
                                        bgcolor: '#ef4444',
                                        borderRadius: 'sm',
                                        boxShadow: 'sm',
                                        '&:hover': { bgcolor: '#dc2626' }
                                    }}
                                >
                                    <FileDownloadOutlinedIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ overflowX: 'auto' }}>
                    <Table
                        borderAxis="horizontal"
                        hoverRow
                        size="sm"
                        sx={{
                            '& thead th': {
                                backgroundColor: '#f1f5f9',
                                color: '#475569',
                                fontWeight: '700',
                                fontSize: '12px',
                                p: 1,
                                borderBottom: '2px solid #e2e8f0',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            },
                            '& tbody td': {
                                fontSize: '12px',
                                p: 1,
                                borderBottom: '1px solid #f1f5f9',
                                color: '#334155'
                            },
                            '& tbody tr:hover': {
                                backgroundColor: '#f8fafc'
                            },
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <thead>
                            <tr>
                                <th>Token No</th>
                                <th>Appointment Date</th>
                                <th>Medical Rep</th>
                                <th>Medicine Name</th>
                                <th>Company Name</th>
                                <th>Contents</th>
                                <th>Tax %</th>
                                <th>Offer Details</th>
                                <th>Purchase Rate</th>
                                <th>MRP</th>
                                <th style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="11" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                        Loading Approved Medicines...
                                    </td>
                                </tr>
                            ) : filteredMedicines?.length === 0 ? (
                                <tr>
                                    <td colSpan="11" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                        No Approved Medicines Found
                                    </td>
                                </tr>
                            ) : (
                                filteredMedicines?.map((medicine, index) => (
                                    <tr key={index}>
                                        <td style={{ fontWeight: '500' }}>{medicine.full_token_no || medicine.tokenno}</td>
                                        <td>{medicine.appointmentdate ? format(new Date(medicine.appointmentdate), 'dd MMM yyyy') : '-'}</td>
                                        <td>{medicine.rep_name}</td>
                                        <td><TruncatedCell text={medicine.medicinename} width={130} /></td>
                                        <td><TruncatedCell text={medicine.companyname} width={150} /></td>
                                        <td><TruncatedCell text={medicine.description} width={180} /></td>
                                        <td>{medicine.taxpercentage ? `${medicine.taxpercentage}%` : '-'}</td>
                                        <td><TruncatedCell text={medicine.offerdetails} width={120} /></td>
                                        <td style={{ fontWeight: '600', color: '#0f172a' }}>{medicine.purchaserate ? `₹${medicine.purchaserate}` : '-'}</td>
                                        <td style={{ fontWeight: '600', color: '#0f172a' }}>{medicine.mrp ? `₹${medicine.mrp}` : '-'}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <Button
                                                size="sm"
                                                variant="soft"
                                                color="primary"
                                                startDecorator={<VisibilityIcon fontSize="small" />}
                                                onClick={() => handleViewCertificates(medicine)}
                                                sx={{
                                                    borderRadius: 'sm',
                                                    fontWeight: '600',
                                                    fontSize: '11px',
                                                    minHeight: '28px',
                                                    py: 0,
                                                    px: 1.5
                                                }}
                                            >
                                                View Certificates
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Box>
            </Sheet>

            <ViewCertificateModal
                open={openCertModal}
                onClose={() => setOpenCertModal(false)}
                detailsData={certData}
            />
        </Box>
    );
};

export default Approvemedicine;
