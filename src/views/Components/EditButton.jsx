import { IconButton, Tooltip } from '@mui/material'
import React, { memo } from 'react'
import EditOffIcon from '@mui/icons-material/EditOff';

const EditButton = () => {
    return (
        <Tooltip title="Edit" arrow >
            <IconButton
                aria-label="add to favorites"
                disableRipple={true}
                sx={{ color: "#7ac143", paddingY: 0.5, }}
            >
                <EditOffIcon sx={{ fontSize: 25 }} />
            </IconButton>
        </Tooltip>
    )
}

export default memo(EditButton)