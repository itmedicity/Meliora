import React, { memo } from 'react'
import { Box, Typography } from '@mui/joy'
import KingBedOutlinedIcon from '@mui/icons-material/KingBedOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

const DietMasterHeader = ({ onClose, name }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1,
                bgcolor: '#701591ab',
                alignItems: 'center',
                p: 1
            }}
        >
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <KingBedOutlinedIcon sx={{color:'white'}}/>
                <Typography fontWeight={600} sx={{ color: 'white' }}>
                    {name}
                </Typography>
            </Box>

            <CloseOutlinedIcon
                onClick={onClose}
                sx={{ color: 'white', cursor: 'pointer' }}
            />
        </Box>
    )
}

export default memo(DietMasterHeader);
