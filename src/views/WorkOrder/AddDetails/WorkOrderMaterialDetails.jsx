import React, { memo, useCallback, useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { resetMaterialDetails, setMaterialDetails, setMaterialList } from 'src/redux/actions/Workorder.action'

const WorkOrderMaterialDetails = ({ getCrfItems, localdata }) => {

    const LocalmaterialList = localdata?.materialList;
    const LocalmaterialDetail = localdata?.materialDetails;


    console.log({
        LocalmaterialList,
        LocalmaterialDetail
    });



    const [openModal, setOpenModal] = useState(false)
    const [editIndex, setEditIndex] = useState(null)
    const dispatch = useDispatch();

    const { materialDetails, materialList } = useSelector(
        (state) => state.getworkOrderReducer
    );


    useEffect(() => {
        const reduxEmpty =
            !Array.isArray(materialList) ||
            materialList.length === 0;

        if (
            reduxEmpty &&
            Array.isArray(LocalmaterialList) &&
            LocalmaterialList.length > 0
        ) {
            dispatch(setMaterialList(LocalmaterialList))
        }

        if (
            reduxEmpty &&
            LocalmaterialDetail &&
            Object.keys(LocalmaterialDetail).length > 0
        ) {
            dispatch(setMaterialDetails(LocalmaterialDetail))
        }
    }, [LocalmaterialList, LocalmaterialDetail, materialList, dispatch])

    // useEffect(() => {
    //     if (!materialList.length && Array.isArray(getCrfItems) && getCrfItems.length) {
    //         const mapped = getCrfItems.map(item => ({
    //             itemName: item.approve_item_desc || '',
    //             itemCode: item.item_slno || '',
    //             itemBrand: item.approve_item_brand || '',
    //             itemDesc: item.approve_item_desc || '',
    //             specification: item.approve_item_specification || '',
    //             quantity: item.item_qnty_approved || 0,
    //             unitPrice: item.approve_item_unit_price || 0,
    //             gstAmount: 0,
    //             totalAmount: item.approve_aprox_cost || 0,
    //             grossAmount: item.approve_aprox_cost || 0,
    //             uom: item.approve_item_unit || null,
    //             uomName: item.apprv_uom || ''
    //         }))

    //         dispatch(setMaterialList(mapped))
    //     }
    // }, [getCrfItems, materialList.length, dispatch])

    useEffect(() => {
        if (
            !materialList.length &&
            (!Array.isArray(LocalmaterialList) || !LocalmaterialList.length) &&
            Array.isArray(getCrfItems) &&
            getCrfItems.length
        ) {
            const mapped = getCrfItems.map(item => ({
                itemName: item.approve_item_desc || '',
                itemCode: item.item_slno || '',
                itemBrand: item.approve_item_brand || '',
                itemDesc: item.approve_item_desc || '',
                specification: item.approve_item_specification || '',
                quantity: item.item_qnty_approved || 0,
                unitPrice: item.approve_item_unit_price || 0,
                gstAmount: 0,
                totalAmount: item.approve_aprox_cost || 0,
                grossAmount: item.approve_aprox_cost || 0,
                uom: item.approve_item_unit || null,
                uomName: item.apprv_uom || ''
            }))

            dispatch(setMaterialList(mapped))
        }
    }, [getCrfItems, materialList.length, LocalmaterialList, dispatch])


    const handleAdd = () => {
        dispatch(resetMaterialDetails());
        setEditIndex(null)
        setOpenModal(true)
    }

    const handleSave = useCallback(() => {
        if (editIndex !== null) {
            const updatedList = materialList.map((i, idx) =>
                idx === editIndex ? materialDetails : i
            );
            dispatch(setMaterialList(updatedList));
        } else {
            const updatedList = [...materialList, materialDetails];
            dispatch(setMaterialList(updatedList));
        }

        setOpenModal(false);
        setEditIndex(null);
        dispatch(resetMaterialDetails());
    }, [editIndex, materialList, materialDetails, setMaterialList, dispatch]);

    const handleEditItem = (row, index) => {
        dispatch(setMaterialDetails(row))
        setEditIndex(index)
        setOpenModal(true)
    }

    const handleDeleteItem = (index) => {
        const updatedList = materialList.filter((_, i) => i !== index);
        dispatch(setMaterialList(updatedList));
    };



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

            {Array.isArray(materialList) && materialList?.length > 0 ? (
                <Sheet sx={{
                    mt: 3,
                    borderRadius: 'xl',
                    maxHeight: 350,
                    overflow: 'auto'
                }}>
                    <Table stickyHeader >
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
                            {materialList?.map((row, index) => (
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

