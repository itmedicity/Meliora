import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { memo } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubmodel } from 'src/redux/actions/AmSubmodelList.action'

const AmSubmodelSelect = ({ value, setValue, model }) => {
  const dispatch = useDispatch()
  const submodel = useSelector((state) => {
    return state.getSubmodel.SubmodelList || 0
  })
  useEffect(() => {
    dispatch(getSubmodel(model))
  }, [dispatch, model])
  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Submodel
          </MenuItem>
          {submodel &&
            submodel.map((val, index) => {
              return (
                <MenuItem key={index} value={val.submodel_slno}>
                  {val.submodel_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(AmSubmodelSelect)
