import { Box, CircularProgress, CssVarsProvider, IconButton, Table } from '@mui/joy'
import React, { memo, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllDeptCondemList } from 'src/api/AssetApis'
import FormattedDate from 'src/views/Components/FormattedDate'

const AllDeptRegistedLists = ({ viewForm }) => {
  const SatusFrom = 8
  const SatusTo = 1

  const postCondemAllDept = useMemo(() => {
    return {
      SatusFrom: SatusFrom,
      StatusTo: SatusTo
    }
  }, [SatusFrom, SatusTo])

  const { data: AllDeptCondemList, isLoading } = useQuery({
    queryKey: ['getAllDeptCondemList', SatusFrom, SatusTo],
    queryFn: () => getAllDeptCondemList(postCondemAllDept),
    enabled: !!SatusFrom && !!SatusTo
  })
  const AllDeptCondemnation = useMemo(() => AllDeptCondemList ?? [], [AllDeptCondemList])

  return (
    <Box sx={{ border: 1, borderColor: '#e0e1e3' }}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <CircularProgress />
        </Box>
      ) : AllDeptCondemnation.length === 0 ? (
        <Box
          sx={{
            fontSize: 26,
            fontWeight: 600,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
            textAlign: 'center',
            color: 'lightgrey',
            border: 1,
            m: 1
          }}
        >
          No Data Available
        </Box>
      ) : (
        <Box sx={{ m: 0.5 }}>
          <CssVarsProvider>
            <Table stickyHeader size="sm" sx={{ borderRadius: 2 }} borderAxis="both">
              <thead>
                <tr>
                  <th style={{ textAlign: 'center', width: 12 }}>
                    <IconButton sx={{ color: 'black', fontSize: 13 }}>Serial No.</IconButton>
                  </th>
                  <th style={{ textAlign: 'center', width: 12 }}>
                    <IconButton sx={{ color: 'black', fontSize: 13 }}>Action</IconButton>
                  </th>
                  <th style={{ textAlign: 'center', width: 20 }}>
                    <IconButton sx={{ color: 'black', fontSize: 13 }}>Status</IconButton>
                  </th>
                  <th style={{ textAlign: 'center', width: 22 }}>
                    <IconButton sx={{ color: 'black', fontSize: 13 }}>Request Department</IconButton>
                  </th>
                  <th style={{ textAlign: 'center', width: 22 }}>
                    <IconButton sx={{ color: 'black', fontSize: 13 }}>Form Number</IconButton>
                  </th>
                  <th style={{ textAlign: 'center', width: 15 }}>
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
                {AllDeptCondemnation?.map((val, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ textAlign: 'center' }}>{index + 1}</td>
                      <td>
                        <Box
                          sx={{
                            bgcolor: '#A8BBB0',
                            textAlign: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: 13,
                            py: 0.2,
                            '&:hover': { bgcolor: '#8FA297 ' }
                          }}
                          onClick={() => viewForm(val)}
                        >
                          View Details
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
                                            ? 'Store Approved'
                                            : val.condem_status === 6 && val.store_approve_status === 2
                                              ? 'Store Rejected'
                                              : val.condem_status === 7 && val.material_mangmnt_mangr_apprv_status === 1
                                                ? 'Condemnation Approved'
                                                : val.condem_status === 7 && val.material_mangmnt_mangr_apprv_status === 2
                                                  ? 'Condemnation Rejected'
                                                  : 'Pending Approval'}
                        </Box>
                      </td>
                      <td style={{ textAlign: 'center' }}>{val.dept_name}</td>
                      <td style={{ textAlign: 'center' }}>
                        {val.condem_form_prefix}/{val.condem_form_no}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <FormattedDate date={val.reg_date} />
                      </td>
                      <td style={{ textAlign: 'center' }}>{val.count_of_asset || '-'}</td>
                      <td style={{ textAlign: 'center' }}>{val.count_of_spare || '-'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </CssVarsProvider>
        </Box>
      )}
    </Box>
  )
}

export default memo(AllDeptRegistedLists)
