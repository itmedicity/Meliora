import { Box, Button, CssVarsProvider, DialogActions, Modal, ModalDialog, Textarea, Tooltip, Typography } from '@mui/joy'
import React, { useCallback, useMemo, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
const TaskStatusModal = ({ open, masterData, setEditModalFlag, setEditModalOpen, tableCount, setTableCount }) => {





    const { tm_task_slno, tm_task_name, tm_task_description, tm_task_due_date, em_name, sec_name, tm_task_dept, tm_task_dept_sec, tm_task_status } = masterData


    const [taskStatus, settaskStatus] = useState(tm_task_status === 1 ? true : false)



    const taskDataUpdate = useCallback((e) => {
        if (e.target.checked === true) {
            settaskStatus(true)
        }
        else {
            settaskStatus(false)
        }
    }, [])

    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })



    // const history = useHistory()
    const handleEditClose = useCallback(() => {
        // history.push('/Home/TaskManagementDashboard')
        setEditModalFlag(0)
        setEditModalOpen(false)

    }, [
        // history,
        setEditModalOpen, setEditModalFlag,])



    const updateMasterTask = useMemo(() => {
        return {
            tm_task_slno: tm_task_slno,
            tm_task_name: tm_task_name,
            tm_task_dept: tm_task_dept,
            tm_task_dept_sec: tm_task_dept_sec,
            tm_task_due_date: tm_task_due_date,
            tm_task_description: tm_task_description,
            tm_task_status: taskStatus === true ? 1 : 0,
            edit_user: id
        }
    }, [tm_task_name, taskStatus, tm_task_dept, tm_task_dept_sec, tm_task_slno,
        tm_task_due_date,
        tm_task_description, id])







    const UpdateStatus = useCallback((e) => {
        e.preventDefault()

        const UpdateMastTask = async (updateMasterTask) => {
            const result = await axioslogin.patch('/taskManagement/updateMasterTask', updateMasterTask)
            const { message, success } = result.data
            if (success === 2) {
                succesNotify(message)
                setTableCount(tableCount + 1)
                handleEditClose()
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        UpdateMastTask(updateMasterTask)

    }, [updateMasterTask, tableCount, handleEditClose, setTableCount])



    return (
        <Box>
            <CssVarsProvider>
                <Modal
                    open={open}
                >
                    < ModalDialog
                        sx={{
                            overflowY: 'scroll',
                            width: '50vw',
                            height: '40vw'
                        }}
                    >
                        <Box>

                            <Box sx={{ height: '33vw', border: 1, borderColor: '#D6E2E8', borderRadius: 5 }}>
                                <Box sx={{ mb: .3, display: 'flex', justifyContent: 'flex-end', pr: .5, pt: .5 }}>
                                    <Tooltip title="Close">
                                        < CloseIcon sx={{ cursor: 'pointer', size: 'lg', height: 20, color: '#004F76' }}
                                            onClick={handleEditClose}
                                        />
                                    </Tooltip>
                                </Box>
                                <Box sx={{
                                    width: "99%", backgroundColor: '#D9E4EC', height: 45,
                                    borderTop: 1, borderBlockColor: '#6AABD2', pt: 1, mx: .5, mt: .5
                                }}>
                                    <ModeEditIcon sx={{ height: '20px' }} />Update Status
                                </Box>

                                <Box sx={{ display: 'flex', width: '100%', mt: 2 }}>
                                    <Box sx={{ flex: 1, }}>
                                    </Box>
                                    <Box sx={{ flex: 4 }}>
                                        <Typography sx={{ color: '#44444C', fontFamily: 'Georgia' }}>
                                            Task Name
                                        </Typography>
                                        <Box>
                                            <CssVarsProvider>
                                                <Textarea
                                                    type="text"
                                                    size="sm"
                                                    placeholder="Task Name*"
                                                    variant="outlined"
                                                    disabled
                                                    name="tm_task_name"
                                                    value={tm_task_name}
                                                    sx={{ fontSize: 22, color: '#05445E', }}
                                                ></Textarea>
                                            </CssVarsProvider>
                                        </Box>
                                        <Typography sx={{ color: '#44444C', fontFamily: 'Georgia', pt: 1 }}>
                                            Department
                                        </Typography>
                                        <Box sx={{}}>
                                            <TextFieldCustom
                                                type="text"
                                                name="sec_name"
                                                value={sec_name}
                                                disabled>
                                            </TextFieldCustom>
                                        </Box>
                                        <Typography sx={{ color: '#44444C', fontFamily: 'Georgia', pt: 1 }}>
                                            Assignee
                                        </Typography>
                                        <Box sx={{}}>
                                            <TextFieldCustom
                                                type="text"
                                                name="em_name"
                                                value={em_name}
                                                disabled>
                                            </TextFieldCustom>
                                        </Box>
                                        <Typography sx={{ color: '#44444C', fontFamily: 'Georgia', pt: 1 }}>
                                            Due date
                                        </Typography>
                                        <Box sx={{}}>
                                            <TextFieldCustom
                                                type="text"
                                                size="sm"
                                                disabled
                                                name="tm_task_due_date"
                                                value={tm_task_due_date}
                                            ></TextFieldCustom>
                                        </Box>
                                        <Typography sx={{ color: '#44444C', fontFamily: 'Georgia', pt: 1 }}>
                                            Description
                                        </Typography>
                                        <Box sx={{}}>
                                            <Textarea
                                                type="text"
                                                size="sm"
                                                placeholder="type here..."
                                                variant="outlined"
                                                minRows={2}
                                                maxRows={4}
                                                disabled
                                                name="tm_task_description"
                                                value={tm_task_description}
                                            >
                                            </Textarea>
                                        </Box>
                                        <Box sx={{ flex: 1, display: 'flex', mt: 1 }}>
                                            <Box sx={{ pt: .5 }}>
                                                <CusCheckBox
                                                    color="primary"
                                                    size="md"
                                                    name="taskStatus"
                                                    value={taskStatus}
                                                    checked={taskStatus}
                                                    onCheked={taskDataUpdate}
                                                ></CusCheckBox>
                                            </Box>
                                            <Box sx={{ pl: 1, color: '#000C66', fontFamily: 'Georgia' }}>Task Completed</Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, }}></Box>
                                </Box>
                            </Box>
                        </Box>
                        <DialogActions>
                            <Box sx={{ textAlign: 'right' }}>
                                <Button
                                    variant="plain"
                                    onClick={UpdateStatus}
                                    sx={{ color: "#004F76", fontSize: 16, }}
                                >Update</Button>
                                <Button
                                    variant="plain"
                                    sx={{ color: "#004F76", fontSize: 16, }}
                                    onClick={handleEditClose}
                                >Cancel</Button>
                            </Box>
                        </DialogActions>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider>

        </Box>

    )
}

export default TaskStatusModal