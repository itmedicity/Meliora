import { IconButton } from "@mui/joy";
import React from "react";

const ToggleSquareButton = ({ icon, color, selected, onClick }) => {

    return (
        <IconButton
            onClick={onClick}
            size="sm"
            variant="outlined"
            sx={{
                width: 32,
                height: 32,
                p: 0,
                borderRadius: "8px",
                color: selected ? "white" : color,
                backgroundColor: selected ? color : "transparent",
                borderColor: color,
                transition: "0.2s",
                "&:hover": {
                    backgroundColor: selected ? color : `${color}22`,
                },
            }}
        >
            {icon}
        </IconButton>
    );
};

export default ToggleSquareButton;

