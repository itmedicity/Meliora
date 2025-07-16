import { Box, CssVarsProvider, Input, Tooltip, Chip } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import { axioslogin } from 'src/views/Axios/Axios'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import { useDispatch } from 'react-redux'
import { getBillCategory } from 'src/redux/actions/ItBillCategoryList.action'
import { infoNotify } from 'src/views/Common/CommonCode'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import SearchIcon from '@mui/icons-material/Search'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import ItBillCategoryList from 'src/views/CommonSelectCode/ItBillCategoryList'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'
import { format } from 'date-fns'
import BillModalTele from '../TeleCommunication/BillModalTele'

const YearlyPaidBills = ({ yearBills }) => {
  const [billDatas, setBillDatas] = useState([])
  const [modalFlag, setModalFlag] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [filezUrls, setFilezUrls] = useState([])
  const [searchBillNameFlag, setsearchBillNameFlag] = useState(0)
  const [alphbased, setAlphbased] = useState(0)
  const [alphbasedData, setAlphbasedData] = useState([])
  const [enterText, setEnterText] = useState('')
  const [searchBillDateFlag, setsearchBillDateFlag] = useState(0)
  const [billDatee, setBillDatee] = useState('')
  const [billDateData, setBillDateData] = useState([])
  const [searchBillCateFlag, setsearchBillCateFlag] = useState(0)
  const [billCategory, setBillCategory] = useState(0)
  const [billcate, setBillcate] = useState([])
  const [cateName, setcateName] = useState('')
  const [indexNo, setindexNo] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBillCategory())
  }, [dispatch])

  const OpenYearBillView = useCallback(value => {
    const { yearly_slno } = value
    const getbillsFile = async () => {
      const result = await axioslogin.get(`/ItImageUpload/uploadFile/getYearlyBillImages/${yearly_slno}`)
      const { success } = result.data
      if (success === 1) {
        const data = result.data
        const fileNames = data.data
        const fileUrls = fileNames.map(fileName => {
          return `${PUBLIC_NAS_FOLDER}/Bills/YearlyBill/${yearly_slno}/${fileName}`
        })
        setFilezUrls(fileUrls)
      } else {
        setFilezUrls([])
      }
    }
    getbillsFile(yearly_slno)
    setBillDatas(value)
    setModalFlag(1)
    setindexNo(yearly_slno)
    setModalOpen(true)
  }, [])

  const searchBillls = useCallback(() => {
    setsearchBillNameFlag(1)
    setsearchBillDateFlag(0)
    setsearchBillCateFlag(0)
  }, [])

  const closeBillSearch = useCallback(() => {
    setsearchBillNameFlag(0)
    setsearchBillDateFlag(0)
    setsearchBillCateFlag(0)
    setAlphbased(0)
    setEnterText('')
    setBillDatee('')
  }, [])

  const openBillDate = useCallback(() => {
    setsearchBillDateFlag(1)
    setsearchBillNameFlag(0)
    setsearchBillCateFlag(0)
  }, [])

  const OpenBillCate = useCallback(() => {
    setsearchBillDateFlag(0)
    setsearchBillNameFlag(0)
    setsearchBillCateFlag(1)
  }, [])

  const SearchBillName = useCallback(() => {
    if (enterText.length < 3) {
      infoNotify('please enter minimum 3 character to search task name')
    } else {
      let newTableDataa = yearBills && yearBills.filter(val => val.bill_name.toLowerCase().includes(enterText))
      setsearchBillNameFlag(1)
      setsearchBillDateFlag(0)
      setAlphbased(1)
      setAlphbasedData(newTableDataa)
    }
  }, [enterText, yearBills])

  useEffect(() => {
    if (alphbased === 1) {
      let newTableDataa = yearBills && yearBills.filter(val => val.bill_name.toLowerCase().includes(enterText))
      setAlphbasedData(newTableDataa)
    }
  }, [yearBills, alphbased, enterText])

  const updateEnterText = useCallback(e => {
    setEnterText(e.target.value)
  }, [])

  const updateBillDate = useCallback(e => {
    setBillDatee(e.target.value)
  }, [])

  const SearchBillCate = useCallback(() => {
    let newTableDataa = yearBills && yearBills.filter(val => val.bill_category === billCategory)
    setAlphbased(3)
    setAlphbasedData(newTableDataa)
  }, [billCategory, yearBills])

  useEffect(() => {
    if (alphbased === 3) {
      let newTableDataa = yearBills && yearBills.filter(val => val.bill_category === billCategory)
      setBillcate(newTableDataa)
    }
  }, [yearBills, alphbased, billCategory])

  const SearchBillDate = useCallback(() => {
    if (billDatee === '') {
      infoNotify('please fill date feild to search')
    } else {
      let newTableDataa = yearBills && yearBills.filter(val => val.bill_date.includes(billDatee))
      setsearchBillDateFlag(1)
      setsearchBillNameFlag(0)
      setAlphbased(2)
      setBillDateData(newTableDataa)
    }
  }, [billDatee, yearBills])
  return (
    <Box sx={{ flex: 10, maxHeight: '60vh' }}>
      {modalFlag === 1 ? (
        <BillModalTele
          modalOpen={modalOpen}
          billDatas={billDatas}
          index_no={indexNo}
          setFilezUrls={setFilezUrls}
          setModalFlag={setModalFlag}
          setModalOpen={setModalOpen}
          filezUrls={filezUrls}
          cateName={cateName}
        />
      ) : null}
      <Box sx={{ flex: 1, my: 0.2 }}>
        {yearBills.length !== 0 ? (
          <Box sx={{ flex: 1, display: 'flex', bgcolor: '#868B8E', minHeight: 30, pt: 0.5 }}>
            <Box sx={{ flex: 0.5, textAlign: 'center', fontWeight: 600, color: 'white' }}>#</Box>
            <Box sx={{ flex: 1, fontWeight: 600, color: 'white' }}></Box>
            <Box sx={{ flex: 2, fontWeight: 600, color: 'white' }}>
              Bill Date
              <ManageSearchIcon
                sx={{ color: 'white', height: 20, width: 30, cursor: 'pointer' }}
                onClick={openBillDate}
              />
              {searchBillDateFlag === 1 ? (
                <Box sx={{ display: 'flex', p: 0.2 }}>
                  <Input
                    type="date"
                    size="xs"
                    name="billDatee"
                    value={billDatee}
                    sx={{
                      height: 29,
                      borderRadius: 2,
                      width: 180,
                      pl: 1
                    }}
                    onChange={updateBillDate}
                  />

                  <CssVarsProvider>
                    <Tooltip title="search">
                      <Box
                        sx={{
                          pl: 0.5,
                          bgcolor: '#647C90',
                          cursor: 'pointer',
                          borderRight: 1,
                          borderTop: 1,
                          borderBottom: 1,
                          borderColor: '#B2C4CB',
                          '&:hover': { bgcolor: '#36454F' }
                        }}
                        onClick={SearchBillDate}
                      >
                        <SearchIcon sx={{ color: 'white', height: 20 }} />
                      </Box>
                    </Tooltip>
                  </CssVarsProvider>
                  <CssVarsProvider>
                    <Tooltip title="close">
                      <Box
                        sx={{
                          px: 0.3,
                          pt: 0.1,
                          bgcolor: '#647C90',
                          cursor: 'pointer',
                          borderRight: 1,
                          borderTop: 1,
                          borderBottom: 1,
                          borderColor: '#B2C4CB',
                          '&:hover': { bgcolor: '#36454F' }
                        }}
                        onClick={closeBillSearch}
                      >
                        <HighlightOffIcon sx={{ color: 'white', height: 20 }} />
                      </Box>
                    </Tooltip>
                  </CssVarsProvider>
                </Box>
              ) : null}
            </Box>
            <Box sx={{ flex: 2, fontWeight: 600, color: 'white' }}>Bill amount</Box>
            <Box sx={{ flex: 6, fontWeight: 600, color: 'white' }}>
              Bill Name
              <ManageSearchIcon
                sx={{ color: 'white', height: 20, width: 30, cursor: 'pointer' }}
                onClick={searchBillls}
              />
              {searchBillNameFlag === 1 ? (
                <Box sx={{ display: 'flex', p: 0.2 }}>
                  <Input
                    size="xs"
                    name="enterText"
                    value={enterText}
                    placeholder="    Type here to search bill Name ..."
                    sx={{
                      height: 29,
                      borderRadius: 2,
                      width: 350,
                      pl: 1
                    }}
                    onChange={updateEnterText}
                  />

                  <CssVarsProvider>
                    <Tooltip title="search">
                      <Box
                        sx={{
                          pl: 0.5,
                          bgcolor: '#647C90',
                          cursor: 'pointer',
                          borderRight: 1,
                          borderTop: 1,
                          borderBottom: 1,
                          borderColor: '#B2C4CB',
                          '&:hover': { bgcolor: '#36454F' }
                        }}
                        onClick={SearchBillName}
                      >
                        <SearchIcon sx={{ color: 'white', height: 20 }} />
                      </Box>
                    </Tooltip>
                  </CssVarsProvider>
                  <CssVarsProvider>
                    <Tooltip title="close">
                      <Box
                        sx={{
                          px: 0.3,
                          pt: 0.1,
                          bgcolor: '#647C90',
                          cursor: 'pointer',
                          borderRight: 1,
                          borderTop: 1,
                          borderBottom: 1,
                          borderColor: '#B2C4CB',
                          '&:hover': { bgcolor: '#36454F' }
                        }}
                        onClick={closeBillSearch}
                      >
                        <HighlightOffIcon sx={{ color: 'white', height: 20 }} />
                      </Box>
                    </Tooltip>
                  </CssVarsProvider>
                </Box>
              ) : null}
            </Box>
            <Box sx={{ flex: 2, fontWeight: 600, color: 'white' }}>
              Bill Category
              <ManageSearchIcon
                sx={{ color: 'white', height: 20, width: 30, cursor: 'pointer' }}
                onClick={OpenBillCate}
              />
              {searchBillCateFlag === 1 ? (
                <Box sx={{ display: 'flex', p: 0.2 }}>
                  <ItBillCategoryList
                    billCategory={billCategory}
                    setBillCategory={setBillCategory}
                    setName={setcateName}
                  />

                  <CssVarsProvider>
                    <Tooltip title="search">
                      <Box
                        sx={{
                          pl: 0.5,
                          bgcolor: '#647C90',
                          cursor: 'pointer',
                          borderRight: 1,
                          borderTop: 1,
                          borderBottom: 1,
                          borderColor: '#B2C4CB',
                          '&:hover': { bgcolor: '#36454F' }
                        }}
                        onClick={SearchBillCate}
                      >
                        <SearchIcon sx={{ color: 'white', height: 20 }} />
                      </Box>
                    </Tooltip>
                  </CssVarsProvider>
                  <CssVarsProvider>
                    <Tooltip title="close">
                      <Box
                        sx={{
                          px: 0.3,
                          pt: 0.1,
                          bgcolor: '#647C90',
                          cursor: 'pointer',
                          borderRight: 1,
                          borderTop: 1,
                          borderBottom: 1,
                          borderColor: '#B2C4CB',
                          '&:hover': { bgcolor: '#36454F' }
                        }}
                        onClick={closeBillSearch}
                      >
                        <HighlightOffIcon sx={{ color: 'white', height: 20 }} />
                      </Box>
                    </Tooltip>
                  </CssVarsProvider>
                </Box>
              ) : null}
            </Box>
          </Box>
        ) : null}

        {alphbased === 1 ? (
          <Box sx={{ flex: 1, maxHeight: '55vh', overflow: 'auto' }}>
            {alphbasedData &&
              alphbasedData.map(val => {
                const years = format(new Date(val.yearly_bill_generate), 'yyyy')
                return (
                  <Box
                    key={val.yearly_slno}
                    sx={{
                      minHeight: 33,
                      maxHeight: 100,
                      bgcolor: '#E3E8E9',
                      borderRadius: 0,
                      display: 'flex',
                      fontWeight: 600,
                      color: 'black',
                      borderBottom: 1,
                      borderColor: 'white',
                      mb: 0.5
                    }}
                  >
                    <Box
                      sx={{
                        flex: 0.4,
                        py: 1,
                        cursor: 'pointer'
                      }}
                    >
                      <ReceiptLongIcon sx={{ '&:hover': { color: '#274472' } }} onClick={() => OpenYearBillView(val)} />
                    </Box>
                    <Box sx={{ flex: 1, pt: 0.5, cursor: 'grab', pl: 1 }}>
                      &nbsp;
                      <Chip sx={{ bgcolor: '#F1C83A', fontSize: 14, fontWeight: 700, color: '#670305' }}>{years}</Chip>
                    </Box>
                    <Box sx={{ flex: 2, pt: 0.5 }}>
                      &nbsp;
                      {format(new Date(val.bill_date), 'yyyy-MM-dd')}
                    </Box>
                    <Box sx={{ flex: 2, pt: 0.5, color: '#145DA0' }}>
                      &nbsp;
                      <Chip sx={{ bgcolor: ' #D1E2C4', color: 'darkred', fontWeight: 800 }}>
                        <CurrencyRupeeIcon sx={{ height: 20, width: 13, color: 'darkred' }} />
                        {val.bill_amount}
                      </Chip>
                    </Box>
                    <Box sx={{ flex: 6, pt: 0.5, pl: 0.3 }}>{val.bill_name}</Box>
                    <Box sx={{ flex: 2, pt: 0.5 }}>
                      &nbsp;
                      {val.it_bill_category_name}
                    </Box>
                  </Box>
                )
              })}
          </Box>
        ) : alphbased === 2 ? (
          <Box sx={{ flex: 1, maxHeight: '55vh', overflow: 'auto' }}>
            {billDateData &&
              billDateData.map(val => {
                const years = format(new Date(val.yearly_bill_generate), 'yyyy')
                return (
                  <Box
                    key={val.yearly_slno}
                    sx={{
                      minHeight: 33,
                      maxHeight: 100,
                      bgcolor: '#E3E8E9',
                      borderRadius: 0,
                      display: 'flex',
                      fontWeight: 600,
                      color: 'black',
                      borderBottom: 1,
                      borderColor: 'white',
                      mb: 0.5,
                      pt: 0.5
                    }}
                  >
                    <Box
                      sx={{
                        flex: 0.4,
                        py: 1,
                        cursor: 'pointer'
                      }}
                    >
                      <ReceiptLongIcon sx={{ '&:hover': { color: '#274472' } }} onClick={() => OpenYearBillView(val)} />
                    </Box>
                    <Box sx={{ flex: 1, pt: 0.5, cursor: 'grab', pl: 1 }}>
                      &nbsp;
                      <Chip sx={{ bgcolor: '#F1C83A', fontSize: 14, fontWeight: 700, color: '#670305' }}>{years}</Chip>
                    </Box>
                    <Box sx={{ flex: 2, pt: 0.5 }}>
                      &nbsp;
                      {format(new Date(val.bill_date), 'yyyy-MM-dd')}
                    </Box>
                    <Box sx={{ flex: 2, pt: 0.5, color: '#145DA0' }}>
                      &nbsp;
                      <Chip sx={{ bgcolor: ' #D1E2C4', color: 'darkred', fontWeight: 800 }}>
                        <CurrencyRupeeIcon sx={{ height: 20, width: 13, color: 'darkred' }} />
                        {val.bill_amount}
                      </Chip>
                    </Box>
                    <Box sx={{ flex: 6, pt: 0.5, pl: 0.3 }}>{val.bill_name}</Box>
                    <Box sx={{ flex: 2, pt: 0.5 }}>
                      &nbsp;
                      {val.it_bill_category_name}
                    </Box>
                  </Box>
                )
              })}
          </Box>
        ) : alphbased === 3 ? (
          <Box sx={{ flex: 1, maxHeight: '55vh', overflow: 'auto' }}>
            {billcate &&
              billcate.map(val => {
                const years = format(new Date(val.yearly_bill_generate), 'yyyy')
                return (
                  <Box
                    key={val.yearly_slno}
                    sx={{
                      minHeight: 33,
                      maxHeight: 100,
                      bgcolor: '#E3E8E9',
                      borderRadius: 0,
                      display: 'flex',
                      fontWeight: 600,
                      color: 'black',
                      borderBottom: 1,
                      borderColor: 'white',
                      mb: 0.5
                    }}
                  >
                    <Box
                      sx={{
                        flex: 0.4,
                        py: 1,
                        cursor: 'pointer'
                      }}
                    >
                      <ReceiptLongIcon sx={{ '&:hover': { color: '#274472' } }} onClick={() => OpenYearBillView(val)} />
                    </Box>
                    <Box sx={{ flex: 1, pt: 0.5, cursor: 'grab', pl: 1 }}>
                      &nbsp;
                      <Chip sx={{ bgcolor: '#F1C83A', fontSize: 14, fontWeight: 700, color: '#670305' }}>{years}</Chip>
                    </Box>
                    <Box sx={{ flex: 2, pt: 0.5 }}>
                      &nbsp;
                      {format(new Date(val.bill_date), 'yyyy-MM-dd')}
                    </Box>
                    <Box sx={{ flex: 2, pt: 0.5, color: '#145DA0' }}>
                      &nbsp;
                      <Chip sx={{ bgcolor: ' #D1E2C4', color: 'darkred', fontWeight: 800 }}>
                        <CurrencyRupeeIcon sx={{ height: 20, width: 13, color: 'darkred' }} />
                        {val.bill_amount}
                      </Chip>
                    </Box>
                    <Box sx={{ flex: 6, pt: 0.5, pl: 0.3 }}>{val.bill_name}</Box>
                    <Box sx={{ flex: 2, pt: 0.5 }}>
                      &nbsp;
                      {val.it_bill_category_name}
                    </Box>
                  </Box>
                )
              })}
          </Box>
        ) : (
          <Box sx={{ flex: 1, maxHeight: '55vh', overflow: 'auto' }}>
            {yearBills &&
              yearBills.map(val => {
                const years = format(new Date(val.yearly_bill_generate), 'yyyy')
                return (
                  <Box
                    key={val.yearly_slno}
                    sx={{
                      minHeight: 33,
                      maxHeight: 100,
                      bgcolor: '#E3E8E9',
                      borderRadius: 0,
                      display: 'flex',
                      fontWeight: 600,
                      color: 'black',
                      borderBottom: 1,
                      borderColor: 'white',
                      mb: 0.5
                    }}
                  >
                    <Box
                      sx={{
                        flex: 0.4,
                        py: 1,
                        cursor: 'pointer'
                      }}
                    >
                      <ReceiptLongIcon sx={{ '&:hover': { color: '#274472' } }} onClick={() => OpenYearBillView(val)} />
                    </Box>
                    <Box sx={{ flex: 1, pt: 0.5, cursor: 'grab', pl: 1 }}>
                      &nbsp;
                      <Chip sx={{ bgcolor: '#F1C83A', fontSize: 14, fontWeight: 700, color: '#670305' }}>{years}</Chip>
                    </Box>
                    <Box sx={{ flex: 2, pt: 0.5 }}>
                      &nbsp;
                      {format(new Date(val.bill_date), 'yyyy-MM-dd')}
                    </Box>
                    <Box sx={{ flex: 2, pt: 0.5, color: '#145DA0' }}>
                      &nbsp;
                      <Chip sx={{ bgcolor: ' #D1E2C4', color: 'darkred', fontWeight: 800 }}>
                        <CurrencyRupeeIcon sx={{ height: 20, width: 13, color: 'darkred' }} />
                        {val.bill_amount}
                      </Chip>
                    </Box>
                    <Box sx={{ flex: 6, pt: 0.5, pl: 0.3 }}>{val.bill_name}</Box>
                    <Box sx={{ flex: 2, pt: 0.5 }}>
                      &nbsp;
                      {val.it_bill_category_name}
                    </Box>
                  </Box>
                )
              })}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default memo(YearlyPaidBills)
