import React, {
    useState,
    useMemo,
    useEffect,
    useRef,
    memo
} from 'react';
import Table from '@mui/joy/Table';
import { TiArrowForwardOutline } from "react-icons/ti";
import Stack from '@mui/joy/Stack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IncidentTextComponent from '../Components/IncidentTextComponent';
import { Box } from '@mui/joy';

/* =========================
   CONSTANTS (OUTSIDE)
   ========================= */
const CONSEQUENCE_LEVELS = [
    { label: 'Negligible', value: 1 },
    { label: 'Minor', value: 2 },
    { label: 'Moderate', value: 3 },
    { label: 'Major', value: 4 },
    { label: 'Catastrophic', value: 5 },
];

const LIKELIHOOD_LEVELS = [
    { label: 'Almost Certain', value: 5 },
    { label: 'Likely', value: 4 },
    { label: 'Possible', value: 3 },
    { label: 'Unlikely', value: 2 },
    { label: 'Rare', value: 1 },
];

/* =========================
   COMPONENT
   ========================= */
const SACMatrixForm = ({ setSelectedItems }) => {

    // Selected cell
    const [selectedCell, setSelectedCell] = useState(null);

    // Store last sent value (to avoid loop)
    const lastSentRef = useRef(null);

    // Click handler (guards duplicate clicks)
    const handleCellClick = (rowIdx, colIdx) => {
        if (
            selectedCell?.rowIdx === rowIdx &&
            selectedCell?.colIdx === colIdx
        ) {
            return; // ? stop unnecessary render
        }
        setSelectedCell({ rowIdx, colIdx });
    };

    // Derived selection
    const readableSelection = useMemo(() => {
        if (!selectedCell) return null;

        const likelihood = LIKELIHOOD_LEVELS[selectedCell.rowIdx];
        const consequence = CONSEQUENCE_LEVELS[selectedCell.colIdx];

        return {
            likelihood: likelihood.label,
            likelihoodValue: likelihood.value,
            consequence: consequence.label,
            consequenceValue: consequence.value,
            riskValue: likelihood.value * consequence.value,
        };
    }, [selectedCell]);

    // Send to parent (guarded)
    useEffect(() => {
        if (!readableSelection) return;

        if (
            lastSentRef.current &&
            lastSentRef.current.likelihood === readableSelection.likelihood &&
            lastSentRef.current.consequence === readableSelection.consequence
        ) {
            return; // ? no parent update
        }

        lastSentRef.current = readableSelection;
        setSelectedItems(readableSelection);
    }, [readableSelection, setSelectedItems]);

    return (
        <Stack spacing={4} sx={{ width: '100%', mt: 2, bgcolor: "#fafafa", p: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.4 }}>
                <TiArrowForwardOutline
                    style={{ color: 'var(--rose-pink-400)', fontSize: 18 }}
                />
                <IncidentTextComponent
                    text="Risk Matrix Analysis"
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
                        <th style={{ minWidth: 150 }}>
                            Likelihood ? / Consequences ?
                        </th>
                        {CONSEQUENCE_LEVELS.map(level => (
                            <th
                                key={level.label}
                                style={{ fontSize: '12px', fontWeight: '800' }}
                            >
                                {level.label}
                                <br /> ({level.value})
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {LIKELIHOOD_LEVELS.map((likelihood, rowIdx) => (
                        <tr key={likelihood.label}>
                            <th
                                scope="row"
                                style={{ fontSize: '12px', fontWeight: '800' }}
                            >
                                {likelihood.label}
                                <br /> ({likelihood.value})
                            </th>

                            {CONSEQUENCE_LEVELS.map((consequence, colIdx) => {
                                const value =
                                    likelihood.value * consequence.value;

                                const isSelected =
                                    selectedCell?.rowIdx === rowIdx &&
                                    selectedCell?.colIdx === colIdx;

                                return (
                                    <td
                                        key={colIdx}
                                        onClick={() =>
                                            handleCellClick(rowIdx, colIdx)
                                        }
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
                                                    sx={{
                                                        color: 'var(--royal-purple-300)',
                                                    }}
                                                />
                                            )}
                                            <span>{value}</span>
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

export default memo(SACMatrixForm);

