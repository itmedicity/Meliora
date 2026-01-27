import React, { memo, useCallback, useState } from 'react'
import {
    Card,
    Divider,
    Table,
    Sheet,
    IconButton,
    Box
} from '@mui/joy'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { Typography } from '@mui/material'
import AddIcon from "@mui/icons-material/Add"
import MeterialDetailsModal from './WorkOrderModals/MeterialDetailsModal'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';

const emptyMaterial = {
    itemName: '',
    itemCode: '',
    itemBrand: '',
    itemDesc: '',
    specification: '',
    quantity: 0,
    unitPrice: 0,
    gstAmount: 0,
    totalAmount: 0,
    grossAmount: 0,
    uom: null,
    uomName: '',
}

const WorkOrderMaterialDetails = ({ items, setItems }) => {
    const [materialData, setMaterialData] = useState(emptyMaterial)
    const [openModal, setOpenModal] = useState(false)
    const [editIndex, setEditIndex] = useState(null)

    const handleAdd = () => {
        setMaterialData(emptyMaterial)
        setEditIndex(null)
        setOpenModal(true)
    }

    const handleSave = useCallback(
        (data) => {
            if (editIndex !== null) {
                setItems(prev => prev.map((i, idx) => (idx === editIndex ? data : i)))
            } else {
                setItems(prev => [...prev, data])
            }
            setOpenModal(false)
            setEditIndex(null)
        },
        [editIndex, setItems]
    )

    const handleEditItem = (row, index) => {
        setMaterialData(row)
        setEditIndex(index)
        setOpenModal(true)
    }

    const handleDeleteItem = (index) => {
        setItems(prev => prev.filter((_, i) => i !== index))
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

            {openModal && (
                <MeterialDetailsModal
                    open={openModal}
                    setOpen={setOpenModal}
                    materialData={materialData}
                    setMaterialData={setMaterialData}
                    onSave={handleSave}
                    isEdit={editIndex !== null}
                />
            )}

            {/* HEADER */}

            <Box display="flex" justifyContent="space-between" mb={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Inventory2RoundedIcon sx={{ color: '#4f46e5' }} />
                    <Typography level="h4" fontWeight={800}>
                        Work Order  Material Details
                    </Typography>

                </Box>

                <Box
                    onClick={handleAdd}
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
            {items.length > 0 ? (
                <Sheet sx={{ mt: 3, borderRadius: 'xl' }}>
                    <Table stickyHeader hoverRow>
                        <thead>

                            <tr>
                                <th>SlNo</th>
                                <th>Item</th>
                                <th>Code</th>
                                <th>Brand</th>
                                <th>Qty</th>
                                <th>UOM</th>
                                <th>Unit Price</th>
                                <th>Gst Amount</th>
                                <th>Total</th>
                                <th>Gross Amount</th>
                                <th style={{ textAlign: 'center' }}>Edit / Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((row, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{row.itemName}</td>
                                    <td>{row.itemCode}</td>
                                    <td>{row.itemBrand}</td>
                                    <td>{row.quantity}</td>
                                    <td>{row.uomName}</td>
                                    <td>₹ {row.unitPrice}</td>
                                    <td>₹ {row.gstAmount}</td>
                                    <td style={{ fontWeight: 700 }}>
                                        ₹ {row.totalAmount}
                                    </td>
                                    <td>₹ {row.grossAmount}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <IconButton
                                            size="sm"
                                            color="primary"
                                            onClick={() => handleEditItem(row, index)}
                                        >
                                            <EditRoundedIcon />
                                        </IconButton>

                                        <IconButton
                                            size="sm"
                                            color="danger"
                                            onClick={() => handleDeleteItem(index)}
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
                    No items added
                </Typography>
            )}
        </Card>
    )
}

export default memo(WorkOrderMaterialDetails)

