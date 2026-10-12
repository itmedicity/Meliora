import React from "react";
import {
    Box,
    Paper,
    Typography,
    Divider,
    Stack,
    Chip
} from "@mui/material";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const ExistingPacketDetails = ({
    displayPackets = [],
    getPacketItemCount,
    getItemId
}) => {

    return (
        <Stack spacing={1.25}>

            {displayPackets?.map((packet) => {

                const itemCount = getPacketItemCount(packet);

                const firstItem = packet?.items?.[0];

                const packingStatus =
                    firstItem?.packing_status || "COMPLETED";

                const packetStatus =
                    firstItem?.packet_status || "PACKED";

                const barcodePrinted =
                    packet?.items?.every(
                        item => Number(item?.barcode_printed) === 1
                    );

                return (
                    <Paper
                        key={packet.packet_uid}
                        elevation={0}
                        sx={{
                            border: "1px solid #e2e8f0",
                            borderRadius: 2.5,
                            overflow: "hidden",
                            backgroundColor: "#ffffff",
                            boxShadow:
                                "0 2px 8px rgba(15, 23, 42, 0.05)"
                        }}
                    >

                        {/* =========================
                            PACKET HEADER
                        ========================= */}

                        <Box
                            sx={{
                                px: 1.5,
                                py: 1.25,
                                background:
                                    "linear-gradient(135deg, #f8fafc, #ffffff)"
                            }}
                        >

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >

                                {/* LEFT */}
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >

                                    <Box
                                        sx={{
                                            width: 38,
                                            height: 38,
                                            borderRadius: 1.75,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#eff6ff",
                                            color: "primary.main"
                                        }}
                                    >
                                        <Inventory2OutlinedIcon
                                            sx={{
                                                fontSize: 21
                                            }}
                                        />
                                    </Box>

                                    <Box>

                                        <Typography
                                            fontSize={10}
                                            fontWeight={700}
                                            color="text.secondary"
                                            letterSpacing={0.5}
                                        >
                                            PACKET
                                        </Typography>

                                        <Typography
                                            fontSize={15}
                                            fontWeight={800}
                                            lineHeight={1.2}
                                        >
                                            #{packet.packet_no}
                                        </Typography>

                                        <Typography
                                            fontSize={10}
                                            color="text.secondary"
                                            sx={{
                                                mt: 0.25
                                            }}
                                        >
                                            {packet.packet_uid}
                                        </Typography>

                                    </Box>

                                </Stack>

                                {/* RIGHT */}
                                <Stack
                                    spacing={0.5}
                                    alignItems="flex-end"
                                >

                                    <Chip
                                        icon={
                                            <CheckCircleIcon
                                                sx={{
                                                    fontSize: "15px !important"
                                                }}
                                            />
                                        }
                                        label={packetStatus}
                                        size="small"
                                        sx={{
                                            height: 23,
                                            fontSize: 10,
                                            fontWeight: 700,
                                            backgroundColor:
                                                "#ecfdf5",
                                            color:
                                                "#047857",
                                            "& .MuiChip-icon": {
                                                color: "#059669"
                                            }
                                        }}
                                    />

                                    <Typography
                                        fontSize={10}
                                        color="text.secondary"
                                    >
                                        {itemCount} items
                                    </Typography>

                                </Stack>

                            </Box>

                        </Box>

                        <Divider />

                        {/* =========================
                            PACKET INFO
                        ========================= */}

                        <Box
                            sx={{
                                px: 1.5,
                                py: 0.75,
                                backgroundColor: "#fafafa"
                            }}
                        >

                            <Stack
                                direction="row"
                                spacing={1.5}
                                alignItems="center"
                                flexWrap="wrap"
                            >

                                <Stack
                                    direction="row"
                                    spacing={0.5}
                                    alignItems="center"
                                >
                                    <CheckCircleIcon
                                        sx={{
                                            fontSize: 14,
                                            color: "#10b981"
                                        }}
                                    />

                                    <Typography
                                        fontSize={10}
                                        color="text.secondary"
                                    >
                                        {packingStatus}
                                    </Typography>
                                </Stack>

                                <Stack
                                    direction="row"
                                    spacing={0.5}
                                    alignItems="center"
                                >
                                    <AccessTimeOutlinedIcon
                                        sx={{
                                            fontSize: 14,
                                            color: "#64748b"
                                        }}
                                    />

                                    <Typography
                                        fontSize={10}
                                        color="text.secondary"
                                    >
                                        {firstItem?.created_at
                                            ? firstItem.created_at
                                            : "Time unavailable"}
                                    </Typography>
                                </Stack>

                                <Stack
                                    direction="row"
                                    spacing={0.5}
                                    alignItems="center"
                                >
                                    <LocalPrintshopOutlinedIcon
                                        sx={{
                                            fontSize: 14,
                                            color: barcodePrinted
                                                ? "#10b981"
                                                : "#94a3b8"
                                        }}
                                    />

                                    <Typography
                                        fontSize={10}
                                        color={
                                            barcodePrinted
                                                ? "#047857"
                                                : "text.secondary"
                                        }
                                        fontWeight={
                                            barcodePrinted
                                                ? 600
                                                : 400
                                        }
                                    >
                                        {barcodePrinted
                                            ? "Barcode Printed"
                                            : "Barcode Not Printed"}
                                    </Typography>
                                </Stack>

                            </Stack>

                        </Box>

                        <Divider />

                        {/* =========================
                            ITEMS HEADER
                        ========================= */}

                        <Box
                            sx={{
                                px: 1.5,
                                py: 0.9,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >

                            <Typography
                                fontSize={11}
                                fontWeight={700}
                                color="text.secondary"
                                textTransform="uppercase"
                            >
                                Packed Items
                            </Typography>

                            <Box
                                sx={{
                                    px: 0.8,
                                    py: 0.2,
                                    borderRadius: 1,
                                    backgroundColor: "#f1f5f9"
                                }}
                            >
                                <Typography
                                    fontSize={10}
                                    fontWeight={700}
                                    color="text.secondary"
                                >
                                    {itemCount} ITEMS
                                </Typography>
                            </Box>

                        </Box>

                        {/* =========================
                            ITEMS
                        ========================= */}

                        <Box
                            sx={{
                                px: 1,
                                pb: 1
                            }}
                        >

                            <Stack spacing={0.6}>

                                {packet?.items?.map(
                                    (item, index) => {

                                        const itemId =
                                            getItemId(item);

                                        return (
                                            <Box
                                                key={
                                                    itemId ??
                                                    index
                                                }
                                                sx={{
                                                    display: "flex",
                                                    alignItems:
                                                        "center",
                                                    justifyContent:
                                                        "space-between",
                                                    gap: 1,
                                                    px: 1,
                                                    py: 0.9,
                                                    borderRadius: 1.5,
                                                    backgroundColor:
                                                        "#f8fafc",
                                                    border:
                                                        "1px solid #f1f5f9"
                                                }}
                                            >

                                                {/* ITEM DETAILS */}

                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    alignItems="center"
                                                    sx={{
                                                        minWidth: 0
                                                    }}
                                                >

                                                    <Box
                                                        sx={{
                                                            width: 30,
                                                            height: 30,
                                                            flexShrink: 0,
                                                            borderRadius: 1,
                                                            display:
                                                                "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            backgroundColor:
                                                                "#ffffff",
                                                            border:
                                                                "1px solid #e2e8f0"
                                                        }}
                                                    >
                                                        <Typography
                                                            fontSize={10}
                                                            fontWeight={800}
                                                            color="text.secondary"
                                                        >
                                                            {index + 1}
                                                        </Typography>
                                                    </Box>

                                                    <Box
                                                        sx={{
                                                            minWidth: 0
                                                        }}
                                                    >

                                                        <Typography
                                                            fontSize={12}
                                                            fontWeight={700}
                                                            noWrap
                                                        >
                                                            {item?.item_name ??
                                                                item?.item_name_short ??
                                                                item?.item_name_long ??
                                                                "Item"}
                                                        </Typography>

                                                        <Stack
                                                            direction="row"
                                                            spacing={0.75}
                                                            alignItems="center"
                                                        >

                                                            {item?.item_code && (
                                                                <Typography
                                                                    fontSize={9}
                                                                    fontWeight={700}
                                                                    color="primary.main"
                                                                >
                                                                    {item.item_code}
                                                                </Typography>
                                                            )}

                                                            {item?.item_alias && (
                                                                <>
                                                                    <Typography
                                                                        fontSize={9}
                                                                        color="text.disabled"
                                                                    >
                                                                        •
                                                                    </Typography>

                                                                    <Typography
                                                                        fontSize={9}
                                                                        color="text.secondary"
                                                                    >
                                                                        {item.item_alias}
                                                                    </Typography>
                                                                </>
                                                            )}

                                                        </Stack>

                                                    </Box>

                                                </Stack>

                                                {/* QUANTITY */}

                                                <Box
                                                    sx={{
                                                        flexShrink: 0,
                                                        minWidth: 42,
                                                        px: 0.8,
                                                        py: 0.45,
                                                        borderRadius: 1,
                                                        textAlign: "center",
                                                        backgroundColor:
                                                            "#e0f2fe"
                                                    }}
                                                >

                                                    <Typography
                                                        fontSize={11}
                                                        fontWeight={800}
                                                        color="#0369a1"
                                                    >
                                                        ×{" "}
                                                        {item?.quantity ??
                                                            0}
                                                    </Typography>

                                                </Box>

                                            </Box>
                                        );
                                    }
                                )}

                            </Stack>

                        </Box>

                    </Paper>
                );
            })}

        </Stack>
    );
};

export default ExistingPacketDetails;