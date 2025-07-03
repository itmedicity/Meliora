import React, { memo, useEffect, useMemo, useState } from 'react'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import { axioslogin } from 'src/views/Axios/Axios'
import { Box, CssVarsProvider, LinearProgress, Typography } from '@mui/joy'

const ProjectProgress = ({ val }) => {
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
    <Box sx={{ pt: 1 }}>
      <CssVarsProvider>
        <FormControl orientation="horizontal" sx={{ pl: 2, flex: 3 }}>
          <FormLabel sx={{ fontSize: 15, flex: 9 }}>
            <LinearProgress
              determinate
              variant="outlined"
              color="neutral"
              size="sm"
              thickness={11}
              value={progress}
              sx={{
                '--LinearProgress-radius': '15px',
                '--LinearProgress-thickness': '11px',
                bgcolor: 'white',
                color: '#92443A',
                height: 17,
              }}
            >
              <Typography fontSize={12} sx={{ mixBlendMode: 'difference', color: 'white' }}>
                Progress &nbsp;
                {`${Math.round(Number(progress))}%`}
              </Typography>
            </LinearProgress>
          </FormLabel>
        </FormControl>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(ProjectProgress)
