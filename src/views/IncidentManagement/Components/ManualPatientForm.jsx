import React, { useCallback, useState } from 'react';
import { Box, Input, Tooltip, Select, Option, Typography } from '@mui/joy';
import PersonIcon from '@mui/icons-material/Person';
import WcIcon from '@mui/icons-material/Wc';
import BadgeIcon from '@mui/icons-material/Badge';
import { FaTransgender } from "react-icons/fa";
import PhoneIcon from '@mui/icons-material/Phone';
import { FaAddressBook } from "react-icons/fa6";
import IncidentTextComponent from './IncidentTextComponent';
import CardHeader from './CardHeader';
import { IoPersonCircleSharp, IoArrowBackCircleOutline } from "react-icons/io5";

const ManualPatientForm = ({
    formData,
    setFormData,
    goBack,
    setPatientDetail
}) => {


    console.log(formData,"formData");
    
    const [errors, setErrors] = useState({});

    const handleChange = (field) => (e) => {
        setFormData((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
        setErrors((prev) => ({ ...prev, [field]: null }));
    };

    const handleSelectChange = (field) => (event, newValue) => {
        setFormData((prev) => ({
            ...prev,
            [field]: newValue,
        }));
        setErrors((prev) => ({ ...prev, [field]: null }));
    };

    const fields = [
        { label: 'Name', icon: <PersonIcon fontSize="small" />, field: 'fb_ptc_name', type: 'input' },
        { label: 'Age', icon: <WcIcon fontSize="small" />, field: 'fb_ptn_yearage', type: 'input' },
        {
            label: 'Gender', icon: <FaTransgender fontSize={18} />, field: 'fb_ptc_sex', type: 'select', options: [
                { value: 'M', label: 'Male' },
                { value: 'F', label: 'Female' },
                { value: 'Other', label: 'Other' }
            ]
        },
        { label: 'IP Number', icon: <BadgeIcon fontSize="small" />, field: 'fb_pt_no', type: 'input' },
        { label: 'Mobile', icon: <PhoneIcon fontSize="small" />, field: 'fb_ptc_mobile', type: 'input' },
        { label: 'Address', icon: <FaAddressBook fontSize={18} />, field: 'fb_ptc_loadd1', type: 'input' },
    ];


    // Function to Handle the Paient Record Mannual Insertion 
    const HandleFormSubmitting = useCallback(() => {
        // Object to  Track if any Error occured
        const newErrors = {};

        if (!formData.fb_ptc_name?.trim()) newErrors.fb_ptc_name = "Name is required";
        if (!formData.fb_ptc_sex) newErrors.fb_ptc_sex = "Gender is required";
        if (!formData.fb_ptn_yearage || isNaN(formData.fb_ptn_yearage)) newErrors.fb_ptn_yearage = "Valid age required";
        if (!formData.fb_pt_no?.trim()) newErrors.fb_pt_no = "IP Number required";
        if (!formData.fb_ptc_mobile?.match(/^\d{10}$/)) newErrors.fb_ptc_mobile = "Valid 10-digit mobile number"; // The the match check if the Enter number is vlaid and has 10 digit
        if (!formData.fb_ptc_loadd1?.trim()) newErrors.fb_ptc_loadd1 = "Address is required";

        // Throw if any Error Occure
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        // Proceed with submission 
        setPatientDetail([formData])
        goBack(false) // check this part later 

    }, [formData, setPatientDetail]);

    return (
        <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 1, border: '1.5px solid #d8dde2ff', p: 2, borderRadius: 5, position: 'relative' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <CardHeader icon={IoPersonCircleSharp} text="Add Patient Details" size={28} />
                <Tooltip title="Go Back">
                    <span>
                        <IoArrowBackCircleOutline size={23} style={{ cursor: 'pointer' }} onClick={() => goBack(false)} />
                    </span>
                </Tooltip>
            </Box>
            {/* Other Fields */}
            {fields?.map(({ label, icon, field, type, options }) => (
                <Box key={field} display="flex" flexDirection="column" gap={0.5}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Tooltip title={label} ><span style={{ cursor: 'pointer' }}>{icon}</span></Tooltip>
                        {type === 'select' ? (
                            <Select
                                value={formData[field] || ''}
                                onChange={handleSelectChange(field)}
                                placeholder={`Select ${label}`}
                                sx={{
                                    flex: 1,
                                    fontSize: 14,
                                    '--Input-focusedThickness': '0px',
                                    '--Input-focusedHighlight': 'transparent',
                                    boxShadow: 'none',
                                }}
                                error={!!errors[field]}
                            >
                                {options.map((opt) => (
                                    <Option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </Option>
                                ))}
                            </Select>
                        ) : (
                            <Input
                                placeholder={`Enter ${label}`}
                                value={formData[field] || ''}
                                onChange={handleChange(field)}
                                error={!!errors[field]}
                                sx={{
                                    flex: 1,
                                    fontSize: 14,
                                    px: 1,
                                    '--Input-focusedThickness': '0px',
                                    '--Input-focusedHighlight': 'transparent',
                                    boxShadow: 'none',
                                }}
                            />
                        )}
                    </Box>
                    {errors[field] && (
                        <Typography level="body-xs" color="danger">
                            {errors[field]}
                        </Typography>
                    )}
                </Box>
            ))}


            {/* Save Button */}
            <Box onClick={HandleFormSubmitting} variant="soft" color="success" sx={{
                width: 80,
                px: 0.8,
                py: 0.5,
                border: '1.5px solid #d8dde2ff',
                bgcolor: 'var(--royal-purple-300)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                },
            }}>
                <IncidentTextComponent text="save" color="#ffffff" size={13} weight={400} />
            </Box>
        </Box>
    );
};

export default ManualPatientForm;
