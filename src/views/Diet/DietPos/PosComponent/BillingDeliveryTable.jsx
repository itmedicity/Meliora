import React, { useMemo } from "react";
import { Box, Paper } from "@mui/material";
import { format } from "date-fns";
import DietTextComponent from "../../DietComponent/DietTextComponent";

const BillingDeliveryTable = ({ details = [] }) => {

    const groupedData = useMemo(() => {

        return details.reduce((acc, item) => {

            const dateKey = format(
                new Date(item.delivered_time),
                "yyyy-MM-dd"
            );

            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }

            acc[dateKey].push(item);

            return acc;

        }, {});

    }, [details]);

    return (

        <Paper
            sx={{
                p: 2,
                borderRadius: 2
            }}
        >

            <DietTextComponent
                value="Patient Diet Details"
                size={18}
                weight={700}
            />

            <Box sx={{ mt: 2 }}>

                {

                    Object.entries(groupedData).map(([date, rows]) => (

                        <Box
                            key={date}
                            sx={{
                                mb: 3,
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 1,
                                overflow: "hidden"
                            }}
                        >

                            {/* Date Header */}

                            <Box
                                sx={{
                                    px: 2,
                                    py: 1,
                                    bgcolor: "primary.main",
                                    color: "white"
                                }}
                            >

                                <DietTextComponent
                                    value={format(
                                        new Date(date),
                                        "dd MMM yyyy (EEEE)"
                                    )}
                                    weight={700}
                                    color="white"
                                />

                            </Box>

                            {/* Column Header */}

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "1.2fr 2fr .7fr 1fr 1fr 1.3fr",
                                    px: 2,
                                    py: 1,
                                    bgcolor: "grey.100",
                                    borderBottom: "1px solid",
                                    borderColor: "divider"
                                }}
                            >

                                <DietTextComponent value="Meal" weight={700} />
                                <DietTextComponent value="Item" weight={700} />
                                <DietTextComponent value="Qty" weight={700} />
                                <DietTextComponent value="Rate" weight={700} />
                                <DietTextComponent value="Amount" weight={700} />
                                <DietTextComponent value="Time" weight={700} />

                            </Box>

                            {

                                rows.map((item) => (

                                    <Box
                                        key={item.delivery_id}
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "1.2fr 2fr .7fr 1fr 1fr 1.3fr",
                                            px: 2,
                                            py: 1.2,
                                            borderBottom: "1px solid",
                                            borderColor: "divider",
                                            "&:last-child": {
                                                borderBottom: "none"
                                            }
                                        }}
                                    >

                                        <DietTextComponent
                                            value={item.meal_name}
                                        />

                                        <DietTextComponent
                                            value={item.item_name}
                                        />

                                        <DietTextComponent
                                            value={item.delivered_qty}
                                        />

                                        <DietTextComponent
                                            value={`₹ ${Number(item.unit_rate).toFixed(2)}`}
                                        />

                                        <DietTextComponent
                                            value={`₹ ${Number(item.net_amount).toFixed(2)}`}
                                            weight={600}
                                        />

                                        <DietTextComponent
                                            value={format(
                                                new Date(item.delivered_time),
                                                "hh:mm a"
                                            )}
                                        />

                                    </Box>

                                ))

                            }

                        </Box>

                    ))

                }

            </Box>

        </Paper>

    );

};

export default BillingDeliveryTable;