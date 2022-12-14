import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { setLoginProfileData } from 'src/redux/actions/LoginProfile.action';
import { getTotalcomplaints } from 'src/redux/actions/ComplaintDashboard.action';
import { useHistory } from 'react-router-dom';
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain';
import { Box } from '@mui/system'

const AssignComDept = () => {

    //for routing
    const history = useHistory();
    const dispatch = useDispatch();

    /**reducer function for getting login employees id */
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    /**redux function for getting login employees all details */
    useEffect(() => {
        dispatch(setLoginProfileData(id))
    }, [dispatch, id])

    //redux for getting employee data
    const profileData = useSelector((state) => {
        return state.getLoginProfileData.loginProfiledata
    })

    /**redux fAction for getting all complaints and pending complaints of login employes department  */
    useEffect(() => {
        if (profileData.length !== 0) {
            const { em_department } = profileData[0]
            dispatch(getTotalcomplaints(em_department))
        }
    }, [profileData, dispatch])

    /**reducer function for total complaints */
    const total = useSelector((state) => {
        return state.getComplaintList.complaintList
    })

    /** filter total complaint based on status get assigned complaint */
    const assign = total.filter((val) => {
        return val.compalint_status === 1
    })

    //data setting in table
    const [column] = useState([
        { headerName: "Sl No", field: "complaint_slno", autoHeight: true, wrapText: true, width: 150 },
        { headerName: "Description", field: "complaint_desc", autoHeight: true, wrapText: true, width: 450 },
        { headerName: "Req.Department", field: "dept_sec", autoHeight: true, wrapText: true, width: 280 },
        { headerName: "Request Type", field: "req_type_name", autoHeight: true, wrapText: true, width: 280 },
        { headerName: "Complaint Type", field: "complaint_type_name", autoHeight: true, wrapText: true, width: 280 },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true },
        { headerName: "Priority", field: "priority", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Req.Date", field: "compalint_date", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Assign.Emp", field: "em_name", autoHeight: true, wrapText: true, width: 250 },
        { headerName: "Assign.Date", field: "assigned_date", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "complaint status", field: "compalint_status1", autoHeight: true, wrapText: true, width: 300 },
    ])


    //Close function
    const backToSetting = useCallback(() => {
        history.push(`/Home`)
    }, [history])


    return (
        <CardCloseOnly
            title='Assign Complaint List'
            close={backToSetting}
        >
            <Box sx={{ p: 1 }}>
                <CusAgGridForMain
                    columnDefs={column}
                    tableData={assign}
                />
            </Box>
        </CardCloseOnly>
    )
}

export default memo(AssignComDept)