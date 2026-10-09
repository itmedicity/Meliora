import { Box, Grid } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'

import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'

// import DietAllergyTable from './DietAllergyTable'

import DietAllergencyMasterTable from './DietAllergencyMasterTable'
import { useAllAllergenMaster } from 'src/views/Diet/CommonData/UseQuery'


// Form reset
const formReset = {
  allergen_id: '',
  allergen_name: '',
  allergen_description: '',
  severity_level: 'MEDIUM',
  status: true
}

const DietAllergencyMaster = () => {
  const navigate = useNavigate()
  const { empid } = useSelector(state => state.LoginUserData)

  const {
    data: allAllergens = [],
    refetch: fetchAllergens
  } = useAllAllergenMaster()

  const [editMode, setEditMode] = useState(false)
  const [allergy, setAllergy] = useState({ ...formReset })

  const { allergen_id, allergen_name, allergen_description, severity_level, status } = allergy

  // Handle input change
  const updateAllergy = useCallback((e) => {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    if (e.target.name === 'allergen_name') value = value.toUpperCase()

    setAllergy({ ...allergy, [e.target.name]: value })
  }, [allergy])

  // Severity dropdown
  const handleSeverityChange = useCallback((e, newValue) => {
    setAllergy({ ...allergy, severity_level: newValue })
  }, [allergy])

  // Form data
  const formData = useMemo(() => ({
    ...(editMode ? { allergen_id, updated_by: empid } : { created_by: empid }),
    allergen_name,
    allergen_description,
    severity_level,
    is_active: status ? 1 : 0
  }), [editMode, allergen_id, allergen_name, allergen_description, severity_level, status, empid])

  // Row select
  const rowSelect = useCallback((params) => {
    const data = params.api.getSelectedRows()[0]

    setAllergy({
      allergen_id: data.allergen_id,
      allergen_name: data.allergen_name,
      allergen_description: data.allergen_description,
      severity_level: data.severity_level,
      status: data.is_active === 1
    })
    setEditMode(true)
  }, [])

  // Submit
  const submitAllergy = useCallback(async (e) => {
    e.preventDefault()

    const apiPath = editMode ? '/allergen/update' : '/allergen/insert'

    try {
      const result = editMode
        ? await axioslogin.patch(apiPath, formData)
        : await axioslogin.post(apiPath, formData)

      const { success, message } = result.data

      if (success === 1 || success === 2) {
        succesNotify(message)
        setEditMode(false)
        setAllergy({ ...formReset })
        fetchAllergens()
      } else {
        infoNotify(message)
      }
    } catch (err) {
      infoNotify('Something went wrong!')
    }
  }, [editMode, formData, fetchAllergens])

  const backToSettings = useCallback(() => navigate('/Home/Settings'), [navigate])

  const refreshWindow = useCallback(() => {
    setAllergy({ ...formReset })
    setEditMode(false)
  }, [])




  return (
    <CardMaster
      title="Diet Allergy Master"
      submit={submitAllergy}
      close={backToSettings}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>

          {/* FORM */}
          <Grid item xl={4} lg={4}>
            <Grid container spacing={1}>

              <Grid item xs={12}>
                <TextFieldCustom
                  placeholder="Allergen Name"
                  name="allergen_name"
                  value={allergen_name}
                  onchange={updateAllergy}
                />
              </Grid>

              <Grid item xs={12}>
                <TextFieldCustom
                  placeholder="Description"
                  name="allergen_description"
                  value={allergen_description}
                  onchange={updateAllergy}
                />
              </Grid>

              <Grid item xs={12}>
                <Select
                  value={severity_level}
                  onChange={handleSeverityChange}
                >
                  <Option value="LOW">LOW</Option>
                  <Option value="MEDIUM">MEDIUM</Option>
                  <Option value="HIGH">HIGH</Option>
                </Select>
              </Grid>

              <Grid item xs={3}>
                <CusCheckBox
                  label="Status"
                  name="status"
                  checked={status}
                  onCheked={updateAllergy}
                />
              </Grid>

            </Grid>
          </Grid>

          {/* TABLE */}
          <Grid item xl={8} lg={8}>
            <DietAllergencyMasterTable
              tabledata={allAllergens}
              rowSelect={rowSelect}
            />
          </Grid>

        </Grid>
      </Box>
    </CardMaster>
  )
}

export default memo(DietAllergencyMaster)