import { Box, Paper } from '@mui/material'
import React, { useCallback, memo, useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { taskColor } from 'src/color/Color'
import { CssVarsProvider, Typography } from '@mui/joy'
import ClinicalCrfDash from './ClinicalCrfDash'
import { getClinicalCrfPending } from 'src/redux/actions/CrfDashboardClinical.action'
import { getNonClinicalCrfPending } from 'src/redux/actions/CRFDashboardNonClinical'
import NonClinicalCrfDash from './NonClinicalCrfDash'
import ClinicalNdrfDash from './ClinicalNdrfDash'
import { getClinicalNDRFPending } from 'src/redux/actions/NdrfDashboardClinical.action'
import { getNonClinicalNDRFPending } from 'src/redux/actions/NdrfDashboardNonClinical.action'
import NonClinicalNdrfDash from './NonClinicalNdrfDash'

const CrdDashboardMain = () => {
  /*** Initializing */
  const dispatch = useDispatch()
  const [subDaFlag, setClinicalCrfFlag] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    dispatch(getClinicalCrfPending())
    dispatch(getNonClinicalCrfPending())
    dispatch(getClinicalNDRFPending())
    dispatch(getNonClinicalNDRFPending())
  }, [dispatch, count])

  const ClinicalCRFPending = useSelector(state => {
    return state.setClinicalCrfPending.ClinicalCrfPendingList
  })

  const NonClinicalCRFPending = useSelector(state => {
    return state.setNonClinicalCrfPending.NonClinicalCrfPendingList
  })

  const ClinicalNDRFPending = useSelector(state => {
    return state.setClinicalNDRFPending.ClinicalNDRFPendingList
  })

  const NonClinicalNDRFPending = useSelector(state => {
    return state.setNonClinicalNDRFPending.NonClinicalNDRFPendingList
  })

  const crfPendingClinical = useCallback(() => {
    setClinicalCrfFlag(1)
  }, [])

  const NdrfPendingClinical = useCallback(() => {
    setClinicalCrfFlag(2)
  }, [])

  const crfPendingNonClinical = useCallback(() => {
    setClinicalCrfFlag(3)
  }, [])

  const NdrfPendingNonClinical = useCallback(() => {
    setClinicalCrfFlag(4)
  }, [])

  return (
    <Fragment>
      {subDaFlag === 1 ? (
        <ClinicalCrfDash
          setClinicalCrfFlag={setClinicalCrfFlag}
          subDaFlag={subDaFlag}
          data={ClinicalCRFPending}
          count={count}
          setCount={setCount}
        />
      ) : subDaFlag === 2 ? (
        <ClinicalNdrfDash
          setClinicalCrfFlag={setClinicalCrfFlag}
          subDaFlag={subDaFlag}
          data={ClinicalNDRFPending}
          count={count}
          setCount={setCount}
        />
      ) : subDaFlag === 3 ? (
        <NonClinicalCrfDash
          setClinicalCrfFlag={setClinicalCrfFlag}
          subDaFlag={subDaFlag}
          data={NonClinicalCRFPending}
          count={count}
          setCount={setCount}
        />
      ) : subDaFlag === 4 ? (
        <NonClinicalNdrfDash
          setClinicalCrfFlag={setClinicalCrfFlag}
          subDaFlag={subDaFlag}
          data={NonClinicalNDRFPending}
          count={count}
          setCount={setCount}
        />
      ) : (
        <Box
          sx={{
            display: 'flex',
            minHeight: window.innerHeight - 85,
            borderRadius: 2,
            overflow: 'hidden',
            flexDirection: 'column',
            border: 1,
            borderWidth: 1.5,
            borderColor: taskColor.bgIndigo,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              backgroundColor: '#ffffff',
              maxHeight: 40,
              alignItems: 'center',
              borderBottom: 1,
              borderColor: '#b5b3ca',
              pl: 2,
            }}
          >
            <Box sx={{ pl: 1, color: '#262065', display: 'flex', pt: 0.3 }}>
              Request Management Dashboard
            </Box>
          </Box>
          <CssVarsProvider>
            <Typography
              ml={2}
              sx={{ fontSize: 20, px: 1, pb: 0.4, mt: 1, textAlign: 'center' }}
              color="primary"
              variant="none"
            >
              {' '}
              Clinical
            </Typography>
          </CssVarsProvider>
          <Paper
            variant="none"
            sx={{
              mt: 1,
              width: '30%',
              ml: 70,
              border: 1,
              borderColor: taskColor.indigoDark,
              // alignItems: "center",
              // justifyItems: "center",
              // backgroundColor: "green"
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: 1,
                //backgroundColor: '#ffffff',
                overflow: 'hidden',
              }}
            >
              <Paper
                sx={{
                  width: '47%',
                  height: 160,
                  backgroundColor: taskColor.bgIndigo,
                  border: 1,
                  padding: 2,
                  borderColor: taskColor.indigoDark,
                  cursor: 'grab',
                  ':hover': {
                    borderColor: '#7D18EA',
                  },
                }}
                variant="outlined"
              >
                <Box
                  sx={{
                    display: 'flex',
                    height: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 600,
                    fontSize: 16,
                    fontSmooth: 'auto',
                    color: taskColor.FontindigoDark,
                  }}
                >
                  CRF Pending
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    height: '50%',
                    fontSize: 48,
                    fontWeight: 500,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: taskColor.FontindigoDark,
                  }}
                >
                  <Typography
                    sx={{
                      cursor: 'pointer',
                      ':hover': {
                        transition: 300,
                        textShadow: '#939498 1px 0 5px',
                      },
                    }}
                    onClick={() => crfPendingClinical()}
                  >
                    {ClinicalCRFPending.length}
                  </Typography>
                </Box>
              </Paper>

              <Paper
                sx={{
                  width: '6%',
                }}
                variant="none"
              ></Paper>
              <Paper
                sx={{
                  width: '47%',
                  height: 160,
                  pl: 1,
                  backgroundColor: taskColor.bgIndigo,
                  border: 1,
                  padding: 2,
                  borderColor: taskColor.indigoDark,
                  cursor: 'grab',
                  ':hover': {
                    borderColor: '#7D18EA',
                  },
                }}
                variant="outlined"
              >
                <Box
                  sx={{
                    display: 'flex',
                    height: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 600,
                    fontSize: 16,
                    fontSmooth: 'auto',
                    color: taskColor.FontindigoDark,
                  }}
                >
                  NDRF Pending
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    height: '50%',
                    fontSize: 48,
                    fontWeight: 500,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: taskColor.FontindigoDark,
                  }}
                >
                  <Typography
                    sx={{
                      cursor: 'pointer',
                      ':hover': {
                        transition: 300,
                        textShadow: '#939498 1px 0 5px',
                      },
                    }}
                    onClick={() => NdrfPendingClinical()}
                  >
                    {ClinicalNDRFPending.length}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Paper>

          <CssVarsProvider>
            <Typography
              ml={2}
              sx={{ fontSize: 20, px: 1, pb: 0.4, mt: 1, textAlign: 'center' }}
              color="primary"
              variant="none"
            >
              Non Clinical
            </Typography>
          </CssVarsProvider>
          <Paper
            variant="none"
            sx={{
              mt: 1,
              width: '30%',
              ml: 70,
              border: 1,
              borderColor: taskColor.indigoDark,
              // alignItems: "center",
              // justifyItems: "center",
              // backgroundColor: "green"
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: 1,
                //backgroundColor: '#ffffff',
                overflow: 'hidden',
              }}
            >
              <Paper
                sx={{
                  width: '47%',
                  height: 160,
                  backgroundColor: taskColor.bgIndigo,
                  border: 1,
                  padding: 2,
                  borderColor: taskColor.indigoDark,
                  cursor: 'grab',
                  ':hover': {
                    borderColor: '#7D18EA',
                  },
                }}
                variant="outlined"
              >
                <Box
                  sx={{
                    display: 'flex',
                    height: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 600,
                    fontSize: 16,
                    fontSmooth: 'auto',
                    color: taskColor.FontindigoDark,
                  }}
                >
                  CRF Pending
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    height: '50%',
                    fontSize: 48,
                    fontWeight: 500,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: taskColor.FontindigoDark,
                  }}
                >
                  <Typography
                    sx={{
                      cursor: 'pointer',
                      ':hover': {
                        transition: 300,
                        textShadow: '#939498 1px 0 5px',
                      },
                    }}
                    onClick={() => crfPendingNonClinical()}
                  >
                    {NonClinicalCRFPending.length}
                  </Typography>
                </Box>
              </Paper>

              <Paper
                sx={{
                  width: '6%',
                }}
                variant="none"
              ></Paper>
              <Paper
                sx={{
                  width: '47%',
                  height: 160,
                  pl: 1,
                  backgroundColor: taskColor.bgIndigo,
                  border: 1,
                  padding: 2,
                  borderColor: taskColor.indigoDark,
                  cursor: 'grab',
                  ':hover': {
                    borderColor: '#7D18EA',
                  },
                }}
                variant="outlined"
              >
                <Box
                  sx={{
                    display: 'flex',
                    height: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 600,
                    fontSize: 16,
                    fontSmooth: 'auto',
                    color: taskColor.FontindigoDark,
                  }}
                >
                  NDRF Pending
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    height: '50%',
                    fontSize: 48,
                    fontWeight: 500,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: taskColor.FontindigoDark,
                  }}
                >
                  <Typography
                    sx={{
                      cursor: 'pointer',
                      ':hover': {
                        transition: 300,
                        textShadow: '#939498 1px 0 5px',
                      },
                    }}
                    onClick={() => NdrfPendingNonClinical()}
                  >
                    {NonClinicalNDRFPending.length}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Paper>
        </Box>
      )}
    </Fragment>
  )
}

export default memo(CrdDashboardMain)
