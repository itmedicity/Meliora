import { format } from "date-fns";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";

const ThermalBill = forwardRef(({ patient = {}, items = [], billtype }, ref) => {

    const empname = useSelector(state => {
        return state.LoginUserData.empname
    })


    const subTotal = items.reduce((sum, item) => {
        return sum + (item.qty * item.price);
    }, 0);

    const totalGST = items.reduce((sum, item) => {
        return sum + item.gst_amount;
    }, 0);

    const capitalizeFirst = (text = "") =>
        text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

    const cgst = totalGST / 2;
    const sgst = totalGST / 2;

    const grandTotal = subTotal + totalGST;

    const date = new Date();

    return (
        <div ref={ref} style={{
            width: "260px",
            fontFamily: "monospace",
            fontSize: "12px",
            padding: "6px"
        }}>

            {/* HEADER */}
            <div style={{ textAlign: "center" }}>
                <b>KORMA FnB pvt ltd</b><br />
                Travancore Medicity, Mevaram Kollam<br />
                Ph: 9048062799<br />
                GSTIN: XXXXXXXX
            </div>

            <hr />

            {/* INFO */}
            <div>Name: {patient?.fb_ptc_name || "Guest"}</div>
            <div>  Date: {format(date, "dd/MM/yyyy hh:mm a")}</div>
            <div>Dine In: {billtype ? "PATIENT" : "BYSTANDER"}</div>
            <div>Bill No: {Math.floor(Math.random() * 100000)}</div>
            <div>Cashier: {empname}</div>

            <hr />

            {/* TABLE HEADER */}
            <div style={{ display: "flex", fontWeight: "bold" }}>
                <span style={{ width: "10%" }}>No</span>
                <span style={{ width: "40%" }}>Item</span>
                <span style={{ width: "15%", textAlign: "right" }}>Qty</span>
                <span style={{ width: "15%", textAlign: "right" }}>Price</span>
                <span style={{ width: "20%", textAlign: "right" }}>Amt</span>
            </div>

            <hr />

            {/* ITEMS */}
            {items.map((item, index) => {
                const amount = item.qty * item.price;

                return (
                    <div key={index} style={{ marginBottom: 4 }}>
                        <div style={{ display: "flex" }}>
                            <span style={{ width: "10%" }}>{index + 1}</span>
                            <span style={{ width: "40%" }}> {capitalizeFirst(item.item_name)}</span>
                            <span style={{ width: "15%", textAlign: "right" }}>{item.qty}</span>
                            <span style={{ width: "15%", textAlign: "right" }}>{item.price}</span>
                            <span style={{ width: "20%", textAlign: "right" }}>{amount.toFixed(2)}</span>
                        </div>
                    </div>
                );
            })}

            <hr />

            {/* TOTALS */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Sub Total</span>
                <span>{subTotal.toFixed(2)}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Taxable Amount:</span>
                <span>{totalGST.toFixed(2)}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>CGST @2.5%</span>
                <span>{cgst.toFixed(2)}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>SGST @2.5%</span>
                <span>{sgst.toFixed(2)}</span>
            </div>

            <hr />

            {/* GRAND TOTAL */}
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                <span>Grand Total</span>
                <span>₹ {grandTotal.toFixed(2)}</span>
            </div>

            <hr />

            <div>Not Paid</div>

            <div style={{ textAlign: "center", marginTop: 6 }}>
                Thank You, Visit Again<br />
                Bill once printed can&apos;t be refunded
            </div>

        </div>
    );
});

export default ThermalBill;