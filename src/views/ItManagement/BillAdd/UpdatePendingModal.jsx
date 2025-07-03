import {
  Avatar,
  Box,
  Checkbox,
  CssVarsProvider,
  Modal,
  ModalDialog,
  Textarea,
  Tooltip,
} from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import SpaceDashboardSharpIcon from '@mui/icons-material/SpaceDashboardSharp'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import FitbitIcon from '@mui/icons-material/Fitbit'
import PaidIcon from '@mui/icons-material/Paid'
import SimCardIcon from '@mui/icons-material/SimCard'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation'
import { Paper } from '@mui/material'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import NotesIcon from '@mui/icons-material/Notes'
import imageCompression from 'browser-image-compression'
import CloseIcon from '@mui/icons-material/Close'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import PinDropIcon from '@mui/icons-material/PinDrop'
import SpeakerPhoneIcon from '@mui/icons-material/SpeakerPhone'
import FilePresentIcon from '@mui/icons-material/FilePresent'
import BillFile from './FileView/BillFile'
import PostAddIcon from '@mui/icons-material/PostAdd'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import AttachmentIcon from '@mui/icons-material/Attachment'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp'
import CancelIcon from '@mui/icons-material/Cancel'

const UpdatePendingModal = ({
  pendingModalOpen,
  setpendingModalFlag,
  setpendingModalOpen,
  billData,
  index_no,
  billCount,
  setbillCount,
  bill_description,
  filezUrls,
}) => {
  const {
    bill_name,
    it_bill_category_name,
    it_bill_type_name,
    bill_tariff,
    it_sim_type_name,
    bill_amount,
    bill_date,
    bill_paid_date,
    bill_number,
    bill_due_date,
    bill_category,
    file_upload_status,
    am_item_map_slno,
  } = billData

  const [billViewmodalFlag, setBillViewModalFlag] = useState(0)
  const [billViewmodalOpen, setBillViewModalOpen] = useState(false)
  const [selectFile, setSelectFile] = useState([])
  const [payedCheck, setpayedCheck] = useState(0)
  const [payedStatus, setpayedStatus] = useState(false)
  const [billType, setbillType] = useState(0)
  const [pswd_mast_asset_no, setPswd_mast_asset_no] = useState('')
  const [deviceName, setdeviceName] = useState('')
  const [location, setlocation] = useState('')
  const [item_slno, setItem_slno] = useState(0)
  const [assetSecName, setassetSecName] = useState('')
  const [assetNumb, setassetNumb] = useState('')
  const [assetNumbOnly, setassetNumbOnly] = useState('')
  const [assetDeviceName, setassetDeviceName] = useState('')
  const [ChangeAsset, setChangeAsset] = useState(0)
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const PayedStatus = useCallback(e => {
    if (e.target.checked === true) {
      setpayedStatus(true)
      setpayedCheck(1)
    } else {
      setpayedStatus(false)
      setpayedCheck(0)
    }
  }, [])

  const [monthlybillPay, setMonthlybillPay] = useState({
    billnumber: bill_number === null ? '' : bill_number,
    billamount: bill_amount === null ? '' : bill_amount,
    billdate: bill_date === null ? '' : bill_date,
    billduedate: bill_due_date === null ? '' : bill_due_date,
    billpaiddate: bill_paid_date === null ? '' : bill_paid_date,
    billdescription: bill_description === null ? '' : bill_description,
  })
  const { billamount, billdate, billduedate, billpaiddate, billnumber, billdescription } =
    monthlybillPay
  const MastBillUpdate = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setMonthlybillPay({ ...monthlybillPay, [e.target.name]: value })
    },
    [monthlybillPay]
  )

  const MonthlyAdd = useMemo(() => {
    return {
      monthly_slno: index_no,
      bill_number: billnumber,
      bill_amount: billamount === '' ? null : billamount,
      bill_date: billdate === '' ? null : billdate,
      bill_due_date: billduedate === '' ? null : billduedate,
      payed_status: payedStatus === true ? 1 : 0,
      bill_paid_date: billpaiddate === '' ? null : billpaiddate,
      edit_user: id,
    }
  }, [billnumber, billamount, billdate, billduedate, billpaiddate, payedStatus, index_no, id])

  const QuarteryAdd = useMemo(() => {
    return {
      quaterly_slno: index_no,
      bill_number: billnumber,
      bill_amount: billamount === '' ? null : billamount,
      bill_date: billdate === '' ? null : billdate,
      bill_due_date: billduedate === '' ? null : billduedate,
      payed_status: payedStatus === true ? 1 : 0,
      bill_paid_date: billpaiddate === '' ? null : billpaiddate,
      edit_user: id,
    }
  }, [billnumber, billamount, billdate, billduedate, billpaiddate, payedStatus, index_no, id])

  const YearlyAdd = useMemo(() => {
    return {
      yearly_slno: index_no,
      bill_number: billnumber,
      bill_amount: billamount === '' ? null : billamount,
      bill_date: billdate === '' ? null : billdate,
      bill_due_date: billduedate === '' ? null : billduedate,
      payed_status: payedStatus === true ? 1 : 0,
      bill_paid_date: billpaiddate === '' ? null : billpaiddate,
      edit_user: id,
    }
  }, [billnumber, billamount, billdate, billduedate, billpaiddate, payedStatus, index_no, id])

  const otherBillAdd = useMemo(() => {
    return {
      bill_name: bill_name === '' ? null : bill_name,
      bill_category: bill_category === null ? null : bill_category,
      other_bill_slno: index_no,
      bill_number: billnumber === '' ? null : billnumber,
      bill_amount: billamount === '' ? null : billamount,
      bill_date: billdate === '' ? null : billdate,
      bill_due_date: billduedate === '' ? null : billduedate,
      payed_status: payedStatus === true ? 1 : 0,
      bill_paid_date: billpaiddate === '' ? null : billpaiddate,
      bill_description: billdescription === '' ? null : billdescription,
      am_item_map_slno: item_slno === 0 ? null : item_slno,
      edit_user: id,
    }
  }, [
    billnumber,
    billamount,
    billdate,
    billduedate,
    billpaiddate,
    payedStatus,
    billdescription,
    bill_category,
    item_slno,
    bill_name,
    index_no,
    id,
  ])

  const handleClose = useCallback(() => {
    setpendingModalFlag(0)
    setpendingModalOpen(false)
  }, [setpendingModalFlag, setpendingModalOpen])

  const handleFileChange = useCallback(
    e => {
      const newFiles = [...selectFile]
      newFiles.push(e.target.files[0])
      setSelectFile(newFiles)
    },
    [selectFile, setSelectFile]
  )

  const handleImageUpload = useCallback(async imageFile => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    const compressedFile = await imageCompression(imageFile, options)
    return compressedFile
  }, [])

  const handleRemoveFile = index => {
    setSelectFile(prevFiles => {
      const updatedFiles = [...prevFiles]
      updatedFiles.splice(index, 1) // Remove the file at the specified index
      return updatedFiles
    })
  }
  const UpdateAssetNo = useCallback(e => {
    setPswd_mast_asset_no(e.target.value.toLocaleUpperCase())
  }, [])

  useEffect(() => {
    if (bill_category !== 0) {
      const getbillType = async () => {
        const result = await axioslogin.get(`/ItBillAdd/getbilltype/${bill_category}`)
        const { success, data } = result.data
        if (success === 2) {
          const { it_bill_type_slno } = data[0]
          setbillType(it_bill_type_slno)
        }
      }
      getbillType(bill_category)
    } else {
      setbillType(0)
    }
  }, [bill_category])

  useEffect(() => {
    if (am_item_map_slno !== 0) {
      const getAssetDetails = async () => {
        const result = await axioslogin.get(`/ItBillAdd/getAssetDetails/${am_item_map_slno}`)
        const { success, dataa } = result.data
        if (success === 2) {
          const { sec_name, item_asset_no, item_asset_no_only, item_name } = dataa[0]
          setassetDeviceName(item_name)
          setassetNumb(item_asset_no)
          setassetNumbOnly(item_asset_no_only)
          setassetSecName(sec_name)
        }
      }
      getAssetDetails(am_item_map_slno)
    } else {
    }
  }, [am_item_map_slno])

  const ChangeAssetNum = useCallback(() => {
    setChangeAsset(1)
  }, [])

  const searchAssetNo = useCallback(
    e => {
      if (pswd_mast_asset_no === '') {
        infoNotify('Please Enter Asset Number')
      } else {
        const parts = pswd_mast_asset_no.split('/')
        const assetno = parts[parts.length - 1]
        const Custodian = parts[parts.length - 2]
        const firstname = parts[parts.length - 3]
        const starts = firstname + '/' + Custodian
        const asset_number = parseInt(assetno)
        const postdata = {
          item_asset_no: starts,
          item_asset_no_only: asset_number,
        }
        const getAssetdata = async postdata => {
          const result = await axioslogin.post('/PasswordManagementMain/getAssetNo', postdata)
          const { data, success } = result.data
          if (data.length !== 0) {
            if (success === 1) {
              const { item_name, sec_name, am_item_map_slno } = data[0]

              setPswd_mast_asset_no(pswd_mast_asset_no)
              setlocation(sec_name)
              setdeviceName(item_name)
              setItem_slno(am_item_map_slno)
            }
            return result.data
          } else {
            warningNotify('Asset number not found')
          }
        }
        getAssetdata(postdata)
      }
    },
    [pswd_mast_asset_no]
  )

  const updateBilling = useCallback(
    e => {
      e.preventDefault()

      if (billnumber !== '' && billdate !== '' && billduedate !== '' && billamount !== '') {
        if (
          (payedStatus === true && billpaiddate !== '') ||
          (payedStatus === false && billpaiddate === '')
        ) {
          if (bill_tariff === 1) {
            const Monthlyy = async MonthlyAdd => {
              const result = await axioslogin.patch('/ItBillAdd/updateMonthlybill', MonthlyAdd)
              return result.data
            }
            const InsertFile = async (selectFile, index_no) => {
              try {
                const formData = new FormData()
                formData.append('id', index_no)
                for (const fileMonthly of selectFile) {
                  if (fileMonthly.type.startsWith('image')) {
                    const compressedFile = await handleImageUpload(fileMonthly)
                    formData.append('files', compressedFile, compressedFile.name)
                  } else {
                    formData.append('files', fileMonthly, fileMonthly.name)
                  }
                }
                // Use the Axios instance and endpoint that matches your server setup
                const uploadResult = await axioslogin.post(
                  '/ItImageUpload/uploadFile/Monthly',
                  formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  }
                )
                return uploadResult.data
              } catch (error) {
                warningNotify('An error occurred during file upload.')
              }
            }
            Monthlyy(MonthlyAdd).then(value => {
              const { message, success } = value
              if (success === 2) {
                if (selectFile.length !== 0) {
                  InsertFile(selectFile, index_no).then(value => {
                    const { success } = value
                    if (success === 1) {
                      succesNotify('Bill Updated with bill attach successfully')
                      setbillCount(billCount + 1)
                      handleClose()
                    } else {
                      warningNotify('failed to upload file')
                    }
                  })
                } else {
                  succesNotify(message)
                  setbillCount(billCount + 1)
                  handleClose()
                }
              } else if (success === 0) {
                infoNotify(message)
              } else {
                infoNotify(message)
              }
            })
          } else if (bill_tariff === 2) {
            const Quarterly = async QuarteryAdd => {
              const result = await axioslogin.patch(
                '/ItBillAdd/updateQuaterlybillModal',
                QuarteryAdd
              )
              return result.data
            }
            const InsertFileQuarter = async (selectFile, index_no) => {
              try {
                const formData = new FormData()
                formData.append('id', index_no)
                for (const fileQuarterly of selectFile) {
                  if (fileQuarterly.type.startsWith('image')) {
                    const compressedFile = await handleImageUpload(fileQuarterly)
                    formData.append('files', compressedFile, compressedFile.name)
                  } else {
                    formData.append('files', fileQuarterly, fileQuarterly.name)
                  }
                }
                // Use the Axios instance and endpoint that matches your server setup
                const uploadResult = await axioslogin.post(
                  '/ItImageUpload/uploadFile/Quaterly',
                  formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  }
                )
                return uploadResult.data
              } catch (error) {
                warningNotify('An error occurred during file upload.')
              }
            }
            Quarterly(QuarteryAdd).then(value => {
              const { message, success } = value
              if (success === 2) {
                if (selectFile.length !== 0) {
                  InsertFileQuarter(selectFile, index_no).then(value => {
                    const { success } = value
                    if (success === 1) {
                      succesNotify('Bill Updated with bill attach successfully')
                      setbillCount(billCount + 1)
                      handleClose()
                    } else {
                      warningNotify('failed to upload file')
                    }
                  })
                } else {
                  succesNotify(message)
                  setbillCount(billCount + 1)
                  handleClose()
                }
              } else if (success === 0) {
                infoNotify(message)
              } else {
                infoNotify(message)
              }
            })
          } else if (bill_tariff === 3) {
            const Yearlyy = async YearlyAdd => {
              const result = await axioslogin.patch('/ItBillAdd/updateYearlybillModal', YearlyAdd)
              return result.data
            }
            const InsertFileYearly = async (selectFile, index_no) => {
              try {
                const formData = new FormData()
                formData.append('id', index_no)
                for (const fileYearly of selectFile) {
                  if (fileYearly.type.startsWith('image')) {
                    const compressedFile = await handleImageUpload(fileYearly)
                    formData.append('files', compressedFile, compressedFile.name)
                  } else {
                    formData.append('files', fileYearly, fileYearly.name)
                  }
                }
                // Use the Axios instance and endpoint that matches your server setup
                const uploadResult = await axioslogin.post(
                  '/ItImageUpload/uploadFile/Yearly',
                  formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  }
                )
                return uploadResult.data
              } catch (error) {
                warningNotify('An error occurred during file upload.')
              }
            }
            Yearlyy(YearlyAdd).then(value => {
              const { message, success } = value
              if (success === 2) {
                if (selectFile.length !== 0) {
                  InsertFileYearly(selectFile, index_no).then(value => {
                    const { success } = value
                    if (success === 1) {
                      succesNotify('Bill Updated with bill attach successfully')
                      setbillCount(billCount + 1)
                      handleClose()
                    } else {
                      warningNotify('failed to upload file')
                    }
                  })
                } else {
                  succesNotify(message)
                  setbillCount(billCount + 1)
                  handleClose()
                }
              } else if (success === 0) {
                infoNotify(message)
              } else {
                infoNotify(message)
              }
            })
          } else {
            const otherBill = async otherBillAdd => {
              const result = await axioslogin.patch('/ItBillAdd/UpdateOtherBill', otherBillAdd)
              return result.data
            }
            const InsertOtherFile = async (selectFile, index_no) => {
              try {
                const formData = new FormData()
                formData.append('id', index_no)
                for (const fileOthers of selectFile) {
                  if (fileOthers.type.startsWith('image')) {
                    const compressedFile = await handleImageUpload(fileOthers)
                    formData.append('files', compressedFile, compressedFile.name)
                  } else {
                    formData.append('files', fileOthers, fileOthers.name)
                  }
                }
                // Use the Axios instance and endpoint that matches your server setup
                const uploadResult = await axioslogin.post(
                  '/ItImageUpload/uploadFile/Others',
                  formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  }
                )
                return uploadResult.data
              } catch (error) {
                warningNotify('An error occurred during file upload.')
              }
            }
            otherBill(otherBillAdd).then(value => {
              const { message, success } = value
              if (success === 2) {
                if (selectFile.length !== 0) {
                  InsertOtherFile(selectFile, index_no).then(value => {
                    const { success } = value
                    if (success === 1) {
                      succesNotify('Bill Updated with file attach successfully')
                      setbillCount(billCount + 1)
                      handleClose()
                    } else {
                      warningNotify('failed to upload file')
                    }
                  })
                } else {
                  succesNotify(message)
                  setbillCount(billCount + 1)
                  handleClose()
                }
              } else if (success === 0) {
                infoNotify(message)
              } else {
                infoNotify(message)
              }
            })
          }
        } else if (payedStatus === true && billpaiddate === '') {
          infoNotify('Please enter Bill Payed Date')
        }
      } else {
        infoNotify('Please fill Mandatory field')
      }
    },
    [
      MonthlyAdd,
      selectFile,
      QuarteryAdd,
      YearlyAdd,
      billnumber,
      otherBillAdd,
      billCount,
      billamount,
      billdate,
      billduedate,
      handleImageUpload,
      index_no,
      setbillCount,
      bill_tariff,
      handleClose,
      billpaiddate,
      payedStatus,
    ]
  )

  const openBillModal = useCallback(() => {
    setBillViewModalFlag(1)
    setBillViewModalOpen(true)
  }, [])

  return (
    <Box>
      {billViewmodalFlag === 1 ? (
        <BillFile
          billViewmodalOpen={billViewmodalOpen}
          setBillViewModalOpen={setBillViewModalOpen}
          setBillViewModalFlag={setBillViewModalFlag}
          filezUrls={filezUrls}
        />
      ) : null}

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={pendingModalOpen}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pl: 1,
          borderRadius: 10,
        }}
      >
        <Box sx={{ margin: 'auto' }}>
          <ModalDialog
            variant="outlined"
            sx={{
              width: 600,
              // bgcolor: '#274472',
              p: 0,
            }}
          >
            <Box sx={{ overflow: 'auto' }}>
              <Box sx={{ flex: 1, display: 'flex', pt: 2 }}>
                <Box sx={{ flex: 1 }}></Box>
                <Box sx={{ flex: 5, textAlign: 'center' }}>
                  <PostAddIcon sx={{ fontSize: 45, color: '#274472' }} />
                </Box>
                <Box sx={{ flex: 1, textAlign: 'right', pr: 1 }}>
                  <Tooltip title="Close">
                    <CancelIcon
                      sx={{
                        cursor: 'pointer',
                        color: 'darkred',
                        height: 25,
                        width: 25,
                        '&:hover': {
                          color: 'red',
                        },
                      }}
                      onClick={handleClose}
                    />
                  </Tooltip>
                </Box>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: 20,
                  color: '#274472',
                  fontStyle: 'Georgia',
                }}
              >
                Add Bill
              </Box>
              <Box
                sx={{
                  flex: 1,
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: 15,
                  color: '#274472',
                }}
              >
                {it_bill_type_name}
              </Box>

              <Box
                sx={{
                  flex: 1,
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: 20,
                  fontFamily: 'Georgia',
                  borderColor: '#CAD7E0',
                  pt: 1,
                }}
              >
                {' '}
                Bill Details
              </Box>
              <Box sx={{ py: 2, bgcolor: '#E7F2F8' }}>
                <Box sx={{ flex: 1, ml: 2, fontWeight: 600, display: 'flex' }}>
                  <Box sx={{ flex: 1 }}>
                    <FitbitIcon sx={{ pb: 0.5, fontSize: 20 }} />
                    Bill Type
                  </Box>
                  <Box sx={{ flex: 0.1 }}>:</Box>
                  <Box sx={{ flex: 4.5 }}>{it_bill_type_name}</Box>
                </Box>
                <Box sx={{ flex: 1, mt: 0.5, ml: 2, fontWeight: 600, display: 'flex' }}>
                  <Box sx={{ flex: 1 }}>
                    <SpaceDashboardSharpIcon sx={{ pb: 0.5, fontSize: 20 }} />
                    Bill Category
                  </Box>
                  <Box sx={{ flex: 0.1 }}>:</Box>
                  <Box sx={{ flex: 4.5 }}>{it_bill_category_name}</Box>
                </Box>
                <Box sx={{ flex: 1, mt: 0.5, ml: 2, fontWeight: 600, display: 'flex' }}>
                  <Box sx={{ flex: 1 }}>
                    <PaidIcon sx={{ pb: 0.5, fontSize: 20 }} />
                    Tariff
                  </Box>
                  <Box sx={{ flex: 0.1 }}>:</Box>
                  <Box sx={{ flex: 4.5 }}>
                    {bill_tariff === 1
                      ? 'Monthly'
                      : bill_tariff === 2
                      ? 'Quarterly'
                      : bill_tariff === 3
                      ? 'Yearly'
                      : 'others'}
                  </Box>
                </Box>
                <Box sx={{ flex: 1, mt: 0.5, ml: 2, fontWeight: 600, display: 'flex' }}>
                  <Box sx={{ flex: 1 }}>
                    <ReceiptLongIcon sx={{ pb: 0.5, fontSize: 20 }} />
                    Bill Name
                  </Box>
                  <Box sx={{ flex: 0.1 }}>:</Box>
                  <Box sx={{ flex: 4.5 }}>{bill_name}</Box>
                </Box>
                {it_sim_type_name !== null &&
                (bill_tariff === 1 || bill_tariff === 2 || bill_tariff === 3) ? (
                  <Box sx={{ flex: 1, mt: 0.5, ml: 2, fontWeight: 600, display: 'flex' }}>
                    <Box sx={{ flex: 1 }}>
                      <SimCardIcon sx={{ pb: 0.5, fontSize: 20 }} />
                      Sim Type
                    </Box>
                    <Box sx={{ flex: 0.1 }}>:</Box>
                    <Box sx={{ flex: 4.5 }}>{it_sim_type_name}</Box>
                  </Box>
                ) : (
                  <Box></Box>
                )}
              </Box>
              <Box sx={{ px: 2.5, bgcolor: 'white', borderRadius: 10, pb: 1 }}>
                <Box
                  sx={{
                    overflow: 'auto',
                  }}
                >
                  {billType === 3 &&
                  (bill_tariff !== 1 || bill_tariff !== 2 || bill_tariff !== 3) ? (
                    <Box>
                      <Paper
                        sx={{
                          mx: 0.5,
                          borderRadius: 0,
                          bgcolor: '#F0F2F3',
                          boxShadow: '0px 0px 3px',
                        }}
                      >
                        <Box
                          sx={{
                            flex: 1,
                            mt: 1.5,
                            fontWeight: 600,
                            px: 0.5,
                            color: '#54627B',
                            display: 'flex',
                          }}
                        >
                          <Box sx={{ flex: 1 }}>
                            <ManageSearchIcon
                              sx={{
                                p: 0.3,
                                fontSize: 20,
                                color: 'white',
                                border: 1,
                                borderRadius: 10,
                                bgcolor: '#183A53',
                                mb: 0.3,
                              }}
                            />{' '}
                            Asset No.
                          </Box>
                          {ChangeAsset === 1 ? (
                            <>
                              <Box></Box>
                            </>
                          ) : (
                            <>
                              {am_item_map_slno !== null ? (
                                <Box sx={{ p: 0.5 }}>
                                  <Avatar size="sm" sx={{ bgcolor: '#81BADF' }}>
                                    <ModeEditOutlineSharpIcon
                                      sx={{ color: '#28415D', cursor: 'pointer' }}
                                      onClick={ChangeAssetNum}
                                    />
                                  </Avatar>
                                </Box>
                              ) : null}
                            </>
                          )}
                        </Box>
                        {ChangeAsset === 1 ? (
                          <>
                            <Box sx={{ flex: 1, pl: 0.5, display: 'flex' }}>
                              <Box sx={{ flex: 1 }}>
                                <TextFieldCustom
                                  style={{ borderRadius: 0, borderColor: '#868B8E' }}
                                  placeholder="search"
                                  type="text"
                                  size="sm"
                                  name="pswd_mast_asset_no"
                                  value={pswd_mast_asset_no}
                                  onchange={UpdateAssetNo}
                                ></TextFieldCustom>
                              </Box>
                              <Box sx={{ mr: 0.8, bgcolor: '#868B8E', px: 0.5, pt: 0.3 }}>
                                <SearchRoundedIcon
                                  sx={{ color: 'white', cursor: 'pointer' }}
                                  onClick={searchAssetNo}
                                />
                              </Box>
                            </Box>
                          </>
                        ) : (
                          <>
                            {am_item_map_slno !== null ? (
                              <Box sx={{ flex: 1 }}>
                                <Box
                                  sx={{
                                    flex: 1,
                                    px: 0.5,
                                    bgcolor: 'white',
                                    mx: 0.8,
                                    borderColor: '#ADC4D7',
                                  }}
                                >
                                  {assetNumb}/{assetNumbOnly}
                                </Box>
                                <Box>
                                  <Box
                                    sx={{
                                      flex: 1,
                                      mt: 1.5,
                                      fontWeight: 600,
                                      pl: 0.5,
                                      mb: 0.3,
                                      color: '#54627B',
                                    }}
                                  >
                                    <SpeakerPhoneIcon
                                      sx={{
                                        p: 0.3,
                                        fontSize: 20,
                                        bgcolor: '#183A53',
                                        color: 'white',
                                        border: 1,
                                        borderRadius: 10,
                                        mb: 0.3,
                                      }}
                                    />
                                    Device Name
                                  </Box>
                                  <Box
                                    sx={{
                                      flex: 1,
                                      px: 0.5,
                                      bgcolor: 'white',
                                      mx: 0.8,
                                      borderColor: '#ADC4D7',
                                    }}
                                  >
                                    {assetDeviceName}
                                  </Box>
                                  <Box
                                    sx={{
                                      flex: 1,
                                      mt: 1,
                                      fontWeight: 600,
                                      px: 0.5,
                                      color: '#54627B',
                                    }}
                                  >
                                    <PinDropIcon
                                      sx={{
                                        p: 0.3,
                                        mb: 0.3,
                                        fontSize: 20,
                                        bgcolor: '#183A53',
                                        color: 'white',
                                        border: 1,
                                        borderRadius: 10,
                                      }}
                                    />
                                    Location
                                  </Box>

                                  <Box
                                    sx={{
                                      flex: 1,
                                      px: 0.5,
                                      bgcolor: 'white',
                                      mx: 0.8,
                                      borderColor: '#868B8E',
                                    }}
                                  >
                                    {assetSecName}
                                  </Box>
                                </Box>
                              </Box>
                            ) : (
                              <Box sx={{ flex: 1, pl: 0.5, display: 'flex' }}>
                                <Box sx={{ flex: 1 }}>
                                  <TextFieldCustom
                                    style={{ borderRadius: 0, borderColor: '#868B8E' }}
                                    placeholder="search"
                                    type="text"
                                    size="sm"
                                    name="pswd_mast_asset_no"
                                    value={pswd_mast_asset_no}
                                    onchange={UpdateAssetNo}
                                  ></TextFieldCustom>
                                </Box>
                                <Box sx={{ mr: 0.8, bgcolor: '#868B8E', px: 0.5, pt: 0.3 }}>
                                  <SearchRoundedIcon
                                    sx={{ color: 'white', cursor: 'pointer' }}
                                    onClick={searchAssetNo}
                                  />
                                </Box>
                              </Box>
                            )}
                          </>
                        )}
                        {deviceName !== '' ? (
                          <Box>
                            <Box
                              sx={{
                                flex: 1,
                                mt: 1.5,
                                fontWeight: 600,
                                pl: 0.5,
                                mb: 0.3,
                                color: '#54627B',
                              }}
                            >
                              <SpeakerPhoneIcon
                                sx={{
                                  p: 0.3,
                                  fontSize: 20,
                                  bgcolor: '#183A53',
                                  color: 'white',
                                  border: 1,
                                  borderRadius: 10,
                                  mb: 0.3,
                                }}
                              />
                              Device Name
                            </Box>
                            <Box
                              sx={{
                                flex: 1,
                                px: 0.5,
                                bgcolor: 'white',
                                mx: 0.8,
                                borderColor: '#ADC4D7',
                              }}
                            >
                              {deviceName}
                            </Box>
                            <Box
                              sx={{ flex: 1, mt: 1, fontWeight: 600, px: 0.5, color: '#54627B' }}
                            >
                              <PinDropIcon
                                sx={{
                                  p: 0.3,
                                  mb: 0.3,
                                  fontSize: 20,
                                  bgcolor: '#183A53',
                                  color: 'white',
                                  border: 1,
                                  borderRadius: 10,
                                }}
                              />
                              Location
                            </Box>

                            <Box
                              sx={{
                                flex: 1,
                                px: 0.5,
                                bgcolor: 'white',
                                mx: 0.8,
                                borderColor: '#868B8E',
                              }}
                            >
                              {location}
                            </Box>
                          </Box>
                        ) : null}
                        <Box sx={{ height: 8 }}></Box>
                      </Paper>
                    </Box>
                  ) : null}

                  <Box sx={{ flex: 1, mt: 3, color: '#183A53', fontWeight: 600 }}>
                    <ReceiptIcon
                      sx={{
                        p: 0.3,
                        mb: 0.3,
                        fontSize: 20,
                        bgcolor: '#183A53',
                        color: 'white',
                        border: 1,
                        borderRadius: 10,
                      }}
                    />
                    Bill Number/Invoice Number<span style={{ color: '#74112F' }}>*</span>
                  </Box>
                  <Box sx={{ flex: 5, mt: 0.1 }}>
                    <TextFieldCustom
                      style={{ borderRadius: 0 }}
                      placeholder="Bill Number/Invoice Number"
                      type="text"
                      size="sm"
                      name="billnumber"
                      value={billnumber}
                      onchange={MastBillUpdate}
                    ></TextFieldCustom>
                  </Box>
                  {bill_tariff !== 1 && bill_tariff !== 2 && bill_tariff !== 3 ? (
                    <Box>
                      <Box sx={{ flex: 1, mt: 3, fontWeight: 600, color: '#183A53' }}>
                        <NotesIcon
                          sx={{
                            p: 0.3,
                            mb: 0.3,
                            fontSize: 20,
                            bgcolor: '#183A53',
                            color: 'white',
                            border: 1,
                            borderRadius: 10,
                          }}
                        />
                        Bill Description
                      </Box>
                      <Box sx={{ flex: 1, mt: 0.1 }}>
                        <CssVarsProvider>
                          <Textarea
                            type="text"
                            size="sm"
                            placeholder="Bill Description"
                            variant="outlined"
                            minRows={2}
                            maxRows={4}
                            name="billdescription"
                            value={billdescription}
                            onChange={e => MastBillUpdate(e)}
                          ></Textarea>
                        </CssVarsProvider>
                      </Box>
                    </Box>
                  ) : null}
                  <Box sx={{ flex: 1, mt: 1.5, color: '#183A53', fontWeight: 600 }}>
                    <InsertInvitationIcon
                      sx={{
                        p: 0.3,
                        mb: 0.3,
                        fontSize: 20,
                        bgcolor: '#183A53',
                        color: 'white',
                        border: 1,
                        borderRadius: 10,
                      }}
                    />
                    Bill Date<span style={{ color: '#74112F' }}>*</span>
                  </Box>
                  <Box sx={{ flex: 5, mt: 0.1 }}>
                    <TextFieldCustom
                      style={{ borderRadius: 0 }}
                      type="datetime-local"
                      size="sm"
                      name="billdate"
                      value={billdate}
                      onchange={MastBillUpdate}
                    ></TextFieldCustom>
                  </Box>
                  <Box sx={{ flex: 1, mt: 2, color: '#183A53', fontWeight: 600 }}>
                    <InsertInvitationIcon
                      sx={{
                        p: 0.3,
                        mb: 0.3,
                        fontSize: 20,
                        bgcolor: '#183A53',
                        color: 'white',
                        border: 1,
                        borderRadius: 10,
                      }}
                    />
                    Bill Due Date<span style={{ color: '#74112F' }}>*</span>
                  </Box>
                  <Box sx={{ flex: 5, mt: 0.1 }}>
                    <TextFieldCustom
                      style={{ borderRadius: 0 }}
                      type="datetime-local"
                      size="sm"
                      name="billduedate"
                      value={billduedate}
                      onchange={MastBillUpdate}
                    ></TextFieldCustom>
                  </Box>
                  <Box sx={{ flex: 1, mt: 2, fontWeight: 600, color: '#183A53' }}>
                    <CurrencyRupeeIcon
                      sx={{
                        p: 0.3,
                        mb: 0.3,
                        fontSize: 20,
                        bgcolor: '#183A53',
                        color: 'white',
                        border: 1,
                        borderRadius: 10,
                      }}
                    />
                    Bill Amount<span style={{ color: '#74112F' }}>*</span>
                  </Box>
                  <Box sx={{ flex: 5, mt: 0.1 }}>
                    <TextFieldCustom
                      style={{ borderRadius: 0 }}
                      placeholder="0.00"
                      type="number"
                      size="sm"
                      name="billamount"
                      value={billamount}
                      onchange={MastBillUpdate}
                    ></TextFieldCustom>
                  </Box>
                  <Box sx={{ border: 0.1, my: 1, py: 0.5, borderColor: '#003B73' }}>
                    <Box sx={{ flex: 1, ml: 1, pt: 0.5 }}>
                      <Checkbox
                        label="Bill Paid "
                        color="primary"
                        sx={{ color: '#183A53', fontWeight: 600 }}
                        onChange={e => PayedStatus(e)}
                        checked={payedStatus}
                      />
                    </Box>
                    {payedCheck === 1 ? (
                      <>
                        <Box sx={{ flex: 1, mt: 1, fontWeight: 600, color: '#183A53', mx: 0.5 }}>
                          <InsertInvitationIcon
                            sx={{
                              p: 0.3,
                              mb: 0.3,
                              fontSize: 20,
                              bgcolor: '#183A53',
                              color: 'white',
                              border: 1,
                              borderRadius: 10,
                            }}
                          />
                          Bill Paid Date<span style={{ color: '#74112F' }}>*</span>
                        </Box>
                        <Box sx={{ flex: 1, mx: 1 }}>
                          <TextFieldCustom
                            style={{ borderRadius: 0 }}
                            type="datetime-local"
                            size="sm"
                            name="billpaiddate"
                            value={billpaiddate}
                            onchange={MastBillUpdate}
                          ></TextFieldCustom>
                        </Box>
                      </>
                    ) : null}
                  </Box>
                  <Box sx={{ flex: 1, fontSize: 15, color: '#003060', fontWeight: 600 }}>
                    <FileUploadOutlinedIcon
                      sx={{
                        p: 0.3,
                        mb: 0.3,
                        fontSize: 20,
                        bgcolor: '#183A53',
                        color: 'white',
                        border: 1,
                        borderRadius: 10,
                      }}
                    />
                    Upload Files
                  </Box>
                  <Box
                    sx={{
                      border: '1px',
                      borderStyle: 'dashed',
                      mt: 0.5,
                      py: 0.5,
                      borderColor: '#41729F',
                      pl: 0.5,
                      borderRadius: '2px',
                      minHeight: 60,
                      flex: 1,
                    }}
                  >
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', mt: 2 }}>
                      <label htmlFor="file-input">
                        <Box sx={{ cursor: 'pointer', fontWeight: 600, color: '#145DA0' }}>
                          <AttachmentIcon sx={{ fontWeight: 800, color: '#145DA0' }} />
                          Choose Files (Bills)
                        </Box>
                      </label>
                    </Box>
                    <Box sx={{ flex: 6, mr: 0.5 }}>
                      <input
                        id="file-input"
                        type="file"
                        accept=".jpg, .jpeg, .png, .pdf"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        name="file"
                        multiple // Add this attribute to allow multiple file selections
                      />
                      {selectFile &&
                        selectFile.map((file, index) => (
                          <Box
                            sx={{
                              display: 'flex',
                              backgroundColor: '#D6E2E8',
                              mx: 1,
                              borderRadius: 8,
                              my: 0.5,
                              px: 1,
                              border: 1,
                              borderColor: '#0C2D48',
                            }}
                            key={index}
                          >
                            <Box sx={{ flex: 1 }}>{file.name}</Box>
                            <CloseIcon
                              size={'sm'}
                              sx={{ cursor: 'pointer', width: 20, '&:hover': { color: '#055C9D' } }}
                              onClick={() => handleRemoveFile(index)}
                            />
                          </Box>
                        ))}
                    </Box>
                  </Box>
                  {file_upload_status === 1 ? (
                    <Box sx={{ mt: 1 }}>
                      <Box
                        sx={{
                          m: 0.5,
                          borderRadius: 8,
                          width: 134,
                          pl: 1,
                          fontSize: 13,
                          bgcolor: '#5F7950',
                          color: '#F8F8F0',
                          py: 0.5,
                          cursor: 'pointer',
                          '&:hover': {
                            boxShadow: '1px 2px 10px',
                            bgcolor: '#A4AA83',
                            color: '#4C411A',
                          },
                        }}
                        onClick={openBillModal}
                      >
                        <FilePresentIcon
                          sx={{
                            cursor: 'pointer',
                            color: '#F8F8F0',
                            height: 23,
                            width: 23,
                            '&:hover': {
                              color: '#4C411A',
                            },
                          }}
                        />
                        &nbsp;Uploaded bills
                      </Box>
                    </Box>
                  ) : null}
                </Box>

                <Box
                  sx={{
                    height: 40,
                    my: 1,
                    borderRadius: 0,
                    fontSize: 18,
                    fontWeight: 600,
                    bgcolor: '#0B6BCB',
                    color: '#F8F8F0',
                    cursor: 'pointer',
                    py: 1,
                    textAlign: 'center',
                    '&:hover': {
                      boxShadow: '1px 2px 3px',
                      bgcolor: '#7E9DC2',
                      fontWeight: 600,
                      color: 'black',
                    },
                  }}
                  onClick={updateBilling}
                >
                  &nbsp; Update bills
                </Box>
              </Box>
            </Box>
          </ModalDialog>
        </Box>
      </Modal>
    </Box>
  )
}

export default memo(UpdatePendingModal)
