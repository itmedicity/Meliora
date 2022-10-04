
import { Box, Paper, } from '@mui/material'
import React, { useCallback, useEffect, useState, useMemo } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getComplaintDept } from 'src/redux/actions/ComplaintDept.action'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { getRequesttype } from 'src/redux/actions/RequestType.action';
import { getComplainttype } from 'src/redux/actions/ComplaintType.action';
import CustomTextarea from 'src/views/Components/CustomTextarea'
import { getHicpolicy } from 'src/redux/actions/HicPolicy.action'
import ComplaintRegTable from './ComplaintRegTable'
import { setLoginProfileData } from 'src/redux/actions/LoginProfile.action'
import ComplaintCheckBox from './ComplaintCheckBox'


// import {getLoginProfileData} from '../../../redux/reducers/1'
const ComplaintRegistrMast = () => {
    /*** Initializing */
    const history = useHistory();
    const [hic, setHic] = useState(0)
    const [crical, setCritical] = useState(false)
    const [high, setHigh] = useState(false)
    const [medium, setMedium] = useState(false)
    const [priority, setpriority] = useState(0)
    const [count, setCount] = useState(0)
    const [value, setValue] = useState(0)
    const [desc, setdesc] = useState('')
    const [ReqType, setReqType] = useState(false)
    const [cotype, setcotype] = useState(false)
    const [codept, setcodept] = useState(false)
    const [sec, setsec] = useState(0)
    const [complaint, setComplaint] = useState({
        complaint_slno: 0

    })

    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getHicpolicy());
        dispatch(getComplaintDept());
        dispatch(getRequesttype());
        dispatch(getComplainttype(codept));
        dispatch(setLoginProfileData(id))
    }, [dispatch, id, codept,])

    const deptsec = useSelector((state) => {
        return state.getLoginProfileData.loginProfiledata
    })
    useEffect(() => {
        if (deptsec.length !== 0) {

            setsec(deptsec[0].em_dept_section);
        }
    }, [deptsec])

    const state = useSelector((state) => {
        return {
            complaintdeptdata: state.getComplaintDept.complaintdeptList || 0,
            requesttypedata: state.getRequesttype.requesttypeList || 0,
            complainttype: state.getComplainttype.complainttypeList || 0,
            hicpolicy: state.getHicpolicy.hicpolicyList || 0,
        }
    })

    const { complaintdeptdata, requesttypedata, complainttype, hicpolicy, } = state
    /*** Destructuring */
    const { complaint_slno } = complaint

    const complintdesc = useCallback((e) => {
        setdesc(e.target.value)
    }, [])
    /*** Priority seting Check box */
    const getCritical = useCallback((e) => {
        if (e.target.checked === true) {
            setCritical(true)
            setpriority(1)
            setHigh(false)
            setMedium(false)
        }
        else {
            setCritical(false)
            setHigh(false)
            setMedium(false)
            setpriority(0)
        }
    }, [])
    const getHigh = useCallback((e) => {
        if (e.target.checked === true) {
            setHigh(true)
            setpriority(2)
            setCritical(false)
            setMedium(false)
        }
        else {
            setHigh(false)
            setCritical(false)
            setMedium(false)
            setpriority(0)
        }
    }, [])
    const getMedium = useCallback((e) => {
        if (e.target.checked === true) {
            setMedium(true)
            setpriority(3)
            setHigh(false)
            setCritical(false)
        }
        else {
            setMedium(false)
            setHigh(false)
            setCritical(false)
            setpriority(0)
        }
    }, [])
    const [checkHic, setChechHic] = useState(false)
    const getHicCheck = useCallback((e) => {
        if (e.target.checked === true) {
            setChechHic(true)
        }
        else {
            setChechHic(false)
        }
    }, [])

    const postdata = useMemo(() => {
        return {
            complaint_desc: desc,
            complaint_dept_secslno: sec,
            complaint_request_slno: ReqType,
            complaint_deptslno: codept,
            complaint_typeslno: cotype,
            compalint_priority: priority,
            complaint_hicslno: hic !== 0 ? hic : null,
            compalint_status: 0,
            create_user: id
        }
    }, [desc, sec, ReqType, cotype, hic, priority, codept, id])
    //Data set for edit
    const rowSelect = useCallback((params) => {
        setValue(1);
        const data = params.api.getSelectedRows()
        const { complaint_typeslno, complaint_dept_secslno, complaint_hicslno, hic_policy_status,
            compalint_priority,
            complaint_request_slno, complaint_deptslno, complaint_slno, complaint_desc, id } = data[0];
        const frmdata = {
            create_user: id,
            complaint_slno: complaint_slno
        }
        setComplaint(frmdata)
        setsec(complaint_dept_secslno)
        setReqType(complaint_request_slno)
        setcotype(complaint_typeslno)
        setHic(complaint_hicslno)
        setChechHic(hic_policy_status === 1 ? true : false)
        setpriority(compalint_priority)
        setcodept(complaint_deptslno)
        setdesc(complaint_desc)
        if (compalint_priority === 1) {
            setCritical(true)
            setHigh(false)
            setMedium(false)
        } else if (compalint_priority === 2) {
            setHigh(true)
            setCritical(false)
            setMedium(false)
        }
        else if (compalint_priority === 3) {
            setMedium(true)
            setCritical(false)
            setHigh(false)
        } else {
            setCritical(false)
            setHigh(false)
            setMedium(false)
        }
    }, [])

    const patchdata = useMemo(() => {
        return {
            complaint_desc: desc,
            complaint_dept_secslno: sec,
            complaint_request_slno: ReqType,
            complaint_deptslno: codept,
            complaint_typeslno: cotype,
            compalint_priority: priority,
            complaint_hicslno: hic,
            compalint_status: 0,
            create_user: id,
            complaint_slno: complaint_slno
        }
    }, [desc, sec, ReqType, codept, cotype, priority, hic, complaint_slno, id])

    /*** usecallback function for form submitting */
    const submitComplaint = useCallback((e) => {
        e.preventDefault();
        const resetFrorm = {

            complaint_slno: 0,
        }
        const reset = () => {

            setsec(false)
            setReqType(false)
            setcotype(false)
            setHic(0)
            setChechHic(false)
            setpriority(false)
            setcodept(false)
            setCritical(false)
            setHigh(false)
            setMedium(false)
            setdesc('')
        }

        /***    * insert function for use call back     */
        const InsertFun = async (postdata) => {
            const result = await axioslogin.post('/complaintreg', postdata);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                setComplaint(resetFrorm);
                reset()
            } else if (success === 0) {
                infoNotify(message.sqlMessage);
            }
            else {
                infoNotify(message)
            }
        }

        /***  * update function for use call back     */
        const updateFun = async (patchdata) => {
            const result = await axioslogin.patch('/complaintreg', patchdata);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1);
                setComplaint(resetFrorm);
                reset()

            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }

        if (value === 0) {
            InsertFun(postdata)
        }
        else {

            updateFun(patchdata)
        }


    }, [postdata, value, patchdata, count])



    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    const refreshWindow = useCallback(() => {
        const formreset = {
            complaint_slno: ''
        }
        setComplaint(formreset)
        setValue(0);
        setsec(false)
        setReqType(false)
        setcotype(false)
        setHic(0)
        setChechHic(false)
        setpriority(false)
        setcodept(false)
        setdesc(false)
        setCritical(false)
        setHigh(false)
        setMedium(false)
        setdesc('')
    }, [])

    return (
        <CardMaster
            title="Complaint Registration"
            submit={submitComplaint}
            close={backtoSetting}
            refresh={refreshWindow}
        >
            <Paper square elevation={3} sx={{
                display: "flex",
                flex: 3,
                justifyContent: "space-evenly",
                px: 2,
                py: 1,
                width: { xl: "100%", lg: "100%", md: "100%" }
            }}>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: { xl: "column", lg: "column", md: "column", sm: 'row', xs: "row" },
                    justifyContent: "flex-start",

                }}>
                    {/* First Row Start */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                            width: "100%",
                            flexWrap: "nowrap",
                        }}>
                        {/* first box start */}
                        <Paper variant="outlined" square sx={{
                            px: 2, pr: 2,
                            display: "flex",
                            textTransform: 'capitalize',
                            flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                            justifyContent: "space-between",
                            width: { xl: "45%", lg: "45%", md: "45%", }
                        }}  >
                            {
                                requesttypedata && requesttypedata.map((value, index) => {
                                    return <Box sx={{
                                        pt: 1, pb: 1,
                                        justifyContent: 'space-between',
                                        // width: "100%",
                                        width: { xl: "100%", lg: "100%", md: "100%" }
                                    }}
                                        key={value.req_type_slno
                                        }
                                    >
                                        <ComplaintCheckBox
                                            label={value.req_type_name}
                                            name={value.req_type_name}
                                            value={value.req_type_slno}
                                            onChange={setReqType}
                                            checkedValue={ReqType}
                                        />
                                    </Box>
                                })
                            }
                        </Paper>
                        {/* first box end */}

                        <Box sx={{ display: "flex", width: "100%" }}>

                            {/* Second box start */}
                            <Paper variant="outlined" square sx={{
                                width: "60%",
                                display: "flex",
                                flex: 1,
                                justifyContent: "center",
                                textTransform: 'capitalize',
                            }}
                            >
                                {complaintdeptdata && complaintdeptdata.map((val) => {
                                    return <Box
                                        sx={{
                                            display: "flex",
                                            // justifyContent: "space-evenly",
                                            flex: 3,
                                            pt: 1,
                                            px: 2,
                                            width: { xl: "70%", lg: "70%", md: "80%", sm: "100%", xs: "100%" },
                                            // width: "100%",
                                        }}
                                        key={val.complaint_dept_slno}
                                    >
                                        <ComplaintCheckBox
                                            label={val.complaint_dept_name}
                                            name={val.complaint_dept_name}
                                            value={val.complaint_dept_slno}
                                            onChange={setcodept}
                                            checkedValue={codept}
                                        />
                                    </Box>
                                })
                                }
                            </Paper>
                            {/* Second box end */}
                        </Box>
                    </Box>
                    {/* First Row Start */}

                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            width: "100%",

                        }}>
                        <Box sx={{ display: "flex" }}>

                            {/* display sub checkbox when clicked second start*/}
                            {
                                codept === 0 ? null :
                                    <Paper variant="outlined" square sx={{
                                        width: "60%",
                                        display: "flex",
                                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                                        justifyContent: "space-evenly",
                                    }}  >
                                        {complainttype && complainttype.map((val) => {
                                            return <Box sx={{
                                                pt: 1,
                                                // display: 'flex',
                                                flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                                                justifyContent: "space-evenly",
                                                pl: 2,
                                                textTransform: "capitalize",
                                                flexWrap: "wrap",
                                                width: { xl: 175, lg: 170, md: 170, }

                                            }}
                                                key={val.complaint_type_slno}
                                            >
                                                <ComplaintCheckBox
                                                    label={val.complaint_type_name}
                                                    name={val.complaint_type_name}
                                                    value={val.complaint_type_slno}
                                                    onChange={setcotype}
                                                    checkedValue={cotype}
                                                />
                                            </Box>
                                        })
                                        }
                                    </Paper>
                            }
                            {/* display sub checkbox when clicked second end*/}

                            <Box sx={{
                                display: "flex", width: "100%", justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Box sx={{
                                    pt: 1, pb: 1,
                                    display: 'flex',
                                    flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                                    px: 10,


                                    // p: 1,
                                    width: "100%"
                                }}
                                >
                                    <Box
                                        sx={{ pl: 2 }}
                                    >
                                        <CusCheckBox
                                            variant="outlined"
                                            color="success"
                                            size="md"
                                            name="crical"
                                            label="Critical"
                                            value={crical}
                                            onCheked={getCritical}
                                            checked={crical}
                                        />
                                    </Box>
                                    <Box
                                        sx={{ pl: 1 }}>
                                        <CusCheckBox
                                            variant="outlined"
                                            color="success"
                                            size="md"
                                            name="high"
                                            label="High"
                                            value={high}
                                            onCheked={getHigh}
                                            checked={high}
                                        />
                                    </Box>
                                    <Box sx={{ pl: 1 }}>
                                        <CusCheckBox
                                            variant="outlined"
                                            color="success"
                                            size="md"
                                            name="medium"
                                            label="Medium"
                                            value={medium}
                                            onCheked={getMedium}
                                            checked={medium}

                                        />

                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                <Box sx={{
                                    pt: 1, pb: 1, pl: 10,
                                    display: 'flex',
                                    flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                                    justifyContent: 'space-evenly',
                                }}>
                                    <CusCheckBox
                                        variant="outlined"
                                        color="success"
                                        size="md"
                                        name="Hic"
                                        label="Hic"
                                        value={checkHic}
                                        onCheked={getHicCheck}
                                        checked={checkHic}
                                    />


                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                    {
                        checkHic === false ? null :
                            <Paper variant="outlined" square sx={{
                                width: "100%",
                                px: 2, pl: 1, pb: 0,
                                display: "flex",
                                flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                                justifyContent: "space-between",

                            }}  >
                                {hicpolicy && hicpolicy.map((val) => {

                                    return <Box sx={{
                                        pt: 1,
                                        display: 'flex',
                                        flex: 1,
                                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                                        justifyContent: 'space-between',
                                        py: 1
                                    }}
                                        key={val.hic_policy_slno}
                                    >
                                        <ComplaintCheckBox
                                            label={val.hic_policy_name}
                                            name={val.hic_policy_name}
                                            value={val.hic_policy_slno}
                                            onChange={setHic}
                                            checkedValue={hic}
                                        />
                                    </Box>
                                })
                                }
                            </Paper>
                    }


                    <Paper sx={{
                        pt: 1,
                        display: 'flex',
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                        justifyContent: 'space-evenly',
                        // p: 1,
                        height: "100%",
                        // backgroundColor: "blue",
                        width: "100%"
                    }}>
                        <CustomTextarea
                            placeholder="complaint descrition"
                            required
                            type="text"
                            size="sm"
                            style={{
                                width: "100%", height: 70,
                            }}
                            value={desc}
                            onchange={complintdesc}
                        />
                    </Paper>
                </Box>
            </Paper >
            {/* </Box > */}
            < Paper square elevation={0} sx={{
                p: 2,
            }} >
                <ComplaintRegTable
                    rowSelect={rowSelect} sec={sec} count={count} />
            </Paper >
        </CardMaster >
    )
}

export default ComplaintRegistrMast






































