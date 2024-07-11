import { Avatar, Box, Button, CssVarsProvider, DialogActions, Modal, ModalDialog, Textarea, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import InsertInvitationSharpIcon from '@mui/icons-material/InsertInvitationSharp';
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import moment from 'moment';
import _ from 'underscore';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';

const ReplyModal = ({ open, setReplyOpen, setReplyflag, valuee, setTableCount, tableCount }) => {

    const { tm_task_name, tm_task_due_date, tm_task_slno, } = valuee
    const [replies, setreplies] = useState('')
    const [rpData, setrpData] = useState([])

    let newDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)

    const replyUpdate = useCallback(
        (e) => {
            const value = e.target.value;
            setreplies(value);
        },
        []
    );

    const getquery = useMemo(() => {
        return {
            tm_task_slno: tm_task_slno,
        }
    }, [tm_task_slno,]);

    useEffect(() => {
        const getallreplies = async () => {
            const result = await axioslogin.post('/TmAllDeptTask/getQuery', getquery);
            const { success, data } = result.data;
            if (success === 2) {
                setrpData(data)
            }
            else {
                setrpData([])
            }
        }
        getallreplies()
    }, [getquery, tableCount])

    const postdata = useMemo(() => {
        return {
            tm_task_slno: tm_task_slno,
            tm_query_reply: replies,
            tm_query_reply_date: newDate,
            tm_query_reply_user: id
        }
    }, [tm_task_slno, replies, newDate, id]);

    const QueryClose = useCallback(() => {
        setReplyflag(0)
        setReplyOpen(false)
    }, [setReplyOpen, setReplyflag])

    const SubmitQuery = useCallback((e) => {
        e.preventDefault();
        if (replies !== '') {
            const rejectTask = async (postdata) => {
                const result = await axioslogin.post('/TmAllDeptTask/replyQuery', postdata);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message);
                    setTableCount(tableCount + 1);
                    setreplies('')

                } else {

                }
            }
            rejectTask(postdata);
        }
        else {
            infoNotify('please mark Your replies')
        }
    }, [tableCount, setTableCount, replies, postdata]);

    const capitalizeWords = (str) => {
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return format(date, 'MMMM d, yyyy HH:mm');
    };

    return (
        <Box>
            <CssVarsProvider>
                <Modal
                    open={open}
                >
                    < ModalDialog
                        sx={{
                            width: '55vw',

                            p: 0,
                            overflow: 'auto'
                        }}
                    >
                        <Box>
                            <Box sx={{ flex: 1, display: 'flex', mt: 1, p: 1, }}>
                                <Box sx={{ flex: 1, color: 'grey', }}>
                                    replies
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                    <CancelIcon sx={{ color: 'darkred', cursor: 'pointer' }} onClick={QueryClose} />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', bgcolor: '#D9DADE', py: .5 }}>
                                <Box sx={{ flex: 1, pl: .5 }}>
                                    <Typography sx={{ pl: .5, fontWeight: 600, color: 'Black' }}><AssignmentSharpIcon sx={{}} />Task</Typography>
                                    <Typography sx={{ pl: 1, fontSize: 16, color: 'Black', }}>{tm_task_name}</Typography>
                                </Box>
                                <Box sx={{ flex: 1, textAlign: 'right' }}>
                                    <Typography sx={{ pr: 5, fontWeight: 600, color: 'Black' }}><InsertInvitationSharpIcon sx={{ p: .3, }} />Duedate</Typography>
                                    <Typography sx={{ pr: 1.1, fontSize: 12, color: 'Black', fontWeight: 600 }}>
                                        {format(new Date(tm_task_due_date), 'MMM dd, yyyy HH:mm:ss')}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, px: 3 }}>
                                {rpData?.map((val) => (
                                    <React.Fragment key={val.tm_query_details_slno}>
                                        {val.tm_query_remark !== null && (
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2 }}>
                                                <Avatar size='sm' sx={{ border: 1, borderColor: 'lightgrey', bgcolor: 'white', mt: .5 }}>
                                                    <PersonIcon sx={{ p: .1, color: '#3B281C' }} />
                                                </Avatar>
                                                <Box sx={{ ml: .5, mr: 10, minWidth: 200 }}>
                                                    <Box sx={{ border: 1, borderColor: '#3B281C', bgcolor: '#FFFFFF', p: 1, borderRadius: 15 }}>
                                                        {val.tm_query_remark}
                                                    </Box>
                                                    <Box sx={{ display: 'flex', fontSize: 11, mt: 0.5 }}>
                                                        <Box sx={{ pl: .5, flex: 1, }}>{capitalizeWords(val.query_user)}</Box>
                                                        <Box sx={{ pr: 1 }}>{formatDate(val.tm_query_remark_date)}</Box>

                                                    </Box>
                                                </Box>
                                            </Box>
                                        )}
                                        {val.tm_query_reply !== null && (
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2, justifyContent: 'flex-end' }}>
                                                <Box sx={{ mr: .5, textAlign: 'right', ml: 10, minWidth: 200 }}>
                                                    <Box sx={{ border: 1, borderColor: '#466E73', bgcolor: '#FFFFFF', p: 1, borderRadius: 15 }}>
                                                        {val.tm_query_reply}
                                                    </Box>
                                                    <Box sx={{ display: 'flex', fontSize: 11, mt: 0.5, justifyContent: 'flex-end' }}>
                                                        <Box sx={{ pl: 1 }}>{formatDate(val.tm_query_reply_date)}</Box>
                                                        <Box sx={{ flex: 1, pr: .5 }}>{capitalizeWords(val.reply_user)}</Box>
                                                    </Box>
                                                </Box>
                                                <Avatar size='sm' sx={{ border: 1, borderColor: 'lightgrey', bgcolor: 'white', mt: .5 }}>
                                                    <PersonIcon sx={{ p: .1, color: '#466E73' }} />
                                                </Avatar>
                                            </Box>
                                        )}
                                    </React.Fragment>
                                ))}
                            </Box>
                            <Box sx={{ flex: 1, ml: 5, mr: 6, mt: 1.5, display: 'flex' }}>
                                <Box sx={{ flex: 1, pt: .3 }}>
                                    <Textarea
                                        minRows={1}
                                        maxRows={10}
                                        placeholder="Type reply here...."
                                        variant="outlined"
                                        color="neutral"
                                        name="replies"
                                        value={replies}
                                        onChange={replyUpdate}
                                        sx={{ borderRadius: 15 }}
                                    />
                                </Box>
                                <Box sx={{ pl: .5, margin: 'auto' }}>
                                    <Avatar sx={{ bgcolor: '#007FFF' }}>
                                        <SendIcon onClick={SubmitQuery} sx={{ color: 'white', cursor: 'pointer', }} />
                                    </Avatar>
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
        </Box >
    )
}

export default memo(ReplyModal)