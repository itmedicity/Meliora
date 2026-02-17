import { Typography, Box } from '@mui/joy'
import React, { memo } from 'react'

const DietInputLabel = ({ name = "label" }) => {
    return (
        <Box sx={{ width: 150, display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                {name}
            </Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                :
            </Typography>
        </Box>
    )
}

export default memo(DietInputLabel);