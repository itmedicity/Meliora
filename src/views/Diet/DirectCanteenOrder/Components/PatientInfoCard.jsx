import React from "react";
import { Box, Avatar } from "@mui/joy";
import DietTextComponent from "../../DietComponent/DietTextComponent";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const PatientInfoCard = ({ patient }) => {

    const hasPatient = patient && Object.keys(patient).length > 0;

    const getInitials = (name) => {
        if (!name) return "?";
        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: "#fff",
                border: "1px solid #e0e0e0",
                boxShadow: "0 3px 10px rgba(0,0,0,0.06)",
                minWidth: 280,
                minHeight: 140,
                display: "flex",
                flexDirection: "column",
                justifyContent: hasPatient ? "flex-start" : "center",
                alignItems: hasPatient ? "stretch" : "center",
                textAlign: hasPatient ? "left" : "center"
            }}
        >

            {!hasPatient ? (
                <>
                    {/* EMPTY STATE */}
                    <Avatar
                        sx={{
                            bgcolor: "#f0f2f5",
                            color: "#aaa",
                            width: 50,
                            height: 50
                        }}
                    >
                        <PersonOutlineIcon />
                    </Avatar>

                    <DietTextComponent
                        value="No Patient Selected"
                        size={14}
                        weight={600}
                        color="#777"
                    />

                    <DietTextComponent
                        value="Select a bed or patient to view details"
                        size={12}
                        color="#aaa"
                    />
                </>
            ) : (
                <>
                    {/* Top Section */}
                    <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar sx={{ bgcolor: "#1976d2" }}>
                            {getInitials(patient?.fb_ptc_name)}
                        </Avatar>

                        <Box>
                            <DietTextComponent
                                value={patient?.fb_ptc_name}
                                size={15}
                                weight={700}
                            />
                            <DietTextComponent
                                value={`${patient?.fb_ptc_sex}, ${patient?.fb_ptn_yearage} yrs`}
                                size={12}
                                color="#777"
                            />
                        </Box>
                    </Box>

                    {/* Divider */}
                    <Box sx={{ height: 1, bgcolor: "#eee", my: 1.5 }} />

                    {/* Info */}
                    <Box display="flex" flexDirection="column" gap={0.5}>
                        <DietTextComponent value={`IP No: ${patient?.fb_ip_no}`} size={13} />
                        <DietTextComponent value={`MRD No: ${patient?.fb_pt_no}`} size={13} />
                        <DietTextComponent value={`Ns Station: ${patient?.fb_ns_name}`} size={13} />
                        <DietTextComponent value={`Phone: ${patient?.fb_ptc_mobile}`} size={13} />
                    </Box>

                    {/* Bottom */}
                    <Box mt={0.5} display="flex" justifyContent="space-between">
                        <DietTextComponent
                            value={`Bed: ${patient?.fb_bdc_no}`}
                            size={13}
                            weight={600}
                        />
                        <DietTextComponent
                            value={patient?.fb_ipc_curstatus}
                            size={12}
                            color="#1976d2"
                            weight={600}
                        />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default PatientInfoCard;