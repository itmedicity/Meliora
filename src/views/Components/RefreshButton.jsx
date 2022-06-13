import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import AutorenewIcon from '@mui/icons-material/Autorenew';

const RefreshButton = () => {
    return (
        <Tooltip title="Refresh" arrow >
            <IconButton
                aria-label="add to favorites"
                disableRipple={true}
                sx={{ color: "#7ac143", paddingY: 0.5, }}
            >
                <AutorenewIcon sx={{ fontSize: 25 }} />
            </IconButton>
        </Tooltip>
    )
}

export default RefreshButton