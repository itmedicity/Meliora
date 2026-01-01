import React, { memo } from 'react';
import { Box, Tooltip } from '@mui/joy';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Example icon
// import IncidentTextComponent from './IncidentTextComponent';
import { GiAnglerFish } from "react-icons/gi";


const FishBoneAnalysisIcon = ({ onClick }) => {
    return (
        <Tooltip title="Fish Bone Analysis Previews" size='sm'>
            <Box
                tabIndex={0}
                onClick={onClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: 0.5,
                    px: 1.5,
                    backgroundColor: 'var(--rose-pink-300)',
                    color: 'primary.solidColor',
                    borderRadius: 'md',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                    '&:focus': {
                        outline: '2px solid',
                    },
                    userSelect: 'none',
                }}>

                <GiAnglerFish style={{ fontSize: '20' }} />

            </Box>
        </Tooltip>
    );
};

export default memo(FishBoneAnalysisIcon);
