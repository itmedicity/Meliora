import React, { memo, useEffect, } from "react";
import { Box, Checkbox, Typography } from "@mui/joy";
import { PatientstatusConfig } from "../CommonData/Common";
import { Chip, Tooltip } from "@mui/material";
import DietTextComponent from "../DietComponent/DietTextComponent";

const PatientSelectionDrawer = ({
    open,
    data = [],
    selectedPlans,
    setSelectedPlans
}) => {


    // select all initially
    useEffect(() => {
        if (data.length > 0 && selectedPlans.length === 0) {
            setSelectedPlans(data
                ?.filter(p => p.fb_ipc_curstatus === 'ADM')
                ?.map(p => p.plan_id));
        }
    }, [data]);

    const handleToggle = (planId, ptStatus) => {

        // Do not allow inactive patients to be selected
        if (ptStatus != "ADM") return;

        setSelectedPlans(prev =>
            prev.includes(planId)
                ? prev.filter(id => id !== planId)
                : [...prev, planId]
        );
    };

    const isAllSelected = selectedPlans.length === data.length;

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedPlans([]);
        } else {
            setSelectedPlans(data.map(p => p.plan_id));
        }
    };

    return (
        <Box
            sx={{
                width: open ? 520 : 0,
                transition: "all 0.3s ease",
                overflow: "hidden",
                borderRight: open ? "1px solid #ddd" : "none",
                height: "100%",
                backgroundColor: "#fff"
            }}
        >
            {open && (
                <Box sx={{ p: 1 }}>
                    <Box
                        onClick={handleSelectAll}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 1,
                            mb: 1,
                            borderRadius: 2,
                            backgroundColor: '#f5f7fa',
                            cursor: 'pointer',
                            border: '1px solid #e0e0e0',
                            '&:hover': {
                                backgroundColor: '#eef4ff'
                            }
                        }}
                    >
                        {/* LEFT */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Checkbox
                                variant="outlined"
                                size="sm"
                                sx={{
                                    '--Checkbox-radius': '4px',
                                    '--Checkbox-gap': '6px',
                                    '--Checkbox-size': '20px',
                                    '--joy-palette-primary': '#7c51a1',
                                    '& .MuiCheckbox-root': {
                                        borderColor: '#7c51a1',
                                    },
                                    '& .Mui-checked': {
                                        color: '#7c51a1',
                                    }
                                }}
                                checked={isAllSelected}
                                indeterminate={
                                    selectedPlans.length > 0 &&
                                    selectedPlans.length < data.length
                                }
                            />
                            <Typography level="body-sm" sx={{ fontWeight: 600 }}>
                                Select All Patients
                            </Typography>
                        </Box>

                        {/* RIGHT COUNT */}
                        <Typography level="body-xs" sx={{ color: 'text.secondary' }}>
                            {selectedPlans.length} / {data.length}
                        </Typography>
                    </Box>

                    <Box sx={{ maxHeight: 500, overflowY: "auto" }}>
                        {
                            data?.map(plan => {
                                const checked = selectedPlans?.includes(plan.plan_id);
                                const AdmissiongStatus = PatientstatusConfig[plan.fb_ipc_curstatus];
                                return (
                                    <Box
                                        key={plan.plan_id}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            p: 1,
                                            mb: 1,
                                            borderRadius: 2,
                                            border: "1px solid #eee",
                                            backgroundColor: checked ? "#f0f7ff" : "#fff"
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Checkbox
                                                variant="outlined"
                                                size="sm"
                                                sx={{
                                                    '--Checkbox-radius': '4px',
                                                    '--Checkbox-gap': '6px',
                                                    '--Checkbox-size': '20px',
                                                    '--joy-palette-primary': '#7c51a1',
                                                    '& .MuiCheckbox-root': {
                                                        borderColor: '#7c51a1',
                                                    },
                                                    '& .Mui-checked': {
                                                        color: '#7c51a1',
                                                    }
                                                }}
                                                checked={checked}
                                                onChange={() => handleToggle(plan.plan_id, AdmissiongStatus?.shortLabel)}
                                            />
                                            <Box>
                                                <DietTextComponent
                                                    value={plan?.fb_ptc_name}
                                                    size={12}
                                                    color="#060606"
                                                />
                                                <DietTextComponent
                                                    value={plan?.patient_id}
                                                    size={10}
                                                    color="#727070"
                                                />
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                gap={0.5}
                                                sx={{
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <Tooltip title={AdmissiongStatus?.label}
                                                    placement='left-start'>
                                                    <Chip
                                                        icon={AdmissiongStatus?.icon && (
                                                            React.cloneElement(AdmissiongStatus.icon, {
                                                                size: 14,
                                                                color: AdmissiongStatus?.color,
                                                            })
                                                        )}
                                                        label={AdmissiongStatus?.shortLabel || "-"}
                                                        size="small"
                                                        sx={{
                                                            height: 24,
                                                            borderRadius: "6px",
                                                            fontSize: 10,
                                                            fontWeight: 700,
                                                            backgroundColor:
                                                                AdmissiongStatus?.bgColor ||
                                                                "rgba(37, 99, 235, 0.08)",
                                                            color: AdmissiongStatus?.color || "inherit",
                                                            border: `1px solid ${AdmissiongStatus?.borderColor || "transparent"
                                                                }`,
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Box>

                                            <DietTextComponent
                                                value={plan?.diet_name}
                                                size={10}
                                                color="#131212"
                                            />
                                        </Box>
                                    </Box>
                                );
                            })}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default memo(PatientSelectionDrawer);