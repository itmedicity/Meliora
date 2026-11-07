import React, { memo } from "react";
import { Box, Button, Typography } from "@mui/joy";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useNavigate } from "react-router-dom";
import Error404 from "../assets/Svg/error_404.svg";

const ErrorFallback = ({ error, resetErrorBoundary }) => {

    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
                gap: 2,
                backgroundColor: "#fff"
            }}
        >

            {/* IMAGE */}
            <img
                src={Error404}
                alt="Error"
                style={{
                    width: 350,
                    maxWidth: "100%",
                    objectFit: "contain"
                }}
            />

            {/* TITLE */}
            <Typography
                level="h2"
                sx={{
                    fontWeight: 800,
                    textAlign: "center"
                }}
            >
                Something went wrong
            </Typography>

            {/* ERROR MESSAGE */}
            <Typography
                level="body-sm"
                sx={{
                    maxWidth: 500,
                    textAlign: "center",
                    color: "neutral.600",
                    wordBreak: "break-word"
                }}
            >
                {error?.message || "Unexpected application error"}
            </Typography>

            {/* BUTTONS */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mt: 2,
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}
            >

                {/* RETRY */}
                <Button
                    color="primary"
                    startDecorator={<RefreshRoundedIcon />}
                    onClick={resetErrorBoundary}
                >
                    Try Again
                </Button>

                {/* HOME */}
                <Button
                    variant="outlined"
                    color="neutral"
                    startDecorator={<HomeRoundedIcon />}
                    onClick={() => navigate("/Home")}
                >
                    Back To Home
                </Button>

            </Box>

        </Box>
    );
};

export default memo(ErrorFallback);