import { Box } from '@mui/material'
import React, { useCallback, useMemo, useState, memo } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CampusTable from './CampusTable'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'

const CampusMaster = () => {
  const history = useHistory()
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(0)
  const [campus, setCampus] = useState({
    rm_campus_slno: '',
    rm_campus_name: '',
    rm_campus_alias: '',
    rm_campus_no: '',
    rm_campus_status: false,
  })
  const { rm_campus_slno, rm_campus_name, rm_campus_alias, rm_campus_no, rm_campus_status } = campus
  const updateCampus = useCallback((e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setCampus({ ...campus, [e.target.name]: value })
  }, [campus],)
  // Get login user emp_id
  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })
  const postdata = useMemo(() => {
    return {
      rm_campus_name: rm_campus_name,
      rm_campus_alias: rm_campus_alias,
      rm_campus_no: rm_campus_no,
      rm_campus_status: rm_campus_status === true ? 1 : 0,
      create_user: id
    }
  }, [rm_campus_name, rm_campus_alias, rm_campus_no, rm_campus_status, id])

  const reset = () => {
    const frmdata = {
      rm_campus_slno: '',
      rm_campus_name: '',
      rm_campus_alias: '',
      rm_campus_no: '',
      rm_campus_status: false,
    }
    setCampus(frmdata)
    setCount(0)
    setValue(0)
  }
  const patchdata = useMemo(() => {
    return {
      rm_campus_slno: rm_campus_slno,
      rm_campus_name: rm_campus_name,
      rm_campus_alias: rm_campus_alias,
      rm_campus_no: rm_campus_no,
      rm_campus_status: rm_campus_status === true ? 1 : 0,
      edit_user: id
    }
  }, [rm_campus_slno, rm_campus_name, rm_campus_alias, rm_campus_no, rm_campus_status, id])

  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])

  const rowSelect = useCallback((params) => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { rm_campus_slno, rm_campus_name, rm_campus_alias, rm_campus_no, rm_campus_status } = data[0]

    const frmdata = {
      rm_campus_slno: rm_campus_slno,
      rm_campus_name: rm_campus_name,
      rm_campus_alias: rm_campus_alias,
      rm_campus_no: rm_campus_no,
      rm_campus_status: rm_campus_status === 1 ? true : false,
    }
    setCampus(frmdata)
  }, [])

  const sumbitCampus = useCallback((e) => {
    e.preventDefault()
    const InsertCampus = async (postdata) => {
      const result = await axioslogin.post('/campus/insert', postdata)
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
    const UpdateCampus = async (patchdata) => {
      const result = await axioslogin.patch('/campus/update', patchdata)
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
      InsertCampus(postdata)
    } else {
      UpdateCampus(patchdata)
    }
  }, [postdata, value, patchdata, count],)
  const refreshWindow = useCallback(() => {
    const frmdata = {
      rm_campus_slno: '',
      rm_campus_name: '',
      rm_campus_alias: '',
      rm_campus_no: '',
      rm_campus_status: false,
    }
    setCampus(frmdata)
    setValue(0)
  }, [setCampus])

  return (
    <CardMaster
      title="Campus Master"
      close={backtoSetting}
      submit={sumbitCampus}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder="Campus Name"
                type="text"
                size="sm"
                name="rm_campus_name"
                value={rm_campus_name}
                onchange={updateCampus}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Campus Alias"
                type="text"
                size="sm"
                name="rm_campus_alias"
                value={rm_campus_alias}
                onchange={updateCampus}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Campus Number"
                type="text"
                size="sm"
                name="rm_campus_no"
                value={rm_campus_no}
                onchange={updateCampus}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ p: 1 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="rm_campus_status"
                value={rm_campus_status}
                checked={rm_campus_status}
                onCheked={updateCampus}
              ></CusCheckBox>
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <CampusTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(CampusMaster)
