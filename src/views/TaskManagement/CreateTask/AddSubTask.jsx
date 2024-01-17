import { Box, Button, CssVarsProvider, Textarea, Tooltip, Typography } from '@mui/joy'
import { Divider } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import TmMultEmpSelectUnderDeptSec from 'src/views/CommonSelectCode/TmMultEmpSelectUnderDeptSec'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import imageCompression from 'browser-image-compression';
import CloseIcon from '@mui/icons-material/Close';
const AddSubTask = ({ tm_task_slno, setflag, tableCount, setTableCount }) => {

    const [selectFile, setSelectFile] = useState([]);
    const [employeeSubTask, setEmployeeSubTask] = useState(0)
    const dispatch = useDispatch();

    const [subTaskMast, setSubTaskMast] = useState({
        tm_sub_task_slno: '',
        tm_subtask_name: '',
        tm_subtask_dept: '',
        tm_subtask_dept_sec: '',
        tm_subtask_duedate: '',
        tm_subtask_description: '',
        main_task_slno: '',
        tm_task_status: false
    })
    const { tm_subtask_name, tm_subtask_duedate, tm_subtask_description, tm_task_status } = subTaskMast

    const SubTaskUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setSubTaskMast({ ...subTaskMast, [e.target.name]: value })
        },
        [subTaskMast],
    )
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const secName = useSelector((state) => {
        return state.LoginUserData.empdeptsec
    })
    const empdept = useSelector((state) => {
        return state.LoginUserData.empdept
    })
    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })

    useEffect(() => {
        dispatch(getDepartSecemployee(empsecid))
    }, [dispatch, empsecid])

    const insertMastSubTask = useMemo(() => {
        return {
            main_task_slno: tm_task_slno,
            tm_task_name: tm_subtask_name === '' ? null : tm_subtask_name,
            tm_task_dept: empdept === 0 ? null : empdept,
            tm_task_dept_sec: empsecid === 0 ? null : empsecid,
            tm_task_due_date: tm_subtask_duedate === '' ? null : tm_subtask_duedate,
            tm_task_description: tm_subtask_description === '' ? null : tm_subtask_description,
            tm_task_status: tm_task_status === true ? 1 : 0,
            create_user: id,
        }
    }, [tm_task_slno, tm_subtask_name, empdept, empsecid, tm_subtask_duedate, tm_subtask_description, tm_task_status, id,])



    const handleRemoveFile = (index) => {
        setSelectFile((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1); // Remove the file at the specified index
            return updatedFiles;
        });
    };
    const closeSubTask = useCallback((e) => {
        setflag(0)
    }, [setflag])

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

    const addSubTaskData = useCallback((e) => {
        e.preventDefault()
        const InsertMastSubTask = async (insertMastSubTask) => {
            const result = await axioslogin.post('/taskManagement/insertSubTask', insertMastSubTask)
            return result.data
        }
        const InsertSubTaskDetail = async (insertSubTaskDetail) => {
            const result = await axioslogin.post('/taskManagement/insertSubtaskDetail', insertSubTaskDetail)
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
        if (tm_subtask_name !== '') {
            InsertMastSubTask(insertMastSubTask).then((value) => {
                const { message, success, insertId } = value
                if (success === 1) {
                    // setInsertsubId(insertId)
                    if (employeeSubTask !== 0) {
                        const insertSubTaskDetail = employeeSubTask && employeeSubTask.map((val) => {
                            return {
                                tm_task_slno: insertId,
                                tm_assigne_emp: val,
                                tm_detail_status: 1,
                                tm_detl_create: id
                            }
                        })
                        InsertSubTaskDetail(insertSubTaskDetail).then((value) => {
                            const { message, success } = value
                            if (success === 1) {
                                if (selectFile.length !== 0) {
                                    InsertFile(selectFile, insertId).then((value) => {
                                        const { success, message } = value
                                        if (success === 1) {
                                            succesNotify("Subtask Created with file attach Successfully")
                                            setTableCount(tableCount + 1)
                                            closeSubTask()
                                        }
                                        else {
                                            warningNotify(message)
                                        }
                                    })
                                }
                                else {
                                    succesNotify("Subtask Created Successfully")
                                    setTableCount(tableCount + 1)
                                    closeSubTask()
                                }
                            }
                            else {
                                warningNotify(message)
                            }
                        })
                    } else {
                        if (selectFile.length !== 0) {
                            InsertFile(selectFile, insertId).then((value) => {
                                const { success, message } = value
                                if (success === 1) {
                                    succesNotify("Subtask Created with file attach Successfully")
                                    setTableCount(tableCount + 1)
                                    closeSubTask()
                                }
                                else {
                                    warningNotify(message)
                                }
                            })
                        }
                        //No file
                        else {
                            succesNotify("Subtask Created Successfully")
                            setTableCount(tableCount + 1)
                            closeSubTask()
                        }
                    }
                }
                else {
                    warningNotify(message)
                }
            })
        } else {
            infoNotify('please enter subtask name')
        }
    }, [closeSubTask, id, insertMastSubTask, tm_subtask_name, selectFile, handleImageUpload, tableCount, setTableCount, employeeSubTask])

    return (
        <Box>
            <Box>
                <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#5F093D', mt: 2 }}> Add SubTask</Divider>
            </Box>
            <Box sx={{ display: 'flex', }}>
                <Box sx={{ flex: 1, }}>
                    <Box sx={{ pt: 1, pl: 2, fontSize: 18, mt: 1.2, display: 'flex', justifyContent: 'right', mr: 1 }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Subtask Name
                        </Typography>
                    </Box>
                    <Box sx={{ pl: 2, fontSize: 18, pt: 2.5, display: 'flex', justifyContent: 'right', mr: 1 }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Department
                        </Typography>
                    </Box>
                    <Box sx={{ mt: .5, pl: 2, fontSize: 18, pt: 1, display: 'flex', justifyContent: 'right', mr: 1 }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Assignee
                        </Typography>
                    </Box>
                    <Box sx={{ mt: .5, pl: 2, fontSize: 18, pt: 1, display: 'flex', justifyContent: 'right', mr: 1 }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Due date
                        </Typography>
                    </Box>
                    <Box sx={{ mt: .5, pl: 2, fontSize: 18, pt: 1, display: 'flex', justifyContent: 'right', mr: 1 }}>
                        <Typography sx={{ color: '#003B73' }}>
                            Description
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ flex: 4, }}>
                    <Box sx={{ mt: .5, pt: 1 }}>
                        <CssVarsProvider>
                            <Textarea
                                type="text"
                                size="sm"
                                placeholder="Subtask Name*"
                                variant="outlined"
                                name="tm_subtask_name"
                                value={tm_subtask_name}
                                maxRows={1}
                                onChange={(e) => SubTaskUpdate(e)}
                                sx={{ fontSize: 20, color: '#05445E' }}
                            ></Textarea>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ mt: .5 }}>
                        <TextFieldCustom
                            type="text"
                            name="secName"
                            value={secName}
                            disabled>
                        </TextFieldCustom>
                    </Box>
                    <Box sx={{ mt: .5 }}>
                        <TmMultEmpSelectUnderDeptSec
                            value={employeeSubTask}
                            setValue={setEmployeeSubTask}
                        // setemployees={setEmpNameSubTask}
                        />
                    </Box>
                    <Box sx={{ mt: .5 }}>
                        <TextFieldCustom
                            type="date"
                            size="sm"
                            name="tm_subtask_duedate"
                            value={tm_subtask_duedate}
                            onchange={SubTaskUpdate}
                        ></TextFieldCustom>
                    </Box>
                    <Box sx={{ mt: .5 }}>
                        <Textarea
                            type="text"
                            size="sm"
                            placeholder="type here..."
                            variant="outlined"
                            minRows={2}
                            maxRows={3}
                            name="tm_subtask_description"
                            value={tm_subtask_description}
                            onChange={(e) => SubTaskUpdate(e)}
                        >
                        </Textarea>
                    </Box>
                    <Box sx={{ height: 50, mt: .5, border: 1, borderRadius: 4, borderStyle: 'dashed', display: 'flex', borderColor: '#C2D2D9', }}>
                        <Box sx={{ display: 'flex', flex: 1, m: 1, border: .5, borderColor: '#B7CFDC', pl: 1, pt: .3, borderRadius: 4 }}>
                            <Typography sx={{ color: '#003B73' }}>fileUpload&nbsp;</Typography>
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
                                    <Box sx={{ display: "flex", flexDirection: "row", ml: .5, mt: 1.5, backgroundColor: '#C3CEDA', borderRadius: 2, px: .5, }} key={index} >
                                        <Box >{file.name}</Box>
                                        <Box sx={{ ml: .3 }}><CloseIcon sx={{ height: '17px', width: '20px', cursor: 'pointer' }}
                                            onClick={() => handleRemoveFile(index)} /></Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ flex: 2 }}></Box>
            </Box>
            <Box sx={{ py: 1, width: '40%', margin: 'auto', }}>
                <Button variant="outlined" sx={{ fontSize: 14, width: 180 }}
                    onClick={addSubTaskData}
                >
                    Add</Button>
            </Box>
        </Box>
    )
}
export default memo(AddSubTask)