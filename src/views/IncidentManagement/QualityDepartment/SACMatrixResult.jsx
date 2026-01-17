import React, { memo, useMemo } from 'react';
import { Box, Sheet, Typography, Tooltip } from '@mui/joy';

const SACMatrixResult = ({ sacData }) => {

    // --- Parse data safely ---
    let parsedData = null;
    try {
        parsedData =
            typeof sacData === 'string'
                ? JSON.parse(sacData)
                : sacData || null;
    } catch (err) {
        console.error('Invalid SAC data JSON:', err);
        parsedData = null;
    }

    const isEmpty = !parsedData;

    // --- Levels (SAME AS FORM) ---
    const likelihoodLevels = [
        { label: 'Almost Certain', value: 5 },
        { label: 'Likely', value: 4 },
        { label: 'Possible', value: 3 },
        { label: 'Unlikely', value: 2 },
        { label: 'Rare', value: 1 },
    ];

    const consequenceLevels = [
        { label: 'Negligible', value: 1 },
        { label: 'Minor', value: 2 },
        { label: 'Moderate', value: 3 },
        { label: 'Major', value: 4 },
        { label: 'Catastrophic', value: 5 },
    ];

    // --- Find selected cell ---
    const selectedCell = useMemo(() => {
        if (!parsedData) return null;

        const rowIndex = likelihoodLevels.findIndex(
            (l) => l.label === parsedData.likelihood
        );

        const colIndex = consequenceLevels.findIndex(
            (c) => c.label === parsedData.consequence
        );

        if (rowIndex === -1 || colIndex === -1) return null;

        return { rowIndex, colIndex };
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
                        Risk Matrix Visualization
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
                        {consequenceLevels.map((c) => (
                            <Typography
                                key={c.label}
                                level="body-xs"
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 600,
                                    color: '#555',
                                }}
                            >
                                {c.label} ({c.value})
                            </Typography>
                        ))}

                        {/* Matrix Rows */}
                        {likelihoodLevels?.map((l, rowIndex) => (
                            <React.Fragment key={l.label}>
                                <Typography
                                    level="body-xs"
                                    sx={{ fontWeight: 600, color: '#555' }}
                                >
                                    {l.label} ({l.value})
                                </Typography>

                                {consequenceLevels.map((c, colIndex) => {
                                    const value = l.value * c.value;
                                    const isSelected =
                                        selectedCell?.rowIndex === rowIndex &&
                                        selectedCell?.colIndex === colIndex;

                                    return (
                                        <Tooltip
                                            key={colIndex}
                                            title={`${l.label} (${l.value}) × ${c.label} (${c.value}) = ${value}`}
                                            variant="soft"
                                            size="sm"
                                        >
                                            <Box
                                                sx={{
                                                    height: 32,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    bgcolor: isSelected
                                                        ? 'var(--joy-palette-primary-softBg)'
                                                        : '#f0f0f0',
                                                    borderRadius: 'sm',
                                                    fontSize: 12,
                                                    fontWeight: 600,
                                                    border: '1px solid #ddd',
                                                    color: isSelected
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

export default memo(SACMatrixResult);
