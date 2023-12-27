import { Box } from '@mui/material'
import React, { useCallback, memo, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import { getNdrfList } from 'src/redux/actions/NdrfList.action'
import PrchaseAcknldgeModal from './PrchaseAcknldgeModal'
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import { urlExist } from 'src/views/Constant/Constant'
import ProfilePicDefault from 'src/assets/images/nosigature.jpg'
import { axioslogin } from 'src/views/Axios/Axios'
import { ndrfpdfdownloadwithouttable } from '../NdrfPdfComponent/NdrfPdfWotTable'
import { ndrfpdfdownloadwithtable } from '../NdrfPdfComponent/NdrfPdfWithTable'
import ShopIcon from '@mui/icons-material/Shop';
import NdrfPurchasePoaddModal from './NdrfPurchasePoaddModal'

const NdrfPurchaseTable = () => {

    /*** Initializing */
    const history = useHistory();
    const dispatch = useDispatch();
    const [count, setCount] = useState(0)
    const [ndrfData, setNdrfData] = useState([])


    useEffect(() => {
        dispatch(getNdrfList())
    }, [dispatch, count])

    const ndrftable = useSelector((state) => {
        return state.setNdrfList.NdrfListdata
    })

    useEffect(() => {
        if (ndrftable.length !== 0) {
            const datas = ndrftable.map((val) => {
                const obj = {
                    ndrf_mast_slno: val.ndrf_mast_slno,
                    req_slno: val.req_slno,
                    ndrfcreate: val.ndrfcreate,
                    actual_requirement: val.actual_requirement !== null ? val.actual_requirement : "Not Updated",
                    needed: val.needed !== null ? val.needed : "Not Updated",
                    request_dept_slno: val.request_dept_slno,
                    request_deptsec_slno: val.request_deptsec_slno,
                    location: val.location,
                    req_dept: val.reqcreate,
                    crf_ndrf_status: val.crf_ndrf_status,
                    req_deptsec: val.req_deptsec,
                    rm_ndrf: val.rm_ndrf,
                    dept_name: val.req_dept,
                    req_userdeptsec: val.req_userdeptsec,
                    category: val.category,
                    emergency: val.emergency,
                    total_approx_cost: val.total_approx_cost,
                    image_status: val.image_status,
                    remarks: val.remarks,
                    req_date: val.req_date,
                    userdeptsec: val.userdeptsec,
                    expected_date: val.expected_date,
                    req_approv_slno: val.req_approv_slno,
                    req_status: val.req_status,
                    req_user: val.req_user,
                    reqcreate: val.reqcreate,
                    ndrf_om_approv: val.ndrf_om_approv,
                    ndrfOM: val.ndrf_om_approv === 1 ? "Approved" : val.ndrf_om_approv === 2 ? "Reject" :
                        val.ndrf_om_approv === 3 ? "On-Hold" : "Not Updated",
                    ndrf_om_remarks: val.ndrf_om_remarks,
                    ndrfom_approv_date: val.ndrfom_approv_date,
                    ndrf_om_user: val.ndrf_om_user !== null ? val.ndrf_om_user.toLowerCase() : "Not Updated",

                    ndrf_smo_approv: val.ndrf_smo_approv,
                    ndrfSMO: val.ndrf_smo_approv === 1 ? "Approved" : val.ndrf_smo_approv === 2 ? "Reject" :
                        val.ndrf_smo_approv === 3 ? "On-Hold" : "Not Updated",
                    ndrf_smo_remarks: val.ndrf_smo_remarks,
                    ndrf_som_aprrov_date: val.ndrf_som_aprrov_date,
                    ndrf_smo_user: val.ndrf_smo_user !== null ? val.ndrf_smo_user.toLowerCase() : "Not Updated",

                    ndrf_cao_approve: val.ndrf_cao_approve,
                    ndrfCOO: val.ndrf_cao_approve === 1 ? "Approved" : val.ndrf_cao_approve === 2 ? "Reject" :
                        val.ndrf_cao_approve === 3 ? "On-Hold" : "Not Updated",
                    ndrf_cao_approve_remarks: val.ndrf_cao_approve_remarks,
                    ndrf_cao_approv_date: val.ndrf_cao_approv_date,
                    ndrf_cao_user: val.ndrf_cao_user !== null ? val.ndrf_cao_user.toLowerCase() : "Not Updated",

                    ndrf_ed_approve: val.ndrf_ed_approve,
                    ndrfED: val.ndrf_ed_approve === 1 ? "Approved" : val.ndrf_ed_approve === 2 ? "Reject" :
                        val.ndrf_ed_approve === 3 ? "On-Hold" : "Not Updated",
                    ndrf_ed_approve_remarks: val.ndrf_ed_approve_remarks,
                    ndrf_ed_approve_date: val.ndrf_ed_approve_date,
                    ndrf_ed_user: val.ndrf_ed_user !== null ? val.ndrf_ed_user.toLowerCase() : "Not Updated",

                    ndrf_md_approve: val.ndrf_md_approve,
                    ndrfMD: val.ndrf_md_approve === 1 ? "Approved" : val.ndrf_md_approve === 2 ? "Reject" :
                        val.ndrf_md_approve === 3 ? "On-Hold" : "Not Updated",
                    ndrf_md_approve_remarks: val.ndrf_md_approve_remarks,
                    ndrf_md_approve_date: val.ndrf_md_approve_date,
                    ndrf_md_user: val.ndrf_md_user !== null ? val.ndrf_md_user.toLowerCase() : "Not Updated",

                    incharge_approve: val.incharge_approve,
                    incharge_req: val.incharge_req,
                    incharge: val.incharge_approve === 1 ? "Approved" : val.incharge_approve === 2 ? "Reject" :
                        val.incharge_approve === 3 ? "On-Hold" : "Not Updated",
                    incharge_remark: val.incharge_remarks !== null ? val.incharge_remarks : "Not Updated",
                    inch_detial_analysis: val.inch_detial_analysis,
                    incharge_apprv_date: val.incharge_apprv_date,
                    incharge_user: val.incharge_user !== null ? val.incharge_user.toLowerCase() : "Not Updated",

                    hod_req: val.hod_req,
                    hod_approve: val.hod_approve,
                    hod: val.hod_approve === 1 ? "Approved" : val.hod_approve === 2 ? "Reject" :
                        val.hod_approve === 3 ? "On-Hold" : "Not Updated",
                    hod_remarks: val.hod_remarks !== null ? val.hod_remarks : "Not Updated",
                    hod_detial_analysis: val.hod_detial_analysis,
                    hod_approve_date: val.hod_approve_date,
                    hod_user: val.hod_user !== null ? val.hod_user.toLowerCase() : "Not Updated",

                    dms_req: val.dms_req,
                    dms_approve: val.dms_approve,
                    dms: val.dms_approve === 1 ? "Approved" : val.dms_approve === 2 ? "Reject" :
                        val.dms_approve === 3 ? "On-Hold" : "Not Updated",
                    dms_remarks: val.dms_remarks !== null ? val.dms_remarks : "Not Updated",
                    dms_detail_analysis: val.dms_detail_analysis !== null ? val.dms_detail_analysis : "Not Updated",
                    dms_approve_date: val.dms_approve_date,
                    dms_user: val.dms_user !== null ? val.dms_user.toLowerCase() : "Not Updated",


                    ms_approve_req: val.ms_approve_req,
                    ms_approve: val.ms_approve,
                    ms: val.ms_approve === 1 ? "Approved" : val.ms_approve === 2 ? "Reject" :
                        val.ms_approve === 3 ? "On-Hold" : "Not Updated",
                    ms_approve_remark: val.ms_approve_remark !== null ? val.ms_approve_remark : "Not Updated",
                    ms_detail_analysis: val.ms_detail_analysis !== null ? val.ms_detail_analysis : "Not Updated",
                    ms_approve_date: val.ms_approve_date,
                    ms_user: val.ms_user !== null ? val.ms_user.toLowerCase() : "Not Updated",

                    manag_operation_req: val.manag_operation_req,
                    manag_operation_approv: val.manag_operation_approv,
                    om: val.manag_operation_approv === 1 ? "Approved" : val.manag_operation_approv === 2 ? "Reject" :
                        val.manag_operation_approv === 3 ? "On-Hold" : "Not Updated",
                    manag_operation_remarks: val.manag_operation_remarks !== null ? val.manag_operation_remarks : "Not Updated",
                    om_detial_analysis: val.om_detial_analysis !== null ? val.om_detial_analysis : "Not Updated",
                    om_approv_date: val.om_approv_date,
                    manag_operation_user: val.manag_operation_user !== null ? val.manag_operation_user.toLowerCase() : "Not Updated",

                    senior_manage_req: val.senior_manage_req,
                    senior_manage_approv: val.senior_manage_approv,
                    smo: val.senior_manage_approv === 1 ? "Approved" : val.senior_manage_approv === 2 ? "Reject" :
                        val.senior_manage_approv === 3 ? "On-Hold" : "Not Updated",
                    senior_manage_remarks: val.senior_manage_remarks !== null ? val.senior_manage_remarks : "Not Updated",
                    smo_detial_analysis: val.smo_detial_analysis !== null ? val.smo_detial_analysis : "Not Updated",
                    som_aprrov_date: val.som_aprrov_date,
                    senior_manage_user: val.senior_manage_user !== null ? val.senior_manage_user.toLowerCase() : "Not Updated",

                    cao_approve: val.cao_approve,
                    cao: val.cao_approve === 1 ? "Approved" : val.cao_approve === 2 ? "Reject" :
                        val.cao_approve === 3 ? "On-Hold" : "Not Updated",
                    cao_approve_remarks: val.cao_approve_remarks !== null ? val.cao_approve_remarks : "Not Updated",
                    ceo_detial_analysis: val.ceo_detial_analysis !== null ? val.ceo_detial_analysis : "Not Updated",
                    cao_approv_date: val.cao_approv_date,
                    cao_user: val.cao_user !== null ? val.cao_user.toLowerCase() : "Not Updated",

                    md_approve_req: val.md_approve_req,
                    md_approve: val.md_approve,
                    md: val.md_approve === 1 ? "Approved" : val.md_approve === 2 ? "Reject" :
                        val.md_approve === 3 ? "On-Hold" : "Not Updated",
                    md_approve_remarks: val.md_approve_remarks,
                    md_detial_analysis: val.md_detial_analysis,
                    md_approve_date: val.md_approve_date,
                    md_user: val.md_user !== null ? val.md_user.toLowerCase() : "Not Updated",

                    ed_approve_req: val.ed_approve_req,
                    ed_approve: val.ed_approve,
                    ed: val.ed_approve === 1 ? "Approved" : val.ed_approve === 2 ? "Reject" :
                        val.ed_approve === 3 ? "On-Hold" : "Not Updated",
                    ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : "Not Updated",
                    ed_detial_analysis: val.ed_detial_analysis,
                    ed_approve_date: val.ed_approve_date,
                    ed_user: val.ed_user !== null ? val.ed_user.toLowerCase() : "Not Updated",

                    crf_close: val.crf_close !== null ? val.crf_close : "Not Updated",
                    crf_close_remark: val.crf_close_remark !== null ? val.crf_close_remark : "Not Updated",
                    crf_closed_one: val.crf_closed_one !== null ? val.crf_closed_one : "Not Updated",
                    close_user: val.close_user !== null ? val.close_user.toLowerCase() : "Not Updated",
                    close_date: val.close_date !== null ? val.close_date : "Not Updated",

                    ndrf_purchase: val.ndrf_purchase,
                    ndrf_purchase_acknolwdge: val.ndrf_purchase_acknolwdge,
                    purchase_date: val.purchase_date,
                    expected_purchase_date: val.expected_purchase_date,
                    purchase_user: val.purchase_user ? val.purchase_user.toLowerCase() : "Not Updated",
                    ndrf_po_close: val.ndrf_po_close,
                    ndrf_po_close_remarks: val.ndrf_po_close_remarks,
                    ndrf_po_close_user: val.ndrf_po_close_user ? val.ndrf_po_close_user.toLowerCase() : "Not Updated",
                    ndrf_po_close_date: val.ndrf_po_close_date,
                    ndrf_po_add: val.ndrf_po_add
                }
                return obj
            })
            setNdrfData(datas)
        }
    }, [ndrftable])

    //column title setting
    const [columnndrf] = useState([

        {
            headerName: 'Action', minWidth: 100, cellRenderer: params => {

                if (params.data.ndrf_po_add !== 1) {
                    return <IconButton onClick={() => ndrfSelect(params)}
                        sx={{ color: editicon, paddingY: 0.5 }} >
                        <CustomeToolTip title="Acknowledgement">
                            <ReplayCircleFilledIcon />
                        </CustomeToolTip>
                    </IconButton>
                } else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }} disabled>
                        <ReplayCircleFilledIcon />
                    </IconButton>

                }

            }
        },

        {
            headerName: 'Pdf', minWidth: 80, cellRenderer: params => {
                if (params.data.ndrf_purchase === 1) {
                    return <IconButton onClick={() => pdfselect(params)}
                        sx={{ color: editicon, paddingY: 0.5 }} >
                        <CustomeToolTip title="pdf">
                            <DownloadForOfflineIcon color='primary' />
                        </CustomeToolTip>
                    </IconButton>
                } else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }} disabled>
                        <DownloadForOfflineIcon />
                    </IconButton>

                }

            }
        },
        {
            headerName: 'PO Add', minWidth: 100, cellRenderer: params => {
                if (params.data.ndrf_purchase === 1) {
                    return <IconButton onClick={() => POAdding(params)}
                        sx={{ color: editicon, paddingY: 0.5 }} >
                        <CustomeToolTip title="PO Add">
                            <ShopIcon color='primary' />
                        </CustomeToolTip>
                    </IconButton>
                } else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }} disabled>
                        <ShopIcon />
                    </IconButton>

                }

            }
        },
        { headerName: "Req.Slno", field: "req_slno", minWidth: 120 },
        { headerName: "Actual Requirement", field: "actual_requirement", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Location", field: "location", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Req.Department", field: "req_dept", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Req.DeptSec", field: "req_deptsec", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Req.Date", field: "reqcreate", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "Exp.DeptSec", field: "expected_date", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "NDRF Date", field: "ndrf_date", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "Remarks", field: "remarks", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
    ])

    const [CloseModal, setCloseModal] = useState(false)
    const [CloseModalFlag, setCloseModalFlag] = useState(0)
    const [closeData, setCloseData] = useState([])

    const ndrfSelect = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setCloseModal(true)
        setCloseModalFlag(1)
        setCloseData(data)
    }, [])

    const [POAddModal, setPOAddModal] = useState(false)
    const [POAddModalFlag, setPOAddModalFlag] = useState(0)
    const [POAddData, setPoAddDAta] = useState([])

    const POAdding = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setPOAddModal(true)
        setPOAddModalFlag(1)
        setPoAddDAta(data)
    }, [])

    const [inchargesign, setInchargeSign] = useState(ProfilePicDefault)
    const [hodsign, setHodSign] = useState(ProfilePicDefault)
    const [omsign, setOmSign] = useState(ProfilePicDefault)
    const [smosign, setSmoSign] = useState(ProfilePicDefault)
    const [caosign, setCaoSign] = useState(ProfilePicDefault)
    const [edsign, setEdSign] = useState(ProfilePicDefault)
    const [pdf, setPdf] = useState(0)
    const [dataPost, setdataPost] = useState([])
    const [datapdf, setDataPdf] = useState([])
    const [datacollectdata, setDataCollectData] = useState([])


    const pdfselect = async (params) => {
        const data = params.api.getSelectedRows()
        const { req_slno, ndrf_mast_slno, incharge_user, hod_user, ndrf_om_user, ndrf_smo_user,
            ndrf_cao_user, ndrf_ed_user } = data[0]
        setDataPdf(data)
        const getInchargeSign = async () => {
            if (incharge_user > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + incharge_user}/signature/signature.jpg`);
                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setInchargeSign(picUrl)
                    } else {
                        setInchargeSign(ProfilePicDefault)
                    }
                })
            }
        }
        const gethodSign = async () => {
            if (hod_user > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + hod_user}/signature/signature.jpg`);
                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setHodSign(picUrl)
                    } else {
                        setHodSign(ProfilePicDefault)
                    }
                })
            }
        }
        const getOmSign = async () => {
            if (ndrf_om_user > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + ndrf_om_user}/signature/signature.jpg`);
                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setOmSign(picUrl)
                    } else {
                        setOmSign(ProfilePicDefault)
                    }
                })
            }
        }
        const getSMOSign = async () => {
            if (ndrf_smo_user > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + ndrf_smo_user}/signature/signature.jpg`);
                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setSmoSign(picUrl)
                    } else {
                        setSmoSign(ProfilePicDefault)
                    }
                })
            }
        }
        const getCAOSign = async () => {
            if (ndrf_cao_user > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + ndrf_cao_user}/signature/signature.jpg`);
                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setCaoSign(picUrl)
                    } else {
                        setCaoSign(ProfilePicDefault)
                    }
                })
            }
        }
        const getEDSign = async () => {
            if (ndrf_ed_user > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + ndrf_ed_user}/signature/signature.jpg`);
                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setEdSign(picUrl)
                    } else {
                        setEdSign(ProfilePicDefault)
                    }
                })
            }
        }
        if (req_slno !== 0) {
            getInchargeSign()
            gethodSign()
            getOmSign()
            getSMOSign()
            getCAOSign()
            getEDSign()
            const InsertFun = async (req_slno) => {
                const result = await axioslogin.get(`/requestRegister/getItemList/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    setdataPost(data)
                }
                else {
                    setdataPost([])
                }
            }

            const getDataCollectCompleteDetails = async (ndrf_mast_slno) => {
                const result = await axioslogin.get(`/ndrf/getItemListDataCollect/${ndrf_mast_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    setDataCollectData(data)
                }
                else {
                    setDataCollectData([])
                }
            }


            InsertFun(req_slno)
            getDataCollectCompleteDetails(ndrf_mast_slno)
        }
        setPdf(1)
    }

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])


    useEffect(() => {
        if (pdf !== 0 && Object.keys(dataPost).length !== 0) {
            ndrfpdfdownloadwithtable(datapdf, dataPost, datacollectdata, inchargesign, hodsign, omsign,
                smosign, caosign, edsign)
            setPdf(0)
        }
        else if (pdf !== 0) {
            ndrfpdfdownloadwithouttable(datapdf, inchargesign, hodsign, omsign,
                smosign, caosign, edsign)
            setPdf(0)
        }

    }, [pdf, dataPost, datacollectdata, inchargesign, hodsign, omsign, smosign, caosign, edsign, datapdf])

    return (
        <CardCloseOnly
            title="NDRF For Purchase"
            close={backtoSetting}
        >
            {CloseModalFlag === 1 ?
                <PrchaseAcknldgeModal
                    open={CloseModal}
                    setOpen={setCloseModal}
                    datas={closeData}
                    count={count}
                    setCount={setCount}
                /> : null}

            {
                POAddModalFlag === 1 ?
                    <NdrfPurchasePoaddModal
                        open={POAddModal}
                        setOpen={setPOAddModal}
                        datas={POAddData}
                        count={count}
                        setCount={setCount}
                    /> : null
            }
            <Box sx={{ p: 1 }}>
                <CusAgGridForMain
                    columnDefs={columnndrf}
                    tableData={ndrfData}
                />
            </Box>

        </CardCloseOnly>
    )
}

export default memo(NdrfPurchaseTable)