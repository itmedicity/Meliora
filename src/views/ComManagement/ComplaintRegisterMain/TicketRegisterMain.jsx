import { Box, CssVarsProvider, Tab, TabList, TabPanel, Tabs } from '@mui/joy'
import { Paper } from '@mui/material';
import React, { memo, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CusIconButton from 'src/views/Components/CusIconButton';
import TextComponent from 'src/views/Components/TextComponent';
import CloseIcon from '@mui/icons-material/Close'
import ComplaintRegistrMast from '../ComplaintRegister/ComplaintRegistrMast';
import ResolvedTickets from './ResolvedTickets';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { axioslogin } from 'src/views/Axios/Axios';
import { keyframes } from '@emotion/react';
import InfoIcon from '@mui/icons-material/Info';


const TicketRegisterMain = () => {

    const history = useHistory();
    const [selectedTab, setSelectedTab] = useState(0);
    const [count, setCount] = useState(0)


    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const backtoSetting = useCallback(() => {
        history.push('/Home');
    }, [history]);

    const empsecid = useSelector((state) => {
    return state.LoginUserData.empsecid
     })

        
    const { data: verficationPending = [], } = useQuery({
    queryKey: ['getVerificationPendingTickets', empsecid, count],
    queryFn: async () => {        
    const result = await axioslogin.get(`/complaintreg/getVerificationPending/${empsecid}`);
    const { success, data } = result.data;
     return success === 1 ? data : [];
     },
    nabled: !!empsecid,
      });


      const blink = keyframes`
            50% {
            opacity: 20%;
        }`;


    return (
        <Paper sx={{ borderRadius: 0 }}>
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
                        text="Ticket Registration & View"
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
                    value={selectedTab}
                    onChange={handleTabChange}
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
                                    },},},}}>

                        <Box sx={{ flex: 1, display: 'flex', gap: 1, mb: 1, ml: 1 }}>
                            <Tab
                                label="Asset"
                                value={0}
                                disableIndicator
                                sx={{
                                    color: '#5D6268',
                                    fontWeight: 600,
                                    p: 0,
                                    border: 1,
                                    width: 180,
                                    borderColor: '#EAEFF2',
                                    transition: 'all 0.3s ease',
                                    '&.Mui-selected': {
                                        color: 'Black',
                                        backgroundColor: '#C6DCF3',
                                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                                        transform: 'scale(1.02)',
                                    },
                                }}
                            >
                                Ticket Registration
                            </Tab>
                            <Tab
                                label="Spare"
                                value={1}
                                disableIndicator
                                sx={{
                                    color: '#5D6268',
                                    fontWeight: 600,
                                    p: 0,
                                    border: 1,
                                    width: 180,
                                    borderColor: '#EAEFF2',
                                    transition: 'all 0.3s ease',
                                    '&.Mui-selected': {
                                        color: 'black',
                                        backgroundColor: '#C6DCF3',
                                        boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
                                        transform: 'scale(1.02)',
                                    },
                                }}
                            >
                                Resolved Tickets
                            </Tab>    
                        {verficationPending.length>2?
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#FFF387', 
                                color: 'darkred',
                                fontWeight: 600,
                                borderTopLeftRadius:15,
                                borderBottomLeftRadius:15,
                                px:1,
                                boxShadow: 1,
                                 animation: `${blink} 1.2s infinite`
                                
                            }}
                            >
                            <InfoIcon sx={{ fontSize: 22, mr: 1 ,  color: 'darkred',}} />
                            Verify rectified tickets before registering new tickets.
                        </Box>
                        </Box>  :null}
                        </Box>
                    </TabList>
                    <TabPanel value={0} sx={{ p: 0, flexGrow: 1, }}>
                        <Box sx={{ flexGrow: 1, }}>
                            <ComplaintRegistrMast  verficationPending = {verficationPending} count={count} setCount={setCount}/>
                        </Box>
                    </TabPanel>
                    <TabPanel value={1} sx={{ p: 0, flexGrow: 1, }}>
                        <Box sx={{ flexGrow: 1, }}>
                            <ResolvedTickets />
                        </Box>
                    </TabPanel>                   
                </Tabs>
                <Box>                    
                </Box>
            </CssVarsProvider>
        </Paper>


    )
}

export default memo(TicketRegisterMain)