import { Box, Button, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo } from 'react'
import { taskColor } from '../Styles/taskColor'

const DashBordTile = ({ taskName, count, Icons }) => {
    return (
        <Paper
            sx={{
                width: '25%',
                height: 160,
                backgroundColor: taskColor.bgIndigo,
                border: 1,
                padding: 2,
                borderColor: taskColor.indigoDark,
                cursor: 'grab',
                ":hover": {
                    borderColor: '#7D18EA'
                }
            }}
            variant='outlined'
        >
            <Box
                sx={{
                    display: 'flex',
                    height: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 600,
                    fontSize: 16,
                    fontSmooth: 'auto',
                    color: taskColor.FontindigoDark
                }}
            >{taskName}</Box>
            <Box
                sx={{
                    display: 'flex',
                    height: '50%',
                    fontSize: 48,
                    fontWeight: 500,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: taskColor.FontindigoDark,
                }}
            >
                <Typography
                    sx={{
                        cursor: 'pointer',
                        ":hover": {
                            transition: 300,
                            textShadow: '#939498 1px 0 5px'
                        }
                    }}
                    onClick={() => alert('hai')}
                >{count}</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: taskColor.FontindigoDark
                }}
            >
                {Icons}
            </Box>
        </Paper>
    )
}

export default memo(DashBordTile) 