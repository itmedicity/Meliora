import React, { Fragment, useCallback, useState, memo, useEffect } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { axioslogin } from 'src/views/Axios/Axios'
import { CssVarsProvider, Typography } from '@mui/joy'
import { TypoHeadColor } from 'src/color/Color'
import ReqItemDisplay from '../ComonComponent/ReqItemDisplay';
import { format } from 'date-fns';
import Divider from '@mui/material/Divider';
import ApprovedItemListDis from './ApprovedItemListDis';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const HigherAppDoneModal = ({ open, setDetailViewModal, DetailViewData, setDetailViewData, setDetailViewFlag, user }) => {

    const { req_slno, req_date, actual_requirement, needed, expected_date, incharge_approve, incharge_req,
        inch_detial_analysis, incharge, incharge_remark, incharge_user, incharge_apprv_date, hod_req,
        hod_approve, hod, hod_detial_analysis, hod_approve_date, hod_remarks, hod_user,
        dms_approve, dms, dms_remarks, dms_detail_analysis, dms_approve_date, dms_user,
        ms, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, ms_approve_user,
        manag_operation_approv, om, manag_operation_remarks, om_detial_analysis, om_approv_date,
        manag_operation_user, senior_manage_approv, smo, senior_manage_remarks, smo_detial_analysis,
        som_aprrov_date, senior_manage_user, gm_approve, gm, gm_approve_remarks, gm_detial_analysis,
        gm_approv_date, gm_user, md_approve, md_approve_remarks, md_detial_analysis, md_approve_date,
        md, md_user, ed_approve_remarks, ed_approve_date, ed_detial_analysis, ed_approve, ed, ed_user,
        store_receive
    } = DetailViewData
    const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"
    const inchargeApprovdate = incharge_apprv_date !== null ? format(new Date(incharge_apprv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const hodApprovdate = hod_approve_date !== null ? format(new Date(hod_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const dmsApprovdate = dms_approve_date !== null ? format(new Date(dms_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const msApprovdate = ms_approve_date !== null ? format(new Date(ms_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const omApprovdate = om_approv_date !== null ? format(new Date(om_approv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const smoApprovdate = som_aprrov_date !== null ? format(new Date(som_aprrov_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const gmApprovdate = gm_approv_date !== null ? format(new Date(gm_approv_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const mdApprovdate = md_approve_date !== null ? format(new Date(md_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"
    const edApprovdate = ed_approve_date !== null ? format(new Date(ed_approve_date), 'dd-MM-yyyy hh:mm:ss') : "Not Updated"


    const [reqTableDis, setReqTableDis] = useState(0)
    const [detailData, setDetailData] = useState([])
    const [ApproveTableDis, setApproveTableDis] = useState(0)
    const [ApproveTableData, setApproveTableData] = useState([])


    useEffect(() => {
        const getItemDetails = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegister/getDetailItemList/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setReqTableDis(1)
                setDetailData(data);
            } else {
                setReqTableDis(0)
            }
        }

        const getApproItemDetails = async (req_slno) => {
            const result = await axioslogin.get(`/CRFRegisterApproval/getItemListApproval/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const datas = data.map((val, index) => {
                    const obj = {
                        slno: index + 1,
                        req_detl_slno: val.req_detl_slno,
                        req_slno: val.req_slno,
                        item_slno: val.item_slno,
                        item_desc: val.item_desc,
                        item_brand: val.item_brand,
                        item_unit: val.item_unit,
                        item_qnty: val.item_qnty,
                        item_specification: val.item_specification,
                        item_unit_price: val.item_unit_price,
                        aprox_cost: val.aprox_cost,
                        item_status: val.item_status,
                        approve_item_desc: val.approve_item_desc,
                        approve_item_brand: val.approve_item_brand,
                        approve_item_unit: val.approve_item_unit,
                        item_qnty_approved: val.item_qnty_approved,
                        approve_item_unit_price: val.approve_item_unit_price,
                        approve_aprox_cost: val.approve_aprox_cost,
                        item_status_approved: val.item_status_approved,
                        approve_item_status: val.approve_item_status,
                        approve_item_delete_who: val.approve_item_delete_who,
                        uom_name: val.uom_name,
                        approve_item_specification: val.approve_item_specification,
                        old_item_slno: val.old_item_slno
                    }
                    return obj
                })
                setApproveTableDis(1)
                setApproveTableData(datas);
            } else {
                setApproveTableDis(0)
                setApproveTableData([])
            }
        }
        getItemDetails(req_slno)
        getApproItemDetails(req_slno)

    }, [req_slno])





    const submit = useCallback(() => {



    }, [])












    const ModalClose = useCallback(() => {
        setDetailViewFlag(0)
        setDetailViewModal(false)
        setDetailViewData([])
    }, [setDetailViewFlag, setDetailViewModal, setDetailViewData])

    return (

        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                maxWidth='lg'

                aria-describedby="alert-dialog-slide-descriptiona"
            >
                < DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: "100%",
                        height: 540
                    }}
                >
                    < DialogContentText id="alert-dialog-slide-descriptiona">
                        Details View
                    </DialogContentText>

                    <Box sx={{ width: "100%", mt: 0, display: "flex", flexDirection: "column" }}>
                        <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                            <Box sx={{
                                width: "100%", display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                            }}>
                                <Box sx={{
                                    width: "100%", display: "flex", p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box sx={{ pr: 1.5 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Request No: CRF/TMC/{req_slno}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 4 }}                                    >
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Req.Date: {req_date}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                {
                                    actual_requirement !== null ? <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "25%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Actual Requirement:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: "75%", minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {actual_requirement}
                                        </Paper>
                                    </Box> : null
                                }
                                {
                                    needed !== null ? <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "25%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Justification for need:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {needed}
                                        </Paper>
                                    </Box> : null
                                }
                                <Box sx={{
                                    width: "100%", display: "flex", p: 0.5, pb: 0,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 9 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Expected Date: {expdate}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>

                            </Box>
                        </Paper>
                        {reqTableDis === 1 ?
                            <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                <Box sx={{
                                    width: "100%", display: "flex", p: 0.5, pb: 0, flexDirection: 'column',
                                }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15 }}>Requested Items</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <ReqItemDisplay detailData={detailData}
                                />
                            </Paper> : <Box sx={{
                                width: "100%", display: "flex", p: 0.5, pb: 0,
                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                            }}>
                                <Box sx={{ pr: 9 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15 }}>Requested Items: Nill</Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        }

                        {ApproveTableDis === 1 ?
                            <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                <Box sx={{
                                    width: "100%", display: "flex", p: 0.5, pb: 0, flexDirection: 'column',
                                }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15 }}>Approves Items</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <ApprovedItemListDis ApproveData={ApproveTableData}
                                />
                            </Paper> : <Box sx={{
                                width: "100%", display: "flex", p: 0.5, pb: 0,
                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                            }}>
                                <Box sx={{ pr: 9 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15 }}>Requested Items: Nill</Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        }


                        <Box sx={{ width: "100%", mt: 0, }}>
                            <Paper variant='outlined' sx={{ mt: 1 }} >
                                <Box sx={{
                                    p: 1, width: "100%", display: "flex", flexDirection: 'column',
                                }}>

                                    <Box sx={{
                                        width: "100%", display: "flex", flexDirection: 'column',
                                    }}>
                                        <Box
                                            sx={{ pr: 9 }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontWeight: 900, fontSize: 14, color: TypoHeadColor }} >Department Approval</Typography>
                                            </CssVarsProvider>
                                        </Box>

                                        {incharge_req === 1 ?
                                            <Box sx={{ width: "100%" }}>
                                                <Box sx={{
                                                    pl: 1,
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                                }}>

                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-between",
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Incharge :
                                                                {
                                                                    incharge_approve === 1 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="success" variant="outlined"> {incharge}
                                                                        </Typography> : incharge_approve === 2 ?
                                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="danger" variant="outlined"> {incharge}
                                                                            </Typography> : incharge_approve === 3 ?
                                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="primary" variant="outlined"> {incharge}
                                                                                </Typography> :
                                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}
                                                                                    color="success" variant="outlined"> Not Done
                                                                                </Typography>
                                                                }
                                                            </Typography>
                                                        </CssVarsProvider>
                                                        {
                                                            incharge_apprv_date !== null ? <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: 'row',
                                                                    justifyContent: "space-evenly",
                                                                    pr: 2
                                                                }}>
                                                                <CssVarsProvider>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                        {inchargeApprovdate}</Typography>
                                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                        {incharge_user} </Typography>
                                                                </CssVarsProvider>   </Box> : null
                                                        }
                                                    </Box>
                                                    {
                                                        incharge_approve === 1 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{incharge_remark} </Typography>
                                                            </CssVarsProvider>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{inch_detial_analysis} </Typography>
                                                            </CssVarsProvider> </Box> :
                                                            incharge_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                                <CssVarsProvider>
                                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{incharge_remark} </Typography>
                                                                </CssVarsProvider>
                                                            </Box> :
                                                                incharge_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                                    <CssVarsProvider>
                                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{incharge_remark} </Typography>
                                                                    </CssVarsProvider>
                                                                </Box> : null
                                                    }

                                                </Box>
                                            </Box> :
                                            <Box>
                                                <CssVarsProvider>
                                                    <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Incharge Approval Not Required </Typography>
                                                </CssVarsProvider>
                                            </Box>
                                        }

                                        <Divider
                                            // variant="middle"
                                            sx={{ my: 0.8 }} />

                                        {hod_req === 1 ?
                                            <Box sx={{ width: "100%" }}>
                                                <Box sx={{
                                                    pl: 1,
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                                }}>

                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-between",
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >HOD :
                                                                {
                                                                    hod_approve === 1 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="success" variant="outlined"> {hod}
                                                                        </Typography> : hod_approve === 2 ?
                                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="danger" variant="outlined"> {hod}
                                                                            </Typography> : hod_approve === 3 ?
                                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="primary" variant="outlined"> {hod}
                                                                                </Typography> :
                                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}
                                                                                    color="success" variant="outlined"> Not Done
                                                                                </Typography>
                                                                }
                                                            </Typography>
                                                        </CssVarsProvider>
                                                        {
                                                            hod_approve_date !== null ? <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: 'row',
                                                                    justifyContent: "space-evenly",
                                                                    pr: 2
                                                                }}>
                                                                <CssVarsProvider>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                        {hodApprovdate}</Typography>
                                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                        {hod_user} </Typography>
                                                                </CssVarsProvider>   </Box> : null
                                                        }
                                                    </Box>
                                                    {
                                                        hod_approve === 1 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{hod_remarks} </Typography>
                                                            </CssVarsProvider>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{hod_detial_analysis} </Typography>
                                                            </CssVarsProvider> </Box> :
                                                            hod_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                                <CssVarsProvider>
                                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{hod_remarks} </Typography>
                                                                </CssVarsProvider>
                                                            </Box> :
                                                                hod_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                                    <CssVarsProvider>
                                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{hod_remarks} </Typography>
                                                                    </CssVarsProvider>
                                                                </Box> : null
                                                    }

                                                </Box>
                                            </Box> :
                                            <Box>
                                                <CssVarsProvider>
                                                    <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >HOD Approval Not Required </Typography>
                                                </CssVarsProvider>
                                            </Box>
                                        }




                                    </Box>
                                </Box>
                            </Paper>
                            <Box sx={{ width: "100%", mt: 0 }}>
                                <Paper variant='outlined' sx={{ mt: 1 }} >
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                    }}>

                                        <Box
                                            sx={{
                                                pl: 1, pr: 1,
                                                display: "flex",
                                                flexDirection: 'row',
                                                justifyContent: "space-between"
                                            }}>

                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 16, fontWeight: 600 }} >DMS :

                                                    {
                                                        dms_approve === 1 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {dms}
                                                            </Typography> : dms_approve === 2 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {dms}
                                                                </Typography> : dms_approve === 3 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {dms}
                                                                    </Typography> : null
                                                    }
                                                </Typography>
                                            </CssVarsProvider>
                                            {
                                                dms_approve_date !== null ? <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-evenly",
                                                        pr: 2
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                            {dmsApprovdate}</Typography>
                                                        <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                            {dms_user} </Typography>
                                                    </CssVarsProvider>   </Box> : null
                                            }

                                        </Box>
                                        {
                                            dms_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{dms_remarks} </Typography>
                                                </CssVarsProvider>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{dms_detail_analysis} </Typography>
                                                </CssVarsProvider> </Box> :
                                                dms_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{dms_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> :
                                                    dms_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{dms_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> : <Box>
                                                        <CssVarsProvider>
                                                            <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                        }

                                    </Box>
                                </Paper>
                            </Box>
                            <Box sx={{ width: "100%", mt: 0 }}>
                                <Paper variant='outlined' sx={{ mt: 1 }} >
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                    }}>

                                        <Box
                                            sx={{
                                                pl: 1, pr: 1,
                                                display: "flex",
                                                flexDirection: 'row',
                                                justifyContent: "space-between"
                                            }}>

                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 16, fontWeight: 600 }} >MS :

                                                    {
                                                        ms_approve === 1 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {ms}
                                                            </Typography> : ms_approve === 2 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {ms}
                                                                </Typography> : ms_approve === 3 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {ms}
                                                                    </Typography> : null
                                                    }
                                                </Typography>
                                            </CssVarsProvider>
                                            {
                                                ms_approve_date !== null ? <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-evenly",
                                                        pr: 2
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                            {msApprovdate}</Typography>
                                                        <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                            {ms_approve_user} </Typography>
                                                    </CssVarsProvider>   </Box> : null
                                            }

                                        </Box>
                                        {
                                            ms_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{ms_approve_remark} </Typography>
                                                </CssVarsProvider>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{ms_detail_analysis} </Typography>
                                                </CssVarsProvider> </Box> :
                                                ms_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{ms_approve_remark} </Typography>
                                                    </CssVarsProvider>
                                                </Box> :
                                                    ms_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{ms_approve_remark} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> : <Box>
                                                        <CssVarsProvider>
                                                            <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                        }

                                    </Box>
                                </Paper>
                            </Box>
                            <Box sx={{ width: "100%", mt: 0 }}>
                                <Paper variant='outlined' sx={{ mt: 1 }} >
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                    }}>

                                        <Box
                                            sx={{
                                                pl: 1, pr: 1,
                                                display: "flex",
                                                flexDirection: 'row',
                                                justifyContent: "space-between"
                                            }}>

                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Crf Documentation :

                                                    {
                                                        manag_operation_approv === 1 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {om}
                                                            </Typography> : manag_operation_approv === 2 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {om}
                                                                </Typography> : manag_operation_approv === 3 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {om}
                                                                    </Typography> : null
                                                    }
                                                </Typography>
                                            </CssVarsProvider>
                                            {
                                                om_approv_date !== null ? <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-evenly",
                                                        pr: 2
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                            {omApprovdate}</Typography>
                                                        <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                            {manag_operation_user} </Typography>
                                                    </CssVarsProvider>   </Box> : null
                                            }

                                        </Box>
                                        {
                                            manag_operation_approv === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{manag_operation_remarks} </Typography>
                                                </CssVarsProvider>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{om_detial_analysis} </Typography>
                                                </CssVarsProvider> </Box> :
                                                manag_operation_approv === 2 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{manag_operation_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> :
                                                    manag_operation_approv === 3 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{manag_operation_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> : <Box>
                                                        <CssVarsProvider>
                                                            <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                        }

                                    </Box>
                                </Paper>
                            </Box>

                            <Box sx={{ width: "100%", mt: 0 }}>
                                <Paper variant='outlined' sx={{ mt: 1 }} >
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                    }}>

                                        <Box
                                            sx={{
                                                pl: 1, pr: 1,
                                                display: "flex",
                                                flexDirection: 'row',
                                                justifyContent: "space-between"
                                            }}>

                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Crf Verification :

                                                    {
                                                        senior_manage_approv === 1 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {smo}
                                                            </Typography> : senior_manage_approv === 2 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {smo}
                                                                </Typography> : senior_manage_approv === 3 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {smo}
                                                                    </Typography> : null
                                                    }
                                                </Typography>
                                            </CssVarsProvider>
                                            {
                                                som_aprrov_date !== null ? <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-evenly",
                                                        pr: 2
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                            {smoApprovdate}</Typography>
                                                        <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                            {senior_manage_user} </Typography>
                                                    </CssVarsProvider>   </Box> : null
                                            }

                                        </Box>
                                        {
                                            senior_manage_approv === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{senior_manage_remarks} </Typography>
                                                </CssVarsProvider>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{smo_detial_analysis} </Typography>
                                                </CssVarsProvider> </Box> :
                                                senior_manage_approv === 2 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{senior_manage_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> :
                                                    senior_manage_approv === 3 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{senior_manage_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> : <Box>
                                                        <CssVarsProvider>
                                                            <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                        }

                                    </Box>
                                </Paper>
                            </Box>
                            <Box sx={{ width: "100%", mt: 0 }}>
                                <Paper variant='outlined' sx={{ mt: 1 }} >
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                    }}>

                                        <Box
                                            sx={{
                                                pl: 1, pr: 1,
                                                display: "flex",
                                                flexDirection: 'row',
                                                justifyContent: "space-between"
                                            }}>

                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 16, fontWeight: 600 }} >GM Operation :

                                                    {
                                                        gm_approve === 1 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {gm}
                                                            </Typography> : gm_approve === 2 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {gm}
                                                                </Typography> : gm_approve === 3 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {gm}
                                                                    </Typography> : null
                                                    }
                                                </Typography>
                                            </CssVarsProvider>
                                            {
                                                gm_approv_date !== null ? <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-evenly",
                                                        pr: 2
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                            {gmApprovdate}</Typography>
                                                        <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                            {gm_user} </Typography>
                                                    </CssVarsProvider>   </Box> : null
                                            }

                                        </Box>
                                        {
                                            gm_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{gm_approve_remarks} </Typography>
                                                </CssVarsProvider>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{gm_detial_analysis} </Typography>
                                                </CssVarsProvider> </Box> :
                                                gm_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{gm_approve_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> :
                                                    gm_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{gm_approve_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> : <Box>
                                                        <CssVarsProvider>
                                                            <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                        }

                                    </Box>
                                </Paper>
                            </Box>

                            <Box sx={{ width: "100%", mt: 0 }}>
                                <Paper variant='outlined' sx={{ mt: 1 }} >
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                    }}>

                                        <Box
                                            sx={{
                                                pl: 1, pr: 1,
                                                display: "flex",
                                                flexDirection: 'row',
                                                justifyContent: "space-between"
                                            }}>

                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 16, fontWeight: 600 }} >MD Operation :

                                                    {
                                                        md_approve === 1 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {md}
                                                            </Typography> : md_approve === 2 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {md}
                                                                </Typography> : md_approve === 3 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {md}
                                                                    </Typography> : null
                                                    }
                                                </Typography>
                                            </CssVarsProvider>
                                            {
                                                md_approve_date !== null ? <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-evenly",
                                                        pr: 2
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                            {mdApprovdate}</Typography>
                                                        <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                            {md_user} </Typography>
                                                    </CssVarsProvider>   </Box> : null
                                            }

                                        </Box>
                                        {
                                            md_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{md_approve_remarks} </Typography>
                                                </CssVarsProvider>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{md_detial_analysis} </Typography>
                                                </CssVarsProvider> </Box> :
                                                md_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{md_approve_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> :
                                                    md_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{md_approve_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> : <Box>
                                                        <CssVarsProvider>
                                                            <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                        }

                                    </Box>
                                </Paper>
                            </Box>

                            <Box sx={{ width: "100%", mt: 0 }}>
                                <Paper variant='outlined' sx={{ mt: 1 }} >
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                    }}>

                                        <Box
                                            sx={{
                                                pl: 1, pr: 1,
                                                display: "flex",
                                                flexDirection: 'row',
                                                justifyContent: "space-between"
                                            }}>

                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 16, fontWeight: 600 }} >ED Operation :

                                                    {
                                                        ed_approve === 1 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {ed}
                                                            </Typography> : ed_approve === 2 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {ed}
                                                                </Typography> : ed_approve === 3 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {ed}
                                                                    </Typography> : null
                                                    }
                                                </Typography>
                                            </CssVarsProvider>
                                            {
                                                ed_approve_date !== null ? <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-evenly",
                                                        pr: 2
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                            {edApprovdate}</Typography>
                                                        <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                            {ed_user} </Typography>
                                                    </CssVarsProvider>   </Box> : null
                                            }

                                        </Box>
                                        {
                                            ed_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{ed_approve_remarks} </Typography>
                                                </CssVarsProvider>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{ed_detial_analysis} </Typography>
                                                </CssVarsProvider> </Box> :
                                                ed_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{ed_approve_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> :
                                                    ed_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{ed_approve_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> : <Box>
                                                        <CssVarsProvider>
                                                            <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                        }

                                    </Box>
                                </Paper>
                            </Box>

                            <Box sx={{ width: "100%", mt: 0 }}>
                                <Paper variant='outlined' sx={{ mt: 1 }} >
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                    }}>

                                        <Box
                                            sx={{
                                                pl: 1, pr: 1,
                                                display: "flex",
                                                flexDirection: 'row',
                                                justifyContent: "space-between"
                                            }}>

                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 16, fontWeight: 600 }} >MD Operation :

                                                    {
                                                        md_approve === 1 ?
                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {md}
                                                            </Typography> : md_approve === 2 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {md}
                                                                </Typography> : md_approve === 3 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {md}
                                                                    </Typography> : null
                                                    }
                                                </Typography>
                                            </CssVarsProvider>
                                            {
                                                md_approve_date !== null ? <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-evenly",
                                                        pr: 2
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                            {mdApprovdate}</Typography>
                                                        <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                            {md_user} </Typography>
                                                    </CssVarsProvider>   </Box> : null
                                            }

                                        </Box>
                                        {
                                            md_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{md_approve_remarks} </Typography>
                                                </CssVarsProvider>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{md_detial_analysis} </Typography>
                                                </CssVarsProvider> </Box> :
                                                md_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{md_approve_remarks} </Typography>
                                                    </CssVarsProvider>
                                                </Box> :
                                                    md_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{md_approve_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> : <Box>
                                                        <CssVarsProvider>
                                                            <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                        }

                                    </Box>
                                </Paper>
                            </Box>

                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    {user === 1 && store_receive === 1 ? <Button onClick={submit} color="secondary" >Save</Button> : null}
                    <Button onClick={ModalClose} color="secondary" >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default memo(HigherAppDoneModal)