import { Box, Chip, CssVarsProvider, Grid, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { format } from 'date-fns'
import React, { Fragment, memo } from 'react'
import { Paper } from '@mui/material'
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
const PoAcknowComp = React.lazy(() => import("../../ComonComponent/PurchaseComp/PoAcknowComp"))
const QuotationCallComp = React.lazy(() => import("../../ComonComponent/PurchaseComp/QuotationCallComp"))
const QuotationNegoComp = React.lazy(() => import("../../ComonComponent/PurchaseComp/QuotationNegoComp"))
const QuotationFinalComp = React.lazy(() => import("../../ComonComponent/PurchaseComp/QuotationFinalComp"))
const CrfReqDetailCmpnt = React.lazy(() => import("../../CRFRequestMaster/Components/CrfReqDetailCmpnt"))

const PurchaseStatusModalView = ({ modalData, handleClose, open, datacolData, imagearray, reqItems, approveTableData, companyData,
    poDetails }) => {

    const { incharge_approve, incharge_remarks, hod_req, hod_approve, dms_req, dms_approve, ms_approve_req, ms_approve,
        manag_operation_req, manag_operation_approv, senior_manage_req, senior_manage_approv, gm_approve_req, gm_approve,
        md_approve_req, md_approve, ed_approve_req, ed_approve, ack_status, quatation_calling_status, quatation_negotiation,
        quatation_fixing, po_complete, po_complete_date, pocomplete_user, po_to_supplier
    } = modalData

    const capitalizeWords = (str) =>
        str ? str
            .toLowerCase()
            .trim()
            .replace(/\s+/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
            : '';
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
                                height: 35, width: 35
                            }}
                        />
                        <Box sx={{ minWidth: '75vw', minHeight: '65vh', maxHeight: '85vh', overflowY: 'auto', px: 0.5, }}>
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
                                                    <CommonHodApprvCmp DetailViewData={modalData} company={companyData} />
                                                </Grid>
                                                : null
                                            }
                                            {dms_req === 1 && dms_approve !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonDmsApprvCmp DetailViewData={modalData} company={companyData} />
                                                </Grid>
                                                : null
                                            }
                                            {ms_approve_req === 1 && ms_approve !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonMsApprvCmp DetailViewData={modalData} company={companyData} />
                                                </Grid>
                                                : null
                                            }
                                            {manag_operation_req === 1 && manag_operation_approv !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonMoApprvlCmp DetailViewData={modalData} company={companyData} />
                                                </Grid>
                                                : null
                                            }
                                            {senior_manage_req === 1 && senior_manage_approv !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonSmoApprvCmp DetailViewData={modalData} company={companyData} />
                                                </Grid>
                                                : null
                                            }
                                            {gm_approve_req === 1 && gm_approve !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonGmapprvCmp DetailViewData={modalData} company={companyData} />
                                                </Grid>
                                                : null
                                            }
                                            {md_approve_req === 1 && md_approve !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonMdApprvCmp DetailViewData={modalData} company={companyData} />
                                                </Grid>
                                                : null
                                            }
                                            {ed_approve_req === 1 && ed_approve !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonEdapprvCmp DetailViewData={modalData} company={companyData} />
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
                            {ack_status === 1 ?
                                <Paper variant="outlined" square sx={{ flexWrap: 'wrap', p: 0.3, mt: 0.7, mx: 0.7 }}>
                                    <Typography sx={{ fontWeight: 'bold', px: 1, py: 0.7, color: '#145DA0', fontSize: 14 }}>
                                        Procurement Details
                                    </Typography>
                                    <Grid container spacing={0.5} sx={{ flexGrow: 1, }}>
                                        {ack_status === 1 ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <PoAcknowComp poData={modalData} />
                                            </Grid>
                                            : null
                                        }
                                        {quatation_calling_status === 1 ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <QuotationCallComp poData={modalData} />
                                            </Grid>
                                            : null
                                        }
                                        {quatation_negotiation === 1 ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <QuotationNegoComp poData={modalData} />
                                            </Grid>
                                            : null
                                        }
                                        {quatation_fixing === 1 ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <QuotationFinalComp poData={modalData} />
                                            </Grid>
                                            : null
                                        }
                                    </Grid>
                                    {poDetails.length !== 0 ?
                                        <>
                                            <Typography sx={{ fontWeight: 'bold', mx: 1, pt: 0.5, color: '#145DA0', fontSize: 14 }}>
                                                PO Details
                                            </Typography>
                                            <Box sx={{ width: "100%", pb: 0.3, flexWrap: 'wrap' }}>
                                                <CrfReqDetailCmpnt poDetails={poDetails} />
                                            </Box>
                                        </> : null}
                                    {po_complete === 1 && po_to_supplier === 0 ?
                                        <Box sx={{ display: 'flex', pt: 0.5, }}>
                                            <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}>
                                                Purchase Order&apos;s Completed
                                            </Typography>
                                            : &nbsp;        <Box sx={{ flex: 1, display: 'flex' }}>
                                                <Chip size="md" variant="outlined" sx={{
                                                    color: '#2e7d32', height: 25, pb: 0.5,
                                                    fontSize: 12, fontWeight: 550,
                                                }}>
                                                    Yes
                                                </Chip>
                                                <Typography sx={{
                                                    display: 'flex', justifyContent: 'flex-end', fontSize: 12,
                                                    textTransform: 'capitalize', fontWeight: 550, pl: 2, pt: 0.4
                                                }}>{capitalizeWords(pocomplete_user)}&nbsp; /</Typography>
                                                <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, pl: 1, pt: 0.4 }}>
                                                    {format(new Date(po_complete_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                            </Box>
                                        </Box>
                                        : null
                                    }
                                </Paper>
                                : null}
                        </Box>
                        <Box sx={{ height: 20 }}> </Box>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider >
        </Fragment>
    )
}

export default memo(PurchaseStatusModalView)