import { Box, Modal, ModalDialog, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import ReportViewTable from '../FunctionalComponents/ReportViewTable'
import CloseIcon from '@mui/icons-material/Close';
import CusIconButton from 'src/views/Components/CusIconButton';
import DownloadIcon from '@mui/icons-material/Download';
import { DownloadReportPdf } from '../FunctionalComponents/DownloadReportPdf';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { ExporttoExcel } from '../FunctionalComponents/ExpertToExcel';

const ReportModal = ({ open, handleClose, tableData, reportName, headerNames1, headerNames2 }) => {
    const [excelData, setExcelData] = useState([])
    const fileName = "QI Daily Report";
    const pdfDownlloadView = useCallback((e) => {
        DownloadReportPdf(reportName, tableData, headerNames1, headerNames2)
    }, [reportName, tableData, headerNames1, headerNames2])

    useEffect(() => {
        if (tableData.length !== 0) {
            const newData = tableData?.map((val) => {
                return {
                    date: val.date,
                    data1: val.data1,
                    data2: val.data2,
                    data3: val.data3
                }
            })
            setExcelData(newData)
        }
    }, [tableData])

    const ExcelView = useCallback((e) => {
        ExporttoExcel(reportName, excelData, headerNames1, headerNames2, fileName)
    }, [reportName, excelData, headerNames1, headerNames2, fileName])
    return (
        <Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}
            >
                <ModalDialog variant="none"
                    sx={{

                        width: '90vw',
                        borderRadius: 'md',

                    }}
                >
                    <Paper sx={{ display: 'flex' }}>
                        <Box sx={{ display: 'flex', flex: 1, fontSize: 18, pt: 0.8, justifyContent: 'center', bgcolor: '#DBE8D8' }}>
                            <Typography sx={{ color: 'darkgreen', fontSize: 16, textTransform: 'uppercase' }}>
                                {reportName}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pt: 0.5, bgcolor: '#DBE8D8', opacity: 0.8 }}>
                            <CusIconButton size="sm" variant="outlined" color="primary"  >
                                <Tooltip title="Excel" placement="bottom" >
                                    <DownloadIcon sx={{ cursor: 'pointer', size: 'lg', width: 35, height: 25, color: 'darkgreen' }}
                                        onClick={ExcelView} />
                                </Tooltip>
                            </CusIconButton>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pt: 0.5, bgcolor: '#DBE8D8', opacity: 0.8 }}>
                            <CusIconButton size="sm" variant="outlined" color="primary"  >
                                <Tooltip title="PDF" placement="bottom" >
                                    <PictureAsPdfIcon sx={{ cursor: 'pointer', size: 'lg', width: 35, height: 25, color: 'darkgreen' }}
                                        onClick={pdfDownlloadView} />
                                </Tooltip>
                            </CusIconButton>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pt: 0.5, pl: 0.5, bgcolor: '#DBE8D8', opacity: 0.8 }}>
                            <CusIconButton size="sm" variant="outlined" color="primary"  >
                                <Tooltip title="Close" placement="bottom" >
                                    <CloseIcon sx={{ cursor: 'pointer', size: 'lg', width: 35, height: 25, color: 'darkgreen' }}
                                        onClick={handleClose} />
                                </Tooltip>
                            </CusIconButton>
                        </Box>
                    </Paper>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 2, }}>
                            <ReportViewTable tableData={tableData} headerNames1={headerNames1} headerNames2={headerNames2} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            gghgh
                        </Box>

                    </Box>
                    <Box sx={{ height: 30 }}>

                    </Box>
                </ModalDialog>
            </Modal>
        </Fragment >
    )
}

export default memo(ReportModal)