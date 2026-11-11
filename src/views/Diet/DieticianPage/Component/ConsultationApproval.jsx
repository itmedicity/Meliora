
import React, { useEffect, useState } from "react";
import {
    Box,
    Divider,
    FormControl,
    FormLabel,
    Textarea,
    Button,
    IconButton,
    Typography
} from "@mui/joy";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

import SelectPatientDiet from "../../DietInpatientList/InpateintFilter.jsx/SelectPatientDiet";
import DietTextComponent from "../../DietComponent/DietTextComponent";

const ConsultationApproval = ({
    patient,
    approvalRemarks,
    setApprovalRemarks,
    onCancel,
    onConfirm,
    setDietType,
    dietType,
    onUpdatePlanRemarks
}) => {
    const [planRemarks, setPlanRemarks] = useState("");
    const [editingRemarks, setEditingRemarks] = useState(false);
    const [savingRemarks, setSavingRemarks] = useState(false);

    useEffect(() => {
        setPlanRemarks(patient?.remarks || "");
        setEditingRemarks(false);
    }, [patient?.plan_id, patient?.remarks]);

    const handleSavePlanRemarks = async () => {
        if (!patient?.plan_id) return;

        setSavingRemarks(true);

        try {
            const success = await onUpdatePlanRemarks(
                patient.plan_id,
                planRemarks
            );

            if (success) {
                setEditingRemarks(false);
            }
        } finally {
            setSavingRemarks(false);
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                // gap: 1
            }}
        >
            <DietTextComponent
                size={22}
                value="DIET PLAN MANAGEMENT"
            />

            <DietTextComponent
                size={16}
                value={patient?.patient_name}
            />
            <DietTextComponent
                size={14}
                value={`${patient?.patient_id} | Bed: ${patient?.fb_bdc_no}`}
            />
            <DietTextComponent
                size={10}
                value="Review the diet plan and enter consultation details"
                weight={600}
            />

            <Divider sx={{ my: 1 }} />

            {/* DIET SELECTION */}
            <Box>
                <DietTextComponent
                    value="Select Diet Plan"
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

            <Divider sx={{ my: 1 }} />

            {/* DIET PLAN REMARKS */}
            <Box
                sx={{
                    p: 1.5,
                    borderRadius: 10,
                    bgcolor: "#f8f9fc",
                    border: "1px solid #e5e7eb"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1
                    }}
                >
                    <DietTextComponent
                        value="Diet Plan Remarks"
                        size={14}
                        weight={800}
                    />

                    {!editingRemarks && (
                        <IconButton
                            size="sm"
                            variant="soft"
                            color="primary"
                            onClick={() => setEditingRemarks(true)}
                        >
                            <EditIcon />
                        </IconButton>
                    )}
                </Box>

                {editingRemarks ? (
                    <>
                        <Textarea
                            minRows={2}
                            maxRows={4}
                            value={planRemarks}
                            onChange={(e) => setPlanRemarks(e.target.value)}
                            placeholder="Enter diet plan remarks..."
                            sx={{ fontFamily: "Bahnschrift" }}
                        />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 1,
                                mt: 1
                            }}
                        >
                            <Button
                                size="sm"
                                color="neutral"
                                variant="outlined"
                                startDecorator={<CloseIcon />}
                                onClick={() => {
                                    setPlanRemarks(patient?.remarks || "");
                                    setEditingRemarks(false);
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                size="sm"
                                color="success"
                                startDecorator={<SaveIcon />}
                                loading={savingRemarks}
                                onClick={handleSavePlanRemarks}
                            >
                                Save
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Typography
                        level="body-sm"
                        sx={{
                            whiteSpace: "pre-wrap",
                            color: planRemarks ? "#333" : "#999"
                        }}
                    >
                        {planRemarks || "No diet plan remarks added."}
                    </Typography>
                )}
            </Box>
            <Divider sx={{ my: 1 }} />

            {/* CONSULTATION REMARKS - SEPARATE FROM PLAN REMARKS */}
            <FormControl>
                <FormLabel>Consultation Remarks</FormLabel>

                <Textarea
                    minRows={4}
                    maxRows={6}
                    placeholder="Enter consultation details..."
                    value={approvalRemarks}
                    onChange={(e) => setApprovalRemarks(e.target.value)}
                    sx={{ fontFamily: "Bahnschrift" }}
                />
            </FormControl>

            {/* ACTIONS */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1,
                    mt: 2
                }}
            >
                <Button
                    variant="outlined"
                    color="neutral"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button color="success" onClick={onConfirm}>
                    Confirm
                </Button>
            </Box>
        </Box>
    );
};

export default React.memo(ConsultationApproval);
