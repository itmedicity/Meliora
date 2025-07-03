import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import RoomMastSelectOra from 'src/views/CommonSelectCode/RoomMastSelectOra'
import SelectRoomtypeMeli from 'src/views/CommonSelectCode/SelectRoomtypeMeli'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import RoomCreationTable from './RoomCreationTable'
const RoomCreation = () => {
  const history = useNavigate()
  //state for table rendering
  const [count, setCount] = useState(0)
  //state for edit
  const [edit, setEdit] = useState(0)
  //state for select box
  const [roomType, setRoomType] = useState(0)
  const [oracleRoom, setOracleRoom] = useState(0)
  //intializing
  const [rmcreation, setRmcreation] = useState({
    rmc_name: '',
    rmc_status: false,
    rmc_slno: '',
  })
  //destructuring
  const { rmc_name, rmc_status, rmc_slno } = rmcreation
  const updateRoomcreation = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setRmcreation({ ...rmcreation, [e.target.name]: value })
    },
    [rmcreation]
  )
  //insert data
  const postdata = useMemo(() => {
    return {
      rmc_name: rmc_name,
      rmc_type: roomType,
      rm_code: oracleRoom,
      rmc_status: rmc_status === true ? 1 : 0,
      em_id: 1,
    }
  }, [rmc_name, roomType, oracleRoom, rmc_status])
  //data set for edit
  const rowSelect = useCallback(params => {
    setEdit(1)
    const data = params.api.getSelectedRows()
    const { rmc_name, rmc_slno, status, rm_code, rmc_type } = data[0]
    const frmdata = {
      rmc_name: rmc_name,
      rmc_status: status === 'Yes' ? true : false,
      rmc_slno: rmc_slno,
    }
    setRmcreation(frmdata)
    setRoomType(rmc_type)
    setOracleRoom(rm_code)
  }, [])
  //update data
  const patchdata = useMemo(() => {
    return {
      rmc_name: rmc_name,
      rmc_type: roomType,
      rm_code: oracleRoom,
      rmc_status: rmc_status === true ? 1 : 0,
      rmc_slno: rmc_slno,
    }
  }, [rmc_name, roomType, oracleRoom, rmc_status, rmc_slno])
  //reset select box
  const reset = async () => {
    setRoomType(0)
    setOracleRoom(0)
  }
  /*** usecallback function for form submitting */
  const submitRoomcreation = useCallback(
    e => {
      e.preventDefault()
      const formreset = {
        rmc_name: '',
        rmc_status: false,
        rmc_slno: '',
      }
      /*** * insert function for use call back     */
      const InsertFun = async postdata => {
        const result = await axioslogin.post('/roomcreation', postdata)
        const { message, success } = result.data
        if (success === 1) {
          setRmcreation(formreset)
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
      const updateFun = async patchdata => {
        const result = await axioslogin.patch('/roomcreation', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          setRmcreation(formreset)
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
    [edit, postdata, patchdata, count]
  )
  //refresh func
  const refreshWindow = useCallback(() => {
    const formreset = {
      rmc_name: '',
      rmc_status: false,
      rmc_slno: '',
    }
    setRmcreation(formreset)
    reset()
    setEdit(0)
  }, [setRmcreation])
  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])

  return (
    <CardMaster
      title="Room Creation"
      close={backtoSetting}
      submit={submitRoomcreation}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={4} lg={4}>
            <Grid container spacing={1}>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Room Name"
                  type="text"
                  size="sm"
                  name="rmc_name"
                  value={rmc_name}
                  onchange={updateRoomcreation}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <SelectRoomtypeMeli value={roomType} setValue={setRoomType} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <RoomMastSelectOra value={oracleRoom} setValue={setOracleRoom} Type={roomType} />
              </Grid>
              <Grid item lg={2} xl={2}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="rmc_status"
                  value={rmc_status}
                  checked={rmc_status}
                  onCheked={updateRoomcreation}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} xl={8}>
            <RoomCreationTable count={count} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}
export default RoomCreation
