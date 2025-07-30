import { Typography } from '@mui/material'
import React, { memo } from 'react'

const IncidentTextComponent = ({ text, color, size, weight }) => {
    return (
        <Typography sx={{
            color: color ? color : 'black',
            fontSize: size ? size : 14,
            fontWeight: weight ? weight : 600,
            fontFamily: 'var(--roboto-font)'
        }}>{text}</Typography>
    )
}

export default memo(IncidentTextComponent);