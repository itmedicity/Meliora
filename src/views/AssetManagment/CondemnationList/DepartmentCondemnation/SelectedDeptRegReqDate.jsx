import { Box, Button, CircularProgress, CssVarsProvider, IconButton, Input, Table } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNotify } from 'src/views/Common/CommonCode'
import RefreshSharpIcon from '@mui/icons-material/RefreshSharp'

const SelectedDeptRegReqDate = ({ SatusFrom, SatusTo, viewForm, empdept }) => {
  const [loading, setLoading] = useState(false)
  const [condemnationList, setCondemnationList] = useState([])
  const [fromDate, setFromDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'))

  const postDeptcondemList = useMemo(() => {
    return {
      SatusFrom: SatusFrom,
      StatusTo: SatusTo,
      req_dept: empdept,
      fromDate: fromDate,
      toDate: toDate
    }
  }, [SatusFrom, SatusTo, empdept, fromDate, toDate])

  const handleFromDateChange = useCallback(
    event => {
      const selectedFromDate = event.target.value
      setFromDate(selectedFromDate)
      if (toDate && selectedFromDate > toDate) {
        setToDate('')
      }
    },
    [toDate]
  )

  const handleToDateChange = useCallback(event => {
    setToDate(event.target.value)
  }, [])

  const Search = useCallback(async () => {
    setLoading(true)
    setCondemnationList([])
    try {
      const result = await axioslogin.post('/AssetCondemnation/getDeptCondemnationList', postDeptcondemList)
      const { success, data } = result.data
      setCondemnationList(success === 1 ? data : [])
    } catch (error) {
      errorNotify('Error fetching condemnation list:', error)
    } finally {
      setLoading(false)
    }
  }, [postDeptcondemList])

  const Clear = useCallback(() => {
    setCondemnationList([])
    setFromDate('')
    setToDate('')
  }, [])

  return (
    <Box sx={{ border: 1, borderColor: '#e0e1e3' }}>
      <Box sx={{ flex: 1, display: 'flex', mt: 1 }}>
        <Box sx={{ ml: 1 }}>
          <Box sx={{ fontSize: 14, fontWeight: 500, pt: 0.5, pl: 0.5 }}>From Date</Box>
          <Input
            size="sm"
            placeholder="Small"
            color="neutral"
            type="date"
            name="fromDate"
            value={fromDate}
            slotProps={{
              input: {
                max: format(new Date(), 'yyyy-MM-dd')
              }
            }}
            onChange={handleFromDateChange}
          />
        </Box>

        <Box sx={{ ml: 1 }}>
          <Box sx={{ fontSize: 14, fontWeight: 500, pt: 0.5, pl: 0.5, pr: 0.5 }}>To Date</Box>
          <Input
            size="sm"
            placeholder="Small"
            color="neutral"
            type="date"
            name="toDate"
            value={toDate}
            onChange={handleToDateChange}
            disabled={!fromDate}
            slotProps={{
              input: {
                min: fromDate,
                max: format(new Date(), 'yyyy-MM-dd')
              }
            }}
          />
        </Box>

        <Box sx={{ pt: 3 }}>
          <Button sx={{ py: 0.2, px: 0.6, ml: 1 }} onClick={Search} size="sm" variant="outlined" color="neutral">
            <SearchIcon />
          </Button>

          <Button sx={{ py: 0.2, px: 0.6, ml: 1 }} onClick={Clear} size="sm" variant="outlined" color="neutral">
            <RefreshSharpIcon />
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <CircularProgress />
        </Box>
      ) : condemnationList.length === 0 ? (
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
                {condemnationList?.map((val, index) => {
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
                      <td style={{ textAlign: 'center' }}>
                        {val.condem_form_prefix}/{val.condem_form_no}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {val.reg_date ? format(new Date(val.reg_date), 'dd-MMM-yyyy') : 'N/A'}
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

export default memo(SelectedDeptRegReqDate)
