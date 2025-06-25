import { Box } from '@mui/material'
import React from 'react'
import { useMemo, useCallback, useState, memo } from 'react'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import RoomCategoryTablee from './RoomCategoryTablee'
import { axioslogin } from 'src/views/Axios/Axios'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const RoomCategoryMaster = () => {
  const history = useNavigate()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [roomCategory, setRoomCategory] = useState({
    rm_roomcategory_slno: '',
    rm_roomcategory_name: '',
    rm_roomcategory_alias: '',
    rm_roomcategory_no: '',
    rm_roomcategory_status: false,
  })
  const {
    rm_roomcategory_slno,
    rm_roomcategory_name,
    rm_roomcategory_alias,
    rm_roomcategory_no,
    rm_roomcategory_status,
  } = roomCategory

  const updateRoomCategory = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setRoomCategory({ ...roomCategory, [e.target.name]: value })
    },
    [roomCategory],
  )

  // Get login user emp_id
  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })

  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const reset = () => {
    const frmdata = {
      rm_roomcategory_slno: '',
      rm_roomcategory_name: '',
      rm_roomcategory_alias: '',
      rm_roomcategory_no: '',
      rm_roomcategory_status: false,
    }
    setRoomCategory(frmdata)
    setCount(0)
    setValue(0)
  }
  const postdata = useMemo(() => {
    return {
      rm_roomcategory_name: rm_roomcategory_name,
      rm_roomcategory_alias: rm_roomcategory_alias,
      rm_roomcategory_no: rm_roomcategory_no,
      rm_roomcategory_status: rm_roomcategory_status === true ? 1 : 0,
      create_user: id,
    }
  }, [rm_roomcategory_name, rm_roomcategory_alias, rm_roomcategory_no, rm_roomcategory_status, id])
  const patchdata = useMemo(() => {
    return {
      rm_roomcategory_slno: rm_roomcategory_slno,
      rm_roomcategory_name: rm_roomcategory_name,
      rm_roomcategory_alias: rm_roomcategory_alias,
      rm_roomcategory_no: rm_roomcategory_no,
      rm_roomcategory_status: rm_roomcategory_status === true ? 1 : 0,
      edit_user: id,
    }
  }, [
    rm_roomcategory_slno,
    rm_roomcategory_name,
    rm_roomcategory_alias,
    rm_roomcategory_no,
    rm_roomcategory_status,
    id,
  ])
  const rowSelect = useCallback((params) => {
    setValue(1)

    const data = params.api.getSelectedRows()
    const {
      rm_roomcategory_slno,
      rm_roomcategory_name,
      rm_roomcategory_alias,
      rm_roomcategory_no,
      rm_roomcategory_status,
    } = data[0]

    const frmdata = {
      rm_roomcategory_slno: rm_roomcategory_slno,
      rm_roomcategory_name: rm_roomcategory_name,
      rm_roomcategory_alias: rm_roomcategory_alias,
      rm_roomcategory_no: rm_roomcategory_no,
      rm_roomcategory_status: rm_roomcategory_status === 1 ? true : false,
    }
    setRoomCategory(frmdata)
  }, [])

  const sumbitRoomCategory = useCallback(
    (e) => {
      e.preventDefault()
      const InsertRoomCategory = async (postdata) => {
        const result = await axioslogin.post('/roomcategory/insert', postdata)
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
      const UpdateRoomCategory = async (patchdata) => {
        const result = await axioslogin.patch('/roomcategory/update', patchdata)
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
        InsertRoomCategory(postdata)
      } else {
        UpdateRoomCategory(patchdata)
      }
    },
    [postdata, value, patchdata, count],
  )
  const refreshWindow = useCallback(() => {
    const frmdata = {
      rm_roomcategory_slno: '',
      rm_roomcategory_name: '',
      rm_roomcategory_alias: '',
      rm_roomcategory_no: '',
      rm_roomcategory_status: false,
    }
    setRoomCategory(frmdata)
    setValue(0)
  }, [setRoomCategory])

  return (
    <CardMaster
      title="Nomenclature Category"
      submit={sumbitRoomCategory}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder="Nomenclature Category Name"
                type="text"
                size="sm"
                name="rm_roomcategory_name"
                value={rm_roomcategory_name}
                onchange={updateRoomCategory}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Nomenclature Category Alias"
                type="text"
                size="sm"
                name="rm_roomcategory_alias"
                value={rm_roomcategory_alias}
                onchange={updateRoomCategory}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Nomenclature Category Number"
                type="text"
                size="sm"
                name="rm_roomcategory_no"
                value={rm_roomcategory_no}
                onchange={updateRoomCategory}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ p: 1 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="rm_roomcategory_status"
                value={rm_roomcategory_status}
                checked={rm_roomcategory_status}
                onCheked={updateRoomCategory}
              ></CusCheckBox>
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <RoomCategoryTablee count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}
export default memo(RoomCategoryMaster)
