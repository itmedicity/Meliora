import { Box, Chip, Divider, Modal, ModalDialog } from '@mui/joy'
import React, { memo, useCallback } from 'react'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone'
import { Typography } from '@mui/material'
import { format } from 'date-fns'

const DueDateModal = ({
  dueDateModal,
  taskName,
  dueDates,
  setdueDateModalFlag,
  setdueDateModal,
  tm_task_due_date,
  create_date,
}) => {
  let DUeDatez = dueDates.map(item => item.tm_duedate)
  const IntialDueDate = DUeDatez[0]

  const CloseModal = useCallback(() => {
    setdueDateModalFlag(0)
    setdueDateModal(false)
  }, [setdueDateModal, setdueDateModalFlag])

  return (
    <Box>
      <Modal open={dueDateModal}>
        <ModalDialog
          sx={{
            width: '48vw',
            maxHeight: '90vh',
          }}
        >
          <Box sx={{ minHeight: 500, maxHeight: 900 }}>
            <Box
              sx={{ flex: 1, display: 'flex', borderBottom: 1, pb: 0.5, borderColor: '#E9EAE0' }}
            >
              <Box sx={{ flex: 1, color: '#BDC3CB' }}>Changed Duedates</Box>
              <Box>
                <HighlightOffTwoToneIcon
                  onClick={CloseModal}
                  sx={{
                    color: '#391306',
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'darkred',
                    },
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                border: 1,
                borderColor: '#C3CEDA',
                borderRadius: 10,
                px: 1,
                mt: 0.5,
                bgcolor: '#EAEAEA',
              }}
            >
              <Box sx={{ fontSize: 20, fontWeight: 600, display: 'flex', color: '#44110E' }}>
                <AssignmentTwoToneIcon
                  sx={{
                    color: 'white',
                    bgcolor: '#44110E',
                    borderRadius: 10,
                    mt: 0.5,
                    p: 0.3,
                    mr: 0.3,
                  }}
                />{' '}
                Task
              </Box>
              <Box sx={{ flex: 1, mt: 0.5, mx: 0.5 }}>
                <Typography sx={{ fontSize: 17, color: 'black', fontWeight: 600 }}>
                  {taskName}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, my: 1.5, ml: 0.5, display: 'flex' }}>
                <Box>
                  <Typography sx={{ fontSize: 11, color: '#212510', fontWeight: 500, pl: 1.4 }}>
                    Task Created Date
                  </Typography>
                  <Chip sx={{ color: '#44110E', bgcolor: 'white', border: 1 }}>{create_date}</Chip>
                </Box>
                <Box sx={{ ml: 0.5 }}>
                  <Typography sx={{ fontSize: 11, color: '#212510', fontWeight: 500, pl: 1.5 }}>
                    Initial Duedate
                  </Typography>
                  <Chip sx={{ color: '#44110E', bgcolor: 'white', border: 1 }}>
                    {IntialDueDate}
                  </Chip>
                </Box>
                <Box sx={{ ml: 0.5 }}>
                  <Typography sx={{ fontSize: 11, color: '#212510', fontWeight: 500, pl: 1.4 }}>
                    Current Duedate
                  </Typography>
                  <Chip sx={{ color: '#44110E', bgcolor: 'white', border: 1 }}>
                    {/* {format(new Date(tm_task_due_date), "dd-MM-yyyy HH:mm:ss")} */}
                    {tm_task_due_date}
                  </Chip>
                </Box>
              </Box>
            </Box>
            <Divider
              sx={{
                '--Divider-childPosition': `5%`,
                fontWeight: 600,
                fontSize: 18,
                color: '#391306',
                mb: 1,
                mt: 2,
                mx: 1,
              }}
            >
              Changed Duedates
            </Divider>
            <Box sx={{ flex: 1, height: 25, bgcolor: '#92443A', mb: 0.5, mx: 1, display: 'flex' }}>
              <Box sx={{ width: 30, pl: 1.7, fontWeight: 600, color: 'white' }}>#</Box>
              <Box sx={{ flex: 3, textAlign: 'center', mb: 0.5, fontWeight: 600, color: 'white' }}>
                Duedate
              </Box>
              <Box sx={{ flex: 4, textAlign: 'center', fontWeight: 600, color: 'white' }}>
                Duedate Edited by
              </Box>
            </Box>
            <Box sx={{ maxHeight: '38vh', overflow: 'auto' }}>
              {dueDates?.map((val, index) => {
                let Employee = val.em_name
                  .toLowerCase()
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')
                return (
                  <Box
                    key={val.tm_log_slno}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      minHeight: 30,
                      mb: 1,
                      mx: 1.5,
                      borderBottom: 1,
                      borderColor: '#BDC3CB',
                      borderRadius: 0,
                    }}
                  >
                    <Box sx={{ width: 30, pl: 1 }}>{index + 1}</Box>
                    <Box sx={{ flex: 3, textAlign: 'center', mb: 0.5 }}>
                      <Chip sx={{ bgcolor: '#EAEAEA', px: 1.5, color: 'darkred', fontWeight: 500 }}>
                        {/* {val.tm_duedate} */}
                        {format(new Date(val.tm_duedate), 'dd-MM-yyyy HH:mm:ss')}
                      </Chip>
                    </Box>
                    <Box
                      sx={{
                        flex: 4,
                        textAlign: 'center',
                        cursor: 'grab',
                        textTransform: 'capitalize',
                      }}
                    >
                      {Employee}
                    </Box>
                  </Box>
                )
              })}
            </Box>
            <Box sx={{ height: 10 }}></Box>
          </Box>
        </ModalDialog>
      </Modal>
    </Box>
  )
}

export default memo(DueDateModal)
