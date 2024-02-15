import { Box, CssVarsProvider, Table, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import CircleIcon from '@mui/icons-material/Circle';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { warningNotify } from 'src/views/Common/CommonCode';
import TmDepartmentSelect from 'src/views/CommonSelectCode/TmDepartmentSelect';
import TmDeptSectionSelect from 'src/views/CommonSelectCode/TmDeptSectionSelect';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import SearchIcon from '@mui/icons-material/Search';
import CusIconButton from 'src/views/Components/CusIconButton';
import { useDispatch, } from 'react-redux';
import { getDepartment } from 'src/redux/actions/Department.action';
import { getProjectList } from 'src/redux/actions/TmProjectsList.action';
import ViewTaskImage from '../TaskFileView/ViewTaskImage';
import EditModalDept from './EditModalDept';

const AllTaskView = ({ taskTableCount, setTaskTableCount }) => {

    const [departments, setDepartments] = useState(0)
    const [deptsecs, setDeptSecs] = useState(0)
    const [tableData, setTableData] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
    const [image, setimage] = useState(0)
    const [imageUrls, setImageUrls] = useState([]);
    const [getarry, setgetarry] = useState([])
    const [editModalFlag, setEditModalFlag] = useState(0)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [masterData, setMasterData] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDepartment())
    }, [dispatch,])

    useEffect(() => {
        dispatch(getProjectList())
    }, [dispatch,])

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
                        dept_name: (val.dept_name).toLowerCase(),
                        sec_name: (val.sec_name).toLowerCase(),
                        em_name: (val.em_name),
                        tm_assigne_emp: val.tm_assigne_emp,
                        tm_task_dept: val.tm_task_dept,
                        tm_task_dept_sec: val.tm_task_dept_sec,
                        tm_task_due_date: val.tm_task_due_date,
                        main_task_slno: val.main_task_slno,
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
            } else {

                setTableData([])
            }
        }
        getDeptTable(searchData)
    }, [searchData])

    useEffect(() => {
        const getMasterTable = async () => {
            const result = await axioslogin.get(`/taskManagement/viewTask`);
            const { success, data } = result.data;
            if (success === 2) {
                const arry = data?.map((val) => {
                    const obj = {
                        tm_task_slno: val.tm_task_slno,
                        tm_task_name: val.tm_task_name,
                        dept_name: (val.dept_name).toLowerCase(),
                        sec_name: (val.sec_name).toLowerCase(),
                        em_name: (val.em_name),
                        tm_assigne_emp: val.tm_assigne_emp,
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
    const rowSelectModal = useCallback((value) => {
        setEditModalFlag(1)
        setEditModalOpen(true)
        setimageViewModalOpen(false)
        setimage(0)
        setMasterData(value)
    }, [])

    return (
        <Box>
            {editModalFlag === 1 ?
                <EditModalDept open={editModalOpen} masterData={masterData} setEditModalOpen={setEditModalOpen}
                    setEditModalFlag={setEditModalFlag}
                    taskTableCount={taskTableCount} setTaskTableCount={setTaskTableCount}
                /> : image === 1 ? <ViewTaskImage imageUrls={imageUrls} open={imageViewModalOpen} handleClose={handleClose}
                    selectedImages={selectedImages} getarry={getarry} /> : null}
            <CssVarsProvider>
                <Box sx={{ backgroundColor: '#FEFCFF', display: 'flex', }}>
                    <Box sx={{ flex: 1 }}></Box>
                    <Box sx={{ flex: 4, display: 'flex', }}>
                        <Box sx={{ flex: 2, py: .4 }}>
                            <Typography sx={{ pl: 1, fontWeight: 600, fontSize: 18, color: '#003B73', fontFamily: 'Georgia' }}>Department</Typography>
                            <TmDepartmentSelect
                                department={departments}
                                setDepartment={setDepartments} />
                        </Box>
                        <Box sx={{ flex: 2, py: .4, pl: .4 }}>
                            <Typography sx={{ pl: 1, fontWeight: 600, color: '#003B73', fontSize: 18, fontFamily: 'Georgia' }}>Section</Typography>
                            <TmDeptSectionSelect
                                deptsec={deptsecs}
                                setDeptSec={setDeptSecs} />
                        </Box>
                        <Box sx={{ pt: 3.5, flex: 1, display: 'flex' }}>
                            <Box sx={{ ml: 1 }}>
                                <CusIconButton size="sm" variant="outlined" color="primary"  >
                                    <CssVarsProvider>
                                        <Tooltip title="search" placement="top">
                                            <SearchIcon sx={{ color: '#274472', cursor: 'pointer' }} onClick={DeptSearch} />
                                        </Tooltip>
                                    </CssVarsProvider>
                                </CusIconButton>
                            </Box>
                            <Box sx={{ ml: .5 }}>
                                <CusIconButton size="sm" variant="outlined" color="primary" >
                                    <CssVarsProvider>
                                        <Tooltip title="Refresh" placement="top">
                                            <RefreshIcon sx={{ color: '#274472', cursor: 'pointer' }} onClick={Refreshh} />
                                        </Tooltip>
                                    </CssVarsProvider>
                                </CusIconButton>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ flexGrow: 'right', display: 'flex', justifyContent: "flex-end", mt: 4, pr: 4, flex: 1, }}>
                        <Box sx={{ pl: .3, mt: 1 }}>
                            <CircleIcon sx={{ color: '#D8CEE6' }} />subtask&nbsp;&nbsp;
                        </Box>
                    </Box>
                </Box>
            </CssVarsProvider>
            {tableData.length !== 0 ?
                <Box sx={{ height: 605 }}>
                    <Paper sx={{ overflow: 'auto', maxHeight: 605, bgcolor: 'white' }}>
                        <Table padding={"none"} stickyHeader
                            hoverRow>
                            <thead style={{ bgcolor: 'white' }}>
                                <tr>
                                    <th style={{ width: 60, fontFamily: 'Georgia' }}>#</th>
                                    <th style={{ width: 90, fontFamily: 'Georgia' }}>Action</th>
                                    <th style={{ width: 60, fontFamily: 'Georgia' }}>View</th>
                                    <th style={{ width: 100, fontFamily: 'Georgia' }}>Status</th>
                                    <th style={{ width: 350, fontFamily: 'Georgia' }}>Task name</th>
                                    <th style={{ width: 350, fontFamily: 'Georgia' }}>Project</th>
                                    <th style={{ width: 250, fontFamily: 'Georgia' }}>Department</th>
                                    <th style={{ width: 250, fontFamily: 'Georgia' }}>Section</th>
                                    <th style={{ width: 250, fontFamily: 'Georgia' }}>Assignee</th>
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
                                                    size={6}
                                                    onClick={() => rowSelectModal(val)}
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
                                                }}>{val.TaskStatus}</td>
                                            <td style={{ textTransform: 'capitalize' }}> {val.tm_task_name || 'not given'}</td>
                                            <td style={{ textTransform: 'capitalize' }}>{val.tm_project_name || 'not given'}</td>
                                            <td style={{ textTransform: 'capitalize' }}> {val.dept_name || 'not given'}</td>
                                            <td style={{ textTransform: 'capitalize' }}> {val.sec_name || 'not given'}</td>
                                            <td style={{ textTransform: 'capitalize' }}>{val.tm_detail_status === 1 ? val.em_name :
                                                val.tm_detail_status === null ? 'not assigned' : 'not given'}</td>
                                            <td> {moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                            <td> {moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                            <td> {val.tm_task_description || 'not given'}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Paper>
                </Box>
                : <Box sx={{ textAlign: 'center', pt: 25, fontWeight: 700, fontSize: 30, color: '#C7C8CB', height: 600 }}>
                    No task under section
                </Box>}
        </Box>
    )
}
export default memo(AllTaskView)