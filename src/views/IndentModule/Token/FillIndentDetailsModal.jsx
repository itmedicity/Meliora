import React, { useState } from 'react';
import { Modal, ModalDialog, ModalClose, Typography, Input, Button, Stack, Box, FormControl, FormLabel, IconButton, Divider, Card } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import MedicationIcon from '@mui/icons-material/Medication';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const FillIndentDetailsModal = ({ open, onClose }) => {
    const [tradeName, setTradeName] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [therapeuticClass, setTherapeuticClass] = useState('');

    // Single Chemical Content
    const [chemicalName, setChemicalName] = useState('');
    const [chemicalQty, setChemicalQty] = useState('');

    const [repName, setRepName] = useState('');
    const [contactNo, setContactNo] = useState('');

    const [suppliers, setSuppliers] = useState([{ name: '' }]);

    const handleAddSupplier = () => {
        setSuppliers([...suppliers, { name: '' }]);
    };

    const handleRemoveSupplier = (index) => {
        const newSuppliers = [...suppliers];
        newSuppliers.splice(index, 1);
        setSuppliers(newSuppliers);
    };

    const handleSupplierChange = (index, value) => {
        const newSuppliers = [...suppliers];
        newSuppliers[index].name = value;
        setSuppliers(newSuppliers);
    };

    const handleSubmit = () => {
        // Handle submit logic here
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog
                sx={{
                    width: { xs: '95vw', sm: '650px' },
                    maxWidth: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    p: 0,
                    borderRadius: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    border: 'none',
                    bgcolor: '#F8FAFC' // Soft background for the whole modal
                }}
            >
                {/* Header with vibrant gradient */}
                <Box sx={{
                    p: { xs: 2.5, sm: 3 },
                    background: 'linear-gradient(135deg,#7c51a1 100%)',
                    position: 'relative',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px'
                }}>
                    <ModalClose sx={{ top: 16, right: 16, color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }} />
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex' }}>
                            <MedicationIcon sx={{ color: 'white', fontSize: '28px' }} />
                        </Box>
                        <Box>
                            <Typography level="h4" sx={{ color: 'white', fontWeight: 700, mb: 0.5, fontSize: { xs: '18px', sm: '22px' } }}>
                                Indent Details
                            </Typography>
                            <Typography level="body-sm" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: { xs: '12px', sm: '14px' } }}>
                                Register a new drug or surgical item
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

                {/* Form Body - White Cards on Soft Background */}
                <Box sx={{ p: { xs: 2, sm: 3 } }}>
                    <Stack spacing={2.5}>

                        {/* Card 1: Drug Info & Chemical */}
                        <Card variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: '12px', bgcolor: 'white', borderColor: '#E2E8F0', boxShadow: 'sm' }}>
                            <Typography level="title-sm" sx={{ color: '#4F46E5', fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                1. Product Specifications
                            </Typography>

                            <Stack spacing={2}>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel sx={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Trade Name</FormLabel>
                                        <Input size="md" placeholder="e.g. Paracetamol" value={tradeName} onChange={(e) => setTradeName(e.target.value)} />
                                    </FormControl>
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel sx={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Manufacturer</FormLabel>
                                        <Input size="md" placeholder="e.g. Pfizer" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
                                    </FormControl>
                                </Stack>

                                <FormControl>
                                    <FormLabel sx={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Therapeutic Class</FormLabel>
                                    <Input size="md" placeholder="e.g. Analgesic" value={therapeuticClass} onChange={(e) => setTherapeuticClass(e.target.value)} />
                                </FormControl>

                                <Divider sx={{ my: 1 }} />

                                <Typography level="body-sm" sx={{ fontWeight: 700, color: '#475569' }}>Single Chemical Content</Typography>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <FormControl sx={{ flex: 2 }}>
                                        <FormLabel sx={{ fontSize: '12px', color: '#64748B' }}>Chemical Name</FormLabel>
                                        <Input size="md" placeholder="Chemical name" value={chemicalName} onChange={(e) => setChemicalName(e.target.value)} />
                                    </FormControl>
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel sx={{ fontSize: '12px', color: '#64748B' }}>Quantity</FormLabel>
                                        <Input size="md" placeholder="e.g. 500mg" value={chemicalQty} onChange={(e) => setChemicalQty(e.target.value)} />
                                    </FormControl>
                                </Stack>
                            </Stack>
                        </Card>

                        {/* Card 2: Representative Info */}
                        <Card variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: '12px', bgcolor: 'white', borderColor: '#E2E8F0', boxShadow: 'sm' }}>
                            <Typography level="title-sm" sx={{ color: '#4F46E5', fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                2. Representative Information
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <FormControl sx={{ flex: 1 }}>
                                    <FormLabel sx={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Full Name</FormLabel>
                                    <Input size="md" placeholder="Enter full name" value={repName} onChange={(e) => setRepName(e.target.value)} />
                                </FormControl>
                                <FormControl sx={{ flex: 1 }}>
                                    <FormLabel sx={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Contact Number</FormLabel>
                                    <Input size="md" placeholder="Phone number" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                                </FormControl>
                            </Stack>
                        </Card>

                        {/* Card 3: Suppliers */}
                        <Card variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: '12px', bgcolor: 'white', borderColor: '#E2E8F0', boxShadow: 'sm' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography level="title-sm" sx={{ color: '#4F46E5', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    3. Approved Suppliers
                                </Typography>
                                <Button variant="soft" color="primary" size="sm" startDecorator={<AddIcon />} onClick={handleAddSupplier} sx={{ borderRadius: '8px', fontWeight: 600 }}>
                                    Add
                                </Button>
                            </Box>

                            <Stack spacing={1.5}>
                                {suppliers.map((item, index) => (
                                    <Stack direction="row" spacing={1} key={index} alignItems="center">
                                        <Box sx={{ width: '28px', height: '28px', borderRadius: '50%', bgcolor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
                                            {index + 1}
                                        </Box>
                                        <Input
                                            size="md"
                                            placeholder={`Enter supplier ${index + 1} name`}
                                            sx={{ flex: 1 }}
                                            value={item.name}
                                            onChange={(e) => handleSupplierChange(index, e.target.value)}
                                        />
                                        {suppliers.length > 1 && (
                                            <IconButton
                                                variant="plain"
                                                color="danger"
                                                size="sm"
                                                onClick={() => handleRemoveSupplier(index)}
                                                sx={{ '&:hover': { bgcolor: '#FEE2E2' }, flexShrink: 0 }}
                                            >
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                    </Stack>
                                ))}
                            </Stack>
                        </Card>

                    </Stack>
                </Box>

                {/* Footer Action */}
                <Box sx={{ p: { xs: 2, sm: 3 }, pt: 1, display: 'flex', flexDirection: { xs: 'column-reverse', sm: 'row' }, justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="outlined" color="neutral" onClick={onClose} sx={{ fontWeight: 600, color: '#475569', borderRadius: '8px', width: { xs: '100%', sm: 'auto' }, py: { xs: 1.5, sm: 1 } }}>
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        onClick={handleSubmit}
                        startDecorator={<CheckCircleIcon />}
                        sx={{
                            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                            color: 'white',
                            fontWeight: 600,
                            borderRadius: '8px',
                            px: 4,
                            py: { xs: 1.5, sm: 1 },
                            width: { xs: '100%', sm: 'auto' },
                            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
                            transition: 'all 0.2s',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #4338CA 0%, #6D28D9 100%)',
                                transform: 'translateY(-1px)',
                                boxShadow: '0 6px 20px rgba(79, 70, 229, 0.5)'
                            },
                        }}
                    >
                        Save Details
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default FillIndentDetailsModal;
