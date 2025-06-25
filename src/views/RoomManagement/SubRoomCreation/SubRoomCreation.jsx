import React, { useCallback, useMemo, useState } from 'react'
import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import SubroomTable from './SubroomTable'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import SelectRoomtypeMeli from 'src/views/CommonSelectCode/SelectRoomtypeMeli'
import RmmasterMeliSelect from 'src/views/CommonSelectCode/RmmasterMeliSelect'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
const SubRoomCreation = () => {
  const history = useNavigate()
  //state for table rendering
  const [count, setCount] = useState(0)
  //state for select box
  const [value1, setValue1] = useState(0)
  const [value2, setValue2] = useState(0)
  //state for edit
  const [edit, setEdit] = useState(0)
  //intializing
  const [subroom, setSubroom] = useState({
    subrm_desc: '',
    status: false,
    subrm_slno: '',
  })
  //destructuring
  const { subrm_desc, status, subrm_slno } = subroom
  const updateSubroomcreation = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setSubroom({ ...subroom, [e.target.name]: value })
    },
    [subroom],
  )
  //insert data
  const postdata = useMemo(() => {
    return {
      subrm_desc: subrm_desc,
      rmc_slno: value2,
      rmc_type: value1,
      status: status === true ? 1 : 0,
      em_id: 1,
    }
  }, [subrm_desc, value1, value2, status])
  //data set for edit
  const rowSelect = useCallback((params) => {
    setEdit(1)
    const data = params.api.getSelectedRows()
    const { subrm_desc, rmc_slno, status, rmc_type, subrm_slno } = data[0]
    const frmdata = {
      subrm_desc: subrm_desc,
      status: status === 'Yes' ? true : false,
      subrm_slno: subrm_slno,
    }
    setSubroom(frmdata)
    setValue1(rmc_type)
    setValue2(rmc_slno)
  }, [])
  //update data
  const patchdata = useMemo(() => {
    return {
      subrm_desc: subrm_desc,
      rmc_slno: value2,
      rmc_type: value1,
      status: status === true ? 1 : 0,
      subrm_slno: subrm_slno,
    }
  }, [subrm_desc, value1, value2, status, subrm_slno])
  /*** usecallback function for form submitting */
  const submitSubroomcreation = useCallback(
    (e) => {
      e.preventDefault()
      const formreset = {
        subrm_desc: '',
        status: false,
        subrm_slno: '',
      }
      /*** * insert function for use call back     */
      const InsertFun = async (postdata) => {
        const result = await axioslogin.post('/subroomcreation', postdata)
        const { message, success } = result.data
        if (success === 1) {
          setSubroom(formreset)
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
        const result = await axioslogin.patch('/subroomcreation', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          setSubroom(formreset)
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

  //reset select box
  const reset = async () => {
    setValue2(0)
    setValue1(0)
  }
  //refresh func
  const refreshWindow = useCallback(() => {
    const formreset = {
      subrm_desc: '',
      status: false,
      subrm_slno: '',
    }
    setSubroom(formreset)
    reset()
    setEdit(0)
  }, [setSubroom])

  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])

  return (
    <CardMaster
      title="Subroom Creation"
      close={backtoSetting}
      submit={submitSubroomcreation}
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
                  name="subrm_desc"
                  value={subrm_desc}
                  onchange={updateSubroomcreation}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <RmmasterMeliSelect value={value2} setValue={setValue2} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <SelectRoomtypeMeli value={value1} setValue={setValue1} />
              </Grid>
              <Grid item lg={2} xl={2}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="status"
                  value={status}
                  checked={status}
                  onCheked={updateSubroomcreation}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} xl={8}>
            <SubroomTable count={count} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}

export default SubRoomCreation
