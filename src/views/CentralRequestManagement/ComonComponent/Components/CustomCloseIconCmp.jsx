import { Avatar, Tooltip } from '@mui/joy'
import React, { memo } from 'react'
import CloseIcon from '@mui/icons-material/Close'

const CustomCloseIconCmp = ({ handleChange }) => {
  return (
    <Tooltip title="Close" placement="bottom">
      <Avatar
        size="sm"
        variant="plain"
        sx={{
          bgcolor: '##FBEDE0',
          height: 25,
          width: 25,
          border: '1px solid #FBE7C6',
        }}
      >
        <CloseIcon
          sx={{
            cursor: 'pointer',
            size: 'lg',
            fontSize: 20,
            color: '#FF4500',
            '&:hover': { color: 'red' },
          }}
          onClick={handleChange}
        />
      </Avatar>
    </Tooltip>
  )
}
export default memo(CustomCloseIconCmp)
