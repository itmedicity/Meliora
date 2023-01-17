import { Box } from '@mui/material'
import React, { Fragment, memo } from 'react'
import { CssVarsProvider, Typography } from '@mui/joy'

const CustomPaperTitle = ({ heading }) => {
    return (
        <Fragment>
            <Box >
                <Box sx={{ flex: 1 }} >
                    <CssVarsProvider>
                        <Typography textColor="neutral.400" sx={{ display: 'flex', p: 0, px: 1 }} >
                            {heading}
                        </Typography>
                    </CssVarsProvider>
                </Box>
            </Box>
        </Fragment>
    )
}

export default memo(CustomPaperTitle)