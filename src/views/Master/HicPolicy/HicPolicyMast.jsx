import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import HicPolicyTable from './HicPolicyTable'
import { useSelector } from 'react-redux'
const HicPolicyMast = () => {
  const history = useNavigate()
  //state for table rendering
  const [count, setCount] = useState(0)
  //state for edit
  const [edit, setEdit] = useState(0)
  //intializing
  const [hic, setHic] = useState({
    hic_policy_name: '',
    hic_policy_status: false,
    hic_policy_slno: '',
  })
  //destructuring
  const { hic_policy_name, hic_policy_status, hic_policy_slno } = hic
  const updatehicPolicy = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setHic({ ...hic, [e.target.name]: value })
    },
    [hic]
  )
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  //data for insert
  const postdata = useMemo(() => {
    return {
      hic_policy_name: hic_policy_name,
      hic_policy_status: hic_policy_status === true ? 1 : 0,
      create_user: id,
    }
  }, [hic_policy_name, hic_policy_status, id])
  //data set for edit
  const rowSelect = useCallback(params => {
    setEdit(1)
    const data = params.api.getSelectedRows()
    const { hic_policy_name, status, hic_policy_slno } = data[0]
    const frmdata = {
      hic_policy_name: hic_policy_name,
      hic_policy_status: status === 'Yes' ? true : false,
      hic_policy_slno: hic_policy_slno,
    }
    setHic(frmdata)
  }, [])
  //data for edit
  const patchdata = useMemo(() => {
    return {
      hic_policy_name: hic_policy_name,
      hic_policy_status: hic_policy_status === true ? 1 : 0,
      edit_user: id,
      hic_policy_slno: hic_policy_slno,
    }
  }, [hic_policy_name, hic_policy_status, hic_policy_slno, id])
  /*** usecallback function for form submitting */
  const submitHicpolicy = useCallback(
    e => {
      e.preventDefault()
      const formreset = {
        hic_policy_name: '',
        hic_policy_status: false,
        hic_policy_slno: '',
      }
      /*** * insert function for use call back     */
      const InsertFun = async postdata => {
        const result = await axioslogin.post('/hicpolicy', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          setHic(formreset)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      /***  * update function for use call back     */
      const updateFun = async patchdata => {
        const result = await axioslogin.patch('/hicpolicy', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          setEdit(0)
          setHic(formreset)
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
  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  //refresh func
  const refreshWindow = useCallback(() => {
    const formreset = {
      hic_policy_name: '',
      hic_policy_status: false,
    }
    setHic(formreset)
    setEdit(0)
  }, [setHic])
  return (
    <CardMaster
      title="Hic Policy Master"
      close={backtoSetting}
      submit={submitHicpolicy}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={4} lg={4}>
            <Grid container spacing={1}>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Hic Ploicy Name"
                  type="text"
                  size="sm"
                  name="hic_policy_name"
                  value={hic_policy_name}
                  onchange={updatehicPolicy}
                />
              </Grid>
              <Grid item lg={2} xl={2}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="hic_policy_status"
                  value={hic_policy_status}
                  checked={hic_policy_status}
                  onCheked={updatehicPolicy}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} xl={8}>
            <HicPolicyTable count={count} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}
export default HicPolicyMast
