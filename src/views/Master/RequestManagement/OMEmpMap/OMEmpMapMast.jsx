import { Box, Grid } from '@mui/material'
import React, { useCallback, useMemo, memo, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { useNavigate } from 'react-router-dom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept'
import EmpNameDeptSecSelect from 'src/views/CommonSelectCode/EmpNameDeptSecSelect'
import OmTableSelect from 'src/views/CommonSelectCode/OmTableSelect'
import OMEmpMapTable from './OMEmpMapTable'

const OMEmpMapMast = () => {
  const history = useNavigate()
  //Initializing
  const [omTable, setOmtable] = useState(0)
  const [dept, setDept] = useState(0)
  const [deptsec, setDeptsec] = useState(0)
  const [empname, setEmpname] = useState(0)
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState(false)
  const [slno, setslno] = useState(0)
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const updatestatus = useCallback(e => {
    if (e.target.checked === true) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [])

  // data for insert
  const postdata = useMemo(() => {
    return {
      om_table_slno: omTable,
      om_emp_deptno: dept,
      om_emp_deptsec_no: deptsec,
      om_emp_id: empname,
      om_emp_status: status === true ? 1 : 0,
      create_user: id,
    }
  }, [omTable, dept, deptsec, empname, status, id])

  //data for edit
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const {
      om_table_slno,
      om_emp_deptno,
      om_emp_deptsec_no,
      om_emp_id,
      om_emp_status,
      om_emp_slno,
    } = data[0]
    setOmtable(om_table_slno)
    setDept(om_emp_deptno)
    setDeptsec(om_emp_deptsec_no)
    setEmpname(om_emp_id)
    setslno(om_emp_slno)
    setStatus(om_emp_status === 1 ? true : false)
  }, [])

  //data for update
  const patchdata = useMemo(() => {
    return {
      om_table_slno: omTable,
      om_emp_deptno: dept,
      om_emp_deptsec_no: deptsec,
      om_emp_id: empname,
      om_emp_status: status === true ? 1 : 0,
      edit_user: id,
      om_emp_slno: slno,
    }
  }, [omTable, dept, deptsec, empname, slno, status, id])

  //Reset Function
  const reset = () => {
    setOmtable(0)
    setDept(0)
    setDeptsec(0)
    setEmpname(0)
    setValue(0)
    setCount(0)
    setslno(0)
    setStatus(false)
  }

  /*** usecallback function for form submitting form */
  const submitOMTable = useCallback(
    e => {
      e.preventDefault()

      const InsertFun = async postdata => {
        const result = await axioslogin.post('/omempmapping', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          reset()
        } else if (success === 0) {
          infoNotify(message.sqlMessage)
        } else {
          infoNotify(message)
        }
      }

      const updateFun = async patchdata => {
        const result = await axioslogin.patch('/omempmapping', patchdata)
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
        InsertFun(postdata)
      } else {
        updateFun(patchdata)
      }
    },
    [value, postdata, patchdata, count]
  )

  //back to home
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  //referesh func
  const refreshWindow = useCallback(() => {
    reset()
  }, [])

  return (
    <CardMaster
      title="OM-Emp Mapping"
      submit={submitOMTable}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ pl: 2, pt: 2, pb: 1, pr: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={3} lg={3}>
            <Grid container spacing={1} sx={{ pb: 1 }}>
              <Grid item xl={12} lg={12}>
                <OmTableSelect value={omTable} setValue={setOmtable} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <DepartmentSelect value={dept} setValue={setDept} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <DeptSecUnderDept value={deptsec} setValue={setDeptsec} dept={dept} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <EmpNameDeptSecSelect value={empname} setValue={setEmpname} deptsec={deptsec} />
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
                  onCheked={updatestatus}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={9} lg={9}>
            <OMEmpMapTable count={count} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}

export default memo(OMEmpMapMast)
