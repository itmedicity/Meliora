import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { editicon } from 'src/color/Color'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axioslogin } from 'src/views/Axios/Axios'
import CardMaster from 'src/views/Components/CardMaster'
import ComplistAgGridcmp from 'src/views/Components/ComplistAgGridcmp'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { IconButton } from '@mui/material';
import { Fragment } from 'react'
import Rectifymodel from './Rectifymodel'
import { useSelector } from 'react-redux'
import { Box } from '@mui/system'
const RectifyCompalint = () => {
    const history = useHistory()
    const [tabledata, setTabledata] = useState([])
    const [detail, setdeatial] = useState([])
    const [mdopen, setmdopen] = useState(0)
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0)
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [column] = useState([
        { headerName: "SlNo", field: "complaint_slno" },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, width: 300 },
        { headerName: "complaint Dept", field: "sec_name", autoHeight: true, wrapText: true, width: 280 },
        { headerName: "Request Type", field: "req_type_name" },
        { headerName: "Complaint Type", field: "complaint_type_name" },
        { headerName: "Hic Policy", field: "hic_policy_name" },
        { headerName: "Assign emp", field: "em_name" },
        { headerName: "complaint status", field: "compalint_status1", width: 150 },
        { headerName: "Date", field: "date" },
        { headerName: "Time", field: "Time" },
        { headerName: "Rectified Status", field: "cm_rectify_status1", width: 240 },
        { headerName: "Reason", field: "rectify_pending_hold_remarks1", autoHeight: true, wrapText: true, width: 280 },
        // { headerName: "User Verification", field: "verify_remarks1", autoHeight: true, wrapText: true, width: 280 },
        {
            headerName: 'Rectify',
            cellRenderer: params => {

                if (params.data.compalint_status === 2 || params.data.compalint_status === 3) {
                    return <IconButton disabled
                        sx={{ color: editicon, paddingY: 0.5 }}>
                        < AssignmentTurnedInIcon />
                    </IconButton>
                } else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }}
                        onClick={() => Rectifycomplaintdept(params)}>
                        < AssignmentTurnedInIcon />
                    </IconButton>
                }
            }
        },
    ])
    const Rectifycomplaintdept = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setdeatial(data)
        setmdopen(1)
        setOpen(true)
    }, [])
    useEffect(() => {
        const getRectifycomplit = async () => {
            const result = await axioslogin.get(`Rectifycomplit/getRectifycomplit/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            }
            else {
                setTabledata(data)
            }
        }
        getRectifycomplit();
    }, [count, id])
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        <Fragment >
            {mdopen !== 0 ? <Rectifymodel open={open} detail={detail}
                setCount={setCount} count={count} setOpen={setOpen} /> : null}
            <CardMaster
                close={backtoSetting}
                title="Rectify complaint"
            >
                <Box sx={{ p: 1 }}>
                    <ComplistAgGridcmp
                        columnDefs={column}
                        tableData={tabledata}
                        count={count}
                    />
                </Box>
            </CardMaster>
        </Fragment>
    )
}
export default RectifyCompalint