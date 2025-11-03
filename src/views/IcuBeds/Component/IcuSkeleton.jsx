import React, { memo } from "react";
import { Box, Card, CardContent, Skeleton, } from "@mui/joy";

const IcuSkeleton = ({ count = 10 }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                p: 2,
            }}
        >
            {Array.from({ length: count }).map((_, index) => (
                <Card
                    key={index}
                    variant="outlined"
                    sx={{
                        width: 400,
                        borderRadius: "xl",
                        boxShadow: "md",
                    }}
                >
                    <CardContent>
                        {/* ICU Name */}
                        <Skeleton variant="text" level="title-lg" width="60%" />

                        {/* Chip row */}
                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: "md" }} />
                            <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: "md" }} />
                        </Box>

                        {/* Total Beds */}
                        <Skeleton variant="text" level="body-sm" width="50%" />

                        {/* Progress bar */}
                        <Skeleton variant="rectangular" width="100%" height={8} sx={{ borderRadius: "md", mt: 1 }} />

                        {/* Percent occupied */}
                        <Skeleton variant="text" level="body-xs" width="40%" sx={{ ml: "auto", mt: 1 }} />
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default memo(IcuSkeleton);
