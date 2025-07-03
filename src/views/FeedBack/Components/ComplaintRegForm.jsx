import { Box, Checkbox, Textarea, Tooltip, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { Grid, Paper } from '@mui/material'
import { getComplainttype } from 'src/redux/actions/ComplaintType.action'
import { useDispatch, useSelector } from 'react-redux'
import { getDeptsection } from 'src/redux/actions/DeptSection.action'
import FeedbackDeptSectionSelect from 'src/views/CommonSelectCode/FeedbackDeptSectionSelect'
import CusIconButton from 'src/views/Components/CusIconButton'
import SaveIcon from '@mui/icons-material/Save'
import RefreshIcon from '@mui/icons-material/Refresh'
import ComplaintListTable from './ComplaintListTable'
import { format } from 'date-fns'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'

const ComplaintRegForm = ({ ptDetails }) => {
  const dispatch = useDispatch()
  const { complnt } = ptDetails
  const departments = [
    { id: 1, dpt: 'BIOMEDICAL' },
    { id: 2, dpt: 'MAINTENANCE' },
    { id: 3, dpt: 'IT' },
    { id: 4, dpt: 'HOUSEKEEPING' },
    { id: 5, dpt: 'OPERATIONS' },
  ]

  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [dptName, setdptName] = useState('')
  const [typeNo, setTypeNo] = useState(null)
  const [typeName, settypeName] = useState('')
  const [location, setLocation] = useState(0)
  const [locaName, setlocaName] = useState('')
  const [checkHic, setChechHic] = useState(false)
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(false)
  const [complaintList, setComplaintList] = useState([])
  const [edit, setedit] = useState(0)
  const [slno, setslno] = useState(0)

  useEffect(() => {
    if (complnt === 1) {
      setSelectedDepartment(2)
      setTypeNo(5)
      setDescription('tap complaint')
      if (location !== 0) {
        setLocation(5)
      }
    }
  }, [complnt, location])

  const DptCheckChange = (event, id, dname) => {
    if (event.target.checked) {
      setSelectedDepartment(id)
      setdptName(dname)
    } else {
      setSelectedDepartment(null)
    }
  }
  const ComplaintTypeChange = (event, id, tname) => {
    if (event.target.checked) {
      setTypeNo(id)
      settypeName(tname)
    } else {
      setTypeNo('')
    }
  }
  useEffect(() => {
    dispatch(getComplainttype(selectedDepartment))
    dispatch(getDeptsection())
  }, [dispatch, selectedDepartment])
  const compTypeList = useSelector(state => state.getComplainttype.complainttypeList || [])
  const RefreshDetails = useCallback(() => {
    setSelectedDepartment(null)
    setdptName('')
    setTypeNo(null)
    settypeName('')
    setLocation(0)
    setChechHic(false)
    setDescription('')
    setPriority(false)
    setedit(0)
  }, [])

  const SaveDetails = useCallback(() => {
    if (selectedDepartment === null) {
      infoNotify('select Departement')
    } else if (typeNo === null) {
      infoNotify('select Complaint Type')
    } else if (location === 0) {
      infoNotify('select Location')
    } else if (description === '') {
      infoNotify('Enter Description')
    } else if (edit === 0) {
      const formdata = {
        cmdate: format(new Date(), 'dd-MM-yyyy hh:mm:ss a'),
        dptno: selectedDepartment,
        dpt: dptName,
        typeno: typeNo,
        cmtype: typeName,
        location: location,
        locaname: locaName,
        description: description,
      }
      setComplaintList(formdata)
      const newArray = [...complaintList, formdata]
      setComplaintList(newArray)
      succesNotify('Registered')
      RefreshDetails()
    } else {
      const formdata = {
        ...complaintList[slno],
        cmdate: format(new Date(), 'dd-MM-yyyy hh:mm:ss a'),
        dptno: selectedDepartment,
        dpt: dptName,
        typeno: typeNo,
        cmtype: typeName,
        location: location,
        locaname: locaName,
        description: description,
      }
      const newArray = [...complaintList]
      newArray[slno] = formdata
      setComplaintList(newArray)
      succesNotify('Registered')
      RefreshDetails()
    }
  }, [
    dptName,
    slno,
    typeName,
    selectedDepartment,
    typeNo,
    locaName,
    description,
    RefreshDetails,
    complaintList,
    edit,
    location,
  ])

  const EditData = useCallback((val, index) => {
    setedit(1)
    const { dptno, typeno, location, description } = val
    setslno(index)
    setSelectedDepartment(dptno)
    setTypeNo(typeno)
    setLocation(location)
    setDescription(description)
  }, [])
  return (
    <Fragment>
      <Box variant="outlined" sx={{ maxHeight: window.innerHeight - 270, overflow: 'auto' }}>
        <Box sx={{ m: 1 }}>
          <Typography sx={{ fontSize: 17, fontWeight: 550 }}>Complaint Registration</Typography>
        </Box>
        <Paper variant="outlined" square>
          <Box sx={{ pl: 2, py: 1, opacity: 0.6, fontWeight: 550 }}>COMPLAINT DEPARTMENT</Box>
          <Box sx={{ display: 'flex', pb: 2, flex: 1, flexWrap: 'wrap' }}>
            <Grid container spacing={2} sx={{ pl: 5 }}>
              {departments.map(val => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={val.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                      variant="outlined"
                      color="danger"
                      sx={{ pr: 2 }}
                      name={val.dpt}
                      checked={selectedDepartment === val.id}
                      onChange={event => DptCheckChange(event, val.id, val.dpt)}
                    />
                    <label>{val.dpt}</label>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>

        {selectedDepartment && compTypeList.length > 0 && (
          <Paper variant="outlined" square>
            <Box sx={{ pl: 2, py: 1, opacity: 0.6, fontWeight: 550 }}>COMPLAINT TYPE</Box>
            <Box sx={{ display: 'flex', pb: 2, flexWrap: 'wrap' }}>
              <Grid container spacing={2} sx={{ flexWrap: 'wrap', pl: 5 }}>
                {compTypeList.map(val => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={val.complaint_type_slno}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox
                        variant="outlined"
                        color="danger"
                        sx={{ pr: 1 }}
                        name={val.complaint_type_name}
                        checked={typeNo === val.complaint_type_slno}
                        onChange={event =>
                          ComplaintTypeChange(
                            event,
                            val.complaint_type_slno,
                            val.complaint_type_name
                          )
                        }
                      />
                      <label>{val.complaint_type_name}</label>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        )}

        <Paper variant="outlined" square sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1, m: 1 }}>
            <FeedbackDeptSectionSelect
              location={location}
              setLocation={setLocation}
              setlocaName={setlocaName}
            />
          </Box>
          <Box sx={{ flex: 1, display: 'flex' }}>
            <Box sx={{ m: 1, pl: 2 }}>
              <Grid item xs={2} sm={4} md={4} lg={2} xl={3}>
                <Checkbox
                  sx={{ pt: 0.4 }}
                  variant="outlined"
                  color="danger"
                  checked={checkHic}
                  size="lg"
                  onChange={e => setChechHic(e.target.checked)}
                  label="Infection Control Risk Assessment (ICRA) Recommended"
                />
              </Grid>
            </Box>
          </Box>
        </Paper>
        <Paper variant="outlined" square sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1, display: 'flex' }}>
            <Box sx={{ m: 1, flex: 1.5 }}>
              <Grid item xs={2} sm={4} md={4} lg={2} xl={3}>
                <Textarea
                  minRows={4}
                  maxRows={4}
                  placeholder="complaint description..."
                  type="text"
                  size="sm"
                  name={description}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </Grid>
            </Box>
            <Box sx={{ m: 1, flex: 0.5 }}>
              <Grid item xs={2} sm={4} md={4} lg={2} xl={3}>
                <Checkbox
                  sx={{ pt: 0.4 }}
                  variant="outlined"
                  color="danger"
                  checked={priority}
                  size="lg"
                  onChange={e => setPriority(e.target.checked)}
                  label="Priority"
                />
              </Grid>
            </Box>
          </Box>
        </Paper>
        <Paper>
          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
            <Box sx={{ my: 1 }}>
              <CusIconButton size="sm" variant="outlined" color="danger" clickable="true">
                <Tooltip title="Save" placement="bottom">
                  <SaveIcon fontSize="small" color="neutral" onClick={SaveDetails} />
                </Tooltip>
              </CusIconButton>
            </Box>
            <Box sx={{ my: 1, mx: 1 }}>
              <CusIconButton size="sm" variant="outlined" color="danger" clickable="true">
                <Tooltip title="Refresh" placement="bottom">
                  <RefreshIcon fontSize="small" color="neutral" onClick={RefreshDetails} />
                </Tooltip>
              </CusIconButton>
            </Box>
          </Box>
        </Paper>
        <Box>
          <ComplaintListTable complaintList={complaintList} EditData={EditData} />
        </Box>
      </Box>
    </Fragment>
  )
}

export default memo(ComplaintRegForm)
