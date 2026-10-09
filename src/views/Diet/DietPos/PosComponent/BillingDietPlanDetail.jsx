import React, { memo } from "react";
import { Box, Chip, Paper } from "@mui/material";
import DietTextComponent from "../../DietComponent/DietTextComponent";

const BillingDietPlanDetail = ({ plans = [] }) => {
    return (
        <Paper
            elevation={1}
            sx={{
                p: 2,
                borderRadius: 2,
                width: '50%'
            }}
        >
            <DietTextComponent
                value="Diet Plan History"
                size={18}
                weight={600}
            />

            <Box sx={{ mt: 2, overflow: "hidden", borderRadius: 1.5, border: "1px solid", borderColor: "divider" }}>

                {/* Header */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1.2fr 1.2fr 1fr",
                        bgcolor: "grey.100",
                        px: 2,
                        py: 1.2,
                        fontWeight: 600,
                    }}
                >
                    <DietTextComponent value="Diet" weight={600} />
                    <DietTextComponent value="Start Date" weight={600} />
                    <DietTextComponent value="End Date" weight={600} />
                    <DietTextComponent value="Status" weight={600} />
                </Box>

                {/* Rows */}
                {plans.map((plan, index) => (
                    <Box
                        key={plan.plan_id}
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "2fr 1.2fr 1.2fr 1fr",
                            alignItems: "center",
                            px: 2,
                            py: 1.5,
                            bgcolor: index % 2 === 0 ? "background.paper" : "grey.50",
                            borderTop: index !== 0 ? "1px solid" : "none",
                            borderColor: "divider",
                        }}
                    >
                        <DietTextComponent
                            value={plan.diet_name}
                            weight={600}
                        />

                        <DietTextComponent
                            value={plan.start_date || "-"}
                        />

                        <DietTextComponent
                            value={plan.end_date || "-"}
                        />

                        <Chip
                            label={plan.diet_status}
                            size="small"
                            color={
                                plan.diet_status === "ACTIVE"
                                    ? "success"
                                    : plan.diet_status === "STOPPED"
                                        ? "error"
                                        : "warning"
                            }
                            sx={{ width: "fit-content" }}
                        />
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};

export default memo(BillingDietPlanDetail);