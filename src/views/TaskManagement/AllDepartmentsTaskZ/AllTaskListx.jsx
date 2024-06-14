import { Box, Chip, CssVarsProvider, Input, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import EditIcon from '@mui/icons-material/Edit'
import CountDowncomponent from '../CountDown/CountDowncomponent';
import ViewTaskImage from '../TaskFileView/ViewTaskImage';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import TmProjectListSearch from 'src/views/CommonSelectCode/TmProjectListSearch';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { getProjectList } from 'src/redux/actions/TmProjectsList.action';
import { useDispatch } from 'react-redux';
import SelectTaskStatus from '../CreateTask/SelectTaskStatus';
import TmDepartmentSelect from 'src/views/CommonSelectCode/TmDepartmentSelect';
import TmDeptSectionSelect from 'src/views/CommonSelectCode/TmDeptSectionSelect';
import { getDepartment } from 'src/redux/actions/Department.action';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import EditTaskInDir from './EditTaskInDir';
import { Virtuoso } from 'react-virtuoso';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import SquareSharpIcon from '@mui/icons-material/SquareSharp';

const AllTaskListx = () => {

    const dispatch = useDispatch();
    const [tableData, setTableData] = useState([])
    const [masterData, setMasterData] = useState([])
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editModalFlag, setEditModalFlag] = useState(0)
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
    const [image, setimage] = useState(0)
    const [searchFlag, setsearchFlag] = useState(0)
    const [tableCount, setTableCount] = useState(0)
    const [alphbased, setAlphbased] = useState(0)
    const [alphbasedData, setAlphbasedData] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    const [getarry, setgetarry] = useState([])
    const [statuscount, setstatuscount] = useState(0)
    const [projectz, setprojectz] = useState(0)
    const [taskstatus, setTaskStatus] = useState(1)
    const [taxkFlag, setTaxkFlag] = useState(0)
    const [projxFlag, setprojxFlag] = useState(0)
    const [statusFlag, setStatusFlag] = useState(0)
    const [projectBasdData, setProjectBasdData] = useState([])
    const [enterText, setEnterText] = useState('')
    const [statusDataFlag, setstatusDataFlag] = useState(0)
    const [statusData, setStatusData] = useState([])
    const [sectionFlag, setSectionFlag] = useState(0)
    const [borderB, setborderB] = useState(0)
    const [borderT, setborderT] = useState(0)
    const [borderS, setborderS] = useState(0)
    const [borderSec, setborderSec] = useState(0)
    const [departments, setDepartments] = useState(0)
    const [deptsecs, setDeptSecs] = useState(0)
    const [sectiondataFlag, setsectiondataFlag] = useState(0)
    const [sectionData, setsectionData] = useState([])
    const [projectcount, setProjectcount] = useState(0)
    const [taskcount, settaskcount] = useState(0)
    const [secCount, setsecCount] = useState(0)

    useEffect(() => {
        dispatch(getDepartment())
        dispatch(getProjectList())
    }, [dispatch,])

    useEffect(() => {
        const getMasterTable = async () => {
            const result = await axioslogin.get(`/taskManagement/viewTask`);
            const { success, data } = result.data;
            if (success === 2) {
                const arry = data?.map((val) => {
                    const obj = {
                        tm_task_slno: val.tm_task_slno,
                        tm_task_name: val.tm_task_name,
                        dept_name: val.dept_name,
                        sec_name: val.sec_name,
                        em_name: val.em_name,
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
                        tm_project_duedate: val.tm_project_duedate,
                        create_date: val.create_date,
                        tm_task_file: val.tm_task_file
                    }
                    return obj
                })
                setTableData(arry)
            } else {
                setTableData([])
            }
        }
        getMasterTable()
    }, [tableCount])

    const SearchInTableProject = useCallback(() => {
        if (projectz !== 0) {
            let newTableDataaProject = tableData && tableData.filter((val) => val.tm_project_slno === projectz)
            setsearchFlag(1)
            setProjectBasdData(newTableDataaProject)
        }
        else {
            infoNotify('please select a project to search')
        }
    }, [projectz, tableData])

    useEffect(() => {
        if (projxFlag === 1) {
            let newTableDataaProject = tableData && tableData.filter((val) => val.tm_project_slno === projectz)
            setProjectBasdData(newTableDataaProject)
        }
    }, [taskcount, tableData, alphbased, enterText, projectz, projxFlag])

    const SearchInTableDeptSec = useCallback(() => {
        if (deptsecs !== 0) {
            let newTableDataaSec = tableData && tableData.filter((val) => val.tm_task_dept_sec === deptsecs)
            setsectiondataFlag(1)
            setsectionData(newTableDataaSec)
        }
        else {
            infoNotify('please select Department and section to search')
        }
    }, [deptsecs, tableData])

    useEffect(() => {
        if (sectiondataFlag === 1) {
            let newTableDataaSec = tableData && tableData.filter((val) => val.tm_task_dept_sec === deptsecs)
            setsectionData(newTableDataaSec)
        }
    }, [secCount, tableData, sectiondataFlag, deptsecs])

    const updateEnterText = useCallback((e) => {
        setEnterText(e.target.value)
    }, [])

    const SearchInTableByTask = useCallback(() => {
        if (enterText.length < 3) {
            infoNotify('Please enter a minimum of 3 characters to search task name');
        } else {
            const searchText = enterText.toLowerCase();
            const newTableDataa = tableData && tableData.filter((item) => {
                const taskName = item.tm_task_name.toLowerCase();
                return taskName.includes(searchText);
            });
            setAlphbased(1);
            setAlphbasedData(newTableDataa);
        }
    }, [enterText, tableData]);

    useEffect(() => {
        if (alphbased === 1) {
            const searchText = enterText.trim().toLowerCase();
            const newTableDataa = tableData && tableData.filter((val) =>
                val.tm_task_name.trim().toLowerCase().includes(searchText)
            );
            setAlphbasedData(newTableDataa);
        }
    }, [taskcount, tableData, alphbased, enterText]);

    const SearchInTableByTaskStatus = useCallback(() => {
        let newTablStatusDataa = tableData && tableData.filter((val) => val.tm_task_status === taskstatus)
        setstatusDataFlag(1)
        setStatusData(newTablStatusDataa)
    }, [taskstatus, tableData])

    useEffect(() => {
        if (statusFlag === 1) {
            let newTablStatusDataa = tableData && tableData.filter((val) => val.tm_task_status === taskstatus)
            setStatusData(newTablStatusDataa)
        }
    }, [statuscount, tableData, statusFlag, taskstatus])

    const isPastDue = (tm_task_due_date) => {
        const today = new Date();
        const due = new Date(tm_task_due_date);
        return due < today
    }

    const projxWise = useCallback(() => {
        setprojxFlag(1)
        setTaxkFlag(0)
        setStatusFlag(0)
        setborderB(1)
        setborderT(0)
        setborderS(0)
        setSectionFlag(0)
        setborderSec(0)
    }, [])
    const taskWise = useCallback(() => {
        setTaxkFlag(1)
        setprojxFlag(0)
        setStatusFlag(0)
        setborderT(1)
        setborderB(0)
        setborderS(0)
        setSectionFlag(0)
        setborderSec(0)
    }, [])
    const statusWise = useCallback(() => {
        setStatusFlag(1)
        setTaxkFlag(0)
        setprojxFlag(0)
        setborderT(0)
        setborderS(1)
        setborderB(0)
        setSectionFlag(0)
        setborderSec(0)
    }, [])
    const sectionWise = useCallback(() => {
        setSectionFlag(1)
        setStatusFlag(0)
        setTaxkFlag(0)
        setprojxFlag(0)
        setborderT(0)
        setborderS(0)
        setborderB(0)
        setborderSec(1)
    }, [])
    const closeSearchWise = useCallback(() => {
        setprojxFlag(0)
        setprojectz(0)
        setStatusFlag(0)
        setTaxkFlag(0)
        setsearchFlag(0)
        setEnterText('')
        setAlphbased(0)
        setstatusDataFlag(0)
        setTaskStatus(1)
        setsectiondataFlag(0)
        setborderB(0)
        setborderT(0)
        setborderS(0)
        setSectionFlag(0)
        setDepartments(0)
        setDeptSecs(0)
        setborderSec(0)
    }, [])
    const rowSelectModal = useCallback((val) => {
        setEditModalFlag(1)
        setEditModalOpen(true)
        setimageViewModalOpen(false)
        setimage(0)
        setMasterData(val)
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
    return (
        <Box>
            {editModalFlag === 1 ?
                <EditTaskInDir open={editModalOpen} masterData={masterData} setEditModalOpen={setEditModalOpen}
                    setEditModalFlag={setEditModalFlag} tabledata={tableData}
                    tableCount={tableCount} setTableCount={setTableCount} alphbased={alphbased} taskcount={taskcount} settaskcount={settaskcount}
                    statuscount={statuscount} setstatuscount={setstatuscount} setsecCount={setsecCount} secCount={secCount}
                    projectcount={projectcount} setProjectcount={setProjectcount}
                /> : null}
            {image === 1 ? <ViewTaskImage imageUrls={imageUrls} open={imageViewModalOpen} handleClose={handleClose}
                selectedImages={selectedImages} getarry={getarry} /> : null}
            <Box sx={{ maxHeight: 80, flex: 1, display: 'flex', }}>
                <Box sx={{ flex: 1.5 }}>
                </Box>
                <Box sx={{ flex: 1, }}>
                    <Box sx={{ flex: 1, display: 'flex', ml: 2 }}>
                        <Box sx={{ flex: .8, display: 'flex', cursor: 'pointer', }} onClick={sectionWise} >
                            {
                                borderSec === 1 ?
                                    <SearchIcon sx={{ p: .3, color: 'blue' }} />
                                    :
                                    <SearchIcon sx={{ p: .3, }} />
                            }
                            <Typography sx={{ fontSize: 12, '&:hover': { color: 'blue' }, }}>
                                {
                                    borderSec === 1 ?
                                        <u style={{ textDecorationColor: 'blue', color: 'blue' }}>
                                            Department & Section
                                        </u>
                                        :
                                        <> Department & Section</>
                                }
                            </Typography>
                        </Box>
                        <Box sx={{ flex: .5, display: 'flex', cursor: 'pointer', }} onClick={projxWise}>
                            {
                                borderB === 1 ?
                                    <SwapVertIcon sx={{ p: .3, color: 'blue' }} />
                                    :
                                    <SwapVertIcon sx={{ p: .3, }} />
                            }
                            <Typography sx={{ fontSize: 12, '&:hover': { color: 'blue' }, }}>
                                {
                                    borderB === 1 ?
                                        <u style={{ textDecorationColor: 'blue', color: 'blue' }} >
                                            Project
                                        </u>
                                        :
                                        <>Project</>
                                }
                            </Typography>
                        </Box>
                        <Box sx={{ flex: .5, display: 'flex', cursor: 'pointer', }} onClick={taskWise}  >
                            {
                                borderT === 1 ?
                                    <FilterAltOutlinedIcon sx={{ p: .3, color: 'blue' }} />
                                    :
                                    <FilterAltOutlinedIcon sx={{ p: .3, }} />
                            }

                            <Typography sx={{ fontSize: 12, '&:hover': { color: 'blue' }, pt: .1 }}>
                                {
                                    borderT === 1 ?
                                        <u style={{ textDecorationColor: 'blue', color: 'blue' }} >
                                            Task
                                        </u>
                                        :
                                        <>Task</>
                                }
                            </Typography>
                        </Box>
                        <Box sx={{ flex: .5, display: 'flex', cursor: 'pointer', }} onClick={statusWise}>

                            {
                                borderS === 1 ?
                                    <FilterListIcon sx={{ p: .3, color: 'blue' }} />
                                    :
                                    <FilterListIcon sx={{ p: .3, }} />
                            }
                            <Typography sx={{ fontSize: 12, '&:hover': { color: 'blue' }, }} >
                                {
                                    borderS === 1 ?
                                        <u style={{ textDecorationColor: 'blue', color: 'blue' }} >
                                            Status
                                        </u>
                                        :
                                        <>Status</>
                                }
                            </Typography>
                        </Box>
                        <Box sx={{ flex: .5, display: 'flex' }}>
                            <SquareSharpIcon sx={{ color: '#EAE7FA', }} />
                            <Typography sx={{ fontSize: 13, pt: .4 }}>Subtask</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, mr: 11, ml: 5, my: 2 }}>
                        {sectionFlag === 1 ?
                            <Box sx={{ flex: 1, display: 'flex', mt: 1, mb: 2, }}>
                                <Box sx={{ flex: 1, mr: .5 }}>
                                    <TmDepartmentSelect
                                        department={departments}
                                        setDepartment={setDepartments} />
                                </Box>
                                <Box sx={{ flex: 1, }}>
                                    <TmDeptSectionSelect
                                        deptsec={deptsecs}
                                        setDeptSec={setDeptSecs} />
                                </Box>
                                <Box >
                                    <CssVarsProvider>
                                        <Tooltip title='search'>
                                            <Box sx={{
                                                pl: .5, bgcolor: '#E7F2F8',
                                                cursor: 'pointer', borderRight: 1, borderTop: 1, borderBottom: 1, borderColor: '#B2C4CB', height: '100%'
                                            }}
                                                onClick={SearchInTableDeptSec}
                                            >
                                                <SearchIcon />
                                            </Box>
                                        </Tooltip>
                                    </CssVarsProvider>
                                </Box>
                                <Box >
                                    <CssVarsProvider>
                                        <Tooltip title='exit'>
                                            <Box sx={{
                                                pl: .5, bgcolor: '#E7F2F8',
                                                cursor: 'pointer', borderRight: 1, borderTop: 1, borderBottom: 1, borderColor: '#B2C4CB', height: '100%'
                                            }}
                                                onClick={closeSearchWise}
                                            >
                                                <HighlightOffRoundedIcon />

                                            </Box>
                                        </Tooltip>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            : null}
                        {projxFlag === 1 ?
                            <Box sx={{ flex: 1, display: 'flex', mt: 1, mb: 2, }}>
                                <Box sx={{ flex: 1, }}>
                                    <TmProjectListSearch
                                        projectz={projectz}
                                        setprojectz={setprojectz}
                                    />
                                </Box>
                                <Box >
                                    <CssVarsProvider>
                                        <Tooltip title='search'>
                                            <Box sx={{
                                                pl: .5, bgcolor: '#E7F2F8',
                                                cursor: 'pointer', borderRight: 1, borderTop: 1, borderBottom: 1, borderColor: '#B2C4CB', height: '100%'
                                            }}
                                                onClick={SearchInTableProject}
                                            >
                                                <SearchIcon />
                                            </Box>
                                        </Tooltip>
                                    </CssVarsProvider>
                                </Box>
                                <Box >
                                    <CssVarsProvider>
                                        <Tooltip title='exit'>
                                            <Box sx={{
                                                pl: .5, bgcolor: '#E7F2F8',
                                                cursor: 'pointer', borderRight: 1, borderTop: 1, borderBottom: 1, borderColor: '#B2C4CB', height: '100%'
                                            }}
                                                onClick={closeSearchWise}
                                            >
                                                <HighlightOffRoundedIcon />

                                            </Box>
                                        </Tooltip>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            : null}

                        {taxkFlag === 1 ?
                            <Box sx={{ flex: 1, display: 'flex', mt: 1, mb: 2, }}>
                                <Box sx={{ flex: 1, }}>
                                    <Input
                                        size='xs'
                                        name="enterText"
                                        value={enterText}
                                        placeholder="type task name to search..."
                                        sx={{
                                            height: 29,
                                            borderRadius: 0,
                                            pl: 1
                                        }}
                                        onChange={updateEnterText} />

                                </Box>
                                <Box >
                                    <CssVarsProvider>
                                        <Tooltip title='search'>
                                            <Box sx={{
                                                pl: .5, bgcolor: '#E7F2F8',
                                                cursor: 'pointer', borderRight: 1, borderTop: 1, borderBottom: 1, borderColor: '#B2C4CB', height: '100%'
                                            }}
                                                onClick={SearchInTableByTask}
                                            >
                                                <SearchIcon />
                                            </Box>
                                        </Tooltip>
                                    </CssVarsProvider>
                                </Box>
                                <Box >
                                    <CssVarsProvider>
                                        <Tooltip title='exit'>
                                            <Box sx={{
                                                pl: .5, bgcolor: '#E7F2F8',
                                                cursor: 'pointer', borderRight: 1, borderTop: 1, borderBottom: 1, borderColor: '#B2C4CB', height: '100%'
                                            }}
                                                onClick={closeSearchWise}
                                            >
                                                <HighlightOffRoundedIcon />

                                            </Box>
                                        </Tooltip>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            : null}

                        {statusFlag === 1 ?
                            <Box sx={{ flex: 1, display: 'flex', mt: 1, mb: 2, }}>
                                <Box sx={{ flex: 1, }}>
                                    <SelectTaskStatus
                                        taskstatus={taskstatus}
                                        setTaskStatus={setTaskStatus} />

                                </Box>
                                <Box >
                                    <CssVarsProvider>
                                        <Tooltip title='search'>
                                            <Box sx={{
                                                pl: .5, bgcolor: '#E7F2F8',
                                                cursor: 'pointer', borderRight: 1, borderTop: 1, borderBottom: 1, borderColor: '#B2C4CB', height: '100%'
                                            }}
                                                onClick={SearchInTableByTaskStatus}
                                            >
                                                <SearchIcon />
                                            </Box>
                                        </Tooltip>
                                    </CssVarsProvider>
                                </Box>
                                <Box >
                                    <CssVarsProvider>
                                        <Tooltip title='exit'>
                                            <Box sx={{
                                                pl: .5, bgcolor: '#E7F2F8',
                                                cursor: 'pointer', borderRight: 1, borderTop: 1, borderBottom: 1, borderColor: '#B2C4CB', height: '100%'
                                            }}
                                                onClick={closeSearchWise}
                                            >
                                                <HighlightOffRoundedIcon />

                                            </Box>
                                        </Tooltip>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            : null}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <Box sx={{
                    flex: 1, height: 45, mt: .5, mx: 1.5, display: 'flex', borderBottom: 1, borderTop: 1, borderColor: 'lightgray', pt: 1.5,
                    bgcolor: 'white'
                }}>
                    <Box sx={{ width: 30, pl: 1.7, fontWeight: 600, color: '#444444', fontSize: 12 }}>#</Box>
                    <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 600, color: '#444444', fontSize: 12 }}>Action</Box>
                    <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 600, color: '#444444', fontSize: 12 }}>&nbsp;Files</Box>
                    <Box sx={{ flex: 2, textAlign: 'center', fontWeight: 600, color: '#444444', fontSize: 12 }}>Status</Box>
                    <Box sx={{ flex: 3, fontWeight: 600, color: '#444444', fontSize: 12, }}>&nbsp;&nbsp;&nbsp;CountDown</Box>
                    <Box sx={{ flex: 7, fontWeight: 600, color: '#444444', fontSize: 12, }}>Task Name</Box>
                    <Box sx={{ flex: 4, fontWeight: 600, color: '#444444', fontSize: 12 }}>Department</Box>
                    <Box sx={{ flex: 4, fontWeight: 600, color: '#444444', fontSize: 12 }}>Department Section</Box>
                </Box>
                <Box>
                    {(alphbased === 0) && (searchFlag === 0) && (statusDataFlag === 0) && (sectiondataFlag === 0) ?
                        <Virtuoso
                            style={{ height: '58vh' }}
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
                                        <Box sx={{ width: 30, pl: 1.7, fontWeight: 600, color: 'grey', fontSize: 12 }}>{index + 1}</Box>
                                        <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 600, color: 'grey', fontSize: 12 }}>
                                            <EditIcon
                                                sx={{ cursor: 'pointer', '&:hover': { color: '#003060' } }} size={6}
                                                onClick={() => rowSelectModal(val)}
                                            />
                                        </Box>
                                        <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 600, color: 'grey', fontSize: 12, cursor: 'pointer' }}>&nbsp;
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
                                        <Box sx={{ flex: 2, textAlign: 'center', fontWeight: 600, }}>
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
                                        <Box sx={{ flex: 3, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                                            {val.tm_task_status !== 1 ?
                                                <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 150, pl: 1 }}>
                                                    <CountDowncomponent DueDates={val.tm_task_due_date} />
                                                </Box> :
                                                <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 150, pl: 5, color: 'darkgreen' }}>
                                                    Completed
                                                </Box>
                                            }
                                        </Box>
                                        {val.tm_task_status === 1 ?
                                            <Box sx={{ flex: 7, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                {val.tm_task_name || 'not given'}
                                            </Box> :
                                            <Box sx={{ flex: 7, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                {val.tm_task_name || 'not given'}
                                            </Box>
                                        }
                                        {val.tm_task_status === 1 ?
                                            <Box sx={{ flex: 4, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                {val.dept_name || 'not given'}
                                            </Box> :
                                            <Box sx={{ flex: 4, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                {val.dept_name || 'not given'}
                                            </Box>
                                        }
                                        {val.tm_task_status === 1 ?
                                            <Box sx={{ flex: 4, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                {val.sec_name || 'not given'}
                                            </Box> :
                                            <Box sx={{ flex: 4, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                {val.sec_name || 'not given'}
                                            </Box>
                                        }
                                    </Box>
                                );
                            }}
                        /> :
                        (alphbased === 0) && (projxFlag === 1) && (statusDataFlag === 0) ?
                            <Virtuoso
                                style={{ height: '58vh' }}
                                totalCount={projectBasdData?.length}
                                itemContent={(index) => {
                                    const val = projectBasdData[index];
                                    return (
                                        <Box key={val.tm_task_slno} sx={{
                                            flex: 1, display: 'flex', mt: .3, borderBottom: 2, mx: 1.5, borderColor: 'lightgrey', minHeight: 30,
                                            maxHeight: 80,
                                            background: val.main_task_slno !== null ? '#EAE7FA' : val.main_task_slno === 0 ? 'white' : 'white',
                                            pt: .5,
                                        }}>
                                            <Box sx={{ width: 30, pl: 1.7, fontWeight: 600, color: 'grey', fontSize: 12 }}>{index + 1}</Box>
                                            <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 600, color: 'grey', fontSize: 12 }}>
                                                <EditIcon
                                                    sx={{ cursor: 'pointer', '&:hover': { color: '#003060' } }} size={6}
                                                    onClick={() => rowSelectModal(val)}
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 600, color: 'grey', fontSize: 12, cursor: 'pointer' }}>&nbsp;
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
                                            <Box sx={{ flex: 2, textAlign: 'center', fontWeight: 600, }}>
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
                                            <Box sx={{ flex: 3, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                                                {val.tm_task_status !== 1 ?
                                                    <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 150, pl: 1 }}>
                                                        <CountDowncomponent DueDates={val.tm_task_due_date} />
                                                    </Box> :
                                                    <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 150, pl: 5, color: 'darkgreen' }}>
                                                        Completed
                                                    </Box>
                                                }
                                            </Box>
                                            {val.tm_task_status === 1 ?
                                                <Box sx={{ flex: 7, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                    {val.tm_task_name || 'not given'}
                                                </Box> :
                                                <Box sx={{ flex: 7, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                    {val.tm_task_name || 'not given'}
                                                </Box>
                                            }
                                            {val.tm_task_status === 1 ?
                                                <Box sx={{ flex: 4, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                    {val.dept_name || 'not given'}
                                                </Box> :
                                                <Box sx={{ flex: 4, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                    {val.dept_name || 'not given'}
                                                </Box>
                                            }
                                            {val.tm_task_status === 1 ?
                                                <Box sx={{ flex: 4, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                    {val.sec_name || 'not given'}
                                                </Box> :
                                                <Box sx={{ flex: 4, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                    {val.sec_name || 'not given'}
                                                </Box>
                                            }
                                        </Box>
                                    );
                                }}
                            /> :
                            (alphbased === 1) && (projxFlag === 0) && (statusDataFlag === 0) ?
                                <Virtuoso
                                    style={{ height: '58vh' }}
                                    totalCount={alphbasedData?.length}
                                    itemContent={(index) => {
                                        const val = alphbasedData[index];
                                        return (
                                            <Box key={val.tm_task_slno} sx={{
                                                flex: 1, display: 'flex', mt: .3, borderBottom: 2, mx: 1.5, borderColor: 'lightgrey', minHeight: 30,
                                                maxHeight: 80,
                                                background: val.main_task_slno !== null ? '#EAE7FA' : val.main_task_slno === 0 ? 'white' : 'white',
                                                pt: .5,
                                            }}>
                                                <Box sx={{ width: 30, pl: 1.7, fontWeight: 600, color: 'grey', fontSize: 12 }}>{index + 1}</Box>
                                                <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 600, color: 'grey', fontSize: 12 }}>
                                                    <EditIcon
                                                        sx={{ cursor: 'pointer', '&:hover': { color: '#003060' } }} size={6}
                                                        onClick={() => rowSelectModal(val)}
                                                    />
                                                </Box>
                                                <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 600, color: 'grey', fontSize: 12, cursor: 'pointer' }}>&nbsp;
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
                                                <Box sx={{ flex: 2, textAlign: 'center', fontWeight: 600, }}>
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
                                                <Box sx={{ flex: 3, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                                                    {val.tm_task_status !== 1 ?
                                                        <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 150, pl: 1 }}>
                                                            <CountDowncomponent DueDates={val.tm_task_due_date} />
                                                        </Box> :
                                                        <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 150, pl: 5, color: 'darkgreen' }}>
                                                            Completed
                                                        </Box>
                                                    }
                                                </Box>
                                                {val.tm_task_status === 1 ?
                                                    <Box sx={{ flex: 7, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                        {val.tm_task_name || 'not given'}
                                                    </Box> :
                                                    <Box sx={{ flex: 7, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                        {val.tm_task_name || 'not given'}
                                                    </Box>
                                                }
                                                {val.tm_task_status === 1 ?
                                                    <Box sx={{ flex: 4, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                        {val.dept_name || 'not given'}
                                                    </Box> :
                                                    <Box sx={{ flex: 4, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                        {val.dept_name || 'not given'}
                                                    </Box>
                                                }
                                                {val.tm_task_status === 1 ?
                                                    <Box sx={{ flex: 4, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                        {val.sec_name || 'not given'}
                                                    </Box> :
                                                    <Box sx={{ flex: 4, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                        {val.sec_name || 'not given'}
                                                    </Box>
                                                }
                                            </Box>
                                        );
                                    }}
                                /> :
                                (statusDataFlag === 1) && (alphbased === 0) && (projxFlag === 0) ?
                                    <Virtuoso
                                        style={{ height: '58vh' }}
                                        totalCount={statusData?.length}
                                        itemContent={(index) => {
                                            const val = statusData[index];
                                            return (
                                                <Box key={val.tm_task_slno} sx={{
                                                    flex: 1, display: 'flex', mt: .3, borderBottom: 2, mx: 1.5, borderColor: 'lightgrey', minHeight: 30,
                                                    maxHeight: 80,
                                                    background: val.main_task_slno !== null ? '#EAE7FA' : val.main_task_slno === 0 ? 'white' : 'white',
                                                    pt: .5,
                                                }}>
                                                    <Box sx={{ width: 30, pl: 1.7, fontWeight: 600, color: 'grey', fontSize: 12 }}>{index + 1}</Box>
                                                    <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 600, color: 'grey', fontSize: 12 }}>
                                                        <EditIcon
                                                            sx={{ cursor: 'pointer', '&:hover': { color: '#003060' } }} size={6}
                                                            onClick={() => rowSelectModal(val)}
                                                        />
                                                    </Box>
                                                    <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 600, color: 'grey', fontSize: 12, cursor: 'pointer' }}>&nbsp;
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
                                                    <Box sx={{ flex: 2, textAlign: 'center', fontWeight: 600, }}>
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
                                                    <Box sx={{ flex: 3, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                                                        {val.tm_task_status !== 1 ?
                                                            <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 150, pl: 1 }}>
                                                                <CountDowncomponent DueDates={val.tm_task_due_date} />
                                                            </Box> :
                                                            <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 150, pl: 5, color: 'darkgreen' }}>
                                                                Completed
                                                            </Box>
                                                        }
                                                    </Box>
                                                    {val.tm_task_status === 1 ?
                                                        <Box sx={{ flex: 7, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                            {val.tm_task_name || 'not given'}
                                                        </Box> :
                                                        <Box sx={{ flex: 7, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                            {val.tm_task_name || 'not given'}
                                                        </Box>
                                                    }
                                                    {val.tm_task_status === 1 ?
                                                        <Box sx={{ flex: 4, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                            {val.dept_name || 'not given'}
                                                        </Box> :
                                                        <Box sx={{ flex: 4, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                            {val.dept_name || 'not given'}
                                                        </Box>
                                                    }
                                                    {val.tm_task_status === 1 ?
                                                        <Box sx={{ flex: 4, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                            {val.sec_name || 'not given'}
                                                        </Box> :
                                                        <Box sx={{ flex: 4, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                            {val.sec_name || 'not given'}
                                                        </Box>
                                                    }
                                                </Box>
                                            );
                                        }}
                                    /> :
                                    (statusDataFlag === 0) && (alphbased === 0) && (projxFlag === 0) && (sectionFlag === 1) ?
                                        <Virtuoso
                                            style={{ height: '58vh' }}
                                            totalCount={sectionData?.length}
                                            itemContent={(index) => {
                                                const val = sectionData[index];
                                                return (
                                                    <Box key={val.tm_task_slno} sx={{
                                                        flex: 1, display: 'flex', mt: .3, borderBottom: 2, mx: 1.5, borderColor: 'lightgrey', minHeight: 30,
                                                        maxHeight: 80,
                                                        background: val.main_task_slno !== null ? '#EAE7FA' : val.main_task_slno === 0 ? 'white' : 'white',
                                                        pt: .5,
                                                    }}>
                                                        <Box sx={{ width: 30, pl: 1.7, fontWeight: 600, color: 'grey', fontSize: 12 }}>{index + 1}</Box>
                                                        <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 600, color: 'grey', fontSize: 12 }}>
                                                            <EditIcon
                                                                sx={{ cursor: 'pointer', '&:hover': { color: '#003060' } }} size={6}
                                                                onClick={() => rowSelectModal(val)}
                                                            />
                                                        </Box>
                                                        <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 600, color: 'grey', fontSize: 12, cursor: 'pointer' }}>&nbsp;
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
                                                        <Box sx={{ flex: 2, textAlign: 'center', fontWeight: 600, }}>
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
                                                        <Box sx={{ flex: 3, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                                                            {val.tm_task_status !== 1 ?
                                                                <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 150, pl: 1 }}>
                                                                    <CountDowncomponent DueDates={val.tm_task_due_date} />
                                                                </Box> :
                                                                <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 150, pl: 5, color: 'darkgreen' }}>
                                                                    Completed
                                                                </Box>
                                                            }
                                                        </Box>
                                                        {val.tm_task_status === 1 ?
                                                            <Box sx={{ flex: 7, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                                {val.tm_task_name || 'not given'}
                                                            </Box> :
                                                            <Box sx={{ flex: 7, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                                {val.tm_task_name || 'not given'}
                                                            </Box>
                                                        }
                                                        {val.tm_task_status === 1 ?
                                                            <Box sx={{ flex: 4, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                                {val.dept_name || 'not given'}
                                                            </Box> :
                                                            <Box sx={{ flex: 4, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                                {val.dept_name || 'not given'}
                                                            </Box>
                                                        }
                                                        {val.tm_task_status === 1 ?
                                                            <Box sx={{ flex: 4, fontWeight: 600, color: 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                                {val.sec_name || 'not given'}
                                                            </Box> :
                                                            <Box sx={{ flex: 4, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey', fontSize: 12, textTransform: 'capitalize', pl: 1 }}>
                                                                {val.sec_name || 'not given'}
                                                            </Box>
                                                        }
                                                    </Box>
                                                );
                                            }}
                                        />

                                        : <Box></Box>}
                </Box>
            </Box>
            <Box sx={{ height: 5 }}>
            </Box>
        </Box >
    )
}

export default memo(AllTaskListx)