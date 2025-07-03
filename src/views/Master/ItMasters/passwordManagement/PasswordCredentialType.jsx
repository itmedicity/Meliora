import { Box } from '@mui/material'
import React, { memo, useMemo, useCallback, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import PasswordCredentialTable from './PasswordCredentialTable'
import { useNavigate } from 'react-router-dom'

const PasswordCredentialType = () => {
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const history = useNavigate()
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const [credential, setcredential] = useState({
    credential_slno: '',
    credential_name: '',
    credential_status: false,
  })
  const { credential_slno, credential_name, credential_status } = credential
  const updatecredential = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setcredential({ ...credential, [e.target.name]: value })
    },
    [credential]
  )
  const postdata = useMemo(() => {
    return {
      credential_name: credential_name,
      credential_status: credential_status === true ? 1 : 0,
      create_user: id,
    }
  }, [credential_name, credential_status, id])
  const patchdata = useMemo(() => {
    return {
      credential_slno: credential_slno,
      credential_name: credential_name,
      credential_status: credential_status === true ? 1 : 0,
      edit_user: id,
    }
  }, [credential_slno, credential_name, credential_status, id])
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { credential_slno, credential_name, credential_status } = data[0]
    const frmdata = {
      credential_slno: credential_slno,
      credential_name: credential_name,
      credential_status: credential_status === 1 ? true : false,
    }
    setcredential(frmdata)
  }, [])
  const reset = useCallback(() => {
    const frmdata = {
      credential_slno: '',
      credential_name: '',
      credential_status: false,
    }
    setcredential(frmdata)
    setCount(0)
    setValue(0)
  }, [setcredential, setCount, setValue])

  const submitcredential = useCallback(
    e => {
      e.preventDefault()
      const Insertcredential = async postdata => {
        const result = await axioslogin.post('/PasswordCredentialType/insert', postdata)
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
      const credentialUpdate = async patchdata => {
        const result = await axioslogin.patch('/PasswordCredentialType/update', patchdata)
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
        if (credential_name !== '') {
          Insertcredential(postdata)
        } else {
          infoNotify('Please fill the feild')
        }
      } else {
        credentialUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, reset, count, credential_name]
  )
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    reset()
  }, [reset])
  return (
    <CardMaster
      title="Credential Type Master"
      submit={submitcredential}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
        <Box sx={{ width: '30%', p: 1 }}>
          <Box>
            <TextFieldCustom
              placeholder="Credential"
              type="text"
              size="sm"
              name="credential_name"
              value={credential_name}
              onchange={updatecredential}
            ></TextFieldCustom>
          </Box>
          <Box sx={{ pt: 1 }}>
            <CusCheckBox
              label="status"
              color="primary"
              size="md"
              name="credential_status"
              value={credential_status}
              checked={credential_status}
              onCheked={updatecredential}
            ></CusCheckBox>
          </Box>
        </Box>
        <Box sx={{ width: '70%' }}>
          <PasswordCredentialTable count={count} rowSelect={rowSelect} />
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(PasswordCredentialType)
