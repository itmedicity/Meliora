import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
import CardCloseOnly from '../Components/CardCloseOnly'
import { Paper } from '@mui/material'
import { Box, Button, Input, Option, Select, Typography } from '@mui/joy'
import * as XLSX from 'xlsx'
import DownloadIcon from '@mui/icons-material/Download'
import { Virtuoso } from 'react-virtuoso'
import { useQuery } from '@tanstack/react-query'
import { axiosellider } from '../Axios/Axios'
import { warningNotify } from '../Common/CommonCode'
import { getPendingApprovalQtn } from 'src/api/StoreReports'
import { formatDateTime } from './StoreCommonCode/CommonStyle'
import QuatationModal from './QuatationModal'

const PendingApprovalQuatation = ({ setActiveComponent }) => {

    const [selected, setSelected] = useState("0");
    const [searchValue, setSearchValue] = useState("");
    const [openCommentModal, setOpenCommentModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [quotationDetails, setQuotationDetails] = useState([])

    const OncloseModalFun = () => {
        setOpenCommentModal(false)
        setSelectedRow(null)
        setQuotationDetails([])
    }

    const mainColumns = [
        { fontWeight: 350, key: "sl_no", label: "Sl No", width: 100, align: "center" },
        // { fontWeight: 350, key: "QUC_SLNO", label: "quc_slno", width: 100, align: "center" },
        { fontWeight: 350, key: "QUOTATION DATE", label: "quotation_date", width: 300, align: "center" },
        { fontWeight: 350, key: "QUOTATION #", label: "quotation", width: 250, align: "center" },
        { fontWeight: 350, key: "SUPPLIER", label: "supplier", width: 420, align: "left" },
        { fontWeight: 350, key: "QUOTATION AMOUNT", label: "quotation_amount", width: 110, align: "right" },
        { fontWeight: 350, key: "QUOTATION REMARK", label: "quotation_remark", width: 320, align: "right" },
        // { fontWeight: 500, key: "SU_CODE", label: "su_code", width: 150, align: "center" }
    ];

    const backToSetting = useCallback(() => {
        setActiveComponent(0)
    }, [setActiveComponent])

    const { data: PendingApprovalQtn } = useQuery({
        queryKey: 'getquotationData',
        queryFn: () => getPendingApprovalQtn(),
        staleTime: Infinity
    })

    const filteredqto = useMemo(() => {
        let result = PendingApprovalQtn;
        if (searchValue.trim()) {
            if (selected === "1") {
                result = result?.filter(val =>
                    val["QUOTATION #"]?.toString() === searchValue
                );
            }
        }
        return result;
    }, [searchValue, selected, PendingApprovalQtn]);

    const onExportClick = () => {
        if (PendingApprovalQtn.length === 0) {
            alert("No data available to export"); return;
        }
        const exportData = PendingApprovalQtn.map((item, index) => ({
            sl_no: index + 1,
            quotation: item["QUOTATION #"],
            quotation_amount: item["QUOTATION AMOUNT"],
            quotation_date: item["QUOTATION DATE"],
            quotation_remark: item["QUOTATION REMARK"],
            supplier: item["SUPPLIER"],


        }));
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "PendingApprovalQuotation");
        XLSX.writeFile(workbook, "Pending_Approval_Quotation.xlsx");
    };

    const handleQuotationClick = async (row) => {
        if (!row?.QUC_SLNO) return;
        setOpenCommentModal(true);
        setSelectedRow(row);

        try {
            const QUC_SLNO = row.QUC_SLNO;
            const result = await axiosellider.get(`storeReport/getPurchaseDetails/${QUC_SLNO}`);
            const { success, data, message } = result.data;
            if (success === 1) {
                setQuotationDetails(data);
            } else {
                warningNotify(message || "No data found");
                setQuotationDetails(null);
            }
        } catch (error) {
            warningNotify("Error while fetching quotation details");
            setQuotationDetails(null);
        } finally {
        }
    };

    return (
        <Fragment>
            <CardCloseOnly title="Pending Approval Quotation" close={backToSetting}>
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

                            <Button
                                onClick={onExportClick}
                                size="sm"
                                sx={{
                                    width: { xs: 100, sm: 120 },
                                    border: '1px solid',
                                    borderColor: '#AC87C5',
                                    backgroundColor: '#F5EFFF',
                                    p: 0.5,
                                    borderRadius: 1,
                                    display: 'flex',
                                    gap: 0.5,

                                    '&:hover': {
                                        backgroundColor: '#F5EFFF', // same as normal
                                        borderColor: '#AC87C5',
                                    },
                                }}
                            >
                                <DownloadIcon sx={{ color: '#AC87C5' }} />
                                <Typography sx={{ fontSize: 13, fontWeight: 400, color: '#756AB6' }}>
                                    Download
                                </Typography>
                            </Button>

                        </Box>
                    </Box>

                    <Box sx={{ overflowX: "auto", width: "100%", }}>

                        <Box sx={{ minWidth: `${mainColumns.length * 100}px` }}>

                            <Box
                                sx={{
                                    display: "flex",
                                    p: 1,
                                    bgcolor: "#E5D9F2",
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
                                style={{ height: "63vh", width: "100%", }}
                                data={filteredqto}
                                itemContent={(index, val) => {
                                    return (
                                        <Box display="flex" sx={{ borderBottom: "1px solid lightgrey" }}>

                                            {mainColumns.map(col => {
                                                let value = val[col.key];
                                                if (col.key === "sl_no") value = index + 1;
                                                if (["QUOTATION DATE"].includes(col.key)) value = formatDateTime(value);
                                                if (["QUOTATION AMOUNT"].includes(col.key)) {
                                                    value = Math.round(value);
                                                }

                                                const isQuotationClick = col.key === "QUOTATION #";

                                                return (
                                                    <Box
                                                        key={col.key}
                                                        onClick={() => {
                                                            if (isQuotationClick) {
                                                                handleQuotationClick(val);
                                                            }
                                                        }}
                                                        sx={{
                                                            width: col.width,
                                                            display: "flex",
                                                            justifyContent: col.align === 'right'
                                                                ? 'flex-end'
                                                                : col.align === 'center'
                                                                    ? 'center'
                                                                    : 'flex-start',
                                                            alignItems: "center",
                                                            fontSize: 14,
                                                            fontWeight: col.fontWeight,
                                                            cursor: isQuotationClick ? "pointer" : "default",
                                                            color: isQuotationClick ? "#1976d2" : "inherit",
                                                            textDecoration: isQuotationClick ? "underline" : "none",
                                                            '&:hover': isQuotationClick
                                                                ? { backgroundColor: '#f5f5f5' }
                                                                : {}
                                                        }}
                                                    >
                                                        {value}
                                                    </Box>
                                                );
                                            })}
                                        </Box>
                                    );
                                }}
                            />
                        </Box>
                    </Box>
                    <QuatationModal
                        open={openCommentModal}
                        onClose={OncloseModalFun}
                        quotationDetails={quotationDetails}
                        selectedRow={selectedRow}
                    />
                </Paper>
            </CardCloseOnly>
        </Fragment >
    )
}
export default memo(PendingApprovalQuatation)


