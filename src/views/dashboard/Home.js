import { Grid, Paper } from '@mui/material'
import React, { Fragment, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAssignedcomplaints, getOnholdcomplaints, getRectifiedcomplaints, getTotalcomplaints, getVerifiedcomplaints } from 'src/redux/actions/ComplaintDashboard.action';
import { getPendingcomplaints } from 'src/redux/actions/ComplaintDashboard.action';
import { getComplaintRights } from 'src/redux/actions/CmpRightsDashboard.action';
import ComplaintDashboard from './ComplaintDashboard';
import { getEscalationMapping } from 'src/redux/actions/EscalationMapping.action'
// import WeworkDashboard from './WeworkDashboard';
// import { getTotalAdmission } from 'src/redux/actions/WeworkAdmission.action'

const Home = () => {
    const dispatch = useDispatch();
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    //redux for getting employee data
    const profileData = useSelector((state) => {
        return state.getLoginProfileData.loginProfiledata
    })
    useEffect(() => {
        dispatch(getComplaintRights(id))
    }, [dispatch, id])
    //redux for module rights
    const complaintRights = useSelector((state) => {
        return state.getComplaintRights.complaintRightsLists.map(ele => ele.menu_slno) || 0
    })
    useEffect(() => {
        if (profileData.length !== 0) {
            const { em_department } = profileData[0]
            dispatch(getTotalcomplaints(em_department))
            dispatch(getPendingcomplaints(em_department))
            dispatch(getAssignedcomplaints(em_department))
            dispatch(getRectifiedcomplaints(em_department))
            dispatch(getVerifiedcomplaints(em_department))
            dispatch(getOnholdcomplaints(em_department))

        }
    }, [profileData, dispatch])

    //redux for esclation mapping
    useEffect(() => {
        dispatch(getEscalationMapping())
    }, [dispatch])



    const newState = useSelector((state) => {
        return state.getTotalcomplaints
    })

    const data = Object.values(newState);
    const entries = useMemo(() => data, [data]);
    const newDashMenu = entries.filter(val => complaintRights.includes(val.slno) === true ? val.slno : null);
    const notification = useMemo(() => newDashMenu, [newDashMenu]);
    // wework dash board
    // const admission = useSelector((state) => {
    //     return state.getTotalAdmission


    // })

    // useEffect(() => {
    //     dispatch(getTotalAdmission())
    // }, [dispatch])

    // const wewrkdata = Object.values(admission);
    // const workentries = useMemo(() => wewrkdata, [wewrkdata])
    // const weworkDash = workentries.filter(val => complaintRights.includes(val.slno) === true ? val.slno : null);
    // const weworkmenu = useMemo(() => weworkDash, [weworkDash])


    return (
        <Fragment>
            <Paper square sx={{ p: 1, width: '100%', display: "flex" }} elevation={3}>
                <Grid
                    container
                    spacing={{ xs: 1, md: 1, md: 1, lg: 1.5, xl: 1.5 }}
                    columns={{ xs: 1, sm: 8, md: 8, lg: 8, xl: 12 }}
                    sx={{ width: '100%' }} >
                    {
                        notification.map((val, index) => (
                            <Grid item xs={2} sm={4} md={4} lg={2} xl={3} key={index}>
                                <ComplaintDashboard widgetName={val.name} count={val.count} status={val.status} slno={val.slno} indx={index} />
                            </Grid>
                        ))
                    }
                    {/* <Paper square sx={{ p: 1, width: '100%', display: "flex" }} elevation={3}> */}
                    {/* {
                        weworkmenu.map((val, index) => (
                            <Grid item xs={2} sm={4} md={4} lg={2} xl={3} key={index}>
                                <WeworkDashboard widgetName={val.name} count={val.count} status={val.status} slno={val.slno} indx={index} />
                            </Grid>
                        ))
                    } */}

                    {/* </Paper> */}


                </Grid>
            </Paper>
        </Fragment>
    )
}
export default Home

