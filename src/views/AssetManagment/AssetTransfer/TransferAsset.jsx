import { Box, CircularProgress, IconButton, Input, Radio, RadioGroup, Sheet, Table, Tooltip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRoomBasedOnDeptSec } from 'src/redux/actions/AmRoomDeptSecBased.action'
import { getDepartment } from 'src/redux/actions/Department.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNotify, infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import TextComponent from 'src/views/Components/TextComponent'
import AssetListUnderCustodian from 'src/views/CommonSelectCode/AssetListUnderCustodian'
import AmDepartmentSelWOName from 'src/views/CommonSelectCode/AmDepartmentSelWOName'
import AmDeptSecSelectWOName from 'src/views/CommonSelectCode/AmDeptSecSelectWOName'
import AmRoomSelWONameUDepSec from 'src/views/CommonSelectCode/AmRoomSelWONameUDepSec'
import AmSubRmSelWONamURoom from 'src/views/CommonSelectCode/AmSubRmSelWONamURoom'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { getArrayOfAssetLocationDetails, getcustodianTransferHistory } from 'src/api/AssetApis'
import { useQuery } from 'react-query'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SwapHorizontalCircleSharpIcon from '@mui/icons-material/SwapHorizontalCircleSharp'
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp'
import { format } from 'date-fns'
import { FormControlLabel } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const TransferAsset = () => {
  const dispatch = useDispatch()
  const [assetData, setassetData] = useState({})
  const [custAsset, setcustAsset] = useState(0)
  const [transDept, setTransDept] = useState(0)
  const [transDeptSec, setTransDeptSec] = useState(0)
  const [roomNo, setRoomNo] = useState(0)
  const [subRoomNo, setSubRoomNo] = useState(0)
  const [selectedAssets, setSelectedAssets] = useState([])

  const empdeptname = useSelector(state => {
    return state.LoginUserData.empdeptname
  })
  const empDept = useSelector(state => {
    return state.LoginUserData.empdept
  })

  const empid = useSelector(state => {
    return state.LoginUserData.empid
  })

  useEffect(() => {
    dispatch(getDepartment())
  }, [dispatch])

  useEffect(() => {
    if (transDeptSec !== 0 && transDeptSec !== undefined) {
      dispatch(getRoomBasedOnDeptSec(transDeptSec))
    }
  }, [transDeptSec, dispatch])

  const reset = useCallback(() => {
    setcustAsset(0)
    setTransDept(0)
    setTransDeptSec(0)
    setRoomNo(0)
    setSubRoomNo(0)
  }, [])

  const postArrayOfAssetNo = useMemo(() => {
    return {
      AssetItemMapSlno: selectedAssets?.map(assetSlno => assetSlno.am_item_map_slno)
    }
  }, [selectedAssets])

  const { data: TransFerdData } = useQuery({
    queryKey: ['getArrayOfAssetLocationDetails', postArrayOfAssetNo],
    queryFn: () => getArrayOfAssetLocationDetails(postArrayOfAssetNo)
  })

  const dataTrans = useMemo(() => TransFerdData, [TransFerdData])
  const patchData = useMemo(() => {
    return dataTrans?.map(asset => ({
      item_dept_slno: transDept,
      item_deptsec_slno: transDeptSec,
      item_room_slno: roomNo !== 0 ? roomNo : null,
      item_subroom_slno: subRoomNo !== 0 ? subRoomNo : null,
      am_custodian_trans_status: 1,
      am_trans_from_dept: asset.item_dept_slno || null,
      am_trans_from_dept_sec: asset.item_deptsec_slno || null,
      am_trans_from_room: asset.item_room_slno || null,
      am_trans_from_subroom: asset.item_subroom_slno || null,
      transfer_user: empid,
      am_item_map_slno: asset.am_item_map_slno
    }))
  }, [dataTrans, transDept, transDeptSec, roomNo, subRoomNo, empid])

  const [count, setCount] = useState(0)

  const updateDeptTransfer = useCallback(() => {
    if (custAsset !== 0) {
      infoNotify(
        <>
          Click on <AddCircleIcon /> to add asset to the Transfer List.
        </>
      )
    } else {
      const patchDeptTrans = async patchData => {
        const result = await axioslogin.patch('/assetDeptTransfer/AssetTransfer', patchData)
        const { success, message } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          setSelectedAssets([])
          reset()
        } else {
          warningNotify(message)
          setSelectedAssets([])
          reset()
        }
      }
      if (transDept !== 0 && transDeptSec !== 0) {
        patchDeptTrans(patchData)
      } else {
        warningNotify('Select Department and Department Section to Transfer Asset')
      }
    }
  }, [patchData, transDept, transDeptSec, reset, setSelectedAssets, custAsset, setCount, count])

  const handleAddAsset = () => {
    if (assetData) {
      const isDuplicate = selectedAssets.some(asset => asset.am_item_map_slno === assetData.am_item_map_slno)
      if (isDuplicate) {
        infoNotify('Selected asset is already added.')
      } else {
        setSelectedAssets(prev => [...prev, assetData])
        setcustAsset(0)
      }
    }
  }

  const removeSlected = useCallback(indexToRemove => {
    setSelectedAssets(prev => prev.filter((_, index) => index !== indexToRemove))
  }, [])

  const [selectedRadio, setSelectedRadio] = useState(2)
  const [fromDate, setFromDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [selectDateFlag, setselectDateFlag] = useState(0)
  const [trasferData, setTrasferData] = useState([])

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

  const handleRadioChange = useCallback(
    event => {
      const value = Number(event.target.value)
      setSelectedRadio(value)
      if (value === 2) {
        setFromDate(format(new Date(), 'yyyy-MM-dd'))
        setToDate(format(new Date(), 'yyyy-MM-dd'))
        setselectDateFlag(0)
      } else if (value === 3) {
        setselectDateFlag(1)
        setFromDate(format(new Date(), 'yyyy-MM-dd'))
        setToDate(format(new Date(), 'yyyy-MM-dd'))
      } else if (value === 1) {
        setFromDate(null)
        setToDate(null)
        setselectDateFlag(0)
        setTrasferData([])
      }
    },
    [setToDate, setFromDate, setselectDateFlag]
  )

  const postData = useMemo(
    () => ({
      fromDate: fromDate ? format(new Date(new Date(fromDate).setHours(0, 0, 0, 0)), 'yyyy-MM-dd HH:mm:ss') : null,
      toDate: toDate ? format(new Date(new Date(toDate).setHours(23, 59, 59, 999)), 'yyyy-MM-dd HH:mm:ss') : null,
      custodianDept: empDept === 0 ? null : empDept === null ? null : empDept,
      transfrd_type: 1
    }),
    [fromDate, toDate, empDept]
  )

  const { data: custTransferHistory, isLoading } = useQuery({
    queryKey: ['getcustodianTransferHistory', postData],
    queryFn: () => getcustodianTransferHistory(postData)
  })

  const custodianTransferHistory = useMemo(() => custTransferHistory, [custTransferHistory])

  useEffect(() => {
    if (custodianTransferHistory && custodianTransferHistory.length > 0) {
      setTrasferData(custodianTransferHistory)
    } else {
      setTrasferData([])
    }
  }, [custodianTransferHistory])

  const [openRowIndex, setOpenRowIndex] = useState(null)
  const [detailData, setDetailData] = useState([])

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
      <Box sx={{ flex: 1, border: 1, borderColor: 'lightgray', m: 1, px: 1, pt: 2, pb: 1 }}>
        <Box sx={{ flex: 1, display: 'flex' }}>
          <Box sx={{ flex: 1 }}>
            <TextComponent
              text={'Custodian Department'}
              sx={{ color: 'black', fontWeight: 500, pl: 0.5 }}
            ></TextComponent>
            <Input
              sx={{
                '--Input-minHeight': '29px'
              }}
              readOnly
              value={empdeptname}
            />
          </Box>
          <Box sx={{ flex: 2, ml: 1 }}>
            <TextComponent text={'Select Asset'} sx={{ color: 'black', fontWeight: 500, pl: 0.5 }}></TextComponent>
            <AssetListUnderCustodian setassetData={setassetData} custAsset={custAsset} setcustAsset={setcustAsset} />
          </Box>
          <Box sx={{ pt: 2.5, pr: 1, pl: 0.5 }}>
            <Tooltip title="Add" placement="top">
              <AddCircleIcon sx={{ height: 32, width: 32, cursor: 'pointer' }} onClick={handleAddAsset} />
            </Tooltip>
          </Box>
          <Box sx={{ pt: 1.5, pr: 1.5 }}>
            <Tooltip title="Transfer" placement="top">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'lightgrey',
                  color: '#0F4B0F',
                  borderRadius: 5,
                  cursor: 'pointer',
                  px: 0.5,
                  py: 0.3,
                  fontWeight: 600,
                  fontSize: 15,
                  transition: 'all 0.3s ease-in-out',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    backgroundColor: 'white',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
                  },
                  '&:active': {
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
                  }
                }}
              >
                <SwapHorizontalCircleSharpIcon
                  sx={{
                    height: 32,
                    width: 32,
                    m: 0.5,
                    cursor: 'pointer'
                  }}
                  onClick={updateDeptTransfer}
                />
              </Box>
            </Tooltip>
          </Box>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', gap: 1, mt: 2 }}>
          <Box sx={{ flex: 1 }}>
            <TextComponent
              text={'Transfer to Department'}
              sx={{ color: 'black', fontWeight: 500, pl: 0.5 }}
            ></TextComponent>
            <AmDepartmentSelWOName department={transDept} setDepartment={setTransDept} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextComponent
              text={'Transfer to Department Section'}
              sx={{ color: 'black', fontWeight: 500, pl: 0.5 }}
            ></TextComponent>
            <AmDeptSecSelectWOName deptsec={transDeptSec} setDeptSec={setTransDeptSec} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextComponent text={'Transfer to Room'} sx={{ color: 'black', fontWeight: 500, pl: 0.5 }}></TextComponent>
            <AmRoomSelWONameUDepSec roomNo={roomNo} setRoomNo={setRoomNo} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextComponent
              text={'Transfer to Subroom'}
              sx={{ color: 'black', fontWeight: 500, pl: 0.5 }}
            ></TextComponent>
            <AmSubRmSelWONamURoom subRoomNo={subRoomNo} setSubRoomNo={setSubRoomNo} />
          </Box>
        </Box>
        {selectedAssets.length !== 0 ? (
          <Box
            sx={{
              flex: 1,
              mt: 1.5,
              border: 1,
              borderColor: '#BDC4C9'
            }}
          >
            <Box sx={{ flex: 1, display: 'flex', bgcolor: '#BDC4C9' }}>
              <Box sx={{ flex: 0.5, pl: 3, color: 'black', fontWeight: 600 }}>#</Box>
              <Box sx={{ flex: 2, color: 'black', fontWeight: 600 }}>Asset No.</Box>
              <Box sx={{ flex: 8, color: 'black', fontWeight: 600 }}>Asset Name</Box>
              <Box sx={{ flex: 1, color: 'black', fontWeight: 600 }}>Remove</Box>
            </Box>
            <Box
              sx={{
                maxHeight: '50vh',
                overflowY: 'auto'
              }}
            >
              {selectedAssets?.map((val, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    display: 'flex',
                    borderTop: 1,
                    borderColor: 'lightgrey'
                  }}
                >
                  <Box sx={{ flex: 0.5, pl: 3, color: 'black', fontWeight: 600, py: 0.5 }}>{index + 1}</Box>
                  <Box sx={{ flex: 2, color: 'black', fontWeight: 600, py: 0.5 }}>
                    {val.item_asset_no}/{val.item_asset_no_only.toString().padStart(6, '0')}
                  </Box>
                  <Box sx={{ flex: 8, color: 'black', fontWeight: 600, py: 0.5 }}>{val.item_name}</Box>
                  <Box sx={{ flex: 1, color: 'black', fontWeight: 600, py: 0.2 }}>
                    <DeleteOutlineIcon onClick={() => removeSlected(index)} sx={{ cursor: 'pointer' }} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ) : null}
      </Box>
      <Box sx={{ flex: 1, border: 1, borderColor: 'lightgray', m: 1, p: 0.5 }}>
        <Box sx={{ flex: 1, display: 'flex', py: 1 }}>
          <FilterAltSharpIcon />
          <TextComponent text={'Filter :'} sx={{ fontWeight: 500, pt: 0.1 }} />
          <RadioGroup
            value={selectedRadio}
            onChange={handleRadioChange}
            sx={{ display: 'flex', flexDirection: 'row', ml: 3, gap: 2 }}
          >
            <FormControlLabel
              sx={{ gap: 0.5, fontWeight: 500 }}
              value={1}
              control={<Radio color="neutral" />}
              label="All"
            />
            <FormControlLabel
              sx={{ gap: 0.5, fontWeight: 500 }}
              value={2}
              control={<Radio color="neutral" />}
              label="Today's"
            />
            <FormControlLabel
              sx={{ gap: 0.5, fontWeight: 500 }}
              value={3}
              control={<Radio color="neutral" />}
              label="Select Date"
            />
          </RadioGroup>
          {selectDateFlag === 1 ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextComponent text={'From '} sx={{ fontWeight: 500, pt: 0.5, ml: 1 }} />
              <TextFieldCustom
                type="date"
                size="sm"
                name="fromDate"
                value={fromDate}
                onchange={handleFromDateChange}
              ></TextFieldCustom>

              <TextComponent text={'To '} sx={{ fontWeight: 500, pt: 0.5, ml: 2 }} />
              <TextFieldCustom
                type="date"
                size="sm"
                name="toDate"
                value={toDate}
                onchange={handleToDateChange}
              ></TextFieldCustom>
            </Box>
          ) : null}
        </Box>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {isLoading ? (
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

export default memo(TransferAsset)
