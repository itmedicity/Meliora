import { Grid, Box } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import React, { useMemo, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import DietMasterTable from './DietMasterTable'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
const DietMaster = () => {
  //for routing...
  const history = useNavigate()
  //state changes according to the data insertion
  const [count, setCount] = useState(0)
  //state checks whether the data is for insertion or for updation
  const [value, setValue] = useState(0)
  //Intializing
  const [diet, setDiet] = useState({
    diet_slno: '',
    diet_name: '',
    diet_status: false,
    order_req: false,
    diet_type_choose: false
  })
  //object Destructuring
  const { diet_name, diet_status, order_req, diet_type_choose, diet_slno } = diet
  const updateDiet = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setDiet({ ...diet, [e.target.name]: value })
    },
    [diet]
  )
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  //Assigning data to postData for insertion
  const postData = useMemo(() => {
    return {
      diet_name: diet_name,
      diet_status: diet_status === true ? 1 : 0,
      order_req: order_req === true ? 1 : 0,
      diet_type_choose: diet_type_choose === true ? 1 : 0,
      em_id: id
    }
  }, [diet_name, diet_status, order_req, diet_type_choose, id])
  //Data set to textfields for editing
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { diet_slno, diet_name, diet_status, order_req, diet_type_choose } = data[0]
    const frmdata = {
      diet_slno: diet_slno,
      diet_name: diet_name,
      diet_status: diet_status === 1 ? true : false,
      order_req: order_req === 1 ? true : false,
      diet_type_choose: diet_type_choose === 1 ? true : false
    }
    setDiet(frmdata)
  }, [])
  const patchdata = useMemo(() => {
    return {
      diet_name: diet_name,
      diet_status: diet_status === true ? 1 : 0,
      order_req: order_req === true ? 1 : 0,
      diet_type_choose: diet_type_choose === true ? 1 : 0,
      em_id: id,
      diet_slno: diet_slno
    }
  }, [diet_name, diet_status, order_req, diet_type_choose, diet_slno, id])
  const submitDiet = useCallback(
    e => {
      e.preventDefault()
      const formReset = {
        diet_name: '',
        diet_status: false,
        order_req: false,
        diet_type_choose: false
      }
      const InsertData = async postData => {
        const result = await axioslogin.post(`/diet`, postData)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          setDiet(formReset)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      const updateData = async patchdata => {
        const result = await axioslogin.patch(`/diet`, patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          setValue(0)
          setDiet(formReset)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      if (value === 0) {
        InsertData(postData)
      } else {
        updateData(patchdata)
      }
    },
    [value, postData, count, patchdata]
  )

  //Close function
  const backToSetting = useCallback(() => {
    history(`/Home/settings`)
  }, [history])
  //Refresh function
  const refreshWindow = useCallback(() => {
    const formReset = {
      diet_name: '',
      diet_status: false,
      order_req: false,
      diet_type_choose: false
    }
    setDiet(formReset)
  }, [setDiet])
  return (
    <CardMaster title="Diet Master" submit={submitDiet} refresh={refreshWindow} close={backToSetting}>
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={4} lg={4}>
            <Grid container spacing={1}>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Diet Name"
                  type="text"
                  size="sm"
                  name="diet_name"
                  value={diet_name}
                  onchange={updateDiet}
                />
              </Grid>
              <Grid item lg={12} xl={12}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="diet_status"
                  value={diet_status}
                  checked={diet_status}
                  onCheked={updateDiet}
                />
              </Grid>
              <Grid item lg={12} xl={12}>
                <CusCheckBox
                  label="Order Request"
                  color="primary"
                  size="md"
                  name="order_req"
                  value={order_req}
                  checked={order_req}
                  onCheked={updateDiet}
                />
              </Grid>
              <Grid item lg={12} xl={12}>
                <CusCheckBox
                  label="Diet type choose"
                  color="primary"
                  size="md"
                  name="diet_type_choose"
                  value={diet_type_choose}
                  checked={diet_type_choose}
                  onCheked={updateDiet}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} xl={8}>
            <DietMasterTable count={count} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}
export default DietMaster
