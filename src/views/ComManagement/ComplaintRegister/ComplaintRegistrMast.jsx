
import { Box, Grid, Paper, IconButton, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState, useMemo, Fragment } from 'react'
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
import CustomPaperTitle from '../../Components/CustomPaperTitle'
import RequestTypeTitle from 'src/views/Components/RequestTypeTitle'
import ComplaintDeptTitle from 'src/views/Components/ComplaintDeptTitle'
import PrioritycmpTitle from 'src/views/Components/PrioritycmpTitle'
import ComplaintTypeTitle from 'src/views/Components/ComplaintTypeTitle'
import ComplaintDescriptionTitle from 'src/views/Components/ComplaintDescriptionTitle'
import HicpolicyTitle from 'src/views/Components/HicpolicyTitle'
import HicypolicygrpsTitle from 'src/views/Components/HicypolicygrpsTitle'
import CropSquareIcon from '@mui/icons-material/CropSquare';
import LocationSelect from 'src/views/CommonSelectCode/LocationSelect'

const ComplaintRegistrMast = () => {
    /*** Initializing */
    const history = useHistory();
    //state for hic checkbox
    const [hic, setHic] = useState(0)
    //state for critical checkbox
    const [crical, setCritical] = useState(false)
    //state for high checkbox
    const [high, setHigh] = useState(false)
    //state for medium checkbox
    const [medium, setMedium] = useState(false)
    //state for complaint priority
    const [priority, setpriority] = useState(0)
    //state for table rendering
    const [count, setCount] = useState(0)
    //state for knowing insert or edit to database
    const [value, setValue] = useState(0)
    //state for complaintdescription
    const [desc, setdesc] = useState('')
    //state for request type
    const [ReqType, setReqType] = useState(false)
    //state for complaint type
    const [cotype, setcotype] = useState(false)
    //state for complaint department
    const [codept, setcodept] = useState(null)
    //state for getting depsection of employee
    const [sec, setsec] = useState(0)
    //state for dep section select box
    const [depsec, setDepsec] = useState(0)
    const [locationName, setlocationName] = useState("");
    const [complaint, setComplaint] = useState({
        complaint_slno: 0
    })
    //redux for geting login id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const dispatch = useDispatch();
    //dispatching redux data hic,complaintype,requestype,complaintdept
    useEffect(() => {
        dispatch(getHicpolicy());
        dispatch(getComplaintDept());
        dispatch(getRequesttype());
        if (codept !== null) {
            dispatch(getComplainttype(codept));
        }
        dispatch(setLoginProfileData(id))
    }, [dispatch, id, codept,])
    //getting deptsection
    const deptsec = useSelector((state) => {
        return state.getLoginProfileData.loginProfiledata
    })
    //setting employee dept sec in a state
    useEffect(() => {
        if (deptsec.length !== 0) {
            setsec(deptsec[0].em_dept_section);
        }
    }, [deptsec])
    // getting redux data state
    const state = useSelector((state) => {
        return {
            complaintdeptdata: state.getComplaintDept.complaintdeptList || 0,
            requesttypedata: state.getRequesttype.requesttypeList || 0,
            complainttype: state.getComplainttype.complainttypeList || 0,
            hicpolicy: state.getHicpolicy.hicpolicyList || 0,
        }
    })
    //destructuring redux data
    const { complaintdeptdata, requesttypedata, complainttype, hicpolicy, } = state
    const { complaint_slno } = complaint
    //function for complaint description state updation
    const complintdesc = useCallback((e) => {
        setdesc(e.target.value)
    }, [])
    /*** Priority seting Check box */
    //fn for critical state updation
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
    //fn for critical state updation
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
    //fn for medium state updation
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

    //insert data
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
            cm_location: depsec,
            create_user: id,
            locationName: locationName,
            priority: priority === 1 ? "Critical" : priority === 2 ? "High" : priority === 3 ? "Medium" : null
        }
    }, [desc, sec, ReqType, cotype, depsec, hic, priority, codept, id, locationName])

    //Data set for edit
    const rowSelect = useCallback((params) => {
        setValue(1);
        const data = params.api.getSelectedRows()
        const { complaint_typeslno, complaint_dept_secslno, complaint_hicslno, hic_policy_status,
            compalint_priority, cm_location,
            complaint_request_slno, complaint_deptslno, complaint_slno, complaint_desc, id } = data[0];
        const frmdata = {
            create_user: id,
            complaint_slno: complaint_slno
        }
        setDepsec(cm_location)
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
    //update data
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
            cm_location: depsec,
            edit_user: id,
            complaint_slno: complaint_slno
        }
    }, [desc, sec, ReqType, depsec, codept, cotype, priority, hic, complaint_slno, id])
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
            setDepsec(0)
            setcodept(null)
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
                infoNotify(message);
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
        history.push('/Home')
    }, [history])
    //fn for entire state referesh
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
        setDepsec(0)
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
            title="Ticket Registration"
            submit={submitComplaint}
            close={backtoSetting}
            refresh={refreshWindow}
        >
            <Box sx={{ width: "100%" }}>
                <Paper square elevation={3} sx={{ p: 1 }} >
                    {/* 1st section starts */}
                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
                    }}>
                        <Box sx={{
                            display: 'flex',
                            width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                        }} >
                            <Paper sx={{
                                width: '100%',
                                mt: 0.8,
                            }} square elevation={1}>
                                <RequestTypeTitle />
                                <Grid container
                                    // spacing={{ xs: 1, md: 1, md: 1, lg: 0.8, xl: 0.8 }}
                                    columns={{ xs: 1, sm: 8, md: 8, lg: 8, xl: 12 }}
                                    sx={{ width: '100%', textTransform: "capitalize", p: 1 }} >
                                    {
                                        requesttypedata && requesttypedata.map((value, index) => {
                                            return <Grid item xs={2} sm={4} md={4} lg={2} xl={3} key={value.req_type_slno}>
                                                <ComplaintCheckBox
                                                    label={value.req_type_name}
                                                    name={value.req_type_name}
                                                    value={value.req_type_slno}
                                                    onChange={setReqType}
                                                    checkedValue={ReqType}
                                                />
                                            </Grid>
                                        })
                                    }
                                </Grid>
                            </Paper>
                            {/* complaint dept starts here */}
                            <Paper sx={{
                                width: '100%',
                                mt: 0.8, ml: 0.8
                            }} square elevation={1}>
                                <ComplaintDeptTitle />
                                <Box sx={{
                                    display: 'flex',
                                }}>
                                    <Grid container
                                        // spacing={{ xs: 1, md: 1, md: 1, lg: 0.8, xl: 0.8 }}
                                        columns={{ xs: 1, sm: 8, md: 8, lg: 8, xl: 12 }}
                                        sx={{ width: '100%', textTransform: "capitalize", p: 1 }} >
                                        {
                                            complaintdeptdata && complaintdeptdata.map((val) => {
                                                return <Grid item xs={2} sm={4} md={4} lg={2} xl={3} key={val.complaint_dept_slno}>
                                                    <ComplaintCheckBox
                                                        label={val.complaint_dept_name}
                                                        name={val.complaint_dept_name}
                                                        value={val.complaint_dept_slno}
                                                        onChange={setcodept}
                                                        checkedValue={codept}
                                                    />
                                                </Grid>
                                            })
                                        }
                                    </Grid>
                                </Box>
                            </Paper>
                        </Box>
                    </Box>
                    {/* 1st section ends */}
                    {/* 2nd section */}
                    <Paper square elevation={1} sx={{
                        display: "flex",
                        // width: "100%",
                        width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                        mt: 1,
                    }}>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
                        }}>
                            <Box sx={{
                                display: 'flex',
                                width: { xs: '100%', sm: '100%', md: '30%', lg: '100%', xl: '100%', },
                            }} >
                                <Paper sx={{
                                    width: '100%',
                                    mt: 0.8
                                }} square elevation={1}>
                                    <PrioritycmpTitle />
                                    <Box sx={{
                                        display: 'flex',
                                        // p: 1.5,
                                        justifyContent: 'space-between',
                                        width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                                    }}>
                                        <Grid container
                                            // spacing={{ xs: 1, md: 1, md: 1, lg: 0.8, xl: 0.8 }}
                                            columns={{ xs: 1, sm: 8, md: 8, lg: 8, xl: 12 }}
                                            sx={{ width: '100%', textTransform: "capitalize", p: 1 }} >
                                            <Grid item xs={2} sm={4} md={4} lg={2} xl={3} >
                                                <CusCheckBox
                                                    variant="outlined"
                                                    color="danger"
                                                    size="md"
                                                    name="crical"
                                                    label="Critical"
                                                    value={crical}
                                                    onCheked={getCritical}
                                                    checked={crical}
                                                />
                                            </Grid>
                                            <Grid item xs={2} sm={4} md={4} lg={2} xl={3} >
                                                <CusCheckBox
                                                    variant="outlined"
                                                    color="danger"
                                                    size="md"
                                                    name="high"
                                                    label="High"
                                                    value={high}
                                                    onCheked={getHigh}
                                                    checked={high}
                                                />
                                            </Grid>
                                            <Grid item xs={2} sm={4} md={4} lg={2} xl={3} >
                                                <CusCheckBox
                                                    variant="outlined"
                                                    color="danger"
                                                    size="md"
                                                    name="medium"
                                                    label="Medium"
                                                    value={medium}
                                                    onCheked={getMedium}
                                                    checked={medium}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Box>
                            {/* complaint type starts here */}
                            <Box sx={{
                                display: 'flex',
                                width: '100%'
                            }} >
                                {
                                    codept !== null ? <Fragment>
                                        <Box sx={{
                                            width: "100%",
                                        }}>
                                            <ComplaintTypeTitle />

                                            <Box sx={{
                                                display: 'flex',
                                                width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                                            }} >
                                                <Grid container
                                                    // spacing={{ xs: 1, md: 1, md: 1, lg: 0.8, xl: 0.8 }}
                                                    columns={{ xs: 1, sm: 8, md: 8, lg: 8, xl: 12 }}
                                                    sx={{ width: '100%', textTransform: "capitalize", p: 1 }} >
                                                    {complainttype && complainttype.map((val) => {
                                                        return <Grid item xs={2} sm={4} md={4} lg={2} xl={3} key={val.complaint_type_slno}>
                                                            <ComplaintCheckBox
                                                                label={val.complaint_type_name}
                                                                name={val.complaint_type_name}
                                                                value={val.complaint_type_slno}
                                                                onChange={setcotype}
                                                                checkedValue={cotype}
                                                            />
                                                        </Grid>
                                                    })
                                                    }
                                                </Grid>
                                            </Box>
                                        </Box>
                                    </Fragment> : null
                                }
                            </Box>
                            {/* complaint type ends here */}
                        </Box>
                    </Paper>
                    {/* hic policy section */}
                    <Paper square elevation={1} sx={{
                        display: "flex",
                        width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                        mt: 1,
                    }}>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
                        }}>
                            <Box sx={{
                                display: 'flex',
                                width: { xs: '100%', sm: '100%', md: '30%', lg: '100%', xl: '100%', },
                            }} >



                                <Paper sx={{
                                    width: '100%',
                                    mt: 0.8
                                }} square elevation={1}>
                                    <CustomPaperTitle heading='Location' />
                                    <Paper sx={{
                                        p: 1,
                                        width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%' }
                                    }} >
                                        <LocationSelect value={depsec} setValue={setDepsec} setName={setlocationName} />
                                    </Paper>

                                </Paper>


                                <Paper sx={{
                                    width: '100%',
                                    mt: 0.8
                                }} square elevation={1}>
                                    <HicpolicyTitle />
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                                    }}>
                                        <Grid container
                                            // spacing={{ xs: 1, md: 1, md: 1, lg: 0.8, xl: 0.8 }}
                                            columns={{ xs: 1, sm: 8, md: 8, lg: 8, xl: 12 }}
                                            sx={{ width: '100%', textTransform: "capitalize", p: 1 }} >
                                            <Grid item xs={2} sm={4} md={4} lg={2} xl={3} >
                                                <CusCheckBox
                                                    variant="outlined"
                                                    color="danger"
                                                    size="md"
                                                    name="Hic"
                                                    label="Hic"
                                                    value={checkHic}
                                                    onCheked={getHicCheck}
                                                    checked={checkHic}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Box>
                            {/* complaint type starts here */}
                            <Box sx={{
                                display: 'flex',
                                width: '100%'
                            }} >
                                {
                                    checkHic === false ? null : <Fragment>
                                        <Box sx={{
                                            width: "100%",
                                        }}>
                                            <HicypolicygrpsTitle />

                                            <Box sx={{
                                                display: 'flex',
                                                width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                                            }} >
                                                <Grid container
                                                    // spacing={{ xs: 1, md: 1, md: 1, lg: 0.8, xl: 0.8 }}
                                                    columns={{ xs: 1, sm: 8, md: 8, lg: 8, xl: 12 }}
                                                    sx={{ width: '100%', textTransform: "capitalize", p: 1 }} >
                                                    {
                                                        hicpolicy && hicpolicy.map((val) => {
                                                            return <Grid item xs={2} sm={4} md={4} lg={2} xl={3} key={val.hic_policy_slno}>
                                                                <ComplaintCheckBox
                                                                    label={val.hic_policy_name}
                                                                    name={val.hic_policy_name}
                                                                    value={val.hic_policy_slno}
                                                                    onChange={setHic}
                                                                    checkedValue={hic}
                                                                />
                                                            </Grid>
                                                        })
                                                    }
                                                </Grid>
                                            </Box>
                                        </Box>
                                    </Fragment>
                                }
                            </Box>
                            {/* complaint type ends here */}
                        </Box>
                    </Paper>
                    {/* 3rd section */}
                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                    }}>
                        <Box sx={{
                            display: 'flex',
                            width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                        }} >
                            <Box sx={{
                                width: '100%',
                                mt: 0.8
                            }}>
                                <Paper square elevation={1} sx={{
                                    mt: 1,
                                }}>
                                    <ComplaintDescriptionTitle />
                                    <Box sx={{
                                        display: 'flex',
                                        p: 0.5,
                                        width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                                    }} >
                                        <CustomTextarea
                                            placeholder="complaint descrition"
                                            required
                                            type="text"
                                            size="sm"
                                            style={{
                                                width: "100%",
                                                height: 70,
                                            }}
                                            value={desc}
                                            onchange={complintdesc}
                                        />
                                    </Box>
                                </Paper>
                            </Box>

                        </Box>
                        {/* 4th section */}
                    </Box>
                </Paper>
            </Box>
            < Paper square elevation={0} sx={{
                p: 1, pt: 0
            }} >
                <ComplaintRegTable
                    rowSelect={rowSelect} sec={sec} count={count} setCount={setCount} />
            </Paper >

            <Paper square sx={{
                display: "flex",
                p: 1,
                alignItems: "center",
            }}  >
                <Box sx={{ display: "flex" }}>
                    <IconButton >
                        <CropSquareIcon sx={{ background: '#f44336', pr: 5 }} />
                    </IconButton>
                </Box>
                <Box sx={{ display: "flex", width: "98%", fontWeight: 400, pl: 2 }}>
                    <Typography >
                        Priority Critical
                    </Typography>
                </Box>
            </Paper>
        </CardMaster>
    )
}
export default ComplaintRegistrMast
