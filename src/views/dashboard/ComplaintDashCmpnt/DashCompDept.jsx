import { Paper, Typography, Box } from '@mui/material';
import React, { Fragment, useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOnholdcomplaints, getTotalcomplaints } from 'src/redux/actions/ComplaintDashboard.action';
import { getDepartemployee } from 'src/redux/actions/DeptwiseEmp.action'
import CompDashTable from './CompDashTable';
import ComplaintDashboard from './ComplaintDashboard';

const DashCompDept = ({ profileData }) => {
    const dispatch = useDispatch();

    /**reducer function for getting login employees dept section */
    const dept_sec = useSelector((state) => {
        return state.LoginUserData.empdeptsec
    })

    /**redux fAction for getting all complaints and pending complaints of login employes department  */
    useEffect(() => {
        if (profileData.length !== 0) {
            const { em_department } = profileData[0]
            dispatch(getTotalcomplaints(em_department))
            dispatch(getOnholdcomplaints(em_department))
            dispatch(getDepartemployee(em_department))
        }
    }, [profileData, dispatch])

    const deptwiseemp = useSelector((state) => {
        return state.getDepartemployee.departempList || 0
    })
    /**reducer function for total complaints */
    const total = useSelector((state) => {
        return {
            complaintList: state.getComplaintList.complaintList,
            loadingStatus: state.getComplaintList.loadingStatus
        }
    })
    const { complaintList, loadingStatus } = total
    /**reducer function for Pending and onhold complaints */
    const onhold = useSelector((state) => {
        return {
            onHoldData: state.getOnholdList.onHoldList,
            onHoldStatus: state.getOnholdList.onholdStatus
        }
    })

    const { onHoldData, onHoldStatus } = onhold
    /** filter total complaint based on status get pending for assign complaint */
    const pending = complaintList?.filter((val) => {
        return val.compalint_status === 0
    })
    /** filter total complaint based on status get assigned complaint */
    const assign = complaintList?.filter((val) => {
        return val.compalint_status === 1
    })
    /** filter total complaint based on status get Verified complaint */
    const veryfied = complaintList?.filter((val) => {
        return val.compalint_status === 3
    })

    //Array for dispaly dashboard
    const dasharray = [
        { slno: 1, name: "Total Complaints", count: complaintList.length, status: loadingStatus },
        { slno: 2, name: "Pending For Assign", count: pending.length, status: loadingStatus },
        { slno: 3, name: "Assigned Complaints", count: assign.length, status: loadingStatus },
        { slno: 4, name: "Verified Complaints", count: veryfied.length, status: loadingStatus },
        { slno: 5, name: "Onhold/On-Progress Complaints", count: onHoldData.length, status: onHoldStatus }
    ]
    return (
        <Fragment>
            <Paper square elevation={2} sx={{ p: 0.5, mb: 2 }}   >
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                }}>
                    <Box sx={{
                        width: '40%',
                        mt: 0.8, pl: 2,
                        textTransform: "capitalize"
                    }}>
                        <Typography>{dept_sec.toLowerCase()}</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    p: 1,
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                }}>
                    {
                        dasharray && dasharray.map((val) => {
                            return <Box key={val.slno} sx={{
                                width: '20%',
                                pr: 2,
                            }}>
                                <ComplaintDashboard
                                    widgetName={val.name}
                                    count={val.count}
                                    slno={val.slno}
                                    status={val.status}
                                />
                            </Box>
                        })
                    }
                </Box>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    p: 1,
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                }}>
                    <CompDashTable
                        deptwiseemp={deptwiseemp}
                    />
                </Box>
            </Paper>
        </Fragment>
    )
}

export default memo(DashCompDept)