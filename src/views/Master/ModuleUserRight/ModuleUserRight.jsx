import { Box, Grid } from '@mui/material'
import React, { useCallback, useMemo, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { useNavigate } from 'react-router-dom'
import ModuleGroupSelect from 'src/views/CommonSelectCode/ModuleGroupSelect'
import UserGroupSelect from 'src/views/CommonSelectCode/UserGroupSelect'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import ModuleGroupRightTable from './ModuleGroupRightTable'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept'
import EmpNameDeptSecSelect from 'src/views/CommonSelectCode/EmpNameDeptSecSelect'
const ModuleUserRight = () => {
  const history = useNavigate()
  //Initializing
  const [dept, setDept] = useState(0)
  const [deptsec, setDeptsec] = useState(0)
  const [empname, setEmpname] = useState(0)
  const [modulegroup, setmodulegroup] = useState(0)
  const [usergroup, setUsergroup] = useState(0)
  const [ModRightStatus, setModRightStatus] = useState({
    status: false,
    mod_grp_user_slno: 0
  })
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)

  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  //Destructuring
  const { status, mod_grp_user_slno } = ModRightStatus
  const updateModule = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setModRightStatus({ ...ModRightStatus, [e.target.name]: value })
    },
    [ModRightStatus]
  )
  // data for insert
  const postdata = useMemo(() => {
    return {
      emp_slno: empname,
      mod_grp_slno: modulegroup,
      user_group_slno: usergroup,
      mod_grp_user_status: status === true ? 1 : 0,
      dept_slno: dept,
      deptsec_slno: deptsec,
      create_user: id
    }
  }, [empname, modulegroup, usergroup, status, id, deptsec, dept])
  //data set for edit
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { mod_grp_user_slno, mod_grp_user_status, emp_slno, mod_grp_slno, user_group_slno, dept_slno, deptsec_slno } =
      data[0]
    const frmdata = {
      status: mod_grp_user_status === 'Yes' ? true : false,
      mod_grp_user_slno: mod_grp_user_slno
    }
    setDept(dept_slno)
    setDeptsec(deptsec_slno)
    setModRightStatus(frmdata)
    setEmpname(emp_slno)
    setmodulegroup(mod_grp_slno)
    setUsergroup(user_group_slno)
  }, [])
  // data for updaate
  const patchdata = useMemo(() => {
    return {
      emp_slno: empname,
      mod_grp_slno: modulegroup,
      user_group_slno: usergroup,
      mod_grp_user_status: status === true ? 1 : 0,
      dept_slno: dept,
      deptsec_slno: deptsec,
      mod_grp_user_slno: mod_grp_user_slno
    }
  }, [empname, modulegroup, usergroup, status, mod_grp_user_slno, deptsec, dept])
  //Reset Function
  const reset = () => {
    setEmpname(0)
    setmodulegroup(0)
    setUsergroup(0)
    setValue(0)
    setDept(0)
    setDeptsec(0)
  }
  /*** usecallback function for form submitting form */
  const submitModuleUserGroupRight = useCallback(
    e => {
      e.preventDefault()
      /*** Reset fromdata */
      const resetfrm = {
        status: false,
        mod_grp_user_slno: 0
      }
      /*** Insert Function */
      const InsertFun = async postdata => {
        const result = await axioslogin.post('/modulegroupright', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          reset()
          setModRightStatus(resetfrm)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      const updateFun = async patchdata => {
        const result = await axioslogin.patch('/modulegroupright', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          reset()
          setModRightStatus(resetfrm)
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
        InsertFun(postdata)
      } else {
        updateFun(patchdata)
      }
    },
    [postdata, count, patchdata, value]
  )
  //back to home
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  //referesh func
  const refreshWindow = useCallback(() => {
    const resetfrm = {
      status: false,
      mod_grp_user_slno: 0
    }
    setModRightStatus(resetfrm)
    reset()
  }, [setModRightStatus])
  return (
    <CardMaster
      title="Module User Right Master"
      submit={submitModuleUserGroupRight}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ pl: 2, pt: 2, pb: 1, pr: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={3} lg={3}>
            <Grid container spacing={1} sx={{ pb: 1 }}>
              <Grid item xl={12} lg={12}>
                <DepartmentSelect value={dept} setValue={setDept} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <DeptSecUnderDept value={deptsec} setValue={setDeptsec} dept={dept} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <EmpNameDeptSecSelect value={empname} setValue={setEmpname} deptsec={deptsec} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <ModuleGroupSelect value={modulegroup} setValue={setmodulegroup} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <UserGroupSelect value={usergroup} setValue={setUsergroup} />
              </Grid>
              <Grid item lg={2} xl={2}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="status"
                  variant="outlined"
                  value={status}
                  checked={status}
                  onCheked={updateModule}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={9} lg={9}>
            <ModuleGroupRightTable count={count} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}
export default ModuleUserRight
