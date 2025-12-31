import React, { useCallback, useMemo, useEffect, memo, useState } from 'react'
import { Box, CssVarsProvider, Typography } from '@mui/joy'
import IconButton from '@mui/joy/IconButton'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import DietprocessTable from '../Diet/DietprocessTable'
import { format } from 'date-fns'


const DietProcessDashCmp = () => {
  const [process, setProcess] = useState(0)
  const [newOrder, setNewOrder] = useState(0)
  const [proTable, setProTable] = useState(0)
  const [newordrTable, setNewOrdrTable] = useState(0)
  const [depand, setDepand] = useState(0)
  const [count, setCount] = useState(0)
  const [startdate, newStartDate] = useState(new Date())
  const [dayselect, setdayselect] = useState(0)

  const postdata = useMemo(() => {
    return {
      process_date: dayselect === 0 ? format(new Date(), 'yyyy-MM-dd ') : format(new Date(startdate), 'yyyy-MM-dd ')
    }
  }, [startdate, dayselect])

  useEffect(() => {
    //Get dashboard process list count
    const getprocesscount = async () => {
      const result = await axioslogin.post('/dietprocess/getproceedcount', postdata)
      const { success, data } = result.data
      if (success === 1) {
        const { processcount } = data[0]
        setProcess(processcount)
      } else {
        warningNotify('Error occured contact EDP')
      }
      //Get dashboard new order list count
      const result1 = await axioslogin.post('/dietprocess/getNewOrderCount', postdata)
      const { succes, dataa } = result1.data
      if (succes === 1) {
        const { neworder } = dataa[0]
        setNewOrder(neworder)
      } else {
        warningNotify('Error occured contact EDP')
      }
    }
    getprocesscount()
  }, [count, postdata])

  const getProcessList = useCallback(() => {
    setProTable(1)
    setNewOrdrTable(0)
    setDepand(0)
  }, [])
  const getNewOrder = useCallback(() => {
    setNewOrdrTable(1)
    setProTable(0)
    setDepand(1)
  }, [])

  return (
    <Box
      sx={{
        gap: 2,
        flexWrap: 'wrap',
        width: '100%'
      }}
    >
      <Box
        sx={{
          width: '100%',
          p: 0.5,
          pb: 2,
          display: 'flex',
          flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
          justifyContent: 'space-evenly'
        }}
      >
        <Box
          sx={{
            gap: 2,
            flexWrap: 'wrap',
            width: { xs: '100%', sm: '100%', md: '50%', lg: '30%', xl: '30%' },
            mt: { xs: 1, sm: 1, lg: 1, xl: 1 }
          }}
        >
          <Box
            sx={{
              width: '100%',
              p: 0.5,
              display: 'flex',
              direction: 'row'
            }}
          >
            <Box
              sx={{
                display: 'flex'
              }}
            >
              <CssVarsProvider>
                <IconButton size="lg" onClick={getProcessList}>
                  {process}
                </IconButton>
              </CssVarsProvider>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  px: 0.8
                }}
              >
                <CssVarsProvider>
                  <Typography level="body1" sx={{ alignItems: 'flex-start', wordBreak: 'break-all' }} color="success">
                    Proccess List
                  </Typography>
                </CssVarsProvider>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            gap: 2,
            flexWrap: 'wrap',
            width: { xs: '100%', sm: '100%', md: '50%', lg: '30%', xl: '30%' },
            mt: { xs: 1, sm: 1, lg: 1, xl: 1 },
            pl: { xs: 0, sm: 0, xl: 1, lg: 1, md: 1 }
          }}
        >
          <Box
            elevation={3}
            sx={{
              width: '100%',
              p: 0.5,
              display: 'flex',
              direction: 'row'
            }}
          >
            <Box
              sx={{
                display: 'flex'
              }}
            >
              <CssVarsProvider>
                <IconButton size="lg" onClick={getNewOrder}>
                  {newOrder}
                </IconButton>
              </CssVarsProvider>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  px: 0.8
                }}
              >
                <CssVarsProvider>
                  <Typography level="body1" sx={{ alignItems: 'flex-start', wordBreak: 'break-all' }} color="success">
                    New Order
                  </Typography>
                </CssVarsProvider>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {proTable === 1 ? (
        <Box
          elevation={3}
          sx={{
            width: '100%',
            p: 0.5,
            pt: 2,
            mt: 0.5,
            display: 'flex',
            flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
            justifyContent: 'space-evenly'
          }}
        >
          <DietprocessTable
            depand={depand}
            setDepand={setDepand}
            setCount={setCount}
            count={count}
            startdate={startdate}
            newStartDate={newStartDate}
            dayselect={dayselect}
            setdayselect={setdayselect}
          />
        </Box>
      ) : null}
      {newordrTable === 1 ? (
        <Box
          elevation={3}
          sx={{
            width: '100%',
            p: 0.5,
            pt: 2,
            mt: 0.5,
            display: 'flex',
            flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
            justifyContent: 'space-evenly'
          }}
        >
          <DietprocessTable
            depand={depand}
            setDepand={setDepand}
            setCount={setCount}
            count={count}
            startdate={startdate}
            newStartDate={newStartDate}
            dayselect={dayselect}
            setdayselect={setdayselect}
          />
        </Box>
      ) : null}
    </Box>
  )
}

export default memo(DietProcessDashCmp)
