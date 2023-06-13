// import React, { Fragment, memo, useCallback, useState } from 'react'
// import { ToastContainer } from 'react-toastify'
// import Slide from '@mui/material/Slide';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import { Box } from '@mui/system';
// import { Paper } from '@mui/material';
// import { CssVarsProvider, Typography } from '@mui/joy'
// import { format } from 'date-fns'
// import { infoNotify } from 'src/views/Common/CommonCode';
// import { axioslogin } from 'src/views/Axios/Axios';
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import DeptWiseEmpSelect from 'src/views/CommonSelectCode/DeptWiseEmpSelect';
// import CustomTextarea from 'src/views/Components/CustomTextarea';
// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="left" ref={ref} {...props} />;
// });

// const EmployeeTrasfermodal = ({ open, setOpen, transfer, count, setCount, setTransmodal }) => {
//     //props data for modal
//     const { complaint_slno, complaint_desc, compalint_date, sec_name, req_type_name, complaint_type_name,
//         compalint_priority, priority_reason, complaint_hicslno, priority

//     } = transfer[0]
//     const [cmpdept, setCmpdept] = useState([]);
//     const [getAssignEmp, setGetAssignEmp] = useState([])
//     const [remark, setRemark] = useState('');

//     //updating remark state
//     const updateRemark = useCallback((e) => {
//         setRemark(e.target.value)
//     }, [setRemark])


//     //redux for geting login id
//     const id = useSelector((state) => {
//         return state.LoginUserData.empid
//     })

//     const empdept = useSelector((state) => {
//         return state.LoginUserData.empdept
//     })

//     const newEmployes = cmpdept.filter(value => {
//         return !getAssignEmp.find(val => {
//             return val.assigned_emp === value
//         })
//     })



//     // useEffect(() => {

//     //     const newEmployesNot = cmpdept.filter(value => {
//     //         return !getAssignEmp.find(val => {
//     //             return val.assigned_emp !== value
//     //         })
//     //     })
//     //     console.log(newEmployesNot);


//     // }, [cmpdept, getAssignEmp])

//     // const newEmployesNot = cmpdept.filter(value => {
//     //     return !getAssignEmp.find(val => {
//     //         return val.assigned_emp !== value
//     //     })
//     // })

//     // console.log(newEmployesNot);

//     const xx = cmpdept && cmpdept.map((val) => {
//         //  console.log(val);
//         const cc = getAssignEmp.find((value) => value.assigned_emp !== val)
//         return cc

//     })


//     //  console.log(xx);
//     // const newarrt = total && total.map((val) => {
//     //     const a1 = extra.find((ele) => ele.proc_slno === val.proc_slno)
//     //     return {
//     //         ...val, extraAmnt: a1?.exhossum ?? 0,
//     //         extracantAmt: a1?.excantsum ?? 0
//     //     }
//     // })


//     // console.log(newEmployesNot);
//     useEffect(() => {
//         const getEmployeees = async () => {
//             const result = await axioslogin.get(`Rectifycomplit/getAssignEmps/${complaint_slno}`)
//             const { success, data } = result.data
//             if (success === 1) {
//                 setGetAssignEmp(data)
//             }
//             else {
//                 setGetAssignEmp([])
//             }
//         }
//         getEmployeees();


//     }, [])

//     // console.log(getAssignEmp);
//     const [select, setSelect] = useState(false)
//     const updateSelect = (e) => {
//         const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
//         setSelect({ ...select, [e.target.name]: value })
//     }
//     const [Employee, setEmployee] = useState([])
//     const getemp = (e, v) => {
//         if (e === true) {
//             const obj = {
//                 emids: v
//             }
//             setEmployee([...Employee, obj])
//         }
//         else {
//             const obj = {
//                 emids: v
//             }
//             const newarry = Employee.filter((val) => {
//                 return val.emids !== obj.emids
//             })
//             setEmployee(newarry)
//         }
//     }
//     const postData = newEmployes && newEmployes.map((val) => {
//         return {
//             em_transfer_remarks: remark,
//             complaint_slno: complaint_slno,
//             assigned_emp: val,
//             assigned_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
//             assign_rect_status: 0,
//             assigned_user: id,
//             assign_status: 1
//         }
//     })

//     // const patchdata = newEmployesNot && newEmployesNot.map((value) => {
//     //     return {
//     //         complaint_slno: complaint_slno,
//     //         assigned_emp: value
//     //     }
//     // })

//     //   console.log(patchdata);

//     //patch data for updating complaint dept
//     // const patchData = useMemo(() => {
//     //     return {
//     //         assigned_emp: newEmployes,
//     //         complaint_slno: complaint_slno
//     //     }
//     // }, [cmpdept, complaint_slno])
//     //reset function for to intial state
//     const reset = useCallback(() => {
//         setOpen(false);
//         setCmpdept(0);
//         setTransmodal(0);
//     }, [setOpen, setTransmodal])
//     // when we click on transfer function
//     const Transfer = useCallback(() => {
//         //  console.log("kjk");

//         const EmpInactive = async (patchdata) => {
//             //   console.log(patchdata);
//             const result = await axioslogin.patch(`complaintassign/employee/inactive`, patchdata);

//             const { message, success } = result.data;


//         }


//         const TranserDept = async (postData) => {
//             const result = await axioslogin.post(`complaintassign/transfer/insert`, postData);

//             const { message, success } = result.data;
//             // console.log(cmpdept);
//             // console.log(getAssignEmp);
//             if (success === 1) {


//                 // const xx = cmpdept && cmpdept.map((val) => {
//                 //     console.log(val);
//                 //     const cc = getAssignEmp.find((value) => value.assigned_emp !== val)
//                 //     return cc

//                 // })

//                 // EmpInactive(patchdata)

//             }




//             // if (success === 1) {
//             //     succesNotify(message)
//             //     setCount(count + 1)
//             //     reset();
//             // } else if (success === 0) {
//             //     infoNotify(message)
//             // } else {
//             //     infoNotify(message)
//             // }
//         }





//         if (cmpdept.length !== 0) {
//             TranserDept(postData)
//         } else {
//             infoNotify("Please Choose Any Employee")
//         }
//     }, [postData, count, reset, setCount, cmpdept, getAssignEmp])

//     return (
//         <Fragment>
//             <ToastContainer />
//             <Dialog
//                 open={open}
//                 TransitionComponent={Transition}
//                 keepMounted
//                 aria-describedby="alert-dialog-slide-descriptiona"
//                 fullWidth
//                 maxWidth='md'
//             >
//                 < DialogContent id="alert-dialog-slide-descriptiona"
//                     sx={{
//                         width: '100%',
//                         height: 400
//                     }}
//                 >
//                     < DialogContentText id="alert-dialog-slide-descriptiona">
//                         Employee Trasfer
//                     </DialogContentText>

//                     <Box sx={{ width: "100%", mt: 0, mb: 2 }}>
//                         <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
//                             <Box sx={{
//                                 width: "100%",
//                                 display: "flex",
//                                 flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
//                             }}>
//                                 <Box sx={{
//                                     width: "100%",
//                                     display: "flex",
//                                     p: 0.5,
//                                     flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
//                                 }}>
//                                     <Box
//                                         sx={{ pr: 8 }}>
//                                         <CssVarsProvider>
//                                             <Typography sx={{ fontSize: 15 }}>Complaint No:  {complaint_slno}</Typography>
//                                         </CssVarsProvider>
//                                     </Box>
//                                     <Box sx={{ pl: 3 }}                                    >
//                                         <CssVarsProvider>
//                                             <Typography sx={{ fontSize: 15 }}>Request Type: {req_type_name}</Typography>
//                                         </CssVarsProvider>
//                                     </Box>
//                                     <Box sx={{ pl: 7 }}                                    >
//                                         <CssVarsProvider>
//                                             <Typography sx={{ fontSize: 15 }}>Request Date: {format(new Date(compalint_date), 'dd-MM-yyyy hh:mm:ss')}</Typography>
//                                         </CssVarsProvider>
//                                     </Box>
//                                 </Box>
//                                 <Box
//                                     sx={{
//                                         width: "100%",
//                                         display: "flex",
//                                         p: 0.5,
//                                         flexDirection: "row",
//                                     }}>
//                                     <CssVarsProvider>
//                                         <Typography sx={{ fontSize: 15, pr: 8 }}>Department Section:</Typography>
//                                         <Typography sx={{ textTransform: "capitalize", fontSize: 15, pl: 1.7 }}> {sec_name.toLowerCase()}</Typography>
//                                     </CssVarsProvider>

//                                 </Box>
//                                 <Box
//                                     sx={{
//                                         width: "100%",
//                                         display: "flex",
//                                         p: 0.5,
//                                         flexDirection: "row",
//                                     }}>
//                                     <CssVarsProvider>
//                                         <Typography sx={{ fontSize: 15, pr: 8 }}>Complaint Type:</Typography>
//                                         <Typography sx={{ textTransform: "capitalize", fontSize: 15, pl: 5.4 }}> {complaint_type_name.toLowerCase()}</Typography>
//                                     </CssVarsProvider>
//                                 </Box>

//                                 <Box sx={{
//                                     width: "100%",
//                                     display: "flex",
//                                     p: 0.5,
//                                     flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
//                                 }}>
//                                     <Box
//                                         sx={{ width: "25%", }}>
//                                         <CssVarsProvider>
//                                             <Typography sx={{ fontSize: 15 }}>Complaint Description:</Typography>
//                                         </CssVarsProvider>
//                                     </Box>
//                                     <Paper sx={{
//                                         width: "75%", minHeight: 10, maxHeight: 70, pl: 0.9, fontSize: 15,
//                                         overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
//                                     }} variant='none'>
//                                         {complaint_desc}
//                                     </Paper>
//                                 </Box>
//                                 <Box sx={{
//                                     width: "100%",
//                                     display: "flex",
//                                     p: 0.5,
//                                     flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
//                                 }}>
//                                     <Box
//                                         sx={{ width: "25%", }}>
//                                         <CssVarsProvider>
//                                             <Typography sx={{ fontSize: 15 }}>Complaint Priority:</Typography>
//                                         </CssVarsProvider>
//                                     </Box>
//                                     <Paper sx={{
//                                         width: "75%", minHeight: 10, maxHeight: 70, pl: 0.9, fontSize: 15,
//                                         overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
//                                     }} variant='none'>
//                                         {priority}
//                                     </Paper>
//                                 </Box>
//                                 <Box sx={{
//                                     width: "100%",
//                                     display: "flex",
//                                     p: 0.5,
//                                     flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
//                                 }}>
//                                     <Box
//                                         sx={{ width: "30%", }}>
//                                         <CssVarsProvider>
//                                             <Typography sx={{ fontSize: 15 }}>Assigned Employees:</Typography>
//                                         </CssVarsProvider>
//                                     </Box>
//                                     <Box sx={{
//                                         pl: 2,
//                                         display: 'flex',
//                                         width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
//                                     }} >

//                                         {
//                                             getAssignEmp && getAssignEmp.map((val) => {
//                                                 return <Box key={val.assigned_emp} sx={{
//                                                     width: "100%",
//                                                     display: "flex",
//                                                     flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
//                                                 }}>

//                                                     {/* <CssVarsProvider> */}
//                                                     {/* <Checkbox
//                                                         color="primary"

//                                                         // defaultChecked={false}
//                                                         // disabled={disabled}
//                                                         label={val.em_name}
//                                                         value={val.assigned_emp}
//                                                         name={val.em_name}
//                                                         onChange={(e) => {
//                                                             updateSelect(e)
//                                                             getemp(e.target.checked, e.target.value)
//                                                         }}
//                                                         checked={val.check === 1 ? true : select.check}

//                                                     /> */}
//                                                     <CssVarsProvider>

//                                                         <Typography sx={{ textTransform: "capitalize", textAlign: "left" }}>{val.em_name.toLowerCase()},</Typography>
//                                                     </CssVarsProvider>
//                                                     {/* </CssVarsProvider> */}

//                                                 </Box>
//                                             })
//                                         }
//                                     </Box>

//                                 </Box>
//                                 <Box sx={{
//                                     width: "100%",
//                                     display: "flex",
//                                     p: 0.5,
//                                     flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
//                                 }}>
//                                     <Box
//                                         sx={{ width: "25%", }}>
//                                         <CssVarsProvider>
//                                             <Typography sx={{ fontSize: 15 }}>Assign to:</Typography>
//                                         </CssVarsProvider>
//                                     </Box>
//                                     <Box sx={{ width: "53%", pt: 0.5 }}                                    >
//                                         <DeptWiseEmpSelect personName={cmpdept} setPersonName={setCmpdept} empdeptwise={empdept} />
//                                     </Box>

//                                 </Box>
//                                 <Box sx={{
//                                     width: "100%",
//                                     display: "flex",
//                                     p: 0.5,
//                                     flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
//                                 }}>
//                                     <Box
//                                         sx={{ width: "25%", }}>
//                                         <CssVarsProvider>
//                                             <Typography sx={{ fontSize: 15 }}>Remarks:</Typography>
//                                         </CssVarsProvider>
//                                     </Box>

//                                     <Box
//                                         sx={{ width: "50%", }}>
//                                         <CustomTextarea
//                                             style={{ width: 450 }}
//                                             minRows={4}
//                                             placeholder="Remarks"
//                                             name='remark'
//                                             value={remark}
//                                             onchange={updateRemark}
//                                         />
//                                     </Box>

//                                 </Box>
//                             </Box>
//                         </Paper>
//                     </Box>



//                 </DialogContent>
//                 <DialogActions>
//                     <Button color="secondary" onClick={Transfer} >Save</Button>
//                     <Button color="secondary" onClick={reset}>Cancel</Button>
//                 </DialogActions>
//             </Dialog>
//         </Fragment>
//     )
// }

// export default memo(EmployeeTrasfermodal)