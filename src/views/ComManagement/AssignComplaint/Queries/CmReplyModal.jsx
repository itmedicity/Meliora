import { Avatar, Box, Button, CssVarsProvider, DialogActions, Modal, ModalDialog, Textarea, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import moment from 'moment';
import _ from 'underscore';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';

const CmReplyModal = ({ valuee, count, setCount, setReplyOpen, setReplyflag, open }) => {

    const { complaint_slno, complaint_desc, compalint_date, rm_roomtype_name, rm_room_name, rm_insidebuildblock_name, rm_floor_name, location, complaint_type_name } = valuee
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
            complaint_slno: complaint_slno,
        }
    }, [complaint_slno,]);

    useEffect(() => {
        const getallreplies = async () => {
            const result = await axioslogin.post('/complaintassign/getQuery', getquery);
            const { success, data } = result.data;
            if (success === 2) {
                setrpData(data)

            }
            else {
                setrpData([])
            }
        }
        getallreplies()
    }, [getquery, count])

    const postdata = useMemo(() => {
        return {
            complaint_slno: complaint_slno,
            cm_query_reply: replies,
            cm_query_reply_date: newDate,
            cm_query_reply_user: id


        }
    }, [complaint_slno, replies, newDate, id]);

    const QueryClose = useCallback(() => {
        setReplyflag(0)
        setReplyOpen(false)
    }, [setReplyOpen, setReplyflag])

    const SubmitQuery = useCallback((e) => {
        e.preventDefault();
        if (replies.trim() !== '') {
            const rejectTask = async (postdata) => {
                const result = await axioslogin.post('/complaintassign/replyQuery', postdata);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message);
                    setCount(count + 1);
                    setreplies('')

                } else {

                }
            }
            rejectTask(postdata);
        }
        else {
            infoNotify('Please mark your replies')
        }
    }, [count, setCount, replies, postdata]);

    const capitalizeWords = (str) => {
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return format(date, 'MMM d, yyyy HH:mm');
    };

    return (
        <Box>
            <CssVarsProvider>
                <Modal
                    open={open}
                >
                    < ModalDialog
                        sx={{
                            width: '38vw',
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
                            <Box sx={{ flex: 1, display: 'flex', bgcolor: '#ECEDEF', py: .5 }}>
                                <Box sx={{ flex: 1, pl: .5 }}>
                                    <Typography sx={{ pl: .5, fontWeight: 600, color: 'Black', }}>Ticket No.{complaint_slno}</Typography>
                                    <Typography sx={{ pl: .5, fontSize: 14, color: 'Black', }}>
                                        {complaint_desc}
                                    </Typography>
                                    <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', py: .5 }}>
                                        Complaint Type: {complaint_type_name}
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 1, textAlign: 'right', pr: 1.5 }}>
                                    <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', }}>
                                        {location}
                                    </Typography>
                                    {rm_room_name !== null ?
                                        <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', }}>
                                            {rm_room_name}
                                            {rm_roomtype_name || rm_insidebuildblock_name || rm_floor_name ?
                                                ` (${rm_roomtype_name ? rm_roomtype_name : ''}${rm_roomtype_name && rm_insidebuildblock_name ? ' - ' : ''}${rm_insidebuildblock_name ? rm_insidebuildblock_name : ''}${(rm_insidebuildblock_name && rm_floor_name) ? ' - ' : ''}${rm_floor_name ? rm_floor_name : ''})`
                                                : "Not Updated"}
                                        </Typography> : null}
                                    <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', }}>
                                        {compalint_date
                                            ? format(new Date(compalint_date), 'dd MMM yyyy,  hh:mm a')
                                            : 'Invalid Date'}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, px: 3, minHeight: '44vh' }}>
                                {rpData?.map((val) => (
                                    <React.Fragment key={val.cm_query_details_slno}>
                                        {val.cm_query_remark !== null && (
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2 }}>
                                                <Avatar size='sm' sx={{ border: 1, borderColor: 'lightgrey', bgcolor: 'white', mt: .5 }}>
                                                    <PersonIcon sx={{ p: .1, color: '#3B281C' }} />
                                                </Avatar>
                                                <Box sx={{ ml: .5, mr: 10, minWidth: 200 }}>
                                                    <Box sx={{ border: 1, borderColor: '#3B281C', bgcolor: '#FFFFFF', px: 1, py: .5, borderRadius: 15 }}>
                                                        {val.cm_query_remark}
                                                    </Box>
                                                    <Box sx={{ display: 'flex', fontSize: 11, mt: 0.5 }}>
                                                        <Box sx={{ pl: .5, flex: 1, }}>{capitalizeWords(val.query_user)}</Box>
                                                        <Box sx={{ pr: 1 }}>{formatDate(val.cm_query_remark_date)}</Box>

                                                    </Box>
                                                </Box>
                                            </Box>
                                        )}
                                        {val.cm_query_reply !== null && (
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2, justifyContent: 'flex-end' }}>
                                                <Box sx={{ mr: .5, textAlign: 'right', ml: 10, minWidth: 200 }}>
                                                    <Box sx={{ border: 1, borderColor: '#466E73', bgcolor: '#FFFFFF', px: 1, py: .5, borderRadius: 15 }}>
                                                        {val.cm_query_reply}
                                                    </Box>
                                                    <Box sx={{ display: 'flex', fontSize: 11, mt: 0.5, justifyContent: 'flex-end' }}>
                                                        <Box sx={{ pl: 1 }}>{formatDate(val.cm_query_reply_date)}</Box>
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
                            <Box sx={{ flex: 1, ml: 5, mr: 6, mt: 2, display: 'flex' }}>
                                <Box sx={{ flex: 1, pt: .3 }}>
                                    <Textarea
                                        minRows={1}
                                        maxRows={10}
                                        placeholder="Message here...."
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

export default memo(CmReplyModal)