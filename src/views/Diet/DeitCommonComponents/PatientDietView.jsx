import React from "react";
import { Box, Typography } from "@mui/joy";
import { taskColor } from "src/color/Color";

const PatientDietView = ({ patientDietData }) => {
    const {
        ptc_ptname,
        pt_no,
        mrdNo,
        age,
        gender,
        doctor,
        location,
        dietType,
        fullDayDiet,
    } = patientDietData;

    return (
        <Box
            sx={{
                flexGrow: 1,
                p: .5,
                bgcolor: taskColor.lightpurple,
                borderRadius: 3,
                height: "100%",
            }}
        >

            <Box
                sx={{
                    p: 1,
                    borderRadius: 3,
                    mb: 3,
                    display: 'flex'
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: 26, fontWeight: 700, }}>
                        {ptc_ptname}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                            {gender}
                        </Typography>
                        <Typography sx={{ fontSize: 15, fontWeight: 600, color: "#6b7280" }}>
                            · {age} yrs
                        </Typography>
                    </Box>
                    <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                        <b>Diet Type:</b> {dietType}
                    </Typography>
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                        <b>MRD No:</b> {mrdNo}
                    </Typography>
                    <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                        <b>IP No:</b> {pt_no}
                    </Typography>
                    <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                        <b>Doctor:</b> {doctor}
                    </Typography>
                    <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                        <b>Location:</b> {location}
                    </Typography>
                </Box>
                <Box sx={{ flex: 1 }}></Box>
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: 2,
                }}
            >
                {fullDayDiet?.map((meal) => (
                    <Box
                        key={meal.deitSlno}
                        sx={{
                            borderRadius: 3,
                            overflow: "hidden",
                            bgcolor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                            transition: "0.3s",
                            "&:hover": { boxShadow: "0 10px 24px rgba(0,0,0,0.12)" },
                        }}
                    >
                        {/* Card Header */}
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: "linear-gradient(90deg, #eef2ff, #e0e7ff)",
                                borderBottom: "1px solid #e5e7eb",
                            }}
                        >
                            <Typography sx={{ fontWeight: 700, fontSize: 17 }}>
                                {meal.time}
                            </Typography>
                            <Typography
                                sx={{ fontSize: 14, color: "#6366f1", fontWeight: 600 }}
                            >
                                {meal.diet}
                            </Typography>
                        </Box>

                        {/* Card Body */}
                        <Box sx={{ p: 2 }}>
                            {meal.items?.map((item, idx) => (
                                <Box
                                    key={idx}
                                    sx={{ display: "flex", alignItems: "center", mb: 0.8 }}
                                >
                                    <Box
                                        sx={{
                                            width: 7,
                                            height: 7,
                                            borderRadius: "50%",
                                            bgcolor: "#6366f1",
                                            mr: 1,
                                        }}
                                    />
                                    <Typography sx={{ fontSize: 14, color: "#374151" }}>
                                        {item}
                                    </Typography>
                                </Box>
                            ))}

                            {/* Delivery Status */}
                            <Box
                                sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    mt: 1.5,
                                    px: 1.8,
                                    py: 0.7,
                                    borderRadius: "30px",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    bgcolor: meal.delivered ? "#d1fae5" : "#fee2e2",
                                    color: meal.delivered ? "#065f46" : "#b91c1c",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                                }}
                            >
                                {meal.delivered
                                    ? `Delivered at ${meal.deliveredTime}`
                                    : "Not Delivered"}
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default PatientDietView;
