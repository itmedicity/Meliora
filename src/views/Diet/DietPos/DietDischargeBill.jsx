import React, { memo } from "react";
import { Box, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import PrintIcon from "@mui/icons-material/Print";

import DietBillHeader from "./DischargeBillComponent/DietBillHeader";
import DietBillPatientInfo from "./DischargeBillComponent/DietBillPatientInfo";
import DietBillFooter from "./DischargeBillComponent/DietBillFooter";
import DietBillBody from "./DischargeBillComponent/DietBillBody";


const DietDischargeBill = () => {

    const { state } = useLocation();

    const patient = state?.patient ?? {};
    const printType = state?.printType ?? "DETAIL";

    const DietBills = state?.dietBills ?? [];
    const ExtraBills = state?.extraBills ?? [];
    const BystanderBills = state?.bystanderBills ?? [];


    const grandTotal = [
        ...DietBills,
        ...ExtraBills,
        ...BystanderBills,
    ].reduce(
        (sum, item) =>
            sum + Number(item.net_amount ?? 0),
        0
    );

    const handlePrint = () => {
        window.print();
    };


    return (

        <>
            <style>
                {`

                @page {
                    size: A4 portrait;
                    margin: 10mm;
                }


                @media print {

                    body {
                        margin:0;
                        padding:0;
                        background:white;
                    }


                    body * {
                        visibility:hidden;
                    }


                    .bill-print-area,
                    .bill-print-area * {
                        visibility:visible;
                    }


                    .bill-print-area {

                        position:absolute;

                        left:0;
                        top:0;

                        width:190mm;
                        min-height:277mm;

                        padding:10mm;

                        box-sizing:border-box;

                        background:white;

                    }


                    .no-print {
                        display:none !important;
                    }

                }


                `}
            </style>


            {/* PRINT BUTTON */}

            <Box
                className="no-print"
                sx={{
                    position:"fixed",
                    right:20,
                    top:20,
                    zIndex:999,
                }}
            >

                <Button
                    variant="contained"
                    startIcon={<PrintIcon />}
                    onClick={handlePrint}
                >
                    Print Bill
                </Button>

            </Box>



            {/* A4 PAPER */}

            <Box

                className="bill-print-area"

                sx={{

                    width:"210mm",

                    minHeight:"297mm",

                    bgcolor:"#fff",

                    color:"#000",

                    p:"10mm",

                    mx:"auto",

                    boxSizing:"border-box",

                    fontFamily:
                    "Arial, Helvetica, sans-serif",


                    boxShadow:
                    "0 0 8px rgba(0,0,0,0.15)",


                    "@media print":{

                        boxShadow:"none",

                        margin:0,

                    }

                }}

            >


                <DietBillHeader />



                <DietBillPatientInfo

                    patient={patient}

                />



                <DietBillBody

                    printType={printType}

                    dietBills={DietBills}

                    extraBills={ExtraBills}

                    bystanderBills={BystanderBills}

                />



                <DietBillFooter

                    grandTotal={grandTotal}

                />


            </Box>


        </>

    );

};


export default memo(DietDischargeBill);