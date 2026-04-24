import React, { memo, useCallback, useState } from 'react'
import {
    Modal,
    ModalDialog,
    Box,
    Typography,
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
import {
    actionBtn,
    Empty,
    formatDate,
    ListRow,
} from '../ReUsableCodes'
import Section from '../Components/Section'
import Infocard from '../Components/Infocard'
import DetailCard from '../Components/DetailCard'

/* ================= REUSABLE HELPERS ================= */

const DetailsSection = ({ icon, title, data = [], renderItem }) => (
    <Section icon={icon} title={title}>
        {data.length ? data.map(renderItem) : <Empty />}
    </Section>
)

const ListSection = ({ icon, title, data = [] }) => (
    <Section icon={icon} title={title}>
        {data.length ? (
            data.map((t, i) => (
                <ListRow key={t.wot_slno || t.wop_slno || t.wob_slno}>
                    {i + 1}. {t.term_desc}
                </ListRow>
            ))
        ) : (
            <Empty />
        )}
    </Section>
)

/* ================= MAIN COMPONENT ================= */

const WoApprovalModal = ({
    setView,
    open,
    setOpen,
    selectedWO,
    empid,
    level_name,
    level_no
}) => {

    const [remarks, setRemarks] = useState('')
    const [status, setStatus] = useState(
        selectedWO.wo_current_level_review_status
    )
    const queryClient = useQueryClient()

    const isPending = status === 'P'

    /* -------- FETCH DETAILS (ONLY IF PENDING) -------- */
    const { data } = useQuery({
        queryKey: ['woDetails', selectedWO?.wo_slno],
        queryFn: () => getmaterialDetails(selectedWO.wo_slno),
        enabled: isPending && !!selectedWO?.wo_slno,
    })

    const woData = data?.[0]

    /* ---------------- APPROVE / REJECT ---------------- */
    const handleAction = useCallback(
        async (review_status) => {
            if (review_status === 'R' && !remarks) return

            const obj = {
                level_name,
                level_no,
                wo_slno: selectedWO.wo_slno,
                remarks,
                empid,
                review_status,
            }

            const result = await axioslogin.post(
                '/workOrder/woLevelApproval',
                obj
            )

            if (result.data?.success === 1) {
                review_status === 'A'
                    ? succesNotify(result.data.message)
                    : succesNotify('Work order Rejected')

                setStatus(review_status)
                setOpen(false)
                setView(0)
                queryClient.invalidateQueries('GetWorkOrderDetails')
            } else {
                warningNotify(result.data.message)
                setOpen(false)
                setView(0)
            }
        },
        [level_name, level_no, remarks, empid, selectedWO, queryClient, setOpen, setView]
    )

    const handleClose = useCallback(() => {
        setOpen(false)
        setView(0)
    }, [setOpen, setView])

    return (
        <Modal open={open} onClose={handleClose} >
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
                            startDecorator={
                                <Business sx={{ color: 'white' }} />
                            }
                        >
                            {selectedWO.it_supplier_name}
                        </Typography>
                    </Box>

                    <CloseIcon
                        onClick={handleClose}
                        sx={{ cursor: 'pointer', color: 'white' }}
                    />
                </Box>

                {/* ================= BODY ================= */}
                {/* {isPending && ( */}
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
                        <Infocard
                            icon={<Business />}
                            label="Department"
                            value={selectedWO.sec_name}
                        />
                        <Infocard
                            icon={<CalendarMonth />}
                            label="From Date"
                            value={formatDate(
                                selectedWO.wo_fromdate
                            )}
                        />
                        <Infocard
                            icon={<CalendarMonth />}
                            label="To Date"
                            value={formatDate(selectedWO.wo_todate)}
                        />
                    </Box>

                    {/* -------- MATERIAL -------- */}
                    <DetailsSection
                        icon={<Inventory2Outlined />}
                        title="Material Details"
                        data={woData?.material_details}
                        renderItem={(m, i) => (
                            <DetailCard key={m.wom_slno}>
                                <Typography fontWeight={600}>
                                    {i + 1}. {m.item_name}
                                </Typography>
                                <Typography level="body-sm">
                                    Qty: {m.item_qty} {m.umo} · Rate:
                                    ₹{m.unit_price}
                                </Typography>
                                <Typography fontWeight={600}>
                                    Total: ₹{m.gross_amt}
                                </Typography>
                            </DetailCard>
                        )}
                    />

                    {/* -------- LABOUR -------- */}
                    <DetailsSection
                        icon={<EngineeringOutlined />}
                        title="Labour Details"
                        data={woData?.labour_details}
                        renderItem={(l, i) => (
                            <DetailCard key={l.wol_slno}>
                                <Typography fontWeight={600}>
                                    {i + 1}. {l.labour_desc}
                                </Typography>
                                <Typography level="body-sm">
                                    Qty: {l.qty} · Rate: ₹
                                    {l.unit_rate}
                                </Typography>
                            </DetailCard>
                        )}
                    />

                    {/* -------- RETENTION -------- */}
                    <DetailsSection
                        icon={<PaymentOutlined />}
                        title="Retention"
                        data={woData?.retention_details}
                        renderItem={(r) => (
                            <DetailCard key={r.wor_slno}>
                                ₹{r.rent_amount} —{' '}
                                {r.rent_description}
                            </DetailCard>
                        )}
                    />

                    {/* -------- TERMS -------- */}
                    <ListSection
                        icon={<GavelOutlined />}
                        title="Terms & Conditions"
                        data={woData?.terms_conditions}
                    />

                    <ListSection
                        icon={<PaymentsOutlined />}
                        title="Payment Terms"
                        data={woData?.payment_terms}
                    />

                    <ListSection
                        icon={<ReceiptLongOutlined />}
                        title="Billing Terms"
                        data={woData?.billing_terms}
                    />

                    {/* -------- REMARKS -------- */}
                    <Textarea
                        minRows={3}
                        value={remarks}
                        placeholder="Enter remarks"
                        onChange={(e) =>
                            setRemarks(e.target.value)
                        }
                    />
                </Box>
                {/* )} */}

                {/* ================= FOOTER ================= */}
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
                            onClick={() => handleAction('A')}
                            sx={actionBtn('#C47BE4')}
                        >
                            <CheckCircle sx={{ color: 'white' }} />
                            Approve
                        </Box>

                        <Box
                            onClick={
                                remarks
                                    ? () => handleAction('R')
                                    : undefined
                            }
                            sx={actionBtn(
                                remarks ? '#92487A' : '#F3B6B5'
                            )}
                        >
                            <CancelOutlined sx={{ color: 'white' }} />
                            Reject
                        </Box>
                    </Box>
                )}
            </ModalDialog>
        </Modal>
    )
}

export default memo(WoApprovalModal)
