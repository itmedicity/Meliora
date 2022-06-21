import { IconButton, Tooltip } from '@mui/material'
import React, { memo } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';

const CancelButton = () => {
    return (
        <Tooltip title="Cancel" arrow >
            <IconButton
                aria-label="share"
                disableRipple={true}
                sx={{ color: "#7ac143", paddingY: 0.5, }}
            >
                <CancelIcon sx={{ fontSize: 25 }} />
            </IconButton>
        </Tooltip>
    )
}

export default memo(CancelButton)