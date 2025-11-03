import React, { memo, useCallback } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton';
import TextComponent from 'src/views/Components/TextComponent';
import CloseIcon from '@mui/icons-material/Close'
import { Box, Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import { useSelector } from 'react-redux';
import PendingApprovalIncharge from './PendingApprovalIncharge';
import SubmittedByIncharge from './SubmittedByIncharge';
import { useNavigate } from 'react-router-dom';
import { taskColor } from 'src/color/Color';


const CondemnInchargeApproval = () => {

    const empid = useSelector((state) => state.LoginUserData.empid);
    const empdept = useSelector((state) => {
        return state.LoginUserData.empdept
    })

    const history = useNavigate();
    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])

    return (
        <Box sx={{ flexGrow: 1, }}>

            <Box sx={{ flexGrow: 1, display: 'flex', borderBottom: 1, borderColor: '#D0D0D0' }}>
                <TextComponent
                    sx={{
                        color: '#5A676C',
                        fontWeight: 600,
                        flex: 1,
                        m: 0.5,
                        pl: 1,
                        fontFamily: 'Arial',
                        fontSize: 14
                    }}
                    text={`Condemnation Incharge Approval`}
                />
                <Box>
                    <CusIconButton
                        size="sm"
                        variant="outlined"
                        color="primary"
                        onClick={backtoSetting}
                    >
                        <CloseIcon fontSize="small" />
                    </CusIconButton>
                </Box>
            </Box>
            <Tabs
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
                        <PendingApprovalIncharge empid={empid} empdept={empdept} />
                    </Box>
                </TabPanel>
                <TabPanel value={1} sx={{ p: 0, flexGrow: 1, }}>
                    <Box sx={{ flexGrow: 1, }}>
                        <SubmittedByIncharge empid={empid} empdept={empdept} />
                    </Box>
                </TabPanel>
            </Tabs>
        </Box>
    )
}

export default memo(CondemnInchargeApproval)