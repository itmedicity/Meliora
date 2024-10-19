import { Box, Button, CssVarsProvider, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { format } from 'date-fns'
import React, { Fragment, memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Virtuoso } from 'react-virtuoso'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify } from 'src/views/Common/CommonCode'
import _ from 'underscore'

const StoreReceiveItemModal = ({ open, handleClose, poItems, count, setCount }) => {
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
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

    const SaveDetails = useCallback(() => {
        const groupedBySlno = poItems.reduce((acc, curr) => {
            if (!acc[curr.po_detail_slno]) {
                acc[curr.po_detail_slno] = { statuses: [], req_slno: curr.req_slno };
            }
            acc[curr.po_detail_slno].statuses.push(curr.item_receive_status);
            return acc;
        }, {});

        const patchData = Object.entries(groupedBySlno).map(([po_detail_slno, groupData]) => {
            const { statuses, req_slno } = groupData;
            let store_recieve;

            if (statuses.every(status => status === 1)) {
                store_recieve = 1;
            } else if (statuses.every(status => status === null)) {
                store_recieve = null;
            } else {
                store_recieve = 0;
            }

            return {
                po_detail_slno: Number(po_detail_slno),
                store_recieve: store_recieve,
                store_receive_user: id,
                store_receive_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                req_slno: req_slno
            };
        });

        const updateStoreReceiveStatus = async (patchData) => {
            const result = await axioslogin.post('/newCRFStore/storeReceive', patchData);
            return result.data
        }
        updateStoreReceiveStatus(patchData).then((val) => {
            const { success, message } = val
            if (success === 1) {
                setCount(count + 1)
                succesNotify(message)
                handleClose()
            } else {

            }
        })

    }, [poItems, count, setCount, handleClose, id])


    const ResetDetails = useCallback(() => {
        handleClose()
    }, [handleClose])

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
                        sx={{
                            minWidth: '50vw',
                            minHeight: 300,
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
                                height: 35, width: 35
                            }}
                        />
                        <Box sx={{ mx: 0.5 }}>
                            <Typography sx={{ fontWeight: 550, fontSize: 18, color: '#003B73', fontFamily: 'system-ui' }}>
                                Item Details</Typography>
                        </Box>
                        <Paper elevation={3} sx={{ mt: 0.2, overflow: 'auto' }}>
                            < Box display="flex" flexDirection="column" >
                                <Box display="flex" justifyContent="space-between" padding={0.5} sx={{ bgcolor: '#274472', height: 30, }}>
                                    <Typography sx={{ width: 50, textAlign: 'center', fontWeight: 550, fontSize: 13, color: 'white' }}>Sl.No</Typography>
                                    <Typography sx={{ width: 100, textAlign: 'center', fontWeight: 550, fontSize: 13, color: 'white' }}>Item Code</Typography>
                                    <Typography sx={{ width: 350, textAlign: 'left', fontWeight: 550, fontSize: 13, color: 'white' }}>Item</Typography>
                                    <Typography sx={{ width: 80, textAlign: 'center', fontWeight: 550, fontSize: 13, color: 'white' }}>Qnty</Typography>
                                    <Typography sx={{ width: 100, textAlign: 'center', fontWeight: 550, fontSize: 13, color: 'white' }}>Received Qnty</Typography>
                                    <Typography sx={{ width: 100, textAlign: 'center', fontWeight: 550, fontSize: 13, color: 'white' }}>GRN Qnty</Typography>
                                </Box>
                                <Virtuoso
                                    style={{ minHeight: 400, maxHeight: 700 }}
                                    data={poItems}
                                    itemContent={(index, val) => (
                                        <React.Fragment key={index}>
                                            <Box display="flex" justifyContent="space-between" sx={{ borderBottom: '1px solid lightgrey', overflow: 'auto' }}>
                                                <Typography sx={{ width: 50, textAlign: 'center', fontSize: 12, my: 1 }}>{index + 1}</Typography>
                                                <Typography sx={{ width: 100, textAlign: 'center', fontSize: 12, my: 1 }}>{val.item_code}</Typography>
                                                <Typography sx={{ width: 350, textAlign: 'left', fontSize: 12, my: 1 }}>{val.item_name}</Typography>
                                                <Typography sx={{ width: 80, textAlign: 'center', fontSize: 12, my: 1 }}>{val.item_qty}</Typography>
                                                <Typography sx={{
                                                    width: 100, textAlign: 'center', fontSize: 12, my: 1, fontWeight: 550,
                                                    color: (val.received_qnty === val.item_qty) ? '#1b5e20' : '#e65100'
                                                }}>{val.received_qnty}</Typography>
                                                <Typography sx={{ width: 100, textAlign: 'center', fontSize: 12, my: 1 }}>{val.grn_qnty}</Typography>
                                            </Box>

                                        </React.Fragment>
                                    )}
                                />
                            </Box>
                        </Paper>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <Box sx={{ pt: 0.4 }}>
                                <Button
                                    variant="plain"
                                    sx={buttonStyle}
                                    onClick={SaveDetails}
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
        </Fragment>
    )
}

export default memo(StoreReceiveItemModal)