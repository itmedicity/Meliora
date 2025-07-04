import { Box, Table, Input, CircularProgress, IconButton, Sheet } from '@mui/joy'
import { format } from 'date-fns'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNotify } from 'src/views/Common/CommonCode'
import AmDepartmentSelWOName from 'src/views/CommonSelectCode/AmDepartmentSelWOName'
import AmDeptSecSelectWOName from 'src/views/CommonSelectCode/AmDeptSecSelectWOName'
import TextComponent from 'src/views/Components/TextComponent'
import AssetCustodianDepartment from 'src/views/CommonSelectCode/AssetCustodianDepartment'
import { getCustodianDept } from 'src/api/AssetApis'
import { useQuery } from 'react-query'
import AmDeptSecSelectJoy from 'src/views/CommonSelectCode/AmDeptSecSelectJoy'
import AmDeptSelectJoy from 'src/views/CommonSelectCode/AmDeptSelectJoy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const AssetTransferHistory = () => {
  const [transDept, setTransDept] = useState(0)
  const [transDeptSec, setTransDeptSec] = useState(0)
  const [fromDate, setFromDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [assetNum, setAssetNum] = useState(0)
  const [custoDian, setCustodian] = useState(0)
  const [Custfirst, setCustfirst] = useState('')
  const [assetNo, setassetNo] = useState(0)
  const [selectedDept, setselectedDept] = useState(0)
  const [selectedDeptSec, setselectedDeptSec] = useState(0)
  const [loading, setLoading] = useState(false)
  const [custodianAllDetails, setcustodianAllDetails] = useState({})
  const [trasferData, setTrasferData] = useState([])
  const [openRowIndex, setOpenRowIndex] = useState(null)
  const [detailData, setDetailData] = useState([])

  const handleAssetNumChange = event => {
    setAssetNum(event.target.value.toUpperCase())
    setTrasferData([])
  }

  const { data: CustodianDept } = useQuery({
    queryKey: ['getCustodaianDept'],
    queryFn: () => getCustodianDept()
  })

  const CustDept = useMemo(() => CustodianDept, [CustodianDept])
  useEffect(() => {
    if (CustDept && CustDept.length > 0) {
      const { am_custdn_asset_no_first } = CustDept[0]
      setCustfirst(am_custdn_asset_no_first)
    }
  }, [CustDept])

  const postData = useMemo(
    () => ({
      fromDate: fromDate ? format(new Date(new Date(fromDate).setHours(0, 0, 0, 0)), 'yyyy-MM-dd HH:mm:ss') : null,
      toDate: toDate ? format(new Date(new Date(toDate).setHours(23, 59, 59, 999)), 'yyyy-MM-dd HH:mm:ss') : null,
      assetNo: assetNo === 0 ? null : assetNo === null ? null : assetNo,
      transDept: transDept || null,
      transDeptSec: transDeptSec || null,
      custDept: custoDian || null,
      selectedDept: selectedDept || null,
      selectedDeptSec: selectedDeptSec || null
    }),
    [fromDate, toDate, assetNo, transDept, transDeptSec, custoDian, selectedDept, selectedDeptSec]
  )

  const fetchAssetHistory = useCallback(async () => {
    setLoading(true)
    setTrasferData([])
    try {
      const result = await axioslogin.post('/assetDeptTransfer/getAssetTransferHistory', postData)
      const { success, data } = result.data
      setTrasferData(success === 1 ? data : [])
    } catch (error) {
      errorNotify('Error fetching asset transfer history:', error)
    } finally {
      setLoading(false)
    }
  }, [postData])

  const fetchAssetData = useCallback(
    async post => {
      setLoading(true)
      try {
        const result = await axioslogin.post('/PasswordManagementMain/getAssetNo', post)
        const { data, success } = result.data
        if (success === 1 && data.length > 0) {
          const { am_item_map_slno } = data[0]
          setassetNo(am_item_map_slno)
          fetchAssetHistory()
        } else {
          setassetNo(0)
        }
      } catch (error) {
        errorNotify('Error fetching asset data:', error)
      } finally {
        setLoading(false)
      }
    },
    [fetchAssetHistory]
  )

  useEffect(() => {
    if (!assetNum || assetNum === 0) {
      fetchAssetHistory()
    } else {
      const parts = assetNum.split('/')
      const assetPrefix = parts.slice(0, 2).join('/')
      const asset_number = parts[2]
      const numericAssetNumber = parseInt(asset_number, 10)
      const post = {
        item_asset_no: assetPrefix,
        item_asset_no_only: numericAssetNumber
      }
      fetchAssetData(post)
    }
  }, [assetNum, fetchAssetData, fetchAssetHistory])

  const SearchTransfer = useCallback(() => {
    if (!assetNum || assetNum === 0) {
      fetchAssetHistory()
    } else {
      const parts = assetNum.split('/')
      const post = {
        item_asset_no: parts.slice(0, 2).join('/'),
        item_asset_no_only: parseInt(parts[2], 10)
      }
      fetchAssetData(post)
    }
  }, [assetNum, fetchAssetData, fetchAssetHistory])

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

  const HandleAssetList = useCallback(
    async (val, index) => {
      const { transfr_mast_slno } = val
      const getDetails = { transfr_mast_slno }
      setOpenRowIndex(prevIndex => (prevIndex === index ? null : index))
      if (openRowIndex !== index) {
        try {
          const result = await axioslogin.post('/assetDeptTransfer/getTransferDetail', getDetails)
          const { data, success } = result.data
          if (success === 1) {
            setDetailData(data)
          } else {
            setDetailData([])
          }
        } catch (error) {
          errorNotify('Error fetching asset details:', error)
        }
      } else {
        setDetailData([])
      }
    },
    [openRowIndex]
  )

  return (
    <Box>
      <Box sx={{ border: 1, flex: 1, borderColor: 'lightgray', mx: 1, mt: 1, p: 1 }}>
        <Box
          sx={{
            flex: 1,
            pt: 1,
            display: 'flex',
            gap: 1,
            margin: 'auto'
          }}
        >
          <Box sx={{ flex: 1 }}>
            <TextComponent
              text={'From Date'}
              sx={{ color: 'black', fontWeight: 500, pl: 0.5, fontsize: 20, textalign: 'center' }}
            ></TextComponent>
            <TextFieldCustom
              type="date"
              size="sm"
              name="fromDate"
              value={fromDate}
              onchange={handleFromDateChange}
            ></TextFieldCustom>
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextComponent
              text={'To Date'}
              sx={{ color: 'black', fontWeight: 500, pl: 0.5, fontsize: 20, textalign: 'center' }}
            ></TextComponent>
            <TextFieldCustom
              type="date"
              size="sm"
              name="toDate"
              value={toDate}
              onchange={handleToDateChange}
              disabled={!fromDate}
              slotProps={{
                input: {
                  min: fromDate
                }
              }}
            ></TextFieldCustom>
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextComponent
              text={'Asset Number'}
              sx={{ color: 'black', fontWeight: 500, pl: 0.5, fontsize: 20, textalign: 'center' }}
            ></TextComponent>
            <TextFieldCustom
              type="text"
              size="sm"
              name="assetNum"
              value={assetNum || `${Custfirst}/`}
              onchange={handleAssetNumChange}
            ></TextFieldCustom>
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextComponent
              text={'Transfered From Custodian '}
              sx={{ color: 'black', fontWeight: 500, pl: 0.5, fontsize: 20, textalign: 'center' }}
            ></TextComponent>
            {selectedDept !== 0 ? (
              <Input sx={{ '--Input-minHeight': '29px' }} disabled={true} placeholder="Select Custodian Department " />
            ) : (
              <AssetCustodianDepartment
                custoDian={custoDian}
                setCustodian={setCustodian}
                setcustodianAllDetails={setcustodianAllDetails}
                custodianAllDetails={custodianAllDetails}
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            pt: 1,
            display: 'flex',
            gap: 1,
            margin: 'auto'
          }}
        >
          <Box sx={{ flex: 1 }}>
            <TextComponent
              text={'Transferred to Department'}
              sx={{ color: 'black', fontWeight: 500, pl: 0.5, fontsize: 20, textalign: 'center' }}
            ></TextComponent>
            <AmDepartmentSelWOName department={transDept} setDepartment={setTransDept} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextComponent
              text={'Transferred to Department Section'}
              sx={{ color: 'black', fontWeight: 500, pl: 0.5, fontsize: 20, textalign: 'center' }}
            ></TextComponent>
            <AmDeptSecSelectWOName deptsec={transDeptSec} setDeptSec={setTransDeptSec} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextComponent
              text={'Transferred From Department'}
              sx={{ color: 'black', fontWeight: 500, pl: 0.5, fontsize: 20, textalign: 'center' }}
            ></TextComponent>
            {custoDian !== 0 ? (
              <Input sx={{ '--Input-minHeight': '29px' }} disabled={true} placeholder="select Department Section" />
            ) : (
              <AmDeptSelectJoy selectedDept={selectedDept} setselectedDept={setselectedDept} />
            )}
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextComponent
              text={'Transferred From Department Section'}
              sx={{ color: 'black', fontWeight: 500, pl: 0.5, fontsize: 20, textalign: 'center' }}
            ></TextComponent>
            {custoDian !== 0 ? (
              <Input sx={{ '--Input-minHeight': '29px' }} disabled={true} placeholder="select Department Section" />
            ) : (
              <AmDeptSecSelectJoy selectedDeptSec={selectedDeptSec} setselectedDeptSec={setselectedDeptSec} />
            )}
          </Box>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', pt: 2, pb: 1 }}>
          <Box
            onClick={SearchTransfer}
            sx={{
              width: 150,
              border: 1,
              py: 0.1,
              borderColor: '#5a5f63',
              textAlign: 'center',
              borderRadius: 1,
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
              bgcolor: '#8A9299',
              fontSize: 16,
              fontWeight: 500,
              boxShadow: '2px 4px 6px rgba(0,0,0,0.4)',
              '&:active': {
                transform: 'scale(0.98)',
                boxShadow: '1px 2px 3px rgba(0,0,0,0.3)'
              }
            }}
          >
            Search
          </Box>
        </Box>
      </Box>
      <Box sx={{ flex: 1, border: 1, borderColor: 'lightgray', m: 1, p: 1 }}>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
              }}
            >
              <CircularProgress />
            </Box>
          ) : trasferData.length === 0 ? (
            <Box
              sx={{
                felx: 1,
                border: 1,
                py: 5,
                borderColor: '#D3D3D3',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              No Data Available
            </Box>
          ) : (
            <Box sx={{ flex: 1, width: 3000 }}>
              <Table
                borderAxis="both"
                size="sm"
                stickyHeader
                sx={{
                  '& tr > *:first-of-type': {
                    position: 'sticky',
                    left: 0,
                    boxShadow: '1px 0 var(--TableCell-borderColor)',
                    bgcolor: 'background.surface'
                  }
                }}
              >
                <thead>
                  <tr>
                    <th rowSpan={2} style={{ width: '60px' }}>
                      Sl. No.
                    </th>
                    <th rowSpan={2} style={{ width: '130px' }}>
                      Transfer ID
                    </th>
                    <th rowSpan={2} style={{ width: '140px' }}>
                      Transferred Date
                    </th>
                    <th rowSpan={2} style={{ width: '200px' }}>
                      Transferred User
                    </th>
                    <th rowSpan={2} style={{ width: '120px' }}>
                      Transferred Items
                    </th>
                    <th colSpan={4} style={{ textAlign: 'center', fontWeight: 750 }}>
                      Transferred To
                    </th>
                    <th colSpan={4} style={{ textAlign: 'center', fontWeight: 750 }}>
                      Transferred From
                    </th>
                  </tr>
                  <tr>
                    <th>Department</th>
                    <th>Department Section</th>
                    <th>Room</th>
                    <th>Sub Room</th>
                    <th>Department</th>
                    <th>Department Section</th>
                    <th>Room</th>
                    <th>Sub Room</th>
                  </tr>
                </thead>
                <tbody>
                  {trasferData?.map((val, index) => {
                    const formattedDate = (() => {
                      const date = new Date(val.transfrd_date)
                      const day = date.getDate()
                      const month = date.getMonth() + 1
                      const year = date.getFullYear()
                      const hours = date.getHours()
                      const minutes = date.getMinutes()
                      const ampm = hours >= 12 ? 'PM' : 'AM'
                      const formattedHours = hours % 12 || 12
                      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
                      return `${day}/${month}/${year} - ${formattedHours}:${formattedMinutes} ${ampm}`
                    })()

                    return (
                      <React.Fragment key={val.transfr_mast_slno}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{val.transfr_mast_slno}</td>
                          <td>{formattedDate}</td>
                          <td>{val.em_name}</td>
                          <td>
                            <div style={{ display: 'flex' }}>
                              <div style={{ flex: 1, paddingTop: 8 }}>
                                &nbsp;&nbsp;&nbsp;{val.transfer_detail_count}
                              </div>
                              <IconButton
                                aria-label="expand row"
                                variant="plain"
                                color="neutral"
                                size="sm"
                                onClick={() => HandleAssetList(val, index)}
                              >
                                {openRowIndex === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                              </IconButton>
                            </div>
                          </td>
                          <td>{val.trans_dept_name}</td>
                          <td>{val.trans_deptsec_name}</td>
                          <td>{val.trans_room_name}</td>
                          <td>{val.trans_subroom_name}</td>
                          <td>{val.trans_from_dept_name}</td>
                          <td>{val.trans_from_deptsec_name}</td>
                          <td>{val.trans_from_room_name}</td>
                          <td>{val.trans_from_subroom_name}</td>
                        </tr>
                        {openRowIndex === index && (
                          <tr>
                            <td colSpan={12} style={{ height: 0, padding: 0 }}>
                              <Sheet
                                variant="soft"
                                sx={{
                                  px: 1,
                                  pt: 1,
                                  pb: 2,
                                  width: '84vw',
                                  boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)'
                                }}
                              >
                                <TextComponent
                                  text={'Transferred Assets '}
                                  sx={{ fontWeight: 500, color: 'black', pb: 0.5 }}
                                />
                                <Table borderAxis="bothBetween" size="sm" width="50px">
                                  <thead>
                                    <tr>
                                      <th style={{ width: '40px', backgroundColor: 'white' }}>#</th>
                                      <th style={{ width: '100px', backgroundColor: 'white' }}>Asset No.</th>
                                      <th style={{ width: '600px', backgroundColor: 'white' }}>Item Name</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {detailData?.map((detail, detailIndex) => (
                                      <tr key={detailIndex}>
                                        <td style={{ backgroundColor: 'white' }}>{detailIndex + 1}</td>
                                        <td style={{ backgroundColor: 'white' }}>
                                          {detail.item_asset_no}/{String(detail.item_asset_no_only).padStart(6, '0')}
                                        </td>
                                        <td style={{ backgroundColor: 'white' }}>{detail.item_name}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              </Sheet>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    )
                  })}
                </tbody>
              </Table>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default memo(AssetTransferHistory)
