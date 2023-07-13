import React, { Fragment, useState, useEffect, memo, useCallback } from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { ToastContainer } from 'react-toastify';
import { Box, Paper, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import { errorNotify, infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import CustomTextarea from 'src/views/Components/CustomTextarea';
import { format } from 'date-fns'
import CusCheckBox from 'src/views/Components/CusCheckBox';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const Rectifymodel = ({ open, setOpen, detail, count, setCount, empName, setempname }) => {
    //redux for geting login id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    //intialisation
    const [rectify, setrectify] = useState({
        complaint_slno: 0,
        complaint_desc: '',
        req_type_name: '',
        complaint_dept_name: '',
        complaint_type_name: '',
        hic_policy_name: '',
        compalint_date: ''
    })
    //destrucutring
    const { complaint_slno, complaint_desc,
        sec_name, em_name, date, Time, compalint_status
    } = rectify

    const [select, setSelect] = useState(false)
    const updateSelect = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setSelect({ ...select, [e.target.name]: value })
    }
    const [Employee, setEmployee] = useState([])
    const getemp = (e, v) => {
        if (e === true) {
            const obj = {
                emids: v
            }
            setEmployee([...Employee, obj])
        }
        else {
            const obj = {
                emids: v
            }
            const newarry = Employee.filter((val) => {
                return val.emids !== obj.emids
            })
            setEmployee(newarry)
        }
    }
    //setting data to be displayed in modal
    useEffect(() => {
        const rectifyfunction = () => {
            const { complaint_slno, complaint_desc, req_type_name, complaint_dept_name, complaint_type_name, hic_policy_name, compalint_date, sec_name, em_name,
                date, Time, compalint_status, cm_rectify_status, rectify_pending_hold_remarks
            } = detail[0]
            const frmdata = {
                complaint_slno: complaint_slno,
                complaint_desc: complaint_desc,
                req_type_name: req_type_name,
                complaint_dept_name: complaint_dept_name,
                complaint_type_name: complaint_type_name,
                hic_policy_name: hic_policy_name,
                compalint_date: compalint_date,
                sec_name: sec_name,
                em_name: em_name,
                date: date,
                Time: Time,
                compalint_status: compalint_status
            }
            setrectify(frmdata)
            setHold(cm_rectify_status === 'O' ? true : false);
            setPendhold(rectify_pending_hold_remarks)
            setPending(cm_rectify_status === 'P' ? true : false);
        }
        rectifyfunction()
    }, [detail])
    //pending checkbox
    const [pending, setPending] = useState(false);
    //hold check box
    const [hold, setHold] = useState(false);
    //rectified check box
    const [rectified, setRectify] = useState(false);
    //flag for remark description
    const [flag, setFlag] = useState(0);
    //pending check box function
    const updatePending = useCallback((e) => {
        if (e.target.checked === true) {
            setPending(true)
            setHold(false)
            setRectify(false)
            setFlag(1)
        } else {
            setFlag(0)
            setPending(false)
        }
    }, [])
    //hold check box function
    const updateHold = useCallback((e) => {
        if (e.target.checked === true) {
            setHold(true)
            setPending(false)
            setRectify(false)
            setFlag(2)
        } else {
            setFlag(0)
            setHold(false)
        }
    }, [])
    //rectified check box function
    const updateRectified = useCallback((e) => {
        if (e.target.checked === true) {
            setRectify(true)
            setHold(false)
            setPending(false)
            setFlag(0)
        } else {
            setFlag(0)
            setRectify(false)
        }
    }, [])
    //state for  holdinpending reason
    const [pendholdreason, setPendhold] = useState("")
    const updatePendhold = useCallback((e) => {
        setPendhold(e.target.value)
    }, [])
    // data setting to update the complaint mast table and complaint detail table
    const patchData = Employee && Employee.map((val) => {
        return {
            compalint_status: rectified === true ? 2 : compalint_status, // when we click on rectifi status becom 2 other wise status is 1
            cm_rectify_status: pending === true ? 'P' : hold === true ? 'O' : rectified === true ? 'R' : null, //we click pending rectify status becom P so onn
            cm_rectify_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            rectify_pending_hold_remarks: pending === true ? pendholdreason : hold === true ?
                pendholdreason : rectified === true ? pendholdreason : null,
            pending_onhold_time: pending === true ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : hold === true ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : null,
            pending_onhold_user: id,
            assigned_emp: val.emids,
            verify_spervsr: 0,
            complaint_slno: complaint_slno
        }
    })
    // function to database update
    const rectifycmplt = useCallback((e) => {
        e.preventDefault();
        const resetFrmdata = {
            complaint_slno: 0,
            complaint_desc: '',
            req_type_name: '',
            complaint_dept_name: '',
            complaint_type_name: '',
            hic_policy_name: '',
            compalint_date: ''
        }
        const updateFun = async (patchData) => {
            const result = await axioslogin.patch(`/Rectifycomplit/updatecmp`, patchData);
            const { success, message } = result.data;
            if (success === 2) {
                setCount(count + 1);
                setOpen(false)
                setrectify(resetFrmdata)
                setPending(false)
                setHold(false)
                setRectify(false)
                setSelect(false)
                setPendhold("")
                setEmployee([])
                setempname([])
                succesNotify(message)
            }
            else {
                errorNotify("Error Occured")
            }
        }
        if (pending === true || hold === true || rectified === true && Employee.length !== 0) {
            updateFun(patchData)
        }
        else {
            infoNotify("Please Select any employee Or Choose Any Option")
        }
    }, [patchData, count, setCount, setOpen, hold, pending, rectified, Employee, setempname])
    //modal close function
    const handleClose = () => {
        setOpen(false);
        setFlag(0);
        setRectify(false);
        setPending(false);
        setHold(false);
        setPendhold('');
        setSelect(false)
        setEmployee([])
    };
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
                    {"Complaint Rectification"}
                </DialogTitle>
                <DialogContent sx={{
                    width: "100%",
                    height: 450
                }}>
                    <Box sx={{ width: "100%", mt: 0 }}>
                        <Box>
                            <Paper square elevation={3} sx={{ p: 2, mt: 1, pt: 0 }} >
                                {/* 2nd section */}
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                    p: 0.5,
                                    mt: 1
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
                                        <Typography>{sec_name}</Typography>
                                    </Box>
                                    <Box>
                                    </Box>
                                </Box>
                                {/* 3rd section */}
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                    p: 0.5,
                                    mt: 1
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                    }} >
                                        <Typography>Assigned Employee</Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                    }} >
                                        <Typography>{em_name}</Typography>
                                    </Box>
                                    <Box>
                                    </Box>
                                </Box>
                                {/* 4th section */}
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                    p: 0.5,
                                    mt: 1
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                    }} >
                                        <Typography>Date & Time</Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                    }} >
                                        <Typography>{date} & {Time}</Typography>
                                    </Box>
                                    <Box>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                    p: 0.5,
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        width: "100%"
                                    }} >
                                        <Typography sx={{ textAlign: "center" }}>Complaint Description</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                    p: 0.5,
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                        mt: 0
                                    }} >
                                        <CustomTextarea
                                            style={{ width: 390 }}
                                            minRows={3}
                                            value={complaint_desc}
                                            disabled
                                        />
                                    </Box>
                                </Box>

                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                    p: 0.5,
                                }}>

                                    <Box sx={{
                                        display: 'flex',
                                        width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                    }} >
                                        <Typography>Actual Assigned</Typography>

                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                    }} >

                                        {
                                            empName && empName.map((val) => {
                                                return <Box key={val.assigned_emp} sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                                }}>

                                                    {/* <CssVarsProvider> */}
                                                    <Checkbox
                                                        color="primary"

                                                        // defaultChecked={false}
                                                        // disabled={disabled}
                                                        label={val.em_name}
                                                        value={val.assigned_emp}
                                                        name={val.em_name}
                                                        onChange={(e) => {
                                                            updateSelect(e)
                                                            getemp(e.target.checked, e.target.value)
                                                        }}
                                                        checked={val.check === 1 ? true : select.check}

                                                    />

                                                    <Typography sx={{ pt: 1 }}>{val.em_name}</Typography>

                                                    {/* </CssVarsProvider> */}

                                                </Box>
                                            })
                                        }

                                    </Box>



                                </Box>

                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                    p: 0.5,
                                    mt: 1, mb: 1
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        width: "40%"
                                    }} >
                                        <CusCheckBox
                                            label="On Progress"
                                            color="primary"
                                            size="md"
                                            name="pending"
                                            value={pending}
                                            checked={pending}
                                            onCheked={updatePending}
                                        />
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        width: "30%"
                                    }} >
                                        <CusCheckBox
                                            label="On Hold"
                                            color="primary"
                                            size="md"
                                            name="hold"
                                            value={hold}
                                            checked={hold}
                                            onCheked={updateHold}
                                        />
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        width: "30%"
                                    }} >
                                        <CusCheckBox
                                            label="Rectify"
                                            color="primary"
                                            size="md"
                                            name="rectified"
                                            value={rectified}
                                            checked={rectified}
                                            onCheked={updateRectified}
                                        />
                                    </Box>
                                </Box>
                                {
                                    flag === 1 ? <Box sx={{ p: 0.5 }}>
                                        <CustomTextarea
                                            style={{ width: 390 }}
                                            minRows={4}
                                            placeholder=" Pending Remarks"
                                            onchange={updatePendhold}
                                            value={pendholdreason === null ? '' : pendholdreason}
                                        />
                                    </Box> : flag === 2 ? <Box sx={{ p: 0.5 }}>
                                        <CustomTextarea
                                            style={{ width: 390 }}
                                            minRows={4}
                                            placeholder=" On Hold Remarks"
                                            onchange={updatePendhold}
                                            value={pendholdreason === null ? '' : pendholdreason}
                                        />
                                    </Box> : <Box sx={{ p: 0.5 }}>
                                        <CustomTextarea
                                            style={{ width: 390 }}
                                            minRows={4}
                                            placeholder="Remarks"
                                            onchange={updatePendhold}
                                            value={pendholdreason === null ? '' : pendholdreason}
                                        />
                                    </Box>
                                }

                            </Paper>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={rectifycmplt} color="secondary" >Ok</Button>
                    <Button onClick={handleClose} color="secondary" >Close</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
export default memo(Rectifymodel)