import React, { memo } from 'react'
import { Box, Chip, Sheet } from '@mui/joy'
import PersonIcon from '@mui/icons-material/Person'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import DietTextComponent from '../../DietComponent/DietTextComponent'
import DietButton from '../../DietComponent/DietButton'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';

const DietConsultationCard = ({
    patient,
    onAssign,
    onView,
    onQuick,
    onConfirm
}) => {


    const status = patient?.assignment_status;

    const actionMap = {
        ASSIGNED: "Approve",
        APPROVED: "Start",
        IN_PROGRESS: "Complete",
        COMPLETED: "Completed",
        REASSIGNED: "Approve"
    };
    const colorMap = {
        ASSIGNED: "neutral",
        APPROVED: "primary",
        IN_PROGRESS: "warning",
        COMPLETED: "success",
        REASSIGNED: "danger"
    };

    const nextStatusMap = {
        ASSIGNED: "APPROVED",
        APPROVED: "IN_PROGRESS",
        IN_PROGRESS: "COMPLETED"
    };
    return (
        <Sheet

            sx={{
                position: "relative",
                p: 1.5,
                borderRadius: "18px",
                cursor: "pointer",
                bgcolor: "#fff",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
                transition: "0.25s",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 190,

                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 14px 30px rgba(0,0,0,0.12)"
                }
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 10,
                    right: 10
                }}
            >
                <Chip
                    size="sm"
                    color={colorMap[status] || "neutral"}
                    sx={{
                        fontSize: 10,
                        fontWeight: 700
                    }}
                >
                    {status || "PENDING"}
                </Chip>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}
            >
                <Box
                    sx={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        bgcolor: "#eef2ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <PersonIcon
                        sx={{
                            fontSize: 20,
                            color: "#4f46e5"
                        }}
                    />
                </Box>

                <Box>
                    <DietTextComponent
                        value={patient?.patient_name}
                        size={13}
                        weight={900}
                        color="#111"
                    />

                    <DietTextComponent
                        value={`${patient?.patient_gender} • ${patient?.patient_id}`}
                        size={10}
                        weight={500}
                        color="#777"
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    mt: 1.5,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5
                }}
            >
                <DietTextComponent
                    value={`Doctor : ${patient?.doctor_name}`}
                    size={10}
                    weight={600}
                />

                <DietTextComponent
                    value={`Bed : ${patient?.fb_bdc_no}`}
                    size={10}
                    weight={600}
                />

                <DietTextComponent
                    value={`Diet : ${patient?.diet_name}`}
                    size={10}
                    weight={700}
                />

                <DietTextComponent
                    value={`Calories : ${patient?.calories_per_day}`}
                    size={10}
                    weight={600}
                />

                {patient?.dietitian_name && (
                    <DietTextComponent
                        value={`Dietitian : ${patient?.dietitian_name}`}
                        size={10}
                        weight={600}
                        color="#2e7d32"
                    />
                )}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    gap: 1
                }}
            >
                {!status ? (
                    <>
                        <DietButton
                            width="100%"
                            icon={AssignmentTurnedInIcon}
                            name="Assign"
                            onClick={() => onAssign(patient, 'ASSIGNED')}
                        />

                        <DietButton
                            width="100%"
                            icon={ElectricBoltIcon}
                            name="Quick"
                            onClick={() => onQuick(patient, 'ASSIGNED')}
                        />
                    </>
                ) : (
                    <>
                        <DietButton
                            width="100%"
                            icon={AssignmentTurnedInIcon}
                            name={actionMap[status]}
                            onClick={() => onConfirm(patient, nextStatusMap[status])}
                            disabled={status === "COMPLETED"}
                        />

                        {status !== "COMPLETED" && (
                            <DietButton
                                width="100%"
                                icon={EnergySavingsLeafIcon}
                                name="Reassign"
                                onClick={() => onAssign(patient, 'REASSIGNED')}
                            />
                        )}
                    </>
                )}

                <DietButton
                    width="100%"
                    icon={RemoveRedEyeIcon}
                    name="View"
                    onClick={() => onView(patient)}
                />
            </Box>
        </Sheet>
    )
}

export default memo(DietConsultationCard)