import React, { memo, useMemo } from "react";
import { Box, IconButton } from "@mui/joy";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import DietTextComponent from "../../DietComponent/DietTextComponent";

const CanteenCancelItemList = ({ data = [], onCancelItem }) => {

    const items = useMemo(() => {
        return data?.map(item => ({
            ...item,
            qty: item.quantity || item?.qty || 0,
            price: item.price || 0,
            total: (item.quantity || item?.qty || 0) * (item.price || 0),
            totalWithGst:
                ((item.quantity || item?.qty || 0) * (item.price || 0)) +
                (item.gst_amount || 0)
        }));
    }, [data]);

    const isLastItem = items?.length === 1;

    return (
        <Box sx={{ maxHeight: '80%', overflowY: "auto", px: 2, width: '100%' }}>
            {items?.map((item, index) => {

                const isCancelled = item?.order_status === "CANCELLED";


                return (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            py: 1,
                            borderBottom: "1px solid #f0f0f0",
                            opacity: isCancelled ? 0.5 : 1
                        }}
                    >
                        {/* LEFT */}
                        <Box sx={{ display: "flex", gap: 1, flex: 1 }}>
                            <LunchDiningOutlinedIcon sx={{ fontSize: 16, mt: 0.3 }} />

                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                                    <DietTextComponent
                                        value={item?.item_name}
                                        size={14}
                                        weight={600}
                                    />

                                    {/* EXTRA */}
                                    {item?.isExtra && (
                                        <Box sx={{
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

                                    {/* CANCELLED TAG */}
                                    {isCancelled && (
                                        <Box sx={{
                                            bgcolor: "#999",
                                            color: "#fff",
                                            fontSize: 10,
                                            px: 1,
                                            borderRadius: 1,
                                            fontWeight: 600
                                        }}>
                                            CANCELLED
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

                        {/* RIGHT */}
                        <Box sx={{ textAlign: "right", display: "flex", alignItems: "center", gap: 1 }}>

                            <Box>
                                <DietTextComponent value={`x${item?.qty}`} size={13} />
                                <DietTextComponent value={`₹${item?.total}`} size={13} weight={600} />

                                {item?.gst_amount > 0 && (
                                    <DietTextComponent
                                        value={`GST: ₹${item?.gst_amount}`}
                                        size={10}
                                        color="#888"
                                    />
                                )}

                                <DietTextComponent
                                    value={`₹${item?.totalWithGst}`}
                                    size={12}
                                    weight={700}
                                    color="#2ecc71"
                                />
                            </Box>

                            {/*  CANCEL BUTTON */}
                            {!isCancelled && !isLastItem && (
                                <IconButton
                                    size="sm"
                                    color="danger"
                                    variant="soft"
                                    onClick={() => onCancelItem(item, index)}
                                >
                                    <CancelIcon />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                )
            })}
        </Box>
    );
};

export default memo(CanteenCancelItemList);