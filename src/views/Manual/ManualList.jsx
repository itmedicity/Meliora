import { Box, Paper } from '@mui/material'
import React, { useState } from 'react'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import Button from '@mui/material/Button';
import PdfviewNas from './PdfviewNas'
const ManualList = () => {
    const history = useHistory()
    const [pdfDis, setPdfDis] = useState(0)
    const ns = () => {
        setPdfDis(1)
    }
    const ns1 = () => {
        setPdfDis(2)
    }
    const ns2 = () => {
        setPdfDis(3)
    }
    const backToSettings = useCallback(() => {
        history.push(`/Home/Manual`)
        setPdfDis(0)
    }, [history])

    return (
        <CardCloseOnly
            title='Manual'
            close={backToSettings}
        >
            {
                pdfDis === 0 ? <Box sx={{ width: "100%", p: 1 }}>
                    <Paper sx={{ p: 2 }} >
                        <Box sx={{
                            width: "100%",
                            display: "flex", pl: 5,
                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                            justifyContent: "center"
                        }}>

                            <Box sx={{
                                display: 'flex',
                                width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                                mt: 1,
                                // bgcolor: "cyan",
                                justifyContent: "left"
                            }} >
                                <Button size="small" onClick={() => ns()}> Nusing Station</Button>

                            </Box>
                            <Box sx={{
                                display: 'flex',
                                width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                                mt: 1,
                                // bgcolor: "cyan",
                                justifyContent: "left"
                            }} >
                                <Button size="small" onClick={() => ns1()}> Nusing Station 1</Button>

                            </Box>
                            <Box sx={{
                                display: 'flex',
                                width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                                mt: 1,
                                // bgcolor: "cyan",
                                justifyContent: "left"
                            }} >
                                <Button size="small" onClick={() => ns2()}> Nusing Station 2</Button>

                            </Box>
                        </Box>
                    </Paper>
                </Box >
                    : <PdfviewNas pdfDis={pdfDis} />
            }


        </CardCloseOnly >
    )
}

export default ManualList