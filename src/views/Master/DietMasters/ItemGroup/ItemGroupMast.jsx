import { Box, Grid } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import ItemGroupTable from './ItemGroupTable'
import { useSelector } from 'react-redux'
import { useAllItemGroupMaster } from 'src/views/Diet/CommonData/UseQuery'

// Define form reset outside
const formReset = {
  item_group_id: '',
  group_name: '',
  group_code: '',
  display_order: '',
  status: false
}

const ItemGroupMast = () => {

  const navigate = useNavigate();

  const {
    data: allItemGroupMaster = [],
    refetch: FetchAllGroupMaster
  } = useAllItemGroupMaster();

  const [editMode, setEditMode] = useState(false)
  const [itemgroup, setItemgrp] = useState({ ...formReset })
  const { item_group_id, group_name, group_code, display_order, status } = itemgroup

  const id = useSelector(state => state.LoginUserData.empid)

  const updateitemgroup = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setItemgrp({ ...itemgroup, [e.target.name]: value })
    },
    [itemgroup]
  )

  //Form Data
  const formData = useMemo(() => ({
    ...(editMode
      ? { item_group_id, updated_by: id }
      : { created_by: id }),
    group_name,
    group_code,
    display_order: display_order || 0,
    is_active: status ? 1 : 0
  }), [editMode, item_group_id, group_name, group_code, display_order, status, id])

  // Row select for edit
  const rowSelect = useCallback(params => {
    const data = params.api.getSelectedRows()[0]
    setItemgrp({
      item_group_id: data.item_group_id,
      group_name: data.group_name,
      group_code: data.group_code,
      display_order: data.display_order,
      status: data.is_active === 1
    })
    setEditMode(true)
  }, [])

  // Common submit using formData and only API path changes
  const submititemgrp = useCallback(
    async e => {
      e.preventDefault()
      const apiPath = editMode ? '/itemgrp/itemgrpdtl/update' : '/itemgrp/insertgroupdtl'
      try {
        const result = editMode
          ? await axioslogin.patch(apiPath, formData)
          : await axioslogin.post(apiPath, formData)

        const { success, message } = result.data
        if (success === 2 || success === 1) {
          succesNotify(message)
          setEditMode(false)
          setItemgrp({ ...formReset })
          FetchAllGroupMaster() // refresh table
        } else infoNotify(message)
      } catch (error) {
        infoNotify('Something went wrong!')
      }
    },
    [editMode, formData, FetchAllGroupMaster]
  )

  const backtoSetting = useCallback(() => navigate('/Home/Settings'), [navigate])

  const refreshWindow = useCallback(() => {
    setItemgrp({ ...formReset })
    setEditMode(false)
  }, [])

  return (
    <CardMaster title="Item Group Master" submit={submititemgrp} close={backtoSetting} refresh={refreshWindow}>
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={4} lg={4}>
            <Grid container spacing={1}>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Item group name"
                  type="text"
                  size="sm"
                  name="group_name"
                  value={group_name}
                  onchange={updateitemgroup}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Group code"
                  type="text"
                  size="sm"
                  name="group_code"
                  value={group_code}
                  onchange={updateitemgroup}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Display order"
                  type="number"
                  size="sm"
                  name="display_order"
                  value={display_order}
                  onchange={updateitemgroup}
                />
              </Grid>
              <Grid item lg={2} xl={2}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="status"
                  value={status}
                  checked={status}
                  onCheked={updateitemgroup}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} xl={8}>
            <ItemGroupTable tabledata={allItemGroupMaster} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}

export default memo(ItemGroupMast);