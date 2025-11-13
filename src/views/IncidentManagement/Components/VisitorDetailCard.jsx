import React, { useState, useCallback } from 'react';
import { Box, Input, Tooltip, Select, Option, Typography } from '@mui/joy';
import PersonIcon from '@mui/icons-material/Person';
import WcIcon from '@mui/icons-material/Wc';
import PhoneIcon from '@mui/icons-material/Phone';
import { FaTransgender, FaMapMarkedAlt } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa6";
import { IoPersonCircleSharp, IoArrowBackCircleOutline } from "react-icons/io5";
import IncidentTextComponent from './IncidentTextComponent';
import CardHeader from './CardHeader';
import DescriptionIcon from '@mui/icons-material/Description';


const VisitorDetailCard = ({
    formData,
    setFormData,
    setVisitorDetail,
    goBack,
    visitordata
}) => {

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
        { label: 'Visitor Name', icon: <PersonIcon fontSize="small" />, field: 'visitor_name', type: 'input' },
        { label: 'Age', icon: <WcIcon fontSize="small" />, field: 'visitor_age', type: 'input' },
        {
            label: 'Gender', icon: <FaTransgender fontSize={18} />, field: 'visitor_gender', type: 'select', options: [
                { value: 'M', label: 'Male' },
                { value: 'F', label: 'Female' },
                { value: 'Other', label: 'Other' }
            ]
        },
        { label: 'Mobile Number', icon: <PhoneIcon fontSize="small" />, field: 'visitor_mobile', type: 'input' },
        { label: 'Address', icon: <FaAddressBook fontSize={18} />, field: 'visitor_address', type: 'input' },
        { label: 'Incident Location', icon: <FaMapMarkedAlt fontSize={18} />, field: 'incident_location', type: 'input' },
        { label: 'Purpose of Visit', icon: <DescriptionIcon fontSize="small" />, field: 'purpose', type: 'input' },
    ];

    const HandleFormSubmitting = useCallback(() => {
        const newErrors = {};

        if (!formData?.visitor_name?.trim()) newErrors.visitor_name = "Name is required";
        if (!formData?.visitor_gender) newErrors.visitor_gender = "Gender is required";
        if (!formData?.visitor_age || isNaN(formData?.visitor_age)) newErrors.visitor_age = "Valid age required";
        if (!formData?.visitor_mobile?.match(/^\d{10}$/)) newErrors.visitor_mobile = "Valid 10-digit mobile number required";
        if (!formData?.visitor_address?.trim()) newErrors.visitor_address = "Address is required";
        if (!formData?.incident_location?.trim()) newErrors.incident_location = "Incident location is required";
        if (!formData?.purpose?.trim()) newErrors.purpose = "Purpose of incident is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        // Proceed with setting visitor details
        setVisitorDetail([formData]);
        goBack(true)
    }, [formData,
        setVisitorDetail
    ]);

    return (
        <Box display="flex"
            flexDirection="column"
            gap={2}
            sx={{
                mt: 1,
                border: '1.5px solid #d8dde2ff',
                p: 2,
                borderRadius: 5,
                position: 'relative'
            }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <CardHeader icon={IoPersonCircleSharp} text="Add Visitor Details" size={28} />
                {
                    visitordata?.length > 0 &&
                    <Tooltip title="Go Back">
                        <span>
                            <IoArrowBackCircleOutline size={23} style={{ cursor: 'pointer' }} onClick={() => goBack(true)} />
                        </span>
                    </Tooltip>
                }

            </Box>

            {/* Fields */}
            {fields.map(({ label, icon, field, type, options }) => (
                <Box key={field} display="flex" flexDirection="column" gap={0.5}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Tooltip title={label}>
                            <span style={{ cursor: 'pointer' }}>{icon}</span>
                        </Tooltip>
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

export default VisitorDetailCard;
