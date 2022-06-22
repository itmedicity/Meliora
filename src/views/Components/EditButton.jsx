import { IconButton, Tooltip } from '@mui/material'
import React, { memo } from 'react'
import EditOffIcon from '@mui/icons-material/EditOff'
import { iconColor } from 'src/color/Color'

const EditButton = () => {
  return (
    <Tooltip title="Edit" arrow>
      <IconButton
        aria-label="add to favorites"
        disableRipple={true}
        sx={{ color: iconColor, paddingY: 0.5 }}
        size="small"
      >
        <EditOffIcon sx={{ fontSize: 25, color: iconColor }} />
      </IconButton>
    </Tooltip>
  )
}

export default memo(EditButton)
