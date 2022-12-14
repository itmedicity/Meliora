import { Paper, Box } from '@mui/material';
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoginProfileData } from 'src/redux/actions/LoginProfile.action';
import DashCompAll from './ComplaintDashCmpnt/DashCompAll';
import DashCompDept from './ComplaintDashCmpnt/DashCompDept';
import DashCompEmp from './ComplaintDashCmpnt/DashCompEmp';
import { getMenuSlno } from 'src/views/Constant/Constant'
import CMdashboard from './DashBoardCM'
import { useState } from 'react';

const Home = () => {
    const dispatch = useDispatch();

    /**reducer function for getting login employees id */
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    /**redux function for getting login employees all details */
    useEffect(() => {
        dispatch(setLoginProfileData(id))
    }, [dispatch, id])

    //redux for getting employee data
    const profileData = useSelector((state) => {
        return state.getLoginProfileData.loginProfiledata
    })
    const [dashComp, setDashComp] = useState([])
    useEffect(() => {

        getMenuSlno().then((val) => {
            const resultLength = Object.keys(val[0])?.length ?? 0
            if (resultLength > 0) {
                const menuRitSlno = val[0];
                const menuSlnoAry = menuRitSlno.map((menu) => {
                    return menu.menu_slno;
                })

                const complaintdash = CMdashboard.filter(val => menuSlnoAry.includes(val.men_slno));
                setDashComp(complaintdash)

            }
        })
    }, [])

    return (
        <Fragment>
            <Box sx={{ width: "100%", p: 1 }}>
                <Paper square elevation={2} sx={{ p: 1 }} >
                    {
                        dashComp.map((val) => {
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
                </Paper>
            </Box >
        </Fragment >
    )
}
export default Home

