import { Box, CssVarsProvider, Grid, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo } from 'react'

const ApprovedItemListDis = React.lazy(() => import("../../ComonComponent/ApprovedItemListDis"))
const CommonInchargeReqCmp = React.lazy(() => import("../../ComonComponent/ApprovalComp/CommonInchargeReqCmp"))
const CommonHodApprvCmp = React.lazy(() => import("../../ComonComponent/ApprovalComp/CommonHodApprvCmp"))
const CommonDmsApprvCmp = React.lazy(() => import("../../ComonComponent/ApprovalComp/CommonDmsApprvCmp"))
const CommonMsApprvCmp = React.lazy(() => import("../../ComonComponent/ApprovalComp/CommonMsApprvCmp"))
const CommonMoApprvlCmp = React.lazy(() => import("../../ComonComponent/ApprovalComp/CommonMoApprvlCmp"))
const CommonSmoApprvCmp = React.lazy(() => import("../../ComonComponent/ApprovalComp/CommonSmoApprvCmp"))
const CommonGmapprvCmp = React.lazy(() => import("../../ComonComponent/ApprovalComp/CommonGmapprvCmp"))
const CommonMdApprvCmp = React.lazy(() => import("../../ComonComponent/ApprovalComp/CommonMdApprvCmp"))
const CommonEdapprvCmp = React.lazy(() => import("../../ComonComponent/ApprovalComp/CommonEdapprvCmp"))
const ViewOreviousDataCollctnDetails = React.lazy(() => import("../../ComonComponent/DataCollectionComp/ViewOreviousDataCollctnDetails"))
const CrfReqDetailViewCmp = React.lazy(() => import("../../ComonComponent/CrfReqDetailViewCmp"))
const ReqItemDisplay = React.lazy(() => import("../../ComonComponent/ReqItemDisplay"))

const DashboardApprovalView = ({ modalData, handleClose, open, datacolData, imagearray, reqItems, approveTableData }) => {

    const { incharge_approve, incharge_remarks, hod_req, hod_approve, dms_req, dms_approve,
        ms_approve_req, ms_approve, manag_operation_req, manag_operation_approv, senior_manage_req, senior_manage_approv,
        gm_approve_req, gm_approve, md_approve_req, md_approve, ed_approve_req, ed_approve,
    } = modalData

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
                                height: 25, width: 25
                            }}
                        />
                        {modalData.length !== 0 ?
                            <Box sx={{ minWidth: '85vw', minHeight: '65vh', maxHeight: '95vh', overflowY: 'auto' }}>
                                <CrfReqDetailViewCmp ApprovalData={modalData} imagearray={imagearray} />
                                {reqItems.length !== 0 ?
                                    <Box sx={{ mt: 0.5, mx: 0.3 }}>
                                        <ReqItemDisplay reqItems={reqItems} />
                                    </Box>
                                    : null
                                    // <Box sx={{
                                    //     display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                    //     pt: 10, color: 'grey'
                                    // }}>
                                    //     No Item Requested
                                    // </Box>
                                }
                                {approveTableData.length !== 0 ?
                                    <Box sx={{ mt: 0.3, mx: 0.3 }}>
                                        <ApprovedItemListDis approveTableData={approveTableData} />
                                    </Box>
                                    : null
                                    // <Box sx={{
                                    //     display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                    //     pt: 10, color: 'grey'
                                    // }}>
                                    //     No items Approved
                                    // </Box>
                                }
                                {(hod_approve !== null || incharge_approve !== null) ?
                                    <>
                                        <Paper variant="outlined" square sx={{ flexWrap: 'wrap', p: 0.3, mt: 0.7, mx: 0.7, pb: 0.5 }}>
                                            <Typography sx={{ fontWeight: 'bold', px: 1, py: 0.7, color: '#145DA0', fontSize: 14 }}>
                                                Approval Details
                                            </Typography>
                                            <Grid container spacing={0.5} sx={{ flexGrow: 1, }}>
                                                {incharge_approve === 1 && incharge_remarks !== null ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <CommonInchargeReqCmp DetailViewData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {hod_req === 1 && hod_approve !== null ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <CommonHodApprvCmp DetailViewData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {dms_req === 1 && dms_approve !== null ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <CommonDmsApprvCmp DetailViewData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {ms_approve_req === 1 && ms_approve !== null ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <CommonMsApprvCmp DetailViewData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {manag_operation_req === 1 && manag_operation_approv !== null ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <CommonMoApprvlCmp DetailViewData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {senior_manage_req === 1 && senior_manage_approv !== null ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <CommonSmoApprvCmp DetailViewData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {gm_approve_req === 1 && gm_approve !== null ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <CommonGmapprvCmp DetailViewData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {md_approve_req === 1 && md_approve !== null ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <CommonMdApprvCmp DetailViewData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {ed_approve_req === 1 && ed_approve !== null ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <CommonEdapprvCmp DetailViewData={modalData} />
                                                    </Grid>
                                                    : null
                                                }
                                            </Grid>
                                        </Paper>
                                        {datacolData.length !== 0 ?
                                            <Box sx={{ py: 0.5, mx: 0.2 }}>
                                                <ViewOreviousDataCollctnDetails datacolData={datacolData} />
                                            </Box>
                                            : null
                                        }

                                    </>
                                    : null}
                            </Box>
                            : null}
                        <Box sx={{ height: 20 }}> </Box>

                    </ModalDialog>
                </Modal>
            </CssVarsProvider >
        </Fragment >
    )
}

export default memo(DashboardApprovalView)