import React, { memo } from "react";
import { Box, Typography } from "@mui/joy";

const Field = ({ label, children, sx }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", ...sx }}>
            {label && (
                <Typography
                    sx={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#666",
                        ml: 1,
                        mb: 0.3,
                    }}
                >
                    {label}
                </Typography>
            )}

            <Box
                sx={{
                    backgroundColor: "#f1f1f1",
                    borderRadius: 8,
                    minHeight: 50,
                    display: 'flex',
                    alignItems: 'center',
                    px:1
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default memo(Field);
