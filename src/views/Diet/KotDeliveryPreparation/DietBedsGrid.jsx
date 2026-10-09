import { Box } from '@mui/joy';
import React from 'react'
import DietBlock from './DietBlock';

const DietBedsGrid = ({ bedsByDiet, DietName, dispatch }) => {
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 1, mt: 1 }}>
            {Object.entries(bedsByDiet).map(([dietName, beds]) =>
                beds.length ? (
                    <DietBlock
                        key={dietName}
                        dietName={dietName}
                        beds={beds}
                        dietObj={DietName.find(d => d.diet_name === dietName)}
                        dispatch={dispatch}
                    />
                ) : null
            )}
        </Box>
    )
}

export default DietBedsGrid;

