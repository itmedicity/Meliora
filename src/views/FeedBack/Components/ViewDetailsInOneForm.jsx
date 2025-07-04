import { Box, Checkbox, CssVarsProvider, Input, Select, Table, Textarea, Typography } from '@mui/joy'
import { Grid, Paper } from '@mui/material'
import moment from 'moment'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComplainttype } from 'src/redux/actions/ComplaintType.action'
import { getDeptsection } from 'src/redux/actions/DeptSection.action'

const ViewDetailsInOneForm = ({ ptDetails, nsName }) => {
  const dispatch = useDispatch()
  const [declare, setDeclare] = useState(true)
  const { ptid, ptname, bed, doctor, room, complnt, incident } = ptDetails
  const capitalizeWords = str =>
    str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  const roomChecklist = [
    { id: 1, amenity: 'FAN & REMOTE', in: true, out: false },
    { id: 2, amenity: 'AC', in: false, out: false },
    { id: 3, amenity: 'AC REMOTE', in: false, out: false },
    { id: 4, amenity: 'TV', in: true, out: false },
    { id: 5, amenity: 'TV REMOTE', in: true, out: false },
    { id: 6, amenity: 'SET-TOP BOX', in: true, out: false },
    { id: 7, amenity: 'SET-TOP BOX REMOTE', in: true, out: false },
    { id: 8, amenity: 'OVEN', in: false, out: false },
    { id: 9, amenity: 'GEYSER', in: false, out: false },
    { id: 10, amenity: 'ELECTRIC KETTLE', in: true, out: false }
  ]
  const [nameSignList, setnameSignList] = useState({
    bystandNameIn: '',
    bystandNameOut: '',
    staffNameIn: '',
    staffNameOut: '',
    bystandSignIn: '',
    bystandSignOut: '',
    staffSignIn: '',
    staffSignOut: ''
  })
  const {
    bystandNameIn,
    bystandNameOut,
    staffNameIn,
    staffNameOut,
    bystandSignIn,
    bystandSignOut,
    staffSignIn,
    staffSignOut
  } = nameSignList
  const departments = [
    { id: 1, dpt: 'BIOMEDICAL' },
    { id: 2, dpt: 'MAINTENANCE' },
    { id: 3, dpt: 'IT' },
    { id: 4, dpt: 'HOUSEKEEPING' },
    { id: 5, dpt: 'OPERATIONS' }
  ]

  const [complaintView, setComplaintView] = useState({
    selectedDepartment: '',
    typeNo: '',
    description: '',
    checkHic: false,
    priority: false
  })
  const { selectedDepartment, typeNo, description, checkHic, priority } = complaintView

  useEffect(() => {
    dispatch(getComplainttype(selectedDepartment))
    dispatch(getDeptsection())
    const formdata = {
      selectedDepartment: 2,
      typeNo: 5,
      description: 'tap complaint',
      checkHic: false,
      priority: false
    }
    setComplaintView(formdata)
    const namedata = {
      bystandNameIn: 'Anu',
      bystandNameOut: '',
      staffNameIn: 'Ajmi',
      staffNameOut: '',
      bystandSignIn: '',
      bystandSignOut: '',
      staffSignIn: '',
      staffSignOut: ''
    }
    setnameSignList(namedata)
  }, [dispatch, selectedDepartment])
  const compTypeList = useSelector(state => state.getComplainttype.complainttypeList || [])
  const inputStyle = {
    '--Input-radius': '0px',
    borderColor: 'neutral.outlinedBorder',
    '&:hover': {
      borderColor: 'white'
    },
    '&::before': {
      transform: 'scaleX(0)',
      left: 0,
      right: 0,
      bottom: '-2px',
      top: 'unset',
      transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
      borderRadius: 0
    },
    '&:focus-within::before': {
      transform: 'scaleX(1)'
    }
  }
  return (
    <Fragment>
      <Box sx={{ maxHeight: window.innerHeight - 270, overflow: 'auto' }}>
        <Box sx={{ p: 0.5 }}>
          {room === 1 ? (
            <Box sx={{ borderRadius: 5, m: 0.5 }}>
              <Typography sx={{ fontSize: 17, pl: 2, py: 0.5, fontWeight: 550 }}>Room Checklist</Typography>
              <Box variant="outlined" sx={{ '&::-webkit-scrollbar': { height: 8 }, my: 0.5 }}>
                <CssVarsProvider>
                  <Table aria-label="table with sticky header" borderAxis="both" padding="none" stickyHeader size="sm">
                    <thead style={{ alignItems: 'center' }}>
                      <tr style={{ height: 0.5 }}>
                        <th
                          size="sm"
                          style={{
                            width: 100,
                            fontSize: 14,
                            textAlign: 'center',
                            backgroundColor: '#eceff1'
                          }}
                        >
                          {' '}
                          PATIENT NAME{' '}
                        </th>
                        <th size="sm" style={{ width: 150, fontSize: 14 }}>
                          &nbsp;&nbsp;{capitalizeWords(ptname)}
                        </th>
                        <th
                          size="sm"
                          style={{
                            width: 100,
                            fontSize: 14,
                            textAlign: 'center',
                            backgroundColor: '#eceff1'
                          }}
                        >
                          MRD NO.
                        </th>
                        <th size="sm" style={{ width: 150, fontSize: 14 }}>
                          &nbsp;&nbsp; {ptid}
                        </th>
                      </tr>
                      <tr style={{ height: 0.5 }}>
                        <th
                          size="sm"
                          style={{
                            width: 100,
                            fontSize: 14,
                            textAlign: 'center',
                            backgroundColor: '#eceff1'
                          }}
                        >
                          ROOM NO.{' '}
                        </th>
                        <th size="sm" style={{ width: 50, fontSize: 14 }}>
                          &nbsp;&nbsp;{bed}
                        </th>
                        <th
                          size="sm"
                          style={{
                            width: 50,
                            fontSize: 14,
                            textAlign: 'center',
                            backgroundColor: '#eceff1'
                          }}
                        >
                          DOCTOR NAME
                        </th>
                        <th size="sm" style={{ width: 100, fontSize: 14 }}>
                          &nbsp;&nbsp;{'Dr. ' + capitalizeWords(doctor)}
                        </th>
                      </tr>
                    </thead>
                  </Table>
                </CssVarsProvider>
              </Box>
              <Box variant="outlined" sx={{ overflow: 'auto', '&::-webkit-scrollbar': { height: 8 }, my: 0.5 }}>
                <CssVarsProvider>
                  <Table aria-label="table with sticky header" borderAxis="both" padding="none" stickyHeader size="sm">
                    <thead style={{ alignItems: 'center' }}>
                      <tr style={{ height: 0.5 }}>
                        <th size="sm" style={{ width: 100, fontSize: 14, textAlign: 'center' }}>
                          AMENITY
                        </th>
                        <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center' }}>
                          IN
                        </th>
                        <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center' }}>
                          OUT
                        </th>
                      </tr>
                    </thead>
                    <tbody size="small">
                      {roomChecklist.map(val => (
                        <tr key={val.id} size="small" style={{ cursor: 'pointer' }}>
                          <td size="sm" style={{ fontSize: 12, height: 5, textAlign: 'center' }}>
                            {val.amenity}
                          </td>
                          <td size="sm" style={{ fontSize: 12, height: 5, textAlign: 'center' }}>
                            <Checkbox checked={val.in} color="neutral" readOnly />
                          </td>
                          <td size="sm" style={{ fontSize: 12, height: 5, textAlign: 'center' }}>
                            <Checkbox checked={val.out} color="neutral" readOnly />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CssVarsProvider>
              </Box>
              <Box sx={{ display: 'flex', pt: 1 }}>
                <Box sx={{ pl: 1, pt: 0.3 }}>
                  <Checkbox checked={declare} readOnly color="neutral" onChange={e => setDeclare(e.target.checked)} />
                </Box>
                <Box sx={{ pl: 1 }}>
                  I hereby state that I have received all the information with regards the amenities of the room which I
                  occupied and are on working Condition during check-in and check-out time.
                </Box>
              </Box>
              <Box variant="outlined" sx={{ overflow: 'auto', '&::-webkit-scrollbar': { height: 8 }, my: 0.5 }}>
                <CssVarsProvider>
                  <Table aria-label="table with sticky header" borderAxis="both" padding="none" stickyHeader size="sm">
                    <thead style={{ alignItems: 'center' }}>
                      <tr style={{ height: 0.5 }}>
                        <th
                          size="sm"
                          style={{
                            width: 100,
                            fontSize: 14,
                            textAlign: 'center',
                            backgroundColor: '#eceff1'
                          }}
                        >
                          NAME{' '}
                        </th>
                        <th
                          size="sm"
                          style={{
                            width: 50,
                            fontSize: 14,
                            textAlign: 'center',
                            backgroundColor: '#eceff1'
                          }}
                        >
                          IN
                        </th>
                        <th
                          size="sm"
                          style={{
                            width: 50,
                            fontSize: 14,
                            textAlign: 'center',
                            backgroundColor: '#eceff1'
                          }}
                        >
                          OUT
                        </th>
                        <th
                          size="sm"
                          style={{
                            width: 100,
                            fontSize: 14,
                            textAlign: 'center',
                            backgroundColor: '#eceff1'
                          }}
                        >
                          SIGNATURE{' '}
                        </th>
                        <th
                          size="sm"
                          style={{
                            width: 50,
                            fontSize: 14,
                            textAlign: 'center',
                            backgroundColor: '#eceff1'
                          }}
                        >
                          IN
                        </th>
                        <th
                          size="sm"
                          style={{
                            width: 50,
                            fontSize: 14,
                            textAlign: 'center',
                            backgroundColor: '#eceff1'
                          }}
                        >
                          OUT
                        </th>
                      </tr>
                      <tr style={{ height: 0.5 }}>
                        <th size="sm" style={{ width: 100, fontSize: 14, textAlign: 'center' }}>
                          BYSTANDER{' '}
                        </th>
                        <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center' }}>
                          <Input variant="plain" name="bystandNameIn" value={bystandNameIn} sx={inputStyle} />
                        </th>
                        <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center' }}>
                          <Input variant="plain" name="bystandNameOut" value={bystandNameOut} sx={inputStyle} />
                        </th>
                        <th size="sm" style={{ width: 100, fontSize: 14, textAlign: 'center' }}>
                          BYSTANDER{' '}
                        </th>
                        <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center' }}>
                          <Input variant="plain" name="bystandSignIn" value={bystandSignIn} sx={inputStyle} />
                        </th>
                        <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center' }}>
                          <Input variant="plain" name="bystandSignOut" value={bystandSignOut} sx={inputStyle} />
                        </th>
                      </tr>
                      <tr style={{ height: 0.5 }}>
                        <th size="sm" style={{ width: 100, fontSize: 14, textAlign: 'center' }}>
                          STAFF{' '}
                        </th>
                        <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center' }}>
                          <Input variant="plain" name="staffNameIn" value={staffNameIn} sx={inputStyle} />
                        </th>
                        <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center' }}>
                          <Input variant="plain" name="staffNameOut" value={staffNameOut} sx={inputStyle} />
                        </th>
                        <th size="sm" style={{ width: 100, fontSize: 14, textAlign: 'center' }}>
                          STAFF{' '}
                        </th>
                        <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center' }}>
                          <Input variant="plain" name="staffSignIn" value={staffSignIn} sx={inputStyle} />
                        </th>
                        <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center' }}>
                          <Input variant="plain" name="staffSignOut" value={staffSignOut} sx={inputStyle} />
                        </th>
                      </tr>
                    </thead>
                  </Table>
                </CssVarsProvider>
              </Box>
            </Box>
          ) : null}
          {complnt === 1 ? (
            <>
              <Box sx={{ borderRadius: 5 }}>
                <Typography sx={{ fontSize: 17, pl: 2, py: 0.5, fontWeight: 550 }}>Complaint Registered</Typography>
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
                            readOnly
                            sx={{ pr: 2 }}
                            name={val.dpt}
                            checked={selectedDepartment === val.id}
                          />
                          <label>{val.dpt}</label>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Paper>
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
                            readOnly
                            sx={{ pr: 1 }}
                            name={val.complaint_type_name}
                            checked={typeNo === val.complaint_type_slno}
                          />
                          <label>{val.complaint_type_name}</label>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Paper>
              <Paper variant="outlined" square sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, m: 1 }}>
                  <Grid item xs={2} sm={4} md={4} lg={2} xl={3}>
                    <Select placeholder={nsName} />
                  </Grid>
                </Box>
                <Box sx={{ flex: 1, m: 1, pl: 2 }}>
                  <Grid item xs={2} sm={4} md={4} lg={2} xl={3}>
                    <Checkbox
                      sx={{ pt: 0.4 }}
                      variant="outlined"
                      color="danger"
                      readOnly
                      checked={checkHic}
                      size="lg"
                      label="Infection Control Risk Assessment (ICRA) Recommended"
                    />
                  </Grid>
                </Box>
              </Paper>
              <Paper variant="outlined" square sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, display: 'flex', flexWrap: 'wrap' }}>
                  <Box sx={{ m: 1, flex: 1.5 }}>
                    <Grid item xs={2} sm={4} md={4} lg={2} xl={3}>
                      <Textarea
                        readOnly
                        minRows={4}
                        maxRows={4}
                        type="text"
                        size="sm"
                        name={description}
                        value={description}
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
                        readOnly
                        size="lg"
                        label="Priority"
                      />
                    </Grid>
                  </Box>
                </Box>
              </Paper>
            </>
          ) : null}
          {incident === 1 ? (
            <Box sx={{ flexWrap: 'wrap' }}>
              <Box sx={{ borderRadius: 5 }}>
                <Typography sx={{ fontSize: 17, pl: 2, py: 0.5, fontWeight: 550 }}> Incident Report Form</Typography>
              </Box>
              <Paper variant="outlined" square sx={{ display: 'flex', flexWrap: 'wrap', pb: 1 }}>
                <Box sx={{ flex: 1, pl: 1, '@media screen and (max-width: 768px)': { pr: 1 } }}>
                  <Grid item xs={2} sm={4} md={4} lg={2} xl={3}>
                    <Box sx={{ py: 0.5 }}>
                      <Typography sx={{ opacity: 0.6, fontWeight: 550, fontFamily: 'system-ui' }}>
                        LOCATION OF INCIDENT
                      </Typography>
                    </Box>
                    <Select placeholder={nsName} />
                  </Grid>
                </Box>
                <Box sx={{ flex: 1, pl: 1, '@media screen and (max-width: 768px)': { pr: 1 } }}>
                  <Grid item xs={2} sm={4} md={4} lg={2} xl={3}>
                    <Box sx={{ py: 0.5 }}>
                      <Typography sx={{ opacity: 0.6, fontWeight: 550, fontFamily: 'system-ui' }}>
                        DATE & TIME OF INCIDENT
                      </Typography>
                    </Box>
                    <Input
                      disabled
                      sx={{ fontWeight: 550, fontFamily: 'system-ui' }}
                      type="datetime-local"
                      name="inicidentDate"
                      value={moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}
                    />
                  </Grid>
                </Box>
                <Box sx={{ flex: 1, px: 1 }}>
                  <Grid item xs={2} sm={4} md={4} lg={2} xl={3}>
                    <Box sx={{ py: 0.5 }}>
                      <Typography sx={{ opacity: 0.6, fontWeight: 550, fontFamily: 'system-ui' }}>
                        INCIDENT TYPE
                      </Typography>
                    </Box>
                    <Select placeholder="General" />
                  </Grid>
                </Box>
              </Paper>
              <Paper variant="outlined" square sx={{ display: 'flex', flexWrap: 'wrap', pb: 1 }}>
                <Box sx={{ flex: 1, pl: 1, pt: 0.5 }}>
                  <Box sx={{ opacity: 0.6, fontWeight: 550, fontFamily: 'system-ui' }}>INCIDENT DETAILS</Box>
                  <Box sx={{ pt: 0.5 }}>
                    <CssVarsProvider>
                      <Textarea
                        readOnly
                        minRows={3}
                        maxRows={3}
                        type="text"
                        size="sm"
                        value={'hfghgds fjdhbs fjdhs fdjshf ewjrnewkrje rfjti'}
                      />
                    </CssVarsProvider>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, px: 1, pt: 0.5 }}>
                  <Box sx={{ opacity: 0.6, fontWeight: 550, fontFamily: 'system-ui' }}>INCIDENT REASON</Box>
                  <Box sx={{ pt: 0.5 }}>
                    <CssVarsProvider>
                      <Textarea
                        readOnly
                        minRows={3}
                        maxRows={3}
                        value={'jfhdsufbeh ewruew r73hre4ui gtre9o tikjgo fkjejfrewk'}
                        type="text"
                        size="sm"
                      />
                    </CssVarsProvider>
                  </Box>
                </Box>
              </Paper>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Fragment>
  )
}
export default memo(ViewDetailsInOneForm)
