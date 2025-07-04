import React, { useCallback, useMemo, useState, memo } from 'react'
import { Paper, Typography, Box } from '@mui/material'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import CustomBackDrop from 'src/views/Components/CustomBackDrop'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import CusIconButton from '../../Components/CusIconButton'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import { format } from 'date-fns'
// import DownloadIcon from '@mui/icons-material/Download'
// import CustomeToolTip from '../../Components/CustomeToolTip'
// import { ActionTyps } from 'src/redux/constants/action.type'

const DeptWiseReport = () => {
  const history = useNavigate()
  // const dispatch = useDispatch();
  const [open, setOpen] = useState(false)

  const [dateset, SetDate] = useState({
    start_date: format(new Date(), 'dd-MM-yyyy'),
    end_date: format(new Date(), 'dd-MM-yyyy')
  })

  const { start_date, end_date } = dateset
  const getDate = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      SetDate({ ...dateset, [e.target.name]: value })
    },
    [dateset]
  )

  const dept_slno = useSelector(state => {
    return state.LoginUserData.empdept
  })

  const postdata = useMemo(() => {
    return {
      start_date: start_date,
      end_date: end_date,
      department_slno: dept_slno
    }
  }, [start_date, end_date, dept_slno])

  const [tabledata, setTableData] = useState([])

  const clicksearch = useCallback(
    e => {
      e.preventDefault()
      setOpen(true)
      const getdataFromDatabase = async () => {
        const result = await axioslogin.post('/getTatReports/getAllCopmDeptWise', postdata)
        const { success, data } = result.data
        if (success === 1) {
          setTableData(data)
          setOpen(false)
        } else {
          setTableData([])
          warningNotify('No complaint Registered In selected Date Range')
          setOpen(false)
        }
      }

      getdataFromDatabase(postdata)
    },
    [postdata]
  )

  //column title setting
  const [column] = useState([
    { headerName: 'SlNo', field: 'complaint_slno', minWidth: 90 },
    {
      headerName: 'Complaint Description',
      field: 'complaint_desc',
      autoHeight: true,
      wrapText: true,
      minWidth: 300
    },
    {
      headerName: 'Request Department',
      field: 'sec_name',
      minWidth: 250,
      filter: 'true',
      wrapText: true,
      autoHeight: true
    },
    {
      headerName: 'Location',
      field: 'location',
      minWidth: 250,
      filter: 'true',
      autoHeight: true,
      wrapText: true
    },
    { headerName: 'Complaint Type', field: 'complaint_type_name', filter: 'true', minWidth: 180 },
    {
      headerName: 'Complaint Department',
      field: 'complaint_dept_name',
      filter: 'true',
      minWidth: 200
    },
    { headerName: 'Request Date', field: 'compalint_date', filter: 'true', minWidth: 180 },
    { headerName: 'Assigned Employee', field: 'em_name', filter: 'true', minWidth: 180 },
    { headerName: 'Assign Date', field: 'assigned_date', minWidth: 180 },
    { headerName: 'Rectify Date', field: 'cm_rectify_time', filter: 'true', minWidth: 180 },
    { headerName: 'Verify Date', field: 'cm_verfy_time', filter: 'true', minWidth: 180 },
    { headerName: 'Status', field: 'compalint_status1', filter: 'true', minWidth: 180 }
  ])

  //close button function
  const backToSetting = useCallback(() => {
    history('/Home')
  }, [history])

  // const [exports, setexport] = useState(0)

  // const onExportClick = () => {
  //     if (tabledata.length === 0) {
  //         warningNotify("No Data For Download, Please select dates")
  //         setexport(0)
  //     }
  //     else {
  //         setexport(1)
  //     }
  // }
  // useEffect(() => {
  //     if (exports === 1) {
  //         dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 1 })
  //         setexport(0)
  //     }
  //     else {
  //         dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
  //     }
  // }, [exports, dispatch])

  return (
    <CardCloseOnly title="All Complaint Dept Wise Report" close={backToSetting}>
      <CustomBackDrop open={open} text="Please Wait" />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Paper square elevation={2} sx={{ p: 2 }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' },
                mt: 1
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  ml: 0.5,
                  mt: 0.5
                }}
              >
                <Typography>Start Date</Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: 15,
                  mb: 1
                }}
              >
                <TextFieldCustom type="date" size="sm" name="start_date" value={start_date} onchange={getDate} />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' },
                mt: 1
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  ml: 0.5,
                  mt: 0.5,
                  pl: 1
                }}
              >
                <Typography>End Date</Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: 15,
                  mb: 1
                }}
              >
                <TextFieldCustom type="date" size="sm" name="end_date" value={end_date} onchange={getDate} />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' },
                ml: 1,
                mt: 0.5
              }}
            >
              <Box
                sx={{
                  width: '20%',
                  mt: 0.8
                }}
              >
                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={clicksearch}>
                  <SearchOutlinedIcon fontSize="small" />
                </CusIconButton>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Paper
        square
        sx={{
          width: { md: '100%', lg: '100%', xl: '100%' },
          p: 1
        }}
      >
        {/* Rigth Side Menu  */}
        {/* <Paper
                    square
                    sx={{
                        backgroundColor: '#f0f3f5',
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row-reverse',
                        gap: 0.1,
                        p: 0.3,
                        borderLeft: 2,
                        borderColor: '#d3d3d3',
                    }}
                >
                    <CustomeToolTip title="Download" placement="bottom">
                        <Box>
                            <CusIconButton variant="outlined" size="sm" color="success" onClick={onExportClick}>
                                <DownloadIcon />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>
                </Paper> */}

        <CusAgGridForMain columnDefs={column} tableData={tabledata} />
      </Paper>
    </CardCloseOnly>
  )
}

export default memo(DeptWiseReport)
