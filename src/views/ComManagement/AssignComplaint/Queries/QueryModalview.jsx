import {
  Avatar,
  Box,
  Button,
  CssVarsProvider,
  DialogActions,
  Modal,
  ModalDialog,
  Typography,
} from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import { format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import PersonIcon from '@mui/icons-material/Person'

const QueryModalview = ({ open, setqueryOpen, setqueryflag, valuee, count }) => {
  const {
    complaint_slno,
    complaint_desc,
    compalint_date,
    rm_roomtype_name,
    rm_room_name,
    rm_insidebuildblock_name,
    rm_floor_name,
    location,
    complaint_type_name,
  } = valuee

  const [qrData, setqrData] = useState([])

  const getquery = useMemo(() => {
    return {
      complaint_slno: complaint_slno,
    }
  }, [complaint_slno])

  useEffect(() => {
    const getallQueries = async () => {
      const result = await axioslogin.post('/complaintassign/getQuery', getquery)
      const { success, data } = result.data
      if (success === 2) {
        setqrData(data)
      } else {
        setqrData([])
      }
    }
    getallQueries()
  }, [getquery, count])

  const QueryClose = useCallback(() => {
    setqueryflag(0)
    setqueryOpen(false)
  }, [setqueryOpen, setqueryflag])

  const capitalizeWords = str => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  const formatDate = dateStr => {
    const date = new Date(dateStr)
    return format(date, 'MMM d, yyyy  hh:mm a')
  }

  return (
    <Box>
      <CssVarsProvider>
        <Modal open={open}>
          <ModalDialog
            sx={{
              width: '45vw',

              p: 0,
              overflow: 'auto',
            }}
          >
            <Box>
              <Box sx={{ flex: 1, display: 'flex', mt: 1, p: 1 }}>
                <Box sx={{ flex: 1, color: 'grey' }}>Queries</Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <CancelIcon sx={{ color: 'darkred', cursor: 'pointer' }} onClick={QueryClose} />
                </Box>
              </Box>

              <Box sx={{ flex: 1, display: 'flex', bgcolor: '#ECEDEF', py: 0.5 }}>
                <Box sx={{ flex: 1, pl: 0.5 }}>
                  <Typography sx={{ pl: 0.5, fontWeight: 600, color: 'Black' }}>
                    Ticket No.{complaint_slno}
                  </Typography>
                  <Typography sx={{ pl: 0.5, fontSize: 14, color: 'Black' }}>
                    {complaint_desc}
                  </Typography>
                  <Typography sx={{ pl: 0.5, fontSize: 13, color: 'Black', py: 0.5 }}>
                    Complaint Type: {complaint_type_name}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: 'right', pr: 1.5 }}>
                  <Typography sx={{ pl: 0.5, fontSize: 13, color: 'Black' }}>{location}</Typography>
                  {rm_room_name !== null ? (
                    <Typography sx={{ pl: 0.5, fontSize: 13, color: 'Black' }}>
                      {rm_room_name}
                      {rm_roomtype_name || rm_insidebuildblock_name || rm_floor_name
                        ? ` (${rm_roomtype_name ? rm_roomtype_name : ''}${
                            rm_roomtype_name && rm_insidebuildblock_name ? ' - ' : ''
                          }${rm_insidebuildblock_name ? rm_insidebuildblock_name : ''}${
                            rm_insidebuildblock_name && rm_floor_name ? ' - ' : ''
                          }${rm_floor_name ? rm_floor_name : ''})`
                        : 'Not Updated'}
                    </Typography>
                  ) : null}
                  <Typography sx={{ pl: 0.5, fontSize: 13, color: 'Black' }}>
                    {compalint_date}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, px: 3 }}>
                {qrData?.map(val => (
                  <React.Fragment key={val.cm_query_details_slno}>
                    {val.cm_query_reply !== null && (
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2 }}>
                        <Avatar
                          size="sm"
                          sx={{ border: 1, borderColor: 'lightgrey', bgcolor: 'white', mt: 0.5 }}
                        >
                          <PersonIcon sx={{ p: 0.1, color: '#3B281C' }} />
                        </Avatar>
                        <Box sx={{ ml: 0.5, mr: 10, minWidth: 200 }}>
                          <Box
                            sx={{
                              border: 1,
                              borderColor: '#3B281C',
                              bgcolor: '#FFFFFF',
                              px: 1,
                              py: 0.5,
                              borderRadius: 15,
                            }}
                          >
                            {val.cm_query_reply}
                          </Box>
                          <Box sx={{ display: 'flex', fontSize: 11, mt: 0.5 }}>
                            <Box sx={{ pl: 0.3, flex: 1 }}>{capitalizeWords(val.reply_user)}</Box>
                            <Box sx={{ pr: 0.5 }}>{formatDate(val.cm_query_reply_date)}</Box>
                          </Box>
                        </Box>
                      </Box>
                    )}
                    {val.cm_query_remark !== null && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          mt: 2,
                          justifyContent: 'flex-end',
                        }}
                      >
                        <Box sx={{ mr: 0.5, textAlign: 'right', ml: 10, minWidth: 200 }}>
                          <Box
                            sx={{
                              border: 1,
                              borderColor: '#466E73',
                              bgcolor: '#FFFFFF',
                              px: 1,
                              py: 0.5,
                              borderRadius: 15,
                            }}
                          >
                            {val.cm_query_remark}
                          </Box>
                          <Box sx={{ display: 'flex', fontSize: 11, mt: 0.5 }}>
                            <Box sx={{ pl: 1 }}>{formatDate(val.cm_query_remark_date)}</Box>
                            <Box sx={{ flex: 1, pr: 0.5 }}>{capitalizeWords(val.query_user)}</Box>
                          </Box>
                        </Box>
                        <Avatar
                          size="sm"
                          sx={{ border: 1, borderColor: 'lightgrey', bgcolor: 'white', mt: 0.5 }}
                        >
                          <PersonIcon sx={{ p: 0.1, color: '#466E73' }} />
                        </Avatar>
                      </Box>
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Box>
            <DialogActions>
              <Box sx={{ textAlign: 'right', pb: 2, mr: 1 }}>
                <Button
                  variant="plain"
                  sx={{ color: '#92443A', fontSize: 16 }}
                  onClick={QueryClose}
                >
                  close
                </Button>
              </Box>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(QueryModalview)
