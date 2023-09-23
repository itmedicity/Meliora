import { Box } from '@mui/joy'
import { Paper } from '@mui/material';
import React, { memo } from 'react'
import { innerHeight } from 'src/views/Constant/Constant';
import DashBordTile from '../Components/DashBordTile';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

const TaskHomePage = () => {

    return (
        <Box sx={{
            display: 'flex',
            minHeight: `${innerHeight - 80}px`,
            borderRadius: 2,
            overflow: 'hidden',
            flexDirection: 'column',
            border: 1,
            borderWidth: 1.5,
            borderColor: '#6D6E6F'
        }} >
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: '#6D6E6F',
                    maxHeight: 40,
                    alignItems: 'center',
                    pl: 2
                }}
            >
                <DashboardOutlinedIcon fontSize='medium' sx={{ color: 'white' }} />
                <Box sx={{ pl: 1, color: 'white', display: 'flex', pt: 0.3 }} >My Dashboard</Box>
            </Box>
            <Box sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                flexWrap: 'wrap',
                padding: 1,
                // backgroundColor: '#e0dedc',
                overflow: 'hidden'
                // border: 1
            }} >
                <Box
                    sx={{ display: 'flex', paddingX: 5, paddingTop: 2 }}
                    gap={1}
                >
                    <DashBordTile />
                    <DashBordTile />
                    <DashBordTile />
                    <DashBordTile />
                </Box>
            </Box>
        </Box>
    )
}

export default memo(TaskHomePage) 
