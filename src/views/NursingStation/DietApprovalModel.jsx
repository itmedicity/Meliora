import React, { Fragment, useCallback, useState, memo } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Grid, Paper } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextFieldCustom from '../Components/TextFieldCustom';
import CusCheckBox from '../Components/CusCheckBox';
import SelectDiet from '../CommonSelectCode/SelectDiet';
import CustomTextarea from '../Components/CustomTextarea';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const DietApprovalModel = ({ open, setOpen, data }) => {
    const { pt_no, ptc_ptname, dietpt_slno, plan_remark } = data
    const [approve, updateaproves] = useState(false)
    const [dietplan, updateDietplan] = useState(false)
    const [ab, setAb] = useState(0);
    const [bc, setBc] = useState(0);
    const [value, setValue] = useState(0);
    const [remark, setRemark] = useState("");
    const updateremark = useCallback((e) => {
        const value = e.target.value;
        setRemark(value)
    }, [])
    const checkapprove = useCallback((e) => {
        if (e.target.checked === true) {
            updateaproves(true)
            setAb(1)
            setBc(0)
            updateDietplan(false)
        } else {
            updateaproves(false)
            setAb(0)
            setBc(0)
        }
    }, [])
    const checkdietplan = useCallback((e) => {
        if (e.target.checked === true) {
            updateDietplan(true)
            updateaproves(false)
            setBc(1)
            setAb(0)
        } else {
            updateDietplan(false)
            setBc(0)
            setAb(0)
        }
    }, [])
    const Close = () => {
        setOpen(false)
    }
    // const postdata = useMemo(() => {
    //     return {
    //         plan_status: 1,
    //         plan_appr_time: format(new Date(), 'yyy-MM-dd hh:mm:ss')
    //     }
    // }, [])
    return (
        <Fragment>
            <ToastContainer />
            <div>
                <Dialog
                    open={open}
                    onClose={Close}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-descriptiona"
                >
                    < DialogContent id="alert-dialog-slide-descriptiona"
                        sx={{
                            width: 600,
                            height: 400
                        }}
                    >
                        < DialogContentText id="alert-dialog-slide-descriptiona">
                            Diet Approval
                        </DialogContentText>
                        <Box sx={{ width: "100%", display: "flex", height: 340, p: 1 }} >
                            <Paper square elevation={3} sx={{ width: "100%" }}  >
                                <Box sx={{ width: "100%", display: "flex", flexDirection: 'row', justifyContent: "space-between", p: 1, height: "100%" }}>

                                    <Grid item xl={12} lg={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xl={4} lg={4}>
                                                <TextFieldCustom
                                                    type="text"
                                                    size="sm"
                                                    value={dietpt_slno}
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid item xl={4} lg={4}>
                                                <TextFieldCustom
                                                    type="text"
                                                    size="sm"
                                                    value={pt_no}
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid item xl={4} lg={4}>
                                                <TextFieldCustom
                                                    type="text"
                                                    size="sm"
                                                    value={ptc_ptname}
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid item xl={12} lg={12}>
                                                <TextFieldCustom
                                                    placeholder="Remarks"
                                                    type="text"
                                                    size="sm"
                                                    value={plan_remark}
                                                    disabled
                                                />
                                                {/* <CustomTextarea
                                                    minRows={3}
                                                    placeholder="Remarks"
                                                    style={{ width: 500, mt: 2 }}
                                                /> */}

                                            </Grid>
                                            <Grid item xl={6} lg={6}>
                                                <CusCheckBox
                                                    label="Approve"
                                                    color="primary"
                                                    size="md"
                                                    name="approve"
                                                    value={approve}
                                                    checked={approve}
                                                    onCheked={checkapprove}
                                                />
                                            </Grid>
                                            <Grid item xl={6} lg={6}>
                                                <CusCheckBox
                                                    label="Change Dietplan"
                                                    color="primary"
                                                    size="md"
                                                    name="dietplan"
                                                    value={dietplan}
                                                    checked={dietplan}
                                                    onCheked={checkdietplan}
                                                />
                                            </Grid>
                                            <Grid item xl={6} lg={6}>
                                                {
                                                    ab === 1 ?
                                                        <CustomTextarea
                                                            minRows={4}
                                                            placeholder="Remarks"
                                                            style={{ width: 520 }}
                                                            onchange={updateremark}
                                                            value={remark}
                                                        />
                                                        : null
                                                }
                                                {
                                                    bc === 1 ?
                                                        <SelectDiet value={value} setValue={setValue} /> : null
                                                }
                                                < Box sx={{ mt: 1.2 }}>
                                                    {
                                                        bc === 1 ?
                                                            <CustomTextarea
                                                                minRows={4}
                                                                placeholder="Remarks"
                                                                style={{ width: 520, mt: 1 }}
                                                            />

                                                            : null
                                                    }
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" >Save</Button>
                        <Button onClick={Close} color="secondary" >Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Fragment>

    )
}

export default memo(DietApprovalModel)