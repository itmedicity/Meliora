import { CircularProgress } from '@mui/material'
import React, { memo } from 'react'

const BackDrop = () => {
    return (
        <CircularProgress sx={{ color: "#2b2d42", animationDuration: '550ms', }} />
    )
}

export default memo(BackDrop)