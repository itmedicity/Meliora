import { Box, Button, Checkbox, Chip, CssVarsProvider, Modal, ModalDialog, Textarea, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch, useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import AccountTreeSharpIcon from '@mui/icons-material/AccountTreeSharp';
import Inputcomponent from '../TaskComponents/Inputcomponent';
import TmAllGoalsList from 'src/views/CommonSelectCode/TmAllGoalsList';
import { getGoalsList } from 'src/redux/actions/TmGoalsList.action';
import moment from 'moment';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import GoalCreation from './GoalCreation';

const EditProject = ({ open, setEditProjectFlag, setEditProjectModalOpen, tableCount, setTableCount, projectData, setProjectData }) => {

    const { tm_project_slno, tm_goal_slno, tm_project_description, tm_project_duedate, tm_project_name, tm_project_status, tm_project_cmpltedate,
        tm_goal_duedate } = projectData

    const dispatch = useDispatch();
    const [goaledit, setgoalsEdit] = useState(tm_goal_slno)
    const [dueDateGoal, setdueDateGoal] = useState('')
    const [filteredTasks, setFilteredTasks] = useState([])
    const [addGoalFlag, setAddGoalFlag] = useState(0)
    const [addGoalModalOpen, setaddGoalModalOpen] = useState(false)
    let newDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    useEffect(() => {
        dispatch(getGoalsList())
    }, [dispatch,])

    useEffect(() => {
        const getMastTaasks = async (tm_project_slno) => {
            const result = await axioslogin.get(`/TmAllDeptTask/getTaskunderProject/${tm_project_slno}`);
            const { success, data } = result.data;
            if (data.length !== 0) {
                if (success === 2) {
                    const filteredData = data.filter(task => task.tm_task_status !== 1);
                    setFilteredTasks(filteredData);
                }
                else {
                    setFilteredTasks([])
                }
            } else {
                setFilteredTasks([])
            }
        }
        getMastTaasks(tm_project_slno);
    }, [tm_project_slno])

    const CloseProject = useCallback(() => {
        setEditProjectFlag(0)
        setEditProjectModalOpen(false)
        setProjectData([])
    }, [setEditProjectFlag, setEditProjectModalOpen, setProjectData])

    const [projectMast, setprojectMast] = useState({
        tm_projectSlno: tm_project_slno,
        tm_projectName: tm_project_name,
        tm_projectDuedate: tm_project_duedate,
        tm_projectDescription: tm_project_description,
        tm_projectStatus: tm_project_status === 1 ? true : false,
        tm_projectCmpltedate: tm_project_cmpltedate
    })

    const { tm_projectSlno, tm_projectName, tm_projectDuedate, tm_projectDescription, tm_projectStatus } = projectMast
    const ProjectMastUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setprojectMast({ ...projectMast, [e.target.name]: value })
        },
        [projectMast])

    const patchProject = useMemo(() => {
        return {
            tm_project_slno: tm_projectSlno,
            tm_project_name: tm_projectName,
            tm_project_duedate: tm_projectDuedate === '' ? null : tm_projectDuedate,
            tm_project_description: tm_projectDescription === '' ? null : tm_projectDescription,
            tm_project_status: tm_projectStatus === true ? 1 : 0,
            tm_project_cmpltedate: tm_projectStatus === true ? newDate : null,
            tm_goal_slno: goaledit === 0 ? null : goaledit,
            tm_project_edit_user: id,
        }
    }, [tm_projectSlno, tm_projectName, tm_projectDuedate, tm_projectDescription, tm_projectStatus, goaledit, newDate, id])

    const reset = useCallback(() => {
        const form = {
            tm_projectSlno: '',
            tm_projectName: '',
            tm_projectDuedate: '',
            tm_projectDescription: '',
            tm_projectStatus: false,
            tm_projectCmpltedate: ''
        }
        setprojectMast(form)
        setgoalsEdit(0)
    }, [])

    const UpdateProject = useCallback((e) => {
        e.preventDefault()
        if (tm_project_name !== '') {
            const UpdateProjectMast = async (patchProject) => {
                const result = await axioslogin.patch('/taskManagement/updateProject', patchProject)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    setTableCount(tableCount + 1)
                    reset()
                    CloseProject()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            UpdateProjectMast(patchProject)
        } else {
            infoNotify('Please Enter Project Name')
        }
    }, [patchProject, tableCount, tm_project_name, reset, CloseProject, setTableCount])

    const CreateGoal = useCallback(() => {
        setAddGoalFlag(1)
        setaddGoalModalOpen(true)
    }, [])
    const isGoalOverdue = moment().isAfter(moment(tm_goal_duedate));

    return (
        <Box>
            {addGoalFlag === 1 ? <GoalCreation open={addGoalModalOpen} setTableCount={setTableCount} tableCount={tableCount}
                setAddGoalFlag={setAddGoalFlag} setaddGoalModalOpen={setaddGoalModalOpen}
            /> : null}
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                    <ModalDialog variant="outlined" sx={{ width: '43vw', p: 0, }}>
                        <Box sx={{ flex: 1, }}>
                            <Box sx={{ flex: 1, display: 'flex', bgcolor: 'white', height: 30 }}>
                                <Typography sx={{ color: 'lightgray', fontSize: 12, pl: 1, flex: 1, pt: 1.5, fontWeight: 900, }}>Edit Project</Typography>
                                <HighlightOffIcon sx={{
                                    height: 40, width: 40, cursor: 'pointer', color: '#52688F', p: 1,
                                    '&:hover': { color: '#BA0F30' }
                                }}
                                    onClick={CloseProject}
                                />
                            </Box>
                            <Box sx={{ flex: 1, bgcolor: '#52688F', height: 100, mt: 1 }}></Box>
                            <Box style={{
                                marginLeft: 50,
                                marginTop: "-0.99em",
                                paddingLeft: 2,
                                zIndex: 2,
                                backgroundColor: "white",
                                borderRadius: 35,
                                position: "absolute", fontSize: "0.75em"
                            }}>
                                <AccountTreeSharpIcon sx={{ height: 60, width: 60, p: 1.5, }} />
                            </Box>
                            <Typography sx={{ fontWeight: 800, color: 'grey', fontSize: 15, pt: 5, pl: 5.8 }}>Update Project</Typography>
                            <Box sx={{ maxHeight: '60vh', overflow: 'auto' }}>
                                <Box sx={{ flex: 1, mx: 3, mt: 4, }}>

                                    <Textarea
                                        minRows={1}
                                        maxRows={5}
                                        placeholder="Project"
                                        variant="plain"
                                        sx={{
                                            borderBottom: '2px solid',
                                            borderColor: 'neutral.outlinedBorder',
                                            borderRadius: 0,
                                            '&:hover': {
                                                borderColor: 'neutral.outlinedHoverBorder',
                                            },
                                            '&::before': {
                                                border: '1px solid var(--Textarea-focusedHighlight)',
                                                transform: 'scaleX(0)',
                                                left: 0,
                                                right: 0,
                                                bottom: '-2px',
                                                top: 'unset',
                                                transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                                                borderRadius: 0,
                                            },
                                            '&:focus-within::before': {
                                                transform: 'scaleX(1)',
                                            },
                                        }}
                                        name="tm_projectName"
                                        value={tm_projectName}
                                        onChange={(e) => ProjectMastUpdate(e)}
                                    />
                                </Box>

                                <Box sx={{ flex: 1, display: 'flex', mx: 3, mt: 3 }}>
                                    <TmAllGoalsList
                                        goalz={goaledit}
                                        setgoalz={setgoalsEdit}
                                        setdueDateGoal={setdueDateGoal} />
                                    <Box sx={{ ml: .5, mt: 2 }} onClick={CreateGoal}>
                                        <Tooltip title="Create New Goal">
                                            <Chip
                                                sx={{ cursor: 'pointer', bgcolor: '#90CDD0 ', color: 'black', '&:hover': { bgcolor: '#77A7B0' } }}>
                                                &nbsp;+ create&nbsp;</Chip>
                                        </Tooltip>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, mx: 3, mt: 3, }}>
                                    <Typography sx={{ pl: 1.5, color: '#003B73', fontWeight: 600, textUnderline: 1, fontSize: 12 }}>Due Date*</Typography>
                                    {goaledit !== null ?
                                        <Tooltip
                                            title={
                                                isGoalOverdue
                                                    ? "Due date cannot be change, selected Goal is already overdue. To change Project due date, please update the Goal's due date."
                                                    : ''
                                            }
                                            placement="bottom"
                                            color='warning'
                                        >
                                            <div>
                                                <Inputcomponent
                                                    type="datetime-local"
                                                    name="tm_projectDuedate"
                                                    value={tm_projectDuedate}
                                                    slotProps={{
                                                        input: {
                                                            min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                                                            max: moment(new Date(tm_goal_duedate)).format('YYYY-MM-DD HH:mm:ss'),
                                                        },
                                                    }}
                                                    onchange={ProjectMastUpdate}
                                                    disabled={isGoalOverdue}
                                                />
                                            </div>
                                        </Tooltip>
                                        :
                                        <Inputcomponent
                                            type="datetime-local"
                                            name="tm_projectDuedate"
                                            value={tm_projectDuedate}
                                            slotProps={{
                                                input: {
                                                    min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                                                    max: moment(new Date(dueDateGoal)).format('YYYY-MM-DD HH:mm:ss'),
                                                },
                                            }}
                                            onchange={ProjectMastUpdate}
                                        />}


                                </Box>
                                <Box sx={{ mt: 5, mx: 3 }}>
                                    <Textarea
                                        minRows={1}
                                        maxRows={5}
                                        placeholder="Describtion"
                                        variant="plain"
                                        sx={{
                                            borderBottom: '2px solid',
                                            borderColor: 'neutral.outlinedBorder',
                                            borderRadius: 0,
                                            '&:hover': {
                                                borderColor: 'neutral.outlinedHoverBorder',
                                            },
                                            '&::before': {
                                                border: '1px solid var(--Textarea-focusedHighlight)',
                                                transform: 'scaleX(0)',
                                                left: 0,
                                                right: 0,
                                                bottom: '-2px',
                                                top: 'unset',
                                                transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                                                borderRadius: 0,
                                            },
                                            '&:focus-within::before': {
                                                transform: 'scaleX(1)',
                                            },
                                        }}
                                        name="tm_projectDescription"
                                        value={tm_projectDescription}
                                        onChange={(e) => ProjectMastUpdate(e)}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, pl: 7, pt: 3, display: 'flex' }}>
                                    {filteredTasks.length === 0 ?
                                        <>
                                            <CusCheckBox
                                                color="success"
                                                size="lg"
                                                name="tm_projectStatus"
                                                value={tm_projectStatus}
                                                checked={tm_projectStatus}
                                                onCheked={ProjectMastUpdate}
                                            />
                                        </> :
                                        <>
                                            <CssVarsProvider>
                                                <Tooltip
                                                    color='warning'
                                                    title="Can't Mark this Project as Completed, Task Under this Project are yet to Complete"
                                                    placement="bottom-start">
                                                    <Checkbox disabled size='lg' />
                                                </Tooltip>
                                            </CssVarsProvider>

                                        </>
                                    }
                                    <Typography sx={{ pl: .5, fontWeight: 500 }}>Project Completed</Typography>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pt: 5, pb: 2, mr: 3 }}>
                                    <Button variant="plain" sx={{ fontSize: 15 }} onClick={UpdateProject}>Update</Button>
                                    <Button variant="plain" sx={{ fontSize: 15 }} onClick={CloseProject}> Cancel</Button>
                                </Box>
                            </Box>
                        </Box>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider>
        </Box >
    )
}

export default memo(EditProject)