import { Box } from '@mui/joy'
import React, { memo } from 'react'
import IncidentTextComponent from './IncidentTextComponent'
// import IncidentTextComponent from './IncidentTextComponent'

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
                // "&::before, &::after": {
                //     content: '""',
                //     position: "absolute",
                //     top: 0,
                //     bottom: 0,
                //     width: "90px",
                //     filter: "blur(25px)",
                //     background:
                //         "linear-gradient(90deg, rgba(0,255,255,0) 0%, rgba(0,255,255,0.9) 50%, rgba(255,255,255,0) 100%)",
                //     opacity: 0.9,
                //     zIndex: 0,
                // },

                // // left aura → moves from left edge toward center
                // "&::before": {
                //     left: "-90px",
                //     animation: "waveLeft 3s infinite ease-in-out",
                // },

                // // right aura → mirrored gradient & moves inward
                // "&::after": {
                //     right: "-90px",
                //     transform: "scaleX(-1)", // flip gradient
                //     animation: "waveRight 3s infinite ease-in-out",
                // },

                // "@keyframes waveLeft": {
                //     "0%": { transform: "translateX(0)" },
                //     "50%": { transform: "translateX(80px)" }, // move toward center
                //     "100%": { transform: "translateX(0)" },
                // },
                // "@keyframes waveRight": {
                //     "0%": { transform: "translateX(0)" },
                //     "50%": { transform: "translateX(-80px)" }, // move toward center
                //     "100%": { transform: "translateX(0)" },
                // },
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
