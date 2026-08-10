import React, { useState, memo, useCallback, useEffect } from 'react'
// import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify, errorNotify } from 'src/views/Common/CommonCode'
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
    IconButton,
    Chip
} from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import CusIconButton from 'src/views/Components/CusIconButton'

// Sub-component for individual certificate approval cards (compact sizing)
// Sub-component for individual certificate approval cards (compact sizing)
const CertificateItem = ({ title, file, onFileChange, onRemoveFile, checked, onFileClick }) => {
    const fileInputRef = React.useRef(null)

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <Box
            onClick={!file ? handleUploadClick : undefined}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1.25,
                borderRadius: '10px',
                border: '1px solid',
                borderColor: file ? (checked ? '#DCFCE7' : '#E2E8F0') : '#E2E8F0',
                backgroundColor: file ? (checked ? '#F0FDF4' : '#FFFFFF') : '#F8FAFC',
                cursor: !file ? 'pointer' : 'default',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    borderColor: file ? (checked ? '#BBF7D0' : '#CBD5E1') : '#CBD5E1',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.01)',
                    '& .upload-link': {
                        color: '#7c51a1'
                    }
                }
            }}
        >
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        onFileChange(e.target.files[0])
                        e.target.value = ''
                    }
                }}
            />

            <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
                <Box
                    sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: file ? (checked ? '#DCFCE7' : '#F1F5F9') : '#F1F5F9',
                        color: file ? (checked ? '#16A34A' : '#64748B') : '#94A3B8',
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
                                    e.preventDefault()
                                    if (onFileClick) onFileClick(file, file?.filename || file?.name)
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
                            {(!file?.existing || file?.filestatus !== 1) && (
                                <IconButton
                                    size="xs"
                                    variant="plain"
                                    color="danger"
                                    onClick={onRemoveFile}
                                    sx={{
                                        p: 0,
                                        minWidth: '18px',
                                        minHeight: '18px',
                                        borderRadius: '50%',
                                        '&:hover': {
                                            backgroundColor: 'rgba(239, 68, 68, 0.08)'
                                        }
                                    }}
                                >
                                    <CloseIcon sx={{ fontSize: '12px' }} />
                                </IconButton>
                            )}
                        </Stack>
                    ) : (
                        <Typography
                            component="span"
                            level="body-xs"
                            className="upload-link"
                            sx={{
                                color: '#94A3B8',
                                fontWeight: 500,
                                fontSize: '11px',
                                textDecoration: 'underline',
                                transition: 'color 0.2s ease-in-out'
                            }}
                        >
                            No file selected. Click to upload
                        </Typography>
                    )}
                </Box>
            </Stack>
            {file?.existing && file?.filestatus !== undefined && (
                <Chip
                    size="sm"
                    color={
                        file.filestatus === 1 ? 'success' :
                            file.filestatus === 2 ? 'danger' :
                                'warning'
                    }
                    variant="soft"
                    sx={{ ml: 1.5, fontWeight: 600, minWidth: '70px', textAlign: 'center' }}
                >
                    {file.filestatus === 1 ? 'Approved' :
                        file.filestatus === 2 ? 'Rejected' :
                            'Pending'}
                </Chip>
            )}
        </Box>
    )
}

const MedicineFilesViewModal = ({ open, onClose, onSuccess, detailsData }) => {
    const medicine = detailsData?.medicine || {};

    // Form states
    const [medicineName, setMedicineName] = useState('');
    const [description, setDescription] = useState('');
    const [contentRows, setContentRows] = useState([]);

    // Certificate File States
    const [gmpFile, setGmpFile] = useState(null);
    const [analysisFile, setAnalysisFile] = useState(null);
    const [quotationFile, setQuotationFile] = useState(null);
    const [productFile, setProductFile] = useState(null);

    const [gmpApproved, setGmpApproved] = useState(false);
    const [analysisApproved, setAnalysisApproved] = useState(false);
    const [quotationApproved, setQuotationApproved] = useState(false);
    const [productApproved, setProductApproved] = useState(false);

    const [supportingFiles, setSupportingFiles] = useState([]);
    const [existingSupportingFiles, setExistingSupportingFiles] = useState([]);
    const [removedExistingFiles, setRemovedExistingFiles] = useState([]);

    useEffect(() => {
        if (detailsData) {
            setMedicineName(medicine.medicinename || '');
            setDescription(medicine.description || '');

            const certs = detailsData.certificates || [];
            const gmp = certs.find(c => c.upload_file_id === 1);
            const analysis = certs.find(c => c.upload_file_id === 2);
            const quotation = certs.find(c => c.upload_file_id === 3);
            const product = certs.find(c => c.upload_file_id === 4);

            if (gmp) setGmpFile({ name: gmp.filename, filename: gmp.filename, existing: true, id: gmp.certificates_details_slno, filestatus: gmp.filestatus });
            else setGmpFile(null);

            if (analysis) setAnalysisFile({ name: analysis.filename, filename: analysis.filename, existing: true, id: analysis.certificates_details_slno, filestatus: analysis.filestatus });
            else setAnalysisFile(null);

            if (quotation) setQuotationFile({ name: quotation.filename, filename: quotation.filename, existing: true, id: quotation.certificates_details_slno, filestatus: quotation.filestatus });
            else setQuotationFile(null);

            if (product) setProductFile({ name: product.filename, filename: product.filename, existing: true, id: product.certificates_details_slno, filestatus: product.filestatus });
            else setProductFile(null);

            setExistingSupportingFiles(detailsData.otherDetails || []);
            setSupportingFiles([]);
            setRemovedExistingFiles([]);

            const contentsData = detailsData.contents || [];
            setContentRows(contentsData.map(c => ({
                id: c.contents_details_slno,
                name: c.content_name,
                qty: c.content_quantity
            })));
        }
    }, [detailsData]);

    const handleAddContentRow = () => {
        setContentRows((prev) => [
            ...prev,
            { id: Date.now(), name: '', qty: '' }
        ]);
    }

    const handleDeleteContentRow = (id) => {
        setContentRows((prev) => prev.filter((row) => row.id !== id));
    }

    const handleViewFile = async (file, fileName) => {
        if (file instanceof File || file instanceof Blob) {
            const url = URL.createObjectURL(file);
            window.open(url, '_blank');
            return;
        }

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
    }

    const handleContentRowChange = (id, field, value) => {
        setContentRows((prev) =>
            prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        );
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const filesArray = Array.from(e.target.files);
            setSupportingFiles((prev) => [...prev, ...filesArray]);
            e.target.value = '';
        }
    }

    const handleRemoveFile = (indexToRemove) => {
        setSupportingFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    }

    const handleRemoveExistingFile = (fileId) => {
        setExistingSupportingFiles((prev) => prev.filter(f => f.otherdetails_slno !== fileId));
        setRemovedExistingFiles(prev => [...prev, fileId]);
    }

    const handleSave = useCallback(async (e) => {
        e.preventDefault();

        // Validation
        if (!medicineName.trim()) {
            warningNotify("Please enter a medicine name");
            return;
        }

        if (contentRows.length === 0) {
            warningNotify("Please add at least one Content Detail row");
            return;
        }

        const hasEmptyRow = contentRows.some(row => !String(row?.name || '').trim() || !String(row?.qty || '').trim());
        if (hasEmptyRow) {
            warningNotify("Please fill in both Ingredient Name and Qty for all Content Detail rows");
            return;
        }

        if (!gmpFile) {
            warningNotify("Please upload the GMP Certificate");
            return;
        }
        if (!analysisFile) {
            warningNotify("Please upload the Analysis Certificate");
            return;
        }
        if (!quotationFile) {
            warningNotify("Please upload the Quotation");
            return;
        }
        if (!productFile) {
            warningNotify("Please upload the Package Cover / Insert");
            return;
        }

        const postData = {
            medicine_id: medicine?.medicine_id,
            medicine_name: medicineName,
            description: description,
            content_rows: contentRows.map(row => ({ name: row.name, qty: row.qty })),
            removed_other_files: removedExistingFiles
        };

        try {
            // 1. Update Metadata
            const result = await axioslogin.patch('/indent/updateMedicalDocs', postData);
            const { success, message, updateid } = result.data;

            if (success === 1 || success === 2) {
                // 2. Upload new files if update was successful
                const recordId = updateid || medicine?.medicine_id;

                if (recordId) {
                    const formData = new FormData();
                    formData.append('id', recordId);

                    let hasNewFiles = false;

                    if (gmpFile && !gmpFile.existing) { formData.append('gmpFile', gmpFile, gmpFile.name); hasNewFiles = true; }
                    if (analysisFile && !analysisFile.existing) { formData.append('analysisFile', analysisFile, analysisFile.name); hasNewFiles = true; }
                    if (quotationFile && !quotationFile.existing) { formData.append('quotationFile', quotationFile, quotationFile.name); hasNewFiles = true; }
                    if (productFile && !productFile.existing) { formData.append('productFile', productFile, productFile.name); hasNewFiles = true; }

                    if (supportingFiles && supportingFiles.length > 0) {
                        hasNewFiles = true;
                        for (const file of supportingFiles) {
                            formData.append('supportingFiles', file, file.name);
                        }
                    }

                    if (hasNewFiles) {
                        const uploadResult = await axioslogin.post('/fileupload/uploadFile/MedicalDocs', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });

                        const uploadData = uploadResult.data;
                        if (uploadData.success === 1) {
                            succesNotify("Medical Documentation updated and new files uploaded successfully");
                            if (onSuccess) onSuccess();
                            else onClose();
                        } else {
                            warningNotify(uploadData.message || "Metadata updated but file upload failed");
                            onClose();
                        }
                    } else {
                        succesNotify(message || "Medical Documentation updated successfully");
                        if (onSuccess) onSuccess();
                        else onClose();
                    }
                } else {
                    succesNotify(message || "Medical Documentation updated successfully");
                    if (onSuccess) onSuccess();
                    else onClose();
                }
            } else {
                warningNotify(message || "Failed to update Medical Documentation");
            }
        } catch (error) {
            errorNotify(error.message || "An error occurred while updating documentation");
            console.error(error);
        }
    }, [
        medicineName,
        description,
        contentRows,
        gmpFile,
        analysisFile,
        quotationFile,
        productFile,
        supportingFiles,
        existingSupportingFiles,
        removedExistingFiles,
        onClose,
        onSuccess,
        medicine
    ]);

    return (
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
                    width: '100%',
                    maxWidth: '1080px',
                    maxHeight: 'calc(100dvh - 24px)',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    border: '1px solid #E2E8F0',
                    outline: 'none',
                    overflow: 'hidden'
                }}
            >
                {/* Close Button */}
                <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 10 }}>
                    <CusIconButton size="sm" variant="plain" color="neutral" onClick={onClose}>
                        <CloseIcon fontSize="small" />
                    </CusIconButton>
                </Box>

                {/* Header (Compact) */}
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
                            Medical Documentation Manager
                        </Typography>
                        <Typography
                            level="body-sm"
                            sx={{
                                color: '#64748B',
                                fontWeight: 500,
                                fontSize: '12px'
                            }}
                        >
                            Verify certificates and manage active medicine ingredients
                        </Typography>
                    </Box>
                </Box>

                {/* Form Body - Compact padding, scrollable on responsive */}
                <Box
                    sx={{
                        p: 2.5,
                        backgroundColor: '#FCFDFE',
                        overflowY: 'auto',
                        flex: 1
                    }}
                >
                    <Grid container spacing={2}>
                        {/* LEFT COLUMN: Metadata & Ingredients */}
                        <Grid xs={12} md={6}>
                            <Stack spacing={2}>
                                {/* General Information Card */}
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
                                                Medicine Name <span style={{ color: '#EF4444' }}>*</span>
                                            </Typography>
                                            <Input
                                                placeholder="Enter full medicine name"
                                                value={medicineName}
                                                onChange={(e) => setMedicineName(e.target.value)}
                                                sx={{
                                                    borderRadius: '6px',
                                                    border: '1px solid #CBD5E1',
                                                    backgroundColor: '#FFFFFF',
                                                    fontWeight: 500,
                                                    fontSize: '13px',
                                                    color: '#0F172A',
                                                    height: '36px',
                                                    '&:focus-within': {
                                                        borderColor: '#7c51a1',
                                                        boxShadow: '0 0 0 2px rgba(124, 81, 161, 0.2)'
                                                    }
                                                }}
                                            />
                                        </Box>

                                        <Box>
                                            <Typography sx={{ fontWeight: 600, color: '#475569', mb: 0.5, fontSize: '13px' }}>
                                                Description / Notes
                                            </Typography>
                                            <Textarea
                                                minRows={2}
                                                maxRows={3}
                                                placeholder="Enter clinical notes or instructions..."
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                sx={{
                                                    borderRadius: '6px',
                                                    border: '1px solid #CBD5E1',
                                                    backgroundColor: '#FFFFFF',
                                                    fontWeight: 500,
                                                    fontSize: '13px',
                                                    color: '#0F172A',
                                                    '&:focus-within': {
                                                        borderColor: '#7c51a1',
                                                        boxShadow: '0 0 0 2px rgba(124, 81, 161, 0.2)'
                                                    }
                                                }}
                                            />
                                        </Box>
                                    </Stack>
                                </Card>

                                {/* Active Ingredients (Content Details) */}
                                <Card
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        borderRadius: '12px',
                                        borderColor: '#E2E8F0',
                                        backgroundColor: '#FFFFFF'
                                    }}
                                >
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
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
                                                Content Detail <span style={{ color: '#EF4444' }}>*</span>
                                            </Typography>
                                        </Box>
                                        <Button
                                            variant="outlined"
                                            size="sm"
                                            onClick={handleAddContentRow}
                                            startDecorator={<AddIcon />}
                                            sx={{
                                                borderColor: '#7c51a1',
                                                color: '#7c51a1',
                                                fontWeight: 600,
                                                borderRadius: '6px',
                                                fontSize: '12px',
                                                py: 0.5,
                                                '&:hover': {
                                                    backgroundColor: 'rgba(124, 81, 161, 0.05)',
                                                    borderColor: '#7c51a1'
                                                }
                                            }}
                                        >
                                            Add Row
                                        </Button>
                                    </Stack>

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
                                                No Content Detail added yet.
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Stack spacing={1} sx={{ maxHeight: '120px', overflowY: 'auto' }}>
                                            {contentRows?.map((row) => (
                                                <Box key={row.id} sx={{ display: 'flex', gap: 1, alignItems: 'center', width: '100%' }}>
                                                    <Input
                                                        placeholder="Ingredient Name"
                                                        value={row?.name}
                                                        onChange={(e) => handleContentRowChange(row.id, 'name', e.target.value)}
                                                        sx={{
                                                            flex: 4,
                                                            borderRadius: '6px',
                                                            border: '1px solid #CBD5E1',
                                                            backgroundColor: '#FFFFFF',
                                                            fontWeight: 500,
                                                            fontSize: '13px',
                                                            color: '#0F172A',
                                                            height: '32px'
                                                        }}
                                                    />
                                                    <Input
                                                        placeholder="Qty"
                                                        value={row?.qty}
                                                        onChange={(e) => handleContentRowChange(row.id, 'qty', e.target.value)}
                                                        sx={{
                                                            flex: 2,
                                                            borderRadius: '6px',
                                                            border: '1px solid #CBD5E1',
                                                            backgroundColor: '#FFFFFF',
                                                            fontWeight: 500,
                                                            fontSize: '13px',
                                                            color: '#0F172A',
                                                            textAlign: 'center',
                                                            height: '32px'
                                                        }}
                                                    />
                                                    <IconButton
                                                        variant="plain"
                                                        color="danger"
                                                        onClick={() => handleDeleteContentRow(row.id)}
                                                        sx={{
                                                            borderRadius: '6px',
                                                            width: '32px',
                                                            height: '32px',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(239, 68, 68, 0.08)'
                                                            }
                                                        }}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            ))}
                                        </Stack>
                                    )}
                                </Card>
                            </Stack>
                        </Grid>

                        {/* RIGHT COLUMN: Certificates & Verification */}
                        <Grid xs={12} md={6}>
                            <Stack spacing={2}>
                                {/* Certificates Card */}
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
                                            Regulatory Certificates <span style={{ color: '#EF4444' }}>*</span>
                                        </Typography>
                                    </Box>

                                    <Stack spacing={1}>
                                        <CertificateItem
                                            title="GMP Certificate"
                                            file={gmpFile}
                                            onFileChange={setGmpFile}
                                            onRemoveFile={() => {
                                                setGmpFile(null)
                                                setGmpApproved(false)
                                            }}
                                            checked={gmpApproved}
                                            onCheckedChange={(e) => setGmpApproved(e.target.checked)}
                                            onFileClick={handleViewFile}
                                        />
                                        <CertificateItem
                                            title="Analysis Certificate"
                                            file={analysisFile}
                                            onFileChange={setAnalysisFile}
                                            onRemoveFile={() => {
                                                setAnalysisFile(null)
                                                setAnalysisApproved(false)
                                            }}
                                            checked={analysisApproved}
                                            onCheckedChange={(e) => setAnalysisApproved(e.target.checked)}
                                            onFileClick={handleViewFile}
                                        />
                                        <CertificateItem
                                            title="Quotation"
                                            file={quotationFile}
                                            onFileChange={setQuotationFile}
                                            onRemoveFile={() => {
                                                setQuotationFile(null)
                                                setQuotationApproved(false)
                                            }}
                                            checked={quotationApproved}
                                            onCheckedChange={(e) => setQuotationApproved(e.target.checked)}
                                            onFileClick={handleViewFile}
                                        />
                                        <CertificateItem
                                            title="Package Cover / Insert"
                                            file={productFile}
                                            onFileChange={setProductFile}
                                            onRemoveFile={() => {
                                                setProductFile(null)
                                                setProductApproved(false)
                                            }}
                                            checked={productApproved}
                                            onCheckedChange={(e) => setProductApproved(e.target.checked)}
                                            onFileClick={handleViewFile}
                                        />
                                    </Stack>
                                </Card>

                                {/* Supporting Documents Upload Card (Compact horizontal style) */}
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
                                            <Typography level="body-xs" sx={{ color: '#64748B', fontSize: '11px' }}>
                                                Upload additional clinical studies or drug licensing files
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Box
                                        sx={{
                                            border: '1.5px dashed #CBD5E1',
                                            borderRadius: '8px',
                                            p: 1.25,
                                            textAlign: 'center',
                                            backgroundColor: '#F8FAFC',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            position: 'relative',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 1.5,
                                            '&:hover': {
                                                borderColor: '#7c51a1',
                                                backgroundColor: '#F5F3F7'
                                            }
                                        }}
                                    >
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                opacity: 0,
                                                cursor: 'pointer',
                                                zIndex: 1
                                            }}
                                        />
                                        <CloudUploadIcon sx={{ fontSize: '20px', color: '#94A3B8' }} />
                                        <Typography level="body-xs" sx={{ color: '#1E293B', fontWeight: 600 }}>
                                            Click to upload or drag files here
                                        </Typography>
                                    </Box>

                                    {(existingSupportingFiles?.length > 0 || supportingFiles?.length > 0) && (
                                        <Stack spacing={1} sx={{ mt: 1.5, maxHeight: '120px', overflowY: 'auto' }}>
                                            {/* Existing Files */}
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
                                                    <IconButton
                                                        size="sm"
                                                        variant="plain"
                                                        color="danger"
                                                        onClick={() => handleRemoveExistingFile(file.otherdetails_slno)}
                                                        sx={{
                                                            borderRadius: '6px',
                                                            p: 0.5,
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(239, 68, 68, 0.08)'
                                                            }
                                                        }}
                                                    >
                                                        <DeleteIcon fontSize="small" sx={{ fontSize: '16px' }} />
                                                    </IconButton>
                                                </Box>
                                            ))}
                                            {/* New Files */}
                                            {supportingFiles?.map((file, idx) => (
                                                <Box
                                                    key={`new-${file?.name}-${idx}`}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        p: 1,
                                                        borderRadius: '8px',
                                                        border: '1px solid #E2E8F0',
                                                        backgroundColor: '#E0F2FE' // slight blue tint for new files
                                                    }}
                                                >
                                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
                                                        <InsertDriveFileOutlinedIcon sx={{ fontSize: '18px', color: '#0284C7', flexShrink: 0 }} />
                                                        <Typography
                                                            component="a"
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleViewFile(file, file?.name);
                                                            }}
                                                            level="body-xs"
                                                            sx={{
                                                                fontWeight: 600,
                                                                color: '#0369A1',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap',
                                                                textDecoration: 'none',
                                                                '&:hover': {
                                                                    textDecoration: 'underline'
                                                                }
                                                            }}
                                                        >
                                                            {file?.name}
                                                        </Typography>
                                                    </Stack>
                                                    <IconButton
                                                        size="sm"
                                                        variant="plain"
                                                        color="danger"
                                                        onClick={() => handleRemoveFile(idx)}
                                                        sx={{
                                                            borderRadius: '6px',
                                                            p: 0.5,
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(239, 68, 68, 0.08)'
                                                            }
                                                        }}
                                                    >
                                                        <DeleteIcon fontSize="small" sx={{ fontSize: '16px' }} />
                                                    </IconButton>
                                                </Box>
                                            ))}
                                        </Stack>
                                    )}
                                </Card>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>

                {/* Footer Action Panel (Compact) */}
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
                        variant="outlined"
                        color="neutral"
                        onClick={onClose}
                        sx={{
                            borderRadius: '8px',
                            fontWeight: 600,
                            px: 3,
                            py: 0.75,
                            fontSize: '13px',
                            borderColor: '#CBD5E1',
                            '&:hover': {
                                backgroundColor: '#F1F5F9'
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        onClick={handleSave}
                        sx={{
                            borderRadius: '8px',
                            fontWeight: 600,
                            px: 3,
                            py: 0.75,
                            fontSize: '13px',
                            background: 'linear-gradient(135deg, #7c51a1, #6d5391)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #875db5, #6e3f9e)'
                            }
                        }}
                    >
                        Save Documentation
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default memo(MedicineFilesViewModal)

