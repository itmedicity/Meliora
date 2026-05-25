import React, { memo, useEffect } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { setTerms } from 'src/redux/actions/Workorder.action'

const TermsAndConditions = ({ localdata }) => {

    const dispatch = useDispatch()

    const localTerms = localdata || null;


    console.log({ localTerms });



    const { terms } = useSelector(
        state => state.getworkOrderReducer
    )



    useEffect(() => {
        const reduxEmpty =
            !terms ||
            !Array.isArray(terms?.terms) ||
            terms.terms.length === 0 ||
            (
                terms.terms.length === 1 &&
                !terms.terms[0]?.text &&
                !terms.terms[0]?.date
            )

        if (
            localTerms &&
            Array.isArray(localTerms.terms) &&
            localTerms.terms.length > 0 &&
            reduxEmpty
        ) {
            dispatch(setTerms(localTerms))
        }
    }, [localTerms, terms, dispatch])
    // const retentionData = useMemo(() => retentionDatas, [retentionDatas])

    // 🛡 SAFETY GUARD
    const safeTerms = Array.isArray(terms?.terms)
        ? terms.terms
        : [{ text: '', date: '' }]

    const handleChange = (index, field, value) => {
        const updated = [...safeTerms]

        updated[index] = {
            ...updated[index],
            [field]: value
        }

        dispatch(setTerms({
            ...terms,
            terms: updated
        }))
    }

    const addTerm = () => {
        dispatch(setTerms({
            ...terms,
            terms: [...safeTerms, { text: '', date: '' }]
        }))
    }

    const removeTerm = (index) => {
        if (safeTerms.length === 1) return

        dispatch(setTerms({
            ...terms,
            terms: safeTerms.filter((_, i) => i !== index)
        }))
    }



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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Typography level="body-sm" fontWeight={600}>
                        Valid Upto
                    </Typography>
                    <Input
                        type="date"
                        value={terms?.validUpto || ''}
                        onChange={(e) =>
                            dispatch(setTerms({
                                ...terms,
                                validUpto: e.target.value
                            }))
                        }
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                        {safeTerms.length} term(s)
                    </Typography>
                </Box>
            </Box>

            {/* Terms List */}
            <Box
                sx={{
                    mt: 2,
                    maxHeight: 300,
                    overflowY: 'auto',
                }}
            >
                {safeTerms.map((term, index) => (
                    <Card
                        key={index}
                        variant="soft"
                        sx={{
                            borderRadius: 'xl',
                            display: 'flex',
                            gap: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            background: 'linear-gradient(90deg,#f8fafc,#eef2ff)',
                            mb: 1,
                            p: 1
                        }}
                    >
                        <Typography fontWeight={800} sx={{ color: '#4f46e5' }}>
                            {index + 1}.
                        </Typography>

                        <Input
                            fullWidth
                            placeholder="Enter term or condition"
                            value={term.text}
                            onChange={(e) =>
                                handleChange(index, 'text', e.target.value)
                            }
                            sx={{ borderRadius: 'lg' }}
                        />

                        <Input
                            type="date"
                            value={term.date}
                            onChange={(e) =>
                                handleChange(index, 'date', e.target.value)
                            }
                            sx={{ width: 160, borderRadius: 'lg' }}
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

export default memo(TermsAndConditions)
