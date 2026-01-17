import React, { memo, useState, useCallback } from 'react'
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

const RetentialDetails = () => {

    const [retentialData, setRetentialData] = useState({
        description: '',
        paymentType: '',
        amount: ''
    })

    const handleChange = useCallback((e) => {
        const { name, value } = e.target
        setRetentialData(prev => ({ ...prev, [name]: value }))
    }, [])

    const handlePaymentType = (e, value) => {
        setRetentialData(prev => ({
            ...prev,
            paymentType: value,
            amount: ''
        }))
    }

    return (
        <Card
            sx={{
                maxWidth: 700,
                mx: 'auto',
                p: 3,
                borderRadius: '2xl',
                boxShadow: 'xl',
                background:
                    'linear-gradient(145deg,#ffffff,#eef2ff)',
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
                name="description"
                value={retentialData.description}
                onChange={handleChange}
                placeholder="Enter retention terms & conditions..."
                sx={{
                    mt: 0.5,
                    borderRadius: 'lg'
                }}
            />

            {/* Payment Type */}
            <Box mt={3}>
                <Typography level="body-sm" fontWeight={600}>
                    Payment Type
                </Typography>

                <Select
                    placeholder="Select retention type"
                    value={retentialData.paymentType}
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

            {/* Amount / Percentage */}
            {retentialData.paymentType && (
                <Box mt={3}>
                    <Typography level="body-sm" fontWeight={700}>
                        {retentialData.paymentType === 'amount'
                            ? 'Retention Amount (₹)'
                            : 'Retention Percentage (%)'}
                    </Typography>

                    <Input
                        type="number"
                        name="amount"
                        value={retentialData.amount}
                        onChange={handleChange}
                        placeholder={
                            retentialData.paymentType === 'amount'
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


        </Card>
    )
}

export default memo(RetentialDetails)
