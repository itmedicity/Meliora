import React, { useCallback, useMemo, useState } from 'react'
import GroupTable from './GroupTable'
import CardMaster from 'src/views/Components/CardMaster'
import { Box } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const GroupMast = () => {
  const history = useHistory()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [group, setGroup] = useState({
    group_slno: '',
    group_name: '',
    group_status: false,
  })
  const { group_slno, group_name, group_status } = group
  const updateGroup = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setGroup({ ...group, [e.target.name]: value })
    },
    [group],
  )

  const reset = () => {
    const frmdata = {
      group_slno: '',
      group_name: '',
      group_status: false,
    }
    setGroup(frmdata)
    setCount(0)
    setValue(0)
  }
  const postdata = useMemo(() => {
    return {
      group_name: group_name,
      group_status: group_status === true ? 1 : 0,
    }
  }, [group_name, group_status])
  const patchdata = useMemo(() => {
    return {
      group_slno: group_slno,
      group_name: group_name,
      group_status: group_status === true ? 1 : 0,
    }
  }, [group_slno, group_name, group_status])

  const rowSelect = useCallback((params) => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { group_slno, group_name, group_status } = data[0]
    const frmdata = {
      group_slno: group_slno,
      group_name: group_name,
      group_status: group_status === 1 ? true : false,
    }
    setGroup(frmdata)
  }, [])
  const submitGroup = useCallback(
    (e) => {
      e.preventDefault()
      const InsertGroup = async (postdata) => {
        const result = await axioslogin.post('/amgroup/insert', postdata)
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
      const GroupUpdate = async (patchdata) => {
        const result = await axioslogin.patch('/amgroup/update', patchdata)
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
        InsertGroup(postdata)
      } else {
        GroupUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count],
  )
  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      group_slno: '',
      group_name: '',
      group_status: false,
    }
    setGroup(frmdata)
    setValue(0)
  }, [setGroup])
  return (
    <CardMaster
      title="Group Master"
      submit={submitGroup}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder="Group"
                type="text"
                size="sm"
                name="group_name"
                value={group_name}
                onchange={updateGroup}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="group_status"
                value={group_status}
                checked={group_status}
                onCheked={updateGroup}
              ></CusCheckBox>
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <GroupTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}

export default GroupMast
