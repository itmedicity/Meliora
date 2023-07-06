import React, { useEffect, useCallback, memo, useState } from 'react'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { useDispatch, useSelector } from 'react-redux';
import { getAllComplaintLists } from 'src/redux/actions/AllcomplaintsLists.action';
import { useHistory } from 'react-router-dom';
import { Box } from '@mui/material'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain';

const DeptWiseReport = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    //getting employees data
    const profileData = useSelector((state) => {
        return state.getLoginProfileData.loginProfiledata
    })

    //displaying complaints against the login users department
    useEffect(() => {
        if (profileData.length !== 0) {
            const { em_department } = profileData[0]
            dispatch(getAllComplaintLists(em_department))
        }
    }, [dispatch, profileData])

    //getting the dispatch data from redux state
    const state = useSelector((state) => {
        return {
            allcomplaints: state.getAllComplaintLists.allcmpLists || 0
        }
    })
    //destructuring redux state
    const { allcomplaints } = state

    //column title setting
    const [column] = useState([
        { headerName: "SlNo", field: "complaint_slno", minWidth: 90 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 300 },
        { headerName: "Request Department", field: "sec_name", minWidth: 250, filter: "true", wrapText: true, autoHeight: true },
        { headerName: "Location", field: "location", minWidth: 250, filter: "true", autoHeight: true, wrapText: true },
        { headerName: "Complaint Type", field: "complaint_type_name", filter: "true", minWidth: 180 },
        { headerName: "Complaint Department", field: "complaint_dept_name", filter: "true", minWidth: 200 },
        { headerName: "Request Date", field: "compalint_date", filter: "true", minWidth: 180 },
        { headerName: "Assigned Employee", field: "em_name", filter: "true", minWidth: 180 },
        { headerName: "Assign Date", field: "assigned_date", minWidth: 180 },
        { headerName: "Rectify Date", field: "cm_rectify_time", filter: "true", minWidth: 180 },
        { headerName: "Verify Date", field: "cm_verfy_time", filter: "true", minWidth: 180 },
        { headerName: "Status", field: "compalint_status1", filter: "true", minWidth: 180 }
    ])

    //close button function
    const backToSetting = useCallback(() => {
        history.push('/Home')
    }, [history])


    return (
        <CardCloseOnly
            title='All Complaint Dept Wise Report'
            close={backToSetting}
        >
            <Box sx={{ width: "100%", p: 1 }}>
                <CusAgGridForMain
                    columnDefs={column}
                    tableData={allcomplaints}
                />
            </Box>
        </CardCloseOnly>
    )
}

export default memo(DeptWiseReport)