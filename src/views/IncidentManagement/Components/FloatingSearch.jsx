// src/views/CommonComponent/FloatingSearch.jsx
import React, { useState } from 'react';
import { Box, Input, IconButton } from '@mui/joy';
import { Search as SearchIcon } from '@mui/icons-material';

const FloatingSearch = ({ onSearch, placeholder = "Search..." }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
        onSearch(e.target.value);
    };

    const handleExpand = () => {
        setIsOpen(true);
    };

    const handleCollapse = () => {
        setIsOpen(false);
        setSearchValue('');
        onSearch('');
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 132,
                right: 39,
                width: isOpen ? 320 : 48,
                // bgcolor: 'white',
                borderRadius: 2,
                // boxShadow: 'lg',
                transition: 'width 0.3s ease',
                overflow: 'hidden',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                p: 1
            }}
        >
            {isOpen && (
                <Input
                    placeholder={placeholder}
                    value={searchValue}
                    onChange={handleSearch}
                    sx={{
                        width: '100%',
                        ml: 1,
                        '& input': {
                            fontSize: 14
                        }
                    }}
                    startDecorator={
                        <SearchIcon sx={{ color: '#7c51a1' }} />
                    }
                />
            )}

            <IconButton
                onClick={isOpen ? handleCollapse : handleExpand}
                sx={{
                    bgcolor: isOpen ? '#f5f5f5' : '#7c51a1',
                    color: isOpen ? '#444' : 'white',
                    '&:hover': {
                        bgcolor: isOpen ? '#e0e0e0' : '#6a4585'
                    }
                }}
            >
                {isOpen ? '✕' : <SearchIcon sx={{ fontSize: 20 }} />}
            </IconButton>
        </Box>
    );
};

export default FloatingSearch;