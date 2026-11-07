import React, { memo } from "react";
import { Box } from "@mui/material";
import DietTextComponent from "../../DietComponent/DietTextComponent";


const ActionCard = memo(({
    icon: Icon,
    title,
    onClick,
    bgColor,
    borderColor,
    hoverColor,
    iconColor,
}) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                cursor: "pointer",
                borderRadius: 2,
                p: 1.2,
                bgcolor: bgColor,
                border: `1px solid ${borderColor}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
                transition: "all .2s ease",
                userSelect: "none",

                "&:hover": {
                    bgcolor: hoverColor,
                    transform: "translateY(-2px)",
                },

                "&:active": {
                    transform: "translateY(0px)",
                },
            }}
        >
            <Icon
                sx={{
                    color: iconColor,
                    fontSize: 24,
                }}
            />

            <DietTextComponent
                value={title}
                size={11}
                weight={700}
            />
        </Box>
    );
});

export default memo(ActionCard);