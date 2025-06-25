import { Box, Grid } from '@mui/material'
import React, { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import EscalationTimeTable from './EscalationTimeTable'
import { format } from 'date-fns'
import moment from 'moment'
const EscalationTimeMast = () => {
  // Get login user emp_id
  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })
  const history = useNavigate()
  const [count, setCount] = useState(0)
  const [edit, setEdit] = useState(0)
  //intialization
  const [escalation, setEscalation] = useState({
    esc_activity: '',
    esc_responsibility: '',
    esc_time_limit: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    esc_lvl1: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    esc_lvl2: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    esc_lvl3: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    esc_lvl4: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    esc_top_lvl: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    esc_slno: '',
    esc_status: false,
  })
  //destructuring
  const {
    esc_activity,
    esc_responsibility,
    esc_time_limit,
    esc_lvl1,
    esc_lvl2,
    esc_lvl3,
    esc_lvl4,
    esc_top_lvl,
    esc_slno,
    esc_status,
  } = escalation
  //state updation
  const updateEscalation = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setEscalation({ ...escalation, [e.target.name]: value })
    },
    [escalation],
  )
  //  data for insert
  const postdata = useMemo(() => {
    return {
      esc_activity: esc_activity,
      esc_responsibility: esc_responsibility,
      esc_time_limit: moment(esc_time_limit).format('YYYY-MM-DD hh:mm:ss'),
      esc_lvl1: moment(esc_lvl1).format('YYYY-MM-DD hh:mm:ss'),
      esc_lvl2: moment(esc_lvl2).format('YYYY-MM-DD hh:mm:ss'),
      esc_lvl3: moment(esc_lvl3).format('YYYY-MM-DD hh:mm:ss'),
      esc_lvl4: moment(esc_lvl4).format('YYYY-MM-DD hh:mm:ss'),
      esc_top_lvl: moment(esc_top_lvl).format('YYYY-MM-DD hh:mm:ss'),
      esc_status: esc_status === true ? 1 : 0,
      create_user: id,
    }
  }, [
    esc_activity,
    esc_responsibility,
    esc_time_limit,
    esc_lvl1,
    esc_lvl2,
    esc_lvl3,
    esc_lvl4,
    esc_top_lvl,
    id,
    esc_status,
  ])
  //data set for edit
  const rowSelect = useCallback((params) => {
    setEdit(1)
    const data = params.api.getSelectedRows()
    const {
      esc_activity,
      esc_responsibility,
      esc_time_limit,
      esc_lvl1,
      esc_lvl2,
      esc_lvl3,
      esc_lvl4,
      esc_top_lvl,
      esc_slno,
      status,
    } = data[0]
    const frmdata = {
      esc_activity: esc_activity,
      esc_responsibility: esc_responsibility,
      esc_time_limit: esc_time_limit,
      esc_lvl1: esc_lvl1,
      esc_lvl2: esc_lvl2,
      esc_lvl3: esc_lvl3,
      esc_lvl4: esc_lvl4,
      esc_top_lvl: esc_top_lvl,
      esc_status: status === 'Yes' ? true : false,
      esc_slno: esc_slno,
    }
    setEscalation(frmdata)
  }, [])
  // data for update
  const patchdata = useMemo(() => {
    return {
      esc_activity: esc_activity,
      esc_responsibility: esc_responsibility,
      esc_time_limit: esc_time_limit,
      esc_lvl1: esc_lvl1,
      esc_lvl2: esc_lvl2,
      esc_lvl3: esc_lvl3,
      esc_lvl4: esc_lvl4,
      esc_top_lvl: esc_top_lvl,
      esc_status: esc_status === true ? 1 : 0,
      edit_user: id,
      esc_slno: esc_slno,
    }
  }, [
    esc_activity,
    esc_responsibility,
    esc_time_limit,
    esc_lvl1,
    esc_lvl2,
    esc_lvl3,
    esc_lvl4,
    esc_top_lvl,
    id,
    esc_slno,
    esc_status,
  ])

  const submitEscalation = useCallback(
    (e) => {
      e.preventDefault()
      const formreset = {
        esc_activity: '',
        esc_responsibility: '',
        esc_time_limit: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        esc_lvl1: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        esc_lvl2: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        esc_lvl3: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        esc_lvl4: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        esc_top_lvl: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        esc_status: false,
      }
      const InsertFun = async (postdata) => {
        const result = await axioslogin.post('/escalation', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          setEscalation(formreset)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      /***  * update function for use call back     */
      const updateFun = async (patchdata) => {
        const result = await axioslogin.patch('/escalation', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          setEdit(0)
          setEscalation(formreset)
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
    [postdata, patchdata, count, edit],
  )
  //refresh func
  const refreshWindow = useCallback(() => {
    const formreset = {
      esc_activity: '',
      esc_responsibility: '',
      esc_time_limit: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      esc_lvl1: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      esc_lvl2: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      esc_lvl3: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      esc_lvl4: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      esc_top_lvl: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      esc_status: false,
    }
    setEscalation(formreset)
    setEdit(0)
  }, [setEscalation])
  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  return (
    <CardMaster
      title="Escalation Time Master"
      close={backtoSetting}
      submit={submitEscalation}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={3} lg={3}>
            <Grid container spacing={1}>
              <Grid item xl={12} lg={12}>
                {/* <CustomeToolTip title="Activity"> */}
                <TextFieldCustom
                  placeholder="Activity"
                  type="text"
                  size="sm"
                  name="esc_activity"
                  value={esc_activity}
                  onchange={updateEscalation}
                />
                {/* </CustomeToolTip> */}
              </Grid>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Responsibility"
                  type="text"
                  size="sm"
                  name="esc_responsibility"
                  value={esc_responsibility}
                  onchange={updateEscalation}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Time Limit"
                  type="datetime-local"
                  size="sm"
                  name="esc_time_limit"
                  value={esc_time_limit}
                  onchange={updateEscalation}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Level 1"
                  type="datetime-local"
                  size="sm"
                  name="esc_lvl1"
                  value={esc_lvl1}
                  onchange={updateEscalation}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Level 2"
                  type="datetime-local"
                  size="sm"
                  name="esc_lvl2"
                  value={esc_lvl2}
                  onchange={updateEscalation}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Level 3"
                  type="datetime-local"
                  size="sm"
                  name="esc_lvl3"
                  value={esc_lvl3}
                  onchange={updateEscalation}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Level 4"
                  type="datetime-local"
                  size="sm"
                  name="esc_lvl4"
                  value={esc_lvl4}
                  onchange={updateEscalation}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Top Level ED"
                  type="datetime-local"
                  size="sm"
                  name="esc_top_lvl"
                  value={esc_top_lvl}
                  onchange={updateEscalation}
                />
              </Grid>
              <Grid item lg={2} xl={2}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="esc_status"
                  value={esc_status}
                  checked={esc_status}
                  onCheked={updateEscalation}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={9} xl={9}>
            <EscalationTimeTable rowSelect={rowSelect} count={count} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}
export default EscalationTimeMast
