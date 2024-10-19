// import React from 'react'
// import { useState, useCallback, useEffect, memo, Fragment } from 'react'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
// import { Box, Paper } from '@mui/material'
// import CloseIcon from '@mui/icons-material/Close';
// import CusIconButton from 'src/views/Components/CusIconButton'
// import { ToastContainer } from 'react-toastify'
// import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
// import StoreSelectForStore from './StoreSelectForStore'
// import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
// import { IconButton } from '@mui/material';
// import { editicon } from 'src/color/Color';
// import CustomeToolTip from 'src/views/Components/CustomeToolTip';
// import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
// import CrfSubStoreModal from './CrfSubStoreModal'
// import { getPOListSubStorewiseAllList, getSubStorePendingList } from '../ComonComponent/ComonFunctnFile'
// import CustomBackDrop from 'src/views/Components/CustomBackDrop'
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';

// const CrfSubStoreMain = () => {

//     /*** Initializing */
//     const history = useHistory();
//     const [count, setCount] = useState(0)
//     const [open, setOpen] = useState(false)
//     const [radiovalue, setRadioValue] = useState('1')
//     const [disData, setDisData] = useState([])
//     const [substoreSlno, setsubStoreSlno] = useState(0)

//     useEffect(() => {
//         if (substoreSlno !== 0) {
//             setOpen(true)
//             getSubStorePendingList(substoreSlno, setDisData, setOpen);
//         } else {
//             setOpen(false)
//         }
//     }, [substoreSlno, count])


//     //Radio button OnClick function starts
//     const updateRadioClick = useCallback(async (e) => {
//         e.preventDefault()
//         setOpen(false)
//         setRadioValue(e.target.value)
//         if (e.target.value === '1') {
//             getSubStorePendingList(substoreSlno, setDisData, setOpen);
//         } else if (e.target.value === '2') {
//             getPOListSubStorewiseAllList(substoreSlno, setDisData, setOpen)
//         }
//     }, [substoreSlno])

//     const [column] = useState([
//         {
//             headerName: 'Action', minWidth: 40, cellRenderer: params => {
//                 return <IconButton onClick={() => rowSelect(params)}
//                     sx={{ color: editicon, paddingY: 0.5 }} >
//                     <CustomeToolTip title="Approval">
//                         <PublishedWithChangesOutlinedIcon />
//                     </CustomeToolTip>
//                 </IconButton>
//             }
//         },
//         { headerName: "Slno", field: "slno", minWidth: 30 },
//         { headerName: "PO No", field: "po_number", minWidth: 30, filter: "true" },
//         { headerName: "Req.Slno", field: "req_slno", minWidth: 30, filter: "true" },
//         { headerName: "Require Department", field: "req_deptsec", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
//         { headerName: "Requested Department", field: "user_deptsection", minWidth: 250 },
//         { headerName: "PO Date", field: "po_date", minWidth: 120, filter: "true" },
//         { headerName: "Expected Delivery", field: "expected_delivery", minWidth: 120 },
//     ])

//     const [edit, setEdit] = useState(0)
//     const [podetldata, setPodetlData] = useState([])
//     const [okModal, setOkModal] = useState(false)


//     //Data set for edit
//     const rowSelect = useCallback((params) => {
//         const data = params.api.getSelectedRows()
//         setEdit(1)
//         setPodetlData(data[0])
//         setOkModal(true)
//     }, [])

//     const handleClose = useCallback(() => {
//         setEdit(0)
//         setPodetlData([])
//     }, [])

//     //close button function
//     const backtoSetting = useCallback(() => {
//         history.push('/Home')
//     }, [history])


//     return (
//         <Fragment>
//             <CustomBackDrop open={open} text="Please Wait" />

//             {edit === 1 ?
//                 <CrfSubStoreModal open={okModal} podetldata={podetldata} handleClose={handleClose}
//                     count={count} setCount={setCount} /> : null
//             }
//             <ToastContainer />
//             <Box sx={{ height: 35, backgroundColor: "#f0f3f5", display: 'flex' }}>
//                 <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>CRF Store</Box>
//                 <Box>
//                     <CusIconButton size="sm" variant="outlined" color="primary" onClick={backtoSetting} >
//                         <CloseIcon fontSize='small' />
//                     </CusIconButton>
//                 </Box>
//             </Box>
//             <Paper >
//                 <Box sx={{
//                     width: "100%",
//                     pl: 1, pt: 0.5, pr: 1, pb: 0.5, flex: 1,
//                     display: "flex",
//                     flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
//                     justifyContent: 'center',
//                 }}>
//                     <Box sx={{ width: "10%", pt: 1 }}>
//                         <CustomPaperTitle heading="Select Store" />
//                     </Box>
//                     <Box sx={{ width: "30%", pt: 1 }}>
//                         <StoreSelectForStore
//                             substoreSlno={substoreSlno} setsubStoreSlno={setsubStoreSlno}
//                         />
//                     </Box>
//                     <Box sx={{ width: "30%", pl: 2 }}>
//                         <RadioGroup
//                             row
//                             aria-labelledby="demo-row-radio-buttons-group-label"
//                             name="row-radio-buttons-group"
//                             value={radiovalue}
//                             onChange={(e) => updateRadioClick(e)}
//                         >
//                             <FormControlLabel value='1' control={<Radio />} label="Pending" />
//                             <FormControlLabel sx={{ pl: 2 }} value='2' control={<Radio />} label="All List" />
//                         </RadioGroup>
//                     </Box>
//                 </Box>
//             </Paper>
//             {
//                 substoreSlno !== 0 ?
//                     <Box sx={{ height: window.innerHeight - 150, overflow: 'auto', }}>
//                         <Box sx={{ width: "100%", pt: 1 }}>
//                             <CusAgGridForMain
//                                 columnDefs={column}
//                                 tableData={disData}
//                             />
//                         </Box>
//                     </Box>
//                     : null}

//         </Fragment>
//     )
// }

// export default memo(CrfSubStoreMain)