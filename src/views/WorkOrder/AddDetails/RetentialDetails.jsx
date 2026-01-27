import React, { memo, useCallback } from 'react'
import {
    Box,
    Card,
    Typography,
    Input,
    Textarea,
    Select,
    Option,
    Divider,
    Chip
} from '@mui/joy'
import PaymentsIcon from '@mui/icons-material/Payments'

const RetentialDetails = ({ retentionData, setRetentionData }) => {

    const handleChange = useCallback((e) => {
        const { name, value } = e.target
        setRetentionData(prev => ({ ...prev, [name]: value }))
    }, [setRetentionData])

    const handlePaymentType = (e, value) => {
        setRetentionData(prev => ({
            ...prev,
            paymentType: value,
            amount: ''
        }))
    }

    return (
        <Card
            sx={{
                height: 440,
                // maxWidth: 700,
                mx: 'auto',
                p: 3,
                borderRadius: '2xl',
                boxShadow: 'xl',
                background: 'linear-gradient(145deg,#ffffff,#eef2ff)',
                animation: 'fadeIn 0.4s ease'
            }}
        >
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PaymentsIcon sx={{ color: '#4f46e5' }} />
                <Typography level="h4" fontWeight={800}>
                    Retention Details
                </Typography>
                <Chip size="sm" variant="soft" color="primary">
                    Optional
                </Chip>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Description */}
            <Typography level="body-sm" fontWeight={600}>
                Description
            </Typography>
            <Textarea
                minRows={4}
                maxRows={5}
                name="description"
                value={retentionData?.description || ''}
                onChange={handleChange}
                placeholder="Enter retention terms & conditions..."
                sx={{ mt: 0.5, borderRadius: 'lg' }}
            />

            {/* Payment Type */}
            <Box sx={{ display: "flex", gap: 1 }}>
                <Box mt={1} sx={{ flex: 1 }}>
                    <Typography level="body-sm" fontWeight={600}>
                        Payment Type
                    </Typography>

                    <Select
                        placeholder="Select retention type"
                        value={retentionData?.paymentType || ''}
                        onChange={handlePaymentType}
                        sx={{
                            mt: 0.5,
                            borderRadius: 'lg',
                            '--Select-focusedThickness': '2px',
                            '--Select-focusedHighlight': '#6366f1'
                        }}
                    >
                        <Option value="amount">Fixed Amount</Option>
                        <Option value="percentage">Fixed Percentage</Option>
                    </Select>
                </Box>

                {retentionData?.paymentType && (
                    <Box mt={1} sx={{ flex: 1 }}>
                        <Typography level="body-sm" fontWeight={700}>
                            {retentionData.paymentType === 'amount'
                                ? 'Retention Amount (₹)'
                                : 'Retention Percentage (%)'}
                        </Typography>

                        <Input
                            type="number"
                            name="amount"
                            value={retentionData?.amount || ''}
                            onChange={handleChange}
                            placeholder={
                                retentionData.paymentType === 'amount'
                                    ? '₹ 0.00'
                                    : '0 %'
                            }
                            sx={{
                                mt: 0.5,
                                borderRadius: 'lg',
                                bgcolor: '#eef2ff',
                                fontWeight: 800,
                                color: '#4338ca'
                            }}
                        />
                    </Box>
                )}
            </Box>
        </Card>
    )
}

export default memo(RetentialDetails)
