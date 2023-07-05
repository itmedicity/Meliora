import React, { Fragment, memo, useCallback } from 'react'
import { ToastContainer } from 'react-toastify'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper } from '@mui/material'
import { format } from 'date-fns'
import { CssVarsProvider, Typography } from '@mui/joy'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const OnHoldMsgRead = ({ open, setOpen, complaint }) => {

    //props data for modal
    const { complaint_slno, complaint_desc, compalint_date, sec_name, req_type_name, complaint_type_name,
        compalint_priority, complaint_hicslno, cm_rectify_status, rectify_pending_hold_remarks1
    } = complaint


    //Message Send Api, Update complaint Mast Table
    const close = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
                fullWidth
                maxWidth='md'
            >
                < DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: '100%',
                        height: "100%"
                    }}
                >
                    < DialogContentText id="alert-dialog-slide-descriptiona">
                        Pending/On-Hold Reason
                    </DialogContentText>

                    <Box sx={{ width: "100%", mt: 0 }}>
                        <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                            }}>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 8 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Complaint No:  {complaint_slno}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 3 }}                                    >
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Request Type: {req_type_name}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 7 }}                                    >
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Request Date: {format(new Date(compalint_date), 'dd-MM-yyyy hh:mm:ss')}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: "row",
                                    }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, pr: 8 }}>Department Section:</Typography>
                                        <Typography sx={{ textTransform: "capitalize", fontSize: 15, pl: 1.7 }}> {sec_name.toLowerCase()}</Typography>
                                    </CssVarsProvider>

                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: "row",
                                    }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, pr: 8 }}>Complaint Type:</Typography>
                                        <Typography sx={{ textTransform: "capitalize", fontSize: 15, pl: 5.4 }}> {complaint_type_name.toLowerCase()}</Typography>
                                    </CssVarsProvider>

                                </Box>

                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>

                                    <Box
                                        sx={{ width: "25%", }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Complaint Description:</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Paper sx={{
                                        width: "75%", minHeight: 10, maxHeight: 70, pl: 0.9, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='none'>
                                        {complaint_desc}
                                    </Paper>


                                </Box>

                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 8 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Priority:  {compalint_priority === 1 ? "Yes" : "No"}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 9.5 }}                                    >
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Infection Control Risk Assessment (ICRA) Recommended: {complaint_hicslno === 1 ? "Yes" : "No"}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>


                                {
                                    cm_rectify_status === "O" ?
                                        <Box sx={{
                                            width: "100%",
                                            display: "flex",
                                            p: 0.5,
                                            flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                        }}>
                                            <Box
                                                sx={{ width: "25%", }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}>On-Hold Reason:</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <Paper sx={{
                                                width: "75%", minHeight: 10, maxHeight: 70, pl: 0.9, fontSize: 15,
                                                overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                            }} variant='none'>
                                                {rectify_pending_hold_remarks1}
                                            </Paper>
                                        </Box> :
                                        cm_rectify_status === "P" ?
                                            <Box sx={{
                                                width: "100%",
                                                display: "flex",
                                                p: 0.5,
                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                            }}>
                                                <Box
                                                    sx={{ width: "25%", }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15 }}>Pending Reason:</Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                                <Paper sx={{
                                                    width: "75%", minHeight: 10, maxHeight: 70, pl: 0.9, fontSize: 15,
                                                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                }} variant='none'>
                                                    {rectify_pending_hold_remarks1}
                                                </Paper>
                                            </Box> :

                                            <Box>

                                            </Box>

                                }
                            </Box>
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={close} >Ok</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default memo(OnHoldMsgRead)