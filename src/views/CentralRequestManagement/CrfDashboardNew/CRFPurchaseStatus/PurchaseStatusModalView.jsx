import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog, Table, Typography } from '@mui/joy'
import { format } from 'date-fns'
import React, { Fragment, memo } from 'react'

const PurchaseStatusModalView = ({ modalData, handleClose, open, ackData }) => {
    const { req_slno, ack_status, ack_remarks, ack_user, ackdate, quatation_calling_status, quatation_calling_remarks,
        qcall_user, quatation_calling_date, quatation_negotiation, quatation_negotiation_remarks, nego_user,
        quatation_negotiation_date, quatation_fixing, quatation_fixing_remarks, fix_user, quatation_fixing_date,
    } = ackData
    return (
        <Fragment>
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={handleClose}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <ModalDialog
                        variant="outlined"
                        sx={{
                            width: '75vw',
                            maxHeight: '90vh',
                            overflow: 'auto'
                        }}
                    >
                        <ModalClose
                            variant="outlined"
                            sx={{
                                m: 1,
                                top: 'calc(-1/4 * var(--IconButton-size))',
                                right: 'calc(-1/4 * var(--IconButton-size))',
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: 'background.body',
                                color: '#bf360c',
                                height: 35, width: 35
                            }}
                        />
                        <Box sx={{ mx: 0.5 }}>
                            <Typography sx={{ fontWeight: 550, fontSize: 16, fontFamily: 'system-ui' }}>
                                CRF/TMC/{req_slno}&nbsp; Details </Typography>

                        </Box>

                        {modalData.length !== 0 ?
                            <Box sx={{ flexWrap: 'wrap', }}>
                                <Typography sx={{ fontWeight: 'bold', mx: 1, pb: 0.5, color: '#145DA0', fontSize: 14 }}>
                                    Approved Items
                                </Typography>
                                <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm'>
                                    <thead style={{ height: 4 }} size='small'>
                                        <tr style={{ height: 4 }} size='small'>
                                            <th size='sm' style={{ width: 50, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Sl.No</th>
                                            <th size='sm' style={{ width: 250, backgroundColor: '#EBEBE8' }}>&nbsp;&nbsp;Description</th>
                                            <th size='sm' style={{ width: 100, backgroundColor: '#EBEBE8' }}>&nbsp;&nbsp;Brand</th>
                                            <th size='sm' style={{ width: 80, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Qty</th>
                                            <th size='sm' style={{ width: 80, textAlign: 'center', backgroundColor: '#EBEBE8' }}>UOM</th>
                                            <th size='sm' style={{ width: 250, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Specification</th>
                                            <th size='sm' style={{ width: 100, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Price</th>
                                            <th size='sm' style={{ width: 100, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Approx.cost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {modalData.map((item, ind) => (
                                            <tr key={ind}>
                                                <td style={{ textAlign: 'center' }}>{ind + 1}</td>
                                                <td style={{ fontSize: 13 }}>&nbsp;{item.approve_item_desc}</td>
                                                <td style={{}}>&nbsp;{item.approve_item_brand}</td>
                                                <td style={{ textAlign: 'center', }}>{item.item_qnty_approved}</td>
                                                <td style={{ textAlign: 'center', }}>{item.approve_item_unit === 0 ? 'Not Given' : item.apprv_uom}</td>
                                                <td style={{}}>&nbsp;{item.approve_item_specification}</td>
                                                <td style={{ textAlign: 'center', }}>{item.approve_item_unit_price === 0 ? 'Not Given' : item.approve_item_unit_price}</td>
                                                <td style={{ textAlign: 'center', }}>{item.approve_aprox_cost === 0 ? 'Not Given' : item.approve_aprox_cost}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Box>
                            : null
                        }
                        <Box sx={{ pb: 2 }}>
                            {ack_status === 1 ?
                                <Box sx={{}}>
                                    <Typography sx={{ fontWeight: 'bold', mx: 1, pb: 0.5, color: '#145DA0', fontSize: 14 }}>
                                        Acknowledgement
                                    </Typography>
                                    <Box sx={{ display: 'flex', mx: 0.3, border: '1px solid lightblue', p: 1, borderRadius: 5 }}>
                                        <Typography sx={{ flex: 0.3, fontSize: 14, fontWeight: 550 }}>Remarks</Typography>
                                        <Typography sx={{ flex: 1.5, fontSize: 14 }}>: &nbsp;{ack_remarks}</Typography>
                                        <Typography sx={{
                                            display: 'flex', flex: 0.5, justifyContent: 'flex-end', fontSize: 13,
                                            textTransform: 'capitalize', fontWeight: 550, pr: 3
                                        }}>{ack_user}</Typography>
                                        <Typography sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 13, fontWeight: 550 }}>
                                            {format(new Date(ackdate), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                    </Box>
                                </Box>
                                :
                                <Box sx={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                    color: 'grey'
                                }}>
                                    Not Initiated
                                </Box>}
                            {quatation_calling_status === 1 ?
                                <Box sx={{}}>
                                    <Typography sx={{ fontWeight: 'bold', mx: 1, pb: 0.5, color: '#145DA0', fontSize: 14 }}>
                                        Quotation Calling
                                    </Typography>
                                    <Box sx={{ display: 'flex', mx: 0.3, border: '1px solid lightblue', p: 1, borderRadius: 5 }}>
                                        <Typography sx={{ flex: 0.3, fontSize: 14, fontWeight: 550 }}>Remarks</Typography>
                                        <Typography sx={{ flex: 1.5, fontSize: 14 }}>: &nbsp;{quatation_calling_remarks}</Typography>
                                        <Typography sx={{
                                            display: 'flex', flex: 0.5, justifyContent: 'flex-end', fontSize: 13,
                                            textTransform: 'capitalize', fontWeight: 550, pr: 3
                                        }}>{qcall_user}</Typography>
                                        <Typography sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 13, fontWeight: 550 }}>
                                            {format(new Date(quatation_calling_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                    </Box>
                                </Box>
                                : null}
                            {quatation_negotiation === 1 ?
                                <Box sx={{}}>
                                    <Typography sx={{ fontWeight: 'bold', mx: 1, pb: 0.5, color: '#145DA0', fontSize: 14 }}>
                                        Quotation Negotiation
                                    </Typography>
                                    <Box sx={{ display: 'flex', mx: 0.3, border: '1px solid lightblue', p: 1, borderRadius: 5 }}>
                                        <Typography sx={{ flex: 0.3, fontSize: 14, fontWeight: 550 }}>Remarks</Typography>
                                        <Typography sx={{ flex: 1.5, fontSize: 14 }}>: &nbsp;{quatation_negotiation_remarks}</Typography>
                                        <Typography sx={{
                                            display: 'flex', flex: 0.5, justifyContent: 'flex-end', fontSize: 13,
                                            textTransform: 'capitalize', fontWeight: 550, pr: 3
                                        }}>{nego_user}</Typography>
                                        <Typography sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 13, fontWeight: 550 }}>
                                            {format(new Date(quatation_negotiation_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                    </Box>
                                </Box>
                                : null}

                            {quatation_fixing === 1 ?
                                <Box sx={{}}>
                                    <Typography sx={{ fontWeight: 'bold', mx: 1, pb: 0.5, color: '#145DA0', fontSize: 14 }}>
                                        Quotation Fixing
                                    </Typography>
                                    <Box sx={{ display: 'flex', mx: 0.3, border: '1px solid lightblue', p: 1, borderRadius: 5 }}>
                                        <Typography sx={{ flex: 0.3, fontSize: 14, fontWeight: 550 }}>Remarks</Typography>
                                        <Typography sx={{ flex: 1.5, fontSize: 14 }}>: &nbsp;{quatation_fixing_remarks}</Typography>
                                        <Typography sx={{
                                            display: 'flex', flex: 0.5, justifyContent: 'flex-end', fontSize: 13,
                                            textTransform: 'capitalize', fontWeight: 550, pr: 3
                                        }}>{fix_user}</Typography>
                                        <Typography sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 13, fontWeight: 550 }}>
                                            {format(new Date(quatation_fixing_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                    </Box>
                                </Box>
                                : null}
                        </Box>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider >
        </Fragment>
    )
}

export default memo(PurchaseStatusModalView)