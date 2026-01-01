
import { Box, Input, Option, Select, Typography } from '@mui/joy';
import React, { memo, useCallback, useMemo, useState } from 'react'
import { Virtuoso } from 'react-virtuoso';
import { Paper } from '@mui/material';
import CardCloseOnly from '../Components/CardCloseOnly';
import CustomeToolTip from '../Components/CustomeToolTip';
import CusIconButton from '../Components/CusIconButton';
import DownloadIcon from '@mui/icons-material/Download'
import * as XLSX from 'xlsx'
import CommonDateFeilds from './StoreCommonCode/CommonDateFeilds';
import { IoSearchSharp } from "react-icons/io5";
import { axiosellider } from '../Axios/Axios';
import { formatDateTime } from './StoreCommonCode/CommonStyle';

const columns = [
    { key: "sl_no", label: "Sl No", align: "center", width: 100, },
    { key: "GRN NO", label: "Grn_No", align: "center", width: 100, },
    { key: "GRN DATE", label: "Grn_date", align: "center", width: 100, },
    { key: "ITEM NAME", label: "Item_Name", align: "left", width: 200, },
    { key: "GRN QTY", label: "Grn_Qty", align: "center", width: 100, },
    { key: "GRN FREE QTY", label: "Grn_Free_Qty", align: "center", width: 100, },
    { key: "GRN RATE", label: "Grn_Rate", align: "right", width: 100, },
    { key: "TAX %", label: "Tax %", align: "center", width: 100, },
    { key: "GRN SELLING RATE", label: "Grn_Selling_Rate", align: "right", width: 100, },
    { key: "GRN DIS %", label: "Grn_Dis %", align: "center", width: 100, },
    { key: "GRN MRP", label: "Grn_Mrp", align: "center", width: 100, },
    { key: "GRN MARGIN AMOUNT", label: "Grn_Margin_Amt", align: "center", width: 100, },
    { key: "GRN MARGIN %", label: "Grn_Margin %", align: "center", width: 100, },
    { key: "ORDER NO", label: "Order_No", align: "center", width: 100, },
    { key: "ORDER DATE", label: "Order_Date", align: "center", width: 100, },
    { key: "PO QTY", label: "Po_Qty", align: "center", width: 100, },
    { key: "PO FREE QTY", label: "Po_Free_Qty", align: "center", width: 100, },
    { key: "RATE", label: "Rate", align: "right", width: 100 },
    { key: "MRP", label: "MRP", align: "right", width: 100 },
    { key: "PO MARGIN AMOUNT", label: "Po_Margin_Amt", align: "center", width: 110 },
    { key: "PO MARGIN %", label: "Po_Margin %", align: "center", width: 100 },
    { key: "DIS %", label: "Discount %", align: "center", width: 100 },
    { key: "DIS AMT", label: "Discount_Amount", align: "center", width: 100 },
    { key: "SUPPLY QTY", label: "Supply_Qty", align: "center", width: 100 },
    { key: "SUPPLY FREE QTY", label: "Supply_Free_Qty", align: "center", width: 100 },
    { key: "QUOTATION #", label: "Quotation", align: "center", width: 100 },
    { key: "QUO RATE", label: "Quo_Rate", align: "right", width: 100 },
    { key: "QUOTATION SELLING PRICE", label: "Qtn_Selling_Price", align: "center", width: 120 },
    { key: "QUO MARGIN AMOUNT", label: "Quo_Margin_Amount", align: "center", width: 120 },
    { key: "QUOTATION MARGIN %", label: "Qtn_Margin %", align: "center", width: 120 },
    { key: "QUO MRP", label: "Quo_MRP", align: "center", width: 110 },
    { key: "QUO DIS AMT", label: "Quo_Dis_Amount", align: "center", width: 100 },
    { key: "QUO DIS %", label: "Quo_Discount %", align: "center", width: 100 },
    { key: "QUO FREE QTY", label: "Quo_Free_Qty", align: "center", width: 100 },
    { key: "GST %", label: "GST", align: "center %", width: 100 },
    { key: "RATE VARIATION", label: "Rate_Variation %", align: "right", width: 100 },
    { key: "QUO MARGIN %", label: "Quo_Margin %", align: "center", width: 100 },
    { key: "ORDER MARGIN %", label: "Order_Margin %", align: "center", width: 100 },
    { key: "PURCHASE MARGIN %", label: "Purchase_Margin %", align: "center", width: 120 },
];

const StoreReportMain = ({ setActiveComponent }) => {

    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [purchaseMastData, setPurchaseMastData] = useState([]);
    const [selected, setSelected] = useState("0");
    const [searchValue, setSearchValue] = useState("");

    const filterParams = useMemo(() => ({
        fromDate,
        toDate
    }), [fromDate, toDate]);

    const backToSetting = useCallback(() => {
        setActiveComponent(0)
    }, [setActiveComponent])

    const onExportClick = () => {
        if (!purchaseMastData || purchaseMastData.length === 0) {
            alert("No data available to export");
            return;
        }
        const exportData = purchaseMastData.map((item, index) => ({
            sl_no: index + 1,
            grn_no: item["GRN NO"],
            grn_date: item["GRN DATE"] ? formatDateTime(item["GRN DATE"]) : "",
            item_name: item["ITEM NAME"],
            grn_qty: item["GRN QTY"],
            grn_free_qty: item["GRN FREE QTY"],
            grn_rate: item["GRN RATE"],
            tax_percent: item["TAX %"],
            grn_selling_rate: item["GRN SELLING RATE"],
            grn_dis_percent: item["GRN DIS %"],
            grn_mrp: item["GRN MRP"],
            grn_margin_amount: item["GRN MARGIN AMOUNT"],
            grn_margin_percent: item["GRN MARGIN %"],
            order_no: item["ORDER NO"],
            order_date: item["ORDER DATE"] ? formatDateTime(item["ORDER DATE"]) : "",
            po_qty: item["PO QTY"],
            po_free_qty: item["PO FREE QTY"],
            rate: item["RATE"],
            mrp: item["MRP"],
            po_margin_amount: item["PO MARGIN AMOUNT"],
            po_margin_percent: item["PO MARGIN %"],
            dis_percent: item["DIS %"],
            dis_amt: item["DIS AMT"],
            supply_qty: item["SUPPLY QTY"],
            supply_free_qty: item["SUPPLY FREE QTY"],
            quotation_no: item["QUOTATION #"],
            quo_rate: item["QUO RATE"],
            quotation_selling_price: item["QUOTATION SELLING PRICE "],
            quo_margin_amount: item["QUO MARGIN AMOUNT"],
            quotation_margin_percent: item["QUOTATION MARGIN %"],
            quo_mrp: item["QUO MRP"],
            quo_dis_amt: item["QUO DIS AMT"],
            quo_dis_percent: item["QUO DIS %"],
            quo_free_qty: item["QUO FREE QTY"],
            gst_percent: item["GST %"],
            rate_variation: item["RATE VARIATION"],
            quo_margin_percent: item["QUO MARGIN %"],
            order_margin_percent: item["ORDER MARGIN %"],
            purchase_margin_percent: item["PURCHASE MARGIN %"],
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "StoreReport");
        XLSX.writeFile(workbook, "StoreReport.xlsx");
    };

    const FetchData = useCallback(async () => {
        const result = await axiosellider.post('/storeReport/getPurchaseMastDatas', filterParams)
        const { success, data } = result.data
        if (success === 2) {
            setPurchaseMastData(data)
        }
        else {
            setPurchaseMastData([])
        }
    }, [filterParams])

    const filtered =
        searchValue?.trim() !== ''
            ? purchaseMastData?.filter((val) => {
                if (selected === "1") {
                    // Filter by GRN NO
                    return val["GRN NO"]?.toString() === searchValue;
                }

                if (selected === "2") {
                    // Filter by ORDER NO
                    return val["ORDER NO"]?.toString() === searchValue;
                }

                return true; // If no valid option selected
            })
            : purchaseMastData;

    return (
        <CardCloseOnly title="Store Report" close={backToSetting}>
            <Paper sx={{ width: '100%' }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        gap: 2,
                        mb: 1,
                        p: 1,
                    }}
                >
                    {/* Left Section - Date + Search */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            gap: 1,
                            alignItems: "center",
                        }}
                    >
                        <CommonDateFeilds
                            fromDate={fromDate}
                            toDate={toDate}
                            onFromDateChange={setFromDate}
                            onToDateChange={setToDate}
                        />
                        {/* Search Button */}
                        <CusIconButton
                            variant="soft"
                            color="success"
                            size="md"
                            onClick={FetchData}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                px: 2.2,
                                py: 1,
                                borderRadius: "12px",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                                "&:hover": {
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                                },
                            }}
                        >
                            <IoSearchSharp />
                        </CusIconButton>
                    </Box>

                    {/* Right Section - Dropdown + Input + Search + Download */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: "center",
                            gap: 1.5,
                        }}
                    >
                        {/* Dropdown */}
                        <Select
                            value={selected}
                            onChange={(e, newValue) => setSelected(newValue)}
                            size="sm"
                            sx={{ width: { xs: "100%", sm: 200 } }}
                        >
                            <Option value="0">Select to Search</Option>
                            <Option value="1">GRN Number</Option>
                            <Option value="2">Order Number</Option>
                        </Select>

                        {/* Input Box */}
                        <Input
                            placeholder="Type something..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            size="sm"
                            sx={{ width: { xs: "100%", sm: 180 } }}
                            disabled={selected === "0" ? true : false}
                        />

                        {/* Download Excel */}
                        <CustomeToolTip title="Download Excel" placement="left">
                            <CusIconButton
                                variant="soft"
                                color="success"
                                size="md"
                                onClick={onExportClick}
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: "12px",
                                    fontWeight: 600,
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                                    "&:hover": {
                                        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                                    },
                                }}
                            >
                                <DownloadIcon sx={{ fontSize: 22 }} />
                                Download
                            </CusIconButton>
                        </CustomeToolTip>
                    </Box>
                </Box>
                <Box
                    sx={{
                        overflowX: 'auto',
                        width: '100%',
                    }}
                >
                    <Box sx={{ minWidth: '4000px' }}>
                        <Box
                            display="flex"
                            sx={{ borderBottom: "1px solid grey", background: "#F0F0F0" }}
                        >
                            <Typography sx={{ width: 100, fontWeight: 700, textAlign: "center", }}>
                            </Typography>
                            <Typography sx={{ width: 1265, fontWeight: 700, textAlign: "center", backgroundColor: "#F0F3FF" }}>
                                GRN DETAILS
                            </Typography>
                            <Typography sx={{ width: 1175, fontWeight: 700, textAlign: "center", backgroundColor: "#E3F2FD" }}>
                                PURCHASE ORDER
                            </Typography>
                            <Typography sx={{ width: 948, fontWeight: 700, textAlign: "center", backgroundColor: "#E8F5E9" }}>
                                QUOTATION DETAILS
                            </Typography>
                        </Box>
                        {/* Sticky Header */}
                        <Box
                            display="flex"
                            sx={{
                                p: 0.5,
                                bgcolor: "#F0F0F0",
                                flexWrap: 'nowrap',
                                py: 0.5,
                                position: 'sticky',
                                top: 0,
                                zIndex: 2,
                                borderBottom: '1px solid lightgrey',
                            }}
                        >
                            {columns.map((col) => (
                                <Typography
                                    key={col.key}
                                    sx={{
                                        width: col.width,
                                        textAlign: col.align || 'center',
                                        fontWeight: 550,
                                        fontSize: 12,
                                    }}
                                >
                                    {col.label}
                                </Typography>
                            ))}
                        </Box>

                        {/* Virtuoso Rows */}
                        <Virtuoso
                            style={{ height: "71vh", width: "100%" }}

                            data={filtered}
                            itemContent={(index, val) => {
                                const isRed = val["RATE VARIATION"] > 0;
                                const red = "#FBEFEF";
                                const white = "white";
                                const Grn = "#F0F3FF";
                                const Po = "#E3F2FD";
                                const Qtn = "#E8F5E9"

                                return (
                                    <Box display="flex" sx={{ p: 0, borderBottom: "1px solid lightgrey", flexWrap: "nowrap" }}>
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : white, textAlign: 'center' }}>
                                            {index + 1}
                                        </Typography>
                                        {/* 1. GRN NO */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Grn, textAlign: 'center' }}>
                                            {val["GRN NO"]}
                                        </Typography>

                                        {/* 2. GRN DATE */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Grn, textAlign: 'center' }}>
                                            {formatDateTime(val["GRN DATE"])}
                                        </Typography>

                                        <Typography
                                            sx={{ width: 200, fontSize: 14, backgroundColor: isRed ? red : Grn, textAlign: 'left' }}
                                        >
                                            {val["ITEM NAME"]
                                                ? val["ITEM NAME"].charAt(0).toUpperCase() + val["ITEM NAME"].slice(1).toLowerCase()
                                                : ""
                                            }
                                        </Typography>
                                        {/* 4. GRN QTY */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Grn, textAlign: 'center' }}>
                                            {val["GRN QTY"]}
                                        </Typography>

                                        {/* 5. GRN FREE QTY */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Grn, textAlign: 'center' }}>
                                            {val["GRN FREE QTY"]}
                                        </Typography>
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Grn, textAlign: 'right' }}>
                                            {Number(val["GRN RATE"]).toFixed(4)}
                                        </Typography>

                                        {/* 7. TAX % */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Grn, textAlign: 'center' }}>
                                            {val["TAX %"]}
                                        </Typography>

                                        {/* 8. GRN SELLING RATE */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Grn, textAlign: 'right' }}>
                                            {Number(val["GRN SELLING RATE"]).toFixed(4)}
                                        </Typography>

                                        {/* 10. GRN DIS % */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Grn, textAlign: 'center' }}>
                                            {Number(val["GRN DIS %"]).toFixed(4)}

                                        </Typography>

                                        {/* 11. GRN MRP */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Grn, textAlign: 'center' }}>
                                            {Number(val["GRN MRP"]).toFixed(4)}
                                        </Typography>

                                        {/* 12. GRN MARGIN AMOUNT */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Grn, textAlign: 'center' }}>
                                            {Number(val["GRN MARGIN AMOUNT"]).toFixed(4)}
                                        </Typography>

                                        {/* 13. GRN MARGIN % */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Grn, textAlign: 'center' }}>
                                            {Number(val["GRN MARGIN %"]).toFixed(4)}
                                        </Typography>

                                        {/* 14. ORDER NO */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Po, textAlign: 'center' }}>
                                            {val["ORDER NO"]}
                                        </Typography>

                                        {/* 15. ORDER DATE */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Po, textAlign: 'center' }}>
                                            {formatDateTime(val["ORDER DATE"])}
                                        </Typography>

                                        {/* 16. PO QTY */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Po, textAlign: 'center' }}>
                                            {val["PO QTY"]}
                                        </Typography>

                                        {/* 17. PO FREE QTY */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Po, textAlign: 'center' }}>
                                            {val["PO FREE QTY"]}
                                        </Typography>

                                        {/* 18. RATE */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Po, textAlign: 'right' }}>
                                            {/* {val["RATE"]} */}
                                            {Number(val["RATE"]).toFixed(4)}
                                        </Typography>

                                        {/* 19. MRP */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Po, textAlign: 'right' }}>
                                            {/* {val["MRP"]} */}
                                            {Number(val["MRP"]).toFixed(4)}
                                        </Typography>

                                        {/* 20. PO MARGIN AMOUNT */}
                                        <Typography sx={{ width: 110, fontSize: 14, backgroundColor: isRed ? red : Po, textAlign: 'center' }}>
                                            {Number(val["PO MARGIN AMOUNT"]).toFixed(4)}
                                        </Typography>

                                        {/* 21. PO MARGIN % */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Po, textAlign: 'center' }}>
                                            {Number(val["PO MARGIN %"]).toFixed(4)}
                                        </Typography>

                                        {/* 22. DIS % */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Po, textAlign: 'center' }}>
                                            {val["DIS %"]}
                                        </Typography>

                                        {/* 23. DIS AMT */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Po, textAlign: 'center' }}>
                                            {Number(val["DIS AMT"]).toFixed(4)}
                                        </Typography>

                                        {/* 24. SUPPLY QTY */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Po, textAlign: 'center' }}>
                                            {val["SUPPLY QTY"]}
                                        </Typography>

                                        {/* 25. SUPPLY FREE QTY */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Po, textAlign: 'center' }}>
                                            {val["SUPPLY FREE QTY"]}
                                        </Typography>

                                        {/* 26. QUOTATION # */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Qtn, textAlign: 'center' }}>
                                            {val["QUOTATION #"]}
                                        </Typography>

                                        {/* 27. QUO RATE */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Qtn, textAlign: 'right' }}>
                                            {Number(val["QUO RATE"]).toFixed(4)}

                                        </Typography>

                                        {/* 28. QUOTATION SELLING PRICE */}
                                        <Typography sx={{ width: 120, fontSize: 14, backgroundColor: isRed ? red : Qtn, textAlign: 'center' }}>
                                            {Number(val["QUOTATION SELLING PRICE "]).toFixed(4)}
                                        </Typography>

                                        {/* 29. QUO MARGIN AMOUNT */}
                                        <Typography sx={{ width: 120, fontSize: 14, backgroundColor: isRed ? red : Qtn, textAlign: 'center' }}>
                                            {Number(val["QUO MARGIN AMOUNT"]).toFixed(4)}
                                        </Typography>

                                        {/* 30. QUOTATION MARGIN % */}
                                        <Typography sx={{ width: 120, fontSize: 14, backgroundColor: isRed ? red : Qtn, textAlign: 'center' }}>
                                            {Number(val["QUOTATION MARGIN %"]).toFixed(4)}
                                        </Typography>

                                        {/* 31. QUO MRP */}
                                        <Typography sx={{ width: 110, fontSize: 14, backgroundColor: isRed ? red : Qtn, textAlign: 'center' }}>
                                            {Number(val["QUO MRP"]).toFixed(4)}
                                        </Typography>

                                        {/* 32. QUO DIS AMT */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Qtn, textAlign: 'center' }}>
                                            {val["QUO DIS AMT"]}
                                        </Typography>

                                        {/* 33. QUO DIS % */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Qtn, textAlign: 'center' }}>
                                            {val["QUO DIS %"]}
                                        </Typography>

                                        {/* 34. QUO FREE QTY */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : Qtn, textAlign: 'center' }}>
                                            {val["QUO FREE QTY"]}
                                        </Typography>

                                        {/* 35. GST % */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : "#FFEDFA", textAlign: 'center' }}>
                                            {val["GST %"]}
                                        </Typography>

                                        {/* 36. RATE VARIATION */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : " #FFE3E1", textAlign: 'right' }}>
                                            {Number(val["RATE VARIATION"]).toFixed(4)}
                                        </Typography>

                                        {/* 37. QUO MARGIN % */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : "#E3F4F4", textAlign: 'center' }}>
                                            {Number(val["QUO MARGIN %"]).toFixed(4)}
                                        </Typography>

                                        {/* 38. ORDER MARGIN % */}
                                        <Typography sx={{ width: 100, fontSize: 14, backgroundColor: isRed ? red : "#D3E0DC", textAlign: 'center' }}>
                                            {Number(val["ORDER MARGIN %"]).toFixed(4)}
                                        </Typography>

                                        {/* 39. PURCHASE MARGIN % */}
                                        <Typography sx={{ width: 120, fontSize: 14, backgroundColor: isRed ? red : "#FFFBF5", textAlign: 'center' }}>
                                            {Number(val["PURCHASE MARGIN %"]).toFixed(4)}
                                        </Typography>
                                    </Box>
                                );
                            }}
                        />
                    </Box>
                </Box>
            </Paper >
        </CardCloseOnly >
    )
}

export default memo(StoreReportMain);
