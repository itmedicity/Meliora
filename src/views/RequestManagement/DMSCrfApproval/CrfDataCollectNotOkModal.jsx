import React, { Fragment, memo, useEffect, useState } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import { CssVarsProvider, Typography } from '@mui/joy'
import { axioslogin } from 'src/views/Axios/Axios';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const CrfDataCollectNotOkModal = ({ open, setOpen, req_slno, setEnable, }) => {

    const Close = () => {
        setOpen(false)
        setEnable(0)
    }
    const [dataCollect, setDataCollect] = useState([])
    useEffect(() => {
        const CrfDAtaPending = async (req_slno) => {
            const result = await axioslogin.get(`/requestRegister/DataCollectionNotComplete/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setDataCollect(data)
            }
            else {
                setDataCollect([])
            }
        }
        CrfDAtaPending(req_slno)

    }, [req_slno])

    return (
        <Fragment>
            <ToastContainer />

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
                fullWidth
                maxWidth='sm'
            >
                < DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: "100%",
                        height: 200
                    }}
                >

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
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Data Collection Not Completed,After Completing This You Can Approve</Typography>
                                    </CssVarsProvider>
                                </Box>

                                {dataCollect && dataCollect.map((val, index) => {
                                    return <Box key={index}>
                                        <Box sx={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                        }}>
                                            <Box sx={{
                                                width: "100%", display: "flex", p: 0.5,
                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                            }}>
                                                <Box
                                                    sx={{ width: "50%", }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ pl: 1, fontSize: 15 }}>Data Collection Pending Department:</Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                                <Paper sx={{
                                                    width: '50%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                }} variant='none'>
                                                    {val.data_entered}
                                                </Paper>
                                            </Box>
                                            <Box sx={{
                                                width: "100%", display: "flex", p: 0.5,
                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                            }}>
                                                <Box
                                                    sx={{ width: "50%", }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ pl: 1, fontSize: 15 }}>Requested Remarks:</Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                                <Paper sx={{
                                                    width: '50%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                }} variant='none'>
                                                    {val.crf_req_remark}
                                                </Paper>
                                            </Box>
                                            <Box sx={{
                                                width: "100%", display: "flex", p: 0.5,
                                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                            }}>
                                                <Box
                                                    sx={{ width: "25%", }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ pl: 1, fontSize: 15 }}>Requested Details:</Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                                <Paper sx={{
                                                    width: '25%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                }} variant='none'>
                                                    {val.req_user}
                                                </Paper>
                                                <Paper sx={{
                                                    width: '50%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                    overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                }} variant='none'>
                                                    {val.create_date}
                                                </Paper>
                                            </Box>
                                        </Box>
                                    </Box>
                                })}
                            </Box>
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={Close}
                        color="secondary" >Ok</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default memo(CrfDataCollectNotOkModal)