import React from 'react'
import { Box } from '@mui/joy'
import { useSelector } from 'react-redux'
import CondemInchargeApproval from '../CondemnationApprovalMenu/InchargeCondemnationMenu/CondemInchargeApproval'


const ApprovalPending = ({ empdept, empId }) => {



    return (
        <Box>
            <CondemInchargeApproval empdept={empdept} empId={empId} />
        </Box>
    )
}

export default ApprovalPending