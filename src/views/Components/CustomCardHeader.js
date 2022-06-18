import React, { memo } from 'react'
import { CardHeader, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { bgcolrheading, titleTypography, bgbottom } from 'src/color/Color';
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
            titleTypographyProps={{ variant: "subtitle1", color: titleTypography }}
            sx={{
                backgroundColor: bgcolrheading,
                paddingY: 0.5,
                borderBottom: 0.1,
                borderBottomColor: bgbottom
            }}
        />
    )
}

export default memo(CustomCardHeader)