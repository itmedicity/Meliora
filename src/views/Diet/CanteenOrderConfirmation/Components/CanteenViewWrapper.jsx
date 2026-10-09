import React from 'react'
import { Box } from '@mui/joy'
import CanteenView from './CanteenView'


const CanteenViewWrapper = ({ 
    orders, 
    setOpenModal,
     setSelectedOrder,
    activeTab,
    setSelectedRows,
    selectedRows


}) => {

    if (!orders.length) {
        return (
            <Box
                sx={{
                    p: 1,
                    borderRadius: 6,
                    bgcolor: '#fff3f3',
                    border: '1px dashed #ffb3b3',
                    fontSize: 13
                }}
            >
                No canteen orders found
            </Box>
        )
    }

    return (
        <CanteenView
            // hasMore={hasMore}
            activeTab={activeTab}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            orders={orders}
            setOpenModal={setOpenModal}
            setSelectedOrder={setSelectedOrder}
        />
    )
}

export default CanteenViewWrapper