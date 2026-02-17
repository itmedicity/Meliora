import { Typography } from '@mui/joy';
import React, { memo } from 'react'

const DietTextComponent = ({
    size = 16,
    weight = 500,
    value,
    fam = 'Bahnschrift',
    color = 'black'
}) => {
    return (
        <Typography
            sx={{
                fontSize: size,
                fontWeight: weight,
                color: color,
                fontFamily: fam,
                whiteSpace: 'nowrap',
                // textAlign: 'center'
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}
        >
            {value}
        </Typography>
    )
}

export default memo(DietTextComponent);