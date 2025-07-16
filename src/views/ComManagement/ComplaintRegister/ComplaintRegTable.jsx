import { Badge, Box, CssVarsProvider, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import PendingList from './TicketLists/PendingList'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import OnholdList from './TicketLists/OnholdList'
import ForVerify from './TicketLists/ForVerify'
import { errorNotify } from 'src/views/Common/CommonCode'
import { getAllPendingComplaints } from 'src/api/CommonApi'
import { useQuery } from '@tanstack/react-query'

const ComplaintRegTable = ({ count, setCount, rowSelect, verficationPending }) => {
  const [pending, setpending] = useState(1)
  const [verifiedCheck, setVerifiedCheck] = useState(0)
  const [holdCheck, setholdCheck] = useState(0)
  // const [pendingCompl, setpendingCompl] = useState([])
  // const [onholdCompl, setOnholdCompl] = useState([])
  // const [holdLength, setholdLength] = useState(0)
  // const [pendingLength, setpendingLength] = useState(0)
  // const [forVerify, setforVerify] = useState([])
  // const [verifyLength, setverifyLength] = useState(0)
  const [loading, setLoading] = useState(false)
  const empsecid = useSelector(state => {
    return state.LoginUserData.empsecid
  })

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
    queryKey: ['GetAllPendingComplaints', empsecid],
    queryFn: () => getAllPendingComplaints(empsecid)
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



  // useEffect(() => {
  //   const getAllPendingComplaints = async () => {
  //     setLoading(true)
  //     try {
  //       const result = await axioslogin.get(`/complaintreg/loginbysec/${empsecid}`)
  //       const { success, data } = result.data
  //       if (success === 1) {
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
  //         setholdLength(OnholdCompl.length)
  //         setpendingLength(PendingCompl.length)
  //         setverifyLength(ForVerify.length)
  //       } else {
  //         setpendingCompl([])
  //         setOnholdCompl([])
  //         setforVerify([])
  //       }
  //     } catch (error) {
  //       errorNotify('Error fetching complaints:', error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   getAllPendingComplaints()
  // }, [empsecid, count])
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error occurred.</p>
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
            <PendingList
              pendingCompl={pendingCompl}
              count={count}
              setCount={setCount}
              rowSelect={rowSelect}
              loading={loading}
            />
          </Box>
        ) : (
          <Box></Box>
        )}
        {verifiedCheck === 1 ? (
          <Box>
            <ForVerify
              forVerify={forVerify}
              count={count}
              setCount={setCount}
              loading={loading}
              verficationPending={verficationPending}
            />
          </Box>
        ) : (
          <Box></Box>
        )}
        {holdCheck === 1 ? (
          <Box>
            <OnholdList onholdCompl={onholdCompl} count={count} setCount={setCount} loading={loading} />
          </Box>
        ) : (
          <Box></Box>
        )}
      </Box>
    </Box>
  )
}

export default memo(ComplaintRegTable)
