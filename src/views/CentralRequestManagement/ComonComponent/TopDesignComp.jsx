import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone'
import CustomInputDateCmp from './Components/CustomInputDateCmp'
import AlignHorizontalLeftTwoToneIcon from '@mui/icons-material/AlignHorizontalLeftTwoTone'
import CustomIconButtonCmp from './Components/CustomIconButtonCmp'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'
import { CssVarsProvider, IconButton, Option, Select, Typography } from '@mui/joy'
import { Badge, Box, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { parse } from 'date-fns'
import { infoNotify } from 'src/views/Common/CommonCode'
import { useQuery } from '@tanstack/react-query'
import { getDefaultCompany } from 'src/api/CommonApiCRF'

const formatDateForInput = date => {
  return date.toISOString().split('T')[0]
}

const TopDesignComp = ({
  pendingData,
  donedata,
  closedData,
  authorizeDeptSec,
  allData,
  setAllData,
  setDisData,
  radiovalue,
  setRadioValue
}) => {
  const [startDate, setStartDate] = useState(formatDateForInput(new Date()))
  const [endDate, setEndDate] = useState(formatDateForInput(new Date()))
  const [searchCrf, setsearchCrf] = useState('')
  const [searchFlag, setSearchFlag] = useState(0)
  const [deptSec, setdeptSec] = useState(0)

  // for default company master

  const {
    data: companyData,
    isLoading: isCompLoading,
    error: compError
  } = useQuery({
    queryKey: 'getdefaultCompany',
    queryFn: () => getDefaultCompany(),
    staleTime: Infinity
  })
  const company = useMemo(() => companyData, [companyData])

  const ClearSearch = useCallback(() => {
    setSearchFlag(0)
    setStartDate(formatDateForInput(new Date()))
    setEndDate(formatDateForInput(new Date()))
    setdeptSec(0)
    setsearchCrf('')
    setDisData(allData)
  }, [allData, setDisData])

  const updateRadioClick = useCallback(
    async e => {
      e.preventDefault()
      setRadioValue(e.target.value)
      if (e.target.value === '1') {
        setAllData(pendingData)
        setDisData(pendingData)
      } else if (e.target.value === '2') {
        setAllData(donedata)
        setDisData(donedata)
      } else if (e.target.value === '3') {
        setAllData(closedData)
        setDisData(closedData)
      }
    },
    [pendingData, donedata, closedData, setAllData, setDisData, setRadioValue]
  )

  const changeSearchSelect = useCallback((e, newValue) => {
    setSearchFlag(newValue)
  }, [])

  const startDateChange = useCallback(e => {
    setStartDate(e.target.value)
  }, [])
  const endDateChange = useCallback(e => {
    setEndDate(e.target.value)
  }, [])
  const changeCrfNo = useCallback(e => {
    setsearchCrf(e.target.value)
  }, [])

  const SearchData = useCallback(() => {
    if (searchFlag === '1') {
      const newData = allData?.filter(val => {
        const reqDate = new Date(val.req_date).setHours(0, 0, 0, 0)
        const start = parse(startDate, 'yyyy-MM-dd', new Date()).setHours(0, 0, 0, 0)
        const end = parse(endDate, 'yyyy-MM-dd', new Date()).setHours(0, 0, 0, 0)

        return reqDate >= start && reqDate <= end
      })

      if (newData.length !== 0) {
        setDisData(newData)
      } else {
        setDisData([])
      }
    } else if (searchFlag === '2') {
      if (searchCrf === '') {
        infoNotify('Enter CRF No.')
      } else {
        const newData = allData?.filter(val => val.req_slno === parseInt(searchCrf))
        setDisData(newData)
      }
    } else if (searchFlag === '3') {
      const newData = allData?.filter(val => val.request_deptsec_slno === deptSec)
      setDisData(newData)
    } else if (searchFlag === '4') {
      const rejected = allData?.filter(val => val.req_status === 'R')
      setDisData(rejected)
    } else if (searchFlag === '5') {
      const onhold = allData?.filter(val => val.req_status === 'P')
      setDisData(onhold)
    }
  }, [startDate, endDate, searchFlag, deptSec, searchCrf, allData, setDisData])

  if (isCompLoading) return <p>Loading...</p>
  if (compError) return <p>Error occurred.</p>
  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          bgcolor: '#E3EFF9',
          py: 0.5,
          flexWrap: 'wrap',
          border: '0.4px solid #B4F5F0',
          borderTop: 'none'
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', pr: 1 }}>
          <RadioGroup
            sx={{ pt: 1, flex: '1 1 auto', px: 3 }}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={radiovalue}
            onChange={e => updateRadioClick(e)}
          >
            <Badge
              badgeContent={pendingData.length}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              sx={{
                mr: 1,
                '& .MuiBadge-badge': {
                  backgroundColor: 'orange',
                  color: 'white',
                  transform: 'translate(70%, -10%)'
                }
              }}
            >
              <FormControlLabel
                value="1"
                sx={{}}
                control={
                  <Radio
                    sx={{
                      color: 'orange',
                      '&.Mui-checked': {
                        color: 'orange'
                      }
                    }}
                  />
                }
                label="Pending"
              />
            </Badge>
            <Badge
              badgeContent={donedata.length}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              sx={{
                mr: 1,
                '& .MuiBadge-badge': {
                  backgroundColor: '#0d47a1',
                  color: 'white',
                  transform: 'translate(70%, -10%)'
                }
              }}
            >
              <FormControlLabel
                value="2"
                sx={{ pl: 3 }}
                control={
                  <Radio
                    sx={{
                      color: '#0d47a1',
                      '&.Mui-checked': {
                        color: '#0d47a1'
                      }
                    }}
                  />
                }
                label="All List"
              />
            </Badge>
            <Badge
              badgeContent={closedData.length}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              sx={{
                mr: 1,
                '& .MuiBadge-badge': {
                  backgroundColor: '#F83839',
                  color: 'white',
                  transform: 'translate(70%, -10%)'
                }
              }}
            >
              <FormControlLabel
                value="3"
                sx={{ pl: 3 }}
                control={
                  <Radio
                    sx={{
                      color: 'red',
                      '&.Mui-checked': {
                        color: 'red'
                      }
                    }}
                  />
                }
                label="Closed"
              />
            </Badge>
          </RadioGroup>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
          <Box sx={{ m: 0.5, pt: 0.5, flex: '1 1 auto', pl: 0.5 }}>
            <CssVarsProvider>
              <Select
                defaultValue="0"
                sx={{
                  width: 200,
                  border: '1px solid #bbdefb',
                  height: 20,
                  color: '#1565c0',
                  fontSize: 14
                }}
                slotProps={{
                  listbox: { placement: 'bottom-start' }
                }}
                placeholder="Search By"
                value={searchFlag}
                onChange={changeSearchSelect}
              >
                <Option value="1">Req. Date</Option>
                <Option value="2">CRF No.</Option>
                <Option value="3">Department Section</Option>
                {radiovalue === '2' ? (
                  <>
                    <Option value="4">Rejected</Option>
                    <Option value="5">On-Hold</Option>
                  </>
                ) : null}
              </Select>
            </CssVarsProvider>
          </Box>
          <Box sx={{ my: 0.7, pr: 1 }}>
            <CssVarsProvider>
              <IconButton
                variant="plain"
                sx={{
                  color: '#0277bd',
                  width: '100%',
                  fontSize: 12,
                  borderRadius: 5,
                  height: '19px',
                  lineHeight: '1'
                }}
                onClick={ClearSearch}
              >
                <FilterAltTwoToneIcon sx={{ fontWeight: 550, color: '#0277bd', pr: 0.5, width: 30, height: 20 }} />
                Clear Filter
              </IconButton>
            </CssVarsProvider>
          </Box>
          {searchFlag === '1' ? (
            <Box sx={{ display: 'flex', pl: 0.5, flex: '1 1 auto' }}>
              <Box sx={{ pt: 0.9, flex: '1 1 auto' }}>
                <CssVarsProvider>
                  <CustomInputDateCmp
                    StartIcon={
                      <Typography sx={{ fontSize: 14, color: '#0d47a1', fontWeight: 550, pr: 0.5 }}>
                        Start Date{' '}
                      </Typography>
                    }
                    className={{
                      height: 25,
                      borderRadius: 5,
                      border: '1px solid #bbdefb',
                      color: '#0d47a1',
                      fontSize: 14,
                      width: 200
                    }}
                    size={'md'}
                    type="date"
                    name={'startDate'}
                    value={startDate}
                    handleChange={startDateChange}
                  />
                </CssVarsProvider>
              </Box>
              <Box sx={{ pt: 0.9, pl: 0.5, flex: '1 1 auto' }}>
                <CssVarsProvider>
                  <CustomInputDateCmp
                    StartIcon={
                      <Typography sx={{ fontSize: 14, color: '#0d47a1', fontWeight: 550, pr: 0.5 }}>
                        End Date{' '}
                      </Typography>
                    }
                    className={{
                      height: 35,
                      borderRadius: 5,
                      border: '1px solid #bbdefb',
                      color: '#0d47a1',
                      fontSize: 14,
                      width: 200
                    }}
                    size={'md'}
                    type="date"
                    name={'endDate'}
                    value={endDate}
                    handleChange={endDateChange}
                  />
                </CssVarsProvider>
              </Box>
            </Box>
          ) : searchFlag === '2' ? (
            <Box sx={{ flex: '1 1 auto', pt: 0.9, pl: 0.5 }}>
              <CssVarsProvider>
                <CustomInputDateCmp
                  StartIcon={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AlignHorizontalLeftTwoToneIcon sx={{ height: 18, width: 18, color: '#0063C5' }} />
                      <Typography sx={{ fontSize: '13px', color: '#0063C5' }}>CRF/{company?.company_name}/</Typography>
                    </Box>
                  }
                  className={{
                    borderRadius: 6,
                    border: '1px solid #bbdefb',
                    width: 250,
                    height: 35,
                    color: '#1565c0'
                  }}
                  autoComplete={'off'}
                  size={'md'}
                  type="text"
                  name={'searchCrf'}
                  value={searchCrf}
                  handleChange={changeCrfNo}
                />
              </CssVarsProvider>
            </Box>
          ) : searchFlag === '3' ? (
            <Box sx={{ pt: 0.9, pl: 0.5, flex: '1 1 auto' }}>
              <CssVarsProvider>
                <Select
                  defaultValue="0"
                  sx={{
                    width: 280,
                    border: '1px solid #bbdefb',
                    height: 20,
                    color: '#1565c0',
                    fontSize: 13
                  }}
                  slotProps={{
                    listbox: { placement: 'bottom-start' }
                  }}
                  placeholder="Select Department Section"
                  value={deptSec}
                  onChange={(e, newValue) => setdeptSec(newValue)}
                >
                  {authorizeDeptSec?.map(val => (
                    <Option key={val.dept_section} value={val.dept_section} label={val.auth_deptsec}>
                      {val.auth_deptsec}
                    </Option>
                  ))}
                </Select>
              </CssVarsProvider>
            </Box>
          ) : null}
          {searchFlag === '1' ||
            searchFlag === '2' ||
            searchFlag === '3' ||
            searchFlag === '4' ||
            searchFlag === '5' ? (
            <Box sx={{ pt: 0.9, pl: 0.5, flex: '1 1 auto' }}>
              <CssVarsProvider>
                <CustomIconButtonCmp handleChange={SearchData}>
                  Search
                  <SearchTwoToneIcon
                    sx={{
                      height: 22,
                      width: 22,
                      color: '#1565c0',
                      ml: 1,
                      pt: 0.2,
                      '&:hover': {
                        color: '#43B0F1'
                      }
                    }}
                  />
                </CustomIconButtonCmp>
              </CssVarsProvider>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Fragment>
  )
}

export default memo(TopDesignComp)
