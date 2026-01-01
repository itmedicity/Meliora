import React, { memo } from "react";
import { Box } from "@mui/joy";

const DataCollectionChip = ({ status, label }) => {
    return (
        <Box
            sx={{
                px: 1.5,
                py: 0.6,
                background: "linear-gradient(135deg, #f5f0ff, #ece3fa)",
                border: "1px solid #c6b6e9",
                borderRadius: "12px",
                fontSize: 11,
                fontWeight: 600,
                color: "#3b2a6a",
                letterSpacing: 0.3,
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease-in-out",
                display: "flex",
                alignItems: "center",
                gap: 0.6,
                "&:hover": {
                    background: "linear-gradient(135deg, #ece3fa, #e0d4f7)",
                    transform: "translateY(-2px)",
                },
            }}
        >
            {/* Indicator: ✓ if approved, dot if pending */}
            {status === 1 ? (
                <Box
                    component="span"
                    sx={{
                        color: "#1f690dd1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 700,
                    }}
                >
                    ✓
                </Box>
            ) : (
                <Box
                    sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#5d3a9c",
                    }}
                />
            )}

            {label}
        </Box>
    );
};

export default memo(DataCollectionChip);
