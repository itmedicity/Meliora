import React from 'react'
import StationCard from './StationCard';
import { Box } from '@mui/joy';

const StationGrid = ({ stations, nursingStation, dispatch }) => {
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 1, mt: 1 }}>
            {stations.map(station => (
                <StationCard
                    key={station.fb_nurse_stn_slno}
                    station={station}
                    isActive={String(station.fb_ns_code) === String(nursingStation)}
                    dispatch={dispatch}
                />
            ))}
        </Box>
    )
}

export default StationGrid;
