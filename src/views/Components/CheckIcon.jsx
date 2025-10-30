import { IconButton, Tooltip } from '@mui/material'
import React, { memo } from 'react'
import { editicon } from 'src/color/Color'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'

const CheckIcon = props => {
  return (
    <Tooltip title="Process" arrow>
      <IconButton
        aria-label="add to favorites"
        disableRipple={true}
        sx={{ color: editicon, paddingY: 0.5 }}
        size="small"
        className="p-1"
        clickable="true"
        onClick={e => {
          props.submit(e)
        }}
      >
        <CheckCircleOutlinedIcon size="small" />
      </IconButton>
    </Tooltip>
  )
}

export default memo(CheckIcon)
