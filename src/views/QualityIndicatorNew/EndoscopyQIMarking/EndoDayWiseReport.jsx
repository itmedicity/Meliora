import { Box, CssVarsProvider, Tab, TabList, TabPanel, Tabs, tabClasses } from '@mui/joy'
import React, { memo } from 'react'
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DayWisePatientsListTable from '../CommonComponents/DayWisePatientsListTable';
import EndoMonthlyReport from './EndoMonthlyReport';
const EndoDayWiseReport = ({ viewData, qitype, dayFlag, fromDate }) => {
    return (
        <Box variant="outlined" sx={{ maxHeight: window.innerHeight - 240, bgcolor: '#F8F8F8', p: 0.5 }}>
            <CssVarsProvider>
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
                            [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                borderBottom: 5,
                                bgcolor: 'white'
                            },
                            display: 'flex', flexDirection: 'column',
                            bgcolor: 'white'
                        }}
                    >
                        <Box sx={{ display: 'flex', flex: 1, mb: 0 }} >
                            <Box sx={{ flex: 3, display: 'flex', px: .5 }}>
                                <Tab disableIndicator sx={{}}>
                                    <PeopleIcon sx={{ color: '#555830', height: 25, width: 30 }} />
                                    Patient List
                                </Tab>
                                <Tab disableIndicator sx={{}}>
                                    <AssessmentIcon sx={{ color: '#555830', height: 25, width: 30 }} />
                                    Report
                                </Tab>
                            </Box>
                            <Box sx={{ flex: 2 }}>
                            </Box>
                        </Box>
                    </TabList>
                    <TabPanel value={0} sx={{ p: 0 }}>
                        <DayWisePatientsListTable viewData={viewData} qitype={qitype} />
                    </TabPanel>
                    <TabPanel value={1} sx={{ p: 0 }}>
                        <EndoMonthlyReport viewData={viewData} dayFlag={dayFlag} searchDate={fromDate} />
                    </TabPanel>
                </Tabs>
            </CssVarsProvider>
        </Box>
    )
}

export default memo(EndoDayWiseReport)