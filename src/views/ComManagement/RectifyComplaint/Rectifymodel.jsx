import React, { Fragment, useState, useEffect, memo, useCallback, useMemo } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import DialogContent from '@mui/material/DialogContent'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
// import { ToastContainer } from 'react-toastify'
import { Box, Paper, Typography, Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import { errorNotify, infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import CustomTextarea from 'src/views/Components/CustomTextarea'
import { format } from 'date-fns'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import Checkbox from '@mui/material/Checkbox'
import { useSelector } from 'react-redux'
import AssetListUnderDeptSec from './AssetListUnderDeptSec'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})
const Rectifymodel = ({ open, setOpen, detail, count, setCount, empName, setempname }) => {
  //redux for geting login id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  //intialisation
  const [rectify, setrectify] = useState({
    complaint_slno: 0,
    complaint_desc: '',
    req_type_name: '',
    complaint_dept_name: '',
    complaint_type_name: '',
    hic_policy_name: '',
    compalint_date: '',
    location: '',
    cm_location: '',
  })
  const [assignRemark, SetAssignRemark] = useState('')
  //destrucutring
  const {
    complaint_slno,
    complaint_desc,
    sec_name,
    em_name,
    date,
    Time,
    compalint_status,
    location,
    cm_location,
  } = rectify

  const [select, setSelect] = useState(false)
  const updateSelect = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setSelect({ ...select, [e.target.name]: value })
  }
  const [Employee, setEmployee] = useState([])
  const getemp = (e, v) => {
    if (e === true) {
      const obj = {
        emids: v,
      }
      setEmployee([...Employee, obj])
    } else {
      const obj = {
        emids: v,
      }
      const newarry = Employee.filter(val => {
        return val.emids !== obj.emids
      })
      setEmployee(newarry)
    }
  }

  useEffect(() => {
    const rectifyfunction = () => {
      const {
        complaint_slno,
        complaint_desc,
        req_type_name,
        complaint_dept_name,
        complaint_type_name,
        hic_policy_name,
        compalint_date,
        sec_name,
        em_name,
        location,
        cm_location,
        date,
        Time,
        compalint_status,
        complaint_remark,
        cm_rectify_status,
        rectify_pending_hold_remarks,
      } = detail[0]
      const frmdata = {
        complaint_slno: complaint_slno,
        complaint_desc: complaint_desc,
        req_type_name: req_type_name,
        complaint_dept_name: complaint_dept_name,
        complaint_type_name: complaint_type_name,
        hic_policy_name: hic_policy_name,
        compalint_date: compalint_date,
        sec_name: sec_name,
        em_name: em_name,
        date: date,
        Time: Time,
        compalint_status: compalint_status,
        location: location,
        cm_location: cm_location,
      }
      setrectify(frmdata)
      setHold(cm_rectify_status === 'O' ? true : false)
      setPendhold(rectify_pending_hold_remarks)
      // setPending(cm_rectify_status === 'P' ? true : false);
      SetAssignRemark(complaint_remark === null ? 'Not Given' : complaint_remark)
    }
    rectifyfunction()
  }, [detail])
  const [assetDetalDataFlag, setAssetDetlDataFlag] = useState(0)
  const [assetDetalData, setAssetDetlData] = useState([])
  useEffect(() => {
    const getAssetDetails = async complaint_slno => {
      const result = await axioslogin.get(`Rectifycomplit/AssetDetailsGet/${complaint_slno}`)
      const { success, data } = result.data
      if (success === 1) {
        setAssetDetlDataFlag(1)
        setAssetDetlData(data)
      } else {
        setAssetDetlDataFlag(0)
        setAssetDetlData([])
      }
    }
    if (complaint_slno !== 0) {
      getAssetDetails(complaint_slno)
    }
  }, [complaint_slno])

  const [hold, setHold] = useState(false)
  const [rectified, setRectify] = useState(false)
  const [flag, setFlag] = useState(0)

  const updateHold = useCallback(e => {
    if (e.target.checked === true) {
      setHold(true)
      // setPending(false)
      setRectify(false)
      setFlag(2)
    } else {
      setFlag(0)
      setHold(false)
    }
  }, [])

  const updateRectified = useCallback(e => {
    if (e.target.checked === true) {
      setRectify(true)
      setHold(false)
      // setPending(false)
      setFlag(0)
    } else {
      setFlag(0)
      setRectify(false)
    }
  }, [])

  const [pendholdreason, setPendhold] = useState('')
  const updatePendhold = useCallback(e => {
    setPendhold(e.target.value)
  }, [])
  // data setting to update the complaint mast table and complaint detail table
  const patchData =
    Employee &&
    Employee.map(val => {
      return {
        compalint_status: rectified === true ? 2 : compalint_status,
        cm_rectify_status: hold === true ? 'O' : rectified === true ? 'R' : null,
        cm_rectify_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        rectify_pending_hold_remarks:
          hold === true ? pendholdreason : rectified === true ? pendholdreason : null,
        pending_onhold_time: hold === true ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : null,
        pending_onhold_user: id,
        assigned_emp: val.emids,
        verify_spervsr: 0,
        complaint_slno: complaint_slno,
      }
    })
  // function to database update
  const rectifycmplt = useCallback(
    e => {
      e.preventDefault()
      const resetFrmdata = {
        complaint_slno: 0,
        complaint_desc: '',
        req_type_name: '',
        complaint_dept_name: '',
        complaint_type_name: '',
        hic_policy_name: '',
        compalint_date: '',
      }
      const updateFun = async patchData => {
        const result = await axioslogin.patch(`/Rectifycomplit/updatecmp`, patchData)
        const { success, message } = result.data
        if (success === 2) {
          setCount(count + 1)
          setOpen(false)
          setrectify(resetFrmdata)
          // setPending(false)
          setHold(false)
          setRectify(false)
          setSelect(false)
          setPendhold('')
          setEmployee([])
          setempname([])
          succesNotify(message)
        } else {
          errorNotify('Error Occured')
        }
      }
      if (hold === true || (rectified === true && Employee.length !== 0)) {
        updateFun(patchData)
      } else {
        infoNotify('Please Select any employee Or Choose Any Option')
      }
    },
    [patchData, count, setCount, setOpen, hold, rectified, Employee, setempname]
  )
  //modal close function
  const handleClose = () => {
    setOpen(false)
    setFlag(0)
    setRectify(false)
    // setPending(false);
    setHold(false)
    setPendhold('')
    setSelect(false)
    setEmployee([])
  }

  const [assetAddFls, setAssetAddFlag] = useState(0)
  const [cmAssetSlno, setCmAssetSlno] = useState(0)

  const AddAssetDetaiils = useCallback(() => {
    setAssetAddFlag(1)
  }, [])

  const postdata = useMemo(() => {
    return {
      cm_complait_slno: complaint_slno,
      cm_am_assetmap_slno: cmAssetSlno,
      create_user: id,
    }
  }, [complaint_slno, cmAssetSlno, id])

  const AddAssetToComplaint = useCallback(() => {
    const InsertFun = async postdata => {
      const result = await axioslogin.post('Rectifycomplit/AssetMappComplaint', postdata)
      const { message, success } = result.data
      if (success === 1) {
        succesNotify(message)
      } else {
        infoNotify(message)
      }
    }
    if (cmAssetSlno !== 0) {
      InsertFun(postdata)
    } else {
      warningNotify('Plase select any Asset before Add')
    }
  }, [postdata, cmAssetSlno])

  return (
    <Fragment>
      {/* <ToastContainer /> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="md"
        aria-describedby="alert-dialog-slide-descriptiona"
      >
        <DialogTitle>{'Complaint Rectification'}</DialogTitle>
        <DialogContent
          sx={{
            width: '100%',
            height: 500,
          }}
        >
          <Box sx={{ width: '100%', mt: 0 }}>
            <Box>
              <Paper square elevation={3} sx={{ p: 2, mt: 1, pt: 0 }}>
                {/* 2nd section */}
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                    p: 0.5,
                    mt: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%' },
                    }}
                  >
                    <Typography>Complaint Department</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%' },
                    }}
                  >
                    <Typography>{sec_name}</Typography>
                  </Box>
                  <Box></Box>
                </Box>
                {/* 3rd section */}
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                    p: 0.5,
                    mt: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%' },
                    }}
                  >
                    <Typography>Assigned Employee</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%' },
                    }}
                  >
                    <Typography>{em_name}</Typography>
                  </Box>
                  <Box></Box>
                </Box>
                {/* 4th section */}
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                    p: 0.5,
                    mt: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%' },
                    }}
                  >
                    <Typography>Date & Time</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%' },
                    }}
                  >
                    <Typography>
                      {date} & {Time}
                    </Typography>
                  </Box>
                  <Box></Box>
                </Box>
                {/* 5th section */}
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                    p: 0.5,
                    mt: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%' },
                    }}
                  >
                    <Typography>Location</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%' },
                    }}
                  >
                    <Typography>{location}</Typography>
                  </Box>
                  <Box></Box>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                    p: 0.5,
                    mt: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%' },
                    }}
                  >
                    <Typography>Assign Remarks</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%' },
                    }}
                  >
                    <Typography>{assignRemark}</Typography>
                  </Box>
                  <Box></Box>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                    p: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                    }}
                  >
                    <Typography sx={{ textAlign: 'center' }}>Complaint Description</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                    p: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%' },
                      mt: 0,
                    }}
                  >
                    <CustomTextarea
                      style={{ width: '100%' }}
                      minRows={3}
                      value={complaint_desc}
                      disabled
                    />
                  </Box>
                </Box>
                {assetDetalDataFlag === 1 ? (
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      p: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        width: '100%',
                      }}
                    >
                      <Typography sx={{ textAlign: 'center' }}>Asset Detail</Typography>
                    </Box>

                    <Box sx={{ p: 1 }}>
                      <TableContainer sx={{ maxHeight: 250 }}>
                        <Table
                          size="small"
                          stickyHeader
                          aria-label="sticky table"
                          sx={{ border: '0.2px solid' }}
                        >
                          <TableHead sx={{ border: '1px ' }}>
                            <TableRow>
                              <TableCell align="center">Sl No</TableCell>
                              <TableCell align="left"> Item Name</TableCell>
                              <TableCell align="left">Asset No</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {assetDetalData?.map((val, index) => {
                              return (
                                <TableRow
                                  key={index}
                                  sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    maxHeight: 60,
                                    minHeight: 5,
                                  }}
                                >
                                  <TableCell align="center">{index + 1}</TableCell>
                                  <TableCell align="left">{val.item_name}</TableCell>
                                  <TableCell align="left">{val.am_asset_no}</TableCell>
                                </TableRow>
                              )
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Box>
                ) : null}
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%' },
                      mt: 0,
                    }}
                  >
                    <Box sx={{ display: 'flex', width: '40%', height: 30, pl: 3 }}>
                      <Button
                        onClick={() => AddAssetDetaiils()}
                        variant="contained"
                        color="primary"
                      >
                        Add Asset Details
                      </Button>
                    </Box>
                  </Box>
                  {assetAddFls === 1 ? (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        pt: 1,
                      }}
                    >
                      <Box sx={{ width: '40%', p: 1 }}>
                        <AssetListUnderDeptSec
                          cm_location={cm_location}
                          cmAssetSlno={cmAssetSlno}
                          setCmAssetSlno={setCmAssetSlno}
                        />
                      </Box>
                      <Box sx={{ width: '5%', pl: 1, pt: 1, cursor: 'pointer' }}>
                        <Tooltip title="Add Asset" placement="top">
                          <AddCircleOutlineIcon
                            color="primary"
                            onClick={() => AddAssetToComplaint()}
                          />
                        </Tooltip>
                      </Box>
                    </Box>
                  ) : null}
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                    p: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%' },
                    }}
                  >
                    <Typography>Actual Assigned</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%' },
                    }}
                  >
                    {empName &&
                      empName.map(val => {
                        return (
                          <Box
                            key={val.assigned_emp}
                            sx={{
                              width: '100%',
                              display: 'flex',
                              flexDirection: {
                                xs: 'column',
                                sm: 'column',
                                md: 'row',
                                lg: 'row',
                                xl: 'row',
                              },
                            }}
                          >
                            <Checkbox
                              color="primary"
                              label={val.em_name}
                              value={val.assigned_emp}
                              name={val.em_name}
                              onChange={e => {
                                updateSelect(e)
                                getemp(e.target.checked, e.target.value)
                              }}
                              checked={val.check === 1 ? true : select.check}
                            />
                            <Typography sx={{ pt: 1 }}>{val.em_name}</Typography>
                          </Box>
                        )
                      })}
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                    p: 0.5,
                    mt: 1,
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: '30%',
                    }}
                  >
                    <CusCheckBox
                      label="On Hold"
                      color="primary"
                      size="md"
                      name="hold"
                      value={hold}
                      checked={hold}
                      onCheked={updateHold}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      width: '30%',
                    }}
                  >
                    <CusCheckBox
                      label="Rectify"
                      color="primary"
                      size="md"
                      name="rectified"
                      value={rectified}
                      checked={rectified}
                      onCheked={updateRectified}
                    />
                  </Box>
                </Box>
                {flag === 1 ? (
                  <Box sx={{ p: 0.5 }}>
                    <CustomTextarea
                      style={{ width: '100%' }}
                      minRows={4}
                      placeholder=" Pending Remarks"
                      onchange={updatePendhold}
                      value={pendholdreason === null ? '' : pendholdreason}
                    />
                  </Box>
                ) : flag === 2 ? (
                  <Box sx={{ p: 0.5 }}>
                    <CustomTextarea
                      style={{ width: '100%' }}
                      minRows={4}
                      placeholder=" On Hold Remarks"
                      onchange={updatePendhold}
                      value={pendholdreason === null ? '' : pendholdreason}
                    />
                  </Box>
                ) : (
                  <Box sx={{ p: 0.5 }}>
                    <CustomTextarea
                      style={{ width: '100%' }}
                      minRows={4}
                      placeholder="Remarks"
                      onchange={updatePendhold}
                      value={pendholdreason === null ? '' : pendholdreason}
                    />
                  </Box>
                )}
              </Paper>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={rectifycmplt} color="secondary">
            Ok
          </Button>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
export default memo(Rectifymodel)
