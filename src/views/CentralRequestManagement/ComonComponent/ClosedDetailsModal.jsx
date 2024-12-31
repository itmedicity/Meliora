import { Box, Chip, CssVarsProvider, Grid, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import React, { Fragment, memo } from 'react'
import { ToastContainer } from 'react-toastify'
import CrfReqDetailViewCmp from './CrfReqDetailViewCmp'
import ReqItemDisplay from './ReqItemDisplay'
import ApprovedItemListDis from './ApprovedItemListDis'
import { Paper } from '@mui/material'

import { format } from 'date-fns'
import CommonInchargeReqCmp from './ApprovalComp/CommonInchargeReqCmp'
import CommonHodApprvCmp from './ApprovalComp/CommonHodApprvCmp'
import CommonDmsApprvCmp from './ApprovalComp/CommonDmsApprvCmp'
import CommonMsApprvCmp from './ApprovalComp/CommonMsApprvCmp'
import CommonMoApprvlCmp from './ApprovalComp/CommonMoApprvlCmp'
import CommonSmoApprvCmp from './ApprovalComp/CommonSmoApprvCmp'
import CommonGmapprvCmp from './ApprovalComp/CommonGmapprvCmp'
import CommonMdApprvCmp from './ApprovalComp/CommonMdApprvCmp'
import CommonEdapprvCmp from './ApprovalComp/CommonEdapprvCmp'

const ClosedDetailsModal = ({ open, crfClosedDetails, handleCloseModal, reqItems, approveTableData, imagearray }) => {
    const { incharge_req, incharge_remarks, hod_req, hod_approve, dms_approve, ms_approve, manag_operation_approv, senior_manage_approv,
        gm_approve, md_approve, ed_approve, crf_close_remark, crf_closed_one, close_date, closed_user,
        dms_req, ms_approve_req, manag_operation_req, senior_manage_req, gm_approve_req, ed_approve_req, md_approve_req
    } = crfClosedDetails
    const capitalizeWords = (str) =>
        str
            ? str
                .toLowerCase()
                .trim()
                .replace(/\s+/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            : '';
    return (
        <Fragment>
            <ToastContainer />
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={handleCloseModal}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <ModalDialog variant="outlined">
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
                                height: 25, width: 25
                            }}
                        />
                        <Box sx={{ minWidth: '80vw', minHeight: '45vh', maxHeight: '85vh', overflowY: 'auto' }}>
                            <CrfReqDetailViewCmp ApprovalData={crfClosedDetails} imagearray={imagearray} />
                            <Box sx={{ pt: 0.5 }}>
                                {reqItems.length !== 0 ?
                                    <ReqItemDisplay reqItems={reqItems} />
                                    : null
                                    // <Box sx={{
                                    //     display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                    //     pt: 10, color: 'grey'
                                    // }}>
                                    //     No Item Requested
                                    // </Box>
                                }
                                {approveTableData.length !== 0 ?
                                    <ApprovedItemListDis approveTableData={approveTableData} />
                                    : null
                                    // <Box sx={{
                                    //     display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                    //     pt: 10, color: 'grey'
                                    // }}>
                                    //     No items Approved
                                    // </Box>
                                }
                                <Paper variant="outlined" square sx={{ flexWrap: 'wrap', p: 0.3, mt: 0.5, mx: 0.5 }}>
                                    <Typography sx={{ fontWeight: 'bold', px: 1, py: 0.5, color: '#145DA0', fontSize: 14 }}>
                                        Approval Details
                                    </Typography>
                                    <Grid container spacing={0.5} sx={{ flexGrow: 1, py: 0.5 }}>
                                        {incharge_req === 1 && incharge_remarks !== null && crf_closed_one !== 'Incharge' ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <CommonInchargeReqCmp DetailViewData={crfClosedDetails} />
                                            </Grid>
                                            : null
                                        }
                                        {hod_req === 1 && hod_approve !== null ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <CommonHodApprvCmp DetailViewData={crfClosedDetails} />
                                            </Grid>
                                            : null
                                        }
                                        {dms_req === 1 && dms_approve !== null ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <CommonDmsApprvCmp DetailViewData={crfClosedDetails} />
                                            </Grid>
                                            : null
                                        }
                                        {ms_approve_req === 1 && ms_approve !== null ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <CommonMsApprvCmp DetailViewData={crfClosedDetails} />
                                            </Grid>
                                            : null

                                        }
                                        {manag_operation_req === 1 && manag_operation_approv !== null ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <CommonMoApprvlCmp DetailViewData={crfClosedDetails} />
                                            </Grid>
                                            : null
                                        }
                                        {senior_manage_req === 1 && senior_manage_approv !== null ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <CommonSmoApprvCmp DetailViewData={crfClosedDetails} />
                                            </Grid>
                                            : null
                                        }
                                        {gm_approve_req === 1 && gm_approve !== null ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <CommonGmapprvCmp DetailViewData={crfClosedDetails} />
                                            </Grid>
                                            : null
                                        }
                                        {md_approve_req === 1 && md_approve !== null ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <CommonMdApprvCmp DetailViewData={crfClosedDetails} />
                                            </Grid>
                                            : null
                                        }
                                        {ed_approve_req === 1 && ed_approve !== null ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <CommonEdapprvCmp DetailViewData={crfClosedDetails} />
                                            </Grid>
                                            : null
                                        }
                                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                            <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap', height: 135 }}>
                                                <Box sx={{ display: 'flex', py: 0.2, borderBottom: '1px solid lightgrey' }}>
                                                    <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}>
                                                        {crf_closed_one}
                                                    </Typography>
                                                    <Box sx={{ flex: 1, }}>
                                                        <Chip size="md" variant="outlined" sx={{
                                                            color: '#bf360c', height: 25,
                                                            fontSize: 12, fontWeight: 550,
                                                        }}>
                                                            CRF Closed
                                                        </Chip>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ pt: 0.5 }}>
                                                    <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Remarks </Typography>
                                                        <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                                        <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                                                            {crf_close_remark}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Closed By </Typography>
                                                        <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                                        <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                                                            {capitalizeWords(closed_user)}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Closed Date </Typography>
                                                        <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                                        <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                                                            {format(new Date(close_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                    </Box>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Box>
                        </Box>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider>
        </Fragment >
    )
}

export default memo(ClosedDetailsModal)