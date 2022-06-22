import { IconButton, Tooltip } from '@mui/material'
import React, { memo } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import { iconColor } from 'src/color/Color'

const CancelButton = () => {
  return (
    <Tooltip title="Cancel" arrow>
      <IconButton aria-label="share" size="small" sx={{ color: iconColor }}>
        <CancelIcon sx={{ fontSize: 25, color: iconColor, padding: 0 }} />
      </IconButton>
    </Tooltip>
  )
}

export default memo(CancelButton)
