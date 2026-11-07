import React from 'react'
import { Box, Typography } from '@mui/joy'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'

const DietEmptyState = ({
    title = 'No items found',
    description = 'Try changing filters or search keywords',
}) => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                minHeight: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 1,
                color: '#8a8a8a',
            }}>
            <InboxOutlinedIcon sx={{ fontSize: 40, opacity: 0.5 }} />

            <Typography level="title-md">
                {title}
            </Typography>

            <Typography level="body-sm" sx={{ textAlign: 'center' }}>
                {description}
            </Typography>
        </Box>
    )
}

export default DietEmptyState
