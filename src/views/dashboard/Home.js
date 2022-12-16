import { Paper, Box, Grid } from '@mui/material';
import React, { Fragment, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoginProfileData } from 'src/redux/actions/LoginProfile.action';
import DashCompAll from './ComplaintDashCmpnt/DashCompAll';
import DashCompDept from './ComplaintDashCmpnt/DashCompDept';
import DashCompEmp from './ComplaintDashCmpnt/DashCompEmp';
import CMdashboard from './DashBoardCM'
import { getComplaintRights } from 'src/redux/actions/CmpRightsDashboard.action';
import WeworkDashboard from './WeworkDashboard';
import { getTotalWeworkAdmission } from 'src/redux/actions/WeWrkTotAdmision.action'
import { getTotalBhrcList } from 'src/redux/actions/WeBhrcDetl.action'
import { getDiscAfternoonList } from 'src/redux/actions/WeDiscAfternoon.action'
import { getAfternoonRoundList } from 'src/redux/actions/WeAfternoonRounds.action'
import { getWeDamaDetl } from 'src/redux/actions/WeDamaDetl.action'
import { getNoshifingList } from 'src/redux/actions/WeOneSheeetDetl.action'
import { getHighAntibiotic } from 'src/redux/actions/HighAntibiotic.action'

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

    //we work dashborad start
    useEffect(() => {
        dispatch(getTotalWeworkAdmission())
        dispatch(getTotalBhrcList())
        dispatch(getWeDamaDetl())
        dispatch(getDiscAfternoonList())
        dispatch(getAfternoonRoundList())
        dispatch(getNoshifingList())
        dispatch(getHighAntibiotic())
    }, [dispatch])

    const state = useSelector((state) => {
        return {
            WeAdmissionTotal: state.getTotalWeAdmission.WeTotalList || 0,
            WeBhrcDetl: state.getWeBhrcDetl.WeBhrcList || 0,
            WeDamaDetl: state.getDamaDetl.damaList || 0,
            WedischrgeList: state.getDischargeList.DischargeList || 0,
            AftternoonRounds: state.getAfternoonrounds.RoundsList || 0,
            noshiftdetl: state.getwenoShiftdetl.noshiftdetlList || 0,
            HighAntiBiotic: state.getHighAntibioticdetl.AntibioticList
        }
    })

    const Dashboard = {
        74: { slno: 74, name: "Total Admission", count: state.WeAdmissionTotal.length },
        75: { slno: 75, name: "DAMA patient", count: state.WeDamaDetl.length },
        76: { slno: 76, name: "BHRC Patient", count: state.WeBhrcDetl.length },
        77: { slno: 77, name: "No shifted Patient", count: state.noshiftdetl.length },
        78: { slno: 78, name: "Doctor Rounds after 2 pm", count: state.WedischrgeList.length },
        79: { slno: 79, name: "Discahrge after 2 pm", count: state.AftternoonRounds.length },
        81: { slno: 81, name: "high Antibiotic", count: state.HighAntiBiotic.length }
    }

    const wewrkdata = Object.values(Dashboard);
    const workentries = useMemo(() => wewrkdata, [wewrkdata])
    const weworkDash = workentries.filter(val => complaintRights.includes(val.slno) === true ? val.slno : null);
    const weworkmenu = useMemo(() => weworkDash, [weworkDash])

    return (
        <Fragment>
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
                    <Grid
                        container
                        spacing={{ xs: 1, sm: 1, md: 1, lg: 1.5, xl: 1.5 }}
                        columns={{ xs: 1, sm: 8, md: 8, lg: 8, xl: 12 }}
                        sx={{ width: '100%' }}>
                        {
                            weworkmenu.map((val, index) => (
                                <Grid item xs={2} sm={4} md={4} lg={2} xl={3} key={index}>
                                    <WeworkDashboard widgetName={val.name} count={val.count} status={val.status} slno={val.slno} indx={index} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Paper>
            </Box >
        </Fragment >
    )
}
export default Home

