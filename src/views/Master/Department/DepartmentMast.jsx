import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import DepartmentMastTable from './DepartmentMastTable'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import { getDepartmentId } from 'src/views/Constant/Constant'
import FormControl from '@mui/material/FormControl'
import { Box, Option, Select } from '@mui/joy'
import { Grid } from '@mui/material'

const DepartmentMast = () => {
  //for routing
  const history = useNavigate()
  //state for table render
  const [count, setCount] = useState(0)
  //state for edit
  const [value, setValue] = useState(0)
  const [type, setType] = useState(0)
  const [departmentId, setDepartmentId] = useState(0)
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  //intilizing
  const [department, setDepartment] = useState({
    dept_name: '',
    dept_alias: '',
    dept_status: false,
    dept_id: ''
  })
  //Destructuring
  const { dept_name, dept_alias, dept_status, dept_id } = department
  const updateDepartment = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setDepartment({ ...department, [e.target.name]: value })
    },
    [department]
  )
  useEffect(() => {
    getDepartmentId().then(val => {
      setDepartmentId(val)
    })
  }, [count])
  //data for insert
  const postdata = useMemo(() => {
    return {
      dept_id: departmentId,
      dept_name: dept_name,
      dept_alias: dept_alias,
      dept_status: dept_status === true ? 1 : 0,
      dept_type: type,
      create_user: id
    }
  }, [dept_name, dept_alias, dept_status, id, type, departmentId])
  //edit data setting on textfields
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { dept_name, dept_alias, status, dept_type, dept_id } = data[0]
    const frmdata = {
      dept_name: dept_name,
      dept_alias: dept_alias,
      type: dept_type,
      dept_status: status === 'Yes' ? true : false,
      dept_id: dept_id
    }
    setType(dept_type)
    setDepartment(frmdata)
  }, [])
  //data for update
  const patchdata = useMemo(() => {
    return {
      dept_name: dept_name,
      dept_alias: dept_alias,
      dept_status: dept_status === true ? 1 : 0,
      edit_user: id,
      dept_type: type,
      dept_id: dept_id
    }
  }, [dept_name, dept_alias, dept_status, type, dept_id, id])
  /*** usecallback function for form submitting */
  const submitDepartment = useCallback(
    e => {
      e.preventDefault()
      const formreset = {
        dept_name: '',
        dept_alias: '',
        dept_status: false,
        dept_id: ''
      }
      /***    * insert function for use call back     */
      const InsertFun = async postdata => {
        const result = await axioslogin.post('/deptmaster', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          setType(0)
          setDepartment(formreset)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      /***  * update function for use call back     */
      const updateFun = async patchdata => {
        const result = await axioslogin.patch('/deptmaster', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          setValue(0)
          setType(0)
          setDepartment(formreset)
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
    [value, postdata, patchdata, count]
  )
  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  //referesh func
  const refreshWindow = useCallback(() => {
    const formreset = {
      dept_name: '',
      dept_alias: '',
      dept_status: false,
      dept_id: ''
    }
    setDepartment(formreset)
    setValue(0)
    setType(0)
  }, [setDepartment])
  return (
    <CardMaster title="Department Master" submit={submitDepartment} close={backtoSetting} refresh={refreshWindow}>
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={4} lg={4}>
            <Grid container spacing={1}>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Department Name"
                  type="text"
                  size="sm"
                  name="dept_name"
                  value={dept_name}
                  onchange={updateDepartment}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Department Alias"
                  type="text"
                  size="sm"
                  name="dept_alias"
                  value={dept_alias}
                  onchange={updateDepartment}
                />
              </Grid>

              <Grid item xl={12} lg={12}>
                <FormControl fullWidth size="small">
                  <Select
                    id="demo-simple-select"
                    value={type}
                    onChange={(e, newValue) => setType(newValue)}
                    size="small"
                    variant="outlined"
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
                  >
                    <Option value={0} disabled>
                      {' '}
                      Select Type
                    </Option>
                    <Option value={1}> Clinical</Option>
                    <Option value={2}> Non Clinical</Option>
                    <Option value={3}> Academic</Option>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item lg={2} xl={2}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="dept_status"
                  value={dept_status}
                  checked={dept_status}
                  onCheked={updateDepartment}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} xl={8}>
            <DepartmentMastTable count={count} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}
export default DepartmentMast
