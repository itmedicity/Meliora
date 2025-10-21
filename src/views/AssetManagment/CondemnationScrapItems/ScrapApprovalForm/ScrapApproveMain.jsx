import React, { memo } from 'react'
import { Box, Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import PendingScrapApprovals from './PendingScrapApprovals';
import ScrapApprovedFormMain from './ScrapApprovedFrom/ScrapApprovedFormMain';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { useQuery } from '@tanstack/react-query';
import { Paper } from '@mui/material';
import { taskColor } from 'src/color/Color';


const ScrapApproveMain = () => {


    const id = useSelector((state) => state.LoginUserData.empid);


    const getEmployeeScrapLevelForm = async () => {
        const { data } = await axioslogin.get(`condemMasters/getEmployeeScrapLevel/${id}`);
        if (data.success === 1) {
            return data.data;
        } else {
            return null;
        }
    };

    const { data: EmployeeScrapLevelForm } = useQuery({
        queryKey: ['EmployeeScrapLevelForm', id],
        queryFn: getEmployeeScrapLevelForm,
    });

    const { level_name: levelName } = EmployeeScrapLevelForm?.[0] || {};


    return (
        <Paper sx={{ height: '90vh', overflow: 'auto', flexGrow: 1 }}>
            <Box sx={{ p: 1, fontSize: 12, fontWeight: 600, color: taskColor.darkPurple, borderBottom: 1, borderColor: 'lightgrey' }}>
                {levelName}
            </Box>
            <Tabs
                defaultValue={0}
                size="sm"
                sx={{
                    display: 'flex',
                    bgcolor: 'white',
                }}
            >
                <TabList
                    sx={{
                        pt: 1,
                        justifyContent: 'center',
                        [`&& .MuiTabs-root`]: {
                            flex: 'initial',
                            bgcolor: 'white',
                            '&:hover': {
                                bgcolor: 'white',
                            },
                            [`&.Mui-selected`]: {
                                color: 'primary.plainColor',
                                borderBottom: 1.5,
                                '&::after': {
                                    height: 20,
                                    borderTopLeftRadius: 3,
                                    borderTopRightRadius: 3,
                                    bgcolor: 'primary.500',
                                },
                            },
                        },
                    }}
                >
                    <Box sx={{ flex: 1, display: 'flex', gap: 1, mb: 1, ml: 1 }}>
                        <Tab
                            label="Item Entries"
                            value={0}
                            disableIndicator
                            sx={{
                                color: taskColor.darkPurple,
                                fontWeight: 600,
                                p: 0,
                                border: 1,
                                width: 190,
                                borderColor: taskColor.lightpurple,
                                transition: 'all 0.3s ease',
                                '&.Mui-selected': {
                                    color: 'white',
                                    backgroundColor: taskColor.darkPurple,
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                                    transform: 'scale(1.02)',
                                },
                            }}
                        >
                            Pending Approvals
                        </Tab>
                        <Tab
                            label="Asset"
                            value={1}
                            disableIndicator
                            sx={{
                                color: taskColor.darkPurple,
                                fontWeight: 600,
                                p: 0,
                                border: 1,
                                width: 190,
                                borderColor: taskColor.lightpurple,
                                transition: 'all 0.3s ease',
                                '&.Mui-selected': {
                                    color: 'white',
                                    backgroundColor: taskColor.darkPurple,
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                                    transform: 'scale(1.02)',
                                },
                            }}
                        >
                            Condemnation List
                        </Tab>
                    </Box>
                </TabList>
                <TabPanel value={0} sx={{ p: 0, flexGrow: 1, }}>
                    <Box sx={{ flexGrow: 1, }}>
                        <PendingScrapApprovals id={id} EmployeeScrapLevelForm={EmployeeScrapLevelForm} />
                    </Box>
                </TabPanel>
                <TabPanel value={1} sx={{ p: 0, flexGrow: 1, }}>
                    <Box sx={{ flexGrow: 1, }}>
                        <ScrapApprovedFormMain id={id} EmployeeScrapLevelForm={EmployeeScrapLevelForm} />
                    </Box>
                </TabPanel>
            </Tabs>
        </Paper>
    )
}

export default memo(ScrapApproveMain)