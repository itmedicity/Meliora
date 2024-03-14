import { Box, CssVarsProvider, Input, Table, Tooltip } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit'
import _ from 'underscore';
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import moment from 'moment';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import EmpTaskStatus from './EmpTaskStatus'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ViewTaskImage from '../TaskFileView/ViewTaskImage'
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import TmProjectListSearch from 'src/views/CommonSelectCode/TmProjectListSearch'
import { getProjectList } from 'src/redux/actions/TmProjectsList.action'
import { useDispatch } from 'react-redux'
import CountDowncomponent from '../CountDown/CountDowncomponent'

const EmpAllTask = ({ tableCount, setTableCount, taskcount, settaskcount, projectcount, setprojectcount }) => {
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
    const [alphbased, setAlphbased] = useState(0)
    const [alphbasedData, setAlphbasedData] = useState([])
    const [projectBasdData, setProjectBasdData] = useState([])
    const [searchFlag, setsearchFlag] = useState(0)
    const [projectz, setprojectz] = useState(0)
    const [taxkFlag, setTaxkFlag] = useState(0)
    const [projxFlag, setprojxFlag] = useState(0)
    const [enterText, setEnterText] = useState('')
    const dispatch = useDispatch();
    const updateEnterText = useCallback((e) => {
        setEnterText(e.target.value)
    }, [])
    const taskWise = useCallback(() => {
        setTaxkFlag(1)
        setprojxFlag(0)
    }, [])
    const projxWise = useCallback(() => {
        setprojxFlag(1)
        setTaxkFlag(0)
    }, [])

    const closeprojxWise = useCallback(() => {
        setprojxFlag(0)
        setprojectz(0)
        setTaxkFlag(0)
        setProjectBasdData([])
        setsearchFlag(0)
    }, [])

    useEffect(() => {
        dispatch(getProjectList())
    }, [dispatch,])

    useEffect(() => {
        const getMasterTable = async () => {
            const result = await axioslogin.get(`/TmTableView/employeeAllTask/${id}`);
            const { success, data } = result.data;
            if (data.length !== 0) {
                if (success === 2) {
                    const arry = data?.map((val) => {
                        const obj = {
                            tm_task_slno: val.tm_task_slno,
                            tm_task_name: val.tm_task_name,
                            dept_name: (val.dept_name).toLowerCase(),
                            sec_name: (val.sec_name).toLowerCase(),
                            em_name: val.em_name,
                            tm_assigne_emp: val.tm_assigne_emp,
                            tm_task_dept: val.tm_task_dept,
                            tm_task_dept_sec: val.tm_task_dept_sec,
                            tm_task_due_date: val.tm_task_due_date,
                            main_task_slno: val.main_task_slno,
                            tm_task_description: val.tm_task_description,
                            tm_task_status: val.tm_task_status,
                            tm_project_slno: val.tm_project_slno,
                            tm_project_name: val.tm_project_name,
                            tm_pending_remark: val.tm_pending_remark,
                            tm_onhold_remarks: val.tm_onhold_remarks,
                            create_date: val.create_date,
                            tm_completed_remarks: val.tm_completed_remarks,
                            TaskStatus: val.tm_task_status === 1 ? 'Completed' :
                                val.tm_task_status === 1 ? 'Completed' :
                                    val.tm_task_status === 2 ? 'On Progress' :
                                        val.tm_task_status === 3 ? 'On Hold' :
                                            val.tm_task_status === 4 ? 'Pending' :
                                                val.tm_task_status === 0 ? 'Incompleted' : 'Incompleted',
                        }
                        return obj
                    })
                    setTabledata(arry)
                } else {
                    warningNotify('error occured')
                }
            }
            else {
            }
        }
        getMasterTable(id)
    }, [id, tableCount])

    const SearchInTable = useCallback(() => {
        if (enterText.length < 3) {
            infoNotify('please enter minimum 3 character to search task name')

        } else {
            let newTableDataa = tabledata && tabledata.filter((val) => val.tm_task_name.toLowerCase().includes(enterText))
            setAlphbased(1)
            setAlphbasedData(newTableDataa)
        }
    }, [enterText, tabledata])

    useEffect(() => {
        if (alphbased === 1) {
            let newTableDataa = tabledata && tabledata.filter((val) => val.tm_task_name.toLowerCase().includes(enterText))
            setAlphbasedData(newTableDataa)
        }
    }, [taskcount, tabledata, alphbased, enterText])

    const SearchInTableProject = useCallback(() => {
        let newTableDataaProject = tabledata && tabledata.filter((val) => val.tm_project_slno === projectz)
        setsearchFlag(1)
        setProjectBasdData(newTableDataaProject)
    }, [projectz, tabledata])

    useEffect(() => {
        if (searchFlag === 1) {
            let newTableDataaProject = tabledata && tabledata.filter((val) => val.tm_project_slno === projectz)
            setProjectBasdData(newTableDataaProject)
        }
    }, [projectcount, tabledata, searchFlag, projectz])
    const exitSearch = useCallback(() => {
        setAlphbased(0)
        setAlphbasedData([])
        setEnterText('')
        setTaxkFlag(0)
    }, [])

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
        <Box>
            <Box sx={{ flex: 1, display: 'flex', }}>
                <Box sx={{ flex: 3 }}></Box>
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Box sx={{
                            mx: 1, cursor: 'pointer', '&:hover': {
                                color: '#0000FF',
                                fontWeight: 500
                            }
                        }} onClick={taskWise}><SearchIcon size='xs' sx={{
                            '&:hover': {
                                color: '#0000FF'
                            },
                        }} />Task</Box>
                        <Box sx={{
                            mx: 2, cursor: 'pointer', '&:hover': {
                                color: '#0000FF',
                                fontWeight: 500
                            }
                        }} onClick={projxWise}><SearchIcon size='xs' sx={{
                            '&:hover': {
                                color: '#0000FF'
                            },
                        }} />Project</Box>
                    </Box>
                    {taxkFlag === 1 ?
                        <Box sx={{ mr: 1, display: 'flex', }}>
                            <Box sx={{ flex: 1, pt: .3, pb: .3 }}>
                                <Input
                                    size='xs'
                                    name="enterText"
                                    value={enterText}
                                    placeholder="    TYPE HERE TO SEARCH TASK..."
                                    sx={{
                                        height: 29,
                                        borderRadius: 0,
                                        pl: 1
                                    }}
                                    onChange={updateEnterText} />
                            </Box>
                            <Box sx={{ pt: .3, pb: .3, mr: .3 }}>
                                <CssVarsProvider>
                                    <Tooltip title='search'>
                                        <Box sx={{
                                            pl: .5, bgcolor: '#90BBC2',
                                            cursor: 'pointer', borderRight: 1, borderTop: 1, borderBottom: 1, borderColor: '#B2C4CB', height: '100%'
                                        }}
                                            onClick={SearchInTable}
                                        >
                                            <SearchIcon />
                                        </Box>
                                    </Tooltip>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ pt: .3, pb: .3 }}>
                                <CssVarsProvider>
                                    <Tooltip title='exit'>
                                        <Box sx={{
                                            pl: .5, bgcolor: '#90BBC2',
                                            cursor: 'pointer', borderRight: 1, borderTop: 1, borderBottom: 1, borderColor: '#B2C4CB', height: '100%'
                                        }}
                                            onClick={exitSearch}
                                        >
                                            <HighlightOffRoundedIcon />

                                        </Box>
                                    </Tooltip>
                                </CssVarsProvider>
                            </Box>
                        </Box> : null}
                    {projxFlag === 1 ?
                        <Box sx={{ mr: 1, display: 'flex', }}>
                            <Box sx={{ flex: 1, pt: .3, pb: .3 }}>
                                <TmProjectListSearch
                                    projectz={projectz}
                                    setprojectz={setprojectz} />
                            </Box>
                            <Box sx={{ pt: .3, pb: .3, mr: .3 }}>
                                <CssVarsProvider>
                                    <Tooltip title='search'>
                                        <Box sx={{
                                            pl: .5, bgcolor: '#90BBC2',
                                            cursor: 'pointer', borderRight: 1, borderTop: 1, borderBottom: 1, borderColor: '#B2C4CB', height: '100%'
                                        }}
                                            onClick={SearchInTableProject}
                                        >
                                            <SearchIcon />
                                        </Box>
                                    </Tooltip>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ pt: .3, pb: .3 }}>
                                <CssVarsProvider>
                                    <Tooltip title='exit'>
                                        <Box sx={{
                                            pl: .5, bgcolor: '#90BBC2',
                                            cursor: 'pointer', borderRight: 1, borderTop: 1, borderBottom: 1, borderColor: '#B2C4CB', height: '100%'
                                        }}
                                            onClick={closeprojxWise}
                                        >
                                            <HighlightOffRoundedIcon />

                                        </Box>
                                    </Tooltip>
                                </CssVarsProvider>
                            </Box>
                        </Box> : null}
                </Box>
            </Box>
            <Box>
                {(alphbased === 0) && (searchFlag === 0) ?
                    <Box>
                        {tabledata.length !== 0 ?
                            <Box >
                                <Paper variant="outlined" sx={{ maxHeight: 600, maxWidth: '100%', overflow: 'auto', mt: .3 }}>
                                    {editModalFlag === 1 ?
                                        <EmpTaskStatus open={editModalOpen} setEditModalOpen={setEditModalOpen} masterData={masterData}
                                            setEditModalFlag={setEditModalFlag} searchFlag={searchFlag} taskcount={taskcount} settaskcount={settaskcount}
                                            tableCount={tableCount} setTableCount={setTableCount} projectcount={projectcount} setprojectcount={setprojectcount}
                                        /> : image === 1 ? <ViewTaskImage imageUrls={imageUrls} open={imageViewModalOpen} handleClose={handleClose}
                                            selectedImages={selectedImages} getarry={getarry} /> : null}
                                    <CssVarsProvider>
                                        <Table padding={"none"} stickyHeader
                                            hoverRow>
                                            <thead >
                                                <tr>
                                                    <th style={{ width: 50, }}>#</th>
                                                    <th style={{ width: 60 }}>Action</th>
                                                    <th style={{ width: 60 }}>View</th>
                                                    <th style={{ width: 150 }}>Status</th>
                                                    <th style={{ width: 250 }}>CountDown</th>
                                                    <th style={{ width: 500 }}>Task Name</th>
                                                    <th style={{ width: 450 }}>Project</th>
                                                    <th style={{ width: 150 }}>Created Date</th>
                                                    <th style={{ width: 150 }}> Due Date</th>
                                                    <th style={{ width: 500 }}>Task Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tabledata?.map((val, index) => {
                                                    return (
                                                        <tr key={index}
                                                            style={{ height: 8, background: val.main_task_slno !== null ? '#ede7f6' : val.main_task_slno === 0 ? '#ede7f6' : 'transparent', minHeight: 5 }}>
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
                                                            <td><Box sx={{ border: .1, borderStyle: 'dashed', borderColor: '#C3CEDA', pl: 1, py: .5 }}>
                                                                <CountDowncomponent DueDates={val.tm_task_due_date} />

                                                            </Box></td>
                                                            {val.tm_task_status === 1 ?
                                                                <td style={{ textTransform: 'capitalize' }}> {val.tm_task_name || 'not given'}</td> :
                                                                <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}> {val.tm_task_name || 'not given'}</td>}
                                                            {val.tm_task_status === 1 ?
                                                                <td style={{ textTransform: 'capitalize' }}> {val.tm_project_name || 'not given'}</td> :
                                                                <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}> {val.tm_project_name || 'not given'}</td>}
                                                            {val.tm_task_status === 1 ?
                                                                <td> {moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td> :
                                                                <td style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>}
                                                            {val.tm_task_status === 1 ?
                                                                <td> {moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td> :
                                                                <td style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>}
                                                            {val.tm_task_status === 1 ?
                                                                <td style={{ textTransform: 'capitalize' }}> {val.tm_task_description || 'not given'}</td> :
                                                                <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}> {val.tm_task_description || 'not given'}</td>}
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </CssVarsProvider>
                                </Paper>
                            </Box>
                            : <Box sx={{ textAlign: 'center', pt: 25, height: 600, fontWeight: 700, fontSize: 30, color: '#C7C8CB' }}>
                                No Assigned Task
                            </Box>}
                    </Box> :
                    <Box>
                        {alphbased === 1 && searchFlag === 0 ?
                            <Box>
                                {alphbasedData.length !== 0 ?
                                    <Box sx={{ height: 600, }}>
                                        <Paper variant="outlined" sx={{ maxHeight: 600, maxWidth: '100%', overflow: 'auto', mt: .3 }}>
                                            {editModalFlag === 1 ?
                                                <EmpTaskStatus open={editModalOpen} setEditModalOpen={setEditModalOpen} masterData={masterData}
                                                    setEditModalFlag={setEditModalFlag} searchFlag={searchFlag} taskcount={taskcount} settaskcount={settaskcount}
                                                    tableCount={tableCount} setTableCount={setTableCount} projectcount={projectcount} setprojectcount={setprojectcount}
                                                /> : image === 1 ? <ViewTaskImage imageUrls={imageUrls} open={imageViewModalOpen} handleClose={handleClose}
                                                    selectedImages={selectedImages} getarry={getarry} /> : null}
                                            <CssVarsProvider>
                                                <Table padding={"none"} stickyHeader
                                                    hoverRow>
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: 50 }}>#</th>
                                                            <th style={{ width: 60 }}>Action</th>
                                                            <th style={{ width: 60 }}>View</th>
                                                            <th style={{ width: 150 }}>Status</th>
                                                            <th style={{ width: 250 }}>CountDown</th>
                                                            <th style={{ width: 450 }}>Task Name</th>
                                                            <th style={{ width: 450 }}>Project</th>
                                                            <th style={{ width: 150 }}>Created Date</th>
                                                            <th style={{ width: 150 }}> Due Date</th>
                                                            <th style={{ width: 500 }}>Task Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {alphbasedData?.map((val, index) => {
                                                            return (
                                                                <tr key={index}
                                                                    style={{ height: 8, background: val.main_task_slno !== null ? '#ede7f6' : val.main_task_slno === 0 ? '#ede7f6' : 'transparent', minHeight: 5 }}>
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
                                                                    <td><Box sx={{ border: .1, borderStyle: 'dashed', borderColor: '#C3CEDA', pl: 1, py: .5 }}>
                                                                        <CountDowncomponent DueDates={val.tm_task_due_date} />

                                                                    </Box></td>
                                                                    {val.tm_task_status === 1 ?
                                                                        <td style={{ textTransform: 'capitalize' }}> {val.tm_task_name || 'not given'}</td> :
                                                                        <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}> {val.tm_task_name || 'not given'}</td>}
                                                                    {val.tm_task_status === 1 ?
                                                                        <td style={{ textTransform: 'capitalize' }}> {val.tm_project_name || 'not given'}</td> :
                                                                        <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}> {val.tm_project_name || 'not given'}</td>}
                                                                    {val.tm_task_status === 1 ?
                                                                        <td> {moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td> :
                                                                        <td style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>}
                                                                    {val.tm_task_status === 1 ?
                                                                        <td> {moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td> :
                                                                        <td style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>}
                                                                    {val.tm_task_status === 1 ?
                                                                        <td style={{ textTransform: 'capitalize' }}> {val.tm_task_description || 'not given'}</td> :
                                                                        <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}> {val.tm_task_description || 'not given'}</td>}
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </CssVarsProvider>
                                        </Paper>
                                    </Box>
                                    : <Box sx={{ textAlign: 'center', pt: 25, height: 600, fontWeight: 700, fontSize: 30, color: '#C7C8CB', border: 1 }}>
                                        No Matching Data
                                    </Box>}
                            </Box> : null}
                        {alphbased === 0 && searchFlag === 1 ?
                            <Box>
                                {projectBasdData.length !== 0 ?
                                    <Box sx={{ height: 600, }}>
                                        <Paper variant="outlined" sx={{ maxHeight: 600, maxWidth: '100%', overflow: 'auto', mt: .3 }}>
                                            {editModalFlag === 1 ?
                                                <EmpTaskStatus open={editModalOpen} setEditModalOpen={setEditModalOpen} masterData={masterData}
                                                    setEditModalFlag={setEditModalFlag} searchFlag={searchFlag} taskcount={taskcount} settaskcount={settaskcount}
                                                    tableCount={tableCount} setTableCount={setTableCount} projectcount={projectcount} setprojectcount={setprojectcount}
                                                /> : image === 1 ? <ViewTaskImage imageUrls={imageUrls} open={imageViewModalOpen} handleClose={handleClose}
                                                    selectedImages={selectedImages} getarry={getarry} /> : null}
                                            <CssVarsProvider>
                                                <Table padding={"none"} stickyHeader
                                                    hoverRow>
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: 50 }}>#</th>
                                                            <th style={{ width: 60 }}>Action</th>
                                                            <th style={{ width: 60 }}>View</th>
                                                            <th style={{ width: 150 }}>Status</th>
                                                            <th style={{ width: 250 }}>CountDown</th>
                                                            <th style={{ width: 450 }}>Task Name</th>
                                                            <th style={{ width: 450 }}>Project</th>
                                                            <th style={{ width: 150 }}>Created Date</th>
                                                            <th style={{ width: 150 }}> Due Date</th>
                                                            <th style={{ width: 500 }}>Task Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {projectBasdData?.map((val, index) => {
                                                            return (
                                                                <tr key={index}
                                                                    style={{ height: 8, background: val.main_task_slno !== null ? '#ede7f6' : val.main_task_slno === 0 ? '#ede7f6' : 'transparent', minHeight: 5 }}>
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
                                                                    <td><Box sx={{ border: 1, borderRadius: 3, borderColor: '#C3CEDA', pl: 1, py: .5 }}>
                                                                        {/* <CountDowncomponent DueDates={val.tm_task_due_date}
                                                                        /> */}

                                                                    </Box></td>
                                                                    {val.tm_task_status === 1 ?
                                                                        <td style={{ textTransform: 'capitalize' }}> {val.tm_task_name || 'not given'}</td> :
                                                                        <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}> {val.tm_task_name || 'not given'}</td>}
                                                                    {val.tm_task_status === 1 ?
                                                                        <td style={{ textTransform: 'capitalize' }}> {val.tm_project_name || 'not given'}</td> :
                                                                        <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}> {val.tm_project_name || 'not given'}</td>}
                                                                    {val.tm_task_status === 1 ?
                                                                        <td> {moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td> :
                                                                        <td style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>}
                                                                    {val.tm_task_status === 1 ?
                                                                        <td> {moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td> :
                                                                        <td style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>}
                                                                    {val.tm_task_status === 1 ?
                                                                        <td style={{ textTransform: 'capitalize' }}> {val.tm_task_description || 'not given'}</td> :
                                                                        <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}> {val.tm_task_description || 'not given'}</td>}
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </CssVarsProvider>
                                        </Paper>
                                    </Box>
                                    : <Box sx={{ textAlign: 'center', mt: 2, pt: 25, height: 600, fontWeight: 700, fontSize: 30, color: '#C7C8CB', border: 1 }}>
                                        Selected Project Not Assigned
                                    </Box>}
                            </Box> : null}

                    </Box>

                }
            </Box>


        </Box>
    )
}

export default memo(EmpAllTask)