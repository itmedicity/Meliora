import React, { memo, useEffect, useMemo, useState } from 'react'
import Stack from '@mui/joy/Stack'
import CircularProgress from '@mui/joy/CircularProgress'
import { Box, Tooltip, Typography } from '@mui/joy'
import { axioslogin } from 'src/views/Axios/Axios'

const MainTaskProgress = ({ val }) => {
  const { tm_task_slno, tm_task_status } = val
  const [MainTaskprogress, setMainTaskProgress] = useState(0)
  const searchData = useMemo(() => {
    return {
      main_task_slno: tm_task_slno,
    }
  }, [tm_task_slno])

  useEffect(() => {
    if (tm_task_status === 1) {
      setMainTaskProgress(100)
    } else {
      const getEmpTask = async () => {
        const result = await axioslogin.post('/TmTableView/subTaskUnderTask', searchData)
        const { success, data } = result.data
        if (success === 2) {
          const complete = data?.filter(val => val.tm_task_status === 1)
          const progress = Math.round((complete.length / data.length) * 100)
          setMainTaskProgress(progress)
        }
      }
      getEmpTask(searchData)
    }
  }, [tm_task_status, searchData])

  return (
    <Box sx={{ pt: 1 }}>
      <Stack>
        <Tooltip title="Task Status">
          <CircularProgress
            size="sm"
            determinate
            sx={{ bgcolor: 'white', color: '#145DA0' }}
            value={MainTaskprogress}
          >
            <Typography sx={{ fontSize: 10 }}>{MainTaskprogress}%</Typography>
          </CircularProgress>
        </Tooltip>
      </Stack>
    </Box>
  )
}

export default memo(MainTaskProgress)
