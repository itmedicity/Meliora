import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import {
  CssVarsProvider,
  Modal,
  ModalClose,
  ModalDialog,
  Box,
  Typography,
  Checkbox,
  Button,
  Textarea,
  Chip
} from '@mui/joy'
import incidentImage from '../../../assets/images/IncidentReport.png'
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { format } from 'date-fns'

const ModalIncidentMarking = ({ modalData, open, handleClose, SearchReport }) => {
  const { incident_slno, incident_date, qi_dept_desc, initial_incident_type } = modalData

  const [incidentMark, setIncidentMark] = useState(true)
  const [remarks, setRemarks] = useState('')
  const [incType, setIncType] = useState(0)
  const [verifyDate, setverifyDate] = useState(new Date())
  const [incidetData, setIncidetData] = useState({
    incDetails: '',
    incReason: ''
  })
  const { incDetails, incReason } = incidetData

  const incidentType = useMemo(() => {
    return [
      { id: 1, label: 'GENERAL' },
      { id: 2, label: 'NEAR MISSESS' },
      { id: 3, label: 'HARMFUL' },
      { id: 4, label: 'SENTINEL' }
    ]
  }, [])
  const id = useSelector(state => {
    return state?.LoginUserData.empid
  })
  const ChangeRemarks = useCallback(e => {
    setRemarks(e.target.value)
  }, [])
  const ChangeIncidentMark = useCallback(e => {
    if (e.target.checked === true) {
      setIncidentMark(true)
    } else {
      setIncidentMark(false)
    }
  }, [])

  useEffect(() => {
    if (modalData.length !== 0) {
      const {
        incident_flag,
        incident_reason,
        incident_details,
        incident_mark_remarks,
        final_incident_type,
        verified_date
      } = modalData
      setIncidentMark(incident_flag === 1 ? true : false)
      const formData = {
        incReason: incident_reason,
        incDetails: incident_details
      }
      setIncidetData(formData)
      setIncType(final_incident_type)
      setRemarks(incident_mark_remarks)
      setverifyDate(verified_date === null ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : verified_date)
    }
  }, [modalData])
  const inpatchdata = useMemo(() => {
    return {
      //   if reg as incident flag 1, not report as incident 2, initially 0
      incident_flag: incidentMark === true ? 1 : 0,
      incident_mark_remarks: remarks,
      verified_user: id,
      final_incident_type: incType,
      incident_slno: incident_slno,
      verified_date: verifyDate
    }
  }, [id, incident_slno, incidentMark, remarks, incType, verifyDate])

  const Reset = useCallback(() => {
    handleClose()
    setIncidentMark(false)
    setRemarks('')
  }, [handleClose])
  const UpdateincidetData = useCallback(() => {
    if (remarks === '') {
      infoNotify('Please Enter Remarks')
    } else {
      const updateIncidentTable = async () => {
        const result = await axioslogin.patch('/incidentMaster/markIncident', inpatchdata)
        return result.data
      }
      updateIncidentTable(inpatchdata).then(value => {
        const { success, message } = value
        if (success === 1) {
          SearchReport()
          Reset()
          succesNotify(message)
        } else {
          infoNotify(message)
        }
      })
    }
  }, [inpatchdata, Reset, remarks, SearchReport])
  return (
    <Fragment>
      <CssVarsProvider>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={handleClose}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <ModalDialog
            variant="outlined"
            sx={{
              minWidth: '50vw'
              // borderRadius: 'md',
            }}
          >
            <ModalClose
              variant="outlined"
              sx={{
                top: 'calc(-1/4 * var(--IconButton-size))',
                right: 'calc(-1/4 * var(--IconButton-size))',
                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                borderRadius: '50%',
                bgcolor: 'background.body',
                color: '#bf360c',
                height: 35,
                width: 35
              }}
            />
            <Box sx={{ pt: 0.5 }}>
              <Typography sx={{ fontWeight: 550, fontSize: 18 }}>Declare an Incident </Typography>
            </Box>
            <Box sx={{ display: 'flex', overflow: 'auto', px: 1 }}>
              <Box sx={{ flex: 0.2, pt: 2 }}>
                <img src={incidentImage} alt="incident" />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ flex: 1 }}>
                    <Box>
                      <Typography sx={{ fontSize: 12, fontWeight: 550 }}>DEPARTMENT</Typography>
                    </Box>
                    <Box sx={{ pl: 0.5 }}>
                      <Typography sx={{ fontSize: 17 }}>
                        {qi_dept_desc
                          .toLowerCase()
                          .split(' ')
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ')}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box>
                      <Typography sx={{ fontSize: 12, fontWeight: 550 }}>DATE</Typography>
                    </Box>
                    <Box sx={{ pl: 0.5 }}>
                      <Typography sx={{ fontSize: 17 }}>
                        {moment(new Date(incident_date)).format('DD-MM-yyyy hh:mm:ss A')}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, pt: 1.5 }}>
                  <Box>
                    <Typography sx={{ fontSize: 12, fontWeight: 600 }}>DETAILS</Typography>
                  </Box>
                  <Box sx={{ pl: 0.5, pt: 0.5 }}>
                    <CssVarsProvider>
                      <Textarea
                        sx={{ fontSize: 14 }}
                        readOnly
                        minRows={2}
                        type="text"
                        size="sm"
                        name="incDetails"
                        value={incDetails}
                      />
                    </CssVarsProvider>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, pt: 1.5 }}>
                  <Box>
                    <Typography sx={{ fontSize: 12, fontWeight: 550 }}>REASON</Typography>
                  </Box>
                  <Box sx={{ pl: 0.5, pt: 0.5 }}>
                    <CssVarsProvider>
                      <Textarea
                        sx={{ fontSize: 14 }}
                        readOnly
                        minRows={2}
                        type="text"
                        size="sm"
                        name="incReason"
                        value={incReason}
                      />
                    </CssVarsProvider>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ flex: 1, pt: 1.5 }}>
                    <Box>
                      <Typography sx={{ fontSize: 12, fontWeight: 550 }}>INCIDENT TYPE</Typography>
                    </Box>
                    <Box sx={{ pl: 0.5, pt: 0.5 }}>
                      <select
                        // variant="outlined"
                        style={{
                          height: 35,
                          width: 250,
                          paddingLeft: 7,
                          borderRadius: 6,
                          border: '1px solid lightgrey',
                          fontSize: 13
                        }}
                        name="incType"
                        value={incType}
                        onChange={e => {
                          setIncType(e.target.value)
                        }}
                      >
                        {' '}
                        {incidentType?.map((val, ind) => {
                          return (
                            <option key={ind} value={val.id}>
                              {val.label}
                            </option>
                          )
                        })}
                      </select>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, pt: 1.5 }}>
                    <Box>
                      <Typography sx={{ fontSize: 12, fontWeight: 550 }}>REPORTED INCIDENT TYPE</Typography>
                    </Box>
                    <Box sx={{ pl: 0.5, pt: 0.5 }}>
                      <CssVarsProvider>
                        <Chip size="md" variant="outlined" sx={{ color: '#bf360c', height: 30 }}>
                          {initial_incident_type === 1
                            ? 'GENERAL'
                            : initial_incident_type === 2
                            ? 'NEAR MISSESS'
                            : initial_incident_type === 3
                            ? 'HARMFUL'
                            : initial_incident_type === 4
                            ? 'SENTINEL'
                            : 'Nil'}
                        </Chip>
                      </CssVarsProvider>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, pt: 1.5, display: 'flex' }}>
                  <Box sx={{ flex: 1 }}>
                    <Box>
                      <Typography sx={{ fontSize: 12, fontWeight: 600 }}>MARK AS INCIDENT</Typography>
                    </Box>
                    <Box sx={{ pt: 0.5, pl: 0.5 }}>
                      <CssVarsProvider>
                        <Checkbox color="primary" size="md" checked={incidentMark} onChange={ChangeIncidentMark} />
                      </CssVarsProvider>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1 }}></Box>
                </Box>
                <Box sx={{ flex: 1, pt: 0.5 }}>
                  <Box>
                    <Typography sx={{ fontSize: 12, fontWeight: 600 }}>REMARKS</Typography>
                  </Box>
                  <Box sx={{ pl: 0.5, pt: 0.5 }}>
                    <CssVarsProvider>
                      <Textarea
                        sx={{ fontSize: 14 }}
                        minRows={2}
                        placeholder="Remarks"
                        type="text"
                        size="sm"
                        name="remarks"
                        value={remarks}
                        onChange={ChangeRemarks}
                      />
                    </CssVarsProvider>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 1 }}>
              <CssVarsProvider>
                <Button
                  variant="plain"
                  onClick={UpdateincidetData}
                  style={{
                    fontSize: 17,
                    color: '#bf360c',
                    cursor: 'pointer'
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="plain"
                  onClick={Reset}
                  style={{
                    fontSize: 17,
                    color: '#bf360c',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </Button>
              </CssVarsProvider>
            </Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(ModalIncidentMarking)
