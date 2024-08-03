import { Box, Button, Chip, CssVarsProvider, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback } from 'react'

const PoAddModalView = ({ poAddModalData, pomodalopen, handleClose }) => {
    console.log(poAddModalData);
    // const { req_slno,
    //     po_number,
    //     po_date,
    //     supplier_name,

    //     supply_store: storeSlno,
    //     storeName: capitalizeWords(storeName),
    //     expected_delivery: POD_EDD !== null ? format(new Date(POD_EDD), 'dd-MM-yyyy') : null,
    //     po_delivery: capitalizeWords(POC_DELIVERY),
    //     po_amount: PON_AMOUNT,
    //     items: xx}
    const buttonStyle = {
        fontSize: 17,
        color: '#003B73',
        cursor: 'pointer',
        boxShadow: 5,
        border: 'none',
        transition: 'transform 0.2s, bgcolor 0.2s',
        '&:hover': {
            bgcolor: 'white',
            color: '#003B73',
            transform: 'scale(1.1)',
        },
        '&:active': {
            transform: 'scale(0.95)',
        },
    }
    const SaveincidetData = useCallback(() => {
    }, [])

    const ResetDetails = useCallback(() => {
    }, [])
    return (
        <Fragment>
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={pomodalopen}
                    onClose={handleClose}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', }}
                >
                    <ModalDialog
                        variant="outlined"
                        sx={{
                            width: '50vw',
                            maxHeight: window.innerHeight - 240
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
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ p: 1 }}>
                                    <Typography>Order</Typography>
                                </Box>
                                <Box>
                                    <Chip></Chip>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 1 }}>
                            <Box sx={{ pt: 0.4 }}>
                                <Button
                                    variant="plain"
                                    sx={buttonStyle}
                                    onClick={SaveincidetData}
                                >
                                    Save
                                </Button>
                            </Box>
                            <Box sx={{ pr: 2, pt: 0.4 }}>
                                <Button
                                    variant="plain"
                                    sx={buttonStyle}
                                    onClick={ResetDetails}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    </ModalDialog>
                </Modal>

            </CssVarsProvider>
        </Fragment >
    )
}

export default memo(PoAddModalView)