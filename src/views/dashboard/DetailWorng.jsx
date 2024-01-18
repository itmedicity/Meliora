import { Paper, Box } from '@mui/material';
import React, { Fragment } from 'react'
import { CssVarsProvider, Typography } from '@mui/joy'

const DetailWorng = () => {

    return (
        <Fragment>

            <Box sx={{ width: "60%", pl: 70 }}>
                <Paper square elevation={2} sx={{ p: 1 }} >
                    <Box
                        sx={{
                            // pl: 1,
                            display: "flex",
                            flexDirection: 'row',
                            justifyContent: "space-between"
                        }}>
                        <CssVarsProvider>
                            <Typography ml={10} sx={{ fontSize: 18, fontWeight: 500 }} >

                                Your Login In Old ID, You Can Login with Current ID No!</Typography>
                        </CssVarsProvider>

                    </Box>
                </Paper>
            </Box>

        </Fragment >
    )
}

export default DetailWorng