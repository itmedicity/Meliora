import React, { memo } from "react";
import {
    Box,
    Typography,
    Avatar
} from "@mui/joy";

const EmployeeSuggestion = ({
    employee,
    onSelect,
    isLast
}) => {

    return (
        <Box
            onClick={() => onSelect(employee)}
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                px: 1.5,
                py: 1.1,
                cursor: "pointer",
                transition: "background-color 0.15s ease",

                borderBottom: !isLast
                    ? "1px solid #f0ebf3"
                    : "none",

                "&:hover": {
                    bgcolor: "#faf6fc"
                }
            }}
        >

            {/* AVATAR */}

            <Avatar
                sx={{
                    width: 28,
                    height: 28,
                    flexShrink: 0,
                    bgcolor: "#eee4f4",
                    color: "#7c51a1",
                    fontSize: 13,
                    fontWeight: 700
                }}
            >
                {employee?.employee_name
                    ?.charAt(0)
                    ?.toUpperCase()}
            </Avatar>


            {/* EMPLOYEE INFO */}

            <Box
                sx={{
                    flex: 1,
                    minWidth: 0
                }}
            >

                {/* NAME + EMPLOYEE NO */}

                <Typography
                    level="body-sm"
                    sx={{
                        fontWeight: 700,
                        color: "#33283a",
                        fontSize: 12,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}
                >
                    {employee?.employee_name}
                    {" "}
                    <Typography
                        component="span"
                        sx={{
                            fontSize: 10,
                            fontWeight: 500,
                            color: "#8a808e"
                        }}
                    >
                        ({employee?.employee_no})
                    </Typography>
                </Typography>


                {/* DEPARTMENT + SECTION */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.7,
                        mt: 0.25,
                        minWidth: 0
                    }}
                >

                    <Typography
                        level="body-xs"
                        sx={{
                            color: "#8a808e",
                            fontSize: 9,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}
                    >
                        {employee?.department_name || "-"}
                    </Typography>

                    <Typography
                        sx={{
                            color: "#c1b6c5",
                            fontSize: 9
                        }}
                    >
                        •
                    </Typography>

                    <Typography
                        level="body-xs"
                        sx={{
                            color: "#8a808e",
                            fontSize: 9,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}
                    >
                        {employee?.section_name || "-"}
                    </Typography>

                </Box>

            </Box>


            {/* DESIGNATION */}

            <Box
                sx={{
                    minWidth: 120,
                    maxWidth: 160,
                    textAlign: "right"
                }}
            >

                <Typography
                    level="body-xs"
                    sx={{
                        color: "#7c51a1",
                        fontSize: 9,
                        fontWeight: 600,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}
                >
                    {employee?.designation_name || "-"}
                </Typography>

            </Box>

        </Box>
    );
};

export default memo(EmployeeSuggestion);