import { Box, Paper, Stepper, Step } from '@mui/material'
import React, { memo } from 'react'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Settings from '@mui/icons-material/Settings';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


const ApprovalDetailComp = ({ val }) => {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xl'));

    const { incharge_req, incharge, hod_req, hod, dms_req,
        dms, ms_approve_req, ms, om, smo, gm, md, ed } = val

    const approveComp = (val) => {
        return val === 0 ? <Tooltip title="Approved" arrow color="success" size="sm" variant="solid" placement="top"><ThumbUpAltOutlinedIcon sx={{ color: 'green' }} /></Tooltip>
            : val === 1 ? <Tooltip title="Not Approved" arrow color="danger" size="sm" variant="solid" placement="top"><ThumbDownOffAltOutlinedIcon sx={{ color: 'red' }} /></Tooltip>
                : val === 2 ? <Tooltip title="On Hold" arrow color='warning' size="sm" variant="solid" placement="top"><BackHandOutlinedIcon sx={{ color: '#fd7e14' }} /></Tooltip>
                    : <Tooltip title="Pending" arrow color="neutral" size="sm" variant="solid" placement="top"><PauseCircleOutlineOutlinedIcon sx={{ color: '#241915' }} /></Tooltip>
    }

    console.log(matches)

    const array = [
        // { name: "Incharge", app_status: 1, disable: 1 },
        { name: "HOD", app_status: 2, disable: 1 },
        { name: "DMS", app_status: 3, disable: 1 },
        { name: "MS", app_status: 0, disable: 1 },
        { name: "MO", app_status: 1, disable: 0 },
        { name: "SMO", app_status: 2, disable: 0 },
        { name: "GM", app_status: 3, disable: 0 },
        { name: "ED", app_status: 0, disable: 0 },
        { name: "MD", app_status: 1, disable: 0 },
    ]


    const array_purchase = [
        { name: "CRF Acknowledge", app_status: 1, disable: 1 },
        { name: "", app_status: 2, disable: 1 },
        { name: "HOD", app_status: 2, disable: 1 },
        { name: "DMS", app_status: 3, disable: 1 },
        { name: "MS", app_status: 0, disable: 1 },
        { name: "MO", app_status: 1, disable: 0 },
        { name: "SMO", app_status: 2, disable: 0 },
        { name: "GM", app_status: 3, disable: 0 },
        { name: "ED", app_status: 0, disable: 0 },
        { name: "MD", app_status: 1, disable: 0 },
    ]

    return (
        <Box sx={{ pb: 2 }}>
            <CssVarsProvider>
                {/* CRF FLOW START */}
                <ButtonGroup
                    buttonFlex={1}
                    aria-label="outlined primary button group"
                    color='success'
                    disabled={false}
                    orientation="horizontal"
                    size="sm"
                    spacing={0}
                    variant='soft'
                    sx={{
                        p: 0.5,
                        width: '100%',
                        maxWidth: '100%',
                        overflow: 'auto',
                        color: 'ActiveCaption',
                    }}
                >
                    {
                        array?.map((e) => {
                            return <>
                                <Button
                                    disabled={e.disable === 0 ? true : false}
                                    startDecorator={
                                        <Box color='#39302c' >
                                            {e.name}
                                            <ArrowRightOutlinedIcon sx={{ display: matches === true ? 'none' : 'inline-block' }} /></Box>
                                    }
                                    endDecorator={approveComp(e.app_status)}
                                    sx={{ display: 'flex', justifyContent: 'space-evenly', minWidth: '10%' }}>
                                </Button>
                                <IconButton color='neutral' variant='solid' size='sm' ><ArrowForwardIosOutlinedIcon fontSize='small' sx={{ color: '#000000' }} /></IconButton>
                            </>
                        })
                    }

                    {/* data collection */}
                    <Button
                        startDecorator={<Box color='#39302c' >Data Collection<ArrowRightOutlinedIcon sx={{ display: matches === true ? 'none' : 'inline-block' }} /></Box>}
                        endDecorator={approveComp(1)}
                        sx={{ display: 'flex', justifyContent: 'space-evenly', minWidth: '10%' }} >
                    </Button>
                    <IconButton>
                        <AssignmentIndOutlinedIcon sx={{ color: '#000000' }} />
                    </IconButton>
                    {/* data collection */}
                </ButtonGroup>
                {/* CRF FLOW END */}

                {/* CRF PURCHASE FLOW START*/}
                <ButtonGroup
                    buttonFlex={1}
                    aria-label="outlined primary button group"
                    color='success'
                    disabled={false}
                    orientation="horizontal"
                    size="sm"
                    spacing={0}
                    variant='soft'
                    sx={{
                        p: 0.5,
                        width: '100%',
                        maxWidth: '100%',
                        overflow: 'auto',
                        color: 'ActiveCaption'
                        // resize: 'horizontal',
                        // backgroundColor: '#474B4F'
                    }}
                >
                    {
                        array_purchase?.map((e) => {
                            return <>
                                <Button
                                    disabled={e.disable === 0 ? true : false}
                                    startDecorator={
                                        <Box color='#39302c' >
                                            {e.name}
                                            <ArrowRightOutlinedIcon sx={{ display: matches === true ? 'none' : 'inline-block' }} /></Box>
                                    }
                                    endDecorator={approveComp(e.app_status)}
                                    sx={{ display: 'flex', justifyContent: 'space-evenly', minWidth: '15%' }}>
                                </Button>
                                <IconButton color='neutral' variant='solid' ><ArrowForwardIosOutlinedIcon sx={{ color: '#000000' }} /></IconButton>
                            </>
                        })
                    }

                    {/* data collection */}
                    {/* <Button
                        startDecorator={<Box color='#39302c' >Data Collection<ArrowRightOutlinedIcon sx={{ display: matches === true ? 'none' : 'inline-block' }} /></Box>}
                        endDecorator={approveComp(1)}
                        sx={{ display: 'flex', justifyContent: 'space-evenly' }} >
                    </Button>
                    <IconButton>
                        <AssignmentIndOutlinedIcon sx={{ color: '#000000' }} />
                    </IconButton> */}
                    {/* data collection */}

                </ButtonGroup>
                {/* CRF PURCHASE FLOW END*/}

            </CssVarsProvider>
        </Box >

    )
}

export default memo(ApprovalDetailComp)