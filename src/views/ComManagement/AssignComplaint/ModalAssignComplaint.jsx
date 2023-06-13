import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { Paper } from '@mui/material';
import CustomTextarea from 'src/views/Components/CustomTextarea';
import DeptWiseEmpSelect from 'src/views/CommonSelectCode/DeptWiseEmpSelect';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { format } from 'date-fns'
import { CssVarsProvider, Typography } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import ComPrioritySelect from 'src/views/CommonSelectCode/ComPrioritySelect';
import CusCheckBox from 'src/views/Components/CusCheckBox';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const ModalAssignComplaint = ({ open, setOpen, complaint, empdept, count, setCount, id }) => {
    //props data for modal
    const { complaint_slno, complaint_desc, compalint_date, sec_name, req_type_name, complaint_type_name,
        compalint_priority, complaint_hicslno
    } = complaint[0]
    // sate for getting emp dept
    const [empdeptwise, setEmpdept] = useState(0)
    // state for remarks
    const [remark, setRemark] = useState('');
    const [prioselet, setPriSelect] = useState(0)
    const [aprroxdate, setapproxdate] = useState(format(new Date(), "yyyy-MM-dd"))
    //hold check box
    const [hold, setHold] = useState(false);
    //flag for remark description
    const [flag, setFlag] = useState(0);
    const [holdremark, setholdRemark] = useState('');
    //hold check box function
    const updateHold = useCallback((e) => {
        if (e.target.checked === true) {
            setHold(true)
            setFlag(1)
        } else {
            setFlag(0)
            setHold(false)
        }
    }, [])
    const updateaprroxdate = (e) => {
        setapproxdate(e.target.value)
    }
    //setting emp dept
    useEffect(() => {
        if (empdept.length !== 0) {
            const { em_department } = empdept[0]
            setEmpdept(em_department)
        }
    }, [empdept])
    //updating remark state
    const updateRemark = useCallback((e) => {
        setRemark(e.target.value)
    }, [setRemark])

    //updating on Hold remark state
    const updateHoldRemark = useCallback((e) => {
        setholdRemark(e.target.value)
    }, [setholdRemark])

    //reset to intial
    const reset = useCallback(() => {
        setOpen(false)
        setPriSelect(0)
        setRemark('')
        setPersonName([])
        setholdRemark('')
        setFlag(0)
        setHold(false)
    }, [setOpen, setRemark])
    //setting data to detailed assign
    const [personName, setPersonName] = useState([]);
    //data setting to indert to db
    const postData = personName && personName.map((val) => {
        return {
            complaint_remark: remark,
            complaint_slno: complaint_slno,
            assigned_emp: val,
            assigned_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            assign_rect_status: 0,
            assigned_user: id,
            compalint_priority: prioselet,
            aprrox_date: aprroxdate,
            assign_status: 1
        }
    })

    const postdata = useMemo(() => {
        return {
            complaint_slno: complaint_slno,
            cm_rectify_status: flag === 1 ? 'O' : null,
            rectify_pending_hold_remarks: holdremark,
            pending_onhold_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            pending_onhold_user: id,
            assigned_emp: id,
            assigned_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            assign_rect_status: 0,
            assign_status: 1,
            assigned_user: id
        }
    }, [complaint_slno, flag, id, holdremark])


    //inserting detailed assign
    const detailAssign = useCallback(() => {
        const Assignemp = async (postData) => {
            const result = await axioslogin.post(`/complaintassign/detailassign`, postData);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset();
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        const OnHold = async (postdata) => {
            const result = await axioslogin.post(`/complaintassign/hold/beforAssign`, postdata);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset();
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        if (personName.length === 0 && flag === 0) {
            infoNotify("Please Select Employee")
        } else if (flag === 1) {
            OnHold(postdata)
        } else {
            Assignemp(postData);
        }
    }, [postData, postdata, count, flag, reset, setCount, personName])

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
                        Complaint Assign
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
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 8 }}>
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
                                    {flag === 1 ?
                                        <Box sx={{ pl: 8, width: "65%", pt: 0.5 }}                                    >
                                            <CustomTextarea
                                                style={{ width: 390 }}
                                                minRows={4}
                                                placeholder="On-Hold Remarks"
                                                name='holdremark'
                                                value={holdremark}
                                                onchange={updateHoldRemark}
                                            />
                                        </Box> : null}
                                </Box>
                                {/* {
                                    compalint_priority === 1 ? <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ pr: 1 }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15, pr: 8 }}>Priority Reason:</Typography>

                                            </CssVarsProvider>
                                        </Box>
                                        <Box
                                            sx={{}}>
                                            <CssVarsProvider>
                                                <Typography sx={{ textTransform: "capitalize", fontSize: 15, pl: 5.4 }}> {priority_reason !== null ? priority_reason.toLowerCase() : "Not Given"}</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                    </Box> : null
                                } */}
                                {flag === 0 ?
                                    <Box>
                                        <Box sx={{
                                            width: "100%",
                                            display: "flex",
                                            p: 0.5,
                                            flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                        }}>
                                            <Box
                                                sx={{ pr: 8 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}>Select Priority: </Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <Box sx={{ pl: 7, width: "55%", }}                                    >
                                                <ComPrioritySelect value={prioselet} setValue={setPriSelect} />
                                            </Box>
                                        </Box>
                                        <Box sx={{
                                            width: "100%",
                                            display: "flex",
                                            p: 0.5,
                                            flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                        }}>
                                            <Box
                                                sx={{ pr: 2 }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}>Approx. Completion Date: </Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <Box sx={{ pl: 3.2, width: "51%", pt: 0.5 }}                                    >
                                                <TextFieldCustom
                                                    type="date"
                                                    size="sm"
                                                    name="aprroxdate"
                                                    value={aprroxdate}
                                                    onchange={updateaprroxdate}
                                                />
                                            </Box>
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
                                                    <Typography sx={{ fontSize: 15 }}>Select Employee: </Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <Box sx={{ pl: 5, width: "53%", pt: 0.5 }}                                    >
                                                <DeptWiseEmpSelect personName={personName} setPersonName={setPersonName} empdeptwise={empdeptwise} />
                                            </Box>
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
                                                    <Typography sx={{ fontSize: 15 }}>Reamrks: </Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <Box sx={{ pl: 11.6, width: "65%", pt: 0.5 }}                                    >
                                                <CustomTextarea
                                                    style={{ width: 390 }}
                                                    minRows={4}
                                                    placeholder="Remarks"
                                                    name='remark'
                                                    value={remark}
                                                    onchange={updateRemark}
                                                />
                                            </Box>
                                        </Box>

                                    </Box> : null}

                            </Box>
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={detailAssign} >Save</Button>
                    <Button color="secondary" onClick={reset}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>

    )
}
export default memo(ModalAssignComplaint)