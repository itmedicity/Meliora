import { Box } from '@mui/joy'
import React, { memo } from 'react'
import IncidentTextComponent from './IncidentTextComponent'

const IncidentStatus = ({ text, icon: Icon }) => {
    return (
        <Box
            sx={{
                position: "relative",
                px: 2,
                py: 0.5,
                bgcolor: "var(--rose-pink-300)",
                borderRadius: 5,
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            <IncidentTextComponent
                text={text ?? text}
                size={14}
                weight={600}
                color={"white"}
            />
            {
                Icon && <Icon
                    sx={{
                        color: "white",
                        fontSize: 18,
                    }}
                />
            }

        </Box>
    )
}

export default memo(IncidentStatus)
