import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ItemCountWiseMap from './ItemCountWiseMap'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { getRackList } from 'src/redux/actions/AmRackList.action'
import AssetCustodianDepartment from 'src/views/CommonSelectCode/AssetCustodianDepartment'

const ItemAddingComp = ({ selectData, rackno, roomNo, count, setCount, subRoomNo }) => {
  const [custoDian, setCustodian] = useState(0)
  const [custodianAllDetails, setcustodianAllDetails] = useState({})

  const {
    am_custodian_deptsec_slno,
    am_custodian_dept_slno,
    am_custdn_asset_no_first,
    am_custdn_asset_no_second,
    sec_name
  } = custodianAllDetails

  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const { slno, Item_name, type } = selectData
  const dispatch = useDispatch()

  const [assetno, setassetNo] = useState('')
  const [rend, setrend] = useState(0)

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
      setCount(e.target.value)
    },
    [setCount]
  )

  const mapArry = Array.from({ length: count }, (_, index) => index)

  const postData =
    mapArry &&
    mapArry.map(val => {
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
        create_user: id
      }
    })
  const sparepostData =
    mapArry &&
    mapArry.map(val => {
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
        create_user: id
      }
    })

  const getPostData = useMemo(() => {
    return {
      item_creation_slno: slno,
      item_dept_slno: am_custodian_dept_slno,
      item_deptsec_slno: am_custodian_deptsec_slno
    }
  }, [slno, am_custodian_dept_slno, am_custodian_deptsec_slno])

  const getPostDataSpare = useMemo(() => {
    return {
      spare_creation_slno: slno,
      spare_dept_slno: am_custodian_dept_slno,
      spare_deptsec_slno: am_custodian_deptsec_slno
    }
  }, [slno, am_custodian_dept_slno, am_custodian_deptsec_slno])

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
          } else if (success === 0) {
            infoNotify(message)
          } else {
            infoNotify(message)
          }
        })
      } else {
        insertSpareItem(sparepostData).then(val => {
          const { message, success } = val.data
          if (success === 1) {
            setrend(rend + 1)
            succesNotify(message)
          } else if (success === 0) {
            infoNotify(message)
          } else {
            infoNotify(message)
          }
        })
      }
    } else {
      warningNotify('Please Select Custodian Department and Give Count')
    }
  }, [postData, am_custodian_dept_slno, type, sparepostData, mapArry])

  return (
    <Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          py: 1.5
        }}
      >
        <Box sx={{ backgroundColor: '#94b3b1', borderRadius: 1, p: 1, height: 35 }}>
          <Typography>{Item_name}</Typography>
        </Box>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', px: 2, gap: 1, pb: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 650 }}>Custodian Department</Typography>
          <AssetCustodianDepartment
            custoDian={custoDian}
            setCustodian={setCustodian}
            setcustodianAllDetails={setcustodianAllDetails}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 650 }}>Section</Typography>
          <TextFieldCustom type="text" size="sm" name="sec_name" value={sec_name} disabled={true} />
        </Box>
        <Box sx={{ flex: 0.5 }}>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 650 }}>Item First Name</Typography>
          {type === 1 ? (
            <TextFieldCustom
              type="text"
              size="sm"
              name="am_custdn_asset_no_first"
              value={am_custdn_asset_no_first}
              disabled={true}
            />
          ) : (
            <TextFieldCustom type="text" size="sm" name="SP" defaultValue="SP" disabled={true} />
          )}
        </Box>
        <Box sx={{ flex: 0.5 }}>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 650 }}>Item Second Name</Typography>
          <TextFieldCustom
            type="text"
            size="sm"
            name="am_custdn_asset_no_second"
            value={am_custdn_asset_no_second}
            disabled={true}
          />
        </Box>
        <Box sx={{ p: 0.5, flex: 0.1 }}>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }}>Count</Typography>
          <Box>
            {' '}
            <TextFieldCustom type="text" size="sm" name="count" value={count} onchange={updateItemCount} />
          </Box>
        </Box>
        <Box sx={{ pt: 1, pr: 3 }}>
          <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }}>Add </Typography>
          <Box>
            <AddCircleOutlineIcon onClick={() => AddMultiple()} />
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
        />
      </Box>
    </Box>
  )
}

export default memo(ItemAddingComp)
