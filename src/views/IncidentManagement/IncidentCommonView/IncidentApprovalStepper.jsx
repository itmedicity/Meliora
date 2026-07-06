import React, { useMemo, useState } from "react";
import {
    Stepper,
    Step,
    StepIndicator,
    Sheet,
} from "@mui/joy";
import {
    Tooltip,
    Chip,
    Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import IncidentTextComponent from "../Components/IncidentTextComponent";
import { FaRegEye } from 'react-icons/fa';
import { PiEyeClosedDuotone } from "react-icons/pi";

const IncidentApprovalStepper = ({ data }) => {


    const [expandaction, setExpandAction] = useState(true)

    const stepperData = useMemo(() => {

        if (!Array.isArray(data) || data.length === 0) {
            return [];
        }

        // Group all employees by approval level
        const groups = data?.reduce((acc, item) => {
            if (!acc[item.level_count]) {
                acc[item.level_count] = [];
            }
            acc[item.level_count].push(item);
            return acc;
        }, {});

        // Build one step for each level
        return Object.values(groups)?.map(group => {

            // Select the employee who approved the level.
            // If nobody approved yet, use the first employee.
            const selectedEmployee =
                group?.find(item => item?.level_review_state === "A") || group[0];

            // Check whether anyone in this level has approved
            const isLevelApproved =
                group?.some(item => item?.level_review_state === "A") ||

                // If the workflow has already moved to the next level,
                // this level must already be approved.
                selectedEmployee.inc_current_level > selectedEmployee.level_count;

            return {
                ...selectedEmployee,
                // Status used in UI
                displayStatus: isLevelApproved ? "Approved" : "Pending",
                // Boolean for icon/chip color
                isApproved: isLevelApproved,
            };
        });

    }, [data]);

    return (

        <>
            <Box sx={{
                width: '100%',
                bgcolor: 'var(--royal-purple-400)',
                py: 0.5,
                px: 1,
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <IncidentTextComponent
                    text={"LEVEL REVIEW DETAILS"}
                    size={14}
                    weight={600}
                    color={"white"}
                />

                <Tooltip title={expandaction ? 'Hide' : 'View'} variant="plain" size='sm'>
                    <span onClick={() => setExpandAction((prev) => !prev)} style={{ cursor: 'pointer' }}>
                        {expandaction ? (
                            <FaRegEye size={18} color="black" />
                        ) : (
                            <PiEyeClosedDuotone size={18} color="black" />
                        )}
                    </span>
                </Tooltip>
            </Box>
            <Sheet
                variant="outlined"
                sx={{
                    p: 1,
                    bgcolor: "background.body",
                    position: "relative",
                    overflow: 'hidden',
                    maxHeight: expandaction ? '1000px' : 0, // big enough to fit content
                    transition: 'max-height 0.4s ease, opacity 0.4s ease',
                }}
            >
                <Stepper
                    orientation="horizontal"
                    sx={{
                        width: "100%",
                        overflowX: "auto",
                        py: 2,
                    }}
                >
                    {stepperData?.map((item) => (
                        <Step
                            key={item.detail_slno}
                            orientation="vertical"
                            indicator={
                                <Tooltip
                                    arrow
                                    placement="top"
                                    title={
                                        <Box sx={{ minWidth: 250, p: 0.5 }}>
                                            <IncidentTextComponent
                                                text={item.level_name}
                                                color="#fff"
                                                weight={700}
                                                size={15}
                                            />

                                            <IncidentTextComponent
                                                text={`Employee : ${item?.em_name}`}
                                                color="#fff"
                                                weight={400}
                                                size={13}
                                            />

                                            <IncidentTextComponent
                                                text={`Status : ${item?.isApproved ? "Approved" : "Pending"}`}
                                                color="#fff"
                                                weight={600}
                                                size={13}
                                            />

                                            <IncidentTextComponent
                                                text={`Review : ${item.level_review || "No review available"}`}
                                                color="#fff"
                                                weight={400}
                                                size={12}
                                            />

                                            <IncidentTextComponent
                                                text={`Reviewed On : ${item.level_review_date || "-"}`}
                                                color="#fff"
                                                weight={400}
                                                size={12}
                                            />
                                        </Box>
                                    }
                                >
                                    <StepIndicator
                                        color={item.isApproved ? "success" : "warning"}
                                        variant={item.isApproved ? "solid" : "outlined"}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        {item.isApproved ? (
                                            <CheckCircleIcon fontSize="small" />
                                        ) : (
                                            <PendingIcon fontSize="small" />
                                        )}
                                    </StepIndicator>
                                </Tooltip>
                            }
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                gap={0.5}
                            >
                                <IncidentTextComponent
                                    text={item.level_name}
                                    size={11}
                                    weight={700}
                                />
                                <IncidentTextComponent
                                    text={`(Level-${item?.level_count})`}
                                    size={8}
                                    weight={600}
                                />

                                <Chip
                                    size="small"
                                    label={item.isApproved ? "Approved" : "Pending"}
                                    color={item.isApproved ? "success" : "warning"}
                                />
                            </Box>
                        </Step>
                    ))}
                </Stepper>
            </Sheet>
        </>
    );
};

export default IncidentApprovalStepper;