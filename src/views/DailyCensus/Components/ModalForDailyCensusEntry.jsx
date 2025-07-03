import { Box, Button, CssVarsProvider, Modal, ModalDialog, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton'
import CloseIcon from '@mui/icons-material/Close'
import moment from 'moment'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
const ModalForDailyCensusEntry = ({
  open,
  handleClose,
  dailyDate,
  nsName,
  nsNo,
  yest,
  count,
  setCount,
}) => {
  const [total, settotal] = useState(0)
  const [censusDetails, setSensusDetails] = useState({
    census_slno: 0,
    admission: 0,
    discharge: 0,
    transferIn: 0,
    transferOut: 0,
    death: 0,
  })
  const { census_slno, admission, discharge, transferIn, transferOut, death } = censusDetails
  const UpdateSensusDetails = useCallback(
    e => {
      const containsOnlyDigits = value => /^\d+$/.test(value)
      const inputdata = e.target.value
      if (inputdata !== '' && !containsOnlyDigits(inputdata)) {
        infoNotify('Please enter data with digits only')
        return
      } else {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setSensusDetails({ ...censusDetails, [e.target.name]: value })
      }
    },
    [censusDetails]
  )
  const id = useSelector(state => {
    return state?.LoginUserData.empid
  })
  useEffect(() => {
    const existSearch = {
      census_ns_slno: nsNo,
      census_date: moment(new Date(dailyDate)).format('YYYY-MM-DD'),
    }
    const GetTodayData = async existSearch => {
      const result = await axioslogin.post('/qidailycensus/exist', existSearch)
      const { success, data } = result.data
      if (success === 1) {
        const {
          census_slno,
          total_admission,
          total_discharge,
          transfer_in,
          transfer_out,
          total_death,
        } = data[0]
        const fromdata = {
          census_slno: census_slno,
          admission: total_admission,
          discharge: total_discharge,
          transferIn: transfer_in,
          transferOut: transfer_out,
          death: total_death,
        }

        setSensusDetails(fromdata)
      } else {
        // setExistFlag(0)
        // const fromdata = {
        //     admission: 0,
        //     discharge: 0,
        //     transferIn: 0,
        //     transferOut: 0,
        //     death: 0
        // }
        // setSensusDetails(fromdata);
        // settotal(yest)
      }
    }
    GetTodayData(existSearch)
  }, [nsNo, dailyDate])

  const reset = useCallback(() => {
    const formreset = {
      census_slno: 0,
      admission: 0,
      discharge: 0,
      transferIn: 0,
      transferOut: 0,
      death: 0,
    }
    setSensusDetails(formreset)
    settotal(0)
    handleClose()
  }, [handleClose])
  const ResetDetails = useCallback(() => {
    reset()
  }, [reset])
  // const postdata = useMemo(() => {
  //     return {
  //         census_ns_slno: nsNo,
  //         census_date: dailyDate,
  //         yesterday_census: yest,
  //         total_admission: admission === '' ? 0 : admission,
  //         total_discharge: discharge === '' ? 0 : discharge,
  //         transfer_in: transferIn === '' ? 0 : transferIn,
  //         transfer_out: transferOut === '' ? 0 : transferOut,
  //         total_death: death === '' ? 0 : death,
  //         census_total: total,
  //         create_user: id,
  //         ora_admission: oraAdmis,
  //         ora_discharge: oraDisch,
  //         ora_death: oraDeath
  //     }
  // }, [nsNo, dailyDate, yest, admission, discharge, transferIn, transferOut, death, total, id, oraAdmis, oraDisch, oraDeath])
  const patchdata = useMemo(() => {
    return {
      census_ns_slno: nsNo,
      census_date: dailyDate,
      yesterday_census: yest,
      total_admission: admission === '' ? 0 : admission,
      total_discharge: discharge === '' ? 0 : discharge,
      transfer_in: transferIn === '' ? 0 : transferIn,
      transfer_out: transferOut === '' ? 0 : transferOut,
      total_death: death === '' ? 0 : death,
      census_total: total,
      edit_user: id,
      census_slno: census_slno,
      update_status: 1,
    }
  }, [
    nsNo,
    dailyDate,
    yest,
    admission,
    discharge,
    transferIn,
    transferOut,
    death,
    total,
    id,
    census_slno,
  ])
  const SaveDetails = useCallback(
    e => {
      if (total < 0) {
        infoNotify('Total No.Of Patients Not Lessthan zero')
      } else {
        // const InsertData = async (postdata) => {
        //     const result = await axioslogin.post('/qidailycensus/save', postdata);
        //     const { message, success } = result.data;
        //     if (success === 1) {
        //         succesNotify(message)
        //         setCount(count + 1)
        //         reset()
        //     }
        //     else {
        //         infoNotify(message)
        //     }
        // }
        const UpdateData = async patchdata => {
          const result = await axioslogin.patch('/qidailycensus/update', patchdata)
          const { message, success } = result.data
          if (success === 1) {
            succesNotify(message)
            setCount(count + 1)
            reset()
          } else {
            infoNotify(message)
          }
        }
        UpdateData(patchdata)
        // if (existFlag === 0) {
        //     InsertData(postdata)
        // } else {

        // }
      }
    },
    [reset, patchdata, count, setCount, total]
  )

  useEffect(() => {
    settotal(yest + (admission - discharge) + (transferIn - transferOut) - death)
  }, [yest, admission, discharge, transferIn, transferOut, death])

  return (
    <Fragment>
      <CssVarsProvider>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <ModalDialog
            variant="none"
            sx={{
              width: '50vw',
              borderRadius: 'md',
            }}
          >
            <Paper variant="outlined" square sx={{ display: 'flex', height: 45 }}>
              <Box
                sx={{
                  display: 'flex',
                  flex: 0.5,
                  fontSize: 18,
                  pt: 0.8,
                  justifyContent: 'flex-start',
                  pl: 1,
                  bgcolor: '#bfbdbd',
                }}
              >
                <Typography sx={{ color: '#212121', fontWeight: 'bold' }}>
                  {moment(new Date(dailyDate)).format('DD-MM-YYYY')}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flex: 1.5,
                  fontSize: 18,
                  pt: 0.8,
                  justifyContent: 'center',
                  bgcolor: '#bfbdbd',
                }}
              >
                <Typography
                  sx={{ color: '#212121', textTransform: 'capitalize', fontWeight: 'bold' }}
                >
                  {nsName}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flex: 0.5,
                  justifyContent: 'flex-end',
                  fontSize: 20,
                  pt: 0.3,
                  pr: 0.2,
                  bgcolor: '#bfbdbd',
                }}
              >
                <CusIconButton
                  size="md"
                  variant="outlined"
                  style={{ bgcolor: '#F7F8F8', height: 35, width: 35 }}
                >
                  <Tooltip title="Close" placement="bottom">
                    <CloseIcon
                      sx={{
                        cursor: 'pointer',
                        size: 'lg',
                        fontSize: 30,
                        color: '#424242',
                        fontWeight: 'bold',
                      }}
                      onClick={handleClose}
                    />
                  </Tooltip>
                </CusIconButton>
              </Box>
            </Paper>
            <Box sx={{ overflow: 'auto', bgcolor: '#f5f5f5' }}>
              <Box sx={{ display: 'flex', px: 3 }}>
                <Box sx={{ flex: 1, pl: 1 }}>
                  <Box sx={{ pl: 1 }}>
                    <Typography sx={{ color: '#212121' }}>Yesterday Census</Typography>
                  </Box>
                  <Box sx={{ pt: 0.5, fontWeight: 'bold' }}>
                    <TextFieldCustom disabled size="md" type="text" name="yest" value={yest} />
                  </Box>
                </Box>
                <Box sx={{ flex: 1, pl: 1 }}>
                  <Box sx={{ pl: 1 }}>
                    <Typography sx={{ color: '#212121' }}>Admissions</Typography>
                  </Box>
                  <Box sx={{ pt: 0.5 }}>
                    <TextFieldCustom
                      size="md"
                      type="text"
                      name="admission"
                      value={admission}
                      onchange={UpdateSensusDetails}
                    />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', px: 3, pt: 1 }}>
                <Box sx={{ flex: 1, pl: 1 }}>
                  <Box sx={{ pl: 1 }}>
                    <Typography sx={{ color: '#212121' }}>Discharge</Typography>
                  </Box>
                  <Box sx={{ pt: 0.5 }}>
                    <TextFieldCustom
                      size="md"
                      type="text"
                      name="discharge"
                      value={discharge}
                      onchange={UpdateSensusDetails}
                    />
                  </Box>
                </Box>
                <Box sx={{ flex: 1, pl: 1 }}>
                  <Box sx={{ pl: 1 }}>
                    <Typography sx={{ color: '#212121' }}>Transfer In</Typography>
                  </Box>
                  <Box sx={{ pt: 0.5 }}>
                    <TextFieldCustom
                      size="md"
                      type="text"
                      name="transferIn"
                      value={transferIn}
                      onchange={UpdateSensusDetails}
                    />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', px: 3, pt: 1 }}>
                <Box sx={{ flex: 1, pl: 1 }}>
                  <Box sx={{ pl: 1 }}>
                    <Typography sx={{ color: '#212121' }}>Transfer Out</Typography>
                  </Box>
                  <Box sx={{ pt: 0.5 }}>
                    <TextFieldCustom
                      size="md"
                      type="text"
                      name="transferOut"
                      value={transferOut}
                      onchange={UpdateSensusDetails}
                    />
                  </Box>
                </Box>
                <Box sx={{ flex: 1, pl: 1 }}>
                  <Box sx={{ pl: 1 }}>
                    <Typography sx={{ color: '#212121' }}>Death</Typography>
                  </Box>
                  <Box sx={{ pt: 0.5 }}>
                    <TextFieldCustom
                      size="md"
                      type="text"
                      name="death"
                      value={death}
                      onchange={UpdateSensusDetails}
                    />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', px: 3, py: 1 }}>
                <Box sx={{ flex: 0.5 }}></Box>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ pl: 1.5, display: 'flex' }}>
                    <Typography sx={{ color: '#212121' }}>Total</Typography>
                  </Box>
                  <Box sx={{ pt: 0.5, fontWeight: 'bold' }}>
                    <TextFieldCustom disabled size="md" type="text" name="total" value={total} />
                  </Box>
                </Box>
                <Box sx={{ flex: 0.5 }}></Box>
              </Box>
            </Box>
            <Paper
              variant="outlined"
              square
              sx={{ display: 'flex', justifyContent: 'flex-end', bgcolor: '#bfbdbd', height: 45 }}
            >
              <Box sx={{ py: 0.4 }}>
                <CssVarsProvider>
                  <Button
                    sx={{
                      fontSize: 16,
                      width: 100,
                      height: 30,
                      cursor: 'pointer',
                      color: 'white',
                      bgcolor: '#616161',
                      border: '1px solid lightgrey',
                      borderRight: 'none',
                      borderRadius: 2,
                      ':hover': {
                        bgcolor: '#757575',
                        boxShadow: 2,
                      },
                    }}
                    onClick={SaveDetails}
                  >
                    UPDATE
                  </Button>
                </CssVarsProvider>
              </Box>
              <Box sx={{ pr: 1, py: 0.4 }}>
                <CssVarsProvider>
                  <Button
                    sx={{
                      fontSize: 16,
                      width: 100,
                      height: 30,
                      cursor: 'pointer',
                      color: 'white',
                      bgcolor: '#616161',
                      border: '1px solid lightgrey',
                      borderRight: 'none',
                      borderRadius: 2,
                      ':hover': {
                        bgcolor: '#757575',
                        boxShadow: 2,
                      },
                    }}
                    onClick={ResetDetails}
                  >
                    RESET
                  </Button>
                </CssVarsProvider>
              </Box>
            </Paper>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(ModalForDailyCensusEntry)
