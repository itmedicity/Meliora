import { Box } from '@mui/material'
import React, { useMemo, useCallback, useState, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import SimTypeTable from './SimTypeTable'
import { useNavigate } from 'react-router-dom'

const SimTypeMaster = () => {
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const history = useNavigate()
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const [simType, setSimType] = useState({
    it_sim_type_slno: '',
    it_sim_type_name: '',
    it_sim_type_status: false,
  })
  const { it_sim_type_slno, it_sim_type_name, it_sim_type_status } = simType
  const updateSimType = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setSimType({ ...simType, [e.target.name]: value })
    },
    [simType]
  )
  const postdata = useMemo(() => {
    return {
      it_sim_type_name: it_sim_type_name,
      it_sim_type_status: it_sim_type_status === true ? 1 : 0,
      create_user: id,
    }
  }, [it_sim_type_name, it_sim_type_status, id])
  const patchdata = useMemo(() => {
    return {
      it_sim_type_slno: it_sim_type_slno,
      it_sim_type_name: it_sim_type_name,
      it_sim_type_status: it_sim_type_status === true ? 1 : 0,
      edit_user: id,
    }
  }, [it_sim_type_slno, it_sim_type_name, it_sim_type_status, id])
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { it_sim_type_slno, it_sim_type_name, it_sim_type_status } = data[0]
    const frmdata = {
      it_sim_type_slno: it_sim_type_slno,
      it_sim_type_name: it_sim_type_name,
      it_sim_type_status: it_sim_type_status === 1 ? true : false,
    }
    setSimType(frmdata)
  }, [])
  const reset = () => {
    const frmdata = {
      it_sim_type_slno: '',
      it_sim_type_name: '',
      it_sim_type_status: false,
    }
    setSimType(frmdata)
    setCount(0)
    setValue(0)
  }
  const submitSimType = useCallback(
    e => {
      e.preventDefault()

      const InsertSimType = async postdata => {
        const result = await axioslogin.post('/simType/insert', postdata)

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
      const simTypeUpdate = async patchdata => {
        const result = await axioslogin.patch('/simType/update', patchdata)
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
        if (it_sim_type_name !== '') {
          InsertSimType(postdata)
        } else {
          infoNotify('Please Enter Communication Device Type')
        }
      } else {
        simTypeUpdate(patchdata)
      }
    },
    [postdata, value, patchdata, count, it_sim_type_name]
  )

  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      it_sim_type_slno: '',
      it_sim_type_name: '',
      it_sim_type_status: false,
    }
    setSimType(frmdata)
    setValue(0)
  }, [setSimType])
  return (
    <CardMaster
      title="Sim type"
      submit={submitSimType}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
        <Box sx={{ width: '30%', p: 1 }}>
          <Box>
            <TextFieldCustom
              placeholder=" Sim Type"
              type="text"
              size="sm"
              name="it_sim_type_name"
              value={it_sim_type_name}
              onchange={updateSimType}
            ></TextFieldCustom>
          </Box>
          <Box sx={{ pt: 1 }}>
            <CusCheckBox
              label="status"
              color="primary"
              size="md"
              name="it_sim_type_status"
              value={it_sim_type_status}
              checked={it_sim_type_status}
              onCheked={updateSimType}
            ></CusCheckBox>
          </Box>
        </Box>
        <Box sx={{ width: '70%' }}>
          <SimTypeTable count={count} rowSelect={rowSelect} />
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(SimTypeMaster)
