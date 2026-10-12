import React, { useEffect, useState } from "react";
import { Box } from "@mui/joy";

// const colors = [
//     "#ac4257",
//     "#e3a24c",
//     "#39cc4c",
//     "#396dc7",
//     "#d14fe8",
// ];

const AnimatedFoodIcon = ({ icons, size = 28, interval = 1400, Iconcolor = "var(--royal-purple-400)" }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % icons.length);
        }, interval);

        return () => clearInterval(timer);
    }, [icons.length, interval]);

    const IconComponent = icons[index];

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            transition: "transform 0.4s ease",
        }}>
            <IconComponent
                style={{
                    fontSize: size,
                    color: Iconcolor,
                    // filter: "drop-shadow(2px 2px 6px rgba(0,0,0,0.35))",
                    transition: "color 0.4s ease, filter 0.4s ease, transform 0.4s ease",
                }}
            />

        </Box>
    );
};

export default AnimatedFoodIcon;
