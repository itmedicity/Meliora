import { Box, Grid } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useSelector } from 'react-redux'
import { useAllItemCategoryMaster } from 'src/views/Diet/CommonData/UseQuery'
import ItemCategoryMasterTable from './ItemCategoryMasterTable'
import SelectDietItemMaster from 'src/views/CommonSelectCode/SelectDietItemMaster'

const formReset = {
  item_category_id: '',
  item_group_id: '',
  category_name: '',
  category_code: '',
  display_order: '',
  status: false
}

const ItemCategoryMaster = () => {

  const navigate = useNavigate()

  const { data: allItemCategoryMaster = [],
    refetch: FetchAllCategoryMaster
  } = useAllItemCategoryMaster()


  const [editMode, setEditMode] = useState(false)
  const [itemcategory, setItemCategory] = useState(formReset)

  const {
    item_category_id,
    item_group_id,
    category_name,
    category_code,
    display_order,
    status
  } = itemcategory

  const id = useSelector(state => state.LoginUserData.empid)

  // Input change handler
  const updateItemCategory = useCallback((e) => {
    const { name, value, type, checked } = e.target

    setItemCategory(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }, [])

  // Select change
  const setItemGroup = useCallback((value) => {
    setItemCategory(prev => ({
      ...prev,
      item_group_id: value
    }))
  }, [])

  // Form Data
  const formData = useMemo(() => ({
    ...(editMode
      ? { item_category_id, updated_by: id }
      : { created_by: id }),
    item_group_id,
    category_name,
    category_code,
    display_order: display_order || 0,
    is_active: status ? 1 : 0
  }),
    [
      editMode,
      item_category_id,
      item_group_id,
      category_name,
      category_code,
      display_order,
      status,
      id
    ])

  // Row select
  const rowSelect = useCallback((params) => {

    const data = params.api.getSelectedRows()[0]

    setItemCategory({
      item_category_id: data.item_category_id,
      item_group_id: data.item_group_id,
      category_name: data.category_name,
      category_code: data.category_code,
      display_order: data.display_order,
      status: data.is_active === 1
    })

    setEditMode(true)

  }, [])

  // Submit
  const submitItemCategory = useCallback(async (e) => {

    e.preventDefault()

    // Validation
    if (!item_group_id) {
      infoNotify("Please select Item Group")
      return
    }

    if (category_name.trim() === "") {
      infoNotify("Category Name is required")
      return
    }

    if (category_code.trim() === "") {
      infoNotify("Category Code is required")
      return
    }

    if (display_order && display_order < 0) {
      infoNotify("Display Order cannot be negative")
      return
    }
    const apiPath = editMode
      ? '/itemcategory/update'
      : '/itemcategory/insert'

    try {

      const result = editMode
        ? await axioslogin.patch(apiPath, formData)
        : await axioslogin.post(apiPath, formData)

      const { success, message } = result.data

      if (success === 1 || success === 2) {
        succesNotify(message)
        setEditMode(false)
        setItemCategory(formReset)
        FetchAllCategoryMaster()
      } else {
        infoNotify(message)
      }

    } catch (error) {
      infoNotify('Something went wrong!')
    }

  }, [
    editMode,
    formData,
    FetchAllCategoryMaster,
    item_group_id,
    category_name,
    category_code,
    display_order
  ])

  const backtoSetting = useCallback(() => navigate('/Home/Settings'), [navigate])

  const refreshWindow = useCallback(() => {
    setItemCategory(formReset)
    setEditMode(false)
  }, [])

  return (

    <CardMaster
      title="Item Category Master"
      submit={submitItemCategory}
      close={backtoSetting}
      refresh={refreshWindow}
    >

      <Box sx={{ p: 1 }}>

        <Grid container spacing={1}>

          <Grid item xl={4} lg={4}>

            <Grid container spacing={1}>

              <Grid item xl={12} lg={12}>
                <SelectDietItemMaster
                  value={item_group_id}
                  setValue={setItemGroup}
                />
              </Grid>

              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Category name"
                  type="text"
                  size="sm"
                  name="category_name"
                  value={category_name}
                  onchange={updateItemCategory}
                />
              </Grid>

              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Category code"
                  type="text"
                  size="sm"
                  name="category_code"
                  value={category_code}
                  onchange={updateItemCategory}
                />
              </Grid>

              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Display order"
                  type="number"
                  size="sm"
                  name="display_order"
                  value={display_order}
                  onchange={updateItemCategory}
                />
              </Grid>

              <Grid item lg={2} xl={2}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="status"
                  checked={status}
                  onCheked={updateItemCategory}
                />
              </Grid>

            </Grid>

          </Grid>

          <Grid item lg={8} xl={8}>

            <ItemCategoryMasterTable
              tabledata={allItemCategoryMaster}
              rowSelect={rowSelect}
            />

          </Grid>

        </Grid>

      </Box>

    </CardMaster>
  )
}

export default memo(ItemCategoryMaster)