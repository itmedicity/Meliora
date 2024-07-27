import React, { useCallback, useState, memo, } from 'react'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { useHistory } from 'react-router-dom';
import CustomBackDrop from 'src/views/Components/CustomBackDrop';
import { Paper, Box } from '@mui/material';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CusIconButton from '../../Components/CusIconButton';
import { warningNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import { CssVarsProvider, Typography } from '@mui/joy'
import ReqItemDisplay from 'src/views/CentralRequestManagement/ComonComponent/ReqItemDisplay';
import ApprovedItemListDis from 'src/views/CentralRequestManagement/ComonComponent/ApprovedItemListDis';
import { TypoHeadColor } from 'src/color/Color'
import Divider from '@mui/material/Divider';
import { format } from 'date-fns';
import CrfReqDetailCmpnt from 'src/views/CentralRequestManagement/CRFRequestMaster/CrfReqDetailCmpnt';
import PoStoreDetail from './PoStoreDetail';


const CrfNoBasedReport = () => {

    const history = useHistory();
    const [open, setOpen] = useState(false)
    const [crfNo, setCrfNo] = useState('')
    const [datahave, setDatahave] = useState(0)
    const [mainDatas, setMainDatas] = useState([])
    const [reqTableDis, setReqTableDis] = useState(0)
    const [detailData, setDetailData] = useState([])
    const [ApproveTableDis, setApproveTableDis] = useState(0)
    const [ApproveTableData, setApproveTableData] = useState([])
    const [purchaseDis, setPurchaseDis] = useState(0)
    const [purchaseData, setPurchaseData] = useState([])
    const [poDetlDis, setPoDetlDis] = useState(0)
    const [podetailData, setpodetailData] = useState([])
    const [datacolflag, setDataColFlag] = useState(0)
    const [datacolData, setDataColData] = useState([])
    const [enable, setEnable] = useState(0)
    const [datacollectdata, setDataCollectData] = useState([])


    const clicksearch = useCallback((e) => {
        setOpen(true)
        e.preventDefault();
        const getCRFDetails = async (crfNo) => {
            const result = await axioslogin.get(`/CrfReports/getCRFNoBased/${crfNo}`)
            return result.data
        }

        const getItemDetails = async (crfNo) => {
            const result = await axioslogin.get(`/newCRFRegister/getDetailItemList/${crfNo}`)
            const { success, data } = result.data
            if (success === 1) {
                setReqTableDis(1)
                setDetailData(data);
            } else {
                setReqTableDis(0)
                setDetailData(data);
            }
        }
        const getApproItemDetails = async (crfNo) => {
            const result = await axioslogin.get(`/CRFRegisterApproval/getFinalItemListApproval/${crfNo}`)
            const { succes, dataa } = result.data
            if (succes === 1) {
                const datas = dataa.map((val, index) => {
                    const obj = {
                        slno: index + 1,
                        req_detl_slno: val.req_detl_slno,
                        req_slno: val.req_slno,
                        aprox_cost: val.aprox_cost,
                        item_status: val.item_status,
                        approved_itemunit: val.approved_itemunit !== null ? val.approved_itemunit : "Not Given",
                        approve_item_desc: val.approve_item_desc !== null ? val.approve_item_desc : "Not Given",
                        approve_item_brand: val.approve_item_brand !== '' ? val.approve_item_brand : "Not Given",
                        approve_item_unit: val.approve_item_unit,
                        item_qnty_approved: val.item_qnty_approved !== null ? val.item_qnty_approved : "Not Given",
                        approve_item_unit_price: val.approve_item_unit_price !== null ? val.approve_item_unit_price : "Not Given",
                        approve_aprox_cost: val.approve_aprox_cost !== null ? val.approve_aprox_cost : "Not Given",
                        item_status_approved: val.item_status_approved,
                        approve_item_status: val.approve_item_status,
                        approve_item_delete_who: val.approve_item_delete_who,
                        uom_name: val.uom_name,
                        approve_item_specification: val.approve_item_specification !== '' ? val.approve_item_specification : "Not Given",
                        old_item_slno: val.old_item_slno !== null ? val.old_item_slno : "",
                        item_slno: val.item_slno
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

        const checkDataCollectComplete = async (crfNo) => {
            const result = await axioslogin.get(`/CRFRegisterApproval/DataCollectComplete/${crfNo}`)
            const { success, data } = result.data
            if (success === 1) {
                const xx = data && data.filter((val) => val.crf_dept_status !== 1)
                const yy = data && data.filter((val) => val.crf_dept_status === 1)
                if (xx.length !== 0) {
                    setEnable(1)
                    const datas = xx.map((val) => {
                        const obj = {
                            crf_dept_remarks: val.crf_dept_remarks,
                            datagive_user: val.datagive_user,
                            data_entered: val.data_entered !== null ? val.data_entered.toLowerCase() : '',
                            reqest_one: val.reqest_one,
                            req_user: val.req_user !== null ? val.req_user.toLowerCase() : '',
                            create_date: val.create_date,
                            update_date: val.update_date,
                            crf_req_remark: val.crf_req_remark,
                            data_coll_image_status: val.data_coll_image_status,
                            crf_data_collect_slno: val.crf_data_collect_slno
                        }
                        return obj
                    })
                    setDataCollectData(datas)
                }
                else {
                    setEnable(0)
                    setDataCollectData([])
                }
                if (yy.length !== 0) {
                    setDataColFlag(1)
                    const datas = yy.map((val) => {
                        const obj = {
                            crf_dept_remarks: val.crf_dept_remarks,
                            datagive_user: val.datagive_user,
                            data_entered: val.data_entered !== null ? val.data_entered.toLowerCase() : '',
                            reqest_one: val.reqest_one,
                            req_user: val.req_user !== null ? val.req_user.toLowerCase() : '',
                            create_date: val.create_date,
                            update_date: val.update_date,
                            crf_req_remark: val.crf_req_remark,
                            data_coll_image_status: val.data_coll_image_status,
                            crf_data_collect_slno: val.crf_data_collect_slno
                        }
                        return obj
                    })
                    setDataColData(datas)

                }
                else {
                    setDataColFlag(0)
                    setDataColData([])
                }
            }
            else {
                setEnable(0)
            }
        }

        const getPurchaseDetails = async (crfNo) => {
            const result = await axioslogin.get(`/CrfReports/getPurchaseDetails/${crfNo}`)
            const { success, data } = result.data
            if (success === 1) {
                const xx = data?.find((val) => val)
                setPurchaseData(xx)
                setPurchaseDis(1)

            }
            else {
                setPurchaseDis(0)
                setPurchaseData([])
            }
        }

        const getPODetails = async (crfNo) => {
            const result = await axioslogin.get(`/newCRFPurchase/getPOList/${crfNo}`)
            const { success, data } = result.data
            if (success === 1) {
                const datas = data && data.map((val) => {
                    return {
                        req_slno: val.req_slno,
                        po_detail_slno: val.po_detail_slno,
                        po_number: val.po_number,
                        po_date: val.po_date,
                        po_status: 1,
                        expected_delivery: val.expected_delivery,
                        supply_store: val.supply_store,
                        sub_storename: val.sub_store_name,
                        store_name: val.main_store
                    }
                })

                setpodetailData(datas)
                setPoDetlDis(1)

            }
            else {
                setPoDetlDis(0)
                setpodetailData([])
            }
        }


        if (crfNo !== '') {
            getCRFDetails(crfNo).then((val) => {
                const { success, data } = val
                if (success === 1) {
                    setOpen(false)
                    setDatahave(1)// CRF Detail disply
                    setMainDatas(data[0])// CRF Detail disply data
                    getItemDetails(crfNo)// Registred Item
                    getApproItemDetails(crfNo)// Approved Items
                    checkDataCollectComplete(crfNo)//crf dataCollection Details
                    getPurchaseDetails(crfNo)// Get purchase data
                    getPODetails(crfNo)//get PO list
                    // getPOStoresDetails(crfNo)// get PO details with stores data
                }
                else {
                    setOpen(false)
                    warningNotify("Please enter valid CRF Number")
                }

            })
        } else {
            setOpen(false)
            warningNotify("Please enter CRF Number before search")
        }
    }, [crfNo])

    const backToSetting = useCallback(() => {
        history.push(`/Home/Reports`)
    }, [history])

    //column title setting
    const [column] = useState([
        { headerName: "PO Number", field: "po_number" },
        { headerName: "PO Date", field: "po_date", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "Store", field: "sub_storename", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "CRS Store", field: "store_name", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "Expected Delivery Date", field: "expected_delivery", autoHeight: true, wrapText: true, width: 250, filter: "true" },
    ])

    return (
        <CardCloseOnly
            title='CRF No Based Report'
            close={backToSetting}
        >
            <CustomBackDrop open={open} text="Please Wait" />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: 'row',
                    justifyContent: 'center', pt: 2
                }}>
                    <Box sx={{
                        width: '10%',
                        ml: 0.5, mt: 0.5
                    }}>
                        <Typography>Enter CRF Number</Typography>
                    </Box>
                    <Box sx={{
                        width: '10%',
                        // height: 15,
                        mb: 1, pr: 3
                    }}>
                        <TextFieldCustom
                            type="text"
                            size="sm"
                            name="crfNo"
                            value={crfNo}
                            // onchange=(e)=>{setCrfNo(e.target.value)}
                            onchange={(e) => setCrfNo(e.target.value)}
                        />
                    </Box>
                    <Box sx={{
                        width: '20%',

                    }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={clicksearch} >
                            <SearchOutlinedIcon fontSize='small' />
                        </CusIconButton>
                    </Box>
                </Box>

                {
                    datahave !== 0 ?
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            p: 2, borderRadius: 0.5,
                            borderBlockColor: "gray"


                        }} >

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
                                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}>Request No: CRF/TMC/{mainDatas.req_slno}</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 4 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}>Req.Date: {mainDatas.req_date}</Typography>
                                                </CssVarsProvider>
                                            </Box>

                                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 4 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}>Department:{mainDatas.dept_name}</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 4 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}
                                                    >Department Sec: {mainDatas.sec_name}</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 4 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}
                                                    >Req.Department Sec: {mainDatas.sec_name}</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{
                                            width: "100%", display: "flex", p: 0.5,
                                            flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                        }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}>Category: {mainDatas.category !== null ?
                                                        mainDatas.category : "Not Given"}</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}>Location: {mainDatas.location !== null ?
                                                        mainDatas.location : "Not Given"}</Typography>
                                                </CssVarsProvider>
                                            </Box>

                                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}>Emergency:{mainDatas.emergency_flag === 1 ? "Yes" : "No"}</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}
                                                    >Expected Date: {mainDatas.expected_date}</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 4 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}
                                                    >Req.User: {mainDatas.req_user}</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>

                                        <Box sx={{
                                            width: "100%", display: "flex", p: 0.5,
                                            flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                        }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}
                                                    >Actual Requirement: {mainDatas.actual_requirement !== null ?
                                                        mainDatas.actual_requirement : "Not Given"}</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{
                                            width: "100%", display: "flex", p: 0.5,
                                            flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                        }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}
                                                    >Justification for need: {mainDatas.needed !== null ?
                                                        mainDatas.needed : "Not Given"
                                                        }</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>

                                        {reqTableDis === 1 ?
                                            <Box sx={{
                                                width: "100%", display: "flex", p: 0.5,
                                                flexDirection: "column"
                                            }}>
                                                <Box>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, pl: 1 }}>Requested Items</Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                                <Box>
                                                    <ReqItemDisplay detailData={detailData} />
                                                </Box>
                                            </Box> :
                                            <Box sx={{
                                                width: "100%", display: "flex", p: 0.5,
                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                            }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, pl: 1 }}>Requested Items: Nil</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                        }

                                        {ApproveTableDis === 1 ?
                                            <Box sx={{
                                                width: "100%", display: "flex", p: 0.5,
                                                flexDirection: "column"
                                            }}>
                                                <Box>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, pl: 1 }}>Approved Items</Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                                <Box>
                                                    <ApprovedItemListDis ApproveData={ApproveTableData} />
                                                </Box>
                                            </Box> : null
                                        }
                                        <Divider
                                            // variant="middle"
                                            sx={{ my: 0.8, ml: 2, mr: 2 }} />
                                        <Box sx={{
                                            width: "100%", display: "flex", flexDirection: 'column', pl: 2, pr: 2
                                        }}>
                                            <Box
                                                sx={{ pr: 9 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontWeight: 900, fontSize: 14, color: TypoHeadColor }} >Department Approval</Typography>
                                                </CssVarsProvider>
                                            </Box>

                                            {mainDatas.incharge_req === 1 ?
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
                                                                        mainDatas.incharge_approve === 1 ?
                                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="success" variant="outlined"> Approved
                                                                            </Typography> : mainDatas.incharge_approve === 2 ?
                                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="danger" variant="outlined"> Reject
                                                                                </Typography> : mainDatas.incharge_approve === 3 ?
                                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="primary" variant="outlined"> On-Hold
                                                                                    </Typography> :
                                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}
                                                                                        color="success" variant="outlined"> Not Done
                                                                                    </Typography>
                                                                    }
                                                                </Typography>
                                                            </CssVarsProvider>
                                                            {
                                                                mainDatas.incharge_apprv_date !== null ? <Box
                                                                    sx={{
                                                                        display: "flex",
                                                                        flexDirection: 'row',
                                                                        justifyContent: "space-evenly",
                                                                        pr: 2
                                                                    }}>
                                                                    <CssVarsProvider>
                                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                            {format(new Date(mainDatas.incharge_apprv_date), 'dd-MM-yyyy hh:mm:ss')}</Typography>
                                                                        <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                        <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                            {mainDatas.incharge_user} </Typography>
                                                                    </CssVarsProvider>   </Box> : null
                                                            }
                                                        </Box>
                                                        {
                                                            mainDatas.incharge_approve === 1 ? <Box sx={{ width: "100%" }}>
                                                                <CssVarsProvider>
                                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.incharge_remark} </Typography>
                                                                </CssVarsProvider>
                                                                <CssVarsProvider>
                                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.inch_detial_analysis} </Typography>
                                                                </CssVarsProvider> </Box> :
                                                                mainDatas.incharge_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                                    <CssVarsProvider>
                                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.incharge_remark} </Typography>
                                                                    </CssVarsProvider>
                                                                </Box> :
                                                                    mainDatas.incharge_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                                        <CssVarsProvider>
                                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.incharge_remark} </Typography>
                                                                        </CssVarsProvider>
                                                                    </Box> : null
                                                        }

                                                    </Box>
                                                </Box> :
                                                <Box>
                                                    <CssVarsProvider>
                                                        <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Incharge Approval Not Required Requested by HOD </Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                            }

                                            <Divider sx={{ my: 0.8 }} />
                                        </Box>

                                        {mainDatas.hod_req === 1 ?
                                            <Box sx={{ width: "100%", pl: 2 }}>
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
                                                                    mainDatas.hod_approve === 1 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="success" variant="outlined"> Approved
                                                                        </Typography> : mainDatas.concathod_approve === 2 ?
                                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="danger" variant="outlined"> Reject
                                                                            </Typography> : mainDatas.hod_approve === 3 ?
                                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="primary" variant="outlined"> On-Hold
                                                                                </Typography> :
                                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}
                                                                                    color="success" variant="outlined"> Not Done
                                                                                </Typography>
                                                                }
                                                            </Typography>
                                                        </CssVarsProvider>
                                                        {
                                                            mainDatas.hod_approve_date !== null ? <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: 'row',
                                                                    justifyContent: "space-evenly",
                                                                    pr: 2
                                                                }}>
                                                                <CssVarsProvider>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                        {format(new Date(mainDatas.hod_approve_date), 'dd-MM-yyyy hh:mm:ss')}  </Typography>
                                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                        {mainDatas.hod_user} </Typography>
                                                                </CssVarsProvider>   </Box> : null
                                                        }
                                                    </Box>
                                                    {
                                                        mainDatas.hod_approve === 1 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.hod_remarks} </Typography>
                                                            </CssVarsProvider>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.hod_detial_analysis} </Typography>
                                                            </CssVarsProvider> </Box> :
                                                            mainDatas.hod_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                                <CssVarsProvider>
                                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.hod_remarks} </Typography>
                                                                </CssVarsProvider>
                                                            </Box> :
                                                                mainDatas.hod_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                                    <CssVarsProvider>
                                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.hod_remarks} </Typography>
                                                                    </CssVarsProvider>
                                                                </Box> : null
                                                    }
                                                    {/* {hod_image === 1 ? <Box sx={{ mx: 0.5, pb: 0.5 }}>
                                                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ViewHODUploadImage}  >
                                                                    <AttachFileIcon fontSize='small' />
                                                                    <Typography color="primary" sx={{ fontSize: 15, pl: 1, pr: 1, }}>View Image</Typography>
                                                                </CusIconButton>
                                                            </Box> : null} */}
                                                </Box>
                                            </Box> :
                                            <Box>
                                                <CssVarsProvider>
                                                    <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >HOD Approval Not Required </Typography>
                                                </CssVarsProvider>
                                            </Box>
                                        }
                                    </Box>
                                </Paper>
                            </Box>

                            {mainDatas.dms_req === 1 ?
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
                                                            mainDatas.dms_approve === 1 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Approved
                                                                </Typography> : mainDatas.dms_approve === 2 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> reject
                                                                    </Typography> : mainDatas.dms_approve === 3 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> On-Hold
                                                                        </Typography> : null
                                                        }
                                                    </Typography>
                                                </CssVarsProvider>
                                                {
                                                    mainDatas.dms_approve_date !== null ? <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-evenly",
                                                            pr: 2, pt: 1
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                {format(new Date(mainDatas.dms_approve_date), 'dd-MM-yyyy hh:mm:ss')}</Typography>
                                                            <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                {mainDatas.dms_user} </Typography>
                                                        </CssVarsProvider>   </Box> : null
                                                }

                                            </Box>
                                            {
                                                mainDatas.dms_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.dms_remarks} </Typography>
                                                    </CssVarsProvider>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.dms_detail_analysis} </Typography>
                                                    </CssVarsProvider> </Box> :
                                                    mainDatas.dms_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.dms_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> :
                                                        mainDatas.dms_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.dms_remarks} </Typography>
                                                            </CssVarsProvider>
                                                        </Box> : <Box>
                                                            <CssVarsProvider>
                                                                <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                            </CssVarsProvider>
                                                        </Box>
                                            }
                                            {/* {dms_image === 1 ? <Box sx={{ mx: 0.5, pb: 0.5 }}>
                                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ViewDMSUploadImage}  >
                                                    <AttachFileIcon fontSize='small' />
                                                    <Typography color="primary" sx={{ fontSize: 15, pl: 1, pr: 1, }}>View Image</Typography>
                                                </CusIconButton>
                                            </Box> : null} */}
                                        </Box>
                                    </Paper>
                                </Box> : null

                            }

                            {mainDatas.ms_approve_req === 1 ?
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
                                                            mainDatas.ms_approve === 1 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Approved
                                                                </Typography> : mainDatas.ms_approve === 2 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> Reject
                                                                    </Typography> : mainDatas.ms_approve === 3 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined">On-Hold
                                                                        </Typography> : null
                                                        }
                                                    </Typography>
                                                </CssVarsProvider>
                                                {
                                                    mainDatas.ms_approve_date !== null ? <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-evenly",
                                                            pr: 2, pt: 1
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                {format(new Date(mainDatas.ms_approve_date), 'dd-MM-yyyy hh:mm:ss')}</Typography>
                                                            <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                {mainDatas.ms_approve_user} </Typography>
                                                        </CssVarsProvider>   </Box> : null
                                                }

                                            </Box>
                                            {
                                                mainDatas.ms_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.ms_approve_remark} </Typography>
                                                    </CssVarsProvider>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.ms_detail_analysis} </Typography>
                                                    </CssVarsProvider> </Box> :
                                                    mainDatas.ms_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.ms_approve_remark} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> :
                                                        mainDatas.ms_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.ms_approve_remark} </Typography>
                                                            </CssVarsProvider>
                                                        </Box> : <Box>
                                                            <CssVarsProvider>
                                                                <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                            </CssVarsProvider>
                                                        </Box>
                                            }
                                            {/* {ms_image === 1 ?
                                                <Box sx={{ mx: 0.5, pb: 0.5 }}>
                                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ViewMSUploadImage}  >
                                                        <AttachFileIcon fontSize='small' />
                                                        <Typography color="primary" sx={{ fontSize: 15, pl: 1, pr: 1, }}>View Image</Typography>
                                                    </CusIconButton>
                                                </Box> : null} */}
                                        </Box>
                                    </Paper>
                                </Box> : null
                            }

                            {mainDatas.manag_operation_req === 1 ?
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
                                                            mainDatas.manag_operation_approv === 1 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Approved
                                                                </Typography> : mainDatas.manag_operation_approv === 2 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> Reject
                                                                    </Typography> : mainDatas.manag_operation_approv === 3 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined">On-Hold
                                                                        </Typography> : null
                                                        }
                                                    </Typography>
                                                </CssVarsProvider>
                                                {
                                                    mainDatas.om_approv_date !== null ? <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-evenly",
                                                            pr: 2, pt: 1
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                {format(new Date(mainDatas.om_approv_date), 'dd-MM-yyyy hh:mm:ss')}</Typography>
                                                            <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                {mainDatas.manag_operation_user} </Typography>
                                                        </CssVarsProvider>   </Box> : null
                                                }

                                            </Box>
                                            {
                                                mainDatas.manag_operation_approv === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.manag_operation_remarks} </Typography>
                                                    </CssVarsProvider>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.om_detial_analysis} </Typography>
                                                    </CssVarsProvider> </Box> :
                                                    mainDatas.manag_operation_approv === 2 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.manag_operation_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> :
                                                        mainDatas.manag_operation_approv === 3 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.manag_operation_remarks} </Typography>
                                                            </CssVarsProvider>
                                                        </Box> : <Box>
                                                            <CssVarsProvider>
                                                                <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                            </CssVarsProvider>
                                                        </Box>
                                            }
                                            {/* {ms_image === 1 ?
                                                <Box sx={{ mx: 0.5, pb: 0.5 }}>
                                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ViewMSUploadImage}  >
                                                        <AttachFileIcon fontSize='small' />
                                                        <Typography color="primary" sx={{ fontSize: 15, pl: 1, pr: 1, }}>View Image</Typography>
                                                    </CusIconButton>
                                                </Box> : null} */}
                                        </Box>
                                    </Paper>
                                </Box> : null
                            }
                            {mainDatas.senior_manage_req === 1 ?
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
                                                            mainDatas.senior_manage_approv === 1 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Approved
                                                                </Typography> : mainDatas.senior_manage_approv === 2 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> Reject
                                                                    </Typography> : mainDatas.senior_manage_approv === 3 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined">On-Hold
                                                                        </Typography> : null
                                                        }
                                                    </Typography>
                                                </CssVarsProvider>
                                                {
                                                    mainDatas.som_aprrov_date !== null ? <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-evenly",
                                                            pr: 2, pt: 1
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                {format(new Date(mainDatas.som_aprrov_date), 'dd-MM-yyyy hh:mm:ss')}</Typography>
                                                            <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                {mainDatas.senior_manage_user} </Typography>
                                                        </CssVarsProvider>   </Box> : null
                                                }

                                            </Box>
                                            {
                                                mainDatas.senior_manage_approv === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.senior_manage_remarks} </Typography>
                                                    </CssVarsProvider>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.smo_detial_analysis} </Typography>
                                                    </CssVarsProvider> </Box> :
                                                    mainDatas.senior_manage_approv === 2 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.senior_manage_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> :
                                                        mainDatas.senior_manage_approv === 3 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.senior_manage_remarks} </Typography>
                                                            </CssVarsProvider>
                                                        </Box> : <Box>
                                                            <CssVarsProvider>
                                                                <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                            </CssVarsProvider>
                                                        </Box>
                                            }
                                            {/* {smo_image === 1 ?
                                                <Box sx={{ mx: 0.5, pb: 0.5 }}>
                                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ViewSMOUploadImage}  >
                                                        <AttachFileIcon fontSize='small' />
                                                        <Typography color="primary" sx={{ fontSize: 15, pl: 1, pr: 1, }}>View Image</Typography>
                                                    </CusIconButton>
                                                </Box>
                                                : null} */}
                                        </Box>
                                    </Paper>
                                </Box> : null
                            }

                            {mainDatas.gm_approve_req === 1 ?
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
                                                            mainDatas.gm_approve === 1 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Approved
                                                                </Typography> : mainDatas.gm_approve === 2 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> Reject
                                                                    </Typography> : mainDatas.gm_approve === 3 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined">On-Hold
                                                                        </Typography> : null
                                                        }
                                                    </Typography>
                                                </CssVarsProvider>
                                                {
                                                    mainDatas.gm_approv_date !== null ? <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-evenly",
                                                            pr: 2, pt: 1
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                {format(new Date(mainDatas.gm_approv_date), 'dd-MM-yyyy hh:mm:ss')}</Typography>
                                                            <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                {mainDatas.gm_user} </Typography>
                                                        </CssVarsProvider>   </Box> : null
                                                }

                                            </Box>
                                            {
                                                mainDatas.gm_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.gm_approve_remarks} </Typography>
                                                    </CssVarsProvider>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.gm_detial_analysis} </Typography>
                                                    </CssVarsProvider> </Box> :
                                                    mainDatas.gm_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.gm_approve_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> :
                                                        mainDatas.gm_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.gm_approve_remarks} </Typography>
                                                            </CssVarsProvider>
                                                        </Box> : <Box>
                                                            <CssVarsProvider>
                                                                <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                            </CssVarsProvider>
                                                        </Box>
                                            }
                                            {/* {gm_image === 1 ?
                                            <Box sx={{ mx: 0.5, pb: 0.5 }}>
                                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ViewGMUploadImage}  >
                                                    <AttachFileIcon fontSize='small' />
                                                    <Typography color="primary" sx={{ fontSize: 15, pl: 1, pr: 1, }}>View Image</Typography>
                                                </CusIconButton>
                                            </Box>
                                            : null}*/}
                                        </Box>
                                    </Paper>
                                </Box> : null
                            }

                            {mainDatas.md_approve_req === 1 ?
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
                                                    <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Medical Director  :

                                                        {
                                                            mainDatas.md_approve === 1 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Approved
                                                                </Typography> : mainDatas.md_approve === 2 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> Reject
                                                                    </Typography> : mainDatas.md_approve === 3 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined">On-Hold
                                                                        </Typography> : null
                                                        }
                                                    </Typography>
                                                </CssVarsProvider>
                                                {
                                                    mainDatas.md_approve_date !== null ? <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-evenly",
                                                            pr: 2, pt: 1
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                {format(new Date(mainDatas.md_approve_date), 'dd-MM-yyyy hh:mm:ss')}</Typography>
                                                            <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                {mainDatas.md_user} </Typography>
                                                        </CssVarsProvider>   </Box> : null
                                                }

                                            </Box>
                                            {
                                                mainDatas.md_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.md_approve_remarks} </Typography>
                                                    </CssVarsProvider>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.md_detial_analysis} </Typography>
                                                    </CssVarsProvider> </Box> :
                                                    mainDatas.md_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.md_approve_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> :
                                                        mainDatas.md_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.md_approve_remarks} </Typography>
                                                            </CssVarsProvider>
                                                        </Box> : <Box>
                                                            <CssVarsProvider>
                                                                <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                            </CssVarsProvider>
                                                        </Box>
                                            }
                                            {/* {md_image === 1 ?
                                            <Box sx={{ mx: 0.5, pb: 0.5 }}>
                                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ViewMDUploadImage}  >
                                                    <AttachFileIcon fontSize='small' />
                                                    <Typography color="primary" sx={{ fontSize: 15, pl: 1, pr: 1, }}>View Image</Typography>
                                                </CusIconButton>
                                            </Box>
                                            : null}*/}
                                        </Box>
                                    </Paper>
                                </Box> : null
                            }

                            {mainDatas.ed_approve_req === 1 ?
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
                                                    <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Executive Director  :

                                                        {
                                                            mainDatas.ed_approve === 1 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Approved
                                                                </Typography> : mainDatas.ed_approve === 2 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> Reject
                                                                    </Typography> : mainDatas.ed_approve === 3 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined">On-Hold
                                                                        </Typography> : null
                                                        }
                                                    </Typography>
                                                </CssVarsProvider>
                                                {
                                                    mainDatas.ed_approve_date !== null ? <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-evenly",
                                                            pr: 2, pt: 1
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                {format(new Date(mainDatas.ed_approve_date), 'dd-MM-yyyy hh:mm:ss')}</Typography>
                                                            <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                {mainDatas.md_user} </Typography>
                                                        </CssVarsProvider>   </Box> : null
                                                }

                                            </Box>
                                            {
                                                mainDatas.ed_approve === 1 ? <Box sx={{ width: "100%", pl: 1 }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.ed_approve_remarks} </Typography>
                                                    </CssVarsProvider>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.ed_detial_analysis} </Typography>
                                                    </CssVarsProvider> </Box> :
                                                    mainDatas.ed_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.ed_approve_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box> :
                                                        mainDatas.ed_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{mainDatas.ed_approve_remarks} </Typography>
                                                            </CssVarsProvider>
                                                        </Box> : <Box>
                                                            <CssVarsProvider>
                                                                <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Approval Not Done </Typography>
                                                            </CssVarsProvider>
                                                        </Box>
                                            }
                                            {/* {ed_image === 1 ?
                                            <Box sx={{ mx: 0.5, pb: 0.5 }}>
                                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ViewEDUploadImage}  >
                                                    <AttachFileIcon fontSize='small' />
                                                    <Typography color="primary" sx={{ fontSize: 15, pl: 1, pr: 1, }}>View Image</Typography>
                                                </CusIconButton>
                                            </Box>
                                            : null}*/}
                                        </Box>
                                    </Paper>
                                </Box> : null
                            }



                            {datacolflag === 1 ?
                                <Box sx={{ width: "100%", mt: 0 }}>
                                    <Paper variant='outlined' sx={{ mt: 1 }} >
                                        <Box sx={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                        }}>
                                            <Box sx={{
                                                width: "100%",
                                                display: "flex",
                                                pl: 0.2, pr: 0.5,
                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                            }}>
                                                <Box
                                                    sx={{ pr: 9 }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ pl: 1, fontWeight: 900, fontSize: 14, color: TypoHeadColor }} >Data Collection Details</Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                            </Box>
                                            {datacolData && datacolData.map((val, index) => {
                                                return <Box key={index}>
                                                    <Box sx={{
                                                        width: "100%",
                                                        display: "flex",
                                                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                                    }}>
                                                        <Box sx={{
                                                            width: "100%", display: "flex", p: 0.5,
                                                            flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                        }}>
                                                            <Box
                                                                sx={{ width: "15%", }}>
                                                                <CssVarsProvider>
                                                                    <Typography sx={{ pl: 1, fontSize: 15 }}>Requested To:</Typography>
                                                                </CssVarsProvider>
                                                            </Box>
                                                            <Paper sx={{
                                                                width: '30%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                            }} variant='none'>
                                                                {val.data_entered}
                                                            </Paper>
                                                            <Box
                                                                sx={{ width: "10%", }}>
                                                                <CssVarsProvider>
                                                                    <Typography sx={{ pl: 1, fontSize: 15 }}>Requested By:</Typography>
                                                                </CssVarsProvider>
                                                            </Box>
                                                            <Paper sx={{
                                                                width: '20%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                            }} variant='none'>
                                                                {val.req_user}
                                                            </Paper>
                                                            <Paper sx={{
                                                                width: '20%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                            }} variant='none'>
                                                                Date:   {val.create_date}
                                                            </Paper>
                                                        </Box>
                                                        <Box sx={{
                                                            width: "100%", display: "flex", p: 0.5,
                                                            flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                        }}>

                                                            <Box
                                                                sx={{ width: "15%", }}>
                                                                <CssVarsProvider>
                                                                    <Typography sx={{ pl: 1, fontSize: 15 }}>Requested Remarks</Typography>
                                                                </CssVarsProvider>
                                                            </Box>
                                                            <Paper sx={{
                                                                width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                            }} variant='none'>
                                                                {val.crf_req_remark}
                                                            </Paper>
                                                        </Box>

                                                        <Box sx={{
                                                            width: "100%", display: "flex", p: 0.5,
                                                            flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                        }}>
                                                            <Box
                                                                sx={{ width: "15%", }}>
                                                                <CssVarsProvider>
                                                                    <Typography sx={{ pl: 1, fontSize: 15 }}>Replay Remarks</Typography>
                                                                </CssVarsProvider>
                                                            </Box>
                                                            <Paper sx={{
                                                                width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                            }} variant='none'>
                                                                {val.crf_dept_remarks}
                                                            </Paper>
                                                        </Box>

                                                        <Box sx={{
                                                            width: "100%", display: "flex", p: 0.5,
                                                            flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                        }}>
                                                            <Box
                                                                sx={{ width: "15%", }}>
                                                                <CssVarsProvider>
                                                                    <Typography sx={{ pl: 1, fontSize: 15 }}>Reply User</Typography>
                                                                </CssVarsProvider>
                                                            </Box>
                                                            <Paper sx={{
                                                                width: '20%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                            }} variant='none'>
                                                                {val.datagive_user}
                                                            </Paper>
                                                            <Paper sx={{
                                                                width: '20%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                            }} variant='none'>
                                                                Date: {val.update_date}
                                                            </Paper>
                                                        </Box>
                                                        {/* {val.data_coll_image_status === 1 ? <Box sx={{ display: 'flex', width: "20%", height: 30, pl: 3 }}>
                                                            <Button
                                                                onClick={() => ViewImageDataColection(val.crf_data_collect_slno)}
                                                                variant="contained"
                                                                color="primary">View Image</Button>

                                                        </Box> : null} */}
                                                    </Box>
                                                    <Divider
                                                        // variant="middle"
                                                        sx={{ my: 0.8 }} />
                                                </Box>
                                            })}
                                        </Box>
                                    </Paper>
                                </Box> : null
                            }

                            {
                                enable === 1 ?
                                    <Box sx={{ width: "100%", mt: 0 }}>
                                        <Paper variant='outlined' sx={{ mt: 1 }} >
                                            <Box sx={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                            }}>
                                                <Box sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    pl: 0.2, pr: 0.5,
                                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                }}>
                                                    <Box
                                                        sx={{ pr: 9 }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ pl: 1, fontWeight: 900, fontSize: 14, color: TypoHeadColor }} >Data Collection Pending</Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                                </Box>

                                                {datacollectdata && datacollectdata.map((val, index) => {
                                                    return <Box key={index}>
                                                        <Box sx={{
                                                            width: "100%",
                                                            display: "flex",
                                                            flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                                        }}>
                                                            <Box sx={{
                                                                width: "100%", display: "flex", p: 0.5,
                                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                            }}>
                                                                <Box
                                                                    sx={{ width: "15%", }}>
                                                                    <CssVarsProvider>
                                                                        <Typography sx={{ pl: 1, fontSize: 15 }}>Requested To:</Typography>
                                                                    </CssVarsProvider>
                                                                </Box>
                                                                <Paper sx={{
                                                                    width: '30%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                                }} variant='none'>
                                                                    {val.data_entered}
                                                                </Paper>
                                                                <Box
                                                                    sx={{ width: "10%", }}>
                                                                    <CssVarsProvider>
                                                                        <Typography sx={{ pl: 1, fontSize: 15 }}>Requested By:</Typography>
                                                                    </CssVarsProvider>
                                                                </Box>
                                                                <Paper sx={{
                                                                    width: '20%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                                }} variant='none'>
                                                                    {val.req_user}
                                                                </Paper>
                                                                <Paper sx={{
                                                                    width: '20%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                                }} variant='none'>
                                                                    Date:   {val.create_date}
                                                                </Paper>
                                                            </Box>
                                                            <Box sx={{
                                                                width: "100%", display: "flex", p: 0.5,
                                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                            }}>

                                                                <Box
                                                                    sx={{ width: "15%", }}>
                                                                    <CssVarsProvider>
                                                                        <Typography sx={{ pl: 1, fontSize: 15 }}>Requested Remarks</Typography>
                                                                    </CssVarsProvider>
                                                                </Box>
                                                                <Paper sx={{
                                                                    width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                                }} variant='none'>
                                                                    {val.crf_req_remark}
                                                                </Paper>
                                                            </Box>
                                                        </Box>
                                                        <Divider
                                                            // variant="middle"
                                                            sx={{ my: 0.8 }} />
                                                    </Box>
                                                })}

                                            </Box>

                                        </Paper>
                                    </Box> :
                                    null
                            }

                            {purchaseDis === 1 ?
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
                                                    <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Purchase :

                                                        {
                                                            purchaseData.ack_status === 1 ?
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Acknowledged
                                                                </Typography> :
                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> Not Acknowledged
                                                                </Typography>
                                                        }
                                                    </Typography>
                                                </CssVarsProvider>
                                                {
                                                    purchaseData.ack_date !== null ? <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-evenly",
                                                            pr: 2, pt: 1
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                {format(new Date(purchaseData.ack_date), 'dd-MM-yyyy hh:mm:ss')}</Typography>
                                                            <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                            <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                {purchaseData.ack_user} </Typography>
                                                        </CssVarsProvider>   </Box> : null
                                                }
                                            </Box>
                                            <Box sx={{ width: "100%", pl: 1 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Acknowledged remarks
                                                        : </Typography>
                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{purchaseData.ack_remarks} </Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <Divider sx={{ my: 0.8, ml: 2, mr: 2 }} />
                                            {purchaseData.quatation_calling_status !== 0 ?
                                                <Box>
                                                    <Box
                                                        sx={{
                                                            pl: 1, pr: 1,
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-between"
                                                        }}>

                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Quatation Calling :

                                                                {
                                                                    purchaseData.quatation_calling_status === 1 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Yes
                                                                        </Typography> :
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> No
                                                                        </Typography>
                                                                }
                                                            </Typography>
                                                        </CssVarsProvider>
                                                        {
                                                            purchaseData.quatation_calling_date !== null ? <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: 'row',
                                                                    justifyContent: "space-evenly",
                                                                    pr: 2, pt: 1
                                                                }}>
                                                                <CssVarsProvider>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                        {format(new Date(purchaseData.quatation_calling_date), 'dd-MM-yyyy hh:mm:ss')}</Typography>
                                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                        {purchaseData.quat_call_user} </Typography>
                                                                </CssVarsProvider>   </Box> : null
                                                        }

                                                    </Box>
                                                    <Box sx={{ width: "100%", pl: 1 }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Quatation Calling Remarks
                                                                : </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{purchaseData.quatation_calling_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                                </Box> :
                                                <Box
                                                    sx={{
                                                        pl: 1, pr: 1,
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-between"
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Purchase Quatation Calling Not done !!!!
                                                        </Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                            }
                                            <Divider sx={{ my: 0.8, ml: 2, mr: 2 }} />

                                            {purchaseData.quatation_negotiation !== 0 ?
                                                <Box>
                                                    <Box
                                                        sx={{
                                                            pl: 1, pr: 1,
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-between"
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Quatation Negotiation :

                                                                {
                                                                    purchaseData.quatation_negotiation === 1 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Yes
                                                                        </Typography> :
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> No
                                                                        </Typography>
                                                                }
                                                            </Typography>
                                                        </CssVarsProvider>
                                                        {
                                                            purchaseData.quatation_negotiation_date !== null ? <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: 'row',
                                                                    justifyContent: "space-evenly",
                                                                    pr: 2, pt: 1
                                                                }}>
                                                                <CssVarsProvider>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                        {format(new Date(purchaseData.quatation_negotiation_date), 'dd-MM-yyyy hh:mm:ss')}</Typography>
                                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                        {purchaseData.quat_nego_user} </Typography>
                                                                </CssVarsProvider>   </Box> : null
                                                        }
                                                    </Box>
                                                    <Box sx={{ width: "100%", pl: 1 }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Quatation Negotiation Remarks
                                                                : </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{purchaseData.quatation_negotiation_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                                </Box> :
                                                <Box
                                                    sx={{
                                                        pl: 1, pr: 1,
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-between"
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Purchase Quatation Negotiation Not done !!!!
                                                        </Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                            }

                                            <Divider sx={{ my: 0.8, ml: 2, mr: 2 }} />
                                            {purchaseData.quatation_fixing !== 0 ?
                                                <Box>
                                                    <Box
                                                        sx={{
                                                            pl: 1, pr: 1,
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-between"
                                                        }}>

                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Quatation Finalizing :

                                                                {
                                                                    purchaseData.quatation_fixing === 1 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Yes
                                                                        </Typography> :
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> No
                                                                        </Typography>
                                                                }
                                                            </Typography>
                                                        </CssVarsProvider>
                                                        {
                                                            purchaseData.quatation_fixing_date !== null ? <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: 'row',
                                                                    justifyContent: "space-evenly",
                                                                    pr: 2, pt: 1
                                                                }}>
                                                                <CssVarsProvider>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                        {format(new Date(purchaseData.quatation_fixing_date), 'dd-MM-yyyy hh:mm:ss')}</Typography>
                                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                        {purchaseData.quat_final_user} </Typography>
                                                                </CssVarsProvider>   </Box> : null
                                                        }

                                                    </Box>
                                                    <Box sx={{ width: "100%", pl: 1 }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Quatation Finalizing Remarks
                                                                : </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{purchaseData.quatation_fixing_remarks} </Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                                </Box> :
                                                <Box
                                                    sx={{
                                                        pl: 1, pr: 1,
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-between"
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Purchase Quatation Finalizing Not done !!!!
                                                        </Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                            }
                                            <Divider sx={{ my: 0.8, ml: 2, mr: 2 }} />
                                            {
                                                purchaseData.po_prepartion !== 0 ?
                                                    <Box sx={{ width: "100%", }}>
                                                        <Box sx={{
                                                            width: "100%", display: "flex",
                                                            flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                                        }}>
                                                            {
                                                                poDetlDis === 1 ?
                                                                    <Box sx={{ width: "100%", pl: 1, pb: 1, pr: 1 }}>PO Details
                                                                        <CrfReqDetailCmpnt
                                                                            columnDefs={column}
                                                                            tableData={podetailData}
                                                                        />
                                                                    </Box> : null
                                                            }
                                                        </Box>
                                                    </Box> : <Box
                                                        sx={{
                                                            pl: 1, pr: 1,
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-between"
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >PO Adding Not Started !!!!
                                                            </Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                            }
                                            <Divider sx={{ my: 0.8, ml: 2, mr: 2 }} />

                                            {purchaseData.po_complete !== 0 ?
                                                <Box>
                                                    <Box
                                                        sx={{
                                                            pl: 1, pr: 1,
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-between"
                                                        }}>

                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >PO Entering Close :

                                                                {
                                                                    purchaseData.po_complete === 1 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Yes
                                                                        </Typography> :
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> No
                                                                        </Typography>
                                                                }
                                                            </Typography>
                                                        </CssVarsProvider>
                                                        {
                                                            purchaseData.po_complete_date !== null ? <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: 'row',
                                                                    justifyContent: "space-evenly",
                                                                    pr: 2,
                                                                }}>
                                                                <CssVarsProvider>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                                        {format(new Date(purchaseData.po_complete_date), 'dd-MM-yyyy hh:mm:ss')}</Typography>
                                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                                        {purchaseData.po_completeuser} </Typography>
                                                                </CssVarsProvider>   </Box> : null
                                                        }
                                                    </Box>
                                                </Box> :
                                                <Box
                                                    sx={{
                                                        pl: 1, pr: 1,
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-between"
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Po Processing not completed!!!!
                                                        </Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                            }

                                            <Divider sx={{ my: 0.8, ml: 2, mr: 2 }} />

                                            {purchaseData.po_approva_level_one !== 0 ?
                                                <Box>
                                                    <Box
                                                        sx={{
                                                            pl: 1, pr: 1,
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-between"
                                                        }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >PO Purchase Level Approval :
                                                                {
                                                                    purchaseData.po_approva_level_one === 1 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Done
                                                                        </Typography> :
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> Not Done
                                                                        </Typography>
                                                                }
                                                            </Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                                    <Divider sx={{ my: 0.8, ml: 2, mr: 2 }} />


                                                    {purchaseData.po_approva_level_two !== 0 ?
                                                        <Box>
                                                            <Box
                                                                sx={{
                                                                    pl: 1, pr: 1,
                                                                    display: "flex",
                                                                    flexDirection: 'row',
                                                                    justifyContent: "space-between"
                                                                }}>
                                                                <CssVarsProvider>
                                                                    <Typography sx={{ fontSize: 16, fontWeight: 600 }} >PO Managing Director Approval :
                                                                        {
                                                                            purchaseData.po_approva_level_two === 1 ?
                                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Done
                                                                                </Typography> :
                                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> Not Done
                                                                                </Typography>
                                                                        }
                                                                    </Typography>
                                                                </CssVarsProvider>
                                                            </Box>
                                                            <Divider sx={{ my: 0.8, ml: 2, mr: 2 }} />

                                                            {purchaseData.po_to_supplier !== 0 ?
                                                                <Box>
                                                                    <Box
                                                                        sx={{
                                                                            pl: 1, pr: 1,
                                                                            display: "flex",
                                                                            flexDirection: 'row',
                                                                            justifyContent: "space-between"
                                                                        }}>
                                                                        <CssVarsProvider>
                                                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >PO Sending to Supplier :
                                                                                {
                                                                                    purchaseData.po_to_supplier === 1 ?
                                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Done
                                                                                        </Typography> :
                                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> Not Done
                                                                                        </Typography>
                                                                                }
                                                                            </Typography>
                                                                        </CssVarsProvider>
                                                                    </Box>
                                                                    <Divider sx={{ my: 0.8, ml: 2, mr: 2 }} />


                                                                    {/*  poStoredata */}
                                                                    {
                                                                        purchaseData.po_to_supplier === 1 ?
                                                                            <Box sx={{
                                                                                width: "100%", pl: 2,
                                                                                display: "flex",
                                                                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                                                            }}>

                                                                                <Box
                                                                                    sx={{ pr: 9 }}>
                                                                                    <CssVarsProvider>
                                                                                        <Typography sx={{ fontWeight: 900, fontSize: 16, color: TypoHeadColor }} >Store Receiving Details</Typography>
                                                                                    </CssVarsProvider>
                                                                                </Box>

                                                                                <Box sx={{ p: 1 }}>
                                                                                    {podetailData && podetailData.map((val, index) => {
                                                                                        return <Box key={index}
                                                                                            sx={{ pr: 9 }}>
                                                                                            <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >

                                                                                                <Box sx={{
                                                                                                    width: "100%", display: "flex", p: 0.5,
                                                                                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                                                                }}>
                                                                                                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 1 }}>
                                                                                                        <CssVarsProvider>
                                                                                                            <Typography sx={{ fontSize: 15 }}>Po No: {val.po_number}</Typography>
                                                                                                        </CssVarsProvider>
                                                                                                    </Box>
                                                                                                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 4 }}>
                                                                                                        <CssVarsProvider>
                                                                                                            <Typography sx={{ fontSize: 15 }}>CRS Store :{val.store_name}</Typography>
                                                                                                        </CssVarsProvider>
                                                                                                    </Box>

                                                                                                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 4 }}>
                                                                                                        <CssVarsProvider>
                                                                                                            <Typography sx={{ fontSize: 15 }}>Sub Store:{val.sub_storename}</Typography>
                                                                                                        </CssVarsProvider>
                                                                                                    </Box>
                                                                                                </Box>

                                                                                                <PoStoreDetail val={val} />
                                                                                            </Paper>
                                                                                        </Box>
                                                                                    })}
                                                                                </Box>
                                                                            </Box>
                                                                            : null
                                                                    }
                                                                    {mainDatas.user_acknldge === 1 ?

                                                                        <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >

                                                                            <Box sx={{
                                                                                width: "100%", display: "flex", p: 0.5,
                                                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                                            }}>
                                                                                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 1 }}>
                                                                                    <CssVarsProvider>
                                                                                        <Typography sx={{ fontWeight: 900, fontSize: 15 }}>User Acknowleged: </Typography>
                                                                                    </CssVarsProvider>
                                                                                </Box>

                                                                            </Box>
                                                                        </Paper>
                                                                        : null


                                                                    }
                                                                </Box> :
                                                                <Box
                                                                    sx={{
                                                                        pl: 1, pr: 1,
                                                                        display: "flex",
                                                                        flexDirection: 'row',
                                                                        justifyContent: "space-between"
                                                                    }}>
                                                                    <CssVarsProvider>
                                                                        <Typography sx={{ fontSize: 16, fontWeight: 600 }} >PO sending to Supplier Not Done!!!!
                                                                        </Typography>
                                                                    </CssVarsProvider>
                                                                </Box>
                                                            }

                                                        </Box> :
                                                        <Box
                                                            sx={{
                                                                pl: 1, pr: 1,
                                                                display: "flex",
                                                                flexDirection: 'row',
                                                                justifyContent: "space-between"
                                                            }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 16, fontWeight: 600 }} >PO Managing Director Approval Not Done!!!!
                                                                </Typography>
                                                            </CssVarsProvider>
                                                        </Box>
                                                    }
                                                </Box> :
                                                <Box
                                                    sx={{
                                                        pl: 1, pr: 1,
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-between"
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 16, fontWeight: 600 }} >PO purchase level Approval Not Done!!!!
                                                        </Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                            }
                                            <Divider sx={{ my: 0.8, ml: 2, mr: 2 }} />
                                        </Box>
                                    </Paper>
                                </Box> :
                                <Box sx={{ width: "100%", mt: 0 }}>
                                    <Paper variant='outlined' sx={{ mt: 1 }} >
                                        <Box
                                            sx={{
                                                pl: 1, pr: 1,
                                                display: "flex",
                                                flexDirection: 'row',
                                                justifyContent: "space-between"
                                            }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Purchase Process not started !!!!
                                                </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                    </Paper>
                                </Box>
                            }





                        </Box>
                        : null

                }

            </Box>


        </CardCloseOnly >
    )
}

export default memo(CrfNoBasedReport)