import React, { memo } from "react";
import { Box, Typography } from "@mui/joy";
import { safeParseJSON } from "src/views/Diet/CommonData/Common";

const FoodSuggestionItem = ({ suggestions, onSelect, activeIndex, personType }) => {


    return (
        <Box sx={{
            position: "absolute",
            top: "110%",
            left: 0,
            right: 0,
            bgcolor: "#fff",
            borderRadius: 8,
            boxShadow: "md",
            zIndex: 20
        }}>
            {
                suggestions?.map((food, index) => {

                    const parsed = safeParseJSON(food.price_details);
                    const parsedPrices = Array.isArray(parsed) ? parsed : [];

                    const match = parsedPrices.find(
                        item => Number(item.party_type_id) === Number(personType)
                    );

                    // fallback if no match
                    const selected = match || parsedPrices[0] || {};

                    const finalFoodDetail = {
                        ...food,
                        price: selected.price ?? 0,
                        gst_rate: selected.gst_rate ?? 0,
                        discount: selected.discount ?? 0
                    };

                    return (
                        <Box
                            key={food?.item_slno}
                            onClick={() => onSelect(finalFoodDetail)}
                            sx={{
                                px: 2,
                                py: 1,
                                cursor: "pointer",
                                bgcolor: index === activeIndex ? "#e3f2fd" : "transparent",
                                "&:hover": {
                                    bgcolor: "#f1f1f1",
                                },
                            }}
                        >
                            <Typography fontSize={14} fontWeight={600}>
                                {food.item_code} • {(food.item_name || "").toUpperCase()}
                            </Typography>

                            <Typography fontSize={10} color="neutral.500">
                                {food.group_name} • {food.category_name} • ₹{match?.price ?? food.price ?? 0}
                            </Typography>
                        </Box>
                    )
                })}
        </Box>
    );
};

export default memo(FoodSuggestionItem);
