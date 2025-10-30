import React, { useCallback, useState, useMemo, useEffect, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Paper } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import BranchSelectHr from 'src/views/CommonSelectCode/BranchSelectHr'
import DesignationSelect from 'src/views/CommonSelectCode/DesignationSelect'
import SalutationSelect from 'src/views/CommonSelectCode/SalutationSelect'
import { getempid, getEmpSlno } from 'src/views/Constant/Constant'
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept'
import FormControl from '@mui/material/FormControl'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import UserCreationTable from './UserCreationTable'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import CustomeToolTip from '../../Components/CustomeToolTip'
import CardMaster from 'src/views/Components/CardMaster'
import ModuleGroupSelect from 'src/views/CommonSelectCode/ModuleGroupSelect'
import UserGroupSelect from 'src/views/CommonSelectCode/UserGroupSelect'
import { Option, Select } from '@mui/joy'
// import MelioraDepartmentSelect from 'src/views/CommonSelectCode/MelioraDepartmentSelect'
// import MelioraDepSec from 'src/views/CommonSelectCode/MelioraDepSec'
import { useQueryClient } from '@tanstack/react-query'
// import SelectComTypeUser from 'src/views/CommonSelectCode/SelectComTypeUser'
const UserCreation = () => {
  //*** Initializing */

  const history = useNavigate()
  const [em_id, setemId] = useState(0)
  const [em_no, setemno] = useState('')
  const [salut, setSalut] = useState(0)
  const [dept, setDept] = useState(0)
  const [deptsec, setDeptsec] = useState(0)
  const [branch, setBranch] = useState(0)
  const [gender, setGender] = useState(0)
  const [designation, setDesignation] = useState(0)
  const [dob, setdob] = useState('')
  const [doj, setdoj] = useState('')
  //state for table render
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(0)
  const [modulegroup, setmodulegroup] = useState(0)
  const [usergroup, setUsergroup] = useState(0)
  const [mastdetl, setDetlSlno] = useState(0)
  const [supervis, setSupervise] = useState(false)
  // const [comTpeMap, setComTypeMap] = useState([])
  const [department, setDepartment] = useState(0)
  const [meldeptsec, setmelDeptsec] = useState(0)
  const queryClient = useQueryClient()

  const [userdata, setUserdata] = useState({
    em_name: '',
    em_mobile: '',
    em_email: '',
    em_status: false,
    mod_grp_user_slno: ''
  })

  //Destructuring
  const { em_name, em_mobile, em_email, em_status, mod_grp_user_slno } = userdata
  const updateUserCreation = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setUserdata({ ...userdata, [e.target.name]: value })
    },
    [userdata]
  )

  const UpdateSupervis = e => {
    if (e.target.checked === true) {
      setSupervise(true)
    } else {
      setSupervise(false)
    }
  }

  useEffect(() => {
    getempid().then(val => {
      const empid = val
      setemId(empid)
      setemno(empid.toString())
    })
    getEmpSlno().then(value => {
      const empdetlSlno = value
      setDetlSlno(empdetlSlno)
    })
  }, [count])

  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const getdob = e => {
    setdob(e.target.value)
  }
  const getdoj = e => {
    setdoj(e.target.value)
  }
  //data set for edit
  const rowSelect = useCallback(params => {
    setValue(1)
    setemId(0)
    const data = params.api.getSelectedRows()

    const {
      em_id,
      em_no,
      em_name,
      em_salutation,
      em_gender,
      em_dob,
      em_doj,
      em_mobile,
      em_email,
      em_branch,
      em_department,
      em_dept_section,
      em_designation,
      em_status,
      mod_grp_slno,
      user_group_slno,
      mod_grp_user_slno,
      empdtl_slno,
      supervisor,
      meliora_depId,
      meliora_depSec
    } = data[0]
    const frmdata = {
      em_name: em_name,
      em_mobile: em_mobile,
      em_email: em_email,
      mod_grp_user_slno: mod_grp_user_slno,
      em_status: em_status === 1 ? true : false
    }
    setemno(em_no)
    setmodulegroup(mod_grp_slno)
    setUsergroup(user_group_slno)
    setUserdata(frmdata)
    setemId(em_id)
    setDetlSlno(empdtl_slno)
    setSalut(em_salutation)
    setGender(em_gender)
    setDept(em_department)
    setDeptsec(em_dept_section)
    setBranch(em_branch)
    setDesignation(em_designation)
    setdob(format(new Date(em_dob), 'yyyy-MM-dd'))
    setdoj(format(new Date(em_doj), 'yyyy-MM-dd'))
    setSupervise(supervisor === 1 ? true : false)
    setDepartment(meliora_depId),
      setmelDeptsec(meliora_depSec)
    // const comptypemap = comp_type_map !== [] ? JSON.parse(comp_type_map) : []
    // setComTypeMap(comptypemap)
  }, [])
  //Insert data
  const postdata = useMemo(() => {
    return {
      em_id: em_id,
      em_no: em_no,
      emp_no: em_no,
      em_salutation: salut,
      em_name: em_name,
      em_gender: gender,
      em_dob: dob,
      em_doj: doj,
      em_mobile: em_mobile,
      em_email: em_email,
      em_branch: branch,
      em_department: dept,
      em_dept_section: deptsec,
      em_designation: designation,
      em_status: em_status === true ? 1 : 0,
      emp_username: em_no,
      emp_password: em_no,
      emp_email: em_email,
      mod_grp_slno: modulegroup,
      user_group_slno: usergroup,
      mod_grp_user_status: em_status === true ? 1 : 0,
      empdtl_slno: mastdetl,
      dept_slno: dept,
      deptsec_slno: deptsec,
      emp_status: em_status === true ? 1 : 0,
      create_user: id,
      emp_slno: em_id,
      supervisor: supervis === true ? 1 : 0,
      department: department,
      meldeptsec: meldeptsec
      // comp_type_map: comTpeMap !== [] ? comTpeMap : null
    }
  }, [
    em_id,
    em_no,
    mastdetl,
    salut,
    supervis,
    em_name,
    usergroup,
    modulegroup,
    dob,
    doj,
    id,
    gender,
    em_mobile,
    em_email,
    branch,
    dept,
    deptsec,
    designation,
    em_status,
    meldeptsec,
    department
  ])

  //Update data
  const patchdata = useMemo(() => {
    return {
      em_id: em_id,
      em_no: em_no,
      emp_slno: em_id,
      emp_no: em_no,
      em_salutation: salut,
      em_name: em_name,
      em_gender: gender,
      em_dob: dob,
      em_doj: doj,
      em_mobile: em_mobile,
      em_email: em_email,
      em_branch: branch,
      em_department: dept,
      em_dept_section: deptsec,
      em_designation: designation,
      em_status: em_status === true ? 1 : 0,
      emp_username: em_no,
      emp_password: em_no.toString(),
      emp_email: em_email,
      emp_status: em_status === true ? 1 : 0,
      mod_grp_slno: modulegroup,
      user_group_slno: usergroup,
      mod_grp_user_status: em_status === true ? 1 : 0,
      empdtl_slno: mastdetl,
      dept_slno: dept,
      deptsec_slno: deptsec,
      mod_grp_user_slno: mod_grp_user_slno,
      edit_user: id,
      supervisor: supervis === true ? 1 : 0,
      meldeptsec: meldeptsec,
      department: department,
      // comp_type_map: comTpeMap !== [] ? comTpeMap : null
    }
  }, [
    em_id,
    em_no,
    mastdetl,
    salut,
    em_name,
    supervis,
    mod_grp_user_slno,
    usergroup,
    modulegroup,
    dob,
    doj,
    id,
    gender,
    em_mobile,
    em_email,
    branch,
    dept,
    deptsec,
    designation,
    em_status,
    meldeptsec,
    department
  ])

  const reset = () => {
    const formreset = {
      em_name: '',
      em_mobile: '',
      em_email: '',
      em_status: false,
      mod_grp_user_slno: ''
    }
    setUserdata(formreset)
    setemId(0)
    setemno('')
    setSalut(0)
    setDept(0)
    setDeptsec(0)
    setBranch(0)
    setGender(0)
    setDesignation(0)
    setdob('')
    setdoj('')
    setCount(0)
    setValue(0)
    setmodulegroup(0)
    setUsergroup(0)
    setDetlSlno(0)
    setSupervise(false)
    setDepartment(0),
      setmelDeptsec(0)
    // setComTypeMap([])
  }

  const submitUserCreation = useCallback(
    e => {
      e.preventDefault()

      /***    * insert function for use call back   */
      const InsertFun = async postdata => {
        const result = await axioslogin.post('/employee/empInsert', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          // setCount(count + 1)
          queryClient.invalidateQueries('getallEmpdetails')
          reset()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      const UpdateFun = async patchdata => {
        const result = await axioslogin.patch('/employee/update', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          // setCount(count + 1)
          queryClient.invalidateQueries('getallEmpdetails')
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
        UpdateFun(patchdata)
      }
    },
    [postdata, patchdata, value, count]
  )

  //referesh func
  const refreshWindow = useCallback(() => {
    reset()
  }, [])

  //back to home
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])

  return (
    <CardMaster title="User Creation" submit={submitUserCreation} close={backtoSetting} refresh={refreshWindow}>
      <Box sx={{ width: '100%', pl: 1, pt: 1, pr: 1, pb: 1 }}>
        <Paper
          square
          elevation={3}
          sx={{
            pl: 1,
            pt: 1,
            pr: 1,
            pb: 1
          }}
        >
          <Box
            sx={{
              width: '100%',
              pl: 1,
              pt: 0.5,
              pr: 1,
              pb: 0.5,
              // background: "blue",
              display: 'flex',
              flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' }
            }}
          >
            <CustomeToolTip title="em id" placement="top-start">
              <Box sx={{ width: '10%', pr: 1 }}>
                <TextFieldCustom
                  placeholder="Emp_id"
                  type="text"
                  size="sm"
                  disabled={true}
                  name="em_id"
                  value={em_id}
                  onchange={updateUserCreation}
                />
              </Box>
            </CustomeToolTip>
            <CustomeToolTip title="Salutation" placement="top-start">
              <Box sx={{ width: '15%', pr: 1 }}>
                <SalutationSelect value={salut} setValue={setSalut} />
              </Box>
            </CustomeToolTip>
            <CustomeToolTip title="Name" placement="top-start">
              <Box sx={{ width: '30%', pr: 1 }}>
                <TextFieldCustom
                  placeholder="Name"
                  type="text"
                  size="sm"
                  name="em_name"
                  value={em_name}
                  onchange={updateUserCreation}
                />
              </Box>
            </CustomeToolTip>
            <CustomeToolTip title="Emp No" placement="top-start">
              <Box sx={{ width: '10%', pr: 1 }}>
                <TextFieldCustom
                  placeholder="Employee No"
                  type="text"
                  size="sm"
                  disabled={true}
                  name="em_no"
                  value={em_no}
                />
              </Box>
            </CustomeToolTip>
            <CustomeToolTip title="Gender" placement="top-start">
              <Box sx={{ width: '15%', pr: 1, }}>
                <FormControl fullWidth size="small">
                  <Select
                    id="demo-simple-select"
                    value={gender}
                    onChange={(e, newValue) => setGender(newValue)}
                    size="sm"
                    variant="outlined"
                    sx={{ m: 0, }}
                  >
                    <Option value={0} disabled>
                      Select Gender
                    </Option>
                    <Option value={1}>Male</Option>
                    <Option value={2}>Female</Option>
                  </Select>
                </FormControl>
              </Box>
            </CustomeToolTip>
            <CustomeToolTip title="DOB" placement="top-start">
              <Box sx={{ width: '10%', pr: 1 }}>
                <TextFieldCustom placeholder="DOB" type="date" size="sm" name="dob" value={dob} onchange={getdob} />
              </Box>
            </CustomeToolTip>
            <CustomeToolTip title="DOJ" placement="top-start">
              <Box sx={{ width: '10%', pr: 1 }}>
                <TextFieldCustom placeholder="DOJ" type="date" size="sm" name="doj" value={doj} onchange={getdoj} />
              </Box>
            </CustomeToolTip>
          </Box>
          <Box
            sx={{
              width: '100%',
              pl: 1,
              pt: 0.5,
              pr: 0.5,
              pb: 0.5,
              display: 'flex',
              flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' }
            }}
          >
            <CustomeToolTip title="Mobile No" placement="top-start">
              <Box sx={{ width: '25%', pr: 1, mt: 1 }}>
                <TextFieldCustom
                  placeholder="Mobile No"
                  type="text"
                  size="sm"
                  name="em_mobile"
                  value={em_mobile}
                  onchange={updateUserCreation}
                />
              </Box>
            </CustomeToolTip>
            <CustomeToolTip title="Email Id" placement="top-start">
              <Box sx={{ width: '30%', pr: 1, mt: 1 }}>
                <TextFieldCustom
                  placeholder="Email Id"
                  type="text"
                  size="sm"
                  name="em_email"
                  value={em_email}
                  onchange={updateUserCreation}
                />
              </Box>
            </CustomeToolTip>
            <CustomeToolTip title="Branch" placement="top-start">
              <Box sx={{ width: '20%', pr: 1 }}>
                <BranchSelectHr value={branch} setValue={setBranch} />
              </Box>
            </CustomeToolTip>
            <CustomeToolTip title="Department " placement="top-start">
              <Box sx={{ width: '20%', pr: 1, mt: 1 }}>
                <DepartmentSelect value={dept} setValue={setDept} />
              </Box>
            </CustomeToolTip>
            <CustomeToolTip title="Department Section " placement="top-start">
              <Box sx={{ width: '20%', pr: 1, mt: 1 }}>
                <DeptSecUnderDept value={deptsec} setValue={setDeptsec} dept={dept} />
              </Box>
            </CustomeToolTip>
            <CustomeToolTip title="Designation" placement="top-start">
              <Box sx={{ width: '20%', pr: 1 }}>
                <DesignationSelect value={designation} setValue={setDesignation} />
              </Box>
            </CustomeToolTip>
          </Box>
          <Box
            sx={{
              width: '100%',
              pl: 1,
              pt: 0.5,
              pr: 0.5,
              pb: 0.5,
              display: 'flex',
              flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' }
            }}
          >
            <CustomeToolTip title="Designation" placement="top-start">
              <Box sx={{ width: '20%', pr: 1, pt: 1 }}>
                <ModuleGroupSelect value={modulegroup} setValue={setmodulegroup} />
              </Box>
            </CustomeToolTip>
            <CustomeToolTip title="Designation" placement="top-start">
              <Box sx={{ width: '20%', pr: 1, pt: 1 }}>
                <UserGroupSelect value={usergroup} setValue={setUsergroup} />
              </Box>
            </CustomeToolTip>
            <Box sx={{ width: '10%', pr: 1, mt: 2 }}>
              <CusCheckBox
                label="Status"
                color="primary"
                size="md"
                name="em_status"
                value={em_status}
                checked={em_status}
                onCheked={updateUserCreation}
              />
            </Box>
            {/* <Box sx={{ width: '15%', pr: 1, pt: 1 }}>
              <MelioraDepartmentSelect value={department} setValue={setDepartment} />
            </Box>
            <Box sx={{ width: '15%', pr: 1, pt: 1 }}>
              <MelioraDepSec value={meldeptsec} setValue={setmelDeptsec} dept={department} />
            </Box> */}
            <Box sx={{ width: '25%', pr: 1, mt: 2 }}>
              <CusCheckBox
                label="Supervisor/Incharge/HOD/Technical Head"
                color="primary"
                size="md"
                name="supervis"
                value={supervis}
                checked={supervis}
                onCheked={UpdateSupervis}
              />
            </Box>

            {/* {supervis === true ? <Box sx={{ width: "20%", pr: 1, pt: 0.5 }}>
                            <SelectComTypeUser value={comTpeMap} setValue={setComTypeMap} />
                        </Box> : null} */}
          </Box>
        </Paper>
      </Box>
      <Box sx={{ width: '100%', pl: 1, pt: 1, pr: 1, pb: 1 }}>
        <Paper
          square
          elevation={3}
          sx={{
            pl: 1,
            pt: 1,
            pr: 1,
            pb: 1
          }}
        >
          <UserCreationTable count={count} rowSelect={rowSelect} />
        </Paper>
      </Box>
    </CardMaster>
  )
}

export default memo(UserCreation)
