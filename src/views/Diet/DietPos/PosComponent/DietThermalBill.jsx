import React, { forwardRef, useMemo } from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const DietThermalBill = forwardRef(
    (
        {
            patient = {},
            dietBills = [],
            extraBills = [],
            bystanderBills = [],
        },
        ref
    ) => {

        const empname = useSelector(
            state => state.LoginUserData.empname
        );

        const items = useMemo(() => {
            return [
                ...dietBills,
                ...extraBills,
                ...bystanderBills,
            ];
        }, [dietBills, extraBills, bystanderBills]);

        const totals = useMemo(() => {

            return items.reduce((acc, item) => {

                const qty = Number(item.quantity ?? item.delivered_qty ?? 0);
                const rate = Number(item.unit_rate ?? 0);
                const gst = Number(item.gst_amount ?? 0);
                const discount = Number(item.discount ?? 0);
                const net = Number(item.net_amount ?? 0);

                acc.subTotal += qty * rate;
                acc.discount += discount;
                acc.gst += gst;
                acc.netAmount += net;

                return acc;

            }, {
                subTotal: 0,
                discount: 0,
                gst: 0,
                netAmount: 0,
            });

        }, [items]);

        const getTag = (type) => {
            if (type === "DIET_PACKAGE") return "[DT]";
            if (type === "EXTRA_ORDER") return "[PE]";
            return "[BS]";
        };

        const now = new Date();

        return (

            <div
                ref={ref}
                style={{
                    width: "260px",
                    fontFamily: "monospace",
                    fontSize: "12px",
                    padding: "6px",
                    fontWeight: "bold",
                    color: "#000"
                }}
            >

                {/* HEADER */}

                <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 15 }}>
                        <b>TRAVANCORE MEDICITY</b>
                    </div>

                    Diet Billing Receipt
                    <br />
                    Kollam
                </div>

                <hr />

                {/* DETAILS */}

                <div>Date : {format(now, "dd/MM/yyyy hh:mm a")}</div>
                <div>Status : PENDING</div>

                <hr />

                <div>Patient : {patient.patient_name}</div>
                <div>MRD : {patient.patient_id}</div>
                <div>IP No : {patient.admission_id}</div>
                <div>Ward : {patient.nursing_station}</div>
                <div>Room : {patient.bed_no}</div>

                <hr />

                {/* TABLE HEADER */}

                <div
                    style={{
                        display: "flex",
                        fontWeight: "bold",
                    }}
                >
                    <span style={{ width: "23%" }}>Meal</span>
                    <span style={{ width: "43%" }}>Item</span>
                    <span style={{ width: "10%", textAlign: "right" }}>Qty</span>
                    <span style={{ width: "24%", textAlign: "right" }}>Amt</span>
                </div>

                <hr />

                {/* ITEMS */}

                {items.map((item, index) => {

                    const qty = item.quantity ?? item.delivered_qty;

                    const itemName =
                        (item.item_name ||
                            (item.billing_type === "DIET_ORDER"
                                ? "Diet Package"
                                : "Food")) +
                        getTag(item.billing_type);

                    return (

                        <div key={index} style={{ marginBottom: 3 }}>

                            <div style={{ display: "flex" }}>

                                <span style={{ width: "23%" }}>
                                    {item.meal_name}
                                </span>

                                <span
                                    style={{
                                        width: "43%",
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {itemName}
                                </span>

                                <span
                                    style={{
                                        width: "10%",
                                        textAlign: "right",
                                    }}
                                >
                                    {qty}
                                </span>

                                <span
                                    style={{
                                        width: "24%",
                                        textAlign: "right",
                                    }}
                                >
                                    {Number(item.net_amount).toFixed(2)}
                                </span>

                            </div>

                        </div>

                    );

                })}

                <hr />

                {/* TOTALS */}

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Sub Total</span>
                    <span>{totals.subTotal.toFixed(2)}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Discount</span>
                    <span>{totals.discount.toFixed(2)}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>GST</span>
                    <span>{totals.gst.toFixed(2)}</span>
                </div>

                <hr />

                {/* GRAND TOTAL */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "bold",
                    }}
                >
                    <span>Grand Total</span>
                    <span>₹ {totals.netAmount.toFixed(2)}</span>
                </div>

                <hr />

                <div>Printed By : {empname}</div>
                <div>Printed On : {format(now, "dd/MM/yyyy hh:mm a")}</div>

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

export default DietThermalBill;