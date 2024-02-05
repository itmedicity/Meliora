import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Avatar, Box, CssVarsProvider, Table, Tooltip, Typography } from '@mui/joy'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Paper } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import TmDepartmentSelect from 'src/views/CommonSelectCode/TmDepartmentSelect';
import TmDeptSectionSelect from 'src/views/CommonSelectCode/TmDeptSectionSelect';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import RefreshIcon from '@mui/icons-material/Refresh';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ViewTaskImage from './ViewTaskImage';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import CircleIcon from '@mui/icons-material/Circle';
import moment from 'moment';
const ViewAllTask = ({ setviewAllTask, taskTableCount }) => {
    const [tabledata, setTableData] = useState([])
    const [department, setDepartment] = useState(0)
    const [deptsec, setDeptSec] = useState(0)
    const history = useHistory()
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
    const [image, setimage] = useState(0)
    const [imageUrls, setImageUrls] = useState([]);
    const [getarry, setgetarry] = useState([])

    const searchData = useMemo(() => {
        return {
            tm_task_dept: department,
            tm_task_dept_sec: deptsec
        }
    }, [department, deptsec])

    const DeptSearch = useCallback(() => {
        const getDeptTable = async () => {
            const result = await axioslogin.post(`/taskManagement/searchDeptAndSec`, searchData)
            const { success, data } = result.data
            if (success === 2) {
                const arry = data?.map((val) => {
                    const obj = {
                        tm_task_slno: val.tm_task_slno,
                        tm_task_name: val.tm_task_name,
                        dept_name: val.dept_name,
                        sec_name: val.sec_name,
                        tm_assigne_emp: val.tm_assigne_emp,
                        em_name: val.em_name,
                        tm_task_dept: val.tm_task_dept,
                        tm_task_dept_sec: val.tm_task_dept_sec,
                        main_task_slno: val.main_task_slno,
                        tm_task_due_date: val.tm_task_due_date,
                        tm_task_description: val.tm_task_description,
                        tm_detail_status: val.tm_detail_status,
                        tm_task_status: val.tm_task_status,
                        TaskStatus: val.tm_task_status === 1 ? 'Completed' : val.tm_task_status === 0 ? 'Incompleted' : 'Incompleted',
                    }
                    return obj
                })
                setTableData(arry)
            } else {
                setTableData([])
            }
        }
        getDeptTable(searchData)
    }, [searchData])

    const handleClose = useCallback(() => {
        setimage(0)
        setimageViewModalOpen(false)
        setImageUrls([])
    }, [setimageViewModalOpen])

    useEffect(() => {
        const getMasterTable = async () => {
            const result = await axioslogin.get(`/taskManagement/viewTask`);
            const { success, data } = result.data;
            if (data.length !== 0) {
                if (success === 2) {
                    const arry = data?.map((val) => {
                        const obj = {
                            tm_task_slno: val.tm_task_slno,
                            tm_task_name: val.tm_task_name,
                            dept_name: val.dept_name,
                            sec_name: val.sec_name,
                            tm_assigne_emp: val.tm_assigne_emp,
                            em_name: val.em_name,
                            tm_task_dept: val.tm_task_dept,
                            tm_task_dept_sec: val.tm_task_dept_sec,
                            tm_task_due_date: val.tm_task_due_date,
                            main_task_slno: val.main_task_slno,
                            tm_task_description: val.tm_task_description,
                            tm_task_status: val.tm_task_status,
                            create_date: val.create_date,
                            TaskStatus: val.tm_task_status === 1 ? 'Completed' :
                                val.tm_task_status === 1 ? 'Completed' :
                                    val.tm_task_status === 2 ? 'On Progress' :
                                        val.tm_task_status === 3 ? 'On Hold' :
                                            val.tm_task_status === 4 ? 'Pending' :
                                                val.tm_task_status === 0 ? 'Incompleted' : 'Incompleted',
                        }
                        return obj
                    })

                    setTableData(arry)

                }
                else {
                    setTableData([])
                    warningNotify('error occured')
                }
            }
        }
        if (department === 0 && deptsec === 0) {
            getMasterTable()
        }
    }, [department, deptsec, taskTableCount])

    const Refreshh = useCallback(() => {
        setDepartment(0)
        setDeptSec(0)
    }, [])

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
                    warningNotify("No Image attached");
                }
            } else {
                warningNotify("No Image attached");
            }
        } catch (error) {
            warningNotify('Error in fetching files:', error);
        }
    }

    const CloseTo = useCallback(() => {
        history.push('/Home/TaskManagementCreateTask')
        setviewAllTask(0)
    }, [history, setviewAllTask])
    return (
        <CardMasterClose
            title={'View All Task'} close={CloseTo}>
            {image === 1 ? <ViewTaskImage imageUrls={imageUrls} open={imageViewModalOpen} handleClose={handleClose}
                selectedImages={selectedImages} getarry={getarry} /> : null}
            <Box sx={{ width: '100%', height: 780, borderRadius: 2, margin: 'auto', border: .1, borderColor: '#D396FF', bgcolor: '#F9F9FB' }}>
                <Box sx={{ width: '99.5%', ml: .5, mt: .5, borderRadius: 2, backgroundColor: '#D9E4EC' }}>
                    <Box sx={{ py: .5, pl: 1.5, display: 'flex' }}>

                        <CssVarsProvider>
                            <Avatar
                                color="neutral"
                                size="sm"
                                variant="outlined"
                                sx={{ bgcolor: '#ffffff' }}
                            >
                                <AssignmentIcon />
                            </Avatar>
                        </CssVarsProvider>
                        <Typography sx={{ fontWeight: 550, pt: .5, pl: .5 }}>TASK</Typography>
                    </Box>
                </Box>
                <Box sx={{ height: 80, mt: 1, boxShadow: 1, bgcolor: 'white', display: 'flex', mx: 1 }}>
                    <Box sx={{ flex: 1, display: 'flex', margin: 'auto', pb: .5, }}>
                        <Box sx={{ flex: 1 }}></Box>
                        <Box sx={{ flex: 2, p: 1 }}>
                            <Typography sx={{ pl: .5, fontWeight: 600, color: '#003B73', fontFamily: 'Georgia' }}>Department</Typography>
                            <TmDepartmentSelect
                                department={department}
                                setDepartment={setDepartment} />
                        </Box>
                        <Box sx={{ flex: 2, p: 1 }}>
                            <Typography sx={{ pl: .5, fontWeight: 600, color: '#003B73', fontFamily: 'Georgia' }}>Section</Typography>
                            <TmDeptSectionSelect
                                deptsec={deptsec}
                                setDeptSec={setDeptSec} />
                        </Box>
                        <Box sx={{ pt: 4, flex: 1, display: 'flex' }}>
                            <Box>
                                <CssVarsProvider>
                                    <Tooltip title="search" placement="top">
                                        <ContentPasteSearchIcon sx={{ color: '#274472', cursor: 'pointer' }} onClick={DeptSearch} />
                                    </Tooltip>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ pl: 1 }}>
                                <CssVarsProvider  >
                                    <Tooltip title="Refresh" placement="top">
                                        <RefreshIcon sx={{ color: '#274472', cursor: 'pointer' }} onClick={Refreshh} />
                                    </Tooltip>
                                </CssVarsProvider>
                            </Box>


                        </Box>

                    </Box>
                    <Box sx={{ flexGrow: 'right', display: 'flex', mt: 4, mr: 1 }}>
                        <Box sx={{ pl: .3, mt: 1.5, }}>
                            <CircleIcon sx={{ color: '#D8CEE6' }} />subtask&nbsp;&nbsp;
                        </Box>
                    </Box>
                </Box>
                {tabledata.length !== 0 ?
                    <Paper variant="outlined" sx={{ maxHeight: 620, flex: 1, overflow: 'auto', m: 1, }}>

                        <CssVarsProvider>
                            <Table padding={"none"} stickyHeader
                                hoverRow>
                                <thead>
                                    <tr>

                                        <th style={{ width: 50, fontFamily: 'Georgia' }}>#</th>
                                        <th style={{ width: 60, fontFamily: 'Georgia' }}>View</th>
                                        <th style={{ width: 100, fontFamily: 'Georgia' }}>Status</th>
                                        <th style={{ width: 150, fontFamily: 'Georgia' }}>Task name</th>
                                        <th style={{ width: 250, fontFamily: 'Georgia' }}>Department</th>
                                        <th style={{ width: 250, fontFamily: 'Georgia' }}>Section</th>
                                        <th style={{ width: 180, fontFamily: 'Georgia' }}>Assignee</th>
                                        <th style={{ width: 130, fontFamily: 'Georgia' }}>Created date</th>
                                        <th style={{ width: 130, fontFamily: 'Georgia' }}>Due date</th>
                                        <th style={{ width: 350, fontFamily: 'Georgia' }}>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tabledata?.map((val, index) => {
                                        return (
                                            <tr key={index}
                                                style={{
                                                    height: 8, background: val.main_task_slno !== null ? '#ede7f6' : val.main_task_slno === 0 ? '#ede7f6' : 'transparent',
                                                    minHeight: 5
                                                }}
                                            >

                                                <td > {index + 1}</td>
                                                <td style={{ cursor: 'pointer', }}>
                                                    <ImageOutlinedIcon style={{ color: '#41729F' }}
                                                        onClick={() => fileView(val)} />
                                                </td>
                                                <td
                                                    style={{
                                                        color: val.tm_task_status === null ? '#311E26'
                                                            : val.tm_task_status === 0 ? '#311E26'
                                                                : val.tm_task_status === 1 ? '#94C973'
                                                                    : val.tm_task_status === 2 ? '#EFD593'
                                                                        : val.tm_task_status === 3 ? '#747474'
                                                                            : val.tm_task_status === 4 ? '#5885AF'
                                                                                : 'transparent', minHeight: 5
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
                    : <Box sx={{ textAlign: 'center', mt: 15, fontWeight: 700, fontSize: 30, color: '#C7C8CB' }}>
                        No task under section

                    </Box>}

            </Box>

        </CardMasterClose>

    )
}

export default ViewAllTask