import { IconButton, Tooltip } from '@mui/material'
import React, { memo } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import { iconColor } from 'src/color/Color'

const CancelButton = props => {
  return (
    <Tooltip title="Cancel" arrow>
      <IconButton
        aria-label="share"
        size="small"
        sx={{ color: iconColor }}
        className="p-1"
        onClick={props.close}
        clickable="true"
      >
        <CancelIcon sx={{ fontSize: 25, color: iconColor, padding: 0 }} />
      </IconButton>
    </Tooltip>
  )
}

export default memo(CancelButton)
