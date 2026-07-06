import { Box, Tab, tabClasses, TabList, TabPanel, Tabs } from '@mui/joy'
import React, { Fragment, memo, useState } from 'react'
import PatientNoSearch from './PatientNoSearch';
import BillNoSearch from './BillNoSearch';
const AbhaReg = () => {
    const [activeTab, setActiveTab] = useState(0)
    const [PatDetails, setPatDetails] = useState([])

    const handleTabChange = (event, newValue) => {
        setPatDetails([]); // Clear state when changing tabs
        setActiveTab(newValue);
    };
    return (
        <Fragment>
            <Box sx={{
                // bgcolor: 'red',
                width: '100%'
            }}>
                {/* <CssVarsProvider> */}
                <Tabs
                    aria-label="tabs"
                    value={activeTab}
                    // onChange={(event, newValue) => setActiveTab(newValue)
                    onChange={handleTabChange}

                // sx={{ bgcolor: 'var(--royal-purple-50)' }}
                >
                    <TabList
                        disableUnderline
                        sx={{
                            border: '1px solid lightblue',
                            gap: 0.3,
                            [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                boxShadow: 'sm',
                                backgroundColor: 'var( --royal-purple-300)',
                                color: 'white'
                            }
                        }}
                    >
                        <Tab
                            disableIndicator
                            sx={{
                                borderTopLeftRadius: 50,
                                ml: 0.5,
                                height: 30,
                                bgcolor: 'white',
                                border: '1px solid #c5cae9',
                                transition: 'transform 0.2s',
                                width: 300,
                                m: 0.2,
                                '&:hover': {
                                    transform: 'scale(1.01)',
                                    bgcolor: 'white'
                                }
                            }}
                        >
                            Patient No
                        </Tab>
                        <Tab
                            disableIndicator
                            sx={{
                                borderTopLeftRadius: 50,
                                height: 30,
                                bgcolor: 'white',
                                border: '1px solid #c5cae9',
                                transition: 'transform 0.2s',
                                width: 300,
                                m: 0.2,
                                '&:hover': {
                                    transform: 'scale(1.01)',
                                    bgcolor: 'white'
                                }
                            }}
                        >
                            Bill No
                        </Tab>
                    </TabList>
                    <TabPanel value={0} sx={{ p: 0 }}>
                        <PatientNoSearch PatDetails={PatDetails} setPatDetails={setPatDetails} />
                    </TabPanel>
                    <TabPanel value={1} sx={{ p: 0 }}>
                        <BillNoSearch PatDetails={PatDetails} setPatDetails={setPatDetails} />
                    </TabPanel>
                </Tabs>
            </Box>
        </Fragment>)
}

export default memo(AbhaReg)