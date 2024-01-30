import React from 'react'

const InterDeptTransModal = () => {
    return (
        <div>InterDeptTransModal</div>
    )
}

export default InterDeptTransModal


// import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
// import { ToastContainer } from 'react-toastify'
// import Dialog from '@mui/material/Dialog';
// import Slide from '@mui/material/Slide';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import { Box } from '@mui/system';
// import { Paper } from '@mui/material';
// import CustomTextarea from 'src/views/Components/CustomTextarea';
// import DeptWiseEmpSelect from 'src/views/CommonSelectCode/DeptWiseEmpSelect';
// import { axioslogin } from 'src/views/Axios/Axios';
// import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
// import { format } from 'date-fns'
// import { CssVarsProvider, Typography } from '@mui/joy'
// import TextFieldCustom from 'src/views/Components/TextFieldCustom'
// import ComPrioritySelect from 'src/views/CommonSelectCode/ComPrioritySelect';
// import CusCheckBox from 'src/views/Components/CusCheckBox';
// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="left" ref={ref} {...props} />;
// });

// const InterDeptTransModal = ({ open, setOpen }) => {
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
//                         height: "100%"
//                     }}
//                 >
//                     < DialogContentText id="alert-dialog-slide-descriptiona">
//                         Inter Department Asset Transfer
//                     </DialogContentText>

//                     <Box sx={{ width: "100%", mt: 0 }}>
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

//                                 </Box>
//                             </Box>
//                         </Paper>
//                     </Box>
//                 </DialogContent>
//             </Dialog>
//         </Fragment>
//     )
// }

// export default memo(InterDeptTransModal)



// import React, { Fragment, useCallback, useEffect, useState, memo } from 'react'
// import { ToastContainer } from 'react-toastify'
// import Dialog from '@mui/material/Dialog';
// import Slide from '@mui/material/Slide';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import { Box } from '@mui/system';
// import { Paper, Typography } from '@mui/material';
// import CustomTextarea from 'src/views/Components/CustomTextarea';
// import Button from '@mui/material/Button';
// import DialogActions from '@mui/material/DialogActions';
// import { useSelector } from 'react-redux';
// import AssistantEmpSelect from 'src/views/CommonSelectCode/AssistantEmpSelect';
// import { format } from 'date-fns'
// import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
// import { axioslogin } from 'src/views/Axios/Axios';
// import CusCheckBox from 'src/views/Components/CusCheckBox';
// import AmRoomSelWONameUDepSec from 'src/views/CommonSelectCode/AmRoomSelWONameUDepSec';
// import AmSubRmSelWONamURoom from 'src/views/CommonSelectCode/AmSubRmSelWONamURoom';
// import { getRoomBasedOnDeptSec } from 'src/redux/actions/AmRoomDeptSecBased.action';
// import { useDispatch } from 'react-redux'
// import RoomSelectNotJoy from './RoomSelectNotJoy';
// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="left" ref={ref} {...props} />;
// });

// const InterDeptTransModal = ({ open, setOpen, transFlagData, deptsec }) => {
//     const { am_item_map_slno, assetno, am_manufacture_no, category_name, item_name, rm_room_name,
//         subroom_name } = transFlagData[0]
//     const [roomNo, setRoomNo] = useState(0)
//     const [subRoomNo, setSubRoomNo] = useState(0)
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (deptsec !== 0 && deptsec !== undefined) {
//             console.log("fghj");
//             dispatch(getRoomBasedOnDeptSec(deptsec))
//         }
//     }, [deptsec, dispatch])


//     return (
//         <Fragment>
//             <ToastContainer />
//             <Dialog
//                 open={open}
//                 // onClose={reset}
//                 TransitionComponent={Transition}
//                 keepMounted
//                 aria-describedby="alert-dialog-slide-descriptiona"
//             >
//                 < DialogContent id="alert-dialog-slide-descriptiona"
//                     sx={{
//                         width: "100%",
//                         height: "100%"
//                     }}
//                 >
//                     < DialogContentText id="alert-dialog-slide-descriptiona">
//                         Asset Inter Department Transfer
//                     </DialogContentText>

//                     <Box sx={{ width: "100%", p: 1 }}>
//                         <Paper square elevation={3} sx={{ p: 2, mt: 1 }} >
//                             <Box sx={{
//                                 width: "100%",
//                                 display: "flex",
//                                 flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
//                             }}>
//                                 <Box sx={{
//                                     display: 'flex',
//                                     width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
//                                 }} >
//                                     <Typography>Asset Number</Typography>
//                                 </Box>
//                                 <Box sx={{
//                                     display: 'flex',
//                                     width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
//                                 }} >
//                                     <Typography>{assetno}</Typography>
//                                 </Box>
//                             </Box>
//                             <Box sx={{
//                                 width: "100%",
//                                 display: "flex",
//                                 flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
//                             }}>
//                                 <Box sx={{
//                                     display: 'flex',
//                                     width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
//                                 }} >
//                                     <Typography>Item Name</Typography>
//                                 </Box>
//                                 <Box sx={{
//                                     display: 'flex',
//                                     width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
//                                 }} >
//                                     <Typography>{item_name}</Typography>
//                                 </Box>
//                             </Box>
//                             <Box sx={{
//                                 width: "100%",
//                                 display: "flex",
//                                 flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
//                             }}>
//                                 <Box sx={{
//                                     display: 'flex',
//                                     width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
//                                 }} >
//                                     <Typography>Category</Typography>
//                                 </Box>
//                                 <Box sx={{
//                                     display: 'flex',
//                                     width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
//                                 }} >
//                                     <Typography>{category_name}</Typography>
//                                 </Box>
//                             </Box>
//                             <Box sx={{
//                                 width: "100%",
//                                 display: "flex",
//                                 flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
//                             }}>
//                                 <Box sx={{
//                                     display: 'flex',
//                                     width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
//                                 }} >
//                                     <Typography>Serial No</Typography>
//                                 </Box>
//                                 <Box sx={{
//                                     display: 'flex',
//                                     width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
//                                 }} >
//                                     {am_manufacture_no !== null ? <Typography>{am_manufacture_no}</Typography> :
//                                         <Typography>Not Updated</Typography>}
//                                 </Box>
//                             </Box>
//                             <Box sx={{
//                                 width: "100%",
//                                 display: "flex",
//                                 flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
//                             }}>
//                                 <Box sx={{
//                                     display: 'flex',
//                                     width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
//                                 }} >
//                                     <Typography>Room Name</Typography>
//                                 </Box>
//                                 <Box sx={{
//                                     display: 'flex',
//                                     width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
//                                 }} >
//                                     <Typography>{rm_room_name}</Typography>
//                                 </Box>
//                             </Box>
//                             <Box sx={{
//                                 width: "100%",
//                                 display: "flex",
//                                 flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },

//                             }}>
//                                 <Box sx={{
//                                     display: 'flex',
//                                     width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
//                                 }} >
//                                     <Typography>Sub Room Name</Typography>
//                                 </Box>
//                                 <Box sx={{
//                                     display: 'flex',
//                                     width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
//                                 }} >
//                                     <Typography>{subroom_name}</Typography>
//                                 </Box>
//                             </Box>
//                             <Box sx={{
//                                 width: "100%",
//                                 display: "flex",
//                                 flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },

//                             }}>
//                                 <Box sx={{
//                                     display: 'flex',
//                                     width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
//                                 }} >
//                                     <Typography>Transfer Room</Typography>
//                                 </Box>
//                                 <Box sx={{
//                                     display: 'flex',
//                                     width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
//                                 }} >
//                                     <RoomSelectNotJoy
//                                         value={roomNo}
//                                         setValue={setRoomNo} />


//                                     {/* <AmRoomSelWONameUDepSec
//                                         roomNo={roomNo}
//                                         setRoomNo={setRoomNo} /> */}
//                                 </Box>
//                             </Box>
//                             <Box sx={{
//                                 width: "100%",
//                                 display: "flex", pt: 1,
//                                 flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },

//                             }}>
//                                 <Box sx={{
//                                     display: 'flex',
//                                     width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
//                                 }} >
//                                     <Typography>Transfer Sub Room</Typography>
//                                 </Box>
//                                 <Box sx={{
//                                     display: 'flex',
//                                     width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
//                                 }} >
//                                     <AmSubRmSelWONamURoom
//                                         subRoomNo={subRoomNo}
//                                         setSubRoomNo={setSubRoomNo}
//                                     />
//                                 </Box>
//                             </Box>
//                         </Paper>
//                     </Box>
//                 </DialogContent>
//             </Dialog>
//         </Fragment>

//     )
// }

// export default InterDeptTransModal