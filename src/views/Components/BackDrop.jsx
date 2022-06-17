import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

const BackDrop = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        // onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default BackDrop