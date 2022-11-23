import React, { Fragment, useCallback, useEffect, useState } from 'react'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { IconButton, Paper } from '@mui/material';
import { editicon } from 'src/color/Color';
import ModalAssignComplaint from './ModalAssignComplaint';
import CardCloseOnly from 'src/views/Components/CardCloseOnly';
import { Box } from '@mui/material'
import { useHistory } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginProfileData } from 'src/redux/actions/LoginProfile.action'
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { format } from 'date-fns'
import AssistantNeedmodal from './AssistantNeedmodal';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import { getComplaintLists } from 'src/redux/actions/ComplaintLists.action';
import { getAssignedComplaintLists } from 'src/redux/actions/AssignedcmLists.action';
import { getAssistComplaintLists } from 'src/redux/actions/AssistcmLists.action';
import { getAllComplaintLists } from 'src/redux/actions/AllcomplaintsLists.action';
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain';
const AssignComplaintTable = () => {
    const history = useHistory();
    //state for modal open
    const [open, setOpen] = useState(false)
    // state for modal rendering
    const [ab, setAb] = useState(0);
    const [complaint, setComplaint] = useState([]);
    const [count, setCount] = useState(0)
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    //column title setting
    const [column] = useState([
        {
            headerName: 'Action', minWidth: 120, cellRenderer: params => <Fragment>

                <IconButton sx={{ color: editicon, paddingY: 0.5 }}
                    onClick={() => quickAssign(params)}>
                    <CustomeToolTip title="Quick Assign" >
                        <AssignmentTurnedInRoundedIcon />
                    </CustomeToolTip>
                </IconButton>
                <IconButton sx={{ color: editicon, paddingY: 0.5 }}
                    onClick={() => Assign(params)}>
                    <CustomeToolTip title="Detailed Assign" >
                        < AccessibilityNewIcon />
                    </CustomeToolTip>
                </IconButton>

            </Fragment>
        },
        { headerName: "SlNo", field: "complaint_slno" },
        {
            headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, width: 230,
            cellStyle: function (params) {
                if (params.data.cm_rectify_status === 'Z') {
                    return { color: 'red' };
                } else {
                    return null;
                }
            }
        },
        { headerName: "Department Section", field: "sec_name", autoHeight: true, filter: "true", wrapText: true, width: 220 },
        { headerName: "Request Type", field: "req_type_name", filter: "true", autoHeight: true, wrapText: true },
        { headerName: "Complaint Type", field: "complaint_type_name", filter: "true", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Priority", field: "priority", autoHeight: true, wrapText: true },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true },
        { headerName: "Hic Policy", field: "hic_policy_name", autoHeight: true, wrapText: true },
        {
            headerName: "Verification Remark", field: "verify_remarks1", autoHeight: true, wrapText: true, width: 250,
            cellStyle: function (params) {
                if (params.data.cm_rectify_status === 'Z') {
                    return { color: 'red' };
                } else {
                    return null;
                }
            }
        },
        { headerName: "Date & Time", field: "compalint_date", autoHeight: true, wrapText: true },

    ])
    // when we click on assign this wil show assigned each inviduals employess complaint
    const [assign] = useState([
        {
            headerName: 'Action', minWidth: 10,

            cellRenderer: params => {
                if (params.data.compalint_status === 2 || params.data.compalint_status === 3) {
                    return <IconButton disabled
                        sx={{ color: editicon, paddingY: 0.5 }}>
                        <CustomeToolTip title="Assistant Needed" >
                            < AccessibilityNewIcon />
                        </CustomeToolTip>
                    </IconButton>
                } else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }}
                        onClick={() => AssistantNeeded(params)}>
                        <CustomeToolTip title="Assistant Needed" >
                            < AccessibilityNewIcon />
                        </CustomeToolTip>
                    </IconButton>
                }
            }

        },
        { headerName: "SlNo", field: "complaint_slno", autoHeight: true, wrapText: true, minWidth: 10, },
        {
            headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, width: 270,
            cellStyle: (params) => {
                if (params.data.cm_rectify_status === 'Z') {
                    return { color: 'red' };
                } else {
                    return null;
                }
            }
        },
        { headerName: "Department Section", field: "sec_name", autoHeight: true, wrapText: true, filter: "true", width: 250 },
        { headerName: "Request Type", field: "req_type_name", filter: "true", autoHeight: true, wrapText: true },
        { headerName: "Complaint Type", field: "complaint_type_name", filter: "true", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Priority", field: "priority", autoHeight: true, wrapText: true },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true },
        { headerName: "Remark", field: "complaint_remark", autoHeight: true, wrapText: true },
        { headerName: "Date & Time", field: "assigned_date", autoHeight: true, wrapText: true },

    ])
    //when we click on all compalint this table  will show  
    const [alldata] = useState([
        { headerName: "SlNo", field: "complaint_slno", minWidth: 30 },
        {
            headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, width: 230,
            cellStyle: (params) => {
                if (params.data.cm_rectify_status === 'Z') {
                    return { color: 'red' };
                } else {
                    return null;
                }
            }
        },
        { headerName: "Department Section", field: "sec_name", filter: "true", autoHeight: true, wrapText: true, width: 220 },
        { headerName: "Request Type", field: "req_type_name", filter: "true", autoHeight: true, wrapText: true },
        { headerName: "Complaint Type", field: "complaint_type_name", filter: "true", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Priority", field: "priority", autoHeight: true, wrapText: true },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true },
        { headerName: "Hic Policy", field: "hic_policy_name", autoHeight: true, wrapText: true },
        {
            headerName: "Employee Name", field: "em_name", filter: true, autoHeight: true, wrapText: true,
            cellStyle: (params) => {
                if (params.data.cm_rectify_status === 'Z') {
                    return { color: 'red' };
                } else {
                    return null;
                }
            }
        },
        { headerName: "Req.Date", field: "compalint_date", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Assign Date", field: "assigned_date", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Complaint Status", field: "cm_rectify_status1", autoHeight: true, filter: true, wrapText: true }
    ])
    //When we click on assist this table  will show
    const [assitantaccept] = useState([
        {
            headerName: 'Assisted', minWidth: 120,
            cellRenderer: params => {
                if (params.data.assist_receive === 1) {
                    return <IconButton disabled
                        sx={{ color: editicon, paddingY: 0.5 }}>
                        <CustomeToolTip title="Assistant Accept" >
                            < DoneOutlinedIcon />
                        </CustomeToolTip>
                    </IconButton>
                } else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }}
                        onClick={() => AssistantAccepted(params)}>
                        <CustomeToolTip title="Assistant Accept" >
                            < DoneOutlinedIcon />
                        </CustomeToolTip>
                    </IconButton>
                }
            }

        },
        { headerName: "SlNo", field: "complaint_slno" },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, width: 280 },
        { headerName: "Department Section", field: "sec_name", filter: "true", autoHeight: true, wrapText: true, width: 250 },
        { headerName: "Request Type", field: "req_type_name", filter: "true", autoHeight: true, wrapText: true },
        { headerName: "Complaint Type", field: "complaint_type_name", filter: "true", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Priority", field: "priority", autoHeight: true, wrapText: true },
        { headerName: "Hic Policy", field: "hic_policy_name", autoHeight: true, wrapText: true },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true },
        { headerName: "Requested Employee", field: "em_name", autoHeight: true, filter: true, wrapText: true, width: 250 },
        { headerName: "Date & Time", field: "assist_assign_date", autoHeight: true, wrapText: true },

    ])
    const dispatch = useDispatch();
    //getting id
    useEffect(() => {
        dispatch(setLoginProfileData(id))
    }, [dispatch, id])
    //getting employees data
    const profileData = useSelector((state) => {
        return state.getLoginProfileData.loginProfiledata
    })
    //state for assigned check box
    const [assigned, setAssigned] = useState(false);
    //state for pending list check box
    const [pending, setPending] = useState(false);
    //flag for table rendering
    const [flag, setFlag] = useState(0)
    //state for assist checkbox
    const [assist, setAssist] = useState(false)
    //displaying complaints against the login users department
    useEffect(() => {
        if (profileData.length !== 0) {
            const { em_department } = profileData[0]
            dispatch(getComplaintLists(em_department))
            dispatch(getAssignedComplaintLists(id))
            dispatch(getAssistComplaintLists(id))
            dispatch(getAllComplaintLists(em_department))
        }
    }, [dispatch, profileData, id, count])
    //getting the dispatch data from redux state
    const state = useSelector((state) => {
        return {
            pendingcomplaints: state.getComplaintLists.complaintLists || 0,
            assignedcomplaints: state.getAssignedComplaintLists.assignedcmpLists || 0,
            assistcomplaints: state.getAssistComplaintLists.assistcmpLists || 0,
            allcomplaints: state.getAllComplaintLists.allcmpLists || 0
        }
    })
    //destructuring redux state
    const { pendingcomplaints, assignedcomplaints, assistcomplaints, allcomplaints } = state

    //for displaying the messages when there is no results in api
    useEffect(() => {
        const { pendingcomplaints, assignedcomplaints, assistcomplaints, allcomplaints } = state
        return assist === true && assistcomplaints.length === 0 ? infoNotify("No Results Found") : assigned === true && assignedcomplaints.length === 0
            ? infoNotify("No Results Found") : pending === true && pendingcomplaints.length === 0
                ? infoNotify("No Results Found") : allcomplaints === true && allcomplaints.length === 0 ? infoNotify("No Results Found") : null
    }, [flag, assist, assigned, pending, state])
    // when we click on quick assign button this function will run
    const quickAssign = useCallback((params) => {
        const { complaint_slno } = params.data
        const postData = {
            complaint_slno: complaint_slno,
            assigned_emp: id,
            assigned_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        }
        const getData = async (postData) => {
            const result = await axioslogin.post('/complaintassign', postData);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        getData(postData);
    }, [count, id])
    //when we click on detailed assign button a modal will open
    const Assign = useCallback((params) => {
        setAb(1)
        setBc(0)
        setOpen(true)
        const data = params.api.getSelectedRows()
        setComplaint(data)
    }, [])
    //state for data passing to assistant modal
    const [assistant, setAssistant] = useState([]);
    //flag for rendering assistant need modal
    const [bc, setBc] = useState(0);
    //assistant needed icon fun user click on this a modal will open
    const AssistantNeeded = useCallback((params) => {
        setBc(1)
        setAb(0)
        setOpen(true)
        const data = params.api.getSelectedRows()
        setAssistant(data);
    }, [])
    //assigned list check box updation
    const updateAssigned = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(1);
            setAssigned(true)
            setPending(false)
            setAll(false)
            setAssist(false)
        } else {
            setFlag(0);
            setAssigned(false)
        }
    }, [])
    //pending list check box updation
    const updatePending = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(2)
            setPending(true)
            setAssigned(false)
            setAll(false)
            setAssist(false)
        } else {
            setFlag(0)
            // setFlag(2)
            setPending(false)
        }
    }, [])
    const [all, setAll] = useState(false);
    //all complaint check box updation
    const updateCompall = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(3)
            setAll(true)
            setAssigned(false)
            setPending(false)
            setAssist(false)
        } else {
            setFlag(0)
            setAll(false)
        }
    }, [])

    //individual assit check box function
    const updateAssistant = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(4)
            setAssist(true)
            setAll(false)
            setAssigned(false)
            setPending(false)
        } else {
            setAssist(false)
            setFlag(0)
        }
    }, [])
    //function for assistant acception button clicks function in table
    const AssistantAccepted = useCallback((params) => {
        const { complaint_slno, } = params.data
        const postData = {
            assigned_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            assist_receive: 1,
            complaint_slno: complaint_slno,
            assigned_emp: id
        }
        const assistant = async (postData) => {
            const result = await axioslogin.patch('/complaintassign/assistant/recieved', postData);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        assistant(postData)
    }, [id, count])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        <Fragment>
            <CardCloseOnly
                title="Complaint Assigns"
                close={backtoSetting}
            >
                <Box sx={{ width: "100%", p: 1 }}>
                    <Paper square elevation={3} sx={{ p: 2 }} >
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                            justifyContent: "center"
                        }}>
                            <Box sx={{
                                display: 'flex',
                                width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                                mt: 1,
                                // bgcolor: "cyan",
                                justifyContent: "center"
                            }} >
                                <CusCheckBox
                                    label="Assigned List"
                                    color="danger"
                                    size="md"
                                    name="assigned"
                                    value={assigned}
                                    checked={assigned}
                                    onCheked={updateAssigned}
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                                mt: 1,
                            }} >
                                <CusCheckBox
                                    label="Pending List"
                                    color="danger"
                                    size="md"
                                    name="pending"
                                    value={pending}
                                    checked={pending}
                                    onCheked={updatePending}
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                                mt: 1,
                            }} >
                                <CusCheckBox
                                    label="Assist"
                                    color="danger"
                                    size="md"
                                    name="assist"
                                    value={assist}
                                    checked={assist}
                                    onCheked={updateAssistant}
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                                mt: 1,
                            }} >
                                <CusCheckBox
                                    label="All Complaint"
                                    color="danger"
                                    size="md"
                                    name="all"
                                    value={all}
                                    checked={all}
                                    onCheked={updateCompall}
                                />
                            </Box>
                        </Box>
                    </Paper>
                </Box>

                {
                    flag === 0 ?
                        <Box sx={{
                            p: 1,
                        }}>
                            <CusAgGridForMain
                                columnDefs={column}
                                tableData={pendingcomplaints}
                            />
                        </Box> : null
                }
                {
                    flag === 2 ? <Box sx={{ p: 1 }}>
                        <CusAgGridForMain
                            columnDefs={column}
                            tableData={pendingcomplaints}
                        />
                    </Box> : null
                }
                {
                    flag === 1 ? <Box sx={{ p: 1 }}>
                        <CusAgGridForMain
                            columnDefs={assign}
                            tableData={assignedcomplaints}
                        />
                    </Box> : null
                }
                {
                    flag === 3 ? <Box sx={{ p: 1 }}>
                        <CusAgGridForMain
                            columnDefs={alldata}
                            tableData={allcomplaints}
                        />
                    </Box> : null
                }
                {
                    flag === 4 ? <Box sx={{ p: 1 }}>
                        <CusAgGridForMain
                            columnDefs={assitantaccept}
                            tableData={assistcomplaints}
                        />
                    </Box> : null
                }
                {
                    ab === 1 ? <ModalAssignComplaint open={open} setOpen={setOpen} complaint={complaint} empdept={profileData} count={count} setCount={setCount} /> : null //detailed assign modal
                }
                {
                    bc === 1 ? <AssistantNeedmodal open={open} setOpen={setOpen} assistant={assistant} empdept={profileData} count={count} setCount={setCount} /> : null //assistant needed modal
                }

            </CardCloseOnly>
        </Fragment >
    )
}
export default AssignComplaintTable