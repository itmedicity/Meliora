import React, { Fragment, useCallback, useEffect, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
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
const AssignComplaintTable = () => {
    const history = useHistory();
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
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
        { headerName: "SlNo", field: "complaint_slno" },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, width: 230 },
        { headerName: "Department Section", field: "sec_name", autoHeight: true, wrapText: true, width: 220 },
        { headerName: "Request Type", field: "req_type_name", autoHeight: true, wrapText: true },
        { headerName: "Complaint Type", field: "complaint_type_name", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Priority", field: "priority", autoHeight: true, wrapText: true },
        { headerName: "Hic Policy", field: "hic_policy_name", autoHeight: true, wrapText: true },
        { headerName: "Date", field: "date", autoHeight: true, wrapText: true },
        { headerName: "Time", field: "Time", autoHeight: true, wrapText: true },
        {
            headerName: 'Action', cellRenderer: params => <Fragment>
                <IconButton sx={{ color: editicon, paddingY: 0.5 }}
                    onClick={() => quickAssign(params)}>
                    <AssignmentTurnedInRoundedIcon />
                </IconButton>
                <IconButton sx={{ color: editicon, paddingY: 0.5 }}
                    onClick={() => Assign(params)}>
                    < AccessibilityNewIcon />
                </IconButton>
            </Fragment>
        }
    ])
    const [assign] = useState([
        { headerName: "SlNo", field: "complaint_slno" },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, width: 230 },
        { headerName: "Department Section", field: "sec_name", autoHeight: true, wrapText: true, width: 220 },
        { headerName: "Request Type", field: "req_type_name", autoHeight: true, wrapText: true },
        { headerName: "Complaint Type", field: "complaint_type_name", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Priority", field: "priority", autoHeight: true, wrapText: true },
        { headerName: "Hic Policy", field: "hic_policy_name", autoHeight: true, wrapText: true },
        { headerName: "Date", field: "date", autoHeight: true, wrapText: true },
        { headerName: "Time", field: "Time", autoHeight: true, wrapText: true },
        {
            headerName: 'Action', cellRenderer: params => <Fragment>
                <IconButton sx={{ color: editicon, paddingY: 0.5 }}
                    onClick={() => AssistantNeeded(params)}>
                    < AccessibilityNewIcon />
                </IconButton>
            </Fragment>
        }
    ])
    const [alldata] = useState([
        { headerName: "SlNo", field: "complaint_slno" },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, width: 230 },
        { headerName: "Department Section", field: "sec_name", autoHeight: true, wrapText: true, width: 220 },
        { headerName: "Request Type", field: "req_type_name", autoHeight: true, wrapText: true },
        { headerName: "Complaint Type", field: "complaint_type_name", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Priority", field: "priority", autoHeight: true, wrapText: true },
        { headerName: "Hic Policy", field: "hic_policy_name", autoHeight: true, wrapText: true },
        { headerName: "Employee Name", field: "em_name", autoHeight: true, wrapText: true },
        { headerName: "Date", field: "date", autoHeight: true, wrapText: true },
        { headerName: "Time", field: "Time", autoHeight: true, wrapText: true }
    ])
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setLoginProfileData(id))
    }, [dispatch, id])
    const xx = useSelector((state) => {
        return state.getLoginProfileData.loginProfiledata
    })
    const [assigned, setAssigned] = useState(false);
    const [pending, setPending] = useState(false);
    const [flag, setFlag] = useState(0)
    //displaying complaints against the login users department
    useEffect(() => {
        if (xx.length !== 0) {
            const { em_department } = xx[0]
            const getComplaintAssign = async () => {
                const result = await axioslogin.get(`/complaintassign/${em_department}`);
                const { success, message, data } = result.data;
                if (success === 1) {
                    setTabledata(data)
                } else {
                    infoNotify(message)
                }
            }
            getComplaintAssign();
            if (flag === 2) {
                getComplaintAssign()
            } else {
                getComplaintAssign()
            }
            // getComplaintAssign()
            const getAssigned = async () => {
                const result = await axioslogin.get(`/complaintassign/user/${id}`);
                const { success, message, data } = result.data;
                if (success === 1) {
                    setTabledata(data)
                } else {
                    infoNotify(message)
                }
            }
            if (flag === 1) {
                getAssigned();
            } else {
                setTabledata([])
            }
            const getAllcompalintbyemp = async () => {
                const result = await axioslogin.get(`/complaintassign/allcomplaint/${em_department}`);
                const { success, message, data } = result.data;
                if (success === 1) {
                    setTabledata(data)
                } else {
                    infoNotify(message)
                }
            }
            if (flag === 3) {
                getAllcompalintbyemp();
            } else {
                setTabledata([])
            }
        }
    }, [xx, count, id, flag])
    //quick assign function
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
    //detailed assign modal open
    const Assign = useCallback((params) => {
        setAb(1)
        setBc(0)
        setOpen(true)
        const data = params.api.getSelectedRows()
        setComplaint(data)
    }, [])
    const [assistant, setAssistant] = useState([]);
    const [bc, setBc] = useState(0);
    //assistant needed
    const AssistantNeeded = useCallback((params) => {
        setBc(1)
        setAb(0)
        setOpen(true)
        const data = params.api.getSelectedRows()
        setAssistant(data);
    }, [])
    const updateAssigned = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(1);
            setAssigned(true)
            setPending(false)
            setAll(false)
        } else {
            setFlag(0);
            setAssigned(false)
        }
    }, [])
    const updatePending = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(2)
            setPending(true)
            setAssigned(false)
            setAll(false)
        } else {
            setFlag(0)
            // setFlag(2)
            setPending(false)
        }
    }, [])
    const [all, setAll] = useState(false);
    const updateCompall = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(3)
            setAll(true)
            setAssigned(false)
            setPending(false)
        } else {
            setFlag(0)
            setAll(false)
        }
    }, [])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        <Fragment>
            <CardCloseOnly
                title="Complaint Assign"
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
                                    color="primary"
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
                                    color="primary"
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
                                    label="All Complaint"
                                    color="primary"
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
                {/* <Box sx={{ p: 1 }}>
                    <CusAgGridMast
                        columnDefs={column}
                        tableData={tabledata}
                    />
                </Box> */}
                {
                    flag === 2 ? <Box sx={{ p: 1 }}>
                        <CusAgGridMast
                            columnDefs={column}
                            tableData={tabledata}
                        />
                    </Box> : null
                }
                {
                    flag === 1 ? <Box sx={{ p: 1 }}>
                        <CusAgGridMast
                            columnDefs={assign}
                            tableData={tabledata}
                        />
                    </Box> : null
                }
                {
                    flag === 3 ? <Box sx={{ p: 1 }}>
                        <CusAgGridMast
                            columnDefs={alldata}
                            tableData={tabledata}
                        />
                    </Box> : null
                }
                {
                    ab === 1 ? <ModalAssignComplaint open={open} setOpen={setOpen} complaint={complaint} empdept={xx} count={count} setCount={setCount} /> : null
                }
                {
                    bc === 1 ? <AssistantNeedmodal open={open} setOpen={setOpen} assistant={assistant} empdept={xx} count={count} setCount={setCount} /> : null
                }
            </CardCloseOnly>
        </Fragment>
    )
}
export default AssignComplaintTable