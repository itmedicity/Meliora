import { Box, Button, CssVarsProvider, DialogActions, Modal, ModalDialog, Textarea, Typography } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import InsertInvitationSharpIcon from '@mui/icons-material/InsertInvitationSharp';
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import moment from 'moment';

const QueryModal = ({ open, setqueryOpen, setqueryflag, valuee, settaskcount, taskcount }) => {


    const { tm_task_name, tm_task_due_date, tm_create_detl_slno, tm_query_remark } = valuee

    const [queries, setQueries] = useState(tm_query_remark === null ? '' : tm_query_remark)
    let newDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');


    const QueryUpdate = useCallback(
        (e) => {
            const value = e.target.value;
            setQueries(value);
        },
        []
    );

    const patchdata = useMemo(() => {
        return {
            tm_create_detl_slno: tm_create_detl_slno,
            tm_detail_status: 2,
            tm_query_remark: queries,
            tm_query_remark_date: newDate
        }
    }, [tm_create_detl_slno, queries, newDate]);

    const QueryClose = useCallback(() => {
        setqueryflag(0)
        setqueryOpen(false)
    }, [setqueryOpen, setqueryflag])



    const SubmitQuery = useCallback((e) => {
        e.preventDefault();
        if (queries !== '') {
            const rejectTask = async (patchdata) => {
                const result = await axioslogin.patch('/TmAllDeptTask/askQuery', patchdata);
                const { success, message } = result.data;
                if (success === 2) {
                    succesNotify(message);
                    settaskcount(taskcount + 1);
                    QueryClose();
                } else {

                }
            }
            rejectTask(patchdata);
        }
        else {
            infoNotify('please mark Your Queries')
        }
    }, [taskcount, settaskcount, queries, QueryClose, patchdata]);


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
                                    <Typography sx={{ pl: .5, fontWeight: 600, color: 'grey' }}><AssignmentSharpIcon sx={{ p: .3 }} /><u>Task</u></Typography>
                                    <Typography sx={{ px: 1.5, fontSize: 14, color: 'grey', }}>{tm_task_name}</Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ pl: .1, fontWeight: 600, color: 'grey' }}><InsertInvitationSharpIcon sx={{ p: .3, }} /><u>Duedate</u></Typography>
                                    <Typography sx={{ px: 1, fontSize: 12, color: 'grey', fontWeight: 600 }}>
                                        {format(new Date(tm_task_due_date), 'MMM dd, yyyy HH:mm:ss')}
                                    </Typography>
                                </Box>
                            </Box>

                            <Typography sx={{ flex: 1, pl: 3, pt: 2, pb: .5, color: 'grey' }}>Remarks</Typography>
                            <Box sx={{ flex: 1, minHeight: 200, mx: 2.5, }}>
                                <Textarea
                                    minRows={8}
                                    maxRows={10}
                                    placeholder="Ask Your Query..."
                                    variant="outlined"
                                    color="warning"
                                    name="queries"
                                    value={queries}
                                    onChange={QueryUpdate}
                                />
                            </Box>
                        </Box>
                        <DialogActions>
                            <Box sx={{ textAlign: 'right', pb: 2, mr: 1 }}>
                                <Button
                                    variant="plain"
                                    onClick={SubmitQuery}
                                    sx={{ color: "#92443A", fontSize: 16, }}
                                >Submit</Button>
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

export default memo(QueryModal)