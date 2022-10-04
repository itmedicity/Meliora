import React, { Fragment, useCallback, useEffect, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { IconButton } from '@mui/material';
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
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, width: 250 },
        { headerName: "Department Section", field: "sec_name", autoHeight: true, wrapText: true, width: 250 },
        { headerName: "Request Type", field: "req_type_name", autoHeight: true, wrapText: true },
        { headerName: "Complaint Type", field: "complaint_type_name", autoHeight: true, wrapText: true, width: 250 },
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
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setLoginProfileData(id))
    }, [dispatch, id])
    const xx = useSelector((state) => {
        return state.getLoginProfileData.loginProfiledata
    })
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
        }
    }, [xx, count])
    //quick assign function
    const quickAssign = useCallback((params) => {
        const { complaint_slno } = params.data
        const postData = {
            complaint_assign_emp: id,
            complaint_slno: complaint_slno
        }
        const getData = async (postData) => {
            const result = await axioslogin.patch('/complaintassign', postData);
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
        setOpen(true)
        const data = params.api.getSelectedRows()
        setComplaint(data)
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
                <Box sx={{ p: 1 }}>
                    <CusAgGridMast
                        columnDefs={column}
                        tableData={tabledata}
                    />
                </Box>
                {
                    ab === 1 ? <ModalAssignComplaint open={open} setOpen={setOpen} complaint={complaint} empdept={xx} count={count} setCount={setCount} /> : null
                }
            </CardCloseOnly>
        </Fragment>
    )
}
export default AssignComplaintTable