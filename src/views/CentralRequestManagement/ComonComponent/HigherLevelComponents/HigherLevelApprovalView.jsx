import React, { Fragment, memo, } from 'react'
import { ToastContainer } from 'react-toastify';
import { Paper } from '@mui/material'
import { Box, Chip, CssVarsProvider, Grid, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { format } from 'date-fns';
import ReqItemDisplay from '../ReqItemDisplay';
import CrfReqDetailViewCmp from '../CrfReqDetailViewCmp';
import CommonInchargeReqCmp from '../ApprovalComp/CommonInchargeReqCmp';
import CommonHodApprvCmp from '../ApprovalComp/CommonHodApprvCmp';
import CommonDmsApprvCmp from '../ApprovalComp/CommonDmsApprvCmp';
import CommonMsApprvCmp from '../ApprovalComp/CommonMsApprvCmp';
import CommonMoApprvlCmp from '../ApprovalComp/CommonMoApprvlCmp';
import CommonSmoApprvCmp from '../ApprovalComp/CommonSmoApprvCmp';
import CommonGmapprvCmp from '../ApprovalComp/CommonGmapprvCmp';
import CommonMdApprvCmp from '../ApprovalComp/CommonMdApprvCmp';
import CommonEdapprvCmp from '../ApprovalComp/CommonEdapprvCmp';
import CrfReqDetailCmpnt from '../../CRFRequestMaster/Components/CrfReqDetailCmpnt';
import PoAcknowComp from '../PurchaseComp/PoAcknowComp';
import QuotationCallComp from '../PurchaseComp/QuotationCallComp';
import QuotationNegoComp from '../PurchaseComp/QuotationNegoComp';
import QuotationFinalComp from '../PurchaseComp/QuotationFinalComp';
import ApprovalItemView from '../../CrfDatacollection/ApprovalItemView';
import CommonCRFClosed from '../ApprovalComp/CommonCRFClosed';
import UserReceivedItemDetails from '../ApprovalComp/UserReceivedItemDetails';
import CommonMangingApprvComp from '../ApprovalComp/CommonMangingApprvComp';
import DataCollectionViewHigherLevel from '../DataCollectionComp/DataCollectionViewHigherLevel';
// import ModalButtomCmp from '../Components/ModalButtomCmp';
// import { axioslogin } from 'src/views/Axios/Axios';
// import { succesNotify, warningNotify } from 'src/views/Common/CommonCode';
// import { useSelector } from 'react-redux';

const HigherLevelApprovalView = ({ open, closeModal, DetailViewData, reqItems, approveTableData, poDetails, imagearray, ViewRemark, setDetailViewModal,
    datacolData, selectedCompany, company }) => {
    const { req_slno, incharge_approve, incharge_remarks, hod_req, hod_approve, dms_req, dms_approve, ms_approve_req, ms_approve,
        manag_operation_req, manag_operation_approv, senior_manage_req, senior_manage_approv, gm_approve_req, gm_approve,
        md_approve_req, md_approve, ed_approve_req, ed_approve, managing_director_req, managing_director_approve, ack_status,
        quatation_calling_status, quatation_negotiation, quatation_fixing, sub_store_name, po_complete, po_complete_date,
        po_to_supplier, po_to_supplier_date, store_recieve, sub_store_recieve, pocomplete_user, crs_user, store_user,
        store_receive_date, substore_ack_date, crf_close, user_acknldge, acknowUser, user_ack_date, user_acknldge_remarks,
        approval_level } = DetailViewData

    // const [ViewCrfRemark, SetViewCrfRemark] = useState('')
    // const empdept = useSelector((state) => {

    //     return state.LoginUserData.empdept

    // })
    // const empid = useSelector((state) => {
    //     return state.LoginUserData.empid

    // })
    const capitalizeWords = (str) =>
        str ? str
            .toLowerCase()
            .trim()
            .replace(/\s+/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
            : '';

    // const postData = useMemo(() => {
    //     return {
    //         req_slno: req_slno,
    //         ViewCrfRemark: ViewCrfRemark,
    //         status: 1,
    //         empdept: empdept,
    //         empid: empid,

    //     };
    // }, [req_slno, ViewCrfRemark, empid, empdept])

    // const submit = useCallback(async () => {
    //     const result = await axioslogin.post('/CRFRegisterApproval/CrfViewInsert', postData);
    //     const { success } = result.data;
    //     if (success === 1) {
    //         succesNotify("Data Updated Successfully");
    //         setDetailViewModal(false)
    //     } else {
    //         warningNotify('Something Went Wrong');
    //         setDetailViewModal(false)

    //     }
    // }, [postData, setDetailViewModal])

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
                        <Box sx={{ minWidth: '85vw', minHeight: '65vh', maxHeight: '95vh', overflowY: 'auto', }}>
                            <CrfReqDetailViewCmp ApprovalData={DetailViewData} imagearray={imagearray} selectedCompany={selectedCompany} />
                            {reqItems.length !== 0 ?
                                <Box sx={{ mt: 0.5, mx: 0.3 }}>
                                    <ReqItemDisplay reqItems={reqItems} />
                                </Box>
                                : null
                            }
                            {approveTableData.length !== 0 ?
                                <Box sx={{ mt: 0.3, mx: 0.3 }}>
                                    <ApprovalItemView approveTableData={approveTableData} />
                                </Box>
                                : null
                            }
                            {(hod_approve !== null || incharge_approve !== null) ?
                                <>
                                    <Paper variant="outlined" square sx={{ flexWrap: 'wrap', p: 0.3, mt: 0.7, mx: 0.7, pb: 0.7 }}>
                                        <Typography sx={{ fontWeight: 'bold', px: 1, py: 0.7, color: '#145DA0', fontSize: 14 }}>
                                            Approval Details
                                        </Typography>
                                        <Grid container spacing={0.5} sx={{ flexGrow: 1, }}>
                                            {incharge_approve === 1 && incharge_remarks !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonInchargeReqCmp DetailViewData={DetailViewData} company={company} />
                                                </Grid>
                                                : null
                                            }
                                            {hod_req === 1 && hod_approve !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonHodApprvCmp DetailViewData={DetailViewData} selectedCompany={selectedCompany} company={company} />
                                                </Grid>
                                                : null
                                            }
                                            {dms_req === 1 && dms_approve !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonDmsApprvCmp DetailViewData={DetailViewData} selectedCompany={selectedCompany} company={company} />
                                                </Grid>
                                                : null
                                            }
                                            {ms_approve_req === 1 && ms_approve !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonMsApprvCmp DetailViewData={DetailViewData} selectedCompany={selectedCompany} company={company} />
                                                </Grid>
                                                : null
                                            }
                                            {manag_operation_req === 1 && manag_operation_approv !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonMoApprvlCmp DetailViewData={DetailViewData} selectedCompany={selectedCompany} company={company} />
                                                </Grid>
                                                : null
                                            }
                                            {senior_manage_req === 1 && senior_manage_approv !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonSmoApprvCmp DetailViewData={DetailViewData} selectedCompany={selectedCompany} company={company} />
                                                </Grid>
                                                : null
                                            }
                                            {gm_approve_req === 1 && gm_approve !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonGmapprvCmp DetailViewData={DetailViewData} selectedCompany={selectedCompany} company={company} />
                                                </Grid>
                                                : null
                                            }
                                            {md_approve_req === 1 && md_approve !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonMdApprvCmp DetailViewData={DetailViewData} selectedCompany={selectedCompany} company={company} />
                                                </Grid>
                                                : null
                                            }
                                            {ed_approve_req === 1 && ed_approve !== null ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonEdapprvCmp DetailViewData={DetailViewData} selectedCompany={selectedCompany} company={company} />
                                                </Grid>
                                                : null
                                            }
                                            {(managing_director_req === 1 && managing_director_approve !== null) ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonMangingApprvComp DetailViewData={DetailViewData} selectedCompany={selectedCompany} company={company} />
                                                </Grid>
                                                : null
                                            }
                                            {crf_close === 1 ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <CommonCRFClosed closedData={DetailViewData} />
                                                </Grid>
                                                : null}
                                        </Grid>
                                    </Paper>
                                    {datacolData.length !== 0 ?
                                        <Box sx={{ py: 0.5, mx: 0.2 }}>
                                            <DataCollectionViewHigherLevel datacolData={datacolData} selectedCompany={selectedCompany} />
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
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <PoAcknowComp poData={DetailViewData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {quatation_calling_status === 1 ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <QuotationCallComp poData={DetailViewData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {quatation_negotiation === 1 ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                        <QuotationNegoComp poData={DetailViewData} />
                                                    </Grid>
                                                    : null
                                                }
                                                {quatation_fixing === 1 ?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
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
                                                    <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}>
                                                        Purchase Order Preparation Completed
                                                    </Typography>
                                                    : &nbsp;        <Box sx={{ flex: 1, display: 'flex' }}>
                                                        <Chip size="md" variant="outlined" sx={{
                                                            color: '#2e7d32', height: 25, pb: 0.5,
                                                            fontSize: 12, fontWeight: 550,
                                                        }}>
                                                            Yes
                                                        </Chip>
                                                        <Typography sx={{
                                                            display: 'flex', justifyContent: 'flex-end', fontSize: 13,
                                                            textTransform: 'capitalize', fontWeight: 550, pl: 2, pt: 0.4
                                                        }}>{capitalizeWords(pocomplete_user)}&nbsp; /</Typography>
                                                        <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, pl: 1, pt: 0.4 }}>
                                                            {format(new Date(po_complete_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                    </Box>
                                                </Box>
                                                : null
                                            }
                                            {approval_level !== null ?
                                                < Box sx={{ display: 'flex', pt: 0.5, }}>
                                                    <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}>
                                                        PO Approvals
                                                    </Typography>
                                                    : &nbsp;
                                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                                        {/* <Chip size="md" variant="outlined" sx={{
                                                                color: '#2e7d32', height: 25, pb: 0.5,
                                                                fontSize: 12, fontWeight: 550,
                                                            }}>
                                                                Yes
                                                            </Chip> */}
                                                        <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, pl: 0.5, pt: 0.4, color: '#1b5e20' }}>
                                                            {approval_level === 1 ? "Purchase Dpt Approved" :
                                                                approval_level === 2 ? "Purchase Department Approved, Purchase Manager Approved" :
                                                                    approval_level === 3 ? "Purchase Department Approved, Purchase Manager Approved, Directors Approved" : null} </Typography>
                                                    </Box>
                                                </Box>
                                                :
                                                < Box sx={{ display: 'flex', pt: 0.5, }}>
                                                    <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}>
                                                        PO Approvals
                                                    </Typography>
                                                    : &nbsp;
                                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                                        <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, pt: 0.4, color: '#ff8f00' }}>
                                                            Approval Pending
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            }

                                            {po_to_supplier === 1 ?
                                                <Box sx={{ display: 'flex', pt: 0.5, }}>
                                                    <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}>
                                                        PO-Supplier Acknowledgement
                                                    </Typography>
                                                    : &nbsp;      <Box sx={{ flex: 1, display: 'flex' }}>
                                                        <Chip size="md" variant="outlined" sx={{
                                                            color: '#2e7d32', height: 25, pb: 0.5,
                                                            fontSize: 12, fontWeight: 550,
                                                        }}>
                                                            Yes
                                                        </Chip>
                                                        <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, pl: 2, pt: 0.4 }}>
                                                            {format(new Date(po_to_supplier_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                    </Box>
                                                </Box>
                                                : null
                                            }
                                            {store_recieve === 1 || store_recieve === 0 ?
                                                <Box sx={{ display: 'flex', pt: 0.5, }}>
                                                    <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}>
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
                                                            display: 'flex', justifyContent: 'flex-end', fontSize: 13,
                                                            textTransform: 'capitalize', fontWeight: 550, pl: 2, pt: 0.4
                                                        }}>{capitalizeWords(crs_user)}&nbsp; /</Typography>
                                                        <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, pl: 1, pt: 0.4 }}>
                                                            {format(new Date(store_receive_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                    </Box>
                                                </Box>
                                                : null
                                            }
                                            {sub_store_recieve === 1 ?
                                                <Box sx={{ display: 'flex', pt: 0.5, }}>
                                                    <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}>
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
                                                            display: 'flex', justifyContent: 'flex-end', fontSize: 13,
                                                            textTransform: 'capitalize', fontWeight: 550, pl: 2, pt: 0.4
                                                        }}>{capitalizeWords(store_user)}&nbsp; /</Typography>
                                                        <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, pl: 1, pt: 0.4 }}>
                                                            {format(new Date(substore_ack_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                    </Box>
                                                </Box>
                                                : null
                                            }
                                            {user_acknldge === 1 ?
                                                <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap', }}>
                                                    <Box sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}>
                                                        <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}>
                                                            User Acknowledgement
                                                        </Typography>

                                                    </Box>
                                                    <Box sx={{ display: 'flex', mx: 0.3, p: 1 }}>
                                                        <Typography sx={{ fontSize: 14, flex: 0.4 }}>Remarks</Typography>
                                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                                            <Typography sx={{ fontSize: 13, flex: 1, fontWeight: 550 }}>: &nbsp;{user_acknldge_remarks === null ? 'Not Updated' : user_acknldge_remarks}</Typography>
                                                            <Typography sx={{
                                                                display: 'flex', flex: 1, justifyContent: 'flex-end', fontSize: 13,
                                                                textTransform: 'capitalize', fontWeight: 550, pr: 1
                                                            }}>{capitalizeWords(acknowUser)}&nbsp; /</Typography>
                                                            <Typography sx={{ pr: 2, display: 'flex', justifyContent: 'flex-start', fontSize: 13, fontWeight: 550 }}>
                                                                {format(new Date(user_ack_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography >
                                                        </Box>
                                                    </Box>
                                                </Paper>
                                                : null
                                            }
                                            {user_acknldge === 1 ?
                                                <UserReceivedItemDetails req_slno={req_slno} />
                                                : null}
                                            <Box sx={{ height: 15 }}></Box>
                                            <Box sx={{ height: 15 }}></Box>
                                        </Paper>
                                        : null}
                                </>
                                : ((hod_approve === null || incharge_approve == null)) ?
                                    <>
                                        {crf_close === 1 ?
                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                <CommonCRFClosed closedData={DetailViewData} />
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
                            {/* <Paper variant="outlined" square sx={{ flexWrap: 'wrap', mt: 0.7, mx: 0.7, pb: 0.7 }}>
                                <Box sx={{ display: 'flex', pt: 0.4, }}>
                                    <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}>Remarks</Typography>
                                    <Typography sx={{ pt: 1 }}>  :&nbsp;</Typography>
                                    <Box sx={{ px: 1, pt: 0.2, flex: 1.5 }}>
                                        <CssVarsProvider>
                                            <Textarea
                                                required
                                                type="text"
                                                size="sm"
                                                minRows={2}
                                                maxRows={4}
                                                style={{ width: "90%", }}
                                                placeholder="Remarks"
                                                name='ViewCrfRemark'
                                                value={ViewCrfRemark || ''}
                                                onChange={(e) => SetViewCrfRemark(e.target.value)}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>


                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                <Box sx={{ py: 0.5, pr: 0.5 }}>
                                    <ModalButtomCmp
                                        handleChange={submit}
                                    > Save</ModalButtomCmp>
                                </Box>
                                <Box sx={{ py: 0.5, pr: 2 }}>
                                    <ModalButtomCmp
                                        handleChange={closeModal}
                                    > Cancel</ModalButtomCmp>
                                </Box>
                            </Box> */}
                        </Box>
                        <Box sx={{ height: 15 }}></Box>

                    </ModalDialog>
                </Modal>
            </CssVarsProvider >

        </Fragment >
    )
}

export default memo(HigherLevelApprovalView)