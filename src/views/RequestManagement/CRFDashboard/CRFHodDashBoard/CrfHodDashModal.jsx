import React, { Fragment, useCallback, useState, memo } from 'react'
import Slide from '@mui/material/Slide'
import { ToastContainer } from 'react-toastify'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { Box, Paper } from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useEffect } from 'react'
import { CssVarsProvider, Typography } from '@mui/joy'
import { TypoHeadColor } from 'src/color/Color'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import ApprovalCompnt from '../../DepartmentApprovals/ApprovalCompnt'
import ReqImageDisplayModal from '../../RequestRegister/ReqImageDisplayModal'
import { useSelector } from 'react-redux'
import ItemApprovalCmp from '../../DepartmentApprovals/ItemApprovalCmp'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})

const CrfHodDashModal = ({ open, setOpen, datas, count, setCount }) => {
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
    incharge,
    incharge_remark,
    inch_detial_analysis,
    incharge_apprv_date,
    incharge_user,
    hod_approve,
    hod_remarks,
    hod_detial_analysis,
    req_approv_slno,
    category,
  } = datas[0]
  const reqdate = format(new Date(req_date), 'dd-MM-yyyy')
  const expdate = format(new Date(expected_date), 'dd-MM-yyyy')
  const inchargeApprovdate =
    incharge_apprv_date !== null
      ? format(new Date(incharge_apprv_date), 'dd-MM-yyyy')
      : 'Not Updated'

  //redux for geting login id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  useEffect(() => {
    if (hod_approve !== null) {
      setRemark(hod_remarks !== null ? hod_remarks : '')
      setApprove(hod_approve === 1 ? true : false)
      setReject(hod_approve === 2 ? true : false)
      setPending(hod_approve === 3 ? true : false)
      setDetailAnalis(hod_approve === 1 ? hod_detial_analysis : null)
    }
  }, [hod_approve, hod_remarks, hod_detial_analysis])

  //state for Remarks
  const [remark, setRemark] = useState('')
  const updateRemark = useCallback(e => {
    setRemark(e.target.value)
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
      }

      const updatehodApproval = async patchdatahod => {
        const result = await axioslogin.patch('/requestRegister/approval/hod', patchdatahod)
        const { success, message } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          reset()
        } else {
          warningNotify(message)
        }
      }
      const patchdatahod = {
        hod_approve: approve === true ? 1 : reject === true ? 2 : pending === true ? 3 : null,
        hod_remarks: reject === true || pending === true || approve === true ? remark : null,
        hod_detial_analysis: approve === true ? detailAnalis : null,
        hod_approve_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        req_approv_slno: req_approv_slno,
        hod_user: id,
        req_slno: req_slno,
      }
      if (approve !== false || reject !== false || pending !== false) {
        if (approve === true) {
          if (detailAnalis !== '' && remark !== '') {
            updatehodApproval(patchdatahod)
          } else {
            warningNotify('Detail Analysis && Remarks must be Entered')
          }
        } else {
          updatehodApproval(patchdatahod)
        }
      } else {
        warningNotify('Please Select any status')
      }
    },
    [
      approve,
      reject,
      pending,
      remark,
      detailAnalis,
      req_slno,
      id,
      req_approv_slno,
      count,
      setCount,
      setOpen,
    ]
  )

  // reset
  const Close = useCallback(() => {
    setOpen(false)
    setApprove(false)
    setReject(false)
    setPending(false)
    setRemark('')
    setDetailAnalis('')
  }, [setOpen])
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
                  p: 1,
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
                </Box>
                <Box sx={{ width: '100%' }}>
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
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <CssVarsProvider>
                        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                          Incharge :
                          {incharge_approve === 1 ? (
                            <Typography
                              ml={2}
                              sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}
                              color="success"
                              variant="outlined"
                            >
                              {' '}
                              {incharge}
                            </Typography>
                          ) : incharge_approve === 2 ? (
                            <Typography
                              ml={2}
                              sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}
                              color="danger"
                              variant="outlined"
                            >
                              {' '}
                              {incharge}
                            </Typography>
                          ) : incharge_approve === 3 ? (
                            <Typography
                              ml={2}
                              sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}
                              color="primary"
                              variant="outlined"
                            >
                              {' '}
                              {incharge}
                            </Typography>
                          ) : null}
                        </Typography>
                      </CssVarsProvider>
                      {incharge_apprv_date !== null ? (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            pr: 2,
                          }}
                        >
                          <CssVarsProvider>
                            <Typography
                              ml={2}
                              variant="outlined"
                              color="primary"
                              sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}
                            >
                              {inchargeApprovdate}
                            </Typography>
                            <Typography ml={2} sx={{ fontSize: 15 }}>
                              /{' '}
                            </Typography>
                            <Typography
                              ml={2}
                              variant="outlined"
                              color="primary"
                              sx={{
                                fontSize: 13,
                                px: 1,
                                pb: 0.4,
                                borderRadius: 5,
                                textTransform: 'capitalize',
                              }}
                            >
                              {incharge_user}{' '}
                            </Typography>
                          </CssVarsProvider>{' '}
                        </Box>
                      ) : null}
                    </Box>
                    {incharge_approve === 1 ? (
                      <Box sx={{ width: '100%' }}>
                        <CssVarsProvider>
                          <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                            Detail Justification/ Requirement Description:{' '}
                          </Typography>
                          <Typography ml={10} sx={{ fontSize: 15 }}>
                            {incharge_remark}{' '}
                          </Typography>
                        </CssVarsProvider>
                        <CssVarsProvider>
                          <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                            Detailed Analysis of Requirement:{' '}
                          </Typography>
                          <Typography ml={10} sx={{ fontSize: 15 }}>
                            {inch_detial_analysis}{' '}
                          </Typography>
                        </CssVarsProvider>{' '}
                      </Box>
                    ) : incharge_approve === 2 ? (
                      <Box sx={{ width: '100%' }}>
                        <CssVarsProvider>
                          <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                            Detail Justification for Reject:{' '}
                          </Typography>
                          <Typography ml={10} sx={{ fontSize: 15 }}>
                            {incharge_remark}{' '}
                          </Typography>
                        </CssVarsProvider>
                      </Box>
                    ) : incharge_approve === 3 ? (
                      <Box sx={{ width: '100%' }}>
                        <CssVarsProvider>
                          <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                            Detail Justification for On-Hold:{' '}
                          </Typography>
                          <Typography ml={10} sx={{ fontSize: 15 }}>
                            {incharge_remark}{' '}
                          </Typography>
                        </CssVarsProvider>
                      </Box>
                    ) : null}
                  </Box>
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
                  <ApprovalCompnt
                    heading="Hod Approval"
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
                </Box>
              </Box>
            </Paper>
          </Box>
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

export default memo(CrfHodDashModal)
