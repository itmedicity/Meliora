import { Box } from '@mui/material'
import React, { useCallback, useMemo, useState } from 'react'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useSelector } from 'react-redux'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { memo } from 'react'
import ScheduleTimeTable from './ScheduleTimeTable'
import { useNavigate } from 'react-router-dom'
const ScheduleTimeMast = () => {
  const history = useNavigate()
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(0)
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const id = useSelector((state) => {
    return state?.LoginUserData.empid
  })
  const [scheduleTime, setScheduleTime] = useState({
    schedule_time_id: '0',
    schedule_time_name: '',
    schedule_time_status: false,
  })
  const refreshWindow = useCallback(() => {
    const formreset = {
      schedule_time_id: '0',
      schedule_time_name: '',
      schedule_time_status: false,
    }
    setScheduleTime(formreset)
    setCount(0)
    setValue(0)
  }, [setScheduleTime])
  const { schedule_time_name, schedule_time_status, schedule_time_id } = scheduleTime
  const updateScheduleTime = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setScheduleTime({ ...scheduleTime, [e.target.name]: value })
    },
    [scheduleTime],
  )
  const postdata = useMemo(() => {
    return {
      schedule_time_id: schedule_time_id,
      schedule_time_name: schedule_time_name,
      schedule_time_status: schedule_time_status === true ? 1 : 0,
      create_user: id,
    }
  }, [schedule_time_name, schedule_time_status, schedule_time_id, id])
  const patchdata = useMemo(() => {
    return {
      schedule_time_id: schedule_time_id,
      schedule_time_name: schedule_time_name,
      schedule_time_status: schedule_time_status === true ? 1 : 0,
      edit_user: id,
    }
  }, [schedule_time_name, schedule_time_status, schedule_time_id, id])
  const submitSheduleTime = useCallback(
    (e) => {
      e.preventDefault()
      const InsertType = async (postdata) => {
        const result = await axioslogin.post('/scheduletime/insert', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          refreshWindow()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      const updateType = async (patchdata) => {
        const result = await axioslogin.patch('/scheduletime/update', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          refreshWindow()
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
    [postdata, count, patchdata, value, refreshWindow],
  )
  const rowSelect = useCallback((params) => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { schedule_time_id, schedule_time_name, status } = data[0]
    const frmdata = {
      schedule_time_id: schedule_time_id,
      schedule_time_name: schedule_time_name,
      schedule_time_status: status === 'Yes' ? true : false,
    }
    setScheduleTime(frmdata)
  }, [])
  return (
    <CardMaster
      title="Backup Schedule Time"
      submit={submitSheduleTime}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder="Schedule Time"
                type="text"
                size="sm"
                name="schedule_time_name"
                value={schedule_time_name}
                onchange={updateScheduleTime}
              />
            </Box>
            <Box sx={{ pt: 1 }}>
              <CusCheckBox
                label="Status"
                color="primary"
                size="md"
                name="schedule_time_status"
                value={schedule_time_status}
                checked={schedule_time_status}
                onCheked={updateScheduleTime}
              />
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <ScheduleTimeTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}
export default memo(ScheduleTimeMast)
