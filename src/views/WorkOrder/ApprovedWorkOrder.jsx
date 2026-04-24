
import React, { memo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    Modal,
    ModalDialog,
    Box,
    Typography,
    Chip,
    Sheet,
} from "@mui/joy";
import {
    Business,
    EngineeringOutlined,
    Inventory2Outlined,
    PaymentOutlined,
    GavelOutlined,
    PaymentsOutlined,
    ReceiptLongOutlined,
    CheckCircleOutline,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

import { getmaterialDetails } from "./WorkOrderCommonApi";
import {
    formatDate,
    // DetailCard,
    InfoCards,
    DetailsSection,
    ListSection,
} from "./ReUsableCodes";
import DetailCard from "./Components/DetailCard";

/* ================= MAIN COMPONENT ================= */

const ApprovedWorkOrder = ({ setOpen, setSelectedData, SelectedData }) => {

    // console.log("setSelectedData:", setSelectedData);

    const { data } = useQuery({
        queryKey: ["woDetails", SelectedData?.wo_no],
        queryFn: () => getmaterialDetails(SelectedData.wo_no),
        enabled: !!SelectedData?.wo_no,
    });

    const woApprovalData = data?.[0];

    const handleClose = useCallback(() => {
        setOpen(0);
        setSelectedData([]);
    }, [setOpen, setSelectedData]);

    return (
        <Modal open={Boolean(SelectedData?.wo_no)} onClose={handleClose}>
            <ModalDialog
                sx={{
                    width: 980,
                    p: 0,
                    borderRadius: "lg",
                    overflow: "hidden",
                }}
            >
                {/* ================= HEADER ================= */}
                <Box
                    sx={{
                        px: 3,
                        py: 2.5,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background:
                            "linear-gradient(135deg, #6a4c93 0%, #8e5ea2 100%)",
                    }}
                >
                    <Box>
                        <Typography level="h4" sx={{ color: "#fff" }}>
                            Work Order #{SelectedData.wo_no}
                        </Typography>

                        <Typography
                            level="body-sm"
                            sx={{ color: "neutral.200" }}
                            startDecorator={<Business />}
                        >
                            {SelectedData.it_supplier_name}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Chip
                            color="success"
                            variant="soft"
                            startDecorator={<CheckCircleOutline />}
                        >
                            Approved
                        </Chip>
                        <CloseIcon
                            onClick={handleClose}
                            sx={{ cursor: "pointer", color: "#fff" }}
                        />
                    </Box>
                </Box>

                {/* ================= BODY ================= */}
                <Box sx={{ p: 3, maxHeight: "70vh", overflowY: "auto" }}>
                    <InfoCards data={SelectedData} />

                    <DetailsSection
                        icon={<Inventory2Outlined />}
                        title="Material Details"
                        data={woApprovalData?.material_details}
                        renderItem={(m, i) => (
                            <DetailCard key={m.wom_slno}>
                                <Typography fontWeight={600}>
                                    {i + 1}. {m.item_name}
                                </Typography>
                                <Typography level="body-sm">
                                    Qty: {m.item_qty} {m.umo} · Rate: ₹
                                    {m.unit_price}
                                </Typography>
                                <Typography fontWeight={600}>
                                    Total: ₹{m.gross_amt}
                                </Typography>
                            </DetailCard>
                        )}
                    />

                    <DetailsSection
                        icon={<EngineeringOutlined />}
                        title="Labour Details"
                        data={woApprovalData?.labour_details}
                        renderItem={(l, i) => (
                            <DetailCard key={l.wol_slno}>
                                <Typography fontWeight={600}>
                                    {i + 1}. {l.labour_desc}
                                </Typography>
                                <Typography level="body-sm">
                                    Qty: {l.qty} · Rate: ₹{l.unit_rate}
                                </Typography>
                            </DetailCard>
                        )}
                    />

                    <DetailsSection
                        icon={<PaymentOutlined />}
                        title="Retention"
                        data={woApprovalData?.retention_details}
                        renderItem={(r) => (
                            <DetailCard key={r.wor_slno}>
                                ₹{r.rent_amount} — {r.rent_description}
                            </DetailCard>
                        )}
                    />

                    <ListSection
                        icon={<GavelOutlined />}
                        title="Terms & Conditions"
                        data={woApprovalData?.terms_conditions}
                    />

                    <ListSection
                        icon={<PaymentsOutlined />}
                        title="Payment Terms"
                        data={woApprovalData?.payment_terms}
                    />

                    <ListSection
                        icon={<ReceiptLongOutlined />}
                        title="Billing Terms"
                        data={woApprovalData?.billing_terms}
                    />
                </Box>

                {/* ================= FOOTER ================= */}
                <Sheet
                    variant="soft"
                    sx={{
                        px: 3,
                        py: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        borderTop: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Typography level="body-sm">
                        <b>Approved By:</b> {SelectedData?.em_name}
                    </Typography>
                    <Typography level="body-sm">
                        <b>Approved On:</b>{" "}
                        {formatDate(SelectedData?.wo_approval_date)}
                    </Typography>
                </Sheet>
            </ModalDialog>
        </Modal>
    );
};

export default memo(ApprovedWorkOrder);

