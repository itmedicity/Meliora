import { Box, Paper, IconButton } from '@mui/material'
import React, { useCallback, memo, useState, useEffect } from 'react'
import { Chip, CssVarsProvider, Typography } from '@mui/joy'
import { axioslogin } from 'src/views/Axios/Axios';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { editicon } from 'src/color/Color'
import VisibilityIcon from '@mui/icons-material/Visibility';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import ReqImageDisModal from './ReqImageDisModal';


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

            <Box sx={{
                width: "100%",
                display: "flex",
                pl: 1, pt: 1,
                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
            }}>
                <CssVarsProvider>
                    <Box sx={{ pr: 1, width: "20%", display: 'flex' }}>
                        <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >Request No</Typography>
                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5 }} >CRF/TMC/{req_slno}</Typography>
                    </Box>
                    <Box sx={{ pl: 4, width: "20%", display: 'flex' }}>
                        <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >Req.Date</Typography>
                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5 }} >{req_date}</Typography>
                    </Box>
                    <Box sx={{ pl: 4, width: "30%", display: 'flex' }}>
                        <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >Department</Typography>
                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >{dept_name}</Typography>
                    </Box>
                    <Box sx={{ pl: 4, width: "30%", display: 'flex' }}>
                        <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >Department Section</Typography>
                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >{req_deptsec}</Typography>
                    </Box>
                </CssVarsProvider>
            </Box >
            {/* 2rnd Row */}
            < Box sx={{
                width: "100%",
                display: "flex",
                pl: 1, pt: 0.5,
                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
            }}>
                <CssVarsProvider>
                    <Box sx={{ pr: 1, width: "20%", display: 'flex' }}>
                        <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >Location</Typography>
                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >{location}</Typography>

                    </Box>
                    <Box sx={{ pl: 4, width: "20%", display: 'flex' }}>
                        <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >Category</Typography>
                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >{category}</Typography>

                    </Box>
                    <Box sx={{ pl: 4, width: "30%", display: 'flex' }}>

                        <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >Emergency</Typography>
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
                    {
                        emergency_flag === 1 ?
                            <Box sx={{ pl: 4, width: "30%", display: 'flex' }}>
                                <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >Emergency Type</Typography>
                                <Typography color='warning' level="body-sm" variant="outlined" sx={{ ml: 1, borderRadius: 10 }} >{emer_type_name}</Typography>

                            </Box> : null
                    }

                </CssVarsProvider>
            </Box >
            {/* 3rd Row */}
            < Box sx={{
                width: "100%",
                display: "flex",
                pl: 1, pt: 0.5,
                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
            }}>
                <CssVarsProvider>
                    <Box sx={{ width: "10%", }}>
                        <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >Actual Requirement</Typography>

                    </Box>
                    <Box sx={{ width: "31%", }}>
                        {actual_requirement !== null ?
                            <Paper sx={{
                                width: '100%', minHeight: 10, maxHeight: 70, p: 0.8,
                                overflow: 'auto', '::-webkit-scrollbar': { display: "none" },
                                backgroundColor: 'rgb(187,188,188)', border: 0.5, borderColor: '#D4D7D7'
                            }} variant='none'>
                                <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} >
                                    {actual_requirement}
                                </Typography>
                            </Paper> : null
                        }

                    </Box>
                    <Box sx={{ pl: 2, width: "11%", }}>
                        <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >Justification for need</Typography>

                    </Box>
                    <Box sx={{ width: "40%", }} >
                        <Paper sx={{
                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                        }} variant='none'>
                            {needed}
                        </Paper>
                    </Box>
                </CssVarsProvider>
            </Box >

            {/* 4th Row */}
            < Box sx={{
                width: "100%",
                display: "flex",
                pl: 1, pt: 0.5, pb: 2,
                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
            }}>

                <Box sx={{ pr: 1, width: "20%", display: 'flex' }}>
                    <CssVarsProvider>
                        <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >Expected Date</Typography>
                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5 }} >{expected_date}</Typography>
                    </CssVarsProvider>
                </Box>

                <Box sx={{ display: "flex", pl: 4, width: "20%", flexDirection: "row" }}>
                    <Box>
                        <CssVarsProvider>
                            <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >Attachment</Typography>
                        </CssVarsProvider>
                    </Box>{
                        image_status === 1 ?
                            <Box sx={{ height: 10, }}>

                                <IconButton onClick={ViewImage}
                                    sx={{ color: editicon, pt: 0 }} >
                                    <CustomeToolTip title="View Image">
                                        <VisibilityIcon size={15} />
                                    </CustomeToolTip>
                                </IconButton>

                                {/* <Button onClick={ViewImage} variant="contained"
                                    size="small" color="primary">View Image</Button> */}
                            </Box> : <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ textTransform: "capitalize" }} >No</Typography>
                    }
                </Box>
                <Box sx={{ pl: 4, width: "30%", display: 'flex' }}>
                    <CssVarsProvider>
                        <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >Department Section</Typography>
                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >{user_deptsection}</Typography>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ pl: 4, width: "30%", display: 'flex' }}>
                    <CssVarsProvider>
                        <Typography level="title-sm" sx={{ color: 'white' }} endDecorator={<KeyboardArrowRightOutlinedIcon sx={{ color: 'white' }} />} >Create User</Typography>
                        <Typography level='body-sm' textColor='#3E3F40' fontWeight={500} sx={{ pt: 0.5, textTransform: "capitalize" }} >{em_name}</Typography>
                    </CssVarsProvider>
                </Box>


            </Box >
        </Box >
    )
}

export default memo(MasterDetailCompnt)