import { Box, CssVarsProvider, IconButton, Option, Select, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import CustomCloseIconCmp from '../ComonComponent/Components/CustomCloseIconCmp'
import { useNavigate } from 'react-router-dom'
import { Badge, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import {
  getDataCollectionDetails,
  getDefaultCompany,
  getCompanyDetails,
  getdefaultRights,
  getDatakmcDep
} from 'src/api/CommonApiCRF'

import _ from 'underscore'
import { useSelector } from 'react-redux'
import { Virtuoso } from 'react-virtuoso'
import MasterDetailCompnt from '../ComonComponent/MasterDetailCompnt'
import DataCollectionSave from '../ComonComponent/DataCollectionComp/DataCollectionSave'
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone'
import AlignHorizontalLeftTwoToneIcon from '@mui/icons-material/AlignHorizontalLeftTwoTone'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'
import CustomInputDateCmp from '../ComonComponent/Components/CustomInputDateCmp'
import CustomIconButtonCmp from '../ComonComponent/Components/CustomIconButtonCmp'
import { parse } from 'date-fns'
import { infoNotify } from 'src/views/Common/CommonCode'
import { getDatakmcCollectionDetails } from 'src/api/CommonApiCRFKmc'

const formatDateForInput = date => {
  return date.toISOString().split('T')[0]
}

const CrfDataCollectionTable = () => {
  const history = useNavigate()
  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])
  const empdeptsec = useSelector(state => state.LoginUserData.empsecid, _.isEqual)
  const empid = useSelector(state => state.LoginUserData.empid, _.isEqual)

  const [pendingData, setPendingData] = useState([])
  const [doneData, setDoneData] = useState([])
  const [allData, setAllData] = useState([])
  const [disData, setDisData] = useState([])
  const [radiovalue, setRadioValue] = useState('1')
  const [startDate, setStartDate] = useState(formatDateForInput(new Date()))
  const [endDate, setEndDate] = useState(formatDateForInput(new Date()))
  const [searchCrf, setsearchCrf] = useState('')
  const [searchFlag, setSearchFlag] = useState(0)
  const [selectedCompany, setSelectedCompany] = useState('1')
  const [combinedData, setcombinedData] = useState([])

  const {
    data: dataCollection,
    isLoading: isDCLoading,
    error: dcError
  } = useQuery({
    queryKey: ['dataCollection', empdeptsec],
    // queryFn: () => getDataCollectionDetails(empdeptsec),
    queryFn: async () => {
      const data = await getDataCollectionDetails(empdeptsec)
      return data.filter(item => item.tmc_data_collection_status === 0)
    },
    enabled: empdeptsec !== null
  })

  const {
    data: depkmc,
    isLoading: iskmcDepLoading,
    error: kmcdepError
  } = useQuery({
    queryKey: ['dataDepkmc', empdeptsec],
    queryFn: () => getDatakmcDep(empdeptsec),
    staleTime: Infinity
  })

  const {
    data: dataCollectionkmc,
    isLoading: iskmcDCLoading,
    error: kmcdcError
  } = useQuery({
    queryKey: ['dataCollectionkmc', empdeptsec, depkmc?.kmc_dept], // safer caching
    queryFn: async () => {
      const payload = depkmc?.kmc_dept
      const data = await getDatakmcCollectionDetails(payload)
      return data?.filter(item => item.tmc_data_collection_status === 1)
    },
    enabled: empdeptsec !== null && depkmc !== undefined
  })
  // const { data: dataCollectionkmc, isLoading: iskmcDCLoading, error: kmcdcError } = useQuery({
  //     queryKey: ['dataCollectionkmc', empdeptsec],
  //     queryFn: async () => {
  //         const data = await getDatakmcCollectionDetails(depkmc);
  //         return data.filter(item => item.tmc_data_collection_status === 1);
  //     },

  //     enabled: empdeptsec !== null,
  // });

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

  const {
    data: datarights,
    isLoading: isdataLoading,
    error: dataError
  } = useQuery({
    queryKey: 'getdefaultRights',
    queryFn: () => getdefaultRights(empid),
    staleTime: Infinity
  })
  const Right = useMemo(() => {
    return datarights?.[0] || null
  }, [datarights])

  useEffect(() => {
    if (selectedCompany === '1') {
      if (radiovalue === '1') {
        setDisData(pendingData)
        setAllData(pendingData)
        setcombinedData(dataCollection)
      }
    } else if (selectedCompany === '2') {
      if (radiovalue === '1') {
        setDisData(pendingData)
        setAllData(pendingData)
        setcombinedData(dataCollectionkmc)
      }
    }
  }, [radiovalue, pendingData, selectedCompany, dataCollection, dataCollectionkmc])

  useEffect(() => {
    if (combinedData && combinedData.length > 0) {
      const datas = combinedData?.map(val => {
        const obj = {
          req_slno: val.req_slno,
          actual_requirement: val.actual_requirement,
          needed: val.needed,
          request_deptsec_slno: val.request_deptsec_slno,
          req_deptsec: val.req_deptsec?.toLowerCase(),
          user_deptsection: val.user_deptsection.toLowerCase(),
          em_name: val.create_user.toLowerCase(),
          category: val.category,
          location: val.location,
          emergency_flag: val.emergency_flag,
          emer_type_name: val.emer_type_name,
          emer_slno: val.emer_slno,
          emer_type_escalation: val.emer_type_escalation,
          emergeny_remarks: val.emergeny_remarks,
          total_approx_cost: val.total_approx_cost,
          image_status: val.image_status,
          req_date: val.req_date,
          expected_date: val.expected_date,
          crf_dept_remarks: val.crf_dept_remarks,
          data_entered: val.data_entered !== null ? val.data_entered.toLowerCase() : '',
          reqest_one: val.reqest_one,
          req_user: val.requser !== null ? val.requser.toLowerCase() : '',
          datagive_user: val.saveuser !== null ? val.saveuser.toLowerCase() : '',
          dc_req_date: val.dc_req_date,
          update_date: val.update_date,
          crf_req_remark: val.crf_req_remark,
          data_coll_image_status: val.data_coll_image_status,
          crf_data_collect_slno: val.crf_data_collect_slno,
          crf_requst_slno: val.crf_requst_slno,
          requser: val.requser.toLowerCase(),
          crf_dept_status: val.crf_dept_status,
          company_name: val?.company_name
        }
        return obj
      })
      const pendingList = datas.filter(val => {
        return val.crf_dept_status === null
      })
      setPendingData(pendingList)
      const DoneList = datas.filter(
        (item, index, self) =>
          index === self.findIndex(val => val.req_slno === item.req_slno && val.crf_dept_status === 1)
      )
      setDoneData(DoneList)
      // const DoneList = datas.filter((val) => {
      //     return val.crf_dept_status === 1
      // })
    } else {
      setPendingData([])
      setDoneData([])
    }
  }, [combinedData])

  const updateRadioClick = useCallback(
    async e => {
      e.preventDefault()
      setRadioValue(e.target.value)
      if (e.target.value === '1') {
        setAllData(pendingData)
        setDisData(pendingData)
      } else if (e.target.value === '2') {
        setAllData(doneData)
        setDisData(doneData)
      }
    },
    [doneData, pendingData]
  )

  const ClearSearch = useCallback(() => {
    setSearchFlag(0)
    setStartDate(formatDateForInput(new Date()))
    setEndDate(formatDateForInput(new Date()))
    setsearchCrf('')
    setDisData(allData)
  }, [allData, setDisData])
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
    }
  }, [startDate, endDate, searchFlag, searchCrf, allData, setDisData])

  const handleRadioChange = useCallback(async e => {
    const selectedCompanyName = e.target.value
    setSelectedCompany(selectedCompanyName)
  }, [])
  const {
    data: compData,
    isLoading: isCompLoad,
    error: comError
  } = useQuery({
    queryKey: 'getCompany',
    queryFn: () => getCompanyDetails(),
    staleTime: Infinity
  })
  const comData = useMemo(() => compData, [compData])

  if (isDCLoading || isCompLoading || isCompLoad || isdataLoading)
    return <p>Loading...</p>
  if (dcError || compError || comError || dataError) return <p>Error occurred.</p>
  return (
    <Fragment>
      <Box sx={{ height: window.innerHeight - 80, flexWrap: 'wrap', bgcolor: 'white', width: '100%' }}>
        <Box sx={{ display: 'flex', backgroundColor: '#f0f3f5', border: '1px solid #B4F5F0' }}>
          <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: 0.5, color: '#385E72' }}>Data Collection For CRF</Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, fontSize: 20, m: 0.5 }}>
            <CssVarsProvider>
              <CustomCloseIconCmp handleChange={backtoSetting} />
            </CssVarsProvider>
          </Box>
        </Box>
        {Right?.status === 1 ? (
          <Box
            sx={{
              height: 40,
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              justifyContent: 'center',
              bgcolor: 'white'
            }}
          >
            <RadioGroup row value={selectedCompany} onChange={handleRadioChange}>
              {comData?.map(val => (
                <FormControlLabel
                  key={val.company_slno}
                  value={val.company_slno}
                  control={<Radio />}
                  label={val.company_name}
                />
              ))}
            </RadioGroup>
          </Box>
        ) : null}

        <Box sx={{ display: 'flex', bgcolor: '#E3EFF9', py: 0.5, flexWrap: 'wrap' }}>
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
                badgeContent={doneData.length}
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
                          Start Date{' '}
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
                        <Typography sx={{ fontSize: '13px', color: '#0063C5' }}>
                          CRF/{company?.company_name}/
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
            ) : null}
            {searchFlag === '1' || searchFlag === '2' ? (
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
        <Box sx={{ height: window.innerHeight - 230, overflow: 'auto', flexWrap: 'wrap' }}>
          {disData?.length !== 0 ? (
            <Virtuoso
              data={disData}
              totalCount={disData?.length}
              itemContent={(index, val) => (
                <Box
                  key={index}
                  sx={{
                    width: '100%',
                    mt: 0.8,
                    flexWrap: 'wrap',
                    border: '1px solid #21B6A8',
                    borderRadius: 2
                  }}
                >
                  <MasterDetailCompnt val={val} />
                  <DataCollectionSave
                    selectedCompany={selectedCompany}
                    flag={radiovalue === '1' ? 1 : 0}
                    val={val}
                    empdeptsec={empdeptsec}
                    depkmc={depkmc}
                  />
                </Box>
              )}
            ></Virtuoso>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: 25,
                opacity: 0.5,
                pt: 10,
                color: 'grey'
              }}
            >
              No Report Found
            </Box>
          )}
        </Box>
      </Box>
    </Fragment>
  )
}

export default memo(CrfDataCollectionTable)
