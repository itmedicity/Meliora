import React, { useCallback } from 'react'
import {
    Modal,
    ModalDialog,
    Box,
    Typography,
    Button,
    IconButton,
    Grid,
    Input,
} from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close'
import AssetUOMSelect from 'src/views/CommonSelectCode/AssetUOMSelect'

const MeterialDetailsModal = ({
    open,
    setOpen,
    uom,
    setUOM,
    setUomName,
    uomName,
    materialData,
    setMaterialData,
    onSave,
    isEdit
}) => {

    const handleChange = useCallback((e) => {
        const { name, value } = e.target
        setMaterialData(prev => ({
            ...prev,
            [name]: value
        }))
    }, [setMaterialData])

    const clickToSave = useCallback(() => {
        onSave({
            ...materialData,
            uom,
            uomName
        })
    }, [materialData, uom, uomName, onSave])

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog sx={{ width: 1000, maxWidth: '95%' }}>

                {/* HEADER */}
                <Box display="flex" justifyContent="space-between">
                    <Typography level="h4">
                        {isEdit ? 'Edit Material' : 'Add Material'}
                    </Typography>
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* BODY */}
                <Box mt={3}>

                    <Grid container spacing={2}>
                        <Grid xs={12} sm={6} md={4}>
                            <Typography level="body-sm" fontWeight={600}>Item Name</Typography>
                            <Input name="itemName" value={materialData.itemName} onChange={handleChange} />
                        </Grid>

                        <Grid xs={12} sm={6} md={4}>
                            <Typography level="body-sm" fontWeight={600}>Item Code</Typography>
                            <Input name="itemCode" value={materialData.itemCode} onChange={handleChange} />
                        </Grid>

                        <Grid xs={12} sm={6} md={4}>
                            <Typography level="body-sm" fontWeight={600}>Item Brand</Typography>
                            <Input name="itemBrand" value={materialData.itemBrand} onChange={handleChange} />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <Typography level="body-sm" fontWeight={600}>Item Description</Typography>
                            <Input name="itemDesc" value={materialData.itemDesc} onChange={handleChange} />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <Typography level="body-sm" fontWeight={600}>Specification</Typography>
                            <Input name="specification" value={materialData.specification} onChange={handleChange} />
                        </Grid>

                        <Grid xs={12} sm={6} md={3}>
                            <Typography level="body-sm" fontWeight={600}>Quantity</Typography>
                            <Input type="number" name="quantity" value={materialData.quantity} onChange={handleChange} />
                        </Grid>

                        <Grid xs={12} sm={6} md={3}>
                            <Typography level="body-sm" fontWeight={600}>UOM</Typography>
                            <AssetUOMSelect
                                uom={uom}
                                setUOM={setUOM}
                                setName={setUomName}
                                uomName={uomName}
                            />
                        </Grid>

                        <Grid xs={12} sm={6} md={3}>
                            <Typography level="body-sm" fontWeight={600}>Unit Price</Typography>
                            <Input type="number" name="unitPrice" value={materialData.unitPrice} onChange={handleChange} />
                        </Grid>

                        <Grid xs={12} sm={6} md={3}>
                            <Typography level="body-sm" fontWeight={600}>GST Amount</Typography>
                            <Input type="number" name="gstAmount" value={materialData.gstAmount} onChange={handleChange} />
                        </Grid>

                        <Grid xs={12} sm={6} md={4}>
                            <Typography level="body-sm" fontWeight={600}>Total Amount</Typography>
                            <Input type="number" name="totalAmount" value={materialData.totalAmount} onChange={handleChange} />
                        </Grid>

                        <Grid xs={12} sm={6} md={4}>
                            <Typography level="body-sm" fontWeight={600}>Gross Amount</Typography>
                            <Input type="number" name="grossAmount" value={materialData.grossAmount} onChange={handleChange} />
                        </Grid>
                    </Grid>



                </Box>

                {/* FOOTER */}
                <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" onClick={() => setOpen(false)}>
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

export default MeterialDetailsModal

