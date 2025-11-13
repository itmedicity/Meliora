import React, { useMemo } from 'react';
import { Box, Sheet, Typography, Tooltip } from '@mui/joy';

const SACMatrixResult = ({ sacData }) => {
    // --- Parse data safely ---
    let parsedData = {};
    try {
        parsedData =
            typeof sacData === 'string'
                ? JSON.parse(sacData)
                : sacData || {};
    } catch (err) {
        console.error('Invalid SAC data JSON:', err);
        parsedData = {};
    }

    const isEmpty = Object.keys(parsedData).length === 0;

    // --- Define Levels ---
    const likelihoodLevels = ['Frequent', 'Likely', 'Possible', 'Unlikely', 'Rare'];
    const consequenceLevels = ['Negligible', 'Minor', 'Moderate', 'Major', 'Catastrophic'];
    const matrixValues = [
        [3, 3, 2, 1, 1],
        [4, 3, 2, 1, 1],
        [4, 3, 2, 2, 1],
        [4, 4, 3, 2, 1],
        [4, 4, 4, 3, 2],
    ];

    // --- Normalize consequence names (to match headers) ---
    const normalizeConsequence = (consequence) => {
        const map = {
            Insignificant: 'Negligible',
            negligible: 'Negligible',
        };
        return map[consequence] || consequence;
    };

    // --- Prepare highlight cells ---
    const highlightCells = useMemo(() => {
        return Object.entries(parsedData)
            .map(([likelihood, { consequence }]) => {
                const normalizedConseq = normalizeConsequence(consequence);
                const rowIndex = likelihoodLevels.indexOf(likelihood);
                const colIndex = consequenceLevels.indexOf(normalizedConseq);
                if (rowIndex !== -1 && colIndex !== -1) {
                    return `${rowIndex}-${colIndex}`;
                }
                return null;
            })
            .filter(Boolean); // removes null values
    }, [parsedData]);

    return (
        <Sheet
            variant="outlined"
            sx={{
                p: 3,
                borderRadius: 'lg',
                mt: 2,
                bgcolor: '#f9fafc',
                boxShadow: 'sm',
            }}
        >
            {isEmpty ? (
                <Typography level="body-sm" sx={{ color: 'gray' }}>
                    No SAC selections available.
                </Typography>
            ) : (
                <>
                    <Typography
                        level="body-sm"
                        sx={{ fontWeight: 600, mb: 1, color: '#333' }}
                    >
                        SAC Matrix Visualization
                    </Typography>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${consequenceLevels.length + 1}, 1fr)`,
                            gap: 0.5,
                            alignItems: 'center',
                        }}
                    >
                        {/* Header Row */}
                        <Box />
                        {consequenceLevels.map((c, idx) => (
                            <Typography
                                key={idx}
                                level="body-xs"
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 600,
                                    color: '#555',
                                }}
                            >
                                {c}
                            </Typography>
                        ))}

                        {/* Matrix Rows */}
                        {matrixValues.map((row, rowIndex) => (
                            <React.Fragment key={rowIndex}>
                                <Typography
                                    level="body-xs"
                                    sx={{ fontWeight: 600, color: '#555' }}
                                >
                                    {likelihoodLevels[rowIndex]}
                                </Typography>

                                {row.map((value, colIndex) => {
                                    const isHighlighted = highlightCells.includes(
                                        `${rowIndex}-${colIndex}`
                                    );
                                    return (
                                        <Tooltip
                                            key={colIndex}
                                            title={`${likelihoodLevels[rowIndex]} × ${consequenceLevels[colIndex]} = ${value}`}
                                            variant="soft"
                                            size="sm"
                                        >
                                            <Box
                                                sx={{
                                                    height: 32,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    bgcolor: isHighlighted
                                                        ? 'var(--joy-palette-primary-softBg)'
                                                        : '#f0f0f0',
                                                    borderRadius: 'sm',
                                                    fontSize: 12,
                                                    fontWeight: 600,
                                                    border: '1px solid #ddd',
                                                    color: isHighlighted
                                                        ? '#0d47a1'
                                                        : '#555',
                                                }}
                                            >
                                                {value}
                                            </Box>
                                        </Tooltip>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </Box>
                </>
            )}
        </Sheet>
    );
};

export default SACMatrixResult;
