import React, { memo, useEffect, useMemo, useState } from 'react'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import { axioslogin } from 'src/views/Axios/Axios'
import Stack from '@mui/joy/Stack'
import CircularProgress from '@mui/joy/CircularProgress'
import { Box, Tooltip, Typography } from '@mui/joy'

const EmpTaskUnderProjectCount = ({ val, emslno }) => {
  const [total, setTotal] = useState(0)
  const [complete, setComplete] = useState(0)
  const [progress, setProgress] = useState(0)
  const { tm_project_slno } = val
  const searchData = useMemo(() => {
    return {
      tm_project_slno: tm_project_slno,
      tm_assigne_emp: emslno,
    }
  }, [tm_project_slno, emslno])

  useEffect(() => {
    const getEmpTaskCount = async () => {
      const result = await axioslogin.post('/TmTableView/EmpTaskCountUnderProject', searchData)
      const { success, data } = result.data
      if (success === 2) {
        const { TT, TC } = data[0]
        const valueProgress = Math.round((TC / TT) * 100)
        setProgress(valueProgress)
        setTotal(TT)
        setComplete(TC)
      }
    }
    getEmpTaskCount(searchData)
  }, [searchData])

  return (
    <FormControl orientation="horizontal" sx={{ pl: 2, flex: 1 }}>
      <Tooltip title={'Employee Progress Over this project'} placement="bottom">
        <FormLabel
          sx={{
            fontSize: 15,
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            cursor: 'grab',
          }}
        >
          <Box>
            <Stack spacing={1}>
              <CircularProgress determinate size="md" sx={{ bgcolor: 'white' }} value={progress}>
                <Typography sx={{ fontSize: 11 }}>{progress}%</Typography>
              </CircularProgress>
            </Stack>
          </Box>
        </FormLabel>
      </Tooltip>
      <Tooltip title={'Completed Task Under this Project'} placement="bottom">
        <FormLabel
          sx={{
            fontSize: 15,
            flex: 1,
            cursor: 'grab',
            color: 'green',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          ({complete})
        </FormLabel>
      </Tooltip>
      <Tooltip title={'Total Task Under this Project'} placement="bottom">
        <FormLabel sx={{ fontSize: 15, flex: 1, cursor: 'grab', color: '#523A28' }}>
          ({total})
        </FormLabel>
      </Tooltip>
    </FormControl>
  )
}

export default memo(EmpTaskUnderProjectCount)
