import React, { memo } from 'react'
import Box from '@mui/joy/Box'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import FormControl from '@mui/joy/FormControl'

function Test({ value, setValue }) {
  return (
    <Box>
      <FormControl sx={{ width: '100%' }} size="sm">
        <Select
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="sm"
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <Option value={0} disabled>
            Select Nursing Station
          </Option>

          <Option value={'NS0A'}>4 th A side</Option>
          <Option value={'NS0B'}>4 th B side</Option>
          <Option value={'NS0C'}>4 th C side</Option>
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(Test)


// import React, { memo } from 'react'
// import MenuItem from '@mui/material/MenuItem'
// import Select from '@mui/material/Select'
// import FormControl from '@mui/material/FormControl'

// function Test({ value, setValue }) {
//   return (
//     <Box sx={{}}>
//       <FormControl fullWidth size="small">
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={value}
//           onChange={e => setValue(e.target.value)}
//           size="small"
//           fullWidth
//           variant="outlined"
//           sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
//         >
//           <MenuItem value={0} disabled>
//             Select Nursing Station
//           </MenuItem>
//           <MenuItem value={'NS0A'}>4 th A side</MenuItem>
//           <MenuItem value={'NS0B'}> 4 th B side</MenuItem>
//           <MenuItem value={'NS0C'}>$ th C side</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   )
// }

// export default memo(Test)
