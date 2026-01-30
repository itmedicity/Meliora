
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

const WorkOrderPreviewModal = ({ open, onClose, data }) => {

    const materialDetails = Array.isArray(data?.materialDetails)
        ? data.materialDetails
        : []

    const labourDetails = Array.isArray(data?.labourDetails)
        ? data.labourDetails
        : []

    const vendorDetails = data?.vendorDetails || {}
    const retentionDetails = data?.retentionDetails || {}
    const terms = data?.terms || {}
    const paymentTerms = data?.paymentTerms || {}
    const billingTerms = data?.billingTerms || {}

    console.log("billingTerms:", billingTerms);

    const sectionStyle = {
        p: 2.5,
        borderRadius: 6,
        bgcolor: '#ffffff',
        border: '1px solid #e5e7eb',
        boxShadow: 'sm',
        mb: 3,
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

    const hasBillingTerms =
        (billingTerms?.validUpto && billingTerms.validUpto.trim() !== '') ||
        billingTerms?.terms?.some(t => t && t.trim() !== '')

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog
                size="lg"
                sx={{
                    width: 900,
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
                <Typography level="h4" fontWeight={800}>
                    Work Order Preview
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* VENDOR DETAILS */}
                {Object.keys(vendorDetails).length > 0 && (
                    <Box sx={sectionStyle}>
                        <Typography level="title-md" fontWeight={700} sx={{ mb: 1 }}>
                            Vendor Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: 2,
                            }}
                        >
                            <Typography level="body-sm">
                                <strong>Vendor</strong><br />
                                {vendorDetails.vendor_slno}
                            </Typography>
                            <Typography level="body-sm">
                                <strong>WO Date</strong><br />
                                {vendorDetails.wod}
                            </Typography>
                            <Typography level="body-sm">
                                <strong>Department</strong><br />
                                {vendorDetails.sec_name}
                            </Typography>
                        </Box>
                    </Box>
                )}

                {/* MATERIAL DETAILS */}
                {materialDetails.length > 0 && (
                    <Box sx={sectionStyle}>
                        <Typography level="title-md" fontWeight={700} sx={{ mb: 1 }}>
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
                                        <th style={{ textAlign: 'right' }}>
                                            Total (₹)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {materialDetails.map((m, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{m.itemName}</td>
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
                {labourDetails.length > 0 && (
                    <Box sx={sectionStyle}>
                        <Typography level="title-md" fontWeight={700} sx={{ mb: 1 }}>
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
                                        <th style={{ textAlign: 'right' }}>
                                            Total (₹)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {labourDetails.map((l, i) => (
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
                        <Typography level="title-md" fontWeight={700} sx={{ mb: 1 }}>
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
                {terms?.terms?.length > 0 && (
                    <Box sx={sectionStyle}>
                        <Typography level="title-md" fontWeight={700} sx={{ mb: 1 }}>
                            Terms & Conditions
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Typography level="body-sm" sx={{ mb: 1 }}>
                            <strong>Valid Upto:</strong> {terms.validUpto}
                        </Typography>

                        <Box component="ol" sx={{ pl: 2 }}>
                            {terms.terms.map((t, i) => (
                                <Typography key={i} component="li" level="body-sm">
                                    {i + 1}. {t}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                )}

                {/* PAYMENT TERMS */}
                {paymentTerms?.terms?.length > 0 && (
                    <Box sx={sectionStyle}>
                        <Typography level="title-md" fontWeight={700}>
                            Payment Terms & Conditions
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />

                        <Typography level="body-sm">
                            <strong>Valid Upto:</strong> {paymentTerms.validUpto}
                        </Typography>

                        {paymentTerms.terms.map((t, i) => (
                            <Typography key={i} level="body-sm">
                                {i + 1}. {t}
                            </Typography>
                        ))}
                    </Box>
                )}

                {/* BILLING TERMS */}
                {/* {billingTerms?.terms?.terms?.length !== 0 && (
                    <Box sx={sectionStyle}>
                        <Typography level="title-md" fontWeight={700}>
                            Invoice / Billing Terms & Conditions
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />

                        <Typography level="body-sm">
                            <strong>Valid Upto:</strong> {billingTerms.validUpto}
                        </Typography>

                        {billingTerms.terms.map((t, i) => (
                            <Typography key={i} level="body-sm">
                                {i + 1}. {t}
                            </Typography>
                        ))}
                    </Box>
                )} */}
                {hasBillingTerms && (
                    <Box sx={sectionStyle}>
                        <Typography level="title-md" fontWeight={700}>
                            Invoice / Billing Terms & Conditions
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />

                        {billingTerms.validUpto?.trim() && (
                            <Typography level="body-sm">
                                <strong>Valid Upto:</strong> {billingTerms.validUpto}
                            </Typography>
                        )}

                        {billingTerms.terms
                            .filter(t => t && t.trim() !== '')
                            .map((t, i) => (
                                <Typography key={i} level="body-sm">
                                    {i + 1}. {t}
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

// import React, { memo } from 'react'
// import {
//     Modal,
//     ModalDialog,
//     Typography,
//     Divider,
//     Box,
//     Table,
//     Sheet,
//     Button,
// } from '@mui/joy'

// const WorkOrderPreviewModal = ({ open, onClose, data }) => {

//     const materialDetails = Array.isArray(data?.materialDetails)
//         ? data.materialDetails
//         : []

//     const labourDetails = Array.isArray(data?.labourDetails)
//         ? data.labourDetails
//         : []

//     const vendorDetails = data?.vendorDetails || {}
//     const retentionDetails = data?.retentionDetails || {}
//     const terms = data?.terms || {}
//     const paymentTerms = data?.paymentTerms || {}
//     const billingTerms = data?.billingTerms || {}

//     const sectionStyle = {
//         p: 2.5,
//         borderRadius: 6,
//         bgcolor: '#ffffff',
//         border: '1px solid #e5e7eb',
//         boxShadow: 'sm',
//         mb: 3,
//     }

//     const tableStyle = {
//         '--TableCell-paddingY': '10px',
//         '& thead th': {
//             bgcolor: '#f1f5f9',
//             fontWeight: 700,
//             fontSize: 13,
//         },
//         '& tbody tr:nth-of-type(even)': {
//             bgcolor: '#f9fafb',
//         },
//         '& tbody td': {
//             fontSize: 13,
//         },
//     }

//     return (
//         <Modal open={open} onClose={onClose}>
//             <ModalDialog
//                 size="lg"
//                 sx={{
//                     width: 900,
//                     maxWidth: '95vw',
//                     maxHeight: '85vh',
//                     overflowY: 'auto',
//                     borderRadius: 8,
//                     p: 4,
//                     bgcolor: '#f8fafc',
//                     boxShadow: 'xl',
//                 }}
//             >
//                 {/* HEADER */}
//                 <Typography level="h4" fontWeight={800}>
//                     Work Order Preview
//                 </Typography>

//                 <Divider sx={{ my: 2 }} />

//                 {/* VENDOR DETAILS */}
//                 <Box sx={sectionStyle}>
//                     <Typography level="title-md" fontWeight={700} sx={{ mb: 1 }}>
//                         Vendor Details
//                     </Typography>
//                     <Divider sx={{ mb: 2 }} />

//                     <Box
//                         sx={{
//                             display: 'grid',
//                             gridTemplateColumns: 'repeat(3, 1fr)',
//                             gap: 2,
//                         }}
//                     >
//                         <Typography level="body-sm">
//                             <strong>Vendor</strong><br />
//                             {vendorDetails?.vendor_slno || '-'}
//                         </Typography>
//                         <Typography level="body-sm">
//                             <strong>WO Date</strong><br />
//                             {vendorDetails?.wod || '-'}
//                         </Typography>
//                         <Typography level="body-sm">
//                             <strong>Department</strong><br />
//                             {vendorDetails?.sec_name || '-'}
//                         </Typography>
//                     </Box>
//                 </Box>

//                 {/* MATERIAL DETAILS */}
//                 {materialDetails.length > 0 ? (
//                     <Box sx={sectionStyle}>
//                         <Typography level="title-md" fontWeight={700} sx={{ mb: 1 }}>
//                             Material Details
//                         </Typography>
//                         <Divider sx={{ mb: 2 }} />

//                         {materialDetails.length > 0 ? (
//                             <Sheet variant="outlined" sx={{ borderRadius: 4 }}>
//                                 <Table size="sm" stickyHeader sx={tableStyle}>
//                                     <thead>
//                                         <tr>
//                                             <th>Sl No</th>
//                                             <th>Item</th>
//                                             <th>Qty</th>
//                                             <th>UOM</th>
//                                             <th style={{ textAlign: 'right' }}>
//                                                 Total (₹)
//                                             </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {materialDetails.map((m, i) => (
//                                             <tr key={i}>
//                                                 <td>{i + 1}</td>
//                                                 <td>{m.itemName}</td>
//                                                 <td>{m.quantity}</td>
//                                                 <td>{m.uomName}</td>
//                                                 <td style={{ textAlign: 'right', fontWeight: 600 }}>
//                                                     ₹ {m.totalAmount}
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </Table>
//                             </Sheet>
//                         ) : (
//                             <Typography level="body-sm" color="neutral">
//                                 No materials added
//                             </Typography>
//                         )}
//                     </Box>
//                 ) : null}

//                 {/* LABOUR DETAILS */}
//                 {labourDetails.length > 0 ? (
//                     <Box sx={sectionStyle}>
//                         <Typography level="title-md" fontWeight={700} sx={{ mb: 1 }}>
//                             Labour Details
//                         </Typography>
//                         <Divider sx={{ mb: 2 }} />

//                         {labourDetails.length > 0 ? (
//                             <Sheet variant="outlined" sx={{ borderRadius: 4 }}>
//                                 <Table size="sm" stickyHeader sx={tableStyle}>
//                                     <thead>
//                                         <tr>
//                                             <th>Sl No</th>
//                                             <th>Description</th>
//                                             <th>Specification</th>
//                                             <th>Rate Unit</th>
//                                             <th>Qty</th>
//                                             <th style={{ textAlign: 'right' }}>
//                                                 Total (₹)
//                                             </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {labourDetails.map((l, i) => (
//                                             <tr key={i}>
//                                                 <td>{i + 1}</td>
//                                                 <td>{l.description}</td>
//                                                 <td>{l.specification}</td>
//                                                 <td>{l.rateUnit}</td>
//                                                 <td>{l.quantity}</td>
//                                                 <td style={{ textAlign: 'right', fontWeight: 600 }}>
//                                                     ₹ {l.totalAmount}
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </Table>
//                             </Sheet>
//                         ) : (
//                             <Typography level="body-sm" color="neutral">
//                                 No labour charges added
//                             </Typography>
//                         )}
//                     </Box>
//                 ) : null}
//                 {/* RETENTION DETAILS */}
//                 {/* {retentionDetails.length > 0 ? ( */}

//                 {retentionDetails?.length !== 0 ? (
//                     <Box sx={sectionStyle}>
//                         <Typography level="title-md" fontWeight={700} sx={{ mb: 1 }}>
//                             Retention Details
//                         </Typography>
//                         <Divider sx={{ mb: 2 }} />

//                         {retentionDetails?.paymentType ? (
//                             <Box sx={{ display: 'grid', gap: 1 }}>
//                                 <Typography level="body-sm">
//                                     <strong>Description:</strong> {retentionDetails.description || '-'}
//                                 </Typography>
//                                 <Typography level="body-sm">
//                                     <strong>Payment Type:</strong>{' '}
//                                     {retentionDetails.paymentType === 'amount'
//                                         ? 'Fixed Amount'
//                                         : 'Percentage'}
//                                 </Typography>
//                                 <Typography level="body-sm">
//                                     <strong>
//                                         {retentionDetails.paymentType === 'amount'
//                                             ? 'Retention Amount'
//                                             : 'Retention Percentage'}
//                                         :
//                                     </strong>{' '}
//                                     {retentionDetails.paymentType === 'amount'
//                                         ? `₹ ${retentionDetails.amount}`
//                                         : `${retentionDetails.amount} %`}
//                                 </Typography>
//                             </Box>
//                         ) : (
//                             <Typography level="body-sm" color="neutral">
//                                 No retention details added
//                             </Typography>
//                         )}
//                     </Box>
//                 ) : null}

//                 {/*  ) : null} */}
//                 {/* TERMS & CONDITIONS */}
//                 {terms?.length !== 0 ? (
//                     <Box sx={sectionStyle}>
//                         <Typography level="title-md" fontWeight={700} sx={{ mb: 1 }}>
//                             Terms & Conditions
//                         </Typography>
//                         <Divider sx={{ mb: 2 }} />

//                         {terms?.terms?.length > 0 ? (
//                             <>
//                                 <Typography level="body-sm" sx={{ mb: 1 }}>
//                                     <strong>Valid Upto:</strong> {terms.validUpto || '-'}
//                                 </Typography>

//                                 <Box component="ol" sx={{ pl: 2 }}>
//                                     {terms.terms.map((t, i) => (
//                                         <Typography
//                                             key={i}
//                                             component="li"
//                                             level="body-sm"
//                                             sx={{ mb: 0.75 }}
//                                         >
//                                             {t}
//                                         </Typography>
//                                     ))}
//                                 </Box>
//                             </>
//                         ) : (
//                             <Typography level="body-sm" color="neutral">
//                                 No terms added
//                             </Typography>
//                         )}
//                     </Box>
//                 ) : null}

//                 {/* PAYMENT TERMS */}
//                 {paymentTerms?.length !== 0 ? (
//                     <Box sx={sectionStyle}>
//                         <Typography level="title-md" fontWeight={700}>
//                             Payment Terms & Conditions
//                         </Typography>
//                         <Divider sx={{ my: 1.5 }} />

//                         <Typography level="body-sm">
//                             <strong>Valid Upto:</strong> {paymentTerms.validUpto || '-'}
//                         </Typography>

//                         {paymentTerms?.terms?.map((t, i) => (
//                             <Typography key={i} level="body-sm">
//                                 {i + 1}. {t}
//                             </Typography>
//                         ))}
//                     </Box>
//                 ) : null}

//                 {/* BILLING TERMS */}
//                 {billingTerms?.length !== 0 ? (
//                     <Box sx={sectionStyle}>
//                         <Typography level="title-md" fontWeight={700}>
//                             Invoice / Billing Terms & Conditions
//                         </Typography>
//                         <Divider sx={{ my: 1.5 }} />

//                         <Typography level="body-sm">
//                             <strong>Valid Upto:</strong> {billingTerms.validUpto || '-'}
//                         </Typography>

//                         {billingTerms?.terms?.map((t, i) => (
//                             <Typography key={i} level="body-sm">
//                                 {i + 1}. {t}
//                             </Typography>
//                         ))}
//                     </Box>
//                 ) : null}
//                 {/* FOOTER */}
//                 <Box
//                     sx={{
//                         position: 'sticky',
//                         bottom: 0,
//                         pt: 2,
//                         bgcolor: '#f8fafc',
//                         borderTop: '1px solid #e5e7eb',
//                         display: 'flex',
//                         justifyContent: 'flex-end',
//                         gap: 1.5,
//                     }}
//                 >
//                     <Button variant="outlined" onClick={onClose}>
//                         Close
//                     </Button>

//                 </Box>
//             </ModalDialog>
//         </Modal>
//     )
// }

// export default memo(WorkOrderPreviewModal)



// import React, { memo } from 'react'
// import {
//     Modal,
//     ModalDialog,
//     Typography,
//     Divider,
//     Box,
//     Table,
//     Sheet
// } from '@mui/joy'

// const WorkOrderPreviewModal = ({ open, onClose, data }) => {
//     const materialDetails = Array.isArray(data?.materialDetails)
//         ? data.materialDetails
//         : []

//     const { vendorDetails } = data || {}

//     const labourDetails = Array.isArray(data?.labourDetails)
//         ? data.labourDetails
//         : []

//     const retentionDetails = data?.retentionDetails || {}

//     const terms = data?.terms || {}

//     const { paymentTerms } = data

//     const billingTerms = data?.billingTerms || {}

//     return (
//         <Modal open={open} onClose={onClose}>
//             <ModalDialog
//                 size="lg"
//                 sx={{
//                     maxHeight: '80vh',
//                     overflow: 'auto',
//                     borderRadius: 6,
//                     p: 3,
//                     bgcolor: '#ffffff',
//                 }}
//             >
//                 {/* TITLE */}
//                 <Typography level="h4" fontWeight={700}>
//                     Work Order Preview
//                 </Typography>

//                 <Divider sx={{ my: 2 }} />

//                 {/* VENDOR DETAILS */}
//                 <Box
//                     sx={{
//                         mb: 3,
//                         p: 2,
//                         borderRadius: 4,
//                         bgcolor: '#f9fafb',
//                         border: '1px solid #e5e7eb',
//                     }}
//                 >
//                     <Typography level="h6" fontWeight={600} sx={{ mb: 1 }}>
//                         Vendor Details
//                     </Typography>

//                     <Divider sx={{ mb: 1.5 }} />

//                     <Box
//                         sx={{
//                             display: 'grid',
//                             gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//                             gap: 1,
//                         }}
//                     >
//                         <Typography>
//                             <strong>Vendor :</strong> {vendorDetails?.vendor_slno || '-'}
//                         </Typography>
//                         <Typography>
//                             <strong>WO Date :</strong> {vendorDetails?.wod || '-'}
//                         </Typography>
//                         <Typography>
//                             <strong>Department :</strong> {vendorDetails?.sec_name || '-'}
//                         </Typography>
//                     </Box>
//                 </Box>

//                 {/* MATERIAL DETAILS */}
//                 <Box
//                     sx={{
//                         p: 2,
//                         borderRadius: 4,
//                         bgcolor: '#f9fafb',
//                         border: '1px solid #e5e7eb',
//                     }}
//                 >
//                     <Typography level="h6" fontWeight={600} sx={{ mb: 1 }}>
//                         Material Details
//                     </Typography>

//                     <Divider sx={{ mb: 1.5 }} />

//                     {materialDetails.length > 0 ? (
//                         <Sheet variant="outlined" sx={{ borderRadius: 4 }}>
//                             <Table
//                                 size="sm"
//                                 stickyHeader
//                                 sx={{
//                                     '& thead th': {
//                                         bgcolor: '#f3f4f6',
//                                         fontWeight: 600,
//                                     },
//                                     '& tbody td': {
//                                         fontSize: 14,
//                                     },
//                                 }}
//                             >
//                                 <thead>
//                                     <tr>
//                                         <th>Slno</th>
//                                         <th>Item</th>
//                                         <th>Quantity</th>
//                                         <th>UOM</th>
//                                         <th style={{ textAlign: 'right' }}>
//                                             Total (₹)
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {materialDetails.map((m, i) => (
//                                         <tr key={i}>
//                                             <td>{i + 1}</td>
//                                             <td>{m.itemName}</td>
//                                             <td>{m.quantity}</td>
//                                             <td>{m.uomName}</td>
//                                             <td style={{ textAlign: 'right', fontWeight: 600 }}>
//                                                 ₹ {m.totalAmount}
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </Table>
//                         </Sheet>
//                     ) : (
//                         <Typography color="neutral">
//                             No materials added
//                         </Typography>
//                     )}
//                 </Box>

//                 {/* LABOUR DETAILS */}
//                 <Box
//                     sx={{
//                         mt: 3,
//                         p: 2,
//                         borderRadius: 4,
//                         bgcolor: '#f9fafb',
//                         border: '1px solid #e5e7eb',
//                     }}
//                 >
//                     <Typography level="h6" fontWeight={600} sx={{ mb: 1 }}>
//                         Labour Details
//                     </Typography>

//                     <Divider sx={{ mb: 1.5 }} />

//                     {labourDetails.length > 0 ? (
//                         <Sheet variant="outlined" sx={{ borderRadius: 4 }}>
//                             <Table
//                                 size="sm"
//                                 stickyHeader
//                                 sx={{
//                                     '& thead th': {
//                                         bgcolor: '#f3f4f6',
//                                         fontWeight: 600,
//                                     },
//                                     '& tbody td': {
//                                         fontSize: 14,
//                                     },
//                                 }}
//                             >
//                                 <thead>
//                                     <tr>
//                                         <th>Sl No</th>
//                                         <th>Description</th>
//                                         <th>Specification</th>
//                                         <th>Rate Unit</th>
//                                         <th>Qty</th>
//                                         <th style={{ textAlign: 'right' }}>
//                                             Total (₹)
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {labourDetails.map((l, i) => (
//                                         <tr key={i}>
//                                             <td>{i + 1}</td>
//                                             <td>{l.description}</td>
//                                             <td>{l.specification}</td>
//                                             <td>{l.rateUnit}</td>
//                                             <td>{l.quantity}</td>
//                                             <td style={{ textAlign: 'right', fontWeight: 600 }}>
//                                                 ₹ {l.totalAmount}
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </Table>
//                         </Sheet>
//                     ) : (
//                         <Typography color="neutral">
//                             No labour charges added
//                         </Typography>
//                     )}
//                 </Box>
//                 {/* RETENTION DETAILS */}
//                 <Box
//                     sx={{
//                         mt: 3,
//                         p: 2,
//                         borderRadius: 4,
//                         bgcolor: '#f9fafb',
//                         border: '1px solid #e5e7eb',
//                     }}
//                 >
//                     <Typography level="h6" fontWeight={600} sx={{ mb: 1 }}>
//                         Retention Details
//                     </Typography>

//                     <Divider sx={{ mb: 1.5 }} />

//                     {retentionDetails?.paymentType ? (
//                         <Box sx={{ display: 'grid', gap: 1 }}>
//                             <Typography>
//                                 <strong>Description :</strong>{' '}
//                                 {retentionDetails.description || '-'}
//                             </Typography>

//                             <Typography>
//                                 <strong>Payment Type :</strong>{' '}
//                                 {retentionDetails.paymentType === 'amount'
//                                     ? 'Fixed Amount'
//                                     : 'Percentage'}
//                             </Typography>

//                             <Typography>
//                                 <strong>
//                                     {retentionDetails.paymentType === 'amount'
//                                         ? 'Retention Amount'
//                                         : 'Retention Percentage'} :
//                                 </strong>{' '}
//                                 {retentionDetails.paymentType === 'amount'
//                                     ? `₹ ${retentionDetails.amount}`
//                                     : `${retentionDetails.amount} %`}
//                             </Typography>
//                         </Box>
//                     ) : (
//                         <Typography color="neutral">
//                             No retention details added
//                         </Typography>
//                     )}
//                 </Box>

//                 {/* TERMS & CONDITIONS */}
//                 <Box
//                     sx={{
//                         mt: 3,
//                         p: 2,
//                         borderRadius: 4,
//                         bgcolor: '#f9fafb',
//                         border: '1px solid #e5e7eb',
//                     }}
//                 >
//                     <Typography level="h6" fontWeight={600} sx={{ mb: 1 }}>
//                         Terms & Conditions
//                     </Typography>

//                     <Divider sx={{ mb: 1.5 }} />

//                     {terms?.terms?.length > 0 ? (
//                         <>
//                             <Typography sx={{ mb: 1 }}>
//                                 <strong>Valid Upto :</strong>{' '}
//                                 {terms.validUpto || '-'}
//                             </Typography>

//                             <Box component="ol" sx={{ pl: 2 }}>
//                                 {terms.terms.map((t, i) => (
//                                     <Typography
//                                         key={i}
//                                         component="li"
//                                         sx={{ mb: 0.5 }}
//                                     >
//                                         {i + 1}. {t}
//                                     </Typography>
//                                 ))}
//                             </Box>
//                         </>
//                     ) : (
//                         <Typography color="neutral">
//                             No terms added
//                         </Typography>
//                     )}
//                 </Box>

//                 <Typography level="h5" fontWeight={800}>
//                     Payment Terms & Conditions
//                 </Typography>

//                 <Typography level="body-sm">
//                     Valid Upto: {paymentTerms?.validUpto || '-'}
//                 </Typography>

//                 {paymentTerms?.terms?.map((term, index) => (
//                     <Typography key={index} level="body-sm">
//                         {index + 1}. {term}
//                     </Typography>
//                 ))}

//                 <Typography level="h5" fontWeight={800}>
//                     Invoice / Billing Terms & Conditions
//                 </Typography>

//                 <Typography level="body-sm">
//                     Valid Upto: {billingTerms.validUpto || '-'}
//                 </Typography>

//                 {billingTerms?.terms?.map((term, index) => (
//                     <Typography key={index} level="body-sm">
//                         {index + 1}. {term}
//                     </Typography>
//                 ))}

//             </ModalDialog>
//         </Modal>
//     )
// }

// export default memo(WorkOrderPreviewModal)
