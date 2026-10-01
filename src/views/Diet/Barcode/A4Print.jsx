import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./A4Print.css";

const A4Print = ({ printData, onClose }) => {
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

    const {
        orderId,
        a4PrintDetails = [],
    } = printData;

    const totalPackets = a4PrintDetails.length;

    const labels = a4PrintDetails.map((item, index) => ({
        packetUid:
            item?.packetUid ||
            item?.barcodeNumber ||
            "",

        orderId:
            item?.orderId ||
            orderId ||
            "",

        packetNo:
            item?.packetNo ||
            index + 1,

        bedNo:
            item?.bedNo ||
            "",

        nursingStation:
            item?.nursingStation ||
            "",

        patientName:
            item?.patientName ||
            "",
    }));

    return createPortal(
        <div className="a4-barcode-print-container">

            {labels.map((label, index) => (
                <section
                    className="a4-barcode-label"
                    key={`${label.packetUid}-${index}`}
                >
                    <div className="a4-barcode-label-content">

                        {/* HEADER */}
                        <div className="a4-label-header">
                            <span>
                                #{label.orderId || "-"}
                            </span>

                            <span className="a4-label-dot">
                                •
                            </span>

                            <span>
                                PKT {label.packetNo}/{totalPackets}
                            </span>
                        </div>

                        {/* PACKET UID */}
                        <div className="a4-label-packet-uid">
                            {label.packetUid || "-"}
                        </div>

                        {/* LOCATION */}
                        <div className="a4-label-location">

                            {label.nursingStation && (
                                <div className="a4-label-location-row">
                                    <span className="a4-label-location-key">
                                        NS:
                                    </span>

                                    <span className="a4-label-location-value">
                                        {label.nursingStation}
                                    </span>
                                </div>
                            )}

                            {label.bedNo && (
                                <div className="a4-label-location-row">
                                    <span className="a4-label-location-key">
                                        BED:
                                    </span>

                                    <span className="a4-label-location-value">
                                        {label.bedNo}
                                    </span>
                                </div>
                            )}

                            {label.patientName && (
                                <div className="a4-label-location-row">
                                    <span className="a4-label-location-key">
                                        PT:
                                    </span>

                                    <span className="a4-label-location-value">
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

export default A4Print;