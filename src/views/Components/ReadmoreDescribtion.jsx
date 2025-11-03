import React, { useState } from "react";
import { Box, Typography } from "@mui/joy";

const ReadmoreDescription = ({ description }) => {
    const [expanded, setExpanded] = useState(false);

    if (!description) return null;

    return (
        <Box
            sx={{
                fontSize: 14,
                width: "85vw",
                position: "relative",
            }}
        >

            <Box
                sx={{
                    whiteSpace: expanded ? "normal" : "nowrap",
                    overflow: "hidden",
                    textOverflow: expanded ? "unset" : "ellipsis",
                }}
            >
                {description}
            </Box>

            {description.length > 200 && (
                <Typography
                    component="span"
                    sx={{
                        position: "absolute",
                        right: 8,
                        bottom: 0,
                        color: "blue",
                        cursor: "pointer",
                        fontSize: 12,
                        bgcolor: "white",
                        pl: 0.5,
                    }}
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "Read Less" : "...Read More"}
                </Typography>
            )}
        </Box>
    );
};

export default ReadmoreDescription;




