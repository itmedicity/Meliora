import React, { memo, useCallback } from 'react'
import {
    Modal,
    ModalDialog,
    Box,
    Typography,
    Button,
    IconButton,
    Grid,
    Input,
    Divider,
    Sheet
} from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close'
import AssetUOMSelect from 'src/views/CommonSelectCode/AssetUOMSelect'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

const MeterialDetailsModal = ({
    open,
    setOpen,
    materialData,
    setMaterialData,
    onSave,
    isEdit
}) => {

    const handleChange = useCallback((e) => {
        const { name, value, type } = e.target
        setMaterialData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }))
    }, [])

    const clickToSave = useCallback(() => {
        onSave(materialData)
    }, [materialData, onSave])

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog
                sx={{
                    width: 1000,
                    maxWidth: '95%',
                    borderRadius: 12,
                    p: 0,
                    boxShadow: 'lg'
                }}
            >
                {/* HEADER */}
                <Box
                    sx={{
                        px: 3,
                        py: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        bgcolor: '#B7A3E3',
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1.5}>
                        <Inventory2OutlinedIcon sx={{ fontSize: 30, color: '#3f2b96' }} />

                        <Typography level="h4" fontWeight={600}>
                            {isEdit ? 'Edit Material' : 'Add Material'}
                        </Typography>

                        {isEdit ? (
                            <EditOutlinedIcon sx={{ color: '#c2c0cf' }} />
                        ) : (
                            null
                        )}
                    </Box>

                    <IconButton
                        size="sm"
                        variant="plain"
                        onClick={() => setOpen(false)}
                        sx={{
                            color: '#3f2b96',
                            '&:hover': {
                                bgcolor: 'rgba(63,43,150,0.12)'
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>


                {/* BODY */}
                <Sheet sx={{ p: 3 }}>
                    <Grid container spacing={2.5}>

                        <Grid xs={12}>
                            <Typography level="title-sm" mb={1.5}>
                                Basic Information
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                        </Grid>

                        <Grid xs={12} sm={6} md={4}>
                            <Typography level="body-sm">Item Name</Typography>
                            <Input name="itemName" value={materialData?.itemName} onChange={handleChange} />
                        </Grid>

                        <Grid xs={12} sm={6} md={4}>
                            <Typography level="body-sm">Item Code</Typography>
                            <Input name="itemCode" value={materialData?.itemCode} onChange={handleChange} />
                        </Grid>

                        <Grid xs={12} sm={6} md={4}>
                            <Typography level="body-sm">Item Brand</Typography>
                            <Input name="itemBrand" value={materialData?.itemBrand} onChange={handleChange} />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <Typography level="body-sm">Item Description</Typography>
                            <Input name="itemDesc" value={materialData?.itemDesc} onChange={handleChange} />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <Typography level="body-sm">Specification</Typography>
                            <Input name="specification" value={materialData?.specification} onChange={handleChange} />
                        </Grid>

                        <Grid xs={12}>
                            <Typography level="title-sm" mt={3} mb={1.5}>
                                Quantity & Pricing
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                        </Grid>

                        <Grid xs={12} sm={6} md={3}>
                            <Typography level="body-sm">Quantity</Typography>
                            <Input type="number" name="quantity" value={materialData?.quantity} onChange={handleChange} />
                        </Grid>

                        <Grid xs={12} sm={6} md={3}>
                            <Typography level="body-sm">UOM</Typography>
                            <AssetUOMSelect
                                uom={materialData.uom}
                                uomName={materialData.uomName}
                                setUOM={(val) =>
                                    setMaterialData(prev => ({
                                        ...prev,
                                        uom: val
                                    }))
                                }
                                setName={(name) =>
                                    setMaterialData(prev => ({
                                        ...prev,
                                        uomName: name
                                    }))
                                }
                            />
                        </Grid>

                        <Grid xs={12} sm={6} md={3}>
                            <Typography level="body-sm">Unit Price</Typography>
                            <Input type="number" name="unitPrice" value={materialData?.unitPrice} onChange={handleChange} />
                        </Grid>

                        <Grid xs={12} sm={6} md={3}>
                            <Typography level="body-sm">GST Amount</Typography>
                            <Input type="number" name="gstAmount" value={materialData?.gstAmount} onChange={handleChange} />
                        </Grid>

                        <Grid xs={12} sm={6} md={4}>
                            <Typography level="body-sm">Total Amount</Typography>
                            <Input type="number" name="totalAmount" value={materialData?.totalAmount} onChange={handleChange} />
                        </Grid>

                        <Grid xs={12} sm={6} md={4}>
                            <Typography level="body-sm">Gross Amount</Typography>
                            <Input type="number" name="grossAmount" value={materialData?.grossAmount} onChange={handleChange} />
                        </Grid>

                    </Grid>
                </Sheet>

                {/* FOOTER */}
                <Box
                    sx={{
                        px: 3,
                        py: 2,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1.5,
                        borderTop: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <Button variant="outlined" color="neutral" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={clickToSave}>
                        {isEdit ? 'Update' : 'Save'}
                    </Button>
                </Box>

            </ModalDialog>
        </Modal>
    )
}

export default memo(MeterialDetailsModal)
