// import { Box, Button, CssVarsProvider, Modal, ModalClose, ModalDialog } from '@mui/joy'
// import React, { Fragment, memo } from 'react'

// const ModalForIPqiMarking = ({ open, setQiflag, handleClose, rowSelect, count, setCount, dailyDate }) => {
//     return (
//         <Fragment>
//             <CssVarsProvider>
//                 <Modal
//                     aria-labelledby="modal-title"
//                     aria-describedby="modal-desc"
//                     open={open}
//                     onClose={handleClose}
//                     sx={{ display: 'flex', justifyContent: 'center' }}
//                 >
//                     <ModalDialog
//                         variant="outlined"
//                         sx={{
//                             minWidth: '50vw',
//                             // borderRadius: 'md',
//                         }}
//                     >
//                         <ModalClose
//                             variant="outlined"
//                             sx={{
//                                 top: 'calc(-1/4 * var(--IconButton-size))',
//                                 right: 'calc(-1/4 * var(--IconButton-size))',
//                                 boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
//                                 borderRadius: '50%',
//                                 bgcolor: 'background.body',
//                                 color: '#bf360c',
//                                 height: 35, width: 35
//                             }}
//                         />
//                         {/* <Box sx={{ pt: 0.5 }}>
//                             <Typography sx={{ fontWeight: 550, fontSize: 18 }}>Declare an Incident </Typography>
//                         </Box> */}

//                         {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 1 }}>
//                             <CssVarsProvider>
//                                 <Button variant='plain'
//                                     // onClick={UpdateincidetData}
//                                     style={{
//                                         fontSize: 17,
//                                         color: '#bf360c',
//                                         cursor: 'pointer',
//                                     }}>Save</Button>
//                                 <Button variant='plain'
//                                     // onClick={Reset}
//                                     style={{
//                                         fontSize: 17,
//                                         color: '#bf360c',
//                                         cursor: 'pointer',
//                                     }}>Cancel</Button>
//                             </CssVarsProvider>
//                         </Box> */}
//                     </ModalDialog>
//                 </Modal>
//             </CssVarsProvider>
//         </Fragment >
//     )
// }

// export default memo(ModalForIPqiMarking)
