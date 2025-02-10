
import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog, Table } from '@mui/joy'
import { format } from 'date-fns'
import React, { memo } from 'react'

const GrnViewModal = ({ modalDatas, handleClose, open, itemName }) => {
    return (
        <Box>
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={handleClose}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <ModalDialog
                        variant="outlined"
                        sx={{
                            width: '30vw',
                            minHeight: 150,
                            overflow: 'auto'
                        }}
                    >
                        <ModalClose
                            variant="outlined"
                            sx={{
                                m: 1,
                                top: 'calc(-1/4 * var(--IconButton-size))',
                                right: 'calc(-1/4 * var(--IconButton-size))',
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: 'background.body',
                                color: '#bf360c',
                                height: 25, width: 25
                            }}
                        />
                        <Box sx={{ mx: 0.5, fontWeight: 550, fontSize: 15, fontFamily: 'system-ui' }}>
                            GRN Details
                        </Box>
                        <Box sx={{ mx: 0.5, fontWeight: 550, fontSize: 13, color: '#607d8b', fontFamily: 'system-ui' }}>
                            {itemName}
                        </Box>
                        <Box variant="outlined" sx={{ overflow: 'auto', maxHeight: window.innerHeight - 50, padding: 'none' }}>
                            <CssVarsProvider>
                                <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' stickyFooter hoverRow >
                                    <thead style={{ alignItems: 'center' }}>
                                        <tr style={{ height: 0.5 }}>
                                            <th size='sm' style={{ borderRadius: 0, width: 60, fontWeight: 650, fontSize: 14, textAlign: 'center', backgroundColor: '#A9D1E4' }}>&nbsp; Sl.No</th>
                                            <th size='sm' style={{ width: 80, fontWeight: 650, fontSize: 14, backgroundColor: '#A9D1E4' }}>&nbsp;GRN No.</th>
                                            <th size='sm' style={{ borderRadius: 0, width: 120, fontWeight: 650, fontSize: 14, backgroundColor: '#A9D1E4' }}>&nbsp;Date</th>
                                        </tr>
                                    </thead>
                                    <tbody size='small'>
                                        {modalDatas?.map((val, index) => {
                                            return (< tr key={index} size='small'
                                                style={{ maxHeight: 2, cursor: 'pointer' }}  >
                                                <td size='sm' style={{ fontSize: 12, height: 5, textAlign: 'center' }}>{index + 1}</td>
                                                <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.GR_NO}</td>
                                                <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{format(new Date(val.GRD_DATE), 'dd-MM-yyyy')}</td>
                                            </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </CssVarsProvider>
                        </Box>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider>
        </Box >
    )
}

export default memo(GrnViewModal)

