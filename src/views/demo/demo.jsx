import { Tab, TabList, TabPanel, Tabs, Typography, tabClasses } from '@mui/joy';
import { Box } from '@mui/material';
import React, { lazy, memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';

import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';

const COFFPage = lazy(() => import('./RequestComponents/CompensatoryRequest'))
const NightOffPage = lazy(() => import('./RequestComponents/NightOffrequest'))
const DoffPage = lazy(() => import('./RequestComponents/Doffrequest'))
const Commonpage = lazy(() => import('./RequestComponents/CommonRequest'))
const OverTimePage = lazy(() => import('./RequestComponents/OvertimeRequest'))

const OffrequestCombinePage = () => {

    const [menurights, setMenurights] = useState([])

    //all menu slno
    const modulerights = useSelector((state) => state?.getModuleRightList?.modulerightsList)

    //static menu rights
    const menuList = [
        { slno: 285, name: 'Credit Off', component: <COFFPage />, icon: <AccountBalanceWalletOutlinedIcon color='warning' /> },
        { slno: 236, name: 'Night Off', component: <NightOffPage />, icon: <NightsStayOutlinedIcon color='secondary' /> },
        { slno: 300, name: 'Duty OFF', component: <DoffPage />, icon: <PersonOffOutlinedIcon color='info' /> },
        { slno: 239, name: 'Common Request', component: <Commonpage />, icon: <EventNoteOutlinedIcon color='error' /> },
        { slno: 31, name: 'Over Time', component: <OverTimePage />, icon: <UpdateOutlinedIcon color='success' /> },
    ]

    useEffect(() => {
        let array = menuList?.filter((value) => {
            return modulerights?.find((val) => {
                return value.slno === val.menu_slno;
            })
        });
        setMenurights(array)
    }, [])

    return (
        <CustomLayout title="OFF Request" displayClose={true} >
            <Box sx={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                padding: 0.3,
                borderRadius: 'md',
                boxShadow: 'lg',
                '@media screen and (max-width: 768px)': {
                    padding: 1,
                },

            }}>
                <Tabs
                    aria-label="Basic tabs"
                    defaultValue={0}
                    sx={{ bgcolor: 'transparent', px: 1 }}
                    size="sm"
                >
                    <TabList
                        tabFlex={1}
                        variant="outlined"
                        disableUnderline
                        sx={{
                            p: 0.5,
                            gap: 0.5,
                            borderRadius: 'xl',
                            bgcolor: 'background.level1',
                            [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                boxShadow: 'sm',
                                bgcolor: 'background.surface',
                            },
                        }}
                    >
                        {
                            menurights?.map((val, ind) => {
                                return <Tab
                                    key={ind}
                                    disableIndicator
                                    sx={{ backgroundColor: '#DBEAF8' }}
                                >
                                    {val.icon}
                                    <Typography level="title-md" sx={{ fontSize: 14.5 }} >{val.name}</Typography>
                                </Tab>
                            })
                        }
                    </TabList>
                    {
                        menurights?.map((val, ind) => {
                            return <TabPanel
                                key={ind}
                                value={ind}
                                sx={{ p: 0 }}
                            >
                                {val.component}
                            </TabPanel>
                        })
                    }
                </Tabs>
            </Box>
        </CustomLayout>
    )
}

export default memo(OffrequestCombinePage) 