import React, { memo, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";

const headerStyle = {
    fontSize: 11,
    fontWeight: 800,
    py: 0.8,
};

const cellStyle = {
    fontSize: 10,
    py: 0.8,
};

const DietBillItemsTable = ({
    dietBills = [],
    extraBills = [],
    bystanderBills = [],
}) => {


    console.log({
        dietBills,
        extraBills,
        bystanderBills
    });


    const items = useMemo(() => {

        const all = [

            ...dietBills.map(item => ({
                ...item,
                orderedFor: "Patient",
            })),

            ...extraBills.map(item => ({
                ...item,
                orderedFor: "Extra Order ",
            })),

            ...bystanderBills.map(item => ({
                ...item,
                orderedFor: "Bystander",
            })),

        ];

        return all.sort(
            (a, b) =>
                new Date(
                    a.bill_date || a.delivery_date || a.delivered_time
                ) -
                new Date(
                    b.bill_date || b.delivery_date || b.delivered_time
                )
        );

    }, [dietBills, extraBills, bystanderBills]);




    return (

        <Box sx={{ mt: 2 }}>

            <Typography
                sx={{
                    fontWeight: 700,
                    fontSize: 15,
                    mb: 1,
                }}
            >
                BILL DETAILS
            </Typography>

            {/* Header */}

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns:
                        "2.5fr 1.4fr 1.3fr 2fr .7fr .8fr 1fr",
                    columnGap: 1,
                    
                }}
            >

                <Typography sx={headerStyle}>
                    ITEM NAME
                </Typography>

                <Typography sx={headerStyle}>
                    ORDERED FOR
                </Typography>

                <Typography sx={headerStyle}>
                    MEAL
                </Typography>

                <Typography sx={headerStyle}>
                    DATE / TIME
                </Typography>

                <Typography
                    sx={{
                        ...headerStyle,
                        textAlign: "center",
                    }}
                >
                    QTY
                </Typography>

                <Typography
                    sx={{
                        ...headerStyle,
                        textAlign: "right",
                    }}
                >
                    GST
                </Typography>

                <Typography
                    sx={{
                        ...headerStyle,
                        textAlign: "right",
                    }}
                >
                    AMOUNT
                </Typography>

            </Box>

            {/* Rows */}

            {

                items.map((item, index) => (

                    <Box
                        key={index}
                        sx={{
                            display: "grid",
                            gridTemplateColumns:
                                "2.5fr 1.4fr 1.3fr 2fr .7fr .8fr 1fr",
                            columnGap: 1,
                            borderBottom: "1px dashed #ddd",
                            alignItems: "center",
                        }}
                    >

                        <Typography sx={cellStyle}>
                            {item.item_name || "Diet Package"}
                        </Typography>

                        <Typography sx={cellStyle}>
                            {item.orderedFor}
                        </Typography>

                        <Typography sx={cellStyle}>
                            {item.meal_name || "-"}
                        </Typography>

                        <Typography sx={cellStyle}>
                            {item.delivered_time
                                ? format(
                                    new Date(item.delivered_time),
                                    "dd-MMM-yyyy hh:mm a"
                                )
                                : item.bill_date
                                    ? format(
                                        new Date(item.bill_date),
                                        "dd-MMM-yyyy"
                                    )
                                    : item.created_at
                                        ? format(
                                            new Date(item.created_at),
                                            "dd-MMM-yyyy"
                                        ) : "-"}
                        </Typography>

                        <Typography
                            sx={{
                                ...cellStyle,
                                textAlign: "center",
                            }}
                        >
                            {item.quantity ?? item.delivered_qty ?? 1}
                        </Typography>

                        <Typography
                            sx={{
                                ...cellStyle,
                                textAlign: "right",
                            }}
                        >
                            {Number(
                                item.gst_amount ?? 0
                            ).toFixed(2)}
                        </Typography>

                        <Typography
                            sx={{
                                ...cellStyle,
                                textAlign: "right",
                                fontWeight: 700,
                            }}
                        >
                            ₹ {Number(
                                item.net_amount ?? 0
                            ).toFixed(2)}
                        </Typography>

                    </Box>

                ))

            }

            {/* Grand Total */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 1.5,
                }}
            >

                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: 12,
                    }}
                >
                    Grand Total : ₹{" "}
                    {items
                        .reduce(
                            (sum, item) =>
                                sum + Number(item.net_amount ?? 0),
                            0
                        )
                        .toFixed(2)}
                </Typography>

            </Box>

        </Box>

    );

};

export default memo(DietBillItemsTable);