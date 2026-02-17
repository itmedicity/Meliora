import React, { memo, useState } from 'react'
import { Box, Typography } from '@mui/joy'

const DietDetailExpand = ({ children, sx = {}, name, status = false }) => {
    const [open, setOpen] = useState(status)

    return (
        <Box

            sx={{
                width: '100%',
                border: '1px solid #9393938c',
                borderRadius: 5,
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'border-color 0.2s ease',
                mb: 1,
                ...sx
            }}
        >
            {/* HEADER */}
            <Box
                onClick={() => setOpen(p => !p)}
                sx={{
                    height: 30,
                    display: 'flex',
                    alignItems: 'center',
                    px: 1,
                    fontSize: 12,
                    fontWeight: 600,
                    boxShadow: 'md',
                    bgcolor: '#fff'
                }}
            >
                <Typography fontSize={12}>
                    {name}
                </Typography>
            </Box>

            {/* EXPANDABLE CONTENT */}
            <Box
                sx={{
                    maxHeight: open ? '2000px' : 0,
                    transition: 'max-height 0.4s ease, opacity 0.4s ease',
                    overflow: 'hidden',

                }}
            >
                {children}
            </Box>
        </Box>
    )
}

export default memo(DietDetailExpand)
