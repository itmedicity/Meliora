import { Box } from '@mui/joy'
import React, { memo } from 'react'
import IncidentTextComponent from '../Components/IncidentTextComponent'
// import IncidentTextComponent from './IncidentTextComponent'

const ApprovalButton = ({
    icon: Icon,
    text,
    onClick,
    disabled = false,
    size,
    iconSize
}) => {
    return (
        <Box
            onClick={!disabled ? onClick : undefined}
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                px: 2,
                py: 0.8,
                borderRadius: '12px',
                fontWeight: 600,
                cursor: disabled ? 'not-allowed' : 'pointer',
                userSelect: 'none',
                my: 1,
                height: 44,
                border: '1px solid var(--royal-purple-300)',
                background: disabled
                    ? 'linear-gradient(135deg, #d1c4e9, #b39ddb)'
                    : 'linear-gradient(135deg, var(--royal-purple-300), #6a1b9a)',
                color: disabled ? '#666' : '#fff',
                boxShadow: disabled
                    ? 'none'
                    : '0 4px 8px rgba(106, 27, 154, 0.3)',
                transition: 'transform 0.25s, box-shadow 0.25s, background 0.25s',
                '&:hover': !disabled && {
                    transform: 'translateY(-3px) scale(1.02)',
                    boxShadow: '0 6px 16px rgba(106, 27, 154, 0.4)',
                    background: 'linear-gradient(135deg, #7e57c2, #512da8)',
                },
                '&:active': !disabled && {
                    transform: 'translateY(0px) scale(0.98)',
                },
            }}
        >
            <IncidentTextComponent
                text={text}
                size={size ? size : 10}
                color={disabled ? '#444' : '#fff'}
                weight={600}
            />
            {Icon && <Icon size={iconSize || 18} />}

        </Box>
    )
}

export default memo(ApprovalButton)
