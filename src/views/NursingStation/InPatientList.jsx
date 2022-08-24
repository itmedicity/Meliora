import React, { useCallback, useEffect, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import LocalDiningSharpIcon from '@mui/icons-material/LocalDiningSharp';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color'
import { useHistory } from 'react-router-dom';
const InPatientList = () => {
    const history = useHistory();
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([
        { headerName: "IP No", field: "ip_no" },
        { headerName: "OP No", field: "pt_no" },
        { headerName: "Name", field: "ptc_ptname" },
        { headerName: "Doctor", field: "doc_name" },
        { headerName: "Bed", field: "bdc_no" },
        { headerName: "Room", field: "rcc_desc" },
        {
            headerName: 'Diet Plan', cellRenderer: params => <IconButton
                sx={{ color: editicon, paddingY: 0.5 }}
                onClick={() => dietPlan()}>
                <LocalDiningSharpIcon />
            </IconButton>
        }
    ])
    //redirect to diet plan on button click
    const dietPlan = useCallback(() => {
        history.push('/Home/DietPlan')
    }, [history])
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
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
        //  onSelectionChanged={geteditdata}
        />
    )
}

export default InPatientList