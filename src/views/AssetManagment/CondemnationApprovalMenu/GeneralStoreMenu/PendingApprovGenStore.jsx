import React, { memo, useCallback, useMemo, useState } from 'react'
import { Box, CssVarsProvider, IconButton, Table } from '@mui/joy'
import { format } from 'date-fns'
import { useQuery } from 'react-query'
import VerifiedIcon from '@mui/icons-material/Verified'
import { getAllDeptCondemPendingDatas } from 'src/api/AssetApis'
import CondemnationApprovalModal from '../../CondemnationList/CondemnationApprovalModal'

const PendingApprovGenStore = ({ empId, menurights }) => {
  const condemStatusFrom = 7
  const condemstatusTo = 2

  const postCondemAllDept = useMemo(() => {
    return {
      condemStatusFrom: condemStatusFrom,
      condemstatusTo: condemstatusTo
    }
  }, [condemStatusFrom, condemstatusTo])

  const [formDetails, setformDetails] = useState([])
  const [modalApproveFlag, setmodalApproveFlag] = useState(0)
  const [modalApproveOpen, setmodalApproveOpen] = useState(false)
  const [formCount, setformCount] = useState(0)

  const ApproveForm = useCallback(val => {
    setformDetails(val)
    setmodalApproveFlag(1)
    setmodalApproveOpen(true)
  }, [])

  const { data: CondemnationAllDept } = useQuery({
    queryKey: ['getAllDeptCondemPendingDatas', formCount],
    queryFn: () => getAllDeptCondemPendingDatas(postCondemAllDept)
  })
  const filteredPendingCondemAllDeptStore = useMemo(() => {
    return (
      CondemnationAllDept?.filter(
        row => !(row.hod_approve_status === 2 || row.store_approve_status === 1 || row.store_approve_status === 2)
      ) || []
    )
  }, [CondemnationAllDept])

  return (
    <Box sx={{ py: 1, px: 0.5 }}>
      {modalApproveFlag === 1 ? (
        <CondemnationApprovalModal
          modalApproveOpen={modalApproveOpen}
          setmodalApproveOpen={setmodalApproveOpen}
          setmodalApproveFlag={setmodalApproveFlag}
          empId={empId}
          formDetails={formDetails}
          setformCount={setformCount}
          formCount={formCount}
          menurights={menurights}
        />
      ) : null}
      <CssVarsProvider>
        {filteredPendingCondemAllDeptStore && filteredPendingCondemAllDeptStore.length > 0 ? (
          <Table stickyHeader size="sm" sx={{ borderRadius: 2 }} borderAxis="both">
            <thead>
              <tr>
                <th style={{ textAlign: 'center', width: 12 }}>
                  <IconButton sx={{ color: 'black', fontSize: 13 }}>Serial No.</IconButton>
                </th>
                <th style={{ textAlign: 'center', width: 10 }}>
                  <IconButton sx={{ color: 'black', fontSize: 13 }}>Action</IconButton>
                </th>
                <th style={{ textAlign: 'center', width: 13 }}>
                  <IconButton sx={{ color: 'black', fontSize: 13 }}>Status</IconButton>
                </th>

                <th style={{ textAlign: 'center', width: 18 }}>
                  <IconButton sx={{ color: 'black', fontSize: 13 }}>Form Number</IconButton>
                </th>
                <th style={{ textAlign: 'center', width: 14 }}>
                  <IconButton sx={{ color: 'black', fontSize: 13 }}>Registered Date</IconButton>
                </th>
                <th style={{ textAlign: 'center', width: 10 }}>
                  <IconButton sx={{ color: 'black', fontSize: 13 }}>Asset Count</IconButton>
                </th>
                <th style={{ textAlign: 'center', width: 10 }}>
                  <IconButton sx={{ color: 'black', fontSize: 13 }}>Spare Count</IconButton>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPendingCondemAllDeptStore?.map((val, index) => (
                <tr key={index}>
                  <td style={{ textAlign: 'center' }}>{val.condem_mast_slno}</td>
                  <td>
                    <Box
                      sx={{
                        bgcolor: '#0E8898',
                        textAlign: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: 13,
                        color: 'white',
                        '&:hover': { bgcolor: '#11A7BB' }
                      }}
                      onClick={() => ApproveForm(val)}
                    >
                      <VerifiedIcon size={6} sx={{ cursor: 'pointer', p: 0.4, color: 'white' }} />
                      Verify
                    </Box>
                  </td>
                  <td>
                    <Box
                      sx={{
                        bgcolor:
                          val.condem_status === 2 && val.incharge_approve_status === 1
                            ? '#7AC7AD'
                            : val.condem_status === 2 && val.incharge_approve_status === 2
                            ? '#F4A3A3'
                            : val.condem_status === 3 && val.hod_approve_status === 1
                            ? '#7AC7AD'
                            : val.condem_status === 3 && val.hod_approve_status === 2
                            ? '#F4A3A3 '
                            : val.condem_status === 4 && val.gm_approve_status === 1
                            ? '#7AC7AD'
                            : val.condem_status === 4 && val.gm_approve_status === 2
                            ? '#F4A3A3 '
                            : val.condem_status === 5 && val.acc_approve_status === 1
                            ? '#7AC7AD'
                            : val.condem_status === 5 && val.acc_approve_status === 2
                            ? '#F4A3A3 '
                            : val.condem_status === 6 && val.store_approve_status === 1
                            ? '#7AC7AD'
                            : val.condem_status === 6 && val.store_approve_status === 2
                            ? '#F4A3A3 '
                            : val.condem_status === 7 && val.material_mangmnt_mangr_apprv_status === 1
                            ? '#7AC7AD'
                            : val.condem_status === 7 && val.material_mangmnt_mangr_apprv_status === 2
                            ? '#F4A3A3 '
                            : '#EFF4F0',
                        textAlign: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: 13,
                        py: 0.2
                      }}
                    >
                      {val.condem_status === 2 && val.incharge_approve_status === 1
                        ? 'Incharge Approved'
                        : val.condem_status === 2 && val.incharge_approve_status === 2
                        ? 'Incharge Rejected'
                        : val.condem_status === 3 && val.hod_approve_status === 1
                        ? 'Hod Approved'
                        : val.condem_status === 3 && val.hod_approve_status === 2
                        ? 'Hod Rejected'
                        : val.condem_status === 4 && val.gm_approve_status === 1
                        ? 'GM Operations Approved'
                        : val.condem_status === 4 && val.gm_approve_status === 2
                        ? 'GM Operations Rejected'
                        : val.condem_status === 5 && val.acc_approve_status === 1
                        ? 'Accounts Approved'
                        : val.condem_status === 5 && val.acc_approve_status === 2
                        ? 'Accounts Rejected'
                        : val.condem_status === 6 && val.store_approve_status === 1
                        ? 'General Store Approved'
                        : val.condem_status === 6 && val.store_approve_status === 2
                        ? 'General Store Rejected'
                        : val.condem_status === 7 && val.material_mangmnt_mangr_apprv_status === 1
                        ? 'Condemnation Approved'
                        : val.condem_status === 7 && val.material_mangmnt_mangr_apprv_status === 2
                        ? 'Condemnation Rejected'
                        : 'Pending Approval'}
                    </Box>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {val.condem_form_prefix}/{val.condem_form_no}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {val.reg_date ? format(new Date(val.reg_date), 'dd-MMM-yyyy') : 'N/A'}
                  </td>
                  <td style={{ textAlign: 'center' }}>{val.count_of_asset || '-'}</td>
                  <td style={{ textAlign: 'center' }}>{val.count_of_spare || '-'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Box
            sx={{
              fontSize: 26,
              pt: 10,
              fontWeight: 600,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '40vh',
              width: '100%',
              textAlign: 'center',
              color: 'lightgrey'
            }}
          >
            Empty List
          </Box>
        )}
      </CssVarsProvider>
    </Box>
  )
}

export default memo(PendingApprovGenStore)
