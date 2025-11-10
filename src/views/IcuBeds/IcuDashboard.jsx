import React, { memo } from "react";
import { Card, CardContent, Typography, Box } from "@mui/joy";
import Grid from "@mui/material/Grid";
import IcuSkeleton from "./Component/IcuSkeleton";
import BedFetchError from "./Component/BedFetchError";
import { useQuery } from "@tanstack/react-query";
import { getElliderAllIcuBeds } from "./CommonCode/Common";
import BedStatCard from "./Component/BedStatCard";

const IcuDashboard = () => {

    // Api for getting all icu Bed From Ellider
    const {
        data: getallicubeds,
        isLoading: icubedLoading,
        isError: bedFetchingerror,
        refetch: RefetchAllIcuBeds
    } = useQuery({
        queryKey: ["geticubed"],
        queryFn: getElliderAllIcuBeds,
        staleTime: 900000, // 15 minutes
        refetchInterval: 900000, // 15 minutes
        refetchOnWindowFocus: true, // refetch when window regains focus
        refetchIntervalInBackground: false, // only refetch when focused
        keepPreviousData: true //smoother refreshes without page flicker,
    });

    // Custome loading 
    if (icubedLoading) return <IcuSkeleton />;

    //  Render error page if fetch fails
    if (bedFetchingerror) return <BedFetchError onRetry={RefetchAllIcuBeds} />;

    //  Card components for ICU beds
    const cardComponent =
        Array.isArray(getallicubeds) && getallicubeds?.length > 0 ? (
            getallicubeds?.map((icu, index) => {
                const totalOccupied = Number(icu?.OCCUP) + Number(icu?.DIS);
                return (
                    <Grid item key={`icubed-${index}`} xs={12} sm={6} md={6} lg={3}>
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
                                cursor: "pointer",
                                borderColor: "var(--royal-purple-200)",
                            }}>
                            <CardContent>
                                {/*  Header Section (ICU Name + Total Beds) */}
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography sx={{ fontSize: 24, fontWeight: 600 }}> {icu?.NS}</Typography>
                                    <Box fontWeight="lg"
                                        sx={{
                                            mb: 1,
                                            fontSize: 24,
                                            textAlign: "center",
                                            width: 60,
                                            height: 40,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "50%",
                                            color: "var(--royal-purple-400)"
                                        }}>
                                        {icu?.TOT}
                                        <Typography sx={{ color: "var(--royal-purple-400)", fontSize: 10, fontWeight: 600 }}> Total Beds</Typography>
                                    </Box>
                                </Box>

                                {/*  Bed Details Section */}
                                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, gap: 0.5 }}>
                                    {/* Available Beds */}
                                    <BedStatCard
                                        value={icu?.AVAIL}
                                        label="Available Bed"
                                        bgColor="var(--royal-purple-300)"
                                        textColor="white"
                                        margin={{ mr: 1 }}
                                    />
                                    {/* Occupied Beds (OCCUP + DIS) */}
                                    <BedStatCard
                                        value={totalOccupied}
                                        label="Occupied Bed"
                                        bgColor="#e8e1e5ff"
                                        textColor="black"
                                        margin={{ ml: 1 }}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })
        ) : (
            <IcuSkeleton />
        );

    return (
        <Grid container spacing={2} p={2}>
            {cardComponent}
        </Grid>
    );
};

export default memo(IcuDashboard);
