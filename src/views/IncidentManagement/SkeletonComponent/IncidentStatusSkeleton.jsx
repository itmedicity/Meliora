import React from "react";
import { Box, Skeleton } from "@mui/joy";

const IncidentStatusSkeleton = () => {
    return (
        <Box
            sx={{
                position: "relative",
                px: 2,
                py: 1,
                boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
                bgcolor: "white",
                borderRadius: 5,
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            {/* Text Skeleton */}
            <Skeleton
                variant="text"
                width={70}
                height={18}
                sx={{ borderRadius: 4, bgcolor: "rgba(255,255,255,0.35)" }}
            />

            {/* Icon Skeleton */}
            <Skeleton
                variant="circular"
                width={18}
                height={18}
                sx={{ bgcolor: "rgba(255,255,255,0.35)" }}
            />
        </Box>
    );
};

export default IncidentStatusSkeleton;
