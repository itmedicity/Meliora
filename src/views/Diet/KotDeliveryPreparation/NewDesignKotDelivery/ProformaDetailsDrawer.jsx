import React, { memo, useCallback, useMemo, useState } from "react";
import {
    Drawer,
    Box,
    Stack,
    Divider,
    IconButton
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import DietTextComponent from "../../DietComponent/DietTextComponent";
import BillPayTypeSelector from "./BillPayTypeSelector";
import BillPreview from "./BillPreview";
import { format } from "date-fns";
import { axioslogin } from "src/views/Axios/Axios";
import { useSelector } from "react-redux";
import { succesNotify, warningNotify } from "src/views/Common/CommonCode";
import { useQueryClient } from "@tanstack/react-query";


const ProformaDetailsDrawer = ({
    open,
    onClose,
    proformaDetails = [],
    width = 480
}) => {

    const queryClient = useQueryClient()

    const id = useSelector((state) => {
        return state.LoginUserData.empid
    });

    const [showBillPayType, setShowBillPayType] = useState(false);
    const [showbillpreview, setShowBillPreview] = useState(false);

    const [billPayType, setBillPayType] = useState("CASH");
    /* PROFORMA*/
    const proforma = useMemo(
        () => proformaDetails?.[0] || {},
        [proformaDetails]
    );

    /*  TOTALS */

    const totals = useMemo(() => {

        return (proformaDetails || []).reduce(
            (acc, item) => {

                const quantity =
                    Number(item?.quantity || 0);

                const rate =
                    Number(item?.rate || 0);

                const gstAmount =
                    Number(item?.gst_amount || 0);

                const discount =
                    Number(item?.discount || 0);

                const baseAmount =
                    quantity * rate;

                acc.subTotal += baseAmount;
                acc.gst += gstAmount;
                acc.discount += discount;
                acc.total +=
                    Number(item?.amount || 0);

                return acc;

            },
            {
                subTotal: 0,
                gst: 0,
                discount: 0,
                total: 0
            }
        );

    }, [proformaDetails]);


    /*  STATUS */

    const statusConfig = {

        OPEN: {
            bg: "warning.50",
            color: "warning.main",
            label: "OPEN"
        },

        CONVERTED: {
            bg: "success.50",
            color: "success.main",
            label: "CONVERTED"
        },

        CANCELLED: {
            bg: "error.50",
            color: "error.main",
            label: "CANCELLED"
        }

    };


    const status =
        statusConfig?.[proforma?.status] ||
        statusConfig.OPEN;


    /*  DATE */

    const formattedDate =
        proforma?.proforma_date
            ? new Date(
                proforma?.proforma_date
            )?.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            )
            : "-";

    const handleConvertPerformatoBill = useCallback(async () => {

        if (!billPayType || !proforma?.proforma_id) {
            return;
        }

        const payload = {
            proforma_id: proforma.proforma_id,
            // Bill master details
            bill: {
                patient_id: proforma?.patient_id,
                admission_id: proforma?.admission_id,
                billing_party_type: proforma?.party_type_id,
                assignment_detail_id: proforma?.assignment_detail_id,
                billing_date: format(new Date(), "yyyy-MM-dd"),
                bill_type: "PRE_GENERATED",
                bill_generated_location: "CANTEEN",
                total_amount: totals.total,
                paid_amount: 0,
                balance_amount: totals.total,
                billing_status: "OPEN",
                bill_pay_type: billPayType,
                employeeId: id
            },

            // Bill detail rows
            details: proformaDetails.map((item) => ({
                category_id: 2,
                description:
                    item?.item_name ||
                    item?.description ||
                    "Item",
                item_id: item?.item_id || null,
                quantity: Number(item?.quantity || 0),
                rate: Number(item?.rate || 0),
                gst: Number(item?.gst || 0),
                gst_amount: Number(item?.gst_amount || 0),
                discount: Number(item?.discount || 0),
                amount: Number(item?.amount || 0),
                reference_table:
                    item?.reference_table ||
                    "proforma_detail",
                reference_id:
                    item?.proforma_detail_id,
                service_date:
                    item?.service_date ||
                    proforma?.proforma_date
            }))
        };
        try {
            const response = await axioslogin.post("/dietdelivery/convert-proforma", payload);

            const { success, message } = response?.data ?? {};

            if (success !== 1) return warningNotify(message)
            succesNotify("Bill Created Successfully!")

            setShowBillPayType(false);
            
            queryClient.invalidateQueries(['proforma-details', proforma?.assignment_detail_id])

        } catch (error) {
            console.error("Failed to generate bill", error);
        }
    }, [
        proforma,
        proformaDetails,
        billPayType,
        totals,
        id,
        queryClient
    ]);

    return (

        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: {
                        xs: "100%",
                        sm: width
                    },
                    backgroundColor: "#f7f8fa"
                }
            }}
            sx={{
                position: "relative"
            }}
        >

            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >

                {/* =====================================================
                    INVOICE HEADER
                ===================================================== */}

                <Box
                    sx={{
                        backgroundColor: "background.paper",
                        px: 2,
                        py: 1.5
                    }}
                >

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >

                        {/* LEFT */}

                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                        >

                            <Box
                                sx={{
                                    width: 38,
                                    height: 38,
                                    borderRadius: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor:
                                        "primary.50",
                                    color:
                                        "primary.main"
                                }}
                            >

                                <ReceiptLongIcon
                                    sx={{
                                        fontSize: 21
                                    }}
                                />

                            </Box>


                            <Box>

                                <DietTextComponent
                                    value="PROFORMA INVOICE"
                                    size={14}
                                    fontWeight={800}
                                />

                                <DietTextComponent
                                    value={
                                        proforma?.proforma_no ||
                                        "-"
                                    }
                                    size={10}
                                    color="text.secondary"
                                />

                            </Box>

                        </Stack>


                        {/* RIGHT */}

                        <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                        >

                            <Box
                                sx={{
                                    px: 1,
                                    py: 0.35,
                                    borderRadius: 1,
                                    backgroundColor:
                                        status.bg
                                }}
                            >

                                <DietTextComponent
                                    value={status.label}
                                    size={9}
                                    fontWeight={800}
                                    color={status.color}
                                />

                            </Box>


                            <IconButton
                                size="small"
                                onClick={onClose}
                            >

                                <CloseIcon
                                    fontSize="small"
                                />

                            </IconButton>

                        </Stack>

                    </Stack>

                </Box>


                {/* =====================================================
                    BILL INFORMATION
                ===================================================== */}

                <Box
                    sx={{
                        backgroundColor:
                            "background.paper",
                        px: 2,
                        pb: 1.5
                    }}
                >

                    <Divider
                        sx={{
                            mb: 1.2
                        }}
                    />


                    <Stack
                        direction="row"
                        spacing={3}
                    >

                        {/* PARTY */}

                        <Stack
                            direction="row"
                            spacing={0.7}
                            alignItems="center"
                            sx={{
                                minWidth: 0
                            }}
                        >

                            <PersonOutlineIcon
                                sx={{
                                    fontSize: 16,
                                    color:
                                        "text.secondary"
                                }}
                            />

                            <Box
                                sx={{
                                    minWidth: 0
                                }}
                            >

                                <DietTextComponent
                                    value="PARTY"
                                    size={8}
                                    color="text.secondary"
                                />

                                <DietTextComponent
                                    value={
                                        proforma?.party_name ||
                                        "BYSTANDER"
                                    }
                                    size={10}
                                    fontWeight={700}
                                    noWrap
                                />

                            </Box>

                        </Stack>


                        {/* ADMISSION */}

                        <Stack
                            direction="row"
                            spacing={0.7}
                            alignItems="center"
                        >

                            <LocalHospitalOutlinedIcon
                                sx={{
                                    fontSize: 16,
                                    color:
                                        "text.secondary"
                                }}
                            />

                            <Box>

                                <DietTextComponent
                                    value="ADMISSION"
                                    size={8}
                                    color="text.secondary"
                                />

                                <DietTextComponent
                                    value={
                                        proforma?.admission_id ||
                                        "-"
                                    }
                                    size={10}
                                    fontWeight={700}
                                />

                            </Box>

                        </Stack>


                        {/* DATE */}

                        <Stack
                            direction="row"
                            spacing={0.7}
                            alignItems="center"
                        >

                            <CalendarTodayOutlinedIcon
                                sx={{
                                    fontSize: 15,
                                    color:
                                        "text.secondary"
                                }}
                            />

                            <Box>

                                <DietTextComponent
                                    value="DATE"
                                    size={8}
                                    color="text.secondary"
                                />

                                <DietTextComponent
                                    value={formattedDate}
                                    size={10}
                                    fontWeight={700}
                                />

                            </Box>

                        </Stack>

                    </Stack>

                </Box>


                {/* =====================================================
                    ITEM TABLE
                ===================================================== */}

                <Box
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        p: 1.5
                    }}
                >

                    <Box
                        sx={{
                            backgroundColor:
                                "background.paper",
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor:
                                "divider",
                            overflow: "hidden"
                        }}
                    >

                        {/* TABLE HEADER */}

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns:
                                    "30px minmax(0, 1fr) 50px 75px 55px 85px",
                                alignItems: "center",
                                px: 1.2,
                                py: 0.9,
                                backgroundColor:
                                    "grey.50",
                                borderBottom:
                                    "1px solid",
                                borderColor:
                                    "divider"
                            }}
                        >

                            <DietTextComponent
                                value="#"
                                size={8}
                                fontWeight={800}
                                color="text.secondary"
                            />

                            <DietTextComponent
                                value="ITEM"
                                size={8}
                                fontWeight={800}
                                color="text.secondary"
                            />

                            <DietTextComponent
                                value="QTY"
                                size={8}
                                fontWeight={800}
                                color="text.secondary"
                            />

                            <DietTextComponent
                                value="RATE"
                                size={8}
                                fontWeight={800}
                                color="text.secondary"
                            />

                            <DietTextComponent
                                value="GST"
                                size={8}
                                fontWeight={800}
                                color="text.secondary"
                            />

                            <DietTextComponent
                                value="AMOUNT"
                                size={8}
                                fontWeight={800}
                                color="text.secondary"
                            />

                        </Box>


                        {/* TABLE ROWS */}

                        {(proformaDetails || []).map(
                            (item, index) => {

                                const quantity =
                                    Number(
                                        item?.quantity || 0
                                    );

                                const rate =
                                    Number(
                                        item?.rate || 0
                                    );

                                const gst =
                                    Number(
                                        item?.gst || 0
                                    );

                                const amount =
                                    Number(
                                        item?.amount || 0
                                    );

                                const isLast =
                                    index ===
                                    proformaDetails.length - 1;

                                return (

                                    <Box
                                        key={
                                            item?.proforma_detail_id ||
                                            index
                                        }
                                        sx={{
                                            display:
                                                "grid",
                                            gridTemplateColumns:
                                                "30px minmax(0, 1fr) 50px 75px 55px 85px",
                                            alignItems:
                                                "center",
                                            px: 1.2,
                                            py: 1,
                                            borderBottom:
                                                isLast
                                                    ? "none"
                                                    : "1px solid",
                                            borderColor:
                                                "divider"
                                        }}
                                    >

                                        {/* NUMBER */}

                                        <DietTextComponent
                                            value={
                                                String(
                                                    index + 1
                                                ).padStart(
                                                    2,
                                                    "0"
                                                )
                                            }
                                            size={9}
                                            color="text.secondary"
                                        />


                                        {/* ITEM */}

                                        <Box
                                            sx={{
                                                minWidth: 0
                                            }}
                                        >

                                            <DietTextComponent
                                                value={
                                                    item?.item_name ||
                                                    item?.description ||
                                                    "Item"
                                                }
                                                size={10}
                                                fontWeight={700}
                                                noWrap
                                            />

                                            <DietTextComponent
                                                value={
                                                    item?.delivery_status ||
                                                    "PENDING"
                                                }
                                                size={8}
                                                color={
                                                    item?.actual_delivery_status ===
                                                        "PICKEDUP"
                                                        ? "warning.main"
                                                        : "text.secondary"
                                                }
                                            />

                                        </Box>


                                        {/* QTY */}

                                        <DietTextComponent
                                            value={
                                                quantity.toFixed(
                                                    0
                                                )
                                            }
                                            size={9}
                                        />


                                        {/* RATE */}

                                        <DietTextComponent
                                            value={`₹${rate.toFixed(
                                                2
                                            )}`}
                                            size={9}
                                        />


                                        {/* GST */}

                                        <DietTextComponent
                                            value={`${gst}%`}
                                            size={9}
                                        />


                                        {/* AMOUNT */}

                                        <DietTextComponent
                                            value={`₹${amount.toFixed(
                                                2
                                            )}`}
                                            size={10}
                                            fontWeight={800}
                                        />

                                    </Box>

                                );

                            }
                        )}

                    </Box>


                    {/* =================================================
                        TOTAL SECTION
                    ================================================= */}

                    <Box
                        sx={{
                            mt: 1.5,
                            ml: "auto",
                            width: '100%',
                            backgroundColor:
                                "background.paper",
                            border:
                                "1px solid",
                            borderColor:
                                "divider",
                            borderRadius: 2,
                            p: 1.5
                        }}
                    >

                        {/* SUBTOTAL */}

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{
                                mb: 0.7
                            }}
                        >

                            <DietTextComponent
                                value="Subtotal"
                                size={9}
                                color="text.secondary"
                            />

                            <DietTextComponent
                                value={`₹${totals.subTotal.toFixed(
                                    2
                                )}`}
                                size={9}
                                fontWeight={600}
                            />

                        </Stack>


                        {/* GST */}

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{
                                mb: 0.7
                            }}
                        >

                            <DietTextComponent
                                value="GST"
                                size={9}
                                color="text.secondary"
                            />

                            <DietTextComponent
                                value={`₹${totals.gst.toFixed(
                                    2
                                )}`}
                                size={9}
                                fontWeight={600}
                            />

                        </Stack>


                        {/* DISCOUNT */}

                        {totals.discount > 0 && (

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                sx={{
                                    mb: 0.7
                                }}
                            >

                                <DietTextComponent
                                    value="Discount"
                                    size={9}
                                    color="text.secondary"
                                />

                                <DietTextComponent
                                    value={`- ₹${totals.discount.toFixed(
                                        2
                                    )}`}
                                    size={9}
                                    fontWeight={600}
                                />

                            </Stack>

                        )}


                        <Divider
                            sx={{
                                my: 1
                            }}
                        />


                        {/* GRAND TOTAL */}

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >

                            <Box>

                                <DietTextComponent
                                    value="TOTAL"
                                    size={10}
                                    fontWeight={800}
                                />

                                <DietTextComponent
                                    value={`${proformaDetails.length} Items`}
                                    size={8}
                                    color="text.secondary"
                                />

                            </Box>


                            <DietTextComponent
                                value={`₹${totals.total.toFixed(
                                    2
                                )}`}
                                size={20}
                                fontWeight={900}
                            />

                        </Stack>

                    </Box>

                </Box>

                {showbillpreview &&
                    <BillPreview
                        proformaDetails={proformaDetails}
                        billPayType={billPayType}
                    />

                }
                {
                    showBillPayType &&
                    <BillPayTypeSelector
                        value={billPayType}
                        onChange={setBillPayType}
                        onClose={() => {
                            setShowBillPayType(false);
                        }}
                    // onConfirm={handleConvertPerformatoBill}
                    />
                }

                {/* FOOTER ACTIONS */}

                <Box
                    sx={{
                        backgroundColor: "background.paper",
                        borderTop: "1px solid",
                        borderColor: "divider",
                        px: 1.5,
                        py: 2
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={1}
                    >

                        {/* LEFT - STATUS */}

                        <Box
                            sx={{
                                minWidth: 0,
                                flex: 1
                            }}
                        >
                            <DietTextComponent
                                value={
                                    proforma?.status === "CONVERTED"
                                        ? "Converted to final bill"
                                        : "Proforma • Awaiting final billing"
                                }
                                size={10}
                                color="text.secondary"
                                noWrap
                            />
                        </Box>


                        {/* RIGHT - ACTIONS */}

                        <Stack
                            direction="row"
                            spacing={0.7}
                            alignItems="center"
                        >
                            {/* CONVERT TO BILL */}


                            <Box
                                component="button"
                                type="button"
                                onClick={() => setShowBillPreview(prev => !prev)}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 0.5,

                                    height: 32,
                                    px: 1.2,

                                    border: "1px solid",
                                    borderColor: "divider",
                                    borderRadius: 1.5,
                                    backgroundColor:
                                        "background.paper",
                                    color: "text.secondary",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        backgroundColor:
                                            "action.hover",
                                        borderColor:
                                            "text.secondary"
                                    }
                                }}>
                                <ReceiptLongIcon
                                    sx={{
                                        fontSize: 16
                                    }}
                                />
                                <DietTextComponent
                                    value={showbillpreview ? "Hide Preview" : "Preview Bill"}
                                    size={9}
                                    fontWeight={700}
                                />
                            </Box>


                            {proforma?.status === "OPEN" && !showBillPayType && (
                                <>
                                    <Box
                                        component="button"
                                        type="button"
                                        onClick={() => setShowBillPayType(true)}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 0.5,

                                            height: 32,
                                            px: 1.2,

                                            border: "1px solid",
                                            borderColor: "divider",
                                            borderRadius: 1.5,
                                            backgroundColor:
                                                "background.paper",
                                            color: "text.secondary",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                            "&:hover": {
                                                backgroundColor:
                                                    "action.hover",
                                                borderColor:
                                                    "text.secondary"
                                            }
                                        }}>
                                        <ManageHistoryIcon
                                            sx={{
                                                fontSize: 16
                                            }}
                                        />
                                        <DietTextComponent
                                            value="Pay Type"
                                            size={9}
                                            fontWeight={700}
                                        />
                                    </Box>


                                    <Box
                                        component="button"
                                        type="button"
                                        onClick={handleConvertPerformatoBill}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 0.5,
                                            height: 32,
                                            px: 1.4,
                                            border: "1px solid",
                                            borderColor: "#a618ff",
                                            borderRadius: 1.5,
                                            backgroundColor:
                                                "#a618ff",
                                            color: "primary.contrastText",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                            "&:hover": {
                                                backgroundColor:
                                                    "#a618ff",
                                                borderColor:
                                                    "#a618ff"
                                            }
                                        }}
                                    >

                                        <ReceiptLongIcon
                                            sx={{
                                                fontSize: 16
                                            }}
                                        />

                                        <DietTextComponent
                                            value="Bill & Print"
                                            size={9}
                                            fontWeight={800}
                                            color="inherit"
                                        />

                                    </Box>
                                </>
                            )}

                        </Stack>

                    </Stack>

                </Box>

            </Box>


        </Drawer>
    );
};


export default memo(
    ProformaDetailsDrawer
);