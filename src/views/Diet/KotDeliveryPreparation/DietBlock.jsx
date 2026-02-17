import React from 'react'
import BedChip from './BedChip';
import { Box } from '@mui/joy'
import DietTextComponent from '../DietComponent/DietTextComponent'
import { motion } from 'framer-motion'
const DietBlock = ({ dietName, beds, dietObj, dispatch }) => {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Box sx={{ mt: 2, borderRadius: 10, border: '1px solid #e9d7ff' }}>
                <Box sx={{ px: 2, py: 1, bgcolor: '#f4eaff' }}>
                    <DietTextComponent size={14} value={dietName} color="#7b2cbf" />
                </Box>

                <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {beds.map((bed, index) => (
                        <BedChip
                            key={bed.fb_bdc_no}
                            bed={bed}
                            dietObj={dietObj}
                            index={index}
                            dispatch={dispatch}
                        />
                    ))}
                </Box>
            </Box>
        </motion.div>
    )
}

export default DietBlock;


