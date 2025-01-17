import { Box, Paper, Tooltip } from '@mui/material'
import React, { useCallback, memo, useState, Fragment, useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import { warningNotify } from 'src/views/Common/CommonCode'
import { useHistory } from 'react-router-dom'
import MasterDetailCompnt from '../ComonComponent/MasterDetailCompnt'
import CloseIcon from '@mui/icons-material/Close';
import CusIconButton from 'src/views/Components/CusIconButton'
import ApproveButtonsCompnt from '../ComonComponent/ApproveButtonsCompnt'
import HodCancel from './HodCancel'
import CrmHodApprovalModal from './CrmHodApprovalModal'
import HigherAppDoneModal from '../ComonComponent/HigherAppDoneModal'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ReqImageDisModal from '../ComonComponent/ReqImageDisModal'
import { ToastContainer } from 'react-toastify'
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from '@mui/icons-material/Search';
import ClosedDetailsModal from '../ComonComponent/ClosedDetailsModal'
import ClosedButtonCompnt from '../ComonComponent/ClosedButtonCompnt'


const CrfHodApproval = () => {

    /*** Initializing */
    const history = useHistory();
    const [count, setCount] = useState(0)
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const [done, setDone] = useState(false)
    const [pending, setPending] = useState(true)
    const [closed, setClose] = useState(false)
    const [check, setCheck] = useState(0)
    const [authorizeDeptSec, setAuthorizDeptSec] = useState([])
    const [deptSec, setdeptSec] = useState(0)
    const [serachFlag, setSearchFlag] = useState(0)
    const updatedone = useCallback((e) => {
        if (e.target.checked === true) {
            setDone(true)
            setCheck(2)
            setPending(false)
            setClose(false)
        }
        else {
            setDone(false)
            setCheck(0)
            setPending(false)
            setClose(false)
        }
    }, [])
    const updatependng = useCallback((e) => {
        if (e.target.checked === true) {
            setPending(true)
            setCheck(1)
            setDone(false)
            setClose(false)
        }
        else {
            setDone(false)
            setCheck(0)
            setPending(false)
            setClose(false)
        }
    }, [])
    const updateClosed = useCallback((e) => {
        if (e.target.checked === true) {
            setClose(true)
            setCheck(3)
            setDone(false)
            setPending(false)
        }
        else {
            setDone(false)
            setCheck(0)
            setPending(false)
            setClose(false)
        }
    }, [])
    const [pendingData, setPendingData] = useState([])
    const [donedata, setDoneData] = useState([])
    const [getAllDta, setGetAllDAta] = useState([])
    const [closedata, setClosedData] = useState([])

    useEffect(() => {

        const getReqDeptsecList = async (deptsecArry) => {
            const result = await axioslogin.post('/newCRFRegister/getAllReqBasedDept', deptsecArry)
            const { success, data } = result.data
            if (success === 1) {
                const incharge = data.filter((val) => {
                    return val.hod_req === 1 && val.crf_close !== 1
                })
                const ClosedList = data.filter((val) => {
                    return val.hod_req === 1 && val.crf_close === 1
                })
                setClosedData(ClosedList)
                const datas = incharge.map((val) => {
                    const obj = {
                        req_status: val.req_status,
                        req_slno: val.req_slno,
                        actual_requirement: val.actual_requirement,
                        needed: val.needed,
                        request_deptsec_slno: val.request_deptsec_slno,
                        req_deptsec: val.req_deptsec.toLowerCase(),
                        user_deptsection: val.user_deptsection.toLowerCase(),
                        user_deptsec: val.user_deptsec,
                        em_name: val.create_user.toLowerCase(),
                        category: val.category,
                        location: val.location,
                        emergency_flag: val.emergency_flag,
                        emer_type_name: val.emer_type_name,
                        emer_slno: val.emer_slno,
                        emer_type_escalation: val.emer_type_escalation,
                        emergeny_remarks: val.emergeny_remarks,
                        total_approx_cost: val.total_approx_cost,
                        image_status: val.image_status,
                        req_date: val.create_date,
                        expected_date: val.expected_date,
                        status: val.rm_ndrf === 1 ? "NDRF" : "CRF",
                        crf_close: val.crf_close,
                        crf_close_remark: val.crf_close_remark,
                        crf_closed_one: val.crf_closed_one,
                        close_date: val.close_date,
                        closed_user: val.closed_user !== null ? val.closed_user.toLowerCase() : '',
                        incharge_approve: val.incharge_approve,
                        incharge_req: val.incharge_req,
                        incharge: val.incharge_approve === 1 ? "Approved" : val.incharge_approve === 2 ? "Reject" :
                            val.incharge_approve === 3 ? "On-Hold" : "Not Done",
                        incharge_remarks: val.incharge_remarks,
                        inch_detial_analysis: val.inch_detial_analysis,
                        incharge_remark: val.incharge_remarks !== null ? val.incharge_remarks : "Not Updated",
                        incharge_apprv_date: val.incharge_apprv_date,
                        incharge_user: val.incharge_user !== null ? val.incharge_user.toLowerCase() : '',

                        hod_req: val.hod_req,
                        hod_approve: val.hod_approve,
                        hod: val.hod_approve === 1 ? "Approved" : val.hod_approve === 2 ? "Reject" :
                            val.hod_approve === 3 ? "On-Hold" : "Not Done",
                        hod_remarks: val.hod_remarks !== null ? val.hod_remarks : "Not Done",
                        hod_remark: val.hod_remarks,
                        hod_detial_analysis: val.hod_detial_analysis,
                        hod_approve_date: val.hod_approve_date,
                        hod_user: val.hod_user !== null ? val.hod_user.toLowerCase() : '',

                        dms_req: val.dms_req,
                        dms_approve: val.dms_approve,
                        dms: val.dms_approve === 1 ? "Approved" : val.dms_approve === 2 ? "Reject" :
                            val.dms_approve === 3 ? "On-Hold" : "Not Done",
                        dms_remarks: val.dms_remarks !== null ? val.dms_remarks : "Not Updated",
                        dms_approve_date: val.dms_approve_date,
                        dms_user: val.dms_user !== null ? val.dms_user.toLowerCase() : '',

                        ms_approve_req: val.ms_approve_req,
                        ms_approve: val.ms_approve,
                        ms: val.ms_approve === 1 ? "Approved" : val.ms_approve === 2 ? "Reject" :
                            val.ms_approve === 3 ? "On-Hold" : "Not Done",
                        ms_approve_remark: val.ms_approve_remark !== null ? val.ms_approve_remark : "Not Updated",
                        ms_approve_date: val.ms_approve_date,
                        ms_approve_user: val.ms_approve_user !== null ? val.ms_approve_user.toLowerCase() : '',
                        manag_operation_req: val.manag_operation_req,

                        manag_operation_approv: val.manag_operation_approv,
                        om: val.manag_operation_approv === 1 ? "Approved" : val.manag_operation_approv === 2 ? "Reject" :
                            val.manag_operation_approv === 3 ? "On-Hold" : "Not Done",
                        manag_operation_remarks: val.manag_operation_remarks !== null ? val.manag_operation_remarks : "Not Updated",
                        om_approv_date: val.om_approv_date,
                        manag_operation_user: val.manag_operation_user !== null ? val.manag_operation_user.toLowerCase() : '',

                        senior_manage_approv: val.senior_manage_approv,
                        smo: val.senior_manage_approv === 1 ? "Approved" : val.senior_manage_approv === 2 ? "Reject" :
                            val.senior_manage_approv === 3 ? "On-Hold" : "Not Done",
                        senior_manage_remarks: val.senior_manage_remarks !== null ? val.senior_manage_remarks : "Not Updated",
                        som_aprrov_date: val.som_aprrov_date,
                        senior_manage_user: val.senior_manage_user !== null ? val.senior_manage_user.toLowerCase() : '',
                        gm_approve: val.gm_approve,
                        gm: val.gm_approve === 1 ? "Approved" : val.gm_approve === 2 ? "Reject" :
                            val.gm_approve === 3 ? "On-Hold" : "Not Done",
                        gm_approve_remarks: val.gm_approve_remarks !== null ? val.gm_approve_remarks : "Not Updated",
                        gm_approv_date: val.gm_approv_date,
                        gm_user: val.gm_user !== null ? val.gm_user.toLowerCase() : '',
                        md_approve: val.md_approve,
                        md: val.md_approve === 1 ? "Approved" : val.md_approve === 2 ? "Reject" :
                            val.md_approve === 3 ? "On-Hold" : "Not Done",
                        md_approve_remarks: val.md_approve_remarks !== null ? val.md_approve_remarks : "Not Updated",
                        md_approve_date: val.md_approve_date,
                        md_user: val.md_user !== null ? val.md_user.toLowerCase() : '',
                        ed_approve: val.ed_approve,
                        ed: val.ed_approve === 1 ? "Approved" : val.ed_approve === 2 ? "Reject" :
                            val.ed_approve === 3 ? "On-Hold" : "Not Done",
                        ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : "Not Updated",
                        ed_approve_date: val.ed_approve_date,
                        ed_user: val.ed_user ? val.ed_user.toLowerCase() : '',
                        higher: val.manag_operation_approv !== null || val.senior_manage_approv !== null ||
                            val.gm_approve !== null || val.md_approve !== null ||
                            val.ed_approve !== null ? 1 :
                            (val.dms_req === 1 && val.dms_approve !== null) ? 1 : 0,
                        now_who: val.sub_store_recieve === 1 ? "Sub Store Receive" :
                            val.store_receive === 1 ? "CRS Store Receive" :
                                val.po_to_supplier === 1 ? "PO Send to Supplier" :
                                    val.po_approva_level_two === 1 ? "PO Managing Director Approved" :
                                        val.po_approva_level_one === 1 ? "PO Purchase Level Approved" :
                                            val.po_complete === 1 ? "PO Completed" :
                                                val.po_prepartion === 1 ? "PO Prepairing" :
                                                    val.quatation_fixing === 1 ? "Quatation Fixed" :
                                                        val.quatation_negotiation === 1 ? "Quatation Negotiation" :
                                                            val.quatation_calling_status === 1 ? "Quatation Calling" :
                                                                val.ack_status === 1 ? "Puchase Acknowledged" :
                                                                    val.ed_approve !== null ? "ED" :
                                                                        val.md_approve !== null ? "MD" :
                                                                            val.gm_approve !== null ? "GM" :
                                                                                val.senior_manage_approv !== null ? "SMO" :
                                                                                    val.manag_operation_approv !== null ? "MO" :
                                                                                        val.ms_approve !== null ? "MS" :
                                                                                            val.dms_approve !== null ? "DMS" :
                                                                                                val.hod_approve !== null ? "HOD" :
                                                                                                    val.incharge_approve !== null ? "INCHARGE" :
                                                                                                        "Not Statrted",
                        now_who_status:
                            val.sub_store_recieve === 1 ? 4 :
                                val.store_receive === 1 ? 4 : val.po_to_supplier === 1 ? val.po_to_supplier :
                                    val.po_approva_level_two === 1 ? val.po_approva_level_two :
                                        val.po_approva_level_one === 1 ? val.po_approva_level_one :
                                            val.po_complete === 1 ? val.po_complete :
                                                val.po_prepartion === 1 ? val.po_prepartion :
                                                    val.quatation_fixing === 1 ? val.quatation_fixing :
                                                        val.quatation_negotiation === 1 ? val.quatation_negotiation :
                                                            val.quatation_calling_status === 1 ? val.quatation_calling_status :
                                                                val.ack_status === 1 ? val.ack_status :
                                                                    val.ed_approve !== null ? val.ed_approve :
                                                                        val.md_approve !== null ? val.md_approve :
                                                                            val.gm_approve !== null ? val.gm_approve :
                                                                                val.senior_manage_approv !== null ? val.senior_manage_approv :
                                                                                    val.manag_operation_approv !== null ? val.manag_operation_approv :
                                                                                        val.ms_approve !== null ? val.ms_approve :
                                                                                            val.dms_approve !== null ? val.dms_approve :
                                                                                                val.hod_approve !== null ? val.hod_approve :
                                                                                                    val.incharge_approve !== null ? val.incharge_approve :
                                                                                                        0,
                        hod_image: val.hod_image,
                        dms_image: val.dms_image,
                        ms_image: val.ms_image,
                        mo_image: val.mo_image,
                        smo_image: val.smo_image,
                        gm_image: val.gm_image,
                        md_image: val.md_image,
                        ed_image: val.ed_image,
                        ack_status: val.ack_status,
                        ack_remarks: val.ack_remarks,
                        quatation_calling_status: val.quatation_calling_status,
                        quatation_calling_date: val.quatation_calling_date,
                        quatation_negotiation: val.quatation_negotiation,
                        quatation_negotiation_date: val.quatation_negotiation_date,
                        quatation_fixing: val.quatation_fixing,
                        quatation_fixing_date: val.quatation_fixing_date,
                        po_prepartion: val.po_prepartion,
                        po_complete: val.po_complete,
                        po_complete_date: val.po_complete_date,
                        po_approva_level_one: val.po_approva_level_one,
                        po_approva_level_two: val.po_approva_level_two,
                        po_to_supplier: val.po_to_supplier,
                        store_receive: val.store_receive,
                        dept_name: val.dept_name,
                        dept_type: val.dept_type


                    }
                    return obj
                })
                setGetAllDAta(datas)

            } else {
                warningNotify("No CRF For Pending")
            }
        }
        const DeptsecBasedOnAssign = async (id) => {
            const result = await axioslogin.get(`/InchHODAuthorization/getDeptSeconHod/${id}`)
            return result.data
        }

        DeptsecBasedOnAssign(id).then((val) => {
            const { success, data } = val
            if (success === 1) {
                setAuthorizDeptSec(data)
                const inchdeptsec = data && data.map((val) => val.dept_section)
                getReqDeptsecList(inchdeptsec);
            }
            else {
                setAuthorizDeptSec([])
            }
        })
    }, [id, count])

    const [ApprovalFlag, setApprovalFlag] = useState(0)
    const [ApprovalModal, setApprovalModal] = useState(false)
    const [ApprovalData, setApprovalData] = useState([])

    const [cancelFlag, setCancelFlag] = useState(0)
    const [cancelModal, setCancelModal] = useState(false)
    const [cancelData, setCancelData] = useState([])

    const [DetailViewFlag, setDetailViewFlag] = useState(0)
    const [DetailViewModal, setDetailViewModal] = useState(false)
    const [DetailViewData, setDetailViewData] = useState([])

    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [imageSlno, setImageSlno] = useState(0)
    const [imagearray, setImageArry] = useState([])

    const [CloseFlag, setCloseFlag] = useState(0)
    const [CloseModal, setCloseModal] = useState(false)
    const [CloseData, setCloseData] = useState([])

    useEffect(() => {
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                });

                setImageArry(fileUrls);
            }
        }
        if (imageshowFlag === 1) {
            getImage(imageSlno)
        }
    }, [imageshowFlag, imageSlno])


    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
        setImageSlno(0)
        setImageArry([])
    }, [])

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])

    const searchDeptSec = useCallback(() => {
        setSearchFlag(1)
    }, [])

    useEffect(() => {
        if (serachFlag === 1) {
            const searchfildataPend = getAllDta && getAllDta.filter((value) => value.user_deptsec === deptSec)
            setPendingData(searchfildataPend)
            const searchfildataDone = getAllDta && getAllDta.filter((value) => value.user_deptsec === deptSec)
            setDoneData(searchfildataDone)

        } else {
            const pendingList = getAllDta.filter((val) => {
                return val.hod_approve === null && val.manag_operation_approv === null &&
                    val.senior_manage_approv === null && val.gm_approve === null &&
                    val.ed_approve === null && val.md_approve === null &&
                    (val.dms_req === 1 && val.dms_approve === null ||
                        val.dms_req === 0 && val.dms_approve === null)
            })

            if (pendingList.length !== 0) {
                setPendingData(pendingList)
            }
            else {
                setPendingData([])
                //warningNotify("No CRF For Pending")
            }
            const DoneList = getAllDta?.filter((val) => {
                return val.hod_approve !== null || val.manag_operation_approv !== null ||
                    val.senior_manage_approv !== null || val.gm_approve !== null ||
                    val.ed_approve !== null || val.md_approve !== null || val.hod_approve === null
            })
            setDoneData(DoneList)
        }
    }, [serachFlag, getAllDta, deptSec])

    return (
        <Fragment>
            <ToastContainer />
            {DetailViewFlag === 1 ? <HigherAppDoneModal
                open={DetailViewModal} setDetailViewModal={setDetailViewModal}
                DetailViewData={DetailViewData} setDetailViewData={setDetailViewData}
                setDetailViewFlag={setDetailViewFlag} user={1}
            /> : null}
            {cancelFlag === 1 ? <HodCancel open={cancelModal} setCancelData={setCancelData}
                setCancelFlag={setCancelFlag} setCancelModal={setCancelModal}
                count={count} setCount={setCount} cancelData={cancelData} /> : null}

            {ApprovalFlag === 1 ? <CrmHodApprovalModal open={ApprovalModal} ApprovalData={ApprovalData}
                setApprovalModal={setApprovalModal} setApprovalFlag={setApprovalFlag}
                count={count} setCount={setCount} setApprovalData={setApprovalData} /> : null}

            {imageshowFlag === 1 ? <ReqImageDisModal open={imageshow} handleClose={handleClose}
                images={imagearray} /> : null}

            {CloseFlag === 1 ? <ClosedDetailsModal open={CloseModal} CloseData={CloseData}
                setCloseData={setCloseData} setCloseModal={setCloseModal} setCloseFlag={setCloseFlag} /> : null}

            <Box sx={{ height: 35, backgroundColor: "#f0f3f5", display: 'flex' }}>
                <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>HOD Approval</Box>
                <Box>
                    <CusIconButton size="sm" variant="outlined" color="primary" onClick={backtoSetting} >
                        <CloseIcon fontSize='small' />
                    </CusIconButton>
                </Box>
            </Box>

            <Paper >
                <Box sx={{
                    width: "100%",
                    pl: 1, pt: 0.5, pr: 1, pb: 0.5, flex: 1,
                    display: "flex",
                    flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    justifyContent: 'center',
                }}>

                    <Box sx={{ width: "25%", pr: 1, mt: 1 }}>
                        <FormControl fullWidth size="small"  >
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={deptSec}
                                onChange={(e) => setdeptSec(e.target.value)}
                                size="small"
                                fullWidth
                                variant='outlined'
                                sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                            >
                                <MenuItem value={0} disabled >Select Department Section</MenuItem>
                                {
                                    authorizeDeptSec && authorizeDeptSec.map((val, index) => {
                                        return <MenuItem key={index} value={val.dept_section}>{val.auth_deptsec}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ width: "5%", pr: 1, mt: 1, pl: 1 }}>
                        <Tooltip title="search" placement="top">
                            <SearchIcon onClick={() => searchDeptSec()} />
                        </Tooltip>
                    </Box>
                    <Box sx={{ width: "10%", pr: 1, mt: 1 }}>
                        <CusCheckBox
                            label="Pending"
                            color="danger"
                            size="md"
                            name="pending"
                            value={pending}
                            checked={pending}
                            onCheked={updatependng}
                        />
                    </Box>
                    <Box sx={{ width: "13%", mt: 1 }}>
                        <CusCheckBox
                            label="All List"
                            color="danger"
                            size="md"
                            name="done"
                            value={done}
                            checked={done}
                            onCheked={updatedone}
                        />
                    </Box>
                    <Box sx={{ width: "10%", mt: 1 }}>
                        <CusCheckBox
                            label="Closed"
                            color="danger"
                            size="md"
                            name="closed"
                            value={closed}
                            checked={closed}
                            onCheked={updateClosed}
                        />
                    </Box>
                </Box>
            </Paper>

            <Box sx={{ height: window.innerHeight - 150, overflow: 'auto', }}>
                {check === 2 ?
                    <Box sx={{ width: "100%" }}>

                        {donedata && donedata.map((val) => {
                            return <Box key={val.req_slno} sx={{ width: "100%", }}>
                                <Paper sx={{
                                    width: '100%',
                                    mt: 0.8,
                                    border: "2 solid #272b2f",
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    boxShadow: 1,
                                    backgroundColor: '#BBBCBC'
                                }} variant='outlined'>
                                    <MasterDetailCompnt val={val} />
                                    <ApproveButtonsCompnt val={val} setApprovalFlag={setApprovalFlag}
                                        setApprovalModal={setApprovalModal} setCancelFlag={setCancelFlag}
                                        setCancelModal={setCancelModal} setApprovalData={setApprovalData}
                                        setCancelData={setCancelData} setDetailViewFlag={setDetailViewFlag}
                                        setDetailViewData={setDetailViewData} setDetailViewModal={setDetailViewModal}
                                        setImageShowFlag={setImageShowFlag} setImageShow={setImageShow}
                                        setImageSlno={setImageSlno}
                                    />
                                </Paper>
                            </Box>
                        })}
                    </Box>

                    :
                    check === 3 ?
                        <Box sx={{ width: "100%" }}>

                            {closedata && closedata.map((val) => {
                                return <Box key={val.req_slno} sx={{ width: "100%", }}>
                                    <Paper sx={{
                                        width: '100%',
                                        mt: 0.8,
                                        border: "2 solid #272b2f",
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        boxShadow: 1,
                                        backgroundColor: '#BBBCBC'
                                    }} variant='outlined'>
                                        <MasterDetailCompnt val={val} />
                                        <ClosedButtonCompnt val={val} setCloseFlag={setCloseFlag}
                                            setCloseModal={setCloseModal} setCloseData={setCloseData}
                                        />
                                    </Paper>
                                </Box>
                            })}
                        </Box> :
                        <Box>
                            {pendingData && pendingData.map((val) => {
                                return <Box key={val.req_slno} sx={{ width: "100%", }}>
                                    <Paper sx={{
                                        width: '100%',
                                        mt: 0.8,
                                        border: "2 solid #272b2f",
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        boxShadow: 1,
                                        backgroundColor: '#BBBCBC'
                                    }} variant='outlined'>
                                        <MasterDetailCompnt val={val} />
                                        <ApproveButtonsCompnt val={val} setApprovalFlag={setApprovalFlag}
                                            setApprovalModal={setApprovalModal} setCancelFlag={setCancelFlag}
                                            setCancelModal={setCancelModal} setApprovalData={setApprovalData}
                                            setCancelData={setCancelData} setDetailViewFlag={setDetailViewFlag}
                                            setDetailViewData={setDetailViewData} setDetailViewModal={setDetailViewModal}
                                            setImageShowFlag={setImageShowFlag} setImageShow={setImageShow}
                                            setImageSlno={setImageSlno}
                                        />
                                    </Paper>
                                </Box>
                            })}
                        </Box>
                }
            </Box>
        </Fragment>
    )
}

export default memo(CrfHodApproval)