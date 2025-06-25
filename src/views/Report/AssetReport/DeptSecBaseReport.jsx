import React, { useEffect, useCallback, memo, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import CusIconButton from '../../Components/CusIconButton'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import CusAgGridForReport from 'src/views/Components/CusAgGridForReport'
import { warningNotify } from '../../Common/CommonCode'
import DownloadIcon from '@mui/icons-material/Download'
import CustomeToolTip from '../../Components/CustomeToolTip'
import { ActionTyps } from 'src/redux/constants/action.type'
import { axioslogin } from 'src/views/Axios/Axios'
import { useDispatch } from 'react-redux'
import { Box, Typography, Paper } from '@mui/material'
import AmDepartmentSelWOName from 'src/views/CommonSelectCode/AmDepartmentSelWOName'
import AmDeptSecSelectWOName from 'src/views/CommonSelectCode/AmDeptSecSelectWOName'
import { getDepartment } from 'src/redux/actions/Department.action'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import AMCustodianDeptSelect from 'src/views/CommonSelectCode/AMCustodianDeptSelect'
import CloseIcon from '@mui/icons-material/Close'

const DeptSecBaseReport = () => {
  const history = useNavigate()
  const dispatch = useDispatch()
  const [TableData, setTableData] = useState([])
  const [exports, setexport] = useState(0)
  const [department, setDepartment] = useState(0)
  const [deptsec, setDeptSec] = useState(0)
  const [selectedDept, setSelectedDept] = useState(null)

  useEffect(() => {
    dispatch(getDepartment())
  }, [dispatch])

  // const postdata = useMemo(() => {
  //     return {
  //         item_dept_slno: department !== 0 ? department : 0,
  //         item_deptsec_slno: deptsec !== 0 ? deptsec : 0,
  //         item_custodian_dept_sec: deptsecid
  //     }
  // }, [department, deptsec, deptsecid])

  const postdata = useMemo(() => {
    return {
      item_dept_slno: department !== 0 ? department : 0,
      item_deptsec_slno: deptsec !== 0 ? deptsec : 0,
      item_custodian_slno: selectedDept?.am_custodian_slno || 0,
    }
  }, [department, deptsec, selectedDept])

  const Clear = useCallback(() => {
    setSelectedDept(null)
    setDeptSec(0)
    setDepartment(0)
    setTableData([])
  }, [])

  const search = useCallback(() => {
    const getAllItems = async (postdata) => {
      const result = await axioslogin.post(`/amReport/getItemsFronList`, postdata)
      const { success, data } = result.data
      if (success === 1) {
        const dispalyData =
          data &&
          data.map((val, index) => {
            const obj = {
              slno: index + 1,
              item_creation_slno: val.item_creation_slno,
              deptname: val.deptname,
              secname: val.secname,
              item_name: val.item_name,
              item_asset_no: val.item_asset_no,
              item_asset_no_only: val.item_asset_no_only,
              rm_room_name: val.rm_room_name !== null ? val.rm_room_name : 'Not Given',
              subroom_name: val.subroom_name !== null ? val.subroom_name : 'Not Given',
              assetno: val.item_asset_no + '/' + val.item_asset_no_only.toString().padStart(6, '0'),
              am_manufacture_no:
                val.am_manufacture_no !== null || val.am_manufacture_no !== ''
                  ? val.am_manufacture_no
                  : 'Not Given',
            }
            return obj
          })
        setTableData(dispalyData)
      } else {
        warningNotify('No Items Added')
        setTableData([])
      }
    }
    getAllItems(postdata)
  }, [postdata])

  const [columnDefs] = useState([
    { headerName: 'SlNo', field: 'slno', autoHeight: true, wrapText: true, minWidth: 70 },
    {
      headerName: 'Department ',
      field: 'deptname',
      autoHeight: true,
      wrapText: true,
      minWidth: 300,
      filter: 'true',
    },
    {
      headerName: 'Department Section',
      field: 'secname',
      autoHeight: true,
      wrapText: true,
      minWidth: 300,
      filter: 'true',
    },
    {
      headerName: 'Item Name',
      field: 'item_name',
      autoHeight: true,
      wrapText: true,
      minWidth: 350,
    },
    {
      headerName: 'Asset No',
      field: 'assetno',
      autoHeight: true,
      wrapText: true,
      minWidth: 180,
      filter: 'true',
    },
    {
      headerName: 'Room no',
      field: 'rm_room_name',
      autoHeight: true,
      wrapText: true,
      minWidth: 200,
      filter: 'true',
    },
    {
      headerName: 'Sub Room No',
      field: 'subroom_name',
      autoHeight: true,
      wrapText: true,
      minWidth: 200,
      filter: 'true',
    },
    {
      headerName: 'Serial No',
      field: 'am_manufacture_no',
      autoHeight: true,
      wrapText: true,
      minWidth: 200,
      filter: 'true',
    },
  ])

  const onExportClick = () => {
    if (TableData.length === 0) {
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
    <CardCloseOnly title="Department Section Based Item Report" close={backToSetting}>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            m: 0,
          }}
        >
          <Box sx={{ display: 'flex', flex: 1, mt: 2, mx: 1, gap: 1 }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550, pl: 0.5 }}>
                {' '}
                Custodian Department
              </Typography>
              <AMCustodianDeptSelect
                selectedDept={selectedDept}
                setSelectedDept={setSelectedDept}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550, pl: 0.5 }}>
                Department
              </Typography>
              <AmDepartmentSelWOName department={department} setDepartment={setDepartment} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550, pl: 0.5 }}>
                Department Section
              </Typography>
              <AmDeptSecSelectWOName deptsec={deptsec} setDeptSec={setDeptSec} />
            </Box>
            <Box sx={{ pt: 2.2 }}>
              <CusIconButton size="sm" variant="outlined" clickable="true" onClick={search}>
                <SearchOutlinedIcon fontSize="small" />
              </CusIconButton>
            </Box>
            <Box sx={{ width: 50, pt: 2.2 }}>
              <CusIconButton size="sm" variant="outlined" clickable="true" onClick={Clear}>
                <CloseIcon fontSize="small" />
              </CusIconButton>
            </Box>
            <Box sx={{ flex: 0.5 }}></Box>
          </Box>
        </Box>
        <Paper square sx={{ width: { md: '100%', lg: '100%', xl: '100%' }, p: 1 }}>
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
          </Paper>
          <CusAgGridForReport columnDefs={columnDefs} tableData={TableData} />
        </Paper>
        {/* <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550, pl: 1 }} >Department</Typography>
                        <Box>
                            <AMCustodianDeptSelect selectedDept={selectedDept} setSelectedDept={setSelectedDept} />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550, pl: 1 }} >Department</Typography>
                        <Box>
                            <AmDepartmentSelWOName
                                department={department}
                                setDepartment={setDepartment}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550, pl: 1 }} >Department Section</Typography>
                        <Box>
                            <AmDeptSecSelectWOName
                                deptsec={deptsec}
                                setDeptSec={setDeptSec}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
                        <CusIconButton size="sm" variant="outlined" clickable="true" onClick={search} >
                            <SearchOutlinedIcon fontSize='small' />
                        </CusIconButton>
                    </Box> */}
      </Box>
    </CardCloseOnly>
  )
}

export default memo(DeptSecBaseReport)
