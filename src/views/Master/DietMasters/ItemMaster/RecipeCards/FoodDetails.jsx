import React from "react";
import { Box, Typography, Skeleton } from "@mui/joy";

const FoodDetails = ({
    Loading,
    Data
}) => {


    // ingredients,
    const { nutrition } = Data ?? {};

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {/* Ingredients */}
            {/* <Box className="Ingredient">
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                    Ingredients
                </Typography>
                {
                    !Loading && ingredients && ingredients.length > 0 ?
                        (
                            <Typography sx={{ fontSize: 14, whiteSpace: "pre-line" }}>
                                {ingredients.map(item => `• ${item}`)}
                            </Typography>
                        ) : (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                {[...Array(10)].map((_, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            display: "flex",
                                            gap: 1,
                                            width: "15%",
                                        }}
                                    >
                                        <Skeleton variant="text" width="100%" />
                                    </Box>
                                ))}
                            </Box>

                        )
                }
            </Box> */}

            {/* Nutritional Content */}
            <Box className="NutritionalContent">
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                    Nutritional Content
                </Typography>
                {!Loading && nutrition && nutrition.length > 0 ? (
                    <Typography sx={{ fontSize: 14, whiteSpace: "pre-line" }}>
                        {nutrition.map(item => `• ${item}`).join("\n")}
                    </Typography>
                ) : (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {[...Array(4)].map((_, i) => (
                            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Skeleton variant="circular" width={6} height={6} />
                                <Skeleton variant="text" width={`${60 + i * 5}%`} />
                            </Box>
                        ))}
                    </Box>

                )}
            </Box>
        </Box>
    );
};

export default FoodDetails;
