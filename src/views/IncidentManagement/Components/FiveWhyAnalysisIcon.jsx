import React, { memo } from 'react';
import { Box, Tooltip } from '@mui/joy';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Example icon
import IncidentTextComponent from './IncidentTextComponent';

const FiveWhyAnalysisIcon = ({ onClick }) => {
    return (
        <Box
            tabIndex={0}
            onClick={onClick}
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                py: 0.5,
                px: 1,
                backgroundColor: 'var(--rose-pink-300)',
                color: 'primary.solidColor',
                borderRadius: 'md',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                // '&:hover': {
                //     backgroundColor: 'primary.solidHoverBg',
                // },
                '&:focus': {
                    outline: '2px solid',
                },
                userSelect: 'none',
            }}
        >
            <Tooltip title="Five Why Analysis Previews" size='sm'>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <IncidentTextComponent text={`5`} size={14} weight={600} color={"white"} />
                    <HelpOutlineIcon sx={{
                        fontSize: 18,
                        fontWeight: 800
                    }} />
                </span>
            </Tooltip>

        </Box>
    );
};

export default memo(FiveWhyAnalysisIcon);
