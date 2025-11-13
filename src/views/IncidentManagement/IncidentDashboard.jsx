import { Avatar, Box, Input } from '@mui/joy';
import { Typography } from '@mui/material';
import React, { memo, useCallback, useState } from 'react';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SquareIcon from '@mui/icons-material/Square';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ItemcountPiechart from './Components/ItemcountPiechart';
import TextComponent from '../Components/TextComponent';
import DetailCardIncident from './Components/DetailCardIncident';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import IncidentTextComponent from './Components/IncidentTextComponent';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import SearchIcon from '@mui/icons-material/Search';
import DashBoardAgeGrid from './Components/DashBoardAgeGrid';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router-dom';
import AnimatedActionButton from './Components/AnimatedActionButton';


const IncidentDashboard = () => {

    const [type, setType] = useState("Incident");
    const [searchinput, setSearchInput] = useState("")
    const navigate = useNavigate();



    const pieData = [
        { id: 0, value: 25 },
        { id: 1, value: 10 },
        // { id: 2, value: 30 },
    ];

    //Navigate to the Register Page
    const hanldeNavigateRegisterPage = useCallback(() => {
        navigate('/Home/IncidentReg')
    }, []);

    return (
        <Box sx={{
            width: '100%',
            flex: 1
        }}>
            {/* Dashboard Header */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
                <DashboardTwoToneIcon sx={{ color: 'var(--true-blue-800)', fontSize: 16 }} />
                <IncidentTextComponent text={"DashBoard"} color={'#2f2e2eff'} size={12} weight={300} />
            </Box>


            {/* Create Task */}

            <Box sx={{
                display: 'flex',
                gap: 1,
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <IncidentTextComponent text={"Incident Mangement"} color={'#151414ff'} size={28} weight={400} />
                <AnimatedActionButton
                    title="Register Incident"
                    onClick={hanldeNavigateRegisterPage}
                    icon={AddCircleOutlineIcon}
                />
            </Box>




            {/* Dashboard Cards */}
            <Box sx={{
                width: '100%',
                height: 150,
                bgcolor: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                mt: 1
            }}>

                {/* right side */}
                <Box sx={{
                    width: '35%',
                    bgcolor: 'white',
                    height: '100%',
                    boxShadow: '0 8px 8px 0 rgba(185, 177, 177, 0.2), 0 6px 20px 0 rgba(180, 177, 177, 0.19)',
                    borderRadius: 5
                }}>
                    <Box sx={{ display: 'flex', height: '100%', p: 2 }}>

                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRight: 2,
                            borderColor: 'lightgray',
                            position: 'relative'
                        }}>

                            <ItemcountPiechart data={pieData} />
                            <Typography sx={{
                                fontSize: 24,
                                fontWeight: 600,
                                color: '#343a40',
                                ml: 1,
                                fontFamily: 'var(--roboto-font)',
                                mb: 2
                            }}>45%</Typography>
                            <Typography sx={{
                                fontSize: 12,
                                fontWeight: 600,
                                color: '#343a40',
                                fontFamily: 'var(--roboto-font)',
                                textAlign: 'center',
                                position: "absolute",
                                bottom: 0
                            }}>Resolved</Typography>
                        </Box>


                        <Box sx={{
                            flex: 1,
                            borderRight: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            borderColor: '#dadee3ff',
                            flexDirection: 'column',
                            px: 2
                        }}>
                            <Box sx={{ width: '90%', borderBottom: 2, height: '30%', borderColor: '#dadee3ff', mb: 1 }}>
                                <Typography sx={{ fontSize: 22, fontWeight: 600, color: '#343a40', fontFamily: 'var(--roboto-font)' }}>
                                    Total 512</Typography>
                            </Box>
                            <Box sx={{ width: '90%', height: '30%', display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar size="sm" variant='soft' color='neutral'><AutorenewIcon color='primary' sx={{ fontSize: 25 }} /></Avatar>
                                <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#343a40', fontFamily: 'var(--roboto-font)' }}>160 </Typography>
                                <Typography sx={{ fontSize: 14, fontWeight: 800, color: '#343a40', fontFamily: 'var(--roboto-font)' }}>Active</Typography>
                            </Box>
                            <Box sx={{ width: '90%', height: '30%', display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar size="sm" variant='soft' color='success'><CheckCircleOutlineIcon sx={{ fontSize: 25 }} /></Avatar>
                                <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#343a40', fontFamily: 'var(--roboto-font)' }}>214 </Typography>
                                <Typography sx={{ fontSize: 14, fontWeight: 800, color: '#343a40', fontFamily: 'var(--roboto-font)' }}>Closed</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Box sx={{
                                width: '10%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0.2,
                                ml: 2
                            }}>

                                <Box sx={{ width: '100%', height: '40%', bgcolor: '#9b4ee8ff' }}></Box>
                                <Box sx={{ width: '100%', height: '10%', bgcolor: '#2a2dd6ff' }}></Box>
                                <Box sx={{ width: '100%', height: '30%', bgcolor: '#0bbeebff' }}></Box>
                                <Box sx={{ width: '100%', height: '10%', bgcolor: '#3be63bff' }}></Box>
                                <Box sx={{ width: '100%', height: '10%', bgcolor: '#3be63bff' }}></Box>
                            </Box>
                            <Box sx={{}}>
                                <Box sx={{ flex: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <SquareIcon sx={{ color: '#9f32f3ff', fontSize: 14 }} />
                                    <TextComponent text={'Incident'} sx={{ fontSize: 15, fontFamily: 'var(--roboto-font)', fontWeight: 400 }} />
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <SquareIcon sx={{ color: '#9A5B13', fontSize: 14 }} />
                                    <TextComponent text={'Open'} sx={{ fontSize: 15, fontFamily: 'var(--roboto-font)', fontWeight: 400 }} />
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <SquareIcon sx={{ color: '#84c579ff', fontSize: 14 }} />
                                    <TextComponent text={'Closed '} sx={{ fontSize: 15, fontFamily: 'var(--roboto-font)', fontWeight: 400 }} />
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <SquareIcon sx={{ color: '#e91b1bff', fontSize: 14 }} />
                                    <TextComponent text={'R.C.A'} sx={{ fontSize: 15, fontFamily: 'var(--roboto-font)', fontWeight: 400 }} />
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <SquareIcon sx={{ color: '#fb10c4ff', fontSize: 14 }} />
                                    <TextComponent text={'Preventive'} sx={{ fontSize: 15, fontFamily: 'var(--roboto-font)', fontWeight: 400 }} />
                                </Box>
                            </Box>
                        </Box>

                    </Box>
                </Box>


                {/* left side */}
                <Box sx={{
                    width: '64%',
                    bgcolor: 'white',
                    height: '100%',
                    boxShadow: '0 2px 4px 0 rgba(185, 177, 177, 0.2), 0 6px 20px 0 rgba(180, 177, 177, 0.19)',
                    borderRadius: 5
                }}>
                    <Box sx={{ display: 'flex', height: '100%', py: 2 }}>
                        <Box sx={{
                            flex: 1,
                            borderRight: 2,
                            borderColor: 'lightgray',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <DetailCardIncident
                                icon={<ErrorOutlineIcon sx={{ fontSize: 35, color: 'blue', fontWeight: 600 }} />}
                                color='primary'
                                Maintext={"New Incident"}
                                count={"100"}
                                yesterday={'+19'}
                                pending={"from yesterday"}
                            />
                        </Box>
                        <Box sx={{
                            flex: 1,
                            borderRight: 2,
                            borderColor: 'lightgray',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <DetailCardIncident
                                color='warning'
                                icon={<LockOpenIcon sx={{ fontSize: 35, color: 'orange', fontWeight: 600 }} />}
                                Maintext={"Open "}
                                count={"60"}
                                yesterday={'+9'}
                                pending={"from yesterday"}
                            />
                        </Box>
                        <Box sx={{
                            flex: 1,
                            borderRight: 2,
                            borderColor: 'lightgray',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <DetailCardIncident
                                color='success'
                                icon={<CheckCircleOutlineIcon sx={{ fontSize: 35, color: 'green', fontWeight: 600 }} />}
                                Maintext={"Closed "}
                                count={"25"}
                                yesterday={'+28 '}
                                pending={"from yesterday"}
                            />
                        </Box>
                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <DetailCardIncident
                                color='danger'
                                icon={<PublishedWithChangesIcon sx={{ fontSize: 35, color: 'red', fontWeight: 600 }} />}
                                Maintext={"RCA"}
                                count={"36"}
                                yesterday={'+8'}
                                pending={"from yesterday"}
                            />
                        </Box>
                    </Box>

                </Box>
            </Box>


            {/* Filtering Content */}

            <Box sx={{
                width: '100%',
                height: 40,
                mt: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Box sx={{
                    width: '30%',
                    height: '100%',
                    display: 'flex'
                }}>

                    <ToggleButtonGroup
                        sx={{
                            display: 'flex',
                            boxShadow: '0 8px 8px 0 rgba(185, 177, 177, 0.2), 0 6px 20px 0 rgba(180, 177, 177, 0.19)',
                            width: '100%',

                        }}
                        value={type}
                        onChange={(event, newValue) => setType(newValue || "Incident")}
                    >
                        <Button value="Incident" fullWidth sx={{ flex: 1 }}>Incident</Button>
                        <Button value="Open" fullWidth sx={{ flex: 1 }}>Open</Button>
                        <Button value="Closed" fullWidth sx={{ flex: 1 }}>Closed</Button>
                        <Button value="RCA" fullWidth sx={{ flex: 1 }}>RCA</Button>
                    </ToggleButtonGroup>

                </Box>
                <Box sx={{
                    width: '30%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 8px 8px 0 rgba(185, 177, 177, 0.2), 0 6px 20px 0 rgba(180, 177, 177, 0.19)',
                    borderRadius: 5,
                }}>
                    <Box sx={{
                        width: '15%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                        gap: 1,
                        px: 2,
                    }}>
                        <IncidentTextComponent text={"Filter"} color={'#0b61b8ff'} size={16} weight={600} />
                        <SettingsRoundedIcon sx={{ fontSize: 16, color: '#0b61b8ff' }} />
                    </Box>
                    <Box sx={{
                        width: '80%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                        p: 1
                    }}>
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Input
                                onChange={(e) => setSearchInput(e.target.value)}
                                startDecorator={
                                    <Box variant="soft" color="neutral" sx={{ display: 'flex', alignItems: 'center', }}>
                                        <SearchIcon sx={{ fontSize: 18 }} />
                                        <IncidentTextComponent text={"Search Here"} color={'#343537ff'} size={14} weight={400} />
                                    </Box>
                                }
                                sx={{
                                    width: '100%',
                                    padding: 0,
                                    fontFamily: 'var(--roboto-font)',
                                    px: 0.2,
                                    '--Input-focusedThickness': '0px', // removes Joy's blue focus ring
                                    '--Input-focusedHighlight': 'transparent', // prevents any glow
                                    boxShadow: 'none',
                                    // border: 'none',
                                    // outline: 'none',
                                    '&:focus-within': {
                                        boxShadow: 'none',
                                        outline: 'none',
                                        border: 'none',
                                    },
                                    '& input': {
                                        boxShadow: 'none',
                                        // outline: 'none',
                                        // border: 'none',
                                    },
                                    '& input:focus': {
                                        boxShadow: 'none',
                                        outline: 'none',
                                        border: 'none',
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                </Box>


            </Box>

            {/* age grid table component Here */}

            <Box sx={{
                width: '100%',
                minHeight: innerHeight * 55 / 100,
                bgcolor: 'white',
                boxShadow: '0 8px 8px 0 rgba(185, 177, 177, 0.2), 0 6px 20px 0 rgba(180, 177, 177, 0.19)',
                display: 'flex',
                // alignItems: 'center',
                mt: 1,

            }}>
                <DashBoardAgeGrid type={type} keyword={searchinput} />
            </Box>

        </Box>
    )
}

export default memo(IncidentDashboard);