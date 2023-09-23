import { Box } from '@mui/joy'
import { Paper } from '@mui/material';
import React, { memo } from 'react'
import { innerHeight } from 'src/views/Constant/Constant';
import DashBordTile from '../Components/DashBordTile';

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
            borderColor: '#e0dedc'
        }} >
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: 1,
                    backgroundColor: '#e0dedc',
                    // overflow: 'hidden'
                    // border: 1
                }}
                gap={1}
            >
                <DashBordTile />
                <DashBordTile />
                <DashBordTile />
                <DashBordTile />
                <DashBordTile />
                <DashBordTile />
            </Box>
        </Box>
    )
}

export default memo(TaskHomePage) 