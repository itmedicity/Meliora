import React, { memo } from 'react'
import { Box } from '@mui/joy'

const OtherSubTask = ({ otherempTask }) => {
  return (
    <Box>
      {otherempTask.length !== 0 ? (
        <Box
          sx={{
            borderBottom: 1,
            borderLeft: 1,
            borderRight: 1,
            border: 1,
            borderRadius: 1,
            borderColor: '#B7CFDC',
            height: 30,
            pl: 2,
            mx: 1,
            bgcolor: '#D9E4EC',
            overflow: 'auto',
            display: 'flex',
          }}
        >
          <Box sx={{ flex: 15, fontWeight: 600 }}>Other Subtasks Under this Task</Box>
          <Box
            sx={{
              flex: 1,
              fontWeight: 600,
            }}
          >
            ({otherempTask.length})
          </Box>
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  )
}

export default memo(OtherSubTask)
