import { Avatar, Box } from '@mui/joy';

import React, { memo } from 'react'
import IncidentTextComponent from './IncidentTextComponent';

const DetailCardIncident = ({ Maintext, count, pending, icon, color, yesterday }) => {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
            <Box sx={{ width: '30%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Avatar color={color} size='lg'>{icon}</Avatar>
            </Box>
            <Box sx={{ width: '70%', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <IncidentTextComponent text={Maintext} color={'grey'} size={20} weight={400} />
                <IncidentTextComponent text={count} color={'#343a40'} size={27} weight={800} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <IncidentTextComponent text={yesterday} color={'#09921bff'} size={15} weight={400} />
                    <IncidentTextComponent text={pending} color={'#343a40'} size={15} weight={200} />
                </Box>

            </Box>
        </Box>
    )
}

export default memo(DetailCardIncident)