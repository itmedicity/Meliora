import { Avatar, Box, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { axioslogin } from 'src/views/Axios/Axios';
import { Virtuoso } from 'react-virtuoso';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import CountDowncomponent from '../CountDown/CountDowncomponent';
import { format } from 'date-fns';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import ViewTaskImage from '../TaskFileView/ViewTaskImage';
import QueryModal from './QueryModal';
import HelpSharpIcon from '@mui/icons-material/HelpSharp';
import ReplyModal from './ReplyModal';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import CommentIcon from '@mui/icons-material/Comment';

const AcceptTaskFromDir = () => {
    const [taskList, setTaskList] = useState([])
    const [getarry, setgetarry] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
    const [image, setimage] = useState(0)
    const [imageUrls, setImageUrls] = useState([]);
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const [taskcount, settaskcount] = useState(0)
    const [queryflag, setqueryflag] = useState(0)
    const [queryOpen, setqueryOpen] = useState(false)
    const [replyflag, setReplyflag] = useState(0)
    const [replyOpen, setReplyOpen] = useState(false)
    const [valuee, setValuee] = useState([])
    const searchData = useMemo(() => {
        return {
            tm_assigne_emp: id,
        }
    }, [id])

    useEffect(() => {
        const getAssignedTask = async () => {
            const result = await axioslogin.post('/TmAllDeptTask/getAssignedTask', searchData);
            const { success, data } = result.data;
            if (success === 2) {
                setTaskList(data)
            } else {
                setTaskList([])
            }
        }
        getAssignedTask()
    }, [taskcount, searchData])

    const AcceptTask = useCallback((value) => {
        const { tm_create_detl_slno } = value
        const patchdata = {
            tm_create_detl_slno: tm_create_detl_slno,
            tm_detail_status: 1
        }
        const acceptTask = async (patchdata) => {
            const result = await axioslogin.patch('/TmAllDeptTask/acceptTask', patchdata)
            const { success, message } = result.data
            if (success === 2) {
                succesNotify(message)
                settaskcount(taskcount + 1)
            } else {
            }
        }
        acceptTask(patchdata)
    }, [taskcount, settaskcount])


    const RejectTask = useCallback((value) => {
        setqueryflag(1)
        setValuee(value)
        setqueryOpen(true)
    }, [])

    const isPastDue = (tm_task_due_date) => {
        const today = new Date();
        const due = new Date(tm_task_due_date);
        return due < today
    }
    const handleClose = useCallback(() => {
        setimage(0)
        setimageViewModalOpen(false)
        setImageUrls([])
    }, [setimageViewModalOpen, setImageUrls, setimage])

    const fileView = async (val) => {
        const { tm_task_slno } = val;
        setgetarry(val);
        setimage(0); // Initialize imageViewModalFlag to 0 initially
        setimageViewModalOpen(false); // Close the modal if it was open
        try {
            const result = await axioslogin.get(`/TmFileUpload/uploadFile/getTaskFile/${tm_task_slno}`);
            const { success } = result.data;
            if (success === 1) {
                const data = result.data;
                const fileNames = data.data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/TaskManagement/${tm_task_slno}/${fileName}`;
                });
                setImageUrls(fileUrls);
                // Open the modal only if there are files
                if (fileUrls.length > 0) {
                    setimage(1);
                    setimageViewModalOpen(true);
                    setSelectedImages(val);
                } else {
                    warningNotify("No Image attached");
                }
            } else {
                warningNotify("No Image Attached");
            }
        } catch (error) {
            warningNotify('Error in fetching files:', error);
        }
    }


    return (
        <Paper sx={{ pb: .3, bgcolor: '#DFE3ED' }}>

            {image === 1 ? <ViewTaskImage imageUrls={imageUrls} open={imageViewModalOpen} handleClose={handleClose}
                selectedImages={selectedImages} getarry={getarry} /> : null}
            {queryflag === 1 ?
                <QueryModal open={queryOpen} setqueryOpen={setqueryOpen} valuee={valuee}
                    setqueryflag={setqueryflag} settaskcount={settaskcount} taskcount={taskcount} />
                : null}
            {replyflag === 1 ?
                <ReplyModal open={replyOpen} setReplyOpen={setReplyOpen} valuee={valuee}
                    setReplyflag={setReplyflag} />
                : null}
            <Box sx={{ flex: 1, height: 35, borderBottom: 1, borderColor: 'lightgrey', pt: .8, pl: .8, color: '#C7C8CB', bgcolor: 'white' }}>
                Accept/Raise a query
            </Box>
            <Box sx={{ flex: 1, border: .1, m: .3, borderColor: '#EAEAEA', borderRadius: 1, bgcolor: 'white', height: '85vh' }}>
                <Box sx={{
                    mt: 1, display: 'flex', pb: 1, borderBottom: 3, borderColor: '#DFE3ED'
                }}>
                    <Box sx={{ mt: .8, mx: .5, }}>
                        <CssVarsProvider>
                            <Avatar
                                color="neutral"
                                size="lg"
                                variant="outlined"
                            >
                                <TrackChangesIcon sx={{ height: 35, width: 35, }} />
                            </Avatar>
                        </CssVarsProvider>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: 20, fontWeight: 600, color: 'grey', pt: .5 }}> Accept / Raise a query</Typography>
                        <Typography sx={{ fontSize: 11, fontWeight: 600, color: 'grey', pl: .5 }}><u>Task Management</u></Typography>
                    </Box>
                </Box>
                <Box sx={{ width: '100%', overflow: 'auto', mt: 2 }}>
                    {taskList.length !== 0 ?
                        <Box sx={{ width: 2900, }}>
                            <Box sx={{
                                height: 45, mt: .5, mx: 1.5, display: 'flex', borderBottom: 1, borderTop: 1, borderColor: 'lightgray', pt: 1.5,
                                bgcolor: 'white'
                            }}>
                                <Box sx={{ width: 40, pl: 1.5, fontWeight: 600, color: '#444444', fontSize: 12, }}>#</Box>
                                <Box sx={{ width: 60, fontWeight: 600, color: '#444444', fontSize: 12, textAlign: 'center', }}>File</Box>
                                <Box sx={{ width: 160, fontWeight: 600, color: '#444444', fontSize: 12, textAlign: 'center', }}>CountDown</Box>
                                <Box sx={{ width: 350, textAlign: 'center', fontWeight: 600, color: '#444444', fontSize: 12, }}>Action </Box>
                                <Box sx={{ width: 640, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Task Name</Box>
                                <Box sx={{ width: 500, fontWeight: 600, color: '#444444', fontSize: 12, }}>Project</Box>
                                <Box sx={{ width: 200, fontWeight: 600, color: '#444444', fontSize: 12, }}>Task Created By</Box>
                                <Box sx={{ width: 160, fontWeight: 600, color: '#444444', fontSize: 12, }}>Created Date</Box>
                                <Box sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 12, pl: .5 }}>Due Date</Box>
                                <Box sx={{ width: 650, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Description</Box>
                            </Box>
                            <Virtuoso
                                style={{ height: '66vh' }}
                                totalCount={taskList?.length}
                                itemContent={(index) => {
                                    const val = taskList[index];
                                    return (
                                        <Box key={val.tm_task_slno} sx={{
                                            flex: 1, display: 'flex', mt: .3, borderBottom: 2, mx: 1.5, borderColor: 'lightgrey', minHeight: 30,
                                            maxHeight: 80,
                                            background: val.main_task_slno !== null ? '#EAE7FA' : val.main_task_slno === 0 ? 'white' : 'white',
                                            pt: .5,
                                        }}>
                                            <Box sx={{ width: 40, pl: 1.5, fontWeight: 600, color: 'grey', fontSize: 12, }}>{index + 1}</Box>
                                            <Box sx={{ width: 60, textAlign: 'center', fontWeight: 600, color: 'grey', fontSize: 12, cursor: 'pointer', }}>&nbsp;
                                                {val.tm_task_file === 1 ?
                                                    <FilePresentRoundedIcon sx={{
                                                        color: '#41729F',
                                                        '&:hover': { color: '#274472' }
                                                    }}
                                                        onClick={() => fileView(val)}
                                                    /> :
                                                    <FilePresentRoundedIcon sx={{
                                                        color: 'grey',
                                                    }}
                                                    />}
                                            </Box>
                                            <Box sx={{ width: 180, fontWeight: 600, color: 'grey', fontSize: 12, }}>
                                                {val.tm_task_status !== 1 ?
                                                    <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, width: 150, pl: 1 }}>
                                                        <CountDowncomponent DueDates={val.tm_task_due_date} />
                                                    </Box> :
                                                    <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, width: 150, pl: 5, color: 'darkgreen' }}>
                                                        Completed
                                                    </Box>
                                                }
                                            </Box>

                                            <Box sx={{ width: 360, fontWeight: 600, color: 'grey', fontSize: 12, display: 'flex', pl: 1, pr: 2 }}>
                                                <Box sx={{ flex: .6, pl: 1 }}>
                                                    <CssVarsProvider>
                                                        <Tooltip title="Click to accept this Task" placement="bottom" variant='solid'>
                                                            <CheckCircleIcon sx={{ color: '#9A5B13', cursor: 'pointer', '&:hover': { color: '#4C3D40' }, }}
                                                                onClick={() => AcceptTask(val)} />
                                                        </Tooltip>
                                                    </CssVarsProvider>
                                                    Accept
                                                </Box>
                                                <Box sx={{ flex: 1, pl: 1 }}>
                                                    {val.tm_detail_status === 0 ?
                                                        <CssVarsProvider>
                                                            <Tooltip title="Click to Raise a Query About the Task" placement="bottom" variant='solid'>
                                                                <HelpSharpIcon sx={{ color: 'darkred', cursor: 'pointer', '&:hover': { color: 'red' }, }}
                                                                    onClick={() => RejectTask(val)} />
                                                            </Tooltip> Raise a Query
                                                        </CssVarsProvider>
                                                        :
                                                        <>
                                                            {val.tm_query_status === 2 ?
                                                                <>
                                                                    <MarkUnreadChatAltIcon sx={{ color: '#08A0A6', cursor: 'pointer', }}
                                                                        onClick={() => RejectTask(val)} />Replies
                                                                </> :
                                                                <>
                                                                    <CommentIcon sx={{ color: '#43616F', cursor: 'pointer', }}
                                                                        onClick={() => RejectTask(val)} />Raised a Query
                                                                </>}
                                                        </>}
                                                </Box>
                                            </Box>
                                            {
                                                val.tm_task_status === 1 ?
                                                    <Box sx={{ width: 650, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', }}>
                                                        {val.tm_task_name || 'not given'}
                                                    </Box> :
                                                    <Box sx={{
                                                        width: 650, fontWeight: 650, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12,
                                                        textTransform: 'capitalize',
                                                    }}>
                                                        {val.tm_task_name || 'not given'}
                                                    </Box>
                                            }
                                            {
                                                val.tm_task_status === 1 ?
                                                    <Box sx={{ width: 500, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', }}>
                                                        {val.tm_project_name || 'not given'}
                                                    </Box> :
                                                    <Box sx={{
                                                        width: 500, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12,
                                                        textTransform: 'capitalize',
                                                    }}>
                                                        {val.tm_project_name || 'not given'}
                                                    </Box>
                                            }
                                            {
                                                val.tm_task_status === 1 ?
                                                    <Box sx={{ width: 200, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', }}>
                                                        {val.create_empname || 'not given'}
                                                    </Box> :
                                                    <Box sx={{
                                                        width: 200, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12,
                                                        textTransform: 'capitalize',
                                                    }}>
                                                        {val.create_empname || 'not given'}
                                                    </Box>
                                            }
                                            {
                                                val.tm_task_status === 1 ?
                                                    <Box sx={{ width: 180, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', }}>
                                                        {format(new Date(val.create_date), 'MMM dd, yyyy HH:mm:ss')}
                                                    </Box> :
                                                    <Box sx={{
                                                        width: 180, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12,
                                                        textTransform: 'capitalize',
                                                    }}>
                                                        {format(new Date(val.create_date), 'MMM dd, yyyy HH:mm:ss')}
                                                    </Box>
                                            }
                                            {
                                                val.tm_task_status === 1 ?
                                                    <Box sx={{ width: 180, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', }}>
                                                        {format(new Date(val.tm_task_due_date), 'MMM dd, yyyy HH:mm:ss')}
                                                    </Box> :
                                                    <Box sx={{
                                                        width: 180, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12,
                                                        textTransform: 'capitalize',
                                                    }}>
                                                        {format(new Date(val.tm_task_due_date), 'MMM dd, yyyy HH:mm:ss')}
                                                    </Box>
                                            }
                                            {
                                                val.tm_task_status === 1 ?
                                                    <Box sx={{ width: 650, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', }}>
                                                        {val.tm_task_description || 'not given'}
                                                    </Box> :
                                                    <Box sx={{
                                                        width: 650, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12,
                                                        textTransform: 'capitalize',
                                                    }}>
                                                        {val.tm_task_description || 'not given'}
                                                    </Box>
                                            }
                                        </Box>
                                    );
                                }} />
                        </Box>
                        :
                        <Box sx={{ textAlign: 'center', width: 400, margin: 'auto', height: 450, pt: 25, fontWeight: 700, fontSize: 30, color: '#C7C8CB' }}>
                            Empty List
                        </Box>}
                </Box>
            </Box>
        </Paper >
    )
}

export default memo(AcceptTaskFromDir)