import React, { useState } from 'react';
import { Box, Typography, Sheet, Button } from '@mui/joy';
import { Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getIndentMedicines } from 'src/api/masterApi';
import { getCertificateDetailsByToken } from 'src/api/masterApi';
import MedicineFilesApproveHigherModal from './MedicineFilesApproveHigherModal';

const MedicineInformation = () => {
    const [openCertModal, setOpenCertModal] = useState(false);
    const [certData, setCertData] = useState([]);
    const [selectedTokenInfo, setSelectedTokenInfo] = useState(null);

    // Fetch data using useQuery
    const { data: medicines = [], isLoading, isError } = useQuery({
        queryKey: ['indentMedicines'],
        queryFn: getIndentMedicines,
    });

    const handleViewCertificates = async (row) => {
        // Assume row contains token_id and tokenno/prefix for the modal
        setSelectedTokenInfo({ prefix: row.prefix, token_number: row.tokenno });
        const data = await getCertificateDetailsByToken(row.token_id);
        setCertData(data);
        setOpenCertModal(true);
    };

    const premiumShadow = '0px 4px 20px rgba(0, 0, 0, 0.03)';

    return (
        <Paper sx={{ borderRadius: 0, width: '100%', minHeight: '100vh', backgroundColor: '#F8FAFC', p: { xs: 2, md: 4 } }}>
            <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
                <Typography level="h4" sx={{ color: '#0F172A', fontWeight: 700, mb: 3 }}>
                    Medicine Details Verified By Purchase Team
                </Typography>

                <Sheet
                    sx={{
                        overflow: 'auto',
                        borderRadius: '12px',
                        boxShadow: premiumShadow,
                        border: '1px solid #E2E8F0',
                        bgcolor: '#FFFFFF'
                    }}
                >
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1000px' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                                <th style={{ padding: '16px 24px', color: '#475569', fontWeight: 600, fontSize: '13px' }}>SlNo</th>
                                <th style={{ padding: '16px 24px', color: '#475569', fontWeight: 600, fontSize: '13px' }}>Token No</th>
                                <th style={{ padding: '16px 24px', color: '#475569', fontWeight: 600, fontSize: '13px' }}>Medicalrep Name</th>
                                <th style={{ padding: '16px 24px', color: '#475569', fontWeight: 600, fontSize: '13px' }}>Medicine Name</th>
                                <th style={{ padding: '16px 24px', color: '#475569', fontWeight: 600, fontSize: '13px' }}>Company</th>
                                <th style={{ padding: '16px 24px', color: '#475569', fontWeight: 600, fontSize: '13px' }}>AppointmentDate</th>
                                <th style={{ padding: '16px 24px', color: '#475569', fontWeight: 600, fontSize: '13px' }}>Tax%</th>
                                <th style={{ padding: '16px 24px', color: '#475569', fontWeight: 600, fontSize: '13px' }}>Offerdetails</th>
                                <th style={{ padding: '16px 24px', color: '#475569', fontWeight: 600, fontSize: '13px', textAlign: 'center' }}>Action</th>
                                <th style={{ padding: '16px 24px', color: '#475569', fontWeight: 600, fontSize: '13px', textAlign: 'center' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="10" style={{ padding: '24px', textAlign: 'center', color: '#64748B' }}>Loading...</td>
                                </tr>
                            ) : isError ? (
                                <tr>
                                    <td colSpan="10" style={{ padding: '24px', textAlign: 'center', color: '#EF4444' }}>Error loading data.</td>
                                </tr>
                            ) : medicines.length === 0 ? (
                                <tr>
                                    <td colSpan="10" style={{ padding: '24px', textAlign: 'center', color: '#64748B' }}>No data available.</td>
                                </tr>
                            ) : (
                                medicines?.map((row, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                        <td style={{ padding: '16px 24px', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>{index + 1}</td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#64748B' }}>{row.tokenno || 'N/A'}</td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#64748B' }}>{row.medicalrepName || 'N/A'}</td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#64748B' }}>{row.medicineName || 'N/A'}</td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#64748B' }}>{row.company || 'N/A'}</td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#64748B' }}>{row.appointmentDate ? new Date(row.appointmentDate).toLocaleDateString('en-GB') : 'N/A'}</td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#64748B' }}>{row.tax || 'N/A'}</td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#64748B' }}>{row.offerdetails || 'N/A'}</td>
                                        <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                                            <Button
                                                variant="solid"
                                                size="sm"
                                                onClick={() => handleViewCertificates(row)}
                                                sx={{
                                                    bgcolor: '#0EA5E9', // Teal/Cyan matching the image
                                                    color: 'white',
                                                    borderRadius: '6px',
                                                    fontWeight: 600,
                                                    fontSize: '12px',
                                                    '&:hover': { bgcolor: '#0284C7' }
                                                }}
                                            >
                                                View Certificates
                                            </Button>
                                        </td>
                                        <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '13px', color: '#F59E0B', fontWeight: 600 }}>
                                            {row.status || 'Not Verified'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </Sheet>
            </Box>

            {/* Modal for viewing certificates */}
            <MedicineFilesApproveHigherModal
                open={openCertModal}
                onClose={() => setOpenCertModal(false)}
                detailsData={certData}
                tokenCount={selectedTokenInfo}
            />
        </Paper>
    );
};

export default MedicineInformation;
