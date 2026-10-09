import React, { forwardRef, useMemo } from "react";
import { format } from "date-fns";

const BystanderThermalBill = forwardRef(
    (
        {
            proformaDetails = [],
            billPayType = "",
            empname = "",
        },
        ref
    ) => {

        const proforma = useMemo(
            () => proformaDetails?.[0] || {},
            [proformaDetails]
        );

        const totals = useMemo(() => {

            return proformaDetails.reduce(
                (acc, item) => {

                    const qty = Number(item?.quantity || 0);
                    const rate = Number(item?.rate || 0);
                    const gst = Number(item?.gst_amount || 0);
                    const discount = Number(item?.discount || 0);
                    const amount = Number(item?.amount || 0);

                    acc.subTotal += qty * rate;
                    acc.discount += discount;
                    acc.gst += gst;
                    acc.netAmount += amount;

                    return acc;

                },
                {
                    subTotal: 0,
                    discount: 0,
                    gst: 0,
                    netAmount: 0,
                }
            );

        }, [proformaDetails]);

        const paymentLabel = {
            INPATIENT_CREDIT: "INPATIENT CREDIT",
            CASH: "CASH",
            BYSTANDER_CREDIT: "BYSTANDER CREDIT",
        };

        const billDate = proforma?.service_date
            ? new Date(proforma.service_date)
            : new Date();

        return (

            <div
                ref={ref}
                style={{
                    width: "260px",
                    fontFamily: "monospace",
                    fontSize: "12px",
                    padding: "6px",
                    fontWeight: "bold",
                    color: "#000",
                }}
            >

                {/* HEADER */}

                <div style={{ textAlign: "center" }}>

                    <div style={{ fontSize: 15 }}>
                        <b>TRAVANCORE MEDICITY</b>
                    </div>

                    Bystander Billing Receipt
                    <br />
                    Kollam

                </div>

                <hr />

                {/* BILL DETAILS */}

                <div>
                    Admission :{" "}
                    {proforma?.admission_id || "-"}
                </div>

                <div>
                    Party :{" "}
                    {proforma?.party_name || "BYSTANDER"}
                </div>

                <div>
                    Date :{" "}
                    {format(
                        billDate,
                        "dd/MM/yyyy hh:mm a"
                    )}
                </div>

                <div>
                    Payment :{" "}
                    {paymentLabel?.[billPayType] || "-"}
                </div>


                <hr />
                {/* TABLE HEADER */}

                <div
                    style={{
                        display: "flex",
                        fontWeight: "bold",
                    }}
                >

                    <span style={{ width: "46%" }}>
                        Item
                    </span>

                    <span
                        style={{
                            width: "20%",
                            textAlign: "right",
                        }}
                    >
                        Qty
                    </span>

                    <span
                        style={{
                            width: "34%",
                            textAlign: "right",
                        }}
                    >
                        Amt
                    </span>

                </div>

                <hr />

                {/* ITEMS */}

                {proformaDetails.map(
                    (item, index) => {

                        const qty =
                            Number(item?.quantity || 0);

                        const rate =
                            Number(item?.rate || 0);

                        // const amount =
                        //     Number(item?.amount || 0);

                        const itemName =
                            item?.item_name ||
                            item?.description ||
                            "Item";

                        return (

                            <div
                                key={
                                    item?.proforma_detail_id ||
                                    index
                                }
                                style={{
                                    marginBottom: 3,
                                }}
                            >

                                {/* ITEM NAME */}

                                <div
                                    style={{
                                        display: "flex",
                                    }}
                                >

                                    <span
                                        style={{
                                            width: "46%",
                                            wordBreak:
                                                "break-word",
                                        }}
                                    >
                                        {itemName}
                                    </span>

                                    <span
                                        style={{
                                            width: "20%",
                                            textAlign:
                                                "right",
                                        }}
                                    >
                                        {qty}
                                    </span>

                                    <span
                                        style={{
                                            width: "34%",
                                            textAlign:
                                                "right",
                                        }}
                                    >
                                        {rate.toFixed(2)}
                                    </span>

                                </div>

                                {/* RATE */}

                                <div
                                    style={{
                                        fontSize: "10px",
                                        fontWeight: "normal",
                                    }}
                                >
                                    @ ₹{rate.toFixed(2)}
                                </div>

                            </div>

                        );

                    }
                )}

                <hr />

                {/* TOTALS */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span>Sub Total</span>

                    <span>
                        {totals.subTotal.toFixed(2)}
                    </span>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span>Discount</span>

                    <span>
                        {totals.discount.toFixed(2)}
                    </span>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span>GST</span>

                    <span>
                        {totals.gst.toFixed(2)}
                    </span>
                </div>

                <hr />

                {/* GRAND TOTAL */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "bold",
                        fontSize: "13px",
                    }}
                >

                    <span>
                        Grand Total
                    </span>

                    <span>
                        ₹ {totals.netAmount.toFixed(2)}
                    </span>

                </div>

                <hr />

                {/* FOOTER DETAILS */}

                <div>
                    Printed By : {empname || "-"}
                </div>

                <div>
                    Printed On :{" "}
                    {format(
                        new Date(),
                        "dd/MM/yyyy hh:mm a"
                    )}
                </div>

                <hr />

                <div style={{ textAlign: "center" }}>

                    Thank You
                    <br />

                    Diet & Nutrition Department

                </div>

            </div>

        );
    }
);

export default BystanderThermalBill;