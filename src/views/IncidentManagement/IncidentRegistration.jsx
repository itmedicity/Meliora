import {
  Box,
  Button,
  CssVarsProvider,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Textarea,
  Typography
} from '@mui/joy'
import { subDays } from 'date-fns'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { infoNotify, succesNotify } from '../Common/CommonCode'
import moment from 'moment'
import TextFieldCustom from '../Components/TextFieldCustom'

const IncidentRegistration = ({ nsName, open, handleClose, ptDetails }) => {
  const { incident } = ptDetails
  const [inicidentDate, setInicidentDate] = useState(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
  const [details, setDetails] = useState('')
  const [reason, setReason] = useState('')
  const [incType, setIncType] = useState(0)
  const incidentType = useMemo(() => {
    return [
      { id: 1, label: 'GENERAL' },
      { id: 2, label: 'NEAR MISSESS' },
      { id: 3, label: 'HARMFUL' },
      { id: 4, label: 'SENTINEL' }
    ]
  }, [])
  useEffect(() => {
    if (incident === 1) {
      setDetails('hfghgds fjdhbs fjdhs fdjshf ewjrnewkrje rfjti')
      setReason('ghgh hdjhewj ewejhwjehjwhjehj')
      setIncType(1)
    }
  }, [incident])
  const SaveincidetData = useCallback(() => {
    if (details === '') {
      infoNotify('Enter Incident Details')
    } else if (reason === '') {
      infoNotify('Enter Incident Reason')
    } else if (incType === null) {
      infoNotify('select Incident Type')
    } else {
      succesNotify('Data Saved')
      handleClose()
    }
  }, [handleClose, details, reason, incType])
  const ResetDetails = useCallback(() => {
    setDetails('')
    setReason('')
    setIncType(0)
    setInicidentDate(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
  }, [])

  const buttonStyle = {
    fontSize: 17,
    color: '#003B73',
    cursor: 'pointer',
    boxShadow: 5,
    border: 'none',
    transition: 'transform 0.2s, bgcolor 0.2s',
    '&:hover': {
      bgcolor: 'white',
      color: '#003B73',
      transform: 'scale(1.1)'
    },
    '&:active': {
      transform: 'scale(0.95)'
    }
  }
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
            <Box sx={{ display: 'flex', bgcolor: '#1976D2', flexWrap: 'wrap' }}>
              <Box sx={{ flex: 0.5, m: 1 }}>
                <Typography sx={{ fontWeight: 550, fontSize: 35, color: 'white', fontFamily: 'system-ui' }}>
                  Incident Report Form
                </Typography>
              </Box>
              <Box sx={{ flex: 1, m: 1, flexWrap: 'wrap' }}>
                <Box sx={{ m: 0.5 }}>
                  <Typography sx={{ fontWeight: 550, fontSize: 14, color: 'white', fontFamily: 'system-ui' }}>
                    Date & Time of Incident
                  </Typography>
                </Box>
                <Box sx={{ m: 0.5 }}>
                  <TextFieldCustom
                    slotProps={{
                      input: {
                        min: moment(subDays(new Date(), 10)).format('YYYY-MM-DD HH:mm:ss'),
                        max: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                      }
                    }}
                    sx={{
                      '@media screen and (max-width: 768px)': {
                        width: 100,
                        fontSize: 10,
                        color: 'white',
                        fontFamily: 'system-ui'
                      }
                    }}
                    type="datetime-local"
                    name="inicidentDate"
                    value={inicidentDate}
                    size="sm"
                    onChange={e => setInicidentDate(e.target.value)}
                  />
                </Box>
                <Box sx={{ m: 0.5 }}>
                  <Typography sx={{ fontWeight: 550, fontSize: 14, color: 'white', fontFamily: 'system-ui' }}>
                    Location of Incident
                  </Typography>
                </Box>
                <Box sx={{ color: 'white', fontFamily: 'system-ui', m: 0.5, fontSize: 16 }}>{nsName}</Box>
              </Box>
            </Box>

            <Box sx={{ bgcolor: 'white' }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ pl: 1, color: '#003B73', fontWeight: 550, fontFamily: 'system-ui' }}>Incident Details</Box>
                <Box sx={{ pl: 0.5, pt: 0.5 }}>
                  <CssVarsProvider>
                    <Textarea
                      minRows={3}
                      maxRows={3}
                      placeholder="type here ..."
                      type="text"
                      size="sm"
                      name={details}
                      value={details}
                      onChange={e => setDetails(e.target.value)}
                    />
                  </CssVarsProvider>
                </Box>
              </Box>
              <Box sx={{ flex: 1, pt: 0.5 }}>
                <Box sx={{ pl: 1, color: '#003B73', fontWeight: 550, fontFamily: 'system-ui' }}>Incident Reason</Box>
                <Box sx={{ pl: 0.5, pt: 0.5 }}>
                  <CssVarsProvider>
                    <Textarea
                      minRows={3}
                      maxRows={3}
                      placeholder="type here ..."
                      type="text"
                      size="sm"
                      name={reason}
                      value={reason}
                      onChange={e => setReason(e.target.value)}
                    />
                  </CssVarsProvider>
                </Box>
              </Box>
              <Box sx={{ flex: 1, pt: 0.5 }}>
                <Box sx={{ pl: 1, color: '#003B73', fontWeight: 550, fontFamily: 'system-ui' }}>Incident Type</Box>
                <Box sx={{ pl: 0.5, pt: 0.5 }}>
                  <Select
                    placeholder="select"
                    name="incType"
                    value={incType}
                    onChange={(e, newValue) => setIncType(newValue)}
                  >
                    {incidentType?.map((val, index) => (
                      <Option key={index} value={val.id}>
                        {val.label}
                      </Option>
                    ))}
                  </Select>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 1 }}>
              <Box sx={{ pt: 0.4 }}>
                <Button variant="plain" sx={buttonStyle} onClick={SaveincidetData}>
                  Save
                </Button>
              </Box>
              <Box sx={{ pr: 2, pt: 0.4 }}>
                <Button variant="plain" sx={buttonStyle} onClick={ResetDetails}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Fragment>
  )
}
export default memo(IncidentRegistration)
