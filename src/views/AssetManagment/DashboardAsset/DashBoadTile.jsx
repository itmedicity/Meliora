import { Avatar, Box, Divider, Typography } from '@mui/joy'
import React, { memo } from 'react'

const DashBoadTile = ({ imageUrl, Name, totalCount, icon }) => {
    return (
        <Box sx={{
            display: 'flex',
            border: 1,
            borderColor: '#e0e0e0',
            flex: 1,
            flexDirection: 'column',
            height: 100,
            borderRadius: 12,
            p: 0.5,
            alignItems: 'center',
            boxShadow: 2,
            background: 'linear-gradient(90deg, #6A6E72, #8A8E92, #B0B3B6)',
            transition: '0.3s',
            cursor: 'pointer',
            '&:hover': {
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                borderColor: '#b0bec5'
            },
            overflow: 'hidden'
        }}>
            <Box
                sx={{ display: 'flex', width: `calc(100% - 5px)`, height: 65, justifyContent: 'space-between' }}            >
                <Box sx={{ width: `calc(100% - 5px)`, flexDirection: 'column', display: 'flex', pl: 1, justifyContent: 'space-evenly', transition: 'all 0.5s ease' }}>
                    <Typography
                        sx={{
                            fontSize: '0.875rem',
                            lineHeight: 1.5,
                            textTransform: 'capitalize',
                            fontWeight: 400,
                            opacity: 0.6,
                            color: 'black',
                            transition: 'all 0.5s ease'
                        }}
                    ></Typography>
                    <Typography
                        sx={{
                            letterSpacing: '-.05rem',
                            fontWeight: 700,
                            color: 'white',
                            lineHeight: 1.375,
                            transition: 'all 0.5s ease'
                        }}
                        level='title-lg'
                    >
                        {totalCount}
                    </Typography>

                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: 1, }} >
                    <Avatar size='lg'
                        src={imageUrl}
                        alt='pics' sx={{ bgcolor: 'white', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)' }}

                    >
                        {icon}
                    </Avatar>
                </Box>
            </Box>
            <Divider sx={{ backgroundColor: '#4F5255', height: 2 }} />
            <Box sx={{ display: 'flex', width: `calc(100% - 5px)`, alignItems: 'center', height: 35, pl: 1 }}>
                <Typography
                    level='title-sm'
                    sx={{
                        color: 'white',
                        opacity: 0.8,
                        transition: 'all 0.5s ease'
                    }}
                    fontFamily={'inherit'}
                    fontWeight={600}
                    fontSize={'.875rem'}
                    lineHeight={1.5}
                >{Name}</Typography>
            </Box>
        </Box>
    )
}

export default memo(DashBoadTile)