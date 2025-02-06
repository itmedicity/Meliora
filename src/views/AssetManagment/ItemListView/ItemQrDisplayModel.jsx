import React, { memo, useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import { QRCodeSVG } from 'qrcode.react';
import { format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios';
import { Box, Button, CssVarsProvider, Modal, ModalDialog } from '@mui/joy';

const ItemQrDisplayModel = ({ open, handleClose, selectedData }) => {
    const { am_item_map_slno, am_spare_item_map_slno, assetno } = selectedData

    const ref = useRef();
    const handlePrint = useReactToPrint({
        content: () => ref.current,
    });

    const [dueDate, setDueDate] = useState('')
    useEffect(() => {
        const checkinsertOrNotAMCPM = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/AmcPmInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { due_date } = data[0]
                const pmDueDate = due_date !== null ? format(new Date(due_date), "dd/MM/yyyy") : ''
                setDueDate(pmDueDate)
            }
            else {
                setDueDate('')
            }
        }

        const checkinsertOrNotAMCPMSpare = async (am_spare_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/AmcPmInsertOrNotSpare/${am_spare_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { due_date } = data[0]
                const pmDueDate = due_date !== null ? format(new Date(due_date), "dd/MM/yyyy") : ''
                setDueDate(pmDueDate)
            }
            else {
                setDueDate('')
            }
        }

        if (am_item_map_slno !== undefined || am_item_map_slno !== null) {
            checkinsertOrNotAMCPM(am_item_map_slno)
        } else if (am_spare_item_map_slno !== undefined || am_spare_item_map_slno !== null) {
            checkinsertOrNotAMCPMSpare(am_spare_item_map_slno)
        }
    }, [am_item_map_slno, am_spare_item_map_slno])


    return (
        <Box>
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10, }}>
                    <ModalDialog variant="outlined"
                        sx={{ width: 300, p: 0, overflow: 'auto', border: 1, }}>
                        <Box sx={{ width: '100%', height: '90%', borderRadius: 1, border: '0.1px solid #454545' }}>
                            <Box id="alert-dialog-slide-descriptiona" sx={{ fontWeight: 'bold', textAlign: 'center', height: '50px', pt: 1 }}>
                                QR Display
                            </Box>
                            <Box sx={{
                                width: 250,
                                height: 120,
                                flexDirection: 'column',
                            }}>

                                <div ref={ref} style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-evenly" }} >
                                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                                        <QRCodeSVG
                                            value={assetno}
                                            size={100}
                                            level='Q'
                                            includeMargin={false}
                                            style={{
                                                marginTop: 15,
                                                height: 80,
                                                width: 145,
                                            }}
                                        />
                                        <div
                                            style={{
                                                width: 145,
                                                fontSize: 12,
                                                fontWeight: 800,
                                                fontFamily: 'Arial, Helvetica, sans-serif',
                                                textAlign: 'center',
                                                marginTop: -2
                                            }}
                                        >{assetno}</div>
                                        {
                                            dueDate !== '' ?
                                                <div
                                                    style={{
                                                        width: 145,
                                                        fontSize: 12,
                                                        fontWeight: 800,
                                                        fontFamily: 'Arial, Helvetica, sans-serif',
                                                        textAlign: 'center',
                                                        marginTop: -2
                                                    }}
                                                >PM:{dueDate}</div> : null
                                        }

                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', }} >
                                        <QRCodeSVG
                                            value={assetno}
                                            size={100}
                                            level='Q'
                                            includeMargin={false}
                                            style={{
                                                marginTop: 15,
                                                height: 80,
                                                width: 110,
                                                pl: 5
                                            }}
                                        />
                                        <div
                                            style={{
                                                width: 110,
                                                fontSize: 12,
                                                fontWeight: 800,
                                                fontFamily: 'Arial, Helvetica, sans-serif',
                                                textAlign: 'center',
                                                marginTop: -2
                                            }}
                                        >{assetno}</div>
                                        {
                                            dueDate !== '' ?
                                                <div
                                                    style={{
                                                        width: 110,
                                                        fontSize: 12,
                                                        fontWeight: 800,
                                                        fontFamily: 'Arial, Helvetica, sans-serif',
                                                        textAlign: 'center',
                                                        marginTop: -2
                                                    }}
                                                >PM:{dueDate}</div> : null
                                        }
                                    </div>
                                </div>


                            </Box>
                            <Box sx={{ flex: 1, py: 1, textAlign: 'right', pr: .5 }}>
                                <Button variant='plain' onClick={handlePrint} >Print</Button>
                                <Button variant='plain' onClick={handleClose}>Cancel</Button>
                            </Box>
                        </Box>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider>
        </Box>
    )
}

export default memo(ItemQrDisplayModel)
