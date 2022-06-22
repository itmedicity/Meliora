import { IconButton, Tooltip } from '@mui/material'
import React, { memo } from 'react'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import { iconColor } from 'src/color/Color'

const RefreshButton = () => {
  return (
    <Tooltip title="Refresh" arrow>
      <IconButton
        aria-label="add to favorites"
        disableRipple={true}
        sx={{ color: iconColor, paddingY: 0.5 }}
        size="small"
      >
        <AutorenewIcon sx={{ fontSize: 25, color: iconColor }} />
      </IconButton>
    </Tooltip>
  )
}

export default memo(RefreshButton)
