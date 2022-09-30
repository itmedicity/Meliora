import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color';
import ModalAssignComplaint from './ModalAssignComplaint';
import CardCloseOnly from 'src/views/Components/CardCloseOnly';
import { Box } from '@mui/material'
import { useHistory } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { useSelector } from 'react-redux';
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
        console.log(state.LoginUserData);
        return state.LoginUserData.empid
    })

    //column title setting
    const [column] = useState([
        { headerName: "SlNo", field: "complaint_slno" },
        {
            headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, width: 500

        },
        { headerName: "Department Section", field: "sec_name", width: 300 },
        { headerName: "Request Type", field: "req_type_name" },
        { headerName: "Complaint Dept", field: "complaint_dept_name", width: 250 },
        { headerName: "Complaint Type", field: "complaint_type_name" },
        { headerName: "Priority", field: "priority" },
        { headerName: "Hic Policy", field: "hic_policy_name" },
        { headerName: "Date", field: "complaint_date" },
        {
            headerName: 'Action', cellRenderer: params => <Fragment>
                <IconButton sx={{ color: editicon, paddingY: 0.5, fontSize: 2 }}
                    onClick={() => quickAssign(params)}>
                    <AccessibilityNewIcon />
                </IconButton>
                <IconButton sx={{ color: editicon, paddingY: 0.5 }}
                    onClick={() => Assign(params)}>
                    <QuickreplyIcon />
                </IconButton>
            </Fragment>
        }
    ])
    // const data = [{
    //     complaint_slno: 1,
    //     complaint_desc: "Mouse Complaint toner ink finished ifhnvkdshodghedshvksdhvsgfukgsifgvujsgfuishfvsgfkgujfhksfvsifgjgjdfyhdyhdfhuyufdhdfhfchcfhcfhfdfhdffdhdfhfdhdf ",
    //     // complaint_desc: "Mouse Complaint",
    //     sec_name: "Information Technology",
    //     req_type_name: "Complaint",
    //     complaint_dept_name: "Information Technology",
    //     complaint_type_name: "Hardware",
    // }]

    useEffect(() => {
        const getComplaintAssign = async () => {
            const result = await axioslogin.get("/complaintassign");
            const { success, message, data } = result.data;
            console.log(data);
            if (success === 1) {
                setTabledata(data)
            } else {
                infoNotify(message)
            }
        }
        getComplaintAssign();
    }, [count])
    const postData = useMemo(() => {
        return {
            complaint_assign_emp: id
        }
    }, [id])
    console.log(postData);
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
                    ab === 1 ? <ModalAssignComplaint open={open} setOpen={setOpen} complaint={complaint} /> : null
                }
            </CardCloseOnly>
        </Fragment>

    )
}

export default AssignComplaintTable