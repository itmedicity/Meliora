import { Badge, Box, CssVarsProvider, Typography } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import DirectPendingList from './DirectTicketList/DirectPendingList'
import SectionwiseHoldList from './DirectTicketList/SectionwiseHoldList'
import SectionWiseVerify from './DirectTicketList/SectionWiseVerify'
import { getDirectPendingCompalints } from 'src/api/CommonApi'
import { useQuery } from '@tanstack/react-query'

const DirectComplaintTable = ({ count, setCount, rowSelect, verficationPending }) => {
  const [pending, setpending] = useState(1)
  const [verifiedCheck, setVerifiedCheck] = useState(0)
  const [holdCheck, setholdCheck] = useState(0)
  // const [holdLength, setholdLength] = useState(0)
  // const [pendingLength, setpendingLength] = useState(0)
  // const [verifyLength, setverifyLength] = useState(0)
  // const [pendingCompl, setpendingCompl] = useState([])
  // const [onholdCompl, setOnholdCompl] = useState([])
  // const [forVerify, setforVerify] = useState([])
  const [loading, setLoading] = useState(false)

  const PendingCheck = useCallback(() => {
    setholdCheck(0)
    setVerifiedCheck(0)
    setpending(1)
  }, [])

  const VerifiedCheck = useCallback(() => {
    setholdCheck(0)
    setVerifiedCheck(1)
    setpending(0)
  }, [])

  const HoldCheck = useCallback(() => {
    setholdCheck(1)
    setVerifiedCheck(0)
    setpending(0)
  }, [])

  const { isLoading, error, data, isSuccess } = useQuery({
    queryKey: 'GetDirectPendingComplaints',
    queryFn: () => getDirectPendingCompalints()
  })

  // Derived values — only filter when isSuccess is true
  const pendingCompl = useMemo(() => {
    if (!isSuccess || !Array.isArray(data)) return []
    return data?.filter(
      complaint =>
        complaint.compalint_status !== 2 &&
        complaint.compalint_status !== 3 &&
        complaint.cm_rectify_status !== 'O'
    )
  }, [data, isSuccess])

  const onholdCompl = useMemo(() => {
    if (!isSuccess || !Array.isArray(data)) return []
    return data?.filter(
      complaint =>
        complaint.compalint_status !== 2 &&
        complaint.compalint_status !== 3 &&
        complaint.cm_rectify_status === 'O'
    )
  }, [data, isSuccess])

  const forVerify = useMemo(() => {
    if (!isSuccess || !Array.isArray(data)) return []
    return data?.filter(
      complaint =>
        complaint.compalint_status === 2 &&
        complaint.compalint_status !== 3 &&
        complaint.cm_rectify_status === 'R'
    )
  }, [data, isSuccess])

  const pendingLength = pendingCompl?.length
  const holdLength = onholdCompl?.length
  const verifyLength = forVerify?.length

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error occurred.</p>
  // useEffect(() => {
  //   let isMounted = true
  //   const getAllPendingCompalints = async () => {
  //     setLoading(true)
  //     try {
  //       const result = await axioslogin.get(`/complaintreg/viewAllPendingTicket`)
  //       const { success, data } = result.data
  //       if (success === 2 && isMounted) {
  //         const PendingCompl = data.filter(
  //           complaint =>
  //             complaint.compalint_status !== 2 &&
  //             complaint.compalint_status !== 3 &&
  //             complaint.cm_rectify_status !== 'O'
  //         )
  //         const OnholdCompl = data.filter(
  //           complaint =>
  //             complaint.compalint_status !== 2 &&
  //             complaint.compalint_status !== 3 &&
  //             complaint.cm_rectify_status === 'O'
  //         )
  //         const ForVerify = data.filter(
  //           complaint =>
  //             complaint.compalint_status === 2 &&
  //             complaint.compalint_status !== 3 &&
  //             complaint.cm_rectify_status === 'R'
  //         )
  //         setpendingCompl(PendingCompl)
  //         setOnholdCompl(OnholdCompl)
  //         setforVerify(ForVerify)
  //         setholdLength(OnholdCompl.length || 0)
  //         setpendingLength(PendingCompl.length || 0)
  //         setverifyLength(ForVerify.length || 0)
  //       } else if (isMounted) {
  //         setpendingCompl([])
  //       }
  //     } catch (error) {
  //       if (isMounted) {
  //         errorNotify('Error fetching pending complaints:', error)
  //         setpendingCompl([])
  //       }
  //     } finally {
  //       if (isMounted) {
  //         setLoading(false)
  //       }
  //     }
  //   }

  //   getAllPendingCompalints()
  //   return () => {
  //     isMounted = false
  //   }
  // }, [count])

  return (
    <Box sx={{ flex: 1 }}>
      <Box sx={{ flex: 1, display: 'flex', px: 3, pt: 2.5, pb: 0.5, justifyContent: 'center', gap: 3 }}>
        <CssVarsProvider>
          <Badge badgeContent={pendingLength} color="danger">
            <Box sx={{ px: 2, display: 'flex', cursor: 'pointer' }} onClick={PendingCheck}>
              {pending === 1 ? (
                <RadioButtonCheckedIcon sx={{ cursor: 'pointer', color: '#F44336' }} />
              ) : (
                <RadioButtonUncheckedIcon sx={{ cursor: 'pointer' }} />
              )}
              <Typography sx={{ pl: 0.5 }}>Pending</Typography>
            </Box>
          </Badge>
        </CssVarsProvider>
        <CssVarsProvider>
          <Badge badgeContent={holdLength} color="neutral">
            <Box sx={{ px: 2, display: 'flex', cursor: 'pointer' }} onClick={HoldCheck}>
              {holdCheck === 1 ? (
                <RadioButtonCheckedIcon sx={{ cursor: 'pointer', color: '#50655B' }} />
              ) : (
                <RadioButtonUncheckedIcon sx={{ cursor: 'pointer' }} />
              )}
              <Typography sx={{ pl: 0.5 }}>On Hold</Typography>
            </Box>
          </Badge>
        </CssVarsProvider>
        <CssVarsProvider>
          <Badge badgeContent={verifyLength} color="primary">
            <Box sx={{ px: 2, display: 'flex', cursor: 'pointer' }} onClick={VerifiedCheck}>
              {verifiedCheck === 1 ? (
                <RadioButtonCheckedIcon sx={{ cursor: 'pointer', color: '#3399FF' }} />
              ) : (
                <RadioButtonUncheckedIcon sx={{ cursor: 'pointer' }} />
              )}
              <Typography sx={{ pl: 0.5 }}>For Verify</Typography>
            </Box>
          </Badge>
        </CssVarsProvider>
      </Box>
      <Box sx={{ flex: 1 }}>
        {pending === 1 ? (
          <Box>
            <DirectPendingList
              count={count}
              setCount={setCount}
              rowSelect={rowSelect}
              pendingCompl={pendingCompl}
              loading={loading}
            />
          </Box>
        ) : (
          <Box></Box>
        )}
        {verifiedCheck === 1 ? (
          <Box>
            <SectionWiseVerify
              count={count}
              setCount={setCount}
              forVerify={forVerify}
              loading={loading}
              verficationPending={verficationPending}
            />
          </Box>
        ) : (
          <Box></Box>
        )}
        {holdCheck === 1 ? (
          <Box>
            <SectionwiseHoldList count={count} setCount={setCount} onholdCompl={onholdCompl} loading={loading} />
          </Box>
        ) : (
          <Box></Box>
        )}
      </Box>
    </Box>
  )
}

export default memo(DirectComplaintTable)
