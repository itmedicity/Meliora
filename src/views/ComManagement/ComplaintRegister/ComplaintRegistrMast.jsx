import React from 'react'

const ComplaintRegistrMast = () => {
    return (
        <div>ComplaintRegistrMast</div>
    )
}

export default ComplaintRegistrMast


// import { Box, Grid, Paper, TextareaAutosize } from '@mui/material'
// import React, { useCallback, useEffect, useState, useMemo } from 'react'
// import DeptSectionSelect from 'src/views/CommonSelectCode/DeptSectionSelect'
// import CardMaster from 'src/views/Components/CardMaster'
// import TextFieldCustom from 'src/views/Components/TextFieldCustom'
// import { useHistory } from 'react-router-dom'
// import RequestTypeSelect from 'src/views/CommonSelectCode/RequestTypeSelect'
// import { useDispatch, useSelector } from 'react-redux'
// import { getComplaintDept } from 'src/redux/actions/ComplaintDept.action'
// import CusCheckBox from 'src/views/Components/CusCheckBox'
// import ComplaintTypeSelect from 'src/views/CommonSelectCode/ComplaintTypeSelect'
// import HicPolicySelect from 'src/views/CommonSelectCode/HicPolicySelect'
// import { axioslogin } from 'src/views/Axios/Axios'
// import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
// import ComplaintRegTable from './ComplaintRegTable'
// import { getRequesttype } from 'src/redux/actions/RequestType.action';
// import { CssVarsProvider } from '@mui/joy'
// import Typography from '@mui/joy/Typography';
// import { fontWeight } from '@mui/joy/styles/styleFunctionSx'
// import { getComplainttype } from 'src/redux/actions/ComplaintType.action';
// import List from '@mui/joy/List';
// import ListItem from '@mui/joy/ListItem';

// const ComplaintRegistrMast = () => {
//     /*** Initializing */
//     const history = useHistory();
//     const dispatch = useDispatch();
//     const [deptSec, SetDeptSec] = useState(0)
//     const [requestType, SetReqType] = useState(0)
//     const [comType, setComType] = useState(0)
//     const [hic, setHic] = useState(0)
//     const [crical, setCritical] = useState(false)
//     const [high, setHigh] = useState(false)
//     const [medium, setMedium] = useState(false)
//     const [priority, setpriority] = useState(0)
//     const [disable, setDisable] = useState(true)
//     const [count, setCount] = useState(0)
//     const [value, setValue] = useState(0)
//     const [comdept, setCompdept] = useState(0)
//     const [complaint, setComplaint] = useState({
//         compalint_desc: '',
//         complaint_slno: 0
//     })
//     /*** Destructuring */
//     const { compalint_desc, complaint_slno } = complaint
//     const updateCompReg = useCallback((e) => {
//         const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
//         setComplaint({ ...complaint, [e.target.name]: value })
//     }, [complaint])

//     /*** Priority seting Check box */
//     const getCritical = useCallback((e) => {
//         if (e.target.checked === true) {
//             setCritical(true)
//             setpriority(1)
//             setHigh(false)
//             setMedium(false)
//         }
//         else {
//             setCritical(false)
//             setHigh(false)
//             setMedium(false)
//             setpriority(0)
//         }
//     })
//     const getHigh = useCallback((e) => {
//         if (e.target.checked === true) {
//             setHigh(true)
//             setpriority(2)
//             setCritical(false)
//             setMedium(false)
//         }
//         else {
//             setHigh(false)
//             setCritical(false)
//             setMedium(false)
//             setpriority(0)
//         }
//     }, [])
//     const getMedium = useCallback((e) => {
//         if (e.target.checked === true) {
//             setMedium(true)
//             setpriority(3)
//             setHigh(false)
//             setCritical(false)
//         }
//         else {
//             setMedium(false)
//             setHigh(false)
//             setCritical(false)
//             setpriority(0)
//         }
//     })
//     const [checkHic, setChechHic] = useState(false)
//     const getHicCheck = useCallback((e) => {
//         if (e.target.checked === true) {
//             setChechHic(true)
//             setDisable(false)
//         }
//         else {
//             setChechHic(false)
//             setDisable(true)
//         }
//     })

//     /**getComplaintdept -state update function of reducer
//      * complaintdeptList- initial state of reducer function
//      *complaintdeptdata is used to list select box items by using map
//      */
//     const complaintdeptdata = useSelector((state) => {
//         return state.getComplaintDept.complaintdeptList || 0
//     })

//     //getComplaintdept function is used to update data in complaintdepartment redux
//     useEffect(() => {
//         dispatch(getComplaintDept())
//     }, [dispatch])

//     const [complaintdept, setComplaintDept] = useState({
//         BIOMEDICAL: false,
//         MAINTENANCE: false,
//         IT: false,
//         HOUSEKEEPING: false,
//         COMMON: false
//     })
//     const { BIOMEDICAL, MAINTENANCE, IT, HOUSEKEEPING, COMMON } = complaintdept
//     const getValue = useCallback((e) => {

//         const ob1 = {
//             BIOMEDICAL: false,
//             MAINTENANCE: false,
//             IT: false,
//             HOUSEKEEPING: false,
//             COMMON: false
//         }
//         const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
//         setComplaintDept({ ...ob1, [e.target.name]: value })
//     }, [complaintdept])




//     const postdata = useMemo(() => {
//         return {
//             complaint_desc: compalint_desc,
//             cm_dept_sec: deptSec,
//             cm_request_type: requestType,
//             cm_complaint_dept: comdept,
//             cm_complaint_type: comType,
//             cm_priority: priority,
//             cm_hic_policy: hic
//         }
//     }, [compalint_desc, deptSec, requestType, comType, hic, priority])
//     //Data set for edit
//     const rowSelect = useCallback((params) => {
//         setValue(1);
//         const data = params.api.getSelectedRows()
//         const { cm_complaint_dept, cm_complaint_type, cm_dept_sec, cm_hic_policy, cm_priority,
//             cm_request_type, complaint_desc, complaint_slno } = data[0];
//         const frmdata = {
//             compalint_desc: complaint_desc,
//             complaint_slno: complaint_slno
//         }
//         console.log(cm_complaint_type);
//         // console.log(cm_priority);
//         setComplaint(frmdata)
//         SetDeptSec(cm_dept_sec)
//         SetReqType(cm_request_type)
//         setComType(cm_complaint_type)
//         setHic(cm_hic_policy)
//         setpriority(cm_priority)
//         setCompdept(cm_complaint_dept)
//         if (cm_priority === 1) {
//             setCritical(true)
//             setHigh(false)
//             setMedium(false)
//         } else if (cm_priority === 2) {
//             setHigh(true)
//             setCritical(false)
//             setMedium(false)
//         }
//         else if (cm_priority === 3) {
//             setMedium(true)
//             setCritical(false)
//             setHigh(false)
//         } else {
//             setCritical(false)
//             setHigh(false)
//             setMedium(false)
//         }

//         const checkset = {
//             BIOMEDICAL: cm_complaint_dept === 1 ? true : false,
//             MAINTENANCE: cm_complaint_dept === 2 ? true : false,
//             IT: cm_complaint_dept === 3 ? true : false,
//             HOUSEKEEPING: cm_complaint_dept === 4 ? true : false,
//             COMMON: cm_complaint_dept === 5 ? true : false

//         }
//         setComplaintDept(checkset)

//     }, [])


//     const patchdata = useMemo(() => {
//         return {
//             complaint_desc: compalint_desc,
//             cm_dept_sec: deptSec,
//             cm_request_type: requestType,
//             cm_complaint_dept: comdept,
//             cm_complaint_type: comType,
//             cm_priority: priority,
//             cm_hic_policy: hic,
//             complaint_slno: complaint_slno
//         }
//     }, [compalint_desc, deptSec, requestType, comType, priority, hic, complaint_slno])



//     /*** usecallback function for form submitting */
//     const submitComplaint = useCallback((e) => {
//         e.preventDefault();
//         const resetFrorm = {
//             compalint_desc: '',
//             complaint_slno: 0
//         }

//         const reset = () => {
//             setDisable(true)
//             setpriority(0)
//             SetDeptSec(0)
//             SetReqType(0)
//             setComType(0)
//             setHic(0)
//             setCritical(false)
//             setHigh(false)
//             setMedium(false)
//         }

//         /***    * insert function for use call back     */
//         const InsertFun = async (postdata) => {
//             const result = await axioslogin.post('/complaintreg', postdata);
//             const { message, success } = result.data;
//             if (success === 1) {
//                 succesNotify(message)
//                 setCount(count + 1);
//                 setComplaint(resetFrorm);
//                 reset()
//             } else if (success === 0) {
//                 infoNotify(message.sqlMessage);
//             }
//             else {
//                 infoNotify(message)
//             }
//         }

//         /***  * update function for use call back     */
//         const updateFun = async (patchdata) => {
//             const result = await axioslogin.patch('/complaintreg', patchdata);
//             const { message, success } = result.data;
//             if (success === 2) {
//                 succesNotify(message)
//                 setCount(count + 1);
//                 setComplaint(resetFrorm);
//                 reset()
//             } else if (success === 0) {
//                 infoNotify(message);
//             }
//             else {
//                 infoNotify(message)
//             }
//         }

//         if (value === 0) {
//             InsertFun(postdata)
//         }
//         else {
//             updateFun(patchdata)
//         }


//     }, [postdata, value, patchdata])


//     //close button function
//     const backtoSetting = useCallback(() => {
//         history.push('/Home/Settings')
//     }, [history])


//     const requesttypedata = useSelector((state) => {
//         return state.getRequesttype.requesttypeList || 0
//     })
//     useEffect(() => {
//         dispatch(getRequesttype());
//     }, [dispatch])
//     // console.log(requesttypedata);

//     const [ReqType, setReqType] = useState({
//         COMPLAINT: false,
//         NEW_REQUIREMENT: false,
//         MODIFICATION: false,

//     })
//     const { COMPLAINT, NEW_REQUIREMENT, MODIFICATION } = ReqType
//     const getReqType = useCallback((e) => {
//         const ob1 = {
//             COMPLAINT: false,
//             NEW_REQUIREMENT: false,
//             MODIFICATION: false
//         }
//         const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
//         setReqType({ ...ob1, [e.target.name]: value })
//     }, [ReqType])

//     //  console.log(complaintdept);
//     useEffect(() => {
//         if (complaintdept.BIOMEDICAL === true) {
//             setCompdept(1)
//         } else if (complaintdept.MAINTENANCE === true) {
//             setCompdept(2)
//         } else if (complaintdept.IT === true) {
//             setCompdept(3)
//         } else if (complaintdept.HOUSEKEEPING === true) {
//             setCompdept(4)
//         } else if (complaintdept.COMMON === true) {
//             setCompdept(5)
//         } else {
//             setCompdept(0)
//         }

//     }, [complaintdept, ReqType])

//     // const [aa, setAA] = useState({
//     //     slno: 0
//     // })
//     // const checkedslno = useCallback((val) => {
//     //     if (val === true) {
//     //         console.log(val);
//     //         console.log(value.req_type_slno);
//     //         const hgf = {
//     //             slno: value.req_type_slno
//     //         }
//     //         setAA(hgf)
//     //     }
//     //     else {
//     //         console.log("nooo");

//     //     }
//     //     const slno = {

//     //     }

//     // }, [])

//     // console.log(aa);
//     // console.log(comdept);

//     const complainttypedata = useSelector((state) => {
//         return state.getComplainttype.complainttypeList || 0
//     })
//     //getComplainttype function is used to update data in complainttype redux
//     useEffect(() => {
//         dispatch(getComplainttype(comdept));
//     }, [dispatch, comdept])
//     // const nnn = useCallback((value) => {
//     //     console.log(value);
//     // })



//     const getCompType = useCallback(() => {
//         console.log("dcxhg vbjnk");

//     })
//     console.log(complainttypedata);
//     return (
//         <CardMaster
//             title="Complaint Registration"
//             submit={submitComplaint}
//             close={backtoSetting}
//         >

//             <Box sx={{ width: "100%" }} >
//                 <Paper variant="outlined" square   >
//                     <Box sx={{ flex: 2, pl: 2, pt: 1, pr: 2, pb: 1 }} >
//                         <Box sx={{ flex: 1 }} >
//                             <CssVarsProvider>
//                                 <Typography sx={{ textAlign: "center" }}>
//                                     Request Type
//                                 </Typography>
//                             </CssVarsProvider>
//                         </Box>
//                         <Paper variant="outlined" square sx={{
//                             px: 0.5,
//                             display: "flex",
//                             flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
//                             justifyContent: "space-around",
//                             //  alignItems: "space-between",
//                             //backgroundColor: "red",
//                         }}  >
//                             <Box sx={{
//                                 width: "50%", pt: 1,
//                                 //backgroundColor: "red",
//                                 display: "flex",
//                                 flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
//                                 justifyContent: 'space-evenly',
//                                 pb: 1
//                             }} >
//                                 {requesttypedata && requesttypedata.map((value, index) => {
//                                     return <Box sx={{
//                                         display: 'flex',
//                                         //justifyContent: 'space-evenly',
//                                     }}
//                                         key={value.req_type_slno}
//                                     >
//                                         <CusCheckBox
//                                             variant="outlined"
//                                             color="primary"
//                                             size="md"
//                                             name={value.req_type_name}
//                                             label={value.req_type_name}
//                                             value={value.req_type_slno}
//                                             checked={
//                                                 value.req_type_name === 'COMPLAINT' ? COMPLAINT :
//                                                     value.req_type_name === 'NEW REQUIREMENT' ? NEW_REQUIREMENT :
//                                                         value.req_type_name === 'MODIFICATION' ? MODIFICATION : false
//                                             }
//                                             onCheked={getReqType}
//                                         // getchekval={checkedslno}
//                                         // sss={nnn(value)}
//                                         />
//                                     </Box>
//                                 })
//                                 }
//                             </Box>
//                         </Paper>
//                     </Box>
//                     <Box sx={{ flex: 1 }} >
//                         <CssVarsProvider>
//                             <Typography sx={{ textAlign: "center" }}>
//                                 Complaint Department
//                             </Typography>
//                         </CssVarsProvider>
//                     </Box>
//                     <Box sx={{ flex: 2, pl: 2, pr: 2, pb: 1 }} >
//                         <Paper variant="outlined" square sx={{
//                             px: 0.2,
//                             display: "flex",
//                             flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
//                             justifyContent: "space-around",
//                             //  alignItems: "space-between",
//                             //backgroundColor: "red",

//                         }}  >
//                             <Box sx={{
//                                 width: "50%", pt: 1,
//                                 //backgroundColor: "red",
//                                 display: "flex",
//                                 flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
//                                 justifyContent: 'space-evenly',
//                                 pb: 1
//                             }} >
//                                 {complaintdeptdata && complaintdeptdata.map((val) => {
//                                     return <Box sx={{
//                                         display: 'flex',
//                                         //justifyContent: 'space-evenly',
//                                     }}
//                                         key={val.complaint_dept_slno}
//                                     >
//                                         <CusCheckBox
//                                             variant="outlined"
//                                             color="primary"
//                                             size="md"
//                                             name={val.complaint_dept_name}
//                                             label={val.complaint_dept_name}
//                                             value={val.complaint_dept_slno}
//                                             checked={val.complaint_dept_name === 'BIOMEDICAL' ? BIOMEDICAL :
//                                                 val.complaint_dept_name === 'MAINTENANCE' ? MAINTENANCE :
//                                                     val.complaint_dept_name === 'IT' ? IT :
//                                                         val.complaint_dept_name === 'HOUSEKEEPING' ? HOUSEKEEPING :
//                                                             val.complaint_dept_name === 'COMMON' ? COMMON : false

//                                             }
//                                             onCheked={getValue}
//                                         />
//                                     </Box>
//                                 })
//                                 }
//                             </Box>
//                         </Paper>
//                     </Box>


//                     {comdept !== 0 ?
//                         <Box>
//                             <Box sx={{ flex: 1 }} >
//                                 <CssVarsProvider>
//                                     <Typography sx={{ textAlign: "center" }}>
//                                         Complaint Type
//                                     </Typography>
//                                 </CssVarsProvider>
//                             </Box>
//                             <Box sx={{ flex: 2, pl: 2, pr: 2, pb: 1 }} >
//                                 <Paper variant="outlined" square sx={{
//                                     px: 0.2,
//                                     display: "flex",
//                                     flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
//                                     justifyContent: "space-around",
//                                 }}  >
//                                     <Box sx={{
//                                         width: "100%", pt: 1,
//                                         //backgroundColor: "red",
//                                         display: "flex",
//                                         flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
//                                         justifyContent: 'space-evenly',
//                                         pb: 1
//                                     }} >
//                                         {complainttypedata && complainttypedata.map((val) => {
//                                             return <Box sx={{
//                                                 display: 'flex',
//                                                 //justifyContent: 'space-evenly',
//                                             }}
//                                                 key={val.complaint_type_slno}
//                                             >
//                                                 <CusCheckBox
//                                                     variant="outlined"
//                                                     color="primary"
//                                                     size="md"
//                                                     name={val.complaint_type_name}
//                                                     label={val.complaint_type_name}
//                                                     value={val.complaint_type_slno}
//                                                     checked={val.complaint_type_name === 'BIOMEDICAL' ? BIOMEDICAL :
//                                                         val.complaint_type_name === 'MAINTENANCE' ? MAINTENANCE :
//                                                             val.complaint_type_name === 'IT' ? IT :
//                                                                 val.complaint_type_name === 'HOUSEKEEPING' ? HOUSEKEEPING :
//                                                                     val.complaint_type_name === 'COMMON' ? COMMON : false

//                                                     }
//                                                     onCheked={getCompType}
//                                                 />
//                                             </Box>
//                                         })
//                                         }
//                                     </Box>
//                                 </Paper>
//                             </Box>
//                         </Box> : null}





//                     <Box sx={{
//                         flex: 1,
//                         display: "flex",
//                         width: "100%",
//                         // backgroundColor: "red",
//                         pl: 1, pt: 2, pr: 2, pb: 1,
//                         flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
//                     }} >


//                         <Box sx={{

//                             //   backgroundColor: "blue",
//                             pt: 2, pr: 2, pb: 1, pl: 1
//                         }} >

//                             <Paper variant="outlined" square sx={{
//                                 height: 80,
//                                 width: 1000,
//                                 px: 0.2,
//                                 display: "flex",
//                                 flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },

//                             }}  >
//                                 {/* <TextareaAutosize
//                             aria-label="minimum height"
//                             minRows={3}
//                             placeholder="Complaint Description"
//                             name="compalint_desc"
//                             value={compalint_desc}
//                             sx={{
//                                 height: 200,
//                                 width: 50000
//                             }}
//                             //style={{ width: 910 }}

//                             onChange={(e) => updateCompReg(e)}
//                         /> */}
//                                 {/* <TextFieldCustom
//                             style={{ width: "100%", height: "100%" }}
//                             placeholder="Complaint Description"
//                             type="text"
//                             size="sm"
//                             name="compalint_desc"
//                             value={compalint_desc}
//                             onchange={updateCompReg}
//                         /> */}
//                             </Paper>

//                         </Box>
//                         <Box sx={{
//                             width: "20%",
//                             //backgroundColor: "green",
//                             pt: 2, pr: 2, pb: 1, pl: 1
//                         }} >
//                             <Paper variant="outlined" square sx={{
//                                 px: 0.2,
//                                 display: "flex",
//                                 flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },

//                             }}  >

//                                 <CssVarsProvider>
//                                     <List>

//                                     </List>
//                                 </CssVarsProvider>

//                                 {/* <List>

//                         </List> */}





//                                 {/* <List>
//                             <ListItem variant="soft" color="danger"> */}
//                                 {/* <CusCheckBox
//                                     variant="outlined"
//                                     color="primary"
//                                     size="md"
//                                     //name={val.complaint_type_name}
//                                     label="Critical"
//                                 // value={val.complaint_type_slno}
//                                 // checked={ }
//                                 // onCheked={getCompType}
//                                 /> */}

//                                 {/* </ListItem> */}
//                                 {/* <ListItem variant="soft" color="danger">
//                                 <CusCheckBox
//                                     variant="outlined"
//                                     color="primary"
//                                     size="md"
//                                     //name={val.complaint_type_name}
//                                     label="High"
//                                 // value={val.complaint_type_slno}
//                                 // checked={ }
//                                 // onCheked={getCompType}
//                                 />

//                             </ListItem>
//                             <ListItem variant="soft" color="danger">
//                                 <CusCheckBox
//                                     variant="outlined"
//                                     color="primary"
//                                     size="md"
//                                     //name={val.complaint_type_name}
//                                     label="Medium"
//                                 // value={val.complaint_type_slno}
//                                 // checked={ }
//                                 // onCheked={getCompType}
//                                 />

//                             </ListItem> */}

//                                 {/* </List> */}






//                             </Paper>

//                         </Box>


//                     </Box>
//                 </Paper>
//             </Box>
//         </CardMaster >
//     )
// }

// export default ComplaintRegistrMast