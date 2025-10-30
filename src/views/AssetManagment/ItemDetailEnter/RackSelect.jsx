import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Autocomplete, Input } from '@mui/joy'
import Box from '@mui/joy/Box'

const RackSelect = ({ value, setValue }) => {
  const rackList = useSelector(state => state.getRackList?.AssetRackList)

  return (
    <Box>
      <Autocomplete
        options={rackList || []}
        getOptionLabel={option => option.am_rack_name}
        value={rackList?.find(rack => rack.am_rack_slno === value) || null}
        onChange={(event, newValue) => {
          setValue(newValue ? newValue.am_rack_slno : 0)
        }}
        renderinput={params => (
          <Input {...params} placeholder="Select Rack" size="sm" sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }} />
        )}
        disableportal="true"
        clearOnBlur
        sx={{ width: '100%' }}
      />
    </Box>
  )
}

export default memo(RackSelect)

// import FormControl from '@mui/material/FormControl'
// import Box from '@mui/material/Box'
// import React, { memo } from 'react'
// import MenuItem from '@mui/material/MenuItem'
// import Select from '@mui/material/Select'
// import { useSelector } from 'react-redux'

// const RackSelect = ({ value, setValue }) => {
//     const rackList = useSelector((state) => state.getRackList?.AssetRackList)

//     return (
//         <Box>
//             <FormControl fullWidth size="small">
//                 <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     // disabled={disabled}
//                     value={value}
//                     onChange={(e) => setValue(e.target.value)}
//                     size="small"
//                     fullWidth
//                     variant="outlined"
//                     sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
//                 >
//                     <MenuItem value={0} disabled>
//                         Select Rack
//                     </MenuItem>
//                     {rackList &&
//                         rackList.map((val, index) => {
//                             return (
//                                 <MenuItem key={index} value={val.am_rack_slno}>
//                                     {val.am_rack_name}
//                                 </MenuItem>
//                             )
//                         })}
//                 </Select>
//             </FormControl>
//         </Box>
//     )
// }

// export default memo(RackSelect)
