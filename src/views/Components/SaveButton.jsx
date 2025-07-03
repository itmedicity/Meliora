import { IconButton, Tooltip } from '@mui/material'
import React, { memo } from 'react'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { iconColor } from 'src/color/Color'

const SaveButton = props => {
  return (
    <Tooltip title="Save" arrow>
      <IconButton
        aria-label="add to favorites"
        disableRipple={true}
        sx={{ color: iconColor, paddingY: 0.5 }}
        size="small"
        type="submit"
        className="p-1"
        clickable="true"
        onClick={props.submit}
      >
        <LibraryAddIcon sx={{ fontSize: 25, color: iconColor }} />
      </IconButton>
    </Tooltip>
  )
}

export default memo(SaveButton)
