
import React, {
    memo,
    useMemo,
    useState,
    useCallback
} from "react";

import {
    Box,
    Drawer,
    IconButton,
    Button,
    Chip,
    Divider,
    Typography,
    Sheet
} from "@mui/joy";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PendingRoundedIcon from "@mui/icons-material/PendingRounded";
import KeyboardReturnRoundedIcon from "@mui/icons-material/KeyboardReturnRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LocalDiningRoundedIcon from "@mui/icons-material/LocalDiningRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";



const BillDetailsDrawer = ({
    open,
    onClose,
    bills = [],
    billItems = [],
    patientData,
    onReturnItem,
    onCancelBill,
    loading = false
}) => {

    /*
    ============================================================
    CURRENT BILL
    ============================================================
    */

    const currentBill = useMemo(() => {

        if (!Array.isArray(bills) || bills.length === 0) {
            return null;
        }

        return bills[0];

    }, [bills]);


    /*
    ============================================================
    ITEM STATUS
    ============================================================
    */

    const getItemStatus = useCallback((item) => {

        if (
            item?.bill_item_status === "RETURNED" ||
            item?.billing_status === "RETURNED"
        ) {
            return "RETURNED";
        }

        if (
            item?.bill_item_status === "PAID" ||
            item?.billing_status === "PAID"
        ) {
            return "PAID";
        }

        if (
            item?.bill_item_status === "CANCELLED" ||
            item?.billing_status === "CANCELLED"
        ) {
            return "CANCELLED";
        }

        return "OPEN";

    }, []);


    /*
    ============================================================
    STATUS COUNTS
    ============================================================
    */

    const statusCount = useMemo(() => {

        const result = {
            total: 0,
            paid: 0,
            open: 0,
            returned: 0,
            cancelled: 0
        };

        (billItems || []).forEach(item => {

            result.total += 1;

            const status = getItemStatus(item);

            if (status === "PAID") {
                result.paid += 1;
            }

            if (status === "OPEN") {
                result.open += 1;
            }

            if (status === "RETURNED") {
                result.returned += 1;
            }

            if (status === "CANCELLED") {
                result.cancelled += 1;
            }

        });

        return result;

    }, [billItems, getItemStatus]);


    /*
    ============================================================
    CALCULATE CURRENT ACTIVE TOTAL
    ============================================================
    */

    const activeItems = useMemo(() => {

        return (billItems || []).filter(item => {

            const status = getItemStatus(item);

            return (
                status !== "RETURNED" &&
                status !== "CANCELLED"
            );

        });

    }, [billItems, getItemStatus]);


    const activeTotal = useMemo(() => {

        return activeItems.reduce(
            (sum, item) =>
                sum + Number(item?.amount || 0),
            0
        );

    }, [activeItems]);


    const returnedTotal = useMemo(() => {

        return (billItems || [])
            .filter(item =>
                getItemStatus(item) === "RETURNED"
            )
            .reduce(
                (sum, item) =>
                    sum + Number(item?.amount || 0),
                0
            );

    }, [billItems, getItemStatus]);


    /*
    ============================================================
    BILL STATUS
    ============================================================
    */

    const billStatus = currentBill?.billing_status || "OPEN";

    const isPaid =
        billStatus === "PAID";

    const isCancelled =
        billStatus === "CANCELLED";

    const canModify =
        !isPaid &&
        !isCancelled;


    /*
    ============================================================
    STATUS CHIP
    ============================================================
    */

    const renderBillStatus = () => {

        if (isCancelled) {

            return (
                <Chip
                    color="danger"
                    variant="soft"
                    startDecorator={<CancelRoundedIcon />}
                    sx={{
                        fontWeight: 700
                    }}
                >
                    CANCELLED
                </Chip>
            );
        }

        if (isPaid) {

            return (
                <Chip
                    color="success"
                    variant="soft"
                    startDecorator={<CheckCircleRoundedIcon />}
                    sx={{
                        fontWeight: 700
                    }}
                >
                    PAID
                </Chip>
            );
        }

        return (
            <Chip
                color="warning"
                variant="soft"
                startDecorator={<PendingRoundedIcon />}
                sx={{
                    fontWeight: 700
                }}
            >
                OPEN
            </Chip>
        );

    };


    /*
    ============================================================
    ITEM STATUS CHIP
    ============================================================
    */

    const renderItemStatus = (item) => {

        const status = getItemStatus(item);

        if (status === "PAID") {

            return (
                <Chip
                    size="sm"
                    color="success"
                    variant="soft"
                    startDecorator={
                        <CheckCircleRoundedIcon
                            sx={{ fontSize: 14 }}
                        />
                    }
                >
                    PAID
                </Chip>
            );

        }

        if (status === "RETURNED") {

            return (
                <Chip
                    size="sm"
                    color="danger"
                    variant="soft"
                    startDecorator={
                        <KeyboardReturnRoundedIcon
                            sx={{ fontSize: 14 }}
                        />
                    }
                >
                    RETURNED
                </Chip>
            );

        }

        if (status === "CANCELLED") {

            return (
                <Chip
                    size="sm"
                    color="neutral"
                    variant="soft"
                >
                    CANCELLED
                </Chip>
            );

        }

        return (
            <Chip
                size="sm"
                color="warning"
                variant="soft"
            >
                OPEN
            </Chip>
        );

    };


    /*
    ============================================================
    FORMAT DATE
    ============================================================
    */

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        try {

            return new Date(date).toLocaleString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

        } catch {
            return date;
        }

    };


    /*
    ============================================================
    RETURN CONFIRMATION
    ============================================================
    */

    const [selectedReturnItem, setSelectedReturnItem] =
        useState(null);


    const handleReturnClick = (item) => {

        setSelectedReturnItem(item);

    };


    const handleConfirmReturn = () => {

        if (!selectedReturnItem) {
            return;
        }

        if (onReturnItem) {
            onReturnItem(selectedReturnItem);
        }

        setSelectedReturnItem(null);

    };


    /*
    ============================================================
    EMPTY STATE
    ============================================================
    */

    if (!currentBill) {

        return (
            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                size="md"
            >

                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 4
                    }}
                >

                    <Box sx={{ textAlign: "center" }}>

                        <ReceiptLongRoundedIcon
                            sx={{
                                fontSize: 60,
                                color: "#aaa"
                            }}
                        />

                        <Typography
                            level="title-lg"
                            sx={{ mt: 2 }}
                        >
                            No bill details
                        </Typography>

                        <Typography
                            level="body-sm"
                            sx={{
                                color: "neutral.500",
                                mt: 1
                            }}
                        >
                            There are no billing records available
                            for this order.
                        </Typography>

                    </Box>

                </Box>

            </Drawer>
        );

    }


    return (

        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            size="md"
            slotProps={{
                content: {
                    sx: {
                        width: {
                            xs: "100%",
                            sm: 560,
                            md: 620
                        },
                        p: 0
                    }
                }
            }}
        >

            {/* =====================================================
                HEADER
            ===================================================== */}

            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    px: 2.5,
                    py: 2,
                    background:
                        "linear-gradient(135deg, #582e7d 0%, #8629d1 100%)",
                    color: "#fff"
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start"
                    }}
                >

                    <Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1
                            }}
                        >

                            <ReceiptLongRoundedIcon />

                            <Typography
                                level="title-lg"
                                sx={{
                                    color: "#fff",
                                    fontWeight: 800
                                }}
                            >
                                Bill Details
                            </Typography>

                        </Box>

                        <Typography
                            level="body-xs"
                            sx={{
                                color: "rgba(255,255,255,.75)",
                                mt: .5
                            }}
                        >
                            {currentBill.bill_no}
                        </Typography>

                    </Box>


                    <IconButton
                        variant="plain"
                        onClick={onClose}
                        sx={{
                            color: "#fff",
                            borderRadius: "50%"
                        }}
                    >
                        <CloseRoundedIcon />
                    </IconButton>

                </Box>


                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2
                    }}
                >

                    <Box>

                        <Typography
                            level="body-xs"
                            sx={{
                                color: "rgba(255,255,255,.7)"
                            }}
                        >
                            Bill Number
                        </Typography>

                        <Typography
                            sx={{
                                color: "#fff",
                                fontWeight: 800,
                                fontSize: 16
                            }}
                        >
                            {currentBill.bill_no}
                        </Typography>

                    </Box>

                    {renderBillStatus()}

                </Box>

            </Box>


            {/* =====================================================
                BODY
            ===================================================== */}

            <Box
                sx={{
                    p: 2,
                    pb: 5,
                    overflowY: "auto",
                    flex: 1,
                    background: "#f7f7f9"
                }}
            >

                {/* =================================================
                    PATIENT / ORDER INFORMATION
                ================================================= */}

                <Sheet
                    variant="outlined"
                    sx={{
                        p: 2,
                        borderRadius: 3,
                        mb: 2,
                        background: "#fff"
                    }}
                >

                    <Typography
                        level="title-sm"
                        sx={{
                            fontWeight: 800,
                            mb: 1.5
                        }}
                    >
                        Billing Information
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr 1fr"
                            },
                            gap: 1.5
                        }}
                    >

                        <InfoItem
                            icon={<PersonRoundedIcon />}
                            label="Patient"
                            value={
                                currentBill.patient_id ||
                                patientData?.fb_pt_no ||
                                "-"
                            }
                        />

                        <InfoItem
                            icon={<LocalDiningRoundedIcon />}
                            label="Admission"
                            value={
                                currentBill.admission_id ||
                                patientData?.fb_ip_no ||
                                "-"
                            }
                        />

                        <InfoItem
                            icon={<EventRoundedIcon />}
                            label="Bill Date"
                            value={formatDate(
                                currentBill.created_at ||
                                currentBill.billing_date
                            )}
                        />

                        <InfoItem
                            icon={<ReceiptLongRoundedIcon />}
                            label="Bill Type"
                            value={
                                currentBill.bill_type ||
                                "PRE_GENERATED"
                            }
                        />

                    </Box>

                </Sheet>


                {/* =================================================
                    BILL SUMMARY
                ================================================= */}

                <Sheet
                    variant="soft"
                    sx={{
                        p: 2,
                        borderRadius: 3,
                        mb: 2
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >

                        <Box>

                            <Typography
                                level="body-xs"
                                sx={{
                                    color: "neutral.600"
                                }}
                            >
                                Current Bill Value
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 28,
                                    fontWeight: 900,
                                    mt: .3
                                }}
                            >
                                ₹{activeTotal.toFixed(2)}
                            </Typography>

                        </Box>


                        <Box
                            sx={{
                                width: 52,
                                height: 52,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "#fff"
                            }}
                        >
                            <CurrencyRupeeRoundedIcon
                                sx={{
                                    fontSize: 28,
                                    color: "#582e7d"
                                }}
                            />
                        </Box>

                    </Box>


                    <Divider sx={{ my: 1.5 }} />


                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(3, 1fr)",
                            gap: 1
                        }}
                    >

                        <SummaryBox
                            label="Items"
                            value={statusCount.total}
                        />

                        <SummaryBox
                            label="Returned"
                            value={statusCount.returned}
                            danger={statusCount.returned > 0}
                        />

                        <SummaryBox
                            label="Returned Value"
                            value={`₹${returnedTotal.toFixed(0)}`}
                            danger={returnedTotal > 0}
                        />

                    </Box>

                </Sheet>


                {/* =================================================
                    RETURN WARNING
                ================================================= */}

                {statusCount.returned > 0 && (

                    <Sheet
                        variant="soft"
                        color="warning"
                        sx={{
                            p: 1.5,
                            borderRadius: 3,
                            mb: 2,
                            display: "flex",
                            gap: 1
                        }}
                    >

                        <WarningAmberRoundedIcon />

                        <Box>

                            <Typography
                                level="title-sm"
                                sx={{
                                    fontWeight: 800
                                }}
                            >
                                Returned items detected
                            </Typography>

                            <Typography
                                level="body-xs"
                            >
                                ₹{returnedTotal.toFixed(2)} has been
                                marked as returned. The final bill
                                should exclude returned items.
                            </Typography>

                        </Box>

                    </Sheet>

                )}


                {/* =================================================
                    ITEMS
                ================================================= */}

                <Typography
                    level="title-sm"
                    sx={{
                        fontWeight: 800,
                        mb: 1
                    }}
                >
                    Bill Items
                </Typography>


                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1
                    }}
                >

                    {(billItems || []).map((item, index) => {

                        const status =
                            getItemStatus(item);

                        const returned =
                            status === "RETURNED";

                        const amount =
                            Number(
                                item?.amount || 0
                            );

                        return (

                            <Sheet
                                key={
                                    item?.billing_detail_id ||
                                    index
                                }
                                variant="outlined"
                                sx={{
                                    p: 1.5,
                                    borderRadius: 3,
                                    background: "#fff",
                                    opacity:
                                        returned ? .65 : 1
                                }}
                            >

                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1.5
                                    }}
                                >

                                    {/* ITEM ICON */}

                                    <Box
                                        sx={{
                                            minWidth: 42,
                                            height: 42,
                                            borderRadius: 2,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background:
                                                returned
                                                    ? "rgba(211,47,47,.08)"
                                                    : "rgba(88,46,125,.08)"
                                        }}
                                    >

                                        <LocalDiningRoundedIcon
                                            sx={{
                                                color:
                                                    returned
                                                        ? "#d32f2f"
                                                        : "#582e7d"
                                            }}
                                        />

                                    </Box>


                                    {/* ITEM INFO */}

                                    <Box
                                        sx={{
                                            flex: 1,
                                            minWidth: 0
                                        }}
                                    >

                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent:
                                                    "space-between",
                                                gap: 1
                                            }}
                                        >

                                            <Typography
                                                level="title-sm"
                                                sx={{
                                                    fontWeight: 800,
                                                    textDecoration:
                                                        returned
                                                            ? "line-through"
                                                            : "none"
                                                }}
                                            >
                                                {item?.description ||
                                                    item?.item_name ||
                                                    "Unknown Item"}
                                            </Typography>

                                            {renderItemStatus(item)}

                                        </Box>


                                        <Typography
                                            level="body-xs"
                                            sx={{
                                                color: "neutral.500",
                                                mt: .4
                                            }}
                                        >
                                            Qty {item?.quantity || 0}
                                            {" × "}
                                            ₹{Number(
                                                item?.rate || 0
                                            ).toFixed(2)}
                                        </Typography>


                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent:
                                                    "space-between",
                                                alignItems:
                                                    "center",
                                                mt: 1
                                            }}
                                        >

                                            <Typography
                                                level="body-xs"
                                                sx={{
                                                    color:
                                                        "neutral.500"
                                                }}
                                            >
                                                GST{" "}
                                                {item?.gst || 0}%
                                            </Typography>


                                            <Typography
                                                sx={{
                                                    fontWeight: 900,
                                                    textDecoration:
                                                        returned
                                                            ? "line-through"
                                                            : "none"
                                                }}
                                            >
                                                ₹{amount.toFixed(2)}
                                            </Typography>

                                        </Box>


                                        {/* RETURN BUTTON */}

                                        {canModify &&
                                            status === "OPEN" && (

                                                <Button
                                                    size="sm"
                                                    variant="soft"
                                                    color="danger"
                                                    startDecorator={
                                                        <KeyboardReturnRoundedIcon />
                                                    }
                                                    sx={{
                                                        mt: 1,
                                                        fontSize: 11
                                                    }}
                                                    onClick={() =>
                                                        handleReturnClick(
                                                            item
                                                        )
                                                    }
                                                >
                                                    Mark as Returned
                                                </Button>

                                            )}

                                    </Box>

                                </Box>

                            </Sheet>

                        );

                    })}

                </Box>


                {/* =================================================
                    BILL TOTAL
                ================================================= */}

                <Sheet
                    sx={{
                        mt: 2,
                        p: 2,
                        borderRadius: 3,
                        background: "#fff",
                        border:
                            "1px solid rgba(0,0,0,.08)"
                    }}
                >

                    <Typography
                        level="title-sm"
                        sx={{
                            fontWeight: 800,
                            mb: 1.5
                        }}
                    >
                        Payment Summary
                    </Typography>


                    <TotalRow
                        label="Original Bill"
                        value={
                            Number(
                                currentBill.total_amount || 0
                            )
                        }
                    />

                    <TotalRow
                        label="Returned Items"
                        value={returnedTotal}
                        negative
                    />

                    <Divider sx={{ my: 1 }} />

                    <TotalRow
                        label="Current Bill Total"
                        value={activeTotal}
                        strong
                    />

                    <TotalRow
                        label="Paid Amount"
                        value={
                            Number(
                                currentBill.paid_amount || 0
                            )
                        }
                    />

                    <TotalRow
                        label="Balance"
                        value={
                            Math.max(
                                0,
                                activeTotal -
                                Number(
                                    currentBill.paid_amount || 0
                                )
                            )
                        }
                        strong
                    />

                </Sheet>


                {/* =================================================
                    CANCEL BILL
                ================================================= */}

                {canModify && (
                    <Button
                        fullWidth
                        variant="outlined"
                        color="danger"
                        startDecorator={
                            <CancelRoundedIcon />
                        }
                        loading={loading}
                        sx={{
                            mt: 2,
                            borderRadius: 3,
                            fontWeight: 800
                        }}
                        onClick={() => {

                            if (onCancelBill) {
                                onCancelBill(
                                    currentBill
                                );
                            }

                        }}
                    >
                        Cancel Entire Bill
                    </Button>
                )}

            </Box>


            {/* =====================================================
                RETURN CONFIRMATION
            ===================================================== */}

            {selectedReturnItem && (

                <Box
                    sx={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 100,
                        background:
                            "rgba(0,0,0,.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 2
                    }}
                >

                    <Sheet
                        variant="outlined"
                        sx={{
                            width: "100%",
                            maxWidth: 420,
                            p: 2.5,
                            borderRadius: 4,
                            background: "#fff",
                            boxShadow:
                                "0 20px 60px rgba(0,0,0,.25)"
                        }}
                    >

                        <Typography
                            level="title-lg"
                            sx={{
                                fontWeight: 900
                            }}
                        >
                            Return this item?
                        </Typography>

                        <Typography
                            level="body-sm"
                            sx={{
                                mt: 1,
                                color: "neutral.600"
                            }}
                        >
                            You are about to mark{" "}
                            <strong>
                                {selectedReturnItem.description}
                            </strong>{" "}
                            as returned.
                        </Typography>


                        <Box
                            sx={{
                                mt: 2,
                                p: 1.5,
                                borderRadius: 2,
                                background:
                                    "rgba(211,47,47,.06)"
                            }}
                        >

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between"
                                }}
                            >

                                <Typography
                                    level="body-sm"
                                >
                                    Item amount
                                </Typography>

                                <Typography
                                    sx={{
                                        fontWeight: 800
                                    }}
                                >
                                    ₹{Number(
                                        selectedReturnItem.amount ||
                                        0
                                    ).toFixed(2)}
                                </Typography>

                            </Box>

                        </Box>


                        <Box
                            sx={{
                                display: "flex",
                                justifyContent:
                                    "flex-end",
                                gap: 1,
                                mt: 2
                            }}
                        >

                            <Button
                                variant="plain"
                                onClick={() =>
                                    setSelectedReturnItem(null)
                                }
                            >
                                Keep Item
                            </Button>

                            <Button
                                color="danger"
                                loading={loading}
                                startDecorator={
                                    <KeyboardReturnRoundedIcon />
                                }
                                onClick={
                                    handleConfirmReturn
                                }
                            >
                                Confirm Return
                            </Button>

                        </Box>

                    </Sheet>

                </Box>

            )}

        </Drawer>

    );

};


/*
============================================================
INFO ITEM
============================================================
*/

const InfoItem = ({
    icon,
    label,
    value
}) => {

    return (

        <Box
            sx={{
                display: "flex",
                gap: 1,
                alignItems: "center"
            }}
        >

            <Box
                sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                        "rgba(88,46,125,.08)",
                    color: "#582e7d"
                }}
            >
                {React.cloneElement(
                    icon,
                    {
                        sx: {
                            fontSize: 18
                        }
                    }
                )}
            </Box>

            <Box>

                <Typography
                    level="body-xs"
                    sx={{
                        color: "neutral.500"
                    }}
                >
                    {label}
                </Typography>

                <Typography
                    level="body-sm"
                    sx={{
                        fontWeight: 700
                    }}
                >
                    {value}
                </Typography>

            </Box>

        </Box>

    );

};


/*
============================================================
SUMMARY BOX
============================================================
*/

const SummaryBox = ({
    label,
    value,
    danger = false
}) => {

    return (

        <Box
            sx={{
                p: 1,
                borderRadius: 2,
                background: "#fff"
            }}
        >

            <Typography
                level="body-xs"
                sx={{
                    color: "neutral.500"
                }}
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    fontWeight: 900,
                    color:
                        danger
                            ? "#d32f2f"
                            : "#222"
                }}
            >
                {value}
            </Typography>

        </Box>

    );

};


/*
============================================================
TOTAL ROW
============================================================
*/

const TotalRow = ({
    label,
    value,
    negative = false,
    strong = false
}) => {

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: .5
            }}
        >

            <Typography
                level="body-sm"
                sx={{
                    fontWeight: strong ? 800 : 500
                }}
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    fontWeight: strong ? 900 : 600,
                    color:
                        negative
                            ? "#d32f2f"
                            : "#222"
                }}
            >
                {negative ? "- " : ""}
                ₹{Number(value || 0).toFixed(2)}
            </Typography>

        </Box>

    );

};


export default memo(BillDetailsDrawer);

