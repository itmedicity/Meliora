import React, { memo, useState } from 'react'
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

const PaymentTermsAndCondition = () => {

    const [terms, setTerms] = useState([''])
    const [validUpto, setValidUpto] = useState(
        new Date().toISOString().split('T')[0]
    )

    const handleChange = (index, value) => {
        const updated = [...terms]
        updated[index] = value
        setTerms(updated)
    }

    const addTerm = () => {
        setTerms([...terms, ''])
    }

    const removeTerm = (index) => {
        if (terms.length === 1) return
        setTerms(terms.filter((_, i) => i !== index))
    }


    return (
        <Card
            sx={{
                maxWidth: 800,
                mx: 'auto',
                p: 3,
                borderRadius: '2xl',
                boxShadow: 'xl',
                background:
                    'linear-gradient(145deg,#ffffff,#eef2ff)',
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
                    Terms & Conditions
                </Typography>
                <Chip size="sm" variant="soft" color="primary">
                    Work Order
                </Chip>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Valid Upto */}
            <Box sx={{ mb: 3 }}>
                <Typography level="body-sm" fontWeight={600}>
                    Valid Upto
                </Typography>
                <Input
                    type="date"
                    value={validUpto}
                    onChange={(e) => setValidUpto(e.target.value)}
                    sx={{
                        maxWidth: 260,
                        mt: 0.5,
                        borderRadius: 'lg',
                        bgcolor: '#eef2ff',
                        fontWeight: 700
                    }}
                />
            </Box>

            {/* Terms List */}
            <Box>
                {terms.map((term, index) => (
                    <Card
                        key={index}
                        variant="soft"
                        sx={{
                            mb: 2,
                            p: 2,
                            borderRadius: 'xl',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            background:
                                'linear-gradient(90deg,#f8fafc,#eef2ff)'
                        }}
                    >
                        <Typography
                            fontWeight={800}
                            sx={{ color: '#4f46e5' }}
                        >
                            {index + 1}.
                        </Typography>

                        <Input
                            fullWidth
                            value={term}
                            onChange={(e) =>
                                handleChange(index, e.target.value)
                            }
                            placeholder="Enter term or condition"
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

            {/* Actions */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 3,
                    p: 2,
                    borderRadius: 'xl',
                    background:
                        'linear-gradient(90deg,#eef2ff,#f5f3ff)'
                }}
            >
                <Button
                    startDecorator={<AddIcon />}
                    variant="soft"
                    color="primary"
                    onClick={addTerm}
                    sx={{
                        borderRadius: 'xl',
                        fontWeight: 700
                    }}
                >
                    Add Term
                </Button>

                <Typography level="body-sm" fontWeight={600}>
                    {terms.length} term(s) added
                </Typography>
            </Box>

        </Card>
    )
}


export default memo(PaymentTermsAndCondition) 