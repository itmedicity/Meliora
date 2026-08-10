import React, { useState, memo, useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import {
    Modal,
    Box,
    Typography,
    Input,
    Textarea,
    Button,
    Card,
    Grid,
    Stack,
    RadioGroup,
    Radio
} from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CusIconButton from 'src/views/Components/CusIconButton';

const CertificateItem = ({ title, file, status, onStatusChange, onFileClick }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1.25,
                borderRadius: '10px',
                border: '1px solid',
                borderColor: file ? '#E2E8F0' : '#E2E8F0',
                backgroundColor: file ? '#FFFFFF' : '#F8FAFC',
                transition: 'all 0.2s ease-in-out',
            }}
        >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
                <Box
                    sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#F1F5F9',
                        color: file ? '#64748B' : '#94A3B8',
                        flexShrink: 0
                    }}
                >
                    <InsertDriveFileOutlinedIcon fontSize="small" />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography level="body-sm" sx={{ fontWeight: 700, color: '#334155', fontSize: '13px' }}>
                        {title}
                    </Typography>
                    {file ? (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <Typography
                                component="a"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (onFileClick) onFileClick(file, file?.filename || file?.name);
                                }}
                                level="body-xs"
                                sx={{
                                    color: '#7c51a1',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    fontSize: '11px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                <FileDownloadOutlinedIcon sx={{ fontSize: '12px', flexShrink: 0 }} />
                                {file?.filename || file?.name}
                            </Typography>
                        </Stack>
                    ) : (
                        <Typography
                            component="span"
                            level="body-xs"
                            sx={{
                                color: '#94A3B8',
                                fontWeight: 500,
                                fontSize: '11px',
                            }}
                        >
                            No file uploaded.
                        </Typography>
                    )}
                </Box>
            </Stack>
            {file && (
                <RadioGroup
                    orientation="horizontal"
                    value={status}
                    onChange={onStatusChange}
                    sx={{ ml: 2 }}
                >
                    <Radio value="approve" label="Approve" color="success" size="sm" />
                    <Radio value="reject" label="Reject" color="danger" size="sm" />
                </RadioGroup>
            )}
        </Box>
    );
};

const MedicineFilesApproveHigherModal = ({ open, onClose, onSuccess, detailsData }) => {
    const medicine = detailsData?.medicine || {};

    const [medicineName, setMedicineName] = useState('');
    const [description, setDescription] = useState('');
    const [contentRows, setContentRows] = useState([]);

    const [gmpFile, setGmpFile] = useState(null);
    const [analysisFile, setAnalysisFile] = useState(null);
    const [quotationFile, setQuotationFile] = useState(null);
    const [productFile, setProductFile] = useState(null);

    const [gmpStatus, setGmpStatus] = useState('');
    const [analysisStatus, setAnalysisStatus] = useState('');
    const [quotationStatus, setQuotationStatus] = useState('');
    const [productStatus, setProductStatus] = useState('');

    const [rejectionReason, setRejectionReason] = useState('');
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

    const [existingSupportingFiles, setExistingSupportingFiles] = useState([]);
    // const [supportingFileStatuses, setSupportingFileStatuses] = useState({});

    useEffect(() => {
        if (detailsData) {
            setMedicineName(medicine.medicinename || '');
            setDescription(medicine.description || '');

            const certs = detailsData.certificates || [];
            const gmp = certs.find(c => c.upload_file_id === 1);
            const analysis = certs.find(c => c.upload_file_id === 2);
            const quotation = certs.find(c => c.upload_file_id === 3);
            const product = certs.find(c => c.upload_file_id === 4);

            if (gmp) {
                setGmpFile({ name: gmp.filename, filename: gmp.filename, existing: true, id: gmp.certificates_details_slno });
                setGmpStatus(gmp.filestatus === 1 ? 'approve' : (gmp.filestatus === 2 ? 'reject' : ''));
            } else {
                setGmpFile(null);
                setGmpStatus('');
            }

            if (analysis) {
                setAnalysisFile({ name: analysis.filename, filename: analysis.filename, existing: true, id: analysis.certificates_details_slno });
                setAnalysisStatus(analysis.filestatus === 1 ? 'approve' : (analysis.filestatus === 2 ? 'reject' : ''));
            } else {
                setAnalysisFile(null);
                setAnalysisStatus('');
            }

            if (quotation) {
                setQuotationFile({ name: quotation.filename, filename: quotation.filename, existing: true, id: quotation.certificates_details_slno });
                setQuotationStatus(quotation.filestatus === 1 ? 'approve' : (quotation.filestatus === 2 ? 'reject' : ''));
            } else {
                setQuotationFile(null);
                setQuotationStatus('');
            }

            if (product) {
                setProductFile({ name: product.filename, filename: product.filename, existing: true, id: product.certificates_details_slno });
                setProductStatus(product.filestatus === 1 ? 'approve' : (product.filestatus === 2 ? 'reject' : ''));
            } else {
                setProductFile(null);
                setProductStatus('');
            }

            setExistingSupportingFiles(detailsData.otherDetails || []);
            // setSupportingFileStatuses({});

            const contentsData = detailsData.contents || [];
            setContentRows(contentsData.map(c => ({
                id: c.contents_details_slno,
                name: c.content_name,
                qty: c.content_quantity
            })));
        }
    }, [detailsData]);

    const handleViewFile = async (file, fileName) => {
        try {
            const response = await axioslogin.get(`/fileupload/getMedicalDocFile`, {
                params: { id: medicine?.medicine_id, filename: fileName },
                responseType: 'blob'
            });
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        } catch (error) {
            warningNotify("Error fetching file");
        }
    };

    const handleStatusChange = async (file, newStatus) => {
        if (!file || !file.id) return;

        const filestatus = newStatus === 'approve' ? 1 : (newStatus === 'reject' ? 2 : 0);

        try {
            const response = await axioslogin.patch('/indent/updateCertificateStatus', {
                certificates_details_slno: file.id,
                filestatus: filestatus,
                medicine_id: medicine?.medicine_id
            });

            if (response.data.success === 1) {
                succesNotify(`Status updated to ${newStatus}`);
            } else {
                warningNotify("Failed to update status");
            }
        } catch (error) {
            errorNotify("Error updating status");
        }
    };

    const handleReject = async () => {
        if (!medicine || !medicine.medicine_id) return;
        if (!rejectionReason.trim()) {
            warningNotify("Rejection reason is required");
            return;
        }
        try {
            const response = await axioslogin.patch('/indent/updateMedicineRejectionStatus', {
                medicine_id: medicine.medicine_id,
                rejectionstatus: 2,
                rejectionReason: rejectionReason
            });

            if (response.data.success === 1) {
                succesNotify("Rejected successfully");
                setIsRejectModalOpen(false);
                setRejectionReason('');
                if (onSuccess) onSuccess();
                else onClose();
            } else {
                warningNotify("Failed to reject");
            }
        } catch (error) {
            errorNotify("Error rejecting medicine");
        }
    };

    const handleApprove = async () => {
        if (!medicine || !medicine.medicine_id) return;
        try {
            const response = await axioslogin.patch('/indent/updateMedicineApprovalStatus', {
                medicine_id: medicine.medicine_id,
                finalstatus: 1
            });

            if (response.data.success === 1) {
                succesNotify("Approved successfully");
                setIsApproveModalOpen(false);
                if (onSuccess) onSuccess();
                else onClose();
            } else {
                warningNotify("Failed to approve");
            }
        } catch (error) {
            errorNotify("Error approving medicine");
        }
    };

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    backdropFilter: 'blur(6px)',
                    backgroundColor: 'rgba(15, 23, 42, 0.3)'
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        bgcolor: 'background.body',
                        borderRadius: '16px',
                        width: '90vw',
                        maxWidth: '90vw',
                        maxHeight: 'calc(100dvh - 24px)',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        border: '1px solid #E2E8F0',
                        outline: 'none',
                        overflow: 'hidden'
                    }}
                >
                    <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 10 }}>
                        <CusIconButton size="sm" variant="plain" color="neutral" onClick={onClose}>
                            <CloseIcon fontSize="small" />
                        </CusIconButton>
                    </Box>

                    <Box
                        sx={{
                            p: 2,
                            borderBottom: '1px solid #E2E8F0',
                            background: 'linear-gradient(to right, #F8FAFC, #F1F5F9)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 36,
                                height: 36,
                                borderRadius: '8px',
                                backgroundColor: 'rgba(124, 81, 161, 0.1)',
                                color: '#7c51a1',
                                flexShrink: 0
                            }}
                        >
                            <InsertDriveFileOutlinedIcon fontSize="small" />
                        </Box>
                        <Box>
                            <Typography
                                level="h4"
                                sx={{
                                    fontWeight: 700,
                                    color: '#1E293B',
                                    fontFamily: 'Outfit, Inter, sans-serif',
                                    fontSize: '16px'
                                }}
                            >
                                Medical Documentation Review
                            </Typography>
                            <Typography
                                level="body-sm"
                                sx={{
                                    color: '#64748B',
                                    fontWeight: 500,
                                    fontSize: '12px'
                                }}
                            >
                                Approve or reject uploaded certificates
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            p: 2.5,
                            backgroundColor: '#FCFDFE',
                            overflowY: 'auto',
                            flex: 1
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid xs={12} md={6}>
                                <Stack spacing={2}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            borderRadius: '12px',
                                            borderColor: '#E2E8F0',
                                            backgroundColor: '#FFFFFF'
                                        }}
                                    >
                                        <Typography
                                            level="title-sm"
                                            sx={{
                                                fontWeight: 700,
                                                color: '#1E293B',
                                                mb: 1.5,
                                                fontFamily: 'Outfit, Inter, sans-serif',
                                                fontSize: '14px'
                                            }}
                                        >
                                            General Information
                                        </Typography>

                                        <Stack spacing={1.5}>
                                            <Box>
                                                <Typography sx={{ fontWeight: 600, color: '#475569', mb: 0.5, fontSize: '13px' }}>
                                                    Medicine Name
                                                </Typography>
                                                <Input
                                                    readOnly
                                                    value={medicineName}
                                                    sx={{
                                                        borderRadius: '6px',
                                                        border: '1px solid #CBD5E1',
                                                        backgroundColor: '#F8FAFC',
                                                        fontWeight: 500,
                                                        fontSize: '13px',
                                                        color: '#0F172A',
                                                        height: '36px',
                                                    }}
                                                />
                                            </Box>

                                            <Box>
                                                <Typography sx={{ fontWeight: 600, color: '#475569', mb: 0.5, fontSize: '13px' }}>
                                                    Description / Notes
                                                </Typography>
                                                <Textarea
                                                    readOnly
                                                    minRows={2}
                                                    maxRows={3}
                                                    value={description}
                                                    sx={{
                                                        borderRadius: '6px',
                                                        border: '1px solid #CBD5E1',
                                                        backgroundColor: '#F8FAFC',
                                                        fontWeight: 500,
                                                        fontSize: '13px',
                                                        color: '#0F172A',
                                                    }}
                                                />
                                            </Box>

                                            <Stack direction="row" spacing={1.5}>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography sx={{ fontWeight: 600, color: '#475569', mb: 0.5, fontSize: '13px' }}>
                                                        Quantity
                                                    </Typography>
                                                    <Input
                                                        readOnly
                                                        value={medicine?.quotationno || ''}
                                                        sx={{
                                                            borderRadius: '6px',
                                                            border: '1px solid #CBD5E1',
                                                            backgroundColor: '#F8FAFC',
                                                            fontWeight: 500,
                                                            fontSize: '13px',
                                                            color: '#0F172A',
                                                            height: '36px',
                                                        }}
                                                    />
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography sx={{ fontWeight: 600, color: '#475569', mb: 0.5, fontSize: '13px' }}>
                                                        Purchase Rate
                                                    </Typography>
                                                    <Input
                                                        readOnly
                                                        value={medicine?.purchaserate || ''}
                                                        sx={{
                                                            borderRadius: '6px',
                                                            border: '1px solid #CBD5E1',
                                                            backgroundColor: '#F8FAFC',
                                                            fontWeight: 500,
                                                            fontSize: '13px',
                                                            color: '#0F172A',
                                                            height: '36px',
                                                        }}
                                                    />
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography sx={{ fontWeight: 600, color: '#475569', mb: 0.5, fontSize: '13px' }}>
                                                        MRP
                                                    </Typography>
                                                    <Input
                                                        readOnly
                                                        value={medicine?.mrp || ''}
                                                        sx={{
                                                            borderRadius: '6px',
                                                            border: '1px solid #CBD5E1',
                                                            backgroundColor: '#F8FAFC',
                                                            fontWeight: 500,
                                                            fontSize: '13px',
                                                            color: '#0F172A',
                                                            height: '36px',
                                                        }}
                                                    />
                                                </Box>
                                            </Stack>
                                            {medicine?.rejectionstatus === 2 && medicine?.rejectionReason && (
                                                <Box>
                                                    <Typography sx={{ fontWeight: 600, color: '#dc2626', mb: 0.5, fontSize: '13px' }}>
                                                        Rejection Reason
                                                    </Typography>
                                                    <Textarea
                                                        readOnly
                                                        minRows={2}
                                                        maxRows={3}
                                                        value={medicine?.rejectionReason}
                                                        sx={{
                                                            borderRadius: '6px',
                                                            border: '1px solid #fca5a5',
                                                            backgroundColor: '#fef2f2',
                                                            fontWeight: 500,
                                                            fontSize: '13px',
                                                            color: '#991b1b',
                                                        }}
                                                    />
                                                </Box>
                                            )}
                                        </Stack>
                                    </Card>

                                    <Card
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            borderRadius: '12px',
                                            borderColor: '#E2E8F0',
                                            backgroundColor: '#FFFFFF'
                                        }}
                                    >
                                        <Box sx={{ mb: 1.5 }}>
                                            <Typography
                                                level="title-sm"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: '#1E293B',
                                                    fontFamily: 'Outfit, Inter, sans-serif',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                Content Detail
                                            </Typography>
                                        </Box>

                                        {contentRows?.length === 0 ? (
                                            <Box
                                                sx={{
                                                    p: 2,
                                                    border: '1px dashed #E2E8F0',
                                                    borderRadius: '10px',
                                                    textAlign: 'center',
                                                    bgcolor: '#F8FAFC'
                                                }}
                                            >
                                                <Typography level="body-xs" sx={{ color: '#64748B', fontWeight: 600 }}>
                                                    No Content Detail added.
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <Stack spacing={1} sx={{ maxHeight: '120px', overflowY: 'auto' }}>
                                                {contentRows?.map((row) => (
                                                    <Box key={row.id} sx={{ display: 'flex', gap: 1, alignItems: 'center', width: '100%' }}>
                                                        <Input
                                                            readOnly
                                                            value={row?.name}
                                                            sx={{
                                                                flex: 4,
                                                                borderRadius: '6px',
                                                                border: '1px solid #CBD5E1',
                                                                backgroundColor: '#F8FAFC',
                                                                fontWeight: 500,
                                                                fontSize: '13px',
                                                                color: '#0F172A',
                                                                height: '32px'
                                                            }}
                                                        />
                                                        <Input
                                                            readOnly
                                                            value={row?.qty}
                                                            sx={{
                                                                flex: 2,
                                                                borderRadius: '6px',
                                                                border: '1px solid #CBD5E1',
                                                                backgroundColor: '#F8FAFC',
                                                                fontWeight: 500,
                                                                fontSize: '13px',
                                                                color: '#0F172A',
                                                                textAlign: 'center',
                                                                height: '32px'
                                                            }}
                                                        />
                                                    </Box>
                                                ))}
                                            </Stack>
                                        )}
                                    </Card>
                                </Stack>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <Stack spacing={2}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            borderRadius: '12px',
                                            borderColor: '#E2E8F0',
                                            backgroundColor: '#FFFFFF'
                                        }}
                                    >
                                        <Box sx={{ mb: 1 }}>
                                            <Typography
                                                level="title-sm"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: '#1E293B',
                                                    fontFamily: 'Outfit, Inter, sans-serif',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                Regulatory Certificates
                                            </Typography>
                                        </Box>

                                        <Stack spacing={1}>
                                            <CertificateItem
                                                title="GMP Certificate"
                                                file={gmpFile}
                                                status={gmpStatus}
                                                onStatusChange={(e) => {
                                                    setGmpStatus(e.target.value);
                                                    handleStatusChange(gmpFile, e.target.value);
                                                }}
                                                onFileClick={handleViewFile}
                                            />
                                            <CertificateItem
                                                title="Analysis Certificate"
                                                file={analysisFile}
                                                status={analysisStatus}
                                                onStatusChange={(e) => {
                                                    setAnalysisStatus(e.target.value);
                                                    handleStatusChange(analysisFile, e.target.value);
                                                }}
                                                onFileClick={handleViewFile}
                                            />
                                            <CertificateItem
                                                title="Quotation"
                                                file={quotationFile}
                                                status={quotationStatus}
                                                onStatusChange={(e) => {
                                                    setQuotationStatus(e.target.value);
                                                    handleStatusChange(quotationFile, e.target.value);
                                                }}
                                                onFileClick={handleViewFile}
                                            />
                                            <CertificateItem
                                                title="Package Cover / Insert"
                                                file={productFile}
                                                status={productStatus}
                                                onStatusChange={(e) => {
                                                    setProductStatus(e.target.value);
                                                    handleStatusChange(productFile, e.target.value);
                                                }}
                                                onFileClick={handleViewFile}
                                            />
                                        </Stack>
                                    </Card>

                                    <Card
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            borderRadius: '12px',
                                            borderColor: '#E2E8F0',
                                            backgroundColor: '#FFFFFF'
                                        }}
                                    >
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                            <Box>
                                                <Typography
                                                    level="title-sm"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: '#1E293B',
                                                        fontFamily: 'Outfit, Inter, sans-serif',
                                                        fontSize: '14px'
                                                    }}
                                                >
                                                    Supporting Documents
                                                </Typography>
                                            </Box>
                                        </Stack>

                                        {existingSupportingFiles?.length > 0 ? (
                                            <Stack spacing={1} sx={{ mt: 1.5, maxHeight: '120px', overflowY: 'auto' }}>
                                                {existingSupportingFiles?.map((file, idx) => (
                                                    <Box
                                                        key={`existing-${file?.otherdetails_slno}-${idx}`}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            p: 1,
                                                            borderRadius: '8px',
                                                            border: '1px solid #E2E8F0',
                                                            backgroundColor: '#F8FAFC'
                                                        }}
                                                    >
                                                        <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
                                                            <InsertDriveFileOutlinedIcon sx={{ fontSize: '18px', color: '#64748B', flexShrink: 0 }} />
                                                            <Typography
                                                                component="a"
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleViewFile(file, file?.filename);
                                                                }}
                                                                level="body-xs"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    color: '#0284C7',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    whiteSpace: 'nowrap',
                                                                    textDecoration: 'none',
                                                                    '&:hover': {
                                                                        textDecoration: 'underline'
                                                                    }
                                                                }}
                                                            >
                                                                {file?.filename}
                                                            </Typography>
                                                        </Stack>
                                                    </Box>
                                                ))}
                                            </Stack>
                                        ) : (
                                            <Box
                                                sx={{
                                                    p: 2,
                                                    border: '1px dashed #E2E8F0',
                                                    borderRadius: '10px',
                                                    textAlign: 'center',
                                                    bgcolor: '#F8FAFC'
                                                }}
                                            >
                                                <Typography level="body-xs" sx={{ color: '#64748B', fontWeight: 600 }}>
                                                    No supporting documents uploaded.
                                                </Typography>
                                            </Box>
                                        )}
                                    </Card>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box
                        sx={{
                            p: 2,
                            borderTop: '1px solid #E2E8F0',
                            backgroundColor: '#F8FAFC',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 2
                        }}
                    >
                        <Button
                            variant="solid"
                            color="success"
                            onClick={() => setIsApproveModalOpen(true)}
                            sx={{
                                borderRadius: '8px',
                                fontWeight: 600,
                                px: 3,
                                py: 0.75,
                                fontSize: '13px',
                            }}
                        >
                            Approve
                        </Button>
                        <Button
                            variant="solid"
                            color="danger"
                            onClick={() => setIsRejectModalOpen(true)}
                            sx={{
                                borderRadius: '8px',
                                fontWeight: 600,
                                px: 3,
                                py: 0.75,
                                fontSize: '13px',
                            }}
                        >
                            Reject
                        </Button>

                    </Box>
                </Box>
            </Modal>

            {/* Rejection Reason Modal */}
            <Modal
                open={isRejectModalOpen}
                onClose={() => setIsRejectModalOpen(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    backdropFilter: 'blur(6px)',
                    backgroundColor: 'rgba(15, 23, 42, 0.4)'
                }}
            >
                <Box
                    sx={{
                        bgcolor: 'background.body',
                        borderRadius: '12px',
                        width: '400px',
                        maxWidth: '90vw',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        border: '1px solid #E2E8F0',
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <Typography level="h6" fontWeight="bold">
                        Reason for Rejection
                    </Typography>

                    <Textarea
                        minRows={3}
                        placeholder="Please enter the reason for rejection..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        sx={{
                            borderRadius: '8px',
                            borderColor: '#CBD5E1',
                        }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 1 }}>
                        <Button
                            variant="outlined"
                            color="neutral"
                            onClick={() => setIsRejectModalOpen(false)}
                            sx={{ borderRadius: '8px', px: 2 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="solid"
                            color="danger"
                            onClick={handleReject}
                            sx={{ borderRadius: '8px', px: 2 }}
                        >
                            Submit Rejection
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Approval Confirmation Modal */}
            <Modal
                open={isApproveModalOpen}
                onClose={() => setIsApproveModalOpen(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    backdropFilter: 'blur(6px)',
                    backgroundColor: 'rgba(15, 23, 42, 0.4)'
                }}
            >
                <Box
                    sx={{
                        bgcolor: 'background.body',
                        borderRadius: '12px',
                        width: '400px',
                        maxWidth: '90vw',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        border: '1px solid #E2E8F0',
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        textAlign: 'center'
                    }}
                >
                    <Typography level="h6" fontWeight="bold">
                        Confirm Approval
                    </Typography>

                    <Typography level="body-md" sx={{ color: '#475569', mb: 2 }}>
                        Are you sure you want to approve this medicine?
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5 }}>
                        <Button
                            variant="outlined"
                            color="neutral"
                            onClick={() => setIsApproveModalOpen(false)}
                            sx={{ borderRadius: '8px', px: 3 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="solid"
                            color="success"
                            onClick={handleApprove}
                            sx={{ borderRadius: '8px', px: 3 }}
                        >
                            Yes, Approve
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default memo(MedicineFilesApproveHigherModal);
