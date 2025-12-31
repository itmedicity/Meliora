// import React, { memo, useEffect } from 'react'
// import Box from '@mui/material/Box'
// import FormControl from '@mui/material/FormControl'
// import MenuItem from '@mui/material/MenuItem'
// import Select from '@mui/material/Select'
// import { useDispatch, useSelector } from 'react-redux'
// import { getItem } from 'src/redux/actions/ItemMaster.action'

// const SelectItemName = ({ value, setValue, setName, group }) => {
//   const dispatch = useDispatch()
//   /**getItem -state update function of reducer
//    *   itemList- initial state of reducer function
//    *itemdata is used to list select box items by using map
//    */
//   const itemdata = useSelector(state => {
//     return state.getItem.itemList || 0
//   })
//   useEffect(() => {
//     dispatch(getItem(group))
//   }, [dispatch, group])
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
//           sx={{ height: 25, p: 0, m: 0, lineHeight: 1.2 }}
//         >
//           <MenuItem value={0} disabled>
//             Select Item
//           </MenuItem>
//           {itemdata &&
//             itemdata.map((val, index) => {
//               return (
//                 <MenuItem key={index} value={val.item_slno}>
//                   {val.item_name}
//                 </MenuItem>
//               )
//             })}
//         </Select>
//       </FormControl>
//     </Box>
//   )
// }

// export default memo(SelectItemName)



import React, { memo, useEffect } from 'react'
import { Box, FormControl, Select, Option } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux'
import { getItem } from 'src/redux/actions/ItemMaster.action'

const SelectItemName = ({ value, setValue, setName, group }) => {
  const dispatch = useDispatch()

  const itemdata = useSelector(state => state.getItem.itemList || [])

  useEffect(() => {
    dispatch(getItem(group))
  }, [dispatch, group])

  return (
    <Box>
      <FormControl size="sm" sx={{ width: '100%' }}>
        <Select
          placeholder="Select Item"
          value={value}
          onChange={(e, newValue) => {
            setValue(newValue)
            const selected = itemdata.find(i => i.item_slno === newValue)
            setName(selected?.item_name || "")
          }}
          size="sm"
          sx={{

            p: 0.5,
            m: 0,
          }}
        >
          <Option value={0} disabled>
            Select Item
          </Option>

          {itemdata.map((val, index) => (
            <Option key={index} value={val.item_slno}>
              {val.item_name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(SelectItemName)

