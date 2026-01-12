
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

const emptyMaterial = {
    workOrderDesc: '',
    itemName: '',
    itemCode: '',
    itemBrand: '',
    itemDesc: '',
    specification: '',
    quantity: '',
    unitPrice: '',
    gstAmount: '',
    totalAmount: '',
    grossAmount: ''
}

const WorkOrderMaterialDetails = ({
    uom,
    setUOM,
    uomName,
    setUomName,
}) => {

    const [materialData, setMaterialData] = useState(emptyMaterial)
    const [items, setItems] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [editIndex, setEditIndex] = useState(null)

    /** ADD */
    const handleAdd = useCallback(() => {
        setMaterialData(emptyMaterial)
        setEditIndex(null)
        setOpenModal(true)
    }, [])

    /** SAVE (ADD / EDIT) */
    const handleSaveMaterial = useCallback((data) => {
        if (editIndex !== null) {
            // EDIT
            setItems(prev =>
                prev.map((item, index) =>
                    index === editIndex ? data : item
                )
            )
        } else {
            // ADD
            setItems(prev => [...prev, data])
        }

        setOpenModal(false)
        setEditIndex(null)
        setMaterialData(emptyMaterial)
    }, [editIndex])

    /** EDIT */
    const handleEditItem = useCallback((row, index) => {
        setMaterialData(row)
        setEditIndex(index)
        setOpenModal(true)
    }, [])

    /** DELETE */
    const handleDeleteItem = useCallback((index) => {
        setItems(prev => prev.filter((_, i) => i !== index))
    }, [])

    return (
        <Card sx={{ p: 3, borderRadius: '2xl', boxShadow: 'xl' }}>

            {openModal && (
                <MeterialDetailsModal
                    open={openModal}
                    setOpen={setOpenModal}
                    uom={uom}
                    setUOM={setUOM}
                    setUomName={setUomName}
                    uomName={uomName}
                    materialData={materialData}
                    setMaterialData={setMaterialData}
                    onSave={handleSaveMaterial}
                    isEdit={editIndex !== null}
                />
            )}

            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h6" fontWeight={700}>
                    Work Order – Material Details
                </Typography>

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


// import React, { memo, useCallback, useState } from 'react'
// import {
//     Card,
//     Divider,
//     Table,
//     Sheet,
//     IconButton,
//     Box
// } from '@mui/joy'
// import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
// import { Typography } from '@mui/material'
// import AddIcon from "@mui/icons-material/Add"
// import MeterialDetailsModal from './WorkOrderModals/MeterialDetailsModal'

// const emptyMaterial = {
//     workOrderDesc: '',
//     itemName: '',
//     itemCode: '',
//     itemBrand: '',
//     itemDesc: '',
//     specification: '',
//     quantity: '',
//     unitPrice: '',
//     gstAmount: '',
//     totalAmount: '',
//     grossAmount: ''
// }

// const WorkOrderMaterialDetails = ({
//     uom,
//     setUOM,
//     uomName,
//     setUomName,
// }) => {

//     const [materialData, setMaterialData] = useState(emptyMaterial)
//     const [items, setItems] = useState([])
//     const [openModal, setOpenModal] = useState(false)
//     const [editIndex, setEditIndex] = useState(null)

//     const handleAdd = useCallback(() => {
//         setMaterialData(emptyMaterial)
//         setOpenModal(true)
//     }, [])

//     const handleSaveMaterial = useCallback((data) => {
//         setItems(prev => [...prev, data])
//         setOpenModal(false)
//         setMaterialData(emptyMaterial)
//     }, [])

//     const handleDeleteItem = useCallback((index) => {
//         setItems(prev => prev.filter((_, i) => i !== index))
//     }, [])

//     return (
//         <Card
//             sx={{
//                 p: 3,
//                 borderRadius: '2xl',
//                 boxShadow: 'xl',
//                 background:
//                     'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(240,240,255,0.9))',
//             }}
//         >
//             {openModal && (
//                 <MeterialDetailsModal
//                     open={openModal}
//                     setOpen={setOpenModal}
//                     uom={uom}
//                     setUOM={setUOM}
//                     setUomName={setUomName}
//                     uomName={uomName}
//                     materialData={materialData}
//                     setMaterialData={setMaterialData}
//                     onSave={handleSaveMaterial}
//                 />
//             )}

//             {/* HEADER */}
//             <Box
//                 sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     mb: 2,
//                 }}
//             >
//                 <Typography variant="h6" fontWeight={700}>
//                     Work Order – Material Details
//                 </Typography>

//                 <Box
//                     onClick={handleAdd}
//                     sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1,
//                         px: 2,
//                         py: 1,
//                         borderRadius: "999px",
//                         cursor: "pointer",
//                         color: "#fff",
//                         background: "linear-gradient(135deg,#6A5ACD,#8A7CFB)",
//                     }}
//                 >
//                     <AddIcon fontSize="small" />
//                     Add Material
//                 </Box>
//             </Box>

//             <Divider />

//             {/* TABLE */}
//             {items.length > 0 ? (
//                 <Sheet variant="outlined" sx={{ mt: 3, borderRadius: 'xl' }}>
//                     <Table stickyHeader hoverRow>
//                         <thead>
//                             <tr>
//                                 <th>Item</th>
//                                 <th>Code</th>
//                                 <th>Qty</th>
//                                 <th>UOM</th>
//                                 <th>Unit Price</th>
//                                 <th>Total</th>
//                                 <th style={{ textAlign: 'center' }}>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {items.map((row, index) => (
//                                 <tr key={index}>
//                                     <td>{row.itemName}</td>
//                                     <td>{row.itemCode}</td>
//                                     <td>{row.quantity}</td>
//                                     <td>{row.uomName}</td>
//                                     <td>₹ {row.unitPrice}</td>
//                                     <td style={{ fontWeight: 700 }}>
//                                         ₹ {row.totalAmount}
//                                     </td>
//                                     <td style={{ textAlign: 'center' }}>
//                                         <IconButton
//                                             size="sm"
//                                             color="danger"
//                                             onClick={() => handleDeleteItem(index)}
//                                         >
//                                             <DeleteForeverRoundedIcon />
//                                         </IconButton>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 </Sheet>
//             ) : (
//                 <Typography sx={{ mt: 3 }} color="text.secondary">
//                     No items added
//                 </Typography>
//             )}
//         </Card>
//     )
// }

// export default memo(WorkOrderMaterialDetails)


// // import React, { memo, useCallback, useState } from 'react'
// // import {
// //     Card,
// //     Divider,
// //     Table,
// //     Sheet,
// //     IconButton,
// //     Box
// // } from '@mui/joy'
// // import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
// // import { Typography } from '@mui/material'
// // import AddIcon from "@mui/icons-material/Add";
// // import MeterialDetailsModal from './WorkOrderModals/MeterialDetailsModal';

// // const emptyMaterial = {
// //     workOrderDesc: '',
// //     itemName: '',
// //     itemCode: '',
// //     itemBrand: '',
// //     itemDesc: '',
// //     specification: '',
// //     quantity: '',
// //     unitPrice: '',
// //     gstAmount: '',
// //     totalAmount: '',
// //     grossAmount: ''
// // };

// // const WorkOrderMaterialDetails = (
// //     {
// //         uom,
// //         setUOM,
// //         uomName,
// //         setUomName,
// //     }
// // ) => {

// //     const [materialData, setMaterialData] = useState(emptyMaterial)
// //     const [items, setItems] = useState([])
// //     const [openModal, setoOpenModal] = useState(false)

// //     const handleDeleteItem = useCallback((index) => {
// //         setItems(prev => prev.filter((_, i) => i !== index))
// //     }, [])

// //     const handleAdd = () => {
// //         setMaterialData(emptyMaterial)
// //         setoOpenModal(true)
// //     }

// //     const handleSaveMaterial = useCallback((data) => {
// //         setItems(prev => [...prev, data])   // add new row
// //         setMaterialData(emptyMaterial)      // reset form
// //         setoOpenModal(false)                // close modal
// //     }, [])

// //     // const clickToSave = useCallback(() => {
// //     //     onSave({
// //     //         ...materialData,
// //     //         uom,
// //     //         uomName,
// //     //     })
// //     // }, [materialData, uom, uomName, onSave])

// //     return (
// //         <Card
// //             sx={{
// //                 p: 3,
// //                 borderRadius: '2xl',
// //                 boxShadow: 'xl',
// //                 background:
// //                     'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(240,240,255,0.9))',
// //                 backdropFilter: 'blur(6px)'
// //             }}
// //         >
// //             {openModal && (
// //                 <MeterialDetailsModal
// //                     open={openModal}
// //                     setOpen={setoOpenModal}
// //                     uom={uom}
// //                     setUOM={setUOM}
// //                     setUomName={setUomName}
// //                     uomName={uomName}
// //                     materialData={materialData}
// //                     setMaterialData={setMaterialData}
// //                     onSave={handleSaveMaterial}
// //                 />
// //             )}
// //             <Box
// //                 sx={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "space-between",
// //                     mb: 2,
// //                     p: 2,
// //                     borderRadius: "16px",
// //                     background:
// //                         "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(245,247,255,0.9))",
// //                     boxShadow: "sm",
// //                     backdropFilter: "blur(6px)",
// //                 }}
// //             >
// //                 <Typography level="h4" sx={{ fontWeight: 700 }}>
// //                     Work Order – Material Details
// //                 </Typography>

// //                 <Box
// //                     onClick={handleAdd}
// //                     sx={{
// //                         display: "flex",
// //                         alignItems: "center",
// //                         gap: 1,
// //                         px: 2,
// //                         py: 1,
// //                         borderRadius: "999px",
// //                         cursor: "pointer",
// //                         fontWeight: 400,
// //                         color: "#fff",
// //                         background:
// //                             "linear-gradient(135deg, #6A5ACD, #8A7CFB)",
// //                         boxShadow: "md",
// //                         transition: "all 0.25s ease",
// //                         "&:hover": {
// //                             transform: "translateY(-2px)",
// //                             boxShadow: "xl",
// //                             background:
// //                                 "linear-gradient(135deg, #5A4BCD, #7667F0)",
// //                         },
// //                         "&:active": {
// //                             transform: "scale(0.98)",
// //                         },
// //                     }}
// //                 >
// //                     <AddIcon fontSize="small" />
// //                     Add Material
// //                 </Box>
// //             </Box>



// //             <Divider sx={{ mb: 3 }} />


// //             {/* Items Table */}
// //             {items.length > 0 ? (
// //                 <Sheet
// //                     variant="outlined"
// //                     sx={{
// //                         mt: 4,
// //                         borderRadius: 'xl',
// //                         overflow: 'auto'
// //                     }}
// //                 >
// //                     <Table stickyHeader hoverRow>
// //                         <thead>
// //                             <tr>
// //                                 <th>Item</th>
// //                                 <th>Code</th>
// //                                 <th>Qty</th>
// //                                 <th>UOM</th>
// //                                 <th>Unit Price</th>
// //                                 <th>Total</th>
// //                                 <th style={{ textAlign: 'center' }}>Action</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {items.map((row, index) => (
// //                                 <tr key={index}>
// //                                     <td>{row.itemName}</td>
// //                                     <td>{row.itemCode}</td>
// //                                     <td>{row.quantity}</td>
// //                                     <td>{row.uomName}</td>
// //                                     <td>? {row.unitPrice}</td>
// //                                     <td style={{ fontWeight: 700 }}>? {row.totalAmount}</td>
// //                                     <td style={{ textAlign: 'center' }}>
// //                                         <IconButton
// //                                             size="sm"
// //                                             color="danger"
// //                                             variant="soft"
// //                                             onClick={() => handleDeleteItem(index)}
// //                                         >
// //                                             <DeleteForeverRoundedIcon />
// //                                         </IconButton>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </Table>
// //                 </Sheet>
// //             ) : <Typography>No Item To Display</Typography>}
// //         </Card>
// //     )
// // }

// // export default memo(WorkOrderMaterialDetails)



