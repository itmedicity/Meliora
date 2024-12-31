import { Box, CircularProgress } from '@mui/joy'
import React, { memo } from 'react'

const CustomLoadComp = () => {
    return (
        // <Skeleton animation="wave" variant="text" level="body-sm" sx={{ width: 200 }} />

        <Box sx={{ display: 'flex', flex: 1, zIndex: 1, justifyContent: 'center', alignItems: 'center', pt: 5 }}>
            <CircularProgress
                color="primary" size="md" thickness={3} variant="soft"
            />
        </Box>

    )
}

export default memo(CustomLoadComp)


