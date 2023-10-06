// import React, { memo, useCallback, useEffect, useState, useMemo } from 'react'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
// import { Box, Typography, Paper, IconButton, Input } from '@mui/material'
// import CardMasterClose from 'src/views/Components/CardMasterClose'
// import TextFieldCustom from 'src/views/Components/TextFieldCustom'
// import CusIconButton from '../../Components/CusIconButton';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import CustomeToolTip from 'src/views/Components/CustomeToolTip'
// import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
// import RefreshIcon from '@mui/icons-material/Refresh';
// import imageCompression from 'browser-image-compression';
// import UploadFileIcon from '@mui/icons-material/UploadFile'
// import Button from '@mui/material/Button';
// import AmCustodianDeptSlOnly from 'src/views/CommonSelectCode/AmCustodianDeptSlOnly'
// import { useDispatch, useSelector } from 'react-redux'
// import { getCustodianDept } from 'src/redux/actions/AmCustodianDept.action'
// import { axioslogin } from 'src/views/Axios/Axios'

// const ItemDetailsEntered = ({ detailArry, setDetailflag }) => {
//     const { am_item_map_slno, assetno
//     } = detailArry

//     const [exist, setExist] = useState(0)
//     useEffect(() => {
//         const checkinsertOrNot = async (am_item_map_slno) => {
//             const result = await axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNot/${am_item_map_slno}`);
//             const { success, data } = result.data
//             if (success === 1) {
//                 setExist(1)
//             }
//             else {
//                 setExist(0)
//             }
//         }
//         checkinsertOrNot(am_item_map_slno)
//     }, [am_item_map_slno])


//     console.log(exist);


//     const dispatch = useDispatch();
//     // Get login user emp_id
//     const id = useSelector((state) => {
//         return state.LoginUserData.empid
//     })

//     console.log(detailArry);
//     const [selectFile, setSelectFile] = useState(null)
//     const [userdata, setUserdata] = useState({
//         searchgrnFromDate: '',
//         searchgrnToDate: '',
//         searchgrnAlready: '',
//         grnNo: '',
//         grndate: ''
//     })

//     //Destructuring
//     const { searchgrnFromDate, searchgrnToDate, searchgrnAlready, grnNo, grndate } = userdata
//     const updateGrnDetails = useCallback((e) => {
//         const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
//         setUserdata({ ...userdata, [e.target.name]: value })
//     }, [userdata])



//     const [custodiandept, setCustodianDept] = useState(0)


//     useEffect(() => {
//         dispatch(getCustodianDept())

//     }, [dispatch])



//     const search = useCallback(() => {

//     }, [])


//     const searchGrn = useCallback(() => {

//     }, [])


//     const uploadFile = async (event) => {
//         const file = event.target.files[0];
//         setSelectFile(file);
//         const options = {
//             maxSizeMB: 1,
//             maxWidthOrHeight: 1920
//         }
//         const compressedFile = await imageCompression(file, options);
//         setSelectFile(compressedFile);
//     };

//     const ViewImage = useCallback(() => {

//     }, [])

//     const grnPostData = useMemo(() => {
//         return {
//             am_Item_map_slno: am_item_map_slno,
//             am_grn_no: grnNo,
//             am_grn_date: grndate,
//             create_user: id
//         }

//     }, [grnNo, grndate, am_item_map_slno, id])

//     const SaveGrnDetails = useCallback((e) => {
//         e.preventDefault()
//         console.log(grnPostData);
//         const InsertItemDetail = async (grnPostData) => {
//             const result = await axioslogin.post('/ItemMapDetails/ItemDetailsInsert', grnPostData)

//         }

//         InsertItemDetail(grnPostData);

//     }, [grnPostData])







//     const BackToPage = useCallback(() => {
//         setDetailflag(0)

//     }, [setDetailflag])




//     return (
//         <Box sx={{
//             display: 'flex', flexGrow: 1, width: '100%', height: window.innerHeight - 85,
//         }}>

//             <CardMasterClose
//                 title="Item Details Add"
//                 close={BackToPage}
//             >

//                 <Box sx={{
//                     display: 'flex', flexDirection: 'column',
//                 }} >

//                     {/* GRN Detail */}
//                     <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >GRN Details</Typography>
//                     <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>

//                         <Box sx={{
//                             display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
//                         }} >
//                             <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
//                                 <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >From Date</Typography>
//                                 <Box>
//                                     <TextFieldCustom
//                                         type="date"
//                                         size="sm"
//                                         name="searchgrnFromDate"
//                                         value={searchgrnFromDate}
//                                         onchange={updateGrnDetails}
//                                     ></TextFieldCustom>
//                                 </Box>
//                             </Box>
//                             <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
//                                 <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >To Date</Typography>
//                                 <Box>
//                                     <TextFieldCustom
//                                         type="date"
//                                         size="sm"
//                                         name="searchgrnToDate"
//                                         value={searchgrnToDate}
//                                         onchange={updateGrnDetails}
//                                     ></TextFieldCustom>
//                                 </Box>
//                             </Box>
//                             <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
//                                 <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={search} >
//                                     <SearchOutlinedIcon fontSize='small' />
//                                 </CusIconButton>
//                             </Box>

//                             <Box sx={{ width: '3%', pl: 5, pt: 4, }}>
//                                 <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >OR</Typography>
//                             </Box>
//                             <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column', ml: 3 }} >
//                                 <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >GRN No</Typography>
//                                 <Box>
//                                     <TextFieldCustom
//                                         type="text"
//                                         size="sm"
//                                         name="searchgrnAlready"
//                                         value={searchgrnAlready}
//                                         onchange={updateGrnDetails}
//                                     ></TextFieldCustom>
//                                 </Box>
//                             </Box>
//                             <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
//                                 <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchGrn} >
//                                     <SearchOutlinedIcon fontSize='small' />
//                                 </CusIconButton>
//                             </Box>
//                         </Box>

//                         <Box sx={{
//                             display: 'flex', flexDirection: 'row', flexWrap: 'wrap',

//                         }} >
//                             <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
//                                 <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >GRN/Temp GRN No</Typography>
//                                 <Box>
//                                     <TextFieldCustom
//                                         type="text"
//                                         size="sm"
//                                         name="grnNo"
//                                         value={grnNo}
//                                         onchange={updateGrnDetails}
//                                     ></TextFieldCustom>
//                                 </Box>
//                             </Box>
//                             <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
//                                 <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >GRN Date</Typography>
//                                 <Box>
//                                     <TextFieldCustom
//                                         type="date"
//                                         size="sm"
//                                         name="grndate"
//                                         value={grndate}
//                                         onchange={updateGrnDetails}
//                                     ></TextFieldCustom>
//                                 </Box>
//                             </Box>
//                             {
//                                 exist === 0 ? <CustomeToolTip title="Save" placement="top" >
//                                     <Box sx={{ width: '3%', pl: 7, pt: 3, }}>
//                                         <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={SaveGrnDetails} >
//                                             <LibraryAddIcon fontSize='small' />
//                                         </CusIconButton>
//                                     </Box>
//                                 </CustomeToolTip> :
//                                     <CustomeToolTip title="Save" placement="top" >
//                                         <Box sx={{ width: '3%', pl: 7, pt: 3, }}>
//                                             <CusIconButton size="sm" variant="outlined"  >
//                                                 <LibraryAddIcon fontSize='small' />
//                                             </CusIconButton>
//                                         </Box>
//                                     </CustomeToolTip>
//                             }
//                             <CustomeToolTip title="Save" placement="top" >
//                                 <Box sx={{ width: '3%', pl: 5, pt: 3, }}>
//                                     <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchGrn} >
//                                         <RefreshIcon fontSize='small' />
//                                     </CusIconButton>
//                                 </Box>
//                             </CustomeToolTip>
//                         </Box>
//                     </Paper>
//                     {/* Bill Details */}
//                     <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >Bill Details</Typography>
//                     <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
//                         <Box sx={{
//                             display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
//                         }} >
//                             <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
//                                 <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Bill No</Typography>
//                                 <Box>
//                                     <TextFieldCustom
//                                         type="date"
//                                         size="sm"
//                                         // name="grnFromDate"
//                                         // value={grnFromDate}
//                                         onchange={updateGrnDetails}
//                                     ></TextFieldCustom>
//                                 </Box>
//                             </Box>
//                             <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
//                                 <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Bill Date</Typography>
//                                 <Box>
//                                     <TextFieldCustom
//                                         type="date"
//                                         size="sm"
//                                         // name="grnToDate"
//                                         // value={grnToDate}
//                                         onchange={updateGrnDetails}
//                                     ></TextFieldCustom>
//                                 </Box>
//                             </Box>
//                             <Box sx={{ display: 'flex', width: '10%', p: 0.5, flexDirection: 'column', ml: 0.5 }} >
//                                 <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Bill Amount</Typography>
//                                 <Box>
//                                     <TextFieldCustom
//                                         type="text"
//                                         size="sm"
//                                         // name="grnAlready"
//                                         // value={grnAlready}
//                                         onchange={updateGrnDetails}
//                                     ></TextFieldCustom>
//                                 </Box>
//                             </Box>
//                             <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
//                                 <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Vendor Details</Typography>
//                                 <Box>
//                                     <TextFieldCustom
//                                         type="date"
//                                         size="sm"
//                                         // name="grnToDate"
//                                         // value={grnToDate}
//                                         onchange={updateGrnDetails}
//                                     ></TextFieldCustom>
//                                 </Box>
//                             </Box>
//                             <Box sx={{ display: 'flex', width: '200px', pt: 1.2 }}>
//                                 <Box sx={{ pt: 1 }}>
//                                     <label htmlFor="file-input">
//                                         <CustomeToolTip title="upload">
//                                             <IconButton color="primary" aria-label="upload file" component="span">
//                                                 <UploadFileIcon />
//                                             </IconButton>
//                                         </CustomeToolTip>
//                                     </label>
//                                     <Input
//                                         id="file-input"
//                                         type="file"
//                                         accept=".jpg, .jpeg, .png, .pdf"
//                                         style={{ display: 'none' }}
//                                         onChange={uploadFile}
//                                     />
//                                 </Box>


//                                 {selectFile !== null ?
//                                     <Box sx={{ pt: 1.5 }}>

//                                         <Button onClick={ViewImage} variant="contained"
//                                             size="small" color="primary">View Image</Button>

//                                     </Box> : null
//                                 }

//                                 {/* {selectFile && <p>{selectFile.name}</p>} */}

//                             </Box>
//                             {

//                             }
//                             <CustomeToolTip title="Save" placement="top" >
//                                 <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
//                                     <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchGrn} >
//                                         <LibraryAddIcon fontSize='small' />
//                                     </CusIconButton>
//                                 </Box>
//                             </CustomeToolTip>
//                             <CustomeToolTip title="Edit" placement="top" >
//                                 <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
//                                     <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchGrn} >
//                                         <LibraryAddIcon fontSize='small' />
//                                     </CusIconButton>
//                                 </Box>
//                             </CustomeToolTip>
//                             <CustomeToolTip title="refresh" placement="top" >
//                                 <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
//                                     <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchGrn} >
//                                         <RefreshIcon fontSize='small' />
//                                     </CusIconButton>
//                                 </Box>
//                             </CustomeToolTip>
//                         </Box>
//                     </Paper>
//                     {/* Device Details */}
//                     <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >Device Details</Typography>
//                     <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
//                         <Box sx={{
//                             display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
//                         }} >
//                             <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
//                                 <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Manufacture slNo</Typography>
//                                 <Box>
//                                     <TextFieldCustom
//                                         type="text"
//                                         size="sm"
//                                         // name="grnAlready"
//                                         // value={grnAlready}
//                                         onchange={updateGrnDetails}
//                                     ></TextFieldCustom>
//                                 </Box>
//                             </Box>
//                             <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
//                                 <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Asset No</Typography>
//                                 <Box>
//                                     <TextFieldCustom
//                                         type="text"
//                                         size="sm"
//                                     // name="assetno"
//                                     // value={assetno}
//                                     ></TextFieldCustom>
//                                 </Box>
//                             </Box>
//                             <Box sx={{ display: 'flex', width: '10%', p: 0.5, flexDirection: 'column', ml: 0.5 }} >
//                                 <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Asset No Old</Typography>
//                                 <Box>
//                                     <TextFieldCustom
//                                         type="text"
//                                         size="sm"
//                                         // name="grnAlready"
//                                         // value={grnAlready}
//                                         onchange={updateGrnDetails}
//                                     ></TextFieldCustom>
//                                 </Box>
//                             </Box>
//                             <CustomeToolTip title="Save" placement="top" >
//                                 <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
//                                     <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchGrn} >
//                                         <LibraryAddIcon fontSize='small' />
//                                     </CusIconButton>
//                                 </Box>
//                             </CustomeToolTip>
//                             <CustomeToolTip title="Save" placement="top" >
//                                 <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
//                                     <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchGrn} >
//                                         <RefreshIcon fontSize='small' />
//                                     </CusIconButton>
//                                 </Box>
//                             </CustomeToolTip>
//                         </Box>
//                     </Paper>



//                     {/*  OwnerShip Details */}
//                     <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >OwnerShip Details</Typography>
//                     <Paper sx={{ overflow: 'auto', border: 1 }}>
//                         <Box sx={{
//                             display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
//                         }} >
//                             <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
//                                 <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Primary Custodian</Typography>
//                                 <Box>
//                                     <AmCustodianDeptSlOnly
//                                         custodiandept={custodiandept}
//                                         setCustodianDept={setCustodianDept}
//                                     />
//                                 </Box>
//                             </Box>
//                             <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
//                                 <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Secondary Custodian</Typography>
//                                 <Box>
//                                     <AmCustodianDeptSlOnly
//                                         custodiandept={custodiandept}
//                                         setCustodianDept={setCustodianDept}
//                                     />
//                                 </Box>
//                             </Box>
//                             <CustomeToolTip title="Save" placement="top" >
//                                 <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
//                                     <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchGrn} >
//                                         <LibraryAddIcon fontSize='small' />
//                                     </CusIconButton>
//                                 </Box>
//                             </CustomeToolTip>
//                             <CustomeToolTip title="Save" placement="top" >
//                                 <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
//                                     <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchGrn} >
//                                         <RefreshIcon fontSize='small' />
//                                     </CusIconButton>
//                                 </Box>
//                             </CustomeToolTip>
//                         </Box>
//                     </Paper>


//                 </Box>
//             </CardMasterClose>

//         </Box>
//     )
// }

// export default memo(ItemDetailsEntered)