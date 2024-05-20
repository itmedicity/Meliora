import { Paper, Box } from '@mui/material';
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoginProfileData } from 'src/redux/actions/LoginProfile.action';
import DashCompAll from './ComplaintDashCmpnt/DashCompAll';
import DashCompDept from './ComplaintDashCmpnt/DashCompDept';
import DashCompEmp from './ComplaintDashCmpnt/DashCompEmp';
import CMdashboard from './DashBoardCM'
import { getComplaintRights } from 'src/redux/actions/CmpRightsDashboard.action';
// import WeworkDashboard from './WeworkDashboard';
// import { getTotalWeworkAdmission } from 'src/redux/actions/WeWrkTotAdmision.action'
// import { getTotalBhrcList } from 'src/redux/actions/WeBhrcDetl.action'
// import { getDiscAfternoonList } from 'src/redux/actions/WeDiscAfternoon.action'
// import { getAfternoonRoundList } from 'src/redux/actions/WeAfternoonRounds.action'
// import { getWeDamaDetl } from 'src/redux/actions/WeDamaDetl.action'
// import { getNoshifingList } from 'src/redux/actions/WeOneSheeetDetl.action'
// import { getHighAntibiotic } from 'src/redux/actions/HighAntibiotic.action'
// import DietDashBoardCmp from './DietDashCmpnt/DietDashBoardCmp';
// import { getTotalInPateint } from 'src/redux/actions/TotalInPateintList.action';
// import { getDietPlanned } from 'src/redux/actions/DietPlannedList.action';
// import { getDietPlanPending } from 'src/redux/actions/DietPlanPending.action';

import { io } from "socket.io-client";
import { WS_URL } from '../Constant/Static';

const Home = () => {
    const dispatch = useDispatch();
    /**reducer function for getting login employees id */
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    /**redux function for getting login employees all details */
    useEffect(() => {
        dispatch(setLoginProfileData(id))
        dispatch(getComplaintRights(id))
    }, [dispatch, id])
    //All menus under login user
    const complaintRights = useSelector((state) => {
        return state.getComplaintRights.complaintRightsLists.map(ele => ele.menu_slno) || 0
    })

    //redux for getting employee data
    const profileData = useSelector((state) => {
        return state.getLoginProfileData.loginProfiledata
    })
    const complaintdash = CMdashboard.filter(val => complaintRights.includes(val.men_slno));

    // //we work dashborad start
    // useEffect(() => {
    //     dispatch(getTotalWeworkAdmission())
    //     dispatch(getTotalBhrcList())
    //     dispatch(getWeDamaDetl())
    //     dispatch(getDiscAfternoonList())
    //     dispatch(getAfternoonRoundList())
    //     dispatch(getNoshifingList())
    //     dispatch(getHighAntibiotic())
    //     dispatch(getTotalInPateint())
    //     dispatch(getDietPlanned())
    //     dispatch(getDietPlanPending())

    // }, [dispatch])

    // const state = useSelector((state) => {
    //     return {
    //         WeAdmissionTotal: state.getTotalWeAdmission.WeTotalList || 0,
    //         WeBhrcDetl: state.getWeBhrcDetl.WeBhrcList || 0,
    //         WeDamaDetl: state.getDamaDetl.damaList || 0,
    //         WedischrgeList: state.getDischargeList.DischargeList || 0,
    //         AftternoonRounds: state.getAfternoonrounds.RoundsList || 0,
    //         noshiftdetl: state.getwenoShiftdetl.noshiftdetlList || 0,
    //         HighAntiBiotic: state.getHighAntibioticdetl.AntibioticList
    //     }
    // })

    // const Dashboard_we = {
    //     74: { slno: 74, name: "Total Admission", count: state.WeAdmissionTotal.length },
    //     75: { slno: 75, name: "DAMA patient", count: state.WeDamaDetl.length },
    //     76: { slno: 76, name: "BHRC Patient", count: state.WeBhrcDetl.length },
    //     77: { slno: 77, name: "No shifted Patient", count: state.noshiftdetl.length },
    //     79: { slno: 79, name: "Discharge after 2 pm ", count: state.WedischrgeList.length },
    //     78: { slno: 78, name: "Doctor Rounds after 2 pm", count: state.AftternoonRounds.length },
    //     81: { slno: 81, name: "High Antibiotic", count: state.HighAntiBiotic.length }
    // }

    // const wewrkdata = Object.values(Dashboard_we);
    // const workentries = useMemo(() => wewrkdata, [wewrkdata])
    // const weworkDash = workentries.filter(val => complaintRights.includes(val.slno) === true ? val.slno : null);
    // const weworkmenu = useMemo(() => weworkDash, [weworkDash])

    // const dietDatas = useSelector((state) => {
    //     return {
    //         inpatient: state.setTotalInPateint.InPateintList,
    //         dietPlanned: state.setDietPlaned.plannedList,
    //         dietPlanPending: state.setDietPlanPending.planPendingList
    //     }
    // })

    // const Dashboard_Diet = {
    //     90: { slno: 90, name: "Total In-Pateint", count: dietDatas.inpatient.length },
    //     91: { slno: 91, name: "Diet Planned", count: dietDatas.dietPlanned.length },
    //     92: { slno: 92, name: "Diet Plan Pending", count: dietDatas.dietPlanPending.length },

    // }

    // const dietdata = Object.values(Dashboard_Diet);
    // const dietentries = useMemo(() => dietdata, [dietdata])
    // const DietDash = dietentries.filter(val => complaintRights.includes(val.slno) === true ? val.slno : null);
    // const dietmenus = useMemo(() => DietDash, [DietDash])


    // const handlechangesockettest = () => {
    //     socket.emit("message", "from 192.168.10.106")
    // }

    useEffect(() => {
        const socket = io();
        socket.connect(WS_URL)
        socket.on("message", (data) => {
            console.log(data)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <Fragment>

            {/* <Box>
                <Box>Socket test</Box>
                <Button onClick={handlechangesockettest} >Click Here</Button>
            </Box> */}

            <Box sx={{ width: "100%", p: 1 }}>
                <Paper square elevation={2} sx={{ p: 1 }} >
                    {
                        complaintdash.map((val) => {
                            return <Box key={val.men_slno} >
                                {
                                    val.men_slno === 67 ? < DashCompDept

                                        profileData={profileData}
                                    /> : val.men_slno === 68 ? <DashCompEmp
                                        profileData={profileData}

                                    /> :
                                        val.men_slno === 69 ? <DashCompAll

                                        /> : null
                                }
                            </Box>
                        })
                    }
                    {/* <Grid
                        container
                        spacing={{ xs: 1, sm: 1, md: 1, lg: 1.5, xl: 1.5 }}
                        columns={{ xs: 1, sm: 8, md: 8, lg: 8, xl: 12 }}
                        sx={{ width: '100%', pb: 1 }}>
                        {
                            weworkmenu.map((val, index) => (
                                <Grid item xs={2} sm={4} md={4} lg={2} xl={3} key={index}>
                                    <WeworkDashboard widgetName={val.name} count={val.count} status={val.status} slno={val.slno} indx={index} />
                                </Grid>
                            ))
                        }
                    </Grid>
                    <Paper square elevation={2} sx={{ p: 1 }} >
                        <Grid
                            container
                            spacing={{ xs: 1, sm: 1, md: 1, lg: 1.5, xl: 1.5 }}
                            columns={{ xs: 1, sm: 8, md: 8, lg: 8, xl: 12 }}
                            sx={{ width: '100%', }}>
                            {
                                dietmenus.map((val, index) => (
                                    <Grid item xs={2} sm={4} md={4} lg={2} xl={3} key={index}>
                                        <DietDashBoardCmp widgetName={val.name} count={val.count} status={val.status} slno={val.slno} indx={index} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Paper> */}
                </Paper>
            </Box >
        </Fragment >
    )
}
export default Home

