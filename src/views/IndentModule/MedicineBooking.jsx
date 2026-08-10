// import { Box } from '@mui/joy'
// import { Paper } from '@mui/material'
// import React, { useCallback, useState } from 'react'
// import TextComponent from '../Components/TextComponent'
// import CusIconButton from 'src/views/Components/CusIconButton'
// import CloseIcon from '@mui/icons-material/Close'
// import { useNavigate } from 'react-router-dom'
// import Typography from "@mui/joy/Typography";
// import { FaUsers, FaChartPie } from "react-icons/fa";
// import { CgSandClock } from "react-icons/cg";

// const MedicineBooking = () => {
//     const history = useNavigate()
//     const [totalTokens, setTotalTokens] = useState(0);
//     const [balanceTokens, setBalanceTokens] = useState(0);
//     // const [upcomingDate, setUpcomingDate] = useState("");
//     const [totalBookedTokens, setTotalBookedTokens] = useState(0);

//     const tokenCardListData = [
//         {
//             id: 1,
//             color: "primary",
//             title: "Total Available Tokens",
//             count: totalTokens,
//             icon: "users", // Add an icon property
//         },
//         {
//             id: 2,
//             color: "primary",
//             title: "Total Tokens for Saturday",
//             count: totalBookedTokens,
//             icon: "chart", // Add an icon property
//         },
//         {
//             id: 3,
//             color: "primary",
//             title: "Remaining Tokens",
//             count: balanceTokens,
//             icon: "CgSandClock", // You can assign an appropriate icon here
//         },
//     ];
//     const backtoSetting = useCallback(() => {
//         history('/Home')
//     }, [history])
//     return (
//         <Paper sx={{ borderRadius: 0, width: '100%' }}>
//             <Box sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: '#D0D0D0' }}>
//                 <TextComponent
//                     sx={{
//                         color: '#5A676C',
//                         fontWeight: 510,
//                         flex: 1,
//                         m: 0.5,
//                         pl: 1,
//                         fontFamily: 'Arial'
//                     }}
//                     text="Booking History"
//                 />
//                 <Box>
//                     <CusIconButton size="sm" variant="outlined" color="primary" onClick={backtoSetting}>
//                         <CloseIcon fontSize="small" />
//                     </CusIconButton>
//                 </Box>
//             </Box>
//             <Box
//                 sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     flexWrap: "wrap",
//                     gap: 3,
//                     mt: 2,
//                 }}
//             >
//                 {tokenCardListData.map((item) => (
//                     <Box
//                         key={item.id}
//                         sx={{
//                             width: "20rem",
//                             bgcolor: "#80639a",
//                             color: "#fff",
//                             borderRadius: "12px",
//                             boxShadow: "lg",
//                             p: 3,
//                             textAlign: "center",
//                             transition: "0.3s ease-in-out",
//                             "&:hover": {
//                                 transform: "translateY(-3px)",
//                             },
//                         }}
//                     >
//                         <Box sx={{ mb: 2 }}>
//                             {item.icon === "users" && <FaUsers size={40} />}
//                             {item.icon === "chart" && <FaChartPie size={40} />}
//                             {item.icon === "CgSandClock" && <CgSandClock size={40} />}
//                         </Box>

//                         <Typography
//                             level="title-md"
//                             sx={{
//                                 color: "#fff",
//                                 mb: 1,
//                             }}
//                         >
//                             {item.title}
//                         </Typography>

//                         <Typography
//                             level="h2"
//                             sx={{
//                                 color: "#fff",
//                                 fontWeight: "bold",
//                                 fontSize: "1.8rem",
//                             }}
//                         >
//                             {item.count}
//                         </Typography>
//                     </Box>
//                 ))}
//             </Box>

//         </Paper>
//     )
// }

// export default MedicineBooking










import React from 'react'

const MedicineBooking = () => {
    return (
        <div>MedicineBooking</div>
    )
}

export default MedicineBooking