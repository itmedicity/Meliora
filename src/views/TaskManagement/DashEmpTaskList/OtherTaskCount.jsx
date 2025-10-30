import { Box } from '@mui/joy'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const OtherTaskCount = ({ val }) => {
  const { emslno } = val
  const [tcount, setTcount] = useState([])
  const taskCountData = useMemo(() => {
    return {
      tm_assigne_emp: emslno
    }
  }, [emslno])
  useEffect(() => {
    const getAllTaskCountwithoutProject = async () => {
      const result = await axioslogin.post('/TmTableView/EmpTaskCountWithoutProject', taskCountData)
      const { success, data } = result.data
      if (success === 2) {
        setTcount(data)
      } else {
        setTcount([])
      }
    }
    getAllTaskCountwithoutProject(emslno)
  }, [taskCountData, emslno])

  return (
    <Box>
      {tcount &&
        tcount.map((val, index) => {
          return (
            <Box key={index}>
              {val.totalcount !== 0 ? (
                <Box
                  sx={{
                    bgcolor: '#AFC1D0',
                    flex: 1,
                    mx: 1,
                    mb: 1.5,
                    height: 30,
                    borderBottom: 1,
                    borderColor: '#B7CFDC',
                    color: '#725450',
                    fontWeight: 600,
                    pl: 1.5,
                    pt: 0.5,
                    display: 'flex'
                  }}
                >
                  <Box sx={{ flex: 15 }}>Other Non-Project Task Count</Box>
                  <Box
                    sx={{
                      flex: 1
                    }}
                  >
                    ({val.totalcount})
                  </Box>
                </Box>
              ) : (
                <Box></Box>
              )}
            </Box>
          )
        })}
    </Box>
  )
}

export default memo(OtherTaskCount)
