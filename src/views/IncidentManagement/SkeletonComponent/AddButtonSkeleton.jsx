import React from "react";
import { Box, Skeleton } from "@mui/joy";

const AddButtonSkeleton = () => {
    return (
        <Box
            sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 1,
                px: 1.2,
                py: 0.3,
                borderRadius: "8px",
                width: "120px",   // Match expected button width
                height: "32px",   // Match expected height
                boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
                // background: "var(--royal-purple-100)", // faint bg
            }}
        >
            {/* Label Skeleton */}
            <Skeleton
                variant="text"
                level="body-md"
                sx={{
                    width: "70px",
                    height: "18px",
                    borderRadius: 4,
                }}
            />

            {/* Icon Circle Skeleton */}
            <Skeleton
                variant="circular"
                sx={{
                    width: 18,
                    height: 18,
                }}
            />
        </Box>
    );
};

export default AddButtonSkeleton;
