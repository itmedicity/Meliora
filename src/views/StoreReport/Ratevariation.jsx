import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
import CardCloseOnly from '../Components/CardCloseOnly'
import { Paper } from '@mui/material'
import { Box, IconButton, Input, Option, Select, Tooltip, Typography } from '@mui/joy'
import * as XLSX from 'xlsx'
import { formatDateTime } from './StoreCommonCode/CommonStyle'
import { Virtuoso } from 'react-virtuoso'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getRateVariationComments, getStoreUserRights, getVarationData } from './CommonApiFun'
import { useSelector } from 'react-redux'
import CommentModalAction from './CommentModalAction'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { axioslogin } from '../Axios/Axios'
import { succesNotify, warningNotify } from '../Common/CommonCode'

const Ratevariation = ({ setActiveComponent }) => {

    const [selected, setSelected] = useState("0");
    const [searchValue, setSearchValue] = useState("");
    const [openCommentModal, setOpenCommentModal] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedAction, setSelectedAction] = useState("");
    const [showExtraCols, setShowExtraCols] = useState(false);
    const [checkResolved, setCheckResolved] = useState(null);

    const loginId = useSelector(state => state.LoginUserData.empid)

    const empdept = useSelector(state => state.LoginUserData.empdeptname)

    const empdept_id = useSelector(state => state.LoginUserData?.empdept)


    const queryClient = useQueryClient()

    const OncloseModalFun = useCallback(() => {
        setOpenCommentModal(false)
        setSelectedRow(null)
        setCommentText(null)
        setCheckResolved(null)
    }, [setOpenCommentModal, setSelectedRow, setCommentText, setCheckResolved])

    const mainColumns = [
        { fontWeight: 350, key: "sl_no", label: "Sl No", width: 100, align: "center" },
        { fontWeight: 350, key: "comments", label: "Status", width: 250, align: "center" },
        { fontWeight: 350, key: "grn_no", label: "GRN No", width: 110, align: "center" },
        { fontWeight: 350, key: "supplier_name", label: "Supplier name", width: 300, align: "left" },
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
        { fontWeight: 500, key: "variation_amount", label: "Variation_Amount", width: 200, align: "right" },
        { fontWeight: 500, key: "grn_rate", label: "GRN Rate", width: 100, align: "right" },
        { fontWeight: 500, key: "grn_selling_rate", label: "GRN Selling Rate", width: 135, align: "right" },
        { fontWeight: 500, key: "grn_dis", label: "GRN Dis%", width: 110, align: "center" },
        { fontWeight: 500, key: "rate", label: "PO Rate", width: 90, align: "right" },
        { fontWeight: 500, key: "po_mrp", label: "Po Selling Rate", width: 135, align: "right" },
        { fontWeight: 500, key: "disc", label: "Disc %", width: 100, align: "center" },
        { fontWeight: 500, key: "grn_variation_qty", label: "GRN Variation Qty", width: 135, align: "center" },
        { fontWeight: 500, key: "grn_variation_free", label: "GRN Variation Free", width: 130, align: "center" },
        { fontWeight: 500, key: "disc_variation", label: "Disc Variation", width: 120, align: "center" },
    ];

    const viewRights = [
        { slno: 1, name: "ACCOUNTS", deptid: 15 },
        { slno: 2, name: "PURCHASE", deptid: 26 },
        { slno: 3, name: "ADMINISTRATION", deptid: 30 }
    ]

    const columns = useMemo(() => {
        return showExtraCols ? [...mainColumns, ...extraColumns] : mainColumns;
    }, [showExtraCols]);


    const backToSetting = useCallback(() => {
        setActiveComponent(0)
    }, [setActiveComponent])

    const { data: RatevarationData } = useQuery({
        queryKey: ['getdefaultdata'],
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

    //rights
    const { data: fetchStoreUserRights } = useQuery({
        queryKey: ["getStoreRights", loginId],
        queryFn: () => getStoreUserRights(loginId),
        enabled: !!loginId,
        staleTime: Infinity
    });

    /* ================= ACTION CONFIG ================= */
    const actionRightsMap = [
        { id: 7, label: "Hold Payment", value: "Hold Payment" },
        { id: 8, label: "New Quot (Rec)", value: "New Quot (Rec)" },
        { id: 9, label: "Proceed Payment Against PO", value: "Proceed Payment Against PO" },
        { id: 10, label: "Hold Purchase", value: "Hold Purchase" },
        { id: 11, label: "Resolved Status", value: "Resolved" },// handled separately
        { id: 12, label: "ED and MD Rights", value: "ED and MD Rights" },
        { id: 13, label: "Proceed Payment Against Bill", value: "Proceed Payment Against Bill" }
    ];

    /* ================= FILTERED RIGHTS ================= */

    const allowedActionButtons = actionRightsMap.filter(
        action =>
            fetchStoreUserRights?.includes(action.id) &&
            action.id !== 11 && action.id !== 12
    );

    const hasResolvedRight = fetchStoreUserRights?.includes(11);
    // const EdMdRights = fetchStoreUserRights?.includes(12);

    const handleOpenComment = useCallback((row) => {
        setSelectedRow(row);
        setOpenCommentModal(true);
    }, []);

    const handleSaveComment = useCallback(async () => {

        let accounts_status = Number(selectedRow?.accounts_status ?? 1);
        let purchase_status = Number(selectedRow?.purchase_status ?? 1);
        let ed_md_status = Number(selectedRow?.ed_md_status ?? 1);

        const hasAction =
            selectedAction !== "" || checkResolved !== null;

        /* ------------------------------------
           CASE 1: NO action & NO resolved
           → Logged dept status = 1
        ------------------------------------ */
        if (!hasAction) {
            if (empdept_id === 15) accounts_status = 1;
            if (empdept_id === 26) purchase_status = 1;
            if (empdept_id === 30) ed_md_status = 1;
        }

        /* ------------------------------------
           CASE 2: Action OR Resolved selected
           → Move to NEXT dept
        ------------------------------------ */
        else {
            accounts_status = 1;
            purchase_status = 1;
            ed_md_status = 1;

            if (empdept_id === 15) {
                purchase_status = 0;
            }
            else if (empdept_id === 26) {
                ed_md_status = 0;
            }
            else if (empdept_id === 30) {
                accounts_status = 0;
            }
        }

        const postComment = {
            grn_no: selectedRow?.grn_no,
            item_name: selectedRow?.item_name,
            comment: commentText,
            Cmt_Dept: empdept,
            rate_variation_slno: selectedRow?.slno,
            loginId: loginId,
            selectedAction: selectedAction !== "" ? selectedAction : checkResolved,
            checkResolved: checkResolved !== null ? 1 : 0,
            accounts_status,
            purchase_status,
            ed_md_status
        };

        const result = await axioslogin.post("RateVariationReport/insertComment", postComment)
        const { success, message } = result.data;
        if (success === 1) {
            succesNotify(message)
            queryClient.invalidateQueries(['getComments'])
            queryClient.invalidateQueries(['getdefaultdata'])
            setCommentText("")
            setSelectedAction("")
            setOpenCommentModal(false)
            setCheckResolved(null)
        } else {
            warningNotify(message)
            setCommentText("")
            setSelectedAction("")
            setOpenCommentModal(false)
            setCheckResolved(null)
        }
    }, [
        selectedRow,
        commentText,
        empdept,
        loginId,
        selectedAction,
        checkResolved,
        empdept_id,
        setCommentText,
        setSelectedAction,
        setOpenCommentModal,
        setCheckResolved
    ]);

    const filtered = useMemo(() => {
        let result = RatevarationData ?? [];
        if (empdept_id === 15) {
            result = result.filter(val => val.accounts_status === 0);
        }
        else if (empdept_id === 26) {
            result = result.filter(val => val.purchase_status === 0);
        }
        else if (empdept_id === 30) {
            result = result.filter(val => val.ed_md_status === 0);
        }

        if (searchValue.trim()) {
            if (selected === "1") {
                result = result.filter(
                    val => val.grn_no?.toString() === searchValue
                );
            }
        }

        return result;
    }, [searchValue, selected, RatevarationData, empdept_id]);


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
            po_rate: item["rate"],
            po_selling_rate: item["po_mrp"],
            dis_percent: item["disc"],
            supplier_name: item["supplier_name"],
            rate_variation: item["rate_variation"],
            variation_amount: item["variation_amount"],
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
            <CardCloseOnly title="Rate Variation Updation" close={backToSetting}>
                <Paper sx={{
                    width: '100%'
                }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 0, p: 1, flexWrap: "wrap" }}>

                        <Box sx={{ display: "flex", gap: 1, alignItems: "center", flex: 1 }}>
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
                        <Box sx={{ display: "flex", flex: 1, justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", mt: 1 }}>
                                <Box sx={{ width: 30, height: 20, bgcolor: "#D1E9F6", border: "1px solid #062535ff", mr: 1, }} />
                                <Typography sx={{ fontSize: 13 }}>Direct Purchase</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ overflowX: "auto", width: "100%", }}>
                        <Box sx={{ minWidth: showExtraCols ? '2650px' : '1500px' }}>
                            <Box
                                display="flex"
                                sx={{ borderBottom: "1px solid grey", background: "#F0F0F0" }}
                            >
                                <Typography sx={{ width: 600, fontWeight: 700, textAlign: "center", }}>
                                </Typography>
                                <Typography sx={{
                                    // width: 1800,
                                    width: 1800, fontWeight: 550, textAlign: "center", backgroundColor: "#E8F5E9" //"#F0F3FF" 
                                }}>
                                    GRN DETAILS
                                </Typography>
                                <Typography sx={{
                                    // width: 1300,
                                    width: 1300, fontWeight: 490, textAlign: "center", backgroundColor: "#E3F2FD"
                                }}>
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
                                                                    backgroundColor: QtnMarginbg ? "#D1E9F6" : "white"
                                                                }}
                                                            >
                                                                {/* <Box
                                                                    sx={{
                                                                        borderRadius: 2,
                                                                        minWidth: 150,
                                                                        textAlign: "center",
                                                                        border: "1px solid #90CAF9",
                                                                        backgroundColor: value === "Payment Proceed" ? "#CAE8BD" : value === "Hold Payment" || value === "New Quot (Rec)" || value === "Hold Purchase" ? "#FFCFCF" : "white",
                                                                        fontSize: 14,
                                                                        color: value ? "black" : "#D32F2F",
                                                                        cursor: "pointer",

                                                                    }}
                                                                >
                                                                    {statusText}
                                                                </Box> */}
                                                                {/* <Tooltip
                                                                    title={val.cmt_description}
                                                                    placement="right"
                                                                    color="primary"
                                                                    size="sm"
                                                                    variant="plain"
                                                                    arrow

                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            borderRadius: 2,
                                                                            minWidth: 150,
                                                                            textAlign: "center",
                                                                            border: "1px solid #90CAF9",
                                                                            backgroundColor:
                                                                                value === "Payment Proceed"
                                                                                    ? "#CAE8BD"
                                                                                    : value === "Hold Payment" ||
                                                                                        value === "New Quot (Rec)" ||
                                                                                        value === "Hold Purchase"
                                                                                        ? "#FFCFCF"
                                                                                        : "white",
                                                                            fontSize: 14,
                                                                            color: value ? "black" : "#D32F2F",
                                                                            cursor: "pointer",
                                                                        }}
                                                                    >
                                                                        {statusText}
                                                                    </Box>
                                                                </Tooltip> */}

                                                                <Tooltip
                                                                    title={val.cmt_description}
                                                                    placement="right"
                                                                    // color="primary"
                                                                    size="sm"
                                                                    variant="outlined"
                                                                    arrow

                                                                    sx={{
                                                                        width: 250,        // ✅ fixed width
                                                                        maxWidth: 250,     // prevents auto resize
                                                                        whiteSpace: "normal",
                                                                        wordBreak: "break-word",
                                                                        fontSize: 13,
                                                                        color: "#524b4fff"
                                                                    }}
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            borderRadius: 2,
                                                                            minWidth: 150,
                                                                            textAlign: "center",
                                                                            // border: "2px solid #90CAF9",
                                                                            border:
                                                                                value === "Payment Proceed"
                                                                                    ? "2px solid #2d4c20a7"
                                                                                    : value === "Hold Payment" ||
                                                                                        value === "New Quot (Rec)" ||
                                                                                        value === "Hold Purchase"
                                                                                        ? "2px solid #862020a9"
                                                                                        : "2px solid #90CAF9",

                                                                            backgroundColor:
                                                                                value === "Payment Proceed"
                                                                                    ? "#CAE8BD"
                                                                                    : value === "Hold Payment" ||
                                                                                        value === "New Quot (Rec)" ||
                                                                                        value === "Hold Purchase"
                                                                                        ? "#FFCFCF"
                                                                                        : "white",
                                                                            fontSize: 14,
                                                                            color: value ? "black" : "#D32F2F",
                                                                            cursor: "pointer",
                                                                        }}
                                                                    >
                                                                        {statusText}
                                                                    </Box>
                                                                </Tooltip>
                                                            </Box>
                                                        );
                                                    }
                                                    if (["grn_date"].includes(col.key)) value = formatDateTime(value);
                                                    if (["grn_selling_rate", "grn_dis", "rate", "rate_variation", "po_mrp"]
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
                        commentsArr={RateVariationComments}
                        setSelectedAction={setSelectedAction}
                        selectedAction={selectedAction}
                        setCheckResolved={setCheckResolved}
                        checkResolved={checkResolved}
                        allowedActionButtons = { allowedActionButtons }
                        hasResolvedRight={hasResolvedRight}
                    /> */}

                    <CommentModalAction
                        open={openCommentModal}
                        onClose={OncloseModalFun}
                        commentText={commentText}
                        setCommentText={setCommentText}
                        onSave={handleSaveComment}
                        selectedRow={selectedRow}
                        commentsArr={RateVariationComments}
                        setSelectedAction={setSelectedAction}
                        selectedAction={selectedAction}
                        setCheckResolved={setCheckResolved}
                        checkResolved={checkResolved}
                        loginId={loginId}
                        allowedActionButtons={allowedActionButtons}
                        hasResolvedRight={hasResolvedRight}
                        // EdMdRights={EdMdRights}
                        RatevarationData={RatevarationData}
                        empdept_id={empdept_id}
                        viewRights={viewRights}

                    />
                </Paper>
            </CardCloseOnly>
        </Fragment >
    )
}
export default memo(Ratevariation)



