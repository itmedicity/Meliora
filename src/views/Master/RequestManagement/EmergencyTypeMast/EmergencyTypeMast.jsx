import { Box } from '@mui/material'
import React, { memo, useMemo, useCallback, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import EmergencyTypeMastTable from './EmergencyTypeMastTable'
import { Typography } from '@mui/joy'
import { useNavigate } from 'react-router-dom'

const EmergencyTypeMast = () => {
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const history = useNavigate()
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const [emergncyType, setemergncyType] = useState({
    emergncyType_slno: '',
    emergncyType_name: '',
    escalation_time: 0,
    emergncyType_status: false
  })
  const { emergncyType_slno, emergncyType_name, escalation_time, emergncyType_status } = emergncyType
  const updateemergncyType = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setemergncyType({ ...emergncyType, [e.target.name]: value })
    },
    [emergncyType]
  )
  const postdata = useMemo(() => {
    return {
      emer_type_name: emergncyType_name,
      emer_type_escalation: escalation_time,
      emer_type_status: emergncyType_status === true ? 1 : 0,
      create_user: id
    }
  }, [emergncyType_name, emergncyType_status, escalation_time, id])
  const patchdata = useMemo(() => {
    return {
      emergency_slno: emergncyType_slno,
      emer_type_name: emergncyType_name,
      emer_type_escalation: escalation_time,
      emer_type_status: emergncyType_status === true ? 1 : 0,
      edit_user: id
    }
  }, [emergncyType_slno, emergncyType_name, escalation_time, emergncyType_status, id])
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { emergency_slno, emer_type_name, emer_type_escalation, emer_type_status } = data[0]
    const frmdata = {
      emergncyType_slno: emergency_slno,
      emergncyType_name: emer_type_name,
      escalation_time: emer_type_escalation,
      emergncyType_status: emer_type_status === 1 ? true : false
    }
    setemergncyType(frmdata)
  }, [])
  const reset = useCallback(() => {
    const frmdata = {
      emergncyType_slno: '',
      emergncyType_name: '',
      escalation_time: 0,
      emergncyType_status: false
    }
    setemergncyType(frmdata)
    setCount(0)
    setValue(0)
  }, [setemergncyType, setCount, setValue])

  const submitEmergency = useCallback(
    e => {
      e.preventDefault()
      const InsertemergncyType = async postdata => {
        const result = await axioslogin.post('/crmEmergncyType/insert', postdata)
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
      const credentialemergncyType = async patchdata => {
        const result = await axioslogin.patch('/crmEmergncyType/update', patchdata)
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
        if (emergncyType_name !== '') {
          InsertemergncyType(postdata)
        } else {
          infoNotify('Please fill the feild')
        }
      } else {
        credentialemergncyType(patchdata)
      }
    },
    [postdata, value, patchdata, reset, count, emergncyType_name]
  )
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    reset()
  }, [reset])

  return (
    <CardMaster title="Emergency Type Master" submit={submitEmergency} close={backtoSetting} refresh={refreshWindow}>
      <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
        <Box sx={{ width: '30%', p: 1 }}>
          <Box>
            <TextFieldCustom
              placeholder="Emergency Tpe"
              type="text"
              size="sm"
              name="emergncyType_name"
              value={emergncyType_name}
              onchange={updateemergncyType}
            ></TextFieldCustom>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1 }}>
            <TextFieldCustom
              placeholder="Time"
              type="number"
              size="sm"
              name="escalation_time"
              value={escalation_time}
              onchange={updateemergncyType}
            ></TextFieldCustom>
            <Typography sx={{ pl: 1.5, pt: 0.5 }}>Min</Typography>
          </Box>
          <Box sx={{ pt: 1 }}>
            <CusCheckBox
              label="status"
              color="primary"
              size="md"
              name="emergncyType_status"
              value={emergncyType_status}
              checked={emergncyType_status}
              onCheked={updateemergncyType}
            ></CusCheckBox>
          </Box>
        </Box>
        <Box sx={{ width: '70%' }}>
          <EmergencyTypeMastTable count={count} rowSelect={rowSelect} />
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(EmergencyTypeMast)
