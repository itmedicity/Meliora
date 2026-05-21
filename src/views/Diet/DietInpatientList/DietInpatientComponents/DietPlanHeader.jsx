import React from "react";
import { Box, Stack } from "@mui/joy";
import DietTextComponent from "../../DietComponent/DietTextComponent";


const DietPlanHeader = ({
    ptc_ptname,
    pt_no,
    ptc_sex,
    fb_rmc_desc,
    doc_name,
    isPlanned,
    getGender,
    ActiveDiet
}) => {

 

    return (
        <Box
            sx={{
                p: 2,
                bgcolor: "#fff",
                borderBottom: "1px solid #ececec"
            }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                {/* LEFT */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        minWidth: 0
                    }}
                >
                    {/* AVATAR */}
                    <Box
                        sx={{
                            width: 52,
                            height: 52,
                            minWidth: 52,
                            borderRadius: "50%",
                            bgcolor: isPlanned ? "#e8f5e9" : "#fff4e5",
                            color: isPlanned ? "#2e7d32" : "#ef6c00",
                            border: "2px solid",
                            borderColor: isPlanned ? "#c8e6c9" : "#ffd699",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 20,
                            fontWeight: 800
                        }}
                    >
                        {ptc_ptname?.charAt(0)}
                    </Box>

                    {/* DETAILS */}
                    <Box sx={{ minWidth: 0 }}>
                        <DietTextComponent
                            value={ptc_ptname}
                            size={18}
                            weight={800}
                            color="#222"
                        />

                        <Box
                            sx={{
                                display: "flex",
                                gap: 0.7,
                                flexWrap: "wrap",
                                mt: 0.5
                            }}
                        >
                            <Box sx={chipStyle}>
                                ID : {pt_no}
                            </Box>

                            <Box sx={chipStyle}>
                                {getGender(ptc_sex)}
                            </Box>

                            <Box sx={chipStyle}>
                                {fb_rmc_desc}
                            </Box>
                        </Box>

                        <DietTextComponent
                            value={doc_name || "-"}
                            size={11}
                            color="#777"
                            weight={600}
                            sx={{ mt: 0.8 }}
                        />
                    </Box>
                </Box>

                {/* CENTER STATUS */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minWidth: 150
                    }}
                >
                    <Box
                        sx={{
                            px: 2,
                            py: 0.8,
                            borderRadius: 30,
                            bgcolor: isPlanned ? "#e8f5e9" : "#fff4e5",
                            color: isPlanned ? "#2e7d32" : "#ef6c00",
                            border: "1px solid",
                            borderColor: isPlanned ? "#c8e6c9" : "#ffd699",
                            fontSize: 12,
                            fontWeight: 800,
                            letterSpacing: 0.4
                        }}
                    >
                        {isPlanned ? "PLANNED" : "NOT PLANNED"}
                    </Box>
                </Box>

                {/* RIGHT DIETITIAN */}
                {
                    ActiveDiet?.is_consultation === 1 && (
                        <Box
                            sx={{
                                minWidth: 180,
                                display: "flex",
                                justifyContent: "flex-end"
                            }}
                        >
                            <Box
                                sx={{
                                    px: 1.4,
                                    py: 1,
                                    borderRadius: 14,
                                    bgcolor: "#f4efff",
                                    border: "1px solid #dcc7ff",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    minWidth: 170
                                }}
                            >
                                <DietTextComponent
                                    value="Dietitian Assigned"
                                    size={10}
                                    weight={700}
                                    color="#7b4dff"
                                />

                                <DietTextComponent
                                    value={ActiveDiet?.Dietecian_name}
                                    size={13}
                                    weight={800}
                                    color="#4b2ca0"
                                />
                            </Box>
                        </Box>
                    )}
            </Stack>
        </Box>
    );
};

export default DietPlanHeader;

// reusable chip style
const chipStyle = {
    px: 1,
    py: 0.3,
    borderRadius: 10,
    bgcolor: "#f5f5f5",
    fontSize: 10,
    fontWeight: 700,
    color: "#555"
};