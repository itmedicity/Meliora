import { Box, Button } from '@mui/joy';
import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SwitchDesign = ({ reportSubmitted, setReportSubmitted }) => {


    const handleToggle = () => {
        setReportSubmitted(prev => (prev === 0 ? 1 : 0));
    };
    return (
        <Box>
            {reportSubmitted === 0 ? (
                <Button
                    size="md"
                    variant="soft"
                    color="neutral"
                    endDecorator={<CheckCircleOutlineIcon />}
                    onClick={handleToggle}
                >
                    Submit For Report
                </Button>
            ) : (
                <Button
                    size="md"
                    variant="soft"
                    color="primary"
                    endDecorator={<CheckCircleIcon sx={{ width: 28, height: 28 }} />}
                    onClick={handleToggle}
                >
                    Submitted For Report
                </Button>
            )}
        </Box>
    )
}

export default SwitchDesign