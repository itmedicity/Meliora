import * as React from 'react';
import Box from '@mui/joy/Box';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import { CssVarsProvider, TabPanel } from '@mui/joy';
import CusIconButton from 'src/views/Components/CusIconButton';
import { Paper } from '@mui/material';
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import WheelchairPickupIcon from '@mui/icons-material/WheelchairPickup';
import TeleTable from './TeleCommunication/TeleTable';
import WhatsAppTable from './WhatsAppBusiness/WhatsAppTable';
import SeeMyTable from './SeeMyMachine/SeeMyTable';
import ServiceBillTable from './serviceBills/ServiceBillTable';

const BillAddsMain = () => {

    const [index, setIndex] = React.useState(0);
    return (
        <Paper>
            <Box
                sx={{
                    flexGrow: 1,
                }}
            >
                <Box sx={{ flex: 1, height: 35, borderBottom: 1, borderColor: 'lightgrey', display: 'flex' }}>
                    <Box sx={{ flex: 1, fontWeight: 600, pl: .8, pt: .8, color: '#C7C8CB' }}> Bills & Pays</Box>
                    <Box>
                        <CusIconButton size="sm" variant="outlined" color="primary"  >
                            <CssVarsProvider>
                                {/* <Tooltip title="Close" placement="bottom"> */}
                                {/* < CloseIcon sx={{ cursor: 'pointer', size: 'sm', width: 30, height: 20, color: '#004F76', }}
                            // onClick={backToDash}
                            /> */}
                                {/* </Tooltip> */}
                            </CssVarsProvider>
                        </CusIconButton>
                    </Box>
                </Box>
                <CssVarsProvider>
                    <Tabs
                        // size="lg"
                        aria-label="Bottom Navigation"
                        value={index}
                        onChange={(event, value) => setIndex(value)}
                        sx={(theme) => ({
                            p: 1,
                            mx: 'auto',
                            boxShadow: theme.shadow.sm,
                            // '--joy-shadowChannel': theme.vars.palette[colors[index]].darkChannel,
                            [`& .${tabClasses.root}`]: {
                                py: 1,
                                flex: 1,
                                transition: '0.3s',
                                fontWeight: 'md',
                                fontSize: 'md',
                                [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                                    opacity: 0.7,
                                },
                            },
                        })}
                    >
                        <TabList
                            variant="plain"
                            size="sm"
                            disableUnderline
                            sx={{ p: 0, flex: 1 }}
                        >
                            <Tab
                                disableIndicator
                                orientation="vertical"
                                sx={{
                                    flexGrow: 1,
                                }}
                            >
                                <ListItemDecorator>
                                    <TapAndPlayIcon sx={{ width: 30, height: 30, color: '#738FA7' }}
                                    // onClick={OpenTele}
                                    />
                                </ListItemDecorator>
                                TeleCommunication Bills
                            </Tab>
                            <Tab
                                disableIndicator
                                orientation="vertical"
                                sx={{
                                    flexGrow: 1,
                                }}
                            >
                                <ListItemDecorator>
                                    <WhatsAppIcon sx={{ width: 30, height: 30, color: '#B1D8B7' }}
                                    // onClick={OpenTele}
                                    />
                                </ListItemDecorator>
                                Bussiness Whatsapp Bills
                            </Tab>
                            <Tab
                                disableIndicator
                                orientation="vertical"
                                sx={{
                                    flexGrow: 1,
                                }}
                            >
                                <ListItemDecorator>
                                    <WheelchairPickupIcon sx={{ width: 30, height: 30, color: '#B5A4A3' }}
                                    // onClick={OpenTele}
                                    />
                                </ListItemDecorator>
                                See My Machine
                            </Tab>
                            <Tab
                                disableIndicator
                                orientation="vertical"
                                sx={{
                                    flexGrow: 1,
                                }}
                            >
                                <ListItemDecorator>
                                    <WifiTetheringIcon sx={{ width: 30, height: 30, color: '#B2BABD' }}
                                    // onClick={OpenTele}
                                    />
                                </ListItemDecorator>
                                Service Bills
                            </Tab>
                        </TabList>
                        <TabPanel value={0} sx={{ p: 0 }}>
                            <TeleTable />
                        </TabPanel>
                        <TabPanel value={1} sx={{ p: 0 }}>
                            <WhatsAppTable />
                        </TabPanel>
                        <TabPanel value={2} sx={{ p: 0 }}>
                            <SeeMyTable />
                        </TabPanel>
                        <TabPanel value={3} sx={{ p: 0 }}>
                            <ServiceBillTable />
                        </TabPanel>

                    </Tabs>
                </CssVarsProvider>

            </Box>
        </Paper >

    )
}

export default BillAddsMain