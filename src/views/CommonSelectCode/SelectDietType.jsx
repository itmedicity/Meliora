import React, { useEffect, memo } from 'react'
import { Box, FormControl, Select, Option } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux'
import { getDiettype } from 'src/redux/actions/DietType.action'

const SelectDietType = ({ value, setValue }) => {
  const dispatch = useDispatch()

  const diettypedata = useSelector(state => state.getDiettype.diettypeList || [])

  useEffect(() => {
    dispatch(getDiettype())
  }, [dispatch])

  return (
    <Box>
      <FormControl size="sm" sx={{ width: '100%' }}>
        <Select
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          placeholder="Select Diet Type"
          size="sm"
          sx={{ p: .5, m: 0 }}
        >
          <Option value={0} disabled>
            Select Diet Type
          </Option>

          {diettypedata.map((val, index) => (
            <Option key={index} value={val.type_slno}>
              {val.type_desc}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(SelectDietType)


// import React, { useEffect, memo } from 'react'
// import Box from '@mui/material/Box'
// import FormControl from '@mui/material/FormControl'
// import MenuItem from '@mui/material/MenuItem'
// import Select from '@mui/material/Select'
// import { useDispatch, useSelector } from 'react-redux'
// import { getDiettype } from 'src/redux/actions/DietType.action'
// const SelectDietType = ({ value, setValue }) => {
//   const dispatch = useDispatch()
//   /**getDiettype -state update function of reducer
//    *   diettypeList- initial state of reducer function
//    *diettypedata is used to list select box items by using map
//    */
//   const diettypedata = useSelector(state => {
//     return state.getDiettype.diettypeList || 0
//   })
//   useEffect(() => {
//     dispatch(getDiettype())
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
//             Select Diet Type
//           </MenuItem>
//           {diettypedata &&
//             diettypedata.map((val, index) => {
//               return (
//                 <MenuItem key={index} value={val.type_slno}>
//                   {val.type_desc}
//                 </MenuItem>
//               )
//             })}
//         </Select>
//       </FormControl>
//     </Box>
//   )
// }

// export default memo(SelectDietType)
