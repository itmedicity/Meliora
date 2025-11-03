// components/SectionHeader.jsx
import React, { memo } from 'react';
import { Box } from '@mui/joy';
import { TiArrowForwardOutline } from 'react-icons/ti';
import IncidentTextComponent from './IncidentTextComponent';

const SectionHeader = ({ text, iconSize = 15, fontSize = 10, fontWeight = 600, color = 'grey', mb = 0.4 }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb }}>
            <TiArrowForwardOutline style={{ color: 'var(--rose-pink-400)', fontSize: iconSize }} />
            <IncidentTextComponent text={text} size={fontSize} weight={fontWeight} color={color} />
        </Box>
    );
};

export default memo(SectionHeader);
