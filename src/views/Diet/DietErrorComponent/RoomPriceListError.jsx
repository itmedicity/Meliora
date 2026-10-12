import React from "react";
import { Box, Button, Typography } from "@mui/joy";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const RoomPriceListError = ({ message = "Failed to load data", submessage = "It will Take time", onRetry }) => {
    return (
        <Box
            sx={{
                width: "100%",
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                // gap: 1.5,
                border: "1px dashed #ccc",
                borderRadius: 6,
                backgroundColor: "#fafafa"
            }}
        >
            <ErrorOutlineIcon color="danger" sx={{ mb: 1 }} />

            <Typography level="body-sm" color="danger">
                {message}
            </Typography>
            <Typography level="body-xs" color="danger">
                {submessage}
            </Typography>

            {onRetry && (
                <Button size="sm" variant="outlined" color="danger" onClick={onRetry}>
                    Retry
                </Button>
            )}
        </Box>
    );
};

export default RoomPriceListError;