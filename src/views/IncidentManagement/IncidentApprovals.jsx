import React, { memo } from 'react';
import Inciwrapper from '../Components/Inciwrapper';
import IncidentListCard from './Components/IncidentListCard';
import { Box } from '@mui/joy';

const IncidentApprovals = () => {

    return (
        <Box>
            <Inciwrapper
                title="Incharge Approval"
            // onClose={handleClose}
            >
                {[...Array(10)].map((_, idx) => (
                    <IncidentListCard key={idx} isedit={false} level={1} />
                ))}
            </Inciwrapper>
        </Box>
    );
};

export default memo(IncidentApprovals);
