import { Box, CssVarsProvider, Tab, TabList, TabPanel, Tabs } from '@mui/joy'
import React, { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import TextComponent from 'src/views/Components/TextComponent'
import CusIconButton from 'src/views/Components/CusIconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Paper } from '@mui/material'
import CondemListForHod from './CondemListForHod'
import PendingApprovalsHod from './PendingApprovalsHod'

const HodTab = ({ menurights }) => {
    const history = useHistory();
    const backtoSetting = useCallback(() => {
        history.push('/Home');
    }, [history]);

    const empdept = useSelector((state) => {
        return state.LoginUserData.empdept
    })
    const empId = useSelector((state) => {
        return state.LoginUserData.empid
    })
    return (
        <Paper sx={{ borderRadius: 0, height: '90vh' }}>
            <Box>
                <CssVarsProvider>
                    <Box sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: '#D0D0D0' }}>
                        <TextComponent
                            sx={{
                                color: '#5A676C',
                                fontWeight: 510,
                                flex: 1,
                                m: 0.5,
                                pl: 1,
                                fontFamily: 'Arial'
                            }}
                            text="Condemnation Approvals Hod"
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
                                    label="Pending"
                                    value={0}
                                    disableIndicator
                                    sx={{
                                        color: '#5D6268',
                                        fontWeight: 600,
                                        p: 0,
                                        border: 1,
                                        width: 190,
                                        borderColor: '#EAEFF2',
                                        transition: 'all 0.3s ease',
                                        '&.Mui-selected': {
                                            color: 'white',
                                            backgroundColor: '#6B5F5A ',
                                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                                            transform: 'scale(1.02)',
                                        },
                                    }}
                                >
                                    Pending Approvals
                                </Tab>
                                <Tab
                                    label="Condemnation"
                                    value={1}
                                    disableIndicator
                                    sx={{
                                        color: '#5D6268',
                                        fontWeight: 600,
                                        p: 0,
                                        border: 1,
                                        width: 190,
                                        borderColor: '#EAEFF2',
                                        transition: 'all 0.3s ease',
                                        '&.Mui-selected': {
                                            color: 'white',
                                            backgroundColor: '#6B5F5A ',
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
                                <PendingApprovalsHod empdept={empdept} empId={empId} menurights={menurights} />
                            </Box>
                        </TabPanel>
                        <TabPanel value={1} sx={{ p: 0, flexGrow: 1, }}>
                            <Box sx={{ flexGrow: 1, }}>
                                <CondemListForHod empdept={empdept} empId={empId} menurights={menurights} />
                            </Box>
                        </TabPanel>
                    </Tabs>
                </CssVarsProvider>
            </Box>
        </Paper>
    )
}

export default HodTab