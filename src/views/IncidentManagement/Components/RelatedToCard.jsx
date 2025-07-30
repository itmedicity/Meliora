import { Box, Checkbox, Sheet } from '@mui/joy';
import React, { memo } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IncidentTextComponent from './IncidentTextComponent';

const RelatedToCard = ({ label, symbol, selected, onSelect, size, width, multiple }) => {
    const handleClick = () => {
        onSelect(symbol); // Call parent’s function — it knows how to handle single/multiple
    };

    return (
        <Sheet
            onClick={handleClick}
            variant="outlined"
            sx={{
                width: width ? width : { sm: '98%', md: '98%', lg: '98%', xl: '48%' },
                px: 2,
                py: 1,
                mb: 0.5,
                borderRadius: 'md',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderColor: selected ? 'var(--royal-purple-300)' : 'neutral.outlinedBorder',
                backgroundColor: selected ? 'var(--royal-purple-100)' : 'background.body',
                transition: '0.2s ease',
                '&:hover': {
                    boxShadow: 'sm',
                    borderColor: 'primary.outlinedHoverBorder',
                },
                gap: 1
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {multiple && (
                    <Checkbox
                        checked={selected}
                        onChange={handleClick}
                        overlay
                        variant="outlined"
                        sx={{
                            '--Checkbox-checkedBg': '#7c3aed',
                            '--Checkbox-checkedColor': '#fff',
                            '--Checkbox-color': '#7c3aed',
                            '--Checkbox-borderColor': '#7c3aed',
                            '&:hover': {
                                '--Checkbox-checkedBg': '#6d28d9',
                            },
                            display: 'none'
                        }}
                    />
                )}

                <IncidentTextComponent
                    text={label}
                    color={'#403d3dff'}
                    size={size || 12}
                    weight={400}
                />
            </Box>

            {selected && (
                <CheckCircleIcon
                    fontSize="small"
                    sx={{
                        color: '#673ab7',
                        borderRadius: '50%',
                        zIndex: 9999,
                    }}
                />
            )}
        </Sheet>
    );
};

export default memo(RelatedToCard);
