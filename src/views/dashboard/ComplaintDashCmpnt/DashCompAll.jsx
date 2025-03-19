import { Paper, Box } from '@mui/material';
import React, { Fragment, useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPendingOnholdcomplaintsall, getTotalcomplaintsall } from 'src/redux/actions/ComplaintDashAllDept.action';
import { getComplaintDept } from 'src/redux/actions/ComplaintDept.action';
import ComDashTableAll from './ComDashTableAll';
import ComplaintDashboard from './ComplaintDashboard';

const DashCompAll = () => {
    const dispatch = useDispatch();

    /**redux fAction for getting all complaints and pending complaints of login employes department  */
    useEffect(() => {
        dispatch(getTotalcomplaintsall())
        dispatch(getPendingOnholdcomplaintsall())
        dispatch(getComplaintDept())
    }, [dispatch])


    const totalcomplaint = useSelector((state) => {
        return {
            complaintList: state.setComplaintListAll.complaintList,
            loadingStatus: state.setComplaintListAll.loadingStatus
        }
    })
    const { complaintList, loadingStatus } = totalcomplaint

    const onholdcomplaint = useSelector((state) => {
        return {
            pendingOnholdList: state.setPendOnholdCompListAll.pendingOnholdList,
            PendingOnholdStatus: state.setPendOnholdCompListAll.pendingOnholdStatus
        }
    })

    const { pendingOnholdList, PendingOnholdStatus } = onholdcomplaint

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


    // //Array for dispaly dashboard
    const dasharrayDept = [
        { slno: 11, name: "Total Complaints", count: complaintList.length, status: loadingStatus },
        { slno: 12, name: "Pending For Assign", count: pending.length, status: loadingStatus },
        { slno: 13, name: "Assigned Complaints", count: assign.length, status: loadingStatus },
        { slno: 14, name: "Verified Complaints", count: veryfied.length, status: loadingStatus },
        { slno: 15, name: "Onhold/Pending Complaints", count: pendingOnholdList.length, status: PendingOnholdStatus }
    ]

    const compdept = useSelector((state) => {
        return state.getComplaintDept.complaintdeptList

    })


    return (
        <Fragment>
            <Paper square elevation={2} sx={{ p: 0.5, mb: 2 }}   >
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    p: 1,
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                }}>
                    {
                        dasharrayDept && dasharrayDept.map((val) => {
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
                    <ComDashTableAll
                        compdept={compdept}
                    //count={count}
                    />
                </Box>
            </Paper>
        </Fragment>
    )
}

export default memo(DashCompAll)