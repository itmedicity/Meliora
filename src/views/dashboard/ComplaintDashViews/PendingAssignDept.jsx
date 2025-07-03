import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { setLoginProfileData } from 'src/redux/actions/LoginProfile.action'
import { getTotalcomplaints } from 'src/redux/actions/ComplaintDashboard.action'
import { useNavigate } from 'react-router-dom'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import { Box } from '@mui/system'

const PendingAssignDept = () => {
  //for routing
  const history = useNavigate()
  const dispatch = useDispatch()

  /**reducer function for getting login employees id */
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  /**redux function for getting login employees all details */
  useEffect(() => {
    dispatch(setLoginProfileData(id))
  }, [dispatch, id])

  //redux for getting employee data
  const profileData = useSelector(state => {
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
  const total = useSelector(state => {
    return state.getComplaintList.complaintList
  })

  /** filter total complaint based on status get pending for assign complaint */
  const pending = total.filter(val => {
    return val.compalint_status === 0
  })
  //data setting in table
  const [column] = useState([
    { headerName: 'Sl No', field: 'complaint_slno', autoHeight: true, wrapText: true, width: 150 },
    {
      headerName: 'Description',
      field: 'complaint_desc',
      autoHeight: true,
      wrapText: true,
      width: 450,
    },
    {
      headerName: 'Req.Department',
      field: 'dept_sec',
      filter: 'true',
      autoHeight: true,
      wrapText: true,
      width: 280,
    },
    {
      headerName: 'Request Type',
      field: 'req_type_name',
      filter: 'true',
      autoHeight: true,
      wrapText: true,
      width: 280,
    },
    {
      headerName: 'Complaint Type',
      field: 'complaint_type_name',
      autoHeight: true,
      wrapText: true,
      width: 280,
    },
    {
      headerName: 'Location',
      field: 'location',
      width: 200,
      filter: 'true',
      autoHeight: true,
      wrapText: true,
    },
    {
      headerName: 'Priority',
      field: 'priority',
      filter: 'true',
      autoHeight: true,
      wrapText: true,
      width: 200,
    },
    {
      headerName: 'Req.Date',
      field: 'compalint_date',
      autoHeight: true,
      wrapText: true,
      width: 300,
    },
    {
      headerName: 'complaint status',
      field: 'compalint_status1',
      filter: 'true',
      autoHeight: true,
      wrapText: true,
      width: 300,
    },
  ])

  //Close function
  const backToSetting = useCallback(() => {
    history(`/Home`)
  }, [history])

  return (
    <CardCloseOnly title="Pending Complaint List" close={backToSetting}>
      <Box sx={{ p: 1 }}>
        <CusAgGridForMain columnDefs={column} tableData={pending} />
      </Box>
    </CardCloseOnly>
  )
}

export default memo(PendingAssignDept)
