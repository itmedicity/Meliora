import { Box, Tab, tabClasses, TabList, TabPanel, Tabs } from '@mui/joy'
import React, { Fragment, memo, useCallback, useState } from 'react'
import WorkOrderRegistration from './WorkOrderRegistration'

const Workorder = () => {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <Fragment>
            <Box sx={{ bgcolor: '#E3EFF9', width: '100%' }}>
                {/* <CssVarsProvider> */}
                <Tabs
                    aria-label="tabs"
                    value={activeTab}
                    onChange={(event, newValue) => setActiveTab(newValue)}
                    sx={{ bgcolor: 'var(--royal-purple-50)' }}
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
                            Work Order Register
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
                            View
                        </Tab>
                    </TabList>
                    <TabPanel value={0} sx={{ p: 0 }}>
                        <WorkOrderRegistration />
                        {/* <CrfRegistration
              editRowData={editRowData}
              setEditRowData={setEditRowData}
              edit={edit}
              setEdit={setEdit}
              detailDataDis={detailDataDis}
              setDetailDataDis={setDetailDataDis}
              imagearray={imagearray}
              setImageArry={setImageArry}
            /> */}
                    </TabPanel>
                    <TabPanel value={1} sx={{ p: 0 }}>
                        {/* <CrfReqstTableView rowSelect={rowSelect} /> */}
                    </TabPanel>
                </Tabs>
                {/* </CssVarsProvider> */}
            </Box>
        </Fragment>)
}

export default Workorder