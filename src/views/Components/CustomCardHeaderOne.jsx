import { CardHeader } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment } from 'react'
import CusIconButton from './CusIconButton'
import CustomeToolTip from './CustomeToolTip'
import CloseIcon from '@mui/icons-material/Close';

const CustomCardHeaderOne = ({ cardStyle, title, onClickClose }) => {
    // -- Card Header Style
    const CardHeaderStyle = {
        backgroundColor: "#f0f3f5",
        fontFamily: "Roboto",
        py: 0,
        pb: 0.650,
        pt: 0.800
    }
    return (
        <Fragment>
            <CardHeader
                title={title}
                titleTypographyProps={{ variant: "headerFontSize" }}
                action={
                    <CustomeToolTip title="Close" placement="left" >
                        <Box>
                            <CusIconButton size="sm" variant="outlined" color="danger" onClick={onClickClose} >
                                <CloseIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>
                }
                sx={{ ...CardHeaderStyle, ...cardStyle }}
            />
        </Fragment>
    )
}

export default CustomCardHeaderOne