import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, CssVarsProvider, Textarea, Tooltip, Typography } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useDispatch, useSelector } from 'react-redux';
import { getDepartment } from 'src/redux/actions/Department.action'
import TmDepartmentSelect from 'src/views/CommonSelectCode/TmDepartmentSelect';
import TmDeptSectionSelect from 'src/views/CommonSelectCode/TmDeptSectionSelect';
import TableViewIcon from '@mui/icons-material/TableView';
import ViewAllTask from './ViewAllTask';
import { axioslogin } from 'src/views/Axios/Axios';
import imageCompression from 'browser-image-compression';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import CloseIcon from '@mui/icons-material/Close';
import CusIconButton from 'src/views/Components/CusIconButton';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TaskSearchTable from './TaskSearchTable';
import UpdateTasks from './UpdateTasks';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import TmProjectList from 'src/views/CommonSelectCode/TmProjectList';
import { getProjectList } from 'src/redux/actions/TmProjectsList.action';
import TmMultipleEmployeeSelect from 'src/views/CommonSelectCode/TmMultipleEmployeeSelect';

const CreateMainTask = () => {
    const [department, setDepartment] = useState(0)
    const [deptsec, setDeptSec] = useState(0)
    const [flag, setflag] = useState(0)
    const [viewAllTask, setviewAllTask] = useState(0)
    const [employee, setEmployee] = useState([])
    const [selectFile, setSelectFile] = useState([]);
    const [taskTableCount, settaskTableCount] = useState(0)
    const history = useHistory()
    const [editTaskFlag, setEditTaslFlag] = useState(0)
    const [TaskDataForEdit, setTaskDataForEdit] = useState([])
    const [projectz, setprojectz] = useState(0)


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDepartment())
    }, [dispatch,])

    useEffect(() => {
        dispatch(getProjectList())
    }, [dispatch,])

    const viewAllTasks = useCallback((e) => {
        setviewAllTask(1)
    }, [setviewAllTask])

    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const [taskMast, settaskMast] = useState({
        tm_task_slno: '',
        tm_task_name: '',
        tm_task_due_date: '',
        tm_task_description: '',
        main_task_slno: '',
        tm_task_status: 0
    })
    const { tm_task_name, tm_task_due_date, tm_task_description, main_task_slno,
        tm_task_status
    } = taskMast
    const MastUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            settaskMast({ ...taskMast, [e.target.name]: value })
        },
        [taskMast],
    )
    const insertMastTask = useMemo(() => {
        return {
            tm_task_name: tm_task_name,
            tm_task_dept: department === 0 ? null : department,
            tm_task_dept_sec: deptsec === 0 ? null : deptsec,
            tm_task_due_date: tm_task_due_date === '' ? null : tm_task_due_date,
            tm_task_description: tm_task_description === '' ? null : tm_task_description,
            tm_task_status: tm_task_status,
            tm_project_slno: projectz === 0 ? null : projectz,
            create_user: id,
            main_task_slno: main_task_slno,
        }
    }, [tm_task_name,
        department,
        deptsec,
        tm_task_due_date,
        tm_task_description,
        tm_task_status,
        main_task_slno,
        projectz,
        id])

    const rowSelect = useCallback((value) => {
        setEditTaslFlag(1)
        setTaskDataForEdit(value)
        setflag(0)
    }, [setTaskDataForEdit, setflag, setEditTaslFlag])



    const reset = useCallback(() => {
        const resetMast = {
            tm_task_slno: '',
            tm_task_name: '',
            tm_task_dept: '',
            tm_task_dept_sec: '',
            tm_task_due_date: '',
            tm_task_description: '',
            main_task_slno: ''
        }
        settaskMast(resetMast)
        setDepartment(0)
        setDeptSec(0)
        setEmployee([])
        setSelectFile([])
        setprojectz(0)

    }, [settaskMast, setDepartment, setDeptSec, setEmployee, setSelectFile, setprojectz]);

    const handleFileChange = useCallback((e) => {
        const newFiles = [...selectFile]
        newFiles.push(e.target.files[0])
        setSelectFile(newFiles)
    }, [selectFile, setSelectFile])


    const handleImageUpload = useCallback(async (imageFile) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        const compressedFile = await imageCompression(imageFile, options)
        return compressedFile
    }, []);

    const SubmitTask = useCallback((e) => {
        e.preventDefault()
        const InsertMastTask = async (insertMastTask) => {
            const result = await axioslogin.post('/taskManagement/insertTask', insertMastTask)
            return result.data
        }
        const InsertDetailTask = async (insertTaskDetail) => {
            const result = await axioslogin.post('/taskManagement/insertDetail', insertTaskDetail)
            return result.data
        }
        const InsertFile = async (selectFile, insertId) => {
            try {
                const formData = new FormData();
                formData.append('id', insertId);
                for (const file of selectFile) {
                    if (file.type.startsWith('image')) {
                        const compressedFile = await handleImageUpload(file);
                        formData.append('files', compressedFile, compressedFile.name);
                    } else {
                        formData.append('files', file, file.name);
                    }
                }
                // Use the Axios instance and endpoint that matches your server setup
                const uploadResult = await axioslogin.post('/TmFileUpload/uploadFile/task', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return uploadResult.data;
            } catch (error) {
                warningNotify('An error occurred during file upload.');
            }
        };
        if (tm_task_name !== '') {
            InsertMastTask(insertMastTask).then((value) => {
                const { message, success, insertId } = value
                if (success === 1) {
                    if (employee.length !== 0) {
                        const insertTaskDetail = employee && employee.map((val) => {
                            return {
                                tm_task_slno: insertId,
                                tm_assigne_emp: val,
                                tm_detail_status: 1,
                                tm_detl_create: id
                            }
                        })
                        InsertDetailTask(insertTaskDetail).then((value) => {
                            const { message, success } = value
                            if (success === 1) {
                                if (selectFile.length !== 0) {
                                    InsertFile(selectFile, insertId).then((value) => {
                                        const { success, message } = value
                                        if (success === 1) {
                                            succesNotify("Task Created with file attach Successfully")
                                            settaskTableCount(taskTableCount + 1)
                                            reset()
                                        }
                                        else {
                                            warningNotify(message)
                                        }
                                    })
                                }
                                else {
                                    succesNotify("Task Created Successfully")
                                    settaskTableCount(taskTableCount + 1)
                                    reset()
                                }
                            }
                            else {
                                warningNotify(message)
                            }
                        })
                    }
                    // No employee assined
                    else {
                        //file attached check
                        if (selectFile.length !== 0) {
                            InsertFile(selectFile, insertId).then((value) => {
                                const { success, message } = value
                                if (success === 1) {
                                    succesNotify("Task Created with file attach Successfully")
                                    settaskTableCount(taskTableCount + 1)
                                    reset()

                                }
                                else {
                                    warningNotify(message)
                                }
                            })
                        }
                        //No file
                        else {
                            succesNotify("Task Created Successfully")
                            settaskTableCount(taskTableCount + 1)
                            reset()

                        }
                    }
                }
                else {
                    warningNotify(message)
                }
            })
        } else {
            infoNotify('Please Enter Task Name')
        }
    }, [insertMastTask, tm_task_name, selectFile, employee, handleImageUpload, id, taskTableCount, reset,
        // setInsertId,
    ])
    const handleRemoveFile = (index) => {
        setSelectFile((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1); // Remove the file at the specified index
            return updatedFiles;
        });
    };
    const BackToDash = useCallback(() => {
        history.push('/Home/TaskManagementDashboard')
    }, [history])

    return (
        <Box sx={{ height: '100%', bgcolor: '#FEFCFF', boxShadow: 2 }}>
            {viewAllTask === 1 ? <ViewAllTask setviewAllTask={setviewAllTask} taskTableCount={taskTableCount} /> :
                (<Box>
                    <Box sx={{ bgcolor: '#FEFCFF' }}>
                        <Box sx={{ height: 35, backgroundColor: '#D9E4EC', display: 'flex' }}>
                            <Box sx={{ fontWeight: 600, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>
                                Create Task
                            </Box>
                            <Box sx={{ flex: 2, display: 'flex', justifyContent: "flex-end" }}>

                                <Box sx={{ mr: .5, }} onClick={viewAllTasks}>
                                    <CusIconButton size="sm" variant="outlined" color="primary"  >
                                        <CssVarsProvider>
                                            <Tooltip title="View All Task" placement="bottom">
                                                <TableViewIcon fontSize='small' />
                                            </Tooltip>
                                        </CssVarsProvider>
                                    </CusIconButton>
                                </Box>
                                <Box>
                                    <CusIconButton size="sm" variant="outlined" color="primary"  >
                                        <Tooltip title="Close" placement="bottom" >
                                            <CloseIcon fontSize='small' onClick={BackToDash} />
                                        </Tooltip>
                                    </CusIconButton>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ bgcolor: '#FEFCFF' }}>
                            {editTaskFlag === 1 ?
                                <UpdateTasks reset={reset} TaskDataForEdit={TaskDataForEdit} taskTableCount={taskTableCount} handleFileChange={handleFileChange}
                                    settaskTableCount={settaskTableCount} setEditTaslFlag={setEditTaslFlag} selectFile={selectFile} setSelectFile={setSelectFile}
                                    flag={flag} setflag={setflag}
                                /> :
                                <Box sx={{ display: 'flex', bgcolor: '#FEFCFF' }}>
                                    <Box sx={{ flex: 1, }}>
                                        <Box sx={{ mt: 1.5, pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, height: 40, pt: 1.5, fontFamily: 'Georgia' }}>
                                            <Typography sx={{ color: '#003B73' }}>
                                                Task&nbsp;:
                                            </Typography>
                                        </Box>
                                        <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, height: 35, pt: .8, mt: 2, fontFamily: 'Georgia', }}>
                                            <Typography sx={{ color: '#003B73' }}>
                                                Project&nbsp;:
                                            </Typography>
                                        </Box>
                                        <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, height: 30, mb: 1, fontFamily: 'Georgia', }}>
                                            <Typography sx={{ color: '#003B73' }}>
                                                Department&nbsp;:
                                            </Typography>
                                        </Box>
                                        <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, height: 25, fontFamily: 'Georgia' }}>
                                            <Typography sx={{ color: '#003B73' }}>
                                                Section&nbsp;:
                                            </Typography>
                                        </Box>
                                        <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, pt: .5, fontFamily: 'Georgia' }}>
                                            <Typography sx={{ color: '#003B73' }}>
                                                Assignee&nbsp;:
                                            </Typography>
                                        </Box>
                                        <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, pt: .5, fontFamily: 'Georgia' }}>
                                            <Typography sx={{ color: '#003B73' }}>
                                                Due date&nbsp;:
                                            </Typography>
                                        </Box>
                                        <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 35, pt: .5, fontFamily: 'Georgia' }}>
                                            <Typography sx={{ color: '#003B73' }}>
                                                Description&nbsp;:
                                            </Typography>
                                        </Box>

                                    </Box>
                                    <Box sx={{ flex: 2.5, }}>

                                        <Box sx={{ mt: .5, pt: 1 }}>
                                            <CssVarsProvider>
                                                <Textarea
                                                    type="text"
                                                    size="sm"
                                                    placeholder="Task Name*"
                                                    variant="outlined"
                                                    name="tm_task_name"
                                                    value={tm_task_name}
                                                    minRows={2}
                                                    maxRows={2}
                                                    onChange={(e) => MastUpdate(e)}
                                                    sx={{ fontSize: 15, color: '#05445E' }}
                                                ></Textarea>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box sx={{ mt: .3 }}>
                                            <TmProjectList
                                                projectz={projectz}
                                                setprojectz={setprojectz} />
                                        </Box>
                                        <Box sx={{ flex: 1, pt: .3 }}>
                                            <TmDepartmentSelect
                                                department={department}
                                                setDepartment={setDepartment} />
                                        </Box>
                                        <Box sx={{ flex: 1, pt: .3 }}>
                                            <TmDeptSectionSelect
                                                deptsec={deptsec}
                                                setDeptSec={setDeptSec} />
                                        </Box>
                                        {/* <Box sx={{ flex: 1, pt: .5 }}>
                                            <CssVarsProvider>
                                                <TmMultEmpSelectUnderDeptSec
                                                    value={employee}
                                                    setValue={setEmployee}
                                                />
                                            </CssVarsProvider>
                                        </Box> */}
                                        <Box sx={{ flex: 1, mt: .5, pt: .5 }}>
                                            {/* <CssVarsProvider> */}
                                            <TmMultipleEmployeeSelect
                                                empl={employee}
                                                setEmpl={setEmployee}
                                            />
                                            {/* </CssVarsProvider> */}
                                        </Box>

                                        <Box sx={{ pt: .3 }}>
                                            <TextFieldCustom
                                                type="datetime-local"
                                                size="sm"
                                                name="tm_task_due_date"
                                                value={tm_task_due_date}
                                                onchange={MastUpdate}
                                            ></TextFieldCustom>
                                        </Box>
                                        <Box sx={{ mt: .3 }}>
                                            <CssVarsProvider>
                                                <Textarea
                                                    type="text"
                                                    size="sm"
                                                    placeholder="type here..."
                                                    variant="outlined"
                                                    minRows={3}
                                                    maxRows={4}
                                                    name="tm_task_description"
                                                    value={tm_task_description}
                                                    onChange={(e) => MastUpdate(e)}
                                                >
                                                </Textarea>
                                            </CssVarsProvider>
                                        </Box>

                                        <Box sx={{
                                            height: 50, mt: .5, border: 1, borderRadius: 1, borderStyle: 'dashed', display: 'flex',
                                            borderColor: '#C2D2D9',
                                        }}>
                                            <Box sx={{ color: '#003B73', display: 'flex', flex: 1, m: 1, border: .5, borderColor: '#B7CFDC', pl: 1, pt: .3, borderRadius: 2 }}>
                                                <Typography>fileUpload&nbsp;</Typography>
                                                <CssVarsProvider>
                                                    <label htmlFor="file-input">
                                                        <Tooltip title="File Attach" placement="bottom" >
                                                            <PermMediaIcon sx={{ color: '#738FA7', height: 25, width: 25, cursor: 'pointer', pr: .5 }} />
                                                        </Tooltip>
                                                    </label>
                                                    <input
                                                        id="file-input"
                                                        type="file"
                                                        accept=".jpg, .jpeg, .png, .pdf"
                                                        style={{ display: 'none' }}
                                                        onChange={handleFileChange}
                                                        name="file"
                                                        multiple // Add this attribute to allow multiple file selections
                                                    />
                                                </CssVarsProvider>

                                            </Box>

                                            <Box sx={{ flex: 4, overflowX: "scroll", overflow: 'hidden', }}>
                                                <Box sx={{ display: 'flex' }}>
                                                    {selectFile && selectFile.map((file, index) => (
                                                        <Box sx={{
                                                            display: "flex", flexDirection: "row", ml: .5, mt: 1.5,
                                                            backgroundColor: '#C3CEDA', borderRadius: 2, px: .5,
                                                        }} key={index} >
                                                            <Box >{file.name}</Box>
                                                            <Box sx={{ ml: .3 }}><CloseIcon sx={{ height: '17px', width: '20px', cursor: 'pointer' }}
                                                                onClick={() => handleRemoveFile(index)} /></Box>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ pt: 1, }}>
                                            <Box sx={{ margin: 'auto', width: '30%' }}>
                                                <CssVarsProvider>
                                                    <Button variant="outlined"
                                                        onClick={SubmitTask}
                                                        sx={{ fontSize: 16, width: 150 }} >Create Task</Button>
                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 3, }}></Box>
                                </Box>
                            }
                        </Box>
                        <Box sx={{ backgroundColor: '#FEFCFF', pb: .5 }}>
                            <TaskSearchTable taskTableCount={taskTableCount} settaskTableCount={settaskTableCount} rowSelect={rowSelect}
                                setEditTaslFlag={setEditTaslFlag} />
                        </Box>
                    </Box >
                </Box >)
            }
        </Box >
    )
}
export default memo(CreateMainTask)