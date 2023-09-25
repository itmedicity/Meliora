import { CssVarsProvider } from '@mui/joy'
import Table from '@mui/joy/Table'
import Box from '@mui/joy/Box'
import React, { memo } from 'react'
import Chip from '@mui/joy/Chip';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import SearchRounded from '@mui/icons-material/SearchRounded';
import { taskColor } from '../Styles/taskColor';
import Avatar from '@mui/joy/Avatar';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LockIcon from '@mui/icons-material/Lock';


const MyTaskTable = () => {
    const [index, setIndex] = React.useState(0);
    return (
        <Box
            sx={{
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'column',
                marginTop: 3,
                padding: 0.8,
                // backgroundColor: 'green',
                border: 1,
                borderColor: taskColor.indigoDark,
                borderRadius: 2,
                height: '100%'
            }}
        >
            <CssVarsProvider>
                <Tabs
                    aria-label="Basic tabs"
                    defaultValue={0}
                    size="sm"
                    sx={{
                        display: 'flex',
                        flexGrow: 1,
                        flexDirection: 'column',
                        bgcolor: 'transparent'
                    }}
                >
                    <TabList
                        disableUnderline
                        sx={{
                            // backgroundColor: 'green'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                // backgroundColor: 'green'
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                width: 75,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingY: 1
                            }} >
                                <Avatar
                                    color="neutral"
                                    size="lg"
                                    variant="outlined"
                                >
                                    <AccountTreeIcon sx={{ fontSize: 23 }} />
                                </Avatar>
                            </Box>
                            <Box>
                                <Box sx={{ display: 'flex' }} >
                                    <Box sx={{ fontWeight: 700, fontSize: 18, fontSmooth: 'always' }} >My Tasks</Box>
                                    <LockIcon />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex'
                                    }}
                                >
                                    <Tab>Upcoming</Tab>
                                    <Tab>Over due (2)</Tab>
                                    <Tab>Completed</Tab>
                                </Box>
                            </Box>
                        </Box>
                    </TabList>
                    <TabPanel value={0} sx={{
                        flex: 1,
                        flexGrow: 1,
                    }} >
                        <b>First</b> tab panel
                    </TabPanel>
                    <TabPanel value={1}>
                        <b>Second</b> tab panel
                    </TabPanel>
                    <TabPanel value={2}>
                        <b>Third</b> tab panel
                    </TabPanel>
                </Tabs>
            </CssVarsProvider>
        </Box >
    )
}

export default memo(MyTaskTable) 