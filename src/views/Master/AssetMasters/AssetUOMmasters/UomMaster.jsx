import { Box } from '@mui/material'
import React, { memo } from 'react'
import { useCallback } from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import UomTable from './UomTable'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UomMaster = () => {
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const history = useNavigate()
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const [uom, setUom] = useState({
    uom_slno: '',
    uom_name: '',
    uom_status: false
  })
  const { uom_slno, uom_name, uom_status } = uom
  const UpdateUom = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setUom({ ...uom, [e.target.name]: value })
    },
    [uom]
  )
  const postdata = useMemo(() => {
    return {
      uom_name: uom_name,
      uom_status: uom_status === true ? 1 : 0,
      create_user: id
    }
  }, [uom_name, uom_status, id])
  const patchdata = useMemo(() => {
    return {
      uom_slno: uom_slno,
      uom_name: uom_name,
      uom_status: uom_status === true ? 1 : 0,
      edit_user: id
    }
  }, [uom_slno, uom_name, uom_status, id])
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { uom_slno, uom_name, uom_status } = data[0]
    const frmdata = {
      uom_slno: uom_slno,
      uom_name: uom_name,
      uom_status: uom_status === 1 ? true : false
    }
    setUom(frmdata)
  }, [])
  const reset = () => {
    const frmdata = {
      uom_slno: '',
      uom_name: '',
      uom_status: false
    }
    setUom(frmdata)
    setCount(0)
    setValue(0)
  }
  const submitUom = useCallback(
    e => {
      e.preventDefault()

      const InsertUom = async postdata => {
        const result = await axioslogin.post('/uom/insert', postdata)

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
      const UomUpdate = async patchdata => {
        const result = await axioslogin.patch('/uom/update', patchdata)
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
        if (uom_name !== '') {
          InsertUom(postdata)
        } else {
          infoNotify('Please Enter Uinit of Measurement')
        }
      } else {
        UomUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count, uom_name]
  )

  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      uom_slno: '',
      uom_name: '',
      uom_status: false
    }
    setUom(frmdata)
    setValue(0)
  }, [setUom])
  return (
    <CardMaster title="Unit Of Measurement" submit={submitUom} close={backtoSetting} refresh={refreshWindow}>
      <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
        <Box sx={{ width: '30%', p: 1 }}>
          <Box>
            <TextFieldCustom
              placeholder="Unit Of Measurement"
              type="text"
              size="sm"
              name="uom_name"
              value={uom_name}
              onchange={UpdateUom}
            ></TextFieldCustom>
          </Box>
          <Box sx={{ pt: 1 }}>
            <CusCheckBox
              label="status"
              color="primary"
              size="md"
              name="uom_status"
              value={uom_status}
              checked={uom_status}
              onCheked={UpdateUom}
            ></CusCheckBox>
          </Box>
        </Box>
        <Box sx={{ width: '70%' }}>
          <UomTable count={count} rowSelect={rowSelect} />
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(UomMaster)
