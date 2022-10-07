import React, { Fragment, useCallback, useMemo, useState, memo } from 'react'
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper, Grid, Typography } from '@mui/material'
import SelectDiet from '../CommonSelectCode/SelectDiet';
import { axioslogin } from '../Axios/Axios';
import Dialog from '@mui/material/Dialog';
import { infoNotify, succesNotify } from '../Common/CommonCode';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import CustomTextarea from '../Components/CustomTextarea';
import { format } from 'date-fns'
import CusCheckBox from 'src/views/Components/CusCheckBox'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const DietPlan = ({ open, data, setOpen }) => {
    const [diet, setDiet] = useState(0)
    const [remark, setRemark] = useState('')
    const { bdc_no, dietpt_slno, ptc_ptname, ip_no, pt_no, doc_name, bd_code } = data[0]
    // Get login user emp_id
    const Id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const updateRemarks = useCallback((e) => {
        setRemark(e.target.value)
    }, [])
    const [appRrquired, setappRequ] = useState(false)
    const updaterequiredt = useCallback((e) => {
        if (e.target.checked === true) {
            setappRequ(true)
        } else {
            setappRequ(false)
        }
    }, [])

    const v = 1;
    const postdata = useMemo(() => {
        return {
            ip_no: ip_no,
            pt_no: pt_no,
            diet_slno: diet,
            dietpt_slno: dietpt_slno,
            bd_code: bd_code,
            plan_date: format(new Date(), 'yyyy-MM-dd'),
            plan_remark: remark,
            plan_status: 0,
            em_id: Id,
            process: 0,
            discharge: v === 1 ? 'N' : 'Y',
            approve_reqired: appRrquired === true ? 1 : 0
        }
    }, [ip_no, pt_no, diet, bd_code, remark, Id, v, dietpt_slno, appRrquired])
    const reset = useCallback(() => {
        setDiet(0);
        setRemark('');
        setOpen(false)
        setappRequ(false)
    }, [setOpen])
    /*** usecallback function for form submitting */
    const submitDietplan = useCallback((e) => {
        e.preventDefault();
        /*** * insert function for use call back     */
        const InsertData = async (postdata) => {
            const result = await axioslogin.post(`/dietplan/insert`, postdata)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                reset();
            } else if (success === 7) {
                infoNotify(message)
                reset();
            }
            else {
                infoNotify(message)
            }
        }
        if (diet === 0) {
            infoNotify("Please Choose Diet")
        } else {
            InsertData(postdata)
        }
    }, [postdata, diet, reset])
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
                        width: 500,
                        height: 480
                    }}
                >
                    < DialogContentText id="alert-dialog-slide-descriptiona">
                        Diet Plan
                    </DialogContentText>
                    <Box sx={{ p: 2, height: "100%" }}>
                        <Paper square elevation={3} >
                            <Box sx={{ p: 2 }}>
                                <Grid item xl={12} lg={12}>
                                    <Grid container spacing={2} sx={{ pt: 0.1 }}>
                                        <Grid item xl={5} lg={5}  >
                                            <Typography>Diet Number:</Typography>
                                        </Grid>
                                        <Grid item xl={5} lg={5}>
                                            <Typography >{dietpt_slno}</Typography>
                                        </Grid>
                                        <Grid item xl={5} lg={5}>
                                            <Typography>Patient Number:</Typography>
                                        </Grid>
                                        <Grid item xl={5} lg={5}>
                                            <Typography>{pt_no}</Typography>
                                        </Grid>
                                        <Grid item xl={5} lg={5}>
                                            <Typography>Patient Name</Typography>
                                        </Grid>
                                        <Grid item xl={5} lg={5}>
                                            <Typography>{ptc_ptname}</Typography>
                                        </Grid>
                                        <Grid item xl={5} lg={5}>
                                            <Typography>Bed</Typography>
                                        </Grid>
                                        <Grid item xl={5} lg={5}>
                                            <Typography>{bdc_no}</Typography>
                                        </Grid>
                                        <Grid item xl={5} lg={5}>
                                            <Typography>Doctor</Typography>
                                        </Grid>
                                        <Grid item xl={5} lg={5}>
                                            <Typography>{doc_name}</Typography>
                                        </Grid>
                                        <Grid item xl={12} lg={12}>
                                            <SelectDiet value={diet} setValue={setDiet} />
                                        </Grid>
                                        <Grid item xl={12} lg={12}>
                                            <CustomTextarea
                                                style={{ width: 375 }}
                                                minRows={4}
                                                placeholder="Remarks"
                                                onchange={updateRemarks}
                                                value={remark}
                                            />
                                        </Grid>
                                        <Grid item xl={12} lg={12}>
                                            <CusCheckBox
                                                label="Consultation Required"
                                                color="primary"
                                                size="md"
                                                name="appRrquired"
                                                value={appRrquired}
                                                checked={appRrquired}
                                                onCheked={updaterequiredt}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={submitDietplan} >Save</Button>
                    <Button onClick={reset} color="secondary" >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}
export default memo(DietPlan)