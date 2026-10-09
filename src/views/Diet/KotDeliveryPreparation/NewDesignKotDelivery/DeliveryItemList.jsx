import React, { memo, useMemo } from "react";
import { Box, } from "@mui/joy";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import DietTextComponent from "../../DietComponent/DietTextComponent";

const DeliveryItemList = ({ data = [], orderdetail }) => {

    //normalize backend → frontend structure
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

    const FinalFilterdData = orderdetail && orderdetail?.type_slno ?
        (items || [])?.filter(val => val.type_slno === orderdetail?.type_slno)
        : items;

    return (
        <Box sx={{ maxHeight: '80%', overflowY: "auto", px: 2, width: '100%' }}>
            {FinalFilterdData?.map((item, index) => (
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

                </Box>
            ))}
        </Box>
    );
};

export default memo(DeliveryItemList);