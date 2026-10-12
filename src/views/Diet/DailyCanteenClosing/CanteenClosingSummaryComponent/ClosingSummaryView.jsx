import React, { memo } from 'react'
import { Box } from '@mui/joy'
import { AnimatePresence } from 'framer-motion'
import ClosingSummaryTable from './ClosingSummaryTable'


const ClosingSummaryView = ({
    orders
}) => {

    return (
        <Box sx={{ mt: 1 }}>
            <AnimatePresence>
                <ClosingSummaryTable data={orders} />
            </AnimatePresence>
        </Box>
    )
}

export default memo(ClosingSummaryView)