import React, { memo, useCallback, } from 'react'
import { Typography } from '@mui/material';
import { Box, Button, CssVarsProvider, Modal, ModalDialog, Textarea } from '@mui/joy';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';

const HoldDetails = ({ open, setholdOpen, setholdFlag, holdDetails }) => {

    const { complaint_desc, complaint_type_name, complaint_dept_name, rectify_pending_hold_remarks, pending_onhold_time, holduser, cm_hold_reason } = holdDetails

    const CloseHold = useCallback(() => {
        setholdOpen(false)
        setholdFlag(0)
    }, [setholdFlag, setholdOpen])

    return (
        <Box>
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                    <ModalDialog variant="outlined" sx={{ width: '43vw', p: 0, overflow: 'auto' }}>

                        <Typography sx={{ flex: 1, fontWeight: 600, pl: .5, color: 'white', bgcolor: '#636B74', p: 1 }}>Holding Details</Typography>
                        <Box sx={{ px: 2, mt: 1, }}>
                            <Typography sx={{ fontWeight: 600 }}>
                                Complaint Description
                            </Typography>
                            <Textarea
                                variant="outlined"
                                minRows={2}
                                value={complaint_desc}
                                readOnly
                            />
                            <Box sx={{ flex: 1, display: 'flex', gap: 1.5 }}>

                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ fontWeight: 600, pt: 1, pb: .3 }}>
                                        Complaint Type
                                    </Typography>
                                    <Textarea
                                        variant="outlined"
                                        minRows={1}
                                        value={complaint_type_name}
                                        readOnly
                                    />
                                </Box>

                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ fontWeight: 600, pt: 1, pb: .3 }}>
                                        Complaint To
                                    </Typography>
                                    <Textarea
                                        variant="outlined"
                                        minRows={1}
                                        value={complaint_dept_name}
                                        readOnly
                                    />
                                </Box>

                            </Box>

                            <Box sx={{ flex: 1, mt: 1.3 }}>
                                <Typography sx={{ fontWeight: 600, pb: .3, pl: .3, color: '#50655B' }}>
                                    Holded Reason
                                </Typography>
                                <TextFieldCustom
                                    style={{ width: "100%" }}
                                    maxRows={1}
                                    placeholder=""
                                    value={cm_hold_reason === null ? '' : cm_hold_reason}
                                    disabled
                                // readonly
                                />
                            </Box>

                            <Box sx={{ flex: 1, mt: 1, mx: .3 }}>
                                <Typography sx={{ fontWeight: 600, pt: 1, pl: .3, pb: .3 }}>
                                    Hold Remarks
                                </Typography>
                                <Textarea
                                    variant="outlined"
                                    minRows={2}
                                    value={rectify_pending_hold_remarks}
                                    readOnly
                                />
                            </Box>

                            <Box sx={{ flex: 1, mt: 1.5, textAlign: 'right' }}>
                                <Typography sx={{ fontWeight: 600, pt: 1, pb: .3, pr: 2 }}>
                                    Holded By
                                </Typography>
                                <Typography sx={{ pt: .5, pr: 2, fontSize: 14 }}>
                                    {holduser}
                                </Typography>
                                <Typography sx={{ pb: .3, pr: 2, fontSize: 12 }}>
                                    {pending_onhold_time}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ textAlign: 'right', pb: 1, mr: 1 }}>
                            <Button
                                variant='plain'
                                color='nuetral'
                                size='lg'
                                onClick={CloseHold}
                                sx={{
                                    border: 'none',
                                    transition: 'transform 0.2s, bgcolor 0.2s',
                                    '&:hover': {
                                        bgcolor: 'white',
                                        color: '#523A28',
                                        transform: 'scale(1.1)',
                                    },
                                    '&:active': {
                                        transform: 'scale(0.95)',
                                    },
                                }}

                            >Close</Button>
                        </Box>

                    </ModalDialog>
                </Modal>
            </CssVarsProvider>
        </Box>
    )
}

export default memo(HoldDetails)