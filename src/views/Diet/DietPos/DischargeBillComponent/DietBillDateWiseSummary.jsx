import React, { memo, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";


const header = {
    fontSize: 11,
    fontWeight: 700,
};


const cell = {
    fontSize: 11,
};


const DietBillDateWiseSummary = ({
    dietBills = [],
    extraBills = [],
    bystanderBills = [],
}) => {


    const summary = useMemo(() => {


        const map = {};


        const addData = (items, type) => {

            items.forEach(item => {

                const date =
                    item.bill_date ||
                    item.delivered_time ||
                    item.created_at;


                const key = format(
                    new Date(date),
                    "dd-MMM-yyyy"
                );


                if (!map[key]) {

                    map[key] = {
                        date: key,
                        diet: 0,
                        extra: 0,
                        bystander: 0,
                        gst: 0,
                        total: 0,
                    };

                }


                const amount =
                    Number(item.net_amount ?? 0);


                const gst =
                    Number(item.gst_amount ?? 0);



                if(type === "DIET"){
                    map[key].diet += amount;
                }


                if(type === "EXTRA"){
                    map[key].extra += amount;
                }


                if(type === "BYSTANDER"){
                    map[key].bystander += amount;
                }


                map[key].gst += gst;

                map[key].total += amount;


            });

        };


        addData(dietBills,"DIET");
        addData(extraBills,"EXTRA");
        addData(bystanderBills,"BYSTANDER");



        return Object.values(map)
            .sort(
                (a,b)=>
                    new Date(a.date)-new Date(b.date)
            );


    },[
        dietBills,
        extraBills,
        bystanderBills
    ]);




    const total = useMemo(()=>{

        return summary.reduce(
            (acc,row)=>({

                diet:
                    acc.diet + row.diet,

                extra:
                    acc.extra + row.extra,

                bystander:
                    acc.bystander + row.bystander,

                gst:
                    acc.gst + row.gst,

                total:
                    acc.total + row.total,

            }),
            {
                diet:0,
                extra:0,
                bystander:0,
                gst:0,
                total:0
            }
        );


    },[summary]);




    return (

        <Box sx={{mt:3}}>


            <Typography
                sx={{
                    fontSize:16,
                    fontWeight:700,
                    mb:2,
                    borderBottom:"1px solid #676666",
                    pb:.5
                }}
            >
                DATE WISE BILL SUMMARY
            </Typography>



            {/* Header */}

            <Box
                sx={{
                    display:"grid",
                    gridTemplateColumns:
                    "1.5fr 1fr 1fr 1fr 1fr 1fr",
                    // borderBottom:"1px solid #000",
                    pb:1
                }}
            >

                <Typography sx={header}>
                    DATE
                </Typography>

                <Typography sx={header}>
                    DIET
                </Typography>

                <Typography sx={header}>
                    EXTRA
                </Typography>

                <Typography sx={header}>
                    BYSTANDER
                </Typography>

                <Typography sx={header}>
                    GST
                </Typography>

                <Typography sx={header}>
                    TOTAL
                </Typography>

            </Box>




            {
                summary.map((row,index)=>(

                    <Box
                        key={index}
                        sx={{
                            display:"grid",
                            gridTemplateColumns:
                            "1.5fr 1fr 1fr 1fr 1fr 1fr",
                            py:1,
                            borderBottom:
                            "1px dashed #ccc"
                        }}
                    >

                        <Typography sx={cell}>
                            {row.date}
                        </Typography>


                        <Typography sx={cell}>
                            ₹ {row.diet.toFixed(2)}
                        </Typography>


                        <Typography sx={cell}>
                            ₹ {row.extra.toFixed(2)}
                        </Typography>


                        <Typography sx={cell}>
                            ₹ {row.bystander.toFixed(2)}
                        </Typography>


                        <Typography sx={cell}>
                            ₹ {row.gst.toFixed(2)}
                        </Typography>


                        <Typography
                            sx={{
                                ...cell,
                                fontWeight:700
                            }}
                        >
                            ₹ {row.total.toFixed(2)}
                        </Typography>


                    </Box>

                ))
            }





            {/* Grand Total */}


            <Box
    sx={{
        display: "flex",
        justifyContent: "flex-end",
        mt: 2,
        pt: 1,
        // borderTop: "2px solid #000",
    }}
>
    <Typography
        sx={{
            fontSize: 13,
            fontWeight: 700,
        }}
    >
        GRAND TOTAL : ₹ {total.total.toFixed(2)}
    </Typography>
</Box>


        </Box>

    );

};


export default memo(DietBillDateWiseSummary);