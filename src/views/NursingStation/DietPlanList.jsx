import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { axioslogin } from '../Axios/Axios';
import { warningNotify } from '../Common/CommonCode';
import CardCloseOnly from '../Components/CardCloseOnly';
import CusAgGridMast from '../Components/CusAgGridMast'
import { Box } from '@mui/material'
const DietPlanList = () => {
    const history = useHistory();
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
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        <Fragment>
            <CardCloseOnly
                title="Diet Plan List"
                close={backtoSetting}
            >
                <Box sx={{ width: "100%", p: 1 }} >
                    <CusAgGridMast
                        columnDefs={column}
                        tableData={tabledata}
                    />
                </Box>
            </CardCloseOnly>
        </Fragment>
    )
}
export default DietPlanList