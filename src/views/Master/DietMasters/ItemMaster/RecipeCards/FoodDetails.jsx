import React from "react";
import { Box, Skeleton } from "@mui/joy";
import DietTextComponent from "src/views/Diet/DietComponent/DietTextComponent";

const NutritionCard = ({ label, value, unit, loading }) => {
    return (
        <Box
            sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 8,
                padding: 1.5,
                minWidth: 110,
                background: "#fafafa"
            }}
        >
            {/* Label */}
            <DietTextComponent
                value={label}
                size={12}
                weight={500}
                color={'neutral.600'}
            />

            {/* Value */}
            {loading ? (
                <Skeleton width={60} />
            ) : (
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                    <DietTextComponent
                        value={value ?? "-"}
                        size={18}
                        weight={600}
                        color={'black'}
                    />
                    <DietTextComponent
                        value={unit}
                        size={12}
                        weight={400}
                        color={'neutral.500'}
                    />
                </Box>
            )}
        </Box>
    );
};

const FoodDetails = ({ Loading, Data }) => {
    const nutrition = Data ?? {};

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>

            {/* Title */}
            <DietTextComponent
                value={"Nutrition Facts"}
                size={16}
                weight={600}
                color={'black'}
            />

            {/* Grid */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(110px,1fr))",
                    gap: 1
                }}
            >
                <NutritionCard
                    label="Calories"
                    value={nutrition?.calories_kcal}
                    unit="kcal"
                    loading={Loading}
                />

                <NutritionCard
                    label="Protein"
                    value={nutrition?.protein_g}
                    unit="g"
                    loading={Loading}
                />

                <NutritionCard
                    label="Carbohydrates"
                    value={nutrition?.carbohydrates_g}
                    unit="g"
                    loading={Loading}
                />

                <NutritionCard
                    label="Fat"
                    value={nutrition?.fat_g}
                    unit="g"
                    loading={Loading}
                />

                <NutritionCard
                    label="Fiber"
                    value={nutrition?.fiber_g}
                    unit="g"
                    loading={Loading}
                />

                <NutritionCard
                    label="Sodium"
                    value={nutrition?.sodium_mg}
                    unit="mg"
                    loading={Loading}
                />
            </Box>
        </Box>
    );
};

export default FoodDetails;