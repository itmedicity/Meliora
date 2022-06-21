import React from 'react'
import { CardHeader, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { cardHeaderColor, cardHeaderFont } from 'src/color/Color';

const CustomCardHeader = ({ title }) => {
    return (
        <CardHeader
            title={title}
            action={
                <Tooltip title="Close" arrow >
                    <IconButton aria-label="settings" size="small" sx={{ paddingTop: 2 }} >
                        <CloseIcon sx={{ paddingTop: 0.3, color: "#fdfdfd" }} />
                    </IconButton>
                </Tooltip>
            }
            titleTypographyProps={{ variant: "subtitle2" }}
            disableTypography
            sx={{
                backgroundColor: cardHeaderColor,
                paddingY: 0,
                borderBottom: 0.1,
                borderBottomColor: cardHeaderColor,
                // fontWeight: "bold",
                fontSize: 14,
                color: cardHeaderFont
            }}
        />
    )
}

export default CustomCardHeader