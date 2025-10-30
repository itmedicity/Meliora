import React, { useCallback, useMemo, useState, memo, useEffect } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { Box } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import RoomNewCreationTable from './RoomNewCreationTable'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import FloorSelectBasedBuild from 'src/views/CommonSelectCode/FloorSelectBasedBuild'
import RmRoomTypeSelect from 'src/views/CommonSelectCode/RmRoomTypeSelect'
import RmRoomCategorySelect from 'src/views/CommonSelectCode/RmRoomCategorySelect'
import InsideBluidBlockSelect from 'src/views/CommonSelectCode/InsideBluidBlockSelect'
// import { CssVarsProvider, Typography } from '@mui/joy'
import BuildingSelectWithoutName from 'src/views/CommonSelectCode/BuildingSelectWithoutName'
import BuildBlockSelect from 'src/views/CommonSelectCode/BuildBlockSelect'
import DeptSectionSelect from 'src/views/CommonSelectCode/DeptSectionSelect'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

const RoomCreation = () => {
  const history = useNavigate()
  const queryClient = useQueryClient()
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(0)
  const [building, setBuilding] = useState(0)
  const [floorData, setFloorData] = useState(0)
  const [buildingBlock, SetbuildingBlock] = useState(0)
  const [insideBuildBlock, setInsideBuildBlck] = useState(0)
  const [roomType, setRoomType] = useState(0)
  const [roomCategory, setCategory] = useState(0)
  const [BlockName, setBlockName] = useState('')
  const [floorShort, setFloorShort] = useState('')
  // const [subroom, setSubRoom] = useState('')
  const [outlet, setOutlet] = useState(0)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [lastRoom, setLastRoom] = useState(0)
  const [roomData, setRoomData] = useState([])
  const [lastRoomData, setLastRoomData] = useState([])
  const [room, setRoom] = useState({
    rm_room_slno: '',
    rm_room_name: '',
    rm_room_status: false,
    rm_room_no_dis: '',
    rm_old_roomno: ''
  })

  const { rm_room_slno, rm_room_name, rm_room_status, rm_room_no_dis, rm_old_roomno } = room
  const updateRoom = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setRoom({ ...room, [e.target.name]: value })
    },
    [room]
  )

  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  // const UpdateSubRoom = (e) => {
  //   setSubRoom(e.target.value)
  // }
  const postdata = useMemo(() => {
    return {
      rm_room_name: rm_room_name,
      rm_room_no: floorData + '/' + insideBuildBlock,
      rm_room_alias: floorShort + '/' + BlockName,
      rm_build_slno: building,
      rm_building_block_slno: buildingBlock,
      rm_room_floor_slno: floorData,
      rm_insidebuilldblock_slno: insideBuildBlock,
      rm_roomtype_slno: roomType,
      rm_category_slno: roomCategory,
      rm_outlet_slno: outlet,
      rm_room_status: rm_room_status === true ? 1 : 0,
      actual_rm_no: lastRoom + 1,
      rm_room_no_dis: rm_room_no_dis,
      rm_old_roomno: rm_old_roomno,
      create_user: id
    }
  }, [
    rm_room_name,
    building,
    buildingBlock,
    floorData,
    insideBuildBlock,
    floorShort,
    BlockName,
    roomType,
    roomCategory,
    outlet,
    rm_room_status,
    lastRoom,
    rm_room_no_dis,
    rm_old_roomno,
    id
  ])

  const patchdata = useMemo(() => {
    return {
      rm_room_slno: rm_room_slno,
      rm_room_name: rm_room_name,
      rm_room_no: floorData + '/' + insideBuildBlock,
      rm_room_alias: floorShort + '/' + BlockName,
      rm_build_slno: building,
      rm_building_block_slno: buildingBlock,
      rm_room_floor_slno: floorData,
      rm_insidebuilldblock_slno: insideBuildBlock,
      rm_roomtype_slno: roomType,
      rm_category_slno: roomCategory,
      rm_outlet_slno: outlet,
      rm_room_status: rm_room_status === true ? 1 : 0,
      rm_room_no_dis: rm_room_no_dis,
      rm_old_roomno: rm_old_roomno,
      edit_user: id
    }
  }, [
    rm_room_slno,
    rm_room_name,
    building,
    buildingBlock,
    floorData,
    insideBuildBlock,
    BlockName,
    floorShort,
    roomType,
    roomCategory,
    outlet,
    rm_room_status,
    rm_room_no_dis,
    rm_old_roomno,
    id
  ])

  const reset = async () => {
    const frmdata = {
      rm_room_slno: '',
      rm_room_name: '',
      rm_room_status: false,
      rm_room_no_dis: '',
      rm_old_roomno: ''
    }
    setRoom(frmdata)
    setFloorData(0)
    setValue(0)
    setBuilding(0)
    SetbuildingBlock(0)
    setInsideBuildBlck(0)
    setRoomType(0)
    setCategory(0)
    setCount(0)
    setOutlet(0)
    setBlockName('')
    setFloorShort('')
    // setSubRoom('')
    setOutlet(0)
    setStart(0)
    setEnd(0)
    setLastRoom(0)
    setRoomData([])
    setLastRoomData([])
  }

  const insertdata = useMemo(() => {
    return {
      rm_floor_building_slno: building,
      rm_floor_build_block_slno: buildingBlock
    }
  }, [building, buildingBlock])

  useEffect(() => {
    const getRoomStart = async floorData => {
      const result = await axioslogin.get(`/roomnewcreation/byid/${floorData}`)
      const { success, data } = result.data
      if (success === 2) {
        setRoomData(data)
      } else {
        setRoomData([])
      }
    }
    if (floorData !== 0) {
      getRoomStart(floorData)
    }
  }, [floorData])

  useEffect(() => {
    const getlastUpdateRoom = async floorData => {
      const result = await axioslogin.get(`/roomnewcreation/lastupdatebyid/${floorData}`)
      const { success, data } = result.data
      if (success === 2) {
        setLastRoomData(data)
      }
    }
    if (floorData !== 0) {
      getlastUpdateRoom(floorData)
    }
  }, [floorData])

  useEffect(() => {
    if (floorData !== 0 && roomData.length !== 0) {
      const { rm_floor_room_starts, rm_floor_room_ends } = roomData[0]
      setStart(rm_floor_room_starts)
      setEnd(rm_floor_room_ends)
    }

    if (floorData !== 0 && lastRoomData.length !== 0) {
      const { last_room_slno } = lastRoomData[0]
      setLastRoom(last_room_slno)
    }
  }, [roomData, floorData, lastRoomData])

  const refreshWindow = useCallback(() => {
    reset()
  }, [])

  const sumbitRoom = useCallback(
    e => {
      e.preventDefault()
      const InsertRoom = async postdata => {
        const result = await axioslogin.post('/roomnewcreation/insert', postdata)
        return result.data
      }
      const UpdateRoom = async patchdata => {
        const result = await axioslogin.patch('/roomnewcreation/update', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          queryClient.invalidateQueries('GetroomData')
          reset()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      if (value === 0) {
        if (start <= lastRoom && lastRoom <= end) {
          InsertRoom(postdata).then(val => {
            const { success } = val
            if (success === 1) {
              succesNotify('Room created successfully')
              setCount(count + 1)
              queryClient.invalidateQueries('GetroomData')
              reset()
            } else if (success === 0) {
              infoNotify('Error Occured')
            } else {
              infoNotify('Error Occured')
            }
          })
        } else {
          infoNotify('No Room Available in Selected Floor')
        }
      } else {
        UpdateRoom(patchdata)
      }
    },
    [postdata, value, count, patchdata, start, lastRoom, end, queryClient]
  )
  const rowSelect = useCallback(params => {
    setValue(1)

    const data = params.api.getSelectedRows()
    const {
      rm_room_slno,
      rm_build_slno,
      rm_building_block_slno,
      rm_room_floor_slno,
      rm_insidebuilldblock_slno,
      rm_room_name,
      rm_roomtype_slno,
      rm_room_status,
      rm_category_slno,
      rm_outlet_slno,
      rm_room_no_dis,
      rm_old_roomno
    } = data[0]

    const frmdata = {
      rm_room_slno: rm_room_slno,
      rm_room_name: rm_room_name,
      rm_room_status: rm_room_status === 1 ? true : false,
      rm_room_no_dis: rm_room_no_dis,
      rm_old_roomno: rm_old_roomno
    }
    setRoom(frmdata)
    setFloorData(rm_room_floor_slno)
    setBuilding(rm_build_slno)
    SetbuildingBlock(rm_building_block_slno)
    setInsideBuildBlck(rm_insidebuilldblock_slno)
    setRoomType(rm_roomtype_slno)
    setCategory(rm_category_slno)
    setOutlet(rm_outlet_slno)
  }, [])
  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])

  return (
    <CardMaster
      title="Room/Hall/Dormitory/Corridor Master"
      submit={sumbitRoom}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box sx={{ pt: 1 }}>
              <BuildingSelectWithoutName value={building} setValue={setBuilding} />
            </Box>
            <Box sx={{ pt: 1 }}>
              <BuildBlockSelect value={buildingBlock} setValue={SetbuildingBlock} />
            </Box>
            <Box sx={{ pt: 1.5 }}>
              <FloorSelectBasedBuild
                insertdata={insertdata}
                value={floorData}
                setValue={setFloorData}
                buildno={building}
                setName={setFloorShort}
              />
            </Box>
            <Box sx={{ pt: 1.5 }}>
              <InsideBluidBlockSelect value={insideBuildBlock} setValue={setInsideBuildBlck} setName={setBlockName} />
            </Box>
            <Box sx={{ pt: 1.5 }}>
              <RmRoomCategorySelect value={roomCategory} setValue={setCategory} buildno={building} />
            </Box>
            <Box sx={{ pt: 1.5 }}>
              <RmRoomTypeSelect value={roomType} setValue={setRoomType} buildno={building} />
            </Box>
            <Box sx={{ pt: 1.5 }}>
              <DeptSectionSelect value={outlet} setValue={setOutlet} />
            </Box>
            <Box sx={{ pt: 1 }}>
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
                name="rm_room_no_dis"
                value={rm_room_no_dis}
                onchange={updateRoom}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <TextFieldCustom
                placeholder="Old Room Number"
                type="text"
                size="sm"
                name="rm_old_roomno"
                value={rm_old_roomno}
                onchange={updateRoom}
              ></TextFieldCustom>
            </Box>
            {/* <Box sx={{ pt: 1, display: 'flex', flexDirection: 'row' }}>
              <Box sx={{ pt: 0.5 }}>
                <CssVarsProvider>
                  <Typography sx={{ fontSize: 15 }}>Sub Room Count: </Typography>
                </CssVarsProvider>
              </Box>
              <Box sx={{ pl: 1 }}>
                <TextFieldCustom
                  placeholder="Sub Room Count"
                  type="text"
                  size="sm"
                  name="subroom"
                  value={subroom}
                  onchange={UpdateSubRoom}
                ></TextFieldCustom>
              </Box>
            </Box> */}
            <Box sx={{ p: 1 }}>
              <CusCheckBox
                label="Status"
                color="primary"
                size="md"
                name="rm_room_status"
                value={rm_room_status}
                checked={rm_room_status}
                onCheked={updateRoom}
              ></CusCheckBox>
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

export default memo(RoomCreation)
