import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import RoomTypeSelectora from 'src/views/CommonSelectCode/RoomTypeSelectora'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import RoomTypeTable from './RoomTypeTable'
const RoomTypeMast = () => {
  const history = useNavigate()
  //state for select box
  const [value, setValue] = useState(0)
  //state for edit
  const [edit, setEdit] = useState(0)
  //state for table rendering
  const [count, setCount] = useState(0)
  //intializing
  const [room, setRoom] = useState({
    rmc_desc: '',
    rmc_status: false,
    rmc_type: '',
  })
  //destructuring
  const { rmc_desc, rmc_status, rmc_type } = room
  const updateRoomtype = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setRoom({ ...room, [e.target.name]: value })
    },
    [room],
  )
  //insert data
  const postdata = useMemo(() => {
    return {
      rmc_desc: rmc_desc,
      rt_code: value,
      rmc_status: rmc_status === true ? 1 : 0,
      em_id: 1,
    }
  }, [rmc_desc, value, rmc_status])
  //data set for edit
  const rowSelect = useCallback((params) => {
    setEdit(1)
    const data = params.api.getSelectedRows()
    const { rmc_desc, status, rt_code, rmc_type } = data[0]
    const frmdata = {
      rmc_desc: rmc_desc,
      rmc_status: status === 'Yes' ? true : false,
      rmc_type: rmc_type,
    }
    setRoom(frmdata)
    setValue(rt_code)
  }, [])
  //update data
  const patchdata = useMemo(() => {
    return {
      rmc_desc: rmc_desc,
      rt_code: value,
      rmc_status: rmc_status === true ? 1 : 0,
      rmc_type: rmc_type,
    }
  }, [rmc_desc, value, rmc_status, rmc_type])
  //reset select box
  const reset = async () => {
    setValue(0)
  }
  const submitRoomtype = useCallback(
    (e) => {
      e.preventDefault()
      const formreset = {
        rmc_desc: '',
        rmc_status: false,
        rmc_type: '',
      }
      /*** * insert function for use call back     */
      const InsertFun = async (postdata) => {
        const result = await axioslogin.post('/roomtype', postdata)
        const { message, success } = result.data
        if (success === 1) {
          setRoom(formreset)
          succesNotify(message)
          setCount(count + 1)
          reset()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      /***  * update function for use call back     */
      const updateFun = async (patchdata) => {
        const result = await axioslogin.patch('/roomtype', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          setRoom(formreset)
          succesNotify(message)
          setCount(count + 1)
          setEdit(0)
          reset()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      /*** edit=0 insert api call work else update call
       * edit initialy '0' when edit button click value changes to '1'
       */
      if (edit === 0) {
        InsertFun(postdata)
      } else {
        updateFun(patchdata)
      }
    },
    [edit, postdata, patchdata, count],
  )
  //refresh func
  const refreshWindow = useCallback(() => {
    const formreset = {
      rmc_desc: '',
      rmc_status: false,
      rmc_type: '',
    }
    setRoom(formreset)
    reset()
    setEdit(0)
  }, [setRoom])
  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  return (
    <CardMaster
      title="Room Type"
      close={backtoSetting}
      refresh={refreshWindow}
      submit={submitRoomtype}
    >
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={4} lg={4}>
            <Grid container spacing={1}>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Room Description"
                  type="text"
                  size="sm"
                  name="rmc_desc"
                  value={rmc_desc}
                  onchange={updateRoomtype}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <RoomTypeSelectora value={value} setValue={setValue} />
              </Grid>
              <Grid item lg={12} xl={12} sx={{ mt: 1 }}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="rmc_status"
                  value={rmc_status}
                  checked={rmc_status}
                  onCheked={updateRoomtype}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} xl={8}>
            <RoomTypeTable count={count} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}
export default RoomTypeMast
