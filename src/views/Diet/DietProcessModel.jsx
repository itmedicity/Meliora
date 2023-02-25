import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import { Box, Paper } from '@mui/material'
import { Typography } from "@material-ui/core";
import { useCallback } from 'react';
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNotify, infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const DietProcessModel = ({ open, handleClose, setOpen, detail, startdate, count, setCount, dayselect, setSearch }) => {
    const [proces, setprocess] = useState({
        plan_slno: 0,
        pt_no: 0,
        ptc_ptname: '',
        diet_name: '',
        plan_remark: '',
        bd_code: 0,
        discharge: '',
        diet_slno: 0,
        ip_no: 0
    })
    const { plan_slno, pt_no, ptc_ptname, diet_name, plan_remark, bd_code, discharge, diet_slno, ip_no } = proces

    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [menus, setmenus] = useState([])
    const [DietMenu, setDietMenu] = useState(0)

    useEffect(() => {
        const destrufunction = () => {
            const { plan_slno, pt_no, ptc_ptname, diet_name, plan_remark, diet_slno, discharge, bd_code, ip_no } = detail[0]
            const frmdata = {
                plan_slno: plan_slno,
                pt_no: pt_no,
                ptc_ptname: ptc_ptname,
                diet_name: diet_name,
                plan_remark: plan_remark,
                discharge: discharge,
                bd_code: bd_code,
                diet_slno: diet_slno,
                ip_no: ip_no
            }
            setprocess(frmdata)
            const getDietMenu = async () => {
                const result = await axioslogin.get(`/common/dMenu/${diet_slno}`,)
                const { data, success, message } = result.data;
                if (success === 1) {
                    const { dmenu_slno } = data[0]
                    setDietMenu(dmenu_slno)
                    const d = new Date(startdate);
                    let day = d.getDay();
                    const getmenu = {
                        bd_code: bd_code,
                        diet_slno: diet_slno,
                        dmenu_slno: dmenu_slno,
                        days: day
                    }
                    const result1 = await axioslogin.post('/dietprocess/dmenubyday', getmenu);
                    const { succes, messagee, dataa } = result1.data
                    if (succes === 1) {
                        setmenus(dataa)
                    }
                    else {
                        infoNotify(messagee);
                        setOpen(false)
                    }
                }
                else {
                    infoNotify(message);
                }
            }
            getDietMenu()
        }
        destrufunction()

    }, [detail, startdate, setOpen])

    const postdata = useMemo(() => {
        return {
            plan_slno: plan_slno,
            dmenu_slno: DietMenu,
            ip_no: ip_no,
            pt_no: pt_no,
            diet_slno: diet_slno,
            bd_code: bd_code,
            process_date: dayselect === 0 ? format(new Date(), "yyyy-MM-dd hh-mm-ss") : format(new Date(startdate), "yyyy-MM-dd hh-mm-ss"),
            process_status: 1,
            discharge_status: discharge === 'N' ? 1 : 0,
            em_id: id
        }
    }, [plan_slno, DietMenu, ip_no, pt_no, diet_slno, bd_code, dayselect, discharge, id, startdate])
    const Process = useCallback((e) => {
        e.preventDefault();
        const InsertFun = async (postdata) => {
            const result = await axioslogin.post('/dietprocess', postdata);
            return result.data
        }

        const insertDetail = async (procesDetail) => {
            const result1 = await axioslogin.post('/dietprocess/processDetailInsert', procesDetail);
            const { suces, messag } = result1.data;
            if (suces === 1) {
                succesNotify(messag)
                setCount(count + 1);
                setOpen(false)
                setSearch(0)
            }
            else if (suces === 0) {
                infoNotify(messag);
            }
            else {
                infoNotify(messag)
            }
        }

        if (menus.length !== 0) {
            InsertFun(postdata).then((value) => {
                const { success, message, insetid } = value;
                if (success === 1) {
                    const procesDetail = menus && menus.map((val) => {
                        return {
                            proc_slno: insetid,
                            type_slno: val.type_slno,
                            rate_hos: val.hosp_rate,
                            rate_cant: val.cant_rate
                        }
                    })
                    insertDetail(procesDetail)
                }
                else {
                    errorNotify(message)
                }
            })
        }
        else {
            infoNotify("No Menus are present in selected day under planed Diet")
        }
    }, [postdata, menus, count, setCount, setOpen, setSearch])

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
                <DialogTitle sx={{ fontSize: 10 }}>
                    {"Diet Plan Process"}
                </DialogTitle>
                <DialogContent sx={{
                    minWidth: 300,
                    maxWidth: 600,
                    width: 500,
                }}>
                    <Box sx={{ width: "100%" }}>
                        <Paper variant='outlined'
                            sx={{
                                width: "100%", pr: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" },
                            }}
                        >
                            <Box sx={{ display: "flex", width: "100%" }}>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>Plan SlNo</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>:</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography> {plan_slno}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>  Patient Id</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>:</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>  {pt_no}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography >Patient Name</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>:</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography> {ptc_ptname}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography >Diet</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>:</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography> {diet_name}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography >Remarks</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography>:</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: 'space-evenly', flex: 1 }}>
                                    <Typography> {plan_remark}</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={Process} color="secondary" >Process</Button>
                    <Button onClick={handleClose} color="secondary" >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default memo(DietProcessModel)
