import React from "react";
import { Box, Typography } from "@mui/material";
// import { FaPlus } from "react-icons/fa";
import LocalDiningRoundedIcon from '@mui/icons-material/LocalDiningRounded';

const AddFoodButton = ({ onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 160,
        px: 2,
        py: 1,
        borderRadius: 1,
        bgcolor: "primary.main",
        color: "white",
        cursor: "pointer",
        fontWeight: 600,
        gap: 1,
        mt:2
      }}
    >
      <LocalDiningRoundedIcon size={14} />
      <Typography fontSize={14}>Add Item</Typography>
    </Box>
  );
};

export default AddFoodButton;
