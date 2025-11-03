import { Box, Radio, RadioGroup } from '@mui/joy'
import React, { useState } from 'react'
import LevelApprovedCondemn from './LevelApprovedCondemn';
import AllLevelApproved from './AllLevelApproved';
import RejectedLevel from './RejectedLevel';

const SubmittedByLevels = ({ empid, filteredCurrentLevelApproved, pendingApprovalsLoading, level_no, EmployeeCondemnApprovalLevelData, checkActiveLevel }) => {

    const [selectedRValue, setSelectedRValue] = useState("1");
    const handleInchChange = (event) => {
        setSelectedRValue(event.target.value);
    };

    return (
        <Box>
            <RadioGroup
                name="radio-buttons-group"
                value={selectedRValue}
                onChange={handleInchChange}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 2, justifyContent: "center", mt: 2.5, mb: 2 }}>
                    <Radio value="1" label="Pendings" color="neutral" />
                    <Radio value="2" label="All Approved" color="neutral" />
                    <Radio value="3" label="Rejected" color="neutral" />
                </Box>
            </RadioGroup>
            {selectedRValue === "1" ?
                <Box>
                    <LevelApprovedCondemn empid={empid} filteredCurrentLevelApproved={filteredCurrentLevelApproved} pendingApprovalsLoading={pendingApprovalsLoading}
                        level_no={level_no} EmployeeCondemnApprovalLevelData={EmployeeCondemnApprovalLevelData} checkActiveLevel={checkActiveLevel} />
                </Box>
                :
                selectedRValue === "2" ?
                    <Box>
                        <AllLevelApproved />
                    </Box>
                    :
                    <Box>
                        <RejectedLevel />
                    </Box>}
        </Box>
    )
}

export default SubmittedByLevels