import React, { memo, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/joy'

const DietDetailExpand = ({ children, sx = {}, name, status = false, condition = false }) => {

    const [open, setOpen] = useState(status)

    useEffect(() => {
        setOpen(false)
    }, [condition]);

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
                position: 'relative',
                overflowY: 'auto',
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE & Edge
                '&::-webkit-scrollbar': {
                    display: 'none' // Chrome, Safari
                },
                ...((condition && open) ? { height: "80%" } : {}),
                ...sx
            }}
        >
            {/* HEADER */}
            <Box
                onClick={!condition ? undefined : () => setOpen(p => !p)}
                sx={{
                    height: 30,
                    display: 'flex',
                    alignItems: 'center',
                    px: 1,
                    fontSize: 12,
                    fontWeight: 600,
                    boxShadow: 'md',
                    bgcolor: '#fff',
                    position: 'sticky',
                    top: 0,
                    zIndex: 999
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
