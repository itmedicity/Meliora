import React from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { ToastContainer } from 'react-toastify';
import { Box, Paper } from '@mui/material'
import { Button, Typography } from "@material-ui/core";
import { Fragment } from 'react';
import { useState } from 'react';
import { useEffect, memo } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { errorNotify, infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const Rectifymodel = ({ open, handleClose, setOpen, detail, count, setCount }) => {

    const [rectify, setrectify] = useState({
        complaint_slno: 0,
        complaint_desc: '',
        req_type_name: '',
        complaint_dept_name: '',
        complaint_type_name: '',
        hic_policy_name: '',
        compalint_date: ''

    })
    const { complaint_slno, complaint_desc, req_type_name, complaint_dept_name, complaint_type_name, compalint_date } = rectify


    // const [slno, setslno] = useState(0)

    useEffect(() => {
        const rectifyfunction = () => {
            const { complaint_slno, complaint_desc, req_type_name, complaint_dept_name, complaint_type_name, hic_policy_name, compalint_date } = detail[0]
            const frmdata = {
                complaint_slno: complaint_slno,
                complaint_desc: complaint_desc,
                req_type_name: req_type_name,
                complaint_dept_name: complaint_dept_name,
                complaint_type_name: complaint_type_name,
                hic_policy_name: hic_policy_name,
                compalint_date: compalint_date
            }
            setrectify(frmdata)
            // setslno(complaint_slno)
        }
        rectifyfunction()


    }, [detail])




    const patchData = useMemo(() => {
        return {
            compalint_status: 2,
            complaint_slno: complaint_slno
        }
    }, [complaint_slno])



    const rectifycmplt = useCallback((e) => {
        e.preventDefault();
        const updateFun = async (patchData) => {
            const result = await axioslogin.patch(`/Rectifycomplit/updatecmp`, patchData);
            const { success, message } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1);
                setOpen(false)
            }
            else {
                errorNotify(message)
            }
        }
        if (patchData !== 0) {
            updateFun(patchData)
        }
        else {
            infoNotify("error occured contact EDP")
        }
    }, [patchData, count, setCount, setOpen])




    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                <DialogTitle>
                    {"complaint rectification"}
                </DialogTitle>
                <DialogContent sx={{
                    minWidth: 300,
                    maxWidth: 600,
                    width: 1000,
                }}>
                    <Box sx={{ width: "100%" }}>
                        <Paper square elevation={3}
                            sx={{
                                width: "100%", pr: 1,
                                display: "flex",
                                alignItems: "left",
                                textAlign: "left",
                                justifyContent: "space-evenly",
                                flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" },
                            }}
                        >
                            <Box sx={{ display: "flex", width: "100%" }}>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>comp slno</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>:</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>{complaint_slno}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>Comp.desc</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>:</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>{complaint_desc} </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography >Comp. dept</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>:</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>{complaint_dept_name}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography >Request type</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>:</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>{req_type_name}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography >Comp.type</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>:</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>
                                        {complaint_type_name}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography >Date</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>:</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>
                                        {compalint_date}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={rectifycmplt} color="secondary" >Rectify</Button>
                    <Button onClick={handleClose} color="secondary" >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default memo(Rectifymodel)