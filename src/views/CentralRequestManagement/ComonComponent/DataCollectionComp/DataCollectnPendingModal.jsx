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
                        <Box sx={{ minWidth: '60vw', overflowY: 'auto' }}>
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    mx: 1,
                                    py: 0.5,
                                    color: '#145DA0',
                                    fontSize: 16,
                                    flex: 1,
                                }}
                            >
                                Data collection is incomplete. Please complete it before proceeding with approval.
                            </Typography>

                            {datacollectdata?.map((val, ind) => (
                                <Box key={ind}>
                                    <Paper variant="outlined" sx={{ p: 1, pt: 0.5 }}>
                                        <Box sx={{ display: 'flex', pb: 0.5 }}>
                                            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5, fontWeight: 550 }}>
                                                Data Collection Pending Department
                                            </Typography>
                                            <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                            <Typography sx={{ fontSize: 14, flex: 1, pt: 0.2 }}>
                                                {capitalizeWords(val.data_entered)}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', pb: 0.5 }}>
                                            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5, fontWeight: 550 }}>
                                                Requested by
                                            </Typography>
                                            <Box sx={{ display: 'flex', flex: 1 }}>
                                                <Typography> :&nbsp;</Typography>
                                                <Typography sx={{ fontSize: 14, pt: 0.2 }}>
                                                    {capitalizeWords(val.req_user)}
                                                </Typography>
                                                <Typography sx={{ fontSize: 14, pl: 2, pt: 0.2 }}>
                                                    {format(new Date(val.create_date), 'dd-MM-yyyy hh:mm:ss a')}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', pb: 0.5 }}>
                                            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5, fontWeight: 550 }}>
                                                Requested Remarks
                                            </Typography>
                                            <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                                            <Typography sx={{ fontSize: 14, flex: 1, pt: 0.2 }}>
                                                {val.crf_req_remark}
                                            </Typography>
                                        </Box>

                                        {datacollectdata.length > 1 && (
                                            <Divider sx={{ border: '1px solid grey' }} />
                                        )}
                                    </Paper>
                                </Box>
                            ))}
                        </Box>

                    </ModalDialog>
                </Modal>
            </CssVarsProvider >
        </Fragment >
    )
}

export default memo(DataCollectnPendingModal)