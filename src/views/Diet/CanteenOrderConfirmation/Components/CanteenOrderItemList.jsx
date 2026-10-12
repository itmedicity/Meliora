import React, { memo, useMemo, useState } from "react";
import { Box, IconButton } from "@mui/joy";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import DietTextComponent from "../../DietComponent/DietTextComponent";
import CancelIcon from '@mui/icons-material/Cancel';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import DietButton from "../../DietComponent/DietButton";
import { axioslogin } from "src/views/Axios/Axios";
import { confirmNotify, errorNotify, succesNotify, warningNotify } from "src/views/Common/CommonCode";

const CanteenOrderItemList = ({ data = [], onRemove,
    FetcthPatienExtraOrders,
    FetchPatientFoodOrderDetails,
    activeTab
}) => {



    const [editId, setEditId] = useState(null);
    const [qtyMap, setQtyMap] = useState({});


    //  normalize backend → frontend structure
    const items = useMemo(() => {
        return data?.map(item => ({
            ...item,
            qty: item.quantity || item?.qty || 0,
            price: item.price || 0, // handle null
            total: (item.quantity || item?.qty || 0) * (item.price || 0),
            totalWithGst:
                ((item.quantity || item?.qty || 0) * (item.price || 0)) +
                (item.gst_amount || 0)
        }));
    }, [data]);


    const handleEdit = (item) => {
        setEditId(item.item_id);
        setQtyMap(prev => ({
            ...prev,
            [item.item_id]: item.qty
        }));
    };

    // Increase qty
    const incrementQty = (id) => {
        setQtyMap(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
    };

    // Decrease qty
    const decrementQty = (id) => {
        setQtyMap(prev => ({
            ...prev,
            [id]: prev[id] > 1 ? prev[id] - 1 : 1
        }));
    };

    // Save
    const handleSave = async (item) => {

        const updatedQty = qtyMap?.[item.item_id];
        const OrderItemId = item?.canteen_order_item_id;
        const CurrentQuantity = item?.qty

        if (Number(updatedQty) < Number(CurrentQuantity)) {
            const isConfirmed = await confirmNotify(
                "Updated quantity is less than current quantity. Are you sure?"
            );
            if (!isConfirmed) return; //  STOP if cancel
        };

        const PayLoad = {
            canteen_order_item_id: OrderItemId,
            updatedQty: updatedQty
        };

        try {
            const response = await axioslogin.post('/canteenorder/update-qty', PayLoad);
            const { success, message } = response?.data ?? {}
            if (success !== 1) return warningNotify(message)
            succesNotify(message)
            setEditId(null);
            FetcthPatienExtraOrders()
            FetchPatientFoodOrderDetails()
        } catch (error) {
            console.log(error)
            errorNotify("Error in Updating Quantity")
        }

    };

    return (
        <Box sx={{ maxHeight: '80%', overflowY: "auto", px: 2, width: '100%' }}>
            {items?.map((item, index) => {

                const isEditing = editId === item.item_id;
                const currentQty = qtyMap?.[item.item_id] || item.qty;
                return (
                    <Box

                        key={index}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            py: 1,
                            borderBottom: "1px solid #f0f0f0",
                            width: '100%',
                            position: 'relative'
                        }}
                    >
                        {/* LEFT SIDE */}
                        <Box sx={{ display: "flex", gap: 1, width: '100%', minWidth: 0 }}>
                            <LunchDiningOutlinedIcon sx={{ fontSize: 16, mt: 0.3 }} />

                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1
                                    }}>

                                    <DietTextComponent
                                        value={item?.item_name}
                                        size={14}
                                        weight={600}
                                    />

                                    {/*  NEW BADGE */}
                                    {item?.isNew && (
                                        <Box
                                            sx={{
                                                bgcolor: "#2ecc71",
                                                color: "#fff",
                                                fontSize: 10,
                                                px: 1,
                                                borderRadius: 1,
                                                fontWeight: 600
                                            }}>
                                            NEW
                                        </Box>
                                    )}

                                    {
                                        item?.type_desc &&
                                        <Box
                                            sx={{
                                                bgcolor: "#66d1ff",
                                                color: "#131212",
                                                fontSize: 10,
                                                px: 1,
                                                borderRadius: 1,
                                                fontWeight: 600,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                            <RamenDiningIcon sx={{
                                                fontSize: 12,
                                                color: '#aa54ff'
                                            }} />
                                            {item?.type_desc}
                                        </Box>
                                    }

                                    {/*  EXTRA ORDER BADGE */}
                                    {item?.isExtra && (
                                        <Box
                                            sx={{
                                                bgcolor: "#e74c3c",
                                                color: "#fff",
                                                fontSize: 10,
                                                px: 1,
                                                borderRadius: 1,
                                                fontWeight: 600
                                            }}>
                                            EXTRA
                                        </Box>
                                    )}

                                </Box>

                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <DietTextComponent
                                        value={item?.description}
                                        size={11}
                                        color="#777"
                                        sx={{
                                            display: "block",
                                            whiteSpace: "normal",
                                            wordBreak: "break-word",
                                            overflowWrap: "anywhere"
                                        }}
                                    />
                                </Box>

                                <DietTextComponent
                                    value={`${item?.group_name || ""} • ${item?.category_name || ""}`}
                                    size={10}
                                    color="#aaa"
                                />

                                {isEditing && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            mt: 1
                                        }}
                                    >

                                        <IconButton
                                            size="sm"
                                            variant="soft"
                                            color="danger"
                                            onClick={() => decrementQty(item.item_id)}
                                        >
                                            <RemoveIcon />
                                        </IconButton>

                                        <Box
                                            sx={{
                                                minWidth: 40,
                                                textAlign: "center",
                                                fontWeight: 700
                                            }}
                                        >
                                            {currentQty}
                                        </Box>

                                        <IconButton
                                            size="sm"
                                            variant="soft"
                                            color="success"
                                            onClick={() => incrementQty(item.item_id)}
                                        >
                                            <AddIcon />
                                        </IconButton>

                                        <DietButton
                                            width={100}
                                            onClick={() => handleSave(item)}
                                            name={'Save'}
                                            icon={SaveIcon}
                                        />

                                        <DietButton
                                            width={100}
                                            onClick={() => {
                                                setEditId(null)
                                                setQtyMap({})
                                            }}
                                            name={'Close'}
                                            icon={CancelIcon}
                                        />


                                    </Box>
                                )}

                            </Box>
                        </Box>
                        {/* RIGHT SIDE */}
                        <Box sx={{ textAlign: "right" }}>
                            <DietTextComponent
                                value={`x${item?.qty}`}
                                size={13}
                                weight={500}
                            />

                            <DietTextComponent
                                value={`₹${item?.total}`}
                                size={13}
                                weight={600}
                            />

                            {/* GST */}
                            {item?.gst_amount > 0 && (
                                <DietTextComponent
                                    value={`GST: ₹${item?.gst_amount}`}
                                    size={10}
                                    color="#888"
                                />
                            )}

                            {/* FINAL */}
                            <DietTextComponent
                                value={`₹${item?.totalWithGst}`}
                                size={12}
                                weight={700}
                                color="#2ecc71"
                            />
                        </Box>

                        <Box sx={{ textAlign: "right" }}>
                            {
                                activeTab === 'PENDING' && !isEditing && !item?.isNew && (
                                    <IconButton
                                        sx={{ height: 40, m: 1 }}
                                        size="sm"
                                        color={isEditing ? "primary" : "neutral"}
                                        variant="soft"
                                        onClick={() => handleEdit(item)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                )
                            }
                        </Box>


                        {/*  CANCEL BUTTON */}
                        {item?.isNew && (
                            <IconButton
                                sx={{ height: 40, m: 1 }}
                                size="sm"
                                color="neutral"
                                variant="soft"
                                onClick={() => onRemove(index)}>
                                <CancelIcon />
                            </IconButton>
                        )}
                    </Box>
                )
            })}
        </Box>
    );
};

export default memo(CanteenOrderItemList);