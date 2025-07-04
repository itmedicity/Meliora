import React, { memo, useCallback, useState, useMemo, useEffect } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from '../../Components/CusIconButton'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { format } from 'date-fns'

const GRNDeailtsComp = ({ detailArry, grndetailarry, exist, setExist, assetSpare }) => {
  const { am_item_map_slno, am_spare_item_map_slno } = detailArry
  const { am_grn_no, am_grn_date } = grndetailarry

  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const [userdata, setUserdata] = useState({
    searchgrnFromDate: '',
    searchgrnToDate: '',
    searchgrnAlready: '',
    grnNo: '',
    grndate: ''
  })

  useEffect(() => {
    if (am_grn_no !== undefined || am_grn_date !== undefined) {
      const frmdata = {
        searchgrnFromDate: '',
        searchgrnToDate: '',
        searchgrnAlready: '',
        grnNo: am_grn_no !== null ? am_grn_no : '',
        grndate: am_grn_date !== null ? format(new Date(am_grn_date), 'yyyy-MM-dd') : ''
      }
      setUserdata(frmdata)
    }
  }, [am_grn_no, am_grn_date])
  //Destructuring
  const { searchgrnFromDate, searchgrnToDate, searchgrnAlready, grnNo, grndate } = userdata

  const updateGrnDetails = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setUserdata({ ...userdata, [e.target.name]: value })
    },
    [userdata]
  )

  const search = useCallback(() => {}, [])

  const searchGrn = useCallback(() => {}, [])

  const patchData = useMemo(() => {
    return {
      am_grn_no: grnNo,
      am_grn_date: grndate,
      edit_user: id,
      am_item_map_slno: am_item_map_slno
    }
  }, [grnNo, grndate, id, am_item_map_slno])

  const patchDataSpare = useMemo(() => {
    return {
      am_grn_no: grnNo,
      am_grn_date: grndate,
      edit_user: id,
      am_spare_item_map_slno: am_spare_item_map_slno
    }
  }, [grnNo, grndate, id, am_spare_item_map_slno])

  const reset = () => {
    const frmdata = {
      searchgrnFromDate: '',
      searchgrnToDate: '',
      searchgrnAlready: '',
      grnNo: '',
      grndate: ''
    }
    setUserdata(frmdata)
  }

  const EditDetails = useCallback(
    e => {
      e.preventDefault()
      const checkinsertOrNot = async am_item_map_slno => {
        const result = await axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNot/${am_item_map_slno}`)
        const { success, data } = result.data
        if (success === 1) {
          const { am_grn_no, am_grn_date } = data[0]
          const frmdata = {
            searchgrnFromDate: '',
            searchgrnToDate: '',
            searchgrnAlready: '',
            grnNo: am_grn_no !== null ? am_grn_no : '',
            grndate: am_grn_date !== null ? format(new Date(am_grn_date), 'yyyy-MM-dd') : ''
          }
          setUserdata(frmdata)
        } else {
          warningNotify('Data Not Saved Yet')
        }
      }

      const checkinsertOrNotSpare = async am_spare_item_map_slno => {
        const result = await axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNotSpare/${am_spare_item_map_slno}`)
        const { success, data } = result.data
        if (success === 1) {
          const { am_grn_no, am_grn_date } = data[0]
          const frmdata = {
            searchgrnFromDate: '',
            searchgrnToDate: '',
            searchgrnAlready: '',
            grnNo: am_grn_no !== null ? am_grn_no : '',
            grndate: am_grn_date !== null ? format(new Date(am_grn_date), 'yyyy-MM-dd') : ''
          }
          setUserdata(frmdata)
        } else {
          warningNotify('Data Not Saved Yet')
        }
      }

      const updateGRNDetails = async patchData => {
        const result = await axioslogin.patch('/ItemMapDetails/GRNDetailsUpdate', patchData)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
        }
      }

      const updateGRNDetailsSpare = async patchDataSpare => {
        const result = await axioslogin.patch('/ItemMapDetails/GRNDetailsUpdateSpare', patchDataSpare)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
        }
      }

      if (grnNo === '' && grndate === '') {
        if (assetSpare === 1) {
          checkinsertOrNot(am_item_map_slno)
        } else {
          checkinsertOrNotSpare(am_spare_item_map_slno)
        }
      } else {
        if (assetSpare === 1) {
          updateGRNDetails(patchData)
        } else {
          updateGRNDetailsSpare(patchDataSpare)
        }
      }
    },
    [grnNo, grndate, am_item_map_slno, patchData, assetSpare, am_spare_item_map_slno, patchDataSpare]
  )

  const refreshBilldetail = useCallback(() => {
    reset()
  }, [])
  return (
    <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}
      >
        <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }}>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }}>From Date</Typography>
          <Box>
            <TextFieldCustom
              type="date"
              size="sm"
              name="searchgrnFromDate"
              value={searchgrnFromDate}
              onchange={updateGrnDetails}
            ></TextFieldCustom>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }}>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }}>To Date</Typography>
          <Box>
            <TextFieldCustom
              type="date"
              size="sm"
              name="searchgrnToDate"
              value={searchgrnToDate}
              onchange={updateGrnDetails}
            ></TextFieldCustom>
          </Box>
        </Box>
        <Box sx={{ width: '3%', pl: 1, pt: 3 }}>
          <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={search}>
            <SearchOutlinedIcon fontSize="small" />
          </CusIconButton>
        </Box>

        <Box sx={{ width: '3%', pl: 5, pt: 4 }}>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }}>OR</Typography>
        </Box>
        <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column', ml: 3 }}>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }}>GRN No</Typography>
          <Box>
            <TextFieldCustom
              type="text"
              size="sm"
              name="searchgrnAlready"
              value={searchgrnAlready}
              onchange={updateGrnDetails}
            ></TextFieldCustom>
          </Box>
        </Box>
        <Box sx={{ width: '3%', pl: 1, pt: 3 }}>
          <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchGrn}>
            <SearchOutlinedIcon fontSize="small" />
          </CusIconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}
      >
        <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }}>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }}>GRN/Temp GRN No</Typography>
          <Box>
            <TextFieldCustom
              type="text"
              size="sm"
              name="grnNo"
              value={grnNo}
              onchange={updateGrnDetails}
            ></TextFieldCustom>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }}>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }}>GRN Date</Typography>
          <Box>
            <TextFieldCustom
              type="date"
              size="sm"
              name="grndate"
              value={grndate}
              onchange={updateGrnDetails}
            ></TextFieldCustom>
          </Box>
        </Box>
        <CustomeToolTip title="Save" placement="top">
          <Box sx={{ width: '3%', pl: 5, pr: 1, pt: 3 }}>
            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={EditDetails}>
              <LibraryAddIcon fontSize="small" />
            </CusIconButton>
          </Box>
        </CustomeToolTip>

        <CustomeToolTip title="Refresh" placement="top">
          <Box sx={{ width: '3%', pl: 4, pt: 3 }}>
            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={refreshBilldetail}>
              <RefreshIcon fontSize="small" />
            </CusIconButton>
          </Box>
        </CustomeToolTip>
      </Box>
    </Paper>
  )
}

export default memo(GRNDeailtsComp)
