import { Box, CssVarsProvider, Input, Tooltip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { Paper } from '@mui/material'
import UpdatePendingModal from '../UpdatePendingModal'
import { axioslogin } from 'src/views/Axios/Axios'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import { useDispatch } from 'react-redux'
import { infoNotify } from 'src/views/Common/CommonCode'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import SearchIcon from '@mui/icons-material/Search'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import ItBillCategoryList from 'src/views/CommonSelectCode/ItBillCategoryList'
import { getBillCategory } from 'src/redux/actions/ItBillCategoryList.action'

const OtherBills = ({ otherData, billCount, setbillCount }) => {
  const [pendingModalOpen, setpendingModalOpen] = useState(false)
  const [pendingModalFlag, setpendingModalFlag] = useState(0)
  const [billData, setBillData] = useState([])
  const [filezUrls, setFilezUrls] = useState([])
  const [searchBillNameFlag, setsearchBillNameFlag] = useState(0)
  const [alphbased, setAlphbased] = useState(0)
  const [alphbasedData, setAlphbasedData] = useState([])
  const [enterText, setEnterText] = useState('')
  const [searchBillCateFlag, setsearchBillCateFlag] = useState(0)
  const [billCategory, setBillCategory] = useState(0)
  const [billcate, setBillcate] = useState([])
  const [cateName, setcateName] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBillCategory())
  }, [dispatch])

  const UndatePending = useCallback(value => {
    const { other_bill_slno } = value
    const getbillsFile = async () => {
      const result = await axioslogin.get(
        `/ItImageUpload/uploadFile/getOtherBillImages/${other_bill_slno}`
      )
      const { success } = result.data
      if (success === 1) {
        const data = result.data
        const fileNames = data.data
        const fileUrls = fileNames.map(fileName => {
          return `${PUBLIC_NAS_FOLDER}/Bills/OtherBill/${other_bill_slno}/${fileName}`
        })
        setFilezUrls(fileUrls)
      } else {
        setFilezUrls([])
      }
    }
    getbillsFile(other_bill_slno)
    setBillData(value)
    setpendingModalFlag(1)
    setpendingModalOpen(true)
  }, [])
  const searchBillls = useCallback(() => {
    setsearchBillNameFlag(1)
    setsearchBillCateFlag(0)
  }, [])
  const OpenBillCate = useCallback(() => {
    setsearchBillNameFlag(0)
    setsearchBillCateFlag(1)
  }, [])
  const updateEnterText = useCallback(e => {
    setEnterText(e.target.value)
  }, [])
  const SearchBillName = useCallback(() => {
    if (enterText.length < 3) {
      infoNotify('please enter minimum 3 character to search task name')
    } else {
      let newTableDataa =
        otherData && otherData.filter(val => val.bill_name.toLowerCase().includes(enterText))
      setsearchBillNameFlag(1)
      setAlphbased(1)
      setAlphbasedData(newTableDataa)
    }
  }, [enterText, otherData])

  useEffect(() => {
    if (alphbased === 1) {
      let newTableDataa =
        otherData && otherData.filter(val => val.bill_name.toLowerCase().includes(enterText))
      setAlphbasedData(newTableDataa)
    }
  }, [otherData, alphbased, enterText])

  const SearchBillCate = useCallback(() => {
    let newTableDataa = otherData && otherData.filter(val => val.bill_category === billCategory)
    setAlphbased(2)
    setAlphbasedData(newTableDataa)
  }, [billCategory, otherData])

  useEffect(() => {
    if (alphbased === 2) {
      let newTableDataa = otherData && otherData.filter(val => val.bill_category === billCategory)
      setsearchBillCateFlag(1)
      setBillcate(newTableDataa)
    }
  }, [otherData, alphbased, billCategory])

  const closeBillSearch = useCallback(() => {
    setsearchBillNameFlag(0)
    setsearchBillCateFlag(0)
    setAlphbased(0)
    setEnterText('')
    setBillCategory('')
    setcateName('')
  }, [])

  const { other_bill_slno, bill_description } = billData

  return (
    <Box>
      <CssVarsProvider>
        {pendingModalFlag === 1 ? (
          <UpdatePendingModal
            pendingModalOpen={pendingModalOpen}
            billData={billData}
            index_no={other_bill_slno}
            filezUrls={filezUrls}
            setpendingModalFlag={setpendingModalFlag}
            setpendingModalOpen={setpendingModalOpen}
            billCount={billCount}
            setbillCount={setbillCount}
            bill_description={bill_description}
            cateName={cateName}
          />
        ) : null}
      </CssVarsProvider>
      {otherData.length !== 0 ? (
        <Box sx={{ flex: 1, display: 'flex', bgcolor: '#868B8E', minHeight: 30, pt: 0.5 }}>
          <Box sx={{ mx: 2.3, textAlign: 'center', fontWeight: 600, color: 'white' }}>#</Box>
          <Box sx={{ flex: 3, fontWeight: 600, color: 'white', pl: 1 }}>
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
                    pl: 1,
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
                        '&:hover': { bgcolor: '#36454F' },
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
                        '&:hover': { bgcolor: '#36454F' },
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
          <Box sx={{ flex: 1, fontWeight: 600, color: 'white' }}>
            Category
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
                        '&:hover': { bgcolor: '#36454F' },
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
                        '&:hover': { bgcolor: '#36454F' },
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
      <Box>
        {alphbased === 1 ? (
          <Box sx={{ flex: 1, maxHeight: '55vh', overflow: 'auto' }}>
            {alphbasedData &&
              alphbasedData.map(val => {
                return (
                  <Paper
                    key={val.other_bill_slno}
                    sx={{
                      minHeight: 33,
                      maxHeight: 100,
                      bgcolor: '#E4E5E8',
                      borderRadius: 0,
                      display: 'flex',
                      mt: 0.5,
                      color: 'black',
                    }}
                  >
                    <Box
                      sx={{
                        p: 0.5,
                        cursor: 'pointer',
                        mx: 1,
                      }}
                    >
                      <Tooltip title="Add Now" placement="bottom">
                        <AddBoxIcon
                          sx={{ height: 20, color: '#56382D' }}
                          onClick={() => UndatePending(val)}
                        />
                      </Tooltip>
                    </Box>
                    <Tooltip title="bill name" placement="bottom">
                      <Box sx={{ flex: 3, pt: 0.5, cursor: 'grab', pl: 0.5 }}>{val.bill_name}</Box>
                    </Tooltip>
                    <Tooltip title="bill Category" placement="bottom">
                      <Box sx={{ flex: 1, pt: 0.5, cursor: 'grab', pl: 0.5 }}>
                        {val.it_bill_category_name}
                      </Box>
                    </Tooltip>
                  </Paper>
                )
              })}
          </Box>
        ) : alphbased === 2 ? (
          <Box sx={{ flex: 1, maxHeight: '55vh', overflow: 'auto' }}>
            {billcate &&
              billcate.map(val => {
                return (
                  <Paper
                    key={val.other_bill_slno}
                    sx={{
                      minHeight: 33,
                      maxHeight: 100,
                      bgcolor: '#E4E5E8',
                      borderRadius: 0,
                      display: 'flex',
                      mt: 0.5,
                      color: 'black',
                    }}
                  >
                    <Box
                      sx={{
                        p: 0.5,
                        cursor: 'pointer',
                        mx: 1,
                      }}
                    >
                      <Tooltip title="Add Now" placement="bottom">
                        <AddBoxIcon
                          sx={{ height: 20, color: '#56382D' }}
                          onClick={() => UndatePending(val)}
                        />
                      </Tooltip>
                    </Box>
                    <Tooltip title="bill name" placement="bottom">
                      <Box sx={{ flex: 3, pt: 0.5, cursor: 'grab', pl: 0.5 }}>{val.bill_name}</Box>
                    </Tooltip>
                    <Tooltip title="bill Category" placement="bottom">
                      <Box sx={{ flex: 1, pt: 0.5, cursor: 'grab', pl: 0.5 }}>
                        {val.it_bill_category_name}
                      </Box>
                    </Tooltip>
                  </Paper>
                )
              })}
          </Box>
        ) : (
          <Box sx={{ flex: 1, maxHeight: '55vh', overflow: 'auto' }}>
            {otherData &&
              otherData.map(val => {
                return (
                  <Paper
                    key={val.other_bill_slno}
                    sx={{
                      minHeight: 33,
                      maxHeight: 100,
                      bgcolor: '#E4E5E8',
                      borderRadius: 0,
                      display: 'flex',
                      mt: 0.5,
                      color: 'black',
                    }}
                  >
                    <Box
                      sx={{
                        p: 0.5,
                        cursor: 'pointer',
                        mx: 1,
                      }}
                    >
                      <Tooltip title="Add Now" placement="bottom">
                        <AddBoxIcon
                          sx={{ height: 20, color: '#56382D' }}
                          onClick={() => UndatePending(val)}
                        />
                      </Tooltip>
                    </Box>
                    <Box sx={{ flex: 3, pt: 0.5, cursor: 'grab', pl: 0.5 }}>{val.bill_name}</Box>
                    <Box sx={{ flex: 1, pt: 0.5, cursor: 'grab', pl: 0.5 }}>
                      {val.it_bill_category_name}
                    </Box>
                  </Paper>
                )
              })}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default memo(OtherBills)
