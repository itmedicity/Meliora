import React, { memo } from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { Badge, Box } from '@mui/joy';
import { innerHeight } from 'src/views/Constant/Constant';
import IncidentListCard from './IncidentListCard';

const TabComponent = () => (
    <Box
        sx={{
            width: '100%',
            height: (innerHeight * 85) / 100,
            borderRadius: 'lg',
            border: '1px solid #e0e0e0',
            overflow: 'hidden',
        }}
    >
        <Tabs
            defaultValue={0}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* This is the scrollable container */}
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    pr: 1,
                    // hide scrollbar
                    '::-webkit-scrollbar': { display: 'none' },
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {/* Sticky Tab Header INSIDE scroll container */}
                <Box
                    sx={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 10,
                        bgcolor: 'background.body',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <TabList
                        disableUnderline
                        tabFlex={1}
                        sx={{
                            [`& .${tabClasses.root}`]: {
                                fontSize: 'md',
                                fontWeight: 'lg',
                                height: 50,
                                [`&[aria-selected="true"]`]: {
                                    color: '#000',
                                    bgcolor: '#eeeafaff',
                                },
                                [`&.${tabClasses.focusVisible}`]: {
                                    outlineOffset: '-4px',
                                },
                            },
                        }} >
                        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1, position: 'relative' }}>
                            <Badge
                                badgeContent={10}
                                size="sm"
                                color="primary"
                                variant="solid"
                                sx={{
                                    position: 'absolute',
                                    top: 10,
                                    right: '60%',
                                    zIndex: 10,
                                    '& .MuiBadge-badge': {
                                        backgroundColor: '#b19af7ff',
                                        color: '#000',
                                        fontSize: 10,
                                        minWidth: 18,
                                        height: 18,
                                        borderRadius: '999px',
                                        px: 0.6,
                                    },
                                }}
                            />
                            Open Incident
                        </Tab>

                        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1, position: 'relative' }}>
                            <Badge
                                badgeContent={8}
                                size="sm"
                                color="primary"
                                variant="solid"
                                sx={{
                                    position: 'absolute',
                                    top: 10,
                                    right: '60%',
                                    zIndex: 10,
                                    '& .MuiBadge-badge': {
                                        backgroundColor: '#b19af7ff',
                                        color: '#000',
                                        fontSize: 10,
                                        minWidth: 18,
                                        height: 18,
                                        borderRadius: '999px',
                                        px: 0.6,
                                    },
                                }}
                            />
                            Close Incident
                        </Tab>
                        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                            <Badge
                                badgeContent={5}
                                size="sm"
                                color="primary"
                                variant="solid"
                                sx={{
                                    position: 'absolute',
                                    top: 10,
                                    right: '63%',
                                    zIndex: 10,
                                    '& .MuiBadge-badge': {
                                        backgroundColor: '#b19af7ff',
                                        color: '#000',
                                        fontSize: 10,
                                        minWidth: 18,
                                        height: 18,
                                        borderRadius: '999px',
                                        px: 0.6,
                                    },
                                }}
                            />
                            Root Cause Analysis
                        </Tab>
                    </TabList>
                </Box>

                {/* Tab Panels (Scrolls below sticky TabList) */}
                <TabPanel value={0}>
                    {[...Array(10)].map((_, idx) => (
                        <IncidentListCard key={idx} />
                    ))}
                </TabPanel>

                <TabPanel value={1}>
                    {[...Array(10)].map((_, idx) => (
                        <IncidentListCard key={idx} />
                    ))}
                </TabPanel>

                <TabPanel value={2}>
                    {[...Array(10)].map((_, idx) => (
                        <IncidentListCard key={idx} />
                    ))}
                </TabPanel>
            </Box>
        </Tabs>
    </Box>
);

export default memo(TabComponent);
