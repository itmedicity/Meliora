import React from 'react'

const CrfRequestMaster = () => {
    return (
        <div>CrfRequestMaster</div>
    )
}

export default CrfRequestMaster





// import { Box, Paper, IconButton, } from '@mui/material'
// import React, { useCallback, memo, useState, Fragment } from 'react'
// import CardMaster from 'src/views/Components/CardMaster'
// import { useHistory } from 'react-router-dom'
// import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
// import CustomTextarea from 'src/views/Components/CustomTextarea'
// import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
// import TextFieldCustom from 'src/views/Components/TextFieldCustom'
// import { MdOutlineAddCircleOutline } from 'react-icons/md';
// // import { axioslogin } from 'src/views/Axios/Axios'
// import { warningNotify } from 'src/views/Common/CommonCode'
// // import { useDispatch, } from 'react-redux'
// // import ReqRegisterTable from './ReqRegisterTable'
// // import { getInchargeHodData } from 'src/redux/actions/InchargeHodChecks.action'
// // import ReqRegistItemCmpt from './ReqRegistItemCmpt'
// import { editicon } from 'src/color/Color'
// import DeleteIcon from '@mui/icons-material/Delete';
// // import EditIcon from '@mui/icons-material/Edit';
// // import CusCheckBox from 'src/views/Components/CusCheckBox'
// import CustomeToolTip from 'src/views/Components/CustomeToolTip';
// import { format } from 'date-fns'
// // import _ from 'underscore'
// import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept'
// // import { getDeptSecInchHod } from 'src/redux/actions/DeptSecInchHod.action'
// // import imageCompression from 'browser-image-compression';
// // import UploadFileIcon from '@mui/icons-material/UploadFile'
// // import CloseIcon from '@mui/icons-material/Close';
// import CrfReqDetailCmpnt from './CrfReqDetailCmpnt'
// import AssetUOMSelect from 'src/views/CommonSelectCode/AssetUOMSelect'
// // import ReqImageDisplayModal from './ReqImageDisplayModal'
// // import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';

// const CrfRequestMaster = () => {

//     /*** Initializing */
//     const history = useHistory();
//     // const dispatch = useDispatch();

//     //state for Actual requirement
//     const [actual_require, setActual_require] = useState('')
//     // const [selectFile, setSelectFile] = useState([])
//     const updateactual_require = useCallback((e) => {
//         setActual_require(e.target.value)
//     }, [])
//     //state for Needed
//     const [needed, setNeeded] = useState('')
//     const updateNeeded = useCallback((e) => {
//         setNeeded(e.target.value)
//     }, [])
//     //state for location
//     const [category, setCategory] = useState('')
//     const updateCategory = useCallback((e) => {
//         setCategory(e.target.value)
//     }, [])
//     //state for location
//     const [location, setLocation] = useState('')
//     const updateLocation = useCallback((e) => {
//         setLocation(e.target.value)
//     }, [])
//     //state for Remarks
//     // const [remarks, setRemarks] = useState('')
//     // const updateRemarks = useCallback((e) => {
//     //     setRemarks(e.target.value)
//     // }, [])
//     // Intializing variables
//     const [dept, setdept] = useState(0)
//     const [deptSec, setdeptSec] = useState(0)
//     const [tableDis, setTableDis] = useState(0)
//     const [startdate, setStartdate] = useState(format(new Date(), "yyyy-MM-dd"))
//     // const [count, setCount] = useState(0)
//     const [value, setValue] = useState(0)
//     // const [reqSlno, setReqSlno] = useState(0)
//     // const [msgShow, setMsgShow] = useState(0)
//     // const [estimate, setEstimate] = useState(false)
//     const [itemslno, setItemSlno] = useState(1)
//     //Items store array
//     const [dataPost, setdataPost] = useState([])


//     //Item details initialization
//     const [itemstate, setItemState] = useState({
//         item_desc: '',
//         item_brand: '',
//         item_qty: 0,
//         item_spec: '',
//     })
//     //Destructuring
//     const { item_desc, item_brand, item_qty, item_spec } = itemstate
//     const updateItemState = useCallback((e) => {
//         const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
//         setItemState({ ...itemstate, [e.target.name]: value })
//     }, [itemstate])
//     //redux for geting login id
//     // const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
//     // const deptsec = useSelector((state) => state.LoginUserData.empsecid, _.isEqual)
//     // const empdept = useSelector((state) => state.LoginUserData.empdept, _.isEqual)

//     const [uom, setUOM] = useState(0)
//     const [uomName, setUomName] = useState('')
//     const [unitprice, setUnitPrice] = useState(0)
//     const [approx_cost, setapprox_cost] = useState(0)


//     const updateUnitPrice = useCallback((e) => {

//         if (item_qty !== 0) {
//             setUnitPrice(e.target.value)
//             setapprox_cost(item_qty * e.target.value)
//         }
//         else {
//             warningNotify("Please Enter quantity before enter unit price")
//         }

//     }, [item_qty])



//     const updateExpectedDate = (e) => {
//         setStartdate(e.target.value)
//     }
//     const AddItem = useCallback(() => {

//         if (item_desc !== '' && item_qty !== 0) {
//             if (value === 0) {
//                 setTableDis(1)
//                 const newdata = {
//                     id: Math.ceil(Math.random() * 1000),
//                     item_slno: itemslno,
//                     item_desc: item_desc,
//                     item_brand: item_brand,
//                     item_qty: parseInt(item_qty),
//                     item_unit: uom,
//                     uomName: uomName,
//                     item_spec: item_spec,
//                     item_unitprice: unitprice,
//                     approx_cost: parseInt(approx_cost)
//                 }
//                 const datass = [...dataPost, newdata]
//                 setdataPost(datass)

//                 const resetarrray = {
//                     item_desc: '',
//                     item_brand: '',
//                     item_qty: 0,
//                     item_spec: ''

//                 }
//                 setItemState(resetarrray)
//                 setItemSlno(itemslno + 1)
//                 setUnitPrice(0)
//                 setapprox_cost(0)
//                 setUOM(0)
//             }

//         }
//         else {
//             warningNotify("Item Description and Quantity are mandatory")
//         }
//     }, [value, itemslno, item_desc, item_brand, item_qty, uom, uomName, item_spec, unitprice, approx_cost, dataPost])

//     // console.log(dataPost);

//     const submitRequest = useCallback(() => {







//     }, [])


//     //close button function
//     const backtoSetting = useCallback(() => {
//         history.push('/Home')
//     }, [history])

//     //fn for entire state referesh
//     const refreshWindow = useCallback(() => {
//         // reset()
//     }, [])

//     const [columnReqDetails] = useState([
//         { headerName: "Item Slno", field: "item_slno" },
//         { headerName: "Description", field: "item_desc", autoHeight: true, wrapText: true, width: 250, filter: "true" },
//         { headerName: "Brand", field: "item_brand", autoHeight: true, wrapText: true, width: 250, filter: "true" },
//         { headerName: "Unit", field: "uomName" },
//         { headerName: "Quantity", field: "item_qty" },
//         { headerName: "Specification", field: "item_spec" },
//         { headerName: "Approximate Cost", field: "approx_cost" },
//         // {
//         //     headerName: 'Edit', width: 80, cellRenderer: params =>
//         //         <IconButton onClick={() => editSelect(params)}
//         //             sx={{ color: editicon, pt: 0 }} >
//         //             <CustomeToolTip title="Edit">
//         //                 <EditIcon size={15} />
//         //             </CustomeToolTip>
//         //         </IconButton>
//         // },
//         {
//             headerName: 'Delete', width: 80, cellRenderer: params =>
//                 <IconButton onClick={() => deleteSelect(params)}
//                     sx={{ color: editicon, pt: 0 }} >
//                     <CustomeToolTip title="Edit">
//                         <DeleteIcon size={15} />
//                     </CustomeToolTip>
//                 </IconButton>
//         },
//     ])


//     const deleteSelect = useCallback((params) => {

//         // const data = params.api.getSelectedRows()

//         // const { id } = data[0]


//         // const newdata = dataPost.filter((val) => {
//         //     return val.id !== id
//         // })

//         // console.log(newdata);
//         // setdataPost(newdata)


//     }, [dataPost])
//     return (
//         <Fragment>
//             <Box sx={{ height: window.innerHeight - 85, overflow: 'auto' }}>
//                 <CardMaster
//                     title="Common Request Form"
//                     submit={submitRequest}
//                     close={backtoSetting}
//                     refresh={refreshWindow}
//                 >

//                     <Box sx={{ width: "100%" }}>

//                         {/* 1st row */}
//                         <Paper sx={{
//                             width: '100%',
//                             mt: 0.8
//                         }} variant='outlined'>
//                             <Box sx={{
//                                 width: "100%",
//                                 display: "flex",
//                                 flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
//                             }}>
//                                 <Box sx={{
//                                     width: "100%",
//                                     display: "flex",
//                                     flexDirection: "column"
//                                 }}>
//                                     <CustomPaperTitle heading="Requested Department Details" />
//                                     <Box sx={{
//                                         width: "100%",
//                                         p: 1,
//                                         display: "flex",
//                                         flexDirection: 'row'
//                                     }}>
//                                         <Box sx={{
//                                             width: "100%",
//                                             pr: 1
//                                         }}>
//                                             <DepartmentSelect value={dept} setValue={setdept} />
//                                         </Box>

//                                         <Box sx={{
//                                             width: "100%",
//                                             pr: 1
//                                         }}>
//                                             <DeptSecUnderDept value={deptSec} setValue={setdeptSec} dept={dept} />
//                                         </Box>
//                                     </Box>
//                                 </Box>
//                                 <Box sx={{
//                                     width: "60%",
//                                     display: "flex",
//                                     flexDirection: "column"
//                                 }}>
//                                     <CustomPaperTitle heading="Category" />
//                                     <TextFieldCustom
//                                         type="text"
//                                         size="sm"
//                                         name="category"
//                                         value={category}
//                                         onchange={updateCategory}
//                                     />
//                                 </Box>
//                                 <Box sx={{
//                                     width: "100%",
//                                     display: "flex",
//                                     flexDirection: "column",
//                                     pl: 1, pr: 1
//                                 }}>
//                                     <CustomPaperTitle heading="Location" />
//                                     <TextFieldCustom
//                                         type="text"
//                                         size="sm"
//                                         name="location"
//                                         value={location}
//                                         onchange={updateLocation}
//                                     />
//                                 </Box>
//                             </Box>
//                         </Paper>

//                         {/* 2nd Row */}
//                         <Paper sx={{
//                             width: '100%',
//                             mt: 0.8
//                         }} variant='outlined'>

//                             <Box sx={{
//                                 width: "100%",
//                                 display: "flex",
//                                 flexDirection: "column"
//                             }}>
//                                 <CustomPaperTitle heading="Estimate/Approximate/Requirement Details" />
//                                 <Box sx={{
//                                     width: "100%",
//                                     p: 1,
//                                     display: "flex",
//                                     flexDirection: 'row'
//                                 }}>
//                                     <Box sx={{
//                                         width: "55%",
//                                         display: "flex",
//                                         pr: 1,
//                                         flexDirection: "column"
//                                     }}>
//                                         <CustomPaperTitle heading="Item Description" mandtry={1} />
//                                         <TextFieldCustom
//                                             type="text"
//                                             size="sm"
//                                             name="item_desc"
//                                             value={item_desc}
//                                             onchange={updateItemState}
//                                         />
//                                     </Box>

//                                     <Box sx={{
//                                         width: "45%",
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         pr: 1
//                                     }}>
//                                         <CustomPaperTitle heading="Item Brand" />
//                                         <TextFieldCustom
//                                             type="text"
//                                             size="sm"
//                                             name="item_brand"
//                                             value={item_brand}
//                                             onchange={updateItemState}
//                                         />
//                                     </Box>

//                                     <Box sx={{
//                                         width: "7%",
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         pr: 1
//                                     }}>
//                                         <CustomPaperTitle heading="Quantity" mandtry={1} />
//                                         <TextFieldCustom
//                                             type="number"
//                                             size="sm"
//                                             name="item_qty"
//                                             value={item_qty}
//                                             onchange={updateItemState}
//                                         />
//                                     </Box>
//                                     <Box sx={{
//                                         width: "13%",
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         pr: 1
//                                     }}>
//                                         <CustomPaperTitle heading="Unit" />
//                                         {/* <TextFieldCustom
//                                             type="text"
//                                             size="sm"
//                                             name="item_unit"
//                                             value={item_unit}
//                                             onchange={updateItemState}
//                                         /> */}
//                                         <AssetUOMSelect
//                                             uom={uom}
//                                             setUOM={setUOM}
//                                             setName={setUomName}
//                                             uomName={uomName} />
//                                     </Box>
//                                     <Box sx={{
//                                         width: "60%",
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         pr: 1
//                                     }}>
//                                         <CustomPaperTitle heading="Specification" />
//                                         <TextFieldCustom
//                                             type="text"
//                                             size="sm"
//                                             name="item_spec"
//                                             value={item_spec}
//                                             onchange={updateItemState}
//                                         />
//                                     </Box>
//                                     <Box sx={{
//                                         width: "13%",
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         pr: 1
//                                     }}>

//                                         <CustomPaperTitle heading="Unit Price" />
//                                         <TextFieldCustom
//                                             type="number"
//                                             size="sm"
//                                             name="unitprice"
//                                             value={unitprice}
//                                             onchange={updateUnitPrice}
//                                         />

//                                     </Box>
//                                     <Box sx={{
//                                         width: "7%",
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         pr: 1
//                                     }}>
//                                         <CustomPaperTitle heading="Approx.Cost" />
//                                         <TextFieldCustom
//                                             type="number"
//                                             size="sm"
//                                             name="approx_cost"
//                                             value={approx_cost}
//                                             disabled={true}
//                                         />
//                                     </Box>
//                                     <Box sx={{
//                                         width: "7%",
//                                         pt: 2
//                                     }}>
//                                         <IconButton variant="outlined" color="primary" onClick={AddItem}>
//                                             <MdOutlineAddCircleOutline size={30} />
//                                         </IconButton>
//                                     </Box>
//                                 </Box>
//                             </Box>
//                             {tableDis === 1 ? <Box sx={{
//                                 width: "100%",
//                                 display: "flex",
//                                 flexDirection: "column", p: 1
//                             }}>

//                                 <CrfReqDetailCmpnt
//                                     columnDefs={columnReqDetails}
//                                     tableData={dataPost}
//                                 // detldept={detldept}
//                                 />
//                             </Box> : null}

//                         </Paper>

//                         {/* 3rd Row */}
//                         <Paper sx={{
//                             width: '100%',
//                             mt: 0.8
//                         }} variant='outlined'>
//                             <Box sx={{
//                                 width: "100%",
//                                 display: "flex",
//                                 flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
//                             }}>
//                                 <Box sx={{
//                                     width: "100%",
//                                     display: "flex",
//                                     flexDirection: "column"
//                                 }}>
//                                     <CustomPaperTitle heading="Purpose" />
//                                     <Box sx={{
//                                         display: 'flex',
//                                         p: 0.5,
//                                         width: '100%'
//                                     }} >
//                                         <CustomTextarea
//                                             required
//                                             type="text"
//                                             size="sm"
//                                             style={{
//                                                 width: "100%",
//                                                 height: 70,
//                                                 boardColor: "#E0E0E0"
//                                             }}
//                                             value={actual_require}
//                                             onchange={updateactual_require}
//                                         />
//                                     </Box>
//                                 </Box>
//                                 <Box sx={{
//                                     width: "100%",
//                                     display: "flex",
//                                     flexDirection: "column"
//                                 }}>
//                                     <CustomPaperTitle heading="Justification for the need" />
//                                     <Box sx={{
//                                         display: 'flex',
//                                         p: 0.5,
//                                         width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
//                                     }} >
//                                         <CustomTextarea
//                                             required
//                                             type="text"
//                                             size="sm"
//                                             style={{
//                                                 width: "100%",
//                                                 height: 70,
//                                             }}
//                                             value={needed}
//                                             onchange={updateNeeded}
//                                         />
//                                     </Box>
//                                 </Box>
//                             </Box>
//                         </Paper>

//                         {/* 4th Row */}


//                         <Paper sx={{
//                             width: '100%',
//                             mt: 0.8
//                         }} variant='outlined'>
//                             <Box sx={{
//                                 width: "80%",
//                                 display: "flex",
//                                 flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
//                             }}>
//                                 <Box sx={{
//                                     width: "20%",
//                                     display: "flex",
//                                     flexDirection: "column"
//                                 }}>
//                                     <CustomPaperTitle heading="Expected Date" />
//                                     <Box sx={{
//                                         display: 'flex',
//                                         p: 0.5,
//                                         width: '100%'
//                                     }} >
//                                         <TextFieldCustom
//                                             type="date"
//                                             size="sm"
//                                             name="startdate"
//                                             value={startdate}
//                                             onchange={updateExpectedDate}
//                                         />
//                                     </Box>
//                                 </Box>
//                             </Box>
//                         </Paper>



//                     </Box>
//                 </CardMaster>
//             </Box>
//         </Fragment>
//     )
// }

// export default memo(CrfRequestMaster)