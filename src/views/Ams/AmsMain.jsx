import React from 'react'

const AmsMain = () => {
  return <div>AmsMain</div>
}

export default AmsMain
// import React from 'react'
// import { Box, CssVarsProvider, Table } from '@mui/joy'
// import { useQuery } from 'react-query';
// import { axioslogin } from '../Axios/Axios';
// import { Paper } from '@mui/material';
// import CusIconButton from '../Components/CusIconButton';

// const AmsMain = () => {

//   const { data: antibioticTableData = [], } = useQuery(
//     ['getAllAntibioticListe',],
//     async () => {
//       const response = await axioslogin.get('/amsAntibiotic/getAntibiotics');
//       return response.data.data;
//     }
//   );

//   return (
//     <Paper sx={{ pb: .5 }}>
//       <Box sx={{ flex: 1, height: 30, bgcolor: '#eff3f6', display: 'flex' }}>
//         <Box sx={{ flex: 1, }}>
//           Antibiotic Prescription Patient Details
//         </Box>
//         <Box>
//         </Box>

//       </Box>
//       <CssVarsProvider>
//         <Box
//           sx={(theme) => ({
//             m: 1,
//             height: '80vh',
//             border: 1,
//             borderColor: 'lightgrey',
//             '--Table-firstColumnWidth': '150px',
//             '--Table-lastColumnWidth': '115px',
//             '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
//             '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
//             overflow: 'auto',
//             background: `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
//             linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
//             radial-gradient(
//               farthest-side at 0 50%,
//               rgba(0, 0, 0, 0.12),
//               rgba(0, 0, 0, 0)
//             ),
//             radial-gradient(
//                 farthest-side at 100% 50%,
//                 rgba(0, 0, 0, 0.12),
//                 rgba(0, 0, 0, 0)
//               )
//               0 100%`,
//             backgroundSize:
//               '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
//             backgroundRepeat: 'no-repeat',
//             backgroundAttachment: 'local, local, scroll, scroll',
//             backgroundPosition:
//               'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
//             backgroundColor: 'background.surface',
//           })}
//         >
//           <Table
//             borderAxis="bothBetween"
//             stickyHeader
//             stripe="odd"
//             hoverRow
//             sx={{
//               '& tr > *:first-child': {
//                 position: 'sticky',
//                 left: 0,
//                 boxShadow: '1px 0 var(--TableCell-borderColor)',
//                 bgcolor: 'background.surface',
//               },
//               '& tr > *:last-child': {
//                 position: 'sticky',
//                 right: 0,
//                 bgcolor: 'var(--TableCell-headBackground)',
//               },
//             }}
//           >
//             <thead>
//               <tr>
//                 <th style={{ textAlign: 'center', width: 'var(--Table-firstColumnWidth)' }}>Patient Details</th>
//                 <th style={{ textAlign: 'center', }}>Location</th>
//                 <th style={{ textAlign: 'center', }}>Fat&nbsp;(g)</th>
//                 <th style={{ textAlign: 'center', }}>Carbs&nbsp;(g)</th>
//                 <th style={{ textAlign: 'center', }}>Protein&nbsp;(g)</th>
//                 <th
//                   aria-label="last"
//                   style={{ width: 'var(--Table-lastColumnWidth)' }}
//                 >
//                   Culture Details
//                 </th>

//               </tr>
//             </thead>
//             <tbody>
//               {antibioticTableData.map((row, index) => (
//                 <tr key={index}>
//                   <td style={{ textAlign: 'center' }}>
//                     {row.item_code}
//                     <br></br>
//                     {row.itc_desc}
//                   </td>
//                   <td style={{ textAlign: 'center' }}>{row.calories}</td>
//                   <td style={{ textAlign: 'center' }}>{row.fat}</td>
//                   <td style={{ textAlign: 'center' }}>{row.carbs}</td>
//                   <td style={{ textAlign: 'center' }}>{row.protein}</td>
//                   <td style={{ textAlign: 'center' }}>
//                     d
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Box>
//       </CssVarsProvider>
//     </Paper>

//   )
// }

// export default AmsMain
