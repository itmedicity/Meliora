import { Box, Button, Checkbox, CssVarsProvider, Modal, ModalDialog, Textarea, Tooltip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import ItBillCategoryList from 'src/views/CommonSelectCode/ItBillCategoryList'
import { useDispatch, useSelector } from 'react-redux'
import { getBillCategory } from 'src/redux/actions/ItBillCategoryList.action'
import TariffSelect from '../SimDetails/TariffSelect'
import ItSimTypeSelect from 'src/views/CommonSelectCode/ItSimTypeSelect'
import { getSimType } from 'src/redux/actions/ItSimTypeList.action'
import SpaceDashboardSharpIcon from '@mui/icons-material/SpaceDashboardSharp'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import SimCardSharpIcon from '@mui/icons-material/SimCardSharp'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import PaidIcon from '@mui/icons-material/Paid'

const EditBillModal = ({ openEditModal, seteditModalFlag, seteditModalOpen, billData, billCount, setbillCount }) => {
  const {
    bill_add_slno,
    bill_category,
    bill_cug_simtype,
    bill_cug_status,
    bill_tariff,
    bill_name,
    it_bill_category_name
  } = billData

  const [billCategory, setBillCategory] = useState(bill_category)
  const [billCategoryName, setBillCategoryName] = useState('')
  const [tarrif, setTarrif] = useState(bill_tariff)
  const [simType, setSimType] = useState(bill_cug_simtype)
  const [cugStatus, setcugStatus] = useState(bill_cug_status === 1 ? true : false)
  const [checkFlag, setcheckFlag] = useState(bill_cug_status)
  const [billName, setbillName] = useState(bill_name)
  const dispatch = useDispatch()
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const [billActive, setBillActive] = useState(true)

  useEffect(() => {
    dispatch(getBillCategory())
    dispatch(getSimType())
  }, [dispatch])

  const CheckBoxChange = useCallback(e => {
    if (e.target.checked === true) {
      setcugStatus(true)
      setcheckFlag(1)
    } else {
      setcugStatus(false)
      setcheckFlag(0)
    }
  }, [])

  const BillActiveChange = useCallback(e => {
    if (e.target.checked === true) {
      setBillActive(true)
    } else {
      setBillActive(false)
    }
  }, [])

  const BillOnChange = useCallback(e => {
    setbillName(e.target.value)
  }, [])

  const ResetModal = useCallback(() => {
    setBillCategory(0)
    setTarrif(0)
    setSimType(0)
    setcugStatus(false)
    setcheckFlag(0)
    setbillName('')
  }, [])

  const handleClose = useCallback(() => {
    ResetModal()
    seteditModalFlag(0)
    seteditModalOpen(false)
  }, [seteditModalFlag, seteditModalOpen, ResetModal])

  const PatchData = useMemo(() => {
    return {
      bill_add_slno: bill_add_slno,
      bill_name: billName,
      bill_category: billCategory === 0 ? null : billCategory,
      bill_tariff: tarrif === 0 ? null : tarrif,
      bill_cug_status: cugStatus === true ? 1 : 0,
      bill_cug_simtype: simType === 0 ? null : simType,
      edit_user: id,
      bill_active_status: billActive === false ? 0 : 1
    }
  }, [bill_add_slno, billName, billCategory, tarrif, cugStatus, simType, billActive, id])

  const addBill = useCallback(
    e => {
      e.preventDefault()
      if (billName !== '' && billCategory !== 0) {
        const UpdateBill = async PatchData => {
          const result = await axioslogin.patch('/ItBillAdd/updateBill', PatchData)
          const { message, success } = result.data
          if (success === 2) {
            succesNotify(message)
            setbillCount(billCount + 1)
            handleClose()
          } else if (success === 0) {
            infoNotify(message)
          } else {
            infoNotify(message)
          }
        }
        UpdateBill(PatchData)
      } else {
        infoNotify('Please fill Mandatory feilds')
      }
    },
    [PatchData, billName, billCount, handleClose, billCategory, setbillCount]
  )

  return (
    <Box>
      {/* <CssVarsProvider> */}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openEditModal}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pl: 1,
          borderRadius: 10
        }}
      >
        <ModalDialog variant="outlined" sx={{ width: 550 }}>
          <Box sx={{ display: 'flex', pl: 1, fontSize: 28, fontWeight: 500, color: '#183A53' }}>
            <ReceiptLongOutlinedIcon sx={{ pt: 0.5, fontSize: 40, color: '#183A53' }} />
            Add Bill
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', mt: 0.5, pt: 0.5 }}>
              <Tooltip title="Close">
                <HighlightOffSharpIcon
                  sx={{
                    cursor: 'pointer',
                    color: '#183A53',
                    height: 25,
                    width: 25,
                    '&:hover': {
                      color: '#5C97B8'
                    }
                  }}
                  onClick={handleClose}
                />
              </Tooltip>
            </Box>
          </Box>
          <Box
            sx={{
              overflow: 'auto'
            }}
          >
            <Box sx={{ flex: 1, mt: 3, ml: 2, fontWeight: 600 }}>
              <SpaceDashboardSharpIcon sx={{ pb: 0.5, fontSize: 20 }} />
              Bill Category<span style={{ color: '#74112F' }}>*</span>
            </Box>
            <Box sx={{ flex: 1, mx: 2 }}>
              <ItBillCategoryList
                billCategory={billCategory}
                setBillCategory={setBillCategory}
                setName={setBillCategoryName}
              />
            </Box>
            <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600 }}>
              <PaidIcon sx={{ pb: 0.5, fontSize: 20 }} />
              Tariff<span style={{ color: '#74112F' }}>*</span>
            </Box>
            <Box sx={{ flex: 1, mx: 2 }}>
              <TariffSelect tarrif={tarrif} setTarrif={setTarrif} />
            </Box>

            <Box sx={{ flex: 1, mt: 1.5, ml: 2, fontWeight: 600 }}>
              <ReceiptLongIcon sx={{ pb: 0.5, fontSize: 20 }} />
              Bill Name<span style={{ color: '#74112F' }}>*</span>
            </Box>
            <Box sx={{ flex: 1, mx: 2 }}>
              <CssVarsProvider>
                <Textarea
                  type="text"
                  size="sm"
                  placeholder="Bill Name"
                  variant="outlined"
                  minRows={2}
                  maxRows={4}
                  name="billName"
                  value={billName}
                  onChange={e => BillOnChange(e)}
                ></Textarea>
              </CssVarsProvider>
            </Box>

            <>
              {billCategoryName === 'CUG' || it_bill_category_name === 'CUG' ? (
                <Box>
                  <Box sx={{ flex: 1, mt: 1, ml: 2.5 }}>
                    <Checkbox
                      label="CUG Type"
                      color="primary"
                      onChange={e => CheckBoxChange(e)}
                      checked={cugStatus}
                    />
                  </Box>
                  {checkFlag === 1 ? (
                    <>
                      <Box sx={{ flex: 1, mt: 1, ml: 2, fontWeight: 600 }}>
                        <SimCardSharpIcon sx={{ pb: 0.5, fontSize: 20 }} />
                        Sim Type<span style={{ color: '#74112F' }}>*</span>
                      </Box>
                      <Box sx={{ flex: 1, mx: 2 }}>
                        <ItSimTypeSelect simType={simType} setSimType={setSimType} />
                      </Box>
                    </>
                  ) : null}
                </Box>
              ) : null}
            </>
          </Box>
          <Box sx={{ flex: 1, mx: 2, pl: 0.5 }}>
            <Checkbox
              label="Bill Active Status"
              color="success"
              onChange={e => BillActiveChange(e)}
              checked={billActive}
            />
          </Box>
          <Box sx={{ flex: 1, mx: 2, mt: 1.5 }}>
            <CssVarsProvider>
              <Button
                variant="solid"
                style={{ borderRadius: 2, color: 'white', width: '100%' }}
                onClick={addBill}
                sx={{ fontSize: 16, color: '#004F76' }}
              >
                Update
              </Button>
            </CssVarsProvider>
          </Box>
        </ModalDialog>
      </Modal>
      {/* </CssVarsProvider> */}
    </Box>
  )
}

export default memo(EditBillModal)
