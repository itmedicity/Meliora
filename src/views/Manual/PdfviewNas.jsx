import React from 'react'
import { Fragment, memo } from 'react';
import { Box } from '@mui/material'
import { PUBLIC_NAS_FOLDER } from '../Constant/Static';

const PdfviewNas = ({ pdfDis }) => {

    return (
        <Fragment>
            <Box sx={{
                width: { md: "100%", sm: "100%", xl: "100%", lg: "100%", xs: "100%" }

            }}>
                {
                    pdfDis === 1 ?
                        <embed
                            src={`${PUBLIC_NAS_FOLDER}/fileshows/GuideLine.pdf#toolbar=0&navpanes=0&view=FitH`}
                            type="application/pdf"
                            height={820}
                            width="100%"
                        />

                        :
                        pdfDis === 2 ?
                            <embed
                                id="pdf-embed"
                                src={`${PUBLIC_NAS_FOLDER}/fileshows/LASA.pdf#toolbar=0&navpanes=0&view=FitH`}
                                type="application/pdf"
                                height={850}
                                width="100%" />
                            :
                            pdfDis === 3 ?
                                <embed
                                    id="pdf-embed"
                                    src={`${PUBLIC_NAS_FOLDER}/fileshows/SRADHA.pdf#toolbar=0&navpanes=0&view=FitH`}
                                    type="application/pdf"
                                    height={850}
                                    width="100%" />
                                :
                                pdfDis === 4 ?
                                    <embed
                                        id="pdf-embed"
                                        src={`${PUBLIC_NAS_FOLDER}/fileshows/MSDS.pdf#toolbar=0&navpanes=0&view=FitH`}
                                        type="application/pdf"
                                        height={850}
                                        width="100%" />

                                    :
                                    pdfDis === 5 ?
                                        <embed
                                            id="pdf-embed"
                                            src={`${PUBLIC_NAS_FOLDER}/fileshows/2023_MEDEF.pdf#toolbar=0&navpanes=0&view=FitH`}
                                            type="application/pdf"
                                            height={850}
                                            width="100%" />
                                        : pdfDis === 6 ?
                                            <embed
                                                id="pdf-embed"
                                                src={`${PUBLIC_NAS_FOLDER}/fileshows/Abbreviation.pdf#toolbar=0&navpanes=0&view=FitH`}
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