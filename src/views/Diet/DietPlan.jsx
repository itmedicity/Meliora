import React, { useState } from "react";
import {
  Modal,
  ModalDialog,
  Typography,
  FormControl,
  FormLabel,
  Checkbox,
  Textarea,
  Button,
  Stack,
  Box,
  Chip,
  Table,
  Divider
} from "@mui/joy";

import DeitMastComponent from "./DeitCommonComponents/DietMastComponent";

const DietPlan = ({ open, setOpen, selectedPatientData, dietTypes }) => {
  const {
    ptc_ptname,
    pt_no,
    status,
    mrdNo,
    gender,
    age,
    doctor,
    location,
  } = selectedPatientData || {};

  const [dietType, setDietType] = useState("");
  const [consultRequired, setConsultRequired] = useState(false);
  const [remarks, setRemarks] = useState("");

  const rows = [
    {
      date: "2025-12-17 09:30 AM",
      dietType: "Regular",
      plannedUser: "Dietician A",
      DietPlanstatus: "Active",
    },
    {
      date: "2025-12-16 11:30 AM",
      dietType: "High Protein",
      plannedUser: "Dietician B",
      DietPlanstatus: "Inactive",
    },
    {
      date: "2025-12-15 08:30 AM",
      dietType: "Diabetic Diet",
      plannedUser: "Dietician C",
      DietPlanstatus: "Inactive",
    },
  ];

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        sx={{
          width: 700,
          borderRadius: "lg",
          p: 0,
          overflow: "hidden",
          boxShadow: "lg",
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2.5,
            bgcolor: "neutral.softBg",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" >
            <Box>
              <Typography level="h4" fontWeight={700}>
                {ptc_ptname}
              </Typography>
              <Typography level="body-sm" fontWeight={600} color="text.secondary">
                MRD No: {mrdNo} • IP No: {pt_no || "N/A"}
              </Typography>
              <Typography level="body-sm" fontWeight={600} color="text.secondary">
                {gender} • {age} yrs
              </Typography>
              <Typography level="body-md" fontWeight={600} mt={0.5}>
                {doctor}
              </Typography>
            </Box>

            <Stack alignItems="flex-end" spacing={0.5}>
              <Typography level="body-sm" fontWeight={700}>
                {location}
              </Typography>
              <Typography level="body-sm" fontWeight={700}>
                H084NR
              </Typography>
            </Stack>
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Chip
              size="md"
              variant="soft"
              color={status === 1 ? "success" : "danger"}
              sx={{
                fontWeight: 800,
                px: 2,
                py: 1,
                fontSize: 15,
              }}
            >
              {status === 1 ? "PLANNED" : "NOT PLANNED"}
            </Chip>
          </Box>
        </Box>

        <Box sx={{ px: 3, py: 2 }}>
          {status === 1 ? <Box>
            <Typography level="title-sm" fontWeight={700} mb={1}>
              Diet Plan History
            </Typography>
            <Table
              size="sm"
              borderAxis="both"
              sx={{
                mb: 2,
                "--TableCell-paddingY": "8px",
                "--TableCell-paddingX": "10px",
              }}
            >
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Diet Type</th>
                  <th>Planned By</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.date}</td>
                    <td>{row.dietType}</td>
                    <td>{row.plannedUser}</td>
                    <td>
                      <Chip
                        size="sm"
                        variant="soft"
                        color={row.DietPlanstatus === "Active" ? "success" : "neutral"}
                      >
                        {row.DietPlanstatus}
                      </Chip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Divider sx={{ my: 2 }} />
          </Box> : null}

          <Typography level="title-sm" fontWeight={700} mb={1}>
            Change Diet Plan
          </Typography>
          <Box sx={{ mb: 1 }}>
            <DeitMastComponent
              setDietType={setDietType}
              dietType={dietType}
              dietTypes={dietTypes}
            />
          </Box>
          <FormControl orientation="horizontal" sx={{ alignItems: "center", mb: 1 }}>
            <Checkbox
              checked={consultRequired}
              onChange={(e) => setConsultRequired(e.target.checked)}
            />
            <FormLabel sx={{ ml: 1 }}>Consultation Required</FormLabel>
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <FormLabel>Remarks</FormLabel>
            <Textarea
              minRows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter clinical or dietary remarks"
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            px: 3,
            py: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            bgcolor: "background.level1",
          }}
        >
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="solid"
              color="primary"
              onClick={() => {
                console.log({ dietType, consultRequired, remarks });
                setOpen(false);
              }}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </ModalDialog>
    </Modal>
  );
};
export default DietPlan;


// import React, { useState } from "react";
// import {
//   Modal,
//   ModalDialog,
//   Typography,
//   FormControl,
//   FormLabel,
//   Select,
//   Option,
//   Checkbox,
//   Textarea,
//   Button,
//   Stack,
//   Box,
//   Chip,
//   Sheet,
//   Table,
// } from "@mui/joy";
// import DeitMastComponent from "./DeitCommonComponents/DietMastComponent";

// const DietPlan = ({ open, setOpen, selectedPatientData, dietTypes }) => {


//   const {
//     ptc_ptname, pt_no, status, mrdNo, dietTypeId, gender, age, doctor, location, address } = selectedPatientData



//   const [dietType, setDietType] = useState("");
//   const [consultRequired, setConsultRequired] = useState(false);
//   const [remarks, setRemarks] = useState("");

//   const rows = [
//     {
//       date: "2025-12-17 09:30 AM",
//       dietType: "Regular",
//       plannedUser: "Dietician A",
//       DietPlanstatus: "Active",
//     },
//     {
//       date: "2025-12-16 11:30 AM",
//       dietType: "High Protein",
//       plannedUser: "Dietician B",
//       DietPlanstatus: "Inactive",
//     },
//     {
//       date: "2025-12-15 08:30 AM",
//       dietType: "Diabetic Diet",
//       plannedUser: "Dietician C",
//       DietPlanstatus: "Inactive",
//     },
//   ];


//   return (
//     <Box>
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <ModalDialog
//           sx={{
//             width: 600,
//             borderRadius: "xl",
//             p: 0,
//             bgcolor: "white",
//             overflow: "hidden",
//           }}
//         >

//           <Box>


//             <Box sx={{ flex: 1, bgcolor: "#f3f4f6", p: 2 }}>
//               <Box sx={{ flex: 1, display: 'flex', }}>
//                 <Box sx={{ flex: 2, }}>
//                   <Typography level="h4" sx={{ fontWeight: 700, }}>
//                     {ptc_ptname}
//                   </Typography>
//                   <Typography sx={{ fontSize: 13, color: "#475569", fontWeight: 600, }}>
//                     MRD No: {mrdNo} | IP No: {pt_no || "N/A"}
//                   </Typography>
//                   <Typography sx={{ fontSize: 13, color: "#475569", fontWeight: 600, }}>
//                     {gender}  {age} years
//                   </Typography>
//                   <Typography level="h5" sx={{ fontWeight: 700, }}>
//                     {doctor}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', }}>
//                   <Box>
//                     <Typography sx={{ fontWeight: 700, fontSize: 14 }} >
//                       {location}
//                     </Typography>
//                     <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
//                       H084NR
//                     </Typography>
//                   </Box>

//                 </Box>
//               </Box>
//               <Box sx={{ flex: 1, display: 'flex', justifyContent: "center" }}>
//                 <Chip sx={{
//                   fontWeight: 700, fontSize: 16, background: status === 1 ? "#dcfce7" : "#fee2e2",
//                   color: status === 1 ? "#166534" : "#991b1b", px: 2
//                 }}>
//                   {status === 1 ? "Planned" : "Not Planned"}
//                 </Chip>
//               </Box>
//             </Box>
//             <Typography sx={{ fontWeight: 700, fontSize: 14, pl: 2, pt: 1 }}>
//               Diet Plan History
//             </Typography>
//             <Box sx={{ flex: 1, display: "flex", justifyContent: 'center' }}>
//               <Table
//                 borderAxis="both"
//                 size="sm"
//                 sx={{ width: "96%", borderRadius: 0 }}
//               >
//                 <thead>
//                   <tr>
//                     <th>Diet Plan Date</th>
//                     <th>Diet Type</th>
//                     <th>Planned User</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {rows.map((row, index) => (
//                     <tr key={index}>
//                       <td>{row.date}</td>
//                       <td>{row.dietType}</td>
//                       <td>{row.plannedUser}</td>
//                       <td>
//                         <Chip
//                           size="sm"
//                           variant="soft"
//                           color={row.status === "Active" ? "success" : "danger"}
//                         >
//                           {row.status}
//                         </Chip>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </Box>
//             <Typography sx={{ fontWeight: 700, fontSize: 14, pl: 2, pt: 1 }}>
//               Change Diet plan
//             </Typography>

//             <Box sx={{ px: 2 }}>
//               <DeitMastComponent setDietType={setDietType} dietType={dietType} dietTypes={dietTypes} />
//               <FormControl sx={{ m: 1, display: "flex", flexDirection: "row" }}>
//                 <Checkbox
//                   checked={consultRequired}
//                   onChange={(e) => setConsultRequired(e.target.checked)}
//                 />
//                 <FormLabel sx={{ ml: 1 }}>Consultation Required</FormLabel>
//               </FormControl>
//               <FormControl sx={{ mb: 2 }}>
//                 <FormLabel>Remarks</FormLabel>
//                 <Textarea
//                   minRows={3}
//                   value={remarks}
//                   onChange={(e) => setRemarks(e.target.value)}
//                   placeholder="Enter remarks"
//                 />
//               </FormControl>
//               <Stack direction="row" spacing={1} justifyContent="flex-end">
//                 <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button
//                   variant="solid"
//                   color="primary"
//                   onClick={() => {
//                     console.log({
//                       dietType,
//                       consultRequired,
//                       remarks,
//                     });
//                     setOpen(false);
//                   }}
//                 >
//                   Save
//                 </Button>
//               </Stack>
//             </Box>
//           </Box>
//         </ModalDialog>
//       </Modal>
//     </Box>
//   );
// };

// export default DietPlan;



// import React, { Fragment, useCallback, useMemo, useState, memo } from 'react'
// import Slide from '@mui/material/Slide'
// import DialogContent from '@mui/material/DialogContent'
// import DialogContentText from '@mui/material/DialogContentText'
// // import DialogActions from '@mui/material/DialogActions'
// // import Button from '@mui/material/Button'
// import { Grid } from '@mui/material'
// import SelectDiet from '../CommonSelectCode/SelectDiet'
// import { axioslogin } from '../Axios/Axios'
// import Dialog from '@mui/material/Dialog'
// import { infoNotify, succesNotify } from '../Common/CommonCode'
// import { useSelector } from 'react-redux'
// // import { ToastContainer } from 'react-toastify';
// import CustomTextarea from '../Components/CustomTextarea'
// import { format } from 'date-fns'
// import CusCheckBox from 'src/views/Components/CusCheckBox'
// import { Box, Button, Typography } from '@mui/joy'
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="left" ref={ref} {...props} />
// })
// const DietPlan = ({ open, data, setOpen }) => {
//   const [diet, setDiet] = useState(0)
//   const [remark, setRemark] = useState('')
//   const { bdc_no, dietpt_slno, ptc_ptname, ip_no, pt_no, doc_name, bd_code } = data[0]
//   // Get login user emp_id
//   const Id = useSelector(state => {
//     return state.LoginUserData.empid
//   })
//   const updateRemarks = useCallback(e => {
//     setRemark(e.target.value)
//   }, [])
//   const [appRrquired, setappRequ] = useState(false)
//   const updaterequiredt = useCallback(e => {
//     if (e.target.checked === true) {
//       setappRequ(true)
//     } else {
//       setappRequ(false)
//     }
//   }, [])

//   const v = 1
//   const postdata = useMemo(() => {
//     return {
//       ip_no: ip_no,
//       pt_no: pt_no,
//       diet_slno: diet,
//       dietpt_slno: dietpt_slno,
//       bd_code: bd_code,
//       plan_date: format(new Date(), 'yyyy-MM-dd'),
//       plan_remark: remark,
//       plan_status: 0,
//       em_id: Id,
//       process: 0,
//       discharge: v === 1 ? 'N' : 'Y',
//       approve_reqired: appRrquired === true ? 1 : 0
//     }
//   }, [ip_no, pt_no, diet, bd_code, remark, Id, v, dietpt_slno, appRrquired])
//   const reset = useCallback(() => {
//     setDiet(0)
//     setRemark('')
//     setOpen(false)
//     setappRequ(false)
//   }, [setOpen])
//   /*** usecallback function for form submitting */
//   const submitDietplan = useCallback(
//     e => {
//       e.preventDefault()
//       /*** * insert function for use call back     */
//       const InsertData = async postdata => {
//         const result = await axioslogin.post(`/dietplan/insert`, postdata)
//         const { message, success } = result.data
//         if (success === 1) {
//           succesNotify(message)
//           reset()
//         } else if (success === 7) {
//           infoNotify(message)
//           reset()
//         } else {
//           infoNotify(message)
//         }
//       }
//       if (diet === 0) {
//         infoNotify('Please Choose Diet')
//       } else {
//         InsertData(postdata)
//       }
//     },
//     [postdata, diet, reset]
//   )
//   return (
//     <Fragment>
//       {/* <ToastContainer /> */}
//       <Dialog
//         open={open}
//         onClose={reset}
//         TransitionComponent={Transition}
//         keepMounted
//         aria-describedby="alert-dialog-slide-descriptiona"
//       >
//         <DialogContent
//           id="alert-dialog-slide-descriptiona"
//           sx={{
//             width: 500,
//             height: 480
//           }}
//         >
//           <DialogContentText id="alert-dialog-slide-descriptiona">Diet Plan</DialogContentText>
//           <Box sx={{ p: 2, height: '100%' }}>
//             < Box>
//               <Box sx={{ p: 2 }}>
//                 <Grid item xl={12} lg={12}>
//                   <Grid container spacing={2} sx={{ pt: 0.1 }}>
//                     <Grid item xl={5} lg={5}>
//                       <Typography>Diet Number:</Typography>
//                     </Grid>
//                     <Grid item xl={5} lg={5}>
//                       <Typography>{dietpt_slno}</Typography>
//                     </Grid>
//                     <Grid item xl={5} lg={5}>
//                       <Typography>Patient Number:</Typography>
//                     </Grid>
//                     <Grid item xl={5} lg={5}>
//                       <Typography>{pt_no}</Typography>
//                     </Grid>
//                     <Grid item xl={5} lg={5}>
//                       <Typography>Patient Name</Typography>
//                     </Grid>
//                     <Grid item xl={5} lg={5}>
//                       <Typography>{ptc_ptname}</Typography>
//                     </Grid>
//                     <Grid item xl={5} lg={5}>
//                       <Typography>Bed</Typography>
//                     </Grid>
//                     <Grid item xl={5} lg={5}>
//                       <Typography>{bdc_no}</Typography>
//                     </Grid>
//                     <Grid item xl={5} lg={5}>
//                       <Typography>Doctor</Typography>
//                     </Grid>
//                     <Grid item xl={5} lg={5}>
//                       <Typography>{doc_name}</Typography>
//                     </Grid>
//                     <Grid item xl={12} lg={12}>
//                       <SelectDiet value={diet} setValue={setDiet} />
//                     </Grid>
//                     <Grid item xl={12} lg={12}>
//                       <CustomTextarea
//                         style={{ width: 375 }}
//                         minRows={4}
//                         placeholder="Remarks"
//                         onchange={updateRemarks}
//                         value={remark}
//                       />
//                     </Grid>
//                     <Grid item xl={12} lg={12}>
//                       <CusCheckBox
//                         label="Consultation Required"
//                         color="primary"
//                         size="md"
//                         name="appRrquired"
//                         value={appRrquired}
//                         checked={appRrquired}
//                         onCheked={updaterequiredt}
//                       />
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </Box>
//           </Box>
//         </DialogContent>
//         <Box>
//           <Button color="secondary" onClick={submitDietplan}>
//             Save
//           </Button>
//           <Button onClick={reset} color="secondary">
//             Cancel
//           </Button>
//         </Box>
//       </Dialog>
//     </Fragment>
//   )
// }
// export default memo(DietPlan)
