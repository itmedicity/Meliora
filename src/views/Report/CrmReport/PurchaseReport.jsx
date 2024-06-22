import React from 'react'

const PurchaseReport = () => {
    return (
        <div>PurchaseReport</div>
    )
}

export default PurchaseReport



// import React, { useCallback, useState, memo, useEffect, useRef } from 'react'



// import CardCloseOnly from 'src/views/Components/CardCloseOnly'
// import { useHistory } from 'react-router-dom';
// import CustomBackDrop from 'src/views/Components/CustomBackDrop';
// import { Paper, Box } from '@mui/material';
// import TextFieldCustom from 'src/views/Components/TextFieldCustom';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import CusIconButton from '../../Components/CusIconButton';
// import { warningNotify } from 'src/views/Common/CommonCode';
// import { axioslogin } from 'src/views/Axios/Axios';
// import { Typography } from '@mui/joy'
// import { useDispatch, useSelector } from 'react-redux';
// import { ActionTyps } from 'src/redux/constants/action.type'
// import CustomeToolTip from '../../Components/CustomeToolTip'
// import DownloadIcon from '@mui/icons-material/Download'
// import { AgGridReact } from 'ag-grid-react'
// import 'ag-grid-community/dist/styles/ag-grid.css'
// import 'ag-grid-community/dist/styles/ag-theme-material.css'
// import { format } from 'date-fns';

// const PurchaseReport = () => {

//     const dispatch = useDispatch();
//     const history = useHistory();
//     const [open, setOpen] = useState(false)
//     const [TableData, setTableData] = useState([]);
//     const [TableDataDis, setTableDataDis] = useState(0);
//     const [exports, setexport] = useState(0)
//     const [dateset, SetDate] = useState({
//         start_date: '',
//         end_date: ''
//     })
//     const { start_date, end_date } = dateset;
//     const getDate = useCallback((e) => {
//         const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
//         SetDate({ ...dateset, [e.target.name]: value })

//     }, [dateset])


//     const clicksearch = useCallback((e) => {
//         e.preventDefault();


//     }, [])

//     const backToSetting = useCallback(() => {
//         history.push(`/Home/Reports`)
//     }, [history])


//     return (
//         <CardCloseOnly
//             title='User Acknowledged CRF'
//             close={backToSetting}
//         >
//             <CustomBackDrop open={open} text="Please Wait" />
//             <Box sx={{ width: "100%", p: 1 }}>
//                 <Paper
//                     square
//                     sx={{
//                         height: { xs: 700, sm: 700, md: 700, lg: 700, xl: 700 },
//                         p: 0.5,

//                     }}
//                 >
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                         }}
//                     >
//                         <Paper square elevation={2} sx={{ p: 2 }} >
//                             <Box sx={{
//                                 width: "100%",
//                                 display: "flex",
//                                 flexDirection: 'row',
//                                 justifyContent: 'center'
//                             }}>
//                                 <Box sx={{
//                                     width: '10%',
//                                     ml: 0.5, mt: 0.5
//                                 }}>
//                                     <Typography>Start Date</Typography>
//                                 </Box>
//                                 <Box sx={{
//                                     width: '20%',
//                                     // height: 15,
//                                     mb: 1, pr: 3
//                                 }}>
//                                     <TextFieldCustom
//                                         type="date"
//                                         size="sm"
//                                         name="start_date"
//                                         value={start_date}
//                                         onchange={getDate}
//                                         slotProps={{
//                                             input: {
//                                                 min: format(new Date("2023-12-27"), "yyyy-MM-dd")
//                                             },
//                                         }}
//                                     />
//                                 </Box>
//                                 <Box sx={{
//                                     width: '10%',
//                                     ml: 0.5, mt: 0.5
//                                 }}>
//                                     <Typography>End Date</Typography>
//                                 </Box>
//                                 <Box sx={{
//                                     width: '20%',
//                                     // height: 15,
//                                     mb: 1, pr: 3
//                                 }}>
//                                     <TextFieldCustom
//                                         type="date"
//                                         size="sm"
//                                         name="end_date"
//                                         value={end_date}
//                                         onchange={getDate}
//                                     />
//                                 </Box>


//                                 <Box sx={{
//                                     width: '20%',

//                                 }}>
//                                     <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={clicksearch} >
//                                         <SearchOutlinedIcon fontSize='small' />
//                                     </CusIconButton>
//                                 </Box>
//                             </Box>
//                         </Paper>

//                     </Box>
//                 </Paper>
//             </Box>
//         </CardCloseOnly>
//     )
// }

// export default memo(PurchaseReport)