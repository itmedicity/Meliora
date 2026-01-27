import React, { memo } from 'react'
import {
    Box,
    Card,
    Typography,
    Input,
    Button,
    Divider,
    IconButton,
    Chip
} from '@mui/joy'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import GavelIcon from '@mui/icons-material/Gavel'

const InvoiceOrBillingTermsAndCondition = ({
    invoiceTermsData = { validUpto: '', terms: [''] },
    setInvoiceTermsData
}) => {

    const handleChange = (index, value) => {
        const updated = [...invoiceTermsData.terms]
        updated[index] = value

        setInvoiceTermsData(prev => ({
            ...prev,
            terms: updated
        }))
    }

    const addTerm = () => {
        setInvoiceTermsData(prev => ({
            ...prev,
            terms: [...prev.terms, '']
        }))
    }

    const removeTerm = (index) => {
        if (invoiceTermsData.terms.length === 1) return

        setInvoiceTermsData(prev => ({
            ...prev,
            terms: prev.terms.filter((_, i) => i !== index)
        }))
    }

    return (
        <Card
            sx={{
                height: 440,
                mx: 'auto',
                p: 1.5,
                borderRadius: '2xl',
                boxShadow: 'xl',
                background: 'linear-gradient(145deg,#ffffff,#eef2ff)',
                animation: 'fadeUp 0.4s ease',
                '@keyframes fadeUp': {
                    from: { opacity: 0, transform: 'translateY(10px)' },
                    to: { opacity: 1, transform: 'translateY(0)' }
                }
            }}
        >
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <GavelIcon sx={{ color: '#4f46e5' }} />
                <Typography level="h4" fontWeight={800}>
                    Invoice / Billing Terms & Conditions
                </Typography>
                <Chip size="sm" variant="soft" color="primary">
                    Work Order
                </Chip>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Valid Upto */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography level="body-sm" fontWeight={600}>
                        Valid Upto
                    </Typography>
                    <Input
                        type="date"
                        value={invoiceTermsData.validUpto}
                        onChange={(e) =>
                            setInvoiceTermsData(prev => ({
                                ...prev,
                                validUpto: e.target.value
                            }))
                        }
                    />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mt: 0.5
                    }}
                >
                    <Button
                        startDecorator={<AddIcon />}
                        variant="soft"
                        color="primary"
                        onClick={addTerm}
                        sx={{ borderRadius: 'xl', fontWeight: 700 }}
                    >
                        Add Term
                    </Button>

                    <Typography level="body-sm" fontWeight={600}>
                        {invoiceTermsData.terms.length} term(s) added
                    </Typography>
                </Box>
            </Box>

            {/* Terms List */}
            <Box
                sx={{
                    maxHeight: 400,
                    overflowY: 'auto',
                    scrollbarWidth: 'thin',
                    '&::-webkit-scrollbar': { width: '6px' },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#c7d2fe',
                        borderRadius: '8px'
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: '#eef2ff'
                    }
                }}
            >
                {invoiceTermsData.terms.map((term, index) => (
                    <Card
                        key={index}
                        variant="soft"
                        sx={{
                            borderRadius: 'xl',
                            display: 'flex',
                            alignItems: 'center',
                            background: 'linear-gradient(90deg,#f8fafc,#eef2ff)',
                            flexDirection: 'row',
                            gap: 1,
                            mb: 1
                        }}
                    >
                        <Typography fontWeight={800} sx={{ color: '#4f46e5' }}>
                            {index + 1}.
                        </Typography>

                        <Input
                            fullWidth
                            value={term}
                            onChange={(e) => handleChange(index, e.target.value)}
                            placeholder="Enter invoice / billing term"
                            sx={{ borderRadius: 'lg' }}
                        />

                        <IconButton
                            color="danger"
                            variant="soft"
                            onClick={() => removeTerm(index)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Card>
                ))}
            </Box>
        </Card>
    )
}

export default memo(InvoiceOrBillingTermsAndCondition)
