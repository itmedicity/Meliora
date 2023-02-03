import React, { Fragment, useCallback, useState, memo } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper, Typography } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useMemo } from 'react';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { useSelector } from 'react-redux';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const NdrfModel = ({ open, setOpen, datas, count, setCount }) => {

    const { req_slno, req_date, actual_requirement, needed, location, expected_date,
        request_dept_slno, request_deptsec_slno } = datas[0]

    const reqdate = format(new Date(req_date), 'dd-MM-yyyy')
    const expdate = format(new Date(expected_date), 'dd-MM-yyyy')

    const [approve, setApprove] = useState(false)
    //redux for geting login id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const updateApprove = useCallback((e) => {
        if (e.target.checked === true) {
            setApprove(true)
        }
        else {
            setApprove(false)

        }
    }, [])

    const postdata = useMemo(() => {

        return {
            req_slno: req_slno,
            actual_requirement: actual_requirement,
            needed: needed,
            request_dept_slno: request_dept_slno,
            request_deptsec_slno: request_deptsec_slno,
            location: location,
            create_user: id
        }
    }, [req_slno, actual_requirement, needed, request_dept_slno, request_deptsec_slno, location, id])




    const submit = useCallback((e) => {
        e.preventDefault();

        const InsertFun = async (postdata) => {
            const result = await axioslogin.post('/ndrf/NdrfInsert', postdata);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setApprove(false)
                setOpen(false)
                setCount(count + 1)
            }
            else {
                warningNotify(message)
            }

        }
        if (approve === true) {
            InsertFun(postdata)
        }

    }, [postdata, approve, count, setCount, setOpen])

    // reset 
    const Close = useCallback(() => {
        setOpen(false)
        setApprove(false)

    }, [setOpen])


    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                < DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: 600,
                        height: 400,

                    }}
                >
                    < DialogContentText id="alert-dialog-slide-descriptiona">
                        NRDF
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
                                    p: 1,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 4 }}>
                                        <Typography>Request No:  {req_slno}</Typography>
                                    </Box>
                                    <Box
                                    >
                                        <Typography>Req.Date: {reqdate}</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 1,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>

                                    <Box
                                        sx={{ pr: 3 }}>
                                        <Typography>Actual Requirement:</Typography>
                                    </Box>
                                    <Paper sx={{
                                        width: '100%', height: 50,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='outlined'>
                                        {actual_requirement}
                                    </Paper>


                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 1,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>

                                    <Box
                                        sx={{ pr: 3 }}>
                                        <Typography>Justification for need:</Typography>
                                    </Box>
                                    <Paper sx={{
                                        width: '100%', height: 50,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='outlined'>
                                        {needed}
                                    </Paper>


                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 1,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>

                                    <Box
                                        sx={{ pr: 9 }}>
                                        <Typography>Location:</Typography>
                                    </Box>
                                    <Paper sx={{
                                        width: '100%', height: 50,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='outlined'>
                                        {location}
                                    </Paper>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 1,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 9 }}>
                                        <Typography>Expected Date: {expdate}</Typography>
                                    </Box>

                                </Box>

                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 1,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <CusCheckBox
                                        label="NDRF Approve"
                                        color="primary"
                                        size="md"
                                        name="approve"
                                        value={approve}
                                        checked={approve}
                                        onCheked={updateApprove}
                                    />

                                </Box>
                            </Box>
                        </Paper>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={submit} >Save</Button>
                    <Button onClick={Close} color="secondary" >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default memo(NdrfModel)