import React from "react";
import { Box } from "@mui/joy";
import CancelIcon from '@mui/icons-material/Cancel';

const FloatingPanel = ({ open, onClose, children, title }) => {

    if (!open) return null
    return (
        <Box
            sx={{
                position: "absolute",
                top: 180,
                right: 20,
                zIndex: 300,
                p: 1,
                width: 300,
                borderRadius: "md",
                bgcolor: "white",
                boxShadow: "0 4px 25px rgba(0,0,0,0.18)",
                animation: "slideIn 0.25s ease-out",
                "@keyframes slideIn": {
                    from: { transform: "translateX(20px)", opacity: 0 },
                    to: { transform: "translateX(0)", opacity: 1 },
                },
            }}
        >
            <Box sx={{ flex: 1, display: 'flex' }}>
                <Box sx={{ flex: 1, pl: 1, pt: .5, fontSize: 15, fontWeight: 600 }}>
                    {title}
                </Box>
                <Box>
                    <CancelIcon onClick={onClose} sx={{ height: 28, width: 28, color: "darkred", cursor: 'pointer' }} />
                </Box>
            </Box>

            {children}


        </Box>
    );
};

export default FloatingPanel;
