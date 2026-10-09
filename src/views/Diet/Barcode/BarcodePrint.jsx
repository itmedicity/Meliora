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
    const totalPackets = barcodePrintDetails.length;

    const labels = barcodePrintDetails.map((item, index) => ({
        packetUid: item?.packetUid || item?.barcodeNumber || "",
        orderId: item?.orderId || orderId || "",
        packetNo: item?.packetNo || index + 1,
        bedNo: item?.bedNo || "",
        nursingStation: item?.nursingStation || "",
        patientName: item?.patientName || "",
    }));

    return createPortal(
        <div className="barcode-print-container">
            {labels?.map((label, index) => (
                <section
                    className="barcode-label"
                    key={`${label.packetUid}-${index}`}
                >
                    <div className="barcode-label-content">
                        <div className="label-header">
                            <span>#{label.orderId || "-"}</span>
                            <span className="label-dot">•</span>
                            <span>
                                PKT {label.packetNo}/{totalPackets}
                            </span>
                        </div>

                        <div className="label-packet-uid">
                            {label.packetUid || "-"}
                        </div>

                        <div className="label-location">
                            {label.nursingStation && (
                                <div className="label-location-row">
                                    <span className="label-location-key">
                                        NS:
                                    </span>
                                    <span className="label-location-value">
                                        {label.nursingStation}
                                    </span>
                                </div>
                            )}

                            {label.bedNo && (
                                <div className="label-location-row">
                                    <span className="label-location-key">
                                        BED:
                                    </span>
                                    <span className="label-location-value">
                                        {label.bedNo}
                                    </span>
                                </div>
                            )}
                            {label.patientName && (
                                <div className="label-location-row">
                                    <span className="label-location-key">
                                        PT:
                                    </span>
                                    <span className="label-location-value">
                                        {label.patientName}
                                    </span>
                                </div>
                            )}

                        </div>
                    </div>
                </section>
            ))}
        </div>,
        document.body
    );
};

export default BarcodePrint;