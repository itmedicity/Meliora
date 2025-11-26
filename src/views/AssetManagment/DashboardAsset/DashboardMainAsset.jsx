import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, CssVarsProvider, Grid } from '@mui/joy'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import {
  getActiveItemsWarrentyGaurentee,
  getAllAmcCmcUnderCustodian,
  getAssetCount,
  getAssetValue,
  getCategoryDetails,
  getCategoryDetailsSpare,
  getExpiredAmcCmc,
  getExpiredWarGaur,
  getSpareCount,
  getSpareValue
} from 'src/api/CommonApi'
import DashBoadTile from './DashBoadTile'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'
import FitbitIcon from '@mui/icons-material/Fitbit'
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices'
import { addMonths, isAfter, isBefore, parseISO } from 'date-fns'
import AmcCmcWarGaurDetailsView from './AmcCmcWarGaurDetailsView'
import EngineeringIcon from '@mui/icons-material/Engineering'
import { taskColor } from 'src/color/Color'

const DashboardMainAsset = () => {
  const [categoryDetails, setcategoryDetails] = useState([])
  const [categoryDetailsSpare, setcategoryDetailsSpare] = useState([])
  const [assetTotVal, setassetTotVal] = useState(0)
  const [spareTotVal, setspareTotVal] = useState(0)
  const [totAssetcount, settotAssetcount] = useState(0)
  const [spareCount, setspareCount] = useState(0)
  const TotalAssetValue = assetTotVal + spareTotVal

  const empdeptname = useSelector(state => {
    return state.LoginUserData.empdeptname
  })

  const empdept = useSelector(state => {
    return state.LoginUserData.empdept
  })

  const postData = useMemo(() => {
    return {
      am_custodian_dept_slno: empdept
    }
  }, [empdept])

  const { data: queryDataVal } = useQuery({
    queryKey: ['getCategoryDetailsDash', postData],
    queryFn: () => getCategoryDetails(postData)
  })

  const { data: queryDataSpareVal } = useQuery({
    queryKey: ['getCategoryDetailsSpare', postData],
    queryFn: () => getCategoryDetailsSpare(postData)
  })

  const { data: assetCountDataVal } = useQuery({
    queryKey: ['getAssetCount', postData],
    queryFn: () => getAssetCount(postData)
  })

  const { data: spareCountDataVal } = useQuery({
    queryKey: ['getSpareCount', postData],
    queryFn: () => getSpareCount(postData)
  })

  const { data: assetValueVal } = useQuery({
    queryKey: ['getAssetValue', postData],
    queryFn: () => getAssetValue(postData)
  })

  const { data: spareValueVal } = useQuery({
    queryKey: ['getSpareValue', postData],
    queryFn: () => getSpareValue(postData)
  })

  const queryData = useMemo(() => queryDataVal, [queryDataVal])
  const queryDataSpare = useMemo(() => queryDataSpareVal, [queryDataSpareVal])
  const assetCountData = useMemo(() => assetCountDataVal, [assetCountDataVal])
  const spareCountData = useMemo(() => spareCountDataVal, [spareCountDataVal])
  const assetValue = useMemo(() => assetValueVal, [assetValueVal])
  const spareValue = useMemo(() => spareValueVal, [spareValueVal])

  useEffect(() => {
    if (queryData) {
      setcategoryDetails(queryData)
    } else {
      setcategoryDetails([])
    }
  }, [queryData])

  useEffect(() => {
    if (queryDataSpare) {
      setcategoryDetailsSpare(queryDataSpare)
    } else {
      setcategoryDetailsSpare([])
    }
  }, [queryDataSpare])

  useEffect(() => {
    if (assetCountData) {
      settotAssetcount(assetCountData)
    } else {
      settotAssetcount(0)
    }
  }, [assetCountData])

  useEffect(() => {
    if (spareCountData) {
      setspareCount(spareCountData)
    } else {
      setspareCount(0)
    }
  }, [spareCountData])

  useEffect(() => {
    if (assetValue && assetValue.length > 0) {
      const { tot_asset } = assetValue[0]
      setassetTotVal(tot_asset)
    } else {
      setassetTotVal(0)
    }
  }, [assetValue])

  useEffect(() => {
    if (spareValue && spareValue.length > 0) {
      const { tot_spare } = spareValue[0]
      setspareTotVal(tot_spare)
    } else {
      setspareTotVal(0)
    }
  }, [spareValue])

  const combinedArray = [...categoryDetails, ...categoryDetailsSpare]

  const AllCategory = combinedArray.filter(
    (value, index, self) =>
      index ===
      self.findIndex(item => item.category_slno === value.category_slno && item.category_name === value.category_name)
  )
  AllCategory.sort((a, b) => a.category_name.localeCompare(b.category_name))




  const { data: amcCmcItemUnderCustodian } = useQuery({
    queryKey: ['getAmcCmcActiveUnderCustodian', postData],
    queryFn: () => getAllAmcCmcUnderCustodian(postData)
  })

  const { data: ExpiredAmcCmc } = useQuery({
    queryKey: ['getAllExpiredAmcCmc', postData],
    queryFn: () => getExpiredAmcCmc(postData)
  })

  const today = new Date()
  const oneMonthFromNow = addMonths(today, 1)
  const threeMonthsFromNow = addMonths(today, 3)

  const amcCmcExpiringIn3Months = amcCmcItemUnderCustodian?.filter(item => {
    const toDate = parseISO(item.to_date)
    return isAfter(toDate, today) && isBefore(toDate, threeMonthsFromNow)
  })
  const amcCmcExpiringIn1Month = amcCmcItemUnderCustodian?.filter(item => {
    const toDate = parseISO(item.to_date)
    return isAfter(toDate, today) && isBefore(toDate, oneMonthFromNow)
  })

  const allAmcCmcCount = amcCmcItemUnderCustodian?.length || 0
  const amcCmcExpiringInOnemonthCount = amcCmcExpiringIn1Month?.length || 0
  const amcCmcExpiringInThreemonthCount = amcCmcExpiringIn3Months?.length || 0
  const AllExpiredAmcCmc = ExpiredAmcCmc?.length || 0

  const { data: getActiveItemWarrentyGaurentee } = useQuery({
    queryKey: ['getActiveWarrentyGaurentee', postData],
    queryFn: () => getActiveItemsWarrentyGaurentee(postData)
  })

  const { data: ExpiredWarGaur } = useQuery({
    queryKey: ['getAllExpiredWargaur', postData],
    queryFn: () => getExpiredWarGaur(postData)
  })

  const WarGaurExpiringIn3Months = getActiveItemWarrentyGaurentee?.filter(item => {
    const toDate = parseISO(item.to_date)
    return isAfter(toDate, today) && isBefore(toDate, threeMonthsFromNow)
  })
  const WarGaurExpiringIn1Month = getActiveItemWarrentyGaurentee?.filter(item => {
    const toDate = parseISO(item.to_date)
    return isAfter(toDate, today) && isBefore(toDate, oneMonthFromNow)
  })

  const ActiveItemWarGaurCount = getActiveItemWarrentyGaurentee?.length || 0
  const warGaurExpiringInOnemonthCount = WarGaurExpiringIn1Month?.length || 0
  const warGaurExpiringInThreemonthCount = WarGaurExpiringIn3Months?.length || 0
  const AllExpiredWarGaur = ExpiredWarGaur?.length || 0

  const [detailOpen, setDetailOpen] = useState(0)
  const [detailArray, setDetailArray] = useState([])

  const DetailViewAcmCmcActive = useCallback(() => {
    setDetailOpen(1)
    setDetailArray(amcCmcItemUnderCustodian)
  }, [amcCmcItemUnderCustodian])

  const DetailViewAcmCmcExpinThreeMonth = useCallback(() => {
    setDetailOpen(1)
    setDetailArray(amcCmcExpiringIn3Months)
  }, [amcCmcExpiringIn3Months])

  const DetailViewAcmCmcExpinOneMonth = useCallback(() => {
    setDetailOpen(1)
    setDetailArray(amcCmcExpiringIn1Month)
  }, [amcCmcExpiringIn1Month])

  const DetailViewAcmCmcExprd = useCallback(() => {
    setDetailOpen(1)
    setDetailArray(ExpiredAmcCmc)
  }, [ExpiredAmcCmc])

  const DetailViewWarGaurActive = useCallback(() => {
    setDetailOpen(1)
    setDetailArray(getActiveItemWarrentyGaurentee)
  }, [getActiveItemWarrentyGaurentee])

  const DetailViewWarGaurExpinOneMonth = useCallback(() => {
    setDetailOpen(1)
    setDetailArray(WarGaurExpiringIn1Month)
  }, [WarGaurExpiringIn1Month])

  const DetailViewWarGaurExpinThreeMonth = useCallback(() => {
    setDetailOpen(1)
    setDetailArray(WarGaurExpiringIn3Months)
  }, [WarGaurExpiringIn3Months])

  const DetailViewWarGaurExpired = useCallback(() => {
    setDetailOpen(1)
    setDetailArray(ExpiredWarGaur)
  }, [ExpiredWarGaur])

  return (
    <Box
      sx={{
        minHeight: '88vh',
        borderRadius: 1,
        boxShadow: 2,
        bgcolor: '#F4F6F9',
        pb: 0.5
      }}
    >
      <CssVarsProvider>
        {detailOpen === 1 ? (
          <Box sx={{ bgcolor: 'white', height: '90vh' }}>
            <AmcCmcWarGaurDetailsView
              setDetailOpen={setDetailOpen}
              detailArray={detailArray}
              setDetailArray={setDetailArray}
            />
          </Box>
        ) : (
          <Box>
            <Box
              sx={{
                flex: 1,
                height: 25,
                m: 1,
                fontSize: 14,
                p: 0.5,
                fontWeight: 600,
                color: '#636b74'
              }}
            >
              {empdeptname}
            </Box>
            <Box sx={{ flex: 1, height: 64, mx: 1, display: 'flex', gap: 0.5, mb: 0.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  border: 1,
                  borderColor: '#d0d6e5',
                  flex: 1,
                  bgcolor: 'white',
                  borderRadius: 5
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    m: 0.5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 1,
                    borderColor: '#d0d6e5',
                    bgcolor: '#f5fcf5'
                  }}
                >
                  <CurrencyRupeeIcon sx={{ width: 35, height: 35, color: 'darkgreen' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ fontSize: 14, fontWeight: 600, color: '#636b74', pl: 0.8, pt: 0.5 }}>
                    Total Asset & Spare Value
                  </Box>
                  <Box sx={{ fontSize: 20, fontWeight: 600, color: 'darkgreen', pt: 0.1 }}>
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                      currencyDisplay: 'code'
                    })
                      .format(TotalAssetValue)
                      .replace('INR', '')}
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  border: 1,
                  borderColor: '#d0d6e5',
                  flex: 1,
                  bgcolor: 'white',
                  borderRadius: 5
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    m: 0.5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 1,
                    borderColor: '#d0d6e5',
                    bgcolor: '#f5fcf5'
                  }}
                >
                  <CurrencyRupeeIcon sx={{ width: 35, height: 35, color: taskColor.darkPurple }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ fontSize: 14, fontWeight: 600, color: taskColor.darkPurple, pl: 0.8, pt: 0.5 }}>
                    Total Asset Value
                  </Box>
                  <Box sx={{ fontSize: 20, fontWeight: 600, color: taskColor.darkPurple, pt: 0.1 }}>
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                      currencyDisplay: 'code'
                    })
                      .format(assetTotVal)
                      .replace('INR', '')}
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  border: 1,
                  borderColor: '#d0d6e5',
                  flex: 1,
                  bgcolor: 'white',
                  borderRadius: 5
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    m: 0.5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 1,
                    borderColor: '#d0d6e5',
                    bgcolor: '#f5fcf5'
                  }}
                >
                  <CurrencyRupeeIcon sx={{ width: 35, height: 35, color: '#41729F' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ fontSize: 14, fontWeight: 600, color: '#636b74', pl: 0.8, pt: 0.5 }}>
                    Total Spare Value
                  </Box>
                  <Box sx={{ fontSize: 20, fontWeight: 600, color: '#41729F', pt: 0.1 }}>
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                      currencyDisplay: 'code'
                    })
                      .format(spareTotVal)
                      .replace('INR', '')}
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  border: 1,
                  borderColor: '#d0d6e5',
                  flex: 1,
                  bgcolor: 'white',
                  borderRadius: 5
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    m: 0.5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 1,
                    borderColor: '#d0d6e5',
                    bgcolor: '#fafcfe'
                  }}
                >
                  <FitbitIcon sx={{ width: 35, height: 35, color: '#8d289bff' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ fontSize: 14, fontWeight: 600, color: '#636b74', pl: 0.8, pt: 0.5 }}>
                    Total Asset Count
                  </Box>
                  <Box sx={{ fontSize: 20, fontWeight: 600, color: '#8d289bff', pt: 0.1, pl: 1 }}>{totAssetcount}</Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  border: 1,
                  borderColor: 'lightgrey',
                  flex: 1,
                  bgcolor: 'white',
                  borderRadius: 5
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    m: 0.5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 1,
                    borderColor: '#d0d6e5',
                    bgcolor: '#fef5f5'
                  }}
                >
                  <MiscellaneousServicesIcon sx={{ width: 35, height: 35, color: '#a31545' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ fontSize: 14, fontWeight: 600, color: '#636b74', pl: 0.8, pt: 0.5 }}>
                    Total Spare Count
                  </Box>
                  <Box sx={{ fontSize: 20, fontWeight: 600, color: '#a31545', pt: 0.1, pl: 1 }}>{spareCount}</Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ mx: 1, borderRadius: 5 }}>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Box
                  sx={{
                    flex: 1,
                    borderRadius: 5,
                    border: 1,
                    borderColor: '#d0d6e5',
                    bgcolor: 'white',
                    pb: 0.5
                  }}
                >
                  <Box
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#636b74',
                      pl: 1.5,
                      pt: 1,
                      pb: 0.5
                    }}
                  >
                    AMC/CMC
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5, px: 0.8 }}>
                    <Box sx={{ flex: 1, height: 55, display: 'flex', mb: 0.5 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          border: 1,
                          borderColor: '#d0d6e5',
                          flex: 1,
                          borderRadius: 5,
                          bgcolor: '#fafbfd',
                          cursor: 'pointer'
                        }}
                        onClick={DetailViewAcmCmcActive}
                      >
                        <Box
                          sx={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#636b74',
                            pl: 1,
                            pt: 2,
                            flex: 1
                          }}
                        >
                          Active Amc/Cmc Items
                        </Box>
                        <Box
                          sx={{
                            width: 60,
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: 20,
                            fontWeight: 600,
                            color: '#41729F',
                            alignItems: 'center'
                          }}
                        >
                          {allAmcCmcCount}
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 1, height: 55, display: 'flex', mb: 0.5 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          border: 1,
                          borderColor: '#d0d6e5',
                          flex: 1,
                          borderRadius: 5,
                          bgcolor: '#fafbfd',
                          cursor: 'pointer'
                        }}
                        onClick={DetailViewAcmCmcExpinThreeMonth}
                      >
                        <Box
                          sx={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#636b74',
                            pl: 1,
                            pt: 2,
                            flex: 1
                          }}
                        >
                          Near Expiry Within Three Month
                        </Box>
                        <Box
                          sx={{
                            width: 60,
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: 20,
                            fontWeight: 600,
                            color: '#41729F',
                            alignItems: 'center'
                          }}
                        >
                          {amcCmcExpiringInThreemonthCount}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5, px: 0.8 }}>
                    <Box sx={{ flex: 1, height: 55, display: 'flex', mb: 0.5 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          border: 1,
                          borderColor: '#d0d6e5',
                          flex: 1,
                          borderRadius: 5,
                          bgcolor: '#fafbfd',
                          cursor: 'pointer'
                        }}
                        onClick={DetailViewAcmCmcExpinOneMonth}
                      >
                        <Box
                          sx={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#636b74',
                            pl: 1,
                            pt: 2,
                            flex: 1
                          }}
                        >
                          Near Expiry Within One Month
                        </Box>

                        <Box
                          sx={{
                            width: 60,
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: 20,
                            fontWeight: 600,
                            color: '#41729F',
                            alignItems: 'center'
                          }}
                        >
                          {amcCmcExpiringInOnemonthCount}
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 1, height: 55, display: 'flex', mb: 0.5 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          border: 1,
                          borderColor: '#d0d6e5',
                          flex: 1,
                          borderRadius: 5,
                          bgcolor: '#fafbfd',
                          cursor: 'pointer'
                        }}
                        onClick={DetailViewAcmCmcExprd}
                      >
                        <Box
                          sx={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#636b74',
                            pl: 1,
                            pt: 2,
                            flex: 1
                          }}
                        >
                          Expired
                        </Box>
                        <Box
                          sx={{
                            width: 60,
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: 20,
                            fontWeight: 600,
                            color: '#41729F',
                            alignItems: 'center'
                          }}
                        >
                          {AllExpiredAmcCmc}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    borderRadius: 5,
                    border: 1,
                    borderColor: '#d0d6e5',
                    bgcolor: 'white',
                    pb: 0.5
                  }}
                >
                  <Box
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#636b74',
                      pl: 1.5,
                      pt: 1,
                      pb: 0.5
                    }}
                  >
                    Warrenty/Gaurentee
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5, px: 0.8 }}>
                    <Box sx={{ flex: 1, height: 55, display: 'flex', mb: 0.5 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          border: 1,
                          borderColor: '#d0d6e5',
                          flex: 1,
                          borderRadius: 5,
                          bgcolor: '#fafbfd',
                          cursor: 'pointer'
                        }}
                        onClick={DetailViewWarGaurActive}
                      >
                        <Box
                          sx={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#636b74',
                            pl: 1,
                            pt: 2,
                            flex: 1
                          }}
                        >
                          Active Warrenty/Gaurentee Items
                        </Box>
                        <Box
                          sx={{
                            width: 60,
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: 20,
                            fontWeight: 600,
                            color: '#41729F',
                            alignItems: 'center'
                          }}
                        >
                          {ActiveItemWarGaurCount}
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 1, height: 55, display: 'flex', mb: 0.5 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          border: 1,
                          borderColor: '#d0d6e5',
                          flex: 1,
                          borderRadius: 5,
                          bgcolor: '#fafbfd',
                          cursor: 'pointer'
                        }}
                        onClick={DetailViewWarGaurExpinThreeMonth}
                      >
                        <Box
                          sx={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#636b74',
                            pl: 1,
                            pt: 2,
                            flex: 1
                          }}
                        >
                          Near Expiry Within Three Month
                        </Box>
                        <Box
                          sx={{
                            width: 60,
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: 20,
                            fontWeight: 600,
                            color: '#41729F',
                            alignItems: 'center'
                          }}
                        >
                          {warGaurExpiringInThreemonthCount}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5, px: 0.8 }}>
                    <Box sx={{ flex: 1, height: 55, display: 'flex', mb: 0.5 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          border: 1,
                          borderColor: '#d0d6e5',
                          flex: 1,
                          borderRadius: 5,
                          bgcolor: '#fafbfd',
                          cursor: 'pointer'
                        }}
                        onClick={DetailViewWarGaurExpinOneMonth}
                      >
                        <Box
                          sx={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#636b74',
                            pl: 1,
                            pt: 2,
                            flex: 1
                          }}
                        >
                          Near Expiry Within One Month
                        </Box>
                        <Box
                          sx={{
                            width: 60,
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: 20,
                            fontWeight: 600,
                            color: '#41729F',
                            alignItems: 'center'
                          }}
                        >
                          {warGaurExpiringInOnemonthCount}
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 1, height: 55, display: 'flex', mb: 0.5 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          border: 1,
                          borderColor: '#d0d6e5',
                          flex: 1,
                          borderRadius: 5,
                          bgcolor: '#fafbfd',
                          cursor: 'pointer'
                        }}
                        onClick={DetailViewWarGaurExpired}
                      >
                        <Box
                          sx={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#636b74',
                            pl: 1,
                            pt: 2,
                            flex: 1
                          }}
                        >
                          Expired
                        </Box>
                        <Box
                          sx={{
                            width: 60,
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: 20,
                            fontWeight: 600,
                            color: '#41729F',
                            alignItems: 'center'
                          }}
                        >
                          {AllExpiredWarGaur}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                flex: 1,
                border: 1,
                borderColor: '#d0d6e5',
                borderRadius: 5,
                mx: 1,
                mt: 0.5,
                mb: 1,
                bgcolor: 'white'
              }}
            >
              <Box sx={{ fontSize: 14, fontWeight: 600, color: '#636b74', pl: 1.5, pt: 1, pb: 0.5 }}>Category</Box>
              <Box sx={{ flex: 1, mx: 0.5, overflowY: 'auto', overflowX: 'hidden', height: '80%' }}>
                <Box sx={{ pb: 1, px: 0.5 }}>
                  <Grid container spacing={0.5} sx={{ flex: 1 }}>
                    {AllCategory?.map(val => {
                      // const imageUrl = val.file_name
                      //   ? `${PUBLIC_NAS_FOLDER}/AssetName/Category/${val.category_slno}/${val.file_name}`


                      //   : null
                      return (
                        <Grid xs={12} sm={12} md={6} lg={4} xl={3} key={val.category_slno}>
                          <DashBoadTile
                            // imageUrl={imageUrl}
                            Name={val.category_name}
                            totalCount={
                              val.asset_item_service_0_count !== undefined ||
                                val.asset_item_service_1_count !== undefined
                                ? val.asset_item_service_0_count + val.asset_item_service_1_count
                                : val.spare_service_0_count + val.spare_service_1_count
                            }
                            icon={<EngineeringIcon sx={{ color: 'lightgrey' }} />}
                          />
                        </Grid>
                      )
                    })}
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </CssVarsProvider>
    </Box>
  )
}

export default memo(DashboardMainAsset)
