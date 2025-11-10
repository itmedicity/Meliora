// Error Page for Icu Beds
import React from "react";
import { Box, Typography, Button } from "@mui/joy";
import { BiSolidError } from "react-icons/bi";

const BedFetchError = ({ onRetry }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "90vh",
                width: "100%",
                textAlign: "center",
                bgcolor: "transparent",
            }}
        >
            {/* Animated Icon */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                    animation: "pulse 1.5s infinite",
                    "@keyframes pulse": {
                        "0%": { transform: "scale(1)", opacity: 1 },
                        "50%": { transform: "scale(1.1)", opacity: 0.8 },
                        "100%": { transform: "scale(1)", opacity: 1 },
                    },
                }}
            >
                <BiSolidError size={60} color="var(--royal-purple-400)" />
            </Box>

            {/* Heading */}
            <Typography level="h3" sx={{ mb: 1, fontWeight: 700 }}>
                Failed to Fetch Data
            </Typography>
            {/* Subtext */}
            <Typography level="body-md" sx={{ color: "text.secondary", maxWidth: 480 }}>
                Oops! Something went wrong while loading the ICU bed data.
            </Typography>
            <Typography level="body-md" sx={{ mb: 3, color: "text.secondary", maxWidth: 380, lineHeight: 1.6 }}>
                Please check your connection or try again.
            </Typography>

            {/* Retry Button */}
            <Button
                size="lg"
                onClick={onRetry}
                sx={{
                    backgroundColor: "var(--royal-purple-400)",
                    "&:hover": {
                        backgroundColor: "var(--royal-purple-400)",
                        color: 'black'
                    },
                    borderRadius: "md",
                    px: 4,
                    fontWeight: 600,
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                    transition: "all 0.3s ease",
                }}
            >
                Retry
            </Button>
        </Box>
    );
};

export default BedFetchError;
