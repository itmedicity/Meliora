import { Box } from '@mui/material'
import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { memo } from 'react'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { useMemo } from 'react'
import PrimaryTable from './PrimaryTable'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PrimaryCustodianMast = () => {
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const history = useNavigate()
  // Get login user emp_id
  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })
  const [primary, setPrimary] = useState({
    primary_slno: '',
    primary_name: '',
    primary_status: false,
  })
  const { primary_slno, primary_name, primary_status } = primary
  const UpdatePrimary = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setPrimary({ ...primary, [e.target.name]: value })
    },
    [primary],
  )
  const reset = () => {
    const frmdata = {
      primary_slno: '',
      primary_name: '',
      primary_status: false,
    }
    setPrimary(frmdata)
    setCount(0)
    setValue(0)
  }
  const postdata = useMemo(() => {
    return {
      primary_name: primary_name,
      primary_status: primary_status === true ? 1 : 0,
      create_user: id,
    }
  }, [primary_name, primary_status, id])
  const patchdata = useMemo(() => {
    return {
      primary_slno: primary_slno,
      primary_name: primary_name,
      primary_status: primary_status === true ? 1 : 0,
      edit_user: id,
    }
  }, [primary_slno, primary_name, primary_status, id])
  const rowSelect = useCallback((params) => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { primary_slno, primary_name, primary_status } = data[0]
    const frmdata = {
      primary_slno: primary_slno,
      primary_name: primary_name,
      primary_status: primary_status === 1 ? true : false,
    }
    setPrimary(frmdata)
  }, [])
  const submitPrimary = useCallback(
    (e) => {
      e.preventDefault()

      const InsertPrimary = async (postdata) => {
        const result = await axioslogin.post('/primaryCustodian/insert', postdata)

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
      const PrimaryUpdate = async (patchdata) => {
        const result = await axioslogin.patch('/primaryCustodian/update', patchdata)
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
        if (primary_name !== '') {
          InsertPrimary(postdata)
        } else {
          infoNotify('Please Enter Primary Custodian')
        }
      } else {
        PrimaryUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count, primary_name],
  )
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      primary_slno: '',
      primary_name: '',
      primary_status: false,
    }
    setPrimary(frmdata)
    setValue(0)
  }, [setPrimary])
  return (
    <CardMaster
      title="Primary Custodian"
      submit={submitPrimary}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
        <Box sx={{ width: '30%', p: 1 }}>
          <Box>
            <TextFieldCustom
              placeholder="Name"
              type="text"
              size="sm"
              name="primary_name"
              value={primary_name}
              onchange={UpdatePrimary}
            ></TextFieldCustom>
          </Box>
          <Box sx={{ pt: 1 }}>
            <CusCheckBox
              label="status"
              color="primary"
              size="md"
              name="primary_status"
              value={primary_status}
              checked={primary_status}
              onCheked={UpdatePrimary}
            ></CusCheckBox>
          </Box>
        </Box>
        <Box sx={{ width: '70%' }}>
          <PrimaryTable count={count} rowSelect={rowSelect} />
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(PrimaryCustodianMast)
