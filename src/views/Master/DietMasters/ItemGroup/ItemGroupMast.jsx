import { Box, Grid } from '@mui/material'
import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import ItemGroupTable from './ItemGroupTable'
import { useSelector } from 'react-redux'
const ItemGroupMast = () => {
  const history = useNavigate()
  //state for table render
  const [count, setCount] = useState(0)
  //state for edit
  const [value, setValue] = useState(0)
  //intilizing
  const [itemgroup, setItemgrp] = useState({
    group_name: '',
    status: false,
    grp_slno: ''
  })
  //Destructuring
  const { group_name, status, grp_slno } = itemgroup
  const updateitemgroup = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setItemgrp({ ...itemgroup, [e.target.name]: value })
    },
    [itemgroup]
  )
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  //data for insert
  const postdata = useMemo(() => {
    return {
      group_name: group_name,
      status: status === true ? 1 : 0,
      em_id: id
    }
  }, [group_name, status, id])
  //edit data setting on textfields
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { group_name, status, grp_slno } = data[0]
    const frmdata = {
      group_name: group_name,
      status: status === 1 ? true : false,
      grp_slno: grp_slno
    }
    setItemgrp(frmdata)
  }, [])
  //data for update
  const patchdata = useMemo(() => {
    return {
      group_name: group_name,
      status: status === true ? 1 : 0,
      em_id: id,
      grp_slno: grp_slno
    }
  }, [group_name, status, grp_slno, id])
  /*** usecallback function for form submitting */
  const submititemgrp = useCallback(
    e => {
      e.preventDefault()
      const formreset = {
        group_name: '',
        status: false,
        grp_slno: ''
      }
      /***    * insert function for use call back     */
      const Insertitemgroup = async postdata => {
        const result = await axioslogin.post('/itemgrp/insert', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          setItemgrp(formreset)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      /***  * update function for use call back     */
      const updateitemgrp = async patchdata => {
        const result = await axioslogin.patch('/itemgrp/itemgrp/update', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          setValue(0)
          setItemgrp(formreset)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      /*** value=0 insert api call work else update call
       * value initialy '0' when edit button click value changes to '1'
       */
      if (value === 0) {
        Insertitemgroup(postdata)
      } else {
        updateitemgrp(patchdata)
      }
    },
    [value, postdata, patchdata, count]
  )
  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  //referesh func
  const refreshWindow = useCallback(() => {
    const formreset = {
      group_name: '',
      status: false,
      grp_slno: '',
      em_id: ''
    }
    setItemgrp(formreset)
    setValue(0)
  }, [setItemgrp])

  return (
    <CardMaster title="Item Group Master" submit={submititemgrp} close={backtoSetting} refresh={refreshWindow}>
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={4} lg={4}>
            <Grid container spacing={1}>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Item group name"
                  type="text"
                  size="sm"
                  name="group_name"
                  value={group_name}
                  onchange={updateitemgroup}
                />
              </Grid>

              <Grid item lg={2} xl={2}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="status"
                  value={status}
                  checked={status}
                  onCheked={updateitemgroup}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} xl={8}>
            <ItemGroupTable count={count} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}

export default ItemGroupMast
