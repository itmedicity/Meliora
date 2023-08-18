import React, { Fragment, memo } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import { CssVarsProvider, Typography } from '@mui/joy'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const DataCollectionNotDone = ({ open, setOpen }) => {
    const Close = () => {
        setOpen(false)
    }

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
                        height: 100
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
                                        <Typography sx={{ fontSize: 15 }}>Data Collection Not Completed</Typography>
                                    </CssVarsProvider>
                                </Box>

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

export default memo(DataCollectionNotDone)