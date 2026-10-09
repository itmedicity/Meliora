import React, { useState, useCallback, useEffect, memo, Fragment, useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import { editicon } from 'src/color/Color'
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined'
import DietProcessModel from './DietProcessModel'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from '../Components/CusIconButton'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { succesNotify } from 'src/views/Common/CommonCode'
import SelectDiet from '../CommonSelectCode/SelectDiet'
import NursingStationMeliSelect from '../CommonSelectCode/NursingStationMeliSelect'
import CusAgGridForMain from '../Components/CusAgGridForMain'
import { Box, Button, IconButton } from '@mui/joy'

const DietprocessTable = ({ depand, setDepand, count, setCount, newStartDate, startdate, dayselect, setdayselect }) => {
  const [tabledata, setTabledata] = useState([])
  const [nurse, setNurse] = useState(0)
  const [diet, setdiet] = useState(0)
  const [open, setOpen] = useState(false)
  const [sercha, setSearch] = useState(0)
  const [detail, setdeatial] = useState([])
  const [mdopen, setmdopen] = useState(0)

  //column title setting
  const [column] = useState([
    { headerName: 'Plan Slno', field: 'plan_slno' },
    { headerName: 'Patient Id', field: 'pt_no' },
    { headerName: 'Patient Name', field: 'ptc_ptname' },
    { headerName: 'Room/Ward', field: 'bdc_no' },
    { headerName: 'Plan Date', field: 'plan_date' },
    { headerName: 'Remarks', field: 'plan_remark' },
    {
      headerName: 'Diet Process',
      cellRenderer: params => (
        <IconButton sx={{ color: editicon, paddingY: 0.5 }} onClick={() => dietProcess(params)}>
          <PublishedWithChangesOutlinedIcon />
        </IconButton>
      )
    }
  ])
  const [columnprocess] = useState([
    { headerName: 'Process Slno', field: 'proc_slno' },
    { headerName: 'Plan Slno', field: 'plan_slno' },
    { headerName: 'Patient Id', field: 'pt_no' },
    { headerName: 'Patient Name', field: 'ptc_ptname' },
    { headerName: 'Room/Ward', field: 'bd_code' },
    { headerName: 'Plan Date', field: 'plan_date' },
    { headerName: 'Diet', field: 'diet_name' },
    { headerName: 'Remarks', field: 'plan_remark' }
  ])

  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  //month format
  const updatedate = e => {
    setdayselect(1)
    newStartDate(e.target.value)
  }
  const postdata = useMemo(() => {
    return {
      process_date: startdate,
      ns_code: nurse,
      diet_slno: diet
    }
  }, [startdate, nurse, diet])

  //get all data
  useEffect(() => {
    const getUserTable = async () => {
      if (depand === 1) {
        const result = await axioslogin.get('/dietplan/getdietplan/NewOrder')
        const { success, data } = result.data
        if (success === 1) {
          setTabledata(data)
        } else {
          setTabledata()
          warningNotify('Error occured contact EDP')
        }
      } else {
        const result = await axioslogin.get('/dietplan/dirtplan/proceeslist')
        const { success, data } = result.data
        if (success === 1) {
          setTabledata(data)
        } else {
          setTabledata()
          warningNotify('Error occured contact EDP')
        }
      }
    }
    getUserTable()
  }, [depand, count, sercha])

  useEffect(() => {
    const serchdatass = async () => {
      if (sercha === 1) {
        if (nurse !== 0 && diet === 0 && dayselect !== 1) {
          const postData = {
            process_date: format(new Date(), 'yyyy-MM-dd'),
            ns_code: nurse
          }
          const result = await axioslogin.post('/dietplan/newbydateNS', postData)
          const { success, data } = result.data
          if (success === 1) {
            setTabledata(data)
          } else {
            setTabledata()
            warningNotify('No Patient Found')
          }
        } else if (nurse !== 0 && diet !== 0 && dayselect !== 1) {
          const postData = {
            process_date: format(new Date(), 'yyyy-MM-dd'),
            ns_code: nurse,
            diet_slno: diet
          }
          const result = await axioslogin.post('/dietplan/newByDiet', postData)
          const { success, data } = result.data
          if (success === 1) {
            setTabledata(data)
          } else {
            setTabledata()
            warningNotify('No Patient Found')
          }
        } else if (nurse !== 0 && dayselect === 1 && diet === 0) {
          const result = await axioslogin.post('/dietplan/newbydateNS', postdata)
          const { success, data, message } = result.data
          if (success === 1) {
            setTabledata(data)
          } else {
            setTabledata()
            warningNotify(message)
          }
        } else if (nurse === 0 && dayselect !== 1 && diet === 0) {
          const postdataa = {
            process_date: format(new Date(), 'yyyy-MM-dd')
          }
          const result = await axioslogin.post('/dietplan/newbydate', postdataa)
          const { success, data } = result.data
          if (success === 1) {
            setTabledata(data)
          } else {
            setTabledata()
            warningNotify('No Patient Found')
          }
        } else if (nurse !== 0 && dayselect === 1 && diet !== 0) {
          const result = await axioslogin.post('/dietplan/newByDiet', postdata)
          const { success, data } = result.data
          if (success === 1) {
            setTabledata(data)
          } else {
            setTabledata()
            warningNotify('No Patient Found')
          }
        } else if (nurse === 0 && dayselect === 1 && diet === 0) {
          const postdataa = {
            process_date: startdate
          }
          const result = await axioslogin.post('/dietplan/newbydate', postdataa)
          const { success, data } = result.data
          if (success === 1) {
            setTabledata(data)
          } else {
            setTabledata()
            warningNotify('No Patient Found')
          }
        }
      }
    }
    serchdatass()
  }, [sercha, postdata, nurse, count, dayselect, diet, startdate])

  const dietProcess = useCallback(params => {
    const data = params.api.getSelectedRows()
    setdeatial(data)
    setmdopen(1)
    setOpen(true)
  }, [])

  const search = () => {
    setSearch(1)
    setDepand(2)
  }
  const [msgshow, setMsg] = useState(0)
  const allProcess = () => {
    const detail = async postdetaildata => {
      const result1 = await axioslogin.post('/dietprocess/processDetailInsert', postdetaildata)
      const { suces } = result1.data
      if (suces === 1) {
        setMsg(1)
        setCount(count + 1)
        setDepand(1)
      } else {
        setMsg(2)
      }
    }

    const insertProcess = async postdata => {
      const result = await axioslogin.post('/dietprocess', postdata)
      return result.data
    }

    tabledata &&
      tabledata.map(val => {
        const getdmenu = async () => {
          const result = await axioslogin.get(`/common/dMenu/${val.diet_slno}`)
          const { data, success } = result.data
          if (success === 1) {
            const { dmenu_slno } = data[0]
            const d = new Date(startdate)
            let day = d.getDay()
            const getmenu = {
              bd_code: val.bd_code,
              diet_slno: val.diet_slno,
              dmenu_slno: dmenu_slno,
              days: day
            }
            const result1 = await axioslogin.post('/dietprocess/dmenubyday', getmenu)
            const { succes, dataa } = result1.data
            if (succes === 1) {
              const postdata = {
                plan_slno: val.plan_slno,
                dmenu_slno: dmenu_slno,
                ip_no: val.ip_no,
                pt_no: val.pt_no,
                diet_slno: val.diet_slno,
                bd_code: val.bd_code,
                process_date:
                  dayselect === 0
                    ? format(new Date(), 'yyyy-MM-dd hh-mm-ss')
                    : format(new Date(startdate), 'yyyy-MM-dd hh-mm-ss'),
                process_status: 1,
                discharge_status: val.discharge === 'N' ? 1 : 0,
                em_id: id
              }

              insertProcess(postdata).then(value => {
                const { success, insetid } = value
                if (success === 1) {
                  const postdetaildata =
                    dataa &&
                    dataa.map(val => {
                      return {
                        proc_slno: insetid,
                        type_slno: val.type_slno,
                        rate_hos: val.hosp_rate,
                        rate_cant: val.cant_rate
                      }
                    })
                  detail(postdetaildata)
                } else {
                  setMsg(2)
                }
              })
            } else {
              setMsg(2)
            }
          } else {
            setMsg(2)
          }
        }
        getdmenu(val.plan_slno)
        return 0
      })
  }
  const cleardata = useCallback(() => {
    newStartDate(new Date())
    setdiet(0)
    setNurse(0)
    setDepand(1)
  }, [newStartDate, setDepand])
  useEffect(() => {
    if (msgshow === 1) {
      succesNotify('Process Completed')
    } else if (msgshow === 2) {
      warningNotify('Process Not Completed')
    }
  }, [msgshow])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Fragment>
      {mdopen !== 0 ? (
        <DietProcessModel
          open={open}
          handleClose={handleClose}
          detail={detail}
          setCount={setCount}
          count={count}
          setOpen={setOpen}
          startdate={startdate}
          dayselect={dayselect}
          setSearch={setSearch}
        />
      ) : null}
      <Box sx={{ width: '100%' }}>
        {depand === 1 ? (
          <Box
            sx={{
              width: '100%',
              pl: 1,
              pt: 0.5,
              pr: 1,
              pb: 0.5,
              display: 'flex',
              flexDirection: {
                xl: 'column',
                lg: 'column',
                md: 'column',
                sm: 'column',
                xs: 'column'
              }
            }}
          >
            <Box
              sx={{
                pl: 1,
                pt: 0.5,
                pb: 0.5,
                display: 'flex',
                flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  pt: 0.5,
                  pr: 1
                }}
              >
                <TextFieldCustom
                  placeholder="Select Date"
                  type="date"
                  size="sm"
                  min={new Date()}
                  name="startdate"
                  value={startdate}
                  onchange={updatedate}
                />
              </Box>
              <Box
                sx={{
                  pt: 1,
                  pr: 1,
                  width: '20%'
                }}
              >
                <NursingStationMeliSelect value={nurse} setValue={setNurse} />
              </Box>
              <Box
                sx={{
                  pt: 1,
                  pr: 1,
                  width: '15%'
                }}
              >
                <SelectDiet value={diet} setValue={setdiet} />
              </Box>

              <Box
                sx={{
                  pt: 0.5,
                  pr: 2
                }}
              >
                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={search}>
                  <SearchOutlinedIcon fontSize="small" />
                </CusIconButton>
              </Box>
              <Box
                sx={{
                  pr: 1,
                  pt: 0.5,
                  widh: '25%'
                }}
              >
                <Button onClick={cleardata} variant="contained" size="small" color="primary">
                  Clear
                </Button>
              </Box>
              <Box
                sx={{
                  pr: 1,
                  pt: 0.5
                }}
              >
                <Button onClick={allProcess} variant="contained" size="small" color="primary">
                  All Process
                </Button>
              </Box>
            </Box>
            <CusAgGridForMain columnDefs={column} tableData={tabledata} />
          </Box>
        ) : null}
        {depand === 0 ? <CusAgGridForMain columnDefs={columnprocess} tableData={tabledata} /> : null}
        {depand === 2 ? (
          <Box
            sx={{
              width: '100%',
              pl: 1,
              pt: 0.5,
              pr: 1,
              pb: 0.5,
              display: 'flex',
              flexDirection: {
                xl: 'column',
                lg: 'column',
                md: 'column',
                sm: 'column',
                xs: 'column'
              }
            }}
          >
            <Box
              sx={{
                pl: 1,
                pt: 0.5,
                pb: 0.5,
                display: 'flex',
                flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  pt: 0.5,
                  pr: 1
                }}
              >
                <TextFieldCustom
                  placeholder="Select Date"
                  type="date"
                  size="sm"
                  min={new Date()}
                  name="startdate"
                  value={startdate}
                  onchange={updatedate}
                />
              </Box>
              <Box
                sx={{
                  pt: 1,
                  pr: 1,
                  width: '20%'
                }}
              >
                <NursingStationMeliSelect value={nurse} setValue={setNurse} />
              </Box>
              <Box
                sx={{
                  pt: 1,
                  pr: 1,
                  width: '20%'
                }}
              >
                <SelectDiet value={diet} setValue={setdiet} />
              </Box>

              <Box
                sx={{
                  pt: 0.5,
                  pr: 2
                }}
              >
                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={search}>
                  <SearchOutlinedIcon fontSize="small" />
                </CusIconButton>
              </Box>
              <Box
                sx={{
                  pr: 1,
                  pt: 0.5,
                  widh: '25%'
                }}
              >
                <Button onClick={cleardata} variant="contained" size="small" color="primary">
                  Clear
                </Button>
              </Box>
              <Box
                sx={{
                  pr: 1,
                  pt: 0.5
                }}
              >
                <Button onClick={allProcess} variant="contained" size="small" color="primary">
                  All Process
                </Button>
              </Box>
            </Box>
            <CusAgGridForMain columnDefs={column} tableData={tabledata} />
          </Box>
        ) : null}
      </Box>
    </Fragment>
  )
}

export default memo(DietprocessTable)
