import React, { memo } from "react";
import { Box, Typography, Chip } from "@mui/joy";

import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";

const PRIMARY = "#ba2aea";

const DietConsultationDetails = ({ consultation }) => {
    const status = consultation?.assignment_status || consultation?.diet_status;


    const StatCard = ({ icon, label, value }) => (
        <Box
            sx={{
                p: 1.5,
                borderRadius: 14,
                border: "1px solid rgba(25,118,210,0.15)",
                background:
                    "linear-gradient(180deg, rgba(25,118,210,0.06), rgba(25,118,210,0.02))",
                display: "flex",
                alignItems: "center",
                gap: 1.5
            }}
        >
            <Box
                sx={{
                    color: PRIMARY,
                    display: "flex",
                    alignItems: "center"
                }}
            >
                {icon}
            </Box>

            <Box>
                <Typography level="body-xs" sx={{ color: "rgba(0,0,0,0.55)" }}>
                    {label}
                </Typography>
                <Typography sx={{ fontWeight: 700 }}>
                    {value || "-"}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}>

            {/* HEADER */}
            <Box
                sx={{
                    p: 2,
                    borderRadius: 16,
                    background: `linear-gradient(135deg, ${PRIMARY}, #bc69e3)`,
                    color: "#fff"
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#fff' }}>
                            {consultation?.patient_name || "-"}
                        </Typography>
                        <Typography sx={{ fontSize: 12, opacity: 0.85, color: '#fff' }}>
                            ID: {consultation?.patient_id} •{" "}
                            {consultation?.patient_gender === "F" ? "Female" : "Male"}
                        </Typography>
                    </Box>

                    <Chip
                        size="sm"
                        sx={{
                            bgcolor: "rgba(255,255,255,0.2)",
                            color: "#fff",
                            fontWeight: 700,
                            border: "1px solid rgba(255,255,255,0.3)"
                        }}
                    >
                        {status}
                    </Chip>
                </Box>
            </Box>

            {/* STATS */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 1.2
                }}
            >
                <StatCard
                    label="Doctor"
                    value={consultation?.doctor_name}
                    icon={<LocalHospitalOutlinedIcon />}
                />
                <StatCard
                    label="Bed"
                    value={consultation?.fb_bdc_no}
                    icon={<BedOutlinedIcon />}
                />
                <StatCard
                    label="Calories"
                    value={`${consultation?.calories_per_day || 0} kcal`}
                    icon={<LocalFireDepartmentOutlinedIcon />}
                />
                <StatCard
                    label="Protein"
                    value={consultation?.diet_name}
                    icon={<FitnessCenterOutlinedIcon />}
                />
            </Box>

        </Box>
    );
};

export default memo(DietConsultationDetails);