import { Box } from '@mui/material'
import React, { memo, } from 'react'
import { Chip, CssVarsProvider, Typography } from '@mui/joy'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CategoryIcon from '@mui/icons-material/Category';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Person3Icon from '@mui/icons-material/Person3';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import BalanceIcon from '@mui/icons-material/Balance';
import { format } from 'date-fns';

const MasterDetailCompnt = ({ val }) => {

    const { req_slno, req_date, req_deptsec, user_deptsection, actual_requirement, needed,
        category, location, expected_date, emergency_flag, em_name, emer_type_name } = val
    const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"

    return (
        <Box sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
        }}>


            <CssVarsProvider>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    pl: 1, pt: 1,
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, flexWrap: 'wrap' }} >
                        <Box sx={{ pr: 1, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <AlignHorizontalLeftIcon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5 }} >CRF/TMC/{req_slno}</Typography>
                            <CalendarMonthIcon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5 }} >{req_date}</Typography>
                        </Box>
                        <Box sx={{ pl: 4, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <ApartmentIcon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                            {/* <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, pr: 0.5, textTransform: "capitalize" }} >{dept_name}</Typography>
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={900} sx={{ pt: 0.5, pr: 0.5, textTransform: "capitalize" }} >/</Typography> */}
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >{req_deptsec}</Typography>
                        </Box>
                        <Box sx={{ pr: 1, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <AddLocationAltIcon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >{location}</Typography>
                        </Box>
                        <Box sx={{ pr: 1, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <CategoryIcon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                            <Typography level='body-sm' textColor='common.white' fontWeight={500} sx={{ pt: 0.5, pr: 0.6, textTransform: "capitalize" }} >CRF category</Typography>
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={900} sx={{ pt: 0.5, pr: 0.5, textTransform: "capitalize" }} >/</Typography>
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >{category}</Typography>
                        </Box>
                        <Box sx={{ pr: 1, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <GppMaybeIcon fontSize='large' sx={{ mx: 0.5, color: 'red' }} />
                            <Typography
                                level="body-lg"
                                endDecorator={
                                    emergency_flag === 1 ?
                                        <Chip component="span" size="sm"
                                            startDecorator={<CheckIcon color='success' sx={{ zIndex: 1, pointerEvents: 'none' }} />}
                                            sx={{
                                                "--Chip-minHeight": "9px",
                                                "--Chip-paddingInline": "10px",
                                                backgroundColor: '#F7D3D3'
                                            }}
                                        >
                                            Yes
                                        </Chip> :
                                        <Chip component="span" size="sm"
                                            startDecorator={<ClearOutlinedIcon sx={{ zIndex: 1, pointerEvents: 'none', color: 'green' }} />}
                                            sx={{
                                                "--Chip-minHeight": "9px",
                                                "--Chip-paddingInline": "10px",

                                                backgroundColor: '#D5F4B1'
                                            }}
                                        >
                                            No
                                        </Chip>
                                }
                                justifyContent="center"
                            >
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <NotificationsActiveIcon fontSize='large' sx={{ mx: 0.5, }} color='primary' />
                            <Typography level='body-sm' textColor='common.white' fontWeight={500} sx={{ pt: 0.5, pr: 0.6, textTransform: "capitalize" }} >Priority Type</Typography>
                            {
                                emergency_flag === 1 ?
                                    <Box sx={{ display: 'flex' }}>
                                        {/* <Typography color='warning' level="body-sm" variant="outlined" sx={{ ml: 1, borderRadius: 10, textTransform: 'capitalize' }} >{emer_type_name?.toLowerCase()}</Typography> */}
                                        <Typography
                                            level="body-lg"
                                            endDecorator={
                                                <Chip component="span" size="sm"
                                                    // startDecorator={<CheckIcon color='success' sx={{ zIndex: 1, pointerEvents: 'none' }} />}
                                                    sx={{
                                                        "--Chip-minHeight": "9px",
                                                        "--Chip-paddingInline": "10px",
                                                        backgroundColor: '#F7D3D3',
                                                    }}
                                                >
                                                    {emer_type_name?.toLowerCase()}
                                                </Chip>
                                            }
                                            justifyContent="center"
                                            sx={{ width: '100%' }}
                                        >
                                        </Typography>
                                    </Box> : null
                            }
                        </Box>

                        <Box sx={{ pr: 1, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <CalendarMonthIcon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, pr: 0.5 }} >CRF Excepted Date</Typography>
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={900} sx={{ pt: 0.5, pr: 0.5, textTransform: "capitalize" }} >/</Typography>
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5 }} >{expdate}</Typography>
                        </Box>

                        <Box sx={{ pr: 1, display: 'flex', alignItems: 'center', }}>
                            <AccountBalanceIcon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                            <Typography level="title-sm" sx={{ color: 'white' }}
                                endDecorator={<Typography level='body-sm' textColor='#3E3F40' fontWeight={900} sx={{ pt: 0.5, pr: 0.5, textTransform: "capitalize" }} >/</Typography>} >
                                Requested department</Typography>
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >{user_deptsection}</Typography>
                        </Box>

                        <Box sx={{ pr: 1, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <Person3Icon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                            <Typography level="title-sm" sx={{ color: 'white' }}
                                endDecorator={<Typography level='body-sm' textColor='#3E3F40' fontWeight={900} sx={{ pt: 0.5, pr: 0.5, textTransform: "capitalize" }} >/</Typography>} >
                                Created User</Typography>
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >{em_name}</Typography>
                        </Box>
                    </Box>
                </Box >

                {/* 3rd Row */}
                < Box sx={{
                    display: "flex",
                    alignItems: 'center',
                    pl: 1, pt: 0.5,
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                }}>
                    <RequestPageIcon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <Typography level="title-sm" sx={{ color: 'white' }}
                            endDecorator={<KeyboardArrowRightOutlinedIcon />} >Requirement</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', }}>
                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >
                            {actual_requirement !== null ? actual_requirement : "Not Given"}</Typography>
                    </Box>
                </Box >
                < Box sx={{
                    display: "flex",
                    alignItems: 'center',
                    pl: 1, pt: 0.5,
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                }}>
                    <BalanceIcon fontSize='medium' sx={{ mx: 0.5 }} color='primary' />
                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <Typography level="title-sm" sx={{ color: 'white' }}
                            endDecorator={<KeyboardArrowRightOutlinedIcon />} >Justification</Typography>
                    </Box>
                    <Box sx={{ width: "40%", display: 'flex', alignItems: 'center', }} >
                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >
                            {needed !== null ? needed : "Not Given"}</Typography>
                    </Box>

                </Box >
            </CssVarsProvider>
        </Box >
    )
}

export default memo(MasterDetailCompnt)