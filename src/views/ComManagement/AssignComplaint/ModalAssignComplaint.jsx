import React, { Fragment, memo, useCallback, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { Paper, Typography } from '@mui/material';
import Test from 'src/views/CommonSelectCode/Test';
import CustomTextarea from 'src/views/Components/CustomTextarea';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const ModalAssignComplaint = ({ open, setOpen, complaint }) => {

    const { complaint_slno, complaint_desc, sec_name, req_type_name, complaint_dept_name, complaint_type_name } = complaint[0]
    const [value, setValue] = useState(0)
    const reset = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                onClose={reset}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                < DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: "100%",
                        height: "100%"
                    }}
                >
                    < DialogContentText id="alert-dialog-slide-descriptiona">
                        Complaint Assign
                    </DialogContentText>
                    <Box sx={{ width: "100%", p: 1 }}>
                        <Paper square elevation={3} sx={{ p: 2, mt: 1 }} >


                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                backgroundColor: { xs: 'green', sm: 'red', md: 'yellow', lg: 'orange', xl: 'gray', },
                                p: 1,
                                mt: 1
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },

                                }} >
                                    <Typography>Request Type</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },

                                }} >
                                    <Typography>{req_type_name}</Typography>

                                </Box>
                                <Box>

                                </Box>
                            </Box>
                            {/* 2nd section */}
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                // backgroundColor: { xs: 'green', sm: 'red', md: 'yellow', lg: 'orange', xl: 'gray', },
                                p: 1
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },

                                }} >
                                    <Typography>Complaint Department</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },

                                }} >
                                    <Typography>{complaint_dept_name}</Typography>
                                </Box>

                            </Box>
                            {/* 3rd section */}
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                // backgroundColor: { xs: 'green', sm: 'red', md: 'yellow', lg: 'orange', xl: 'gray', },
                                p: 1
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },

                                }} >
                                    <Typography>Complaint Type</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },

                                }} >
                                    <Typography>{complaint_type_name}</Typography>
                                </Box>

                            </Box>
                            {/* 4th section */}
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                // backgroundColor: { xs: 'green', sm: 'red', md: 'yellow', lg: 'orange', xl: 'gray', },
                                p: 1
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    width: "100%"
                                    // width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                                }} >
                                    <Typography sx={{ textAlign: "center" }}>Complaint Description</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                                }} >
                                    {/* <Typography>{complaint_desc}</Typography> */}
                                    {/* <CustomTextarea
                                        style={{ width: 200 }}
                                        minRows={4}
                                        value={complaint_desc}
                                        placeholder="Remarks"

                                    /> */}
                                </Box>
                            </Box>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                // backgroundColor: { xs: 'green', sm: 'red', md: 'yellow', lg: 'orange', xl: 'gray', },
                                p: 1
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                    mt: 0
                                }} >
                                    <CustomTextarea
                                        style={{ width: 390 }}
                                        minRows={4}
                                        value={complaint_desc}
                                        disabled
                                    // placeholder="Remarks"
                                    />
                                </Box>
                            </Box>
                            {/* 5th section */}
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                // backgroundColor: { xs: 'green', sm: 'red', md: 'yellow', lg: 'orange', xl: 'gray', },
                                p: 1
                            }}>
                                <Box sx={{
                                    width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                                }} >
                                    <Test value={value} setValue={setValue} />
                                </Box>
                            </Box>
                            {/* 6th section */}
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                // backgroundColor: { xs: 'green', sm: 'red', md: 'yellow', lg: 'orange', xl: 'gray', },
                                p: 1
                            }}>
                                <Box sx={{
                                    width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                                }} >
                                    <CustomTextarea
                                        style={{ width: 390 }}
                                        minRows={4}
                                        placeholder="Remarks"

                                    />
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" >Save</Button>
                    <Button color="secondary" onClick={reset}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default memo(ModalAssignComplaint)