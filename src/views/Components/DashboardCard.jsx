import React from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { taskColor } from "src/color/Color";

const DashboardCard = ({ icon: IconComp, title, onClose, children }) => {
    return (
        <Box
            sx={{
                height: "100%",
                borderRadius: 1,
                boxShadow: 2,
                flexGrow: 1,
                bgcolor: "#fff",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid #C5C5C5",
                    p: 1,
                    justifyContent: "space-between",
                }}
            >
                {/* Left section: Icon + Title */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {IconComp && (
                        <IconComp
                            fontSize="medium"
                            sx={{ color: taskColor.darkPurple, mr: 1 }}
                        />
                    )}

                    <Box sx={{ color: taskColor.darkPurple, fontWeight: 600 }}>{title}</Box>
                </Box>

                {/* Close Button */}
                <IconButton onClick={onClose} size="small">
                    <CloseIcon sx={{ color: taskColor.darkPurple }} />
                </IconButton>
            </Box>

            {/* Body */}
            <Box sx={{}}>{children}</Box>
        </Box>
    );
};

export default DashboardCard;

