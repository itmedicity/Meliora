import { Box, CssVarsProvider, IconButton, Input, Typography } from '@mui/joy'
import { format, isValid } from 'date-fns'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import SupplierSelect from '../../DeliveryMarking/Components/SupplierSelect'
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import { Virtuoso } from 'react-virtuoso'
import { useQuery } from 'react-query'
import { getItemChecking, getSupplierList } from 'src/api/CommonApiCRF'
import CusCheckBox from 'src/views/Components/CusCheckBox'

const formatDateForInput = date => {
  return date.toISOString().split('T')[0]
}
const ViewChekingDetails = ({ setViewFlag }) => {
  const [tableData, setTableData] = useState([])
  const [supCode, setSupCode] = useState(0)
  const [startDate, setStartDate] = useState(formatDateForInput(new Date()))
  const [endDate, setEndDate] = useState(formatDateForInput(new Date()))
  const [reqCheck, setReqCheck] = useState(false)

  const {
    data: supplier,
    isLoading: isSupLoading,
    error: supError,
  } = useQuery({
    queryKey: 'getSupplierName',
    queryFn: () => getSupplierList(),
    staleTime: Infinity,
  })
  const supList = useMemo(() => supplier, [supplier])

  const searchToday = useMemo(() => {
    return {
      from: format(new Date(), 'yyyy-MM-dd 00:00:00'),
      to: format(new Date(), 'yyyy-MM-dd 23:59:59'),
    }
  }, [])
  const {
    data: checkData,
    isLoading: isItemCheckLoading,
    error: itemCheckError,
  } = useQuery({
    queryKey: ['itemChecking', searchToday],
    queryFn: () => getItemChecking(searchToday),
  })
  const itemCheckData = useMemo(() => checkData, [checkData])
  useEffect(() => {
    if (itemCheckData && supList) {
      if (reqCheck === false && itemCheckData.length !== 0 && supList.length !== 0) {
        const newData = itemCheckData?.map(val => {
          const newData = supList?.find(value => value.supplier_code === val.supplier_code)
          return {
            checking_item_slno: val.checking_item_slno,
            checked_date: val.create_date,
            item_code: val.item_code,
            item_name: val.item_name,
            requested_qty: val.last_requested_qty,
            balance_qty: val.last_balance_qty,
            delivered_qty: val.delivered_qty,
            excess_qty: val.excess_qty,
            damage_qty: val.damage_qty,
            checking_user: val.checking_user,
            pending_status: val.pending_status,
            supplier_name: newData ? newData.supplier_name : 'Nil',
          }
        })
        setTableData(newData)
      }
    } else {
      return
    }
  }, [itemCheckData, reqCheck, supList])

  const handleStartDateChange = useCallback(
    e => {
      const newStartDate = e.target.value
      setStartDate(newStartDate)
      if (endDate && new Date(endDate) < new Date(newStartDate)) {
        setEndDate('')
        return
      }
      if (endDate && new Date(endDate) < new Date(newStartDate)) {
        infoNotify('End date cannot be earlier than the start date.')
        return
      }
    },
    [endDate]
  )

  const handleEndDateChange = useCallback(e => {
    setEndDate(e.target.value)
  }, [])

  const searchdata = useMemo(() => {
    const formattedStartDate = isValid(new Date(startDate))
      ? format(new Date(startDate), 'yyyy-MM-dd 00:00:00')
      : null

    const formattedEndDate = isValid(new Date(endDate))
      ? format(new Date(endDate), 'yyyy-MM-dd 23:59:59')
      : null

    return {
      supCode: supCode,
      from: formattedStartDate,
      to: formattedEndDate,
    }
  }, [supCode, startDate, endDate])

  const viewDetails = useCallback(() => {
    if (reqCheck === false) {
      infoNotify('Select Date to View Details')
      return
    }
    const getData = async searchdata => {
      try {
        const result = await axioslogin.post('/deliveryMarking/itemCheck', searchdata)
        const { success, data } = result.data
        if (success === 1) {
          const newData = data?.map(val => {
            const newData = supList?.find(value => value.supplier_code === val.supplier_code)
            return {
              checking_item_slno: val.checking_item_slno,
              checked_date: val.create_date,
              item_code: val.item_code,
              item_name: val.item_name,
              requested_qty: val.last_requested_qty,
              balance_qty: val.last_balance_qty,
              delivered_qty: val.delivered_qty,
              excess_qty: val.excess_qty,
              damage_qty: val.damage_qty,
              checking_user: val.checking_user,
              pending_status: val.pending_status,
              supplier_name: newData ? newData.supplier_name : 'Nil',
            }
          })
          setTableData(newData)
        } else if (success === 2) {
          setTableData([])
          infoNotify('No Report Found')
        } else {
          warningNotify('Error Occured')
        }
      } catch (error) {
        warningNotify('Error to fetch delivery marking details:', error)
        setTableData([])
      }
    }
    getData(searchdata)
  }, [searchdata, supList, reqCheck])

  const backToItemChecking = useCallback(async () => {
    setViewFlag(0)
  }, [setViewFlag])
  const clearSearch = useCallback(async () => {
    setTableData([])
    setSupCode(0)
    setStartDate(formatDateForInput(new Date()))
    setEndDate(formatDateForInput(new Date()))
    setReqCheck(false)
  }, [])
  const buttonStyle = {
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
  }
  if (isSupLoading || isItemCheckLoading) return <p>Loading...</p>
  if (supError || itemCheckError) return <p>Error occurred.</p>
  return (
    <Fragment>
      <Box sx={{ height: window.innerHeight - 80, flexWrap: 'wrap', bgcolor: 'white' }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            pb: 1,
            border: '1px solid #B4F5F0',
            borderTop: 'none',
          }}
        >
          <Box
            sx={{
              pt: 1,
              width: { xs: '100%', md: '80vw', lg: '70vw', xl: '70vw', flexWrap: 'wrap' },
            }}
          >
            <Box sx={{ px: 1, display: 'flex', flexWrap: 'wrap' }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{ fontSize: 13, color: '#1D617A', pl: 1.5, pt: 0.5, fontWeight: 550 }}
                >
                  Supplier
                </Typography>
                <Box sx={{ pl: 0.5, pt: 0.5 }}>
                  <SupplierSelect supCode={supCode} setSupCode={setSupCode} />
                </Box>
              </Box>
              <Box sx={{ flex: 2, display: 'flex' }}>
                <Box sx={{ flex: 1, pl: 0.5, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 16, color: 'red', fontWeight: 550, pl: 1.5 }}>
                      *
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: '#1D617A', fontWeight: 550, pl: 0.3 }}>
                      Item Check Date
                    </Typography>
                    <Box sx={{ pl: 1 }}>
                      <CusCheckBox
                        variant="outlined"
                        size="md"
                        name="reqCheck"
                        value={reqCheck}
                        onCheked={e => setReqCheck(e.target.checked)}
                        checked={reqCheck}
                        className={{ color: '#1D617A', pb: 0.1 }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5, pt: 0.1 }}>
                    {['Start Date', 'End Date'].map((label, idx) => (
                      <CssVarsProvider key={label}>
                        <Input
                          startDecorator={
                            <Typography
                              sx={{ fontSize: 14, color: '#1D617A', fontWeight: 550, pr: 0.5 }}
                            >
                              {label}
                            </Typography>
                          }
                          sx={{
                            height: 25,
                            borderRadius: 6,
                            border: '1px solid #bbdefb',
                            width: '100%',
                            color: '#0d47a1',
                            fontSize: 14,
                          }}
                          size="md"
                          type="date"
                          name={idx === 0 ? 'startDate' : 'endDate'}
                          value={idx === 0 ? startDate : endDate}
                          disabled={!reqCheck}
                          onChange={idx === 0 ? handleStartDateChange : handleEndDateChange}
                          slotProps={{
                            input: {
                              min: idx === 1 ? startDate : undefined,
                              max: moment(new Date()).format('YYYY-MM-DD'),
                            },
                          }}
                        />
                      </CssVarsProvider>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box sx={{ flex: 0.5, pl: 1.5, pt: 3.2 }}>
                <IconButton sx={buttonStyle} onClick={viewDetails}>
                  View
                </IconButton>
              </Box>
              <Box sx={{ flex: 0.5, pt: 3.2, pl: 0.3 }}>
                <IconButton sx={buttonStyle} onClick={backToItemChecking}>
                  Back
                </IconButton>
              </Box>
              <Box sx={{ flex: 0.5, pt: 3.2, pl: 0.3 }}>
                <IconButton sx={buttonStyle} onClick={clearSearch}>
                  Clear
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ bgcolor: 'white', overflow: 'auto' }}>
          {tableData && tableData.length > 0 ? (
            <Box sx={{ width: '100%' }}>
              <Box
                display="flex"
                justifyContent="space-between"
                sx={{
                  bgcolor: '#e3f2fd',
                  flexWrap: 'nowrap',
                  py: 0.5,
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                  borderBottom: '1px solid lightgrey',
                }}
              >
                <Typography sx={{ width: 40, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>
                  Sl.No
                </Typography>
                <Typography sx={{ width: 170, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
                  Date & Time
                </Typography>
                <Typography sx={{ width: 250, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
                  Supplier
                </Typography>
                <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
                  Item Code
                </Typography>
                <Typography sx={{ width: 250, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
                  Item Name
                </Typography>
                {/* <Typography sx={{ width: 120, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>Requested Qty</Typography> */}
                <Typography sx={{ width: 120, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>
                  Delivered Qty
                </Typography>
                <Typography sx={{ width: 100, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>
                  Excess
                </Typography>
                <Typography sx={{ width: 100, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>
                  Damage
                </Typography>
                <Typography sx={{ width: 100, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>
                  Balance Qty
                </Typography>
                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
                  Goods Checker
                </Typography>
              </Box>
              <Virtuoso
                style={{ height: window.innerHeight - 260, bgcolor: 'blue' }}
                data={tableData}
                itemContent={(index, val) => (
                  <React.Fragment key={val.index}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      sx={{ borderBottom: '1px solid lightgrey', flexWrap: 'nowrap' }}
                    >
                      <Typography sx={{ width: 40, textAlign: 'center', fontSize: 12, my: 1 }}>
                        {index + 1}
                      </Typography>
                      <Typography sx={{ width: 170, textAlign: 'left', fontSize: 12, my: 1 }}>
                        {format(new Date(val.checked_date), 'dd-MM-yyyy hh:mm:ss a')}
                      </Typography>
                      <Typography sx={{ width: 250, textAlign: 'left', fontSize: 12, my: 1 }}>
                        {val.supplier_name}
                      </Typography>
                      <Typography sx={{ width: 80, textAlign: 'left', fontSize: 12, my: 1 }}>
                        {val.item_code}
                      </Typography>
                      <Typography sx={{ width: 250, textAlign: 'left', fontSize: 12, my: 1 }}>
                        {val.item_name}
                      </Typography>
                      {/* <Typography sx={{ width: 120, textAlign: 'center', fontSize: 12, my: 1 }}>{val.requested_qty}</Typography> */}
                      <Typography sx={{ width: 120, textAlign: 'center', fontSize: 12, my: 1 }}>
                        {val.delivered_qty}{' '}
                      </Typography>
                      <Typography sx={{ width: 100, textAlign: 'center', fontSize: 12, my: 1 }}>
                        {val.excess_qty}
                      </Typography>
                      <Typography sx={{ width: 100, textAlign: 'center', fontSize: 12, my: 1 }}>
                        {val.damage_qty}
                      </Typography>
                      <Typography sx={{ width: 100, textAlign: 'center', fontSize: 12, my: 1 }}>
                        {val.balance_qty}
                      </Typography>
                      {/* <Typography sx={{ width: 100, textAlign: 'center', fontSize: 12, my: 1 }}>
                                                {val.pending_status === 0 ? val.requested_qty : (val.requested_qty - val.)}</Typography> */}
                      <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>
                        {val.checking_user}
                      </Typography>
                    </Box>
                  </React.Fragment>
                )}
              />
            </Box>
          ) : null}
        </Box>
      </Box>
    </Fragment>
  )
}

export default memo(ViewChekingDetails)
