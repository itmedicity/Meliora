import React, { memo } from 'react'
import { editicon } from 'src/color/Color'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton, Tooltip } from '@mui/joy'
const EditButton = ({ onClick }) => {
  return (
    <Tooltip title="Edit" arrow>
      <IconButton
        aria-label="add to favorites"
        // disableRipple={true}
        sx={{ color: editicon, paddingY: 0.5 }}
        size="small"
        onClick={onClick}
      >
        <EditOutlinedIcon size="small" />
      </IconButton>
    </Tooltip>
  )
}

export default memo(EditButton)
