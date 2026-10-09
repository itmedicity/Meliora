import React, { memo } from 'react'
import { Box } from '@mui/joy'
import { AnimatePresence } from 'framer-motion'
import ClosingTable from './ClosingTable'
import DietTextComponent from '../DietComponent/DietTextComponent'
import { useNavigate } from 'react-router-dom'


const ClosingView = ({
    orders
}) => {
    const navigate = useNavigate()
    return (
        <Box sx={{ mt: 1 }}>

            <DietTextComponent
                size={15}
                value={`Patients (${orders.length})`}
                color="#5a2d82"
            />

            <AnimatePresence>
                <ClosingTable
                    data={orders}
                    onView={(row) =>
                        navigate(`/Home/diet/billing/${row.pt_no}/${row.admission_id}`, {
                            state: 'SETTLED'
                        })
                    }
                />
            </AnimatePresence>
        </Box>
    )
}

export default memo(ClosingView)