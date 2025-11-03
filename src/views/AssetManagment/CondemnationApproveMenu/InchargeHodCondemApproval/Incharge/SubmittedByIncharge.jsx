import { Box, Radio, RadioGroup } from '@mui/joy'
import React, { useState } from 'react'
import InchargeApprovedCondemn from './InchargeApprovedCondemn';
import AllSubmittedIncharge from './AllSubmittedIncharge';
import InchargeRejected from './InchargeRejected';

const SubmittedByIncharge = ({ empdept, empid }) => {

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
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 2, justifyContent: "center", mt: 1.5, mb: 2 }}>
                    <Radio value="1" label="Pendings" color="neutral" />
                    <Radio value="2" label="All Approved" color="neutral" />
                    <Radio value="3" label="Rejected" color="neutral" />
                </Box>
            </RadioGroup>
            {selectedRValue === "1" ?
                <Box>
                    <InchargeApprovedCondemn empdept={empdept} empid={empid} />
                </Box>
                :
                selectedRValue === "2" ?
                    <Box>
                        <AllSubmittedIncharge empdept={empdept} />
                    </Box>
                    :
                    <Box>
                        <InchargeRejected empdept={empdept} />
                    </Box>}
        </Box>
    )
}

export default SubmittedByIncharge