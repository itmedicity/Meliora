import React from "react";
import {
    Box,
    Stack,
    Typography
} from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";

const ExistingPacketSelector = ({
    existingPackets = [],
    selectedPacketId,
    handleSelectExistingPacket
}) => {

    if (existingPackets.length === 0) {
        return null;
    }

    return (
        <Box
            sx={{
                width: "100%",
                p: 1.25,
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                background: "#ffffff"
            }}
        >

            {/* HEADER */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1
                }}
            >

                <Box>

                    <Typography
                        fontSize={13}
                        fontWeight={700}
                        color="#1e293b"
                    >
                        Packed Packets
                    </Typography>

                    <Typography
                        fontSize={10}
                        color="text.secondary"
                    >
                        Select a packet to view its items
                    </Typography>

                </Box>

                <Box
                    sx={{
                        px: 1,
                        py: 0.4,
                        borderRadius: 5,
                        background: "#f1f5f9"
                    }}
                >
                    <Typography
                        fontSize={10}
                        fontWeight={700}
                        color="#475569"
                    >
                        {existingPackets.length} Packets
                    </Typography>
                </Box>

            </Box>


            {/* PACKETS */}

            <Box
                sx={{
                    display: "flex",
                    flexWrap: 'wrap',
                    gap: 1,
                    pb: 0.5,
                }}
            >

                {existingPackets.map((packet) => {

                    const isSelected =
                        selectedPacketId ===
                        packet.packet_uid;

                    const itemCount =
                        packet?.items?.reduce(
                            (total, item) =>
                                total +
                                Number(
                                    item?.quantity ?? 0
                                ),
                            0
                        ) || 0;

                    return (

                        <Box
                            key={packet.packet_uid}
                            onClick={() =>
                                handleSelectExistingPacket(
                                    packet.packet_uid
                                )
                            }
                            sx={{
                                minWidth: 145,
                                position: "relative",
                                cursor: "pointer",

                                px: 1.25,
                                py: 1,

                                borderRadius: 2,

                                border: isSelected
                                    ? "1.5px solid #9431f7"
                                    : "1px solid #e2e8f0",

                                background: isSelected
                                    ? "#eff6ff"
                                    : "#ffffff",

                                transition:
                                    "all 0.2s ease",

                                "&:hover": {
                                    borderColor:
                                        "#9431f7",

                                    background:
                                        isSelected
                                            ? "#eff6ff"
                                            : "#f8fafc",

                                    transform:
                                        "translateY(-1px)"
                                }
                            }}
                        >

                            {/* ACTIVE INDICATOR */}

                            {isSelected && (
                                <Box
                                    sx={{
                                        position:
                                            "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: 3,
                                        background:
                                            "#9431f7",
                                        borderRadius:
                                            "8px 8px 0 0"
                                    }}
                                />
                            )}


                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >

                                {/* ICON */}

                                <Box
                                    sx={{
                                        width: 34,
                                        height: 34,
                                        borderRadius: 1.5,

                                        display: "flex",
                                        alignItems:
                                            "center",
                                        justifyContent:
                                            "center",

                                        background:
                                            isSelected
                                                ? "#dbeafe"
                                                : "#f1f5f9",

                                        color:
                                            isSelected
                                                ? "#9431f7"
                                                : "#64748b"
                                    }}
                                >

                                    <Inventory2Icon
                                        sx={{
                                            fontSize: 19
                                        }}
                                    />

                                </Box>


                                {/* DETAILS */}

                                <Box
                                    sx={{
                                        minWidth: 0
                                    }}
                                >

                                    <Typography
                                        fontSize={12}
                                        fontWeight={700}
                                        color={
                                            isSelected
                                                ? "#9431f7"
                                                : "#334155"
                                        }
                                    >
                                        Packet{" "}
                                        {packet.packet_no}
                                    </Typography>

                                    <Typography
                                        fontSize={10}
                                        color="text.secondary"
                                    >
                                        {itemCount}{" "}
                                        {itemCount === 1
                                            ? "item"
                                            : "items"}
                                    </Typography>

                                </Box>

                            </Stack>


                            {/* SELECTED TEXT */}

                            {isSelected && (
                                <Typography
                                    fontSize={9}
                                    fontWeight={700}
                                    color="#9431f7"
                                    sx={{
                                        mt: 0.75,
                                        textTransform:
                                            "uppercase",
                                        letterSpacing:
                                            0.5
                                    }}
                                >
                                    Viewing Packet
                                </Typography>
                            )}

                        </Box>

                    );

                })}

            </Box>

        </Box>
    );
};

export default ExistingPacketSelector;