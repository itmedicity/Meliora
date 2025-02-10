
import React, { memo } from 'react'
import { IconButton } from '@mui/joy';


const ModalButtomCmp = ({ handleChange, children, loading }) => {
    return (
        <IconButton
            sx={{
                px: 2,
                width: '100px',
                border: '1px solid #bbdefb',
                fontSize: 13,
                height: '35px',
                lineHeight: '1.2',
                color: 'white',
                bgcolor: '#2E8BC0',
                borderRadius: 6,
                '&:hover': {
                    bgcolor: '#68BBE3',
                    color: 'black'
                },
            }}
            disabled={loading}
            onClick={handleChange}
        >
            {children}
        </IconButton>
    );
};
export default memo(ModalButtomCmp)



