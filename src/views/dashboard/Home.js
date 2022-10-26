
// import { Box } from '@mui/system'
// import React, { useState } from 'react'
// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { getRequesttype } from 'src/redux/actions/RequestType.action';
// import { Checkbox, CssVarsProvider } from '@mui/joy'
// import SelectDiet from '../CommonSelectCode/SelectDiet'


// const Home = () => {
//     const dispatch = useDispatch();
//     // const [value, setValue] = useState(0)
//     // const [selectName, setSelectName] = useState("");
//     // const onChangeValue = (e, { props }) => {
//     //     setSelectName(props.children)
//     //     setValue(e.target.value)
//     // }


//     // console.log(requset_type);
//     useEffect(() => {
//         dispatch(getRequesttype());
//     }, [dispatch])


//     // const updateValue = useCallback(() => {
//     //     console.log("select");
//     // })


//     // const onCheck = (e, val) => {
//     //     console.log(e)
//     //     console.log(e.target.checked)
//     //     console.log(val)
//     // }

//     const array = [
//         { name: 'chek_one', value: 100 },
//         { name: 'chek_two', value: 200 },
//         { name: 'chek_three', value: 300 },
//         { name: 'chek_four', value: 400 },
//     ]

//     const [checkedValue, setCheckedValue] = useState(false)
//     //const [checkedValueName, setCheckedValueName] = useState({ name: '', value: 0 })





//     // console.log(checkedValueName)

//     return (
//         <Box>
//             <Box>Home Page</Box>
//             {/* <Box sx={{ width: 300, pt: 2 }} >{selectName}
//                 <SelectDiet value={value} setValue={setValue} />
//             </Box>

//             <Box sx={{ minWidth: 50, p: 2 }}>
//                 <Select
//                     fullWidth
//                     value={value}
//                     onChange={onChangeValue}
//                 >
//                     <MenuItem value={0}>Zero</MenuItem>
//                     <MenuItem value={10}>Ten</MenuItem>
//                     <MenuItem value={20}>Twenty</MenuItem>
//                     <MenuItem value={30}>Thirty</MenuItem>
//                 </Select>
//             </Box> */}

//             {/* <Box>
//                 {requset_type && requset_type.map((value, index) => {
//                     return <Box sx={{
//                         pt: 1, pb: 1,
//                         justifyContent: 'space-between',
//                         width: "100%",
//                     }}
//                         key={value.req_type_slno
//                         }
//                     >
//                         <Complanit_checkbox
//                             name={value.req_type_name}
//                             value={value.req_type_slno}
//                             updatecheckbox={updateValue}
//                             checked={value.req_type_slno}
//                         />
//                     </Box>
//                 })
//                 }

//             </Box> */}

//             <Box>

//                 <CssVarsProvider>
//                     {
//                         array && array.map((val, key) => {

//                             return <Checkbox
//                                 variant="outlined"
//                                 color="success"
//                                 label={val.name}
//                                 checked={checkedValue !== undefined && checkedValue !== val.value ? false : true}
//                                 key={key}
//                                 onChange={(e) => {
//                                     // console.log(e.target.checked === true ? val.value : 'not clicked')
//                                     setCheckedValue(e.target.checked === true ? val.value : null)
//                                     // setCheckedValueName({
//                                     //     name: e.target.checked === true ? val.name : null,
//                                     //     value: e.target.checked === true ? val.value : null,
//                                     // })
//                                 }}
//                                 name={val.name}
//                             //disabled={checkedValue !== undefined && checkedValue !== val.value ? true : false}
//                             />

//                         })
//                     }
//                     {/* <Checkbox
//                         // variant={variant}
//                         // color={color}
//                         // size={size}
//                         // defaultChecked={false}
//                         // disabled={disabled}
//                         label="Check Box Example"
//                         value='Edp'
//                         onChange={(e) => {
//                             console.log(e.target.checked === true ? 'clicked' : 'not clicked')
//                         }}
//                         // checked={100}
//                         name={"My Check Box"}
//                     /> */}
//                 </CssVarsProvider>


//             </Box>





//         </Box>
//     )
// }

// export default Home
import { CircularProgress, Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment, useEffect, useState } from 'react'
import CardCloseOnly from '../Components/CardCloseOnly'
import { CssVarsProvider, Typography } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import { useDispatch, useSelector } from 'react-redux';
// import { getAssignedcomplaints, getRectifiedcomplaints, getTotalcomplaints, getVerifiedcomplaints } from 'src/redux/actions/ComplaintDashboard.action';
// import { getPendingcomplaints } from 'src/redux/actions/ComplaintDashboard.action';
import { warningNotify } from '../Common/CommonCode';
import { axioslogin } from '../Axios/Axios';
import { getComplaintRights } from 'src/redux/actions/CmpRightsDashboard.action';
const Home = () => {
    const dispatch = useDispatch();
    //count of total complaints
    // const totalcmp = useSelector((state) => {
    //     console.log(state.getTotalcomplaints.count
    //     );
    //     return state.getTotalcomplaints.count || 0
    // })
    // console.log(totalcmp);

    // const pendingcmp = useSelector((state) => {
    //     return state.getPendingcomplaints.count1 || 0
    // })
    // console.log(pendingcmp);
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const xx = useSelector((state) => {
        return state.getLoginProfileData.loginProfiledata
    })
    useEffect(() => {
        dispatch(getComplaintRights(id))
    }, [dispatch, id])
    // const complaintRights = useSelector((state) => {
    //     return state.getComplaintRights.complaintRightsLists || 0
    // })
    // console.log(complaintRights);
    // useEffect(() => {
    //     if (xx.length !== 0) {
    //         const { em_department } = xx[0]
    //         dispatch(getTotalcomplaints(em_department))
    //         dispatch(getPendingcomplaints(em_department))
    //         dispatch(getAssignedcomplaints(em_department))
    //         dispatch(getRectifiedcomplaints(em_department))
    //         dispatch(getVerifiedcomplaints(em_department))
    //     }
    // }, [xx, dispatch])

    // const newState = useSelector((state) => {
    //     // console.log(state);
    //     return state.getTotalcomplaints
    // })
    // console.log(newState);

    // const data = Object.values(newState);
    // console.log(data);
    // const entries = useMemo(() => data, [data]);
    // console.log(entries);

    // const newDashMenu = entries.filter(val => complaintRights.includes(val.menu_slno) === true ? val.menu_slno : null);
    // console.log(newDashMenu);
    const [complaints, setAllcomplaints] = useState(0)
    const [pending, setPendingcomplaints] = useState(0)
    const [assigned, setAssignedcomplaints] = useState(0);
    const [onhold, setOnholdcomplaints] = useState(0);
    const [rectify, setRectifycomplaints] = useState(0);
    const [verify, setVerifycomplaints] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (xx.length !== 0) {
            const { em_department } = xx[0]
            const getAllcomplaints = async () => {
                const result = await axioslogin.get(`/cmdashboard/totalcomplaints/${em_department}`);
                setLoading(true)
                const { success, data } = result.data
                if (success === 1) {
                    // setLoading(true)
                    const { count_totalcmp } = data[0]
                    setAllcomplaints(count_totalcmp)
                    setLoading(false)
                }
                else {
                    warningNotify("Error occured contact EDP")
                }
                const result1 = await axioslogin.get(`/cmdashboard/pendingcomplaints/${em_department}`);
                const { success1, data1 } = result1.data
                if (success1 === 1) {
                    const { pending_cmp } = data1[0]
                    setPendingcomplaints(pending_cmp)
                }
                else {
                    warningNotify("Error occured contact EDP")
                }
                const result2 = await axioslogin.get(`/cmdashboard/assignedcomplaints/${em_department}`);
                const { success2, data2 } = result2.data
                if (success2 === 1) {
                    const { assigned_cmp } = data2[0]
                    setAssignedcomplaints(assigned_cmp)
                }
                else {
                    warningNotify("Error occured contact EDP")
                }
                const result3 = await axioslogin.get(`/cmdashboard/onholdcomplaints/${em_department}`);
                const { success3, data3 } = result3.data
                if (success3 === 1) {
                    const { onhold_cmp } = data3[0]
                    setOnholdcomplaints(onhold_cmp)
                }
                else {
                    warningNotify("Error occured contact EDP")
                }
                const result4 = await axioslogin.get(`/cmdashboard/rectifycomplaints/${em_department}`);
                const { success4, data4 } = result4.data
                if (success4 === 1) {
                    const { rectify_cmp } = data4[0]
                    setRectifycomplaints(rectify_cmp)
                }
                else {
                    warningNotify("Error occured contact EDP")
                }
                const result5 = await axioslogin.get(`/cmdashboard/verifycomplaints/${em_department}`);
                const { success5, data5 } = result5.data
                if (success5 === 1) {
                    const { verify_cmp } = data5[0]
                    setVerifycomplaints(verify_cmp)
                }
                else {
                    warningNotify("Error occured contact EDP")
                }
            }
            getAllcomplaints();
        }
    }, [xx])
    return (
        <Fragment>
            <CardCloseOnly
                title='Complaint DashBoard'
            >
                <Paper square sx={{ p: 1, width: '100%', display: "flex" }} elevation={3}>
                    <Grid
                        container
                        // spacing={{ xs: 1, md: 1, md: 1, lg: 0.8, xl: 0.8 }}
                        columns={{ xs: 1, sm: 8, md: 8, lg: 8, xl: 12 }}
                        sx={{ width: '100%' }} >
                        <Grid item xs={2} sm={4} md={4} lg={2} xl={3}>
                            <Paper elevation={3} sx={{
                                width: "100%",
                                p: 0.5,
                                display: "flex",
                                direction: "row",
                            }} >
                                <Box sx={{
                                    display: "flex",
                                }} >
                                    <CssVarsProvider>
                                        <IconButton
                                            size='lg'
                                        // onClick={getProcessList}
                                        >
                                            {complaints}
                                            {/* {
                                                loading === true ? (<CircularProgress sx={{ color: 'pink' }} />) : complaints
                                            } */}
                                        </IconButton>
                                    </CssVarsProvider>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        px: 0.8
                                    }}>
                                        <CssVarsProvider>
                                            <Typography
                                                level="body1"
                                                sx={{
                                                    alignItems: 'flex-start', wordBreak: "break-all",
                                                }}
                                                color="success"
                                            >
                                                Total Complaints
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} lg={2} xl={3}>
                            <Paper elevation={3} sx={{
                                width: "100%",
                                p: 0.5,
                                display: "flex",
                                direction: "row",
                            }} >
                                <Box sx={{
                                    display: "flex",
                                }} >
                                    <CssVarsProvider>
                                        <IconButton
                                            size='lg'
                                        // onClick={getProcessList}
                                        >
                                            {/* {verify} */}
                                            {
                                                loading === true ? (<CircularProgress sx={{ color: 'pink' }} />) : verify
                                            }
                                        </IconButton>
                                    </CssVarsProvider>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        px: 0.8
                                    }}>
                                        <CssVarsProvider>
                                            <Typography
                                                level="body1"
                                                sx={{
                                                    alignItems: 'flex-start', wordBreak: "break-all",
                                                }}
                                                color="success"
                                            >
                                                Verified Complaints
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} lg={2} xl={3}>
                            <Paper elevation={3} sx={{
                                width: "100%",
                                p: 0.5,
                                display: "flex",
                                direction: "row",
                            }} >
                                <Box sx={{
                                    display: "flex",
                                }} >
                                    <CssVarsProvider>
                                        <IconButton
                                            size='lg'
                                        // onClick={getProcessList}
                                        >
                                            {/* {pending} */}
                                            {
                                                loading === true ? (<CircularProgress sx={{ color: 'pink' }} />) : pending
                                            }
                                        </IconButton>
                                    </CssVarsProvider>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        px: 0.8
                                    }}>
                                        <CssVarsProvider>
                                            <Typography
                                                level="body1"
                                                sx={{
                                                    alignItems: 'flex-start', wordBreak: "break-all",
                                                }}
                                                color="success"
                                            >
                                                Pending Complaints
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} lg={2} xl={3}>
                            <Paper elevation={3} sx={{
                                width: "100%",
                                p: 0.5,
                                display: "flex",
                                direction: "row",
                            }} >
                                <Box sx={{
                                    display: "flex",
                                }} >
                                    <CssVarsProvider>
                                        <IconButton
                                            size='lg'
                                        // onClick={getProcessList}
                                        >
                                            {/* {onhold} */}
                                            {
                                                loading === true ? (<CircularProgress sx={{ color: 'pink' }} />) : onhold
                                            }
                                        </IconButton>
                                    </CssVarsProvider>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        px: 0.8
                                    }}>
                                        <CssVarsProvider>
                                            <Typography
                                                // level="body1"
                                                sx={{
                                                    alignItems: 'flex-start', wordBreak: "break-all",
                                                }}
                                                color="success"
                                            >
                                                On Hold Complaints
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} lg={2} xl={3}>
                            <Paper elevation={3} sx={{
                                width: "100%",
                                p: 0.5,
                                display: "flex",
                                direction: "row",
                            }} >
                                <Box sx={{
                                    display: "flex",
                                }} >
                                    <CssVarsProvider>
                                        <IconButton
                                            size='lg'
                                        // onClick={getProcessList}
                                        >
                                            {/* {rectify} */}
                                            {
                                                loading === true ? (<CircularProgress sx={{ color: 'pink' }} />) : rectify
                                            }

                                        </IconButton>
                                    </CssVarsProvider>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        px: 0.8
                                    }}>
                                        <CssVarsProvider>
                                            <Typography
                                                level="body1"
                                                sx={{
                                                    alignItems: 'flex-start', wordBreak: "break-all",
                                                }}
                                                color="success"
                                            >
                                                Rectified Complaints
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} lg={2} xl={3}>
                            <Paper elevation={3} sx={{
                                width: "100%",
                                p: 0.5,
                                display: "flex",
                                direction: "row",
                            }} >
                                <Box sx={{
                                    display: "flex",
                                }} >
                                    <CssVarsProvider>
                                        <IconButton
                                            size='lg'
                                        // onClick={getProcessList}
                                        >
                                            {/* {assigned} */}
                                            {
                                                loading === true ? (<CircularProgress sx={{ color: 'pink' }} />) : assigned
                                            }

                                        </IconButton>
                                    </CssVarsProvider>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        px: 0.8
                                    }}>
                                        <CssVarsProvider>
                                            <Typography
                                                level="body1"
                                                sx={{
                                                    alignItems: 'flex-start', wordBreak: "break-all",
                                                }}
                                                color="success"
                                            >
                                                Assigned Complaints
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>

                    </Grid>





                    {/* 2ND BOX */}

                </Paper>















                {/* <Box sx={{
                    width: "100%"
                }}>
                    <Paper elevation={3}
                        sx={{
                            p: 1,
                            display: "flex",
                            flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                        }}
                    >
                        <Box sx={{
                            gap: 2,
                            flexWrap: 'wrap',
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '20%', xl: '20%', },
                            mt: { xs: 1, sm: 1, lg: 1, xl: 1 },
                        }}>
                            <Paper elevation={3} sx={{
                                width: "100%",
                                p: 0.5,
                                display: "flex",
                                direction: "row",
                            }} >
                                <Box sx={{
                                    display: "flex",
                                }} >
                                    <CssVarsProvider>
                                        <IconButton
                                            size='lg'
                                        // onClick={getProcessList}
                                        >
                                            {complaints}
                                        </IconButton>
                                    </CssVarsProvider>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        px: 0.8
                                    }}>
                                        <CssVarsProvider>
                                            <Typography
                                                level="body1"
                                                sx={{
                                                    alignItems: 'flex-start', wordBreak: "break-all",
                                                }}
                                                color="success"
                                            >
                                                Total Complaints
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                        <Box sx={{
                            gap: 2,
                            flexWrap: 'wrap',
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '20%', xl: '20%', },
                            mt: { xs: 1, sm: 1, lg: 1, xl: 1 },
                            pl: { xs: 0, sm: 0, xl: 1, lg: 1, md: 1 }
                        }}>
                            <Paper elevation={3} sx={{
                                width: "100%",
                                p: 0.5,
                                display: "flex",
                                direction: "row",
                            }} >
                                <Box sx={{
                                    display: "flex",
                                }} >
                                    <CssVarsProvider>
                                        <IconButton
                                            size='lg'
                                        >
                                            {verify}
                                        </IconButton>
                                    </CssVarsProvider>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        px: 0.8
                                    }}>
                                        <CssVarsProvider>
                                            <Typography
                                                level="body1"
                                                sx={{ alignItems: 'flex-start', wordBreak: "break-all" }}
                                                color="success"
                                            >
                                                Verified Complaints
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                        <Box sx={{
                            gap: 2,
                            flexWrap: 'wrap',
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '20%', xl: '20%', },
                            mt: { xs: 1, sm: 1, lg: 1, xl: 1 },
                            pl: { xs: 0, sm: 0, xl: 1, lg: 1, md: 1 }
                        }}>
                            <Paper elevation={3} sx={{
                                width: "100%",
                                p: 0.5,
                                display: "flex",
                                direction: "row",
                            }} >
                                <Box sx={{
                                    display: "flex",
                                }} >
                                    <CssVarsProvider>
                                        <IconButton
                                            size='lg'
                                        >
                                            {pending}
                                        </IconButton>
                                    </CssVarsProvider>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        px: 0.8
                                    }}>
                                        <CssVarsProvider>
                                            <Typography
                                                level="body1"
                                                sx={{ alignItems: 'flex-start', wordBreak: "break-all" }}
                                                color="success"
                                            >
                                                Pending Complaints
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                        <Box sx={{
                            gap: 2,
                            flexWrap: 'wrap',
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '20%', xl: '20%', },
                            mt: { xs: 1, sm: 1, lg: 1, xl: 1 },
                            pl: { xs: 0, sm: 0, xl: 1, lg: 1, md: 1 }
                        }}>
                            <Paper elevation={3} sx={{
                                width: "100%",
                                p: 0.5,
                                display: "flex",
                                direction: "row",
                            }} >
                                <Box sx={{
                                    display: "flex",
                                }} >
                                    <CssVarsProvider>
                                        <IconButton
                                            size='lg'
                                        >
                                            {onhold}
                                        </IconButton>
                                    </CssVarsProvider>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        px: 0.8
                                    }}>
                                        <CssVarsProvider>
                                            <Typography
                                                level="body1"
                                                sx={{ alignItems: 'flex-start', wordBreak: "break-all" }}
                                                color="success"
                                            >
                                                On Hold Complaints
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                        <Box sx={{
                            gap: 2,
                            flexWrap: 'wrap',
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '20%', xl: '20%', },
                            mt: { xs: 1, sm: 1, lg: 1, xl: 1 },
                            pl: { xs: 0, sm: 0, xl: 1, lg: 1, md: 1 }
                        }}>
                            <Paper elevation={3} sx={{
                                width: "100%",
                                p: 0.5,
                                display: "flex",
                                direction: "row",
                            }} >
                                <Box sx={{
                                    display: "flex",
                                }} >
                                    <CssVarsProvider>
                                        <IconButton
                                            size='lg'
                                        >
                                            {rectify}
                                        </IconButton>
                                    </CssVarsProvider>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        px: 0.8
                                    }}>
                                        <CssVarsProvider>
                                            <Typography
                                                level="body1"
                                                sx={{ alignItems: 'flex-start', wordBreak: "break-all" }}
                                                color="success"
                                            >
                                                Rectified Complaints
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                        <Box sx={{
                            gap: 2,
                            flexWrap: 'wrap',
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '20%', xl: '20%', },
                            mt: { xs: 1, sm: 1, lg: 1, xl: 1 },
                            pl: { xs: 0, sm: 0, xl: 1, lg: 1, md: 1 }
                        }}>
                            <Paper elevation={3} sx={{
                                width: "100%",
                                p: 0.5,
                                display: "flex",
                                direction: "row",
                            }} >
                                <Box sx={{
                                    display: "flex",
                                }} >
                                    <CssVarsProvider>
                                        <IconButton
                                            size='lg'
                                        >
                                            {assigned}
                                        </IconButton>
                                    </CssVarsProvider>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        px: 0.8
                                    }}>
                                        <CssVarsProvider>
                                            <Typography
                                                level="body1"
                                                sx={{ alignItems: 'flex-start', wordBreak: "break-all" }}
                                                color="success"
                                            >
                                                Assigned Complaints
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>



                    </Paper>
                </Box> */}
            </CardCloseOnly>
        </Fragment>
    )
}

export default Home

