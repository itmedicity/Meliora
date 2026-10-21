
import React, { useMemo } from "react";
import {
    Modal,
    ModalDialog,
    ModalClose,
    Box,
    Divider,
    Chip,
    Table,
    Sheet,
    CircularProgress,
} from "@mui/joy";

import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";

// import DietTextComponent from "../DietComponent/DietTextComponent";
import { useGetBillingDetails } from "../CommonData/UseQuery";

const PURPLE = "#76509b";
const BORDER = "#e5e7eb";
const TEXT = "#292536";
const MUTED = "#777487";
const FONT = "Bahnschrift";

const formatAmount = (value) => {
    const amount = Number(value ?? 0);

    return `₹${(Number.isFinite(amount) ? amount : 0).toLocaleString(
        "en-IN",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }
    )}`;
};

const getValue = (...values) =>
    values.find(
        (value) =>
            value !== undefined &&
            value !== null &&
            value !== ""
    ) ?? "-";

const formatDate = (value) => {
    if (!value || value === "-") return "-";

    const date = new Date(
        typeof value === "string" && value.includes(" ")
            ? value.replace(" ", "T")
            : value
    );

    if (Number.isNaN(date.getTime())) return String(value);

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const DetailItem = ({ label, value, color = TEXT }) => (
    <Box sx={{ minWidth: 0 }}>
        <Box
            sx={{
                fontFamily: FONT,
                fontSize: 11,
                color: MUTED,
                mb: 0.5,
            }}
        >
            {label}
        </Box>

        <Box
            sx={{
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: 600,
                color,
                overflowWrap: "anywhere",
            }}
        >
            {String(value ?? "-")}
        </Box>
    </Box>
);

const SectionTitle = ({ icon, title, count }) => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.5,
            gap: 1,
        }}
    >
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    bgcolor: "#f2edf8",
                    color: PURPLE,
                }}
            >
                {icon}
            </Box>

            <Box
                sx={{
                    fontFamily: FONT,
                    fontSize: 14,
                    fontWeight: 700,
                    color: TEXT,
                }}
            >
                {title}
            </Box>
        </Box>

        {count !== undefined && (
            <Chip
                size="sm"
                variant="soft"
                sx={{
                    fontFamily: FONT,
                    fontSize: 11,
                    bgcolor: "#f2edf8",
                    color: PURPLE,
                }}
            >
                {count} items
            </Chip>
        )}
    </Box>
);

const CollectionAssignmentPreviewModal = ({
    open,
    onClose,
    selectedBill,
}) => {
    const billingId = selectedBill?.billing_id;

    const {
        data: billingDetailsResponse,
        isLoading,
        isError,
    } = useGetBillingDetails(billingId);


    const bill = selectedBill || {};

    const billingItems = useMemo(() => {
        const response = billingDetailsResponse;

        if (Array.isArray(response)) return response;
        if (Array.isArray(response?.data)) return response.data;
        if (Array.isArray(response?.data?.data)) {
            return response.data.data;
        }
        if (Array.isArray(response?.details)) {
            return response.details;
        }
        if (Array.isArray(response?.billingDetails)) {
            return response.billingDetails;
        }

        return [];
    }, [billingDetailsResponse]);

    const totalAmount = Number(bill.total_amount ?? 0) || 0;

    const status = String(
        getValue(bill.billing_status, "OPEN")
    ).toUpperCase();

    const statusColor =
        status === "PAID"
            ? "success"
            : status === "CANCELLED"
                ? "danger"
                : status === "PARTIAL"
                    ? "warning"
                    : "neutral";

    if (!selectedBill) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog
                layout="center"
                sx={{
                    width: { xs: "96vw", sm: 680, md: 780 },
                    maxWidth: "96vw",
                    maxHeight: "90dvh",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    p: 0,
                    gap: 0,
                    border: `1px solid ${BORDER}`,
                    borderRadius: "12px",
                    boxShadow: "0 16px 48px rgba(30, 20, 45, 0.16)",
                    fontFamily: FONT,
                }}
            >
                {/* HEADER */}
                <Box
                    sx={{
                        px: 2.5,
                        py: 2,
                        pr: 6,
                        borderBottom: `1px solid ${BORDER}`,
                        bgcolor: "#fff",
                        flexShrink: 0,
                    }}
                >
                    <ModalClose sx={{ top: 14, right: 14 }} />

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.2,
                        }}
                    >
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                flexShrink: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: "#f2edf8",
                                color: PURPLE,
                                borderRadius: "9px",
                            }}
                        >
                            <ReceiptLongOutlinedIcon />
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Box
                                sx={{
                                    fontFamily: FONT,
                                    fontSize: 18,
                                    fontWeight: 700,
                                    color: TEXT,
                                }}
                            >
                                Bill Details
                            </Box>

                            <Box
                                sx={{
                                    fontFamily: FONT,
                                    fontSize: 12,
                                    color: MUTED,
                                    mt: 0.3,
                                    overflowWrap: "anywhere",
                                }}
                            >
                                {getValue(bill.bill_no)}
                            </Box>
                        </Box>

                        <Chip
                            size="sm"
                            color={statusColor}
                            variant="soft"
                            sx={{ fontFamily: FONT }}
                        >
                            {status}
                        </Chip>
                    </Box>
                </Box>

                {/* CONTENT */}
                <Box
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        overflowY: "auto",
                        px: { xs: 2, sm: 2.5 },
                        py: 2.2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2.2,
                        fontFamily: FONT,
                    }}
                >
                    {/* PATIENT DETAILS */}
                    <Box>
                        <SectionTitle
                            icon={
                                <PersonOutlineOutlinedIcon
                                    fontSize="small"
                                />
                            }
                            title="Patient Details"
                        />

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr 1fr",
                                    sm: "repeat(3, minmax(0, 1fr))",
                                },
                                gap: { xs: 2, sm: 2.5 },
                                p: 2,
                                border: `1px solid ${BORDER}`,
                                borderRadius: "9px",
                                bgcolor: "#fff",
                            }}
                        >
                            <DetailItem
                                label="Patient Name"
                                value={getValue(bill.patient_name)}
                            />

                            <DetailItem
                                label="Patient ID"
                                value={getValue(bill.patient_id)}
                            />

                            <DetailItem
                                label="IP Number"
                                value={getValue(
                                    bill.ip_number,
                                    bill.admission_id
                                )}
                            />

                            <DetailItem
                                label="Nursing Station"
                                value={getValue(bill.nursing_station)}
                            />

                            <DetailItem
                                label="Room / Bed"
                                value={getValue(bill.bed_number)}
                            />

                            <DetailItem
                                label="Mobile Number"
                                value={getValue(bill.patient_mobile)}
                            />
                        </Box>
                    </Box>

                    <Divider sx={{ "--Divider-lineColor": BORDER }} />

                    {/* BILL INFORMATION */}
                    <Box>
                        <SectionTitle
                            icon={
                                <ReceiptLongOutlinedIcon
                                    fontSize="small"
                                />
                            }
                            title="Bill Information"
                        />

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr 1fr",
                                    sm: "repeat(4, minmax(0, 1fr))",
                                },
                                gap: 2,
                                p: 2,
                                border: `1px solid ${BORDER}`,
                                borderRadius: "9px",
                            }}
                        >
                            <DetailItem
                                label="Bill Number"
                                value={getValue(bill.bill_no)}
                            />

                            <DetailItem
                                label="Bill Date"
                                value={formatDate(bill.billing_date)}
                            />

                            <DetailItem
                                label="Bill Type"
                                value={getValue(bill.bill_type)}
                            />

                            <DetailItem
                                label="Payment Type"
                                value={getValue(bill.bill_pay_type)}
                            />
                        </Box>
                    </Box>

                    <Divider sx={{ "--Divider-lineColor": BORDER }} />

                    {/* BILL ITEMS */}
                    <Box>
                        <SectionTitle
                            icon={
                                <LocalDiningOutlinedIcon
                                    fontSize="small"
                                />
                            }
                            title="Bill Items"
                            count={billingItems.length}
                        />

                        {isLoading ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 1,
                                    py: 4,
                                }}
                            >
                                <CircularProgress size="sm" />

                                <Box
                                    sx={{
                                        fontFamily: FONT,
                                        fontSize: 12,
                                        color: MUTED,
                                    }}
                                >
                                    Loading bill items...
                                </Box>
                            </Box>
                        ) : isError ? (
                            <Box
                                sx={{
                                    p: 2,
                                    textAlign: "center",
                                    border: `1px solid ${BORDER}`,
                                    borderRadius: "9px",
                                    fontFamily: FONT,
                                    fontSize: 13,
                                    color: "#b3261e",
                                }}
                            >
                                Unable to load billing items.
                            </Box>
                        ) : billingItems.length === 0 ? (
                            <Box
                                sx={{
                                    p: 3,
                                    textAlign: "center",
                                    border: `1px dashed ${BORDER}`,
                                    borderRadius: "9px",
                                    fontFamily: FONT,
                                    fontSize: 13,
                                    color: MUTED,
                                }}
                            >
                                No billing items found.
                            </Box>
                        ) : (
                            <Sheet
                                variant="outlined"
                                sx={{
                                    overflowX: "auto",
                                    borderRadius: "9px",
                                    borderColor: BORDER,
                                }}
                            >
                                <Table
                                    size="sm"
                                    hoverRow
                                    sx={{
                                        minWidth: 600,
                                        fontFamily: FONT,
                                        "--TableCell-headBackground":
                                            "#f7f6f9",
                                        "--TableCell-borderColor":
                                            BORDER,
                                        "& thead th": {
                                            fontFamily: FONT,
                                            fontSize: 11,
                                            fontWeight: 700,
                                            color: "#666174",
                                            whiteSpace: "nowrap",
                                            py: 1.3,
                                            px: 1.5,
                                        },
                                        "& tbody td": {
                                            fontFamily: FONT,
                                            fontSize: 12,
                                            color: TEXT,
                                            py: 1.3,
                                            px: 1.5,
                                            verticalAlign: "middle",
                                        },
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            <th style={{ width: 38 }}>#</th>
                                            <th>Item Description</th>
                                            <th style={{ textAlign: "right" }}>
                                                Qty
                                            </th>
                                            <th style={{ textAlign: "right" }}>
                                                Rate
                                            </th>
                                            <th style={{ textAlign: "right" }}>
                                                GST
                                            </th>
                                            <th style={{ textAlign: "right" }}>
                                                Amount
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {billingItems.map((item, index) => (
                                            <tr
                                                key={
                                                    item.billing_detail_id ??
                                                    `${item.item_id}-${index}`
                                                }
                                            >
                                                <td>{index + 1}</td>

                                                <td>
                                                    <Box
                                                        sx={{
                                                            fontFamily: FONT,
                                                            fontSize: 12,
                                                            fontWeight: 600,
                                                            minWidth: 140,
                                                        }}
                                                    >
                                                        {getValue(
                                                            item.item_name,
                                                            item.description
                                                        )}
                                                    </Box>
                                                </td>

                                                <td
                                                    style={{
                                                        textAlign: "right",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {Number(
                                                        item.quantity ?? 0
                                                    ).toLocaleString("en-IN")}
                                                </td>

                                                <td
                                                    style={{
                                                        textAlign: "right",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {formatAmount(item.rate)}
                                                </td>

                                                <td
                                                    style={{
                                                        textAlign: "right",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {Number(item.gst ?? 0)}%
                                                </td>

                                                <td
                                                    style={{
                                                        textAlign: "right",
                                                        whiteSpace: "nowrap",
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {formatAmount(item.amount)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Sheet>
                        )}

                        {/* BILL TOTAL */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 2,
                                mt: 1.5,
                                p: 2,
                                bgcolor: "#f7f4fa",
                                border: "1px solid #e8dff0",
                                borderRadius: "9px",
                            }}
                        >
                            <Box>
                                <Box
                                    sx={{
                                        fontFamily: FONT,
                                        fontSize: 14,
                                        fontWeight: 700,
                                        color: TEXT,
                                    }}
                                >
                                    Bill Total
                                </Box>

                                <Box
                                    sx={{
                                        fontFamily: FONT,
                                        fontSize: 11,
                                        color: MUTED,
                                        mt: 0.3,
                                    }}
                                >
                                    {billingItems.length} line items
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    fontFamily: FONT,
                                    fontSize: { xs: 19, sm: 22 },
                                    fontWeight: 700,
                                    color: PURPLE,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {formatAmount(totalAmount)}
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* FOOTER */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        px: 2.5,
                        py: 1.5,
                        borderTop: `1px solid ${BORDER}`,
                        bgcolor: "#fff",
                        flexShrink: 0,
                    }}
                >
                    <Box
                        component="button"
                        type="button"
                        onClick={onClose}
                        sx={{
                            px: 2.5,
                            py: 1,
                            border: 0,
                            borderRadius: "7px",
                            bgcolor: PURPLE,
                            color: "#fff",
                            cursor: "pointer",
                            fontFamily: FONT,
                            fontSize: 13,
                            fontWeight: 600,
                            "&:hover": {
                                bgcolor: "#624080",
                            },
                        }}
                    >
                        Close
                    </Box>
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default CollectionAssignmentPreviewModal;
