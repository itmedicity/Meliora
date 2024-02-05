import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, CssVarsProvider, Typography, Tooltip, Table } from '@mui/joy';
import { Divider, Paper } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import TmDepartmentSelect from 'src/views/CommonSelectCode/TmDepartmentSelect';
import TmDeptSectionSelect from 'src/views/CommonSelectCode/TmDeptSectionSelect';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import moment from 'moment';
import ViewTaskImage from './ViewTaskImage';
import CircleIcon from '@mui/icons-material/Circle';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
const TaskSearchTable = ({ rowSelect, taskTableCount, setEditTaslFlag, }) => {
    const [departments, setDepartments] = useState(0)
    const [deptsecs, setDeptSecs] = useState(0)
    const [tableData, setTableData] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
    const [image, setimage] = useState(0)
    const [imageUrls, setImageUrls] = useState([]);
    const [getarry, setgetarry] = useState([])



    const searchData = useMemo(() => {
        return {
            tm_task_dept: departments,
            tm_task_dept_sec: deptsecs
        }
    }, [departments, deptsecs])

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
                        tm_task_due_date: val.tm_task_due_date,
                        main_task_slno: val.main_task_slno,
                        tm_task_description: val.tm_task_description,
                        tm_detail_status: val.tm_detail_status,
                        tm_task_status: val.tm_task_status,
                        tm_project_name: val.tm_project_name,
                        tm_project_slno: val.tm_project_slno,
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
            } else {

                setTableData([])
            }
        }
        getDeptTable(searchData)
        setEditTaslFlag(0)
    }, [searchData, setEditTaslFlag])

    useEffect(() => {
        const getMasterTable = async () => {
            const result = await axioslogin.get(`/taskManagement/viewTask`);
            const { success, data } = result.data;
            // if (data.length !== 0) {
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
                        tm_project_name: val.tm_project_name,
                        tm_project_slno: val.tm_project_slno,
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


                // } else {
                //     setTableData([])
                //     warningNotify('error occured')
                // }

            } else {
                setTableData([])
            }
        }
        if (departments === 0 && deptsecs === 0) {
            getMasterTable()
        }

    }, [taskTableCount, departments, deptsecs])

    const Refreshh = useCallback(() => {
        setDepartments(0)
        setDeptSecs(0)
    }, [])

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
        <Box >
            {image === 1 ? <ViewTaskImage imageUrls={imageUrls} open={imageViewModalOpen} handleClose={handleClose}
                selectedImages={selectedImages} getarry={getarry} /> : null}
            <CssVarsProvider>
                <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#5F093D', mt: 2, fontFamily: 'Georgia' }}>TASKS</Divider>
                <Box sx={{ width: '100%', backgroundColor: '#FEFCFF', borderTopLeftRadius: 5, borderTopRightRadius: 5, display: 'flex', }}>
                    <Box sx={{ flex: 1 }}></Box>
                    <Box sx={{ flex: 4, display: 'flex', margin: 'auto', pb: .5, }}>
                        <Box sx={{ flex: 2, py: .4 }}>
                            <Typography sx={{ pl: .5, fontWeight: 600, fontSize: 18, color: '#003B73', fontFamily: 'Georgia' }}>Department</Typography>
                            <TmDepartmentSelect
                                department={departments}
                                setDepartment={setDepartments} />
                        </Box>
                        <Box sx={{ flex: 2, py: .4, pl: .4 }}>
                            <Typography sx={{ pl: .5, fontWeight: 600, color: '#003B73', fontSize: 18, fontFamily: 'Georgia' }}>Section</Typography>
                            <TmDeptSectionSelect
                                deptsec={deptsecs}
                                setDeptSec={setDeptSecs} />
                        </Box>
                        <Box sx={{ pt: 4, px: 1, flex: 1, }}>
                            <CssVarsProvider>
                                <Tooltip title="search" placement="top">
                                    <ContentPasteSearchIcon sx={{ color: '#274472', cursor: 'pointer' }} onClick={DeptSearch} />
                                </Tooltip>
                            </CssVarsProvider>
                            <CssVarsProvider  >
                                <Tooltip title="Refresh" placement="top">
                                    <RefreshIcon sx={{ color: '#274472', cursor: 'pointer' }} onClick={Refreshh} />
                                </Tooltip>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{ flexGrow: 'right', display: 'flex', justifyContent: "flex-end", mt: 4, pr: 4, flex: 1, }}>

                        <Box sx={{ pl: .3, mt: 1, }}>
                            <CircleIcon sx={{ color: '#D8CEE6' }} />subtask&nbsp;&nbsp;

                        </Box>
                    </Box>
                </Box>
                <Box variant="outlined" sx={{ backgroundColor: '#FEFCFF', px: 1.1, height: 470 }}>
                    {tableData.length !== 0 ?
                        <Paper variant="outlined" sx={{ maxHeight: 450, maxWidth: '100%', pb: 2, overflow: 'auto', mt: .5, bgcolor: 'white' }}>
                            <CssVarsProvider>
                                <Table padding={"none"} stickyHeader
                                    hoverRow>
                                    <thead>
                                        <tr>

                                            <th style={{ width: 60, fontFamily: 'Georgia' }}>#</th>
                                            <th style={{ width: 90, fontFamily: 'Georgia' }}>Action</th>
                                            <th style={{ width: 60, fontFamily: 'Georgia' }}>View</th>
                                            <th style={{ width: 100, fontFamily: 'Georgia' }}>Status</th>
                                            <th style={{ width: 150, fontFamily: 'Georgia' }}>Task name</th>
                                            <th style={{ width: 150, fontFamily: 'Georgia' }}>Project</th>
                                            <th style={{ width: 250, fontFamily: 'Georgia' }}>Department</th>
                                            <th style={{ width: 250, fontFamily: 'Georgia' }}>Section</th>
                                            <th style={{ width: 180, fontFamily: 'Georgia' }}>Assignee</th>
                                            <th style={{ width: 130, fontFamily: 'Georgia' }}>Created date</th>
                                            <th style={{ width: 130, fontFamily: 'Georgia' }}>Due date</th>
                                            <th style={{ width: 320, fontFamily: 'Georgia' }}>Description</th>
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
                                                            sx={{ cursor: 'pointer' }}
                                                            size={6} onClick={() => rowSelect(val)}
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
                                                    <td>{val.tm_project_name || 'not given'}</td>
                                                    <td> {val.dept_name || 'not given'}</td>
                                                    <td> {val.sec_name || 'not given'}</td>
                                                    <td>{val.tm_detail_status === 1 ? val.em_name : val.tm_detail_status === null ? 'not given' : 'no'}</td>
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
                        : <Box sx={{ textAlign: 'center', mt: 5, fontWeight: 700, fontSize: 30, color: '#C7C8CB' }}>
                            No task under section
                        </Box>}
                </Box>
            </CssVarsProvider >
        </Box >
    )
}

export default TaskSearchTable
