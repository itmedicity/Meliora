import { Box } from '@mui/joy'
import React, { memo } from 'react'
import IncidentTextComponent from './IncidentTextComponent'

const CardHeader = ({ icon: Icon, text, size, textsize }) => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1, alignItems: 'center', gap: 1 }}>
            <Icon style={{ color: 'var(--royal-purple-400)', fontSize: size ?? 20 }} />
            <IncidentTextComponent text={text} color={'#403d3dff'} size={textsize ?? 18} weight={600} />
        </Box>
    )
}

export default memo(CardHeader);
