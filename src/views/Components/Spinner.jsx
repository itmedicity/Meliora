import { Box, CircularProgress, Container } from '@mui/material'
import React from 'react'

const Spinner = () => {
    return (
        <CircularProgress
            sx={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                marginTop: 30
            }}
        />
    )
}

export default Spinner