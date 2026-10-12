import React, { memo } from "react";
import { Box, Stack } from "@mui/material";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ReplayIcon from "@mui/icons-material/Replay";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import DietTextComponent from "../../DietComponent/DietTextComponent";


const CanteenItemCard = ({
    item
}) => {

    const quantity = Number(item?.quantity || 0);
    const price = Number(item?.price || 0);
    const gstAmount = Number(item?.gst_amount || 0);

    const itemTotal =
        quantity * price + gstAmount;


    const deliveryStatus =
        item?.delivery_status || "PENDING";


    const billingStatus = item?.isBilled
        ? item?.ItemBillStatus || "BILLED"
        : "NOT BILLED";


    /* =========================================================
       DELIVERY STATUS CONFIG
    ========================================================= */

    const deliveryStatusConfig = {

        PENDING: {
            background: "warning.50",
            color: "warning.700",
            border: "warning.200",
            icon: ScheduleIcon
        },

        PICKEDUP: {
            background: "info.50",
            color: "info.700",
            border: "info.200",
            icon: LocalShippingIcon
        },

        DELIVERED: {
            background: "success.50",
            color: "success.700",
            border: "success.200",
            icon: CheckCircleOutlineIcon
        },

        UNDELIVERED: {
            background: "error.50",
            color: "error.700",
            border: "error.200",
            icon: ErrorOutlineIcon
        },

        RETURNED: {
            background: "warning.50",
            color: "warning.800",
            border: "warning.300",
            icon: ReplayIcon
        },

        CANCELLED: {
            background: "grey.100",
            color: "text.secondary",
            border: "grey.300",
            icon: CancelOutlinedIcon
        }

    };


    const currentDeliveryStatus =
        deliveryStatusConfig[deliveryStatus] ||
        deliveryStatusConfig.PENDING;


    const DeliveryIcon =
        currentDeliveryStatus.icon;


    /* =========================================================
       BILLING STATUS CONFIG
    ========================================================= */

    const billingStatusConfig = item?.isBilled
        ? {
            background: "success.50",
            color: "success.700",
            border: "success.200"
        }
        : {
            background: "error.50",
            color: "error.700",
            border: "error.200"
        };


    return (
        <Box
            sx={{
                p: 1.2,

                border: "1px solid",
                borderColor: "divider",

                borderRadius: 2,

                backgroundColor: currentDeliveryStatus.background,

                transition: "all 0.2s ease",

                "&:hover": {
                    borderColor: "primary.main",
                    boxShadow: 1
                },
                
            }}
        >

            {/* =================================================
                ITEM NAME + TOTAL
            ================================================= */}

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
            >

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.8}
                    sx={{
                        minWidth: 0,
                        flex: 1
                    }}
                >

                    {/* ITEM ICON */}

                    <Box
                        sx={{
                            width: 28,
                            height: 28,

                            borderRadius: 1.5,

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                            backgroundColor: "action.hover",

                            flexShrink: 0
                        }}
                    >
                        <RestaurantIcon
                            sx={{
                                fontSize: 16
                            }}
                        />
                    </Box>


                    {/* ITEM NAME */}

                    <Box
                        sx={{
                            minWidth: 0
                        }}
                    >

                        <DietTextComponent
                            value={
                                item?.item_name ||
                                "Unnamed Item"
                            }
                            size={12}
                            fontWeight={700}
                            noWrap
                        />

                        <DietTextComponent
                            value={[
                                item?.item_code,
                                item?.category_name
                            ]
                                .filter(Boolean)
                                .join(" • ")}
                            size={9}
                            color="text.secondary"
                            noWrap
                        />

                    </Box>

                </Stack>


                {/* TOTAL */}

                <Box
                    sx={{
                        textAlign: "right",
                        flexShrink: 0
                    }}
                >

                    <DietTextComponent
                        value={`₹${itemTotal.toFixed(2)}`}
                        size={13}
                        fontWeight={800}
                    />

                    <DietTextComponent
                        value={`Qty ${quantity}`}
                        size={8}
                        color="text.secondary"
                    />

                </Box>

            </Stack>


            {/* =================================================
                ITEM DETAILS
            ================================================= */}

            <Stack
                direction="row"
                alignItems="center"
                spacing={0.7}
                sx={{
                    mt: 0.8,
                    px: 0.3,

                    overflow: "hidden",
                    whiteSpace: "nowrap"
                }}
            >

                <DietTextComponent
                    value={`Rate ₹${price.toFixed(2)}`}
                    size={9}
                />

                <DietTextComponent
                    value="•"
                    size={8}
                    color="text.secondary"
                />

                <DietTextComponent
                    value={`GST ${Number(
                        item?.gst || 0
                    )}%`}
                    size={9}
                />

                <DietTextComponent
                    value="•"
                    size={8}
                    color="text.secondary"
                />

                <DietTextComponent
                    value={`GST ₹${gstAmount.toFixed(2)}`}
                    size={9}
                />

            </Stack>


            {/* =================================================
                STATUS ROW
            ================================================= */}

            <Stack
                direction="row"
                alignItems="center"
                spacing={0.7}
                sx={{
                    mt: 0.7
                }}
            >

                {/* =================================================
                    DELIVERY STATUS
                ================================================= */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",

                        gap: 0.4,

                        px: 0.7,
                        py: 0.3,

                        borderRadius: 1,

                        backgroundColor:
                            currentDeliveryStatus.background,

                        color:
                            currentDeliveryStatus.color,

                        border: "1px solid",

                        borderColor:
                            currentDeliveryStatus.border
                    }}
                >

                    <DeliveryIcon
                        sx={{
                            fontSize: 13
                        }}
                    />

                    <DietTextComponent
                        value={deliveryStatus}
                        size={8}
                        fontWeight={700}
                        color={
                            currentDeliveryStatus.color
                        }
                    />

                </Box>


                {/* =================================================
                    BILLING STATUS
                ================================================= */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",

                        gap: 0.4,

                        px: 0.7,
                        py: 0.3,

                        borderRadius: 1,

                        backgroundColor:
                            billingStatusConfig.background,

                        color:
                            billingStatusConfig.color,

                        border: "1px solid",

                        borderColor:
                            billingStatusConfig.border
                    }}
                >

                    <ReceiptLongIcon
                        sx={{
                            fontSize: 13
                        }}
                    />

                    <DietTextComponent
                        value={billingStatus}
                        size={8}
                        fontWeight={700}
                        color={
                            billingStatusConfig.color
                        }
                    />

                </Box>


                {/* =================================================
                    SOURCE
                ================================================= */}

                <Box
                    sx={{
                        ml: "auto",
                        minWidth: 0
                    }}
                >

                    <DietTextComponent
                        value={
                            item?.source_type ||
                            "CANTEEN_ORDER"
                        }
                        size={8}
                        color="text.secondary"
                        noWrap
                    />

                </Box>

            </Stack>

        </Box>
    );
};


export default memo(CanteenItemCard);