import { Box, Grid } from '@mui/material'
import React, { useCallback, useMemo, memo, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { useNavigate } from 'react-router-dom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept'
import EmpNameDeptSecSelect from 'src/views/CommonSelectCode/EmpNameDeptSecSelect'
import OmTableMastTable from './OmTableMastTable'

const OMTableMast = () => {
  const history = useNavigate()
  //Initializing
  const [dept, setDept] = useState(0)
  const [deptsec, setDeptsec] = useState(0)
  const [empname, setEmpname] = useState(0)
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [omTable, setOmTable] = useState({
    table_name: '',
    table_status: false,
    tableno: '',
  })

  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  //Destructuring
  const { table_name, table_status, tableno } = omTable
  const updateOmTable = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setOmTable({ ...omTable, [e.target.name]: value })
    },
    [omTable]
  )
  // data for insert
  const postdata = useMemo(() => {
    return {
      omtable_name: table_name,
      om_dept_slno: dept,
      om_dept_sec_slno: deptsec,
      omtable_emp_id: empname,
      omtable_status: table_status === true ? 1 : 0,
      create_user: id,
    }
  }, [table_name, dept, deptsec, empname, table_status, id])

  //data for edit
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const {
      omtable_name,
      omtable_status,
      om_dept_slno,
      om_dept_sec_slno,
      omtable_no,
      omtable_emp_id,
    } = data[0]
    const frmdata = {
      table_name: omtable_name,
      table_status: omtable_status === 1 ? true : false,
      tableno: omtable_no,
    }
    setOmTable(frmdata)
    setDept(om_dept_slno)
    setDeptsec(om_dept_sec_slno)
    setEmpname(omtable_emp_id)
  }, [])

  //data for update
  const patchdata = useMemo(() => {
    return {
      omtable_name: table_name,
      om_dept_slno: dept,
      om_dept_sec_slno: deptsec,
      omtable_emp_id: empname,
      omtable_status: table_status === true ? 1 : 0,
      edit_user: id,
      omtable_no: tableno,
    }
  }, [table_name, dept, deptsec, empname, tableno, table_status, id])

  //Reset Function
  const reset = () => {
    const resetfrm = {
      table_name: '',
      table_status: false,
      tableno: '',
    }
    setOmTable(resetfrm)
    setDept(0)
    setDeptsec(0)
    setEmpname(0)
    setValue(0)
    setCount(0)
  }

  /*** usecallback function for form submitting form */
  const submitOMTable = useCallback(
    e => {
      e.preventDefault()

      const InsertFun = async postdata => {
        const result = await axioslogin.post('/omtableMast', postdata)
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
        const result = await axioslogin.patch('/omtableMast', patchdata)
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
      title="OM Table Master"
      submit={submitOMTable}
      close={backtoSetting}
      refresh={refreshWindow}
    >
      <Box sx={{ pl: 2, pt: 2, pb: 1, pr: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={3} lg={3}>
            <Grid container spacing={1} sx={{ pb: 1 }}>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Table Name"
                  type="text"
                  size="sm"
                  name="table_name"
                  value={table_name}
                  onchange={updateOmTable}
                />
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
                  name="table_status"
                  variant="outlined"
                  value={table_status}
                  checked={table_status}
                  onCheked={updateOmTable}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={9} lg={9}>
            <OmTableMastTable count={count} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}

export default memo(OMTableMast)
