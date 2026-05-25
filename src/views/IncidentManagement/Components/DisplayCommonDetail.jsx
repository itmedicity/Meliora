import React from 'react'
import IncidentTextComponent from './IncidentTextComponent'
import { Box } from '@mui/joy';

const DisplayCommonDetail = ({ CommonDetail }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <IncidentTextComponent
                text={CommonDetail || 'Not available'}
                color={'#343434'}
                size={16}
                weight={400}
            />
        </Box >
    )
}

export default DisplayCommonDetail