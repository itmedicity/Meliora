import { Box, CssVarsProvider, Input, Tooltip, Chip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox'
import UpdatePendingModal from '../UpdatePendingModal'
import { axioslogin } from 'src/views/Axios/Axios'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import { infoNotify } from 'src/views/Common/CommonCode'
import SearchIcon from '@mui/icons-material/Search'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import ItBillCategoryList from 'src/views/CommonSelectCode/ItBillCategoryList'
import { useDispatch } from 'react-redux'
import { getBillCategory } from 'src/redux/actions/ItBillCategoryList.action'
import { format } from 'date-fns'
import JSZip from 'jszip'
const MonthlyBill = ({ monthlydata, billCount, setbillCount }) => {
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

  const { monthly_slno } = billData
  const UndatePending = useCallback(value => {
    const { monthly_slno } = value
    const getbillsFile = async () => {
      // const result = await axioslogin.get(`/ItImageUpload/uploadFile/getMonthlyBillImages/${monthly_slno}`)
      // const { success, data } = result.data
      // if (success === 1) {
      //   const fileNames = data
      //   const fileUrls = fileNames.map(fileName => {
      //     return `${PUBLIC_NAS_FOLDER}/Bills/MonthlyBill/${monthly_slno}/${fileName}`
      //   })
      //   setFilezUrls(fileUrls)
      // }
      setFilezUrls([])
      try {
        const result = await axioslogin.get(`/ItImageUpload/uploadFile/getMonthlyBillImages/${monthly_slno}`, {
          responseType: 'blob'
        });

        const contentType = result.headers['content-type'] || '';
        if (contentType?.includes('application/json')) {
          return;
        } else {
          const zip = await JSZip.loadAsync(result.data);
          // Extract image files (e.g., .jpg, .png)
          const imageEntries = Object.entries(zip.files).filter(
            ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
          );
          const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
            // Get the original blob (no type)
            const originalBlob = await fileObj.async('blob');
            // Determine MIME type based on filename extension (or any other logic)
            let mimeType = '';
            if (filename.endsWith('.pdf')) {
              mimeType = 'application/pdf';
            } else if (filename.endsWith('.png')) {
              mimeType = 'image/png';
            } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
              mimeType = 'image/jpeg';
            } else {
              mimeType = 'application/octet-stream'; // fallback
            }
            // Recreate blob with correct type
            const blobWithType = new Blob([originalBlob], { type: mimeType });
            // Create URL from new blob
            const url = URL.createObjectURL(blobWithType);
            return { imageName: filename, url, blob: blobWithType };
          });
          const images = await Promise.all(imagePromises);
          setFilezUrls(images)
        }
      } catch (error) {
        setFilezUrls([])
        console.error('Error fetching or processing images:', error);
      }
    }
    getbillsFile(monthly_slno)
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
      let newTableDataa = monthlydata && monthlydata.filter(val => val.bill_name.toLowerCase().includes(enterText))
      setsearchBillNameFlag(1)
      setAlphbased(1)
      setAlphbasedData(newTableDataa)
    }
  }, [enterText, monthlydata])

  useEffect(() => {
    if (alphbased === 1) {
      let newTableDataa = monthlydata && monthlydata.filter(val => val.bill_name.toLowerCase().includes(enterText))
      setAlphbasedData(newTableDataa)
    }
  }, [monthlydata, alphbased, enterText])

  const SearchBillCate = useCallback(() => {
    let newTableDataa = monthlydata && monthlydata.filter(val => val.bill_category === billCategory)
    setAlphbased(2)
    setAlphbasedData(newTableDataa)
  }, [billCategory, monthlydata])

  useEffect(() => {
    if (alphbased === 2) {
      let newTableDataa = monthlydata && monthlydata.filter(val => val.bill_category === billCategory)
      setsearchBillCateFlag(1)
      setBillcate(newTableDataa)
    }
  }, [monthlydata, alphbased, billCategory])

  const closeBillSearch = useCallback(() => {
    setsearchBillNameFlag(0)
    setsearchBillCateFlag(0)
    setAlphbased(0)
    setEnterText('')
    setBillCategory('')
    setcateName('')
  }, [])

  return (
    <Box>
      <CssVarsProvider>
        {pendingModalFlag === 1 ? (
          <UpdatePendingModal
            pendingModalOpen={pendingModalOpen}
            billData={billData}
            index_no={monthly_slno}
            filezUrls={filezUrls}
            setpendingModalFlag={setpendingModalFlag}
            setpendingModalOpen={setpendingModalOpen}
            billCount={billCount}
            setbillCount={setbillCount}
            cateName={cateName}
          />
        ) : null}
      </CssVarsProvider>
      {monthlydata.length !== 0 ? (
        <Box sx={{ flex: 1, display: 'flex', bgcolor: '#868B8E', minHeight: 30, pt: 0.5 }}>
          <Box sx={{ mx: 2.3, textAlign: 'center', fontWeight: 600, color: 'white' }}>#</Box>
          <Box sx={{ flex: 0.8, textAlign: 'center', fontWeight: 600, color: 'white' }}></Box>
          <Box sx={{ flex: 5, fontWeight: 600, color: 'white' }}>
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
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flex: 1, maxHeight: '55vh', overflow: 'auto' }}>
          {alphbased === 1 ? (
            <Box>
              {alphbasedData &&
                alphbasedData.map(val => {
                  const Monthly = format(new Date(val.monthly_bill_generate), 'MMM yyyy')
                  return (
                    <Box
                      key={val.monthly_slno}
                      sx={{
                        minHeight: 33,
                        maxHeight: 100,
                        bgcolor: '#E4E5E8',
                        borderRadius: 0,
                        display: 'flex',
                        mt: 0.5,
                        color: 'black'
                      }}
                    >
                      <Box
                        sx={{
                          p: 0.5,
                          cursor: 'pointer',
                          mx: 1
                        }}
                      >
                        <Tooltip title="Add Now" placement="bottom">
                          <AddBoxIcon sx={{ height: 20, color: '#56382D' }} onClick={() => UndatePending(val)} />
                        </Tooltip>
                      </Box>
                      <Box sx={{ flex: 0.8, pt: 0.5, cursor: 'grab', pl: 1 }}>
                        <Chip
                          sx={{
                            bgcolor: '#F1C83A',
                            fontSize: 14,
                            fontWeight: 700,
                            color: '#670305'
                          }}
                        >
                          {Monthly}
                        </Chip>
                      </Box>
                      <Tooltip title="bill name" placement="bottom">
                        <Box sx={{ flex: 5, pt: 0.5, cursor: 'grab' }}>{val.bill_name}</Box>
                      </Tooltip>
                      <Tooltip title="bill Category" placement="bottom">
                        <Box sx={{ flex: 1, pt: 0.5, cursor: 'grab' }}>{val.it_bill_category_name}</Box>
                      </Tooltip>
                    </Box>
                  )
                })}
            </Box>
          ) : alphbased === 2 ? (
            <Box sx={{ flex: 1, maxHeight: '55vh', overflow: 'auto' }}>
              {billcate &&
                billcate.map(val => {
                  const Monthly = format(new Date(val.monthly_bill_generate), 'MMM yyyy')
                  return (
                    <Box
                      key={val.monthly_slno}
                      sx={{
                        minHeight: 33,
                        maxHeight: 100,
                        bgcolor: '#E4E5E8',
                        borderRadius: 0,
                        display: 'flex',
                        mt: 0.5,
                        color: 'black'
                      }}
                    >
                      <Box
                        sx={{
                          p: 0.5,
                          cursor: 'pointer',
                          mx: 1
                        }}
                      >
                        <Tooltip title="Add Now" placement="bottom">
                          <AddBoxIcon sx={{ height: 20, color: '#56382D' }} onClick={() => UndatePending(val)} />
                        </Tooltip>
                      </Box>
                      <Box sx={{ flex: 0.8, pt: 0.5, cursor: 'grab', pl: 1 }}>
                        <Chip
                          sx={{
                            bgcolor: '#F1C83A',
                            fontSize: 14,
                            fontWeight: 700,
                            color: '#670305'
                          }}
                        >
                          {Monthly}
                        </Chip>
                      </Box>
                      <Tooltip title="bill name" placement="bottom">
                        <Box sx={{ flex: 5, pt: 0.5, cursor: 'grab' }}>{val.bill_name}</Box>
                      </Tooltip>
                      <Tooltip title="bill Category" placement="bottom">
                        <Box sx={{ flex: 1, pt: 0.5, cursor: 'grab', pl: 2 }}>{val.it_bill_category_name}</Box>
                      </Tooltip>
                    </Box>
                  )
                })}
            </Box>
          ) : (
            <Box sx={{ flex: 1, maxHeight: '55vh', overflow: 'auto' }}>
              {monthlydata &&
                monthlydata.map(val => {
                  const Monthly = format(new Date(val.monthly_bill_generate), 'MMM yyyy')
                  return (
                    <Box
                      key={val.monthly_slno}
                      sx={{
                        minHeight: 33,
                        maxHeight: 100,
                        bgcolor: '#E4E5E8',
                        borderRadius: 0,
                        display: 'flex',
                        mt: 0.5,
                        color: 'black'
                      }}
                    >
                      <Box
                        sx={{
                          p: 0.5,
                          cursor: 'pointer',
                          mx: 1
                        }}
                      >
                        <Tooltip title="Add Now" placement="bottom">
                          <AddBoxIcon sx={{ height: 20, color: '#56382D' }} onClick={() => UndatePending(val)} />
                        </Tooltip>
                      </Box>
                      <Box sx={{ flex: 0.8, pt: 0.5, cursor: 'grab' }}>
                        <Chip
                          sx={{
                            bgcolor: '#F1C83A',
                            fontSize: 14,
                            fontWeight: 700,
                            color: '#670305'
                          }}
                        >
                          {Monthly}
                        </Chip>
                      </Box>
                      <Box sx={{ flex: 5, pt: 0.5, cursor: 'grab' }}>{val.bill_name}</Box>
                      <Box sx={{ flex: 1, pt: 0.5, cursor: 'grab', pl: 2 }}>{val.it_bill_category_name}</Box>
                    </Box>
                  )
                })}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default memo(MonthlyBill)
