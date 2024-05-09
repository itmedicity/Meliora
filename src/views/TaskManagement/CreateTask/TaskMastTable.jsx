import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, CssVarsProvider, Table, Button, Tooltip, Input, } from '@mui/joy/'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import { Paper, } from '@mui/material';
import ModalEditTask from './ModalEditTask';
import ViewTaskImage from '../TaskFileView/ViewTaskImage';
import moment from 'moment';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search';
import TmProjectListSearch from 'src/views/CommonSelectCode/TmProjectListSearch';
import { getProjectList } from 'src/redux/actions/TmProjectsList.action';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action';
import CreateTask from './CreateTask';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import SelectTaskStatus from './SelectTaskStatus';
import CountDowncomponent from '../CountDown/CountDowncomponent';
import FilePresentTwoToneIcon from '@mui/icons-material/FilePresentTwoTone';

const TaskMastTable = ({ tableCount, setTableCount, statuscount, setstatuscount, taskcount, settaskcount }) => {

    const dispatch = useDispatch();
    const [tabledata, setTabledata] = useState([])
    const [masterData, setMasterData] = useState([])
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editModalFlag, setEditModalFlag] = useState(0)
    const [getarry, setgetarry] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
    const [image, setimage] = useState(0)
    const [imageUrls, setImageUrls] = useState([]);
    const [Upcomingview, setUpComingView] = useState(0)
    const [addModalOpen, setaddModalOpen] = useState(false)
    const [AddModalFlag, setAddModalFlag] = useState(0)
    const [searchFlag, setsearchFlag] = useState(0)
    const [projectz, setprojectz] = useState(0)
    const [taskstatus, setTaskStatus] = useState(1)
    const [taxkFlag, setTaxkFlag] = useState(0)
    const [projxFlag, setprojxFlag] = useState(0)
    const [statusFlag, setStatusFlag] = useState(0)
    const [statusDataFlag, setstatusDataFlag] = useState(0)
    const [statusData, setStatusData] = useState([])
    const [alphbased, setAlphbased] = useState(0)
    const [alphbasedData, setAlphbasedData] = useState([])
    const [enterText, setEnterText] = useState('')

    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })
    const addModal = useCallback(() => {
        setAddModalFlag(1)
        setaddModalOpen(true)
    }, [])
    const taskWise = useCallback(() => {
        setTaxkFlag(1)
        setprojxFlag(0)
        setStatusFlag(0)
    }, [])

    const closeTaskWise = useCallback(() => {
        setEnterText('')
        setTaxkFlag(0)
        setAlphbased(0)
        setStatusFlag(0)
        setAlphbasedData([])
    }, [])
    const projxWise = useCallback(() => {
        setprojxFlag(1)
        setTaxkFlag(0)
        setStatusFlag(0)

    }, [])
    const closeprojxWise = useCallback(() => {
        setprojxFlag(0)
        setprojectz(0)
        setStatusFlag(0)
        setTaxkFlag(0)
    }, [])

    const statusWise = useCallback(() => {
        setStatusFlag(1)
        setTaxkFlag(0)
        setprojxFlag(0)
        setTaskStatus(1)
    }, [])
    const closeStatusWise = useCallback(() => {
        setStatusFlag(0)
        setTaxkFlag(0)
        setstatusDataFlag(0)
        setprojxFlag(0)
    }, [])

    useEffect(() => {
        dispatch(getProjectList())
    }, [dispatch,])
    useEffect(() => {
        dispatch(getDepartSecemployee(empsecid))
    }, [dispatch, empsecid])

    const updateEnterText = useCallback((e) => {
        setEnterText(e.target.value)
    }, [])

    const searchData = useMemo(() => {
        return {
            tm_task_dept_sec: empsecid,
            tm_project_slno: projectz,
        }
    }, [projectz, empsecid,])

    const SearchInTable = useCallback(() => {
        const getTableTask = async () => {
            const result = await axioslogin.post(`/taskManagement/searchProjectAndEmployee`, searchData)
            const { success, data } = result.data;
            if (success === 2) {
                const arry = data?.map((val) => {
                    const obj = {
                        tm_task_slno: val.tm_task_slno,
                        dept_name: val.dept_name,
                        sec_name: val.sec_name,
                        tm_assigne_emp: val.tm_assigne_emp,
                        em_name: val.em_name,
                        tm_task_name: (val.tm_task_name).toLowerCase(),
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
                        tm_complete_date: val.tm_complete_date,
                        tm_completed_remarks: val.tm_completed_remarks,
                        create_date: val.create_date,
                    }
                    return obj
                })
                setTabledata(arry)
                setTableCount(tableCount + 1)

            } else {
                infoNotify('No Task underSection')
                setTabledata([])
            }
        }
        setsearchFlag(1)
        getTableTask(searchData)
    }, [searchData, tableCount, setTableCount])

    useEffect(() => {
        const getMainTable = async () => {
            const result = await axioslogin.get(`/taskManagement/viewMasterTaskBySecid/${empsecid}`);
            const { success, data } = result.data;
            if (data.length !== 0) {
                if (success === 2) {
                    const arry = data?.map((val) => {
                        const obj = {
                            tm_task_slno: val.tm_task_slno,
                            dept_name: val.dept_name,
                            sec_name: val.sec_name,
                            tm_assigne_emp: val.tm_assigne_emp,
                            em_name: val.em_name,
                            tm_task_name: (val.tm_task_name).toLowerCase(),
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
                            tm_completed_remarks: val.tm_completed_remarks,
                            tm_complete_date: val.tm_complete_date,
                            create_date: val.create_date,
                        }

                        return obj
                    })
                    setTabledata(arry)
                } else {
                    setUpComingView(1)
                }
            }
            else {
                setTabledata([])
            }
        }
        if (projectz === 0) {
            getMainTable(empsecid)
        }
    }, [empsecid, tableCount, setTabledata, projectz,])

    const SearchInTableByTask = useCallback(() => {
        if (enterText.length < 3) {
            infoNotify('please enter minimum 3 character to search task name')
        } else {
            let newTableDataa = tabledata && tabledata.filter((val) => val.tm_task_name.toLowerCase().includes(enterText))
            setTaxkFlag(1)
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

    const SearchInTableByTaskStatus = useCallback(() => {
        let newTablStatusDataa = tabledata && tabledata.filter((val) => val.tm_task_status === taskstatus)
        setStatusFlag(1)
        setstatusDataFlag(1)
        setStatusData(newTablStatusDataa)
    }, [taskstatus, tabledata])

    useEffect(() => {
        if (statusFlag === 1) {
            let newTablStatusDataa = tabledata && tabledata.filter((val) => val.tm_task_status === taskstatus)
            setStatusData(newTablStatusDataa)
        }
    }, [statuscount, tabledata, statusFlag, taskstatus])

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

    const rowSelectModal = useCallback((value) => {
        setEditModalFlag(1)
        setEditModalOpen(true)
        setimageViewModalOpen(false)
        setimage(0)
        setMasterData(value)
    }, [])

    const isPastDue = (tm_task_due_date) => {
        const today = new Date();
        const due = new Date(tm_task_due_date);
        return due < today
    }

    return (
        <Box sx={{ px: .5 }}>
            {editModalFlag === 1 ?
                <ModalEditTask open={editModalOpen} masterData={masterData} setEditModalOpen={setEditModalOpen}
                    setEditModalFlag={setEditModalFlag} searchFlag={searchFlag} tabledata={tabledata} setTabledata={setTabledata}
                    tableCount={tableCount} setTableCount={setTableCount} alphbased={alphbased} taskcount={taskcount} settaskcount={settaskcount}
                    statuscount={statuscount} setstatuscount={setstatuscount}
                /> : image === 1 ? <ViewTaskImage imageUrls={imageUrls} open={imageViewModalOpen} handleClose={handleClose}
                    selectedImages={selectedImages} getarry={getarry} /> : null}
            {AddModalFlag === 1 ? <CreateTask open={addModalOpen}
                tableCount={tableCount} setTableCount={setTableCount}
                setAddModalFlag={setAddModalFlag} setaddModalOpen={setaddModalOpen}
            />
                : null}
            <Box variant="outlined" sx={{ overflow: 'auto', height: 750, }}>
                <Box sx={{ display: 'flex', }}>
                    {taxkFlag === 1 || projxFlag === 1 || statusFlag === 1 ?
                        <Box sx={{ mt: 2, }}>
                            <Button onClick={addModal} variant="plain" startDecorator={<AddIcon />} size="md" sx={{ width: 150, justifyContent: 'left' }}>
                                Create task</Button>
                        </Box> :
                        <Box sx={{ mt: .5, }}>
                            <Button onClick={addModal} variant="plain" startDecorator={<AddIcon />} size="md" sx={{ width: 150, justifyContent: 'left' }}>
                                Create task</Button>
                        </Box>}
                    <Box sx={{ flex: 1, }}>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                            <Box sx={{
                                mx: 1, px: 2, cursor: 'pointer',
                                '&:hover': {
                                    color: '#0000FF',
                                    fontWeight: 500
                                }
                            }} onClick={projxWise}><SearchIcon size='xs' sx={{
                                '&:hover': {
                                    color: '#0000FF',
                                }
                            }} />Project</Box>
                            <Box sx={{
                                mx: 1, cursor: 'pointer',
                                '&:hover': {
                                    color: '#0000FF',
                                    fontWeight: 500
                                }
                            }} onClick={taskWise}><SearchIcon size='xs' sx={{
                                '&:hover': {
                                    color: '#0000FF',
                                },
                            }} />Task</Box>
                            <Box sx={{
                                mx: 1, cursor: 'pointer',
                                '&:hover': {
                                    color: '#0000FF',
                                    fontWeight: 500
                                }
                            }} onClick={statusWise}><SearchIcon size='xs' sx={{
                                '&:hover': {
                                    color: '#0000FF'
                                }
                            }} />Status</Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', }}>
                            <Box sx={{ flex: 2, }}></Box>
                            {taxkFlag === 1 ?
                                <Box sx={{ flex: 1, mt: .5, mr: 1, display: 'flex', }}>
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
                                                    onClick={SearchInTableByTask}
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
                                                    onClick={closeTaskWise}
                                                >
                                                    <HighlightOffRoundedIcon />

                                                </Box>
                                            </Tooltip>
                                        </CssVarsProvider>
                                    </Box>
                                </Box> : null}
                            {projxFlag === 1 ?
                                <Box sx={{ flex: 1, mt: .5, mr: 1, display: 'flex', }}>
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
                                                    onClick={closeprojxWise}
                                                >
                                                    <HighlightOffRoundedIcon />

                                                </Box>
                                            </Tooltip>
                                        </CssVarsProvider>
                                    </Box>
                                </Box> : null}
                            {statusFlag === 1 ?
                                <Box sx={{ flex: 1, mt: .5, mr: 1, display: 'flex', }}>
                                    <Box sx={{ flex: 1, pt: .3, pb: .3 }}>
                                        <SelectTaskStatus
                                            taskstatus={taskstatus}
                                            setTaskStatus={setTaskStatus} />
                                    </Box>
                                    <Box sx={{ pt: .3, pb: .3, mr: .3 }}>
                                        <CssVarsProvider>
                                            <Tooltip title='search'>
                                                <Box sx={{
                                                    pl: .5, bgcolor: '#90BBC2',
                                                    cursor: 'pointer', borderRight: 1, borderTop: 1, borderBottom: 1, borderColor: '#B2C4CB', height: '100%'
                                                }}
                                                    onClick={SearchInTableByTaskStatus}
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
                                                    onClick={closeStatusWise}
                                                >
                                                    <HighlightOffRoundedIcon />

                                                </Box>
                                            </Tooltip>
                                        </CssVarsProvider>
                                    </Box>
                                </Box> : null}
                        </Box>
                    </Box>
                </Box>

                <Box>
                    {((alphbased === 0) && statusDataFlag === 0) ?
                        <Box>
                            {Upcomingview === 0 ?
                                <Paper variant="outlined" sx={{ maxHeight: 680, width: '100%', overflow: 'auto', mt: .5, }}>
                                    <CssVarsProvider>
                                        <Box>
                                            {/* {tabledata.length !== 0 ? */}
                                            <Table padding={"none"} stickyHeader
                                                hoverRow>
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: 50 }}>#</th>
                                                        <th style={{ width: 60 }} >Action</th>
                                                        <th style={{ width: 60 }}>View</th>
                                                        <th style={{ width: 170 }}>Status</th>
                                                        <th style={{ width: 200, textAlign: 'center' }}>CountDown</th>
                                                        <th style={{ width: 450 }}>Task Name</th>
                                                        <th style={{ width: 450 }}>Project</th>
                                                        <th style={{ width: 200 }}>Assignee</th>
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
                                                                        sx={{ cursor: 'pointer', '&:hover': { color: '#003060' } }} size={6} onClick={() => rowSelectModal(val)}
                                                                    />
                                                                </td>
                                                                <td style={{ cursor: 'pointer', }}>
                                                                    <FilePresentTwoToneIcon sx={{
                                                                        color: '#41729F',
                                                                        '&:hover': { color: '#274472' }
                                                                    }}
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
                                                                    }} />
                                                                    {val.tm_task_status === 0 ? 'Incompleted' : val.tm_task_status === 1 ? 'Completed' :
                                                                        val.tm_task_status === 2 ? 'On Progress' : val.tm_task_status === 3 ? 'On Hold' :
                                                                            val.tm_task_status === 4 ? 'Pending' : 'not given'}</td>

                                                                <td><Box sx={{ border: .1, borderStyle: 'dashed', borderColor: '#C3CEDA', px: .5, py: .5, borderRadius: 20 }}>
                                                                    <CountDowncomponent DueDates={val.tm_task_due_date} />

                                                                </Box></td>
                                                                <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{val.tm_task_name || 'not given'}</td>
                                                                <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{val.tm_project_name || 'not given'}</td>
                                                                <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{(val.em_name || 'not given')}</td>
                                                                <td style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                                                <td style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                                                <td style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black', textTransform: 'capitalize', }}>{val.tm_task_description || 'not given'}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Box>
                                    </CssVarsProvider>
                                </Paper>
                                : (Upcomingview === 1) ? <Box sx={{ textAlign: 'center', pt: 18, height: 680, fontWeight: 700, fontSize: 30, color: '#C7C8CB', }}>
                                    No Task Created UnderSection!
                                </Box> : null}
                        </Box>
                        :
                        <Box>
                            {alphbased === 1 && statusDataFlag === 0 ?
                                <Paper variant="outlined" sx={{ maxHeight: 680, width: '100%', overflow: 'auto', mt: .5, }}>
                                    <CssVarsProvider>
                                        {alphbasedData.length !== 0 ?
                                            <Box>
                                                <Table padding={"none"} stickyHeader
                                                    hoverRow>
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: 50, }}>#</th>
                                                            <th style={{ width: 60 }} >Action</th>
                                                            <th style={{ width: 60 }}>View</th>
                                                            <th style={{ width: 170 }}>Status</th>
                                                            <th style={{ width: 250, }}>countDown</th>
                                                            <th style={{ width: 450 }}>Task Name</th>
                                                            <th style={{ width: 450 }}>Project</th>
                                                            <th style={{ width: 200 }}>Assignee</th>
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
                                                                            sx={{
                                                                                cursor: 'pointer',
                                                                                '&:hover': { color: '#003060' }
                                                                            }} size={6} onClick={() => rowSelectModal(val)}
                                                                        />
                                                                    </td>
                                                                    <td style={{ cursor: 'pointer', }}>
                                                                        <FilePresentTwoToneIcon sx={{
                                                                            color: '#41729F',
                                                                            '&:hover': { color: '#274472' }
                                                                        }}
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
                                                                        }} />
                                                                        {val.tm_task_status === 0 ? 'Incompleted' : val.tm_task_status === 1 ? 'Completed' :
                                                                            val.tm_task_status === 2 ? 'On Progress' : val.tm_task_status === 3 ? 'On Hold' :
                                                                                val.tm_task_status === 4 ? 'Pending' : 'not given'}</td>
                                                                    <td><Box sx={{ border: .1, borderStyle: 'dashed', borderColor: '#C3CEDA', pl: 1, py: .5 }}>
                                                                        <CountDowncomponent DueDates={val.tm_task_due_date} />

                                                                    </Box></td>
                                                                    <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{val.tm_task_name || 'not given'}</td>
                                                                    <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{val.tm_project_name || 'not given'}</td>
                                                                    <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{(val.em_name || 'not given')}</td>
                                                                    <td style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                                                    <td style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                                                    <td style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black', textTransform: 'capitalize', }}>{val.tm_task_description || 'not given'}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </Box>
                                            : <Box sx={{ textAlign: 'center', pt: 25, height: 680, fontWeight: 700, fontSize: 30, color: '#C7C8CB', border: 1 }}>
                                                No Matching Data
                                            </Box>}
                                    </CssVarsProvider>
                                </Paper> : null}
                            {(statusDataFlag === 1) && (alphbased === 0) ?
                                <Paper variant="outlined" sx={{ maxHeight: 680, width: '100%', overflow: 'auto', mt: .5, }}>
                                    <CssVarsProvider>
                                        {statusData.length !== 0 ?
                                            <Box>
                                                <Table padding={"none"} stickyHeader
                                                    hoverRow>
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: 50, }}>#</th>
                                                            <th style={{ width: 60 }} >Action</th>
                                                            <th style={{ width: 60 }}>View</th>
                                                            <th style={{ width: 170 }}>Status</th>
                                                            <th style={{ width: 250, }}>countDown</th>
                                                            <th style={{ width: 450 }}>Task Name</th>
                                                            <th style={{ width: 450 }}>Project</th>
                                                            <th style={{ width: 200 }}>Assignee</th>
                                                            <th style={{ width: 150 }}>Created Date</th>
                                                            <th style={{ width: 150 }}> Due Date</th>
                                                            <th style={{ width: 500 }}>Task Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {statusData?.map((val, index) => {
                                                            return (
                                                                <tr key={index}
                                                                    style={{ height: 8, background: val.main_task_slno !== null ? '#ede7f6' : val.main_task_slno === 0 ? '#ede7f6' : 'transparent', minHeight: 5 }}>
                                                                    <td> {index + 1}</td>
                                                                    <td>
                                                                        <EditIcon
                                                                            sx={{
                                                                                cursor: 'pointer',
                                                                                '&:hover': { color: '#003060' }
                                                                            }} size={6} onClick={() => rowSelectModal(val)}
                                                                        />
                                                                    </td>
                                                                    <td style={{ cursor: 'pointer', }}>
                                                                        <FilePresentTwoToneIcon sx={{
                                                                            color: '#41729F',
                                                                            '&:hover': { color: '#274472' },
                                                                        }}
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
                                                                        }} />
                                                                        {val.tm_task_status === 0 ? 'Incompleted' : val.tm_task_status === 1 ? 'Completed' :
                                                                            val.tm_task_status === 2 ? 'On Progress' : val.tm_task_status === 3 ? 'On Hold' :
                                                                                val.tm_task_status === 4 ? 'Pending' : 'not given'}</td>
                                                                    <td><Box sx={{ border: .1, borderStyle: 'dashed', borderColor: '#C3CEDA', pl: 1, py: .5 }}>
                                                                        <CountDowncomponent DueDates={val.tm_task_due_date} />
                                                                    </Box></td>
                                                                    <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{val.tm_task_name || 'not given'}</td>
                                                                    <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{val.tm_project_name || 'not given'}</td>
                                                                    <td style={{ textTransform: 'capitalize', color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{(val.em_name || 'not given')}</td>
                                                                    <td style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                                                    <td style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black' }}>{moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                                                    <td style={{ color: isPastDue(val.tm_task_due_date) ? '#970C10' : 'black', textTransform: 'capitalize', }}>{val.tm_task_description || 'not given'}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </Box>
                                            : <Box sx={{ textAlign: 'center', pt: 25, height: 680, fontWeight: 700, fontSize: 30, color: '#C7C8CB', border: 1 }}>
                                                No Task Exist Under Status
                                            </Box>}
                                    </CssVarsProvider>
                                </Paper> : null}

                        </Box>}
                </Box>
            </Box>
        </Box >
    )
}
export default memo(TaskMastTable)