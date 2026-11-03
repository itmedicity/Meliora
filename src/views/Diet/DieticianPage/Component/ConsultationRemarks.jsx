
import React from "react";
import { Box, Typography, Divider } from "@mui/joy";
import NotesIcon from "@mui/icons-material/Notes";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DietTextComponent from "../../DietComponent/DietTextComponent";

const ConsultationRemarks = ({ consultation }) => {
    const remarks = [
        {
            title: "Diet Plan Remarks",
            value: consultation?.remarks,
            icon: <NotesIcon />,
            color: "#2563eb",
            background: "#eff6ff"
        },
        {
            title: "Dietitian Consultation Remarks",
            value: consultation?.dietecian_remarks,
            icon: <PersonOutlineIcon />,
            color: "#16834a",
            background: "#effaf3"
        }
    ];

    return (
        <Box
            sx={{
                mt: 1.5,
                mb: 1.5,
                display: "flex",
                flexDirection: "column",
                gap: 1
            }}
        >
            <Typography
                level="title-md"
                sx={{ fontWeight: 800, color: "#263238" }}
            >
                Consultation Notes
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr"
                    },
                    gap: 1.5
                }}
            >
                {remarks?.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            p: 1.5,
                            borderRadius: "12px",
                            background: item.background,
                            border: `1px solid ${item.color}25`,
                            minHeight: 110
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 1
                            }}
                        >
                            <Box
                                sx={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: item.color,
                                    background: "#ffffff"
                                }}
                            >
                                {item.icon}
                            </Box>


                            <DietTextComponent
                                size={16}
                                value={item.title}
                            />
                        </Box>

                        <Divider sx={{ mb: 1, borderColor: `${item.color}25` }} />
                        <DietTextComponent
                            size={14}
                            value={item.value || "No remarks added."}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default React.memo(ConsultationRemarks);
