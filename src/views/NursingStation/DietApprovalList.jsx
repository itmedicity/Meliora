import { IconButton } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios'
import { warningNotify } from '../Common/CommonCode'
import CusAgGridMast from '../Components/CusAgGridMast'
import { editicon } from 'src/color/Color'
import DietApprovalModel from './DietApprovalModel'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const DietApprovalList = () => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //for opening diet approval 
    const [approval, setApproval] = useState(0)
    //for passing data to modal
    const [approvaldata, setData] = useState('')
    //for modal open
    const [open, setOpen] = useState(false);
    //for table rendering
    const [count, setCount] = useState(0)
    //column title setting
    const [column] = useState([
        { headerName: "Patient  No", field: "pt_no" },
        { headerName: "Diet  No", field: "dietpt_slno" },
        { headerName: "Name", field: "ptc_ptname" },
        { headerName: "Bed", field: "bdc_no" },
        { headerName: "Diet", field: "diet_name" },
        { headerName: "Remarks", field: "plan_remark" },
        {
            headerName: "Diet Approval", cellRenderer: params => <IconButton
                sx={{ color: editicon, paddingY: 0.5 }}
                onClick={() => dietApproval(params)}>
                <CheckCircleOutlineIcon />
            </IconButton>
        }
    ])
    const dietApproval = (params) => {
        //taking the object and set to a state
        const data = params.data
        setData(data)
        setApproval(1);
        setOpen(true)
    }
    // geting diet planned patient details
    useEffect(() => {
        const getDietplan = async () => {
            const result = await axioslogin.get('/dietplan/getdietplan')
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getDietplan();
    }, [count])
    return (
        <Fragment>
            <CusAgGridMast
                columnDefs={column}
                tableData={tabledata}
            />
            {
                approval === 1 ? <DietApprovalModel open={open} setOpen={setOpen} data={approvaldata} count={count} setCount={setCount} /> : null
            }
        </Fragment>
    )
}
export default DietApprovalList