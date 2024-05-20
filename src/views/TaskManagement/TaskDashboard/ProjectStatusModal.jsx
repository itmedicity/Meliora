import { Box, Button, CssVarsProvider, DialogActions, Modal, ModalDialog, Textarea, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';

const ProjectStatusModal = ({ open, masterData, setEditModalFlag, setEditModalOpen, tableCount, setTableCount }) => {

    const { dept_name, sec_name, tm_project_description, tm_project_duedate, tm_project_name, tm_project_slno, tm_project_deptsec, tm_project_dept, tm_project_status } = masterData



    const [projectStatus, setprojectStatus] = useState(tm_project_status === 1 ? true : false)

    const handleEditClose = useCallback(() => {
        setEditModalFlag(0)
        setEditModalOpen(false)
    }, [setEditModalOpen, setEditModalFlag])

    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const projectDataUpdate = useCallback((e) => {
        if (e.target.checked === true) {
            setprojectStatus(true)
        }
        else {
            setprojectStatus(false)
        }
    }, [])


    const UpdateProject = useMemo(() => {
        return {
            tm_project_slno: tm_project_slno,
            tm_project_name: tm_project_name,
            tm_project_dept: tm_project_dept,
            tm_project_deptsec: tm_project_deptsec,
            tm_project_duedate: tm_project_duedate,
            tm_project_description: tm_project_description,
            tm_project_status: projectStatus === true ? 1 : 0,
            tm_project_edit_user: id
        }
    }, [tm_project_slno, tm_project_name, tm_project_dept, tm_project_deptsec, tm_project_duedate, tm_project_description, projectStatus, id])

    const UpdateStatus = useCallback((e) => {
        e.preventDefault()
        const UpdateMastTask = async (UpdateProject) => {
            const result = await axioslogin.patch('/taskManagement/updateProject', UpdateProject)
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
        UpdateMastTask(UpdateProject)

    }, [UpdateProject, handleEditClose, tableCount, setTableCount])

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

                                <Box sx={{ display: 'flex', mt: 2 }}>
                                    <Box sx={{ flex: .5, }}>
                                    </Box>
                                    <Box sx={{ flex: 10 }}>
                                        <Typography sx={{ color: '#44444C', fontFamily: 'Georgia', pl: .5 }}>
                                            Project
                                        </Typography>
                                        <Box>
                                            <CssVarsProvider>
                                                <Textarea
                                                    type="text"
                                                    size="sm"
                                                    placeholder="Project"
                                                    variant="outlined"
                                                    disabled
                                                    name="tm_project_name"
                                                    value={tm_project_name}
                                                    sx={{ fontSize: 15, color: '#05445E', }}
                                                ></Textarea>
                                            </CssVarsProvider>
                                        </Box>
                                        <Typography sx={{ color: '#44444C', fontFamily: 'Georgia', pt: 1, pl: .5 }}>
                                            Department
                                        </Typography>
                                        <Box>
                                            <TextFieldCustom
                                                type="text"
                                                name="dept_name"
                                                value={dept_name}
                                                disabled>
                                            </TextFieldCustom>
                                        </Box>
                                        <Typography sx={{ color: '#44444C', fontFamily: 'Georgia', pt: 1, pl: .5 }}>
                                            Section
                                        </Typography>
                                        <Box >
                                            <TextFieldCustom
                                                type="text"
                                                name="sec_name"
                                                value={sec_name}
                                                disabled>
                                            </TextFieldCustom>
                                        </Box>
                                        <Typography sx={{ color: '#44444C', fontFamily: 'Georgia', pt: 1, pl: .5 }}>
                                            Due date
                                        </Typography>
                                        <Box>
                                            <TextFieldCustom
                                                type="text"
                                                size="sm"
                                                disabled
                                                name="tm_project_duedate"
                                                value={tm_project_duedate}

                                            ></TextFieldCustom>
                                        </Box>
                                        <Typography sx={{ color: '#44444C', fontFamily: 'Georgia', pt: 1, pl: .5 }}>
                                            Description
                                        </Typography>
                                        <Box >
                                            <Textarea
                                                type="text"
                                                size="sm"
                                                placeholder="type here..."
                                                variant="outlined"
                                                minRows={2}
                                                maxRows={4}
                                                disabled
                                                name="tm_project_description"
                                                value={tm_project_description}
                                            >
                                            </Textarea>
                                        </Box>
                                        <Box sx={{ flex: 1, display: 'flex', mt: 1 }}>
                                            <Box sx={{ pt: .5 }}>
                                                <CusCheckBox
                                                    color="primary"
                                                    size="md"

                                                    name="projectStatus"
                                                    value={projectStatus}
                                                    checked={projectStatus}
                                                    onCheked={projectDataUpdate}
                                                ></CusCheckBox>
                                            </Box>
                                            <Box sx={{ pl: 1, color: '#000C66', fontFamily: 'Georgia' }}>Project Completed</Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: .5, }}></Box>
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

export default memo(ProjectStatusModal)