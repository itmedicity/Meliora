import React, { memo, useCallback, useEffect, useState, useMemo } from 'react'
import AmDepartmentSelWOName from 'src/views/CommonSelectCode/AmDepartmentSelWOName'
import AmDeptSecSelectWOName from 'src/views/CommonSelectCode/AmDeptSecSelectWOName'
import CusIconButton from '../../Components/CusIconButton'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ItemListViewTable from './ItemListViewTable'
import { axioslogin } from 'src/views/Axios/Axios'
import { useDispatch } from 'react-redux'
import { getDepartment } from 'src/redux/actions/Department.action'
import AmItemDeptSecBsedWOName from 'src/views/CommonSelectCode/AmItemDeptSecBsedWOName'
import { warningNotify } from 'src/views/Common/CommonCode'
import AmDeptSecSelectSpare from 'src/views/CommonSelectCode/AmDeptSecSelectSpare'
import AmSpareItemListDeptSecBsed from 'src/views/CommonSelectCode/AmSpareItemListDeptSecBsed'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import { Box, Typography } from '@mui/joy'

const ItemDetailAdd = React.lazy(() => import('../ItemDetailEnter/ItemDetailEnterMain'))

const ItemListViewDept = ({ assetSpare }) => {
  const dispatch = useDispatch()
  const [department, setDepartment] = useState(0)
  const [deptsec, setDeptSec] = useState(0)
  const [item, setItem] = useState(0)
  const deptsecid = useSelector(state => state.LoginUserData.empsecid, _.isEqual)
  const [count, setCount] = useState(0)
  const [detailArry, setDetailArry] = useState([])
  const [detailflag, setDetailflag] = useState(0)
  const [displayarry, setDisArry] = useState([])
  const [flag, setFlag] = useState(0)

  const postdata = useMemo(() => {
    return {
      item_dept_slno: department !== undefined ? department : 0,
      item_deptsec_slno: deptsec !== undefined ? deptsec : 0,
      item_creation_slno: item !== undefined ? item : 0,
    }
  }, [department, deptsec, item])
  const postdataSpare = useMemo(() => {
    return {
      spare_dept_slno: department !== undefined ? department : 0,
      spare_deptsec_slno: deptsec !== undefined ? deptsec : 0,
      spare_creation_slno: item !== undefined ? item : 0,
    }
  }, [department, deptsec, item])

  useEffect(() => {
    dispatch(getDepartment())
  }, [dispatch])

  const search = useCallback(() => {
    const getdata = async postdata => {
      const result = await axioslogin.post(`/itemCreationDeptmap/getItemsFronList`, postdata)
      const { success, data } = result.data
      if (success === 1) {
        setDisArry(data)
        setFlag(1)
      } else {
        warningNotify('No data for Selected Condition')
        setDisArry([])
        setFlag(0)
      }
    }
    const getdataSpareItem = async postdataSpare => {
      const result = await axioslogin.post(
        `/itemCreationDeptmap/getSpareItemsFronList`,
        postdataSpare
      )
      const { success, data } = result.data
      if (success === 1) {
        setDisArry(data)
        setFlag(1)
      } else {
        warningNotify('No data for Selected Condition')
        setDisArry([])
        setFlag(0)
      }
    }
    if (department !== 0 && department !== undefined) {
      if (assetSpare === 1) {
        getdata(postdata)
      } else {
        getdataSpareItem(postdataSpare)
      }
    } else {
      warningNotify('Please select department')
    }
  }, [postdata, postdataSpare, department, assetSpare])

  const [serialno, setSerailno] = useState('')

  const updateSerialno = useCallback(e => {
    setSerailno(e.target.value)
  }, [])

  const SearchbySerialNo = useCallback(() => {
    const getdataBySerailByAsset = async postdata => {
      const result = await axioslogin.post(`/itemCreationDeptmap/getDataBySerialNoAsset`, postdata)
      const { success, data } = result.data
      if (success === 1) {
        setDisArry(data)
        setFlag(1)
        setSerailno('')
      } else {
        warningNotify('No data for Selected Condition')
        setDisArry([])
        setFlag(0)
      }
    }
    const getdataBySerailSpare = async postdata => {
      const result = await axioslogin.post(`/itemCreationDeptmap/getdataBySerailNoSpare`, postdata)
      const { success, data } = result.data
      if (success === 1) {
        setDisArry(data)
        setFlag(1)
        setSerailno('')
      } else {
        warningNotify('No data for Selected Condition')
        setDisArry([])
        setFlag(0)
      }
    }
    const searchserial = {
      am_manufacture_no: serialno,
      item_custodian_dept_sec: deptsecid,
      spare_custodian_dept_sec: deptsecid,
    }
    if (serialno !== '') {
      if (assetSpare === 1) {
        getdataBySerailByAsset(searchserial)
      } else {
        getdataBySerailSpare(searchserial)
      }
    } else {
      warningNotify('Please Enter serail no before search')
    }
  }, [serialno, assetSpare, deptsecid])

  const AddDetails = useCallback(params => {
    const data = params.api.getSelectedRows()
    setDetailArry(data[0])
    setDetailflag(1)
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
      }}
    >
      {detailflag === 1 ? (
        <ItemDetailAdd
          detailArry={detailArry}
          setDetailflag={setDetailflag}
          assetSpare={assetSpare}
          setCount={setCount}
          count={count}
        />
      ) : (
        <Box sx={{ flex: 1 }}>
          <Box sx={{ flex: 1, display: 'flex', m: 1, border: 1, p: 1, borderColor: 'lightgray' }}>
            <Box
              sx={{
                display: 'flex',
                minWidth: 250,
                maxWidth: 300,
              }}
            >
              <Box sx={{ pl: 0.5, flex: 1 }}>
                <Typography sx={{ pl: 0.3 }}>Serial No.</Typography>
                <TextFieldCustom
                  placeholder={'search serial no.'}
                  type="text"
                  size="sm"
                  name="serialno"
                  value={serialno}
                  onchange={updateSerialno}
                ></TextFieldCustom>
              </Box>
            </Box>
            <Box sx={{ pt: 3.5, mx: 1.5, fontStyle: 'italic' }}>(or)</Box>
            <Box sx={{ flex: 1 }}>
              {assetSpare === 1 ? (
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    gap: 1,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ pl: 0.3 }}>Department</Typography>
                    <Box>
                      <AmDepartmentSelWOName
                        department={department}
                        setDepartment={setDepartment}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ pl: 0.3 }}>Section</Typography>
                    <Box>
                      <AmDeptSecSelectWOName deptsec={deptsec} setDeptSec={setDeptSec} />
                    </Box>
                  </Box>
                  <Box sx={{ flex: 2 }}>
                    <Typography sx={{ pl: 0.3 }}>Item Name</Typography>
                    <Box>
                      <AmItemDeptSecBsedWOName item={item} setItem={setItem} />
                    </Box>
                  </Box>
                  <Box sx={{ pt: 2.8 }}>
                    <CusIconButton size="sm" variant="outlined" clickable="true" onClick={search}>
                      <SearchOutlinedIcon fontSize="small" />
                    </CusIconButton>
                  </Box>
                </Box>
              ) : null}
              {assetSpare === 2 ? (
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    gap: 1,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ pl: 0.3 }}>Department</Typography>
                    <AmDepartmentSelWOName department={department} setDepartment={setDepartment} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ pl: 0.3 }}>Section</Typography>
                    <AmDeptSecSelectSpare deptsec={deptsec} setDeptSec={setDeptSec} />
                  </Box>
                  <Box sx={{ flex: 2 }}>
                    <Typography sx={{ pl: 0.3 }}>Item Name</Typography>
                    <AmSpareItemListDeptSecBsed item={item} setItem={setItem} />
                  </Box>
                  <Box sx={{ pt: 2.8 }}>
                    <CusIconButton size="sm" variant="outlined" clickable="true" onClick={search}>
                      <SearchOutlinedIcon fontSize="small" />
                    </CusIconButton>
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Box>
          {flag === 1 ? (
            <Box sx={{ m: 1 }}>
              <ItemListViewTable
                assetSpare={assetSpare}
                displayarry={displayarry}
                AddDetails={AddDetails}
                count={count}
              />
            </Box>
          ) : null}
        </Box>
      )}
    </Box>
  )
}

export default memo(ItemListViewDept)
