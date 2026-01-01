import React, { memo, useCallback, useState } from "react";
import { Modal, Box, Typography, IconButton, Tooltip } from "@mui/joy";
import { Virtuoso } from "react-virtuoso";
import { formatDateTime } from "./StoreCommonCode/CommonStyle";
import CloseIcon from '@mui/icons-material/Close'
import CusIconButton from "../Components/CusIconButton";
import * as XLSX from 'xlsx'
import { axiosellider } from "../Axios/Axios";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PurchaseDetails from "./PurchaseDetails";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { RiFileExcel2Fill } from "react-icons/ri";
const QuatationModal = ({ open, onClose, selectedRow, quotationDetails }) => {
    const [detailArr, SetDetailArr] = useState([]);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const mainColumns = [
        { key: "#", label: "#", width: 80, align: "center" },
        { key: "sl_no", label: "Sl No", width: 80, align: "center" },
        { key: "QUOTATION #", label: "Quortation #", width: 100, align: "left" },
        { key: "QUOT DATE", label: "Quot Date", width: 180, align: "center" },
        { key: "IT_CODE", label: "It Code", width: 100, align: "left" },
        { key: "ITEM", label: "Item", width: 450, align: "left" },
        { key: "QTY", label: "Qty", width: 100, align: "right" },
        { key: "GST", label: "GST", width: 100, align: "right" },
        { key: "DIS %", label: "Dis%", width: 100, align: "right" },
        { key: "DIS AMNT", label: "Dis Amnt", width: 200, align: "right" },
        { key: "FREE QTY", label: "Free Qty", width: 80, align: "center" },
        { key: "RATE", label: "Rate", width: 100, align: "right" },
        { key: "GST AMT", label: "GST Amt", width: 100, align: "right" },
        { key: "RATE + GST", label: "Rate + GST", width: 100, align: "right" },
        { key: "SELLING RATE", label: "Selling Rate", width: 100, align: "right" },
        { key: "MRP - INCL GST", label: "MRP- Incl GST", width: 100, align: "right" },
        { key: "MARGIN AMT", label: "Margin Amt", width: 100, align: "right" },
        { key: "MARGIN %", label: "Margin %", width: 100, align: "center" },
        { key: "QUN NET AMT", label: "Qun Net Amt", width: 100, align: "right" }
    ];

    const onExportClick = () => {
        if (quotationDetails.length === 0) {
            alert("No data available to export"); return;
        }
        const exportData = quotationDetails.map((item, index) => ({
            sl_no: index + 1,
            quotation: item["QUOTATION #"],
            quotation_date: item["QUOTATION DATE"],
            It_code: item["IT_CODE"],
            item: item["ITEM"],
            qty: item["QTY"],
            gst: item["GST"],
            dis: item["DIS %"],
            dis_amt: item["DIS AMNT"],
            free_qty: item["FREE QTY"],
            rate: item["RATE"],
            gst_amt: item["GST AMT"],
            rate_gst: item["RATE + GST"],
            selling_rate: item["SELLING RATE"],
            mrp_inck_gst: item["MRP - INCL GST"],
            margin_amt: item["MARGIN AMT"],
            margin: item["MARGIN %"],
            qun_net_amt: item["QUN NET AMT"],
        }));
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "QuotationDetails");
        XLSX.writeFile(workbook, "Quotation_Details.xlsx");
    };
    const viewDetails = useCallback(async (val) => {
        if (selectedItem === val) {
            setOpenDetail(false);  // Toggle off if the same row clicked
            setSelectedItem(null);
        } else {
            setSelectedItem(val);
            setOpenDetail(true);   // Open details if new row clicked
        }

        const it_code = val;
        const result = await axiosellider.get(`storeReport/getItemDetails/${it_code}`);
        const { success, data } = result.data;

        if (success === 1 && Array.isArray(data) && data.length > 0) {
            const sortedData = data.sort(
                (a, b) => new Date(b["PURCHASE DATE"]) - new Date(a["PURCHASE DATE"])
            );
            SetDetailArr(sortedData); // Update state
            return sortedData;
        } else {
            SetDetailArr([]);
        }
    }, [selectedItem]);

    // const viewDetailsfalse = useCallback(async (val) => {
    //     setOpenDetail(false);
    //     setSelectedItem(null);
    // }, []);

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "white",
                    p: 3,
                    borderRadius: 2,
                    width: "100%",
                    boxShadow: "0px 8px 25px rgba(0,0,0,0.15)"
                }}
            >
                {/* Header and Export Button */}

                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={onClose}>
                        <CloseIcon fontSize="small" />
                    </CusIconButton>
                </Box>

                <Box
                    sx={{
                        mb: 1.5,
                        p: 0.8,
                        borderRadius: 3,
                        border: "1px solid #d0e2ff",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Box>
                        <Typography level="title-md" sx={{ mb: 0.8, color: '#756AB6' }}>
                            <strong>Quotation No:</strong> {selectedRow?.["QUOTATION #"] || "--"}
                        </Typography>
                        <Typography level="title-md" sx={{ mb: 0.8, color: '#756AB6' }}>
                            <strong>SUPPLIER :</strong> {selectedRow?.["SUPPLIER"] || "--"}
                        </Typography>
                        <Typography level="title-md" sx={{ mb: 0.8, color: '#756AB6' }}>
                            <strong>Quotation Slno:</strong> {selectedRow?.["QUC_SLNO"] || "--"}
                        </Typography>
                    </Box>

                    <Box>

                        <Tooltip title="Download Excel" >
                            <IconButton
                                onClick={onExportClick}
                                size="sm"
                                sx={{
                                    border: '1px solid #756AB6',
                                    borderRadius: 1,
                                    display: 'flex',
                                    mt: 5.5,
                                }}
                            >
                                <RiFileExcel2Fill
                                    color="#756AB6"
                                />

                            </IconButton>
                        </Tooltip>
                    </Box>

                </Box>

                <Box sx={{ overflowX: "auto", width: "100%" }}>
                    <Box sx={{ minWidth: `${mainColumns.length * 120}px` }}>
                        <Box
                            sx={{
                                display: "flex",
                                p: 1,
                                bgcolor: "#F5EFFF",
                                position: "sticky",
                                top: 0,
                                zIndex: 2,
                                borderBottom: "1px solid lightgrey"
                            }}
                        >
                            {mainColumns.map(col => (
                                <Typography
                                    key={col.key}
                                    sx={{
                                        width: col.width,
                                        textAlign: col.align,
                                        fontWeight: 600,
                                        fontSize: 12
                                    }}
                                >
                                    {col.label}
                                </Typography>
                            ))}
                        </Box>
                        <Virtuoso
                            style={{ height: "63vh", width: "100%" }}
                            data={quotationDetails}
                            itemContent={(index, val) => (
                                <Box>
                                    {/* MAIN ROW */}
                                    <Box display="flex" sx={{ borderBottom: "1px solid lightgrey" }}>
                                        {mainColumns.map((col) => {
                                            let value = val[col.key];
                                            if (col.key === "sl_no") value = index + 1;
                                            if (col.key === "QUOT DATE") value = formatDateTime(value);
                                            if (["RATE", "QTY", "RATE + GST", "QUN NET AMT", "SELLING RATE", "GST AMT", "MARGIN %", "MRP - INCL GST"].includes(col.key)) {
                                                value = Math.round(value);
                                            }
                                            const isMarginField = ["MARGIN %"].includes(col.key);
                                            return (
                                                <Box
                                                    key={col.key}
                                                    sx={{
                                                        width: col.width,
                                                        display: "flex",
                                                        justifyContent:
                                                            col.align === "right"
                                                                ? "flex-end"
                                                                : col.align === "center"
                                                                    ? "center"
                                                                    : "flex-start",
                                                        alignItems: "center",
                                                        fontSize: 14,
                                                        fontWeight: col.fontWeight,
                                                        backgroundColor: isMarginField ? "#F0D9FF" : "white"
                                                    }}
                                                >
                                                    {col.key === "#" ? (
                                                        <Box
                                                            onClick={() => viewDetails(val?.IT_CODE)}
                                                            sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                                                        >
                                                            {openDetail && selectedItem === val?.IT_CODE ? (
                                                                <KeyboardArrowUpIcon sx={{ color: "#7F55B1" }} />
                                                            ) : (
                                                                <KeyboardArrowDownIcon sx={{ color: "#7F55B1" }} />
                                                            )}
                                                        </Box>
                                                    ) : (
                                                        value ?? "--"
                                                    )}
                                                </Box>
                                            );
                                        })}
                                    </Box>

                                    {/* DETAILS ROW */}
                                    {openDetail && selectedItem === val?.IT_CODE && (
                                        <Box sx={{ py: 1, bgcolor: "#f9fbff" }}>
                                            <PurchaseDetails detailArr={detailArr} />
                                        </Box>
                                    )}
                                </Box>
                            )}
                        />

                    </Box>
                </Box>
            </Box>
        </Modal >
    )
}

export default memo(QuatationModal)