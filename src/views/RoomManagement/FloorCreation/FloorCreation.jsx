import React, { useCallback, useState, memo } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import FloorCreationTable from './FloorCreationTable'
import CampusSelect from 'src/views/CommonSelectCode/CampusSelect'
import BuildingRoomManagement from 'src/views/CommonSelectCode/BuildingRoomManagement'
import BuildingBlockSelect from 'src/views/CommonSelectCode/BuildingBlockSelect'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/joy'

const FloorCreation = () => {
  const history = useNavigate()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [campus, setCampus] = useState(0)
  const [building, setBuilding] = useState(0)
  const [buildBlock, setbuildBlock] = useState(0)
  const [campusshort, setCampusShort] = useState('')
  const [buildingShort, setBuildingShort] = useState('')
  const [buildBlockShort, setbuildBlockShort] = useState('')

  const [floor, setFloor] = useState({
    rm_floor_slno: '',
    rm_floor_name: '',
    floor_order: '',
    rm_floor_room_starts: '',
    rm_floor_room_ends: '',
    rm_floor_status: false
  })
  const { rm_floor_slno, rm_floor_name, rm_floor_status, floor_order, rm_floor_room_starts, rm_floor_room_ends } = floor

  const updateFloor = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setFloor({ ...floor, [e.target.name]: value })
    },
    [floor]
  )

  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const postdata = useMemo(() => {
    return {
      rm_floor_campus_slno: campus,
      rm_floor_building_slno: building,
      rm_floor_build_block_slno: buildBlock,
      rm_floor_name: rm_floor_name,
      rm_floor_alias: campusshort + '/' + buildingShort + '/' + buildBlockShort,
      rm_floor_no: campus + '/' + building + '/' + buildBlock,
      floor_order: floor_order,
      rm_floor_room_starts: rm_floor_room_starts,
      rm_floor_room_ends: rm_floor_room_ends,
      rm_floor_status: rm_floor_status === true ? 1 : 0,
      create_user: id
    }
  }, [
    campus,
    building,
    buildBlock,
    rm_floor_name,
    floor_order,
    rm_floor_room_starts,
    rm_floor_room_ends,
    rm_floor_status,
    campusshort,
    buildingShort,
    buildBlockShort,
    id
  ])

  const patchdata = useMemo(() => {
    return {
      rm_floor_slno: rm_floor_slno,
      rm_floor_campus_slno: campus,
      rm_floor_building_slno: building,
      rm_floor_build_block_slno: buildBlock,
      rm_floor_name: rm_floor_name,
      rm_floor_alias: campusshort + '/' + buildingShort + '/' + buildBlockShort,
      rm_floor_no: campus + '/' + building + '/' + buildBlock,
      floor_order: floor_order,
      rm_floor_room_starts: rm_floor_room_starts,
      rm_floor_room_ends: rm_floor_room_ends,
      rm_floor_status: rm_floor_status === true ? 1 : 0,
      edit_user: id
    }
  }, [
    rm_floor_slno,
    campus,
    building,
    buildBlock,
    rm_floor_name,
    floor_order,
    rm_floor_room_starts,
    rm_floor_room_ends,
    rm_floor_status,
    campusshort,
    buildingShort,
    buildBlockShort,
    id
  ])
  const reset = async () => {
    const frmdata = {
      rm_floor_slno: '',
      rm_floor_name: '',
      floor_order: '',
      rm_floor_room_starts: '',
      rm_floor_room_ends: '',
      rm_floor_status: false
    }
    setFloor(frmdata)
    setValue(0)
    setCampus(0)
    setBuilding(0)
    setbuildBlock(0)
  }
  const refreshWindow = useCallback(() => {
    const formreset = {
      rm_floor_slno: '',
      rm_floor_name: '',
      floor_order: '',
      rm_floor_room_starts: '',
      rm_floor_room_ends: '',
      rm_floor_status: false
    }
    setFloor(formreset)
    reset()
  }, [setFloor])

  const sumbitFloor = useCallback(
    e => {
      e.preventDefault()
      const InsertFloor = async postdata => {
        const result = await axioslogin.post('/floorcreation/insert', postdata)
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
        const result = await axioslogin.patch('/floorcreation/updatee', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)

          reset()
          setCount(count + 1)
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
    [postdata, value, count, patchdata]
  )
  const rowSelect = useCallback(params => {
    setValue(1)

    const data = params.api.getSelectedRows()
    const {
      rm_floor_campus_slno,
      rm_floor_building_slno,
      rm_floor_build_block_slno,
      rm_floor_name,
      rm_floor_status,
      rm_floor_slno,
      floor_order,
      rm_floor_room_starts,
      rm_floor_room_ends
    } = data[0]

    const frmdata = {
      rm_floor_slno: rm_floor_slno,
      rm_floor_name: rm_floor_name,
      floor_order: floor_order,
      rm_floor_room_starts: rm_floor_room_starts,
      rm_floor_room_ends: rm_floor_room_ends,
      rm_floor_status: rm_floor_status === 1 ? true : false
    }
    setFloor(frmdata)
    setCampus(rm_floor_campus_slno)
    setBuilding(rm_floor_building_slno)
    setbuildBlock(rm_floor_build_block_slno)
  }, [])
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])

  return (
    <CardMaster title="Floor Creation" submit={sumbitFloor} close={backtoSetting} refresh={refreshWindow}>
      <Box sx={{ p: 1, width: "100%" }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex', }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <CampusSelect value={campus} setValue={setCampus} setName={setCampusShort} />
            </Box>
            <Box sx={{ pt: 1.5 }}>
              <BuildingRoomManagement value={building} setValue={setBuilding} setName={setBuildingShort} />
            </Box>
            <Box sx={{ pt: 1.5 }}>
              <BuildingBlockSelect value={buildBlock} setValue={setbuildBlock} setName={setbuildBlockShort} />
            </Box>
            <Box sx={{ pt: 1.2 }}>
              <TextFieldCustom
                placeholder="Floor"
                type="text"
                size="sm"
                name="rm_floor_name"
                value={rm_floor_name}
                onchange={updateFloor}
              ></TextFieldCustom>
            </Box>
            <Box
              sx={{
                p: 1.5,
                height: '100px',
                width: '650px',
                display: 'flex'
              }}
            >
              <Box sx={{ pt: 0.5 }}>
                <Box>Floor Code</Box>
                <Box sx={{ pt: 1.5 }}>Room No. starts</Box>
                <Box sx={{ pt: 1.5 }}>Room No. ends</Box>
              </Box>
              <Box sx={{ pl: 0.5, width: '100px' }}>
                <Box sx={{ pt: 0.5 }}>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    name="floor_order"
                    value={floor_order}
                    onchange={updateFloor}
                  ></TextFieldCustom>
                </Box>
                <Box sx={{ pt: 0.5 }}>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    name="rm_floor_room_starts"
                    value={rm_floor_room_starts}
                    onchange={updateFloor}
                  ></TextFieldCustom>
                </Box>
                <Box sx={{ pt: 0.5 }}>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    name="rm_floor_room_ends"
                    value={rm_floor_room_ends}
                    onchange={updateFloor}
                  ></TextFieldCustom>
                </Box>
              </Box>
            </Box>
            <Box sx={{ pt: 3 }}>
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
            <FloorCreationTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(FloorCreation)
