import React from "react";
import { Box, Button } from "@mui/material";
import { format, addDays } from "date-fns";

const TodayTomorrowToggle = ({ value, onChange }) => {
    const today = new Date();

    const options = [
        { label: "Today", date: format(today, "yyyy-MM-dd") },
        { label: "Tomorrow", date: format(addDays(today, 1), "yyyy-MM-dd") },
    ];

    return (
        <Box sx={{
            display: "inline-flex",
            p: 0.35,
            bgcolor: "#f1f0f5",
            borderRadius: 2,
            gap: 0.3,
        }}>
            {options.map((option) => {
                const selected = value === option.date;

                return (
                    <Button
                        key={option.date}
                        size="small"
                        onClick={() => onChange?.(option.date)}
                        sx={{
                            minWidth: 65,
                            px: 1.2,
                            py: 0.5,
                            fontSize: 12,
                            fontWeight: 700,
                            textTransform: "none",
                            borderRadius: 1.5,
                            color: selected ? "#8e24aa" : "#666",
                            bgcolor: selected ? "#fff" : "transparent",
                            boxShadow: selected ? 1 : "none",
                            "&:hover": {
                                bgcolor: selected ? "#fff" : "#e9e7ef",
                            },
                        }}
                    >
                        {option.label}
                    </Button>
                );
            })}
        </Box>
    );
};

export default TodayTomorrowToggle;