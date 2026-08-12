import React from "react";
import { Box, Stack, Checkbox, Textarea } from "@mui/joy";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
// import PersonIcon from "@mui/icons-material/Person";

import DietTextComponent from "../../DietComponent/DietTextComponent";
import SelectPatientDiet from "../InpateintFilter.jsx/SelectPatientDiet";
// import SelectDieticain from "src/views/CommonSelectCode/SelectDieticain";

const NewDietPlanSection = ({
    isPlanned,
    editMode,
    ActiveDiet,
    consultationRequired,
    setConsultationRequired,
    dietType,
    setDietType,
    remarks,
    setRemarks,
    dietHistory = []
}) => {

    // CHECK ACTIVE PLAN
    // const hasActiveDiet = dietHistory?.some(
    //     (val) => val?.diet_status === "ACTIVE"
    // );



    // CHECK ONLY STOPPED
    const onlyStoppedDiet =
        dietHistory?.length > 0 &&
        dietHistory?.every(
            (val) => val?.status === "STOPPED"
        );

    // HIDE WHEN ACTIVE PRESENT AND NOT IN EDIT MODE
    if (isPlanned && !editMode) {
        return null;
    }

    // SHOW WHEN:
    // 1. NO PLAN
    // 2. ONLY STOPPED PRESENT
    // 3. EDIT MODE

    return (
        <Stack spacing={1.5}>
            {/* ===== DIET SELECTION CARD ===== */}
            <Box
                sx={{
                    p: 2,
                    borderRadius: 16,
                    bgcolor: "#fff",
                    border: "1px solid #eee",
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-start"
                }}
            >

                <Box
                    sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        bgcolor: "#f3ecff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <RestaurantMenuIcon
                        sx={{
                            color: "#7b4dff",
                            fontSize: 22
                        }}
                    />
                </Box>

                <Box sx={{ flex: 1 }}>

                    <DietTextComponent
                        value={
                            onlyStoppedDiet
                                ? "Create New Diet Plan"
                                : "Select Diet Plan"
                        }
                        size={15}
                        weight={800}
                    />

                    <DietTextComponent
                        value="Choose patient diet type"
                        size={12}
                        color="#777"
                    />

                    <Box
                        sx={{
                            mt: 1,
                            p: 1,
                            borderRadius: 12,
                            bgcolor: "#fafafa",
                            border: "1px solid #eee"
                        }}
                    >
                        <SelectPatientDiet
                            value={dietType}
                            setValue={setDietType}
                        />
                    </Box>

                </Box>

            </Box>

            {/* ===== CONSULTATION ===== */}
            {(ActiveDiet?.is_consultation !== 1 || editMode || onlyStoppedDiet) && (

                <Box
                    sx={{
                        p: 2,
                        borderRadius: 16,
                        bgcolor: consultationRequired
                            ? "#f7f0ff"
                            : "#fff",

                        border: "1px solid #eee",

                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >

                    <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                    >

                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 12,

                                bgcolor: consultationRequired
                                    ? "#e6d6ff"
                                    : "#fff3e0",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <MedicalServicesIcon
                                sx={{
                                    color: consultationRequired
                                        ? "#7b4dff"
                                        : "#f57c00",

                                    fontSize: 20
                                }}
                            />
                        </Box>

                        <Box>

                            <DietTextComponent
                                value="Dietitian Consultation"
                                size={14}
                                weight={800}
                            />

                            <DietTextComponent
                                value="Enable if dietitian is required"
                                size={11}
                                color="#777"
                            />

                        </Box>

                    </Stack>

                    <Checkbox
                        checked={consultationRequired === true}
                        onChange={(e) => {

                            const checked = e.target.checked;

                            setConsultationRequired(checked);
                        }}
                    />

                </Box>
            )}
            <Box
                sx={{
                    p: 2,
                    borderRadius: 16,
                    bgcolor: "#fff",
                    border: "1px solid #eee",
                }}
            >
                <DietTextComponent
                    value="Remarks"
                    size={14}
                    weight={800}
                />

                <DietTextComponent
                    value="Enter any additional remarks for this diet plan"
                    size={11}
                    color="#777"
                />

                <Textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    minRows={3}
                    maxRows={5}
                    placeholder="Enter remarks..."
                    sx={{
                        mt: 1.5,
                        borderRadius: 12,
                        bgcolor: "#fafafa",
                        border: "1px solid #eee",

                        "&:focus-within": {
                            borderColor: "#7b4dff",
                            boxShadow: "0 0 0 2px rgba(123, 77, 255, 0.12)",
                        },

                        "& textarea": {
                            fontSize: 13,
                        },
                    }}
                />
            </Box>

        </Stack>
    );
};

export default NewDietPlanSection;