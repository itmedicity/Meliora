import React, { Fragment, useCallback, useState, memo, useEffect, useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog, Textarea } from '@mui/joy'
import _ from 'underscore'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { useQueryClient } from 'react-query'
import CrfReqDetailViewCmp from '../ComonComponent/CrfReqDetailViewCmp'
import ReqItemDisplay from '../ComonComponent/ReqItemDisplay'
import ModalButtomCmp from '../ComonComponent/Components/ModalButtomCmp'

const InchargeCancel = ({
  open,
  handleCloseCrfClose,
  cancelData,
  reqItems,
  cancelledOne,
  deptsecArry,
  setCancelFlag,
  imagearray,
}) => {
  const { req_slno, crf_close, crf_close_remark } = cancelData
  const queryClient = useQueryClient()
  const id = useSelector(state => state.LoginUserData.empid, _.isEqual)
  const [Closeremark, setCloseRemark] = useState('')
  const [closeCrf, setCloseCrf] = useState(false)

  const updateCloseRemark = useCallback(e => {
    setCloseRemark(e.target.value)
  }, [])
  const updateCrf = useCallback(e => {
    if (e.target.checked === true) {
      setCloseCrf(true)
    } else {
      setCloseCrf(false)
    }
  }, [])
  useEffect(() => {
    setCloseCrf(crf_close === 1 ? true : false)
    setCloseRemark(crf_close_remark !== null ? crf_close_remark : '')
  }, [crf_close, crf_close_remark])

  const closedPatchData = useMemo(() => {
    return {
      crf_close: 1,
      crf_close_remark: Closeremark,
      crf_close_user: id,
      crf_closed_one: cancelledOne,
      close_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      req_slno: req_slno,
    }
  }, [Closeremark, id, req_slno, cancelledOne])
  const reset = useCallback(() => {
    setCloseRemark('')
    setCloseCrf(false)
    setCancelFlag(0)
  }, [setCancelFlag])

  const submit = useCallback(async () => {
    if (Closeremark === '' || Closeremark === null || Closeremark === undefined) {
      infoNotify('Enter Remarks')
    } else {
      const updateClosedCrf = async closedPatchData => {
        try {
          const result = await axioslogin.patch('/CRFRegisterApproval/crfClose', closedPatchData)
          const { success, message } = result.data
          if (success === 2) {
            succesNotify(message)
            await queryClient.invalidateQueries(['inchargeHodCrfList', JSON.stringify(deptsecArry)])
            reset()
          } else {
            await queryClient.invalidateQueries(['inchargeHodCrfList', JSON.stringify(deptsecArry)])
            warningNotify(message)
          }
        } catch (error) {
          warningNotify('An error occurred while processing your request.Try again.', error)
        }
      }
      updateClosedCrf(closedPatchData)
    }
  }, [closedPatchData, reset, queryClient, deptsecArry, Closeremark])

  const closeModal = useCallback(() => {
    reset()
    handleCloseCrfClose()
  }, [reset, handleCloseCrfClose])
  return (
    <Fragment>
      <Box>
        <CssVarsProvider>
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={handleCloseCrfClose}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ModalDialog
              variant="outlined"
              sx={{
                minWidth: '60vw',
                minHeight: '40vh',
                maxHeight: '75vh',
                overflowY: 'auto',
              }}
            >
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
              <Box sx={{ overflow: 'auto' }}>
                <CrfReqDetailViewCmp ApprovalData={cancelData} imagearray={imagearray} />
                {reqItems.length !== 0 ? (
                  <ReqItemDisplay reqItems={reqItems} />
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      fontSize: 25,
                      opacity: 0.5,
                      pt: 10,
                      color: 'grey',
                    }}
                  >
                    No Item Requested
                  </Box>
                )}

                <Box sx={{ m: 0.5 }}>
                  <Box sx={{ my: 1 }}>
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
      </Box>
    </Fragment>
  )
}

export default memo(InchargeCancel)
