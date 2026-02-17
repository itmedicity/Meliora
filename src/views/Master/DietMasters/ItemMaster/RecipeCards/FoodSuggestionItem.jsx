import React, { memo } from "react";
import { Box, Typography } from "@mui/joy";

const FoodSuggestionItem = ({ suggestions, onSelect }) => {
   

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
            {suggestions?.map(food => (
                <Box
                    key={food?.item_slno}
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
                        {food.item_name.toUpperCase()}
                    </Typography>
                    <Typography fontSize={12} color="neutral.500">
                        {food.group_name} • ₹{food.rate}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default memo(FoodSuggestionItem);
