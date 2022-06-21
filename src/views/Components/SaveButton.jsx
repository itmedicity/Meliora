import { IconButton, Tooltip } from '@mui/material'
import React, { memo } from 'react'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

const SaveButton = () => {
    return (
        <Tooltip title="Save" arrow >
            <IconButton
                aria-label="add to favorites"
                disableRipple={true}
                sx={{ color: "#7ac143", paddingY: 0.5, }}
            >
                <LibraryAddIcon sx={{ fontSize: 25 }} />
            </IconButton>
        </Tooltip>
    )
}

export default memo(SaveButton)