import React, { memo } from "react";
import {
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/joy";
import Grid from "@mui/material/Grid";
import { getAllIcuBeds } from "./CommonCode/Common";
import { useQuery } from "@tanstack/react-query";
import IcuSkeleton from "./Component/IcuSkeleton";

const IcuDashboard = () => {



    
    const {
        data: getallicubeds,
        isLoading: icubedLoading,
    } = useQuery({
        queryKey: ["getallicubed"],
        queryFn: () => getAllIcuBeds(),
        staleTime: 900000, // 15 minutes
        refetchInterval: 900000, // 15 minutes
        refetchOnWindowFocus: true, // refetch when window regains focus
        refetchIntervalInBackground: false, // only refetch when focused
    });


    return (
        <Grid container spacing={2} p={2}>
            {icubedLoading && <IcuSkeleton />}
            {getallicubeds &&
                getallicubeds?.map((icu, index) => {
                    return (
                        <Grid item key={index} xs={12} sm={6} md={6} lg={3}>
                            <Card
                                variant="outlined"
                                sx={{
                                    borderRadius: "lg",
                                    boxShadow: "0 0 8px var(--royal-purple-200)",
                                    transition: "0.3s",
                                    "&:hover": {
                                        boxShadow: "0 0 12px var(--royal-purple-200)",
                                    },
                                    p: 1,
                                    cursor: 'pointer',
                                    borderColor: "var(--royal-purple-200)",
                                }}
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        {/* ICU Name */}
                                        <Typography sx={{
                                            fontSize: 24,
                                            fontWeight: 600,
                                            // textAlign: 'center'
                                        }}>
                                            {icu?.NS}
                                        </Typography>

                                        {/* Total Beds */}
                                        <Box
                                            fontWeight="lg"
                                            sx={{
                                                mb: 1,
                                                fontSize: 24,
                                                textAlign: 'center',
                                                width: 60,
                                                height: 40,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '50%',
                                                color: "var(--royal-purple-400)"

                                            }}>
                                            {icu?.TOT}
                                            <Typography sx={{ color: "var(--royal-purple-400)", fontSize: 10, fontWeight: 600 }}>Total Beds</Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            mt: 1,
                                            gap: 0.5
                                        }}>
                                        {/* Available Beds */}
                                        <Box
                                            sx={{
                                                px: 2,
                                                py: 1,
                                                borderRadius: "md",
                                                bgcolor: "var(--royal-purple-300)",
                                                textAlign: "center",
                                                flex: 1,
                                                mr: 1
                                            }}
                                        >
                                            <Typography sx={{ color: 'white', fontSize: 28, fontWeight: 600 }}>
                                                {icu?.AVAIL}
                                            </Typography>
                                            <Typography
                                                level="body-sm"
                                                sx={{ color: 'white' }}>Available Bed</Typography>
                                        </Box>

                                        {/* Occupied Beds */}
                                        <Box
                                            sx={{
                                                px: 2,
                                                py: 1,
                                                borderRadius: "md",
                                                bgcolor: " #e8e1e5ff",
                                                textAlign: "center",
                                                flex: 1,
                                                ml: 1
                                            }}>
                                            <Typography sx={{
                                                color: 'black',
                                                fontSize: 28, fontWeight: 600
                                            }}>
                                                {(icu?.OCCUP + icu?.DIS)}
                                            </Typography>
                                            <Typography level="body-sm" sx={{ color: 'black' }}>Not Available</Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
        </Grid>
    );
};

export default memo(IcuDashboard);
