import React, { memo } from "react";
import {
    Box,
    Paper,
} from "@mui/material";

import DietTextComponent from "../../DietComponent/DietTextComponent";

const BillCard = ({
    icon,
    title,
    count,
    color = "#1976d2",
    selected = false,
    onClick = () => { },
}) => {
    return (
        <Paper
            elevation={0}
            onClick={onClick}
            sx={{
                p: 1,
                cursor: "pointer",
                textAlign: "center",
                borderRadius: 2,
                border: "1px solid",
                borderColor: selected ? color : "divider",
                bgcolor: selected ? `${color}15` : "background.paper",
                transition: ".25s",
                "&:hover": {
                    transform: "translateY(-2px)",
                    borderColor: color,
                },
            }}
        >
            <Box
                sx={{
                    color,
                    display: "flex",
                    justifyContent: "center",
                    mb: 0.5,
                }}
            >
                {icon}
            </Box>

            <DietTextComponent
                value={count}
                size={18}
                weight={700}
            />

            <DietTextComponent
                value={title}
                size={11}
                weight={600}
            />
        </Paper>
    );
};

export default memo(BillCard);