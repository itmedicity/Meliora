import { Box } from '@mui/system'
import React, { memo, useCallback, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useMemo } from 'react'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import { CssVarsProvider, Textarea } from '@mui/joy'
import NotificationTable from './NotificationTable'
import { useNavigate } from 'react-router-dom'

const NotificationMainMenu = () => {
  const history = useNavigate()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)

  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })
  const [notification, setNotification] = useState({
    notification_slno: '',
    notification_heading: '',
    notification_remarks: '',
    notification_status: false,
  })
  const { notification_slno, notification_heading, notification_remarks, notification_status } =
    notification

  const updateNotification = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setNotification({ ...notification, [e.target.name]: value })
    },
    [notification],
  )
  const reset = () => {
    const frmdata = {
      notification_slno: '',
      notification_heading: '',
      notification_remarks: '',
      notification_status: false,
    }
    setNotification(frmdata)
    setCount(0)
    setValue(0)
  }
  const postdata = useMemo(() => {
    return {
      notification_heading: notification_heading,
      notification_remarks: notification_remarks,
      notification_status: notification_status === true ? 1 : 0,
      create_user: id,
    }
  }, [notification_heading, notification_remarks, notification_status, id])
  const patchdata = useMemo(() => {
    return {
      notification_slno: notification_slno,
      notification_heading: notification_heading,
      notification_remarks: notification_remarks,
      notification_status: notification_status === true ? 1 : 0,
      edit_user: id,
    }
  }, [notification_slno, notification_heading, notification_remarks, notification_status, id])
  const sumbitNotification = useCallback(
    (e) => {
      e.preventDefault()
      const Insertnotification = async (postdata) => {
        const result = await axioslogin.post('/notificationMenu/insert', postdata)
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
      const notificationUpdate = async (patchdata) => {
        const result = await axioslogin.patch('/notificationMenu/update', patchdata)
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
        if (notification_heading !== '' && notification_remarks !== '') {
          Insertnotification(postdata)
        } else {
          infoNotify('Please Notification Heading and Remarks')
        }
      } else {
        notificationUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count, notification_heading, notification_remarks],
  )
  const rowSelect = useCallback((params) => {
    setValue(1)

    const data = params.api.getSelectedRows()
    const { notification_slno, notification_heading, notification_remarks, notification_status } =
      data[0]
    const frmdata = {
      notification_slno: notification_slno,
      notification_heading: notification_heading,
      notification_remarks: notification_remarks,
      notification_status: notification_status === 1 ? true : false,
    }
    setNotification(frmdata)
  }, [])
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      notification_slno: '',
      notification_heading: '',
      notification_remarks: '',
      notification_status: false,
    }
    setNotification(frmdata)
    setValue(0)
  }, [setNotification])
  return (
    <CardMaster
      title="Notification"
      submit={sumbitNotification}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder="Heading"
                type="text"
                size="sm"
                name="notification_heading"
                value={notification_heading}
                onchange={updateNotification}
              ></TextFieldCustom>
              <CssVarsProvider>
                <Textarea
                  sx={{ mt: 0.5 }}
                  size="sm"
                  placeholder="Remarks..."
                  minRows={4}
                  name="notification_remarks"
                  value={notification_remarks}
                  onChange={updateNotification}
                />
              </CssVarsProvider>
            </Box>
            <Box sx={{ pt: 1.5, pl: 0.5 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="notification_status"
                value={notification_status}
                checked={notification_status}
                onCheked={updateNotification}
              ></CusCheckBox>
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <NotificationTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(NotificationMainMenu)
