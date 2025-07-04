import { Box, Paper } from '@mui/material'
import React, { useCallback, memo, useState } from 'react'
import { taskColor } from 'src/color/Color'
import { Typography } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close'
import CusIconButton from 'src/views/Components/CusIconButton'
import { warningNotify } from 'src/views/Common/CommonCode'
import NdrfCOODashTable from './NDRFCOODashBoard/NdrfCOODashTable'
import NdrfMDDashTable from './NDRFMDDashBoard/NdrfMDDashTable'
import NdrfEDDashTable from './NDRFEDDashBoard/NdrfEDDashTable'
import NdrfPurAckDashTable from './NDRFPurAckDashBoard/NdrfPurAckDashTable'
import NdrfPODashTable from './NDRFPODashBoard/NdrfPODashTable'
import PurAckedNDRFTable from './PurAckedNDRFDashBoard/PurAckedNDRFTable'

const NonClinicalNdrfDash = ({ setClinicalCrfFlag, subDaFlag, data, count, setCount }) => {
  const [wherePending, setWherePending] = useState(0)

  const CAOCOOPending = data && data.filter(val => val.ndrf_cao_approve === null)

  const MDPending = data && data.filter(val => val.ndrf_md_approve === null)

  const EDPending = data && data.filter(val => val.ndrf_ed_approve === null)

  const PurchaseAckPending = data && data.filter(val => val.ndrf_purchase === null)

  const POPending = data && data.filter(val => val.ndrf_po_add !== 1)

  const PurchaseAckged = data && data.filter(val => val.ndrf_purchase === 1)

  const crfPendingClinicalCOOCAO = useCallback(() => {
    if (CAOCOOPending.length !== 0) {
      setWherePending(1)
    } else {
      warningNotify('No NDRF For GM Approval Pending')
      setWherePending(0)
    }
  }, [CAOCOOPending])

  const crfPendingClinicalMD = useCallback(() => {
    if (MDPending.length !== 0) {
      setWherePending(2)
    } else {
      warningNotify('No NDRF For MD Approval Pending')
      setWherePending(0)
    }
  }, [MDPending])
  const crfPendingClinicalED = useCallback(() => {
    if (EDPending.length !== 0) {
      setWherePending(3)
    } else {
      warningNotify('No NDRF For ED Approval Pending')
      setWherePending(0)
    }
  }, [EDPending])

  const NdrfPendingClinicalPurchaseAck = useCallback(() => {
    if (PurchaseAckPending.length !== 0) {
      setWherePending(4)
    } else {
      warningNotify('No NDRF For Purchase Pending')
      setWherePending(0)
    }
  }, [PurchaseAckPending])

  const NdrfPendingClinicalPO = useCallback(() => {
    if (POPending.length !== 0) {
      setWherePending(5)
    } else {
      warningNotify('No NDRF For PO Pending')
      setWherePending(0)
    }
  }, [POPending])

  const NdrfClinicalPurchaseAckdged = useCallback(() => {
    if (PurchaseAckged.length !== 0) {
      setWherePending(6)
    } else {
      warningNotify('No NDRF For PO Pending')
      setWherePending(0)
    }
  }, [PurchaseAckged])

  const close = useCallback(() => {
    setClinicalCrfFlag(0)
  }, [setClinicalCrfFlag])

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: window.innerHeight - 85,
        borderRadius: 2,
        overflow: 'hidden',
        flexDirection: 'column',
        border: 1,
        borderWidth: 1.5,
        borderColor: taskColor.bgIndigo
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
          pl: 2
        }}
      >
        <Box sx={{ width: '95%', pl: 1, color: '#262065', display: 'flex', pt: 0.3 }}>Non Clinical NDRF Dashboard</Box>

        <Box sx={{ width: '5%' }}>
          <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={close}>
            <CloseIcon fontSize="small" />
          </CusIconButton>
        </Box>
      </Box>

      <Paper
        variant="none"
        sx={{
          mt: 1,
          width: '70%',
          ml: 30
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
            overflow: 'hidden'
          }}
        >
          <Paper
            sx={{
              width: '1%'
            }}
            variant="none"
          ></Paper>
          <Paper
            sx={{
              width: '23%',
              height: 160,
              backgroundColor: taskColor.bgIndigo,
              border: 1,
              padding: 2,
              borderColor: taskColor.indigoDark,
              cursor: 'grab',
              ':hover': {
                borderColor: '#7D18EA'
              }
            }}
            variant="outlined"
          >
            <Box
              sx={{
                display: 'flex',
                height: '30%',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: 16,
                fontSmooth: 'auto',
                color: taskColor.FontindigoDark
              }}
            >
              GM Pending
            </Box>
            <Box
              sx={{
                display: 'flex',
                height: '50%',
                fontSize: 48,
                fontWeight: 500,
                justifyContent: 'center',
                alignItems: 'center',
                color: taskColor.FontindigoDark
              }}
            >
              <Typography
                sx={{
                  cursor: 'pointer',
                  ':hover': {
                    transition: 300,
                    textShadow: '#939498 1px 0 5px'
                  }
                }}
                onClick={() => crfPendingClinicalCOOCAO()}
              >
                {CAOCOOPending.length}
              </Typography>
            </Box>
          </Paper>
          <Paper
            sx={{
              width: '1%'
            }}
            variant="none"
          ></Paper>
          <Paper
            sx={{
              width: '23%',
              height: 160,
              backgroundColor: taskColor.bgIndigo,
              border: 1,
              padding: 2,
              borderColor: taskColor.indigoDark,
              cursor: 'grab',
              ':hover': {
                borderColor: '#7D18EA'
              }
            }}
            variant="outlined"
          >
            <Box
              sx={{
                display: 'flex',
                height: '30%',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: 16,
                fontSmooth: 'auto',
                color: taskColor.FontindigoDark
              }}
            >
              MD Pending
            </Box>
            <Box
              sx={{
                display: 'flex',
                height: '50%',
                fontSize: 48,
                fontWeight: 500,
                justifyContent: 'center',
                alignItems: 'center',
                color: taskColor.FontindigoDark
              }}
            >
              <Typography
                sx={{
                  cursor: 'pointer',
                  ':hover': {
                    transition: 300,
                    textShadow: '#939498 1px 0 5px'
                  }
                }}
                onClick={() => crfPendingClinicalMD()}
              >
                {MDPending.length}
              </Typography>
            </Box>
          </Paper>
          <Paper
            sx={{
              width: '1%'
            }}
            variant="none"
          ></Paper>
          <Paper
            sx={{
              width: '23%',
              pl: 0.5,
              height: 160,
              backgroundColor: taskColor.bgIndigo,
              border: 1,
              padding: 2,
              borderColor: taskColor.indigoDark,
              cursor: 'grab',
              ':hover': {
                borderColor: '#7D18EA'
              }
            }}
            variant="outlined"
          >
            <Box
              sx={{
                display: 'flex',
                height: '30%',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: 16,
                fontSmooth: 'auto',
                color: taskColor.FontindigoDark
              }}
            >
              ED Pending
            </Box>
            <Box
              sx={{
                display: 'flex',
                height: '50%',
                fontSize: 48,
                fontWeight: 500,
                justifyContent: 'center',
                alignItems: 'center',
                color: taskColor.FontindigoDark
              }}
            >
              <Typography
                sx={{
                  cursor: 'pointer',
                  ':hover': {
                    transition: 300,
                    textShadow: '#939498 1px 0 5px'
                  }
                }}
                onClick={() => crfPendingClinicalED()}
              >
                {EDPending.length}
              </Typography>
            </Box>
          </Paper>

          <Paper
            sx={{
              width: '1%'
            }}
            variant="none"
          ></Paper>
          <Paper
            sx={{
              width: '23%',
              pl: 0.5,
              height: 160,
              backgroundColor: taskColor.bgIndigo,
              border: 1,
              padding: 2,
              borderColor: taskColor.indigoDark,
              cursor: 'grab',
              ':hover': {
                borderColor: '#7D18EA'
              }
            }}
            variant="outlined"
          >
            <Box
              sx={{
                display: 'flex',
                height: '30%',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: 16,
                fontSmooth: 'auto',
                color: taskColor.FontindigoDark
              }}
            >
              Purchase Acknowledgement Pending
            </Box>
            <Box
              sx={{
                display: 'flex',
                height: '50%',
                fontSize: 48,
                fontWeight: 500,
                justifyContent: 'center',
                alignItems: 'center',
                color: taskColor.FontindigoDark
              }}
            >
              <Typography
                sx={{
                  cursor: 'pointer',
                  ':hover': {
                    transition: 300,
                    textShadow: '#939498 1px 0 5px'
                  }
                }}
                onClick={() => NdrfPendingClinicalPurchaseAck()}
              >
                {PurchaseAckPending.length}
              </Typography>
            </Box>
          </Paper>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: 1,
            //backgroundColor: '#ffffff',
            overflow: 'hidden'
          }}
        >
          <Paper
            sx={{
              width: '25%'
            }}
            variant="none"
          ></Paper>
          <Paper
            sx={{
              width: '23%',
              pl: 0.5,
              height: 160,
              backgroundColor: taskColor.bgIndigo,
              border: 1,
              padding: 2,
              borderColor: taskColor.indigoDark,
              cursor: 'grab',
              ':hover': {
                borderColor: '#7D18EA'
              }
            }}
            variant="outlined"
          >
            <Box
              sx={{
                display: 'flex',
                height: '30%',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: 16,
                fontSmooth: 'auto',
                color: taskColor.FontindigoDark
              }}
            >
              Purchase PO Pending
            </Box>
            <Box
              sx={{
                display: 'flex',
                height: '50%',
                fontSize: 48,
                fontWeight: 500,
                justifyContent: 'center',
                alignItems: 'center',
                color: taskColor.FontindigoDark
              }}
            >
              <Typography
                sx={{
                  cursor: 'pointer',
                  ':hover': {
                    transition: 300,
                    textShadow: '#939498 1px 0 5px'
                  }
                }}
                onClick={() => NdrfPendingClinicalPO()}
              >
                {POPending.length}
              </Typography>
            </Box>
          </Paper>
          <Paper
            sx={{
              width: '1%'
            }}
            variant="none"
          ></Paper>
          <Paper
            sx={{
              width: '23%',
              pl: 0.5,
              height: 160,
              backgroundColor: taskColor.bgIndigo,
              border: 1,
              padding: 2,
              borderColor: taskColor.indigoDark,
              cursor: 'grab',
              ':hover': {
                borderColor: '#7D18EA'
              }
            }}
            variant="outlined"
          >
            <Box
              sx={{
                display: 'flex',
                height: '30%',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: 16,
                fontSmooth: 'auto',
                color: taskColor.FontindigoDark
              }}
            >
              Purchase Acknowledged
            </Box>
            <Box
              sx={{
                display: 'flex',
                height: '50%',
                fontSize: 48,
                fontWeight: 500,
                justifyContent: 'center',
                alignItems: 'center',
                color: taskColor.FontindigoDark
              }}
            >
              <Typography
                sx={{
                  cursor: 'pointer',
                  ':hover': {
                    transition: 300,
                    textShadow: '#939498 1px 0 5px'
                  }
                }}
                onClick={() => NdrfClinicalPurchaseAckdged()}
              >
                {PurchaseAckged.length}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Paper>

      {wherePending === 1 ? (
        <Box>
          <NdrfCOODashTable subDaFlag={subDaFlag} tabledata={CAOCOOPending} count={count} setCount={setCount} />
        </Box>
      ) : wherePending === 2 ? (
        <Box>
          <NdrfMDDashTable subDaFlag={subDaFlag} tabledata={MDPending} count={count} setCount={setCount} />
        </Box>
      ) : wherePending === 3 ? (
        <Box>
          <NdrfEDDashTable subDaFlag={subDaFlag} tabledata={EDPending} count={count} setCount={setCount} />
        </Box>
      ) : wherePending === 4 ? (
        <Box>
          <NdrfPurAckDashTable subDaFlag={subDaFlag} tabledata={PurchaseAckPending} count={count} setCount={setCount} />
        </Box>
      ) : wherePending === 5 ? (
        <Box>
          <NdrfPODashTable subDaFlag={subDaFlag} tabledata={POPending} count={count} setCount={setCount} />
        </Box>
      ) : wherePending === 6 ? (
        <Box>
          <PurAckedNDRFTable subDaFlag={subDaFlag} tabledata={PurchaseAckged} count={count} setCount={setCount} />
        </Box>
      ) : null}
    </Box>
  )
}

export default memo(NonClinicalNdrfDash)
