import { Box, Input, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRackList } from 'src/redux/actions/AmRackList.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import AssetCustodianDepartment from 'src/views/CommonSelectCode/AssetCustodianDepartment'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ItemCountWiseMap from '../ItemCreation/ItemCountWiseMap'

const ItemAdding = ({
  selectData,
  rackno,
  roomNo,
  count,
  setCount,
  subRoomNo,
  itemCount,
  setitemCount,
  getItemcount,
  setgetItemcount,
}) => {
  const dispatch = useDispatch()
  const [custoDian, setCustodian] = useState(0)
  const [assetno, setassetNo] = useState('')
  const [rend, setrend] = useState(0)
  const [disArry, setDisArry] = useState([])
  const [custodianAllDetails, setcustodianAllDetails] = useState({})

  const {
    am_custodian_deptsec_slno,
    am_custodian_dept_slno,
    am_custdn_asset_no_first,
    am_custdn_asset_no_second,
    sec_name,
  } = custodianAllDetails

  const { slno, Item_name, type } = selectData
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  useEffect(() => {
    let stringName
    if (type === 1) {
      const array = [am_custdn_asset_no_first, am_custdn_asset_no_second]
      const filterName = array?.filter(e => e !== null)
      stringName = filterName?.join('/')
    } else {
      stringName = `SP/${am_custdn_asset_no_second}`
    }
    setassetNo(stringName)
  }, [type, am_custdn_asset_no_first, am_custdn_asset_no_second])

  useEffect(() => {
    dispatch(getRackList())
    setCount('')
  }, [dispatch, selectData, setCount])

  const updateItemCount = useCallback(
    e => {
      const value = parseInt(e.target.value, 10)
      setCount(e.target.value)
      setitemCount(value)
      setgetItemcount(0)
      setDisArry([])
    },
    [setCount, setitemCount, setgetItemcount, setDisArry]
  )

  const mapArry = Array.from({ length: count }, (_, index) => index)

  const postData =
    mapArry &&
    mapArry.map(() => {
      return {
        item_creation_slno: slno,
        item_dept_slno: am_custodian_dept_slno,
        item_deptsec_slno: am_custodian_deptsec_slno,
        item_room_slno: roomNo === 0 ? null : roomNo,
        item_subroom_slno: subRoomNo === 0 ? null : subRoomNo,
        item_rack_slno: rackno === 0 ? null : rackno,
        item_create_status: 1,
        item_custodian_dept: custoDian,
        item_custodian_dept_sec: am_custodian_deptsec_slno,
        item_asset_no: assetno,
        create_user: id,
      }
    })
  const sparepostData =
    mapArry &&
    mapArry.map(() => {
      return {
        spare_creation_slno: slno,
        spare_dept_slno: am_custodian_dept_slno,
        spare_deptsec_slno: am_custodian_deptsec_slno,
        spare_room_slno: roomNo === 0 ? null : roomNo,
        spare_subroom_slno: subRoomNo === 0 ? null : subRoomNo,
        spare_rack_slno: rackno === 0 ? null : rackno,
        spare_create_status: 1,
        spare_custodian_dept: custoDian,
        spare_custodian_dept_sec: am_custodian_deptsec_slno,
        spare_asset_no: assetno,
        create_user: id,
      }
    })

  const getPostData = useMemo(() => {
    return {
      item_creation_slno: slno,
      item_custodian_dept: custoDian,
      itemCount: itemCount,
    }
  }, [slno, custoDian, itemCount])

  const getPostDataSpare = useMemo(() => {
    return {
      spare_creation_slno: slno,
      item_custodian_dept: custoDian,
      itemCount: itemCount,
    }
  }, [slno, custoDian, itemCount])

  const AddMultiple = useCallback(() => {
    const insertItem = async postData => {
      const result = await axioslogin.post('/itemCreationDeptmap/insert', postData)
      return result
    }

    const insertSpareItem = async postData => {
      const result = await axioslogin.post('/itemCreationDeptmap/insertSpare', postData)
      return result
    }

    if (am_custodian_dept_slno !== 0) {
      if (type === 1) {
        insertItem(postData).then(val => {
          const { message, success } = val.data
          if (success === 1) {
            setrend(rend + 1)
            succesNotify(message)
            setgetItemcount(1)
          } else if (success === 0) {
            infoNotify(message)
            setgetItemcount(0)
          } else {
            infoNotify(message)
            setgetItemcount(0)
          }
        })
      } else {
        insertSpareItem(sparepostData).then(val => {
          const { message, success } = val.data
          if (success === 1) {
            setrend(rend + 1)
            succesNotify(message)
            setgetItemcount(1)
          } else if (success === 0) {
            infoNotify(message)
            setgetItemcount(0)
          } else {
            infoNotify(message)
            setgetItemcount(0)
          }
        })
      }
    } else {
      warningNotify('Please Select Custodian Department and Give Count')
    }
  }, [postData, am_custodian_dept_slno, type, sparepostData, rend, setgetItemcount])

  return (
    <Box>
      <Box sx={{ flex: 1, display: 'flex', py: 2, px: 1, gap: 1, pb: 1 }}>
        <Box sx={{ flex: 1.5 }}>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 650 }}>
            Item Name
          </Typography>
          <Input
            sx={{
              '--Input-minHeight': '32px',
            }}
            readOnly
            value={Item_name}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 650 }}>
            Custodian Department
          </Typography>
          <AssetCustodianDepartment
            custoDian={custoDian}
            setCustodian={setCustodian}
            setcustodianAllDetails={setcustodianAllDetails}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 650 }}>
            Section
          </Typography>
          <Input
            sx={{
              '--Input-minHeight': '32px',
            }}
            readOnly
            value={sec_name || ''}
          />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }}>
            Count
          </Typography>
          <Box>
            {' '}
            <TextFieldCustom
              type="number"
              size="sm"
              name="count"
              value={count}
              onchange={updateItemCount}
            />
          </Box>
        </Box>
        <Box sx={{ pr: 3 }}>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }}>
            Add{' '}
          </Typography>
          <Box>
            <AddCircleOutlineIcon onClick={() => AddMultiple()} sx={{ height: 28, width: 30 }} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <ItemCountWiseMap
          getPostData={getPostData}
          type={type}
          getPostDataSpare={getPostDataSpare}
          rend={rend}
          setrend={setrend}
          itemCount={itemCount}
          getItemcount={getItemcount}
          disArry={disArry}
          setDisArry={setDisArry}
        />
      </Box>
    </Box>
  )
}

export default memo(ItemAdding)
