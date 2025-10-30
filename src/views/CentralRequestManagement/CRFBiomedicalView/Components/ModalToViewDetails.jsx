import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog } from '@mui/joy'
import React, { Fragment, memo } from 'react'
import CrfReqDetailViewCmp from '../../ComonComponent/CrfReqDetailViewCmp'
import ReqItemDisplay from '../../ComonComponent/ReqItemDisplay'
import ApprovalItemView from '../../CrfDatacollection/ApprovalItemView'

const ModalToViewDetails = ({ open, modalData, reqItems, handleClose, approveTableData, imagearray }) => {
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
          <ModalDialog variant="outlined">
            <ModalClose
              variant="outlined"
              sx={{
                m: 1,
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
            <Box sx={{ minWidth: '80vw', minHeight: '62vh', maxHeight: '85vh', overflowY: 'auto' }}>
              <CrfReqDetailViewCmp ApprovalData={modalData} imagearray={imagearray} selectedCompany={1} />
              {reqItems.length !== 0 ? (
                <Box sx={{ mt: 0.5, mx: 0.3 }}>
                  <ReqItemDisplay reqItems={reqItems} />
                </Box>
              ) : null}
              {approveTableData.length !== 0 ? (
                <Box sx={{ mt: 0.3, mx: 0.3 }}>
                  <ApprovalItemView approveTableData={approveTableData} />
                </Box>
              ) : null}
            </Box>
            <Box sx={{ height: 10 }}></Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(ModalToViewDetails)
