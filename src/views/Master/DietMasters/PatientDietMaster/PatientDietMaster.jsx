import { Box, Grid } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useSelector } from 'react-redux'
import PatientDietMasterTable from './PatientDietMasterTable'
// import SelectDietSpeciality from '../CommonData/SelectDietSpeciality'
import { useAllPatientDietMaster } from 'src/views/Diet/CommonData/UseQuery'
import SelectDietSpeciality from 'src/views/CommonSelectCode/SelectDietSpeciality'

// form reset
const formReset = {
  diet_id: '',
  diet_name: '',
  speciality_id: '',
  calories_per_day: '',
  protein_per_day: '',
  description: '',
  status: false
}

const PatientDietMaster = () => {

  const navigate = useNavigate()

  const {
    data: allDietMaster = [],
    refetch: fetchDietMaster
  } = useAllPatientDietMaster()

  const [editMode, setEditMode] = useState(false)
  const [dietdata, setDietData] = useState({ ...formReset })

  const { diet_id, diet_name, speciality_id, calories_per_day, protein_per_day, description, status } = dietdata

  const id = useSelector(state => state.LoginUserData.empid)

  const updateDietData = useCallback((e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setDietData({ ...dietdata, [e.target.name]: value })
  }, [dietdata])

  // form data
  const formData = useMemo(() => ({
    ...(editMode
      ? { diet_id, updated_by: id }
      : { created_by: id }),
    diet_name,
    speciality_id,
    calories_per_day: calories_per_day || 0,
    protein_per_day: protein_per_day || 0,
    description,
    is_active: status ? 1 : 0
  }), [editMode, diet_id, diet_name, speciality_id, calories_per_day, protein_per_day, description, status, id])

  // row select
  const rowSelect = useCallback((params) => {
    const data = params.api.getSelectedRows()[0]

    setDietData({
      diet_id: data.diet_id,
      diet_name: data.diet_name,
      speciality_id: data.speciality_id,
      calories_per_day: data.calories_per_day,
      protein_per_day: data.protein_per_day,
      description: data.description,
      status: data.is_active === 1
    })

    setEditMode(true)
  }, [])

  // submit
  const submitDiet = useCallback(async (e) => {
    e.preventDefault()
    // Validation
    if (diet_name.trim() === "") {
      infoNotify("Diet Name is required")
      return
    }

    if (!speciality_id) {
      infoNotify("Please select Diet Speciality")
      return
    }

    if (calories_per_day && calories_per_day < 0) {
      infoNotify("Calories per day cannot be negative")
      return
    }

    if (protein_per_day && protein_per_day < 0) {
      infoNotify("Protein per day cannot be negative")
      return
    }

    const apiPath = editMode
      ? '/dietmaster/patient/update'
      : '/dietmaster/patient/insert'

    try {

      const result = editMode
        ? await axioslogin.patch(apiPath, formData)
        : await axioslogin.post(apiPath, formData)

      const { success, message } = result.data

      if (success === 1 || success === 2) {
        succesNotify(message)
        setEditMode(false)
        setDietData({ ...formReset })
        fetchDietMaster()
      } else {
        infoNotify(message)
      }

    } catch (error) {
      infoNotify('Something went wrong')
    }

  }, [
    editMode,
    formData,
    fetchDietMaster,
    diet_name,
    speciality_id,
    calories_per_day,
    protein_per_day
  ])

  const backtoSetting = useCallback(() => navigate('/Home/Settings'), [navigate])

  const refreshWindow = useCallback(() => {
    setDietData({ ...formReset })
    setEditMode(false)
  }, [])

  return (
    <CardMaster
      title="Patient Diet Master"
      submit={submitDiet}
      close={backtoSetting}
      refresh={refreshWindow}
    >

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
                  onchange={updateDietData}
                />
              </Grid>

              <Grid item xl={12} lg={12}>
                <SelectDietSpeciality
                  value={speciality_id}
                  setValue={(value) =>
                    setDietData({ ...dietdata, speciality_id: value })
                  }
                />
              </Grid>

              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Calories per day"
                  type="number"
                  size="sm"
                  name="calories_per_day"
                  value={calories_per_day}
                  onchange={updateDietData}
                />
              </Grid>

              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Protein per day"
                  type="number"
                  size="sm"
                  name="protein_per_day"
                  value={protein_per_day}
                  onchange={updateDietData}
                />
              </Grid>

              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Description"
                  type="text"
                  size="sm"
                  name="description"
                  value={description}
                  onchange={updateDietData}
                />
              </Grid>

              <Grid item xl={2} lg={2}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="status"
                  value={status}
                  checked={status}
                  onCheked={updateDietData}
                />
              </Grid>

            </Grid>
          </Grid>

          <Grid item xl={8} lg={8}>
            <PatientDietMasterTable
              tabledata={allDietMaster}
              rowSelect={rowSelect}
            />
          </Grid>

        </Grid>
      </Box>

    </CardMaster>
  )
}

export default memo(PatientDietMaster)