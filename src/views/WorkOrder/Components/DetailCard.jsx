import { Sheet } from '@mui/joy'
import React from 'react'

const DetailCard = ({ children }) => {
    return (
        <Sheet
            variant="soft"
            sx={{
                p: 1.5,
                borderRadius: "md",
                mb: 1,
            }}
        >
            {children}
        </Sheet>
    )
}

export default DetailCard