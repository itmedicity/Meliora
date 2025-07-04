import React from 'react'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import CardMaster from 'src/views/Components/CardMaster'
import { Box, Grid } from '@mui/material'
import { useState, memo, useMemo, useCallback } from 'react'
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
// import { useN } from 'react-router-dom/cjs/react-router-dom.min'
import { useNavigate } from 'react-router-dom'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import DeptWiseEmpSelect from 'src/views/CommonSelectCode/DeptWiseEmpSelect'
import ComEmpMapTable from './ComEmpMapTable'

const ComEmpMapping = () => {
  const history = useNavigate()
  const [dept, setdept] = useState(0)
  const [deptsec, setDeptsec] = useState(0)
  const [employe, setEmployee] = useState([])
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [comdept, setcomdept] = useState(0)
  const [coEmpMap, setCoEmpMap] = useState({
    co_emp_section: '',
    co_emp_status: false,
    co_emp_slno: ''
  })

  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  //Destructuring
  const { co_emp_section, co_emp_status, co_emp_slno } = coEmpMap
  const updateCoEmpMap = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setCoEmpMap({ ...coEmpMap, [e.target.name]: value })
    },
    [coEmpMap]
  )

  const postData = useMemo(() => {
    return {
      map_section_name: co_emp_section,
      com_dept: comdept,
      co_emp_dept: dept !== 0 ? dept : null,
      co_emp_deptsec: deptsec !== 0 ? deptsec : null,
      co_emp_empid: employe !== [] ? employe : null,
      co_emp_status: co_emp_status === true ? 1 : 0,
      create_user: id
    }
  }, [co_emp_section, comdept, dept, deptsec, employe, co_emp_status, id])

  const patchdata = useMemo(() => {
    return {
      map_section_name: co_emp_section,
      com_dept: comdept,
      co_emp_dept: dept !== 0 ? dept : null,
      co_emp_deptsec: deptsec !== 0 ? deptsec : null,
      co_emp_empid: employe !== [] ? employe : null,
      co_emp_status: co_emp_status === true ? 1 : 0,
      edit_user: id,
      emp_map_slno: co_emp_slno
    }
  }, [co_emp_section, dept, comdept, deptsec, employe, co_emp_status, id, co_emp_slno])
  const reset = () => {
    const resetfrm = {
      co_emp_section: '',
      co_emp_status: false,
      co_emp_slno: ''
    }
    setCoEmpMap(resetfrm)
    setdept(0)
    setDeptsec(0)
    setEmployee([])
    setValue(0)
    setCount(0)
    setcomdept(0)
  }

  //data for edit
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { emp_map_slno, map_section_name, co_emp_dept, co_emp_deptsec, co_emp_empid, co_emp_status, com_dept } =
      data[0]
    const frmdata = {
      co_emp_section: map_section_name,
      co_emp_status: co_emp_status === 1 ? true : false,
      co_emp_slno: emp_map_slno
    }
    setCoEmpMap(frmdata)
    setcomdept(com_dept)
    setdept(co_emp_dept)
    setDeptsec(co_emp_deptsec)
    const empNames = JSON.parse(co_emp_empid)
    setEmployee(empNames)
  }, [])

  const Submitfunction = useCallback(
    e => {
      e.preventDefault()
      const insertfun = async postData => {
        const result = await axioslogin.post('/comempmapping/insertEmp', postData)
        const { message, success } = result.data
        if (success === 1) {
          setCount(count + 1)
          succesNotify(message)
          reset()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      const updatefun = async patchdata => {
        const result = await axioslogin.patch('/comempmapping/update', patchdata)
        const { message, success } = result.data
        if (success === 1) {
          setCount(count + 1)
          succesNotify(message)
          reset()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }

      if (value === 0) {
        insertfun(postData)
      } else if (value === 1) {
        updatefun(patchdata)
      } else {
        infoNotify('Please select all details')
      }
    },
    [postData, patchdata, count, value]
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
      title="Complaint Emp Mapping Master"
      submit={Submitfunction}
      refresh={refreshWindow}
      close={backtoSetting}
    >
      <Box sx={{ pl: 2, pt: 2, pb: 1, pr: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={3} lg={3}>
            <Grid container spacing={1} sx={{ pb: 1 }}>
              <Grid item xl={12} lg={12}>
                <DepartmentSelect value={comdept} setValue={setcomdept} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Complaint Emp Section"
                  type="text"
                  size="sm"
                  name="co_emp_section"
                  value={co_emp_section}
                  onchange={updateCoEmpMap}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <DepartmentSelect value={dept} setValue={setdept} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <DeptSecUnderDept value={deptsec} setValue={setDeptsec} dept={dept} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <DeptWiseEmpSelect personName={employe} setPersonName={setEmployee} empdeptwise={deptsec} />
              </Grid>
              <Grid item lg={2} xl={2}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="co_emp_status"
                  variant="outlined"
                  value={co_emp_status}
                  checked={co_emp_status}
                  onCheked={updateCoEmpMap}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={9} lg={9}>
            <ComEmpMapTable count={count} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}

export default memo(ComEmpMapping)
