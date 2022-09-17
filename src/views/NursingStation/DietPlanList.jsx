import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';
import { warningNotify } from '../Common/CommonCode';
import CusAgGridMast from '../Components/CusAgGridMast'
const DietPlanList = () => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([]);
    //column title setting
    const [column] = useState([
        { headerName: "Patient  No", field: "pt_no" },
        { headerName: "Diet  No", field: "dietpt_slno" },
        { headerName: "Name", field: "ptc_ptname" },
        { headerName: "Bed", field: "bdc_no" },
        { headerName: "Diet", field: "diet_name" },
        { headerName: "Diet Approval", field: "plan status" }
    ])
    //get diet planned patient list
    useEffect(() => {
        const getDietpatientList = async () => {
            const result = await axioslogin.get('/dietplan/dietplanlist')
            const { success, data } = result.data;
            if (success === 1) {
                setTabledata(data)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getDietpatientList();
    }, [])
    return (
        <Fragment>
            <CusAgGridMast
                columnDefs={column}
                tableData={tabledata}
            />
        </Fragment>
    )
}
export default DietPlanList