import React, { memo } from "react";
import { Box, Typography } from "@mui/joy";

const FoodSuggestionItem = ({ food, onSelect }) => {
    return (
        <Box
            onClick={() => onSelect(food)}
            sx={{
                px: 2,
                py: 1,
                cursor: "pointer",
                "&:hover": {
                    bgcolor: "#f1f1f1",
                },
            }}
        >
            <Typography fontSize={14} fontWeight={600}>
                {food.item_name}
            </Typography>
            <Typography fontSize={12} color="neutral.500">
                {food.group_name} • ₹{food.rate}
            </Typography>
        </Box>
    );
};

export default memo(FoodSuggestionItem);
