import React, { memo, useCallback, useState } from 'react'
import {
    Box,
    Tabs,
    Tab,
    TabPanel,
    TabList,
    Typography,
    Card,
    List,
    ListItem,
    ListItemButton,
} from '@mui/joy'
import {
    Business,
    Build,
    CurrencyRupee,
    Gavel,
    Payments,
} from '@mui/icons-material'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import WorkOrderDetailsEntry from './WorkOrderDetailsEntry'

const TAB_CONFIG = [
    { label: 'AMC', gradient: '#C5B0CD' },
    { label: 'KMC', gradient: '#A2AADB' },
    { label: 'Rate Contract', gradient: '#8174A0' },
]

const OPTION_CONFIG = [
    { label: 'Vendor Details', icon: <Business /> },
    { label: 'Installation / Labour Charges', icon: <Build /> },
    { label: 'Rental Details', icon: <CurrencyRupee /> },
    { label: 'Work Order Terms & Conditions', icon: <Gavel /> },
    { label: 'Payment Terms & Conditions', icon: <Payments /> },
]

const WorkOrderEntry = () => {
    const [tabValue, setTabValue] = useState(0)
    const [optionValue, setOptionValue] = useState(0)

    const history = useNavigate()

    const close = useCallback(() => {
        history(`/Home`)
    }, [history])

    return (
        <Box sx={{ p: 0, width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton size="sm" variant="soft" color="primary" clickable="true" onClick={close}>
                    <CloseIcon fontSize="small" sx={{ color: "#7F55B1" }} />
                </IconButton>
            </Box>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>

                <TabList
                    sx={{
                        gap: 1,
                        p: 0.5,
                        borderRadius: 'xl',
                        bgcolor: 'background.level1',
                        width: "100%"
                    }}
                >
                    {TAB_CONFIG.map((tab) => (
                        <Tab
                            key={tab.label}
                            sx={{
                                flex: 1,
                                fontWeight: 700,
                                borderRadius: 'xl',
                                transition: '0.3s',
                                '&.Mui-selected': {
                                    background: tab.gradient,
                                    color: '#fff',
                                    boxShadow: 'md',
                                },
                            }}
                        >
                            {tab.label}
                        </Tab>
                    ))}
                </TabList>

                {TAB_CONFIG.map((tab, index) => (
                    <TabPanel key={tab.label} value={index}>
                        <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>

                            {/* 🧭 LEFT – Vertical Step Selector */}
                            <Card
                                sx={{
                                    width: 400,
                                    borderRadius: 'xl',
                                    boxShadow: 'sm',
                                    // flex: 1,
                                }}
                            >
                                <Typography level="title-sm" mb={1}>
                                    Configuration Steps
                                </Typography>

                                <List sx={{ '--ListItem-radius': 'lg' }}>
                                    {OPTION_CONFIG.map((opt, i) => (
                                        <ListItem key={opt.label}>
                                            <ListItemButton
                                                onClick={() => setOptionValue(i)}
                                                selected={optionValue === i}
                                                sx={{
                                                    gap: 1.5,
                                                    fontWeight: 600,
                                                    transition: '0.3s',
                                                    '&.Mui-selected': {
                                                        bgcolor: 'primary.softBg',
                                                        color: 'primary.solidColor',
                                                        boxShadow: 'inset 4px 0 0 #1976d2',
                                                    },
                                                }}
                                            >
                                                {opt.icon}
                                                {opt.label}
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Card>

                            {/* ✨ RIGHT – Animated Detail Card */}
                            <Card
                                sx={{
                                    flex: 1,
                                    borderRadius: 'xl',
                                    boxShadow: 'lg',
                                    animation: 'fadeSlide 0.35s ease',
                                    '@keyframes fadeSlide': {
                                        from: { opacity: 0, transform: 'translateX(20px)' },
                                        to: { opacity: 1, transform: 'translateX(0)' },
                                    },
                                }}
                            >
                                <Typography level="h5" mb={1}>
                                    {OPTION_CONFIG[optionValue].label}
                                </Typography>

                                <WorkOrderDetailsEntry />
                            </Card>

                        </Box>
                    </TabPanel>
                ))}
            </Tabs>
        </Box>
    )
}

export default memo(WorkOrderEntry)

