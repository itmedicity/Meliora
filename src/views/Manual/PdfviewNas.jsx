import React from 'react'
import { Fragment, memo } from 'react';

const PdfviewNas = ({ pdfDis }) => {
    return (
        <Fragment>
            {
                pdfDis === 1 ?
                    <embed
                        src={"http://192.168.10.170/NAS//fileshows/GuideLine.pdf"}
                        type="application/pdf"
                        height={850}
                        width={1800} />

                    : pdfDis === 3 ?
                        <embed
                            src={"http://192.168.10.170/NAS//fileshows/GuideLine.pdf"}
                            type="application/pdf"
                            height={850}
                            width={1800} />
                        : null
            }

        </Fragment>
    )
}

export default memo(PdfviewNas)