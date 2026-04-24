import React, { memo } from 'react'
import {
    Modal,
    ModalDialog,
    Typography,
    Divider,
    Box,
    Table,
    Sheet,
    Button,
} from '@mui/joy'

const isNonEmptyString = (val) =>
    typeof val === 'string' && val.trim() !== ''

const WorkOrderPreviewModal = ({ open, onClose, data }) => {

    const materialDetails = Array.isArray(data?.materialList)
        ? data.materialList
        : []

    const labourDetails = Array.isArray(data?.labourList)
        ? data.labourList
        : []

    const vendorDetails = data?.vendorDetails || {}
    const retentionDetails = data?.retentionDetails || {}
    const terms = data?.terms || {}
    const paymentTerms = data?.paymentTerms || {}
    const billingTerms = data?.billingTerms || {}

    const sectionStyle = {
        p: 1,
        borderRadius: 6,
        bgcolor: '#ffffff',
        border: '1px solid #e5e7eb',
        boxShadow: 'sm',
        mb: 0,
    }

    const tableStyle = {
        '--TableCell-paddingY': '10px',
        '& thead th': {
            bgcolor: '#f1f5f9',
            fontWeight: 700,
            fontSize: 13,
        },
        '& tbody tr:nth-of-type(even)': {
            bgcolor: '#f9fafb',
        },
        '& tbody td': {
            fontSize: 13,
        },
    }
    const Detail = ({ label, value }) => (
        <Box
            sx={{
                p: 1.5,
                borderRadius: 6,
                bgcolor: '#fff',
                // border: '1px solid #e5e7eb',
                display: 'flex',
                flexDirection: 'column',
                gap: 0.4,
                boxShadow: 'xs',
            }}
        >
            <Typography level="body-xs" sx={{ color: '#6b7280', fontWeight: 600 }}>
                {label}
            </Typography>
            <Typography level="body-sm" fontWeight={600}>
                {value || '-'}
            </Typography>
        </Box>
    );

    const capitalizeFirst = (text = '') =>
        typeof text === 'string'
            ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
            : '';

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog
                size="lg"
                sx={{
                    width: "90%",
                    maxWidth: '95vw',
                    maxHeight: '85vh',
                    overflowY: 'auto',
                    borderRadius: 8,
                    p: 4,
                    bgcolor: '#f8fafc',
                    boxShadow: 'xl',
                }}
            >
                {/* HEADER */}
                <Typography level="h4" fontWeight={800} sx={{ position: 'sticky' }}>
                    Work Order Preview
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* VENDOR DETAILS */}
                {Object.keys(vendorDetails).length > 0 && (
                    <Box
                        sx={{
                            ...sectionStyle,
                            background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
                        }}
                    >
                        <Typography level="title-md" fontWeight={800} sx={{ mb: 1 }}>
                            Vendor Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: 'repeat(4, 1fr)' },
                                gap: 2,
                            }}
                        >
                            <Detail label="Vendor" value={vendorDetails.sup_name} />
                            <Detail label="WO Date" value={vendorDetails.wod} />
                            <Detail label="Department" value={vendorDetails.sec_name} />

                            <Detail label="From Date" value={vendorDetails.fromDate} />
                            <Detail label="To Date" value={vendorDetails.toDate} />
                            <Detail label="Contract Type" value={vendorDetails.contractType === 1 ? "ANNUAL MAINTANANCE CONTRACT" : vendorDetails.contractType === 2 ? "COMPREHENSIVE MAINTANANCE CONTRACT" : vendorDetails.contractType === 3 ? "RATE CONTRACT" : "-"} />

                            <Detail label="CRF Number" value={vendorDetails.crfNo} />
                            <Detail label="Request Date" value={vendorDetails.req_date} />
                            <Detail label="Primary Mobile" value={vendorDetails.sup_first_mob} />

                            <Detail label="Secondary Mobile" value={vendorDetails.sup_second_mob} />
                            <Detail label="Primary Email" value={vendorDetails.sup_email_one} />
                            <Detail label="Secondary Email" value={vendorDetails.sup_email_two} />
                        </Box>
                    </Box>
                )}
                {/* MATERIAL DETAILS */}
                {materialDetails.length > 0 && (
                    <Box sx={sectionStyle}>
                        <Typography level="title-md" fontWeight={700} sx={{ mb: 0 }}>
                            Material Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Sheet variant="outlined" sx={{ borderRadius: 4 }}>
                            <Table size="sm" stickyHeader sx={tableStyle}>
                                <thead>
                                    <tr>
                                        <th>Sl No</th>
                                        <th>Item</th>
                                        <th>Qty</th>
                                        <th>UOM</th>
                                        <th style={{ textAlign: 'right' }}>Total (₹)</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {materialDetails?.map((m, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{capitalizeFirst(m.itemName)}</td>
                                            <td>{m.quantity}</td>
                                            <td>{m.uomName}</td>
                                            <td style={{ textAlign: 'right', fontWeight: 600 }}>
                                                ₹ {m.totalAmount}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Sheet>
                    </Box>
                )}

                {/* LABOUR DETAILS */}
                {labourDetails?.length > 0 && (
                    <Box sx={sectionStyle}>
                        <Typography level="title-md" fontWeight={700} sx={{ mb: 0 }}>
                            Labour Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Sheet variant="outlined" sx={{ borderRadius: 4 }}>
                            <Table size="sm" stickyHeader sx={tableStyle}>
                                <thead>
                                    <tr>
                                        <th>Sl No</th>
                                        <th>Description</th>
                                        <th>Specification</th>
                                        <th>Rate Unit</th>
                                        <th>Qty</th>
                                        <th style={{ textAlign: 'right' }}>Total (₹)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {labourDetails?.map((l, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{l.description}</td>
                                            <td>{l.specification}</td>
                                            <td>{l.rateUnit}</td>
                                            <td>{l.quantity}</td>
                                            <td style={{ textAlign: 'right', fontWeight: 600 }}>
                                                ₹ {l.totalAmount}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Sheet>
                    </Box>
                )}

                {/* RETENTION DETAILS */}
                {retentionDetails?.paymentType && (
                    <Box sx={sectionStyle}>
                        <Typography level="title-md" fontWeight={700} sx={{ mb: 0 }}>
                            Retention Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Box sx={{ display: 'grid', gap: 1 }}>
                            <Typography level="body-sm">
                                <strong>Description:</strong> {retentionDetails.description}
                            </Typography>
                            <Typography level="body-sm">
                                <strong>Payment Type:</strong>{' '}
                                {retentionDetails.paymentType === 'amount'
                                    ? 'Fixed Amount'
                                    : 'Percentage'}
                            </Typography>
                            <Typography level="body-sm">
                                <strong>
                                    {retentionDetails.paymentType === 'amount'
                                        ? 'Retention Amount'
                                        : 'Retention Percentage'}
                                    :
                                </strong>{' '}
                                {retentionDetails.paymentType === 'amount'
                                    ? `₹ ${retentionDetails.amount}`
                                    : `${retentionDetails.amount} %`}
                            </Typography>
                        </Box>
                    </Box>
                )}

                {/* TERMS & CONDITIONS */}
                {terms?.terms?.some(t => isNonEmptyString(t?.text)) && (
                    <Box sx={sectionStyle}>
                        <Typography level="title-md" fontWeight={700}>
                            Terms & Conditions
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />

                        {isNonEmptyString(terms.validUpto) && (
                            <Typography level="body-sm">
                                <strong>Valid Upto:</strong> {terms.validUpto}
                            </Typography>
                        )}

                        {terms.terms
                            .filter(t => isNonEmptyString(t?.text))
                            .map((t, i) => (
                                <Typography key={i} level="body-sm">
                                    {i + 1}. {t.text}
                                </Typography>
                            ))}
                    </Box>
                )}
                {/* PAYMENT TERMS */}
                {paymentTerms?.terms?.some(t => isNonEmptyString(t?.text)) && (
                    <Box sx={sectionStyle}>
                        <Typography level="title-md" fontWeight={700}>
                            Payment Terms & Conditions
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />

                        {isNonEmptyString(paymentTerms.validUpto) && (
                            <Typography level="body-sm">
                                <strong>Valid Upto:</strong> {paymentTerms.validUpto}
                            </Typography>
                        )}

                        {paymentTerms.terms
                            .filter(t => isNonEmptyString(t?.text))
                            .map((t, i) => (
                                <Typography key={i} level="body-sm">
                                    {i + 1}. {t.text}
                                </Typography>
                            ))}
                    </Box>
                )}
                {/* TERMS & CONDITIONS */}
                {billingTerms?.terms?.some(t => isNonEmptyString(t?.text)) && (
                    <Box sx={sectionStyle}>
                        <Typography level="title-md" fontWeight={700}>
                            Invoice / Billing Terms & Conditions
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />

                        {isNonEmptyString(billingTerms.validUpto) && (
                            <Typography level="body-sm">
                                <strong>Valid Upto:</strong> {billingTerms.validUpto}
                            </Typography>
                        )}

                        {billingTerms.terms
                            .filter(t => isNonEmptyString(t?.text))
                            .map((t, i) => (
                                <Typography key={i} level="body-sm">
                                    {i + 1}. {t.text}
                                </Typography>
                            ))}
                    </Box>
                )}

                {/* FOOTER */}
                <Box
                    sx={{
                        position: 'sticky',
                        bottom: 0,
                        pt: 2,
                        bgcolor: '#f8fafc',
                        borderTop: '1px solid #e5e7eb',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button variant="outlined" onClick={onClose}>
                        Close
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    )
}

export default memo(WorkOrderPreviewModal)
