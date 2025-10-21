
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton';
import TextComponent from 'src/views/Components/TextComponent';
import CloseIcon from '@mui/icons-material/Close'
import { Box, Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { taskColor } from 'src/color/Color';
import { useQuery } from '@tanstack/react-query';
import { axioslogin } from 'src/views/Axios/Axios';
import CondemnPendingApproval from './CondemnPendingApproval';
import { getTopActiveCondemnationLevel } from 'src/api/AssetApis';
import SubmittedByLevels from './SubmittedByLevels';


const CondemnAllApproveMain = () => {

    const empid = useSelector((state) => state.LoginUserData.empid);

    const history = useNavigate();

    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])

    const { data: EmployeeCondemnApprovalLevelData = [], } = useQuery(
        ['EmployeeCondemnApprovalLevel'],
        async () => {
            const result = await axioslogin.get(
                `AssetCondemnation/getEmployeeCondemnApprovalLevel/${empid}`
            );
            return result.data?.data || [];
        },
        { enabled: !!empid }
    );
    const { level_name, level_no, approved_for_view_names } = EmployeeCondemnApprovalLevelData[0] || {};

    const postempid = useMemo(() => {
        return {
            empid: empid,
        }
    }, [empid])


    const [PendingCondemApprovalData, setPendingCondemApprovalData] = useState([]);

    const { data: pendingCondemApprovalList = [], isLoading: pendingApprovalsLoading } = useQuery(
        ['PendingCondemApprovalList', postempid],
        async () => {
            const result = await axioslogin.post(
                'AssetCondemnation/getPendingCondemApprovalList',
                postempid
            );
            return result.data?.data || [];
        },
        { enabled: !!empid }
    );


    useEffect(() => {
        setPendingCondemApprovalData(pendingCondemApprovalList);
    }, [pendingCondemApprovalList]);


    // Extract approvable levels as an array
    const approvedLevels = approved_for_view_names
        ?.split(",")
        .map(level => level.trim()) || [];

    const filteredPending = PendingCondemApprovalData.filter(row => {
        // Skip if employee's own level is already approved (== 1)
        if (row[level_name] === 1) {
            return false;
        }
        // Keep only if all other approvable levels are already 1
        return approvedLevels.every(level => row[level] === 1 || level === level_name);
    });

    // Current level approved list
    const filteredCurrentLevelApproved = PendingCondemApprovalData.filter(row => {
        // Keep only rows where current level is approved
        if (row[level_name] !== 1) {
            return false;
        }
        // And all required approved levels are approved
        return approvedLevels.every(level => row[level] === 1);
    });

    const { data: ActiveCondemnationLevel } = useQuery({
        queryKey: ['checkCondemLevels'],
        queryFn: () => getTopActiveCondemnationLevel()
    })
    const ActiveCondemnations = useMemo(() => ActiveCondemnationLevel || [], [ActiveCondemnationLevel])
    const TopActiveLevel = ActiveCondemnations.length > 0 ? ActiveCondemnations[0]?.level_num : null
    const checkActiveLevel = TopActiveLevel === level_no ? 1 : 0


    return (
        <Box sx={{ flexGrow: 1, }}>

            <Box sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: '#D0D0D0' }}>
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
                    text={`CONDEMNATION ${level_name} APPROVAL`}
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
                        <CondemnPendingApproval empid={empid} pendingApprovalsLoading={pendingApprovalsLoading} filteredPending={filteredPending}
                            EmployeeCondemnApprovalLevelData={EmployeeCondemnApprovalLevelData} checkActiveLevel={checkActiveLevel} />
                    </Box>
                </TabPanel>
                <TabPanel value={1} sx={{ p: 0, flexGrow: 1, }}>
                    <Box sx={{ flexGrow: 1, }}>
                        <SubmittedByLevels empid={empid} filteredCurrentLevelApproved={filteredCurrentLevelApproved} pendingApprovalsLoading={pendingApprovalsLoading}
                            level_no={level_no} EmployeeCondemnApprovalLevelData={EmployeeCondemnApprovalLevelData} checkActiveLevel={checkActiveLevel} />
                    </Box>
                </TabPanel>
            </Tabs>

        </Box>
    )
}


export default CondemnAllApproveMain