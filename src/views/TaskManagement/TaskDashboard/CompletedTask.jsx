import React, { useCallback, useEffect, useState } from 'react'
import { Box, CssVarsProvider, Table } from '@mui/joy'
import { Paper } from '@mui/material'
import { axioslogin } from 'src/views/Axios/Axios'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useSelector } from 'react-redux';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { warningNotify } from 'src/views/Common/CommonCode';
import { memo } from 'react';
import moment from 'moment';
import ViewTaskImage from '../TaskFileView/ViewTaskImage';
import ModalEditTask from '../CreateTask/ModalEditTask';
import EditIcon from '@mui/icons-material/Edit'

const CompletedTask = ({ tableCount, setTableCount, statuscount, setstatuscount, taskcount, settaskcount }) => {
    const [tableData, setTableData] = useState([])
    const [viewCompleted, setViewCompleted] = useState(0)
    const [getarry, setgetarry] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
    const [image, setimage] = useState(0)
    const [imageUrls, setImageUrls] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editModalFlag, setEditModalFlag] = useState(0)
    const [masterData, setMasterData] = useState([])
    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })

    useEffect(() => {
        const getCompletedTable = async () => {
            const result = await axioslogin.get(`/TmTableView/departmentCompleted/${empsecid}`);
            const { success, data } = result.data;
            if (data.length !== 0) {
                if (success === 2) {
                    const arr = data?.map((val) => {
                        const obj = {
                            tm_task_slno: val.tm_task_slno,
                            tm_task_name: (val.tm_task_name).toLowerCase(),
                            dept_name: val.dept_name,
                            sec_name: val.sec_name,
                            tm_assigne_emp: val.tm_assigne_emp,
                            em_name: val.em_name,
                            tm_task_dept: val.tm_task_dept,
                            tm_task_dept_sec: val.tm_task_dept_sec,
                            tm_task_due_date: val.tm_task_due_date,
                            tm_project_slno: val.tm_project_slno,
                            tm_project_name: val.tm_project_name,
                            create_date: val.create_date,
                            main_task_slno: val.main_task_slno,
                            tm_task_description: val.tm_task_description,
                            tm_task_status: val.tm_task_status,
                            tm_complete_date: val.tm_complete_date,
                            TaskStatus: val.tm_task_status === 1 ? 'Completed' :
                                val.tm_task_status === 1 ? 'Completed' :
                                    val.tm_task_status === 2 ? 'On Progress' :
                                        val.tm_task_status === 3 ? 'On Hold' :
                                            val.tm_task_status === 4 ? 'Pending' :
                                                val.tm_task_status === 0 ? 'Incompleted' : 'Incompleted',
                            datediff: new Date(val.tm_complete_date) - new Date(val.tm_task_due_date),
                            days: Math.floor((new Date(val.tm_complete_date) - new Date(val.tm_task_due_date)) / (1000 * 60 * 60 * 24)),
                            hours: Math.floor((new Date(val.tm_complete_date) - new Date(val.tm_task_due_date)) / (1000 * 60 * 60) % 24),
                            minutes: Math.floor(((new Date(val.tm_complete_date) - new Date(val.tm_task_due_date)) / 1000 / 60) % 60),
                            seconds: Math.floor(((new Date(val.tm_complete_date) - new Date(val.tm_task_due_date)) / 1000) % 60)
                        }
                        return obj
                    })
                    setTableData(arr)
                    setViewCompleted(1)
                } else {
                    warningNotify('error occured')
                }

            } else {
                setViewCompleted(0)
            }
        }
        getCompletedTable(empsecid)
    }, [empsecid, tableCount])

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
                    return `http://192.168.22.9/NAS/TaskManagement/${tm_task_slno}/${fileName}`;
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
                warningNotify("No Image attached");
            }
        } catch (error) {
            warningNotify('Error in fetching files:', error);
        }
    }
    const rowSelectModal = useCallback((value) => {
        setEditModalFlag(1)
        setEditModalOpen(true)
        setMasterData(value)
    }, [])

    return (
        <Box>
            {editModalFlag === 1 ?
                <ModalEditTask open={editModalOpen} masterData={masterData} setEditModalOpen={setEditModalOpen}
                    setEditModalFlag={setEditModalFlag} taskcount={taskcount} settaskcount={settaskcount}
                    statuscount={statuscount} setstatuscount={setstatuscount}
                    tableCount={tableCount} setTableCount={setTableCount}
                /> : image === 1 ? <ViewTaskImage imageUrls={imageUrls} open={imageViewModalOpen} handleClose={handleClose}
                    selectedImages={selectedImages} getarry={getarry} /> : null}

            {viewCompleted === 1 ?
                <Box variant="outlined" sx={{ height: 725, maxWidth: '100%', overflow: 'auto', }}>
                    <Paper variant="outlined" sx={{ maxHeight: 720, maxWidth: '100%', overflow: 'auto', }}>
                        <CssVarsProvider>
                            <Table padding={"none"} stickyHeader
                                hoverRow>
                                <thead>
                                    <tr >
                                        <th style={{ width: 50, }}>#</th>
                                        <th style={{ width: 60 }} >Action</th>
                                        <th style={{ width: 60 }}>View</th>
                                        <th style={{ width: 170 }}>Status</th>
                                        <th style={{ width: 180 }}>Completion exceed </th>
                                        <th style={{ width: 450 }}>Task Name</th>
                                        <th style={{ width: 450 }}>Project</th>
                                        <th style={{ width: 200 }}>Assignee</th>
                                        <th style={{ width: 150 }}>Created Date</th>
                                        <th style={{ width: 150 }}> Due Date</th>
                                        <th style={{ width: 180 }}>Task Completed Date</th>
                                        <th style={{ width: 500 }}>Task Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData?.map((val, index) => {
                                        return (
                                            <tr key={index}
                                                style={{
                                                    height: 8, background: val.main_task_slno !== null ? '#ede7f6' : val.main_task_slno === 0 ? '#ede7f6' : 'transparent',
                                                    minHeight: 5
                                                }}
                                            >
                                                <td> {index + 1}</td>
                                                <td>
                                                    <EditIcon
                                                        sx={{ cursor: 'pointer' }} size={6} onClick={() => rowSelectModal(val)}
                                                    />
                                                </td>
                                                <td style={{ cursor: 'pointer', }}>
                                                    <ImageOutlinedIcon sx={{ color: '#41729F' }}
                                                        onClick={() => fileView(val)}
                                                    />
                                                </td>
                                                <td
                                                    style={{
                                                        color: val.tm_task_status === null ? '#311E26'
                                                            : val.tm_task_status === 0 ? '#311E26'
                                                                : val.tm_task_status === 1 ? '#94C973'
                                                                    : val.tm_task_status === 2 ? '#D37506'
                                                                        : val.tm_task_status === 3 ? '#67595E'
                                                                            : val.tm_task_status === 4 ? '#5885AF'
                                                                                : 'transparent', minHeight: 5,
                                                        fontWeight: 700
                                                    }}><RadioButtonCheckedIcon sx={{
                                                        color: val.tm_task_status === null ? '#311E26'
                                                            : val.tm_task_status === 0 ? '#311E26'
                                                                : val.tm_task_status === 1 ? '#59981A'
                                                                    : val.tm_task_status === 2 ? '#D37506'
                                                                        : val.tm_task_status === 3 ? '#747474'
                                                                            : val.tm_task_status === 4 ? '#5885AF'
                                                                                : 'transparent', minHeight: 5
                                                    }} />&nbsp;{val.TaskStatus}</td>
                                                {val.datediff > 0 ?
                                                    <td >
                                                        <Box sx={{ backgroundColor: '#EECE88', borderRadius: 20, p: .5, color: '#3B0404', fontWeight: 600, }}>
                                                            {val.days} Days - {val.hours}h: {val.minutes}m: {val.seconds}s
                                                        </Box>
                                                    </td> :
                                                    < td style={{ color: '#578E87', fontWeight: 600 }}> Completed On Time</td>

                                                }
                                                <td style={{ textTransform: 'capitalize' }}> {val.tm_task_name || 'not given'}</td>
                                                <td style={{ textTransform: 'capitalize' }}> {val.tm_project_name || 'not given'}</td>
                                                <td style={{ textTransform: 'capitalize' }}> {val.em_name || 'not given'}</td>
                                                <td> {moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                                <td> {moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                                {val.tm_complete_date !== null
                                                    ? <td> {moment(val.tm_complete_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td> :
                                                    <td>not given</td>}
                                                <td style={{ textTransform: 'capitalize' }}> {val.tm_task_description || 'not given'}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </CssVarsProvider>
                    </Paper>
                </Box>
                : <Box sx={{ textAlign: 'center', pt: 20, fontWeight: 700, fontSize: 30, color: '#C7C8CB', height: 725, maxWidth: '100%', }}>
                    No Task Completed Yet!

                </Box>
            }
        </Box>
    )
}

export default memo(CompletedTask)