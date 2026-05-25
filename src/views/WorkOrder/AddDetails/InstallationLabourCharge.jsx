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
    Button,
    Textarea
} from '@mui/joy'
import EngineeringIcon from '@mui/icons-material/Engineering'
import AddIcon from "@mui/icons-material/Add"
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import { useDispatch, useSelector } from 'react-redux'
import { setLabourList } from 'src/redux/actions/Workorder.action'


const InstallationLabourCharge = ({ localdata }) => {




    const LocallabourList = localdata?.labourList || [];
    const LocallabourDetails = localdata?.labourDetails || {};

    console.log({
        LocallabourList,
        LocallabourDetails
    });


    const dispatch = useDispatch()
    const reduxData = useSelector(state => state.getworkOrderReducer);

    const labourList = reduxData?.labourList?.length
        ? reduxData.labourList
        : (LocallabourList || []);

    const labourDetails = reduxData?.labourDetails && Object.keys(reduxData.labourDetails).length
        ? reduxData.labourDetails
        : (LocallabourDetails || {});

    const [open, setOpen] = useState(false)
    const [labourData, setLabourData] = useState(labourDetails)
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

        let updatedList = []

        if (editIndex !== null) {
            updatedList = labourList.map((item, index) =>
                index === editIndex ? labourData : item
            )
        } else {
            updatedList = [...labourList, labourData]
        }

        dispatch(setLabourList(updatedList))

        setLabourData(labourDetails)
        setEditIndex(null)
        setOpen(false)
    }, [labourData, editIndex, labourList, labourDetails, dispatch])

    const handleEdit = (row, index) => {
        setLabourData(row)

        setEditIndex(index)
        setOpen(true)
    }

    const handleDelete = (index) => {
        const updated = labourList.filter((_, i) => i !== index)
        dispatch(setLabourList(updated))
    }
    const handleOpenAdd = () => {
        setLabourData({ ...labourDetails })
        setEditIndex(null)
        setOpen(true)
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
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <EngineeringIcon sx={{ color: '#4f46e5' }} />
                    <Typography level="h4" fontWeight={800}>
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

            <Divider />
            {/* TABLE */}
            {Array.isArray(labourList) && labourList.length > 0 ? (
                <Sheet sx={{
                    mt: 3,
                    borderRadius: 'xl',
                    maxHeight: 350,
                    overflow: 'auto'
                }}>
                    <Table
                        // hoverRow
                        stickyHeader >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Description</th>
                                <th>Specification</th>
                                <th>Unit</th>
                                <th>Rate</th>
                                <th>Qty</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {labourList.map((row, index) => (
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
                                    <td>
                                        <IconButton
                                            size="sm"
                                            color="primary"
                                            onClick={() => handleEdit(row, index)}
                                            sx={{ mr: 1 }}
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
                <Typography sx={{ mt: 3, textAlign: 'center' }} color="text.secondary">
                    No labour charges added
                </Typography>
            )}

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ModalDialog
                    size="lg"
                    sx={{
                        width: '100%',
                        maxWidth: '1200px',   // desktop max width
                        mx: 1,
                        p: 0,
                        borderRadius: '2xl',
                        boxShadow: 'xl',
                        overflow: 'hidden',
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
                            <Textarea
                                minRows={4}
                                maxRows={6}
                                placeholder="Eg: Installation support labour"
                                name="description"
                                value={labourData.description}
                                onChange={handleChange}
                                sx={{ borderRadius: 'lg' }}
                            />
                        </Box>

                        {/* Specification */}
                        <Box>
                            <Typography level="body-sm" mb={0.5}>
                                Specification / Scope of Work
                            </Typography>
                            <Textarea
                                minRows={2}
                                maxRows={4}
                                placeholder="Eg: Skilled manpower for machine installation"
                                name="specification"
                                value={labourData.specification}
                                onChange={handleChange}
                                sx={{ borderRadius: 'lg' }}
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
                        {/* <Box display="flex" justifyContent="flex-end" gap={1.5} mt={1}>
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
                        </Box> */}

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
                                onClick={handleAddOrUpdate}
                                sx={{
                                    borderRadius: 10,
                                    px: 4,
                                    fontWeight: 800,
                                    background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
                                    boxShadow: '0 6px 18px rgba(79,70,229,0.45)',
                                }}
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


