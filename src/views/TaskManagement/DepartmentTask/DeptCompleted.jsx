import React, { useCallback, useEffect, useState } from 'react'
import { Box, Chip } from '@mui/joy'
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux';
import { warningNotify } from 'src/views/Common/CommonCode';
import { memo } from 'react';
import ViewTaskImage from '../TaskFileView/ViewTaskImage';
import ModalEditTask from '../CreateTask/ModalEditTask';
import EditIcon from '@mui/icons-material/Edit'
import { Virtuoso } from 'react-virtuoso';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';

const DeptCompleted = ({ setTableCount, tableCount }) => {

    const [tableData, setTableData] = useState([])
    const [getarry, setgetarry] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
    const [image, setimage] = useState(0)
    const [imageUrls, setImageUrls] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editModalFlag, setEditModalFlag] = useState(0)
    const [masterData, setMasterData] = useState([])
    const [statuscount, setstatuscount] = useState(0)
    const [taskcount, settaskcount] = useState(0)
    const [projectcount, setProjectcount] = useState(0)
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
                            tm_task_file: val.tm_task_file,
                            tm_mast_duedate_count: val.tm_mast_duedate_count,
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
                } else {
                    setTableData([])
                }
            } else {
                setTableData([])
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
        <Box sx={{ width: '100%', overflow: 'auto' }}>
            {editModalFlag === 1 ?
                <ModalEditTask open={editModalOpen} masterData={masterData} setEditModalOpen={setEditModalOpen}
                    setEditModalFlag={setEditModalFlag} taskcount={taskcount} settaskcount={settaskcount}
                    statuscount={statuscount} setstatuscount={setstatuscount}
                    tableCount={tableCount} setTableCount={setTableCount}
                    projectcount={projectcount} setProjectcount={setProjectcount}
                /> : image === 1 ? <ViewTaskImage imageUrls={imageUrls} open={imageViewModalOpen} handleClose={handleClose}
                    selectedImages={selectedImages} getarry={getarry} /> : null}
            <Box sx={{ width: 2600, }}>
                <Box sx={{
                    height: 45, mt: .5, mx: 1.5, display: 'flex', borderBottom: 1, borderTop: 1, borderColor: 'lightgray', pt: 1.5,
                    bgcolor: 'white'
                }}>
                    <Box sx={{ width: 40, pl: 1.7, fontWeight: 600, color: '#444444', fontSize: 12 }}>#</Box>
                    <Box sx={{ width: 60, textAlign: 'center', fontWeight: 600, color: '#444444', fontSize: 12 }}>Action</Box>
                    <Box sx={{ width: 60, textAlign: 'center', fontWeight: 600, color: '#444444', fontSize: 12, }}>Files</Box>
                    <Box sx={{ width: 220, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1, }}>Completion exceed</Box>
                    <Box sx={{ width: 900, fontWeight: 600, color: '#444444', fontSize: 12, }}>Task Name</Box>
                    <Box sx={{ width: 800, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Project</Box>
                    <Box sx={{ width: 500, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Assignee</Box>
                    <Box sx={{ width: 250, fontWeight: 600, color: '#444444', fontSize: 12, pl: 2 }}>Created Date</Box>
                    <Box sx={{ width: 250, fontWeight: 600, color: '#444444', fontSize: 12, pl: 2 }}>Due Date</Box>
                    <Box sx={{ width: 250, fontWeight: 600, color: '#444444', fontSize: 12, pl: 2 }}>Completed Date</Box>
                    <Box sx={{ width: 900, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Description</Box>
                </Box>
                <Virtuoso
                    style={{ height: '60vh' }}
                    totalCount={tableData?.length}
                    itemContent={(index) => {
                        const val = tableData[index];
                        return (
                            <Box key={val.tm_task_slno} sx={{
                                flex: 1, display: 'flex', mt: .3, borderBottom: 2, mx: 1.5, borderColor: 'lightgrey', minHeight: 30,
                                maxHeight: 80,
                                background: val.main_task_slno !== null ? '#EAE7FA' : val.main_task_slno === 0 ? 'white' : 'white',
                                pt: .5,
                            }}>
                                <Box sx={{ width: 40, pl: 1.7, fontWeight: 600, color: 'grey', fontSize: 12 }}>{index + 1}</Box>
                                <Box sx={{ width: 60, textAlign: 'center', fontWeight: 600, color: 'grey', fontSize: 12 }}>
                                    <EditIcon
                                        sx={{ cursor: 'pointer', '&:hover': { color: '#003060' } }} size={6}
                                        onClick={() => rowSelectModal(val)}
                                    />
                                </Box>
                                <Box sx={{ width: 60, textAlign: 'center', fontWeight: 600, color: 'grey', fontSize: 12, cursor: 'pointer' }}>&nbsp;
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
                                <Box sx={{ width: 210, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                                    {val.datediff > 0 ?
                                        <Chip sx={{ backgroundColor: '#F8EA8C', p: .5, color: '#3B0404', fontSize: 11, fontWeight: 600, }}>
                                            {val.days} Days - {val.hours}h: {val.minutes}m: {val.seconds}s
                                        </Chip>
                                        :
                                        <Chip sx={{ fontSize: 11, color: '#2C5E1A' }}>
                                            Completed On Time
                                        </Chip>
                                    }
                                </Box>
                                {val.tm_task_status === 1 ?
                                    <Box sx={{ width: 900, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                        {val.tm_task_name || 'not given'}
                                    </Box> :
                                    <Box sx={{
                                        width: 900, fontWeight: 650, color: 'grey', fontSize: 12,
                                        textTransform: 'capitalize', pl: 1
                                    }}>
                                        {val.tm_task_name || 'not given'}
                                    </Box>
                                }
                                {val.tm_task_status === 1 ?
                                    <Box sx={{ width: 800, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                        {val.tm_project_name || 'not given'}
                                    </Box> :
                                    <Box sx={{
                                        width: 800, fontWeight: 600, color: 'grey', fontSize: 12,
                                        textTransform: 'capitalize', pl: 1
                                    }}>
                                        {val.tm_project_name || 'not given'}
                                    </Box>
                                }
                                {val.tm_task_status === 1 ?
                                    <Box sx={{ width: 500, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                        {val.em_name || 'not given'}
                                    </Box> :
                                    <Box sx={{
                                        width: 500, fontWeight: 600, color: 'grey', fontSize: 12,
                                        textTransform: 'capitalize', pl: 1
                                    }}>
                                        {val.em_name || 'not given'}
                                    </Box>
                                }
                                {val.tm_task_status === 1 ?
                                    <Box sx={{ width: 250, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                        {val.create_date || 'not given'}
                                    </Box> :
                                    <Box sx={{
                                        width: 250, fontWeight: 600, color: 'grey', fontSize: 12,
                                        textTransform: 'capitalize', pl: 1
                                    }}>
                                        {val.create_date || 'not given'}
                                    </Box>
                                }
                                {val.tm_task_status === 1 ?
                                    <Box sx={{ width: 250, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                        {val.tm_task_due_date || 'not given'}
                                    </Box> :
                                    <Box sx={{
                                        width: 250, fontWeight: 600, color: 'grey', fontSize: 12,
                                        textTransform: 'capitalize', pl: 1
                                    }}>
                                        {val.tm_task_due_date || 'not given'}
                                    </Box>
                                }
                                {val.tm_task_status === 1 ?
                                    <Box sx={{ width: 250, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                        {val.tm_complete_date || 'not given'}
                                    </Box> :
                                    <Box sx={{
                                        width: 250, fontWeight: 600, color: 'grey', fontSize: 12,
                                        textTransform: 'capitalize', pl: 1
                                    }}>
                                        {val.tm_complete_date || 'not given'}
                                    </Box>
                                }
                                {val.tm_task_status === 1 ?
                                    <Box sx={{ width: 900, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                        {val.tm_task_description || 'not given'}
                                    </Box> :
                                    <Box sx={{
                                        width: 900, fontWeight: 600, color: 'grey', fontSize: 12,
                                        textTransform: 'capitalize', pl: 1
                                    }}>
                                        {val.tm_task_description || 'not given'}
                                    </Box>
                                }
                            </Box>
                        );
                    }}
                />
            </Box>
        </Box >
    )
}

export default memo(DeptCompleted)