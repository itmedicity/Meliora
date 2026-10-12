import React from "react";
import { Box, Skeleton } from "@mui/joy";

const RoomPriceListSkeleton = ({ columnCount = 4, rowCount = 4 }) => {
    return (
        <Box sx={{ width: "100%", overflowX: "auto" }}>

            {/* Checkbox Skeleton */}
            <Skeleton
                variant="rectangular"
                width={220}
                height={30}
                sx={{ mb: 2, borderRadius: 4 }}
            />

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        {/* Room Name Header */}
                        <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                            <Skeleton variant="rectangular" height={20} width={120} />
                        </th>

                        {/* Dynamic Header Columns */}
                        {Array.from({ length: columnCount }).map((_, i) => (
                            <th key={i} style={{ padding: "8px", border: "1px solid #ccc" }}>
                                <Skeleton variant="rectangular" height={20} width={100} />
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {Array.from({ length: rowCount }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {/* Room Name */}
                            <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                                <Skeleton variant="text" width={120} height={20} />
                            </td>

                            {/* Input Cells */}
                            {Array.from({ length: columnCount }).map((_, colIndex) => (
                                <td
                                    key={colIndex}
                                    style={{ padding: "8px", border: "1px solid #ccc" }}
                                >
                                    <Skeleton
                                        variant="rectangular"
                                        height={30}
                                        sx={{ borderRadius: 4 }}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    );
};

export default RoomPriceListSkeleton;