import React, { Fragment, useCallback, useEffect, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import LocalDiningSharpIcon from '@mui/icons-material/LocalDiningSharp';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color'
import DietPlan from '../Diet/DietPlan';
const InPatientList = () => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    const [ab, setAb] = useState(0);
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    //column title setting
    const [column] = useState([
        { headerName: "Diet Patient No", field: "dietpt_slno" },
        { headerName: "IP No", field: "ip_no" },
        { headerName: "OP No", field: "pt_no" },
        { headerName: "Name", field: "ptc_ptname" },
        { headerName: "Doctor", field: "doc_name" },
        { headerName: "Bed", field: "bdc_no" },
        { headerName: "Room", field: "rcc_desc" },
        {
            headerName: 'Diet Plan', cellRenderer: params => <IconButton
                sx={{ color: editicon, paddingY: 0.5 }}
                onClick={() => dietPlan(params)}>
                <LocalDiningSharpIcon />
            </IconButton>
        }
    ])
    const dietPlan = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setAb(1);
        setOpen(true)
        setData(data)
    }, [])
    useEffect(() => {
        const getPatientList = async () => {
            const result = await axioslogin.get('/common/inpatientList')
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getPatientList();
    }, [])
    return (
        <Fragment>
            <CusAgGridMast
                columnDefs={column}
                tableData={tabledata}
            />
            {
                ab === 1 ? <DietPlan open={open} setOpen={setOpen} data={data} /> : null
            }
        </Fragment>


    )
}

export default InPatientList