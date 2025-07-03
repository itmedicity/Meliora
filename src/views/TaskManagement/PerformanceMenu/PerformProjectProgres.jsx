import React, { memo, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { Box, CircularProgress, CssVarsProvider, Typography } from '@mui/joy'

const PerformProjectProgres = ({ val }) => {
  const [progress, setProgress] = useState(0)
  const { tm_project_slno, tm_assigne_emp, tm_project_status } = val
  const searchData = useMemo(() => {
    return {
      tm_project_slno: tm_project_slno,
      tm_assigne_emp: tm_assigne_emp,
    }
  }, [tm_project_slno, tm_assigne_emp])

  useEffect(() => {
    if (tm_project_status === 1) {
      setProgress(100)
    } else {
      const getEmpTaskCount = async () => {
        const result = await axioslogin.post('/TmTableView/EmpTaskCountUnderProject', searchData)
        const { success, data } = result.data
        if (success === 2) {
          const { TT, TC } = data[0]
          const valueProgress = (TC / TT) * 100
          setProgress(valueProgress === 0 ? 0 : valueProgress - 6)
        }
      }
      getEmpTaskCount(searchData)
    }
  }, [searchData, tm_project_status])

  return (
    <Box>
      <CssVarsProvider>
        <CircularProgress
          determinate
          value={progress}
          color="neutral"
          sx={{ '--CircularProgress-size': '40px' }}
        >
          <Typography fontSize={10} sx={{ color: 'black' }}>
            {`${Math.round(Number(progress))}%`}
          </Typography>
        </CircularProgress>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(PerformProjectProgres)
