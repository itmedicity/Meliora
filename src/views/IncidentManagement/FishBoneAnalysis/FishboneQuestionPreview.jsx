import React, { memo } from 'react';
import { Box, Card, Stack, IconButton, Tooltip } from '@mui/joy';
import IncidentTextComponent from '../Components/IncidentTextComponent';
import { GiCirclingFish } from "react-icons/gi";
import { FaUserCircle } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";

const FishboneQuestionPreview = ({ data, action, setOpen,
    //  setSaveDetail 
}) => {
    const incident = Array.isArray(data) ? data[0] : data;

    if (!incident) return null;

    // Fields based on mode
    const fields = action
        ? [
            { label: 'MATERIAL', key: 'MATERIAL' },
            { label: 'MACHINE', key: 'MACHINE' },
            { label: 'MAN', key: 'MAN' },
            { label: 'MILIEU', key: 'MILIEU' },
            { label: 'METHOD', key: 'METHOD' },
            { label: 'MEASUREMENT', key: 'MEASUREMENT' },
        ]
        : [
            { label: 'MATERIAL', key: 'inc_material' },
            { label: 'MACHINE', key: 'inc_machine' },
            { label: 'MAN', key: 'inc_man' },
            { label: 'MILIEU', key: 'inc_milieu' },
            { label: 'METHOD', key: 'inc_method' },
            { label: 'MEASUREMENT', key: 'inc_measurement' },
        ];

    const userName = !action && incident?.em_name ? incident.em_name : "—";

    return (
        <Card
            sx={{
                my: 2,
                backgroundColor: '#fefefe',
                px: 2,
                py: 1.5,
                border: "4px solid var(--royal-purple-400)",
                borderTop: "none",
                borderBottom: "none",
                borderRadius: "20px / 15px",
                boxShadow: '8px 0 8px -4px rgba(0,0,0,0.1), -8px 0 8px -4px rgba(0,0,0,0.1)',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    boxShadow: 'sm',
                    py: 1,
                    px: 1,
                    borderRadius: 5,
                    position: 'relative',
                }}
            >
                <GiCirclingFish fontSize={25} color='var(--rose-pink-400)' />
                <IncidentTextComponent
                    text="FISHBONE QUESTION PREVIEW"
                    size={13}
                    weight={800}
                    color="#333"
                />

                {/* Right-side section */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'absolute',
                        right: 10,
                        gap: 1,
                    }}
                >
                    {action ? (
                        <Tooltip title="Edit Fishbone Details">
                            <IconButton
                                size="sm"
                                color="primary"
                                variant="soft"
                                onClick={() =>
                                    setOpen(true)
                                }
                            >
                                <MdEdit size={18} />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <>
                            <Tooltip title="Registered User">
                                <span style={{ cursor: 'pointer' }}>
                                    <FaUserCircle fontSize={16} color='var(--rose-pink-400)' />
                                </span>
                            </Tooltip>
                            <IncidentTextComponent
                                text={userName}
                                size={13}
                                weight={800}
                                color="#444"
                            />
                        </>
                    )}
                </Box>
            </Box>

            {/* Fishbone Fields */}
            <Stack spacing={1}>
                {fields.map(({ label, key }) => (
                    <Box
                        key={key}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'start',
                            gap: 1,
                            flexWrap: 'wrap',
                        }}
                    >
                        <IncidentTextComponent
                            text={`${label}:`}
                            size={13}
                            weight={500}
                            color="#222"
                        />
                        <IncidentTextComponent
                            text={incident?.[key] ? `"${incident[key]}"` : '—'}
                            size={13}
                            weight={400}
                            color="#444"
                        />
                    </Box>
                ))}
            </Stack>
        </Card>
    );
};

export default memo(FishboneQuestionPreview);
