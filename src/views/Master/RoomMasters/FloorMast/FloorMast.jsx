import { Box } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import FloorTable from './FloorTable'
import { useNavigate } from 'react-router-dom'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const FloorMast = () => {
  const history = useNavigate()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [floor, setFloor] = useState({
    rm_floor_slno: '',
    rm_floor_name: '',
    rm_floor_alias: '',
    rm_floor_no: '',
    rm_floor_status: false
  })
  const { rm_floor_slno, rm_floor_name, rm_floor_alias, rm_floor_no, rm_floor_status } = floor
  const updateFloor = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setFloor({ ...floor, [e.target.name]: value })
    },
    [floor]
  )
  const reset = () => {
    const frmdata = {
      rm_floor_slno: '',
      rm_floor_name: '',
      rm_floor_alias: '',
      rm_floor_no: '',
      rm_floor_status: false
    }
    setFloor(frmdata)
    setCount(0)
    setValue(0)
  }
  const postdata = useMemo(() => {
    return {
      rm_floor_name: rm_floor_name,
      rm_floor_alias: rm_floor_alias,
      rm_floor_no: rm_floor_no,
      rm_floor_status: rm_floor_status === true ? 1 : 0
    }
  }, [rm_floor_name, rm_floor_alias, rm_floor_no, rm_floor_status])

  const patchdata = useMemo(() => {
    return {
      rm_floor_slno: rm_floor_slno,
      rm_floor_name: rm_floor_name,
      rm_floor_alias: rm_floor_alias,
      rm_floor_no: rm_floor_no,
      rm_floor_status: rm_floor_status === true ? 1 : 0
    }
  }, [rm_floor_slno, rm_floor_name, rm_floor_alias, rm_floor_no, rm_floor_status])
  const rowSelect = useCallback(params => {
    setValue(1)

    const data = params.api.getSelectedRows()
    const { rm_floor_slno, rm_floor_name, rm_floor_alias, rm_floor_no, rm_floor_status } = data[0]
    const frmdata = {
      rm_floor_slno: rm_floor_slno,
      rm_floor_name: rm_floor_name,
      rm_floor_alias: rm_floor_alias,
      rm_floor_no: rm_floor_no,
      rm_floor_status: rm_floor_status === 1 ? true : false
    }
    setFloor(frmdata)
  }, [])
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])

  const refreshWindow = useCallback(() => {
    const frmdata = {
      rm_floor_slno: '',
      rm_floor_name: '',
      rm_floor_alias: '',
      rm_floor_no: '',
      rm_floor_status: false
    }
    setFloor(frmdata)
    setValue(0)
  }, [setFloor])
  const sumbitFloor = useCallback(
    e => {
      e.preventDefault()
      const InsertFloor = async postdata => {
        const result = await axioslogin.post('/floormaster/insert', postdata)
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
      const UpdateFloor = async patchdata => {
        const result = await axioslogin.patch('/floormaster/update', patchdata)
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
        InsertFloor(postdata)
      } else {
        UpdateFloor(patchdata)
      }
    },
    [postdata, value, patchdata, count]
  )
  return (
    <CardMaster title="Floor Master" submit={sumbitFloor} close={backtoSetting} refresh={refreshWindow}>
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder="Floor Name"
                type="text"
                size="sm"
                name="rm_floor_name"
                value={rm_floor_name}
                onchange={updateFloor}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Floor Alias"
                type="text"
                size="sm"
                name="rm_floor_alias"
                value={rm_floor_alias}
                onchange={updateFloor}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Floor Number"
                type="text"
                size="sm"
                name="rm_floor_no"
                value={rm_floor_no}
                onchange={updateFloor}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ p: 1 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="rm_floor_status"
                value={rm_floor_status}
                checked={rm_floor_status}
                onCheked={updateFloor}
              ></CusCheckBox>
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <FloorTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}

export default FloorMast
