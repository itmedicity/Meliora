import React, { memo, useEffect, useMemo, useState } from 'react'
import CircularProgress from '@mui/joy/CircularProgress'
import { Box, CssVarsProvider, Typography } from '@mui/joy'
import { axioslogin } from 'src/views/Axios/Axios'

const PerfomTaskProgress = ({ val }) => {
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
          setMainTaskProgress(progress === 0 ? 0 : progress - 6)
        } else {
          setMainTaskProgress(0)
        }
      }
      getEmpTask(searchData)
    }
  }, [tm_task_status, searchData])

  return (
    <Box>
      <CssVarsProvider>
        <CircularProgress
          determinate
          value={MainTaskprogress}
          sx={{ '--CircularProgress-size': '40px' }}
        >
          <Typography fontSize={10} sx={{ color: 'black' }}>
            {`${Math.round(Number(MainTaskprogress))}%`}
          </Typography>
        </CircularProgress>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(PerfomTaskProgress)
