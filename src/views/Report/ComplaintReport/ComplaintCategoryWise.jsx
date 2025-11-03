import React, { useCallback, useMemo, useState, memo, useEffect } from 'react'
import { Paper, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from '../../Components/CusIconButton'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { differenceInSeconds, format } from 'date-fns'
import { useDispatch } from 'react-redux'
import CusAgGridForReport from 'src/views/Components/CusAgGridForReport'
import { warningNotify } from '../../Common/CommonCode'
import DownloadIcon from '@mui/icons-material/Download'
import CustomeToolTip from '../../Components/CustomeToolTip'
import { ActionTyps } from 'src/redux/constants/action.type'
import ComplaintCategorySelect from 'src/views/CommonSelectCode/ComplaintCategorySelect'
import CustomBackDrop from 'src/views/Components/CustomBackDrop'
import { axioslogin } from 'src/views/Axios/Axios'

const ComplaintCategoryWise = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const [open, setOpen] = useState(false)
  const [exports, setexport] = useState(0)
  const [dateset, SetDate] = useState({
    start_date: format(new Date(), 'dd-MM-yyyy'),
    end_date: format(new Date(), 'dd-MM-yyyy')
  })
  const [category, setCategory] = useState(0)
  const { start_date, end_date } = dateset
  const getDate = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      SetDate({ ...dateset, [e.target.name]: value })
    },
    [dateset]
  )

  const postdata = useMemo(() => {
    return {
      start_date: start_date,
      end_date: end_date,
      complaint_typeslno: category
    }
  }, [start_date, end_date, category])

  const [tabledata, setTableData] = useState([])

  const clicksearch = useCallback(
    e => {
      e.preventDefault()
      setOpen(true)
      const getdatas = async () => {
        const result = await axioslogin.post(`/getTatReports/ReqComCategorty`, postdata)
        const { success, data } = result.data
        if (success === 1) {
          const dispalyData =
            data &&
            data.map(val => {
              const assignedDate = val.assigned_date ? new Date(val.assigned_date) : null
              const complaintDate = val.compalint_date ? new Date(val.compalint_date) : null
              const rectifiedDate = val.cm_rectify_time ? new Date(val.cm_rectify_time) : null

              let req_Assing = 'Not Updated'
              if (assignedDate && complaintDate) {
                const totalSeconds = differenceInSeconds(assignedDate, complaintDate)
                const days = Math.floor(totalSeconds / 86400) // 86400 seconds in a day
                const hours = Math.floor((totalSeconds % 86400) / 3600)
                const minutes = Math.floor((totalSeconds % 3600) / 60)
                const seconds = totalSeconds % 60
                req_Assing =
                  days > 0
                    ? `${days}d : ${hours}h : ${minutes}m : ${seconds}s`
                    : `${hours}h : ${minutes}m : ${seconds}s`
              }

              let assin_rect = 'Not Updated'
              if (rectifiedDate && assignedDate) {
                const totalSeconds = differenceInSeconds(rectifiedDate, assignedDate)
                const days = Math.floor(totalSeconds / 86400) // 86400 seconds in a day
                const hours = Math.floor((totalSeconds % 86400) / 3600)
                const minutes = Math.floor((totalSeconds % 3600) / 60)
                const seconds = totalSeconds % 60
                assin_rect =
                  days > 0
                    ? `${days}d : ${hours}h : ${minutes}m : ${seconds}s`
                    : `${hours}h : ${minutes}m : ${seconds}s`
              }

              let Request_Rectify = 'Not Updated'
              if (rectifiedDate && complaintDate) {
                const totalSeconds = differenceInSeconds(rectifiedDate, complaintDate)
                const days = Math.floor(totalSeconds / 86400) // 86400 seconds in a day
                const hours = Math.floor((totalSeconds % 86400) / 3600)
                const minutes = Math.floor((totalSeconds % 3600) / 60)
                const seconds = totalSeconds % 60
                Request_Rectify =
                  days > 0
                    ? `${days}d : ${hours}h : ${minutes}m : ${seconds}s`
                    : `${hours}h : ${minutes}m : ${seconds}s`
              }

              const obj = {
                slno: val.complaint_slno,
                date: format(new Date(val.compalint_date), 'dd-MM-yyyy'),
                location: val.location !== null ? val.location : 'Not Given',
                desc: val.complaint_desc,
                createuser: val.createuser,
                category: val.complaint_type_name !== null ? val.complaint_type_name : 'Not Given',
                priority: val.cm_priority_desc !== null ? val.cm_priority_desc : 'Not Given',
                deptLocation: val.room_location !== null ? val.room_location : val.cm_complaint_location !== null ? val.cm_complaint_location : "Not Given",
                requestdate:
                  val.compalint_date !== null
                    ? format(new Date(val.compalint_date), 'dd-MM-yyyy H:mm:ss')
                    : 'Not Given',
                assigndate:
                  val.assigned_date !== null ? format(new Date(val.assigned_date), 'dd-MM-yyyy H:mm:ss') : 'Not Given',
                rectifydate:
                  val.cm_rectify_time !== null
                    ? format(new Date(val.cm_rectify_time), 'dd-MM-yyyy H:mm:ss')
                    : 'Not Given',
                verifydate:
                  val.cm_verfy_time !== null
                    ? format(new Date(val.cm_verfy_time), 'dd-MM-yyyy H:mm:ss')
                    : 'Not Assigned',
                req_Assing: req_Assing,
                assin_rect: assin_rect,
                Request_Rectify: Request_Rectify
              }
              return obj
            })
          setTableData(dispalyData)
          setOpen(false)
        } else {
          warningNotify('No Data In Selected Condition')
          setTableData([])
          setOpen(false)
        }
      }
      getdatas()
    },
    [postdata]
  )



  const [columnDefs] = useState([
    { headerName: 'SlNo', field: 'slno', autoHeight: true, wrapText: true, minWidth: 100 },
    {
      headerName: 'Date',
      field: 'date',
      autoHeight: true,
      wrapText: true,
      minWidth: 150,
      filter: 'true'
    },
    {
      headerName: 'Department Section',
      field: 'location',
      autoHeight: true,
      wrapText: true,
      minWidth: 200,
      filter: 'true'
    },
    {
      headerName: 'Location',
      field: 'deptLocation',
      autoHeight: true,
      wrapText: true,
      minWidth: 200,
      filter: 'true'
    },
    {
      headerName: 'Complaint Description',
      field: 'desc',
      autoHeight: true,
      wrapText: true,
      minWidth: 300
    },
    {
      headerName: 'Category',
      field: 'category',
      autoHeight: true,
      wrapText: true,
      minWidth: 150,
      filter: 'true'
    },
    {
      headerName: 'Priority',
      field: 'priority',
      autoHeight: true,
      wrapText: true,
      minWidth: 150,
      filter: 'true'
    },
    {
      headerName: 'Req.User',
      field: 'createuser',
      autoHeight: true,
      wrapText: true,
      minWidth: 150,
      filter: 'true'
    },
    {
      headerName: 'Request Time ',
      field: 'requestdate',
      autoHeight: true,
      wrapText: true,
      minWidth: 180,
      filter: 'true'
    },
    {
      headerName: 'Assigning Time ',
      field: 'assigndate',
      autoHeight: true,
      wrapText: true,
      minWidth: 180,
      filter: 'true'
    },
    {
      headerName: 'Rectify Time ',
      field: 'rectifydate',
      autoHeight: true,
      wrapText: true,
      minWidth: 180,
      filter: 'true'
    },
    {
      headerName: 'Veryfyication Time',
      field: 'verifydate',
      autoHeight: true,
      wrapText: true,
      minWidth: 180,
      filter: 'true'
    },
    {
      headerName: 'TAT Time(Request_Assing)',
      field: 'req_Assing',
      autoHeight: true,
      wrapText: true,
      minWidth: 100,
      filter: 'true'
    },
    {
      headerName: 'TAT Time(Assing_Rectify)',
      field: 'assin_rect',
      autoHeight: true,
      wrapText: true,
      minWidth: 100,
      filter: 'true'
    },
    {
      headerName: 'TAT Time(Request_Rectify)',
      field: 'Request_Rectify',
      autoHeight: true,
      wrapText: true,
      minWidth: 100,
      filter: 'true'
    },

  ])

  const onExportClick = () => {
    if (tabledata.length === 0) {
      warningNotify('No Data For Download, Please select dates')
      setexport(0)
    } else {
      setexport(1)
    }
  }

  useEffect(() => {
    if (exports === 1) {
      dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 1 })
      setexport(0)
    } else {
      dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
    }
  }, [exports, dispatch])

  const backToSetting = useCallback(() => {
    history(`/Home/Reports`)
  }, [history])

  return (
    <CardCloseOnly title="Complaint Category Report" close={backToSetting}>
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
                <Typography>Category</Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: 15,
                  mb: 1
                }}
              >
                <ComplaintCategorySelect value={category} setValue={setCategory} />
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
        <Paper
          square
          sx={{
            width: { md: '100%', lg: '100%', xl: '100%' },
            p: 1
          }}
        >
          {/* Rigth Side Menu  */}
          <Paper
            square
            sx={{
              backgroundColor: '#f0f3f5',
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row-reverse',
              gap: 0.1,
              p: 0.3,
              borderLeft: 2,
              borderColor: '#d3d3d3'
            }}
          >
            <CustomeToolTip title="Download" placement="bottom">
              <Box>
                <CusIconButton variant="outlined" size="sm" color="success" onClick={onExportClick}>
                  <DownloadIcon />
                </CusIconButton>
              </Box>
            </CustomeToolTip>
          </Paper>
          <CusAgGridForReport columnDefs={columnDefs} tableData={tabledata} />
        </Paper>
      </Box>
    </CardCloseOnly>
  )
}

export default memo(ComplaintCategoryWise)
