import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog, Table, Typography } from '@mui/joy'
import React, { Fragment } from 'react'

const PendingItemDetailsTable = ({ modalData, modalopen, handleClose, store }) => {

    return (
        <Fragment>
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={modalopen}
                    onClose={handleClose}
                    width='lg'
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', }}
                >
                    <ModalDialog
                        variant="outlined"
                        // sx={{
                        //     width: '80vw',
                        //     overflow: 'auto'
                        // }}
                        sx={{
                            // position: 'fixed',
                            transform: 'translateX(-50%)',
                            width: '70vw',
                            maxWidth: '80vw',
                            marginTop: '40px'
                        }}
                    >
                        <ModalClose
                            variant="outlined"
                            sx={{
                                top: 'calc(-1/4 * var(--IconButton-size))',
                                right: 'calc(-1/4 * var(--IconButton-size))',
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: 'background.body',
                                color: '#bf360c',
                                height: 35, width: 35
                            }}
                        />
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 14, fontWeight: 550, pl: 3 }}>Store : {store}</Typography>
                        </Box>
                        <Box>
                            <Box sx={{ flexWrap: 'wrap' }}>
                                <Box variant="outlined" sx={{ maxHeight: window.innerHeight - 220, overflow: 'auto', '&::-webkit-scrollbar': { height: 8 } }}>
                                    <CssVarsProvider>
                                        <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' stickyFooter hoverRow>
                                            <thead style={{ alignItems: 'center' }}>
                                                <tr style={{ height: 0.5 }}>
                                                    <th size='sm' style={{ width: 60, fontSize: 14, textAlign: 'center' }}>&nbsp; Sl.No</th>
                                                    <th size='sm' style={{ width: 80, fontSize: 14 }}>&nbsp;Item Code</th>
                                                    <th size='sm' style={{ width: 170, fontSize: 14 }}>&nbsp;Item</th>
                                                    <th size='sm' style={{ width: 80, fontSize: 14 }}>&nbsp;Qnty</th>
                                                    <th size='sm' style={{ width: 80, fontSize: 14 }}>&nbsp;Rate </th>
                                                    <th size='sm' style={{ width: 100, fontSize: 14 }}>&nbsp;MRP</th>
                                                    <th size='sm' style={{ width: 120, fontSize: 14 }}>&nbsp;Tax</th>
                                                    <th size='sm' style={{ width: 80, fontSize: 14 }}>&nbsp;Tax Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody size='small'>
                                                {modalData?.map((val) => (
                                                    <tr key={val.slno} size='small' style={{ maxHeight: 2, cursor: 'pointer' }}>
                                                        <td size='sm' style={{ fontSize: 12, height: 5, textAlign: 'center' }}>{val.slno}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.item_code}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.item_name}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.item_qty}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.item_rate}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.item_mrp}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.tax}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.tax_amount}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Box>
                    </ModalDialog>
                </Modal>

            </CssVarsProvider>
        </Fragment >
    )
}

export default PendingItemDetailsTable