import React, { memo, useCallback, useState } from 'react'
import { Box, Button, CssVarsProvider, Modal, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy'
import { useQueryClient } from 'react-query'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { format } from 'date-fns'

const ReturnModal = ({ returnData, handleClose, open, empId }) => {
  const queryClient = useQueryClient()

  const { req_slno, po_detail_slno, po_itm_slno, item_name } = returnData

  const [returnRemarks, setReturnRemarks] = useState('')
  const returnSave = useCallback(() => {
    const postdata = {
      req_slno: req_slno,
      po_detail_slno: po_detail_slno,
      po_itm_slno: po_itm_slno,
      return_remarks: returnRemarks,
      item_return_user: empId,
      return_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    }
    const insertDetails = async postdata => {
      try {
        const result = await axioslogin.post('/newCRFRegister/returnDetails', postdata)
        const { success, message } = result.data
        if (success === 1) {
          succesNotify(message)
          queryClient.invalidateQueries('getCrfItemDetails')
          handleClose()
        } else {
          warningNotify(message)
          handleClose()
        }
      } catch (error) {
        warningNotify('An error occurred while updating the status. Please try again.', error)
      }
    }
    insertDetails(postdata)
  }, [returnRemarks, empId, req_slno, po_detail_slno, po_itm_slno, queryClient, handleClose])
  const buttonStyle = {
    m: 1,
    width: 80,
    fontSize: 13,
    height: '30px',
    minHeight: '30px',
    lineHeight: '1.2',
    color: '#0d47a1',
    bgcolor: 'white',
    border: '1px solid #bbdefb',
    '&:hover': {
      color: '#1e88e5',
      bgcolor: 'white'
    },
    borderRadius: 5
  }
  return (
    <Box>
      <CssVarsProvider>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={handleClose}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <ModalDialog variant="outlined">
            <ModalClose
              variant="outlined"
              sx={{
                top: 'calc(-1/4 * var(--IconButton-size))',
                right: 'calc(-1/4 * var(--IconButton-size))',
                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                borderRadius: '50%',
                bgcolor: 'background.body',
                color: '#bf360c',
                height: 25,
                width: 25
              }}
            />
            <Box
              sx={{
                width: '30vw',
                minHeight: 150,
                overflow: 'auto'
              }}
            >
              <Typography level="body-sm" sx={{ color: '#0074B7', fontWeight: 650 }}>
                {item_name}
              </Typography>
              <Box sx={{ display: 'flex', pt: 1 }}>
                <Typography level="body-sm" sx={{ fontWeight: 550, pt: 1.8 }}>
                  Remarks
                </Typography>
                <Typography sx={{ pl: 1, pt: 1.5 }}> :&nbsp;</Typography>
                <Box sx={{ flex: 1, pl: 0.5 }}>
                  <Textarea
                    required
                    placeholder="Return Remarks"
                    type="text"
                    size="md"
                    minRows={2}
                    maxRows={3}
                    value={returnRemarks}
                    onChange={e => setReturnRemarks(e.target.value)}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                <Button variant="outlined" sx={buttonStyle} onClick={returnSave}>
                  Submit
                </Button>
              </Box>
            </Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(ReturnModal)
