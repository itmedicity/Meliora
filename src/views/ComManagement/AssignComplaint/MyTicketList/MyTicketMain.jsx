import { Box, Tab, tabClasses, TabList, TabPanel, Tabs, } from '@mui/joy'
import React, { memo } from 'react'
import MyAssignedList from './MyAssignedList';
import MyAllTickets from './MyAllTickets';
import { Paper } from '@mui/material';

const MyTicketMain = ({ assistReq, count, setCount }) => {

    return (
        <Box sx={{
            flex: 1,
            bgcolor: '#E3E7F1',
            mt: .3,
            px: .3,
            pt: .3,
            pb: .5
        }}>
            <Paper sx={{ bgcolor: '#F8F8F8', p: .5 }}>
                <Tabs
                    defaultValue={0}
                    size="sm"
                    sx={{
                        display: 'flex',
                        pt: .5,
                        // bgcolor: 'yellow',
                        // justifyContent: 'center'
                    }}
                >
                    <TabList
                        disableUnderline
                        sx={{
                            p: 0,
                            [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                borderBottom: 3,
                                bgcolor: 'white'
                            },
                            flex: 1,
                            display: 'flex', flexDirection: 'column',
                            bgcolor: 'white',
                            // justifyContent: 'center'
                        }}
                    >
                        <Box sx={{ display: 'flex', flex: 1, mb: 0 }} >
                            <Box sx={{ flex: 2, display: 'flex', px: .5 }}>
                                <Tab disableIndicator sx={{
                                    color: '#CBAE11',
                                    // fontWeight: 700, fontSize: 15
                                }}>
                                    Assinged
                                </Tab>
                                <Tab disableIndicator sx={{
                                    color: '#A47551',
                                    // fontWeight: 700
                                }}>
                                    My Tickets
                                </Tab>
                            </Box>
                            <Box sx={{ flex: 4 }}>
                            </Box>
                        </Box>
                    </TabList>
                    <TabPanel value={0} sx={{ px: 0, pt: .5, }}>
                        <MyAssignedList assistReq={assistReq} count={count} setCount={setCount} />
                    </TabPanel>
                    <TabPanel value={1} sx={{ p: 0 }}>
                        <MyAllTickets />
                    </TabPanel>
                </Tabs>
            </Paper>

        </Box>
    )
}

export default memo(MyTicketMain)