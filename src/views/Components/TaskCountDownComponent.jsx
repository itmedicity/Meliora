

import React, { memo } from 'react';
import { Box, Typography } from '@mui/joy';
import useCountdown from '../TaskManagement/CountDown/useCountdown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const TaskCountDownComponent = ({ DueDates }) => {
    const now = new Date();
    const dueDate = new Date(DueDates);
    const difference = dueDate - now;
    const overdue = now - dueDate;

    const { days, hours, minutes, seconds } = useCountdown(difference, overdue);

    // Determine state and color/icon
    const isOverdue = difference < 0;
    const isDueNow = difference <= 0 && overdue <= 0;

    let icon = <AccessTimeIcon sx={{ color: '#BA0F30', fontWeight: 800 }} />;
    let color = '#05445E';

    if (isDueNow) {
        icon = <AccessTimeIcon sx={{ color: '#BA0F30', fontWeight: 800 }} />;
        color = '#05445E';
    } else if (isOverdue) {
        icon = <ErrorOutlineIcon sx={{ color: '#BA0F30', fontWeight: 800 }} />;
        color = '#BA0F30';
    } else {
        icon = <AccessTimeIcon sx={{ color: '#437081', fontWeight: 800 }} />;
        color = '#05445E';
    }

    return (
        <Box sx={{ display: 'flex', gap: 0.5, width: 150, justifyContent: 'flex-end' }}>
            {icon}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                <Typography level="body2" fontWeight="lg" sx={{ color }}>
                    {days}
                </Typography>
                <Typography level="body2" sx={{ color, pr: .5 }}>
                    Days
                </Typography>
                <Typography level="body2" fontWeight="lg" sx={{ color }}>
                    {hours.toString().padStart(2, '0')}
                </Typography>
                <Typography level="body2" fontWeight="lg">
                    :
                </Typography>
                <Typography level="body2" fontWeight="lg" sx={{ color }}>
                    {minutes.toString().padStart(2, '0')}
                </Typography>
                <Typography level="body2" fontWeight="lg">
                    :
                </Typography>
                <Typography level="body2" fontWeight="lg" sx={{ color }}>
                    {seconds.toString().padStart(2, '0')}
                </Typography>
            </Box>
        </Box>
    );
};

export default memo(TaskCountDownComponent);

