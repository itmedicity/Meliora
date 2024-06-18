
import React from 'react'

const CrfNoBasedReport = () => {
    return (
        <div>CrfNoBasedReport</div>
    )
}

export default CrfNoBasedReport
// import React, { useCallback, useState, memo, } from 'react'
// import CardCloseOnly from 'src/views/Components/CardCloseOnly'
// import { useHistory } from 'react-router-dom';
// import CustomBackDrop from 'src/views/Components/CustomBackDrop';
// import { Paper, Box } from '@mui/material';
// import TextFieldCustom from 'src/views/Components/TextFieldCustom';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import CusIconButton from '../../Components/CusIconButton';
// import { warningNotify } from 'src/views/Common/CommonCode';
// import { axioslogin } from 'src/views/Axios/Axios';
// import { CssVarsProvider, Typography } from '@mui/joy'
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
// import ApartmentIcon from '@mui/icons-material/Apartment';
// import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

// const CrfNoBasedReport = () => {

//     const history = useHistory();
//     const [open, setOpen] = useState(false)
//     const [crfNo, setCrfNo] = useState('')
//     const [datahave, setDatahave] = useState(0)
//     const [mainDatas, setMainDatas] = useState([])
//     const [reqTableDis, setReqTableDis] = useState(0)
//     const [detailData, setDetailData] = useState([])
//     const [ApproveTableDis, setApproveTableDis] = useState(0)
//     const [ApproveTableData, setApproveTableData] = useState([])
//     const [poDetlDis, setPoDetlDis] = useState(0)
//     const [podetailData, setpodetailData] = useState([])
//     const [podetailFlag, setPOdetalFalg] = useState(0)
//     const [getpoDetaildata, setgetPodetailData] = useState([])

//     const [datacolflag, setDataColFlag] = useState(0)
//     const [datacolData, setDataColData] = useState([])
//     const [enable, setEnable] = useState(0)
//     const [datacollectdata, setDataCollectData] = useState([])
//     const [colectDetlCheck, setCollectDetailCheck] = useState(true)


//     const clicksearch = useCallback((e) => {
//         setOpen(true)
//         e.preventDefault();
//         const getCRFDetails = async (crfNo) => {
//             const result = await axioslogin.get(`/CrfReports/getCRFNoBased/${crfNo}`)
//             return result.data
//         }


//         const getItemDetails = async (crfNo) => {
//             const result = await axioslogin.get(`/newCRFRegister/getDetailItemList/${crfNo}`)
//             const { success, data } = result.data
//             if (success === 1) {
//                 setReqTableDis(1)
//                 setDetailData(data);
//             } else {
//                 setReqTableDis(0)
//             }
//         }
//         const getApproItemDetails = async (crfNo) => {
//             const result = await axioslogin.get(`/CRFRegisterApproval/getFinalItemListApproval/${crfNo}`)
//             const { succes, dataa } = result.data
//             if (succes === 1) {
//                 const datas = dataa.map((val, index) => {
//                     const obj = {
//                         slno: index + 1,
//                         req_detl_slno: val.req_detl_slno,
//                         req_slno: val.req_slno,
//                         aprox_cost: val.aprox_cost,
//                         item_status: val.item_status,
//                         approved_itemunit: val.approved_itemunit !== null ? val.approved_itemunit : "Not Given",
//                         approve_item_desc: val.approve_item_desc !== null ? val.approve_item_desc : "Not Given",
//                         approve_item_brand: val.approve_item_brand !== '' ? val.approve_item_brand : "Not Given",
//                         approve_item_unit: val.approve_item_unit,
//                         item_qnty_approved: val.item_qnty_approved !== null ? val.item_qnty_approved : "Not Given",
//                         approve_item_unit_price: val.approve_item_unit_price !== null ? val.approve_item_unit_price : "Not Given",
//                         approve_aprox_cost: val.approve_aprox_cost !== null ? val.approve_aprox_cost : "Not Given",
//                         item_status_approved: val.item_status_approved,
//                         approve_item_status: val.approve_item_status,
//                         approve_item_delete_who: val.approve_item_delete_who,
//                         uom_name: val.uom_name,
//                         approve_item_specification: val.approve_item_specification !== '' ? val.approve_item_specification : "Not Given",
//                         old_item_slno: val.old_item_slno !== null ? val.old_item_slno : "",
//                         item_slno: val.item_slno
//                     }
//                     return obj
//                 })
//                 setApproveTableDis(1)
//                 setApproveTableData(datas);
//             } else {
//                 setApproveTableDis(0)
//                 setApproveTableData([])
//             }
//         }

//         const getPODetails = async (crfNo) => {
//             const result = await axioslogin.get(`/newCRFPurchase/getPOList/${crfNo}`)
//             const { success, data } = result.data
//             if (success === 1) {

//                 const datas = data && data.map((val) => {
//                     return {
//                         req_slno: val.req_slno,
//                         po_number: val.po_number,
//                         po_date: val.po_date,
//                         po_status: 1,
//                         expected_delivery: val.expected_delivery,
//                         supply_store: val.supply_store,
//                         sub_storename: val.sub_store_name,
//                         store_name: val.main_store
//                     }
//                 })

//                 setgetPodetailData(datas)
//                 setPOdetalFalg(1)

//             }
//             else {
//                 setgetPodetailData([])
//             }
//         }

//         const checkDataCollectComplete = async (crfNo) => {
//             const result = await axioslogin.get(`/CRFRegisterApproval/DataCollectComplete/${crfNo}`)
//             const { success, data } = result.data
//             if (success === 1) {
//                 const xx = data && data.filter((val) => val.crf_dept_status !== 1)
//                 const yy = data && data.filter((val) => val.crf_dept_status === 1)
//                 if (xx.length !== 0) {
//                     setEnable(1)
//                     setCollectDetailCheck(true)
//                     const datas = xx.map((val) => {
//                         const obj = {
//                             crf_dept_remarks: val.crf_dept_remarks,
//                             datagive_user: val.datagive_user,
//                             data_entered: val.data_entered !== null ? val.data_entered.toLowerCase() : '',
//                             reqest_one: val.reqest_one,
//                             req_user: val.req_user !== null ? val.req_user.toLowerCase() : '',
//                             create_date: val.create_date,
//                             update_date: val.update_date,
//                             crf_req_remark: val.crf_req_remark,
//                             data_coll_image_status: val.data_coll_image_status,
//                             crf_data_collect_slno: val.crf_data_collect_slno
//                         }
//                         return obj
//                     })
//                     setDataCollectData(datas)
//                 }
//                 else {
//                     setEnable(0)
//                     setCollectDetailCheck(false)
//                     setDataCollectData([])
//                 }
//                 if (yy.length !== 0) {
//                     setDataColFlag(1)
//                     const datas = yy.map((val) => {
//                         const obj = {
//                             crf_dept_remarks: val.crf_dept_remarks,
//                             datagive_user: val.datagive_user,
//                             data_entered: val.data_entered !== null ? val.data_entered.toLowerCase() : '',
//                             reqest_one: val.reqest_one,
//                             req_user: val.req_user !== null ? val.req_user.toLowerCase() : '',
//                             create_date: val.create_date,
//                             update_date: val.update_date,
//                             crf_req_remark: val.crf_req_remark,
//                             data_coll_image_status: val.data_coll_image_status,
//                             crf_data_collect_slno: val.crf_data_collect_slno
//                         }
//                         return obj
//                     })
//                     setDataColData(datas)

//                 }
//                 else {
//                     setDataColFlag(0)
//                     setDataColData([])
//                 }
//             }
//             else {
//                 setEnable(0)
//             }
//         }


//         if (crfNo !== '') {
//             getCRFDetails(crfNo).then((val) => {
//                 const { success, data, message } = val
//                 if (success === 1) {
//                     setOpen(false)
//                     setDatahave(1)
//                     setMainDatas(data[0])
//                     checkDataCollectComplete(crfNo)
//                     getItemDetails(crfNo)
//                     getApproItemDetails(crfNo)
//                     getPODetails(crfNo)

//                 }
//                 else {
//                     setOpen(false)
//                     warningNotify(message)
//                 }

//             })
//         } else {
//             setOpen(false)
//             warningNotify("Please enter CRF Number before search")
//         }
//         // console.log(crfNo);
//     }, [crfNo])

//     console.log(mainDatas);
//     const backToSetting = useCallback(() => {
//         history.push(`/Home/Reports`)
//     }, [history])


//     return (
//         <CardCloseOnly
//             title='CRF No Based Report'
//             close={backToSetting}
//         >
//             <CustomBackDrop open={open} text="Please Wait" />

//             <Box
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                 }}
//             >


//                 <Box sx={{
//                     width: "100%",
//                     display: "flex",
//                     flexDirection: 'row',
//                     justifyContent: 'center'
//                 }}>
//                     <Box sx={{
//                         width: '10%',
//                         ml: 0.5, mt: 0.5
//                     }}>
//                         <Typography>Enter CRF Number</Typography>
//                     </Box>
//                     <Box sx={{
//                         width: '10%',
//                         // height: 15,
//                         mb: 1, pr: 3
//                     }}>
//                         <TextFieldCustom
//                             type="text"
//                             size="sm"
//                             name="crfNo"
//                             value={crfNo}
//                             // onchange=(e)=>{setCrfNo(e.target.value)}
//                             onchange={(e) => setCrfNo(e.target.value)}
//                         />
//                     </Box>
//                     <Box sx={{
//                         width: '20%',

//                     }}>
//                         <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={clicksearch} >
//                             <SearchOutlinedIcon fontSize='small' />
//                         </CusIconButton>
//                     </Box>
//                 </Box>

//                 {
//                     datahave !== 0 ?
//                         <Box sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             p: 2, borderRadius: 0.5,
//                             borderBlockColor: "gray"


//                         }} >

//                             <Box sx={{ width: "100%", mt: 0, display: "flex", flexDirection: "column" }}>
//                                 <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
//                                     <Box sx={{
//                                         width: "100%", display: "flex",
//                                         flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
//                                     }}>
//                                         <Box sx={{
//                                             width: "100%", display: "flex", p: 0.5,
//                                             flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
//                                         }}>
//                                             <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 1 }}>
//                                                 <CssVarsProvider>
//                                                     <Typography sx={{ fontSize: 15 }}>Request No: CRF/TMC/{mainDatas.req_slno}</Typography>
//                                                 </CssVarsProvider>
//                                             </Box>
//                                             <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 4 }}>
//                                                 <CssVarsProvider>
//                                                     <Typography sx={{ fontSize: 15 }}>Req.Date: {mainDatas.req_date}</Typography>
//                                                 </CssVarsProvider>
//                                             </Box>

//                                             <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 4 }}>
//                                                 <CssVarsProvider>
//                                                     <Typography sx={{ fontSize: 15 }}>Department:{mainDatas.dept_name}</Typography>
//                                                 </CssVarsProvider>
//                                             </Box>
//                                             <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 4 }}>
//                                                 <CssVarsProvider>
//                                                     <Typography sx={{ fontSize: 15 }}
//                                                     >Department Sec: {mainDatas.sec_name}</Typography>
//                                                 </CssVarsProvider>
//                                             </Box>
//                                             <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 4 }}>
//                                                 <CssVarsProvider>
//                                                     <Typography sx={{ fontSize: 15 }}
//                                                     >Req.Department Sec: {mainDatas.sec_name}</Typography>
//                                                 </CssVarsProvider>
//                                             </Box>
//                                         </Box>
//                                         <Box sx={{
//                                             width: "100%", display: "flex", p: 0.5,
//                                             flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
//                                         }}>
//                                             <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 1 }}>
//                                                 <CssVarsProvider>
//                                                     <Typography sx={{ fontSize: 15 }}>Category: {mainDatas.category}</Typography>
//                                                 </CssVarsProvider>
//                                             </Box>
//                                             <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 1 }}>
//                                                 <CssVarsProvider>
//                                                     <Typography sx={{ fontSize: 15 }}>Location: {mainDatas.location}</Typography>
//                                                 </CssVarsProvider>
//                                             </Box>

//                                             <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 1 }}>
//                                                 <CssVarsProvider>
//                                                     <Typography sx={{ fontSize: 15 }}>Emergency:{mainDatas.emergency_flag === 1 ? "Yes" : "No"}</Typography>
//                                                 </CssVarsProvider>
//                                             </Box>
//                                             <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 1 }}>
//                                                 <CssVarsProvider>
//                                                     <Typography sx={{ fontSize: 15 }}
//                                                     >Expected Date: {mainDatas.expected_date}</Typography>
//                                                 </CssVarsProvider>
//                                             </Box>
//                                             <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 4 }}>
//                                                 <CssVarsProvider>
//                                                     <Typography sx={{ fontSize: 15 }}
//                                                     >Req.User: {mainDatas.req_user}</Typography>
//                                                 </CssVarsProvider>
//                                             </Box>
//                                         </Box>
//                                     </Box>
//                                 </Paper>
//                             </Box>





//                         </Box>
//                         : null

//                 }








//             </Box>


//         </CardCloseOnly >
//     )
// }

// export default memo(CrfNoBasedReport)