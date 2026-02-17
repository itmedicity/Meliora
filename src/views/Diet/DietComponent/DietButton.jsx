import { Box } from '@mui/joy'
import React, { memo } from 'react'

const DietButton = ({ name = "Save", onClick, disabled = false, icon: Icon, width }) => {
    return (
        <Box
            role="button"
            tabIndex={disabled ? -1 : 0}
            onClick={!disabled ? onClick : undefined}
            onKeyDown={(e) => {
                if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                    onClick?.()
                }
            }}
            sx={{
                minWidth: width ? width : 100,
                height: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 800,
                bgcolor: '#ffffffd0',
                borderRadius: 5,
                outline: 'none',
                userSelect: 'none',
                border: '1px solid #57565727',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                px: 1,
                boxShadow:
                    '0 4px 8px rgba(0,0,0,0.07), 0 6px 20px rgba(0,0,0,0.08)',

                transition: 'box-shadow 0.2s ease, border 0.2s ease',

                '&:hover': {
                    border: disabled ? 'none' : '1px solid #9822c365'
                },

                '&:focus-visible': {
                    boxShadow: disabled
                        ? '0 4px 8px rgba(0,0,0,0.07), 0 6px 20px rgba(0,0,0,0.08)'
                        : '0 6px 24px rgba(0,0,0,0.25)'
                }
            }}
        >
            {Icon && (
                <Icon
                    style={{ marginRight: 6, fontSize: 16 }}
                />
            )}
            {name}
        </Box>
    )
}

export default memo(DietButton)
