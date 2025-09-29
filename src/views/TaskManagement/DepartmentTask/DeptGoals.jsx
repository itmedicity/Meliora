import { Box, Chip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import EditIcon from '@mui/icons-material/Edit'
import CountDowncomponent from '../CountDown/CountDowncomponent'
import GoalCreation from '../ModalComponent/GoalCreation'
import EditGoalCreation from '../ModalComponent/EditGoalCreation'
import { useSelector } from 'react-redux'
import { Virtuoso } from 'react-virtuoso'

const DeptGoals = ({ setTableCount, tableCount }) => {

    const [goalz, setgoalz] = useState([])
    const [addGoalFlag, setAddGoalFlag] = useState(0)
    const [addGoalModalOpen, setaddGoalModalOpen] = useState(false)
    const [goalData, setgoalData] = useState([])
    const [editGoalFlag, setEditGoalFlag] = useState(0)
    const [editGoalModalOpen, setEditGoalModalOpen] = useState(false)

    const empDept = useSelector((state) => state.LoginUserData.empdept);

    useEffect(() => {
        const getAllGoals = async () => {
            const result = await axioslogin.get(`/taskManagement/getDeptGoals/${empDept}`);
            const { success, data } = result.data;
            if (success === 2) {
                setgoalz(data)
            }
            else {
                setgoalz([])
            }
        }
        getAllGoals()
    }, [tableCount, empDept])

    const CreateGoal = useCallback(() => {
        setAddGoalFlag(1)
        setaddGoalModalOpen(true)
    }, [])

    const isPastDue = (tm_goal_duedate) => {
        const today = new Date();
        const due = new Date(tm_goal_duedate);
        return due < today
    }
    const rowSelect = useCallback((val) => {
        setgoalData(val)
        setEditGoalFlag(1)
        setEditGoalModalOpen(true)
    }, [])

    return (
        <Box>
            {addGoalFlag === 1 ? <GoalCreation open={addGoalModalOpen} setTableCount={setTableCount} tableCount={tableCount}
                setAddGoalFlag={setAddGoalFlag} setaddGoalModalOpen={setaddGoalModalOpen}
            /> : null}
            {editGoalFlag === 1 ? <EditGoalCreation open={editGoalModalOpen} setTableCount={setTableCount} tableCount={tableCount}
                setEditGoalFlag={setEditGoalFlag} setEditGoalModalOpen={setEditGoalModalOpen} goalData={goalData}
                setgoalData={setgoalData}
            /> : null}
            <Box sx={{ flex: 1, ml: 1, mt: 1 }}>
                <Chip sx={{ px: 1, my: .5, cursor: 'pointer', border: 1, borderColor: '#4B7BF5', '&:hover': { bgcolor: '#15B5B0' } }}
                    onClick={CreateGoal}> + Create new goal</Chip>
            </Box>
            <Box sx={{ width: '100%', overflow: 'auto' }}>
                <Box sx={{ width: 2600, }}>
                    <Box sx={{
                        height: 45, mt: .5, mx: 1.5, display: 'flex', borderBottom: 1, borderTop: 1, borderColor: 'lightgray', pt: 1.5,
                        bgcolor: 'white'
                    }}>
                        <Box sx={{ width: 40, pl: 1.7, fontWeight: 600, color: '#444444', fontSize: 12 }}>#</Box>
                        <Box sx={{ width: 80, fontWeight: 600, color: '#444444', fontSize: 12 }}>Action</Box>
                        <Box sx={{ width: 100, fontWeight: 600, color: '#444444', fontSize: 12, }}>Status</Box>
                        <Box sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Count Down</Box>
                        <Box sx={{ width: 600, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Goals</Box>
                        <Box sx={{ width: 180, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1, }}>From Date</Box>
                        <Box sx={{ width: 180, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1, }}>Due Date</Box>
                        <Box sx={{ width: 180, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1, }}>Completed Date</Box>
                        <Box sx={{ width: 600, fontWeight: 600, color: '#444444', fontSize: 12, pl: .5 }}>Description</Box>
                    </Box>
                    <Virtuoso
                        style={{ height: '60vh' }}
                        totalCount={goalz?.length}
                        itemContent={(index) => {
                            const val = goalz[index];
                            return (
                                <Box key={val.tm_goals_slno}
                                    sx={{
                                        display: 'flex', mt: .3,
                                        borderBottom: .1, mx: 1.5,
                                        borderColor: 'lightgrey', minHeight: 35,
                                        pt: .5,
                                    }}
                                >
                                    <Box sx={{ pl: 1.5, width: 40, }}>
                                        {index + 1}
                                    </Box>
                                    <Box sx={{ width: 60, }}>
                                        <EditIcon
                                            sx={{ cursor: 'pointer', '&:hover': { color: '#003060' } }} size={6}
                                            onClick={() => rowSelect(val)}
                                        />
                                    </Box>
                                    <Box sx={{ width: 120, }}>
                                        <Chip sx={{
                                            fontSize: 12,
                                            color: val.tm_goal_status === null ? '#311E26'
                                                : val.tm_goal_status === 0 ? '#311E26'
                                                    : val.tm_goal_status === 1 ? '#94C973'
                                                        : 'transparent', minHeight: 5,
                                            fontWeight: 600
                                        }}>
                                            {val.tm_goal_status === null ? 'Inompleted' : val.tm_goal_status === 0 ? 'Incompleted' : val.tm_goal_status === 1 ? 'Completed' :
                                                'not given'}
                                        </Chip>
                                    </Box>
                                    <Box sx={{ width: 150, fontWeight: 600, color: 'grey', fontSize: 12, }}>
                                        {val.tm_goal_status !== 1 ?
                                            <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 150, pl: 1 }}>
                                                <CountDowncomponent DueDates={val.tm_goal_duedate} />
                                            </Box> :
                                            <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: .5, width: 150, pl: 5, color: 'darkgreen' }}>
                                                Completed
                                            </Box>
                                        }
                                    </Box>
                                    <Box sx={{ width: 600, }}>
                                        {val.tm_goal_status === 1 ?
                                            <Box sx={{ width: 600, fontWeight: 600, color: 'grey', fontSize: 12, pl: 1, textTransform: 'capitalize' }}>
                                                {val.tm_goal_name}
                                            </Box> :
                                            <Box sx={{
                                                width: 600, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32600' : 'grey', fontSize: 12, pl: 1,
                                                textTransform: 'capitalize'
                                            }}>
                                                {val.tm_goal_name}
                                            </Box>
                                        }
                                    </Box>
                                    <Box sx={{ width: 180, }}>
                                        {val.tm_goal_status === 1 ?
                                            <Box sx={{ width: 180, fontWeight: 600, color: 'grey', fontSize: 12, pl: 1, textTransform: 'capitalize' }}>
                                                {val.tm_goal_fromdate || 'not given'}
                                            </Box> :
                                            <Box sx={{
                                                width: 180, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32600' : 'grey', fontSize: 12, pl: 1,
                                                textTransform: 'capitalize'
                                            }}>
                                                {val.tm_goal_fromdate || 'not given'}
                                            </Box>
                                        }
                                    </Box>
                                    <Box sx={{ width: 180, }}>
                                        {val.tm_goal_status === 1 ?
                                            <Box sx={{ width: 180, fontWeight: 600, color: 'grey', fontSize: 12, pl: 1, textTransform: 'capitalize' }}>
                                                {val.tm_goal_duedate || 'not given'}
                                            </Box> :
                                            <Box sx={{
                                                width: 180, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32600' : 'grey', fontSize: 12, pl: 1,
                                                textTransform: 'capitalize'
                                            }}>
                                                {val.tm_goal_duedate || 'not given'}
                                            </Box>
                                        }
                                    </Box>
                                    <Box sx={{ width: 180, }}>
                                        {val.tm_goal_status === 1 ?
                                            <Box sx={{ width: 180, fontWeight: 600, color: 'grey', fontSize: 12, pl: 1, textTransform: 'capitalize' }}>
                                                {val.tm_goal_cmpledate || 'not completed'}
                                            </Box> :
                                            <Box sx={{
                                                width: 180, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32600' : 'grey', fontSize: 12, pl: 1,
                                                textTransform: 'capitalize'
                                            }}>
                                                {val.tm_goal_cmpledate || 'not completed'}
                                            </Box>
                                        }
                                    </Box>
                                    <Box sx={{ width: 600, }}>
                                        {val.tm_goal_status === 1 ?
                                            <Box sx={{ width: 600, fontWeight: 600, color: 'grey', fontSize: 12, pl: 1, textTransform: 'capitalize' }}>
                                                {val.tm_goal_description || 'not given'}
                                            </Box> :
                                            <Box sx={{
                                                width: 600, fontWeight: 600, color: isPastDue(val.tm_task_due_date) ? '#B32600' : 'grey', fontSize: 12, pl: 1,
                                                textTransform: 'capitalize'
                                            }}>
                                                {val.tm_goal_description || 'not given'}
                                            </Box>
                                        }
                                    </Box>
                                </Box>
                            );
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}
export default memo(DeptGoals)