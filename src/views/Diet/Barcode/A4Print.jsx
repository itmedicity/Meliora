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

    // const totalPackets = a4PrintDetails.length;

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

        orderItem: item?.items ||
            "",
        mealType: item?.mealType ||
            "",

        partyName: item?.partyName || ""
    }));

    return createPortal(
        <div className="a4-barcode-print-container">

            {labels?.map((label, index) => {
                const isPateint = label?.partyName?.trim() === "PATIENT";
                const PartyType = isPateint ? "𝑷𝑨𝑻" : "𝑩𝒀𝑺"
                return (
                    <section
                        className="a4-barcode-label"
                        key={`${label.packetUid}-${index}`}
                    >
                        <div className="a4-barcode-label-content">

                            {/* HEADER */}
                            <div className="a4-label-header">
                                {/* <span>
                                    #{label.orderId || "-"}
                                </span>

                                <span className="a4-label-dot">
                                    •
                                </span>

                                <span>
                                    PKT {label.packetNo}/{totalPackets}
                                </span> */}
                                <span className="label-location-row">
                                    {PartyType}
                                </span>

                            </div>

                            {/* PACKET UID */}
                            {/* <div className="a4-label-packet-uid">
                                {label.packetUid || "-"}
                            </div> */}
                            <span className="label-packet-uid">
                                {label.patientName}
                            </span>

                            {/* LOCATION */}
                            <div className="a4-label-location">

                                {label.nursingStation && (
                                    <div className="a4-label-location-row">
                                        {/* <span className="a4-label-location-key">
                                            NS:
                                        </span>

                                        <span className="a4-label-location-value">
                                            {label.nursingStation}
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

                                {label.bedNo && (
                                    <div className="a4-label-location-row">
                                        {/* <span className="a4-label-location-key">
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
                                )}<div className="label-location-row">
                                    <span className="label-packet-value">
                                        {label?.mealType}
                                    </span>
                                </div>

                                {label.patientName && (
                                    <div className="a4-label-location-row">
                                        {/* <span className="a4-label-location-key">
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

export default A4Print;