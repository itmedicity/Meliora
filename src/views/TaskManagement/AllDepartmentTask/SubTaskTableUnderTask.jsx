import React, { memo, useCallback, useState } from 'react'
import { Box, Table, CssVarsProvider } from '@mui/joy'
import { Paper } from '@mui/material'
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { warningNotify } from 'src/views/Common/CommonCode'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ViewTaskImage from '../TaskFileView/ViewTaskImage'

const SubTaskTableUnderTask = ({ tm_task_slno, selectForEditsSubTask, tableRendering }) => {

    const [viewSubTask, setViewSubTask] = useState(0)
    const [subTask, setSubTask] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
    const [image, setimage] = useState(0)
    const [imageUrls, setImageUrls] = useState([]);
    const [getarry, setgetarry] = useState([])
    useEffect(() => {
        const getSubTask = async (tm_task_slno) => {
            const result = await axioslogin.get(`/taskManagement/subtaskviewByid/${tm_task_slno}`);
            const { success, data } = result.data;
            if (data.length !== 0) {
                if (success === 2) {
                    const subtaskData = data && data.map((val) => {
                        return {
                            tm_task_slno: val.tm_task_slno,
                            tm_task_name: val.tm_task_name,
                            tm_task_dept: val.tm_task_dept,
                            tm_task_dept_sec: val.tm_task_dept_sec,
                            dept_name: val.dept_name,
                            sec_name: val.sec_name,
                            em_name: val.em_name,
                            tm_task_due_date: val.tm_task_due_date,
                            tm_task_description: val.tm_task_description,
                            create_date: val.create_date,
                            tm_task_status: val.tm_task_status,
                            TaskStatus: val.tm_task_status === 1 ? 'Completed' :
                                val.tm_task_status === 1 ? 'Completed' :
                                    val.tm_task_status === 2 ? 'On Progress' :
                                        val.tm_task_status === 3 ? 'On Hold' :
                                            val.tm_task_status === 4 ? 'Pending' :
                                                val.tm_task_status === 0 ? 'Incompleted' : 'Incompleted',
                        }
                    })

                    setSubTask(subtaskData)
                    setViewSubTask(1)
                }
            }
            else {
                setViewSubTask(0)
            }
        }
        getSubTask(tm_task_slno)
    }, [tm_task_slno, tableRendering])

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
                    return `${PUBLIC_NAS_FOLDER}/Meliora/TaskManagement/${tm_task_slno}/${fileName}`;
                });
                setImageUrls(fileUrls);
                // Open the modal only if there are files
                if (fileUrls.length > 0) {
                    setimage(1);
                    setimageViewModalOpen(true);
                    setSelectedImages(val);
                } else {
                    warningNotify("No Task Image attached");
                }
            } else {
                warningNotify("No Task image attached");
            }
        } catch (error) {
            warningNotify('Error in fetching files:', error);
        }
    }

    return (
        <Box sx={{}}>
            {viewSubTask === 1 ?
                <Box>
                    {image === 1 ? <ViewTaskImage imageUrls={imageUrls} open={imageViewModalOpen} handleClose={handleClose}
                        selectedImages={selectedImages} getarry={getarry} /> : null}
                    <Paper variant="outlined" sx={{
                        width: '99%', overflow: 'auto', m: 1, maxHeight: 320,
                    }}>
                        <CssVarsProvider>
                            <Table padding={"none"} stickyHeader hoverRow>
                                <thead>
                                    <tr style={{ background: '#D8CEE6' }}>
                                        <th style={{ width: 50, fontFamily: 'Georgia' }}>#</th>
                                        <th style={{ width: 70, fontFamily: 'Georgia' }} >Action</th>
                                        <th style={{ width: 60, fontFamily: 'Georgia' }} >View</th>
                                        <th style={{ width: 100, fontFamily: 'Georgia' }}>Status</th>
                                        <th style={{ width: 150, fontFamily: 'Georgia' }}>Subtask</th>
                                        <th style={{ width: 250, fontFamily: 'Georgia' }}>Department</th>
                                        <th style={{ width: 250, fontFamily: 'Georgia' }}>Location</th>
                                        <th style={{ width: 150, fontFamily: 'Georgia' }}>Assignee</th>
                                        <th style={{ width: 130, fontFamily: 'Georgia' }}>Created Date</th>
                                        <th style={{ width: 130, fontFamily: 'Georgia' }}>Due date</th>
                                        <th style={{ width: 300, fontFamily: 'Georgia' }}>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subTask?.map((val, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                                    minHeight: 5
                                                }}
                                            >
                                                <td> {index + 1}</td>
                                                <td>
                                                    <EditIcon sx={{ cursor: 'pointer' }} size={6}
                                                        onClick={() => selectForEditsSubTask(val)}
                                                    />
                                                </td>
                                                <td style={{ cursor: 'pointer', }}>
                                                    <ImageOutlinedIcon sx={{ color: '#41729F' }}
                                                        onClick={() => fileView(val)}
                                                    />
                                                </td>
                                                <td
                                                    style={{
                                                        color: val.tm_task_status === null ? '#B95C50'
                                                            : val.tm_task_status === 0 ? '#B95C50'
                                                                : val.tm_task_status === 1 ? '#94C973'
                                                                    : val.tm_task_status === 2 ? '#EFD593'
                                                                        : val.tm_task_status === 3 ? '#67595E'
                                                                            : val.tm_task_status === 4 ? '#5885AF'
                                                                                : 'transparent', minHeight: 5,
                                                        fontWeight: 500
                                                    }}>{val.TaskStatus}</td>
                                                <td> {val.tm_task_name || 'not given'}</td>
                                                <td> {val.dept_name || 'not given'}</td>
                                                <td> {val.sec_name || 'not given'}</td>
                                                <td> {val.em_name || 'not given'}</td>
                                                <td> {moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                                <td> {moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                                <td> {val.tm_task_description || 'not given'}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </CssVarsProvider>
                    </Paper>
                </Box>
                : null}
        </Box >
    )
}

export default memo(SubTaskTableUnderTask)