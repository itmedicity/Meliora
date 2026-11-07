import React, { memo, useMemo } from "react";
import {
    Box,
    Stack,
    Divider
} from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import DietTextComponent from "../../DietComponent/DietTextComponent";
import { format } from "date-fns";
import useThermalPrint from "../../DietPos/DischargeBillComponent/useThermalPrint";
import BystanderThermalBill from "../../DietPos/DischargeBillComponent/BystanderThermalBill";
import { useSelector } from "react-redux";


const BillPreview = ({
    proformaDetails = [],
    billPayType = ""
}) => {

    const { thermalBillRef, printThermalBill } = useThermalPrint();

      const empname = useSelector(state => {
        return state.LoginUserData.empname
      })

    const proforma = useMemo(
        () => proformaDetails?.[0] || {},
        [proformaDetails]
    );

    const totals = useMemo(() => {

        return (proformaDetails || []).reduce(
            (acc, item) => {

                const quantity = Number(item?.quantity || 0);
                const rate = Number(item?.rate || 0);
                const gstAmount = Number(item?.gst_amount || 0);
                const discount = Number(item?.discount || 0);

                acc.subTotal += quantity * rate;
                acc.gst += gstAmount;
                acc.discount += discount;
                acc.total += Number(item?.amount || 0);

                return acc;

            },
            {
                subTotal: 0,
                gst: 0,
                discount: 0,
                total: 0
            }
        );

    }, [proformaDetails]);

    const paymentLabel = {
        INPATIENT_CREDIT: "INPATIENT CREDIT",
        CASH: "CASH",
        BYSTANDER_CREDIT: "BYSTANDER CREDIT"
    };

    return (
        <Box>

            {/* BILL */}
            <Box
                className="thermal-bill"
                sx={{
                    width: 300,
                    mx: "auto",
                    p: 2,
                    backgroundColor: "#fff",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: 2,
                    fontFamily: "'Courier New', monospace",
                    my: 2
                }}
            >

                {/* HEADER */}

                <Stack
                    alignItems="center"
                    spacing={0.3}
                >

                    <ReceiptLongIcon
                        sx={{
                            fontSize: 25
                        }}
                    />

                    <DietTextComponent
                        value="TRAVANCORE MEDICITY"
                        size={13}
                        fontWeight={900}
                    />

                    <DietTextComponent
                        value="BYSTANDER BILL"
                        size={10}
                        fontWeight={800}
                    />

                    <DietTextComponent
                        value={
                            proforma?.service_date
                                ? format(
                                    new Date(proforma.service_date),
                                    "dd-MM-yyyy hh:mm a"
                                )
                                : "-"
                        }
                        size={8}
                        color="text.secondary"
                    />

                </Stack>

                <Divider
                    sx={{
                        my: 1,
                        borderStyle: "dashed"
                    }}
                />

                {/* PATIENT / PARTY */}

                <Stack spacing={0.4}>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >
                        <DietTextComponent
                            value="Admission"
                            size={8}
                            color="text.secondary"
                        />

                        <DietTextComponent
                            value={proforma?.admission_id || "-"}
                            size={8}
                            fontWeight={700}
                        />
                    </Stack>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >
                        <DietTextComponent
                            value="Party"
                            size={8}
                            color="text.secondary"
                        />

                        <DietTextComponent
                            value={
                                proforma?.party_name ||
                                "BYSTANDER"
                            }
                            size={8}
                            fontWeight={700}
                        />
                    </Stack>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >
                        <DietTextComponent
                            value="Bill Type"
                            size={8}
                            color="text.secondary"
                        />

                        <DietTextComponent
                            value={
                                paymentLabel?.[billPayType] || "-"
                            }
                            size={8}
                            fontWeight={800}
                        />
                    </Stack>

                </Stack>

                <Divider
                    sx={{
                        my: 1,
                        borderStyle: "dashed"
                    }}
                />

                {/* ITEMS */}

                <Stack spacing={0.7}>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >
                        <DietTextComponent
                            value="ITEM"
                            size={8}
                            fontWeight={900}
                        />

                        <DietTextComponent
                            value="AMOUNT"
                            size={8}
                            fontWeight={900}
                        />
                    </Stack>

                    <Divider
                        sx={{
                            borderStyle: "dashed"
                        }}
                    />

                    {proformaDetails.map(
                        (item, index) => {

                            const quantity =
                                Number(item?.quantity || 0);

                            const rate =
                                Number(item?.rate || 0);

                            return (
                                <Box
                                    key={
                                        item?.proforma_detail_id ||
                                        index
                                    }
                                >

                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        spacing={1}
                                    >

                                        <Box
                                            sx={{
                                                minWidth: 0,
                                                flex: 1
                                            }}
                                        >

                                            <DietTextComponent
                                                value={
                                                    item?.item_name ||
                                                    item?.description ||
                                                    "Item"
                                                }
                                                size={8}
                                                fontWeight={700}
                                            />

                                            <DietTextComponent
                                                value={
                                                    `${quantity} × ₹${rate.toFixed(2)}`
                                                }
                                                size={7}
                                                color="text.secondary"
                                            />

                                        </Box>

                                        <DietTextComponent
                                            value={`₹${rate.toFixed(2)}`}
                                            size={8}
                                            fontWeight={800}
                                        />

                                    </Stack>

                                </Box>
                            );

                        }
                    )}

                </Stack>

                <Divider
                    sx={{
                        my: 1,
                        borderStyle: "dashed"
                    }}
                />

                {/* TOTALS */}

                <Stack spacing={0.4}>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >
                        <DietTextComponent
                            value="Subtotal"
                            size={8}
                        />

                        <DietTextComponent
                            value={`₹${totals.subTotal.toFixed(2)}`}
                            size={8}
                        />
                    </Stack>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >
                        <DietTextComponent
                            value="GST"
                            size={8}
                        />

                        <DietTextComponent
                            value={`₹${totals.gst.toFixed(2)}`}
                            size={8}
                        />
                    </Stack>

                    {totals.discount > 0 && (
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                        >
                            <DietTextComponent
                                value="Discount"
                                size={8}
                            />

                            <DietTextComponent
                                value={`- ₹${totals.discount.toFixed(2)}`}
                                size={8}
                            />
                        </Stack>
                    )}

                    <Divider
                        sx={{
                            my: 0.7,
                            borderStyle: "dashed"
                        }}
                    />

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                        <DietTextComponent
                            value="TOTAL"
                            size={12}
                            fontWeight={900}
                        />

                        <DietTextComponent
                            value={`₹${totals.total.toFixed(2)}`}
                            size={15}
                            fontWeight={900}
                        />

                    </Stack>

                </Stack>

                <Divider
                    sx={{
                        my: 1,
                        borderStyle: "dashed"
                    }}
                />

                {/* FOOTER */}

                <Stack
                    alignItems="center"
                    spacing={0.3}
                >

                    <DietTextComponent
                        value="Thank you"
                        size={8}
                        fontWeight={700}
                    />

                    <DietTextComponent
                        value="This is a preview of the final bill"
                        size={7}
                        color="text.secondary"
                    />

                </Stack>

            </Box>

            {/* PRINT BUTTON */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2
                }}
            >
                <button
                    onClick={printThermalBill}
                >
                    Print Bill
                </button>
            </Box>


            <div
                style={{
                    position: "absolute",
                    left: "-9999px",
                    top: 0,
                }}
            >
                <BystanderThermalBill
                    ref={thermalBillRef}
                    proformaDetails={proformaDetails}
                    billPayType={billPayType}
                    empname={empname}
                />
            </div>

        </Box>
    );
};

export default memo(BillPreview);