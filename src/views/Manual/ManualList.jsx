import { Box, Typography } from '@mui/material'
import React, { useState, memo, useCallback } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import Button from '@mui/material/Button';
import PdfviewNas from './PdfviewNas'

const ManualList = () => {
    const history = useHistory()
    const [pdfDis, setPdfDis] = useState(0)
    const employeeGuide = () => {
        setPdfDis(1)
    }

    const backToSettings = useCallback(() => {
        history.push(`/Home`)
        setPdfDis(0)
    }, [history])

    return (
        <CardCloseOnly
            title='Documents'
            close={backToSettings}
        >
            {
                pdfDis === 0 ?
                    <Box sx={{ width: "100%", p: 1 }}>
                        <Typography sx={{ fontSize: 15, font: 'Roboto', textTransform: "capitalize" }} >NABH GuideLines</Typography>
                        <Button size="small" sx={{ pt: 1.5, pl: 2, pb: 1, fontSize: 15, font: 'Roboto', textTransform: "capitalize" }} onClick={() => employeeGuide()}> employee guide</Button>
                    </Box >
                    :
                    <PdfviewNas pdfDis={pdfDis} />
            }
        </CardCloseOnly >
    )
}

export default memo(ManualList)