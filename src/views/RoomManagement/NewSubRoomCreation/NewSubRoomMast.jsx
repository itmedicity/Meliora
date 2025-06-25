import React, { useCallback, useMemo, useState, memo, useEffect } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { Box } from '@mui/material'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch } from 'react-redux'
import { getDeptsection } from 'src/redux/actions/DeptSection.action'
import AmDeptSecLocationSelect from 'src/views/CommonSelectCode/AmDeptSecLocationSelect'
import RoomUnderLocation from './RoomUnderLocation'
import RmRoomCategorySelect from 'src/views/CommonSelectCode/RmRoomCategorySelect'
import RmRoomTypeSelect from 'src/views/CommonSelectCode/RmRoomTypeSelect'
import NewSubRoomTable from './NewSubRoomTable'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { useSelector } from 'react-redux'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { useNavigate } from 'react-router-dom'

const NewSubRoomMast = () => {
  const history = useNavigate()
  const dispatch = useDispatch()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [location, setLocation] = useState(0)
  const [roomNo, setRoomNo] = useState(0)
  const [roomType, setRoomType] = useState(0)
  const [roomCategory, setCategory] = useState(0)

  const [subroom, setSubRoom] = useState({
    subRoom_slno: 0,
    subRoom_name: '',
    subRoom_status: false,
    subRoom_no_dis: '',
    subRoom_oldno: '',
  })

  const { subRoom_slno, subRoom_name, subRoom_status, subRoom_no_dis, subRoom_oldno } = subroom
  const updateSubRoom = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setSubRoom({ ...subroom, [e.target.name]: value })
    },
    [subroom],
  )

  useEffect(() => {
    dispatch(getDeptsection())
  }, [dispatch])

  // Get login user emp_id
  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })
  const PostData = useMemo(() => {
    return {
      sub_rm_loctaion: location,
      rm_room_slno: roomNo,
      sub_rm_category_slno: roomCategory,
      sub_rm_roomtype_slno: roomType,
      subroom_name: subRoom_name.toLocaleUpperCase(),
      subroom_no: subRoom_no_dis.toLocaleUpperCase(),
      subroom_oldno: subRoom_oldno,
      subroom_status: subRoom_status === true ? 1 : 0,
      create_user: id,
    }
  }, [
    roomNo,
    roomCategory,
    roomType,
    subRoom_name,
    subRoom_no_dis,
    subRoom_oldno,
    subRoom_status,
    id,
    location,
  ])

  const PatchData = useMemo(() => {
    return {
      sub_rm_loctaion: location,
      rm_room_slno: roomNo,
      sub_rm_category_slno: roomCategory,
      sub_rm_roomtype_slno: roomType,
      subroom_name: subRoom_name.toLocaleUpperCase(),
      subroom_no: subRoom_no_dis.toLocaleUpperCase(),
      subroom_oldno: subRoom_oldno,
      subroom_status: subRoom_status === true ? 1 : 0,
      edit_user: id,
      subroom_slno: subRoom_slno,
    }
  }, [
    roomNo,
    roomCategory,
    roomType,
    subRoom_name,
    subRoom_no_dis,
    subRoom_oldno,
    subRoom_status,
    id,
    subRoom_slno,
    location,
  ])

  const reset = useCallback((e) => {
    setValue(0)
    setCount(0)
    setLocation(0)
    setRoomNo(0)
    setRoomType(0)
    setCategory(0)
    const frmdata = {
      subRoom_slno: 0,
      subRoom_name: '',
      subRoom_status: false,
      subRoom_no_dis: '',
      subRoom_oldno: '',
    }
    setSubRoom(frmdata)
  }, [])

  const sumbitsubRoom = useCallback(
    (e) => {
      const InsertRoom = async (postdata) => {
        const result = await axioslogin.post('/subRoomMaster/insert', postdata)
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
      const UpdateRoom = async (patchdata) => {
        const result = await axioslogin.patch('/subRoomMaster/update', patchdata)
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
        InsertRoom(PostData)
      } else {
        UpdateRoom(PatchData)
      }
    },
    [value, PostData, PatchData, setCount, count, reset],
  )

  const rowSelect = useCallback((params) => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const {
      subroom_slno,
      sub_rm_loctaion,
      rm_room_slno,
      sub_rm_category_slno,
      sub_rm_roomtype_slno,
      subroom_name,
      subroom_no,
      subroom_oldno,
      subroom_status,
    } = data[0]
    setRoomNo(rm_room_slno)
    setRoomType(sub_rm_roomtype_slno)
    setCategory(sub_rm_category_slno)
    setLocation(sub_rm_loctaion)
    const frmdata = {
      subRoom_slno: subroom_slno,
      subRoom_name: subroom_name,
      subRoom_status: subroom_status === 1 ? true : false,
      subRoom_no_dis: subroom_no,
      subRoom_oldno: subroom_oldno,
    }
    setSubRoom(frmdata)
  }, [])

  const refreshWindow = useCallback(() => {
    reset()
  }, [reset])

  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])

  return (
    <CardMaster
      title="Sub Room Master"
      submit={sumbitsubRoom}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box sx={{ pt: 1 }}>
              <AmDeptSecLocationSelect location={location} setLocation={setLocation} />
            </Box>
            <Box sx={{ pt: 1 }}>
              <RoomUnderLocation roomNo={roomNo} setRoomNo={setRoomNo} />
            </Box>
            <Box sx={{ pt: 1 }}>
              <RmRoomCategorySelect value={roomCategory} setValue={setCategory} />
            </Box>
            <Box sx={{ pt: 1 }}>
              <RmRoomTypeSelect value={roomType} setValue={setRoomType} />
            </Box>

            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Sub Room Name"
                type="text"
                size="sm"
                name="subRoom_name"
                value={subRoom_name}
                onchange={updateSubRoom}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Sub Room Number"
                type="text"
                size="sm"
                name="subRoom_no_dis"
                value={subRoom_no_dis}
                onchange={updateSubRoom}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Old Sub Room No"
                type="text"
                size="sm"
                name="subRoom_oldno"
                value={subRoom_oldno}
                onchange={updateSubRoom}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ p: 1 }}>
              <CusCheckBox
                label="Status"
                color="primary"
                size="md"
                name="subRoom_status"
                value={subRoom_status}
                checked={subRoom_status}
                onCheked={updateSubRoom}
              ></CusCheckBox>
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <NewSubRoomTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(NewSubRoomMast)
