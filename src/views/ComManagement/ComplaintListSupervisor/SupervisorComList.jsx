import React, { Fragment, useCallback, useEffect, useState } from 'react'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { IconButton, Paper } from '@mui/material';
import { editicon } from 'src/color/Color';
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
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import { getComplaintLists } from 'src/redux/actions/ComplaintLists.action';
import { getAssignedComplaintLists } from 'src/redux/actions/AssignedcmLists.action';
import { getAssistComplaintLists } from 'src/redux/actions/AssistcmLists.action';
import { getAllComplaintLists } from 'src/redux/actions/AllcomplaintsLists.action';
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ModalAssignComplaint from '../AssignComplaint/ModalAssignComplaint';
import AssistantNeedmodal from '../AssignComplaint/AssistantNeedmodal';
import TransferDeptmodal from '../AssignComplaint/TransferDeptmodal';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import EmployeeTrasfermodal from './EmployeeTrasfermodal';

const SupervisorComList = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    //state for modal open
    const [open, setOpen] = useState(false)
    //flag for table rendering
    const [flag, setFlag] = useState(0)
    const [assigned, setAssigned] = useState(false);
    const [pending, setPending] = useState(false);
    const [assist, setAssist] = useState(false)
    const [empTras, setempTras] = useState(false);
    const [all, setAll] = useState(false);
    const [count, setCount] = useState(0)

    //state for data passing 
    const [assign, setassign] = useState([]);
    const [assistant, setAssistant] = useState([]);
    const [transfer, setTransfer] = useState({})
    //flag for rendering 
    const [assignmodel, setAssignModel] = useState(0);
    const [assistantModel, setAssistantModel] = useState(0);
    const [transmodal, setTransmodal] = useState(0);

    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    useEffect(() => {
        dispatch(setLoginProfileData(id))
    }, [dispatch, id])
    //getting employees data
    const profileData = useSelector((state) => {
        return state.getLoginProfileData.loginProfiledata
    })
    const empdept = useSelector((state) => {
        return state.LoginUserData.empdept
    })

    //displaying complaints against the login users department
    useEffect(() => {
        dispatch(getAllComplaintLists(empdept))
    }, [dispatch, empdept, count, flag])

    const tabledata = useSelector((state) => {
        return state.getAllComplaintLists.allcmpLists
    })

    const pendingcomplaints = tabledata.filter((val) => {
        return val.compalint_status === 0
    })

    const AssignList = tabledata.filter((val) => {
        return val.assigned_emp === id
    })

    //assigned list check box updation
    const updateAssigned = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(1);
            setAssigned(true)
            setPending(false)
            setAll(false)
            setAssist(false)
            setempTras(false)
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
            setempTras(false)
        } else {
            setFlag(0)
            setPending(false)
        }
    }, [])


    //individual assit check box function
    const updateAssistant = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(3)
            setAssist(true)
            setAll(false)
            setAssigned(false)
            setPending(false)
            setempTras(false)
        } else {
            setAssist(false)
            setFlag(0)
        }
    }, [])

    //updateEmpTras list check box updation
    const updateEmpTras = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(4)
            setempTras(true)
            setPending(false)
            setAssigned(false)
            setAll(false)
            setAssist(false)
        } else {
            setFlag(0)
            setempTras(false)
            setPending(false)
            setAssigned(false)
            setAll(false)
            setAssist(false)
        }
    }, [])


    //all complaint check box updation
    const updateCompall = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(5)
            setAll(true)
            setAssigned(false)
            setPending(false)
            setAssist(false)
            setempTras(false)
        } else {
            setFlag(0)
            setAll(false)
        }
    }, [])





    //column title setting
    const [column] = useState([
        {
            headerName: 'Action', minWidth: 160, cellRenderer: params => <Fragment>
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
                <IconButton sx={{ color: editicon, paddingY: 0.5 }}
                    onClick={() => TransferDepartment(params)}
                >
                    <CustomeToolTip title="Transfer Department" >
                        < ChangeCircleIcon />
                    </CustomeToolTip>
                </IconButton>
            </Fragment>
        },
        { headerName: "SlNo", field: "complaint_slno", minWidth: 90 },
        {
            headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 300,
            cellStyle: function (params) {
                if (params.data.cm_rectify_status === 'Z') {
                    return { color: 'red' };
                } else {
                    return null;
                }
            }
        },
        { headerName: "Department Section", field: "sec_name", autoHeight: true, filter: "true", wrapText: true, minWidth: 200 },
        { headerName: "Request Type", field: "req_type_name", filter: "true", autoHeight: true, wrapText: true, minWidth: 180 },
        { headerName: "Complaint Type", field: "complaint_type_name", filter: "true", autoHeight: true, wrapText: true, minWidth: 180 },
        { headerName: "Priority", field: "priority", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true, minWidth: 200 },
        { headerName: "Hic Policy", field: "hic_policy_name", autoHeight: true, wrapText: true, minWidth: 150 },
        {
            headerName: "Verification Remark", field: "verify_remarks1", autoHeight: true, wrapText: true, minWidth: 180,
            cellStyle: function (params) {
                if (params.data.cm_rectify_status === 'Z') {
                    return { color: 'red' };
                } else {
                    return null;
                }
            }
        },
        { headerName: "Date & Time", field: "compalint_date", autoHeight: true, wrapText: true, minWidth: 180 },

    ])

    // when we click on assign this wil show assigned each inviduals employess complaint
    const [assigncloumn] = useState([
        {
            headerName: 'Action', minWidth: 100,
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
        { headerName: "SlNo", field: "complaint_slno", minWidth: 100 },
        {
            headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 300,
            cellStyle: (params) => {
                if (params.data.cm_rectify_status === 'Z') {
                    return { color: 'red' };
                } else {
                    return null;
                }
            }
        },
        { headerName: "Department Section", field: "sec_name", autoHeight: true, wrapText: true, filter: "true", minWidth: 150 },
        { headerName: "Request Type", field: "req_type_name", filter: "true", autoHeight: true, wrapText: true, minWidth: 120 },
        { headerName: "Complaint Type", field: "complaint_type_name", filter: "true", autoHeight: true, wrapText: true, minWidth: 200 },
        { headerName: "Priority", field: "priority", autoHeight: true, wrapText: true, minWidth: 200 },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Remark", field: "complaint_remark", autoHeight: true, wrapText: true, minWidth: 120 },
        { headerName: "Date & Time", field: "assigned_date", autoHeight: true, wrapText: true },

    ])

    // when we click on quick assign button this function will run
    const quickAssign = useCallback((params) => {
        const { complaint_slno } = params.data
        const postData = {
            complaint_slno: complaint_slno,
            assigned_emp: id,
            assigned_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            assign_rect_status: 0,
            assigned_user: id
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
        setAssignModel(1)
        setAssistantModel(0)
        setTransmodal(0)
        setOpen(true)
        const data = params.api.getSelectedRows()
        setassign(data)
    }, [])

    const TransferDepartment = useCallback((params) => {
        setTransmodal(1);
        setAssignModel(0);
        setAssistantModel(0);
        setOpen(true)
        const data = params.data
        setTransfer(data)
    }, [])

    //assistant needed icon fun user click on this a modal will open
    const AssistantNeeded = useCallback((params) => {
        setAssistantModel(1)
        setAssignModel(0)
        setTransmodal(0);
        setOpen(true)
        const data = params.api.getSelectedRows()
        setAssistant(data);
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
        history.push('/Home')
    }, [history])


    return (
        <Fragment>
            <CardCloseOnly
                title="Complaint Assign"
                close={backtoSetting}
            >
                <Box sx={{ width: "100%", p: 1 }}>
                    <Paper variant='outlined' sx={{ p: 2 }} >
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
                                    label="Employee Transfer"
                                    color="danger"
                                    size="md"
                                    name="empTras"
                                    value={empTras}
                                    checked={empTras}
                                    onCheked={updateEmpTras}
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
                    flag === 1 ? <Box sx={{ p: 1 }}>
                        <CusAgGridForMain
                        // columnDefs={assigncloumn}
                        // tableData={AssignList}
                        />
                    </Box> :
                        flag === 2 ? <Box sx={{ p: 1 }}>
                            <CusAgGridForMain
                            // columnDefs={column}
                            // tableData={pendingcomplaints}
                            />
                        </Box> :
                            flag === 3 ? <Box sx={{ p: 1 }}>
                                <CusAgGridForMain
                                // columnDefs={alldata}
                                // tableData={allcomplaints}
                                />
                            </Box> :

                                flag === 4 ? <Box sx={{ p: 1 }}>
                                    <CusAgGridForMain
                                    // columnDefs={assitantaccept}
                                    // tableData={assistcomplaints}
                                    />
                                </Box> : <Box sx={{ p: 1 }}>
                                    <CusAgGridForMain
                                        columnDefs={column}
                                        tableData={pendingcomplaints}
                                    />
                                </Box>
                }

                {
                    assignmodel === 1 ? <ModalAssignComplaint open={open} id={id} setOpen={setOpen} complaint={assign} empdept={profileData} count={count} setCount={setCount} /> : null //detailed assign modal
                }
                {
                    assistantModel === 1 ? <AssistantNeedmodal open={open} setOpen={setOpen} assistant={assistant} empdept={profileData} count={count} setCount={setCount} /> : null //assistant needed modal
                }
                {
                    transmodal === 1 ? <TransferDeptmodal open={open} setOpen={setOpen} transfer={transfer} count={count} setCount={setCount} setTransmodal={setTransmodal} /> : null
                }
            </CardCloseOnly>
        </Fragment >
    )
}

export default SupervisorComList