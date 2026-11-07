import React from "react";
import {
    Box,
    Paper,
    Typography,
    Divider,
    Stack,
    IconButton,
    Button
} from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PackingPacketList = ({
    packets = [],
    existingPackets = [],
    activePacketId,
    getPacketItemCount,
    getItemId,
    handleCancelPacket,
    handleRemoveItemFromPacket,
    handleConfirmPacket,
    selectedItems
}) => {

    // Show locally created packets only
    // when there are no existing backend packets.
    if (existingPackets.length > 0) {
        return null;
    }




    return (
        <Stack spacing={1}>

            {packets?.map((packet) => {
                const isActive =
                    activePacketId === packet.temp_id;

                return (
                    <Paper
                        key={packet.temp_id}
                        elevation={0}
                        sx={{
                            border: isActive
                                ? "1px solid #1976d2"
                                : "1px solid #e2e8f0",
                            borderRadius: 2,
                            overflow: "hidden"
                        }}
                    >

                        {/* =========================
                            PACKET HEADER
                        ========================= */}

                        <Box
                            sx={{
                                px: 1.5,
                                py: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >

                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >

                                <Inventory2Icon
                                    fontSize="small"
                                />

                                <Typography
                                    fontSize={13}
                                    fontWeight={700}
                                >
                                    Packet{" "}
                                    {packet.packet_no}
                                </Typography>

                            </Stack>

                            <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                            >

                                <Typography
                                    fontSize={11}
                                    color="text.secondary"
                                >
                                    {
                                        getPacketItemCount(
                                            packet
                                        )
                                    }{" "}
                                    items
                                </Typography>

                                {!packet.confirmed && (
                                    <IconButton
                                        size="small"
                                        onClick={() =>
                                            handleCancelPacket(
                                                packet.temp_id
                                            )
                                        }
                                    >
                                        <CloseIcon
                                            fontSize="small"
                                        />
                                    </IconButton>
                                )}

                            </Stack>

                        </Box>

                        <Divider />

                        {/* =========================
                            PACKET ITEMS
                        ========================= */}

                        <Box sx={{ p: 1 }}>

                            {packet.items.length === 0 ? (

                                <Typography
                                    fontSize={11}
                                    color="text.secondary"
                                    textAlign="center"
                                    py={1}
                                >
                                    Select items below for
                                    this packet
                                </Typography>

                            ) : (

                                <Stack spacing={0.75}>

                                    {packet?.items.map(
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
                                                        display:
                                                            "flex",
                                                        alignItems:
                                                            "center",
                                                        justifyContent:
                                                            "space-between",
                                                        px: 1,
                                                        py: 0.75,
                                                        background:
                                                            "#f8fafc",
                                                        borderRadius:
                                                            1
                                                    }}
                                                >

                                                    <Typography
                                                        fontSize={12}
                                                    >
                                                        {
                                                            item?.item_name ??
                                                            item?.item_name_short ??
                                                            item?.item_name_long ??
                                                            "Item"
                                                        }
                                                    </Typography>

                                                    <Stack
                                                        direction="row"
                                                        spacing={0.5}
                                                        alignItems="center"
                                                    >

                                                        <Typography
                                                            fontSize={12}
                                                            fontWeight={600}
                                                        >
                                                            ×{" "}
                                                            {
                                                                item?.quantity ??
                                                                0
                                                            }
                                                        </Typography>

                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                handleRemoveItemFromPacket(
                                                                    packet.temp_id,
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <DeleteOutlineIcon
                                                                sx={{
                                                                    color: "red"
                                                                }}
                                                                fontSize="small"
                                                            />
                                                        </IconButton>

                                                    </Stack>

                                                </Box>
                                            );
                                        }
                                    )}

                                </Stack>

                            )}

                        </Box>

                        {/* =========================
                            CONFIRM PACKET
                        ========================= */}

                        {isActive &&
                            selectedItems?.length > 0 && (

                                <>
                                    <Divider />

                                    <Box
                                        sx={{
                                            p: 1,
                                            display: "flex",
                                            justifyContent:
                                                "flex-end"
                                        }}
                                    >

                                        <Button
                                            size="small"
                                            variant="contained"
                                            startIcon={
                                                <CheckCircleIcon />
                                            }
                                            onClick={
                                                handleConfirmPacket
                                            }
                                            disabled={
                                                selectedItems.length === 0
                                            }
                                        >
                                            Confirm Packet
                                        </Button>

                                    </Box>

                                </>
                            )}

                    </Paper>
                );
            })}

        </Stack>
    );
};

export default PackingPacketList;
