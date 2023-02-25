import React, { Fragment, useCallback, useState, memo, useEffect } from 'react'
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
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useMemo } from 'react';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { useSelector } from 'react-redux';
import ItemApprovalCmp from '../DepartmentApproval/ItemApprovalCmp';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const NdrfModel = ({ open, setOpen, datas, count, setCount }) => {

    const { req_slno, req_date, actual_requirement, needed, location, expected_date, request_dept_slno,
        request_deptsec_slno, category, approve_incharge, incharge_remarks, hod_remarks, ed_approves,
        approve_hod, manag_operation_approvs, manag_operation_remarks, senior_manage_approvs,
        senior_manage_remarks, cao_approves, cao_approve_remarks, incharge_apprv_date, hod_approve_date,
        om_approv_date, som_aprrov_date, cao_approv_date, ed_approve_date, inch_user, ed_approve_req,
        hod_user, om_user, smo_user, cao_user } = datas[0]

    const reqdate = req_date !== null ? format(new Date(req_date), 'dd-MM-yyyy') : null
    const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : null
    const inchadate = incharge_apprv_date !== null ? format(new Date(incharge_apprv_date), 'dd-MM-yyyy hh:mm:ss') : null
    const hoddate = hod_approve_date !== null ? format(new Date(hod_approve_date), 'dd-MM-yyyy hh:mm:ss') : null
    const omdate = om_approv_date !== null ? format(new Date(om_approv_date), 'dd-MM-yyyy hh:mm:ss') : null
    const smodate = som_aprrov_date !== null ? format(new Date(som_aprrov_date), 'dd-MM-yyyy hh:mm:ss') : null
    const caodate = cao_approv_date !== null ? format(new Date(cao_approv_date), 'dd-MM-yyyy hh:mm:ss') : null
    const eddate = ed_approve_date !== null ? format(new Date(ed_approve_date), 'dd-MM-yyyy hh:mm:ss') : null
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


    const [dataPost, setdataPost] = useState([])
    const [tableDis, setTableDis] = useState(0)
    useEffect(() => {
        const InsertFun = async (req_slno) => {
            const result = await axioslogin.get(`/requestRegister/getItemList/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setdataPost(data)
                setTableDis(1)
            }
            else {
                setTableDis(0)
            }
        }
        InsertFun(req_slno)
    }, [req_slno])

    const submit = useCallback((e) => {
        e.preventDefault();

        const NdrfInsertFun = async (postdata) => {
            const result = await axioslogin.post('/ndrf/NdrfInsert', postdata);
            return result.data
        }
        //** Inset api for Approval */
        const NdrfInsertApproval = async (insetid) => {
            const ApprovalData = {
                ndrf_mast_slno: insetid
            }
            const result = await axioslogin.post('/ndrf/postReqApproval', ApprovalData);
            return result.data
        }


        if (approve === true) {
            NdrfInsertFun(postdata).then((value) => {
                const { message, success, insetid } = value
                if (success === 1) {
                    NdrfInsertApproval(insetid).then((value) => {
                        const { message } = value
                        succesNotify(message)
                        setCount(count + 1)
                        setOpen(false)
                    })
                }
                else if (success === 2) {
                    infoNotify(message)
                }

            })
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
                        height: 400
                    }}
                >
                    < DialogContentText id="alert-dialog-slide-descriptiona">
                        New Demand Request Form
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
                                        sx={{ pr: 4.6 }}>
                                        <Typography sx={{ fontSize: 15 }}>Request No:  {req_slno}</Typography>
                                    </Box>
                                    <Box
                                    >
                                        <Typography sx={{ fontSize: 15 }}>Req.Date: {reqdate}</Typography>
                                    </Box>
                                </Box>

                                {
                                    actual_requirement !== null ? <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>

                                        <Box
                                            sx={{ width: "25%", }}>
                                            <Typography sx={{ fontSize: 15 }}>Actual Requirement:</Typography>
                                        </Box>
                                        <Paper sx={{
                                            width: "75%", minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15,
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='outlined'>
                                            {actual_requirement}
                                        </Paper>


                                    </Box> : null
                                }
                                {
                                    needed !== null ? <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>

                                        <Box
                                            sx={{ width: "25%", }}>
                                            <Typography sx={{ fontSize: 15 }}>Justification for need:</Typography>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15,
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='outlined'>
                                            {needed}
                                        </Paper>
                                    </Box> : null
                                }
                                {location !== null ? <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>

                                    <Box
                                        sx={{ width: "25%", }}>
                                        <Typography sx={{ fontSize: 15 }}>Location:</Typography>
                                    </Box>
                                    <Paper sx={{
                                        width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='outlined'>
                                        {location}
                                    </Paper>
                                </Box> : null}
                                {category !== null ? <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>

                                    <Box
                                        sx={{ width: "25%", }}>
                                        <Typography sx={{ fontSize: 15 }}>Category:</Typography>
                                    </Box>
                                    <Paper sx={{
                                        width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='outlined'>
                                        {category}
                                    </Paper>
                                </Box> : null}
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5, pb: 0,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 9 }}>
                                        <Typography sx={{ fontSize: 15 }}>Expected Date: {expdate}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    {tableDis === 1 ? <ItemApprovalCmp
                                        dataPost={dataPost}
                                        setdataPost={setdataPost}

                                    /> : null}

                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                    <Box sx={{ width: "100%", mt: 0 }}>
                        <Paper variant='outlined' sx={{ mt: 1 }} >
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                            }}>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 0.2, pr: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 9, pl: 0.7 }}>
                                        <Typography sx={{ fontWeight: 900, fontSize: 12 }}>Department Approval</Typography>
                                    </Box>

                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 1, pr: 0.5, pt: 0.4,
                                    flexDirection: 'column'
                                }}>
                                    <Box
                                        sx={{
                                            // pl: 1,
                                            display: "flex",
                                            flexDirection: 'row',
                                            justifyContent: "space-between"
                                        }}>

                                        <Typography sx={{ fontSize: 15 }}>Incharge: {approve_incharge} </Typography>
                                        {
                                            inchadate !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <Typography sx={{ fontSize: 13, pr: 0.5 }}>{inchadate !== null ? inchadate : "Not Update"}</Typography>
                                                <Typography sx={{ fontSize: 13, textTransform: "capitalize" }}>  /  {inch_user !== null ? inch_user.toLowerCase() : null} </Typography>
                                            </Box> : null
                                        }
                                    </Box>
                                    <Paper sx={{
                                        width: '100%', height: 50, fontSize: 15, pl: 0.5,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='outlined'>
                                        {incharge_remarks}
                                    </Paper>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 1, pr: 0.5, pb: 1, pt: 0.7,
                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                }}>
                                    <Box
                                        sx={{
                                            // pl: 1,
                                            display: "flex",
                                            flexDirection: 'row',
                                            justifyContent: "space-between"
                                        }}>
                                        <Typography sx={{ fontSize: 15 }}>HOD: {approve_hod}</Typography>
                                        {
                                            hoddate !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <Typography sx={{ fontSize: 13, pr: 0.5 }}>{hoddate !== null ? hoddate : "Not Update"}</Typography>
                                                <Typography sx={{ fontSize: 13, textTransform: "capitalize" }}>  /  {hod_user !== null ? hod_user.toLowerCase() : null} </Typography>
                                            </Box> : null
                                        }

                                    </Box>
                                    <Paper sx={{
                                        width: '100%', height: 50, fontSize: 15, pl: 0.5,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='outlined'>
                                        {hod_remarks}
                                    </Paper>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>

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
                                    pl: 1, pr: 0.5, pt: 0.5,
                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                }}>
                                    <Box
                                        sx={{
                                            // pl: 1,
                                            display: "flex",
                                            flexDirection: 'row',
                                            justifyContent: "space-between"
                                        }}>
                                        <Typography sx={{ fontSize: 15 }}>Operation Manager: {manag_operation_approvs}</Typography>
                                        {
                                            omdate !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <Typography sx={{ fontSize: 13, pr: 0.5 }}>{omdate !== null ? omdate : "Not Update"}</Typography>
                                                <Typography sx={{ fontSize: 13, textTransform: "capitalize" }}>  /  {om_user !== null ? om_user.toLowerCase() : null} </Typography>
                                            </Box> : null
                                        }

                                    </Box>

                                    <Paper sx={{
                                        width: '100%', height: 50, pl: 0.5, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='outlined'>
                                        {manag_operation_remarks}
                                    </Paper>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 1, pr: 0.5, pt: 0.6,
                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                }}>
                                    <Box
                                        sx={{
                                            // pl: 1,
                                            display: "flex",
                                            flexDirection: 'row',
                                            justifyContent: "space-between"
                                        }}>
                                        <Typography sx={{ fontSize: 15 }}>Senior Manager Operation: {senior_manage_approvs}</Typography>
                                        {
                                            smodate !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <Typography sx={{ fontSize: 13, pr: 0.5 }}>{smodate !== null ? smodate : "Not Update"}</Typography>
                                                <Typography sx={{ fontSize: 13, textTransform: "capitalize" }}>  /  {smo_user !== null ? smo_user.toLowerCase() : null} </Typography>
                                            </Box> : null
                                        }

                                    </Box>

                                    <Paper sx={{
                                        width: '100%', height: 50, pl: 0.5, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='outlined'>
                                        {senior_manage_remarks}
                                    </Paper>
                                </Box>

                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 1, pr: 0.5, pt: 0.6, pb: 0.6,
                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                }}>
                                    <Box
                                        sx={{
                                            // pl: 1,
                                            display: "flex",
                                            flexDirection: 'row',
                                            justifyContent: "space-between"
                                        }}>
                                        <Typography sx={{ fontSize: 15 }}>CAO/COO/MS: {cao_approves}</Typography>
                                        {
                                            caodate !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <Typography sx={{ fontSize: 13, pr: 0.5 }}>{caodate !== null ? caodate : "Not Update"}</Typography>
                                                <Typography sx={{ fontSize: 13, textTransform: "capitalize" }}>  /  {cao_user !== null ? cao_user.toLowerCase() : null} </Typography>
                                            </Box> : null
                                        }

                                    </Box>

                                    <Paper sx={{
                                        width: '100%', height: 50, pl: 0.5, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='outlined'>
                                        {cao_approve_remarks}
                                    </Paper>
                                </Box>

                                {
                                    ed_approve_req === 1 ? <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        pl: 1, pr: 0.5,
                                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                    }}>
                                        <Box
                                            sx={{
                                                // pl: 1,
                                                display: "flex",
                                                flexDirection: 'row',
                                                justifyContent: "space-between"
                                            }}>
                                            <Typography sx={{ fontSize: 15 }}>ED/MD: {ed_approves}</Typography>
                                            {
                                                eddate !== null ? <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-evenly",
                                                        pr: 2
                                                    }}>
                                                    <Typography sx={{ fontSize: 13, pr: 0.5 }}>{eddate !== null ? eddate : "Not Update"}</Typography>
                                                    <Typography sx={{ fontSize: 13, textTransform: "capitalize" }}>  /  {cao_user !== null ? cao_user.toLowerCase() : null} </Typography>
                                                </Box> : null
                                            }

                                        </Box>
                                    </Box> : null
                                }
                            </Box>
                        </Paper>
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