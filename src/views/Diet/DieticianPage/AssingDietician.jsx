import React, { useState } from "react";
import { Box, Card, Chip } from "@mui/joy";
import { useSelector } from "react-redux";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PersonIcon from "@mui/icons-material/Person";

import SelectDieticain from "src/views/CommonSelectCode/SelectDieticain";
import DietButton from "../DietComponent/DietButton";
import DietTextComponent from "../DietComponent/DietTextComponent";
import { axioslogin } from "src/views/Axios/Axios";
import { errorNotify, succesNotify } from "src/views/Common/CommonCode";

const PRIMARY = "#d027e7";

/* ---------- TOP IDENTITY HEADER ---------- */
const PatientHeader = ({ consultation }) => (
    <Box
        sx={{
            p: 2,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${PRIMARY}, #eb9bff)`,
            color: "#fff",
            mb: 2
        }}
    >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
                <DietTextComponent
                    value={consultation?.patient_name}
                    size={18}
                    weight={800}
                    color="#fff"
                />
                <DietTextComponent
                    value={`ID: ${consultation?.patient_id} • Bed: ${consultation?.fb_bdc_no}`}
                    size={12}
                    color="rgba(255,255,255,0.85)"
                    weight={500}
                />
            </Box>

            <Chip
                size="sm"
                sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "#fff",
                    fontWeight: 700
                }}
            >
                {consultation?.diet_status}
            </Chip>
        </Box>
    </Box>
);

/* ---------- HIGHLIGHT CARD ---------- */
const Highlight = ({ icon, label, value }) => (
    <Box
        sx={{
            flex: 1,
            p: 1.5,
            borderRadius: 14,
            border: "1px solid rgba(25,118,210,0.15)",
            bgcolor: "rgba(25,118,210,0.03)",
            display: "flex",
            alignItems: "center",
            gap: 1.2
        }}
    >
        <Box sx={{ color: PRIMARY }}>{icon}</Box>
        <Box>
            <DietTextComponent value={label} size={11} color="rgba(0,0,0,0.5)" />
            <DietTextComponent value={value || "-"} size={14} weight={700} />
        </Box>
    </Box>
);

/* ---------- MAIN ---------- */
const AssingDietician = ({ consultation, setOpen, FetchAllConsultation, assignstatus }) => {
    const [dietecian, setDietecian] = useState(null);
    const LoggedEmpDetail = useSelector((state) => state.LoginUserData);


    const HandleAssingPatient = async () => {
        const payload = {
            plan_id: consultation?.plan_id,
            assigned_to: dietecian,
            assigned_by: LoggedEmpDetail?.empid,
            status: assignstatus
        }
        try {
            const response = await axioslogin.post("/patientdietplan/assign-dietician", payload);
            const { success, message } = response.data;
            if (success === 0) return errorNotify(message || "Error in Fetching Data");
            succesNotify("Successfully Assigned  Patinet")
            setOpen(false)
            FetchAllConsultation()
        } catch (error) {
            errorNotify(error?.message || "Something went wrong");
        }
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Card
                sx={{
                    width: "100%",
                    borderRadius: 18,
                    p: 2.5,
                    boxShadow: "0 16px 45px rgba(0,0,0,0.10)"
                }}
            >
                {/* HEADER */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocalHospitalIcon sx={{ color: PRIMARY }} />
                    <DietTextComponent
                        value="Dietician Assignment"
                        size={16}
                        weight={800}
                    />
                </Box>

                <DietTextComponent
                    value="Review patient details and assign a dietician"
                    size={12}
                    color="rgba(0,0,0,0.6)"
                />

                {/* PATIENT HEADER (IMPORTANT PART) */}
                <PatientHeader consultation={consultation} />

                {/* HIGHLIGHTS ONLY (NOT FULL DETAILS) */}
                <Box sx={{ display: "flex", gap: 1.2 }}>
                    <Highlight
                        icon={<RestaurantIcon />}
                        label="Diet"
                        value={consultation?.diet_name}
                    />
                    <Highlight
                        icon={<LocalFireDepartmentIcon />}
                        label="Calories"
                        value={`${consultation?.calories_per_day || 0} kcal`}
                    />
                    <Highlight
                        icon={<FitnessCenterIcon />}
                        label="Protein"
                        value={`${consultation?.protein_per_day || 0} g`}
                    />
                </Box>

                {/* ASSIGNMENT CONTEXT (SMALL STRIP) */}
                <Box
                    sx={{
                        mt: 2,
                        p: 1.5,
                        borderRadius: 14,
                        bgcolor: "rgba(0,0,0,0.03)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <Box>
                        <DietTextComponent
                            value="Assigned By"
                            size={11}
                            color="rgba(0,0,0,0.5)"
                        />
                        <DietTextComponent
                            value={LoggedEmpDetail?.empname}
                            size={13}
                            weight={700}
                        />
                        <DietTextComponent
                            value={LoggedEmpDetail?.designation}
                            size={10}
                            weight={700}
                        />
                    </Box>

                    <PersonIcon sx={{ color: PRIMARY }} />
                </Box>

                {/* SELECT DIETICIAN */}
                <Box
                    sx={{
                        mt: 2,
                        p: 1.5,
                        borderRadius: 14,
                        border: "1px solid rgba(25,118,210,0.15)",
                        bgcolor: "rgba(25,118,210,0.03)"
                    }}
                >
                    <SelectDieticain
                        value={dietecian}
                        setValue={setDietecian}
                    />
                </Box>

                {/* ACTION */}
                <Box sx={{ mt: 2 }}>
                    <DietButton
                        width="100%"
                        name="Assign Dietician"
                        icon={PersonAddAlt1Icon}
                        disabled={!dietecian}
                        onClick={HandleAssingPatient}
                    />
                </Box>
            </Card>
        </Box>
    );
};

export default AssingDietician;