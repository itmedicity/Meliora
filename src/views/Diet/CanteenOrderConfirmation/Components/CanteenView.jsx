import React from 'react'
import { Box } from '@mui/joy'
import { AnimatePresence } from 'framer-motion'

import DietTextComponent from '../../DietComponent/DietTextComponent'
import CanteenTable from './CanteenTable'

const CanteenView = ({ orders, setOpenModal, setSelectedOrder,
    setSelectedRows,
    selectedRows,
    activeTab,
    // loading
}) => {

    return (
        <Box sx={{ mt: 1 }}>
            <DietTextComponent
                size={15}
                value={`Orders (${orders.length})`}
                color="#5a2d82"
            />
            <AnimatePresence>
                <CanteenTable
                    // hasMore={hasMore}
                    // loading={loading}
                    activeTab={activeTab}
                    data={orders}
                    setSelectedRows={setSelectedRows}
                    selectedRows={selectedRows}
                    onView={(row) => {
                        setSelectedOrder(row)
                        setOpenModal("order")
                    }}
                    onCancel={(row) => {
                        setSelectedOrder(row)
                        setOpenModal("cancel")
                    }}
                />
            </AnimatePresence>
        </Box>
    )
}

export default CanteenView