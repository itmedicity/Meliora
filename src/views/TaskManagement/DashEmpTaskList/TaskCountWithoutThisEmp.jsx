import React, { memo } from 'react'
import { Box } from '@mui/joy'

const TaskCountWithoutThisEmp = ({ otherempTask }) => {
    return (
        <Box sx={{
            bgcolor: '#DAE3E6', height: 30, mx: .3, display: 'flex', mr: .8,
            borderTop: 1, borderRight: 1, borderLeft: 1, borderTopRightRadius: 2, borderTopLeftRadius: 2,
            borderColor: '#ADC9C5',
        }}>
            <Box sx={{ flex: 15, fontWeight: 600 }}>
                Other Tasks under this Project
            </Box>
            <Box sx={{
                flex: 1, fontWeight: 600
            }}>
                ({otherempTask.length})
            </Box>
        </Box >
    )
}

export default memo(TaskCountWithoutThisEmp)