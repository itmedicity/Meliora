import React, { useEffect, useCallback, memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CusIconButton from '../../Components/CusIconButton'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { errorNotify, warningNotify } from '../../Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { useDispatch } from 'react-redux'
import AmDepartmentSelWOName from 'src/views/CommonSelectCode/AmDepartmentSelWOName'
import AmDeptSecSelectWOName from 'src/views/CommonSelectCode/AmDeptSecSelectWOName'
import { getDepartment } from 'src/redux/actions/Department.action'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import CloseIcon from '@mui/icons-material/Close'
import PmTable from './PmTable'
import { Box, CircularProgress, CssVarsProvider, Typography } from '@mui/joy'
import { Paper } from '@mui/material'

const PmOverdueList = () => {
  const history = useNavigate()
  const dispatch = useDispatch()
  const [TableData, setTableData] = useState([])
  const [department, setDepartment] = useState(0)
  const [deptsec, setDeptSec] = useState(0)
  const deptsecid = useSelector((state) => state.LoginUserData.empsecid, _.isEqual)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(getDepartment())
  }, [dispatch])

  useEffect(() => {
    if (deptsecid > 0) {
      const getCondemnatnList = async (deptsecid) => {
        setLoading(true)
        try {
          const result = await axioslogin.get(`/SpareCondemService/pmDueOverList/${deptsecid}`)
          const { success, data } = result.data
          if (success === 1 && data.length > 0) {
            const dataaa = data.map((val) => ({
              ...val,
              assetNo: val.item_asset_no + '/' + val.item_asset_no_only.toString().padStart(6, '0'),
              roomname: val.rm_room_name !== null ? val.rm_room_name : 'Not Updated',
              subroom: val.subroom_name !== null ? val.subroom_name : 'Not Updated',
            }))
            setTableData(dataaa)
          } else {
            setTableData([])
          }
        } catch (error) {
          errorNotify('Error fetching data:', error)
          setTableData([])
        } finally {
          setLoading(false)
        }
      }

      getCondemnatnList(deptsecid)
    }
  }, [deptsecid])

  const backToSetting = useCallback(() => {
    history(`/Home/Reports`)
  }, [history])

  const search = useCallback(() => {
    const getdeptDeptsecArry = (TableData) => {
      const deptDeptsecArry = TableData.filter((val) => {
        return val.item_dept_slno === department && val.item_deptsec_slno === deptsec
      })
      setTableData(deptDeptsecArry)
    }
    const getdeptArry = (TableData) => {
      const deptArry = TableData.filter((val) => {
        return val.item_dept_slno === department
      })
      setTableData(deptArry)
    }
    const getDeptsecArry = (TableData) => {
      const DeptsecArry = TableData.filter((val) => {
        return val.item_deptsec_slno === deptsec
      })
      setTableData(DeptsecArry)
    }
    if (department !== 0 && (deptsec === 0 || deptsec === undefined)) {
      getdeptArry(TableData)
    } else if (department === 0 && (deptsec !== 0 || deptsec !== undefined)) {
      getDeptsecArry(TableData)
    } else if (department !== 0 && deptsec !== 0) {
      getdeptDeptsecArry(TableData)
    } else {
      warningNotify('Please select any condition before search')
    }
  }, [department, deptsec, TableData])

  useEffect(() => {
    let isMounted = true
    const getCondemnatnList = async (deptsecid) => {
      setLoading(true)
      try {
        const result = await axioslogin.get(`/SpareCondemService/pmDueOverList/${deptsecid}`)
        const { success, data } = result.data
        if (isMounted) {
          if (success === 1 && data.length > 0) {
            const dataaa = data.map((val) => ({
              ...val,
              assetNo: val.item_asset_no + '/' + val.item_asset_no_only.toString().padStart(6, '0'),
              roomname: val.rm_room_name !== null ? val.rm_room_name : 'Not Updated',
              subroom: val.subroom_name !== null ? val.subroom_name : 'Not Updated',
            }))
            setTableData(dataaa)
          } else {
            setTableData([])
          }
        }
      } catch (error) {
        if (isMounted) {
          errorNotify('Error fetching data:', error)
          setTableData([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    if (department === 0 && deptsec === 0) {
      getCondemnatnList(deptsecid)
    } else if (department === 0) {
      getCondemnatnList(deptsecid)
    } else if (deptsec === 0) {
      getCondemnatnList(deptsecid)
    }

    // Cleanup function to prevent state updates on unmount
    return () => {
      isMounted = false
    }
  }, [deptsecid, deptsec, department])

  const Closefunctn = useCallback(() => {
    setDepartment(0)
    setDeptSec(0)
  }, [])

  return (
    <CardCloseOnly title="PM Date Due List" close={backToSetting}>
      <Box sx={{ flex: 1, display: 'flex', px: 1, pt: 2.5, gap: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550, pl: 1 }}>
            Department
          </Typography>
          <AmDepartmentSelWOName department={department} setDepartment={setDepartment} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550, pl: 1 }}>
            Department Section
          </Typography>
          <AmDeptSecSelectWOName deptsec={deptsec} setDeptSec={setDeptSec} />
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5, pt: 2 }}>
          <CusIconButton size="sm" variant="outlined" clickable="true" onClick={search}>
            <SearchOutlinedIcon fontSize="small" sx={{ color: '#055C9D' }} />
          </CusIconButton>
          <CusIconButton size="sm" variant="outlined" clickable="true" onClick={Closefunctn}>
            <CloseIcon fontSize="small" sx={{ color: '#055C9D' }} />
          </CusIconButton>
        </Box>
        <Box sx={{ flex: 1 }}></Box>
        <Box
          sx={{ width: 210, border: 1, borderColor: 'lightgrey', p: 0.5, display: 'flex', gap: 1 }}
        >
          <Box sx={{ border: 1, px: 1, pt: 1, color: '#055FA3', fontWeight: 500, minWidth: 50 }}>
            {' '}
            {TableData.length}
          </Box>
          <Typography sx={{ fontSize: 20, color: '#055C9D', pt: 0.8 }}>PM Pending</Typography>
        </Box>
      </Box>
      <Paper square sx={{ width: { md: '100%', lg: '100%', xl: '100%' }, p: 1 }}>
        <Box>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="400px">
              <CssVarsProvider>
                <CircularProgress />
                <Typography ml={2}>Loading data, please wait...</Typography>
              </CssVarsProvider>
            </Box>
          ) : TableData.length > 0 ? (
            <Box>
              <PmTable tableData={TableData} />
            </Box>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" height="400px">
              <Typography>No data available</Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </CardCloseOnly>
  )
}

export default memo(PmOverdueList)
