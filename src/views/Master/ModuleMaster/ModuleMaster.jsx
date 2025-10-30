import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import ModuleTable from './ModuleTable'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useSelector } from 'react-redux'
const ModuleMaster = () => {
  const [value, setvalue] = useState(0)
  const [count, setCount] = useState(0)
  const history = useNavigate()
  //Initializing
  const [module, setModule] = useState({
    module_name: '',
    module_status: false,
    module_slno: ''
  })
  //Destructuring
  const { module_name, module_status, module_slno } = module
  const updateModule = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setModule({ ...module, [e.target.name]: value })
    },
    [module]
  )
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  // data for insert
  const postdata = useMemo(() => {
    return {
      module_name: module_name,
      module_status: module_status === true ? 1 : 0,
      create_user: id
    }
  }, [module_name, module_status, id])

  //data for edit
  const rowSelect = useCallback(params => {
    setvalue(1)
    const data = params.api.getSelectedRows()
    const { module_name, module_slno, status } = data[0]
    const frmdata = {
      module_name: module_name,
      module_status: status === 'Yes' ? true : false,
      module_slno: module_slno
    }
    setModule(frmdata)
  }, [])
  //data for update
  const patchdata = useMemo(() => {
    return {
      module_name: module_name,
      module_status: module_status === true ? 1 : 0,
      module_slno: module_slno,
      edit_user: id
    }
  }, [module_name, module_status, module_slno, id])
  /*** usecallback function for form submitting form */
  const submitModule = useCallback(
    e => {
      e.preventDefault()
      //reset from
      const formreset = {
        module_name: '',
        module_status: false,
        module_slno: ''
      }
      const InsertFun = async postdata => {
        const result = await axioslogin.post('/modulemaster', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          setModule(formreset)
          setvalue(0)
        } else if (success === 0) {
          infoNotify(message.sqlMessage)
        } else {
          infoNotify(message)
        }
      }
      const updateFun = async patchdata => {
        const result = await axioslogin.patch('/modulemaster', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          setModule(formreset)
          setvalue(0)
        } else if (success === 0) {
          infoNotify(message.sqlMessage)
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

  //back to home
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  //referesh func
  const refreshWindow = useCallback(() => {
    const formreset = {
      module_name: '',
      module_status: false,
      module_slno: ''
    }
    setModule(formreset)
    setvalue(0)
  }, [setModule])

  return (
    <CardMaster title="Module Master" submit={submitModule} close={backtoSetting} refresh={refreshWindow}>
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={4} lg={4}>
            <Grid container spacing={1}>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Module Name"
                  type="text"
                  size="sm"
                  name="module_name"
                  value={module_name}
                  onchange={updateModule}
                />
              </Grid>
              <Grid item lg={2} xl={2}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="module_status"
                  variant="outlined"
                  value={module_status}
                  checked={module_status}
                  onCheked={updateModule}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} xl={8}>
            <ModuleTable count={count} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}

export default ModuleMaster
