
import React, { memo, useCallback, useMemo, useState } from 'react'
import CardCloseOnly from '../Components/CardCloseOnly'
import { IconButton, Paper } from '@mui/material'
import { Box, Button, Input, Option, Select, Typography, Tooltip } from '@mui/joy'
import CommonDateFeilds from './StoreCommonCode/CommonDateFeilds'
import { axiosellider, axioslogin } from '../Axios/Axios'
import * as XLSX from 'xlsx'
import { formatDateTime } from './StoreCommonCode/CommonStyle'
import { IoSearchSharp } from "react-icons/io5";
import { Virtuoso } from 'react-virtuoso'
import { useSelector } from 'react-redux'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getVarationData } from './CommonApiFun'
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { format } from 'date-fns'
import { succesNotify, warningNotify } from '../Common/CommonCode'
import { RiFileExcel2Fill } from 'react-icons/ri'

const columns = [
    { key: "sl_no", label: "Sl_No", width: 200, align: "center" },
    { key: "GRN NO", label: "GRN_No", width: 200, align: "center" },
    { key: "SUC_NAME", label: "Suc_Name", width: 500, align: "left" },
    { key: "GRN DATE", label: "GRN_Date", width: 200, align: "center" },
    { key: "ITEM NAME", label: "Item_Name", width: 500, align: "left" },
    { key: "GRN RATE", label: "GRN_Rate", width: 230, align: "right" },
    { key: "GRN SELLING RATE", label: "GRN_Selling_Rate", width: 200, align: "right" },
    { key: "PO_MRP", label: "Po_Mrp", width: 200, align: "right" },
    { key: "GRN DIS %", label: "GRN_Dis%", width: 200, align: "right" },
    { key: "RATE", label: "Rate", width: 200, align: "right" },
    { key: "DIS %", label: "Disc %", width: 200, align: "right" },
    { key: "PO MARGIN %", label: "PO_Margin%", width: 200, align: "right" },
    { key: "RATE VARIATION", label: "Rate_Variation", width: 200, align: "right" },
    { key: "QUO MARGIN %", label: "Quo_Margin%", width: 200, align: "right" },
    { key: "PURCHASE MARGIN %", label: "Purchase_Margin%", width: 200, align: "right" },
    { key: "MARGIN_DIFF", label: "Margin_Diff", width: 200, align: "right" },
    { key: "VARI_AMT", label: "Variation_Amount", width: 200, align: "right" },
    { key: "DATA PUSH", label: "Data_Push", width: 200, align: "center" },
    { key: "GRN VARIATION QTY", label: "GRN_Variation_Qty", width: 200, align: "right" },
    { key: "GRN VARIATION FREE", label: "GRN_Variation_Free", width: 200, align: "right" },
    { key: "DATE_DIFF", label: "Date_Diff", width: 200, align: "right" },
    { key: "DISCOUNT VARIATION", label: "Disc_Variation", width: 200, align: "right" },
    { key: "COMMENTS", label: "Comments", width: 80, align: "right" },
];


const RateVariationUpdation = ({ setActiveComponent }) => {

    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [GrmData, setGrmData] = useState([]);
    const [selected, setSelected] = useState("0");
    const [searchValue, setSearchValue] = useState("");
    const [variationType, setVariationType] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);

    const loginId = useSelector(state => state.LoginUserData.empid)
    const queryClient = useQueryClient()

    const getRowKey = (row) =>
        `${row["GRN NO"]}-${row["ITEM NAME"]}`;

    const backToSetting = useCallback(() => {
        setActiveComponent(0)
    }, [setActiveComponent])

    const filterParams = useMemo(() => ({
        fromDate,
        toDate
    }), [fromDate, toDate]);

    const { data: RatevarationData } = useQuery({
        queryKey: 'getdefaultdata',
        queryFn: () => getVarationData(),
        staleTime: Infinity
    })

    // ✅ Manual toggle only (no auto select)
    const handleCheckboxChange = (row) => {
        const key = getRowKey(row);
        setSelectedRows(prev => {
            const exists = prev.some(r => getRowKey(r) === key);
            return exists
                ? prev.filter(r => getRowKey(r) !== key)
                : [...prev, row];
        });
    };

    const FetchData = useCallback(async () => {
        const result = await axiosellider.post('/storeReport/getGrmDetails', filterParams)
        const { success, data } = result.data
        if (success === 2) {
            // const filteredData = Array.isArray(data)
            //     ? data?.map(val => ({
            //         ...val,
            //         MARGIN_DIFF:
            //             Number(val["QUO MARGIN %"]) === 0
            //                 ? Number(val["PURCHASE MARGIN %"]) - Number(val["PO MARGIN %"])
            //                 : Number(val["QUO MARGIN %"]) - Number(val["PURCHASE MARGIN %"]),
            //         VARI_AMT:
            //             Number(val["GRN QTY"]) * Number(val["RATE VARIATION"])
            //     }))
            //     : [];

            // setGrmData(filteredData);


            const filteredData = Array.isArray(data)
                ? data
                    .filter(val => Number(val["RATE VARIATION"]) !== 0)
                    .map(val => ({
                        ...val,
                        MARGIN_DIFF:
                            Number(val["QUO MARGIN %"]) === 0
                                ? Number(val["PURCHASE MARGIN %"]) - Number(val["PO MARGIN %"])
                                : Number(val["QUO MARGIN %"]) - Number(val["PURCHASE MARGIN %"]),
                        VARI_AMT:
                            Number(val["GRN QTY"]) * Number(val["RATE VARIATION"]),
                    }))
                : [];

            setGrmData(filteredData);


        } else {
            setGrmData([])
        }
    }, [filterParams])

    const grmDataWithStatus = useMemo(() => {
        const variationArray = Array.isArray(RatevarationData) ? RatevarationData : [];
        return GrmData?.map(val => {
            const exists = variationArray?.some(r =>
                Number(r?.grn_no) === Number(val["GRN NO"]) &&
                String(r?.item_name).trim().toLowerCase() ===
                String(val["ITEM NAME"]).trim().toLowerCase()
            );
            return { ...val, status: exists ? 1 : 0 };
        });
    }, [GrmData, RatevarationData]);

    const filtered = useMemo(() => {
        let result = grmDataWithStatus;

        if (searchValue.trim() && selected === "1") {
            result = result.filter(val =>
                val["GRN NO"]?.toString() === searchValue
            );
        }

        if (variationType === 1) {
            result = result.filter(
                val => val["RATE VARIATION"] > 0 && val["MARGIN_DIFF"] === 0
            );
        }

        return result;
    }, [searchValue, selected, grmDataWithStatus, variationType]);


    const InsertDatas = useCallback(async () => {
        if (!selectedRows.length) return;

        const insertVal = selectedRows.map(val => ({
            grn_no: val["GRN NO"],
            grn_date: format(new Date(val["GRN DATE"]), "yyyy-MM-dd"),
            item_name: val["ITEM NAME"],
            grn_rate: val["GRN RATE"],
            grn_selling_rate: val["GRN SELLING RATE"],
            po_mrp: val["PO_MRP"],
            grn_dis: val["GRN DIS %"],
            rate: val["RATE"],
            disc: val["DIS %"],
            rate_variation: val["RATE VARIATION"],
            quo_margin: val["QUO MARGIN %"],
            purchase_margin: val["PURCHASE MARGIN %"],
            margin_diff: val["MARGIN_DIFF"],
            grn_variation_qty: val["GRN VARIATION QTY"],
            grn_variation_free: val["GRN VARIATION FREE"],
            date_diff: val["DATE_DIFF"],
            disc_variation: val["DISCOUNT VARIATION"],
            create_user: loginId,
            po_margin: val["PO MARGIN %"],
            suplier_name: val["SUC_NAME"],
            Variation_Amount: val["VARI_AMT"],
        }));
        try {
            const result = await axioslogin.post(
                'RateVariationReport/insertRateVariationBulk',
                insertVal
            );

            if (result.data.success === 1) {
                queryClient.invalidateQueries('getdefaultdata');
                succesNotify(result.data.message);
                setSelectedRows([]);
            } else {
                warningNotify(result.data.message);
            }
        } catch {
            warningNotify('Something went wrong');
            setSelectedRows([]);
        }
    }, [selectedRows, loginId, queryClient]);


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
            po_mrp: item["PO_MRP"],
            grn_dis: item["GRN DIS %"],
            rate: item["RATE"],
            dis_percent: item["DIS %"],
            suplier_name: item["SUC_NAME"],
            po_margin: item["PO MARGIN %"],
            rate_variation: item["RATE VARIATION"],
            Variation_Amount: item["VARI_AMT"],
            quo_margin_percent: item["QUO MARGIN %"],
            purchase_margin_percent: item["PURCHASE MARGIN %"],
            margin_difference: item["MARGIN_DIFF"], //******** */
            grn_variation_qty: item["GRN VARIATION QTY"],
            grn_variation_free: item["GRN VARIATION FREE"],
            date_diff: item["DATE_DIFF"],
            discount_variation: item["DISCOUNT VARIATION"],
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "RateVariation");
        XLSX.writeFile(workbook, "Rate_Variation.xlsx");
    };



    return (
        <CardCloseOnly title="Rate Variation" close={backToSetting}>
            <Paper sx={{ width: '100%' }}>
                {/* TOP FILTER SECTION */}
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 1, p: 1, flexWrap: "wrap" }}>                     <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>                         <CommonDateFeilds
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
                    {/* </Tooltip> */}

                    <Select value={variationType} onChange={(e, newValue) => setVariationType(newValue)} size="sm"
                        sx={{ width: 200 }}>
                        <Option value={0}>All Records</Option>
                        <Option value={1}>Rate Variation with Margin_Diff</Option>

                    </Select>

                    <Button
                        onClick={InsertDatas}
                        size="sm"
                        sx={{
                            width: { xs: 100, sm: 120 },
                            border: '1px solid',
                            borderColor: 'green',
                            backgroundColor: '#756AB6',
                            p: 0.5,
                            borderRadius: 1,
                            display: 'flex',
                            gap: 0.5,

                            '&:hover': {
                                backgroundColor: '#756AB6', // same as normal
                                borderColor: 'green',
                            },
                        }}
                    >
                        <UpgradeIcon sx={{ color: '#E8F5E9' }} />
                        <Typography sx={{ fontSize: 13, fontWeight: 400, color: '#E8F5E9' }}>
                            Data Push
                        </Typography>
                    </Button>
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
                    <Box sx={{ width: `${columns.length * 150}px` }}>
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
                                const quo = Number(val["QUO MARGIN %"]);
                                const pur = Number(val["PURCHASE MARGIN %"]);
                                const marginDiff = Number(val["MARGIN_DIFF"]);
                                const isPositiveMarginDiff = marginDiff > 0 && quo > pur;

                                return (
                                    <Box display="flex" sx={{ borderBottom: "1px solid lightgrey" }}>
                                        {/* --- map using columns array to avoid mistakes --- */}
                                        {columns.map(col => {
                                            let value = val[col.key];
                                            if (col.key === "sl_no") value = index + 1;
                                            if (["GRN DATE"].includes(col.key))
                                                value = formatDateTime(value);

                                            if (["GRN RATE", "GRN SELLING RATE", "GRN DIS %", "RATE", "RATE VARIATION", "PO MARGIN %", "QUO MARGIN %", "PURCHASE MARGIN %", "MARGIN_DIFF", "VARI_AMT", "PO_MRP"]
                                                .includes(col.key))
                                                value = Number(value).toFixed(4);
                                            // const bgColor =
                                            //     col.key === "MARGIN_DIFF" && isPositiveMarginDiff
                                            //         ? "#F6DFEB"
                                            //         : val.status === 1 ? "#F5FAE1"
                                            //             : "white";
                                            const bgColor =
                                                col.key === "VARI_AMT"
                                                    ? "#FFCDC9"
                                                    : col.key === "MARGIN_DIFF" && isPositiveMarginDiff
                                                        ? "#F6DFEB"
                                                        : val.status === 1
                                                            // ? "#F5FAE1"
                                                            ? "#D8E983"
                                                            : "white";

                                            return (
                                                <Box
                                                    key={col.key}
                                                    sx={{
                                                        width: col.width,
                                                        display: "flex",
                                                        justifyContent: col.align,
                                                        // === 'right' ? 'flex-end' :
                                                        // col.align === 'center' ? 'center' : 'flex-start',
                                                        alignItems: "center",
                                                        backgroundColor: bgColor,
                                                        fontSize: 14
                                                    }}
                                                >
                                                    {/* COMMENTS COLUMN BUTTON */}
                                                    {
                                                        col.key === "DATA PUSH" ? (
                                                            <input
                                                                disabled={val.status === 1}
                                                                type="checkbox"
                                                                checked={selectedRows.some(
                                                                    r => getRowKey(r) === getRowKey(val)
                                                                )}
                                                                onChange={() => handleCheckboxChange(val)}
                                                            />
                                                        ) : (
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
        </CardCloseOnly>
    )
}

export default memo(RateVariationUpdation)
