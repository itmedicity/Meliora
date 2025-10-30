import { Button, CssVarsProvider, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import React, { Fragment, memo, useCallback, useState } from 'react'
import CustomInputDateCmp from '../../ComonComponent/Components/CustomInputDateCmp'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { useQueryClient } from '@tanstack/react-query'

const ItemSaveModal = ({ open, handleClose, tableData, reset, supCode }) => {
  const [checkingUser, setCheckingUser] = useState('')
  const queryClient = useQueryClient()
  const id = useSelector(state => state.LoginUserData.empid, _.isEqual)
  const userChange = useCallback(e => {
    setCheckingUser(e.target.value)
  }, [])
  const SaveDetails = useCallback(() => {
    if (checkingUser === '') {
      infoNotify('Enter User Details')
      return
    }
    const newData = tableData?.filter(val => val.damage === true && val.damage_qty === 0)
    if (newData.length !== 0) {
      infoNotify('Enter Damage Qty')
      return
    }
    const insertItemChecking = async inserItems => {
      const result = await axioslogin.post('/deliveryMarking/insertCheckItems', inserItems)
      return result.data
    }
    const inserItems = tableData?.map(val => {
      let pending_status
      if (val.delivered_qty === 0) {
        // notdelivered
        pending_status = null
      } else if (val.delivered_qty < val.pending_qty) {
        // partially
        pending_status = 1
      } else if (val.delivered_qty >= val.pending_qty) {
        // fully
        pending_status = 0
      }
      return {
        marking_po_slno: val.marking_po_slno,
        supplier_code: supCode,
        item_code: val.item_code,
        item_name: val.item_name,
        pending_qty: val.pending_qty,
        create_user: id,
        delivered_qty: val.delivered_qty,
        excess_qty: val.delivered_qty > val.pending_qty ? val.delivered_qty - val.pending_qty : 0,
        pending_status: pending_status,
        damage_qty: val.damage === true ? val.damage_qty : 0,
        remarks: val.damage === true ? val.remarks : '',
        balance_qty: val.delivered_qty <= val.pending_qty ? val.pending_qty - val.delivered_qty : 0,
        checking_user: checkingUser,
        requested_qty: val.requested_qty,
        item_slno: val.item_slno
      }
    })
    insertItemChecking(inserItems)
      .then(val => {
        const { success, message } = val
        if (success === 1) {
          succesNotify(message)
          reset()
          handleClose()
          queryClient.invalidateQueries('itemChecking')
        } else {
          warningNotify(message)
        }
      })
      .catch(error => {
        warningNotify('Error in Saving Item Checking Details', error)
      })
  }, [checkingUser, tableData, id, reset, supCode, handleClose, queryClient])

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
    <Fragment>
      <CssVarsProvider>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={handleClose}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <ModalDialog variant="outlined" sx={{ height: 'auto' }}>
            <ModalClose
              variant="outlined"
              sx={{
                top: 'calc(-1/4 * var(--IconButton-size))',
                right: 'calc(-1/4 * var(--IconButton-size))',
                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                borderRadius: '50%',
                bgcolor: 'background.body',
                color: '#bf360c',
                height: 15,
                width: 15
              }}
            />
            <Box sx={{ flexWrap: 'wrap', pt: 1, width: '35vw', overflowY: 'auto' }}>
              <Box sx={{ display: 'flex', flex: 1, pt: 2 }}>
                <Typography sx={{ color: '#0d47a1', fontSize: 14, fontWeight: 550, pt: 0.4 }}>Goods Checker</Typography>
                <Typography sx={{ pl: 1 }}> :&nbsp;</Typography>
                <Box sx={{ flex: 1, pl: 0.5 }}>
                  <CustomInputDateCmp
                    className={{
                      width: '100%',
                      height: 35,
                      borderRadius: 5,
                      border: '1px solid #bbdefb',
                      color: '#0d47a1',
                      fontSize: 14
                    }}
                    placeholder="Enter Name and Employee ID"
                    autoComplete="off"
                    size={'sm'}
                    type="text"
                    name={'checkingUser'}
                    value={checkingUser}
                    handleChange={userChange}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="outlined" sx={buttonStyle} onClick={SaveDetails}>
                  Submit
                </Button>
              </Box>
            </Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(ItemSaveModal)
