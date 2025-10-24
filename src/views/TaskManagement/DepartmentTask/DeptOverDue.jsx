
import { Box, Button, Chip, CircularProgress, Input, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import ModalEditTask from '../CreateTask/ModalEditTask'
import ViewTaskImage from '../TaskFileView/ViewTaskImage'
import { taskColor } from 'src/color/Color'
import TextComponent from 'src/views/Components/TextComponent'
import FormattedDate from 'src/views/Components/FormattedDate'
import ReadmoreDescribtion from 'src/views/Components/ReadmoreDescribtion'
import EditIcon from '@mui/icons-material/Edit';
import LanRoundedIcon from '@mui/icons-material/LanRounded';
import TaskAssigneesName from 'src/views/Components/TaskAssingeesName'
import TaskCountDownComponent from 'src/views/Components/TaskCountDownComponent'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query'
import { getAllOverDueTaskUnderDepartment } from 'src/api/TaskApi'
import JSZip from 'jszip'
import { errorNotify } from 'src/views/Common/CommonCode'

const DeptOverDue = () => {

  const empDept = useSelector((state) => state.LoginUserData.empdept);
  const [tableData, setTableData] = useState([])
  const [masterData, setMasterData] = useState([])
  const [getarry, setgetarry] = useState([])
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
  const [image, setimage] = useState(0)
  const [imageUrls, setImageUrls] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editModalFlag, setEditModalFlag] = useState(0)
  const [filterText, setFilterText] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [subtaskMap, setSubtaskMap] = useState({});
  const [loadingMap, setLoadingMap] = useState({});


  const { data: OverdueDeptTask = [], isSuccess: DeptTaskSuccess, isError: error, isLoading: loading } = useQuery({
    queryKey: ['getAllOverDueTaskUnderDepartments', empDept],
    queryFn: () => getAllOverDueTaskUnderDepartment(empDept),
    enabled: !!empDept,
  });

  useEffect(() => {
    if (DeptTaskSuccess) {
      setTableData(OverdueDeptTask);
    } else {
      setTableData([]);
    }
  }, [DeptTaskSuccess, OverdueDeptTask]);

  const rowSelectModal = useCallback((value) => {
    setEditModalFlag(1)
    setEditModalOpen(true)
    setimageViewModalOpen(false)
    setimage(0)
    setMasterData(value)
  }, [])


  const fileView = async val => {
    const { tm_task_slno } = val
    setgetarry(val)
    setEditModalOpen(false)
    setEditModalFlag(0)
    setimage(0) // Initialize imageViewModalFlag to 0 initially
    setimageViewModalOpen(false) // Close the modal if it was open
    const getImage = async tm_task_slno => {
      try {
        const result = await axioslogin.get(`/TmFileUpload/uploadFile/getTaskFile/${tm_task_slno}`, {
          responseType: 'blob'
        });

        const contentType = result.headers['content-type'] || '';
        if (contentType?.includes('application/json')) {
          return;
        } else {
          const zip = await JSZip.loadAsync(result.data);
          // Extract image files (e.g., .jpg, .png)
          const imageEntries = Object.entries(zip.files).filter(
            ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
          );
          const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
            // Get the original blob (no type)
            const originalBlob = await fileObj.async('blob');
            // Determine MIME type based on filename extension (or any other logic)
            let mimeType = '';
            if (filename.endsWith('.pdf')) {
              mimeType = 'application/pdf';
            } else if (filename.endsWith('.png')) {
              mimeType = 'image/png';
            } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
              mimeType = 'image/jpeg';
            } else {
              mimeType = 'application/octet-stream'; // fallback
            }
            // Recreate blob with correct type
            const blobWithType = new Blob([originalBlob], { type: mimeType });
            // Create URL from new blob
            const url = URL.createObjectURL(blobWithType);
            return { imageName: filename, url, blob: blobWithType };
          });
          const images = await Promise.all(imagePromises);
          setImageUrls(images)
          setimage(1)
          setimageViewModalOpen(true)
          setSelectedImages(val)
        }
      } catch (error) {
        errorNotify('Error fetching or processing images:', error);
      }
    }
    getImage(tm_task_slno)
  }

  const handleClose = useCallback(() => {
    setimage(0)
    setEditModalOpen(false)
    setEditModalFlag(0)
    setimageViewModalOpen(false)
    setImageUrls([])
  }, [setimageViewModalOpen, setEditModalOpen, setImageUrls, setimage])


  const filteredData = tableData.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  const ListSubtask = useCallback(async (val) => {
    if (!val?.tm_task_slno) return;
    const taskId = val.tm_task_slno;
    if (selectedTaskId === taskId) {
      setSelectedTaskId(null);
      return;
    }

    setSelectedTaskId(taskId); // open this task
    setLoadingMap(prev => ({ ...prev, [taskId]: true }));

    try {
      const result = await axioslogin.post("/taskManagement/subtaskUnderdepSec", { main_task_slno: taskId });
      const { success, data } = result.data;

      setSubtaskMap(prev => ({
        ...prev,
        [taskId]: success === 2 ? data : []
      }));
    } catch (err) {
      setSubtaskMap(prev => ({ ...prev, [taskId]: [] }));
    } finally {
      setLoadingMap(prev => ({ ...prev, [taskId]: false }));
    }
  }, [selectedTaskId]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {editModalFlag === 1 ?
        <ModalEditTask
          open={editModalOpen} masterData={masterData} setEditModalOpen={setEditModalOpen}
          setEditModalFlag={setEditModalFlag}
        />
        :
        image === 1 ? <ViewTaskImage imageUrls={imageUrls} open={imageViewModalOpen} handleClose={handleClose}
          selectedImages={selectedImages} getarry={getarry} /> : null}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1 }}>
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
      <Box sx={{ px: 1, height: '67vh', overflow: 'auto' }}>

        {loading ? (
          <CircularProgress
            color='danger'
            thickness={4}
          />
        ) : error ? (
          <Typography sx={{ fontSize: 14, color: "red", textAlign: "center", mt: 2 }}>
            Failed to load tasks
          </Typography>
        ) : filteredData.length === 0 ? (
          <Typography sx={{ fontSize: 14, color: "grey", textAlign: "center", mt: 2 }}>
            No tasks found
          </Typography>
        ) : (
          filteredData?.map((val, index) => (
            <Box
              key={index}
              sx={{
                border: 1,
                borderColor: taskColor.purple,
                borderRadius: 5,
                mb: .5,
                backgroundColor: 'background.body',
                transition: '0.2s',
                '&:hover': { boxShadow: 'md' }
              }}
            >

              <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pt: 1 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <TextComponent
                    sx={{ fontSize: 16, fontWeight: 700, color: taskColor.darkPurple }}
                    text={val.main_task_slno ? `Subtask #${val.tm_task_slno}` : `Task #${val.tm_task_slno}`}
                  />

                  <Tooltip title="Task Created Date" placement="top-end">
                    <Typography level="body-xs" sx={{ fontSize: 12, color: 'text.primary', cursor: 'pointer' }}>
                      <FormattedDate date={val.create_date} />
                    </Typography>
                  </Tooltip>
                </Box>

                <Chip
                  size="sm"
                  variant="soft"
                  color={
                    val.tm_task_status === 0 ? 'neutral'
                      : val.tm_task_status === 1 ? 'success'
                        : val.tm_task_status === 2 ? 'warning'
                          : val.tm_task_status === 3 ? 'neutral'
                            : val.tm_task_status === 4 ? 'info'
                              : 'neutral'
                  }
                  sx={{ fontWeight: 700 }}
                >
                  {val.tm_task_status === 0 ? 'Not Started'
                    : val.tm_task_status === 1 ? 'Completed'
                      : val.tm_task_status === 2 ? 'On Progress'
                        : val.tm_task_status === 3 ? 'On Hold'
                          : val.tm_task_status === 4 ? 'Pending'
                            : 'Not Given'}
                </Chip>

                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', ml: 2 }}>
                  <TaskCountDownComponent DueDates={val.tm_task_due_date} />
                  <TextComponent sx={{ fontSize: 12, color: 'text.primary' }} text={<FormattedDate date={val.tm_task_due_date} />} />
                </Box>
              </Box>

              <Box sx={{ px: 2, pt: 1, fontSize: 15, fontWeight: 600, color: 'black' }}>
                {val.tm_task_name}
              </Box>
              <Box sx={{ px: 2, pb: 1, fontSize: 14 }}>
                <ReadmoreDescribtion description={val.tm_task_description} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: taskColor.lightpurple, m: .1, px: .3, pt: .3 }}>
                <Box sx={{ display: 'flex', gap: .2 }}>
                  <Button size="sm" variant="outlined" color='neutral' style={{ backgroundColor: '#F8F8F8' }} onClick={() => rowSelectModal(val)}>
                    <EditIcon fontSize="small" style={{ color: taskColor.darkPurple }} />
                  </Button>
                  <Button size="sm" variant="outlined" color='neutral' style={{ backgroundColor: '#F8F8F8' }} onClick={() => fileView(val)}>
                    {val.tm_task_file === 1
                      ? <FilePresentRoundedIcon sx={{ color: taskColor.darkPurple }} />
                      : <FilePresentIcon sx={{ color: 'grey' }} />}
                  </Button>
                  {!val.main_task_slno && (
                    <Button
                      size="sm"
                      variant="outlined"
                      color="neutral"
                      style={{ backgroundColor: '#F8F8F8' }}
                      onClick={() => ListSubtask(val)}
                    >
                      <LanRoundedIcon fontSize="small" style={{ color: taskColor.darkPurple }} />
                    </Button>
                  )}

                </Box>
                <TaskAssigneesName empNames={val.em_name} />
              </Box>


              {selectedTaskId === val.tm_task_slno && (
                <Box sx={{ m: 1, }}>
                  {loadingMap[val.tm_task_slno] ? (
                    <CircularProgress size='sm' sx={{ color: taskColor.darkPurple }} />
                  ) : subtaskMap[val.tm_task_slno]?.length > 0 ? (
                    subtaskMap[val.tm_task_slno].map((sub, i) => (
                      <Box key={i} sx={{
                        border: 1, borderColor: taskColor.purple, borderRadius: 4, mb: 0.5,
                        transition: '0.2s', '&:hover': { boxShadow: 'sm' }, bgcolor: taskColor.lightpurple
                      }}>

                        <Box sx={{ display: 'flex', alignItems: 'center', p: 1, }}>
                          <Box sx={{ flexGrow: 1 }}>
                            <TextComponent
                              sx={{ fontSize: 16, fontWeight: 700, color: taskColor.darkPurple }}
                              text={`Subtask #${sub.tm_task_slno}`}
                            />
                            <Tooltip title="Task Created Date" placement="top-end">
                              <Typography level="body-xs" sx={{ fontSize: 12, color: 'text.primary', cursor: 'pointer' }}>
                                <FormattedDate date={sub.create_date} />
                              </Typography>
                            </Tooltip>
                          </Box>

                          <Chip
                            size="sm"
                            variant="soft"
                            color={
                              val.tm_task_status === 0 ? 'neutral'
                                : val.tm_task_status === 1 ? 'success'
                                  : val.tm_task_status === 2 ? 'warning'
                                    : val.tm_task_status === 3 ? 'danger'
                                      : val.tm_task_status === 4 ? 'info'
                                        : 'neutral'
                            }
                            sx={{ fontWeight: 700 }}
                          >
                            {val.tm_task_status === 0 ? 'Not Started'
                              : val.tm_task_status === 1 ? 'Completed'
                                : val.tm_task_status === 2 ? 'On Progress'
                                  : val.tm_task_status === 3 ? 'On Hold'
                                    : val.tm_task_status === 4 ? 'Pending'
                                      : 'Not Given'}
                          </Chip>
                          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', ml: 2 }}>
                            <TaskCountDownComponent DueDates={sub.tm_task_due_date} />
                            <TextComponent sx={{ fontSize: 12, color: 'text.primary' }} text={<FormattedDate date={sub.tm_task_due_date} />} />
                          </Box>
                        </Box>
                        <Box sx={{ px: 1, fontSize: 15, fontWeight: 600, color: 'black' }}>
                          {sub.tm_task_name}
                        </Box>
                        <Box sx={{ px: 1, pb: 1, fontSize: 14 }}>
                          {sub.tm_task_description}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: taskColor.lightpurple, m: .1, px: .3, pt: .3 }}>
                          <Box sx={{ display: 'flex', gap: .2, pb: .5 }}>
                            <Button size="sm" variant="outlined" color='neutral' style={{ backgroundColor: '#F8F8F8' }} onClick={() => rowSelectModal(sub)}>
                              <EditIcon fontSize="small" style={{ color: taskColor.darkPurple }} />
                            </Button>
                            <Button size="sm" variant="outlined" color='neutral' style={{ backgroundColor: '#F8F8F8' }} onClick={() => fileView(sub)}>
                              {sub.tm_task_file === 1
                                ? <FilePresentRoundedIcon sx={{ color: taskColor.darkPurple }} />
                                : <FilePresentIcon sx={{ color: 'grey' }} />}
                            </Button>

                          </Box>
                          <TaskAssigneesName empNames={sub.em_name} />
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography sx={{ fontSize: 15, color: 'black', fontWeight: 600, py: 2 }}>No Subtasks</Typography>
                  )}
                </Box>
              )}
            </Box>
          )))}
      </Box>
    </Box>

  )
}

export default memo(DeptOverDue)