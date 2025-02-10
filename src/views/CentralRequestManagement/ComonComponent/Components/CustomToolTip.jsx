import { Box, CssVarsProvider, Tooltip } from '@mui/joy'
import React, { memo } from 'react'

const CustomToolTip = ({
    title, placement, children
}) => {
    return (
        <CssVarsProvider>
            <Tooltip
                key="unique-key"
                placement={placement}
                title={
                    <Box sx={{ bgcolor: 'white', color: '#003060', p: 0.5, px: 0.5, textAlign: 'center', }}
                    >{title} </Box>
                }
                arrow
                sx={{
                    bgcolor: '#BFD7ED',
                    [`& .MuiTooltip-arrow`]: {
                        color: 'blue',
                    },
                }}
            >
                {children}
            </Tooltip>
        </CssVarsProvider>
    )
}

export default memo(CustomToolTip)
