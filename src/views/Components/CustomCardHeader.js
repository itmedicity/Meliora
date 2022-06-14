import React from 'react'
import { CardHeader, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CustomCardHeader = ({ title }) => {
    return (
        <CardHeader
            title={title}
            action={
                <Tooltip title="Back To Home" arrow >
                    <IconButton aria-label="settings">
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            }
            titleTypographyProps={{ variant: "subtitle1", color: "#5d5d5d" }}
            sx={{
                backgroundColor: "#f2f2f2",
                paddingY: 0.5,
                borderBottom: 0.1,
                borderBottomColor: "#c5cae9"
            }}
        />
    )
}

export default CustomCardHeader