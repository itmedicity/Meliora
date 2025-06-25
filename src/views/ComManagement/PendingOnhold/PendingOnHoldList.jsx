import React, { useState, useCallback, useEffect, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { useDispatch, useSelector } from 'react-redux'
import { getOnholdcomplaints } from 'src/redux/actions/ComplaintDashboard.action'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import { setLoginProfileData } from 'src/redux/actions/LoginProfile.action'
import { Box, Paper, IconButton, Typography } from '@mui/material'
import CropSquareIcon from '@mui/icons-material/CropSquare'

const PendingOnHoldList = () => {
  //for routing to settings
  const history = useNavigate()
  const dispatch = useDispatch()
  const [column] = useState([
    { headerName: 'SlNo', field: 'complaint_slno' },
    { headerName: 'Complaint Desc.', field: 'complaint_desc' },
    { headerName: 'Section', field: 'location' },
    {
      headerName: 'Location',
      field: 'rm_room_name',
      minWidth: 350,
      cellRendererFramework: (params) => {
        const { rm_room_name, rm_roomtype_name, rm_insidebuildblock_name, rm_floor_name } =
          params.data
        return (
          <div>
            {rm_room_name !== null ? (
              <div>
                {`${rm_room_name} (${rm_roomtype_name} - ${rm_insidebuildblock_name} - ${rm_floor_name})`}
              </div>
            ) : (
              <div>Location not added</div>
            )}
          </div>
        )
      },
    },
    { headerName: 'Complaint Type', field: 'complaint_type_name' },
    { headerName: 'Req.Date', field: 'compalint_date' },
    { headerName: 'Assign.Date', field: 'assigndate' },
    { headerName: 'Rectify.Date', field: 'cm_rectify_time' },
    { headerName: 'Complaint Status', field: 'cm_rectify_status' },
    { headerName: 'Remarks', field: 'rectify_pending_hold_remarks' },
  ])
  const getRowStyle = (params) => {
    if (params.data.compalint_priority === 1) {
      return { background: '#f44336' }
    }
  }
  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })

  useEffect(() => {
    dispatch(setLoginProfileData(id))
  }, [dispatch, id])

  //redux for getting employee data
  const profileData = useSelector((state) => {
    return state.getLoginProfileData.loginProfiledata
  })

  useEffect(() => {
    if (profileData.length !== 0) {
      const { em_department } = profileData[0]
      dispatch(getOnholdcomplaints(em_department))
    }
  }, [profileData, dispatch])

  const tabledata = useSelector((state) => {
    return state.getOnholdList.onHoldList
  })

  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])

  return (
    <CardCloseOnly title="Pending - Onhold Complaint List" close={backtoSetting}>
      <Paper
        square
        sx={{
          p: 1,
        }}
      >
        <CusAgGridForMain columnDefs={column} tableData={tabledata} getRowStyle={getRowStyle} />
      </Paper>

      <Paper
        square
        sx={{
          display: 'flex',
          p: 1,
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <IconButton>
            <CropSquareIcon sx={{ background: '#f44336', pr: 5 }} />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', width: '98%', fontWeight: 400, pl: 2 }}>
          <Typography>Priority Critical</Typography>
        </Box>
      </Paper>
    </CardCloseOnly>
  )
}

export default memo(PendingOnHoldList)
