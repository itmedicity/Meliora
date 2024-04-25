import React, { memo } from 'react'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import { Box, TabPanel } from '@mui/joy';
import { Paper } from '@mui/material';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TeleMain from './TeleMain';
import PaidBills from './PaidBills';

const TeleDash = ({ billCount, setbillCount }) => {
    return (
        <Paper sx={{
            mt: .9,
            borderRadius: 0,
            p: .5,
            boxShadow: '0px 0px 1px',
            height: '76vh',
            bgcolor: '#E3E7F1'
        }} >
            <Paper sx={{ bgcolor: '#F8F8F8', p: .5 }}>
                <Tabs
                    defaultValue={0}
                    size="sm"
                    sx={{
                        display: 'flex',
                        mt: .5,
                    }}
                >
                    <TabList
                        disableUnderline
                        sx={{
                            p: 0,
                            // bgcolor: 'background.level1',

                            [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                borderBottom: 5,
                                // bgcolor: 'background.level1',
                                bgcolor: 'white'
                            },
                            display: 'flex', flexDirection: 'column',
                            bgcolor: 'white'
                        }}
                    >

                        <Box sx={{ display: 'flex', flex: 1, mb: 0 }} >
                            <Box sx={{ flex: 2, display: 'flex', px: .5 }}>
                                <Tab disableIndicator sx={{ color: '#710117', fontWeight: 800, }}>
                                    <FmdBadIcon sx={{ color: '#710117', height: 25, width: 30 }} /> Pending Bills</Tab>
                                <Tab disableIndicator sx={{ color: '#16796F', fontWeight: 800 }}>
                                    <TaskAltIcon sx={{ color: '#0C6170', height: 25, width: 30 }} />Paid Bills</Tab>
                            </Box>
                            <Box sx={{ flex: 4 }}>
                            </Box>
                        </Box>
                    </TabList>
                    <TabPanel value={0} sx={{ p: 0 }}>
                        <TeleMain billCount={billCount} setbillCount={setbillCount} />
                    </TabPanel>
                    <TabPanel value={1} sx={{ p: 0 }}>
                        <PaidBills billCount={billCount} setbillCount={setbillCount} />
                    </TabPanel>
                </Tabs>
            </Paper>
        </Paper>
    )
}

export default memo(TeleDash)