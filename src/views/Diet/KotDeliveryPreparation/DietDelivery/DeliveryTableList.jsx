import React, { useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { Box, Paper, Tooltip, Chip } from "@mui/material";
import DietTextComponent from "../../DietComponent/DietTextComponent";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DietButton from "../../DietComponent/DietButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import BarcodePrint from "../../Barcode/BarcodePrint";
import { PatientstatusConfig, statusConfig } from "../../CommonData/Common";
import { infoNotify } from "src/views/Common/CommonCode";
import A4Print from "../../Barcode/A4Print";

const Cell = ({ width, children }) => (
    <Box
        sx={{
            width,
            minWidth: width,
            maxWidth: width,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            boxSizing: "border-box",
        }}
    >
        {children}
    </Box>
);

const DeliveryTableList = ({
    data = [],
    setOpenModal,
    setDeliveryPatient,
    setPrintOrderIds,
    setPrintLabelData,
    printLabelData,
    setSelectedPrintItems,
    selectedPrintItems,
    setA4PrintData,
    a4PrintData

}) => {
    const [printQty, setPrintQty] = useState({});


    const getRowKey = row =>
        `${row?.canteen_order_id}-${row?.type_slno}`;

    const getPrintQuantity = (row) => {
        const key = getRowKey(row);

        // User manually changed quantity
        if (printQty[key] !== undefined) {
            return printQty[key];
        }

        // Default = actual packed packet count
        if (
            row?.packet_count !== undefined &&
            row?.packet_count !== null
        ) {
            return Number(row.packet_count) || 0;
        }

        // Fallback
        return Number(row?.item_count) || 0;
    };

    const isRowChecked = row => {
        const key = getRowKey(row);
        return selectedPrintItems?.some(
            item => item?.printKey === key
        );
    };

    // const handlePrintQtyChange = (row, value) => {
    //     const key = getRowKey(row);
    //     const quantity = Math.max(1, Number(value) || 1);

    //     setPrintQty(prev => ({
    //         ...prev,
    //         [key]: quantity,
    //     }));

    //     setSelectedPrintItems(prev =>
    //         prev.map(item =>
    //             item?.printKey === key
    //                 ? {
    //                     ...item,
    //                     printQuantity: quantity,
    //                 }
    //                 : item
    //         )
    //     );
    // };

    const handleRowCheck = row => {

        if (row.packet_count === null) return infoNotify("Not Packed Yet!");

        const key = getRowKey(row);
        const quantity = getPrintQuantity(row);

        setSelectedPrintItems(prev => {
            const exists = prev.some(
                item => item?.printKey === key
            );

            if (exists) {
                return prev.filter(
                    item => item?.printKey !== key
                );
            }

            return [
                ...prev,
                {
                    ...row,
                    printKey: key,
                    printQuantity: quantity,
                },
            ];
        });
    };

    const handlePrintClose = () => {
        const orderId = printLabelData?.orderId;

        setPrintQty(prev => {
            const updated = {};

            Object.entries(prev).forEach(([key, value]) => {
                if (!key.startsWith(`${orderId}-`)) {
                    updated[key] = value;
                }
            });

            return updated;
        });

        setSelectedPrintItems(prev =>
            prev.filter(
                item =>
                    item?.canteen_order_id !== orderId
            )
        );

        setPrintOrderIds?.(prev =>
            prev.filter(id => id !== orderId)
        );

        setPrintLabelData(null);
    };

    const getPacketList = (row) => {
        let items = row?.items;

        // If items is JSON string, parse it
        if (typeof items === "string") {
            try {
                items = JSON.parse(items);
            } catch (error) {
                console.error("Invalid items JSON:", error);
                return [];
            }
        }

        if (!Array.isArray(items)) return [];

        const uniquePackets = new Map();

        items.forEach(item => {
            if (!item?.packet_uid) return;

            if (!uniquePackets.has(item.packet_uid)) {
                uniquePackets.set(item.packet_uid, {
                    packet_uid: item.packet_uid,
                    packet_no: item.packet_no,
                    packing_id: item.packing_id,
                    packet_count: item.packet_count,
                    packet_status: item.packet_status,
                    packing_status: item.packing_status,

                    // Patient / delivery details
                    order_id: row?.canteen_order_id,
                    admission_id: row?.fb_ip_no,
                    patient_no: row?.fb_pt_no,
                    patient_name: row?.fb_ptc_name,

                    // Bed details
                    bed_no: row?.bed_no,
                    bed_code: row?.fb_bd_code,

                    // Nursing station
                    nursing_station: row?.nursing_station,
                    nursing_station_code: row?.fb_ns_code,

                    // Other details
                    party_name: row?.party_name,
                    meal_type: row?.meal_type,
                    type_slno: row?.type_slno
                });
            }
        });

        return Array.from(uniquePackets.values());
    };

    const createPrintDetails = (row) => {
        const packetList = getPacketList(row);

        return packetList.map(packet => ({
            barcodeNumber: packet.packet_uid,
            packetUid: packet.packet_uid,
            packetNo: packet.packet_no,
            packetCount: packet.packet_count,
            packingId: packet.packing_id,

            orderId: packet.order_id,
            admissionId: packet.admission_id,
            patientNo: packet.patient_no,
            patientName: packet.patient_name,

            bedNo: packet.bed_no,
            bedCode: packet.bed_code,

            nursingStation: packet.nursing_station,
            nursingStationCode: packet.nursing_station_code,

            partyName: packet.party_name,
            mealType: packet.meal_type,
            typeSlno: packet.type_slno,
        }));
    };

    const handlePrint = (row) => {
        const printDetails = createPrintDetails(row);

        if (!printDetails.length) {
            infoNotify("No packed packets found");
            return;
        }

        setPrintLabelData({
            orderId: row?.canteen_order_id,
            printCount: printDetails.length,
            barcodePrintDetails: printDetails,
        });
    };


    const handleA4Print = (row) => {
        const printDetails = createPrintDetails(row);

        if (!printDetails.length) {
            infoNotify("No packed packets found");
            return;
        }

        setA4PrintData({
            orderId: row?.canteen_order_id,
            printCount: printDetails.length,
            a4PrintDetails: printDetails,
        });
    };
    return (
        <>
            <Paper
                sx={{
                    width: "100%",
                    overflow: "hidden",
                    mt: 1,
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    sx={{
                        bgcolor: "#7c51a1",
                        py: 0.6,
                        px: 1,
                        borderBottom: "1px solid lightgrey",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                    }}
                >
                    {[
                        ["Sl.No", 60],
                        ["Order Id", 70],
                        ["Patient", 140],
                        ["Pt No", 120],
                        ["Meal", 120],
                        ["NS", 140],
                        ["Patient Status", 140],
                        ["Status", 120],
                        ["Assignee", 140],
                        // ["Assigned At", 160],
                        ["Detail", 100],
                        ["Performa", 120],
                        ["Bill", 100],
                        ["Print & Pdf", 240],
                    ].map(([label, width]) => (
                        <Cell key={label} width={width}>
                            <DietTextComponent
                                value={label}
                                weight={600}
                                color="white"
                            />
                        </Cell>
                    ))}
                </Box>

                <Virtuoso
                    style={{ height: "62vh" }}
                    data={data}
                    itemContent={(index, row) => {
                        const orderId =
                            row?.canteen_order_id;

                        const isBystander =
                            row?.party_type_id === 1;

                        const isPendingItem =
                            row?.ItemStatus?.toUpperCase() ===
                            "PENDING";


                        const normalizedStatus =
                            row?.ItemStatus?.toUpperCase() || "PENDING";

                        const config =
                            statusConfig[normalizedStatus] ||
                            statusConfig.PENDING;


                        const AdmissiongStatus = PatientstatusConfig[row.fb_ipc_curstatus];


                        return (
                            <Box
                                key={`${orderId}-${row?.type_slno}-${index}`}
                                display="flex"
                                justifyContent="space-between"
                                sx={{
                                    borderBottom:
                                        "1px solid #eee",
                                    alignItems: "center",
                                    px: 1,
                                    py: 0.6,
                                    backgroundColor:
                                        row?.bgcolor || "white",
                                }}
                            >
                                <Cell width={60}>
                                    <DietTextComponent
                                        value={index + 1}
                                        size={12}
                                    />
                                </Cell>

                                <Cell width={70}>
                                    <DietTextComponent
                                        value={`#${orderId}`}
                                        size={12}
                                    />
                                </Cell>

                                <Cell width={140}>
                                    <DietTextComponent
                                        value={row?.fb_ptc_name}
                                        size={12}
                                    />
                                </Cell>

                                <Cell width={120}>
                                    <DietTextComponent
                                        value={row?.fb_pt_no}
                                        size={12}
                                    />
                                </Cell>

                                <Cell width={120}>
                                    <DietTextComponent
                                        value={row?.meal_type?.toUpperCase()}
                                        size={12}
                                    />
                                </Cell>

                                <Cell width={140}>
                                    <DietTextComponent
                                        value={row?.nursing_station}
                                        size={12}
                                    />
                                </Cell>
                                <Cell width={140}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={0.5}
                                        sx={{
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Tooltip title={AdmissiongStatus?.label}
                                            placement='left-start'>
                                            <Chip
                                                icon={AdmissiongStatus?.icon && (
                                                    React.cloneElement(AdmissiongStatus.icon, {
                                                        size: 14,
                                                        color: AdmissiongStatus?.color,
                                                    })
                                                )}
                                                label={AdmissiongStatus?.shortLabel || "-"}
                                                size="small"
                                                sx={{
                                                    height: 24,
                                                    borderRadius: "6px",
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    backgroundColor:
                                                        AdmissiongStatus?.bgColor ||
                                                        "rgba(37, 99, 235, 0.08)",
                                                    color: AdmissiongStatus?.color || "inherit",
                                                    border: `1px solid ${AdmissiongStatus?.borderColor || "transparent"
                                                        }`,
                                                }}
                                            />
                                        </Tooltip>
                                    </Box>
                                </Cell>

                                <Cell width={120}>
                                    <Chip
                                        label={config.label}
                                        size="small"
                                        sx={{
                                            height: 24,
                                            minWidth: 90,
                                            borderRadius: "6px",

                                            fontSize: 10,
                                            fontWeight: 700,

                                            color: config.color,
                                            backgroundColor: config.background,

                                            border: `1px solid ${config.border}`,

                                            "& .MuiChip-label": {
                                                px: 1.2,
                                            }
                                        }}
                                    />
                                </Cell>

                                <Cell width={140}>
                                    <DietTextComponent
                                        value={
                                            row?.assigned_to ||
                                            "-"
                                        }
                                        size={12}
                                    />
                                </Cell>

                                <Cell width={100}>
                                    <DietButton
                                        name="View"
                                        width={80}
                                        icon={VisibilityIcon}
                                        onClick={() => {
                                            setOpenModal("drawer");
                                            setDeliveryPatient(row);
                                        }}
                                    />
                                </Cell>

                                <Cell width={120}>
                                    <Tooltip
                                        title={
                                            isPendingItem
                                                ? "Not Pickedup Yet! Please Wait...!"
                                                : ""
                                        }
                                    >
                                        <span>
                                            <DietButton
                                                disabled={!isBystander}
                                                name=""
                                                width={80}
                                                icon={ReceiptLongIcon}
                                                onClick={
                                                    isPendingItem
                                                        ? () => { }
                                                        : () => {
                                                            setOpenModal(
                                                                "performa"
                                                            );
                                                            setDeliveryPatient(
                                                                row
                                                            );
                                                        }
                                                }
                                            />
                                        </span>
                                    </Tooltip>
                                </Cell>

                                <Cell width={100}>
                                    <DietButton
                                        disabled={!isBystander}
                                        name=""
                                        width={80}
                                        icon={ReceiptLongIcon}
                                        onClick={() => {
                                            setOpenModal("bill");
                                            setDeliveryPatient(row);
                                        }}
                                    />
                                </Cell>

                                <Cell width={240}>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            // justifyContent: "center",
                                            gap: 1,
                                        }}
                                    >
                                        {/* <Box
                                            onClick={() => {
                                                const quantity =
                                                    getPrintQuantity(row);

                                                if (quantity > 1) {
                                                    handlePrintQtyChange(
                                                        row,
                                                        quantity - 1
                                                    );
                                                }
                                            }}
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                cursor:
                                                    getPrintQuantity(row) > 1
                                                        ? "pointer"
                                                        : "not-allowed",
                                                color:
                                                    getPrintQuantity(row) > 1
                                                        ? "#555"
                                                        : "#bbb",
                                                fontSize: 16,
                                                userSelect: "none",
                                            }}
                                        >
                                            −
                                        </Box> */}

                                        <Box
                                            sx={{
                                                minWidth: 30,
                                                textAlign: "center",
                                                fontSize: 13,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {getPrintQuantity(row)}
                                        </Box>

                                        {/* <Box
                                            onClick={() => {
                                                const quantity =
                                                    getPrintQuantity(row);

                                                handlePrintQtyChange(
                                                    row,
                                                    quantity + 1
                                                );
                                            }}
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                cursor: "pointer",
                                                color: "#555",
                                                fontSize: 16,
                                                userSelect: "none",
                                            }}
                                        >
                                            +
                                        </Box> */}

                                        <Box
                                            onClick={() =>
                                                handleRowCheck(row)
                                            }
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                borderRadius: "4px",
                                                border: isRowChecked(row)
                                                    ? "1.5px solid #7c51a1"
                                                    : "1.5px solid #aaa",
                                                bgcolor: isRowChecked(row)
                                                    ? "#7c51a1"
                                                    : "#fff",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                cursor: "pointer",
                                                flexShrink: 0,
                                            }}
                                        >
                                            {isRowChecked(row) && (
                                                <Box
                                                    sx={{
                                                        color: "#fff",
                                                        fontSize: 13,
                                                        fontWeight: 700,
                                                        lineHeight: 1,
                                                    }}
                                                >
                                                    ✓
                                                </Box>
                                            )}
                                        </Box>

                                        <Tooltip title="Print">
                                            <LocalPrintshopIcon
                                                onClick={() =>
                                                    handlePrint(row)
                                                }
                                                sx={{
                                                    fontSize: 21,
                                                    color: "#555",
                                                    cursor: "pointer",
                                                    "&:hover": {
                                                        color: "#7c51a1",
                                                    },
                                                }}
                                            />
                                        </Tooltip>

                                        {/* A4 PDF PRINT */}
                                        <Tooltip title="Print A4">
                                            <ReceiptLongIcon
                                                onClick={() => handleA4Print(row)}
                                                sx={{
                                                    fontSize: 21,
                                                    color: "#555",
                                                    cursor: "pointer",
                                                    "&:hover": {
                                                        color: "#1976d2",
                                                    },
                                                }}
                                            />
                                        </Tooltip>
                                    </Box>
                                </Cell>

                            </Box>
                        );
                    }}
                />
            </Paper>

            {printLabelData && (
                <BarcodePrint
                    printData={printLabelData}
                    onClose={handlePrintClose}
                />
            )}


            {a4PrintData && (
                <A4Print
                    printData={a4PrintData}
                    onClose={() => setA4PrintData(null)}
                />
            )}
        </>
    );
};

export default DeliveryTableList;

