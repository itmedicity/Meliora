import React, { Fragment, memo } from 'react'
import { ToastContainer } from 'react-toastify';
import { Paper } from '@mui/material'
import { Box, Chip, CssVarsProvider, Grid, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { format } from 'date-fns';
import ReqItemDisplay from './ReqItemDisplay';
import CrfReqDetailViewCmp from './CrfReqDetailViewCmp';
import CommonInchargeReqCmp from './ApprovalComp/CommonInchargeReqCmp';
import CommonHodApprvCmp from './ApprovalComp/CommonHodApprvCmp';
import CommonDmsApprvCmp from './ApprovalComp/CommonDmsApprvCmp';
import CommonMsApprvCmp from './ApprovalComp/CommonMsApprvCmp';
import CommonMoApprvlCmp from './ApprovalComp/CommonMoApprvlCmp';
import CommonSmoApprvCmp from './ApprovalComp/CommonSmoApprvCmp';
import CommonGmapprvCmp from './ApprovalComp/CommonGmapprvCmp';
import CommonMdApprvCmp from './ApprovalComp/CommonMdApprvCmp';
import CommonEdapprvCmp from './ApprovalComp/CommonEdapprvCmp';
import CrfReqDetailCmpnt from '../CRFRequestMaster/Components/CrfReqDetailCmpnt';
import PoAcknowComp from './PurchaseComp/PoAcknowComp';
import QuotationCallComp from './PurchaseComp/QuotationCallComp';
import QuotationNegoComp from './PurchaseComp/QuotationNegoComp';
import QuotationFinalComp from './PurchaseComp/QuotationFinalComp';
import ViewOreviousDataCollctnDetails from './DataCollectionComp/ViewOreviousDataCollctnDetails';
import ApprovalItemView from '../CrfDatacollection/ApprovalItemView';
const HigherAppDoneModal = ({ open, closeModal, DetailViewData, reqItems, approveTableData, poDetails, imagearray, datacolData }) => {
    const { incharge_approve, incharge_remarks, hod_req, hod_approve, dms_req, dms_approve,
        ms_approve_req, ms_approve, manag_operation_req, manag_operation_approv, senior_manage_req, senior_manage_approv,
        gm_approve_req, gm_approve, md_approve_req, md_approve, ed_approve_req, ed_approve,
        ack_status, quatation_calling_status, quatation_negotiation, quatation_fixing, sub_store_name,
        po_complete, po_complete_date, po_to_supplier, po_to_supplier_date, store_recieve, sub_store_recieve,
        pocomplete_user, crs_user, store_user, store_receive_date, substore_ack_date,
        crf_close, crf_close_remark, crf_closed_one, close_date, closed_user } = DetailViewData

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
            <ToastContainer />
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={closeModal}
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
                        <Box sx={{ minWidth: '85vw', minHeight: '65vh', maxHeight: '95vh', overflowY: 'auto' }}>
                            <CrfReqDetailViewCmp ApprovalData={DetailViewData} imagearray={imagearray} />
                            {reqItems.length !== 0 ?
                                <Box sx={{ mt: 0.5, mx: 0.3 }}>
                                    <ReqItemDisplay reqItems={reqItems} />
                                </Box>
                                : <Box sx={{
                                    display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                    pt: 10, color: 'grey'
                                }}>
                                    No Item Requested
                                </Box>
                            }
                            {approveTableData.length !== 0 ?
                                <Box sx={{ mt: 0.3, mx: 0.3 }}>
                                    <ApprovalItemView approveTableData={approveTableData} />
                                </Box>
                                : <Box sx={{
                                    display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                    pt: 10, color: 'grey'
                                }}>
                                    No items Approved
                                </Box>
                            }
                            {(hod_approve !== null || incharge_approve !== null) ?
                                <>
                                    <Paper variant="outlined" square sx={{ flexWrap: 'wrap', p: 0.3, mt: 0.7, mx: 0.7 }}>
                                        <Typography sx={{ fontWeight: 'bold', px: 1, py: 0.7, color: '#145DA0', fontSize: 14 }}>
                                            Approval Details
                                        </Typography>
                                        <Grid container spacing={0.5} sx={{ flexGrow: 1, }}>
                                            {incharge_approve === 1 && incharge_remarks !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonInchargeReqCmp DetailViewData={DetailViewData} />
                                                </Grid>
                                                : null
                                            }
                                            {hod_req === 1 && hod_approve !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonHodApprvCmp DetailViewData={DetailViewData} />
                                                </Grid>
                                                : null
                                            }
                                            {dms_req === 1 && dms_approve !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonDmsApprvCmp DetailViewData={DetailViewData} />
                                                </Grid>
                                                : null
                                            }
                                            {ms_approve_req === 1 && ms_approve !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonMsApprvCmp DetailViewData={DetailViewData} />
                                                </Grid>
                                                : null
                                            }
                                            {manag_operation_req === 1 && manag_operation_approv !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonMoApprvlCmp DetailViewData={DetailViewData} />
                                                </Grid>
                                                : null
                                            }
                                            {senior_manage_req === 1 && senior_manage_approv !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonSmoApprvCmp DetailViewData={DetailViewData} />
                                                </Grid>
                                                : null
                                            }
                                            {gm_approve_req === 1 && gm_approve !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonGmapprvCmp DetailViewData={DetailViewData} />
                                                </Grid>
                                                : null
                                            }
                                            {md_approve_req === 1 && md_approve !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonMdApprvCmp DetailViewData={DetailViewData} />
                                                </Grid>
                                                : null
                                            }
                                            {ed_approve_req === 1 && ed_approve !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonEdapprvCmp DetailViewData={DetailViewData} />
                                                </Grid>
                                                : null
                                            }
                                            {crf_close === 1 ?
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
                                                : null}
                                        </Grid>
                                    </Paper>
                                    {datacolData.length !== 0 ?
                                        <Box sx={{ py: 0.5, mx: 0.2 }}>
                                            <ViewOreviousDataCollctnDetails datacolData={datacolData} />
                                        </Box>
                                        : null
                                    }
                                    {ack_status === 1 ?
                                        <Paper variant="outlined" square sx={{ flexWrap: 'wrap', p: 0.3, mt: 0.7, mx: 0.7 }}>
                                            <Typography sx={{ fontWeight: 'bold', px: 1, py: 0.7, color: '#145DA0', fontSize: 14 }}>
                                                Procurement Details
                                            </Typography>
                                            <Grid container spacing={0.5} sx={{ flexGrow: 1, }}>
                                                {ack_status === 1 ?
                                                    <Grid xs={12} sm={12} md={12} lg={6} xl={6} sx={{ pl: 0.5 }}>
                                                        <PoAcknowComp poData={DetailViewData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {quatation_calling_status === 1 ?
                                                    <Grid xs={12} sm={12} md={12} lg={6} xl={6} sx={{ pl: 0.5 }}>
                                                        <QuotationCallComp poData={DetailViewData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {quatation_negotiation === 1 ?
                                                    <Grid xs={12} sm={12} md={12} lg={6} xl={6} sx={{ pl: 0.5 }}>
                                                        <QuotationNegoComp poData={DetailViewData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {quatation_fixing === 1 ?
                                                    <Grid xs={12} sm={12} md={12} lg={6} xl={6} sx={{ pl: 0.5 }}>
                                                        <QuotationFinalComp poData={DetailViewData} />
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
                                            {po_complete === 1 ?
                                                <Box sx={{ display: 'flex', pt: 0.5, }}>
                                                    <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.7 }}>
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
                                            {po_to_supplier === 1 ?
                                                <Box sx={{ display: 'flex', pt: 0.5, }}>
                                                    <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.7 }}>
                                                        CRF Acknowledgement
                                                    </Typography>
                                                    : &nbsp;      <Box sx={{ flex: 1, display: 'flex' }}>
                                                        <Chip size="md" variant="outlined" sx={{
                                                            color: '#2e7d32', height: 25, pb: 0.5,
                                                            fontSize: 12, fontWeight: 550,
                                                        }}>
                                                            Yes
                                                        </Chip>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, pl: 2, pt: 0.4 }}>
                                                            {format(new Date(po_to_supplier_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                    </Box>
                                                </Box>
                                                : null
                                            }
                                            {store_recieve === 1 || store_recieve === 0 ?
                                                <Box sx={{ display: 'flex', pt: 0.5, }}>
                                                    <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.7 }}>
                                                        Received in CRS Store
                                                    </Typography>
                                                    : &nbsp;     <Box sx={{ flex: 1, display: 'flex' }}>
                                                        <Chip size="md" variant="outlined" sx={{
                                                            color: '#2e7d32', height: 25, pb: 0.5,
                                                            fontSize: 12, fontWeight: 550,
                                                        }}>
                                                            Yes
                                                        </Chip>
                                                        <Typography sx={{
                                                            display: 'flex', justifyContent: 'flex-end', fontSize: 12,
                                                            textTransform: 'capitalize', fontWeight: 550, pl: 2, pt: 0.4
                                                        }}>{capitalizeWords(crs_user)}&nbsp; /</Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, pl: 1, pt: 0.4 }}>
                                                            {format(new Date(store_receive_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                    </Box>
                                                </Box>
                                                : null
                                            }
                                            {sub_store_recieve === 1 ?
                                                <Box sx={{ display: 'flex', pt: 0.5, }}>
                                                    <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.7 }}>
                                                        Received in {sub_store_name}
                                                    </Typography>
                                                    : &nbsp;     <Box sx={{ flex: 1, display: 'flex' }}>
                                                        <Chip size="md" variant="outlined" sx={{
                                                            color: '#2e7d32', height: 25, pb: 0.5,
                                                            fontSize: 12, fontWeight: 550,
                                                        }}>
                                                            Yes
                                                        </Chip>
                                                        <Typography sx={{
                                                            display: 'flex', justifyContent: 'flex-end', fontSize: 12,
                                                            textTransform: 'capitalize', fontWeight: 550, pl: 2, pt: 0.4
                                                        }}>{capitalizeWords(store_user)}&nbsp; /</Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, pl: 1, pt: 0.4 }}>
                                                            {format(new Date(substore_ack_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                    </Box>
                                                </Box>
                                                : null
                                            }
                                        </Paper>
                                        : null}
                                </>
                                : ((hod_approve === null || incharge_approve == null)) ?
                                    <>
                                        {crf_close === 1 ?
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
                                            : null}
                                    </>
                                    :
                                    <Box sx={{
                                        display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                        pt: 10, color: 'grey'
                                    }}>
                                        No Report Found
                                    </Box>}
                        </Box>
                        <Box sx={{ height: 20 }}> </Box>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider >
        </Fragment >
    )
}

export default memo(HigherAppDoneModal)