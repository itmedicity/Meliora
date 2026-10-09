import React, { useEffect, memo } from 'react'
import { Box, FormControl, Select, Option } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux'
import { getRoomcatora } from 'src/redux/actions/RoomCatora.action'

const SelectRoomcatOra = ({ value, setValue }) => {
  const dispatch = useDispatch()

  const roomcatoradata = useSelector(state => state.getRoomcatora.roomcatList || [])

  useEffect(() => {
    dispatch(getRoomcatora())
  }, [dispatch])

  return (
    <Box>
      <FormControl size="sm" sx={{ width: '100%' }}>
        <Select
          placeholder="Select Room Category"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="sm"
          sx={{
            p: .5,
            m: 0,
          }}
        >
          <Option value={0} disabled>
            Select Room Category
          </Option>

          {roomcatoradata.map((val, index) => (
            <Option key={index} value={val.rc_code}>
              {val.rcc_desc}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(SelectRoomcatOra)


// import React, { useEffect, memo } from 'react'
// import Box from '@mui/material/Box'
// import FormControl from '@mui/material/FormControl'
// import MenuItem from '@mui/material/MenuItem'
// import Select from '@mui/material/Select'
// import { useDispatch, useSelector } from 'react-redux'
// import { getRoomcatora } from 'src/redux/actions/RoomCatora.action'
// const SelectRoomcatOra = ({ value, setValue }) => {
//   const dispatch = useDispatch()
//   /**getRoomcatora -state update function of reducer
//    *   roomcatList- initial state of reducer function
//    *roomcatoradata is used to list select box items by using map
//    */
//   const roomcatoradata = useSelector(state => {
//     return state.getRoomcatora.roomcatList || 0
//   })
//   useEffect(() => {
//     dispatch(getRoomcatora())
//   }, [dispatch])
//   return (
//     <Box>
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
//             Select Room Category
//           </MenuItem>
//           {roomcatoradata &&
//             roomcatoradata.map((val, index) => {
//               return (
//                 <MenuItem key={index} value={val.rc_code}>
//                   {val.rcc_desc}
//                 </MenuItem>
//               )
//             })}
//         </Select>
//       </FormControl>
//     </Box>
//   )
// }

// export default memo(SelectRoomcatOra)
