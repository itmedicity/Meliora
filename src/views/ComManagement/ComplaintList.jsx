import React, { useCallback, useEffect, useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ComplistAgGridcmp from '../Components/ComplistAgGridcmp'
import { Box, Paper } from '@mui/material'
import CusCheckBox from '../Components/CusCheckBox'
import CardCloseOnly from '../Components/CardCloseOnly'
import { getTotalcomplaintsall } from 'src/redux/actions/ComlaintListAll.action'
import { useNavigate } from 'react-router-dom'
const ComplaintList = () => {
  const history = useNavigate()
  //state for setting table data
  const [total, settotal] = useState(false)
  const [assign, setassign] = useState(false)
  const [verify, setverify] = useState(false)
  const [rectify, setrectify] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTotalcomplaintsall())
  }, [dispatch])

  const compall = useSelector((state) => {
    return state.setCompListAllForMenu.complaintList
  })

  /** filter total complaint based on status get assigned complaint */
  const assignall = compall?.filter((val) => {
    return val.compalint_status === 1
  })
  /** filter total complaint based on status get Verified complaint */
  const rectifyall = compall?.filter((val) => {
    return val.compalint_status === 2
  })
  /** filter total complaint based on status get Verified complaint */
  const verifyall = compall?.filter((val) => {
    return val.compalint_status === 3
  })

  //column title setting
  const [column] = useState([
    { headerName: 'SlNo', field: 'complaint_slno', minWidth: 90 },
    {
      headerName: 'Complaint Description',
      field: 'complaint_desc',
      autoHeight: true,
      wrapText: true,
      minWidth: 300,
    },
    {
      headerName: 'Request Department',
      field: 'sec_name',
      filter: 'true',
      wrapText: true,
      autoHeight: true,
      minWidth: 250,
    },
    { headerName: 'Section', field: 'location', minWidth: 250, autoHeight: true, wrapText: true },
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
    { headerName: 'Complaint Type', field: 'complaint_type_name', filter: 'true', minWidth: 180 },
    {
      headerName: 'Complaint Department',
      field: 'complaint_dept_name',
      filter: 'true',
      minWidth: 200,
    },
    { headerName: 'Request Date', field: 'compalint_date', minWidth: 180 },
    { headerName: 'Assigned Employee', field: 'em_name', filter: 'true', minWidth: 180 },
    { headerName: 'Assign Date', field: 'assigned_date', minWidth: 180 },
    { headerName: 'Rectify Date', field: 'cm_rectify_time', minWidth: 180 },
    { headerName: 'Verify Date', field: 'cm_verfy_time', minWidth: 180 },
    { headerName: 'Status', field: 'compalint_status1', filter: 'true', minWidth: 180 },
  ])
  const [assigned] = useState([
    { headerName: 'SlNo', field: 'complaint_slno', minWidth: 90 },
    {
      headerName: 'Complaint Description',
      field: 'complaint_desc',
      autoHeight: true,
      wrapText: true,
      minWidth: 300,
    },
    {
      headerName: 'Request Department',
      field: 'sec_name',
      wrapText: true,
      filter: 'true',
      autoHeight: true,
      minWidth: 200,
    },
    { headerName: 'Section', field: 'location', autoHeight: true, wrapText: true, minWidth: 200 },
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
    { headerName: 'Complaint Type', field: 'complaint_type_name', filter: 'true', minWidth: 150 },
    {
      headerName: 'Complaint Department',
      field: 'complaint_dept_name',
      filter: 'true',
      wrapText: true,
      autoHeight: true,
      minWidth: 200,
    },
    { headerName: 'Employee', field: 'em_name', minWidth: 150 },
    { headerName: 'Request Date', field: 'compalint_date', minWidth: 150 },
    { headerName: 'Assign Date', field: 'assigned_date', minWidth: 150 },
    { headerName: 'Status', field: 'compalint_status1', filter: 'true', minWidth: 150 },
  ])
  const [rectified] = useState([
    { headerName: 'SlNo', field: 'complaint_slno', minWidth: 90 },
    {
      headerName: 'Complaint Description',
      field: 'complaint_desc',
      autoHeight: true,
      wrapText: true,
      minWidth: 300,
    },
    {
      headerName: 'Request Department',
      field: 'sec_name',
      wrapText: true,
      filter: 'true',
      autoHeight: true,
      minWidth: 200,
    },
    { headerName: 'Section', field: 'location', autoHeight: true, wrapText: true, minWidth: 200 },
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
    { headerName: 'Complaint Type', field: 'complaint_type_name', filter: 'true', minWidth: 150 },
    {
      headerName: 'Complaint Department',
      field: 'complaint_dept_name',
      filter: 'true',
      wrapText: true,
      autoHeight: true,
      minWidth: 200,
    },
    { headerName: 'Employee', field: 'em_name', minWidth: 150 },
    { headerName: 'Request Date', field: 'compalint_date', minWidth: 150 },
    { headerName: 'Assign Date', field: 'assigned_date', minWidth: 150 },
    { headerName: 'Rectify Date', field: 'cm_rectify_time', minWidth: 150 },
    { headerName: 'Status', field: 'compalint_status1', filter: 'true', minWidth: 150 },
  ])
  const [verified] = useState([
    { headerName: 'SlNo', field: 'complaint_slno', minWidth: 90 },
    {
      headerName: 'Complaint Description',
      field: 'complaint_desc',
      autoHeight: true,
      wrapText: true,
      minWidth: 300,
    },
    {
      headerName: 'Request Department',
      field: 'sec_name',
      wrapText: true,
      filter: 'true',
      autoHeight: true,
      minWidth: 200,
    },
    { headerName: 'Section', field: 'location', autoHeight: true, wrapText: true, minWidth: 200 },
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
    { headerName: 'Complaint Type', field: 'complaint_type_name', filter: 'true', minWidth: 150 },
    {
      headerName: 'Complaint Department',
      field: 'complaint_dept_name',
      filter: 'true',
      wrapText: true,
      autoHeight: true,
      minWidth: 200,
    },
    { headerName: 'Employee', field: 'em_name', minWidth: 150 },
    { headerName: 'Request Date', field: 'compalint_date', minWidth: 150 },
    { headerName: 'Assign Date', field: 'assigned_date', minWidth: 150 },
    { headerName: 'Rectify Date', field: 'cm_rectify_time', minWidth: 150 },
    { headerName: 'Verify Date', field: 'cm_verfy_time', minWidth: 150 },
    { headerName: 'Status', field: 'compalint_status1', filter: 'true', minWidth: 150 },
  ])
  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])
  const [flag, setFlag] = useState(1)

  const totalcmp = useCallback((e) => {
    if (e.target.checked === true) {
      setFlag(1)
      settotal(true)
      setassign(false)
      setverify(false)
      setrectify(false)
    } else {
      setFlag(1)
      settotal(false)
      setassign(false)
      setverify(false)
      setrectify(false)
    }
  }, [])

  const assigncmp = useCallback((e) => {
    if (e.target.checked === true) {
      setFlag(2)
      setassign(true)
      settotal(false)
      setverify(false)
      setrectify(false)
    } else {
      setFlag(1)
      setassign(false)
      settotal(false)
      setverify(false)
      setrectify(false)
    }
  }, [])
  const rectifycmp = useCallback((e) => {
    if (e.target.checked === true) {
      setFlag(3)
      setrectify(true)
      setverify(false)
      setassign(false)
      settotal(false)
    } else {
      setFlag(1)
      setverify(false)
      setassign(false)
      settotal(false)
      setrectify(false)
    }
  }, [])
  const verifycmp = useCallback((e) => {
    if (e.target.checked === true) {
      setFlag(4)
      setverify(true)
      setassign(false)
      settotal(false)
      setrectify(false)
    } else {
      setFlag(1)
      setverify(false)
      setassign(false)
      settotal(false)
      setrectify(false)
    }
  }, [])

  return (
    <CardCloseOnly title="Complaint List" close={backtoSetting}>
      <Box sx={{ width: '100%', p: 1 }}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' },
                mt: 1,
                justifyContent: 'center',
              }}
            >
              <CusCheckBox
                variant="outlined"
                color="danger"
                size="md"
                name="total"
                label="Total complaint"
                value={total}
                onCheked={totalcmp}
                checked={total}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' },
                mt: 1,
                justifyContent: 'center',
              }}
            >
              <CusCheckBox
                variant="outlined"
                color="danger"
                size="md"
                name="total"
                label="Assigned complaints"
                value={assign}
                onCheked={assigncmp}
                checked={assign}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' },
                mt: 1,
                justifyContent: 'center',
              }}
            >
              <CusCheckBox
                variant="outlined"
                color="danger"
                size="md"
                name="total"
                label="Rectified complaints"
                value={rectify}
                onCheked={rectifycmp}
                checked={rectify}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' },
                mt: 1,
                justifyContent: 'center',
              }}
            >
              <CusCheckBox
                variant="outlined"
                color="danger"
                size="md"
                name="total"
                label="Verified complaints"
                value={verify}
                onCheked={verifycmp}
                checked={verify}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
      <Paper square elevation={3} sx={{ p: 2 }}>
        {flag === 2 ? (
          <ComplistAgGridcmp columnDefs={assigned} tableData={assignall} rowHeight={30} />
        ) : flag === 3 ? (
          <ComplistAgGridcmp columnDefs={rectified} tableData={rectifyall} rowHeight={30} />
        ) : flag === 4 ? (
          <ComplistAgGridcmp columnDefs={verified} tableData={verifyall} rowHeight={30} />
        ) : (
          <ComplistAgGridcmp columnDefs={column} tableData={compall} rowHeight={30} />
        )}
      </Paper>
    </CardCloseOnly>
  )
}
export default memo(ComplaintList)
