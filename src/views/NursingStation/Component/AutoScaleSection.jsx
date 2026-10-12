import { Box } from '@mui/joy'
import React, { memo, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const AutoScaleSection = ({
    title,
    titleColor,
    bg,
    children,
}) => {

    const [open, setOpen] = useState(true);

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            
            {/* Header */}
            <Box
                onClick={() => setOpen(prev => !prev)}
                sx={{
                    px: 0.8,
                    py: 0.4,
                    fontWeight: 700,
                    fontSize: "clamp(10px, 1vw, 14px)",
                    color: titleColor,
                    borderLeft: `5px solid ${titleColor}`,
                    bgcolor: bg,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: "pointer",

                    position: "sticky",
                    top: 0,
                    zIndex: 5,
                }}
            >
                <Box>{title}</Box>

                <Box
                    sx={{
                        transition: "transform 0.3s",
                        transform: open ? "rotate(0deg)" : "rotate(-90deg)"
                    }}
                >
                    <KeyboardArrowDownIcon />
                </Box>
            </Box>

            {/* Animated Content */}
            <Box
                sx={{
                    overflow: "hidden",
                    transition: "max-height 0.35s ease, opacity 0.25s ease",

                    maxHeight: open ? "1000px" : "0px", // key trick
                    opacity: open ? 1 : 0,
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gap: 0.6,
                        p:1,
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(clamp(110px, 10vw, 200px), 1fr))",
                        gridAutoRows:
                            "minmax(clamp(65px, 8vw, 95px), 1fr)",
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

export default memo(AutoScaleSection)