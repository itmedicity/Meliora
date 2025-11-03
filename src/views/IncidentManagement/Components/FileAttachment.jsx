import React, { memo } from "react";
import { Box, Tooltip } from "@mui/joy";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const FileAttachment = ({ onClick, icon: Icon = InsertDriveFileIcon }) => {
    return (
        <Tooltip title="Incident Files" size='sm'>
            <Box
                onClick={onClick}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 0.6,
                    bgcolor: "var(--rose-pink-300)",
                    borderRadius: "sm",
                    boxShadow: "sm",
                    cursor: "pointer",
                    "&:hover": {
                        bgcolor: "var(--rose-pink-300)",
                    },
                }}
            >
                {/* File icon */}


                <Icon sx={{ fontSize: 18, color: "white" }} />

            </Box>
        </Tooltip>
    );
};

export default memo(FileAttachment);
