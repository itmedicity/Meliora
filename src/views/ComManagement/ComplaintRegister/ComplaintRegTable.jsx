import React, { useEffect, useState, memo, useCallback, Fragment } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import { warningNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import { IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { editicon } from 'src/color/Color';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import VerifyModal from './VerifyModal';
const ComplaintRegTable = ({ rowSelect, sec, setCount, count }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    // const [count, setCount] = useState(0)
    //column title setting
    const [column] = useState([
        { headerName: "SlNo", field: "complaint_slno", width: 300 },
        { headerName: "Date", field: "compalint_date", autoHeight: true, wrapText: true, width: 300 },
        { headerName: "Complaint dept", field: "complaint_dept_name", filter: "true", autoHeight: true, wrapText: true, width: 280 },
        { headerName: "Request Type", field: "req_type_name", width: 250 },
        { headerName: "Complaint Type", field: "complaint_type_name", width: 280 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 200 },
        { headerName: "Priority", field: "priority" },
        { headerName: "Hic Policy", field: "hic_policy_name", width: 250 },
        { headerName: "Status", field: "compalint_status1", filter: "true", width: 250 },
        { headerName: "Rectify status", field: "cm_rectify_status1", filter: "true", width: 250 },
        { headerName: "Reason", field: "rectify_pending_hold_remarks1", filter: "true", width: 250, autoHeight: true, wrapText: true },
        {
            headerName: 'Edit',
            cellRenderer: params => {
                if (params.data.compalint_status === 1 || params.data.compalint_status === 2 || params.data.compalint_status === 3) {
                    return <IconButton disabled
                        sx={{ color: editicon, paddingY: 0.5 }}>
                        <EditOutlinedIcon />
                    </IconButton>
                } else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }}
                        onClick={() => rowSelect(params)}>
                        <EditOutlinedIcon />
                    </IconButton>
                }
            }
        },
        {
            headerName: 'Verify', cellRenderer: params => {
                if ((params.data.compalint_status === 2) && (params.data.cm_rectify_status === 'R')) {
                    return <IconButton onClick={() => Verify(params)}
                        sx={{ color: editicon, paddingY: 0.5 }} >
                        <VerifiedUserOutlinedIcon />
                    </IconButton>
                } else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }} disabled>
                        <VerifiedUserOutlinedIcon />
                    </IconButton>
                }
            }
        }
    ])
    useEffect(() => {
        const getcomplinttable = async () => {
            const result = await axioslogin.get(`/complaintreg/loginbysec/${sec}`)
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            }
            else {
                warningNotify("Error occured contact EDP")
            }
        }
        getcomplinttable();
    }, [count, sec])
    const [open, setOpen] = useState(false);
    const [mdopen, setMdopen] = useState(0);
    const [mddata, setMddata] = useState({})
    const Verify = useCallback((params) => {
        // const { complaint_slno, compalint_status } = params.data
        const data = params.data
        setMddata(data)
        setOpen(true)
        setMdopen(1)
        // const patchData = {
        //     compalint_status: 3,
        //     cm_verfy_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        //     complaint_slno: complaint_slno
        // }
        // const VerifyComplaint = async (patchData) => {
        //     const result = await axioslogin.patch('/Rectifycomplit/update/verify', patchData);
        //     const { message, success } = result.data;
        //     if (success === 2) {
        //         succesNotify(message)
        //         setCount(count + 1)
        //     } else if (success === 0) {
        //         infoNotify(message)
        //     } else {
        //         infoNotify(message)
        //     }
        // }
        // VerifyComplaint(patchData)
    }, [])
    return (
        <Fragment>
            <CusAgGridMast
                columnDefs={column}
                tableData={tabledata}
                onClick={rowSelect}
            />
            {
                mdopen === 1 ? <VerifyModal open={open} setOpen={setOpen} mddata={mddata} count={count} setCount={setCount} /> : null
            }
        </Fragment>
    )
}
export default memo(ComplaintRegTable)