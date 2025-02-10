import { Box, CssVarsProvider, Grid, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import React, { Fragment, memo } from 'react'
import { ToastContainer } from 'react-toastify'
import { Paper } from '@mui/material'
import CrfReqDetailViewCmp from '../CrfReqDetailViewCmp'
import ReqItemDisplay from '../ReqItemDisplay'
import ApprovedItemListDis from '../ApprovedItemListDis'
import CommonInchargeReqCmp from '../ApprovalComp/CommonInchargeReqCmp'
import CommonCRFClosed from '../ApprovalComp/CommonCRFClosed'
import HODApproveViewHigher from './HODApproveViewHigher'
import DMSApproveViewForHigher from './DMSApproveViewForHigher'
import MSApproveViewForHigher from './MSApproveViewForHigher'
import MOApproveViewForHigher from './MOApproveViewForHigher'
import SMOApproveViewForHigher from './SMOApproveViewForHigher'
import GMApproveViewForHigher from './GMApproveViewForHigher'
import MDApproveViewHigher from './MDApproveViewHigher'
import EDApproveViewForHigher from './EDApproveViewForHigher'
import ManageApproveViewHigher from './ManageApproveViewHigher'

const HigherClosedDetailsView = ({ open, crfClosedDetails, handleCloseModal, reqItems, approveTableData, imagearray, selectedCompany }) => {
    const { incharge_req, incharge_remarks, hod_req, hod_approve, dms_approve, ms_approve, manag_operation_approv,
        senior_manage_approv, gm_approve, md_approve, ed_approve, crf_closed_one, dms_req, ms_approve_req,
        manag_operation_req, senior_manage_req, gm_approve_req, ed_approve_req, md_approve_req,
        managing_director_approve, managing_director_req } = crfClosedDetails
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
                                }
                                {approveTableData.length !== 0 ?
                                    <ApprovedItemListDis approveTableData={approveTableData} />
                                    : null
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
                                                <HODApproveViewHigher DetailViewData={crfClosedDetails} selectedCompany={selectedCompany} />
                                            </Grid>
                                            : null
                                        }
                                        {dms_req === 1 && dms_approve !== null ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <DMSApproveViewForHigher DetailViewData={crfClosedDetails} selectedCompany={selectedCompany} />
                                            </Grid>
                                            : null
                                        }
                                        {ms_approve_req === 1 && ms_approve !== null ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <MSApproveViewForHigher DetailViewData={crfClosedDetails} selectedCompany={selectedCompany} />
                                            </Grid>
                                            : null
                                        }
                                        {manag_operation_req === 1 && manag_operation_approv !== null ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <MOApproveViewForHigher DetailViewData={crfClosedDetails} selectedCompany={selectedCompany} />
                                            </Grid>
                                            : null
                                        }
                                        {senior_manage_req === 1 && senior_manage_approv !== null ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <SMOApproveViewForHigher DetailViewData={crfClosedDetails} selectedCompany={selectedCompany} />
                                            </Grid>
                                            : null
                                        }
                                        {gm_approve_req === 1 && gm_approve !== null ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <GMApproveViewForHigher DetailViewData={crfClosedDetails} selectedCompany={selectedCompany} />
                                            </Grid>
                                            : null
                                        }
                                        {md_approve_req === 1 && md_approve !== null ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <MDApproveViewHigher DetailViewData={crfClosedDetails} selectedCompany={selectedCompany} />
                                            </Grid>
                                            : null
                                        }
                                        {ed_approve_req === 1 && ed_approve !== null ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <EDApproveViewForHigher DetailViewData={crfClosedDetails} selectedCompany={selectedCompany} />
                                            </Grid>
                                            : null
                                        }
                                        {managing_director_req === 1 && managing_director_approve !== null ?
                                            <Box sx={{ pt: 0.5 }}>
                                                <ManageApproveViewHigher DetailViewData={crfClosedDetails} selectedCompany={selectedCompany} />
                                            </Box>
                                            : null}
                                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                            <CommonCRFClosed closedData={crfClosedDetails} />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Box>
                        </Box>
                        <Box sx={{ height: 20 }}></Box>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider>
        </Fragment >
    )
}

export default memo(HigherClosedDetailsView)