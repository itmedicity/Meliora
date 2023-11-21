import { Box } from '@mui/material'
import React from 'react'
import { useMemo, useCallback, memo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import RoomTypeTablee from './RoomTypeTablee'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'

const RoomTypeMaster = () => {
  const history = useHistory()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [roomType, setRoomType] = useState({
    rm_roomtype_slno: '',
    rm_roomtype_name: '',
    rm_roomtype_alias: '',
    rm_roomtype_no: '',
    rm_roomtype_status: false,
    rm_roomtype_type: false
  })
  const { rm_roomtype_slno, rm_roomtype_name, rm_roomtype_alias, rm_roomtype_no,
    rm_roomtype_status, rm_roomtype_type } = roomType
  const updateRoomType = useCallback((e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setRoomType({ ...roomType, [e.target.name]: value })
  }, [roomType])

  // Get login user emp_id
  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })
  const postdata = useMemo(() => {
    return {
      rm_roomtype_name: rm_roomtype_name,
      rm_roomtype_alias: rm_roomtype_alias,
      rm_roomtype_no: rm_roomtype_no,
      rm_roomtype_status: rm_roomtype_status === true ? 1 : 0,
      rm_roomtype_type: rm_roomtype_type === true ? 1 : 0,
      create_user: id
    }
  }, [rm_roomtype_name, rm_roomtype_alias, rm_roomtype_no, rm_roomtype_status, rm_roomtype_type, id])

  const patchdata = useMemo(() => {
    return {
      rm_roomtype_slno: rm_roomtype_slno,
      rm_roomtype_name: rm_roomtype_name,
      rm_roomtype_alias: rm_roomtype_alias,
      rm_roomtype_no: rm_roomtype_no,
      rm_roomtype_status: rm_roomtype_status === true ? 1 : 0,
      rm_roomtype_type: rm_roomtype_type === true ? 1 : 0,
      edit_user: id
    }
  }, [rm_roomtype_slno, rm_roomtype_name, rm_roomtype_alias, rm_roomtype_no, rm_roomtype_status, rm_roomtype_type, id])
  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])
  const reset = () => {
    const frmdata = {
      rm_roomtype_slno: '',
      rm_roomtype_name: '',
      rm_roomtype_alias: '',
      rm_roomtype_no: '',
      rm_roomtype_status: false,
      rm_roomtype_type: false
    }
    setRoomType(frmdata)
    setCount(0)
    setValue(0)
  }
  const rowSelect = useCallback((params) => {
    setValue(1)

    const data = params.api.getSelectedRows()
    const { rm_roomtype_slno, rm_roomtype_name, rm_roomtype_alias, rm_roomtype_no,
      rm_roomtype_status, rm_roomtype_type } = data[0]

    const frmdata = {
      rm_roomtype_slno: rm_roomtype_slno,
      rm_roomtype_name: rm_roomtype_name,
      rm_roomtype_alias: rm_roomtype_alias,
      rm_roomtype_no: rm_roomtype_no,
      rm_roomtype_status: rm_roomtype_status === 1 ? true : false,
      rm_roomtype_type: rm_roomtype_type === 1 ? true : false
    }
    setRoomType(frmdata)
  }, [])
  const sumbitRoomType = useCallback((e) => {
    e.preventDefault()
    const InsertRoomtype = async (postdata) => {
      const result = await axioslogin.post('/roomtypeMaster/insert', postdata)
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
    const UpdateRoomType = async (patchdata) => {
      const result = await axioslogin.patch('/roomtypeMaster/update', patchdata)
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
      InsertRoomtype(postdata)
    } else {
      UpdateRoomType(patchdata)
    }
  }, [postdata, value, patchdata, count])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      rm_roomtype_slno: '',
      rm_roomtype_name: '',
      rm_roomtype_alias: '',
      rm_roomtype_no: '',
      rm_roomtype_status: false,
      rm_roomtype_type: false
    }
    setRoomType(frmdata)
    setValue(0)
  }, [setRoomType])
  return (
    <CardMaster
      title="Nomenclature Type"
      submit={sumbitRoomType}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder="Nomenclature Type Name"
                type="text"
                size="sm"
                name="rm_roomtype_name"
                value={rm_roomtype_name}
                onchange={updateRoomType}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Nomenclature Type Alias"
                type="text"
                size="sm"
                name="rm_roomtype_alias"
                value={rm_roomtype_alias}
                onchange={updateRoomType}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Nomenclature Type Number"
                type="text"
                size="sm"
                name="rm_roomtype_no"
                value={rm_roomtype_no}
                onchange={updateRoomType}
              ></TextFieldCustom>
            </Box>

            <Box sx={{ p: 1 }}>
              <CusCheckBox
                label="Entrance"
                color="primary"
                size="md"
                name="rm_roomtype_type"
                value={rm_roomtype_type}
                checked={rm_roomtype_type}
                onCheked={updateRoomType}
              ></CusCheckBox>
            </Box>

            <Box sx={{ p: 1 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="rm_roomtype_status"
                value={rm_roomtype_status}
                checked={rm_roomtype_status}
                onCheked={updateRoomType}
              ></CusCheckBox>
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <RoomTypeTablee count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(RoomTypeMaster)
