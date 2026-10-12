import { Box } from '@mui/joy'
import React from 'react'
import DietTextComponent from '../DietComponent/DietTextComponent'
import { motion } from 'framer-motion'
import { FILTER_ACTIONS } from '../DietReducer/action/kotPreparationFilter.actions'

const BedChip = ({ bed, dietObj, index, dispatch }) => {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.03 }}
        >
            <Box
                onClick={() => {
                    dispatch({ type: FILTER_ACTIONS.SET_NURSING_BED, payload: bed.fb_bd_code })
                    dispatch({ type: FILTER_ACTIONS.SET_DIET_NAME, payload: dietObj?.diet_slno })
                }}
                sx={{
                    px: 1.5,
                    py: 0.8,
                    borderRadius: 20,
                    border: '1px solid',
                    cursor: 'pointer',
                    '&:hover': {
                        borderColor: '#7b2cbf',
                        bgcolor: '#f4eaff'
                    }
                }}
            >
                <DietTextComponent size={12} value={bed.fb_bdc_no} />
            </Box>
        </motion.div>
    )
}

export default BedChip