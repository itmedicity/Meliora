import React from 'react'
import { Box } from '@mui/joy'
import DietTextComponent from './DietTextComponent'

const StatusComponent = ({ status, value, onChange }) => {


    const isActive = value === status.code

    const handleClick = () => {
        onChange(prev => (prev === status.code ? null : status.code))
    }

    return (
        <Box
            role="button"
            onClick={handleClick}
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                px: 1,
                py: 0.5,
                borderRadius: 5,
                cursor: 'pointer',
                userSelect: 'none',
                //  COLOR IS THE MESSAGE
                bgcolor: `${status.color}.solidBg`,
                color: `${status.color}.solidColor`,
                // optional focus indicator only
                outline: isActive
                    ? `2px solid var(--joy-palette-${status.color}-solidBg)`
                    : 'none',
                outlineOffset: 2,
                mr: 1
            }}>
            <DietTextComponent
                size={10}
                value={status.label}
                color="#ffffff"
            />
        </Box>
    )
}

export default StatusComponent
