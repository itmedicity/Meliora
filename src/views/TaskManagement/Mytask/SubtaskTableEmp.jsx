import { Box, Chip, CssVarsProvider, Table, } from '@mui/joy'
import React, { memo, useEffect, useMemo, useState, } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { useQuery } from '@tanstack/react-query';
import { getAllSubtaskUnderTask } from 'src/api/TaskApi';
import FormattedDate from 'src/views/Components/FormattedDate';


const SubtaskTableEmp = ({ tm_task_slno, selectForEditsSubTask, setCompleteFlag, }) => {

  const [subTask, setSubTask] = useState([])
  const searchData = useMemo(() => {
    return {
      main_task_slno: tm_task_slno
    }
  }, [tm_task_slno])


  const { data: SubtaskData, isSuccess: SubtaskSuccess } = useQuery({
    queryKey: ['getAllSubTaskUnderTask', searchData],
    queryFn: () => getAllSubtaskUnderTask(searchData),
    enabled: !!searchData,
  });

  useEffect(() => {
    if (SubtaskData?.length > 0) {
      setSubTask(SubtaskData);
      const filterData = SubtaskData.filter(val => val.tm_task_status !== 1);
      setCompleteFlag(filterData);
    } else {
      setSubTask([]);
      setCompleteFlag([]);
    }
  }, [SubtaskData, SubtaskSuccess]);


  return (
    <Box sx={{ px: 1 }}>
      {subTask.length !== 0 ?
        <CssVarsProvider>
          <Table stickyHeader size='sm' variant='outlined' >
            <thead>
              <tr>
                <th style={{ width: 40, textAlign: 'center' }}>#</th>
                <th style={{ width: 50, textAlign: 'center' }} >Action</th>
                <th style={{ width: 100, textAlign: 'center' }}>status</th>
                <th style={{ width: 'auto' }}>Subtask</th>
                <th style={{ width: 'auto' }}>Assignee</th>
                <th style={{ width: 100 }}>created date</th>
                <th style={{ width: 100 }}>Due date</th>
                <th style={{ width: 'auto' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {subTask?.map((val, index) => {
                return (
                  <tr
                    key={index}
                    style={{
                      minHeight: 5
                    }}
                  >
                    <td style={{ textAlign: 'center' }}> {index + 1}</td>
                    <td style={{ textAlign: 'center' }}>
                      <EditIcon sx={{ cursor: 'pointer' }} size={6}
                        onClick={() => selectForEditsSubTask(val)}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}><Chip sx={{
                      fontSize: 12,
                      color: val.tm_task_status === null ? 'darkred'
                        : val.tm_task_status === 0 ? 'darkred'
                          : val.tm_task_status === 1 ? '#94C973'
                            : val.tm_task_status === 2 ? '#EFD593'
                              : val.tm_task_status === 3 ? '#67595E'
                                : val.tm_task_status === 4 ? '#5885AF'
                                  : 'transparent',
                    }}>{val.tm_task_status === 1 ? 'Completed' :
                      val.tm_task_status === 2 ? 'On Progress' :
                        val.tm_task_status === 3 ? 'On Hold' :
                          val.tm_task_status === 4 ? 'Pending' :
                            val.tm_task_status === 0 ? 'Not Started' : 'Not Started'}</Chip></td>
                    <td style={{ textTransform: 'capitalize' }}> {val.tm_task_name || 'not given'}</td>
                    <td style={{ textTransform: 'capitalize' }}> {val.em_name || 'not given'}</td>
                    <td> <FormattedDate date={val.create_date} /> </td>
                    <td> <FormattedDate date={val.tm_task_due_date} /> </td>
                    <td style={{ textTransform: 'capitalize' }}> {val.tm_task_description || 'not given'}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </CssVarsProvider>
        :
        <Box></Box>}
    </Box>
  )
}

export default memo(SubtaskTableEmp)