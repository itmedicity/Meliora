import React from "react";
import { Box } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";


const FloatingAddButton = ({ onClick }) => {
    return (
        <Box sx={{ position: "absolute", top: 60, right: 10, zIndex: 20 }}>
            <Box
                onClick={onClick}
                sx={{
                    width: 45,
                    height: 45,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    bgcolor: "#79a8f8",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                }}
            >
                <AddIcon sx={{ color: "white", fontSize: 30 }} />
            </Box>
        </Box>
    );
};

export default FloatingAddButton;
