import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog } from '@mui/joy'
import CrfReqDetailViewCmp from '../ComonComponent/CrfReqDetailViewCmp'
import { useSelector } from 'react-redux'
import { useQueryClient } from 'react-query'
import _ from 'underscore'
import ItemsApprovalCompnt from './ItemsApprovalCompnt'
import { axioslogin } from 'src/views/Axios/Axios'
import CustomIconButtonCmp from '../ComonComponent/Components/CustomIconButtonCmp'
import AddMoreItemDtails from '../ComonComponent/AddMoreItemDtails'
import { format } from 'date-fns'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import ReqItemDisplay from '../ComonComponent/ReqItemDisplay'
// import { ToastContainer } from 'react-toastify'
import InchargeApprvalCmp from './InchargeComp/InchargeApprvalCmp'
import ModalButtomCmp from '../ComonComponent/Components/ModalButtomCmp'

const CrmInchargeModal = ({
  open,
  ApprovalData,
  setApproveTableData,
  approveTableData,
  reqItems,
  handleClose,
  deptsecArry,
  imagearray,
  selectedCompany,
  company,
}) => {
  const { req_slno, incharge_approve, incharge_remarks, inch_detial_analysis } = ApprovalData
  const queryClient = useQueryClient()
  const id = useSelector(state => state.LoginUserData.empid, _.isEqual)
  const [addMoreItems, setMoreItem] = useState(0)
  const [editEnable, setEditEnable] = useState(0)
  const [apprvlDetails, setApprvlDetails] = useState({
    approve: incharge_approve === 1 ? true : false,
    reject: incharge_approve === 2 ? true : false,
    pending: incharge_approve === 3 ? true : false,
    remark: incharge_remarks !== null ? incharge_remarks : '',
    detailAnalis: inch_detial_analysis !== null ? inch_detial_analysis : '',
  })
  const { remark, detailAnalis, approve, reject, pending } = apprvlDetails
  const updateOnchangeState = useCallback(e => {
    const { name, type, value, checked } = e.target
    setApprvlDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }, [])

  const updateApprovalState = useCallback(type => {
    setApprvlDetails(prev => ({
      ...prev,
      approve: type === 'approve',
      reject: type === 'reject',
      pending: type === 'pending',
    }))
  }, [])

  const AddItems = useCallback(() => {
    setMoreItem(1)
    setEditEnable(0)
  }, [])

  const reset = useCallback(() => {
    const formdata = {
      approve: false,
      reject: false,
      pending: false,
      remark: '',
      detailAnalis: '',
    }
    setApprvlDetails(formdata)
    setMoreItem(0)
    handleClose()
  }, [handleClose])

  const InchargePatchData = useMemo(() => {
    return {
      incharge_approve: approve === true ? 1 : reject === true ? 2 : pending === true ? 3 : null,
      incharge_user: id,
      req_slno: req_slno,
      incharge_apprv_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      incharge_remarks: remark,
      inch_detial_analysis: detailAnalis,
      items: approveTableData?.map(val => {
        return {
          req_detl_slno: val.req_detl_slno,
          item_status_approved: val.item_status_approved,
        }
      }),
    }
  }, [approve, reject, pending, id, remark, detailAnalis, req_slno, approveTableData])

  const submit = useCallback(async () => {
    if (editEnable === 1) {
      infoNotify('Ensure all other details are entered/completed before submitting')
    } else {
      const updateInchargeApproval = async InchargePatchData => {
        try {
          const result = await axioslogin.patch('/CRFRegisterApproval/incharge', InchargePatchData)
          const { success, message } = result.data
          if (success === 1) {
            await queryClient.invalidateQueries(['inchargeHodCrfList', JSON.stringify(deptsecArry)])
            succesNotify(message)
            reset()
          } else {
            await queryClient.invalidateQueries(['inchargeHodCrfList', JSON.stringify(deptsecArry)])
            warningNotify(message)
          }
        } catch (error) {
          warningNotify('An error occurred while processing your request.Try again.', error)
        }
      }
      if (approve || reject || pending) {
        if ((approve && detailAnalis && remark) || ((reject || pending) && remark)) {
          updateInchargeApproval(InchargePatchData)
        } else {
          warningNotify('Justification is required.')
        }
      } else {
        warningNotify('Select any Status')
      }
    }
  }, [
    approve,
    reject,
    pending,
    remark,
    detailAnalis,
    InchargePatchData,
    queryClient,
    reset,
    deptsecArry,
    editEnable,
  ])

  const closeModal = useCallback(() => {
    reset()
  }, [reset])
  return (
    <Fragment>
      {/* <ToastContainer /> */}
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
                width: 25,
              }}
            />
            <Box sx={{ minWidth: '80vw', minHeight: '62vh', maxHeight: '85vh', overflowY: 'auto' }}>
              <CrfReqDetailViewCmp
                ApprovalData={ApprovalData}
                imagearray={imagearray}
                selectedCompany={selectedCompany}
              />
              <Box sx={{ overflow: 'auto', pt: 0.5, mx: 0.3 }}>
                {reqItems.length !== 0 ? <ReqItemDisplay reqItems={reqItems} /> : null}
                {approveTableData.length !== 0 ? (
                  <ItemsApprovalCompnt
                    req_slno={req_slno}
                    setMoreItem={setMoreItem}
                    editEnable={editEnable}
                    setEditEnable={setEditEnable}
                    setApproveTableData={setApproveTableData}
                    apprvLevel={1}
                    header="Incharge"
                  />
                ) : null}
                <Box sx={{ pl: 0.5 }}>
                  <CustomIconButtonCmp handleChange={AddItems}>Add Items</CustomIconButtonCmp>
                </Box>
                {addMoreItems === 1 ? (
                  <AddMoreItemDtails
                    req_slno={req_slno}
                    setApproveTableData={setApproveTableData}
                    setMoreItem={setMoreItem}
                  />
                ) : null}
                <InchargeApprvalCmp
                  heading={`${company?.incharge_status_name} Approval`}
                  apprvlDetails={apprvlDetails}
                  updateOnchangeState={updateOnchangeState}
                  updateApprovalState={updateApprovalState}
                />
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
    </Fragment>
  )
}
export default memo(CrmInchargeModal)
