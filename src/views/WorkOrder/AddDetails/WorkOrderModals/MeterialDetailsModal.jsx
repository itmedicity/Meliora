
import React, { memo, useCallback } from 'react'
import {
    Modal,
    ModalDialog,
    Box,
    Typography,
    Button,
    IconButton,
    Input,
    Divider,
    Sheet,
    Textarea
} from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import AssetUOMSelect from 'src/views/CommonSelectCode/AssetUOMSelect'
import { useDispatch, useSelector } from 'react-redux'
import { setMaterialDetails } from 'src/redux/actions/Workorder.action'
import { fieldBox, inputStyle, largeFieldBox, nameFieldBox, textareaStyle } from '../../ReUsableCodes'

const MeterialDetailsModal = ({ open, setOpen, onSave, isEdit }) => {
    const dispatch = useDispatch()

    const { materialDetails } = useSelector(
        (state) => state.getworkOrderReducer
    )

    const handleChange = useCallback((e) => {
        const { name, value, type } = e.target
        dispatch(
            setMaterialDetails({
                [name]: type === 'number' ? Number(value) : value,
            })
        )
    }, [dispatch])

    const clickToSave = useCallback(() => {
        onSave(materialDetails)
    }, [onSave, materialDetails])

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog
                sx={{
                    size: "lg",
                    width: { xs: '95%', sm: 650, md: 900, lg: 1100 },
                    maxWidth: '98%',
                    borderRadius: 14,
                    p: 0,
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                }}
            >
                {/* HEADER */}
                <Box
                    sx={{
                        px: { xs: 2, sm: 3 },
                        py: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        bgcolor: '#B7A3E3',
                        color: '#fff',
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1.5}>
                        <Inventory2OutlinedIcon sx={{ fontSize: 28 }} />
                        <Typography level="h4" fontWeight={800}>
                            {isEdit ? 'Edit Material' : 'Add Material'}
                        </Typography>
                        {isEdit && <EditOutlinedIcon sx={{ opacity: 0.85 }} />}
                    </Box>

                    <IconButton
                        onClick={() => setOpen(false)}
                        sx={{
                            color: '#fff',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* BODY */}
                <Sheet
                    sx={{
                        p: { xs: 2, sm: 3 },
                        background:
                            'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(238,242,255,0.9))',
                        backdropFilter: 'blur(12px)',
                        borderTop: '1px solid #e0e7ff',
                    }}
                >
                    {/* BASIC INFO */}
                    <Box
                        sx={{
                            p: { xs: 2, sm: 2.5 },
                            mb: 3,
                            borderRadius: '16px',
                            background: '#fff',
                            boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
                            border: '1px solid #eef2ff',
                        }}
                    >
                        <Typography
                            level="title-sm"
                            sx={{
                                mb: 1.5,
                                fontWeight: 800,
                                background: 'linear-gradient(90deg,#4f46e5,#7c3aed)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Basic Information
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Box display="flex" gap={2} flexWrap="wrap">
                            <Box sx={nameFieldBox}>
                                <Typography level="body-sm" fontWeight={600}>
                                    Item Name
                                </Typography>
                                <Input sx={inputStyle} name="itemName"
                                    value={materialDetails.itemName || ''}
                                    onChange={handleChange}
                                />
                            </Box>

                            <Box sx={nameFieldBox}>
                                <Typography level="body-sm" fontWeight={600}>
                                    Item Code
                                </Typography>
                                <Input sx={inputStyle} name="itemCode"
                                    value={materialDetails.itemCode || ''}
                                    onChange={handleChange}
                                />
                            </Box>

                            <Box sx={fieldBox}>
                                <Typography level="body-sm" fontWeight={600}>
                                    Item Brand
                                </Typography>
                                <Input sx={inputStyle} name="itemBrand"
                                    value={materialDetails.itemBrand || ''}
                                    onChange={handleChange}
                                />
                            </Box>
                        </Box>

                        <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
                            <Box sx={largeFieldBox}>
                                <Typography level="body-sm" fontWeight={600}>
                                    Item Description
                                </Typography>
                                <Textarea sx={textareaStyle} minRows={5}
                                    name="itemDesc"
                                    value={materialDetails.itemDesc || ''}
                                    onChange={handleChange}
                                />
                            </Box>

                            <Box sx={largeFieldBox}>
                                <Typography level="body-sm" fontWeight={600}>
                                    Specification
                                </Typography>
                                <Textarea sx={textareaStyle} minRows={5}
                                    name="specification"
                                    value={materialDetails.specification || ''}
                                    onChange={handleChange}
                                />
                            </Box>
                        </Box>
                    </Box>

                    {/* QUANTITY & PRICING */}
                    <Box
                        sx={{
                            p: { xs: 2, sm: 2.5 },
                            borderRadius: '16px',
                            background: '#fff',
                            boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
                            border: '1px solid #ecfeff',
                        }}
                    >
                        <Typography
                            level="title-sm"
                            sx={{
                                mb: 1.5,
                                fontWeight: 800,
                                background: 'linear-gradient(90deg,#0f766e,#14b8a6)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Quantity & Pricing
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Box display="flex" gap={2} flexWrap="wrap">
                            {[
                                { label: 'Quantity', name: 'quantity' },
                                { label: 'Unit Price', name: 'unitPrice' },
                                { label: 'GST Amount', name: 'gstAmount' },
                                { label: 'Total Amount', name: 'totalAmount' },
                                { label: 'Gross Amount', name: 'grossAmount' },
                            ].map((field) => (
                                <Box sx={fieldBox} key={field.name}>
                                    <Typography level="body-sm" fontWeight={600}>
                                        {field.label}
                                    </Typography>
                                    <Input
                                        sx={inputStyle}
                                        type="number"
                                        name={field.name}
                                        value={materialDetails?.[field.name] || ''}
                                        onChange={handleChange}
                                    />
                                </Box>
                            ))}

                            <Box sx={fieldBox}>
                                <Typography level="body-sm" fontWeight={600}>
                                    UOM
                                </Typography>
                                <AssetUOMSelect
                                    uom={materialDetails.uom}
                                    uomName={materialDetails.uomName}
                                    setUOM={(val) => dispatch(setMaterialDetails({ uom: val }))}
                                    setName={(name) =>
                                        dispatch(setMaterialDetails({ uomName: name }))
                                    }
                                />
                            </Box>
                        </Box>
                    </Box>
                </Sheet>

                {/* FOOTER */}
                <Box
                    sx={{
                        px: { xs: 2, sm: 3 },
                        py: 2,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flexWrap: 'wrap',
                        gap: 1.5,
                        borderTop: '1px solid #e0e7ff',
                        background: '#f8fafc',
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{ borderRadius: 10, px: 3, fontWeight: 700 }}
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="solid"
                        onClick={clickToSave}
                        sx={{
                            borderRadius: 10,
                            px: 4,
                            fontWeight: 800,
                            background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
                            boxShadow: '0 6px 18px rgba(79,70,229,0.45)',
                        }}
                    >
                        {isEdit ? 'Update' : 'Save'}
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    )
}

export default memo(MeterialDetailsModal)
