import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAmModel } from 'src/redux/actions/AmModelList.action'

const AssetModelSelect = ({ value, setValue,setName }) => {
  const dispatch = useDispatch()
  const model = useSelector((state) => {
    return state.getAmModel.modelList || 0
  })
  useEffect(() => {
    dispatch(getAmModel())
  }, [dispatch])
  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={(e, { props }) => {
            setValue(e.target.value)
            setName(props.name)
          }}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Model
          </MenuItem>
          {model &&
            model.map((val, index) => {
              return (
                <MenuItem key={index} name={val.model_name} value={val.model_slno}>
                  {val.model_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(AssetModelSelect)
