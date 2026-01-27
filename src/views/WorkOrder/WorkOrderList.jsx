import React, { memo, useState, useMemo, useCallback, Fragment } from "react";
import { Box, Typography, Input, IconButton } from "@mui/joy";
import { Virtuoso } from "react-virtuoso";
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from "react-router-dom";
import AddDetails from "./AddDetails/AddDetails";
import { useQuery } from '@tanstack/react-query';
import { getCRFDetails } from "src/api/WorkOrderApi";
import { format, isValid, parse, parseISO } from "date-fns";

const columns = [
    { key: "sl_no", label: "Sl No", align: "center", width: 60 },
    { key: "crfNo", label: "CRF No", align: "left", width: 180 },
    { key: "sec_name", label: "Department", align: "left", width: 140 },
    { key: "req_date", label: "Req Date", align: "center", width: 120 },
    { key: "work_order_status", label: "Status", align: "center", width: 120 },
];

const WorkOrderList = () => {

    const [search, setSearch] = useState("");
    const [Open, setOpen] = useState(0);
    const [SelectedData, setSelectedData] = useState([]);

    const history = useNavigate()


    const { data: CRFDATAS = [] } = useQuery({
        queryKey: ['getCRFDatas'],
        queryFn: () => getCRFDetails(),
    });

    // Apply search filter
    const filteredData = useMemo(() => {
        if (!search) return CRFDATAS;

        const q = search.toLowerCase();

        return CRFDATAS.filter((row) =>
            row?.crfNo?.toLowerCase().includes(q) ||
            row?.company_name?.toLowerCase().includes(q) ||
            String(row?.req_slno ?? '').toLowerCase().includes(q)
        );
    }, [CRFDATAS, search]);

    const close = useCallback(() => {
        history(`/Home`)
    }, [history])

    const formatDate = (value) => {
        if (!value) return null;

        let date;

        if (typeof value === 'string' && value.includes('-') && value.length === 10) {
            // Try ISO first
            date = parseISO(value);
            if (!isValid(date)) {
                date = parse(value, 'dd-MM-yyyy', new Date());
            }
        } else {
            date = new Date(value);
        }

        return isValid(date) ? format(date, 'yyyy-MM-dd') : null;
    };


    const OnclickFun = useCallback((row) => {
        if (!row) return;

        const data = {
            sec_name: row.sec_name,
            request_deptsec_slno: row.request_deptsec_slno,
            crfNo: row.crfNo,
            req_date: formatDate(row.req_date),
            req_slno: row?.req_slno
        };

        setOpen(1);
        setSelectedData(data); // keep array if UI expects array
    }, []);


    return (
        <Fragment>
            {Open === 1 ? <AddDetails setOpen={setOpen} setSelectedData={setSelectedData} SelectedData={SelectedData} /> :

                <Box sx={{ p: 0, width: "100%", height: "100%" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{}}>
                            <Typography level="h4" sx={{ color: "#7F55B1" }}>CRF Work Orders</Typography>
                        </Box>
                        <Box sx={{}}>
                            <IconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={close}>
                                <CloseIcon fontSize="small" sx={{ color: "#7F55B1" }} />
                            </IconButton>
                        </Box>
                    </Box>
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            mt: 0.5,
                        }}
                    >
                        <Input
                            size="sm"
                            placeholder="Search CRF No..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{ width: 260 }}
                        />
                    </Box>

                    {/* Column Header */}
                    <Box
                        sx={{
                            display: "flex",
                            borderBottom: "1px solid var(--joy-palette-divider)",
                            height: 44,
                            fontWeight: 600,
                            width: "100%",
                            backgroundColor: "#E5D9F2",
                            mt: 0.5,
                        }}
                    >
                        {columns.map((col) => (
                            <Box
                                key={col.key}
                                sx={{
                                    width: "100%",
                                    px: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: col.align,
                                    fontSize: 14,
                                }}
                            >
                                {col.label}
                            </Box>
                        ))}
                    </Box>

                    {/* Virtuoso List */}
                    <Virtuoso
                        style={{ height: "75vh", width: "100%" }}
                        data={filteredData}
                        itemContent={(index, val) => (
                            <Box
                                sx={{
                                    display: "flex",
                                    borderBottom: "1px solid var(--joy-palette-divider)",
                                    minHeight: 42,
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "var(--joy-palette-neutral-100)",
                                    },
                                }}
                            >
                                {columns.map((col) => {
                                    let value =
                                        col.key === "sl_no"
                                            ? index + 1
                                            : val[col.key];
                                    return (
                                        <Box
                                            key={col.key}
                                            sx={{
                                                width: "100%",
                                                px: 1,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: col.align,
                                                fontSize: 14,
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {col.key === "work_order_status" ? (
                                                <Box
                                                    size="sm"
                                                    onClick={() => OnclickFun(val)}
                                                    sx={{
                                                        p: 0.5,
                                                        backgroundColor: "#FFE4EF",
                                                        color: "#000",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    View
                                                </Box>
                                            ) : (
                                                value ?? "-"
                                            )}
                                        </Box>
                                    );
                                })}
                            </Box>
                        )}
                    />
                </Box>
            }
        </Fragment>
    );
};

export default memo(WorkOrderList);
