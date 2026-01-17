import { Box } from '@mui/joy'
import React, { lazy, memo, Suspense } from 'react'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab, { tabClasses } from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'



// components lazy loading 
const PatientIncidentForm = lazy(() => import('./PatientIncidentForm'));
// const EmployeeIncidentForm = lazy(() => import('./EmployeeIncidentForm'));

const NewIncidentRegistration = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    width: '100%',
                    boxShadow: '0 2px 4px 0 rgba(185, 177, 177, 0.2), 0 6px 20px 0 rgba(180, 177, 177, 0.19)',
                }}>
                <Tabs defaultValue={0} sx={{
                    width: '100%',
                    p: 0.5,
                    borderWidth: '2px',
                    borderColor: 'red'
                }}>
                    <TabList sx={{
                        width: '100%',
                        p: 0.5,
                        bgcolor: 'var(--rose-pink-50)',
                        borderWidth: '1px',
                        [`& .${tabClasses.root}`]: {
                            fontSize: 'sm',
                            fontWeight: 'lg',
                            borderRadius: 0, // Default for unselected tabs
                            transition: '0.3s',
                            '&:hover': {
                                bgcolor: 'neutral.softHoverBg',
                            },
                            [`&[aria-selected="true"]`]: {
                                color: 'white',
                                bgcolor: 'var(--royal-purple-300)',
                                borderTopLeftRadius: 35
                            },
                            [`&.${tabClasses.focusVisible}`]: {
                                outlineOffset: '-4px',
                            },
                        },
                    }}>
                        <Tab sx={{ width: '20%' }}>PATIENT</Tab>
                        <Tab sx={{ width: '20%' }}>EMPLOYEE</Tab>
                        <Tab sx={{ width: '20%' }}>OTHERS</Tab>
                    </TabList>

                    <TabPanel value={0}>
                        <Suspense fallback={"Loading"}>
                            <PatientIncidentForm />
                        </Suspense>
                    </TabPanel>
                    <TabPanel value={1}>
                        <PatientIncidentForm />
                        {/* <EmployeeIncidentForm /> */}
                    </TabPanel>
                    <TabPanel value={2}>
                        <PatientIncidentForm />
                    </TabPanel>
                </Tabs>
            </Box>
        </Box>
    )
}

export default memo(NewIncidentRegistration);