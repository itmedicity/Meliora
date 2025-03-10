import React from 'react'
import { Box } from '@mui/joy'
import InchargeTab from './InchargeCondemnationMenu/InchargeTab'
import HodTab from './HodCondemnationMenu.jsx/HodTab'

const CondemnationApprovalRights = () => {
    return (
        <Box>
            <InchargeTab />
            <HodTab />
        </Box>
    )
}

export default CondemnationApprovalRights