import { Box, Divider, Modal, ModalClose, ModalDialog } from '@mui/joy';
import { CssVarsProvider, Typography } from '@mui/joy';
import { Paper } from '@mui/material';
import { format } from 'date-fns';
import React, { Fragment, memo } from 'react'

const DataCollectnPendingModal = ({ open, handleClose, datacollectdata, }) => {

    const capitalizeWords = (str) =>
        str
            ? str
                .toLowerCase()
                .trim()
                .replace(/\s+/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            : '';
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
                        sx={{ height: 'auto' }}
                    // sx={{
                    //     minWidth: '45vw',
                    // }}
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
                        <Box sx={{}}>
                            <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 16, flex: 1 }}>
                                Data collection is incomplete. Please complete it before proceeding with approval.
                            </Typography>
                            {datacollectdata?.map((val, ind) => {
                                return <Box key={ind} >
                                    <Paper variant='outlined' sx={{ pt: 0.5, p: 1 }}>
                                        <Box sx={{ display: 'flex', pb: 0.5 }}>
                                            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.7 }}>Data Collection Pending Department</Typography>
                                            <Typography sx={{ fontSize: 14, fontWeight: 550, flex: 1 }}>
                                                : &nbsp;  {capitalizeWords(val.data_entered)}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', pb: 0.5 }}>
                                            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.7 }}>Requested Remarks</Typography>
                                            <Typography sx={{ fontSize: 14, fontWeight: 550, flex: 1, alignItems: 'center' }}>
                                                : &nbsp;  {val.crf_req_remark}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', pb: 0.5 }}>
                                            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.7 }}>Requested by</Typography>
                                            <Box sx={{ display: 'flex', flex: 1 }}>
                                                <Typography sx={{ fontSize: 14, fontWeight: 550, }}>
                                                    : &nbsp;  {capitalizeWords(val.req_user)}</Typography>
                                                <Typography sx={{ fontSize: 14, fontWeight: 550, pl: 2 }}>
                                                    {format(new Date(val.create_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                            </Box>
                                        </Box>
                                        {datacollectdata.length > 1 ?
                                            <Divider sx={{ border: '1px solid grey' }} />
                                            : null}
                                    </Paper>
                                </Box>
                            })
                            }
                        </Box>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider>
        </Fragment >
    )
}

export default memo(DataCollectnPendingModal)