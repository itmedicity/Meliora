import React from 'react'
import { Box } from '@mui/joy'
import { AnimatePresence } from 'framer-motion'
import DietTextComponent from '../../DietComponent/DietTextComponent'
import PosTable from './PosTable'
import { useNavigate } from 'react-router-dom'


const PosView = ({
    orders,
    activeTab
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

                <PosTable
                    data={orders}
                    activeTab={activeTab}
                    onView={(row) =>
                        navigate(`/Home/diet/billing/${row.fb_pt_no}/${row.fb_ip_no}`)
                    }
                />

            </AnimatePresence>

        </Box>
    )
}

export default PosView