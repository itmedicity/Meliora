
import React, { memo } from "react";
import { Box, Stack } from "@mui/material";
import DietTextComponent from "../../DietComponent/DietTextComponent";



const AssignedOrderSummary = ({
    itemDetails
}) => {

    const {
        canteen_order_id,
        party_name,
        fb_ip_no,
        fb_ptc_name,
        meal_type,
        bed_no,
        nursing_station,
        assigned_to,
        ItemStatus
    } = itemDetails || {};


    return (
        <Box
            sx={{
                px: 1.5,
                py: 1,
                borderBottom: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.paper"
            }}
        >

            {/* ================= FIRST ROW ================= */}

            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                    minWidth: 0
                }}
            >

                {/* ORDER NUMBER */}

                <Box
                    sx={{
                        px: 0.9,
                        py: 0.25,
                        borderRadius: 1,
                        backgroundColor: "primary.main",
                        flexShrink: 0
                    }}
                >
                    <DietTextComponent
                        value={`#${canteen_order_id || "-"}`}
                        size={13}
                        color="white"
                    />
                </Box>


                {/* PATIENT NAME */}

                <Box
                    sx={{
                        minWidth: 0,
                        flex: 1
                    }}
                >
                    <DietTextComponent
                        value={
                            fb_ptc_name ||
                            party_name ||
                            "-"
                        }
                        size={16}
                        fontWeight={700}
                        noWrap
                    />
                </Box>


                {/* STATUS */}

                <Box
                    sx={{
                        px: 0.8,
                        py: 0.25,
                        borderRadius: 1,
                        backgroundColor:
                            ItemStatus === "PICKEDUP"
                                ? "warning.light"
                                : "action.hover",
                        flexShrink: 0
                    }}
                >
                    <DietTextComponent
                        value={
                            ItemStatus ||
                            "PENDING"
                        }
                        size={12}
                        fontWeight={700}
                    />
                </Box>

            </Stack>


            {/* ================= SECOND ROW ================= */}

            <Stack
                direction="row"
                alignItems="center"
                spacing={0.7}
                sx={{
                    mt: 0.45,
                    minWidth: 0,
                    overflow: "hidden",
                    whiteSpace: "nowrap"
                }}
            >

                {/* PARTY */}

                <DietTextComponent
                    value={
                        party_name ||
                        "-"
                    }
                    size={9}
                />


                <DietTextComponent
                    value="•"
                    size={8}
                    color="text.secondary"
                />


                {/* IP NUMBER */}

                <DietTextComponent
                    value={
                        fb_ip_no ||
                        "-"
                    }
                    size={9}
                />


                <DietTextComponent
                    value="•"
                    size={8}
                    color="text.secondary"
                />


                {/* MEAL */}

                <DietTextComponent
                    value={
                        meal_type ||
                        "-"
                    }
                   size={9}
                    fontWeight={600}
                />


                <DietTextComponent
                    value="•"
                    size={8}
                    color="text.secondary"
                />


                {/* BED */}

                <DietTextComponent
                    value={`Bed ${bed_no || "-"}`}
                    size={9}
                />


                <DietTextComponent
                    value="•"
                    size={8}
                    color="text.secondary"
                />


                {/* NURSING STATION */}

                <DietTextComponent
                    value={
                        nursing_station ||
                        "-"
                    }
                    size={9}
                />


                <DietTextComponent
                    value="•"
                    size={8}
                    color="text.secondary"
                />


                {/* ASSIGNED TO */}

                <DietTextComponent
                    value={
                        assigned_to ||
                        "-"
                    }
                    size={9}
                />

            </Stack>

        </Box>
    );
};


export default memo(AssignedOrderSummary);

