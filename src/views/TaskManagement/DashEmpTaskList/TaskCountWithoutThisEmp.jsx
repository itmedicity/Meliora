import React, { memo } from 'react'
import { Box } from '@mui/joy'

const TaskCountWithoutThisEmp = ({ otherempTask }) => {
    return (
        <Box>
            {otherempTask.length !== 0 ?
                <Box sx={{
                    bgcolor: '#B1B1B1', height: 30, mx: .3, display: 'flex', mr: .8,
                    borderTop: 1, borderRight: 1, borderLeft: 1, borderTopRightRadius: 2, borderTopLeftRadius: 2,
                    borderColor: '#ADC9C5',
                }}>
                    <Box sx={{ flex: 15, fontWeight: 600, pl: .5 }}>
                        Other Tasks under this Project
                    </Box>
                    <Box sx={{
                        flex: 1, fontWeight: 600
                    }}>
                        ({otherempTask.length})
                    </Box>
                </Box >
                :
                <Box></Box>
            }

        </Box>
    )
}

export default memo(TaskCountWithoutThisEmp)