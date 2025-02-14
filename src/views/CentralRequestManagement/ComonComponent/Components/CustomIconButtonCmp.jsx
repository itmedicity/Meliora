import React, { memo } from 'react'
import { IconButton } from '@mui/joy';

const CustomIconButtonCmp = ({
    handleChange,
    children
}) => {
    return (
        <IconButton
            sx={{
                px: 2, width: '130px', border: '1px solid #bbdefb',
                fontSize: 13, height: '37px', lineHeight: '1.2',
                color: '#1565c0', bgcolor: 'white', borderRadius: 6,
                '&:hover': {
                    bgcolor: 'white',
                    color: '#43B0F1'
                },
            }}
            onClick={handleChange}
        >
            {children}
        </IconButton>
    )
}
export default memo(CustomIconButtonCmp)