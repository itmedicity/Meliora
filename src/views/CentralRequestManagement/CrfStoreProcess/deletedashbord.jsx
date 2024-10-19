// import { Box, CssVarsProvider, IconButton, Input, Option, Radio, Select, Typography } from '@mui/joy'
// import { Grid, Paper } from '@mui/material'
// import { format } from 'date-fns'
// import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
// import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
// import CRFDashboardDptSelect from 'src/views/CommonSelectCode/CRFDashboardDptSelect';
// import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
// import { getDepartment } from 'src/redux/actions/Department.action';
// import { useDispatch } from 'react-redux';
// import CRFDashboardDptSecSelect from 'src/views/CommonSelectCode/CRFDashboardDptSecSelect';
// import AlignHorizontalLeftTwoToneIcon from '@mui/icons-material/AlignHorizontalLeftTwoTone';
// const viewAllCrfDetails = () => {

//     const dispatch = useDispatch()
//     const [startDate, setStartDate] = useState(format(new Date(), 'dd-MM-yyyy'))
//     const [endDate, setEndDate] = useState(format(new Date(), 'dd-MM-yyyy'))
//     const [searchFlag, setSearchFlag] = useState('0')
//     const [department, setDepartment] = useState(0)
//     const [clinic, setClinic] = useState(true)
//     const [nonClinic, setNonClinic] = useState(false)
//     const [dptSec, setdptSec] = useState(0)
//     const [searchCrf, setsearchCrf] = useState('')

//     useEffect(() => {
//         dispatch(getDepartment())
//     }, [dispatch])

//     const startDateChange = useCallback((e) => {
//         setStartDate(e.target.value)
//     }, [])
//     const endDateChange = useCallback((e) => {
//         setEndDate(e.target.value)
//     }, [])
//     const ClearSearch = useCallback(() => {
//         setSearchFlag(0)
//     }, [])
//     const changeSearchSelect = useCallback((e, newValue) => {
//         setSearchFlag(newValue);
//     }, [])

//     const changeClinic = useCallback((e) => {
//         if (e.target.checked === true) {
//             setClinic(true)
//             setNonClinic(false)
//         }
//         else {
//             setClinic(false)
//             setNonClinic(true)
//         }
//     }, [])
//     const changeNonClinic = useCallback((e) => {
//         if (e.target.checked === true) {
//             setClinic(false)
//             setNonClinic(true)
//         }
//         else {
//             setClinic(true)
//             setNonClinic(false)
//         }
//     }, [])
//     const changeCrfNo = useCallback((e) => {
//         setsearchCrf(e.target.value)
//     }, [])

//     const SearchData = useCallback(() => {

//     }, [])
//     return (
//         <Fragment>
//             <Paper variant='outlined' sx={{ bgcolor: 'white', pt: 0.5, display: 'flex', height: 60 }}>
//                 <Box sx={{ display: 'flex' }}>
//                     <Box sx={{ m: 1, }}>
//                         <Select defaultValue="0" sx={{ width: 280, border: '1px solid #64b5f6', height: 20, color: '#1565c0', fontSize: 14 }}
//                             slotProps={{
//                                 listbox: { placement: 'bottom-start' },
//                             }}
//                             placeholder="Serach By"
//                             value={searchFlag}
//                             onChange={changeSearchSelect}
//                         >
//                             <Option value="1">Date</Option>
//                             <Option value="2">Clinical / Non Clinical</Option>
//                             <Option value="3">Department / Department Section</Option>
//                             <Option value="4">CRF No.</Option>
//                         </Select>
//                     </Box>
//                     <Box sx={{ my: 1, pr: 1 }}>
//                         <CssVarsProvider>
//                             <IconButton
//                                 variant="plain"
//                                 sx={{
//                                     color: '#0277bd',
//                                     width: '100%',
//                                     fontSize: 12,
//                                     borderRadius: 5,
//                                     height: '19px', width: '100px',
//                                     lineHeight: '1',
//                                 }}
//                                 onClick={ClearSearch}
//                             >
//                                 <FilterAltTwoToneIcon sx={{ fontWeight: 550, color: '#0277bd', pr: 0.5, width: 30, height: 20 }} />
//                                 Clear Filter
//                             </IconButton>
//                         </CssVarsProvider>
//                     </Box>
//                 </Box>

//                 {searchFlag === '1' ?
//                     <Box sx={{ display: 'flex' }}>
//                         <Box sx={{ my: 1, mx: 0.5 }} >
//                             <CssVarsProvider>
//                                 <Input
//                                     startDecorator={<Typography sx={{ fontSize: 14, color: '#0d47a1', fontWeight: 550, pr: 0.5 }}>Start Date </Typography>}
//                                     sx={{ height: 25, borderRadius: 6, border: '1px solid #64b5f6', width: 210, color: '#0d47a1', fontSize: 14 }}
//                                     size="md"
//                                     type="date"
//                                     name="startDate"
//                                     value={startDate}
//                                     onChange={startDateChange}
//                                 // max={todayDate}
//                                 />
//                             </CssVarsProvider>
//                         </Box>
//                         <Box sx={{ my: 1 }} >
//                             <CssVarsProvider>
//                                 <Input
//                                     startDecorator={<Typography sx={{ fontSize: 14, color: '#0d47a1', fontWeight: 550, pr: 0.5 }}>End Date </Typography>}
//                                     sx={{ height: '25px', borderRadius: 6, border: '1px solid #64b5f6', width: 210, color: '#0d47a1', fontSize: 14 }}
//                                     size="md"
//                                     type="date"
//                                     name="endDate"
//                                     value={endDate}
//                                     onChange={endDateChange}
//                                 />
//                             </CssVarsProvider>
//                         </Box>
//                     </Box>
//                     : searchFlag === '2' ?
//                         <Box sx={{ display: 'flex', pl: 2 }}>
//                             <Box sx={{ m: 1, pt: 0.7 }}>
//                                 <CssVarsProvider>
//                                     <Radio label="Clinical"
//                                         color="primary"
//                                         size="md"
//                                         checked={clinic}
//                                         onChange={changeClinic}
//                                         sx={{ color: '#1565c0' }}
//                                     />
//                                 </CssVarsProvider>
//                             </Box>
//                             <Box sx={{ m: 1, pt: 0.7 }}>
//                                 <CssVarsProvider>
//                                     <Radio label="Non Clinical"
//                                         color="primary"
//                                         size="md"
//                                         checked={nonClinic}
//                                         onChange={changeNonClinic}
//                                         sx={{ color: '#1565c0' }} />
//                                 </CssVarsProvider>
//                             </Box>
//                         </Box>
//                         : searchFlag === '3' ? <Box sx={{ display: 'flex', }}>
//                             <CRFDashboardDptSelect department={department} setDepartment={setDepartment}
//                                 setdptSec={setdptSec} />
//                             {department !== 0 ?
//                                 <Box sx={{ ml: 0.5 }}>
//                                     <CRFDashboardDptSecSelect dptSec={dptSec} setdptSec={setdptSec} />
//                                 </Box>

//                                 : null}
//                         </Box>
//                             : searchFlag === '4' ? <Box sx={{ display: 'flex', my: 1, ml: 0.5 }}>
//                                 <CssVarsProvider>
//                                     <Input
//                                         startDecorator={
//                                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                                 <AlignHorizontalLeftTwoToneIcon sx={{ height: 18, width: 18, color: '#0063C5' }} />
//                                                 <Typography sx={{ ml: 1, fontSize: '13px', color: '#0063C5' }}>CRF/TMC/</Typography>
//                                             </Box>
//                                         }
//                                         size="sm" placeholder="Search By CRF No."
//                                         autoComplete='off'
//                                         name="searchCrf"
//                                         value={searchCrf}
//                                         onChange={changeCrfNo}
//                                         sx={{ borderRadius: 6, border: '1px solid #64b5f6', width: 250, height: 35, color: '#1565c0' }}
//                                     />
//                                 </CssVarsProvider>

//                             </Box>
//                                 : null}
//                 {(searchFlag === '1' || searchFlag === '2' || searchFlag === '3' || searchFlag === '4') ?
//                     <Box sx={{ pt: 0.9, pl: 1 }}>
//                         <IconButton
//                             sx={{
//                                 px: 2, width: '140px', border: '1px solid #bbdefb',
//                                 fontSize: 13, height: '37px', lineHeight: '1.2',
//                                 color: '#1565c0', bgcolor: 'secondary.light', borderRadius: 6,
//                                 '&:hover': {
//                                     bgcolor: 'secondary.main',
//                                 },
//                                 boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
//                             }}
//                             onClick={SearchData}
//                         >
//                             Search
//                             <SearchTwoToneIcon sx={{ height: 22, width: 22, color: '#1565c0', ml: 1, pt: 0.2 }} />
//                         </IconButton>
//                     </Box>
//                     : null
//                 }
//             </Paper >
//         </Fragment>

//     )
// }

// export default memo(viewAllCrfDetails)