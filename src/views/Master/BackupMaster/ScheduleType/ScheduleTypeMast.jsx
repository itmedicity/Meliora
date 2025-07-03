import { Box } from '@mui/material'
import React, { useCallback, useMemo, useState } from 'react'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useSelector } from 'react-redux'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import ScheduleTypeTable from './ScheduleTypeTable'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
const ScheduleTypeMast = () => {
  const history = useNavigate()
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(0)
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const id = useSelector(state => {
    return state?.LoginUserData.empid
  })
  const [scheduleType, setScheduleType] = useState({
    schedule_type_id: '0',
    schedule_type_name: '',
    schedule_type_status: false,
  })
  const { schedule_type_name, schedule_type_status, schedule_type_id } = scheduleType
  const updateScheduleType = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setScheduleType({ ...scheduleType, [e.target.name]: value })
    },
    [scheduleType]
  )
  const postdata = useMemo(() => {
    return {
      schedule_type_id: schedule_type_id,
      schedule_type_name: schedule_type_name,
      schedule_type_status: schedule_type_status === true ? 1 : 0,
      create_user: id,
    }
  }, [schedule_type_id, schedule_type_name, schedule_type_status, id])
  const reset = () => {
    const formreset = {
      schedule_type_id: '0',
      schedule_type_name: '',
      schedule_type_status: false,
    }
    setScheduleType(formreset)
    setCount(0)
    setValue(0)
  }
  const patchdata = useMemo(() => {
    return {
      schedule_type_id: schedule_type_id,
      schedule_type_name: schedule_type_name,
      schedule_type_status: schedule_type_status === true ? 1 : 0,
      edit_user: id,
    }
  }, [schedule_type_id, schedule_type_name, schedule_type_status, id])
  const submitSheduleType = useCallback(
    e => {
      e.preventDefault()
      const InsertType = async postdata => {
        const result = await axioslogin.post('/scheduletype/insert', postdata)
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
      const updateType = async patchdata => {
        const result = await axioslogin.patch('/scheduletype/update', patchdata)
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
        InsertType(postdata)
      } else {
        updateType(patchdata)
      }
    },
    [postdata, count, patchdata, value]
  )
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { schedule_type_id, schedule_type_name, status } = data[0]
    const frmdata = {
      schedule_type_id: schedule_type_id,
      schedule_type_name: schedule_type_name,
      schedule_type_status: status === 'Yes' ? true : false,
    }
    setScheduleType(frmdata)
  }, [])
  const refreshWindow = useCallback(() => {
    const formreset = {
      schedule_type_id: '',
      schedule_type_name: '',
      schedule_type_status: false,
    }
    setScheduleType(formreset)
    setCount(0)
    setValue(0)
  }, [setScheduleType])
  return (
    <CardMaster
      title="Backup Schedule Type"
      submit={submitSheduleType}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder="Schedule Type"
                type="text"
                size="sm"
                name="schedule_type_name"
                value={schedule_type_name}
                onchange={updateScheduleType}
              />
            </Box>
            <Box sx={{ pt: 1 }}>
              <CusCheckBox
                label="Status"
                color="primary"
                size="md"
                name="schedule_type_status"
                value={schedule_type_status}
                checked={schedule_type_status}
                onCheked={updateScheduleType}
              />
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <ScheduleTypeTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}
export default memo(ScheduleTypeMast)
