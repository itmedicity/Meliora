import React, { memo, useCallback, useMemo } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { setRetentionDetails } from '../../../redux/actions/Workorder.action'

const RetentialDetails = ({ localdata }) => {

    const dispatch = useDispatch()


    const localRentalData = localdata?.retentionDetails || ""


    console.log({
        localRentalData
    });



    const retentionDatas = useSelector(
        state => state.getworkOrderReducer.retentionDetails
    )

    const retentionData = useMemo(() => retentionDatas, [retentionDatas])

    const handleChange = useCallback((e) => {
        const { name, value } = e.target

        dispatch(setRetentionDetails({
            [name]: value
        }))

    }, [dispatch])

    const handlePaymentType = useCallback((e, value) => {
        dispatch(setRetentionDetails({
            paymentType: value,
            amount: ''
        }))
    }, [dispatch])



    return (
        <Card
            sx={{
                height: 440,
                p: 3,
                borderRadius: '2xl',
                boxShadow: 'xl',
                background:
                    'linear-gradient(135deg, #fdfbff, #eef2ff)',
                backdropFilter: 'blur(8px)',
                animation: 'fadeUp 0.4s ease',
                '@keyframes fadeUp': {
                    from: { opacity: 0, transform: 'translateY(10px)' },
                    to: { opacity: 1, transform: 'translateY(0)' }
                }
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
                minRows={6}
                maxRows={7}
                name="description"
                value={retentionData.description || localRentalData.description || ''}
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
                        value={retentionData.paymentType || localRentalData.paymentType || null}
                        onChange={handlePaymentType}
                        sx={{
                            mt: 0.5,
                            borderRadius: 'lg',
                        }}
                    >
                        <Option value="amount">Fixed Amount</Option>
                        <Option value="percentage">Fixed Percentage</Option>
                    </Select>
                </Box>

                {retentionData.paymentType && (
                    <Box mt={1} sx={{ flex: 1 }}>
                        <Typography level="body-sm" fontWeight={700}>
                            {(retentionData.paymentType || localRentalData.paymentType) === 'amount'
                                ? 'Retention Amount (₹)'
                                : 'Retention Percentage (%)'}
                        </Typography>

                        <Input
                            type="number"
                            name="amount"
                            value={retentionData.amount || localRentalData.amount || ''}
                            onChange={handleChange}
                            placeholder={
                                (retentionData.paymentType || localRentalData.paymentType) === 'amount'
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
