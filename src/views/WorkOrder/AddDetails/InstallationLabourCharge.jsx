import React, { memo, useState, useCallback, useEffect } from 'react'
import {
    Box,
    Card,
    Typography,
    Divider,
    Table,
    Sheet,
    Modal,
    ModalDialog,
    Input,
    Select,
    Option,
    IconButton,
    Button
} from '@mui/joy'
import EngineeringIcon from '@mui/icons-material/Engineering'
import AddIcon from "@mui/icons-material/Add"
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'

const emptyLabour = {
    description: '',
    specification: '',
    unitRate: '',
    quantity: '',
    rateUnit: 'Per Day',
    totalAmount: '0.00'
}

const InstallationLabourCharge = ({
    labourItems,
    setLabourItems
}) => {

    const [open, setOpen] = useState(false)
    const [labourData, setLabourData] = useState(emptyLabour)
    const [editIndex, setEditIndex] = useState(null)

    // Auto calculate total amount
    useEffect(() => {
        const total =
            Number(labourData.unitRate || 0) *
            Number(labourData.quantity || 0)

        setLabourData(prev => ({
            ...prev,
            totalAmount: total.toFixed(2)
        }))
    }, [labourData.unitRate, labourData.quantity])

    const handleChange = useCallback((e) => {
        const { name, value } = e.target
        setLabourData(prev => ({
            ...prev,
            [name]: value
        }))
    }, [])

    const handleAddOrUpdate = useCallback(() => {
        if (!labourData.description || !labourData.unitRate) return

        if (editIndex !== null) {
            setLabourItems(prev =>
                prev.map((item, index) =>
                    index === editIndex ? labourData : item
                )
            )
        } else {
            setLabourItems(prev => [...prev, labourData])
        }

        setLabourData(emptyLabour)
        setEditIndex(null)
        setOpen(false)
    }, [labourData, editIndex, setLabourItems])

    const handleEdit = (row, index) => {
        setLabourData(row)
        setEditIndex(index)
        setOpen(true)
    }

    const handleDelete = (index) => {
        setLabourItems(prev => prev.filter((_, i) => i !== index))
    }

    const handleOpenAdd = () => {
        setLabourData(emptyLabour)
        setEditIndex(null)
        setOpen(true)
    }

    return (
        <Card
            sx={{
                height: 440,
                mx: 'auto',
                p: 1.5,
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

            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EngineeringIcon color="primary" />
                    <Typography level="h4" fontWeight={700}>
                        Installation Labour Charges
                    </Typography>
                </Box>
                <Box
                    onClick={handleOpenAdd}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2,
                        py: 1,
                        borderRadius: "999px",
                        cursor: "pointer",
                        color: "#fff",
                        background: "linear-gradient(135deg,#6A5ACD,#8A7CFB)",
                    }}
                >
                    <AddIcon fontSize="small" />
                    Add Material
                </Box>
            </Box>

            <Divider />

            {/* TABLE */}
            {labourItems.length > 0 ? (
                <Sheet sx={{ mt: 3, borderRadius: 'xl' }}>
                    <Table hoverRow>
                        <thead>
                            <tr>
                                <th>Sl No</th>
                                <th>Description</th>
                                <th>Specification</th>
                                <th>Rate Unit</th>
                                <th>Unit Rate (₹)</th>
                                <th>Qty</th>
                                <th>Total (₹)</th>
                                <th style={{ textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {labourItems.map((row, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{row.description}</td>
                                    <td>{row.specification}</td>
                                    <td>{row.rateUnit}</td>
                                    <td>₹ {row.unitRate}</td>
                                    <td>{row.quantity}</td>
                                    <td style={{ fontWeight: 700 }}>
                                        ₹ {row.totalAmount}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <IconButton
                                            size="sm"
                                            color="primary"
                                            onClick={() => handleEdit(row, index)}
                                        >
                                            <EditRoundedIcon />
                                        </IconButton>

                                        <IconButton
                                            size="sm"
                                            color="danger"
                                            onClick={() => handleDelete(index)}
                                        >
                                            <DeleteForeverRoundedIcon />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Sheet>
            ) : (
                <Typography sx={{ mt: 3 }} color="text.secondary">
                    No labour charges added
                </Typography>
            )}


            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    size="lg"
                    sx={{
                        p: 0,
                        borderRadius: '2xl',
                        boxShadow: 'xl',
                        overflow: 'hidden'
                    }}
                >

                    {/* HEADER */}
                    <Box
                        sx={{
                            px: 3,
                            py: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            background: '#B7A3E3',
                            color: '#fff'
                        }}
                    >
                        <EngineeringIcon />
                        <Typography level="h4" fontWeight={700}>
                            {editIndex !== null ? 'Edit Labour Charge' : 'Add Labour Charge'}
                        </Typography>
                    </Box>

                    {/* BODY */}
                    <Box sx={{ p: 3, display: 'grid', gap: 2.5 }}>

                        {/* Description */}
                        <Box>
                            <Typography level="body-sm" mb={0.5}>
                                Labour Description
                            </Typography>
                            <Input
                                placeholder="Eg: Installation support labour"
                                name="description"
                                value={labourData.description}
                                onChange={handleChange}
                            />
                        </Box>

                        {/* Specification */}
                        <Box>
                            <Typography level="body-sm" mb={0.5}>
                                Specification / Scope of Work
                            </Typography>
                            <Input
                                placeholder="Eg: Skilled manpower for machine installation"
                                name="specification"
                                value={labourData.specification}
                                onChange={handleChange}
                            />
                        </Box>

                        {/* Rate & Quantity */}
                        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                            <Box>
                                <Typography level="body-sm" mb={0.5}>
                                    Unit Rate (₹)
                                </Typography>
                                <Input
                                    type="number"
                                    name="unitRate"
                                    value={labourData.unitRate}
                                    onChange={handleChange}
                                    startDecorator="₹"
                                />
                            </Box>

                            <Box>
                                <Typography level="body-sm" mb={0.5}>
                                    Quantity
                                </Typography>
                                <Input
                                    type="number"
                                    name="quantity"
                                    value={labourData.quantity}
                                    onChange={handleChange}
                                />
                            </Box>
                        </Box>

                        {/* Rate Unit */}
                        <Box>
                            <Typography level="body-sm" mb={0.5}>
                                Rate Unit
                            </Typography>
                            <Select
                                value={labourData.rateUnit}
                                onChange={(e, val) =>
                                    setLabourData(prev => ({
                                        ...prev,
                                        rateUnit: val
                                    }))
                                }
                            >
                                <Option value="Per Day">Per Day</Option>
                                <Option value="Per Job">Per Job</Option>
                            </Select>
                        </Box>

                        {/* TOTAL AMOUNT CARD */}
                        <Box
                            sx={{
                                mt: 1,
                                p: 2,
                                borderRadius: 'lg',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: 'linear-gradient(135deg,#eef2ff,#f8fafc)',
                                border: '1px solid #e0e7ff'
                            }}
                        >
                            <Typography level="body-md" fontWeight={600}>
                                Calculated Labour Cost
                            </Typography>
                            <Typography level="h4" fontWeight={800} color="primary">
                                ₹ {labourData.totalAmount}
                            </Typography>
                        </Box>

                        {/* ACTIONS */}
                        <Box display="flex" justifyContent="flex-end" gap={1.5} mt={1}>
                            <Button
                                variant="outlined"
                                color="neutral"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                onClick={handleAddOrUpdate}
                            >
                                {editIndex !== null ? 'Update Labour' : 'Save Labour'}
                            </Button>
                        </Box>

                    </Box>
                </ModalDialog>
            </Modal>


        </Card>
    )
}

export default memo(InstallationLabourCharge)


