import React, { memo } from "react";
import { Box, Chip } from "@mui/joy";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DietTextComponent from "../DietComponent/DietTextComponent";

const PatientCancelledItemList = ({ items = [] }) => {
    return (
        <Box sx={{ maxHeight: 220, overflowY: "auto", px: 2 }}>
            {items?.length === 0 && (
                <DietTextComponent
                    value="No Cancelled Items"
                    size={13}
                    color="#888"
                />
            )}

            {items?.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 1,
                        borderBottom: "1px solid #f0f0f0",
                        opacity: 0.8
                    }}
                >
                    {/* LEFT */}
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <HighlightOffIcon sx={{ fontSize: 16, mt: 0.5, color: "red" }} />

                        <Box>
                            {/* Item Name + Cancel Badge */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <DietTextComponent
                                    value={item?.item_name}
                                    size={14}
                                    weight={600}
                                />

                                <Chip
                                    size="sm"
                                    color="danger"
                                    variant="soft"
                                >
                                    CANCELLED
                                </Chip>
                            </Box>

                            {/* Description */}
                            <DietTextComponent
                                value={item?.description || "No description"}
                                size={11}
                                color="#777"
                            />

                            {/* Cancel Info */}
                            <Box sx={{ mt: 0.5 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <PersonOutlineIcon sx={{ fontSize: 12 }} />
                                    <DietTextComponent
                                        value={item?.cancelled_by_name || "Unknown"}
                                        size={11}
                                        color="#555"
                                    />
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <AccessTimeIcon sx={{ fontSize: 12 }} />
                                    <DietTextComponent
                                        value={item?.cancelled_date}
                                        size={11}
                                        color="#555"
                                    />
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <InfoOutlinedIcon sx={{ fontSize: 12 }} />
                                    <DietTextComponent
                                        value={item?.cancelled_reason || "No reason"}
                                        size={11}
                                        color="#d32f2f"
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* RIGHT */}
                    {/* <Box sx={{ textAlign: "right" }}>
                        <DietTextComponent
                            value={`x${item.qty}`}
                            size={13}
                            weight={500}
                        />
                        <DietTextComponent
                            value={`₹${item.qty * item.price}`}
                            size={13}
                            weight={600}
                            color="#d32f2f"
                        />
                    </Box> */}
                </Box>
            ))}
        </Box>
    );
};

export default memo(PatientCancelledItemList);