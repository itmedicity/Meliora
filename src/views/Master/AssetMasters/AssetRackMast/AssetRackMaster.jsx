import React, { memo, useMemo, useCallback, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { Box } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import AssetRackmastTable from './AssetRackmastTable'
import DeptSectionSelect from 'src/views/CommonSelectCode/DeptSectionSelect'
import { useNavigate } from 'react-router-dom'

const AssetRackMaster = () => {
  const history = useNavigate()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [deptsec, setDeptSec] = useState(0)
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const [rackdata, setRackdata] = useState({
    rack_slno: 0,
    rack_name: '',
    rack_status: false,
  })

  const { rack_name, rack_status, rack_slno } = rackdata

  const updateRack = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setRackdata({ ...rackdata, [e.target.name]: value })
    },
    [rackdata]
  )

  const postdata = useMemo(() => {
    return {
      am_rack_name: rack_name,
      am_rack_deptsec: deptsec,
      am_rack_status: rack_status === true ? 1 : 0,
      create_user: id,
    }
  }, [rack_name, deptsec, rack_status, id])
  const patchdata = useMemo(() => {
    return {
      am_rack_slno: rack_slno,
      am_rack_deptsec: deptsec,
      am_rack_name: rack_name,
      am_rack_status: rack_status === true ? 1 : 0,
      edit_user: id,
    }
  }, [rack_slno, deptsec, rack_name, rack_status, id])

  const reset = useCallback(() => {
    const frmdata = {
      rack_slno: 0,
      rack_name: '',
      rack_status: false,
    }
    setRackdata(frmdata)
    setCount(0)
    setValue(0)
  }, [])

  const submitAssetRack = useCallback(
    e => {
      e.preventDefault()
      const Insertrack = async postdata => {
        const result = await axioslogin.post('/assetRackMast/insert', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          reset()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }

      const UpdateRackMaster = async patchdata => {
        const result = await axioslogin.patch('/assetRackMast/update', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          reset()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      if (value === 0) {
        Insertrack(postdata)
      } else {
        UpdateRackMaster(patchdata)
      }
    },
    [postdata, patchdata, setCount, reset, count, value]
  )

  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { am_rack_slno, am_rack_name, am_rack_status, am_rack_deptsec } = data[0]
    const frmdata = {
      rack_slno: am_rack_slno,
      rack_name: am_rack_name,
      rack_status: am_rack_status === 1 ? true : false,
    }
    setRackdata(frmdata)
    setDeptSec(am_rack_deptsec)
  }, [])

  const refreshWindow = useCallback(() => {
    reset()
  }, [reset])
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])

  return (
    <CardMaster
      title="Asset Rack Master"
      submit={submitAssetRack}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder="Rack Name"
                type="text"
                size="sm"
                name="rack_name"
                value={rack_name}
                onchange={updateRack}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 2 }}>
              <DeptSectionSelect value={deptsec} setValue={setDeptSec} />
            </Box>
            <Box sx={{ pt: 1 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="rack_status"
                value={rack_status}
                checked={rack_status}
                onCheked={updateRack}
              ></CusCheckBox>
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <AssetRackmastTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(AssetRackMaster)
