import React, { useState, useEffect, memo, useRef } from 'react';
import {
  Modal,
  Box,
  Typography,
  Input,
  Textarea,
  Button,
  Select,
  Option,
  Stack,
  Grid,
  Card,
  Divider
} from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CusIconButton from 'src/views/Components/CusIconButton';
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode';

const UploadIndentFormModal = ({ open, onClose, detailsData, appointmentDate, onSuccess }) => {
  const medicine = detailsData?.medicine || {};
  const contents = detailsData?.contents || [];

  const [medicineName, setMedicineName] = useState('');
  const [contentRows, setContentRows] = useState([]);
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [mrp, setMrp] = useState('');
  const [purchaseRate, setPurchaseRate] = useState('');
  const [tax, setTax] = useState('');
  const [taxList, setTaxList] = useState([]);
  const [offerDetails, setOfferDetails] = useState('');
  const [file, setFile] = useState(null);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setMedicineName(medicine.medicinename || '');
      setContentRows(contents.map(c => ({ name: c.content_name, qty: c.content_quantity })));
      setDate(appointmentDate ? format(new Date(appointmentDate), 'dd-MM-yyyy') : '');
    }
  }, [open, medicine, contents, appointmentDate]);

  useEffect(() => {
    const fetchTaxes = async () => {
      try {
        const result = await axioslogin.get('/tokenMaster/Gettax');
        if (result.data.success === 1) {
          // Filter out inactive taxes if status is available and needed.
          // Assuming we show all or status === 'Yes'
          const activeTaxes = result.data.data.filter(t => t.status === 'Yes' || t.status === 1 || t.status === '1');
          setTaxList(activeTaxes.length > 0 ? activeTaxes : result.data.data);
        }
      } catch (error) {
        console.error('Error fetching taxes', error);
      }
    };
    fetchTaxes();
  }, []);

  const handleSubmit = async () => {
    if (!quantity || !tax || !mrp || !purchaseRate || !file) {
      warningNotify("Please fill in all mandatory fields and upload the document");
      return;
    }

    try {
      // 1. Upload the file
      const formData = new FormData();
      formData.append('id', medicine.medicine_id);
      formData.append('supportingFiles', file, file.name);

      const uploadResult = await axioslogin.post('/fileupload/uploadFile/MedicalDocs', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      });

      if (uploadResult.data.success !== 1) {
          warningNotify("Error uploading document");
          return;
      }

      // 2. Update commercial details
      const postData = {
          medicine_id: medicine.medicine_id,
          purchaserate: purchaseRate,
          quotationno: quantity,
          mrp: mrp,
          taxpercentage: tax,
          offerdetails: offerDetails,
          indentform: file.name
      };

      const result = await axioslogin.patch('/indent/updateCommercialDetails', postData);
      
      if (result.data.success === 1) {
          succesNotify("Commercial details updated successfully");
          if (onSuccess) onSuccess();
          onClose();
      } else {
          warningNotify(result.data.message || "Error updating details");
      }
    } catch (error) {
        console.error("Submit Error:", error);
        warningNotify("An error occurred while submitting");
    }
  };

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backdropFilter: 'blur(6px)',
        backgroundColor: 'rgba(15, 23, 42, 0.4)'
      }}
    >
      <Box 
        sx={{ 
          bgcolor: 'background.body', 
          width: '100%',
          maxWidth: 650,
          maxHeight: '95vh',
          overflowY: 'auto',
          borderRadius: '16px', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
          border: '1px solid #E2E8F0',
          outline: 'none', 
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            p: 3, 
            borderBottom: '1px solid #e0e0e0',
            background: 'linear-gradient(to right, #F8FAFC, #F1F5F9)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: '12px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                color: '#6366f1',
            }}>
                <CloudUploadOutlinedIcon />
            </Box>
            <Box>
                <Typography level="h4" sx={{ fontWeight: 800, color: '#1E293B', fontFamily: 'Outfit, Inter, sans-serif', fontSize: '20px' }}>Upload Indent Form</Typography>
                <Typography level="body-sm" sx={{ color: '#64748B', fontWeight: 500 }}>Please fill in the commercial details and attach the document.</Typography>
            </Box>
          </Box>
          <CusIconButton onClick={onClose} variant="plain" color="neutral"><CloseIcon /></CusIconButton>
        </Box>
        
        {/* Body */}
        <Box sx={{ p: 3, bgcolor: '#FCFDFE' }}>
          <Stack spacing={3}>
            {/* Read Only Info Section */}
            <Card variant="outlined" sx={{ p: 2.5, borderRadius: '12px', borderColor: '#E2E8F0', bgcolor: '#F8FAFC' }}>
                <Typography level="title-sm" sx={{ fontWeight: 700, color: '#475569', mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px' }}>
                    Token Information
                </Typography>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                        <Typography sx={{ fontSize: '12px', color: '#64748B', fontWeight: 600, mb: 0.5 }}>Medicine Name</Typography>
                        <Input readOnly value={medicineName} variant="soft" sx={{ bgcolor: '#F1F5F9', fontWeight: 600, color: '#1E293B' }} />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Typography sx={{ fontSize: '12px', color: '#64748B', fontWeight: 600, mb: 0.5 }}>Date</Typography>
                        <Input readOnly value={date} variant="soft" startDecorator={<EventOutlinedIcon fontSize="small"/>} sx={{ bgcolor: '#F1F5F9', fontWeight: 600, color: '#1E293B' }} />
                    </Grid>
                    <Grid xs={12}>
                        <Typography sx={{ fontSize: '12px', color: '#64748B', fontWeight: 600, mb: 0.5 }}>Contents</Typography>
                        {contentRows.length > 0 ? (
                            <Stack spacing={1}>
                                {contentRows.map((row, i) => (
                                    <Stack key={i} direction="row" spacing={1}>
                                        <Input readOnly value={row.name} variant="soft" sx={{ flex: 1, bgcolor: '#F1F5F9', color: '#1E293B', fontWeight: 500 }} />
                                        <Input readOnly value={row.qty} variant="soft" sx={{ width: 100, bgcolor: '#F1F5F9', color: '#1E293B', textAlign: 'center', fontWeight: 500 }} />
                                    </Stack>
                                ))}
                            </Stack>
                        ) : (
                          <Typography level="body-sm" sx={{ color: '#94A3B8', fontStyle: 'italic', bgcolor: '#F1F5F9', p: 1, borderRadius: '6px' }}>No contents available</Typography>
                        )}
                    </Grid>
                </Grid>
            </Card>

            {/* Commercial Details Section */}
            <Box>
                <Typography level="title-sm" sx={{ fontWeight: 700, color: '#1E293B', mb: 2, fontFamily: 'Outfit, Inter, sans-serif' }}>
                    Commercial Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                        <Typography sx={{ fontSize: '13px', color: '#475569', fontWeight: 600, mb: 0.5 }}>Quantity <span style={{color:'red'}}>*</span></Typography>
                        <Input 
                            placeholder="Enter quantity" 
                            value={quantity} 
                            onChange={e => setQuantity(e.target.value)}
                            startDecorator={<ShoppingCartOutlinedIcon fontSize="small" sx={{ color: '#94A3B8' }}/>} 
                            sx={{ borderRadius: '8px', bgcolor: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', '&:focus-within': { borderColor: '#6366F1' } }} 
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Typography sx={{ fontSize: '13px', color: '#475569', fontWeight: 600, mb: 0.5 }}>Tax Percentage <span style={{color:'red'}}>*</span></Typography>
                        <Select 
                            placeholder="Select Tax" 
                            value={tax} 
                            onChange={(e, val) => setTax(val)}
                            sx={{ borderRadius: '8px', bgcolor: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                        >
                            {taxList.map((t) => (
                                <Option key={t.tax_id} value={t.tax_id}>
                                    {t.tax}%
                                </Option>
                            ))}
                        </Select>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Typography sx={{ fontSize: '13px', color: '#475569', fontWeight: 600, mb: 0.5 }}>MRP <span style={{color:'red'}}>*</span></Typography>
                        <Input 
                            placeholder="0.00" 
                            value={mrp} 
                            onChange={e => setMrp(e.target.value)}
                            startDecorator={<AttachMoneyOutlinedIcon fontSize="small" sx={{ color: '#94A3B8' }}/>} 
                            sx={{ borderRadius: '8px', bgcolor: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', '&:focus-within': { borderColor: '#6366F1' } }} 
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Typography sx={{ fontSize: '13px', color: '#475569', fontWeight: 600, mb: 0.5 }}>Purchase Rate <span style={{color:'red'}}>*</span></Typography>
                        <Input 
                            placeholder="0.00" 
                            value={purchaseRate} 
                            onChange={e => setPurchaseRate(e.target.value)}
                            startDecorator={<AttachMoneyOutlinedIcon fontSize="small" sx={{ color: '#94A3B8' }}/>} 
                            sx={{ borderRadius: '8px', bgcolor: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', '&:focus-within': { borderColor: '#6366F1' } }} 
                        />
                    </Grid>
                    <Grid xs={12}>
                        <Typography sx={{ fontSize: '13px', color: '#475569', fontWeight: 600, mb: 0.5 }}>Offer Details</Typography>
                        <Textarea 
                            placeholder="Enter any additional offer details or notes here..." 
                            minRows={3} 
                            value={offerDetails} 
                            onChange={e => setOfferDetails(e.target.value)} 
                            sx={{ borderRadius: '8px', bgcolor: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', '&:focus-within': { borderColor: '#6366F1' } }} 
                        />
                    </Grid>
                </Grid>
            </Box>

            <Divider />

            {/* Document Upload Section */}
            <Box>
                <Typography level="title-sm" sx={{ fontWeight: 700, color: '#1E293B', mb: 1.5, fontFamily: 'Outfit, Inter, sans-serif' }}>
                    Upload Document <span style={{color:'red'}}>*</span>
                </Typography>
                <Box 
                    sx={{ 
                        border: '2px dashed',
                        borderColor: file ? '#6366f1' : '#CBD5E1',
                        borderRadius: '12px',
                        p: 4,
                        textAlign: 'center',
                        bgcolor: file ? 'rgba(99, 102, 241, 0.04)' : '#F8FAFC',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        '&:hover': {
                            borderColor: '#6366f1',
                            bgcolor: 'rgba(99, 102, 241, 0.04)'
                        }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input 
                        type="file" 
                        hidden 
                        ref={fileInputRef}
                        onChange={e => setFile(e.target.files[0])} 
                    />
                    
                    {file ? (
                        <Stack spacing={1} alignItems="center">
                            <Box sx={{ p: 1.5, borderRadius: '50%', bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
                                <InsertDriveFileOutlinedIcon fontSize="large" />
                            </Box>
                            <Box>
                                <Typography level="body-sm" sx={{ fontWeight: 600, color: '#1E293B' }}>{file.name}</Typography>
                                <Typography level="body-xs" sx={{ color: '#64748B' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</Typography>
                            </Box>
                            <Button size="sm" variant="soft" color="neutral" sx={{ mt: 1, borderRadius: '8px' }} onClick={(e) => { e.stopPropagation(); setFile(null); }}>
                                Change File
                            </Button>
                        </Stack>
                    ) : (
                        <Stack spacing={1} alignItems="center">
                            <Box sx={{ p: 1.5, borderRadius: '50%', bgcolor: '#FFFFFF', color: '#6366f1', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', mb: 1 }}>
                                <CloudUploadOutlinedIcon fontSize="large" />
                            </Box>
                            <Box>
                                <Typography level="body-sm" sx={{ fontWeight: 600, color: '#4F46E5' }}>Click to upload <span style={{color:'#64748B', fontWeight:400}}>or drag and drop</span></Typography>
                                <Typography level="body-xs" sx={{ color: '#94A3B8', mt: 0.5 }}>PDF, DOC, DOCX up to 10MB</Typography>
                            </Box>
                        </Stack>
                    )}
                </Box>
            </Box>
          </Stack>
        </Box>

        {/* Footer */}
        <Box sx={{ p: 3, borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: 2, bgcolor: '#FFFFFF' }}>
          <Button 
            variant="outlined" 
            color="neutral" 
            onClick={onClose} 
            sx={{ borderRadius: '8px', fontWeight: 600, px: 3 }}
          >
            Cancel
          </Button>
          <Button 
            variant="solid" 
            sx={{ 
                borderRadius: '8px', 
                fontWeight: 600, 
                px: 4,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 4px 10px rgba(99, 102, 241, 0.25)',
                '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    boxShadow: '0 6px 15px rgba(99, 102, 241, 0.4)',
                }
            }}
            onClick={handleSubmit}
          >
            Upload & Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(UploadIndentFormModal);
