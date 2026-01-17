import React from 'react';
import { Box, Input } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import IncidentTextComponent from "./IncidentTextComponent";
import { memo } from "react";

const IncidentFilterBox = ({ setSearchInput }) => {
    return (
        <Box sx={{
            width: '30%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 8px 8px 0 rgba(185, 177, 177, 0.2), 0 6px 20px 0 rgba(180, 177, 177, 0.19)',
            borderRadius: 5,
        }}>
            {/* Left Filter Label */}
            <Box sx={{
                width: '15%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                gap: 1,
                px: 2,
            }}>
                <IncidentTextComponent text={"Filter"} color={'#0b61b8ff'} size={16} weight={600} />
                <SettingsRoundedIcon sx={{ fontSize: 16, color: '#0b61b8ff' }} />
            </Box>

            {/* Search Input */}
            <Box sx={{
                width: '80%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                p: 1
            }}>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Input
                        onChange={(e) => setSearchInput(e.target.value)}
                        startDecorator={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <SearchIcon sx={{ fontSize: 18 }} />
                                <IncidentTextComponent text={"Search Here"} color={'#343537ff'} size={14} weight={400} />
                            </Box>
                        }
                        sx={{
                            width: '100%',
                            padding: 0,
                            fontFamily: 'var(--roboto-font)',
                            px: 0.2,
                            '--Input-focusedThickness': '0px',
                            '--Input-focusedHighlight': 'transparent',
                            boxShadow: 'none',
                            '&:focus-within': {
                                boxShadow: 'none',
                                outline: 'none',
                                border: 'none',
                            },
                            '& input': {
                                boxShadow: 'none',
                            },
                            '& input:focus': {
                                boxShadow: 'none',
                                outline: 'none',
                                border: 'none',
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default memo(IncidentFilterBox);
