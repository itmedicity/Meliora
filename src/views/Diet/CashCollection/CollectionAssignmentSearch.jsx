import React, { memo } from "react";
import { Box } from "@mui/joy";
import DietSearchComponent from "../DietComponent/DietSearchComponent";

const CollectionAssignmentSearch = ({ search, setSearch }) => {
    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "#f6f6f6d9",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 1,
                borderRadius: 5,
                mt: 1
            }}>
            <Box
                sx={{
                    position: "relative",
                    borderRadius: 5,
                    p: 0.5,
                    overflow: "hidden",

                    "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "3px",
                        background:
                            "linear-gradient(90deg, transparent, #ac5bd1, #e2b8ff, #ac5bd1, transparent)",
                        backgroundSize: "200% 100%",
                        animation: "runningBorder 2s linear infinite",
                    },

                    "@keyframes runningBorder": {
                        "0%": {
                            backgroundPosition: "100% 0",
                        },
                        "100%": {
                            backgroundPosition: "-100% 0",
                        },
                    },
                }}
            >
                <DietSearchComponent
                    value={search}
                    onChange={(val) => setSearch(val)}
                />
            </Box>
        </Box>
    );
};

export default memo(CollectionAssignmentSearch);

