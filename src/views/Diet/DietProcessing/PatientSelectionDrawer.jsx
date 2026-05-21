import React, { memo, useEffect, } from "react";
import { Box, Checkbox, Typography } from "@mui/joy";

const PatientSelectionDrawer = ({
    open,
    data = [],
    selectedPlans,
    setSelectedPlans
}) => {


 

    // select all initially
    useEffect(() => {
        if (data.length > 0 && selectedPlans.length === 0) {
            setSelectedPlans(data.map(p => p.plan_id));
        }
    }, [data]);

    const handleToggle = (planId) => {
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
                width: open ? 320 : 0,
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
                        {data.map(plan => {
                            const checked = selectedPlans.includes(plan.plan_id);

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
                                            onChange={() => handleToggle(plan.plan_id)}
                                        />
                                        <Box>
                                            <Typography level="body-sm">
                                                {plan.fb_ptc_name}
                                            </Typography>
                                            <Typography level="body-xs">
                                                <b>{plan.patient_id}</b>
                                            </Typography>

                                        </Box>
                                    </Box>

                                    <Box>
                                        <Typography level="body-xs">
                                            {plan.diet_name}
                                        </Typography>
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