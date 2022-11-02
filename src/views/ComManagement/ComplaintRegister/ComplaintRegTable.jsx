import React, { useEffect, useState, memo, useCallback, Fragment } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import { warningNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import { IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { editicon } from 'src/color/Color';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import VerifyModal from './VerifyModal';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
const ComplaintRegTable = ({ rowSelect, sec, setCount, count }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //state for modal open
    const [open, setOpen] = useState(false);
    //state for modal render
    const [mdopen, setMdopen] = useState(0);
    //state for passing data to modal
    const [mddata, setMddata] = useState({})
    //column title setting
    const [column] = useState([
        { headerName: "No", field: "complaint_slno", autoHeight: true, wrapText: true, width: 330 },
        { headerName: "Date", field: "compalint_date", autoHeight: true, wrapText: true, width: 250 },
        { headerName: "Department", field: "complaint_dept_name", filter: "true", autoHeight: true, wrapText: true, width: 300 },
        { headerName: "Request Type", field: "req_type_name", width: 250, autoHeight: true, wrapText: true },
        { headerName: "Complaint Type", field: "complaint_type_name", width: 280, autoHeight: true, wrapText: true },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 200 },
        { headerName: "Priority", field: "priority" },
        { headerName: "Hic Policy", field: "hic_policy_name", width: 250 },
        { headerName: "Status", field: "compalint_status1", filter: "true", width: 250 },
        { headerName: "Rectifystatus", field: "cm_rectify_status1", filter: "true", width: 280 },
        { headerName: "Reason", field: "rectify_pending_hold_remarks1", filter: "true", width: 250, autoHeight: true, wrapText: true },
        {
            headerName: 'Edit',
            cellRenderer: params => {
                if (params.data.compalint_status === 1 || params.data.compalint_status === 2 || params.data.compalint_status === 3
                    || params.data.cm_rectify_status === "Z"
                ) {
                    return <IconButton disabled
                        sx={{ color: editicon, paddingY: 0.5 }}>
                        <EditOutlinedIcon />
                    </IconButton>
                } else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }}
                        onClick={() => rowSelect(params)}>
                        <CustomeToolTip title="Edit">
                            <EditOutlinedIcon />
                        </CustomeToolTip>
                    </IconButton>
                }
            }
        },
        {
            headerName: 'Verify', cellRenderer: params => {
                if ((params.data.compalint_status === 2) && (params.data.cm_rectify_status === 'R')) {
                    return <IconButton onClick={() => Verify(params)}
                        sx={{ color: editicon, paddingY: 0.5 }} >
                        <CustomeToolTip title="Verify">
                            <VerifiedUserOutlinedIcon />
                        </CustomeToolTip>
                    </IconButton>
                } else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }} disabled>
                        <VerifiedUserOutlinedIcon />
                    </IconButton>
                }
            }
        }
    ])
    //dispalying complaints against the users deptsection
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
        if (sec !== 0) {
            getcomplinttable();
        }
    }, [count, sec])
    //when user clicks on verify icon this function will work
    const Verify = useCallback((params) => {
        const data = params.data
        setMddata(data)
        setOpen(true)
        setMdopen(1)
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