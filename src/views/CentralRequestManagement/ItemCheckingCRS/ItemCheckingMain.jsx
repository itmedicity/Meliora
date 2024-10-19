// import { CssVarsProvider, Tab, tabClasses, TabList, TabPanel, Tabs } from '@mui/joy'
import { Box } from '@mui/material'
import React, { memo } from 'react'
import CrsItemChecking from './CrsItemChecking'
// import ViewDeliveryDetails from './ViewDeliveryDetails'

const ItemCheckingMain = () => {
    return (
        <Box>
            <CrsItemChecking />
            {/* <CssVarsProvider>
                <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: '#F0F4F8' }}>
                    <TabList
                        disableUnderline
                        sx={{
                            m: 0.6, pt: 0.5,
                            borderRadius: 'xl',
                            // bgcolor: 'background.level1',
                            [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                boxShadow: 'sm',
                                backgroundColor: '#607d8b',
                                color: 'white',
                            },
                        }}
                    >
                        <Tab
                            disableIndicator
                            sx={{
                                height: 50, bgcolor: 'white', border: '1px solid #c5cae9', borderRadius: 5,
                                transition: 'transform 0.2s', boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)', width: 250,
                                '&:hover': {
                                    transform: 'scale(1.01)',
                                    bgcolor: 'white',
                                },
                            }}
                        >
                            Item Checking
                        </Tab>
                        <Tab
                            disableIndicator
                            sx={{
                                height: 50, bgcolor: 'white', border: '1px solid #c5cae9', borderRadius: 5,
                                transition: 'transform 0.2s', boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)', width: 250,
                                '&:hover': {
                                    transform: 'scale(1.01)',
                                    bgcolor: 'white',
                                },
                            }}
                        >
                            View Delivery Details
                        </Tab>
                    </TabList>
                    <TabPanel value={0} sx={{ p: 0 }}>
                        <CrsItemChecking />
                    </TabPanel>
                    <TabPanel value={1} sx={{ p: 0 }}>
                        <ViewDeliveryDetails />
                    </TabPanel>
                </Tabs>
            </CssVarsProvider> */}
        </Box >
    )
}

export default memo(ItemCheckingMain)