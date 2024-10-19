// import { Box, FormControl, MenuItem, Select } from '@mui/material'
// import React, { memo, useEffect, useState } from 'react'
// import { axioslogin } from 'src/views/Axios/Axios';


// const StoreSelectForStore = ({ substoreSlno, setsubStoreSlno }) => {

//     const [tabledata, setTabledata] = useState([])

//     useEffect(() => {
//         const getSubStore = async () => {
//             const result = await axioslogin.get('/newCRFPurchase/getSubstores');
//             const { success, data } = result.data
//             if (success === 1) {
//                 setTabledata(data);
//             }
//             else {
//                 setTabledata([])
//             }
//         }
//         getSubStore()
//     }, [])


//     return (
//         <Box>
//             <FormControl fullWidth size="small">
//                 <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={substoreSlno}
//                     onChange={(e) => setsubStoreSlno(e.target.value)}
//                     size="small"
//                     fullWidth
//                     variant="outlined"
//                     sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
//                 >
//                     <MenuItem value={0} disabled>
//                         Select Store
//                     </MenuItem>
//                     {tabledata && tabledata.map((val, index) => {
//                         return (
//                             <MenuItem key={index} value={val.crm_store_master_slno}>
//                                 {val.sub_store_name}
//                             </MenuItem>
//                         )
//                     })}
//                 </Select>
//             </FormControl>
//         </Box>
//     )
// }

// export default memo(StoreSelectForStore)