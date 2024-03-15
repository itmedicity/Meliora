import { Box, Button, CssVarsProvider, Tab, TabList, TabPanel, Tabs, tabClasses } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { useCallback, useState } from 'react'
import AddTeleCommunicationBill from './AddTeleCommunicationBill'

const TeleTable = () => {
    const [addModalOpen, setaddModalOpen] = useState(false)
    const [AddModalFlag, setAddModalFlag] = useState(0)


    const addModal = useCallback(() => {
        setAddModalFlag(1)
        setaddModalOpen(true)
    }, [])
    return (
        <Paper sx={{ p: 1, mt: .9, boxShadow: '0px 0px 2px', border: 1, borderColor: '#DDE7EE', height: '76vh' }} >



            <Box sx={{ flex: 1, my: .5 }}>
                <CssVarsProvider>
                    {AddModalFlag === 1 ? <AddTeleCommunicationBill open={addModalOpen}
                        // tableCount={tableCount} setTableCount={setTableCount}
                        setAddModalFlag={setAddModalFlag} setaddModalOpen={setaddModalOpen}
                    />
                        : null}
                </CssVarsProvider>
                <CssVarsProvider>
                    <Button variant='soft' sx={{ width: 250, borderRadius: 0 }} onClick={addModal}>
                        + Add TeleCommunication Bill
                    </Button>
                </CssVarsProvider>
            </Box>
            <Box sx={{ flex: 1, bgcolor: '#DDE7EE' }}>

                <Tabs
                    variant="outlined"
                    aria-label="Pricing plan"
                    defaultValue={0}
                    sx={{
                        boxShadow: 'sm',
                        overflow: 'auto',
                    }}
                >
                    <TabList
                        disableUnderline
                        tabFlex={1}
                        sx={{
                            [`& .${tabClasses.root}`]: {
                                fontSize: 'sm',
                                fontWeight: 'lg',
                                [`&[aria-selected="true"]`]: {
                                    color: 'primary.500',
                                    bgcolor: 'background.surface',
                                },
                                [`&.${tabClasses.focusVisible}`]: {
                                    outlineOffset: '-4px',
                                },
                            },
                        }}
                    >
                        <Tab disableIndicator sx={{ flexGrow: 1, bgcolor: '#738FA7', color: 'white' }}>
                            ILL
                        </Tab>
                        <Tab disableIndicator sx={{ flexGrow: 1, bgcolor: '#738FA7', color: 'white' }}>
                            SIP
                        </Tab>
                        <Tab disableIndicator sx={{ flexGrow: 1, bgcolor: '#738FA7', color: 'white' }}>
                            CUG
                        </Tab>
                        <Tab disableIndicator sx={{ flexGrow: 1, bgcolor: '#738FA7', color: 'white' }}>
                            FTTH
                        </Tab>
                    </TabList>
                    <TabPanel value={0}>
                        {/* <ILLTable /> */}
                    </TabPanel>
                    <TabPanel value={1}>
                        {/* <SipTable /> */}
                    </TabPanel>
                    <TabPanel value={2}>
                        {/* <CugTable /> */}
                    </TabPanel>
                    <TabPanel value={3}>
                        {/* <FTTHTable /> */}
                    </TabPanel>
                </Tabs>
            </Box>



        </Paper>
    )
}

export default TeleTable