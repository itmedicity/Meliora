//@Not using
// import React from 'react'
// import { Box, Typography } from '@mui/joy'

// const TempFoodPreview = ({ tempFoods = [] }) => {
//     if (!tempFoods.length) {
//         return (
//             <Typography fontSize={13} color="neutral">
//                 No items added
//             </Typography>
//         )
//     }

//     return (
//         <Box sx={{ mt: 1 }}>
//             {tempFoods?.map((food, index) => (
//                 <Typography
//                     key={index}
//                     fontSize={13}
//                     sx={{
//                         display: 'flex',
//                         gap: 0.5,
//                         alignItems: 'center'
//                     }}
//                 >
//                     • <strong>{food?.item_name}</strong> – {food.qty}
//                 </Typography>
//             ))}
//         </Box>
//     )
// }

// export default TempFoodPreview
