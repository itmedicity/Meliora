
import React, { memo } from 'react';
import { Box } from '@mui/material';
import { inputStyle } from './CommonStyle';

const CommonDateFeilds = ({ fromDate, toDate, onFromDateChange, onToDateChange }) => {
    return (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', }}>
            <input
                type="date"
                value={fromDate}
                onChange={(e) => onFromDateChange(e.target.value)}
                style={inputStyle}
            />
            <input
                type="date"
                value={toDate}
                onChange={(e) => onToDateChange(e.target.value)}
                style={inputStyle}
            />
        </Box>
    );
};

export default memo(CommonDateFeilds);
