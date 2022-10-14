import { Box } from '@mui/material'
import React, { Fragment } from 'react'
import { CssVarsProvider, Typography } from '@mui/joy'
const RequestTypeTitle = () => {
    return (
        <Fragment>
            <Box >

                <Box sx={{ flex: 1 }} >
                    <CssVarsProvider>
                        <Typography textColor="neutral.400" sx={{ display: 'flex', p: 0.5 }} >
                            Request Type
                        </Typography>
                    </CssVarsProvider>
                </Box>

            </Box>
        </Fragment>
    )
}

export default RequestTypeTitle