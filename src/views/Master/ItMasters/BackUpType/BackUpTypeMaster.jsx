import { Box } from '@mui/material'
import React, { memo, useMemo, useCallback, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import BackupTypeTable from './BackupTypeTable'
import { useNavigate } from 'react-router-dom'

const BackUpTypeMaster = () => {
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const history = useNavigate()

  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const [backupType, setbackupType] = useState({
    backup_type_id: '',
    backup_type_name: '',
    backup_type_status: false,
  })
  const { backup_type_id, backup_type_name, backup_type_status } = backupType
  const UpdatebackupType = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setbackupType({ ...backupType, [e.target.name]: value })
    },
    [backupType]
  )
  const postdata = useMemo(() => {
    return {
      backup_type_name: backup_type_name,
      backup_type_status: backup_type_status === true ? 1 : 0,
      create_user: id,
    }
  }, [backup_type_name, backup_type_status, id])
  const patchdata = useMemo(() => {
    return {
      backup_type_id: backup_type_id,
      backup_type_name: backup_type_name,
      backup_type_status: backup_type_status === true ? 1 : 0,
      edit_user: id,
    }
  }, [backup_type_id, backup_type_name, backup_type_status, id])
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { backup_type_id, backup_type_name, backup_type_status } = data[0]
    const frmdata = {
      backup_type_id: backup_type_id,
      backup_type_name: backup_type_name,
      backup_type_status: backup_type_status === 1 ? true : false,
    }
    setbackupType(frmdata)
  }, [])
  const reset = () => {
    const frmdata = {
      backup_type_id: '',
      backup_type_name: '',
      backup_type_status: false,
    }
    setbackupType(frmdata)
    setCount(0)
    setValue(0)
  }
  const submitbackupType = useCallback(
    e => {
      e.preventDefault()

      const InsertbackupType = async postdata => {
        const result = await axioslogin.post('/backuptypemast/insert', postdata)

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
      const backupTypeUpdate = async patchdata => {
        const result = await axioslogin.patch('/backuptypemast/update', patchdata)
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
        if (backup_type_name !== '') {
          InsertbackupType(postdata)
        } else {
          infoNotify('Please Enter Backup Type')
        }
      } else {
        backupTypeUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count, backup_type_name]
  )

  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      backup_type_id: '',
      backup_type_name: '',
      backup_type_status: false,
    }
    setbackupType(frmdata)
    setValue(0)
  }, [setbackupType])
  return (
    <CardMaster
      title="Backup Type"
      submit={submitbackupType}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
        <Box sx={{ width: '30%', p: 1 }}>
          <Box>
            <TextFieldCustom
              placeholder="Backup Type"
              type="text"
              size="sm"
              name="backup_type_name"
              value={backup_type_name}
              onchange={UpdatebackupType}
            ></TextFieldCustom>
          </Box>
          <Box sx={{ pt: 1 }}>
            <CusCheckBox
              label="status"
              color="primary"
              size="md"
              name="backup_type_status"
              value={backup_type_status}
              checked={backup_type_status}
              onCheked={UpdatebackupType}
            ></CusCheckBox>
          </Box>
        </Box>
        <Box sx={{ width: '70%' }}>
          <BackupTypeTable count={count} rowSelect={rowSelect} />
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(BackUpTypeMaster)
