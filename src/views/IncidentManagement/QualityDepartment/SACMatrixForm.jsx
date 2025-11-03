import React, { useState, useMemo, useEffect } from 'react';
import Table from '@mui/joy/Table';
import { TiArrowForwardOutline } from "react-icons/ti";
import Stack from '@mui/joy/Stack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IncidentTextComponent from '../Components/IncidentTextComponent';
import { Box } from '@mui/joy';

const SACMatrixForm = ({ setSelectedItems }) => {

    const consequenceLevels = [
        'Negligible',
        'Minor',
        'Moderate',
        'Major',
        'Catastrophic',
    ];

    const likelihoodLevels = ['Frequent', 'Likely', 'Possible', 'Unlikely', 'Rare'];

    const matrixValues = [
        [3, 3, 2, 1, 1],
        [4, 3, 2, 1, 1],
        [4, 3, 2, 2, 1],
        [4, 4, 3, 2, 1],
        [4, 4, 4, 3, 2],
    ];

    // selected column index for each likelihood
    const [selectedIndices, setSelectedIndices] = useState({});


    const handleCellClick = (rowIdx, colIdx) => {
        setSelectedIndices(prev => ({
            ...prev,
            [rowIdx]: colIdx,
        }));
    };

    // Derived data: readable format
    const readableSelections = useMemo(() => {
        return Object.entries(selectedIndices).reduce((acc, [rowIndex, colIndex]) => {
            const likelihood = likelihoodLevels[rowIndex];
            const consequence = consequenceLevels[colIndex];
            const value = matrixValues[rowIndex][colIndex];
            acc[likelihood] = { consequence, value };
            return acc;
        }, {});
    }, [selectedIndices]);

    //  Whenever readableSelections changes, update state + parent
    useEffect(() => {
        // setReadableSelectionsState(readableSelections);
        setSelectedItems(readableSelections); // pass to parent
    }, [
        readableSelections,
        setSelectedItems
    ]);

    return (
        <Stack spacing={4} sx={{ width: '100%', mt: 2, bgcolor: "#fafafa", p: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.4 }}>
                <TiArrowForwardOutline style={{ color: 'var(--rose-pink-400)', fontSize: 18 }} />
                <IncidentTextComponent
                    text="Severity Assessment Code (SAC Matrix)"
                    size={14}
                    weight={600}
                    color="black"
                />
            </Box>

            <Table
                size="md"
                variant="outlined"
                stickyHeader
                sx={{
                    mt: 2,
                    cursor: 'pointer',
                    '& th, & td': {
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        padding: '12px',
                    },
                    '& th': {
                        backgroundColor: 'background.level1',
                        fontWeight: 'bold',
                    },
                }}
            >
                <thead>
                    <tr>
                        <th style={{ minWidth: 150 }}>Likelihood ↓ / Consequences →</th>
                        {consequenceLevels.map((level) => (
                            <th key={level}>{level}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {likelihoodLevels.map((likelihood, rowIdx) => (
                        <tr key={likelihood}>
                            <th scope="row">{likelihood}</th>
                            {matrixValues[rowIdx].map((val, colIdx) => {
                                const isSelected = selectedIndices[rowIdx] === colIdx;
                                return (
                                    <td
                                        key={colIdx}
                                        onClick={() => handleCellClick(rowIdx, colIdx)}
                                    >
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="center"
                                            spacing={0.5}
                                        >
                                            {isSelected && (
                                                <CheckCircleIcon
                                                    fontSize="small"
                                                    sx={{ color: 'var(--royal-purple-300)' }}
                                                />
                                            )}
                                            <span>{val}</span>
                                        </Stack>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Stack>
    );
};

export default SACMatrixForm;
