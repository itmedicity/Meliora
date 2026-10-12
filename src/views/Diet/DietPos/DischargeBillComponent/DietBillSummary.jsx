import React, { memo, useMemo } from "react";
import { Box, Divider, Typography } from "@mui/material";


const SummaryRow = ({
    label,
    value,
    bold = false,
}) => (

    <Box
        sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 0.1,
        }}
    >

        <Typography
            sx={{
                fontSize: bold ? 14 : 12,
                fontWeight: bold ? 700 : 500,
                color: bold ? "#000" : "#444",
            }}
        >
            {label}
        </Typography>


        <Typography
            sx={{
                fontSize: bold ? 14 : 12,
                fontWeight: bold ? 700 : 600,
            }}
        >
            ₹ {Number(value ?? 0).toFixed(2)}
        </Typography>

    </Box>
);



const DietBillSummary = ({
    dietBills = [],
    extraBills = [],
    bystanderBills = [],
}) => {


    const summary = useMemo(() => {

        const total = (items) =>
            items.reduce(
                (sum, item) =>
                    sum + Number(item.net_amount ?? 0),
                0
            );


        const all = [
            ...dietBills,
            ...extraBills,
            ...bystanderBills,
        ];


        return {

            diet: total(dietBills),

            extra: total(extraBills),

            bystander: total(bystanderBills),

            gst: all.reduce(
                (sum, item) =>
                    sum + Number(item.gst_amount ?? 0),
                0
            ),

            discount: all.reduce(
                (sum, item) =>
                    sum + Number(item.discount ?? 0),
                0
            ),

            grandTotal: total(all),

        };


    }, [
        dietBills,
        extraBills,
        bystanderBills
    ]);



    return (

        <Box
            sx={{
                mt: 3,
            }}
        >


            <Typography
                sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    mb: 1,
                    borderBottom: "2px solid #000",
                    pb: .5,
                }}
            >
                BILL SUMMARY
            </Typography>



            <Box
                sx={{
                    width: "100%",
                    border: "1px solid #999",
                    borderRadius: 1,
                    overflow: "hidden",
                }}
            >


                {/* Charges */}

                <Box
                    sx={{
                        px: 2,
                        py: 1,
                        bgcolor: "#f3f3f3",
                    }}
                >

                    <Typography
                        fontSize={12}
                        fontWeight={700}
                    >
                        CHARGES BREAKDOWN
                    </Typography>

                </Box>



                <Box
                    sx={{
                        px: 2,
                        py: 1,
                    }}
                >

                    <SummaryRow
                        label="Diet Charges"
                        value={summary.diet}
                    />


                    <SummaryRow
                        label="Extra Order Charges"
                        value={summary.extra}
                    />


                    <SummaryRow
                        label="Bystander Charges"
                        value={summary.bystander}
                    />

                </Box>



                <Divider />



                {/* Adjustment */}

                <Box
                    sx={{
                        px: 2,
                        py: 1,
                    }}
                >

                    <SummaryRow
                        label="GST"
                        value={summary.gst}
                    />


                    <SummaryRow
                        label="Discount"
                        value={summary.discount}
                    />

                </Box>



                <Divider />



                {/* Total */}

                <Box
                    sx={{
                        px: 2,
                        py: 1.5,
                        bgcolor: "#fafafa",
                    }}
                >

                    <SummaryRow
                        label="TOTAL PAYABLE"
                        value={summary.grandTotal}
                        bold
                    />

                </Box>


            </Box>


        </Box>

    );

};


export default memo(DietBillSummary);