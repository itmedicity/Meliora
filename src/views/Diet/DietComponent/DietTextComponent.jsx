import { Typography } from '@mui/joy';
import React, { memo } from 'react'

const DietTextComponent = ({
    size = 16,
    weight = 500,
    value,
    fam = 'Bahnschrift',
    color = 'black',

    //  NEW PROPS
    wrap = false,
    lines = 1,
    sx = {}
}) => {
    return (
        <Typography
            sx={{
                fontSize: size,
                fontWeight: weight,
                color: color,
                fontFamily: fam,

                //  CONDITIONAL BEHAVIOR
                ...(wrap
                    ? {
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        overflowWrap: 'anywhere'
                    }
                    : {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }),

                //  MULTI-LINE ELLIPSIS (optional)
                ...(wrap && lines > 1 && {
                    display: '-webkit-box',
                    WebkitLineClamp: lines,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }),

                ...sx
            }}
        >
            {value}
        </Typography>
    )
}

export default memo(DietTextComponent);