import React from 'react'
import { motion } from 'framer-motion'
import { Box } from '@mui/joy';
import DietTextComponent from '../DietComponent/DietTextComponent';
import DietBedsGrid from './DietBedsGrid';
import PatientsViewWrapper from './PatientsViewWrapper';

const BedsView = ({ selectedStation, dietName, bedsByDiet, DietName, patientsByDiet, dispatch }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
        >
            <Box sx={{ bgcolor: '#fff', borderRadius: 6, p: 1 }}>
                {!dietName && (
                    <>
                        <DietTextComponent size={14} value={selectedStation?.fb_ns_name} color="#5a2d82" />
                        <DietBedsGrid
                            bedsByDiet={bedsByDiet}
                            DietName={DietName}
                            dispatch={dispatch}
                        />
                    </>
                )}

                {!!dietName && (
                    <PatientsViewWrapper patientsByDiet={patientsByDiet} />
                )}

            </Box>
        </motion.div>
    )
}

export default BedsView;


