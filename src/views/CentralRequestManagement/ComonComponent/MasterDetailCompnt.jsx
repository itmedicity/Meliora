import { Box, Paper } from '@mui/material'
import React, { useCallback, memo, useState, useEffect } from 'react'
import { Chip, CssVarsProvider, Divider, IconButton, Typography } from '@mui/joy'
import { axioslogin } from 'src/views/Axios/Axios';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { editicon } from 'src/color/Color'
import VisibilityIcon from '@mui/icons-material/Visibility';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import ReqImageDisModal from './ReqImageDisModal';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CategoryIcon from '@mui/icons-material/Category';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Person3Icon from '@mui/icons-material/Person3';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import BalanceIcon from '@mui/icons-material/Balance';

const MasterDetailCompnt = ({ val }) => {

    const { req_slno, req_date, dept_name, req_deptsec, user_deptsection, actual_requirement, needed,
        category, location, expected_date, emergency_flag, em_name, emer_type_name, image_status,
    } = val

    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [imagearray, setImageArry] = useState([])

    const ViewImage = useCallback(() => {
        setImageShowFlag(1)
        setImageShow(true)
    }, [])

    useEffect(() => {
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                });
                setImageArry(fileUrls);
            }
        }
        if (imageshowFlag === 1) {
            getImage(req_slno)
        }
    }, [imageshowFlag, req_slno])

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])


    return (
        <Box sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
        }}>
            {imageshowFlag === 1 ? <ReqImageDisModal open={imageshow} handleClose={handleClose}
                images={imagearray} /> : null}

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
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, pr: 0.5, textTransform: "capitalize" }} >{dept_name}</Typography>
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={900} sx={{ pt: 0.5, pr: 0.5, textTransform: "capitalize" }} >/</Typography>
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
                                                backgroundColor: '#D5F4B1'
                                            }}
                                        >
                                            Yes
                                        </Chip> :
                                        <Chip component="span" size="sm"
                                            startDecorator={<ClearOutlinedIcon sx={{ zIndex: 1, pointerEvents: 'none', color: 'red' }} />}
                                            sx={{
                                                "--Chip-minHeight": "9px",
                                                "--Chip-paddingInline": "10px",
                                                backgroundColor: '#F7D3D3'
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
                                                        backgroundColor: '#D5F4B1',
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
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5 }} >{expected_date}</Typography>
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

                        {/* <Box sx={{ pr: 1, display: 'flex', alignItems: 'center', flexGrow: 1 }}> */}
                        {
                            // image_status === 1 ?
                            //     <Box sx={{ height: 10, }}>
                            //         <IconButton onClick={ViewImage}
                            //             sx={{ color: 'palegreen', pt: 0 }} >
                            //             <FilePresentIcon fontSize='large' />
                            //         </IconButton>

                            //         {/* <Button onClick={ViewImage} variant="contained"
                            //     size="small" color="primary">View Image</Button> */}
                            //     </Box> : <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ textTransform: "capitalize" }} >No</Typography>
                        }
                        {/* </Box> */}
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
                        <Paper sx={{
                            width: '100%', minHeight: 10, maxHeight: 70, p: 0.8,
                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" },
                            backgroundColor: 'rgb(187,188,188)', border: 0.5, borderColor: '#D4D7D7'
                        }} variant='none'>
                            <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} >
                                {actual_requirement}
                            </Typography>
                        </Paper>
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
                        <Paper sx={{
                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                        }} variant='none'>
                            {needed}
                        </Paper>
                    </Box>

                </Box >
            </CssVarsProvider>
        </Box >
    )
}

export default memo(MasterDetailCompnt)