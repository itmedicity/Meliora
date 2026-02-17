import React, { memo } from "react";
import { Box, Typography, IconButton } from "@mui/joy";
import { AiOutlineDelete } from "react-icons/ai";

const IngredientList = ({
    ingredients = [],
    editIndex,
    onEdit,
    onRemove,
}) => {
    return (
        <Box mt={1}>
            {ingredients?.map((ing, i) => (
                <Box
                    key={i}
                    onClick={() => onEdit(i)}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        bgcolor: editIndex === i ? "#e3f2fd" : "#f5f5f5",
                        p: 1,
                        borderRadius: 6,
                        mb: 0.5,
                        cursor: "pointer",
                        boxShadow: 'sm'
                    }}>
                    <Typography fontSize={13}>
                        • {ing?.name?.toUpperCase()} – {ing?.value} {ing?.unit}
                    </Typography>

                    <IconButton
                        size="sm"
                        color="danger"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove(i);
                        }}
                    >
                        <AiOutlineDelete />
                    </IconButton>
                </Box>
            ))}
        </Box>
    );
};

export default memo(IngredientList);
