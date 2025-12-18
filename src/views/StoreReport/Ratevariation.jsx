import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
import CardCloseOnly from '../Components/CardCloseOnly'
import { Paper } from '@mui/material'
import { Box, Button, IconButton, Input, Option, Select, Typography } from '@mui/joy'
import CusIconButton from '../Components/CusIconButton'
import CustomeToolTip from '../Components/CustomeToolTip'
import * as XLSX from 'xlsx'
import { formatDateTime } from './StoreCommonCode/CommonStyle'
import DownloadIcon from '@mui/icons-material/Download'
import { Virtuoso } from 'react-virtuoso'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getRateVariationComments, getVarationData } from './CommonApiFun'
import { useSelector } from 'react-redux'
import { axioslogin } from '../Axios/Axios'
import { succesNotify, warningNotify } from '../Common/CommonCode'
import RateVariationResolved from './RateVariationResolved'
import CommentModalAction from './CommentModalAction'
import SquareIcon from '@mui/icons-material/Square';

const Ratevariation = ({ setActiveComponent }) => {

    const [selected, setSelected] = useState("0");
    const [searchValue, setSearchValue] = useState("");
    const [openCommentModal, setOpenCommentModal] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);
    const [activeTab, setActiveTab] = useState("Accounts")
    const [selectedAction, setSelectedAction] = useState("");
    const [showResolvelist, setShowResolvelist] = useState(0);
    const [showExtraCols, setShowExtraCols] = useState(false);
    const [checkResolved, setCheckResolved] = useState("");

    const loginId = useSelector(state => state.LoginUserData.empid)

    const queryClient = useQueryClient()

    const OncloseModalFun = () => {
        setOpenCommentModal(false)
        setSelectedRow(null)
        setActiveTab("Accounts")
        setCommentText(null)
    }

    const mainColumns = [
        { fontWeight: 350, key: "sl_no", label: "Sl No", width: 100, align: "center" },
        { fontWeight: 350, key: "comments", label: "Status", width: 250, align: "center" },
        { fontWeight: 350, key: "grn_no", label: "GRN No", width: 110, align: "center" },
        { fontWeight: 350, key: "supplier_name", label: "Supplier name", width: 300, align: "center" },
        { fontWeight: 350, key: "grn_date", label: "GRN Date", width: showExtraCols ? 115 : 180, align: "center" },
        { fontWeight: 350, key: "item_name", label: "Item Name", width: showExtraCols ? 220 : 400, align: "left" },
        { fontWeight: 500, key: "date_diff", label: "Lead Time", width: 120, align: "center" },
        { fontWeight: 500, key: "rate_variation", label: "Rate Variation", width: 150, align: "center" },
        { fontWeight: 500, key: "quo_margin", label: "Quo Margin%", width: 150, align: "center" },
        { fontWeight: 500, key: "po_margin", label: "Po Margin%", width: 150, align: "center" },
        { fontWeight: 500, key: "purchase_margin", label: "Grn Margin%", width: 155, align: "center" },
        { fontWeight: 500, key: "margin_diff", label: "Margin Diff", width: showExtraCols ? 120 : 170, align: "center" },
    ];

    const extraColumns = [

        { fontWeight: 500, key: "grn_rate", label: "GRN Rate", width: 100, align: "right" },
        { fontWeight: 500, key: "grn_selling_rate", label: "GRN Selling Rate", width: 135, align: "right" },
        { fontWeight: 500, key: "grn_dis", label: "GRN Dis%", width: 110, align: "center" },
        { fontWeight: 500, key: "rate", label: "PO Rate", width: 90, align: "right" },
        { fontWeight: 500, key: "disc", label: "Disc %", width: 100, align: "center" },
        { fontWeight: 500, key: "grn_variation_qty", label: "GRN Variation Qty", width: 135, align: "center" },
        { fontWeight: 500, key: "grn_variation_free", label: "GRN Variation Free", width: 130, align: "center" },
        { fontWeight: 500, key: "disc_variation", label: "Disc Variation", width: 120, align: "center" },

    ];

    const columns = useMemo(() => {
        return showExtraCols ? [...mainColumns, ...extraColumns] : mainColumns;
    }, [showExtraCols]);

    const backToSetting = useCallback(() => {
        setActiveComponent(0)
    }, [setActiveComponent])

    const { data: RatevarationData } = useQuery({
        queryKey: 'getdefaultdata',
        queryFn: () => getVarationData(),
        staleTime: Infinity
    })

    const slno = useMemo(() => selectedRow?.slno, [selectedRow]);

    const { data: RateVariationComments } = useQuery({
        queryKey: ['getComments', slno],
        queryFn: () => getRateVariationComments(slno),
        staleTime: Infinity,
        enabled: !!slno
    })

    const handleOpenComment = useCallback((row) => {
        setSelectedRow(row);
        setOpenCommentModal(true);
    }, []);

    const handleSaveComment = useCallback(async () => {
        const postComment = {
            grn_no: selectedRow?.grn_no,
            item_name: selectedRow?.item_name,
            comment: commentText,
            Cmt_Dept: activeTab,
            rate_variation_slno: selectedRow?.slno,
            loginId: loginId,
            selectedAction: selectedAction !== '' ? selectedAction : checkResolved,
            checkResolved: checkResolved !== "" ? 1 : 0
        }
        const result = await axioslogin.post("RateVariationReport/insertComment", postComment)
        const { success, message } = result.data;
        if (success === 1) {
            succesNotify(message)
            queryClient.invalidateQueries('getComments');
            setCommentText("")
            setActiveTab("Accounts")
            setSelectedAction("")
            setOpenCommentModal(false)
        } else {
            warningNotify(message)
            setCommentText("")
            setActiveTab("Accounts")
            setSelectedAction("")
            setOpenCommentModal(false)
        }
    }, [selectedRow, commentText, activeTab, loginId, queryClient, selectedAction, checkResolved])

    const ViewResolvedList = useCallback(() => {
        setShowResolvelist(1)
    }, [])

    const filtered = useMemo(() => {
        let result = RatevarationData;
        if (searchValue.trim()) {
            if (selected === "1") {
                result = result?.filter(val =>
                    val["grn_no"]?.toString() === searchValue
                );
            }
        }
        return result;
    }, [searchValue, selected, RatevarationData]);


    const onExportClick = () => {
        if (RatevarationData.length === 0) {
            alert("No data available to export"); return;
        }
        const exportData = RatevarationData.map((item, index) => ({
            sl_no: index + 1, grn_no: item["grn_no"],
            status: item["comments"],
            grn_date: item["grn_date"],
            item_name: item["item_name"],
            grn_rate: item["grn_rate"],
            grn_selling_rate: item["grn_selling_rate"],
            grn_dis: item["grn_dis"],
            rate: item["rate"],
            dis_percent: item["disc"],
            supplier_name: item["supplier_name"],
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
        XLSX.utils.book_append_sheet(workbook, worksheet, "RateVariationUpdation");
        XLSX.writeFile(workbook, "Rate_Variation_Updation.xlsx");
    };

    const handleShowMore = () => {
        setShowExtraCols(true);
    };

    const handleShowLess = () => {
        setShowExtraCols(false);
    };
    return (
        <Fragment>
            {showResolvelist === 1 ?
                <RateVariationResolved setShowResolvelist={setShowResolvelist} /> :
                <CardCloseOnly title="Rate Variation Updation" close={backToSetting}>
                    <Paper sx={{
                        width: '100%'
                    }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 1, p: 1 }}>

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

                                <CustomeToolTip title="Download Excel">
                                    <CusIconButton variant="soft" color="success" onClick={onExportClick}>
                                        <DownloadIcon />
                                        Download
                                    </CusIconButton>
                                </CustomeToolTip>
                                <Box>
                                    <Box sx={{ display: "flex", mt: 0.1 }}>
                                        <SquareIcon sx={{ color: "#D1E9F6" }} />
                                        <Typography>Direct Purchase</Typography>
                                    </Box>

                                </Box>
                            </Box>


                            <Box>
                                <Button sx={{ backgroundColor: "#926FB1", p: 0.5, color: "white" }} onClick={ViewResolvedList}>
                                    Go to Resolved List
                                </Button>
                            </Box>
                        </Box>

                        <Box sx={{ overflowX: "auto", width: "100%", }}>
                            <Box sx={{ minWidth: showExtraCols ? '2500px' : '1200px' }}>
                                <Box
                                    display="flex"
                                    sx={{ borderBottom: "1px solid grey", background: "#F0F0F0" }}
                                >
                                    <Typography sx={{ width: 280, fontWeight: 700, textAlign: "center", }}>
                                    </Typography>
                                    <Typography sx={{
                                        width: 590, fontWeight: 550, textAlign: "center", backgroundColor: "#E8F5E9" //"#F0F3FF" 
                                    }}>
                                        GRN DETAILS
                                    </Typography>
                                    <Typography sx={{ width: 530, fontWeight: 490, textAlign: "center", backgroundColor: "#E3F2FD" }}>
                                        PURCHASE ORDER
                                    </Typography>
                                    {
                                        !showExtraCols ?
                                            <Typography
                                                sx={{
                                                    width: 320,
                                                    fontWeight: 700,
                                                    textAlign: "right",
                                                    backgroundColor: "#E8F5E9",
                                                    cursor: "pointer",
                                                    pr: 2,
                                                    "&:hover": { backgroundColor: "#C8E6C9" }
                                                }}
                                                onClick={handleShowMore}
                                            >
                                                More &gt;&gt;
                                            </Typography>
                                            :
                                            <Typography
                                                sx={{
                                                    width: 920,
                                                    fontWeight: 700,
                                                    textAlign: "right",
                                                    backgroundColor: "#E8F5E9",
                                                    cursor: "pointer",
                                                    pr: 2,
                                                    "&:hover": { backgroundColor: "#C8E6C9" }
                                                }}
                                                onClick={handleShowLess}
                                            >
                                                &lt;&lt; Less
                                            </Typography>
                                    }

                                </Box>
                                <Box sx={{ minWidth: `${columns.length * 120}px` }}>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            p: 1,
                                            bgcolor: "#F0F0F0",
                                            position: "sticky",
                                            top: 0,
                                            zIndex: 2,
                                            borderBottom: "1px solid lightgrey"
                                        }}
                                    >
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


                                    <Virtuoso
                                        style={{ height: "63vh", width: "100%", }}
                                        data={filtered}
                                        itemContent={(index, val) => {
                                            const quo = Number(val["quo_margin"]);
                                            const pur = Number(val["purchase_margin"]);
                                            const quoround = Math.round(Number(val["quo_margin"]));
                                            const purround = Math.round(Number(val["purchase_margin"]));
                                            const margin = Math.round(Number(val["margin_diff"]));
                                            const isPositiveMarginDiff = quo > pur;
                                            const isPositivemargin = quoround > purround
                                            const isneativemargin = quoround < purround
                                            const margindiff = margin > 1
                                            const margindiffpositive = margin < 0
                                            const QtnMarginbg = quoround === 0

                                            return (
                                                <Box display="flex" sx={{ borderBottom: "1px solid lightgrey" }}>
                                                    {columns.map(col => {
                                                        let value = val[col.key];
                                                        if (col.key === "sl_no") value = index + 1;
                                                        if (col.key === "comments") {
                                                            value = value ? value : "Not Updated";
                                                        }
                                                        if (col.key === "comments") {
                                                            const statusText = value ? value : "Not Updated";

                                                            return (
                                                                <Box
                                                                    key={col.key}
                                                                    sx={{
                                                                        width: col.width,
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                        alignItems: "center",
                                                                    }}
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            borderRadius: 2,
                                                                            minWidth: 150,
                                                                            textAlign: "center",
                                                                            border: "1px solid #90CAF9",
                                                                            backgroundColor: value === "Payment Proceed" ? "#CAE8BD" : value === "Hold Payment" || value === "New Quot (Rec)" || value === "Hold Purchase" ? "#FFCFCF" : "white",
                                                                            fontSize: 14,
                                                                            color: value ? "black" : "#D32F2F",
                                                                        }}
                                                                    >
                                                                        {statusText}
                                                                    </Box>
                                                                </Box>
                                                            );
                                                        }
                                                        if (["grn_date"].includes(col.key)) value = formatDateTime(value);
                                                        if (["grn_selling_rate", "grn_dis", "rate", "rate_variation"]
                                                            .includes(col.key))
                                                            value = Number(value).toFixed(4);
                                                        if (["quo_margin", "purchase_margin", "po_margin"].includes(col.key)) {
                                                            value = Math.round(value);
                                                        }
                                                        if (["margin_diff"].includes(col.key)) {
                                                            value = Math.round(value);
                                                        }
                                                        const Color =
                                                            col.key === "margin_diff" ? (isPositiveMarginDiff && margindiff ? "#c73580ff" : margindiffpositive ? "#085024dd" : "black")


                                                                : col.key === "purchase_margin"
                                                                    ? (
                                                                        isPositiveMarginDiff && isPositivemargin
                                                                            ? "#bc170ba9"
                                                                            : isneativemargin ? "green"

                                                                                : "black"
                                                                    )
                                                                    : col.key === "quo_margin"
                                                                        ? (
                                                                            isPositiveMarginDiff && isPositivemargin
                                                                                ? "#bc170ba9"
                                                                                : isneativemargin ? "green"
                                                                                    : "black"
                                                                        )
                                                                        : col.key === "rate_variation"
                                                                            ? (
                                                                                isPositiveMarginDiff && isPositivemargin
                                                                                    ? "#bc170ba9"
                                                                                    : isneativemargin ? "green"
                                                                                        : "black"
                                                                            )

                                                                            : col.key === "po_margin"
                                                                                ? (
                                                                                    isPositiveMarginDiff && isPositivemargin
                                                                                        ? "#bc170ba9"
                                                                                        : isneativemargin ? "green"
                                                                                            : "black"
                                                                                )
                                                                                :
                                                                                QtnMarginbg ? "#D1E9F6" : "black";


                                                        const bgColor = QtnMarginbg ? "#D1E9F6" : "white";

                                                        const btmBrClr = col.key === "margin_diff" ? (isPositiveMarginDiff && margindiff ? "#c73580ff" : margindiffpositive ? "#085024dd" : "#8CA9FF") : "white";

                                                        return (
                                                            <Box
                                                                key={col.key}
                                                                sx={{
                                                                    width: col.width,
                                                                    display: "flex",
                                                                    justifyContent: col.align === 'right'
                                                                        ? 'flex-end'
                                                                        : col.align === 'center'
                                                                            ? 'center'
                                                                            : 'flex-start',
                                                                    alignItems: "center",
                                                                    backgroundColor: bgColor,
                                                                    color: QtnMarginbg ? "black" : Color,
                                                                    fontSize: 14,
                                                                    fontWeight: col.fontWeight
                                                                }}
                                                            >
                                                                {col.key === "margin_diff" ?
                                                                    (<IconButton >
                                                                        <Box
                                                                            sx={{
                                                                                width: 100,
                                                                                borderRadius: 3,
                                                                                bgcolor: bgColor,
                                                                                color: Color,
                                                                                border: 1,
                                                                                borderColor: btmBrClr
                                                                            }}
                                                                            onClick={() => handleOpenComment(val)}
                                                                        >
                                                                            {Math.abs(Number(val.margin_diff))}

                                                                        </Box>
                                                                    </IconButton>
                                                                    )
                                                                    : value}
                                                            </Box>
                                                        );
                                                    })}
                                                </Box>
                                            );
                                        }}
                                    />


                                </Box>
                            </Box>
                        </Box>
                        {/* comment modal  with comment section */}
                        {/* <CommentModal
                            open={openCommentModal}
                            onClose={OncloseModalFun}
                            commentText={commentText}
                            setCommentText={setCommentText}
                            onSave={handleSaveComment}
                            selectedRow={selectedRow}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            commentsArr={RateVariationComments}
                            setSelectedAction={setSelectedAction}
                            selectedAction={selectedAction}
                            setCheckResolved={setCheckResolved}
                            checkResolved={checkResolved}
                        /> */}

                        <CommentModalAction
                            open={openCommentModal}
                            onClose={OncloseModalFun}
                            commentText={commentText}
                            setCommentText={setCommentText}
                            onSave={handleSaveComment}
                            selectedRow={selectedRow}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            commentsArr={RateVariationComments}
                            setSelectedAction={setSelectedAction}
                            selectedAction={selectedAction}
                            setCheckResolved={setCheckResolved}
                            checkResolved={checkResolved}
                        />
                    </Paper>
                </CardCloseOnly>
            }
        </Fragment >
    )
}
export default memo(Ratevariation)



