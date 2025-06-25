import { Box, CssVarsProvider, IconButton, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { format } from 'date-fns'
import moment from 'moment'
import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getPurchaseDataCollection } from 'src/api/CommonApiCRF'
import { axioslogin } from 'src/views/Axios/Axios'
import CustomCloseIconCmp from 'src/views/CentralRequestManagement/ComonComponent/Components/CustomCloseIconCmp'
import CustomInputDateCmp from 'src/views/CentralRequestManagement/ComonComponent/Components/CustomInputDateCmp'
import CustomBackDrop from 'src/views/Components/CustomBackDrop'

const PurchaseReport = () => {
  const history = useNavigate()
  const backToSetting = useCallback(() => {
    history(`/Home/Reports`)
  }, [history])

  const [open, setOpen] = useState(false)
  const [crfSearch, setCrfSearch] = useState({
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    purchaseTot: 0,
    ackPending: 0,
    quotation: 0,
    negotiation: 0,
    quofinal: 0,
    preparation: 0,
    poSupplier: 0,
    viewFlag: 0,
  })
  const {
    startDate,
    endDate,
    purchaseTot,
    ackPending,
    quotation,
    negotiation,
    quofinal,
    preparation,
    poSupplier,
    viewFlag,
  } = crfSearch
  const updateOnchange = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setCrfSearch({ ...crfSearch, [e.target.name]: value })
    },
    [crfSearch],
  )
  const {
    data: dataColleDetails,
    isLoading: isDcLoading,
    error: dcError,
  } = useQuery({
    queryKey: 'purchaseDataCollection',
    queryFn: () => getPurchaseDataCollection(),
    staleTime: Infinity,
  })
  const dataCollection = useMemo(() => dataColleDetails, [dataColleDetails])

  const searchCRFDetails = useCallback(
    async (e) => {
      e.preventDefault()
      setOpen(true)
      const postdata = {
        startDate: format(new Date(startDate), 'yyyy-MM-dd 00:00:00'),
        endDate: format(new Date(endDate), 'yyyy-MM-dd 23:59:59'),
      }
      const getPurchaseData = async (postdata) => {
        const result = await axioslogin.post('/CrfReports/getPurchaseCRFData', postdata)
        return result.data
      }
      const getAckPurchaseData = async () => {
        const result = await axioslogin.get('/CrfReports/ackPending')
        return result.data
      }
      getPurchaseData(postdata).then((val) => {
        const { success, data } = val
        if (success === 1) {
          setOpen(false)
          const quotPending = data?.filter((val) => {
            return (
              val.quatation_calling_status === 0 && val.ack_status === 1 && val.po_prepartion !== 1
            )
          })
          const quotNego = data?.filter((val) => {
            return val.quatation_negotiation === 0 && val.quatation_calling_status === 1
          })

          const quotFinal = data?.filter((val) => {
            return val.quatation_fixing === 0 && val.quatation_negotiation === 1
          })

          const poPending = data?.filter((val) => {
            return (
              val.ack_status === 1 &&
              ((val.po_prepartion === 1 && val.po_complete === 0) ||
                (val.quatation_calling_status === 1 &&
                  val.quatation_fixing === 1 &&
                  val.po_prepartion === 0))
            )
          })
          const posup = data?.filter((val) => {
            return val.po_complete === 1 && val.po_to_supplier === 0 && val.approval_level === 3
          })
          setCrfSearch((prev) => ({
            ...prev,
            purchaseTot: data.length,
            quotation: quotPending.length,
            negotiation: quotNego.length,
            quofinal: quotFinal.length,
            preparation: poPending.length,
            poSupplier: posup.length,
            viewFlag: 1,
          }))
        } else {
          setOpen(false)
          setCrfSearch((prev) => ({
            ...prev,
            purchaseTot: 0,
            quotation: 0,
            negotiation: 0,
            preparation: 0,
            poSupplier: 0,
            viewFlag: 0,
          }))
        }
      })
      getAckPurchaseData().then((val) => {
        const { success, data } = val
        if (success === 1) {
          setOpen(false)
          const ackpendingList = data?.filter((val) => val.ack_status === null)

          setCrfSearch((prev) => ({
            ...prev,
            ackPending: ackpendingList.length,
          }))
        } else {
          setOpen(false)
          setCrfSearch((prev) => ({
            ...prev,
            ackPending: 0,
          }))
        }
      })
    },
    [endDate, startDate],
  )

  const boxStyle = {
    mt: 4,
    cursor: 'pointer',
    borderRadius: 200,
    fontSize: 40,
    display: 'flex',
    justifyContent: 'center',
    width: 100,
    fontWeight: 650,
    color: '#3f51b5',
    bgcolor: 'white',
  }
  if (isDcLoading) return <p>Loading...</p>
  if (dcError) return <p>Error occurred.</p>
  return (
    <Fragment>
      <CustomBackDrop open={open} text="Please Wait" />
      <Box sx={{ height: window.innerHeight - 80, flexWrap: 'wrap', bgcolor: 'white' }}>
        <Box sx={{ border: '1px solid #B4F5F0' }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: 0.5, color: '#385E72' }}>
              CRF-Purchase Report
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, fontSize: 20, m: 0.5 }}
            >
              <CssVarsProvider>
                <CustomCloseIconCmp handleChange={backToSetting} />
              </CssVarsProvider>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            pb: 1,
            border: '1px solid lightgrey',
          }}
        >
          <Box sx={{ pt: 1, width: { xs: '100%', md: '60vw', lg: '50vw', xl: '50vw' } }}>
            <Box sx={{ px: 1, display: 'flex' }}>
              <Box sx={{ flex: 1, px: 0.3 }}>
                <Typography
                  sx={{ fontSize: 13, color: '#1D617A', px: 1, pt: 0.1, fontWeight: 550 }}
                >
                  Start Date
                </Typography>
                <CssVarsProvider>
                  <CustomInputDateCmp
                    className={{
                      height: 25,
                      borderRadius: 5,
                      border: '1px solid #bbdefb',
                      color: '#1D617A',
                      fontSize: 14,
                      width: '100%',
                    }}
                    size={'md'}
                    type="date"
                    value={startDate}
                    name="startDate"
                    handleChange={updateOnchange}
                    slotProps={{
                      input: { max: moment(new Date()).format('YYYY-MM-DD') },
                    }}
                  />
                </CssVarsProvider>
              </Box>
              <Box sx={{ flex: 1, px: 0.3 }}>
                <Typography
                  sx={{ fontSize: 13, color: '#1D617A', px: 1, pt: 0.1, fontWeight: 550 }}
                >
                  End Date
                </Typography>
                <CssVarsProvider>
                  <CustomInputDateCmp
                    className={{
                      height: 25,
                      borderRadius: 5,
                      border: '1px solid #bbdefb',
                      color: '#1D617A',
                      fontSize: 14,
                      width: '100%',
                    }}
                    size={'md'}
                    type="date"
                    value={endDate}
                    name="endDate"
                    handleChange={updateOnchange}
                    slotProps={{
                      input: { max: moment(new Date()).format('YYYY-MM-DD') },
                    }}
                  />
                </CssVarsProvider>
              </Box>
              <Box sx={{ flex: 0.5, px: 0.3, pt: 2.5 }}>
                <CssVarsProvider>
                  <IconButton
                    sx={{
                      border: '1px solid #bbdefb',
                      width: '100%',
                      fontSize: 13,
                      height: 38,
                      lineHeight: '1.2',
                      color: '#1D617A',
                      bgcolor: 'white',
                      borderRadius: 6,
                      '&:hover': {
                        bgcolor: 'white',
                        color: '#1976d2',
                      },
                    }}
                    onClick={searchCRFDetails}
                  >
                    Search
                  </IconButton>
                </CssVarsProvider>
              </Box>
            </Box>
          </Box>
        </Box>

        {viewFlag === 1 ? (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              pb: 1,
            }}
          >
            <Box
              sx={{
                pt: 2,
                width: { xs: '100%', md: '80vw', lg: '70vw', xl: '70vw', display: 'flex' },
              }}
            >
              <Paper variant="outlined" square sx={{ height: 170, width: 300, bgcolor: '#e3f2fd' }}>
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#145DA0',
                    fontSize: 16,
                    pt: 2,
                  }}
                >
                  CRF Acknowledgement
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={boxStyle}>{purchaseTot}</Box>
                </Box>
              </Paper>
              <Paper
                variant="outlined"
                square
                sx={{ height: 170, width: 300, bgcolor: '#e3f2fd', mx: 2 }}
              >
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#145DA0',
                    fontSize: 16,
                    pt: 2,
                  }}
                >
                  CRF Acknowledgement Pending
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={boxStyle}>{ackPending}</Box>
                </Box>
              </Paper>
              <Paper
                variant="outlined"
                square
                sx={{ height: 170, width: 300, bgcolor: '#e3f2fd', mr: 2 }}
              >
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#145DA0',
                    fontSize: 16,
                    pt: 2,
                  }}
                >
                  Quotation Calling Pending
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={boxStyle}>{quotation}</Box>
                </Box>
              </Paper>
              <Paper variant="outlined" square sx={{ height: 170, width: 300, bgcolor: '#e3f2fd' }}>
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#145DA0',
                    fontSize: 16,
                    pt: 2,
                  }}
                >
                  Quotation Negotiation Pending
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={boxStyle}>{negotiation}</Box>
                </Box>
              </Paper>
            </Box>
            <Box
              sx={{
                pt: 2,
                width: { xs: '100%', md: '80vw', lg: '70vw', xl: '70vw', display: 'flex' },
              }}
            >
              <Paper variant="outlined" square sx={{ height: 170, width: 300, bgcolor: '#e3f2fd' }}>
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#145DA0',
                    fontSize: 16,
                    pt: 2,
                  }}
                >
                  Quotation Approval Pending
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={boxStyle}>{quofinal}</Box>
                </Box>
              </Paper>
              <Paper
                variant="outlined"
                square
                sx={{ height: 170, width: 300, bgcolor: '#e3f2fd', mx: 2 }}
              >
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#145DA0',
                    fontSize: 16,
                    pt: 2,
                  }}
                >
                  PO Preparation Pending
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={boxStyle}>{preparation}</Box>
                </Box>
              </Paper>
              <Paper
                variant="outlined"
                square
                sx={{ height: 170, width: 300, bgcolor: '#e3f2fd', mr: 2 }}
              >
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#145DA0',
                    fontSize: 16,
                    pt: 2,
                  }}
                >
                  Inform to Supplier(PO) Pending
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={boxStyle}>{poSupplier}</Box>
                </Box>
              </Paper>
              <Paper variant="outlined" square sx={{ height: 170, width: 300, bgcolor: '#e3f2fd' }}>
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#145DA0',
                    fontSize: 16,
                    pt: 2,
                  }}
                >
                  Data Collection Pending
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={boxStyle}>{dataCollection.length}</Box>
                </Box>
              </Paper>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: 28,
              opacity: 0.5,
              pt: 10,
              color: 'grey',
            }}
          >
            No Reports Found
          </Box>
        )}
      </Box>
    </Fragment>
  )
}

export default memo(PurchaseReport)
