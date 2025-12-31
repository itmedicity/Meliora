import React, { useEffect, memo } from 'react'
import { Box } from '@mui/joy'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import { useDispatch, useSelector } from 'react-redux'
import { getDiettype } from 'src/redux/actions/DietType.action'

const SelectDietTypeName = ({ value, setValue, setName }) => {
  const dispatch = useDispatch()

  // Get diet type list
  const diettypedata = useSelector(
    state => state.getDiettype.diettypeList ?? []
  )

  // Load on mount
  useEffect(() => {
    dispatch(getDiettype())
  }, [dispatch])

  return (
    <Box>
      <Select
        value={value}
        onChange={(_, newValue) => {
          const selected = diettypedata.find(dt => dt.type_slno === newValue)
          setValue(newValue)
          setName(selected?.type_desc ?? '')
        }}
        placeholder="Select Diet Type"
        size="sm"
        sx={{ p: 0.5, m: 0 }}
      >
        <Option value={0} disabled>
          Select Diet Time
        </Option>

        {diettypedata.map((val, index) => (
          <Option key={index} value={val.type_slno}>
            {val.type_desc}
          </Option>
        ))}
      </Select>
    </Box>
  )
}

export default memo(SelectDietTypeName)



// import React, { useEffect, memo } from 'react'
// import Box from '@mui/material/Box'
// import FormControl from '@mui/material/FormControl'
// import MenuItem from '@mui/material/MenuItem'
// import Select from '@mui/material/Select'
// import { useDispatch, useSelector } from 'react-redux'
// import { getDiettype } from 'src/redux/actions/DietType.action'

// const SelectDietTypeName = ({ value, setValue, setName }) => {
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
//           onChange={(e, { props }) => {
//             setValue(e.target.value)
//             setName(props.children)
//           }}
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

// export default memo(SelectDietTypeName)
