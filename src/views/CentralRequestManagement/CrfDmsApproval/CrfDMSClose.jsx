import React, { Fragment, useCallback, useState, memo, useEffect, useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog, Textarea } from '@mui/joy'
import ReqItemDisplay from '../ComonComponent/ReqItemDisplay'
import _ from 'underscore'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { useQueryClient } from 'react-query'
import CrfReqDetailViewCmp from '../ComonComponent/CrfReqDetailViewCmp'
import ApprovalItemView from '../CrfDatacollection/ApprovalItemView'
import ModalButtomCmp from '../ComonComponent/Components/ModalButtomCmp'

const CrfDMSClose = ({
  open,
  handleCloseCrfClose,
  cancelData,
  reqItems,
  cancelledOne,
  setCancelFlag,
  approveTableData,
  imagearray,
}) => {
  const { req_slno, crf_close, crf_close_remark } = cancelData
  const queryClient = useQueryClient()
  const id = useSelector(state => state.LoginUserData.empid, _.isEqual)
  const [Closeremark, setCloseRemark] = useState('')
  const [closeCrf, setCloseCrf] = useState(false)
  const [internally, setInternally] = useState(false)
  const updateCloseRemark = useCallback(e => {
    setCloseRemark(e.target.value)
  }, [])
  const updateCrf = useCallback(e => {
    if (e.target.checked === true) {
      setCloseCrf(true)
      setInternally(false)
    } else {
      setCloseCrf(false)
      setInternally(false)
    }
  }, [])
  useEffect(() => {
    setCloseCrf(crf_close === 1 ? true : false)
    setInternally(crf_close === 2 ? true : false)
    setCloseRemark(crf_close_remark !== null ? crf_close_remark : '')
  }, [crf_close, crf_close_remark])

  const closedPatchData = useMemo(() => {
    return {
      crf_close: closeCrf === true ? 1 : internally === true ? 2 : 1,
      crf_close_remark: Closeremark,
      crf_close_user: id,
      crf_closed_one: cancelledOne,
      close_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      req_slno: req_slno,
    }
  }, [Closeremark, id, req_slno, cancelledOne, closeCrf, internally])

  const reset = useCallback(() => {
    setCloseRemark('')
    setCloseCrf(false)
    setCancelFlag(0)
  }, [setCancelFlag])

  const submit = useCallback(() => {
    if (Closeremark === '' || Closeremark === null || Closeremark === undefined) {
      infoNotify('Enter Remarks')
      return
    } else {
      const updateClosedCrf = async closedPatchData => {
        try {
          const result = await axioslogin.patch('/CRFRegisterApproval/crfClose', closedPatchData)
          const { success, message } = result.data
          if (success === 2) {
            succesNotify(message)
            queryClient.invalidateQueries('getPendingAll')
            reset()
          } else {
            queryClient.invalidateQueries('getPendingAll')
            warningNotify(message)
          }
        } catch (error) {
          warningNotify('An error occurred while processing your request.Try again.', error)
        }
      }
      updateClosedCrf(closedPatchData)
    }
  }, [closedPatchData, reset, queryClient, Closeremark])

  const closeModal = useCallback(() => {
    reset()
    handleCloseCrfClose()
  }, [reset, handleCloseCrfClose])

  return (
    <Fragment>
      <CssVarsProvider>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={handleCloseCrfClose}
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
                width: 25,
              }}
            />
            <Box sx={{ minWidth: '60vw', minHeight: '50vh', maxHeight: '85vh', overflowY: 'auto' }}>
              <CrfReqDetailViewCmp ApprovalData={cancelData} imagearray={imagearray} />
              {reqItems.length !== 0 ? <ReqItemDisplay reqItems={reqItems} /> : null}
              <Box sx={{ mt: 0.5, pb: 1, flexWrap: 'wrap' }}>
                <ApprovalItemView approveTableData={approveTableData} />
              </Box>
              <Box sx={{ m: 0.5, display: 'flex' }}>
                <Box sx={{ my: 1, ml: 1 }}>
                  <CusCheckBox
                    label="Close CRF"
                    color="primary"
                    size="md"
                    name="closeCrf"
                    value={closeCrf}
                    checked={closeCrf}
                    onCheked={updateCrf}
                  />
                </Box>
              </Box>
              {closeCrf === true ? (
                <Box sx={{ flex: 1 }}>
                  <Textarea
                    required
                    placeholder="Remarks"
                    value={Closeremark}
                    autoComplete="off"
                    name="remarks"
                    minRows={2}
                    maxRows={3}
                    onChange={updateCloseRemark}
                    sx={{ fontSize: 14, borderRadius: 7 }}
                  />
                </Box>
              ) : null}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Box sx={{ py: 0.5, pr: 0.5 }}>
                <ModalButtomCmp handleChange={submit}> Save</ModalButtomCmp>
              </Box>
              <Box sx={{ py: 0.5, pr: 2 }}>
                <ModalButtomCmp handleChange={closeModal}> Cancel</ModalButtomCmp>
              </Box>
            </Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(CrfDMSClose)
