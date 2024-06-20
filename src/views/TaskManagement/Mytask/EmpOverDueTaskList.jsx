import { Box, Chip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit'
import _ from 'underscore';
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import EmpTaskStatus from './EmpTaskStatus'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ViewTaskImage from '../TaskFileView/ViewTaskImage'
import CountDowncomponent from '../CountDown/CountDowncomponent'
import { format } from 'date-fns'
import { Virtuoso } from 'react-virtuoso';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';

const EmpOverDueTaskList = ({ tableCount, setTableCount, taskcount, settaskcount, projectcount, setprojectcount }) => {
    const [tabledata, setTabledata] = useState([])
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editModalFlag, setEditModalFlag] = useState(0)
    const [masterData, setMasterData] = useState([])
    const [getarry, setgetarry] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
    const [image, setimage] = useState(0)
    const [imageUrls, setImageUrls] = useState([]);
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)

    useEffect(() => {
        const getMasterTable = async () => {
            const result = await axioslogin.get(`/TmTableView/employeeOverDue/${id}`);
            const { success, data } = result.data;
            if (data.length !== 0) {
                if (success === 2) {
                    const arr = data?.map((val) => {
                        const obj = {
                            tm_task_slno: val.tm_task_slno,
                            tm_task_name: val.tm_task_name,
                            dept_name: val.dept_name,
                            sec_name: val.sec_name,
                            tm_assigne_emp: val.tm_assigne_emp,
                            em_name: val.em_name,
                            create_date: val.create_date,
                            tm_project_slno: val.tm_project_slno,
                            tm_project_name: val.tm_project_name,
                            tm_task_dept: val.tm_task_dept,
                            tm_task_dept_sec: val.tm_task_dept_sec,
                            main_task_slno: val.main_task_slno,
                            tm_task_due_date: val.tm_task_due_date,
                            tm_task_description: val.tm_task_description,
                            tm_task_status: val.tm_task_status,
                            tm_task_file: val.tm_task_file,
                        }
                        return obj
                    })
                    setTabledata(arr)
                } else {
                    setTabledata([])
                }
            }
            else {
                setTabledata([])
            }
        }
        getMasterTable(id)
    }, [id, tableCount])

    const rowSelectModal = useCallback((value) => {
        setEditModalFlag(1)
        setEditModalOpen(true)
        setimageViewModalOpen(false)
        setimage(0)
        setMasterData(value)
    }, [])

    const handleClose = useCallback(() => {
        setimage(0)
        setEditModalOpen(false)
        setEditModalFlag(0)
        setimageViewModalOpen(false)
        setImageUrls([])
    }, [setimageViewModalOpen, setEditModalOpen, setImageUrls, setimage])
    const fileView = async (val) => {
        const { tm_task_slno } = val;
        setgetarry(val);
        setEditModalOpen(false)
        setEditModalFlag(0)
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
    const isPastDue = (tm_task_due_date) => {
        const today = new Date();
        const due = new Date(tm_task_due_date);
        return due < today
    }
    return (
        <Box sx={{ width: '100%', overflow: 'auto' }}>

            {editModalFlag === 1 ?
                <EmpTaskStatus open={editModalOpen} setEditModalOpen={setEditModalOpen} masterData={masterData}
                    setEditModalFlag={setEditModalFlag} taskcount={taskcount} settaskcount={settaskcount}
                    projectcount={projectcount} setprojectcount={setprojectcount}
                    tableCount={tableCount} setTableCount={setTableCount}
                /> : image === 1 ? <ViewTaskImage imageUrls={imageUrls} open={imageViewModalOpen} handleClose={handleClose}
                    selectedImages={selectedImages} getarry={getarry} /> : null}
            {tabledata.length !== 0 ?
                <Box sx={{ width: 2300 }}>
                    <Box sx={{
                        height: 45, mt: .5, mx: .5, display: 'flex', borderBottom: 1, borderTop: 1, borderColor: 'lightgray', pt: 1.5,
                        bgcolor: 'white'
                    }}>
                        <Box sx={{ width: 40, pl: 1.7, fontWeight: 600, color: '#444444', fontSize: 12 }}>#</Box>
                        <Box sx={{ width: 60, textAlign: 'center', fontWeight: 600, color: '#444444', fontSize: 12 }}>Action</Box>
                        <Box sx={{ width: 60, textAlign: 'center', fontWeight: 600, color: '#444444', fontSize: 12, pl: 2 }}>Files</Box>
                        <Box sx={{ width: 120, textAlign: 'center', fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Status</Box>
                        <Box sx={{ width: 170, fontWeight: 600, color: '#444444', fontSize: 12, pl: 6 }}>CountDown</Box>
                        <Box sx={{ width: 800, fontWeight: 600, color: '#444444', fontSize: 12, pl: 7 }}>Task Name</Box>
                        <Box sx={{ width: 800, fontWeight: 600, color: '#444444', fontSize: 12, pl: 4 }}>Project</Box>
                        <Box sx={{ width: 250, fontWeight: 600, color: '#444444', fontSize: 12, pl: 2 }}>Created Date</Box>
                        <Box sx={{ width: 250, fontWeight: 600, color: '#444444', fontSize: 12, pl: 2 }}>Due Date</Box>
                        <Box sx={{ width: 800, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Description</Box>
                    </Box>
                    {/* <Box sx={{ height: '58vh', overflow: 'auto' }}>
                        {tabledata?.map((val, index) => {
                            return */}
                    <Virtuoso
                        style={{ height: '56vh' }}
                        totalCount={tabledata?.length}
                        itemContent={(index) => {
                            const val = tabledata[index];
                            return (
                                <Box key={val.tm_task_slno} sx={{
                                    flex: 1, display: 'flex', mt: .1, borderBottom: 2, mx: 1.5, borderColor: 'lightgrey', minHeight: 30,
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
                                    <Box sx={{ width: 170, textAlign: 'center', fontWeight: 600, }}>

                                        <Chip sx={{
                                            fontSize: 12,
                                            color: val.tm_task_status === null ? '#311E26'
                                                : val.tm_task_status === 0 ? '#311E26'
                                                    : val.tm_task_status === 1 ? '#94C973'
                                                        : val.tm_task_status === 2 ? '#D37506'
                                                            : val.tm_task_status === 3 ? '#67595E'
                                                                : val.tm_task_status === 4 ? '#5885AF'
                                                                    : 'transparent', minHeight: 5,
                                            fontWeight: 700
                                        }}>
                                            {val.tm_task_status === 0 ? 'Incompleted' : val.tm_task_status === 1 ? 'Completed' :
                                                val.tm_task_status === 2 ? 'On Progress' : val.tm_task_status === 3 ? 'On Hold' :
                                                    val.tm_task_status === 4 ? 'Pending' : 'not given'}
                                        </Chip>
                                    </Box>
                                    <Box sx={{ width: 160, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                                        {val.tm_task_status !== 1 ?
                                            <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, width: 150, pl: 1, mb: .5 }}>
                                                <CountDowncomponent DueDates={val.tm_task_due_date} />
                                            </Box> :
                                            <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 150, pl: 5, color: 'darkgreen' }}>
                                                Completed
                                            </Box>
                                        }
                                    </Box>
                                    {val.tm_task_status === 1 ?
                                        <Box sx={{ width: 800, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                            {val.tm_task_name || 'not given'}
                                        </Box> :
                                        <Box sx={{
                                            width: 800, fontWeight: 650, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12,
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
                                            width: 800, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12,
                                            textTransform: 'capitalize', pl: 1
                                        }}>
                                            {val.tm_project_name || 'not given'}
                                        </Box>
                                    }
                                    {val.tm_task_status === 1 ?
                                        <Box sx={{ width: 250, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                            {format(new Date(val.create_date), 'MMM dd, yyyy HH:mm:ss')}
                                        </Box> :
                                        <Box sx={{
                                            width: 250, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12,
                                            textTransform: 'capitalize', pl: 1
                                        }}>
                                            {format(new Date(val.create_date), 'MMM dd, yyyy HH:mm:ss')}
                                        </Box>
                                    }
                                    {val.tm_task_status === 1 ?
                                        <Box sx={{ width: 250, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                            {format(new Date(val.tm_task_due_date), 'MMM dd, yyyy HH:mm:ss')}
                                        </Box> :
                                        <Box sx={{
                                            width: 250, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12,
                                            textTransform: 'capitalize', pl: 1
                                        }}>
                                            {format(new Date(val.tm_task_due_date), 'MMM dd, yyyy HH:mm:ss')}
                                        </Box>
                                    }
                                    {val.tm_task_status === 1 ?
                                        <Box sx={{ width: 800, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                            {val.tm_task_description || 'not given'}
                                        </Box> :
                                        <Box sx={{
                                            width: 800, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12,
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
                : <Box sx={{ textAlign: 'center', width: 200, margin: 'auto', height: 500, pt: 20, fontWeight: 700, fontSize: 30, color: '#C7C8CB' }}>
                    No Dues
                </Box>}
        </Box >
    )
}

export default memo(EmpOverDueTaskList)