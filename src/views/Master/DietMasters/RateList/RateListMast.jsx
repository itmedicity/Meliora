import { Box, Grid } from '@mui/material'
import React, { useMemo, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import RateListMastTable from './RateListMastTable'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import SelectRoomcatOra from 'src/views/CommonSelectCode/SelectRoomcatOra'
import SelectDiet from 'src/views/CommonSelectCode/SelectDiet'
import SelectDietType from 'src/views/CommonSelectCode/SelectDietType'
const RateListMast = () => {
  const [edit, setEdit] = useState(0)
  const [value1, setValue1] = useState(0)
  const [value2, setValue2] = useState(0)
  const [value3, setValue3] = useState(0)
  const history = useNavigate()
  const [count, setCount] = useState(0)
  const [ratelist, setRatelist] = useState({
    type_slno: '',
    hosp_rate: '',
    cant_rate: '',
    status: false,
  })
  const { drate_slno, hosp_rate, cant_rate, status } = ratelist
  const updateRatelist = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setRatelist({ ...ratelist, [e.target.name]: value })
    },
    [ratelist]
  )
  const postData = useMemo(() => {
    return {
      diet_slno: value1,
      rc_code: value2,
      type_slno: value3,
      hosp_rate: hosp_rate,
      cant_rate: cant_rate,
      status: status,
    }
  }, [hosp_rate, cant_rate, status, value1, value2, value3])
  const rowSelect = useCallback(params => {
    setEdit(1)
    const data = params.api.getSelectedRows()
    const { drate_slno, diet_slno, rc_code, type_slno, hosp_rate, cant_rate, status } = data[0]
    const frmdata = {
      drate_slno: drate_slno,
      hosp_rate: hosp_rate,
      cant_rate: cant_rate,
      status: status === 1 ? true : false,
    }
    setValue1(diet_slno)
    setValue2(rc_code)
    setValue3(type_slno)

    setRatelist(frmdata)
  }, [])
  const patchdata = useMemo(() => {
    return {
      diet_slno: value1,
      rc_code: value2,
      type_slno: value3,
      hosp_rate: hosp_rate,
      cant_rate: cant_rate,
      status: status === true ? 1 : 0,
      drate_slno: drate_slno,
    }
  }, [hosp_rate, cant_rate, status, drate_slno, value1, value2, value3])
  const reset = async () => {
    setValue1(0)
    setValue2(0)
    setValue3(0)
  }
  const submitRatelist = useCallback(
    e => {
      e.preventDefault()
      const frmdata = {
        hosp_rate: '',
        cant_rate: '',
        status: false,
      }
      const insertData = async postData => {
        const result = await axioslogin.post(`/ratelist`, postData)
        const { success, message } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          setRatelist(frmdata)
          reset()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      const updateData = async patchdata => {
        const result = await axioslogin.patch(`/ratelist`, patchdata)
        const { success, message } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          setEdit(0)
          setRatelist(frmdata)
          reset()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify()
        }
      }
      if (edit === 0) {
        insertData(postData)
      } else {
        updateData(patchdata)
      }
    },
    [postData, edit, count, patchdata]
  )

  //Close function
  const backToSettings = useCallback(() => {
    history(`/Home/Settings`)
  }, [history])
  //Refresh function
  const refreshWindow = useCallback(() => {
    const frmdata = {
      diet_slno: value1,
      rc_code: value2,
      type_slno: value3,
      hosp_rate: '',
      cant_rate: '',
      status: false,
    }
    setRatelist(frmdata)
    reset()
    setEdit(0)
  }, [setRatelist, value1, value2, value3])
  return (
    <CardMaster
      title="Rate List master"
      submit={submitRatelist}
      refresh={refreshWindow}
      close={backToSettings}
    >
      <Box sx={{ padding: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={4} lg={4}>
            <Grid container spacing={1}>
              <Grid item xl={12} lg={12}>
                <SelectDiet value={value1} setValue={setValue1} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <SelectRoomcatOra value={value2} setValue={setValue2} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <SelectDietType value={value3} setValue={setValue3} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <Grid container spacing={1}>
                  <Grid item xl={12} lg={12}>
                    <TextFieldCustom
                      placeholder="Hospital Rate"
                      type="text"
                      size="sm"
                      name="hosp_rate"
                      value={hosp_rate}
                      onchange={updateRatelist}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xl={12} lg={12}>
                <Grid container spacing={1}>
                  <Grid item xl={12} lg={12}>
                    <TextFieldCustom
                      placeholder="Canteen Rate"
                      type="text"
                      size="sm"
                      name="cant_rate"
                      value={cant_rate}
                      onchange={updateRatelist}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xl={2} lg={2}>
                <CusCheckBox
                  label="Status"
                  size="md"
                  color="primary"
                  name="status"
                  value={status}
                  checked={status}
                  onCheked={updateRatelist}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={8} lg={8}>
            <RateListMastTable count={count} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}
export default RateListMast
