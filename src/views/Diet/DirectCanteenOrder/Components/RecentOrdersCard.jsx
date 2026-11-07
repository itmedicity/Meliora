import React from "react";
import { Box } from "@mui/joy";
import DietTextComponent from "../../DietComponent/DietTextComponent";

const RecentOrdersCard = ({ data = [] }) => {

    if (data?.length === 0) {
        return (
            <Box
                sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#fff",
                    border: "1px dashed #ddd"
                }}
            >
                <DietTextComponent
                    value="No recent orders"
                    size={12}
                    color="#aaa"
                />
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {data?.map((order, index) => {

                const total = order?.items.reduce((sum, item) => {
                    return sum + (item.price * item.quantity) + item.gst_amount;
                }, 0);

                return (
                    <Box
                        key={index}
                        sx={{
                            p: 1.2,
                            borderRadius: 2,
                            bgcolor: "#fafafa",
                            border: "1px solid #eee"
                        }}
                    >
                        {/* HEADER */}
                        <Box display="flex" justifyContent="space-between">
                            <DietTextComponent
                                value={order.type}
                                size={11}
                                weight={700}
                                color={order.type === "CANTEEN" ? "#1976d2" : "#9c27b0"}
                            />
                            <DietTextComponent
                                value={order.order_status}
                                size={11}
                                color={
                                    order.order_status === "PENDING"
                                        ? "#ff9800"
                                        : "#4caf50"
                                }
                            />
                        </Box>

                        {/* TIME */}
                        <DietTextComponent
                            value={new Date(order.order_time).toLocaleTimeString()}
                            size={11}
                            color="#999"
                        />

                        {/* ITEMS */}
                        <Box mt={0.5}>
                            {order.items.map((item, i) => (
                                <DietTextComponent
                                    key={i}
                                    value={`${item.item_name} x ${item.quantity}`}
                                    size={12}
                                />
                            ))}
                        </Box>

                        {/* TOTAL */}
                        <Box mt={0.5} display="flex" justifyContent="flex-end">
                            <DietTextComponent
                                value={`₹ ${total}`}
                                size={12}
                                weight={600}
                                color="#1976d2"
                            />
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};

export default RecentOrdersCard;