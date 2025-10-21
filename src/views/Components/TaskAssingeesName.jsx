import React, { useState } from 'react';
import { Box, Chip } from '@mui/joy';
import { taskColor } from 'src/color/Color';

const TaskAssigneesName = ({ empNames }) => {
    const [showAll, setShowAll] = useState(false);

    if (!empNames) return null;

    const toTitleCase = (str) => {
        return str
            .split(' ')
            .filter(w => w)
            .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const names = empNames
        .split(',')
        .map(n => n.trim())
        .filter(n => n)
        .map(toTitleCase);

    if (names.length === 0) return null;

    const maxToShow = 2;
    const extraCount = names.length - maxToShow;

    // Determine which names to display
    const displayedNames = showAll ? names : names.slice(0, maxToShow);

    return (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', pr: .5 }}>
            {displayedNames.map((name, idx) => (
                <Chip key={idx} size="sm" sx={{ backgroundColor: '#F8F8F8' }} >
                    {name}
                </Chip>
            ))}

            {!showAll && extraCount > 0 && (
                <Chip
                    size="sm"
                    color="neutral"
                    variant="soft"
                    sx={{ cursor: 'pointer', backgroundColor: '#F8F8F8', color: taskColor.darkPurple }}
                    onClick={() => setShowAll(true)}

                >
                    +{extraCount}
                </Chip>
            )}
        </Box>
    );
};

export default TaskAssigneesName;



