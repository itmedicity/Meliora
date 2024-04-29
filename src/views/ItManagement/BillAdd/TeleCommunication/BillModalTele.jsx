import { Box, Modal, ModalDialog, Tooltip } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import BillFile from '../FileView/BillFile';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { infoNotify } from 'src/views/Common/CommonCode';

const BillModalTele = ({ modalOpen, setModalFlag, setModalOpen, billDatas, filezUrls }) => {

    const { it_bill_type_name, it_bill_category_name, bill_name, bill_number, bill_tariff, bill_amount, bill_date, bill_paid_date, bill_due_date } = billDatas

    const [billViewmodalFlag, setBillViewModalFlag] = useState(0)
    const [billViewmodalOpen, setBillViewModalOpen] = useState(false)


    const handleClose = useCallback(() => {
        // ResetModal()
        setModalFlag(0)
        setModalOpen(false)
    }, [setModalFlag, setModalOpen,
        // ResetModal
    ])

    const openBillModal = useCallback(() => {
        if (filezUrls.length !== 0) {
            setBillViewModalFlag(1)
            setBillViewModalOpen(true)
        }
        else {
            infoNotify('No Bills Attached')
        }
    }, [filezUrls])

    return (
        <Box >
            {billViewmodalFlag === 1 ?
                <BillFile
                    billViewmodalOpen={billViewmodalOpen} setBillViewModalOpen={setBillViewModalOpen}
                    setBillViewModalFlag={setBillViewModalFlag} filezUrls={filezUrls} /> : null}
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={modalOpen}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10, }}>
                <ModalDialog variant="outlined"
                    sx={{ width: 650, bgcolor: '#1896A0' }}>
                    <Box>
                        <Box sx={{ flex: 1, textAlign: 'right' }}> <Tooltip title="Close">
                            < HighlightOffSharpIcon sx={{
                                cursor: 'pointer',
                                color: 'white',
                                height: 25, width: 25,
                                '&:hover': {
                                    color: '#5C97B8',
                                },
                            }}
                                onClick={handleClose}
                            />
                        </Tooltip></Box>
                        <Box sx={{ flex: 1, }}>
                            <Box sx={{ flex: 1, textAlign: 'center' }}> <TaskAltIcon sx={{
                                fontSize: 45,
                                color: 'white'
                            }} /></Box>
                            <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 600, fontSize: 20, color: 'white', fontStyle: 'Georgia' }}>{it_bill_type_name}</Box>
                            <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 600, fontSize: 15, color: 'white' }}>{bill_name}</Box>
                        </Box>
                    </Box>
                    <Box sx={{ overflow: 'auto', px: 2, bgcolor: 'white', borderRadius: 10, pb: 1 }}>
                        <Box sx={{
                            flex: 1, textAlign: 'center', fontWeight: 600, fontSize: 20, color: '#4C5270', fontFamily: 'Georgia',
                            borderColor: '#CAD7E0', pt: 1
                        }}>
                            Bill Details</Box>
                        <Box sx={{ flex: 1, mt: 1, pt: .5, display: 'flex' }}>
                            <Box sx={{ flex: 3, fontSize: 13, fontWeight: 800, }}>
                                Bill Category</Box>
                            <Box sx={{ flex: 5, fontSize: 15, textAlign: 'right', fontWeight: 600, }}>{it_bill_category_name}</Box>
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, pt: .5, display: 'flex' }}>
                            <Box sx={{ flex: 1, fontSize: 13, fontWeight: 800, }}>
                                Bill Tariff</Box>
                            <Box sx={{ flex: 5, fontSize: 15, textAlign: 'right', fontWeight: 600, }}>{bill_tariff === 1 ? 'Monthly' : bill_tariff === 2 ? "Qaurterly" : bill_tariff === 3 ? 'Yearly' : 'Others'}</Box>
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, pt: .5, display: 'flex' }}>
                            <Box sx={{ flex: 3, fontSize: 13, fontWeight: 800, }}>
                                Bill Number/Invoice number</Box>
                            <Box sx={{ flex: 5, fontSize: 15, textAlign: 'right', fontWeight: 600, }}>{bill_number}</Box>
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, pt: .5, display: 'flex' }}>
                            <Box sx={{ flex: 3, fontSize: 13, fontWeight: 800, }}>
                                Bill Date</Box>
                            <Box sx={{ flex: 5, fontSize: 15, textAlign: 'right', fontWeight: 600, }}>{bill_date}</Box>
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, pt: .5, display: 'flex' }}>
                            <Box sx={{ flex: 3, fontSize: 13, fontWeight: 800, }}>
                                Bill Duedate</Box>
                            <Box sx={{ flex: 5, fontSize: 15, textAlign: 'right', fontWeight: 600, }}>{bill_due_date}</Box>
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, pt: .5, display: 'flex' }}>
                            <Box sx={{ flex: 3, fontSize: 13, fontWeight: 800, }}>
                                Bill Paid Date</Box>
                            <Box sx={{ flex: 5, fontSize: 15, textAlign: 'right', fontWeight: 600, }}>{bill_paid_date}</Box>
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, pt: .5, display: 'flex' }}>
                            <Box sx={{ flex: 3, fontSize: 13, fontWeight: 800, }}>
                                Bill Amount</Box>
                            <Box sx={{ flex: 5, fontSize: 18, textAlign: 'right', fontWeight: 700, color: '#385E72' }}><CurrencyRupeeIcon fontSize='md' sx={{ color: '#385E72' }} />{bill_amount}</Box>
                        </Box>
                        <Box sx={{ flex: 1, pt: .5, display: 'flex' }}>
                            <Box sx={{
                                m: .5, borderRadius: 8, width: 134, pl: 1, fontSize: 13, bgcolor: '#5F7950', color: '#F8F8F0', py: .5, cursor: 'pointer',
                                '&:hover': {
                                    boxShadow: '1px 2px 10px'
                                    , bgcolor: '#A4AA83',
                                    color: '#4C411A'
                                },
                            }}
                                onClick={openBillModal}>
                                <FilePresentIcon sx={{
                                    cursor: 'pointer', color: '#F8F8F0', height: 23, width: 23,
                                    '&:hover': {
                                        color: '#4C411A'
                                    },
                                }} />&nbsp;Uploaded bills
                            </Box>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box>
    )
}

export default memo(BillModalTele)