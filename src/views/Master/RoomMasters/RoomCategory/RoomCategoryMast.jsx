import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import RoomCategoryTable from './RoomCategoryTable'
const RoomCategoryMast = () => {
  const history = useNavigate()
  //intializing
  const [roomcat, setRoomcat] = useState({
    rmname: '',
    rmshort: '',
    status: false,
  })
  //destructuring
  const { rmname, rmshort, status } = roomcat
  const updatehicRoomcategory = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setRoomcat({ ...roomcat, [e.target.name]: value })
    },
    [roomcat],
  )
  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  return (
    <CardMaster title="Room Category Master" close={backtoSetting}>
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={4} lg={4}>
            <Grid container spacing={1}>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Description"
                  type="text"
                  size="sm"
                  name="rmname"
                  value={rmname}
                  onchange={updatehicRoomcategory}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Short Name"
                  type="text"
                  size="sm"
                  name="rmshort"
                  value={rmshort}
                  onchange={updatehicRoomcategory}
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
                  onCheked={updatehicRoomcategory}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} xl={8}>
            <RoomCategoryTable />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}
export default RoomCategoryMast
