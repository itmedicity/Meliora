import React, { Fragment, useEffect, memo } from 'react'
import { Paper, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAssistRectifybasedOnEmp,
  getTotalcomplaints,
  getPendingOnholdbasedOnEmp
} from 'src/redux/actions/ComplaintDashboard.action'
import ComplaintDashboard from './ComplaintDashboard'

const DashCompEmp = ({ profileData }) => {
  const dispatch = useDispatch()
  /**reducer function for getting login employees id */
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  /**redux fAction for getting all complaints and pending complaints of login employes department  */
  useEffect(() => {
    if (profileData.length !== 0) {
      const { em_department } = profileData[0]
      dispatch(getTotalcomplaints(em_department))
      dispatch(getAssistRectifybasedOnEmp(id))
      dispatch(getPendingOnholdbasedOnEmp(id))
    }
  }, [profileData, id, dispatch])

  /**reducer function for total complaints */
  const total = useSelector(state => {
    return {
      complaintList: state.getComplaintList.complaintList,
      loadingStatus: state.getComplaintList.loadingStatus
    }
  })
  const { complaintList, loadingStatus } = total

  const pending = complaintList?.filter(val => {
    return val?.compalint_status === 0
  })

  const assigned = useSelector(state => {
    return state.setAssitRectEmpWise.assitEmpList
  })

  /** filter total complaint based on status get Verified complaint */
  const Rectified = assigned?.filter(val => {
    return val?.compalint_status === 2
  })

  const pendingOnhold = useSelector(state => {
    return state.setPendingOnholEmpWise.pendOnholdEmpList
  })

  //Array for dispaly dashboard
  const dasharrayEmp = [
    { slno: 6, name: 'Total Complaints', count: complaintList.length, status: loadingStatus },
    { slno: 7, name: 'Pending For Assign', count: pending.length, status: loadingStatus },
    { slno: 8, name: 'Assigned Complaints', count: assigned.length, status: loadingStatus },
    { slno: 9, name: 'Rectified Complaints', count: Rectified.length, status: loadingStatus },
    {
      slno: 10,
      name: 'Onhold/Pending Complaints',
      count: pendingOnhold.length,
      status: loadingStatus
    }
  ]

  return (
    <Fragment>
      <Paper square elevation={2} sx={{ p: 0.5, mb: 2 }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            p: 1,
            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }
          }}
        >
          {dasharrayEmp &&
            dasharrayEmp.map(val => {
              return (
                <Box
                  key={val.slno}
                  sx={{
                    width: '20%',
                    pr: 2
                  }}
                >
                  <ComplaintDashboard widgetName={val.name} count={val.count} slno={val.slno} status={val.status} />
                </Box>
              )
            })}
        </Box>
      </Paper>
    </Fragment>
  )
}

export default memo(DashCompEmp)
