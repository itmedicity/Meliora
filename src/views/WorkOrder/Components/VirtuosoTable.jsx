import { Box, IconButton } from '@mui/joy';
import React from 'react'
import { Virtuoso } from 'react-virtuoso';
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";

const VirtuosoTable = ({ data, columns, actionKey, onAction }) => {
    return (
        <Virtuoso
            style={{ height: "75vh", width: "100%" }}
            data={data}
            itemContent={(index, row) => (
                <Box
                    // sx={{
                    //     display: "flex",
                    //     minHeight: 42,
                    //     borderBottom: "1px solid var(--joy-palette-divider)",
                    //     "&:hover": {
                    //         backgroundColor: "var(--joy-palette-neutral-100)",
                    //     },
                    // }}
                    // sx={{
                    //     display: "flex",
                    //     alignItems: "center",
                    //     borderBottom: "1px solid #EAEAEA",
                    //     backgroundColor: row?.action_disabled ? "#FDEAEA" : "#FFF",
                    //     opacity: row?.action_disabled ? 0.7 : 1,
                    //     cursor: row?.action_disabled ? "not-allowed" : "pointer",
                    //     minHeight: 42,
                    //     "&:hover": {
                    //         backgroundColor: row?.action_disabled
                    //             ? "#f3fdea"
                    //             : "#F7F7F7",
                    //     },
                    // }}

                    sx={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #EAEAEA",
                        backgroundColor: row?.action_disabled ? "#E8F5E9" : "#FFF", // light green
                        opacity: row?.action_disabled ? 0.9 : 1,
                        cursor: row?.action_disabled ? "not-allowed" : "pointer",
                        minHeight: 42,
                        transition: "background-color 0.2s ease",
                        "&:hover": {
                            backgroundColor: "#cdd0c2", // hover always white
                        },
                    }}
                >
                    {columns?.map((col) => {
                        const value =
                            col.key === "sl_no" ? index + 1 : row[col.key];

                        return (
                            <Box
                                key={col.key}
                                sx={{
                                    flex: 1,
                                    px: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: col.align,
                                    fontSize: 14,
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {col.key === actionKey ? (
                                    <IconButton
                                        size="sm"
                                        onClick={() => onAction(row)}
                                    >
                                        <LaunchOutlinedIcon
                                            fontSize="small"
                                            sx={{ color: "#7F55B1" }}
                                        />
                                    </IconButton>
                                ) : (
                                    value ?? "-"
                                )}
                            </Box>
                        );
                    })}
                </Box>
            )}
        />
    )
}

export default VirtuosoTable