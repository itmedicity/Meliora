import React, { memo, useCallback, useState } from 'react'
import {
    Modal,
    ModalDialog,
    Box,
    Typography,
    Chip,
    Divider,
    Button,
    Textarea,
} from '@mui/joy'
// import Inventory2Icon from '@mui/icons-material/Inventory2'
// import EngineeringIcon from '@mui/icons-material/Engineering'
// import GavelIcon from '@mui/icons-material/Gavel'
// import PaymentsIcon from '@mui/icons-material/Payments'
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
// import CheckCircleIcon from '@mui/icons-material/CheckCircle'
// import CancelIcon from '@mui/icons-material/Cancel'
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
// import BusinessIcon from '@mui/icons-material/Business'
import { useQuery } from '@tanstack/react-query'
import { getmaterialDetails } from '../WorkOrderCommonApi'
import { Business, CalendarMonth, CancelOutlined, CheckCircle, EngineeringOutlined, GavelOutlined, InfoOutlined, Inventory2Outlined, PaymentOutlined } from '@mui/icons-material'

const STATUS_MAP = {
    0: { label: 'Pending', color: 'warning' },
    1: { label: 'Approved', color: 'success' },
    2: { label: 'Rejected', color: 'danger' },
}

const WoApprovalModal = ({ selectedWO, onClose,
    // ApprovalDepartments
}) => {
    const { data } = useQuery({
        queryKey: ['woDetails', selectedWO?.wo_slno],
        queryFn: () => getmaterialDetails(selectedWO.wo_slno),
        enabled: !!selectedWO?.wo_slno,
    })

    // const { level_name, level_no } = ApprovalDepartments

    // console.log("ApprovalDepartments:", level_name);

    const woData = data?.[0]
    const [remarks, setRemarks] = useState('')
    const status = STATUS_MAP[selectedWO?.approval_status]
    // const approval = APPROVAL_STATUS[selectedWO?.approval_status]


    const capitalizeFirst = (text = '') =>
        text
            .toLowerCase()
            .replace(/^\w/, c => c.toUpperCase())


    const handleApprovals = useCallback((val) => {
        // console.log("val", val);
    }, [])

    return (
        <Modal open onClose={onClose}>
            <ModalDialog
                sx={{
                    width: 950,
                    p: 0,
                    borderRadius: 'lg',
                    overflow: 'hidden',
                }}
            >
                {/* ================= HEADER ================= */}
                <Box
                    sx={{
                        p: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        bgcolor: "#7C51A1",
                        borderBottom: '1px solid',
                        borderColor: 'divider',

                    }}
                >
                    <Box>
                        <Typography level="h4" sx={{ color: "white" }}>
                            Work Order #{selectedWO.wo_slno}
                        </Typography>
                        <Typography level="body-sm" sx={{ color: "white" }} startDecorator={
                            // <BusinessIcon sx={{ color: "white" }} />
                            <Business sx={{ color: "white" }} />

                        }>
                            {selectedWO.it_supplier_name}
                        </Typography>
                    </Box>

                    {/* <Chip
                        variant="solid"
                        size="lg"
                        sx={{
                            color: status.color
                        }}
                    >
                        {status.label}
                    </Chip> */}


                    <Chip
                        color={status?.color || 'neutral'}
                    >
                        {status?.label || 'Unknown'}
                    </Chip>
                </Box>

                {/* ================= BODY ================= */}
                <Box sx={{ p: 3, maxHeight: '70vh', overflowY: 'auto' }}>
                    {/* -------- INFO CARDS -------- */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 2,
                            mb: 3,
                        }}
                    >
                        <InfoCard
                            icon={<Business />}
                            label="Department"
                            value={capitalizeFirst(selectedWO.sec_name)}
                        />
                        <InfoCard
                            icon={
                                // <CalendarMonthIcon />
                                <CalendarMonth />
                            }
                            label="From Date"
                            value={formatDate(selectedWO.wo_fromdate)}
                        />
                        <InfoCard
                            icon={
                                <CalendarMonth />

                                // <CalendarMonthIcon />
                            }
                            label="To Date"
                            value={formatDate(selectedWO.wo_todate)}
                        />
                    </Box>

                    {/* -------- MATERIAL -------- */}
                    <Section icon={
                        // <Inventory2Icon />
                        <Inventory2Outlined />
                    } title="Material Details">
                        {woData?.material_details?.length ? (
                            woData.material_details.map((m, i) => (
                                <Row key={m.wom_slno}>
                                    <b>{i + 1}. {m.item_name}</b><br />
                                    Qty: {m.item_qty} {m.umo} ·
                                    Rate: ₹{m.unit_price} ·
                                    GST: ₹{m.gst_amt} ·
                                    <b>Total: ₹{m.gross_amt}</b>
                                </Row>
                            ))
                        ) : <Empty />}
                    </Section>

                    {/* -------- LABOUR -------- */}
                    <Section icon={
                        // <EngineeringIcon />
                        <EngineeringOutlined />
                    } title="Labour Details">
                        {woData?.labour_details?.length ? (
                            woData.labour_details.map((l, i) => (
                                <Row key={l.wol_slno}>
                                    <b>{i + 1}. {l.labour_desc}</b><br />
                                    Qty: {l.qty} · {l.rate_type} ·
                                    Rate: ₹{l.unit_rate} ·
                                    <b>Total: ₹{l.total}</b>
                                </Row>
                            ))
                        ) : <Empty />}
                    </Section>

                    {/* -------- RETENTION -------- */}
                    <Section icon={
                        // <PaymentsIcon />
                        <PaymentOutlined />
                    } title="Retention Details">
                        {woData?.retention_details?.length ? (
                            woData.retention_details.map(r => (
                                <Row key={r.wor_slno}>
                                    ₹{r.rent_amount} – {r.rent_description}
                                </Row>
                            ))
                        ) : <Empty />}
                    </Section>

                    {/* -------- TERMS -------- */}
                    <Section icon={
                        // <GavelIcon />
                        <GavelOutlined />
                    } title="Terms & Conditions">
                        {woData?.terms_conditions?.map((t, i) => (
                            <Row key={t.wot_slno}>{i + 1}. {t.term_desc}</Row>
                        ))}
                    </Section>
                    <Section icon={<GavelOutlined />} title="Payment Terms & Conditions">
                        {woData?.payment_terms?.map((t, i) => (
                            <Row key={t.wop_slno}>{i + 1}. {t.term_desc}</Row>
                        ))}
                    </Section>
                    <Section icon={<GavelOutlined />} title="Billing Terms & Conditions">
                        {woData?.billing_terms?.map((t, i) => (
                            <Row key={t.wob_slno}>{i + 1}. {t.term_desc}</Row>
                        ))}
                    </Section>

                    {/* -------- REMARKS -------- */}
                    {selectedWO.approval_status === 0 && (
                        <Section icon={
                            // <InfoOutlinedIcon />
                            <InfoOutlined />
                        } title=" Remarks">
                            <Textarea
                                minRows={3}
                                value={remarks}
                                placeholder="Enter reason "
                                onChange={e => setRemarks(e.target.value)}
                            />
                        </Section>
                    )}
                </Box>

                {/* ================= FOOTER ================= */}
                {selectedWO.approval_status === 0 && (
                    <Box
                        sx={{
                            p: 2,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 1.5,
                            borderTop: '1px solid',
                            borderColor: 'divider',
                            bgcolor: 'background.level1',
                        }}
                    >
                        <Button

                            size="lg"
                            startDecorator={
                                // <CheckCircleIcon />
                                <CheckCircle />
                            }
                            onClick={() => handleApprovals(selectedWO?.wo_slno)}
                            sx={{ color: "success" }}
                        >
                            Approve
                        </Button>

                        <Button
                            // color="danger"
                            size="lg"
                            variant="soft"
                            startDecorator={
                                // <CancelIcon />
                                <CancelOutlined />
                            }
                            disabled={!remarks}
                            sx={{ color: "danger" }}
                        >
                            Reject
                        </Button>
                    </Box>
                )}
            </ModalDialog>
        </Modal>
    )
}

/* ================= UI HELPERS ================= */

const Section = ({ title, icon, children }) => (
    <Box
        sx={{
            mb: 2.5,
            p: 2,
            borderRadius: 'md',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.level1',
        }}
    >
        <Typography
            fontWeight={600}
            mb={1}
            startDecorator={icon}
        >
            {title}
        </Typography>
        <Divider sx={{ mb: 1 }} />
        {children}
    </Box>
)

const Row = ({ children }) => (
    <Typography level="body-sm" sx={{ mb: 1 }}>
        {children}
    </Typography>
)

const InfoCard = ({ label, value, icon }) => (
    <Box
        sx={{
            p: 2,
            borderRadius: 'md',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.level1',
        }}
    >
        <Typography level="body-xs" startDecorator={icon}>
            {label}
        </Typography>
        <Typography fontWeight={600}>{value}</Typography>
    </Box>
)

const Empty = () => (
    <Typography level="body-sm" sx={{ color: "neutral" }}>
        No data available
    </Typography>
)

const formatDate = d =>
    d ? new Date(d).toLocaleDateString('en-IN') : '-'

export default memo(WoApprovalModal)

