import React, { memo, useCallback, useMemo, useState } from 'react'
import CardCloseOnly from '../Components/CardCloseOnly'
import { IconButton, Paper } from '@mui/material'
import { Box, Input, Option, Select, Typography, Tooltip } from '@mui/joy'
import CommonDateFeilds from './StoreCommonCode/CommonDateFeilds'
import { axiosellider } from '../Axios/Axios'
import * as XLSX from 'xlsx'
import { formatDateTime } from './StoreCommonCode/CommonStyle'
import { IoSearchSharp } from "react-icons/io5";
import { Virtuoso } from 'react-virtuoso'
import { RiFileExcel2Fill } from 'react-icons/ri'

const columns = [
    { key: "sl_no", label: "Sl_No", width: 100, align: "center" },
    { key: "GRN NO", label: "GRN_No", width: 100, align: "center" },
    { key: "GRN DATE", label: "GRN_Date", width: 115, align: "center" },
    { key: "ITEM NAME", label: "Item_Name", width: 220, align: "left" },
    { key: "GRN RATE", label: "GRN_Rate", width: 100, align: "right" },
    { key: "GRN SELLING RATE", label: "GRN_Selling_Rate", width: 135, align: "right" },
    { key: "GRN QTY", label: "GRN_Qty", width: 100, align: "center" },
    { key: "GRN FREE QTY", label: "GRN_Free_Qty", width: 100, align: "center" },
    { key: "GRN DIS %", label: "GRN_Dis%", width: 110, align: "center" },
    { key: "ORDER DATE", label: "Order_Date", width: 100, align: "center" },
    { key: "PO QTY", label: "PO_Qty", width: 100, align: "center" },
    { key: "PO FREE QTY", label: "PO_Free_Qty", width: 100, align: "center" },
    { key: "RATE", label: "Rate", width: 90, align: "right" },
    { key: "DIS %", label: "Disc %", width: 100, align: "center" },
    { key: "RATE VARIATION", label: "Rate_Variation", width: 100, align: "center" },
    { key: "QUO MARGIN %", label: "Quo_Margin%", width: 120, align: "center" },
    { key: "PURCHASE MARGIN %", label: "Purchase_Margin%", width: 135, align: "center" },
    { key: "GRN VARIATION QTY", label: "GRN Variation_Qty", width: 135, align: "center" },
    { key: "GRN VARIATION FREE", label: "GRN Variation_Free", width: 130, align: "center" },
    { key: "DATE_DIFF", label: "Date_Diff", width: 120, align: "center" },
    { key: "DISCOUNT VARIATION", label: "Disc_Variation", width: 120, align: "center" },
];

const GrnReport = ({ setActiveComponent }) => {

    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [GrmData, setGrmData] = useState([]);
    const [selected, setSelected] = useState("0");
    const [searchValue, setSearchValue] = useState("");
    const [variationType, setVariationType] = useState(0);

    const backToSetting = useCallback(() => {
        setActiveComponent(0)
    }, [setActiveComponent])

    const filterParams = useMemo(() => ({
        fromDate,
        toDate
    }), [fromDate, toDate]);

    const FetchData = useCallback(async () => {
        const result = await axiosellider.post('/storeReport/getGrmDetails', filterParams)
        const { success, data } = result.data
        if (success === 2) setGrmData(data)
        else setGrmData([])
    }, [filterParams])

    const filtered = useMemo(() => {
        let result = GrmData;
        // 1) Search filter
        if (searchValue.trim()) {
            if (selected === "1") {
                result = result.filter(val =>
                    val["GRN NO"]?.toString() === searchValue
                );
            }
        }
        // 2) Variation filter
        if (variationType === 1) {
            result = result.filter(val => val["RATE VARIATION"] > 0);
        }
        // 2) Qtn>Pu filter
        else if (variationType === 2) {
            result = result.filter(val => val["QUO MARGIN %"] !== val["PURCHASE MARGIN %"]);
        }
        //3) Discount variation
        else if (variationType === 3) {
            result = result.filter(val => val["DISCOUNT VARIATION"] > 0);
        }
        return result;

    }, [searchValue, selected, variationType, GrmData]);


    // --- EXCEL EXPORT ---
    const onExportClick = () => {
        if (GrmData.length === 0) {
            alert("No data available to export");
            return;
        }

        const exportData = GrmData.map((item, index) => ({
            sl_no: index + 1,
            grn_no: item["GRN NO"],
            grn_date: item["GRN DATE"] ? formatDateTime(item["GRN DATE"]) : "",
            item_name: item["ITEM NAME"],
            grn_rate: item["GRN RATE"],
            grn_selling_rate: item["GRN SELLING RATE"],
            grn_qty: item["GRN QTY"],
            grn_free_qty: item["GRN FREE QTY"],
            grn_dis: item["GRN DIS %"],
            order_date: item["ORDER DATE"] ? formatDateTime(item["ORDER DATE"]) : "",
            po_qty: item["PO QTY"],
            po_free_qty: item["PO FREE QTY"],
            rate: item["RATE"],
            dis_percent: item["DIS %"],
            rate_variation: item["RATE VARIATION"],
            quo_margin_percent: item["QUO MARGIN %"],
            purchase_margin_percent: item["PURCHASE MARGIN %"],
            grn_variation_qty: item["GRN VARIATION QTY"],
            grn_variation_free: item["GRN VARIATION FREE"],
            date_diff: item["DATE_DIFF"],
            discount_variation: item["DISCOUNT VARIATION"],
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "GRNReport");
        XLSX.writeFile(workbook, "GRNReport.xlsx");
    };

    return (
        <CardCloseOnly title="GRM Report" close={backToSetting}>
            <Paper sx={{ width: '100%' }}>

                {/* TOP FILTER SECTION */}
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 1, p: 1 }}>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <CommonDateFeilds
                            fromDate={fromDate}
                            toDate={toDate}
                            onFromDateChange={setFromDate}
                            onToDateChange={setToDate}
                        />

                        <IconButton
                            onClick={FetchData}
                            size="sm"
                            sx={{
                                p: 0,
                                borderRadius: 1,
                                display: 'flex',
                            }}
                        >
                            <IoSearchSharp
                                color="#756AB6"
                            />
                        </IconButton>

                        <Select value={variationType} onChange={(e, newValue) => setVariationType(newValue)} size="sm"
                            sx={{ width: 200 }}>
                            <Option value={0}>All Records</Option>
                            <Option value={1}>Rate Variation</Option>
                            <Option value={2}>Quotation/Purchase Variation</Option>
                            <Option value={3}>Discount Variation</Option>
                        </Select>
                    </Box>

                    {/* Search Input */}
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <Select value={selected} onChange={(e, newValue) => setSelected(newValue)} size="sm">
                            <Option value="0">Select to Search</Option>
                            <Option value="1">GRN Number</Option>
                        </Select>

                        <Input
                            placeholder="Search value"
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            size="sm"
                            disabled={selected === "0"}
                        />

                        <Tooltip title="Download Excel" >
                            <IconButton
                                onClick={onExportClick}
                                size="sm"
                                sx={{
                                    border: '1px solid #756AB6',
                                    p: 0.5,
                                    borderRadius: 1,
                                    display: 'flex',
                                    gap: 0.5,


                                }}
                            >
                                <RiFileExcel2Fill
                                    color="#756AB6"
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                {/* TABLE */}
                <Box sx={{ overflowX: "auto", width: "100%" }}>
                    <Box sx={{ minWidth: `${columns.length * 100}px` }}>
                        {/* HEADER ROW */}
                        <Box sx={{
                            display: "flex",
                            p: 1,
                            bgcolor: "#F0F0F0",
                            position: "sticky",
                            top: 0,
                            zIndex: 2,
                            borderBottom: "1px solid lightgrey"
                        }}>
                            {columns.map(col => (
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

                        {/* DATA ROWS */}
                        <Virtuoso
                            style={{ height: "73vh", width: "100%" }}
                            data={filtered}

                            itemContent={(index, val) => {
                                const isRed = val["RATE VARIATION"] > 0;
                                const red = "#FBEFEF";
                                const quo = val["QUO MARGIN %"];
                                const pur = val["PURCHASE MARGIN %"];
                                const isMarginDiff = (quo.toFixed(4)) !== (pur.toFixed(4));

                                return (
                                    <Box display="flex" sx={{ borderBottom: "1px solid lightgrey" }}>
                                        {/* --- map using columns array to avoid mistakes --- */}
                                        {columns.map(col => {
                                            let value = val[col.key];
                                            if (col.key === "sl_no") value = index + 1;

                                            if (["GRN DATE", "ORDER DATE"].includes(col.key))
                                                value = formatDateTime(value);

                                            if (["GRN RATE", "GRN SELLING RATE", "GRN DIS %", "RATE", "RATE VARIATION", "QUO MARGIN %", "PURCHASE MARGIN %"]
                                                .includes(col.key))
                                                value = Number(value).toFixed(4);
                                            const isMarginColumn =
                                                col.key.includes("QUO MARGIN") ||
                                                col.key.includes("PURCHASE MARGIN");

                                            const bgColor =
                                                isRed && !isMarginColumn          // red only for non-margin columns
                                                    ? red
                                                    : col.key.includes("GRN") ?
                                                        "#D3E0DC"
                                                        : col.key.includes("ITEM") ?
                                                            "#D3E0DC"
                                                            : isMarginDiff && isMarginColumn
                                                                ? "#EEF1FF"
                                                                : "white";
                                            return (
                                                <Typography
                                                    key={col.key}
                                                    sx={{
                                                        width: col.width,
                                                        fontSize: 14,
                                                        backgroundColor: bgColor,
                                                        textAlign: col.align
                                                    }}
                                                >
                                                    {value}
                                                </Typography>
                                            );
                                        })}
                                    </Box>
                                );
                            }}
                        />
                    </Box>
                </Box>
            </Paper>
        </CardCloseOnly>
    )
}

export default memo(GrnReport)


