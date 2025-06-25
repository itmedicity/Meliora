import React, { useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import ComplaintDeptMastTable from './ComplaintDeptMastTable'
import { Box } from '@mui/system'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { Grid } from '@mui/material'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import { useSelector } from 'react-redux'
import { useQueryClient } from 'react-query'
const ComplaintDeptMast = () => {
  //for routing to settings
  const history = useNavigate()
  const queryClient = useQueryClient()
  //state for edit
  const [edit, setEdit] = useState(0)
  //state for department select
  const [department, setDepartment] = useState(0)
  //intializing
  const [complaint, setComplaint] = useState({
    complaint_dept_name: '',
    complaint_dept_status: false,
    complaint_dept_slno: '',
  })
  //Destructuring
  const { complaint_dept_name, complaint_dept_status, complaint_dept_slno } = complaint
  const updateDepartment = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setComplaint({ ...complaint, [e.target.name]: value })
    },
    [complaint],
  )
  // Get login user emp_id
  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })
  //data for insert
  const postdata = useMemo(() => {
    return {
      complaint_dept_name: complaint_dept_name,
      department_slno: department,
      complaint_dept_status: complaint_dept_status === true ? 1 : 0,
      create_user: id,
    }
  }, [complaint_dept_name, complaint_dept_status, department, id])
  //data setting  for edit
  const rowSelect = useCallback((params) => {
    setEdit(1)
    const data = params.api.getSelectedRows()
    const { complaint_dept_name, status, complaint_dept_slno, department_slno } = data[0]
    const frmdata = {
      complaint_dept_name: complaint_dept_name,
      complaint_dept_status: status === 'Yes' ? true : false,
      complaint_dept_slno: complaint_dept_slno,
    }
    setComplaint(frmdata)
    setDepartment(department_slno === null ? 0 : department_slno)
  }, [])
  //data for update
  const patchdata = useMemo(() => {
    return {
      complaint_dept_name: complaint_dept_name,
      department_slno: department,
      complaint_dept_status: complaint_dept_status === true ? 1 : 0,
      edit_user: id,
      complaint_dept_slno: complaint_dept_slno,
    }
  }, [complaint_dept_name, complaint_dept_status, complaint_dept_slno, department, id])
  /*** usecallback function for form submitting */
  const submitComplaintdept = useCallback(
    (e) => {
      e.preventDefault()
      const formreset = {
        complaint_dept_name: '',
        complaint_dept_status: false,
        complaint_dept_slno: '',
      }
      /***     * insert function for use call back     */
      const InsertFun = async (postdata) => {
        const result = await axioslogin.post('/complaintdept', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          // setCount(count + 1);
          setComplaint(formreset)
          setDepartment(0)
          queryClient.invalidateQueries('getComplaintDept')
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      /***  * update function for use call back     */
      const updateFun = async (patchdata) => {
        const result = await axioslogin.patch('/complaintdept', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          // setCount(count + 1);
          setEdit(0)
          setComplaint(formreset)
          setDepartment(0)
          queryClient.invalidateQueries('getComplaintDept')
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      /*** edit=0 insert api call work else update call
       * value initialy '0' when edit button click value changes to '1'
       */
      if (edit === 0) {
        InsertFun(postdata)
      } else {
        updateFun(patchdata)
      }
    },
    [edit, postdata, patchdata, queryClient],
  )

  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  //refresh window
  const refreshWindow = useCallback(() => {
    const formreset = {
      complaint_dept_name: '',
      complaint_dept_status: false,
      complaint_dept_slno: '',
    }
    setComplaint(formreset)
    setEdit(0)
    setDepartment(0)
  }, [setComplaint])
  return (
    <CardMaster
      title="Complaint Department Master"
      close={backtoSetting}
      submit={submitComplaintdept}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={4} lg={4}>
            <Grid container spacing={1}>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder=" Complaint Department Name"
                  type="text"
                  size="sm"
                  name="complaint_dept_name"
                  value={complaint_dept_name}
                  onchange={updateDepartment}
                />
              </Grid>
              <Grid item xl={12} lg={12} sx={{ mt: 0 }}>
                <DepartmentSelect value={department} setValue={setDepartment} />
              </Grid>
              <Grid item lg={2} xl={2}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="complaint_dept_status"
                  value={complaint_dept_status}
                  checked={complaint_dept_status}
                  onCheked={updateDepartment}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} xl={8}>
            <ComplaintDeptMastTable rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}
export default ComplaintDeptMast
