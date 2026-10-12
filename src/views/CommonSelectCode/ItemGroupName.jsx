import React, { useEffect, memo } from 'react'
import { Box, FormControl, Select, Option } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux'
import { setitemGrpName } from 'src/redux/actions/Itemgroup.action'

const ItemGroupName = ({ value, setValue, setName }) => {
  const dispatch = useDispatch()

  const itemgrpnamee = useSelector(state => state.getitemGrpName.itemgrpList || [])

  useEffect(() => {
    dispatch(setitemGrpName())
  }, [dispatch])

  return (
    <Box>
      <FormControl size="sm" sx={{ width: '100%' }}>
        <Select
          placeholder="Select Item Group"
          value={value}
          onChange={(e, newValue) => {
            setValue(newValue)
            const selected = itemgrpnamee.find(item => item.grp_slno === newValue)
            setName(selected?.group_name || "")
          }}
          size="sm"
          sx={{

            p: 0.5,
            m: 0,
          }}
        >
          <Option value={0} disabled>
            Select Item Group
          </Option>

          {itemgrpnamee.map((val, index) => (
            <Option key={index} value={val.grp_slno}>
              {val.group_name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(ItemGroupName)

