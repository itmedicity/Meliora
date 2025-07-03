import React, { Fragment, useCallback, useState, memo } from 'react'
import Slide from '@mui/material/Slide'
import { ToastContainer } from 'react-toastify'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { Box, Paper } from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import ApprovalCompnt from '../DepartmentApprovals/ApprovalCompnt'
import { format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useEffect } from 'react'
import ItemApprovalCmp from '../DepartmentApprovals/ItemApprovalCmp'
import { CssVarsProvider, Typography } from '@mui/joy'
import { TypoHeadColor } from 'src/color/Color'
import ReqImageDisplayModal from '../RequestRegister/ReqImageDisplayModal'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import CustomTextarea from 'src/views/Components/CustomTextarea'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})

const InchargeApprovModal = ({ open, setOpen, isIncharge, ishod, datas, count, setCount, id }) => {
  const {
    req_slno,
    req_date,
    actual_requirement,
    needed,
    location,
    dept_name,
    req_userdeptsec,
    expected_date,
    req_user,
    userdeptsec,
    image_status,
    incharge_approve,
    incharge_remark,
    inch_detial_analysis,
    req_approv_slno,
    category,
  } = datas[0]
  const reqdate = format(new Date(req_date), 'dd-MM-yyyy')
  const expdate = format(new Date(expected_date), 'dd-MM-yyyy')

  useEffect(() => {
    if (incharge_approve !== null && isIncharge === 1) {
      setRemark(incharge_remark !== null ? incharge_remark : '')
      setApprove(incharge_approve === 1 ? true : false)
      setReject(incharge_approve === 2 ? true : false)
      setPending(incharge_approve === 3 ? true : false)
      setDetailAnalis(incharge_approve === 1 ? inch_detial_analysis : '')
    }
  }, [incharge_approve, inch_detial_analysis, incharge_remark, isIncharge])

  //state for Remarks
  const [remark, setRemark] = useState('')
  const updateRemark = useCallback(e => {
    setRemark(e.target.value)
  }, [])

  const [Closeremark, setCloseRemark] = useState('')
  const updateCloseRemark = useCallback(e => {
    setCloseRemark(e.target.value)
  }, [])

  const [detailAnalis, setDetailAnalis] = useState('')
  const updatedetailAnalis = useCallback(e => {
    setDetailAnalis(e.target.value)
  }, [])

  const [approve, setApprove] = useState(false)
  const [reject, setReject] = useState(false)
  const [pending, setPending] = useState(false)
  const updateApprove = useCallback(e => {
    if (e.target.checked === true) {
      setApprove(true)
      setReject(false)
      setPending(false)
    } else {
      setApprove(false)
      setReject(false)
      setPending(false)
      setRemark('')
    }
  }, [])
  const updateReject = useCallback(e => {
    if (e.target.checked === true) {
      setReject(true)
      setApprove(false)
      setPending(false)
      setRemark('')
    } else {
      setApprove(false)
      setReject(false)
      setPending(false)
      setRemark('')
    }
  }, [])

  const updatePending = useCallback(e => {
    if (e.target.checked === true) {
      setPending(true)
      setApprove(false)
      setReject(false)
      setRemark('')
    } else {
      setPending(false)
      setApprove(false)
      setReject(false)
      setRemark('')
    }
  }, [])

  const [dataPost, setdataPost] = useState([])
  const [tableDis, setTableDis] = useState(0)

  useEffect(() => {
    const InsertFun = async req_slno => {
      const result = await axioslogin.get(`/requestRegister/getItemList/${req_slno}`)
      const { success, data } = result.data
      if (success === 1) {
        setdataPost(data)
        setTableDis(1)
      } else {
        setTableDis(0)
      }
    }

    const getImage = async req_slno => {
      const result = await axioslogin.get(`/CrfImageUpload/crfRegimageGet/${req_slno}`)
      const { success, data } = result.data
      if (success === 1) {
        const fileNames = data
        const fileUrls = fileNames.map(fileName => {
          return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`
        })
        setImageArry(fileUrls)
      }
    }
    InsertFun(req_slno)
    getImage(req_slno)
  }, [req_slno])

  const [closeCrf, setCloseCrf] = useState(false)

  const updateCrf = useCallback(e => {
    if (e.target.checked === true) {
      setCloseCrf(true)
    } else {
      setCloseCrf(false)
    }
  }, [])

  const submit = useCallback(
    e => {
      e.preventDefault()
      const reset = () => {
        setOpen(false)
        setApprove(false)
        setReject(false)
        setPending(false)
        setRemark('')
        setDetailAnalis('')
        setCloseRemark('')
        setdataPost([])
        setTableDis(0)
        setCloseCrf(false)
        setImageShowFlag(0)
        setImageShow(false)
        setImageArry([])
      }
      const updateInchApproval = async patchdatainch => {
        const result = await axioslogin.patch('/requestRegister/approval/incharge', patchdatainch)
        const { success, message } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          reset()
        } else {
          warningNotify(message)
        }
      }

      const updateClosedCrf = async crfClosePatch => {
        const result = await axioslogin.patch('/requestRegister/crfClose', crfClosePatch)
        const { success, message } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          reset()
        } else {
          warningNotify(message)
        }
      }

      const patchdatainch = {
        incharge_approve: approve === true ? 1 : reject === true ? 2 : pending === true ? 3 : null,
        incharge_remarks: reject === true || pending === true || approve === true ? remark : null,
        inch_detial_analysis: approve === true ? detailAnalis : null,
        incharge_apprv_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        req_approv_slno: req_approv_slno,
        incharge_user: id,
        req_slno: req_slno,
      }

      if (closeCrf === true) {
        if (Closeremark !== '') {
          const crfClosePatch = {
            crf_close: 1,
            crf_close_remark: Closeremark,
            crf_close_user: id,
            crf_closed_one: 'HOD',
            close_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            req_slno: req_slno,
          }
          updateClosedCrf(crfClosePatch)
        } else {
          warningNotify('Please Enter Close Remarks')
        }
      } else {
        if (approve !== false || reject !== false || pending !== false) {
          if (remark !== '') {
            updateInchApproval(patchdatainch)
          } else {
            warningNotify('Justification must be Entered')
          }
        } else {
          warningNotify('Please Select any status')
        }
      }
    },
    [
      approve,
      reject,
      pending,
      remark,
      detailAnalis,
      req_slno,
      req_approv_slno,
      count,
      setCount,
      setOpen,
      id,
      Closeremark,
      closeCrf,
    ]
  )

  const [imageshowFlag, setImageShowFlag] = useState(0)
  const [imageshow, setImageShow] = useState(false)
  const [imagearray, setImageArry] = useState([])

  const ViewImage = useCallback(() => {
    setImageShowFlag(1)
    setImageShow(true)
  }, [])

  const handleClose = useCallback(() => {
    setImageShowFlag(0)
    setImageShow(false)
  }, [])

  // reset
  const Close = useCallback(() => {
    setOpen(false)
    setApprove(false)
    setReject(false)
    setPending(false)
    setRemark('')
    setDetailAnalis('')
    setCloseRemark('')
    setdataPost([])
    setTableDis(0)
    setCloseCrf(false)
    setImageShowFlag(0)
    setImageShow(false)
    setImageArry([])
  }, [setOpen])

  return (
    <Fragment>
      <ToastContainer />
      {imageshowFlag === 1 ? (
        <ReqImageDisplayModal open={imageshow} handleClose={handleClose} images={imagearray} />
      ) : null}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="md"
        aria-describedby="alert-dialog-slide-descriptiona"
      >
        <DialogContent
          id="alert-dialog-slide-descriptiona"
          sx={{
            width: '100%',
            height: 540,
          }}
        >
          <DialogContentText id="alert-dialog-slide-descriptiona">
            Request Approval
          </DialogContentText>

          <Box sx={{ width: '100%', mt: 0 }}>
            <Paper variant="outlined" sx={{ p: 0, mt: 1 }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    md: 'column',
                    lg: 'column',
                    xl: 'column',
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    p: 0.5,
                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row' },
                  }}
                >
                  <Box sx={{ pr: 1 }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontSize: 15 }}>Request No: CRF/TMC/{req_slno}</Typography>
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{ pl: 4 }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontSize: 15 }}>Req.Date: {reqdate}</Typography>
                    </CssVarsProvider>
                  </Box>
                </Box>
                {actual_requirement !== null ? (
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      p: 0.5,
                      flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row' },
                    }}
                  >
                    <Box sx={{ width: '25%' }}>
                      <CssVarsProvider>
                        <Typography sx={{ fontSize: 15 }}>Actual Requirement:</Typography>
                      </CssVarsProvider>
                    </Box>
                    <Paper
                      sx={{
                        width: '75%',
                        minHeight: 10,
                        maxHeight: 70,
                        pl: 0.5,
                        fontSize: 15,
                        textTransform: 'capitalize',
                        overflow: 'auto',
                        '::-webkit-scrollbar': { display: 'none' },
                      }}
                      variant="none"
                    >
                      {actual_requirement}
                    </Paper>
                  </Box>
                ) : null}
                {needed !== null ? (
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      p: 0.5,
                      flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row' },
                    }}
                  >
                    <Box sx={{ width: '25%' }}>
                      <CssVarsProvider>
                        <Typography sx={{ fontSize: 15 }}>Justification for need:</Typography>
                      </CssVarsProvider>
                    </Box>
                    <Paper
                      sx={{
                        width: '75%',
                        minHeight: 10,
                        maxHeight: 70,
                        pl: 0.5,
                        fontSize: 15,
                        textTransform: 'capitalize',
                        overflow: 'auto',
                        '::-webkit-scrollbar': { display: 'none' },
                      }}
                      variant="none"
                    >
                      {needed}
                    </Paper>
                  </Box>
                ) : null}
                {location !== null ? (
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      p: 0.5,
                      flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row' },
                    }}
                  >
                    <Box sx={{ width: '25%' }}>
                      <CssVarsProvider>
                        <Typography sx={{ fontSize: 15 }}>Location:</Typography>
                      </CssVarsProvider>
                    </Box>
                    <Paper
                      sx={{
                        width: '75%',
                        minHeight: 10,
                        maxHeight: 70,
                        pl: 0.5,
                        fontSize: 15,
                        textTransform: 'capitalize',
                        overflow: 'auto',
                        '::-webkit-scrollbar': { display: 'none' },
                      }}
                      variant="none"
                    >
                      {location}
                    </Paper>
                  </Box>
                ) : null}
                {category !== null ? (
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      p: 0.5,
                      flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row' },
                    }}
                  >
                    <Box sx={{ width: '25%' }}>
                      <CssVarsProvider>
                        <Typography sx={{ fontSize: 15 }}>Category:</Typography>
                      </CssVarsProvider>
                    </Box>
                    <Paper
                      sx={{
                        width: '75%',
                        minHeight: 10,
                        maxHeight: 70,
                        pl: 0.5,
                        fontSize: 15,
                        textTransform: 'capitalize',
                        overflow: 'auto',
                        '::-webkit-scrollbar': { display: 'none' },
                      }}
                      variant="none"
                    >
                      {category}
                    </Paper>
                  </Box>
                ) : null}
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    p: 0.5,
                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row' },
                  }}
                >
                  <Box sx={{ width: '25%' }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontSize: 15 }}>Department:</Typography>
                    </CssVarsProvider>
                  </Box>
                  <Paper
                    sx={{
                      width: '75%',
                      minHeight: 10,
                      maxHeight: 70,
                      pl: 0.5,
                      fontSize: 15,
                      textTransform: 'capitalize',
                      overflow: 'auto',
                      '::-webkit-scrollbar': { display: 'none' },
                    }}
                    variant="none"
                  >
                    {dept_name !== null ? dept_name.toLowerCase() : 'Not Updated'}
                  </Paper>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    p: 0.5,
                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row' },
                  }}
                >
                  <Box sx={{ width: '25%' }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontSize: 15 }}>Department Section:</Typography>
                    </CssVarsProvider>
                  </Box>
                  <Paper
                    sx={{
                      width: '75%',
                      minHeight: 10,
                      maxHeight: 70,
                      pl: 0.5,
                      fontSize: 15,
                      textTransform: 'capitalize',
                      overflow: 'auto',
                      '::-webkit-scrollbar': { display: 'none' },
                    }}
                    variant="none"
                  >
                    {req_userdeptsec !== null ? req_userdeptsec.toLowerCase() : 'Not Updated'}
                  </Paper>
                </Box>

                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    p: 0.5,
                    pb: 0,
                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row' },
                  }}
                >
                  <Box sx={{ pr: 9 }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontSize: 15 }}>Expected Date: {expdate}</Typography>
                    </CssVarsProvider>
                  </Box>
                </Box>
                <Box sx={{ p: 0.5 }}>
                  <CssVarsProvider>
                    <Typography sx={{ fontSize: 15, textTransform: 'capitalize' }}>
                      Requested User: {req_user !== null ? req_user.toLowerCase() : 'Not Updated'}
                    </Typography>
                  </CssVarsProvider>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    p: 0.5,
                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row' },
                  }}
                >
                  <CssVarsProvider>
                    <Typography sx={{ fontSize: 15, textTransform: 'capitalize' }}>
                      Requested DeptSec:{' '}
                      {userdeptsec !== null ? userdeptsec.toLowerCase() : 'Not Updated'}
                    </Typography>
                  </CssVarsProvider>
                  {image_status === 1 ? (
                    <Box sx={{ display: 'flex', width: '20%', height: 30, pl: 3 }}>
                      <Button onClick={ViewImage} variant="contained" color="primary">
                        View Image
                      </Button>
                    </Box>
                  ) : null}
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    p: 0.5,
                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row' },
                  }}
                >
                  {tableDis === 1 ? (
                    <ItemApprovalCmp dataPost={dataPost} setdataPost={setdataPost} />
                  ) : null}
                </Box>
              </Box>
            </Paper>
          </Box>

          <Box sx={{ width: '100%', mt: 0 }}>
            <Paper variant="outlined" sx={{ mt: 1 }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    p: 1,
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ pr: 9 }}>
                    <CssVarsProvider>
                      <Typography sx={{ fontWeight: 900, fontSize: 14, color: TypoHeadColor }}>
                        Department Approval
                      </Typography>
                    </CssVarsProvider>
                  </Box>

                  {closeCrf === false ? (
                    <ApprovalCompnt
                      heading="Incharge Approval"
                      approve={approve}
                      reject={reject}
                      pending={pending}
                      remark={remark}
                      detailAnalis={detailAnalis}
                      updatedetailAnalis={updatedetailAnalis}
                      updateRemark={updateRemark}
                      updateApprove={updateApprove}
                      updateReject={updateReject}
                      updatePending={updatePending}
                    />
                  ) : null}
                </Box>
              </Box>
            </Paper>
          </Box>
          <Paper variant="outlined" sx={{ mt: 1 }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                pl: 2,
                pt: 0,
                fontSize: 15,
              }}
            >
              <Box sx={{ width: '20%', mt: 1 }}>
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
                <Box sx={{ width: '60%', mt: 1 }}>
                  <CustomTextarea
                    required
                    type="text"
                    size="sm"
                    style={{
                      width: '100%',
                      height: 70,
                      boardColor: '#E0E0E0',
                    }}
                    placeholder=" Remarks"
                    value={Closeremark}
                    onchange={updateCloseRemark}
                  />
                </Box>
              ) : null}
            </Box>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={submit}>
            Save
          </Button>
          <Button onClick={Close} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default memo(InchargeApprovModal)
