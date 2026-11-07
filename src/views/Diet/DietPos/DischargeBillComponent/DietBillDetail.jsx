import React, { memo } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { format } from "date-fns";


const DetailRow = ({ item }) => {

    const qty = item.quantity ?? item.delivered_qty ?? 0;

    return (
        <Box
            sx={{
                py: 0.8,
            }}
        >

            <Typography
                sx={{
                    fontSize: 12,
                    fontWeight: 700,
                }}
            >
                {item.item_name || "Diet Package"}
            </Typography>


            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 0.3,
                }}
            >

                <Typography fontSize={11}>
                    Date :{" "}
                    {
                        item?.created_at
                            ? format(
                                new Date(item?.created_at),
                                "dd-MMM-yyyy"
                            )
                            : "-"
                    }
                </Typography>


                <Typography fontSize={11}>
                    Meal : {item.meal_name || "-"}
                </Typography>

            </Box>


            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 0.2,
                }}
            >

                <Typography fontSize={11}>
                    Qty : {qty}
                </Typography>


                <Typography fontSize={11}>
                    Rate : ₹{" "}
                    {Number(item.unit_rate ?? 0).toFixed(2)}
                </Typography>


                <Typography fontSize={11}>
                    GST : ₹{" "}
                    {Number(item.gst_amount ?? 0).toFixed(2)}
                </Typography>


                <Typography
                    fontSize={11}
                    fontWeight={700}
                >
                    Amount : ₹{" "}
                    {Number(item.net_amount ?? 0).toFixed(2)}
                </Typography>

            </Box>

        </Box>
    );
};



const Section = ({ title, items = [] }) => {


    if (!items.length) return null;


    const groupedMeals = items.reduce((acc, item) => {

        const meal = item.meal_name || "Others";

        if (!acc[meal]) {
            acc[meal] = [];
        }

        acc[meal].push(item);

        return acc;

    }, {});



    const total = items.reduce(
        (sum, item) =>
            sum + Number(item.net_amount ?? 0),
        0
    );


    return (

        <Box
            sx={{
                mb: 3,
            }}
        >

            <Typography
                sx={{
                    fontWeight: 700,
                    fontSize: 14,
                    bgcolor: "#efefef",
                    px: 1,
                    py: 0.6,
                    borderLeft: "4px solid #1976d2",
                }}
            >
                {title}
            </Typography>



            {
                Object.entries(groupedMeals)
                    .map(([meal, rows]) => (

                        <Box
                            key={meal}
                            sx={{
                                mt: 1.5,
                            }}
                        >

                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 12,
                                    color: "#444",
                                    mb: 0.5,
                                }}
                            >
                                {meal}
                            </Typography>


                            {
                                rows.map((item, index) => (

                                    <Box key={index}>

                                        <DetailRow
                                            item={item}
                                        />


                                        {
                                            index !== rows.length - 1 &&
                                            <Divider
                                                sx={{
                                                    my: 0.5,
                                                }}
                                            />
                                        }

                                    </Box>

                                ))
                            }


                        </Box>

                    ))
            }



            <Divider
                sx={{
                    mt: 2,
                }}
            />


            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 1,
                }}
            >

                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: 13,
                    }}
                >
                    {title} Total : ₹ {total.toFixed(2)}
                </Typography>

            </Box>


        </Box>

    );

};



const DietBillDetail = ({
    dietBills = [],
    extraBills = [],
    bystanderBills = [],
}) => {


    return (

        <Box
            sx={{
                mt: 2,
            }}
        >

            <Typography
                sx={{
                    fontWeight: 700,
                    fontSize: 16,
                    mb: 2,
                    borderBottom: "2px solid #000",
                    pb: 0.5,
                }}
            >
                BILL DETAILS
            </Typography>



            <Section
                title="DIET CHARGES"
                items={dietBills}
            />


            <Section
                title="PATIENT EXTRA ORDERS"
                items={extraBills}
            />


            <Section
                title="BYSTANDER ORDERS"
                items={bystanderBills}
            />


        </Box>

    );

};


export default memo(DietBillDetail);