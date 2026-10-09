// import React, { useEffect, memo } from 'react'
// import Box from '@mui/material/Box'
// import FormControl from '@mui/material/FormControl'
// import Select from '@mui/material/Select'
// import { useDispatch, useSelector } from 'react-redux'
// import MenuItem from '@mui/material/MenuItem'
// import { setitemGrpName } from 'src/redux/actions/Itemgroup.action'
// const ItemgrpSelect = ({ value, setValue }) => {
//   const dispatch = useDispatch()
//   /**getDepartment -state update function of reducer
//    * departmentList- initial state of reducer function
//    *departmentdata is used to list select box items by using map
//    */
//   const itemgrpnamee = useSelector(state => {
//     return state.getitemGrpName.itemgrpList || 0
//   })

//   //getDepartment function is used to update data in department redux
//   useEffect(() => {
//     dispatch(setitemGrpName())
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
//             Select Item group
//           </MenuItem>
//           {itemgrpnamee &&
//             itemgrpnamee.map((val, index) => {
//               return (
//                 <MenuItem key={index} value={val.grp_slno}>
//                   {val.group_name}
//                 </MenuItem>
//               )
//             })}
//         </Select>
//       </FormControl>
//     </Box>
//   )
// }

// export default memo(ItemgrpSelect)


import React, { useEffect, memo } from 'react'
import { Box, FormControl, Select, Option } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux'
import { setitemGrpName } from 'src/redux/actions/Itemgroup.action'

const ItemgrpSelect = ({ value, setValue }) => {
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
          onChange={(e, newValue) => setValue(newValue)}
          size="sm"
          sx={{
            p: .5,
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

export default memo(ItemgrpSelect)

