// DischargeBillComponent2/DietBillHeader.tsx
import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import logo from '../../../../assets/images/logo.png'

const DietBillHeader = () => {
    return (
        <Box sx={{ mb: 1 }}>
            {/* Top line: logo + hospital name */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <Box>
                        <Typography
                            sx={{ fontWeight: 700, fontSize: 16, textTransform: "uppercase" }}>
                            TRAVANCORE MEDICITY
                        </Typography>
                        <Typography sx={{ fontSize: 11 }}>
                            NH Bypass, Umayanalloor, Kollam, Kerala
                        </Typography>
                        <Typography sx={{ fontSize: 11 }}>
                            Email: info@travancoremedicity.com
                        </Typography>
                    </Box>
                </Box>
                <Box
                    component="img"
                    src={logo}
                    alt="Hospital Logo"
                    sx={{
                        width: 160,
                        height: 60,
                        mr: 1,
                        // border: "1px solid #000",
                        objectFit: "contain",
                    }}
                />

            </Box>
        </Box>
    );
};

export default memo(DietBillHeader);