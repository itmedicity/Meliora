import React from 'react'
import { motion } from 'framer-motion'
import { Box } from '@mui/joy'
import DietTextComponent from '../DietComponent/DietTextComponent'
import StationGrid from './StationGrid'

const FloorView = ({ floorViewData, nursingStation, dispatch }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
        >
            {Object.entries(floorViewData).map(([floor, stations]) => (
                <Box key={floor} sx={{ bgcolor: '#fff', borderRadius: 6, p: 1, mb: 1 }}>
                    <DietTextComponent size={13} value={floor} color="#5a2d82" />
                    <StationGrid
                        stations={stations}
                        nursingStation={nursingStation}
                        dispatch={dispatch}
                    />
                </Box>
            ))}
        </motion.div>
    )
}

export default FloorView
