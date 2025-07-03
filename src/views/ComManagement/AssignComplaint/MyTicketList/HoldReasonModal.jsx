import React, { memo, useCallback } from 'react'
import { Typography } from '@mui/material'
import CustomTextarea from 'src/views/Components/CustomTextarea'
import { Box, Button, CssVarsProvider, Modal, ModalDialog } from '@mui/joy'
import CancelIcon from '@mui/icons-material/Cancel'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { format } from 'date-fns'

const HoldReasonModal = ({ holdOpen, setHoldOpen, setHoldflag, holdData }) => {
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
    holduser,
    pending_onhold_time,
    rectify_pending_hold_remarks,
    cm_hold_reason,
  } = holdData

  const Close = useCallback(() => {
    setHoldOpen(false)
    setHoldflag(0)
  }, [setHoldOpen, setHoldflag])

  const buttonStyle = {
    fontSize: 16,
    color: '#523A28',
    cursor: 'pointer',
    boxShadow: 5,
    border: 'none',
    transition: 'transform 0.2s, bgcolor 0.2s',
    '&:hover': {
      bgcolor: 'white',
      color: '#523A28',
      transform: 'scale(1.1)',
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
  }
  return (
    <CssVarsProvider>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={holdOpen}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pl: 1,
          borderRadius: 10,
        }}
      >
        <ModalDialog variant="outlined" sx={{ width: '43vw', p: 0, overflow: 'auto' }}>
          <Box sx={{ flex: 1, display: 'flex', mt: 1, p: 1 }}>
            <Box sx={{ flex: 1, color: 'grey' }}>Hold Remark</Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <CancelIcon sx={{ color: 'darkred', cursor: 'pointer' }} onClick={Close} />
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

          <Box
            sx={{
              justifyContent: 'center',
              flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
              pt: 1,
              gap: 3,
              mx: 2.5,
            }}
          >
            <Typography sx={{ fontWeight: 600, pb: 0.5, color: '#50655B' }}>
              Holded Reason
            </Typography>
            <TextFieldCustom
              style={{ width: '100%' }}
              maxRows={1}
              placeholder=""
              value={cm_hold_reason === null ? '' : cm_hold_reason}
              disabled
            />
            <Typography sx={{ fontWeight: 600, pb: 0.5, mt: 1, color: '#50655B' }}>
              Holded Remarks
            </Typography>
            <CustomTextarea
              style={{ width: '100%' }}
              minRows={3}
              placeholder="Hold Remarks"
              value={rectify_pending_hold_remarks === null ? '' : rectify_pending_hold_remarks}
              disabled
            />

            <Typography sx={{ fontWeight: 600, pb: 0.5, pt: 1, color: '#50655B' }}>
              Holded by
            </Typography>
            <Typography sx={{ pr: 2, fontSize: 14, fontWeight: 400 }}>{holduser}</Typography>
            <Typography sx={{ pb: 0.3, pr: 2, fontSize: 11, fontWeight: 600 }}>
              {pending_onhold_time
                ? format(new Date(pending_onhold_time), 'dd MMM yyyy,  hh:mm a')
                : 'Invalid Date'}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right', pb: 1, mr: 1 }}>
            <Button variant="plain" sx={buttonStyle} onClick={Close}>
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </CssVarsProvider>
  )
}

export default memo(HoldReasonModal)
