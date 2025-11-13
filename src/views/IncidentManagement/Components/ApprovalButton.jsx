import { Box } from '@mui/joy'
import React, { memo } from 'react'
import IncidentTextComponent from './IncidentTextComponent'

const ApprovalButton = ({
    icon: Icon,
    text
}) => {
    return (
        <Box
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 1,
                px: 1.2,
                py: 0.3,
                borderRadius: '4px',
                color: '#fff',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
                userSelect: 'none',
                my: 1,
                background: 'var(--royal-purple-400)'
            }}>

            <IncidentTextComponent
                text={text}
                size={12}
                color="#ffffffff"
                weight={400}
            />
            {
                Icon && <Icon fontSize="small" />
            }

        </Box>
    )
}

export default memo(ApprovalButton)