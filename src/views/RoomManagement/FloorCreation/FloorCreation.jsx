import { Box } from '@mui/material'
import React, { useCallback, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import FloorCreationTable from './FloorCreationTable'
import CampusSelect from 'src/views/CommonSelectCode/CampusSelect'
import BuildingRoomManagement from 'src/views/CommonSelectCode/BuildingRoomManagement'
import BuildingBlockSelect from 'src/views/CommonSelectCode/BuildingBlockSelect'
import InsideBluidBlockSelect from 'src/views/CommonSelectCode/InsideBluidBlockSelect'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const FloorCreation = () => {
  const history = useHistory()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [campus, setCampus] = useState(0)
  const [building, setBuilding] = useState(0)
  const [buildBlock, setbuildBlock] = useState(0)
  const [insidebuild, setInsideBuild] = useState(0)

  const [floor, setFloor] = useState({
    rm_floor_slno: '',
    rm_floor_name: '',
    rm_floor_alias: '',
    rm_floor_no: '',
    rm_floor_room_starts: '',
    rm_floor_room_ends: '',
    rm_floor_status: false,
  })
  const {
    rm_floor_slno,
    rm_floor_name,
    rm_floor_alias,
    rm_floor_no,
    rm_floor_status,
    rm_floor_room_starts,
    rm_floor_room_ends,
  } = floor
  const updateFloor = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setFloor({ ...floor, [e.target.name]: value })
    },
    [floor],
  )
  const postdata = useMemo(() => {
    return {
      rm_floor_campus_slno: campus,
      rm_floor_building_slno: building,
      rm_floor_build_block_slno: buildBlock,
      rm_floor_inside_build_slno: insidebuild,
      rm_floor_name: rm_floor_name,
      rm_floor_alias: rm_floor_alias,
      rm_floor_no: rm_floor_no,
      rm_floor_room_starts: rm_floor_room_starts,
      rm_floor_room_ends: rm_floor_room_ends,
      rm_floor_status: rm_floor_status === true ? 1 : 0,
    }
  }, [
    campus,
    building,
    buildBlock,
    insidebuild,
    rm_floor_name,
    rm_floor_alias,
    rm_floor_no,
    rm_floor_room_starts,
    rm_floor_room_ends,
    rm_floor_status,
  ])
  const patchdata = useMemo(() => {
    return {
      rm_floor_slno: rm_floor_slno,
      rm_floor_campus_slno: campus,
      rm_floor_building_slno: building,
      rm_floor_build_block_slno: buildBlock,
      rm_floor_inside_build_slno: insidebuild,
      rm_floor_name: rm_floor_name,
      rm_floor_alias: rm_floor_alias,
      rm_floor_no: rm_floor_no,
      rm_floor_room_starts: rm_floor_room_starts,
      rm_floor_room_ends: rm_floor_room_ends,
      rm_floor_status: rm_floor_status === true ? 1 : 0,
    }
  }, [
    rm_floor_slno,
    campus,
    building,
    buildBlock,
    insidebuild,
    rm_floor_name,
    rm_floor_alias,
    rm_floor_no,
    rm_floor_room_starts,
    rm_floor_room_ends,
    rm_floor_status,
  ])
  const reset = async () => {
    const frmdata = {
      rm_floor_slno: '',
      rm_floor_name: '',
      rm_floor_alias: '',
      rm_floor_no: '',
      rm_floor_room_starts: '',
      rm_floor_room_ends: '',
      rm_floor_status: false,
    }
    setFloor(frmdata)
    setCampus(0)
    setBuilding(0)
    setbuildBlock(0)
    setInsideBuild(0)
  }
  const refreshWindow = useCallback(() => {
    const formreset = {
      rm_floor_slno: '',
      rm_floor_name: '',
      rm_floor_alias: '',
      rm_floor_no: '',
      rm_floor_room_starts: '',
      rm_floor_room_ends: '',
      rm_floor_status: false,
    }
    setFloor(formreset)
    reset()
    setValue(0)
  }, [setFloor])

  const sumbitFloor = useCallback(
    (e) => {
      e.preventDefault()
      const InsertFloor = async (postdata) => {
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
      const UpdateFloor = async (patchdata) => {
        const result = await axioslogin.patch('/floorcreation/updatee', patchdata)
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
    [postdata, value, count, patchdata],
  )
  const rowSelect = useCallback((params) => {
    setValue(1)

    const data = params.api.getSelectedRows()
    const {
      rm_floor_campus_slno,
      rm_floor_building_slno,
      rm_floor_build_block_slno,
      rm_floor_inside_build_slno,
      rm_floor_name,
      rm_floor_alias,
      rm_floor_no,
      rm_floor_status,
      rm_floor_slno,
      rm_floor_room_starts,
      rm_floor_room_ends,
    } = data[0]

    const frmdata = {
      rm_floor_slno: rm_floor_slno,
      rm_floor_name: rm_floor_name,
      rm_floor_alias: rm_floor_alias,
      rm_floor_no: rm_floor_no,
      rm_floor_room_starts: rm_floor_room_starts,
      rm_floor_room_ends: rm_floor_room_ends,
      rm_floor_status: rm_floor_status === 1 ? true : false,
    }
    setFloor(frmdata)
    setCampus(rm_floor_campus_slno)
    setBuilding(rm_floor_building_slno)
    setbuildBlock(rm_floor_build_block_slno)
    setInsideBuild(rm_floor_inside_build_slno)
  }, [])
  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])

  return (
    <CardMaster
      title="Floor Creation"
      submit={sumbitFloor}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <CampusSelect value={campus} setValue={setCampus} />
            </Box>
            <Box sx={{ pt: 1.5 }}>
              <BuildingRoomManagement value={building} setValue={setBuilding} />
            </Box>
            <Box sx={{ pt: 1.5 }}>
              <BuildingBlockSelect value={buildBlock} setValue={setbuildBlock} />
            </Box>
            <Box sx={{ pt: 1.5 }}>
              <InsideBluidBlockSelect value={insidebuild} setValue={setInsideBuild} />
            </Box>
            <Box sx={{ pt: 1.5 }}>
              <TextFieldCustom
                placeholder="Floor"
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
            <Box
              sx={{
                p: 1.5,
                height: '100px',
                width: '650px',
                display: 'flex',
              }}
            >
              <Box sx={{ pt: 0.5 }}>
                <Box>Room No. starts</Box>
                <Box sx={{ pt: 1.8 }}>Room No. ends</Box>
              </Box>
              <Box sx={{ pl: 0.5, width: '100px' }}>
                <Box sx={{ pt: 0.3 }}>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    name="rm_floor_room_starts"
                    value={rm_floor_room_starts}
                    onchange={updateFloor}
                  ></TextFieldCustom>
                </Box>
                <Box sx={{ pt: 0.8 }}>
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
            <Box sx={{ p: 1.5 }}>
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

export default FloorCreation
