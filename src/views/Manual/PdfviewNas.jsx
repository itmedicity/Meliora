import React from 'react'
import { Fragment, memo } from 'react';
import { Box, Typography } from '@mui/material'

const PdfviewNas = ({ pdfDis }) => {
    return (
        <Fragment>
            <Box sx={{
                width: { md: "100%", sm: "100%", xl: "100%", lg: "100%", xs: "100%" }

            }}>
                {
                    pdfDis === 1 ?
                        <embed
                            src={"http://192.168.10.170/NAS//fileshows/GuideLine.pdf" + "#toolbar=0"}
                            type="application/pdf"
                            height={850}
                            width="100%" />

                        : pdfDis === 3 ?
                            <embed
                                src={"http://192.168.10.170/NAS//fileshows/GuideLine.pdf"}
                                type="application/pdf"
                                height={850}
                                width="100%" />
                            : null
                }

            </Box>

        </Fragment>
    )
}

export default memo(PdfviewNas)