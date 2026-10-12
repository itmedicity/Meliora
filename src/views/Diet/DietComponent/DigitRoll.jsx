import React, { memo, useEffect, useState } from "react";
import { Box } from "@mui/joy";

const DigitRoll = ({ prevDigit, newDigit }) => {
    const [offset, setOffset] = useState(prevDigit);

    useEffect(() => {
        // trigger CSS animation
        setOffset(newDigit);
    }, [newDigit]);

    return (
        <Box
            sx={{
                height: 32,
                overflow: "hidden",
                display: "inline-block",
                width: 20, // adjust width if needed
            }}
        >
            <Box
                sx={{
                    transform: `translateY(-${offset * 32}px)`,
                    transition: "transform 0.5s ease-out", // smooth roll
                }}
            >
                {[...Array(10)].map((_, i) => (
                    <Box key={i} sx={{ height: 32, textAlign: "center" }}>
                        {i}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default memo(DigitRoll);
