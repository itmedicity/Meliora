import React, { useCallback, useMemo, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { Box } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import RoomNewCreationTable from './RoomNewCreationTable'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import FloorRmSelect from 'src/views/CommonSelectCode/FloorRmSelect'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const RoomCreation = () => {
  const [floorData, setFloorData] = useState(0)
  const history = useHistory()
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(0)

  const [room, setRoom] = useState({
    rm_room_slno: '',
    rm_room_name: '',
    rm_room_no: '',
    rm_room_alias: '',
    rm_room_status: false,
  })
  const { rm_room_slno, rm_room_name, rm_room_no, rm_room_alias, rm_room_status } = room
  const updateRoom = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setRoom({ ...room, [e.target.name]: value })
    },
    [room],
  )
  const postdata = useMemo(() => {
    return {
      rm_room_name: rm_room_name,
      rm_room_no: rm_room_no,
      rm_room_alias: rm_room_alias,
      rm_room_floor_slno: floorData,
      rm_room_status: rm_room_status === true ? 1 : 0,
    }
  }, [rm_room_name, rm_room_no, rm_room_alias, floorData, rm_room_status])

  const patchdata = useMemo(() => {
    return {
      rm_room_slno: rm_room_slno,
      rm_room_floor_slno: floorData,
      rm_room_name: rm_room_name,
      rm_room_no: rm_room_no,
      rm_room_alias: rm_room_alias,
      rm_room_status: rm_room_status === true ? 1 : 0,
    }
  }, [rm_room_slno, floorData, rm_room_name, rm_room_alias, rm_room_no, rm_room_status])
  const reset = async () => {
    const frmdata = {
      rm_room_slno: '',
      rm_room_name: '',
      rm_room_no: '',
      rm_room_alias: '',
      rm_room_status: false,
    }
    setRoom(frmdata)
    setFloorData(0)
  }

  const refreshWindow = useCallback(() => {
    const formreset = {
      rm_room_slno: '',
      rm_room_name: '',
      rm_room_no: '',
      rm_room_alias: '',
      rm_room_status: false,
    }
    setRoom(formreset)
    reset()
    setValue(0)
  }, [setRoom])

  const sumbitRoom = useCallback(
    (e) => {
      e.preventDefault()
      const InsertRoom = async (postdata) => {
        const result = await axioslogin.post('/roomnewcreation/insert', postdata)
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
        const result = await axioslogin.patch('/roomnewcreation/update', patchdata)
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
        InsertRoom(postdata)
      } else {
        UpdateRoom(patchdata)
      }
    },
    [postdata, value, count, patchdata],
  )

  const rowSelect = useCallback((params) => {
    setValue(1)

    const data = params.api.getSelectedRows()
    const {
      rm_room_slno,
      rm_room_name,
      rm_room_no,
      rm_room_alias,
      rm_room_floor_slno,
      rm_room_status,
    } = data[0]

    const frmdata = {
      rm_room_slno: rm_room_slno,
      rm_room_name: rm_room_name,
      rm_room_no: rm_room_no,
      rm_room_alias: rm_room_alias,
      rm_room_status: rm_room_status === 1 ? true : false,
    }
    setRoom(frmdata)
    setFloorData(rm_room_floor_slno)
  }, [])
  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])
  return (
    <CardMaster
      title="Room Master"
      submit={sumbitRoom}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder="Room Name"
                type="text"
                size="sm"
                name="rm_room_name"
                value={rm_room_name}
                onchange={updateRoom}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Room Number"
                type="text"
                size="sm"
                name="rm_room_no"
                value={rm_room_no}
                onchange={updateRoom}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Room Alias "
                type="text"
                size="sm"
                name="rm_room_alias"
                value={rm_room_alias}
                onchange={updateRoom}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ width: '100%', pt: 1.5 }}>
              <Box>
                <FloorRmSelect value={floorData} setValue={setFloorData} />
              </Box>
              <Box sx={{ p: 1.5 }}>
                <CusCheckBox
                  label="status"
                  color="primary"
                  size="md"
                  name="rm_room_status"
                  value={rm_room_status}
                  checked={rm_room_status}
                  onCheked={updateRoom}
                ></CusCheckBox>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <RoomNewCreationTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}

export default RoomCreation
