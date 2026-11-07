import React, { memo } from 'react'
import { Box } from '@mui/joy'
import PosView from './PosView'

const PosViewWrapper = ({
    orders,
    activeTab,
}) => {

    if (!orders?.length) {
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
                No Patients Found
            </Box>
        )
    }

    return (
        <PosView
            orders={orders}
            activeTab={activeTab}
        />
    )
}

export default memo(PosViewWrapper)