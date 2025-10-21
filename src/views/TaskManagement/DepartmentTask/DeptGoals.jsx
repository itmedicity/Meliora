import { Box, Button, Chip, Input, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import EditIcon from '@mui/icons-material/Edit'
import GoalCreation from '../ModalComponent/GoalCreation'
import EditGoalCreation from '../ModalComponent/EditGoalCreation'
import { useSelector } from 'react-redux'
import { taskColor } from 'src/color/Color'
import TextComponent from 'src/views/Components/TextComponent'
import { useQuery } from '@tanstack/react-query'
import { CircularProgress } from '@mui/material'
import TaskCountDownComponent from 'src/views/Components/TaskCountDownComponent'
import SearchIcon from '@mui/icons-material/Search';
import FormattedDate from 'src/views/Components/FormattedDate'
import ReadmoreDescribtion from 'src/views/Components/ReadmoreDescribtion'

const DeptGoals = () => {

  const empDept = useSelector((state) => state.LoginUserData.empdept);
  const [addGoalFlag, setAddGoalFlag] = useState(0)
  const [addGoalModalOpen, setaddGoalModalOpen] = useState(false)
  const [goalData, setgoalData] = useState([])
  const [editGoalFlag, setEditGoalFlag] = useState(0)
  const [editGoalModalOpen, setEditGoalModalOpen] = useState(false)
  const [filterText, setFilterText] = useState("");

  // const getAllGoals = async (empDept) => {
  //   if (!empDept) return [];
  //   try {
  //     const result = await axioslogin.get(`/taskManagement/getDeptGoals/${empDept}`);
  //     const { success, data } = result.data;
  //     return success === 2 ? data : [];
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // const {
  //   data: goalz = [],
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["getAllDeptGoals", empDept],
  //   queryFn: () => getAllGoals(empDept),
  //   enabled: !!empDept,
  // });

  const getAllGoals = async (empDept) => {
    if (!empDept) return [];
    const result = await axioslogin.get(`/taskManagement/getDeptGoals/${empDept}`);
    const { success, data } = result.data;
    return success === 2 ? data : [];
  };

  const {
    data: goalz = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllDeptGoals", empDept],
    queryFn: () => getAllGoals(empDept),
    enabled: !!empDept,
  });


  const CreateGoal = useCallback(() => {
    setAddGoalFlag(1)
    setaddGoalModalOpen(true)
  }, [])

  const rowSelect = useCallback((val) => {
    setgoalData(val)
    setEditGoalFlag(1)
    setEditGoalModalOpen(true)
  }, [])

  const filteredGoalsData = goalz.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  return (
    <Box sx={{ flex: 1 }}>
      {addGoalFlag === 1 ? <GoalCreation open={addGoalModalOpen}
        setAddGoalFlag={setAddGoalFlag} setaddGoalModalOpen={setaddGoalModalOpen}
      /> : null}
      {editGoalFlag === 1 ? <EditGoalCreation open={editGoalModalOpen}
        setEditGoalFlag={setEditGoalFlag} setEditGoalModalOpen={setEditGoalModalOpen} goalData={goalData}
        setgoalData={setgoalData}
      /> : null}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, }}>
        <Chip sx={{ px: 1, cursor: 'pointer', border: 1, borderColor: '#4B7BF5', '&:hover': { bgcolor: '#15B5B0' } }}
          onClick={CreateGoal}> + Create new goal</Chip>
        <Input
          label="Search"
          variant="outlined"
          placeholder="Type here..."
          autoComplete="off"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          startDecorator={
            <Button variant="soft" color="neutral">
              <SearchIcon /> Search
            </Button>
          }
          sx={{ width: 300 }}
        />
      </Box>
      <Box sx={{ px: 1, height: '67vh', overflow: 'auto', }}>
        {isLoading ? (
          <CircularProgress thickness={4} />
        ) : isError ? (
          <Typography sx={{ fontSize: 14, color: "red", textAlign: "center", mt: 2 }}>
            Failed to load tasks
          </Typography>
        ) : filteredGoalsData.length === 0 ? (
          <Typography sx={{ fontSize: 14, color: "grey", textAlign: "center", mt: 2 }}>
            No tasks found
          </Typography>
        ) : (
          filteredGoalsData?.map((val, index) => (
            <Box
              key={index}
              sx={{
                border: 1,
                borderColor: taskColor.darkBlue,
                borderRadius: 5,
                mb: .5,
                backgroundColor: 'background.body',
                transition: '0.2s',
                '&:hover': { boxShadow: 'md' }
              }}
            >

              <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pt: 1, pr: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <TextComponent
                    sx={{ fontSize: 16, fontWeight: 700, color: taskColor.darkBlue }}
                    text={`Goal #${val.tm_goals_slno}`}
                  />

                  <Tooltip title="Goals Created Date" placement="top-start">
                    <Typography level="body-xs" sx={{ fontSize: 12, color: 'text.primary', cursor: 'pointer' }}>
                      <FormattedDate date={val.create_date} />
                    </Typography>
                  </Tooltip>
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 1 }}>
                    <Chip
                      size="sm"
                      variant="soft"
                      color={
                        val.tm_goal_status === 0 ? 'neutral'
                          : val.tm_goal_status === null ? 'neutral'
                            : val.tm_goal_status === 1 ? 'success'
                              : 'neutral'
                      }
                      sx={{ fontWeight: 700 }}
                    >
                      {val.tm_goal_status === null ? 'Inompleted' : val.tm_goal_status === 0 ? 'Incompleted' : val.tm_goal_status === 1 ? 'Completed' :
                        'not given'}
                    </Chip>
                  </Box>
                  {val.tm_goal_status === 1 ?
                    <Tooltip title="Goal Completed Date" placement="top-start">
                      <Typography level="body-xs" sx={{ fontSize: 12, color: 'text.primary', cursor: 'pointer', display: 'flex', justifyContent: 'flex-end', pr: 1 }}>
                        <FormattedDate date={val.tm_goal_cmpledate} />
                      </Typography>
                    </Tooltip>
                    :
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 1 }}>
                      <TaskCountDownComponent DueDates={val.tm_goal_duedate} />
                    </Box>}
                </Box>

              </Box>

              <Box sx={{ px: 2, pt: 1, fontSize: 15, fontWeight: 600, color: 'black' }}>
                {val.tm_goal_name}
              </Box>
              <Box sx={{ px: 2, pb: 1, fontSize: 14 }}>
                <ReadmoreDescribtion description={val.tm_goal_description} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: taskColor.BlueShade, m: .1, px: .5, pt: .3 }}>
                <Button size="sm" variant="outlined" color='neutral' style={{ backgroundColor: '#F8F8F8', pb: .3 }} onClick={() => rowSelect(val)}>
                  <EditIcon fontSize="small" style={{ color: taskColor.darkBlue }} />
                </Button>
                <Box >
                  {val.tm_goal_fromdate && val.tm_goal_duedate ? (
                    <>
                      <FormattedDate date={val.tm_goal_fromdate} /> -{" "}
                      <FormattedDate date={val.tm_goal_duedate} />
                    </>
                  ) : val.tm_goal_fromdate ? (
                    <FormattedDate date={val.tm_goal_fromdate} />
                  ) : val.tm_goal_duedate ? (
                    <FormattedDate date={val.tm_goal_duedate} />
                  ) : (
                    "not given"
                  )}
                </Box>
              </Box>
            </Box>
          )))}
      </Box>
    </Box>
  )
}
export default memo(DeptGoals)

