import { Box, Button, Chip, CircularProgress, Tooltip, Typography } from '@mui/joy';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import ViewTaskImage from '../TaskFileView/ViewTaskImage';
import { taskColor } from 'src/color/Color';
import TextComponent from 'src/views/Components/TextComponent';
import FormattedDate from 'src/views/Components/FormattedDate';
import ReadmoreDescribtion from 'src/views/Components/ReadmoreDescribtion';
import EditIcon from '@mui/icons-material/Edit';
import LanRoundedIcon from '@mui/icons-material/LanRounded';
import TaskAssigneesName from 'src/views/Components/TaskAssingeesName';
import TaskCountDownComponent from 'src/views/Components/TaskCountDownComponent';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import FilterSelector from 'src/views/Ams/AmsDashboard/FilterSelector';
import { endOfMonth, endOfYear, format, startOfMonth, startOfYear } from 'date-fns';
import ModalEditTask from '../CreateTask/ModalEditTask';
import { getFilesFromZip } from 'src/api/FileViewsFn';
import { errorNotify, warningNotify } from 'src/views/Common/CommonCode';
import FloatingSearch from 'src/views/Components/FloatingSearch';


const DeptCompleted = ({ tableCount, setTableCount, taskcount, settaskcount, projectcount, setprojectcount }) => {

  const empDept = useSelector((state) => state.LoginUserData.empdept);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalFlag, setEditModalFlag] = useState(0);
  const [masterData, setMasterData] = useState([]);
  const [getarry, setgetarry] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageViewModalOpen, setimageViewModalOpen] = useState(false);
  const [image, setimage] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [subtaskMap, setSubtaskMap] = useState({});
  const [loadingMap, setLoadingMap] = useState({});
  const [taskCompltedStartDate, settaskCompltedStartDate] = useState('');
  const [taskCompltedEndDate, settaskCompltedEndDate] = useState('');
  const [employeeCompleted, setemployeeCompleted] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleResAndUnresAntibioticChange = (start, end) => {
    settaskCompltedStartDate(start);
    settaskCompltedEndDate(end);
  };

  const searchAllCompletedTask = useMemo(() => {
    if (!taskCompltedStartDate || !taskCompltedEndDate) return null;

    const start = new Date(taskCompltedStartDate);
    const end = new Date(taskCompltedEndDate);

    if (isNaN(start) || isNaN(end)) return null;

    try {
      const isSameDay = start.toDateString() === end.toDateString();
      const isFullYear =
        start.getFullYear() === end.getFullYear() &&
        start.getMonth() === 0 &&
        end.getMonth() === 11;

      if (isSameDay) {
        return {
          empDept: empDept,
          From: format(start, 'yyyy-MM-dd 00:00:00'),
          To: format(end, 'yyyy-MM-dd 23:59:59')
        };
      }

      if (isFullYear) {
        return {
          empDept: empDept,
          From: format(startOfYear(start), 'yyyy-MM-dd 00:00:00'),
          To: format(endOfYear(end), 'yyyy-MM-dd 23:59:59')
        };
      }

      if (taskCompltedStartDate === '1970-01-01T00:00:00') {
        return { empDept: empDept, From: null, To: null };
      }

      return {
        empDept: empDept,
        From: format(startOfMonth(start), 'yyyy-MM-dd 00:00:00'),
        To: format(endOfMonth(end), 'yyyy-MM-dd 23:59:59')
      };
    } catch {
      return null;
    }
  }, [taskCompltedStartDate, taskCompltedEndDate, empDept]);

  useEffect(() => {
    const fetchSubtasks = async () => {
      setLoading(true); // start loading
      setemployeeCompleted([]);
      try {
        const res = await axioslogin.post('/taskManagement/getAllCompletedTasks', searchAllCompletedTask);
        const { success, data } = res.data;

        if (success === 1 && Array.isArray(data)) {
          setemployeeCompleted(data);
        } else {
          setemployeeCompleted([]);
        }
      } catch {
        setemployeeCompleted([]);
      } finally {
        setLoading(false); // stop loading
      }
    };

    if (searchAllCompletedTask) fetchSubtasks();
  }, [searchAllCompletedTask]);

  const filteredData = useMemo(() => {
    return (employeeCompleted || []).filter((row) =>
      Object.values(row || {})
        .join(' ')
        .toLowerCase()
        .includes(filterText.toLowerCase())
    );
  }, [employeeCompleted, filterText]);


  const rowSelectModal = useCallback((value) => {
    setEditModalFlag(1);
    setEditModalOpen(true);
    setimageViewModalOpen(false);
    setimage(0);
    setMasterData(value);
  }, []);

  const handleClose = useCallback(() => {
    setimage(0);
    setEditModalOpen(false);
    setEditModalFlag(0);
    setimageViewModalOpen(false);
    setImageUrls([]);
  }, []);




  const fileView = async (val) => {
    const { tm_task_slno } = val;
    setgetarry(val);
    setimage(1);
    setimageViewModalOpen(true);
    setSelectedImages(val);
    try {
      const images = await getFilesFromZip('/TmFileUpload/uploadFile/getTaskFile', tm_task_slno);
      if (images && images.length > 0) {
        setImageUrls(images);
      } else {
        setImageUrls([]);
        warningNotify('No images attached for this task.');
      }
    } catch (error) {
      errorNotify('Error fetching task images:', error);
      setImageUrls([]);
    }
  };


  const ListSubtask = useCallback(
    async (val) => {
      if (!val?.tm_task_slno) return;
      const taskId = val.tm_task_slno;

      if (selectedTaskId === taskId) {
        setSelectedTaskId(null);
        return;
      }

      setSelectedTaskId(taskId);
      setLoadingMap((prev) => ({ ...prev, [taskId]: true }));

      try {
        const result = await axioslogin.post('/taskManagement/subtaskUnderdepSec', {
          main_task_slno: taskId
        });
        const { success, data } = result.data;

        setSubtaskMap((prev) => ({
          ...prev,
          [taskId]: success === 2 && Array.isArray(data) ? data : []
        }));
      } catch {
        setSubtaskMap((prev) => ({ ...prev, [taskId]: [] }));
      } finally {
        setLoadingMap((prev) => ({ ...prev, [taskId]: false }));
      }
    },
    [selectedTaskId]
  );


  return (
    <Box sx={{ overflow: 'auto', position: "relative" }}>
      <FloatingSearch
        value={filterText}
        setValue={setFilterText}
      />

      {editModalFlag === 1 ? (


        <ModalEditTask
          open={editModalOpen}
          setEditModalOpen={setEditModalOpen}
          masterData={masterData}
          setEditModalFlag={setEditModalFlag}
          taskcount={taskcount}
          settaskcount={settaskcount}
          projectcount={projectcount}
          setprojectcount={setprojectcount}
          tableCount={tableCount}
          setTableCount={setTableCount}
        />
      ) : image === 1 ? (
        <ViewTaskImage
          imageUrls={imageUrls}
          open={imageViewModalOpen}
          handleClose={handleClose}
          selectedImages={selectedImages}
          getarry={getarry}
        />
      ) : null}

      <Box sx={{ m: 1, }}>
        <FilterSelector onDateRangeChange={handleResAndUnresAntibioticChange} />
      </Box>


      <Box sx={{ mx: 1, height: '62vh', overflow: 'auto' }}>
        {loading ? (
          <Box sx={{ py: 3 }}>
            <CircularProgress thickness={2} sx={{ color: taskColor.darkPurple }} />
          </Box>
        ) :

          filteredData.length === 0 ? (
            <Typography
              sx={{ fontSize: 14, color: 'grey', textAlign: 'center', mt: 2 }}
            >
              No tasks found
            </Typography>
          ) : (
            filteredData.map((val, index) => {
              const completeDate = new Date(val.tm_complete_date);
              const dueDate = new Date(val.tm_task_due_date);
              const diff = completeDate - dueDate;
              const days = Math.floor(diff / (1000 * 60 * 60 * 24));
              const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
              const minutes = Math.floor((diff / (1000 * 60)) % 60);
              const seconds = Math.floor((diff / 1000) % 60);

              return (
                <Box
                  key={index}
                  sx={{
                    border: 1,
                    borderColor: taskColor.purple,
                    borderRadius: 5,
                    mb: 0.5,
                    backgroundColor: 'background.body',
                    transition: '0.2s',
                    '&:hover': { boxShadow: 'md' },
                  }}
                >

                  <Box sx={{ display: 'flex', px: 2, pt: 1 }}>
                    <Box sx={{ flex: 1 }}>
                      <TextComponent
                        sx={{ fontSize: 16, fontWeight: 700, color: taskColor.darkPurple }}
                        text={
                          val.main_task_slno
                            ? `Subtask #${val.tm_task_slno}`
                            : `Task #${val.tm_task_slno}`
                        }
                      />
                      <Tooltip title="Task Created Date" placement="top-end">
                        <Box sx={{ cursor: 'pointer', width: 200, fontSize: 12, }}>
                          <FormattedDate date={val.create_date} />
                        </Box>
                      </Tooltip>
                    </Box>

                    <Box
                      sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          gap: 0.5,
                        }}
                      >
                        <Chip
                          size="sm"
                          variant="soft"
                          color="success"
                          sx={{
                            fontWeight: 700,
                            textTransform: 'capitalize',
                            px: 1.5,
                            py: 0.5,
                          }}
                        >
                          Completed
                        </Chip>

                        {val.tm_complete_date && (
                          <Tooltip title="Task Completed Date" placement="top-end">
                            <Box sx={{ cursor: 'pointer', width: 250, fontSize: 12, display: 'flex', justifyContent: 'flex-end', }}>
                              <FormattedDate date={val.tm_complete_date} />
                            </Box>
                          </Tooltip>
                        )}
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ px: 2, pt: 1, fontSize: 15, fontWeight: 600, color: 'black' }}>
                    {val.tm_task_name}
                  </Box>
                  <Box sx={{ px: 2, pb: 1, fontSize: 14 }}>
                    <ReadmoreDescribtion description={val.tm_task_description} />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      bgcolor: taskColor.lightpurple,
                      m: 0.1,
                      px: 0.3,
                      pt: 0.3,
                    }}
                  >
                    <Box sx={{ flex: 1, display: 'flex', gap: 0.2 }}>
                      <Button
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        style={{ backgroundColor: '#F8F8F8' }}
                        onClick={() => rowSelectModal(val)}
                      >
                        <EditIcon fontSize="small" style={{ color: taskColor.darkPurple }} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        style={{ backgroundColor: '#F8F8F8' }}
                        onClick={() => fileView(val)}
                      >
                        {val.tm_task_file === 1 ? (
                          <FilePresentRoundedIcon sx={{ color: taskColor.darkPurple }} />
                        ) : (
                          <FilePresentIcon sx={{ color: 'grey' }} />
                        )}
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

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Tooltip title="Task Due Date" placement="top-end">
                        <Box sx={{ cursor: 'pointer', width: 200, fontSize: 12, display: 'flex', justifyContent: 'flex-end', pr: 2, pt: .5, }}>
                          <FormattedDate date={val.tm_task_due_date} />
                        </Box>
                      </Tooltip>

                      <>
                        {diff > 0 ? (
                          <Chip
                            sx={{
                              backgroundColor: '#F8EA8C',
                              px: 1,
                              color: taskColor.darkPurple,
                              fontSize: 11,
                              fontWeight: 600,
                            }}
                          >
                            {days}d {hours}h {minutes}m {seconds}s Late
                          </Chip>
                        ) : (
                          <Chip sx={{ fontSize: 11, bgcolor: 'white', color: 'darkgreen' }}>
                            Completed On Time
                          </Chip>
                        )}
                      </>

                    </Box>

                  </Box>

                  {
                    selectedTaskId === val.tm_task_slno && (
                      <Box sx={{ m: 1 }}>
                        {loadingMap[val.tm_task_slno] ? (
                          <CircularProgress size="sm" sx={{ color: taskColor.darkPurple }} />
                        ) : subtaskMap[val.tm_task_slno]?.length > 0 ? (
                          subtaskMap[val.tm_task_slno].map((sub, i) => (
                            <Box
                              key={i}
                              sx={{
                                border: 1,
                                borderColor: taskColor.purple,
                                borderRadius: 4,
                                mb: 0.5,
                                transition: '0.2s',
                                '&:hover': { boxShadow: 'sm' },
                                bgcolor: taskColor.lightpurple,
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                                <Box sx={{ flex: 1 }}>
                                  <TextComponent
                                    sx={{ fontSize: 16, fontWeight: 700, color: taskColor.darkPurple }}
                                    text={`Subtask #${sub.tm_task_slno}`}
                                  />
                                  <Tooltip title="Task Created Date" placement="top-end">
                                    <Typography
                                      level="body-xs"
                                      sx={{
                                        fontSize: 12,
                                        color: 'text.primary',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      <FormattedDate date={sub.create_date} />
                                    </Typography>
                                  </Tooltip>
                                </Box>

                                <Chip
                                  size="sm"
                                  variant="soft"
                                  color={
                                    sub.tm_task_status === 0
                                      ? 'neutral'
                                      : sub.tm_task_status === 1
                                        ? 'success'
                                        : sub.tm_task_status === 2
                                          ? 'warning'
                                          : sub.tm_task_status === 3
                                            ? 'danger'
                                            : sub.tm_task_status === 4
                                              ? 'info'
                                              : 'neutral'
                                  }
                                  sx={{ fontWeight: 700 }}
                                >
                                  {sub.tm_task_status === 0
                                    ? 'Not Started'
                                    : sub.tm_task_status === 1
                                      ? 'Completed'
                                      : sub.tm_task_status === 2
                                        ? 'On Progress'
                                        : sub.tm_task_status === 3
                                          ? 'On Hold'
                                          : sub.tm_task_status === 4
                                            ? 'Pending'
                                            : 'Not Given'}
                                </Chip>

                                <Box
                                  sx={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    ml: 2,
                                  }}
                                >
                                  <TaskCountDownComponent DueDates={sub.tm_task_due_date} />
                                  <TextComponent
                                    sx={{ fontSize: 12, color: 'text.primary' }}
                                    text={<FormattedDate date={sub.tm_task_due_date} />}
                                  />
                                </Box>
                              </Box>

                              <Box sx={{ px: 1, fontSize: 15, fontWeight: 600, color: 'black' }}>
                                {sub.tm_task_name}
                              </Box>
                              <Box sx={{ px: 1, pb: 1, fontSize: 14 }}>
                                {sub.tm_task_description}
                              </Box>

                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  bgcolor: taskColor.lightpurple,
                                  m: 0.1,
                                  px: 0.3,
                                  pt: 0.3,
                                }}
                              >
                                <Box sx={{ display: 'flex', gap: 0.2, pb: 0.5 }}>
                                  <Button
                                    size="sm"
                                    variant="outlined"
                                    color="neutral"
                                    style={{ backgroundColor: '#F8F8F8' }}
                                    onClick={() => rowSelectModal(sub)}
                                  >
                                    <EditIcon fontSize="small" style={{ color: taskColor.darkPurple }} />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outlined"
                                    color="neutral"
                                    style={{ backgroundColor: '#F8F8F8' }}
                                    onClick={() => fileView(sub)}
                                  >
                                    {sub.tm_task_file === 1 ? (
                                      <FilePresentRoundedIcon sx={{ color: taskColor.darkPurple }} />
                                    ) : (
                                      <FilePresentIcon sx={{ color: 'grey' }} />
                                    )}
                                  </Button>
                                </Box>
                                <TaskAssigneesName empNames={sub.em_name} />
                              </Box>
                            </Box>
                          ))
                        ) : (
                          <Typography
                            sx={{ fontSize: 15, color: 'black', fontWeight: 600, py: 2 }}
                          >
                            No Subtasks
                          </Typography>
                        )}
                      </Box>
                    )
                  }
                </Box>
              );
            })
          )}
      </Box>

    </Box >
  );
};

export default memo(DeptCompleted);

