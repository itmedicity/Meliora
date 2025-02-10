import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { format } from 'date-fns';
import React, { Fragment, memo } from 'react'

const ItemReturnViewModal = ({ open, handleClose, modalData, itemName }) => {
    const { return_user, return_remarks, return_date, store_issue_remarks, store_rply_user, issued_date } = modalData[0]
    const capitalizeWords = (str) => str ? str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
    return (
        <Fragment>
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
                    >
                        <ModalClose
                            variant="outlined"
                            sx={{
                                m: 0.5,
                                top: 'calc(-1/4 * var(--IconButton-size))',
                                right: 'calc(-1/4 * var(--IconButton-size))',
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: 'background.body',
                                color: '#bf360c',
                                height: 25, width: 25
                            }}
                        />
                        <Box sx={{
                            width: '35vw',
                            minHeight: 200,
                            overflow: 'auto'
                        }}>
                            <Box sx={{ bgcolor: '#e3f2fd', py: 1, px: 2, position: 'sticky', borderBottom: '1px solid lightgrey' }}>
                                <Typography sx={{ fontWeight: 550, fontSize: 16 }}> {itemName}</Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    p: 2,
                                    border: '1px solid #ddd',
                                    borderRadius: 2,
                                    backgroundColor: '#f9f9f9',
                                }}
                            >

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        maxWidth: '70%',
                                        alignSelf: 'flex-start',
                                        p: 2,
                                        // border: '1px solid #ddd',
                                        // borderRadius: 10,
                                        backgroundColor: 'white',
                                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <Typography sx={{ fontSize: 14, fontWeight: 550, mb: 1 }}>
                                        {(return_remarks)}
                                    </Typography>
                                    <Typography sx={{ fontSize: 13, color: '#555' }}>
                                        {capitalizeWords(return_user)} · {format(new Date(return_date), 'dd-MM-yyyy hh:mm a')}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        maxWidth: '70%',
                                        alignSelf: 'flex-end',
                                        p: 2,
                                        // border: '1px solid #ddd',
                                        // borderRadius: 10,
                                        backgroundColor: 'white',
                                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <Typography sx={{ fontSize: 14, fontWeight: 550, mb: 1, textAlign: 'right' }}>
                                        {(store_issue_remarks) || 'Not Updated'}
                                    </Typography>
                                    <Typography sx={{ fontSize: 13, color: '#555' }}>
                                        {capitalizeWords(store_rply_user) || 'Not Updated'} ·{' '}
                                        {issued_date ? format(new Date(issued_date), 'dd-MM-yyyy hh:mm a') : 'Not Updated'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(ItemReturnViewModal)