import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
import CardCloseOnly from '../Components/CardCloseOnly'
import { Paper } from '@mui/material'
import { Box, IconButton, Input, Option, Select, Tooltip, Typography } from '@mui/joy'
import * as XLSX from 'xlsx'
import { formatDateTime } from './StoreCommonCode/CommonStyle'
import { Virtuoso } from 'react-virtuoso'
import { useQuery } from '@tanstack/react-query'
import CommonDateFeilds from './StoreCommonCode/CommonDateFeilds'
import { ratevariationResolved } from './CommonApiFun'
import { format } from 'date-fns'
import RefreshIcon from '@mui/icons-material/Refresh';
import { RiFileExcel2Fill } from 'react-icons/ri'


const RateVariationResolved = ({ setActiveComponent }) => {
    const [selected, setSelected] = useState("0");
    const [searchValue, setSearchValue] = useState("");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const columns = [
        { key: "sl_no", label: "Sl No", width: 100, align: "center" },
        { key: "grn_no", label: "GRN No", width: 100, align: "center" },
        { key: "grn_date", label: "GRN Date", width: 115, align: "center" },
        { key: "item_name", label: "Item Name", width: 220, align: "left" },
        { key: "grn_rate", label: "GRN Rate", width: 100, align: "right" },
        { key: "grn_selling_rate", label: "GRN Selling Rate", width: 135, align: "right" },
        { key: "grn_dis", label: "GRN Dis%", width: 110, align: "center" },
        { key: "rate", label: "Rate", width: 90, align: "right" },
        { key: "disc", label: "Disc %", width: 100, align: "center" },
        { key: "supplier_name", label: "Supplier name", width: 300, align: "center" },
        { key: "rate_variation", label: "Rate Variation", width: 100, align: "center" },
        { key: "quo_margin", label: "Quo Margin%", width: 120, align: "center" },
        { key: "purchase_margin", label: "Purchase Margin%", width: 135, align: "center" },
        { key: "margin_diff", label: "Margin Diff", width: 120, align: "center" },
        { key: "grn_variation_qty", label: "GRN Variation Qty", width: 135, align: "center" },
        { key: "grn_variation_free", label: "GRN Variation Free", width: 130, align: "center" },
        { key: "date_diff", label: "Date Diff", width: 120, align: "center" },
        { key: "disc_variation", label: "Disc Variation", width: 120, align: "center" },

    ];

    const backToSetting = useCallback(() => {
        setActiveComponent(0)
    }, [setActiveComponent])

    const {
        data: ResolvedDatas,
    } = useQuery({
        queryKey: 'getrateResolved',
        queryFn: () => ratevariationResolved(),
        staleTime: Infinity
    })

    const onExportClick = () => {
        if (ResolvedDatas.length === 0) {
            alert("No data available to export");
            return;
        }

        const exportData = ResolvedDatas.map((item, index) => ({
            sl_no: index + 1,
            grn_no: item["grn_no"],
            grn_date: item["grn_date"],
            item_name: item["item_name"],
            grn_rate: item["grn_rate"],
            grn_selling_rate: item["grn_selling_rate"],
            grn_dis: item["grn_dis"],
            rate: item["rate"],
            dis_percent: item["disc"],
            rate_variation: item["rate_variation"],
            quo_margin_percent: item["quo_margin"],
            purchase_margin_percent: item["purchase_margin"],
            margin_difference: item["margin_diff"],
            grn_variation_qty: item["grn_variation_qty"],
            grn_variation_free: item["grn_variation_free"],
            date_diff: item["date_diff"],
            discount_variation: item["disc_variation"],
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "RateVariationResolved");
        XLSX.writeFile(workbook, "Rate_Variation_Resolved.xlsx");
    };

    const filtered = useMemo(() => {
        let result = ResolvedDatas || [];
        // Search by GRN number
        if (searchValue.trim()) {
            if (selected === "1") {
                result = result.filter(val =>
                    val?.grn_no?.toString() === searchValue.trim()
                );
            }
        }
        // Filter by date range
        else if (fromDate && toDate) {
            result = result.filter(val => {
                const grnDate = format(new Date(val.grn_date), "yyyy-MM-dd");
                return grnDate >= fromDate && grnDate <= toDate;
            });
        }

        return result;
    }, [searchValue, selected, ResolvedDatas, fromDate, toDate]);


    const RefreshData = useCallback(() => {
        // setRefresh(1)
        setFromDate(null)
        setToDate(null)
    }, [setFromDate, setToDate])

    return (
        <Fragment>

            <CardCloseOnly title="Rate Variation Resolved" close={backToSetting}>
                <Paper sx={{ width: '100%' }}>

                    {/* TOP FILTER SECTION */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 1, p: 1 }}>

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
                            <Tooltip title="Refresh" >
                                <IconButton
                                    onClick={RefreshData}
                                    size="sm"
                                    sx={{
                                        border: '1px solid #756AB6',
                                        p: 0,
                                        borderRadius: 1,
                                        display: 'flex',
                                        // gap: 0.5,


                                    }}
                                >
                                    <RefreshIcon
                                        color="#756AB6"
                                    />
                                </IconButton>
                            </Tooltip>
                        </Box>

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
                                    const quo = Number(val["quo_margin"]);
                                    const pur = Number(val["purchase_margin"]);
                                    const marginDiff = Number(val["margin_diff"]);
                                    const isPositiveMarginDiff = marginDiff > 0 && quo > pur;

                                    return (
                                        <Box display="flex" sx={{ borderBottom: "1px solid lightgrey" }}>
                                            {/* --- map using columns array to avoid mistakes --- */}
                                            {columns.map(col => {
                                                let value = val[col.key];
                                                if (col.key === "sl_no") value = index + 1;
                                                if (["grn_date"].includes(col.key))
                                                    value = formatDateTime(value);

                                                if (["grn_selling_rate", "grn_dis", "rate", "rate_variation", "quo_margin", "purchase_margin", "margin_diff"]
                                                    .includes(col.key))
                                                    value = Number(value).toFixed(4);
                                                const bgColor =
                                                    col.key === "margin_diff" && isPositiveMarginDiff
                                                        ? "#F6DFEB"
                                                        : val.status === 1 ? "#F5FAE1"  // light red only when diff is positive
                                                            : "white";

                                                return (
                                                    <Box
                                                        key={col.key}
                                                        sx={{
                                                            width: col.width,
                                                            display: "flex",
                                                            justifyContent: col.align === 'right' ? 'flex-end' :
                                                                col.align === 'center' ? 'center' : 'flex-start',
                                                            alignItems: "center",
                                                            backgroundColor: bgColor,
                                                            fontSize: 14
                                                        }}
                                                    >
                                                        {
                                                            col.key === "margin_diff" ? (

                                                                <IconButton >
                                                                    <Box sx={{ width: 100, borderRadius: 3, bgcolor: bgColor, border: 1, borderColor: "#8CA9FF" }}
                                                                    >
                                                                        {val.margin_diff}

                                                                    </Box>
                                                                </IconButton>
                                                            )
                                                                : (
                                                                    value
                                                                )
                                                        }
                                                    </Box>
                                                );
                                            })}
                                        </Box>
                                    );
                                }}
                            />
                        </Box>
                    </Box>
                </Paper>
            </CardCloseOnly >
        </Fragment >


    )
}

export default memo(RateVariationResolved) 