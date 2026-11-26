import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./BarcodePrint.css";

const BarcodePrint = ({ printData, onClose }) => {


    useEffect(() => {
        if (!printData) return;

        const printTimer = window.setTimeout(() => {
            window.print();
        }, 500);

        const handleAfterPrint = () => {
            onClose?.();
        };

        window.addEventListener("afterprint", handleAfterPrint);

        return () => {
            window.clearTimeout(printTimer);
            window.removeEventListener("afterprint", handleAfterPrint);
        };
    }, [printData, onClose]);

    if (!printData) return null;


    const { orderId, barcodePrintDetails = [] } = printData;
    // const totalPackets = barcodePrintDetails.length;

    const labels = barcodePrintDetails.map((item, index) => ({
        packetUid: item?.packetUid || item?.barcodeNumber || "",
        orderId: item?.orderId || orderId || "",
        packetNo: item?.packetNo || index + 1,
        bedNo: item?.bedNo || "",
        nursingStation: item?.nursingStation || "",
        patientName: item?.patientName || "",
        orderItem: item?.items || "",
        mealType: item?.mealType || "",
        partyName: item?.partyName || ""
    }));

    return createPortal(
        <div className="barcode-print-container">
            {labels?.map((label, index) => {
                const isPateint = label?.partyName?.trim() === "PATIENT";
                const PartyType = isPateint ? "𝑷𝑨𝑻" : "𝑩𝒀𝑺"
                return (
                    <section
                        className="barcode-label"
                        key={`${label.packetUid}-${index}`}
                    >
                        <div className="barcode-label-content">
                            <div className="label-header">
                                {/* <span>#{label.orderId || "-"}</span>
                                <span className="label-dot">•</span>
                                <span>
                                    PKT {label.packetNo}/{totalPackets}
                                </span> */}
                                <span className="label-location-row">
                                    {PartyType}
                                </span>

                            </div>


                            <span className="label-packet-uid">
                                {label.patientName}
                            </span>


                            <div className="label-location">
                                {label.nursingStation && (
                                    <div className="label-location-row">
                                        {/* <span className="label-location-key">
                                            NS:
                                        </span> */}
                                        <span className="label-location-key">
                                            {label.bedNo}
                                        </span>
                                        :
                                        <span className="label-location-key">
                                            {label.nursingStation}
                                        </span>
                                    </div>
                                )}


                                <div className="label-location-row">
                                    {/* <span className="label-location-key">
                                            BED:
                                        </span> */}
                                    {
                                        label?.orderItem?.map((val) => {
                                            return (
                                                <span key={val.item_id} className="label-location-value">
                                                    ● {val.item_code}
                                                </span>
                                            )
                                        })
                                    }

                                </div>

                                <div className="label-location-row">
                                    <span className="label-packet-value">
                                        {label?.mealType}
                                    </span>
                                </div>

                                {label.patientName && (
                                    <div className="label-location-row">
                                        {/* <span className="label-location-key">
                                            PT:
                                        </span> */}
                                        <div className="label-packet-value">
                                            {label.packetUid || "-"}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </section>
                )
            })}
        </div>,
        document.body
    );
};

export default BarcodePrint;