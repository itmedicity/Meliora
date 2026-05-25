import { Sheet, Typography } from '@mui/joy'
import React, { memo } from 'react'

const Infocard = ({ label, value, icon }) => {
    return (
        <Sheet
            variant="outlined"
            sx={{
                p: 2,
                borderRadius: "md",
            }}
        >
            <Typography level="body-xs" startDecorator={icon}>
                {label}
            </Typography>
            <Typography fontWeight={600}>{value}</Typography>
        </Sheet>
    )
}

export default memo(Infocard) 