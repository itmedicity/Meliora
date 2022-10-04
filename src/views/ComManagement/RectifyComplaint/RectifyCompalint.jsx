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

const RectifyCompalint = () => {
    const history = useHistory()
    const [tabledata, setTabledata] = useState([])
    const [detail, setdeatial] = useState([])
    const [mdopen, setmdopen] = useState(0)
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0)


    const [column] = useState([
        { headerName: "SlNo", field: "complaint_slno", minWidth: 10 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 250 },
        { headerName: "complaint Dept", field: "complaint_dept_name" },
        { headerName: "Request Type", field: "req_type_name" },
        { headerName: "Complaint Type", field: "complaint_type_name" },
        { headerName: "Hic Policy", field: "hic_policy_name" },
        { headerName: "Assign emp", field: "em_name" },
        { headerName: "complaint status", field: "compalint_status" },

        { headerName: "Date", field: "compalint_date" },
        {
            headerName: 'Rectify ', cellRenderer: params => <IconButton
                sx={{ color: editicon, paddingY: 0.5 }}
                onClick={() => Rectifycomplaintdept(params)}
            >
                <AssignmentTurnedInIcon />
            </IconButton>
        }
    ])



    const Rectifycomplaintdept = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setdeatial(data)
        setmdopen(1)
        setOpen(true)
    }, [])

    useEffect(() => {
        const getRectifycomplit = async () => {
            const result = await axioslogin.get(`/Rectifycomplit/getRectifycomplit`)
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            }
            else {
                setTabledata(data)
            }

        }
        getRectifycomplit();
    }, [count])




    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Fragment >
            {mdopen !== 0 ? <Rectifymodel open={open} handleClose={handleClose} detail={detail}
                setCount={setCount} count={count} setOpen={setOpen} /> : null}
            <CardMaster

                close={backtoSetting}
                title="Rectify complaint"
            >
                <ComplistAgGridcmp
                    columnDefs={column}
                    tableData={tabledata} count={count}
                />

            </CardMaster>
        </Fragment>
    )
}

export default RectifyCompalint