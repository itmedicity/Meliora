import { Box, Chip, CircularProgress, Typography, Button, Tooltip } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import EditIcon from '@mui/icons-material/Edit'
import ProjectCreation from '../ModalComponent/ProjectCreation'
import EditProject from '../ModalComponent/EditProject'
import { useSelector } from 'react-redux'
import TaskCountDownComponent from 'src/views/Components/TaskCountDownComponent'
import FormattedDate from 'src/views/Components/FormattedDate'
import ReadmoreDescribtion from 'src/views/Components/ReadmoreDescribtion'
import { useQuery } from '@tanstack/react-query'
import { taskColor } from 'src/color/Color'
import TextComponent from 'src/views/Components/TextComponent'
import FloatingSearch from 'src/views/Components/FloatingSearch'
import FloatingAddButton from 'src/views/Components/FloatingAddButton'

const DeptProjects = () => {

  const empDept = useSelector((state) => state.LoginUserData.empdept);
  const [addProjectFlag, setAddProjectFlag] = useState(0)
  const [addProjectModalOpen, setaddProjectlModalOpen] = useState(false)
  const [projectData, setProjectData] = useState([])
  const [editProjectFlag, setEditProjectFlag] = useState(0)
  const [editProjectModalOpen, setEditProjectModalOpen] = useState(false)
  const [filterText, setFilterText] = useState("");


  const getAllProjects = async (empDept) => {
    if (!empDept) return [];
    const result = await axioslogin.get(`/taskManagement/getDeptProjects/${empDept}`);
    const { success, data } = result.data;
    return success === 2 ? data : [];
  };

  const {
    data: Projectz = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllDeptProjects", empDept],
    queryFn: () => getAllProjects(empDept),
    enabled: !!empDept,
  });


  const CreateProject = useCallback(() => {
    setAddProjectFlag(1)
    setaddProjectlModalOpen(true)
  }, [])

  const rowSelect = useCallback((val) => {
    setProjectData(val)
    setEditProjectFlag(1)
    setEditProjectModalOpen(true)
  }, [])

  const filteredProjectsData = Projectz.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  return (
    <Box sx={{ flex: 1, position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          right: 20,
          gap: 1,
          display: "flex",
          alignItems: "center",
          zIndex: 1000
        }}
      >
        <FloatingSearch
          value={filterText}
          setValue={setFilterText}
        />

        <FloatingAddButton onClick={CreateProject} />
      </Box>
      {addProjectFlag === 1 ? <ProjectCreation open={addProjectModalOpen}
        setAddProjectFlag={setAddProjectFlag} setaddProjectlModalOpen={setaddProjectlModalOpen}
      /> : null}
      {editProjectFlag === 1 ? <EditProject open={editProjectModalOpen}
        setEditProjectFlag={setEditProjectFlag} setEditProjectModalOpen={setEditProjectModalOpen} projectData={projectData}
        setProjectData={setProjectData}
      /> : null}



      <Box sx={{ p: 1, height: '67vh', overflow: 'auto', }}>
        {isLoading ? (
          <CircularProgress thickness={4} />
        ) : isError ? (
          <Typography sx={{ fontSize: 14, color: "red", textAlign: "center", mt: 2 }}>
            Failed to load tasks
          </Typography>
        ) : filteredProjectsData.length === 0 ? (
          <Typography sx={{ fontSize: 14, color: "grey", textAlign: "center", mt: 2 }}>
            No tasks found
          </Typography>
        ) : (
          filteredProjectsData?.map((val, index) => (
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
                    text={`Projects #${val.tm_project_slno}`}
                  />
                  <Tooltip title="Projects Created Date" placement="top-start">
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
                        val.tm_project_status === 0 ? 'neutral'
                          : val.tm_project_status === null ? 'neutral'
                            : val.tm_project_status === 1 ? 'success'
                              : 'neutral'
                      }
                      sx={{ fontWeight: 700 }}
                    >
                      {val.tm_project_status === null ? 'Inompleted' : val.tm_project_status === 0 ? 'Incompleted' : val.tm_project_status === 1 ? 'Completed' :
                        'not given'}
                    </Chip>
                  </Box>
                  {val.tm_project_status === 1 ?
                    <Tooltip title="Project Completed Date" placement="top-start">
                      <Typography level="body-xs" sx={{ fontSize: 12, color: 'text.primary', cursor: 'pointer', display: 'flex', justifyContent: 'flex-end', pr: 1 }}>
                        <FormattedDate date={val.tm_project_cmpltedate} />
                      </Typography>
                    </Tooltip>
                    :
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 1 }}>
                      <TaskCountDownComponent DueDates={val.tm_project_duedate} />
                    </Box>}
                </Box>
              </Box>
              <Box sx={{ px: 2, pt: 1, fontSize: 15, fontWeight: 600, color: 'black' }}>
                {val.tm_project_name}
              </Box>
              <Box sx={{ px: 2, pb: 1, fontSize: 14 }}>
                <ReadmoreDescribtion description={val.tm_project_description} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: taskColor.BlueShade, m: .1, px: .5, pt: .3 }}>
                <Button size="sm" variant="outlined" color='neutral' style={{ backgroundColor: '#F8F8F8', pb: .3 }} onClick={() => rowSelect(val)}>
                  <EditIcon fontSize="small" style={{ color: taskColor.darkBlue }} />
                </Button>
              </Box>
            </Box>
          )))}
      </Box>
    </Box>
  )
}

export default memo(DeptProjects)