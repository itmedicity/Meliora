import React, { memo } from "react";
import { Box, Typography } from "@mui/joy";

const BedStatCard = ({ value, label, bgColor, textColor, margin }) => {
    return (
        <Box
            sx={{
                px: 2,
                py: 1,
                borderRadius: "md",
                bgcolor: bgColor,
                textAlign: "center",
                flex: 1,
                ...margin,
            }}
        >
            <Typography sx={{ color: textColor, fontSize: 28, fontWeight: 600 }}>
                {value}
            </Typography>
            <Typography level="body-sm" sx={{ color: textColor }}>
                {label}
            </Typography>
        </Box>
    );
};

export default memo(BedStatCard);
