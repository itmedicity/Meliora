import React, { useCallback, useEffect, useState, useMemo, memo } from 'react'
import { Box, CssVarsProvider, Modal, ModalDialog, Textarea, Typography, } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import Button from '@mui/joy/Button';
import { axioslogin } from 'src/views/Axios/Axios';
import { useDispatch, useSelector } from 'react-redux';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TmMultEmpSelectUnderDeptSec from 'src/views/CommonSelectCode/TmMultEmpSelectUnderDeptSec';
import Tooltip from '@mui/joy/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import imageCompression from 'browser-image-compression';
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import TmProjectList from 'src/views/CommonSelectCode/TmProjectList';
import { getProjectList } from 'src/redux/actions/TmProjectsList.action';
import moment from 'moment';

const CreateTask = ({ open, setAddModalFlag, setaddModalOpen, tableCount, setTableCount }) => {
    const dispatch = useDispatch();
    const [selectFile, setSelectFile] = useState([]);
    const [employee, setEmployee] = useState([])
    const [insertId, setInsertId] = useState(0)
    const [projectz, setprojectz] = useState(0)

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

    useEffect(() => {
        dispatch(getProjectList())
    }, [dispatch,])

    const [taskMast, settaskMast] = useState({
        tm_task_slno: '',
        tm_task_name: '',
        tm_task_dept: '',
        tm_task_dept_sec: '',
        tm_task_due_date: '',
        tm_task_description: '',
        tm_onhold_remarks: '',
        tm_pending_remark: '',
        tm_completed_remarks: '',
        main_task_slno: '',
        tm_task_status: 0,
        tm_complete_date: ''
    })
    const { tm_task_name, tm_task_due_date, tm_task_description, main_task_slno, tm_onhold_remarks, tm_pending_remark, tm_completed_remarks,
        tm_task_status, tm_complete_date } = taskMast

    const MastUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            settaskMast({ ...taskMast, [e.target.name]: value })
        },
        [taskMast],
    )
    const handleRemoveFile = (index) => {
        setSelectFile((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1); // Remove the file at the specified index
            return updatedFiles;
        });
    };
    const insertMastTask = useMemo(() => {
        return {
            tm_task_name: tm_task_name,
            tm_task_dept: empdept,
            tm_task_dept_sec: empsecid,
            tm_task_due_date: tm_task_due_date === '' ? null : tm_task_due_date,
            tm_task_description: tm_task_description,
            tm_project_slno: projectz === 0 ? null : projectz,
            tm_pending_remark: tm_pending_remark === '' ? null : tm_pending_remark,
            tm_onhold_remarks: tm_onhold_remarks === '' ? null : tm_onhold_remarks,
            tm_completed_remarks: tm_completed_remarks === '' ? null : tm_completed_remarks,
            tm_task_status: tm_task_status,
            tm_complete_date: tm_complete_date === '' ? null : tm_complete_date,
            create_user: id,
            main_task_slno: main_task_slno,
        }
    }, [tm_task_name, empdept, empsecid, tm_task_due_date, tm_task_description, main_task_slno, projectz, tm_task_status, tm_pending_remark, tm_onhold_remarks,
        tm_completed_remarks, tm_complete_date, id])

    const handleFileChange = useCallback((e) => {
        const newFiles = [...selectFile]
        newFiles.push(e.target.files[0])
        setSelectFile(newFiles)
    }, [selectFile, setSelectFile])

    const handleClose = useCallback(() => {
        setAddModalFlag(0)
        setaddModalOpen(false)
    }, [setAddModalFlag, setaddModalOpen])

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
        if ((tm_task_name !== '') && (employee.length !== 0) && (tm_task_due_date !== '')) {
            InsertMastTask(insertMastTask).then((value) => {
                const { message, success, insertId } = value
                if (success === 1) {
                    setInsertId(insertId)
                    //check employee assigned
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
                                            setTableCount(tableCount + 1)
                                            handleClose()
                                        }
                                        else {
                                            warningNotify(message)
                                        }
                                    })
                                }
                                else {
                                    succesNotify("Task Created Successfully")
                                    setTableCount(tableCount + 1)
                                    handleClose()
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
                                    setTableCount(tableCount + 1)
                                    handleClose()
                                }
                                else {
                                    warningNotify(message)
                                }
                            })
                        }
                        //No file
                        else {
                            succesNotify("Task Created Successfully")
                            setTableCount(tableCount + 1)
                            handleClose()
                        }
                    }
                }
                else {
                    warningNotify(message)
                }
            })
        } else {
            infoNotify('Please fill the mandatory fields')
        }
    }, [handleClose, employee, handleImageUpload, id, insertMastTask, tm_task_name, selectFile, setInsertId, setTableCount, tableCount, tm_task_due_date])

    return (
        <CssVarsProvider>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>

                <Box sx={{ margin: 'auto', }}>
                    <ModalDialog variant="outlined"
                        sx={{ overflowY: 'scroll', width: 800 }}>
                        <Box sx={{ height: 700, borderRadius: 10 }}>
                            <Box sx={{ display: 'flex', pl: 1, fontSize: 20, fontWeight: 500, color: '#004F76' }}>
                                <AssignmentIcon sx={{ pt: .6 }} />CREATE TASK
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: "flex-end" }}>
                                    <Box sx={{ m: .5, borderRadius: 5, borderColor: '#D6E2E8' }}>
                                        <Tooltip title="Close">
                                            < CloseIcon sx={{ cursor: 'pointer', size: 'lg', width: 35, height: 25, color: '#004F76', }}
                                                onClick={handleClose}
                                            />
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{
                                width: "99%",
                                borderTop: 1, borderBlockColor: '#6AABD2', pt: 1, mx: .5
                            }}>
                            </Box>
                            <Box sx={{ display: 'flex', }}>
                                <Box sx={{ flex: 1, mx: 1 }}>
                                    <Box sx={{ mt: .5, pt: 1 }}>
                                        <Box sx={{ pl: .5, fontSize: 15, fontFamily: 'Georgia' }}>
                                            <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                                Task<Typography sx={{ color: '#B32800' }}>*</Typography>&nbsp;:
                                            </Typography>
                                        </Box>
                                        <CssVarsProvider>
                                            <Textarea
                                                type="text"
                                                size="sm"
                                                placeholder="Task Name"
                                                variant="outlined"
                                                name="tm_task_name"
                                                value={tm_task_name}
                                                maxRows={3}
                                                onChange={(e) => MastUpdate(e)}
                                                sx={{ fontSize: 18, color: '#003B73', flex: 1 }}
                                            ></Textarea>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ mt: 1.5 }}>
                                        <Box sx={{ pl: .5, fontSize: 15, fontFamily: 'Georgia' }}>
                                            <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                                Project&nbsp;:
                                            </Typography>
                                        </Box>
                                        <TmProjectList
                                            projectz={projectz}
                                            setprojectz={setprojectz} />
                                    </Box>
                                    <Box sx={{ mt: 1.5 }}>
                                        <Box sx={{ pl: .5, fontSize: 15, fontFamily: 'Georgia' }}>
                                            <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                                Department Section&nbsp;:
                                            </Typography>
                                        </Box>
                                        <TextFieldCustom
                                            type="text"
                                            name="secName"
                                            value={secName}
                                            disabled>
                                        </TextFieldCustom>
                                    </Box>
                                    <Box sx={{ mt: 1.5 }}>
                                        <Box sx={{ pl: .5, fontSize: 15, fontFamily: 'Georgia' }}>
                                            <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                                Assignees<Typography sx={{ color: '#B32800' }}>*</Typography>&nbsp;:
                                            </Typography>
                                        </Box>
                                        <CssVarsProvider>
                                            <TmMultEmpSelectUnderDeptSec
                                                value={employee}
                                                setValue={setEmployee}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ mt: 1.5 }}>
                                        <Box sx={{ pl: .5, fontSize: 15, fontFamily: 'Georgia' }}>
                                            <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                                Due Date<Typography sx={{ color: '#B32800' }}>*</Typography>&nbsp;:
                                            </Typography>
                                        </Box>
                                        <TextFieldCustom
                                            type="datetime-local"
                                            size="sm"
                                            name="tm_task_due_date"
                                            value={tm_task_due_date}
                                            slotProps={{
                                                input: {
                                                    min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                                                },
                                            }}
                                            onchange={MastUpdate}
                                        ></TextFieldCustom>
                                    </Box>
                                    <Box sx={{ mt: 1.5 }}>
                                        <Box sx={{ pl: .5, fontSize: 15, fontFamily: 'Georgia' }}>
                                            <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                                Description&nbsp;:
                                            </Typography>
                                        </Box>
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
                                    <Box sx={{ height: 50, mt: 1, border: 1, borderRadius: 4, borderStyle: 'dashed', display: 'flex', borderColor: '#C2D2D9', }}>
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
                                            <Box sx={{ display: 'flex', }}>
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
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: "flex-end", height: 60, borderTop: 1, borderBlockColor: '#6AABD2', pt: 2 }}>
                            {insertId === 0 ?
                                <Box sx={{ mr: .5, fontSize: 20, cursor: 'pointer', }}>
                                    <CssVarsProvider>
                                        <Button variant="plain" onClick={SubmitTask} sx={{ fontSize: 16, color: '#004F76', }} >Create</Button>
                                    </CssVarsProvider>
                                </Box> : null
                            }
                            <Box sx={{ mr: 2, cursor: 'pointer' }}>
                                <CssVarsProvider>
                                    <Button variant="plain" onClick={handleClose} sx={{ fontSize: 16, color: '#004F76', }}> Cancel</Button>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    </ModalDialog>
                </Box>
            </Modal >
        </CssVarsProvider >
    )
}
export default memo(CreateTask)