
import React, { memo, useCallback, useState } from 'react'
import {
    Modal,
    ModalDialog,
    Box,
    Typography,
    Divider,
    Textarea,
} from '@mui/joy'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
    Business,
    CalendarMonth,
    CancelOutlined,
    CheckCircle,
    EngineeringOutlined,
    Inventory2Outlined,
    PaymentOutlined,
    GavelOutlined,
    PaymentsOutlined,
    ReceiptLongOutlined,
} from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { getmaterialDetails } from '../WorkOrderCommonApi'

const WoApprovalModal = ({
    selectedWO,
    onClose,
    level_name,
    level_no,
    empid,
}) => {
    const [remarks, setRemarks] = useState('')
    const [status, setStatus] = useState(
        selectedWO.wo_current_level_review_status
    )
    const queryClient = useQueryClient()

    const isPending = status === 'P'
    // const isApproved = status === 'A'
    // const isRejected = status === 'R'

    /* ---------------- FETCH DETAILS ONLY IF PENDING ---------------- */
    const { data } = useQuery({
        queryKey: ['woDetails', selectedWO?.wo_slno],
        queryFn: () => getmaterialDetails(selectedWO.wo_slno),
        enabled: isPending && !!selectedWO?.wo_slno,
    })

    const woData = data?.[0]

    /* ---------------- HELPERS ---------------- */
    const formatDate = d =>
        d ? new Date(d).toLocaleDateString('en-IN') : '-'

    /* ---------------- ACTIONS ---------------- */
    const handleApprove = useCallback(async () => {
        const obj = {
            level_name,
            level_no,
            wo_slno: selectedWO.wo_slno,
            remarks,
            empid,
            review_status: 'A',
        }

        const result = await axioslogin.post('/workOrder/woLevelApproval', obj)

        if (result.data?.success === 1) {
            succesNotify(result.data.message)
            setStatus('A')
            queryClient.invalidateQueries('GetWorkOrderDetails');
        } else {
            warningNotify(result.data.message)
        }
    }, [level_name, level_no, remarks, empid, selectedWO, queryClient])

    const handleReject = useCallback(async () => {
        if (!remarks) return
        const obj = {
            level_name,
            level_no,
            wo_slno: selectedWO.wo_slno,
            remarks,
            empid,
            review_status: 'R',
        }

        const result = await axioslogin.post('/workOrder/woLevelApproval', obj)
        if (result.data?.success === 1) {
            warningNotify('Work order rejected')
            setStatus('R')
            queryClient.invalidateQueries('GetWorkOrderDetails');
        } else {
            warningNotify(result.data.message)
        }
    }, [level_name, level_no, remarks, empid, selectedWO, queryClient])

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
                        bgcolor: '#7C51A1',
                    }}
                >
                    <Box>
                        <Typography level="h4" sx={{ color: 'white' }}>
                            Work Order #{selectedWO.wo_slno}
                        </Typography>
                        <Typography
                            level="body-sm"
                            sx={{ color: 'white' }}
                            startDecorator={<Business />}
                        >
                            {selectedWO.it_supplier_name}
                        </Typography>
                    </Box>

                    <CloseIcon
                        onClick={onClose}
                        sx={{ cursor: 'pointer', color: 'white' }}
                    />
                </Box>

                {/* ================= BODY (ONLY FOR PENDING) ================= */}
                {isPending && (
                    <Box sx={{ p: 3, maxHeight: '70vh', overflowY: 'auto' }}>
                        {/* INFO */}
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
                                value={selectedWO.sec_name}
                            />
                            <InfoCard
                                icon={<CalendarMonth />}
                                label="From Date"
                                value={formatDate(selectedWO.wo_fromdate)}
                            />
                            <InfoCard
                                icon={<CalendarMonth />}
                                label="To Date"
                                value={formatDate(selectedWO.wo_todate)}
                            />
                        </Box>

                        <Section icon={<Inventory2Outlined />} title="Material Details">

                            {woData?.material_details?.length
                                ? woData.material_details.map((m, i) => (
                                    <Row key={m.wom_slno}>
                                        <b>{i + 1}. {m.item_name}</b><br />
                                        Qty: {m.item_qty} {m.umo} ·
                                        Rate: ₹{m.unit_price} ·
                                        <b> Total: ₹{m.gross_amt}</b>
                                    </Row>
                                ))
                                : <Empty />}
                        </Section>

                        <Section icon={<EngineeringOutlined />} title="Labour Details">
                            {woData?.labour_details?.length
                                ? woData.labour_details.map((l, i) => (
                                    <Row key={l.wol_slno}>
                                        <b>{i + 1}. {l.labour_desc}</b><br />
                                        Qty: {l.qty} · Rate: ₹{l.unit_rate}
                                    </Row>
                                ))
                                : <Empty />}
                        </Section>

                        <Section icon={<PaymentOutlined />} title="Retention">
                            {woData?.retention_details?.length
                                ? woData.retention_details.map(r => (
                                    <Row key={r.wor_slno}>
                                        ₹{r.rent_amount} – {r.rent_description}
                                    </Row>
                                ))
                                : <Empty />}
                        </Section>

                        <Section icon={<GavelOutlined />} title="Terms & Conditions">
                            {woData?.terms_conditions?.map((t, i) => (
                                <Row key={t.wot_slno}>
                                    {i + 1}. {t.term_desc}
                                </Row>
                            ))}
                        </Section>

                        <Section icon={<PaymentsOutlined />} title="Payment Terms & Conditions">
                            {woData?.payment_terms?.map((t, i) => (
                                <Row key={t.wop_slno}>
                                    {i + 1}. {t.term_desc}
                                </Row>
                            ))}
                        </Section>

                        <Section icon={<ReceiptLongOutlined />} title="Billing Terms & Conditions">
                            {woData?.billing_terms?.map((t, i) => (
                                <Row key={t.wob_slno}>
                                    {i + 1}. {t.term_desc}
                                </Row>
                            ))}
                        </Section>

                        <Textarea
                            minRows={3}
                            value={remarks}
                            placeholder="Enter remarks"
                            onChange={e => setRemarks(e.target.value)}
                        />
                    </Box>
                )}

                {isPending && (
                    <Box
                        sx={{
                            p: 2,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 2,
                            borderTop: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Box
                            onClick={handleApprove}
                            sx={actionBtn('#C47BE4')}
                        >
                            <CheckCircle sx={{ color: "white" }} /> Approve
                        </Box>

                        <Box
                            onClick={remarks ? handleReject : undefined}
                            sx={actionBtn(remarks ? '#92487A' : '#F3B6B5')}
                        >
                            <CancelOutlined sx={{ color: "white" }} /> Reject
                        </Box>
                    </Box>
                )}
            </ModalDialog>
        </Modal>
    )
}

/* ================= UI HELPERS ================= */

const actionBtn = bg => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    px: 3,
    py: 1.2,
    borderRadius: '999px',
    bgcolor: bg,
    color: 'white',
    fontWeight: 600,
    cursor: 'pointer',
})

const Section = ({ title, icon, color = '#DDAED3', children }) => (
    <Box sx={{ mb: 2.5 }}>
        <Typography
            fontWeight={600}
            startDecorator={icon}
            color={color}
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
    <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
        <Typography level="body-xs" startDecorator={icon}>
            {label}
        </Typography>
        <Typography fontWeight={600}>{value}</Typography>
    </Box>
)

const Empty = () => (
    <Typography level="body-sm" color="neutral">
        No data available
    </Typography>
)

export default memo(WoApprovalModal)
