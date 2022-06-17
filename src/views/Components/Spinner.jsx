import { Box, CircularProgress, Container } from '@mui/material'
import React from 'react'

const Spinner = () => {
    return (
        <div
            style={{
                backgroundColor: "#f2f2f2",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <CircularProgress sx={{ color: "#2b2d42", animationDuration: '550ms', }} />
        </div>
    )
}

export default Spinner