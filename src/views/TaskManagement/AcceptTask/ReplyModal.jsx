import { Box, Button, CssVarsProvider, DialogActions, Divider, Modal, ModalDialog, Typography } from '@mui/joy'
import React, { memo, useCallback, } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import InsertInvitationSharpIcon from '@mui/icons-material/InsertInvitationSharp';
import { format } from 'date-fns';

const ReplyModal = ({ open, setReplyOpen, setReplyflag, valuee, }) => {
    const { tm_task_name, tm_task_due_date, tm_query_remark, tm_query_reply_date, reply_empname, tm_query_reply } = valuee
    let capEmpName = reply_empname.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const QueryClose = useCallback(() => {
        setReplyflag(0)
        setReplyOpen(false)
    }, [setReplyOpen, setReplyflag])

    return (
        <Box>
            <CssVarsProvider>
                <Modal
                    open={open}
                >
                    < ModalDialog
                        sx={{
                            width: '33vw',

                            p: 0,
                            overflow: 'auto'
                        }}
                    >
                        <Box>
                            <Box sx={{ flex: 1, display: 'flex', mt: 1, p: 1, }}>
                                <Box sx={{ flex: 1, color: 'lightgrey', }}>
                                    Task Management
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                    <CancelIcon sx={{ color: 'darkred', cursor: 'pointer' }} onClick={QueryClose} />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', bgcolor: '#92443A', height: 50, }}>
                                <Typography sx={{ color: 'white', pl: 1, pt: 1, fontWeight: 600, fontSize: 16 }}>
                                    Raise a Query
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', mt: 1, mx: 2 }}>
                                <Box sx={{ flex: 3 }}>
                                    <Typography sx={{ pl: .5, fontWeight: 600, color: '#523A28' }}><AssignmentSharpIcon sx={{ p: .3, color: '#523A28' }} /><u>Task</u></Typography>
                                    <Typography sx={{ px: 1.5, fontSize: 14, color: 'grey', }}>{tm_task_name}</Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ pl: .1, fontWeight: 600, color: '#523A28' }}><InsertInvitationSharpIcon sx={{ p: .3, color: '#523A28' }} /><u>Duedate</u></Typography>
                                    <Typography sx={{ px: 1, fontSize: 12, color: 'grey', fontWeight: 600 }}>
                                        {format(new Date(tm_task_due_date), 'MMM dd, yyyy HH:mm:ss')}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ flex: 1, mx: 2.3 }}>

                                <Typography sx={{ mt: 1, pl: .5, color: '#92443A' }}>Raised Query ?</Typography>

                                <Box sx={{ flex: 1, px: 1, border: 1, borderRadius: 8, minHeight: 100, borderColor: '#92443A', pt: 1 }}>
                                    {tm_query_remark}
                                </Box>

                            </Box>

                            <Divider sx={{ '--Divider-childPosition': `5%`, fontWeight: 400, fontSize: 18, color: 'grey', mb: 1, mt: 2, mx: 1 }}>Reply Details</Divider>

                            <Box sx={{ flex: 1, display: 'flex', mt: 1, mx: 2 }}>
                                <Box sx={{ flex: 3 }}>
                                    <Typography sx={{ pl: 1.5, fontWeight: 600, color: '#523A28' }}><u>Replied by</u></Typography>
                                    <Typography sx={{ px: 1.5, fontSize: 14, color: 'grey', pt: .5 }}>{capEmpName}</Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ pl: 1.1, fontWeight: 600, color: '#523A28' }}><u>Replied Date</u></Typography>
                                    <Typography sx={{ px: 1, fontSize: 12, color: 'grey', fontWeight: 600, pt: .5 }}>
                                        {format(new Date(tm_query_reply_date), 'MMM dd, yyyy HH:mm:ss')}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, mx: 2.3, mt: 2 }}>
                                <Typography sx={{ mt: 1, pl: .5, color: '#92443A' }}>Reply to the Query.</Typography>
                                <Box sx={{ flex: 1, px: 1, border: 1, borderRadius: 8, minHeight: 100, borderColor: '#92443A', pt: 1 }}>

                                    {tm_query_reply}
                                </Box>

                            </Box>
                        </Box>
                        <DialogActions>
                            <Box sx={{ textAlign: 'right', pb: 2, mr: 1 }}>

                                <Button
                                    variant="plain"
                                    sx={{ color: "#92443A", fontSize: 16, }}
                                    onClick={QueryClose}
                                >Cancel</Button>
                            </Box>
                        </DialogActions>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider>
        </Box>
    )
}

export default memo(ReplyModal)