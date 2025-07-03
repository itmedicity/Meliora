import { Box } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useMemo } from 'react'
import { memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import SecondaryTable from './SecondaryTable'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SecondaryCustodian = () => {
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const history = useNavigate()
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const [secondary, setSecondary] = useState({
    secondary_slno: '',
    secondary_name: '',
    secondary_status: false,
  })
  const { secondary_slno, secondary_name, secondary_status } = secondary
  const UpdateSecondary = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setSecondary({ ...secondary, [e.target.name]: value })
    },
    [secondary]
  )
  const reset = () => {
    const frmdata = {
      secondary_slno: '',
      secondary_name: '',
      secondary_status: false,
    }
    setSecondary(frmdata)
    setCount(0)
    setValue(0)
  }
  const postdata = useMemo(() => {
    return {
      secondary_name: secondary_name,
      secondary_status: secondary_status === true ? 1 : 0,
      create_user: id,
    }
  }, [secondary_name, secondary_status, id])
  const patchdata = useMemo(() => {
    return {
      secondary_slno: secondary_slno,
      secondary_name: secondary_name,
      secondary_status: secondary_status === true ? 1 : 0,
      edit_user: id,
    }
  }, [secondary_slno, secondary_name, secondary_status, id])
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { secondary_slno, secondary_name, secondary_status } = data[0]
    const frmdata = {
      secondary_slno: secondary_slno,
      secondary_name: secondary_name,
      secondary_status: secondary_status === 1 ? true : false,
    }
    setSecondary(frmdata)
  }, [])
  const submitSecondary = useCallback(
    e => {
      e.preventDefault()
      const InsertSecondary = async postdata => {
        const result = await axioslogin.post('/secondaryCustodian/insert', postdata)
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
      const SecondaryUpdate = async patchdata => {
        const result = await axioslogin.patch('/secondaryCustodian/update', patchdata)
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
        if (secondary_name !== '') {
          InsertSecondary(postdata)
        } else {
          infoNotify('Please Enter Secondary Custodian')
        }
      } else {
        SecondaryUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count, secondary_name]
  )
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      secondary_slno: '',
      secondary_name: '',
      secondary_status: false,
    }
    setSecondary(frmdata)
    setValue(0)
  }, [setSecondary])
  return (
    <CardMaster
      title="Secondary Custodian"
      submit={submitSecondary}
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
              name="secondary_name"
              value={secondary_name}
              onchange={UpdateSecondary}
            ></TextFieldCustom>
          </Box>
          <Box sx={{ pt: 1 }}>
            <CusCheckBox
              label="status"
              color="primary"
              size="md"
              name="secondary_status"
              value={secondary_status}
              checked={secondary_status}
              onCheked={UpdateSecondary}
            ></CusCheckBox>
          </Box>
        </Box>
        <Box sx={{ width: '70%' }}>
          <SecondaryTable count={count} rowSelect={rowSelect} />
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(SecondaryCustodian)
