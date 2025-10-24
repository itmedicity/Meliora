import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormControl from '@mui/material/FormControl'
import { getComplaintDept } from 'src/redux/actions/ComplaintDept.action'
import { Box, Option, Select } from '@mui/joy'
const ComplaintDeptSelect = ({ value, setValue }) => {
  const dispatch = useDispatch()
  /**getComplaintdept -state update function of reducer
   * complaintdeptList- initial state of reducer function
   *complaintdeptdata is used to list select box items by using map
   */
  const complaintdeptdata = useSelector(state => {
    return state.getComplaintDept.complaintdeptList || 0
  })
  //getComplaintdept function is used to update data in complaintdepartment redux
  useEffect(() => {
    dispatch(getComplaintDept())
  }, [dispatch])
  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          id="demo-simple-select"
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          size="small"
          variant="outlined"
          sx={{}}
        >
          <Option value={0} disabled>
            Select Complaint Department
          </Option>
          {complaintdeptdata &&
            complaintdeptdata.map((val, index) => {
              return (
                <Option key={index} value={val.complaint_dept_slno}>
                  {val.complaint_dept_name}
                </Option>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}
export default memo(ComplaintDeptSelect)

// import React, { useEffect, memo } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import Box from "@mui/material/Box";
// import Select, { selectClasses } from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
// import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
// import { getComplaintDept } from 'src/redux/actions/ComplaintDept.action'
// const ComplaintDeptSelect = ({ value, setValue }) => {
//     const dispatch = useDispatch();

//     const complaintdeptdata = useSelector((state) => {
//         return state.getComplaintDept.complaintdeptList || 0
//     })
//     //getComplaintdept function is used to update data in complaintdepartment redux
//     useEffect(() => {
//         dispatch(getComplaintDept())
//     }, [dispatch])

//     const handleChange = (event, newValue) => {
//         setValue(newValue); // newValue should directly give you the selected value

//     };

//     return (
//         <Box >

//             <Select
//                 placeholder="Select Complaint Department"
//                 indicator={<KeyboardArrowDown />}
//                 value={value}
//                 onChange={handleChange}  // Attach the handleChange function
//                 sx={{
//                     width: '100%',
//                     [`& .${selectClasses.indicator}`]: {
//                         transition: '0.2s',
//                         [`&.${selectClasses.expanded}`]: {
//                             transform: 'rotate(-180deg)',
//                         },
//                     },
//                 }}
//             >
//                 {
//                     complaintdeptdata && complaintdeptdata.map((val, index) => {
//                         return <Option key={index} value={val.complaint_dept_slno}>{val.complaint_dept_name}</Option>
//                     })
//                 }
//             </Select>
//             {/* <FormControl fullWidth size="small"  >
//                 <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={value}
//                     onChange={(e) => setValue(e.target.value)}
//                     size="small"
//                     fullWidth
//                     variant='outlined'
//                     sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
//                 >
//                     <MenuItem value={0} disabled  >Select Complaint Department</MenuItem>
//                     {
//                         complaintdeptdata && complaintdeptdata.map((val, index) => {
//                             return <MenuItem key={index} value={val.complaint_dept_slno}>{val.complaint_dept_name}</MenuItem>
//                         })
//                     }
//                 </Select>
//             </FormControl> */}
//         </Box >
//     )
// }
// export default memo(ComplaintDeptSelect)
