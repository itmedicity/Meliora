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
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useMemo } from 'react';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { useSelector } from 'react-redux';
import ItemApprovalCmp from '../DepartmentApproval/ItemApprovalCmp';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const NdrfModel = ({ open, setOpen, datas, count, setCount }) => {

    const { req_slno, req_date, actual_requirement, needed, location, expected_date, request_dept_slno,
        request_deptsec_slno, category, approve_incharge, incharge_remarks, hod_remarks,
        approve_hod, manag_operation_approvs, manag_operation_remarks, senior_manage_approvs,
        senior_manage_remarks, cao_approves, cao_approve_remarks, incharge_apprv_date, hod_approve_date,
        om_approv_date, som_aprrov_date, cao_approv_date, ed_approve_date, inch_user, ed_approve_req,
        hod_user, om_user, smo_user, cao_user } = datas[0]

    const reqdate = format(new Date(req_date), 'dd-MM-yyyy')
    const expdate = format(new Date(expected_date), 'dd-MM-yyyy')
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
                                    p: 1,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 4 }}>
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
                                        p: 1,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>

                                        <Box
                                            sx={{ pr: 3 }}>
                                            <Typography sx={{ fontSize: 15 }}>Actual Requirement:</Typography>
                                        </Box>
                                        <Paper sx={{
                                            width: '100%', height: 50, pl: 0.5, fontSize: 15,
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
                                        p: 1,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>

                                        <Box
                                            sx={{ pr: 3 }}>
                                            <Typography sx={{ fontSize: 15 }}>Justification for need:</Typography>
                                        </Box>
                                        <Paper sx={{
                                            width: '100%', height: 50, pl: 0.5, fontSize: 15,
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='outlined'>
                                            {needed}
                                        </Paper>


                                    </Box> : null
                                }
                                {
                                    location !== null ? <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 1,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>

                                        <Box
                                            sx={{ pr: 9 }}>
                                            <Typography sx={{ fontSize: 15 }}>Location:</Typography>
                                        </Box>
                                        <Paper sx={{
                                            width: '100%', height: 50, pl: 0.5, fontSize: 15,
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='outlined'>
                                            {location}
                                        </Paper>
                                    </Box> : null
                                }
                                {
                                    category !== null ? <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 1,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ pr: 8.5 }}>
                                            <Typography sx={{ fontSize: 15 }}>Category:</Typography>
                                        </Box>
                                        <Paper sx={{
                                            width: '100%', height: 50, pl: 0.5, fontSize: 15,
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {category}
                                        </Paper>
                                    </Box> : null
                                }

                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 1,
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
                        <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                            }}>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 1, pr: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 9 }}>
                                        <Typography sx={{ fontWeight: 900, fontSize: 12 }}>Department Approval</Typography>
                                    </Box>

                                </Box>
                                <Box sx={{
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

                                        <Typography sx={{ fontSize: 15 }}>Incharge: {approve_incharge} </Typography>
                                        {
                                            inchadate !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <Typography sx={{ fontSize: 15, pr: 2 }}>Date:{inchadate}</Typography>
                                                <Typography sx={{ fontSize: 15 }}>User: {inch_user} </Typography>
                                            </Box> : null
                                        }

                                    </Box>

                                    <Paper sx={{
                                        width: '100%', height: 50, pl: 0.5, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='outlined'>
                                        {incharge_remarks}
                                    </Paper>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    pl: 1, pr: 0.5, pb: 1,
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
                                            inchadate !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <Typography sx={{ fontSize: 15, pr: 2 }}>Date:{hoddate}</Typography>
                                                <Typography sx={{ fontSize: 15 }}>User: {hod_user} </Typography>
                                            </Box> : null
                                        }

                                    </Box>

                                    <Paper sx={{
                                        width: '100%', height: 50, pl: 0.5, fontSize: 15,
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

                                        <Typography sx={{ fontSize: 15 }}>Operation Manager: {manag_operation_approvs}</Typography>
                                        {
                                            omdate !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <Typography sx={{ fontSize: 15, pr: 2 }}>Date:{omdate}</Typography>
                                                <Typography sx={{ fontSize: 15 }}>User: {om_user} </Typography>
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

                                        <Typography sx={{ fontSize: 15 }}>Senior Manager Operation: {senior_manage_approvs}</Typography>
                                        {
                                            smodate !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <Typography sx={{ fontSize: 15, pr: 2 }}>Date:{smodate}</Typography>
                                                <Typography sx={{ fontSize: 15 }}>User: {smo_user} </Typography>
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

                                        <Typography sx={{ fontSize: 15 }}>CAO/COO/MS: {cao_approves}</Typography>
                                        {
                                            omdate !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <Typography sx={{ fontSize: 15, pr: 2 }}>Date:{caodate}</Typography>
                                                <Typography sx={{ fontSize: 15 }}>User: {cao_user} </Typography>
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
                                {ed_approve_req === 1 ? <Box sx={{
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

                                        <Typography sx={{ fontSize: 15 }}>ED/MD: {cao_approves}</Typography>
                                        {
                                            eddate !== null ? <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <Typography sx={{ fontSize: 15, pr: 2 }}>Date:{eddate}</Typography>
                                                <Typography sx={{ fontSize: 15 }}>User: {cao_user} </Typography>
                                            </Box> : null
                                        }

                                    </Box>
                                    <Paper sx={{
                                        width: '100%', height: 50, pl: 0.5, mb: 0.8, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='outlined'>
                                        {cao_approve_remarks}
                                    </Paper>
                                </Box> : null}

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