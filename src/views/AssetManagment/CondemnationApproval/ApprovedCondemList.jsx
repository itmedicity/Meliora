import React from 'react'
import CondemListForInchrge from '../CondemnationApprovalMenu/InchargeCondemnationMenu/CondemListForInchrge'



const ApprovedCondemList = ({ empdept, empId }) => {
    return (
        <CondemListForInchrge empdept={empdept} empId={empId} />
    )
}

export default ApprovedCondemList