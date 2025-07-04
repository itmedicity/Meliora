import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
import { Badge, Box, FormControlLabel, Paper, Radio, RadioGroup } from '@mui/material'
import { CssVarsProvider, IconButton, Option, Select, Typography } from '@mui/joy'
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone'
import { parse } from 'date-fns'
import { infoNotify } from 'src/views/Common/CommonCode'
import AlignHorizontalLeftTwoToneIcon from '@mui/icons-material/AlignHorizontalLeftTwoTone'
import CRFDashboardDptSelect from 'src/views/CommonSelectCode/CRFDashboardDptSelect'
import CRFDashboardDptSecSelect from 'src/views/CommonSelectCode/CRFDashboardDptSecSelect'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'
import moment from 'moment'
import CustomIconButtonCmp from '../Components/CustomIconButtonCmp'
import CustomInputDateCmp from '../Components/CustomInputDateCmp'
import { getDefaultCompany } from 'src/api/CommonApiCRF'
import { useQuery } from 'react-query'

const formatDateForInput = date => {
  return date.toISOString().split('T')[0]
}
const TopDesignForHigherlevel = ({
  pendingData,
  radiovalue,
  setRadioValue,
  allData,
  setDisData,
  getPendingData,
  getApprovalData,
  getProcurementData,
  getInventoryData,
  getuserAckData,
  getHoldData,
  getRejectData,
  getCloseData,
  fromDate,
  fromDateChange,
  toDateChange,
  toDate,
  crfRadioValue,
  setCrfRadioValue,
  getHoldItems,
  getRejectItem,
  selectedCompany,
  disData
}) => {
  const [startDate, setStartDate] = useState(formatDateForInput(new Date()))
  const [endDate, setEndDate] = useState(formatDateForInput(new Date()))
  const [searchCrf, setsearchCrf] = useState('')
  const [searchFlag, setSearchFlag] = useState(0)
  const [dptSec, setdptSec] = useState(0)
  const [department, setDepartment] = useState(0)

  const ClearSearch = useCallback(() => {
    setSearchFlag(0)
    setStartDate(formatDateForInput(new Date()))
    setEndDate(formatDateForInput(new Date()))
    setDepartment(0)
    setdptSec(0)
    setsearchCrf('')
    setDisData(allData)
    setCrfRadioValue('1')
  }, [allData, setDisData, setCrfRadioValue])

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

  const updateRadioClick = useCallback(
    async e => {
      e.preventDefault()
      setRadioValue(e.target.value)
      if (e.target.value === '1') {
        getPendingData()
      } else if (e.target.value === '2') {
        getApprovalData()
      } else if (e.target.value === '3') {
        getProcurementData()
      } else if (e.target.value === '4') {
        getInventoryData()
      } else if (e.target.value === '5') {
        getuserAckData()
      } else if (e.target.value === '6') {
        getHoldData()
      } else if (e.target.value === '7') {
        getRejectData()
      } else if (e.target.value === '8') {
        infoNotify('Select Date to Search')
      }
      ClearSearch()
    },
    [
      setRadioValue,
      getPendingData,
      getApprovalData,
      getProcurementData,
      getInventoryData,
      getuserAckData,
      getHoldData,
      getRejectData,
      ClearSearch
    ]
  )

  const updateItemRadioClick = useCallback(
    async e => {
      e.preventDefault()
      setCrfRadioValue(e.target.value)
      if (radiovalue === '6') {
        if (e.target.value === '1') {
          getHoldData()
        } else if (e.target.value === '2') {
          getHoldItems()
        }
      } else if (radiovalue === '7') {
        if (e.target.value === '1') {
          getRejectData()
        } else if (e.target.value === '2') {
          getRejectItem()
        }
      }
    },
    [setCrfRadioValue, getHoldData, getRejectData, getRejectItem, getHoldItems, radiovalue]
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
      if (department === 0) {
        infoNotify('Select Department')
      } else {
        if (dptSec === 0) {
          const newData = allData?.filter(val => val.dept_id === department)
          setDisData(newData)
        } else {
          const newData = allData?.filter(val => val.dept_id === department && val.request_deptsec_slno === dptSec)
          setDisData(newData)
        }
      }
    }
  }, [startDate, endDate, searchFlag, department, searchCrf, allData, setDisData, dptSec])

  const searchClosedData = useCallback(() => {
    getCloseData()
  }, [getCloseData])

  if (isCompLoading) return <p>Loading...</p>
  if (compError) return <p>Error occurred.</p>
  return (
    <Fragment>
      <Box sx={{ flexWrap: 'wrap' }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            bgcolor: '#E3EFF9',
            border: '0.4px solid #B4F5F0',
            borderTop: 'none'
          }}
        >
          <RadioGroup
            sx={{ pt: 1, flex: '1 1 auto', px: 3 }}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={radiovalue}
            onChange={e => updateRadioClick(e)}
          >
            <Badge
              badgeContent={disData ? disData.length : 0}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              sx={{
                mr: 1,
                '& .MuiBadge-badge': {
                  backgroundColor: '#FF8300',
                  color: 'white',
                  transform: 'translate(70%, -10%)'
                }
              }}
            >
              <FormControlLabel
                value="9"
                sx={{}}
                control={
                  <Radio
                    sx={{
                      color: '#116530',
                      '&.Mui-checked': {
                        color: '#116530'
                      }
                    }}
                  />
                }
                label="Approval Pending"
              />
            </Badge>
            <Badge
              badgeContent={pendingData ? pendingData.length : 0}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              sx={{
                mr: 1,
                '& .MuiBadge-badge': {
                  backgroundColor: '#FF8300',
                  color: 'white',
                  transform: 'translate(70%, -10%)'
                }
              }}
            >
              <FormControlLabel
                value="1"
                sx={{ pl: 1.5 }}
                control={
                  <Radio
                    sx={{
                      color: '#FF8300',
                      '&.Mui-checked': {
                        color: '#FF8300'
                      }
                    }}
                  />
                }
                label="Pending All"
              />
            </Badge>
            <FormControlLabel
              value="2"
              sx={{ pl: 1.5 }}
              control={
                <Radio
                  sx={{
                    color: '#6200ea',
                    '&.Mui-checked': {
                      color: '#6200ea'
                    }
                  }}
                />
              }
              label="Approval Status"
            />
            <FormControlLabel
              value="3"
              sx={{ pl: 1 }}
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
              label="Procurement Status"
            />
            <FormControlLabel
              value="4"
              sx={{ pl: 1 }}
              control={
                <Radio
                  sx={{
                    color: '#887BB0',
                    '&.Mui-checked': {
                      color: '#887BB0'
                    }
                  }}
                />
              }
              label="Inventory Status"
            />

            <FormControlLabel
              value="5"
              sx={{ pl: 1 }}
              control={
                <Radio
                  sx={{
                    color: '#116530',
                    '&.Mui-checked': {
                      color: '#116530'
                    }
                  }}
                />
              }
              label="User Acknowledgement Pending"
            />
          </RadioGroup>
          <RadioGroup
            sx={{
              pt: 1,
              flex: '1 1 auto',
              bgcolor: '#D4F1F4',
              borderLeft: '1px solid lightgrey'
            }}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={radiovalue}
            onChange={e => updateRadioClick(e)}
          >
            <FormControlLabel
              value="6"
              sx={{ pl: 1 }}
              control={
                <Radio
                  sx={{
                    color: '#F7AC32',
                    '&.Mui-checked': {
                      color: '#F7AC32'
                    }
                  }}
                />
              }
              label="On-Hold"
            />

            <FormControlLabel
              value="7"
              sx={{ pl: 1 }}
              control={
                <Radio
                  sx={{
                    color: '#BA0F30',
                    '&.Mui-checked': {
                      color: '#BA0F30'
                    }
                  }}
                />
              }
              label="Reject"
            />

            <FormControlLabel
              value="8"
              sx={{ pl: 1 }}
              control={
                <Radio
                  sx={{
                    color: '#DF362D',
                    '&.Mui-checked': {
                      color: '#DF362D'
                    }
                  }}
                />
              }
              label="Closed"
            />
          </RadioGroup>
        </Box>

        {radiovalue === '8' ? (
          <Paper sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', p: 0.5 }}>
            <Box sx={{ display: 'flex', pl: 0.5, pb: 0.5 }}>
              <Typography sx={{ fontSize: 14, color: '#0d47a1', pt: 1.7, pr: 1, fontWeight: 550 }}>
                Closed Date :
              </Typography>
              <Box sx={{ pt: 0.9, flex: '1 1 auto' }}>
                <DateInput label="Start Date" value={fromDate} onChange={fromDateChange} />
              </Box>
              <Box sx={{ pt: 0.9, pl: 0.5, flex: '1 1 auto' }}>
                <DateInput label="End Date" value={toDate} onChange={toDateChange} />
              </Box>
              <Box sx={{ pl: 0.5, pt: 0.8 }}>
                <CssVarsProvider>
                  <CustomIconButtonCmp handleChange={searchClosedData}>
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
            </Box>
          </Paper>
        ) : (
          <Paper sx={{}}>
            {radiovalue === '6' || radiovalue === '7' ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', borderBottom: '1px solid lightgrey' }}>
                <RadioGroup
                  sx={{ pt: 0.5, flex: '1 1 auto', display: 'flex', justifyContent: 'center' }}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={crfRadioValue}
                  onChange={e => updateItemRadioClick(e)}
                >
                  <FormControlLabel
                    value="1"
                    sx={{ pl: 1 }}
                    control={
                      <Radio
                        sx={{
                          color: '#BA0F30',
                          '&.Mui-checked': {
                            color: '#BA0F30'
                          }
                        }}
                      />
                    }
                    label="CRF"
                  />
                  <FormControlLabel
                    value="2"
                    sx={{ pl: 1 }}
                    control={
                      <Radio
                        sx={{
                          color: '#F7AC32',
                          '&.Mui-checked': {
                            color: '#F7AC32'
                          }
                        }}
                      />
                    }
                    label="Item Wise"
                  />
                </RadioGroup>
              </Box>
            ) : null}

            <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', py: 0.3 }}>
              <Box sx={{ m: 0.5 }}>
                <CssVarsProvider>
                  <Select
                    defaultValue="0"
                    sx={{
                      width: 250,
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
                  </Select>
                </CssVarsProvider>
              </Box>
              <Box sx={{ m: 0.5, pr: 1 }}>
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
                <Box sx={{ display: 'flex', m: 0.5 }}>
                  <Box sx={{ flex: '1 1 auto' }}>
                    <DateInput label="Start Date" value={startDate} onChange={startDateChange} />
                  </Box>
                  <Box sx={{ flex: '1 1 auto', pl: 0.5 }}>
                    <DateInput label="End Date" value={endDate} onChange={endDateChange} />
                  </Box>
                </Box>
              ) : searchFlag === '2' ? (
                <Box sx={{ pt: 0.5, pr: 0.7 }}>
                  <CssVarsProvider>
                    <CustomInputDateCmp
                      StartIcon={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AlignHorizontalLeftTwoToneIcon sx={{ height: 18, width: 18, color: '#0063C5' }} />
                          <Typography sx={{ fontSize: '13px', color: '#0063C5' }}>
                            {' '}
                            {selectedCompany === '2' ? 'CRF/KMC/' : `CRF/${company?.company_name}/`}{' '}
                          </Typography>
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
                <Box sx={{ display: 'flex', pt: 0.5, pr: 0.7 }}>
                  <CRFDashboardDptSelect department={department} setDepartment={setDepartment} setdptSec={setdptSec} />
                  {department !== 0 ? (
                    <Box sx={{ ml: 0.5 }}>
                      <CRFDashboardDptSecSelect dptSec={dptSec} setdptSec={setdptSec} />
                    </Box>
                  ) : null}
                </Box>
              ) : null}
              {searchFlag === '1' ||
              searchFlag === '2' ||
              searchFlag === '3' ||
              searchFlag === '4' ||
              searchFlag === '5' ? (
                <Box sx={{ pt: 0.5 }}>
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
          </Paper>
        )}
      </Box>
    </Fragment>
  )
}
const DateInput = ({ label, value, onChange }) => (
  <CssVarsProvider>
    <CustomInputDateCmp
      StartIcon={<Typography sx={{ fontSize: 14, color: '#0d47a1', fontWeight: 550, pr: 0.5 }}>{label}</Typography>}
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
      value={value}
      handleChange={onChange}
      slotProps={{
        input: { max: moment(new Date()).format('YYYY-MM-DD') }
      }}
    />
  </CssVarsProvider>
)
export default memo(TopDesignForHigherlevel)
