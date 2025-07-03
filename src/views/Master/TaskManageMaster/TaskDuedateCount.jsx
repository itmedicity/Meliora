import { Box } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
// import { us } from 'react-router-dom/cjs/react-router-dom.min'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card, CssVarsProvider, Input, Typography } from '@mui/joy'
import CusIconButton from 'src/views/Components/CusIconButton'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'

const TaskDuedateCount = () => {
  const history = useNavigate()
  const [count, setCount] = useState(0)
  const [duecount, setDuecount] = useState({
    co_setting_slno: '',
    tm_count_slno: '',
    tm_duedate_count: '',
  })
  const [cutoffPercentages, setCutoffPercentages] = useState([])
  const id = useSelector(state => state.LoginUserData.empid)
  const { tm_duedate_count } = duecount

  const updateDuecount = useCallback(
    e => {
      const value = e.target.value
      const name = e.target.name
      setDuecount({ ...duecount, [name]: value })
    },
    [duecount]
  )

  useEffect(() => {
    const getDueCount = async () => {
      const result = await axioslogin.get(`/TmAllDeptTask/getDuedateCount/1`)
      const { data } = result.data
      if (data.length !== 0) {
        const { co_setting_slno, tm_count_slno, tm_duedate_count } = data[0]
        setDuecount({ co_setting_slno, tm_count_slno, tm_duedate_count })
        const percentagesResult = await axioslogin.get(
          `/TmAllDeptTask/getCutoffPercentages/${tm_count_slno}`
        )
        const { data: percentagesData } = percentagesResult.data
        if (percentagesData.length !== 0) {
          setCutoffPercentages(percentagesData.map(item => item.reschedule_pecent))
        }
      }
    }
    getDueCount()
  }, [count])

  useEffect(() => {
    if (tm_duedate_count !== '') {
      const newCutoffPercentages = Array.from(
        { length: parseInt(tm_duedate_count) || 0 },
        (_, i) => cutoffPercentages[i] || ''
      )
      setCutoffPercentages(newCutoffPercentages)
    }
  }, [tm_duedate_count])

  const updateCutoffPercentage = (index, value) => {
    const newCutoffPercentages = [...cutoffPercentages]
    newCutoffPercentages[index] = value
    setCutoffPercentages(newCutoffPercentages)
  }

  const postdata = useMemo(
    () => ({
      tm_count_slno: 1,
      tm_duedate_count: tm_duedate_count,
      create_user: id,
    }),
    [tm_duedate_count, id]
  )

  const percentageData = cutoffPercentages.map((val, index) => ({
    reschedule_pecent_slno: index + 1,
    tm_count_slno: 1,
    reschedule_pecent: val,
    create_user: id,
    edit_user: id,
  }))

  const truncateCutoffPercentages = async () => {
    await axioslogin.post('/TmAllDeptTask/TruncatePercentage')
  }

  const submit = useCallback(
    async e => {
      e.preventDefault()

      const insertDueCount = async () => {
        const result = await axioslogin.post('/TmAllDeptTask/postDuedateCount', postdata)
        const { success } = result.data
        return success === 1
      }

      const insertCutoffPercentage = async () => {
        for (const data of percentageData) {
          const result = await axioslogin.post('/TmAllDeptTask/postCutoffPercentage', data)
          const { success } = result.data
          if (success !== 1) {
            return false
          }
        }
        return true
      }

      if (tm_duedate_count) {
        await truncateCutoffPercentages()
        if (await insertDueCount()) {
          if (await insertCutoffPercentage()) {
            succesNotify('Due date count and cutoff percentages updated successfully')
            setCount(count + 1)
          }
        }
      } else {
        infoNotify('Please enter Due date count')
      }
    },
    [postdata, percentageData, tm_duedate_count, count]
  )

  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])

  const getOrdinalLabel = n => {
    const suffixes = ['th', 'st', 'nd', 'rd']
    const v = n % 100
    return `${n}${suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]} time`
  }

  return (
    <Box>
      <CssVarsProvider>
        <Card sx={{ borderRadius: 0, p: 0 }}>
          <Box sx={{ flex: 1, display: 'flex', bgcolor: '#F0F3F5' }}>
            <Box sx={{ flex: 1, pl: 0.5, pt: 0.5 }}>
              <Typography sx={{ fontWeight: 600, color: 'grey' }}>
                Task Management Overdue change Count
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <CusIconButton
                size="sm"
                variant="outlined"
                color="primary"
                clickable="true"
                onClick={backtoSetting}
              >
                <CloseIcon fontSize="small" />
              </CusIconButton>
            </Box>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', m: 2 }}>
            <Card sx={{ flex: 1.3, borderRadius: 10, mx: 5 }}>
              <Box>
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Typography sx={{ flex: 1, fontWeight: 600 }}>
                    Task Due date Change Limit
                  </Typography>
                  <Typography>:</Typography> &nbsp;&nbsp;&nbsp;
                  <Box>
                    <Input
                      type="text"
                      name="tm_duedate_count"
                      value={tm_duedate_count}
                      size="sm"
                      sx={{ width: 50, height: 30, pl: 2.2 }}
                      onChange={updateDuecount}
                    />
                  </Box>
                </Box>
                <Box sx={{ flex: 1, mt: 0.8 }}>
                  {tm_duedate_count !== '' ? (
                    <Typography sx={{ fontSize: 13, color: 'darkred' }}>
                      CutOff Percentage(%) While Changing Duedates
                    </Typography>
                  ) : null}
                  {cutoffPercentages.map((cutoff, index) => (
                    <Box sx={{ flex: 1, display: 'flex', mt: 1 }} key={index}>
                      <Box sx={{ flex: 1, fontSize: 13, pl: 1, color: 'black' }}>
                        {getOrdinalLabel(index + 1)}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ flex: 1, display: 'flex', color: 'black' }}>
                          :&nbsp;
                          <Input
                            type="text"
                            value={cutoff}
                            size="sm"
                            sx={{ width: 40, height: 20, pl: 1.5 }}
                            onChange={e => {
                              const newValue = e.target.value
                              if (newValue.length <= 2) {
                                updateCutoffPercentage(index, newValue)
                              }
                            }}
                          />
                          <Typography sx={{ pt: 0.5, pl: 0.5, color: 'black' }}>%</Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', pb: 0.5 }}>
                  <SaveIcon sx={{ color: '#0B6BCB', cursor: 'pointer' }} onClick={submit} />
                  <Typography
                    sx={{ fontWeight: 600, color: '#0B6BCB', cursor: 'pointer' }}
                    onClick={submit}
                  >
                    Save
                  </Typography>
                </Box>
              </Box>
            </Card>
            <Box sx={{ flex: 2 }}></Box>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', bgcolor: '#F0F3F5' }}>
            <CusIconButton
              size="sm"
              variant="outlined"
              color="primary"
              clickable="true"
              onClick={backtoSetting}
            >
              <CloseIcon fontSize="small" />
            </CusIconButton>
          </Box>
        </Card>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(TaskDuedateCount)
