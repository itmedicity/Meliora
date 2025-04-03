import React, { useCallback } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton';
import TextComponent from 'src/views/Components/TextComponent';
import CloseIcon from '@mui/icons-material/Close'
import { Box, CssVarsProvider, Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ApprovalPendingMainList from './ApprovalPendingList/ApprovalPendingMainList';
import SubmittedListMain from './CondemnationSubmittedList/SubmittedListMain';


const CondemnationListTab = ({ menuRightsList, empid, empdept }) => {

    const { level_name, level_no } = menuRightsList;

    const history = useHistory();
    const backtoSetting = useCallback(() => {
        history.push('/Home');
    }, [history]);

    return (
        <Box>
            <CssVarsProvider>
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
                        text={`${level_name}  Condemnation Approval`}
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
                            <ApprovalPendingMainList level_no={level_no} empid={empid} empdept={empdept} menuRightsList={menuRightsList} />
                        </Box>
                    </TabPanel>
                    <TabPanel value={1} sx={{ p: 0, flexGrow: 1, }}>
                        <Box sx={{ flexGrow: 1, }}>
                            <SubmittedListMain menuRightsList={menuRightsList} empId={empid} empdept={empdept} />
                        </Box>
                    </TabPanel>
                </Tabs>
            </CssVarsProvider>
        </Box>
    )
}

export default CondemnationListTab