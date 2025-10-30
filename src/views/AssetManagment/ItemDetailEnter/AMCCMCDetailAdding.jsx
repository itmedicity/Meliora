import React, { memo, useCallback, useState, useMemo, useEffect } from 'react'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from '../../Components/CusIconButton'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { format } from 'date-fns'
import { getAmcCmcMaster } from 'src/redux/actions/AmAmcCmcSlect.action'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import SupplierSelectMaster from './SupplierSelectMaster'
import AMCCMCAddingModal from './AMCCMCAddingModal'
import AmcCmcAdding from './AmcCmcAdding'
import TextComponent from 'src/views/Components/TextComponent'
import { Box } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close'
import { getAmcCmcPmData } from 'src/api/AssetApis'
import { useQuery } from '@tanstack/react-query'
import AddIcon from '@mui/icons-material/Add'
import { Virtuoso } from 'react-virtuoso'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'
import FileView from '../AssetFileView/FileView'
import LinkSharpIcon from '@mui/icons-material/LinkSharp'
import { getFilesFromZip } from 'src/api/FileViewsFn'

const AMCCMCDetailAdding = ({ detailArry }) => {
  const { am_item_map_slno } = detailArry

  const dispatch = useDispatch()
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const [amcStatus, setamcStatus] = useState(false)
  const [cmcStatus, setcmcStatus] = useState(false)
  const [supplier, setSupplier] = useState(0)
  const [billDate, setBillDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [SupplerModal, setSupplerModal] = useState(0)
  const [AmcCmcArray, setAmcCmcArray] = useState([])
  const [count, setCount] = useState(0)
  const [itemAmcCmcslno, setItemAmcCmcslno] = useState(0)
  const [amccmcDetailList, setamccmcDetailList] = useState([])
  const [imagearray, setImageArry] = useState([])
  const [imageshow, setImageShow] = useState(false)
  const [amcCmcDetail, setamcCmcDetal] = useState({
    sup_name: '',
    amccmc_from: '',
    amccmc_to: '',
    amcImage: '',
    amcCmcSlno: ''
  })
  const { sup_name, amccmc_from, amccmc_to, amcImage, amcCmcSlno } = amcCmcDetail

  const [AddnewAmcFlg, setNewAMCFlg] = useState(0)
  const [amccmcAddFlag, setamccmcAddFlag] = useState(0)
  const [imageshowFlag, setImageShowFlag] = useState(0)

  const reset = useCallback(() => {
    setSupplier(0)
    setBillDate(format(new Date(), 'yyyy-MM-dd'))
    setSupplerModal(0)
    setAmcCmcArray([])
  }, [])

  const updateamcStatus = useCallback(
    e => {
      if (e.target.checked === true) {
        setamcStatus(true)
        setcmcStatus(false)
        reset()
        dispatch(getAmcCmcMaster())
      } else {
        setamcStatus(false)
        setcmcStatus(false)
      }
    },
    [dispatch, reset]
  )

  const updatecmcStatus = useCallback(
    e => {
      if (e.target.checked === true) {
        setcmcStatus(true)
        setamcStatus(false)
        reset()
        dispatch(getAmcCmcMaster())
      } else {
        setcmcStatus(false)
        setamcStatus(false)
      }
    },
    [dispatch, reset]
  )

  const updateBillDate = useCallback(e => {
    setBillDate(e.target.value)
  }, [])

  const { data: amcCmcDetailsVal } = useQuery({
    queryKey: ['getAmcCmcPmData', count],
    enabled: am_item_map_slno !== undefined,
    queryFn: () => getAmcCmcPmData(am_item_map_slno)
  })

  const amcCmcDetails = useMemo(() => amcCmcDetailsVal, [amcCmcDetailsVal])

  useEffect(() => {
    if (amcCmcDetails && amcCmcDetails.length > 0) {
      const { it_supplier_name, from_date, to_date, image_upload, amc_slno, am_item_amcpm_slno, amc, cmc } =
        amcCmcDetails[0]

      const UpdatedData = {
        sup_name: it_supplier_name,
        amccmc_from: from_date,
        amccmc_to: to_date,
        amcImage: image_upload,
        amcCmcSlno: amc_slno
      }

      setamcCmcDetal(UpdatedData)
      setamcStatus(amc === 1)
      setcmcStatus(cmc === 1)
      setItemAmcCmcslno(am_item_amcpm_slno)
    }
  }, [amcCmcDetails])

  useEffect(() => {
    const getServiceList = async am_item_map_slno => {
      const result = await axioslogin.get(`/ItemMapDetails/AmcCmcDetailList/${am_item_map_slno}`)
      const { success, data } = result.data
      if (success === 1) {
        setamccmcDetailList(data)
      } else {
        setamccmcDetailList([])
      }
    }
    if (am_item_map_slno !== null || am_item_map_slno !== undefined) {
      getServiceList(am_item_map_slno)
    } else {
      setamccmcDetailList([])
    }
  }, [am_item_map_slno, count])

  const searchdata = useMemo(() => {
    return {
      suplier_slno: supplier,
      from_date: billDate
    }
  }, [billDate, supplier])

  const searchAMCList = useCallback(() => {
    const gettingData = async (searchdata, amcCmcSlno) => {
      const result = await axioslogin.post('/ItemMapDetails/GetAMCBySupplNDate', searchdata)
      const { success, data } = result.data
      if (success === 1) {
        setAmcCmcArray(data)
        setSupplerModal(1)
      } else {
        warningNotify('No Bill Added in selected conditions')
        setAmcCmcArray([])
        setSupplerModal(2)
        if (amcCmcSlno === null || amcCmcSlno === undefined) {
          const setformdata = {
            sup_name: '',
            amccmc_from: '',
            amccmc_to: '',
            amcImage: '',
            amcCmcSlno: ''
          }
          setamcCmcDetal(setformdata)
          // setamcCmcDetailFlag(0)
        }
      }
    }
    if (supplier === 0) {
      warningNotify('Please select supplier before search')
    } else {
      gettingData(searchdata, amcCmcSlno)
    }
  }, [searchdata, amcCmcSlno, supplier])

  const searchCMCList = useCallback(() => {
    const gettingData = async (searchdata, amcCmcSlno) => {
      const result = await axioslogin.post('/ItemMapDetails/GetCMCBySupplNDate', searchdata)
      const { success, data } = result.data
      if (success === 1) {
        setAmcCmcArray(data)
        setSupplerModal(1)
      } else {
        warningNotify('No Bill Added in selected conditions')
        setAmcCmcArray([])
        setSupplerModal(2)
        if (amcCmcSlno === null || amcCmcSlno === undefined) {
          const setformdata = {
            sup_name: '',
            amccmc_from: '',
            amccmc_to: '',
            amcImage: '',
            amcCmcSlno: ''
          }
          setamcCmcDetal(setformdata)
          // setamcCmcDetailFlag(0)
        }
      }
    }
    gettingData(searchdata, amcCmcSlno)
  }, [searchdata, amcCmcSlno])

  const rowSelect = useCallback(value => {
    const { amccmc_slno, it_supplier_name, from_date, to_date, image_upload } = value
    const frmsetting = {
      sup_name: it_supplier_name,
      amccmc_from: from_date,
      amccmc_to: to_date,
      amcImage: image_upload,
      amcCmcSlno: amccmc_slno
    }
    setamcCmcDetal(frmsetting)
    // setamcCmcDetailFlag(1)
    setamccmcAddFlag(1)
    setlinkAmcCmcFlag(0)
  }, [])

  const AddAMCMaster = useCallback(() => {
    setNewAMCFlg(1)
  }, [])

  const AddCMCMaster = useCallback(() => {
    setNewAMCFlg(1)
  }, [])

  const postdata = useMemo(() => {
    return {
      am_item_map_slno: am_item_map_slno,
      amc_status: amcStatus === true ? 1 : 0,
      cmc_status: cmcStatus === true ? 1 : 0,
      create_user: id,
      amc_slno: amcCmcSlno === '' ? null : amcCmcSlno
    }
  }, [am_item_map_slno, amcStatus, cmcStatus, id, amcCmcSlno])

  const patchData = useMemo(() => {
    return {
      am_item_map_slno: am_item_map_slno,
      amc_status: amcStatus === true ? 1 : 0,
      cmc_status: cmcStatus === true ? 1 : 0,
      edit_user: id,
      amc_slno: amcCmcSlno === '' ? null : amcCmcSlno,
      am_item_amcpm_slno: itemAmcCmcslno
    }
  }, [am_item_map_slno, amcStatus, cmcStatus, id, amcCmcSlno, itemAmcCmcslno])

  const SaveAMCPMDetails = useCallback(
    e => {
      e.preventDefault()
      const InsertAMCPMDetail = async postdata => {
        const result = await axioslogin.post('/ItemMapDetails/AmcPmInsert', postdata)
        const { success, message } = result.data
        if (success === 1) {
          setCount(count + 1)
          succesNotify(message)
          setamccmcAddFlag(0)
        } else {
          infoNotify(message)
        }
      }

      const updateAMCPMDetails = async patchData => {
        const result = await axioslogin.patch('/ItemMapDetails/AmcPmUpdate', patchData)
        const { message, success } = result.data
        if (success === 2) {
          setCount(count + 1)
          succesNotify(message)
          setamccmcAddFlag(0)
        }
      }

      if (itemAmcCmcslno === 0) {
        InsertAMCPMDetail(postdata)
      } else {
        updateAMCPMDetails(patchData)
      }
    },
    [itemAmcCmcslno, postdata, patchData, count, setCount]
  )

  const ViewAmcCmcImage = async () => {
    setImageShowFlag(1)
    setImageShow(true)
    const images = await getFilesFromZip('/AssetFileUpload/AmcCmcImageView', amcCmcSlno);
    setImageArry(images);
  };

  const ViewAmcCmcAttachments = async (val) => {
    const { amccmc_slno } = val
    setImageShowFlag(1)
    setImageShow(true)
    const images = await getFilesFromZip('/AssetFileUpload/AmcCmcImageView', amccmc_slno);
    setImageArry(images);
  };

  const handleClose = useCallback(() => {
    setImageShowFlag(0)
    setImageShow(false)
  }, [])

  const [linkAmcCmcFlag, setlinkAmcCmcFlag] = useState(0)

  const linkAmcCmc = useCallback(() => {
    setlinkAmcCmcFlag(1)
  }, [])

  const CloseAmcCmc = useCallback(() => {
    setlinkAmcCmcFlag(0)
  }, [])
  const CloseDetailAdd = useCallback(() => {
    setamccmcAddFlag(0)
  }, [])

  return (
    <Box>
      {imageshowFlag === 1 ? <FileView open={imageshow} handleClose={handleClose} images={imagearray} /> : null}

      <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2 }}>
        <TextComponent
          text={'AMC/CMC DETAILS'}
          sx={{
            flex: 1,
            fontWeight: 500,
            color: 'black',
            fontSize: 15
          }}
        />
        <Box
          sx={{
            display: 'flex',
            pt: 0.1,
            pl: 0.8,
            mt: 0.5,
            ml: 1,
            cursor: 'pointer',
            border: 1,
            width: 100,
            justifyContent: 'center',
            borderRadius: 4,
            borderColor: '#0B6BCB'
          }}
          onClick={linkAmcCmc}
        >
          <TextComponent
            text={'Add New '}
            sx={{
              fontSize: 14,
              color: '#0B6BCB',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(255, 255, 255, 0.7)',
              transform: 'translateZ(0)'
            }}
          />

          <AddIcon
            sx={{
              p: 0.2,
              color: '#0B6BCB'
            }}
          />
        </Box>

        {AddnewAmcFlg === 1 ? (
          <AmcCmcAdding setNewAMCFlg={setNewAMCFlg} setSupplierdetl={setSupplier} setBillDate={setBillDate} />
        ) : null}

        {linkAmcCmcFlag === 1 ? (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              mt: 1,
              mb: 2
            }}
          >
            <Box sx={{ width: 500 }}>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <Box sx={{ width: 130 }}></Box>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2
                  }}
                >
                  <Box sx={{ display: 'flex', p: 0.5, flexDirection: 'column' }}>
                    <CusCheckBox
                      variant="outlined"
                      color="primary"
                      size="md"
                      label={<span style={{ color: '#0B6BCB', fontWeight: 500 }}>AMC</span>}
                      name="amcStatus"
                      value={amcStatus}
                      onCheked={updateamcStatus}
                      checked={amcStatus}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', p: 0.5, flexDirection: 'column' }}>
                    <CusCheckBox
                      variant="outlined"
                      color="primary"
                      size="md"
                      name="cmcStatus"
                      label={<span style={{ color: '#0B6BCB', fontWeight: 500 }}>CMC</span>}
                      value={cmcStatus}
                      onCheked={updatecmcStatus}
                      checked={cmcStatus}
                    />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <TextComponent
                  text={'Supplier'}
                  sx={{
                    fontWeight: 600,
                    color: '#727B8C',
                    pt: 1,
                    width: 130
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <SupplierSelectMaster supplier={supplier} setSupplier={setSupplier} />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <TextComponent
                  text={'Bill Date'}
                  sx={{
                    fontWeight: 600,
                    color: '#727B8C',
                    width: 130
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <TextFieldCustom
                    type="date"
                    size="sm"
                    name="billDate"
                    value={billDate}
                    onchange={updateBillDate}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: 1 }}>
                <Box sx={{ width: 130 }}></Box>
                <Box sx={{ flex: 1, gap: 0.5, display: 'flex' }}>
                  {amcStatus === true ? (
                    <Box>
                      <CusIconButton
                        size="sm"
                        variant="outlined"
                        color="primary"
                        clickable="true"
                        onClick={searchAMCList}
                      >
                        <SearchOutlinedIcon fontSize="small" />
                      </CusIconButton>
                    </Box>
                  ) : cmcStatus === true ? (
                    <Box>
                      <CusIconButton
                        size="sm"
                        variant="outlined"
                        color="primary"
                        clickable="true"
                        onClick={searchCMCList}
                      >
                        <SearchOutlinedIcon fontSize="small" />
                      </CusIconButton>
                    </Box>
                  ) : (
                    <Box>
                      <CusIconButton size="sm" variant="outlined" color="primary" clickable="true">
                        <SearchOutlinedIcon fontSize="small" sx={{ color: 'grey' }} />
                      </CusIconButton>
                    </Box>
                  )}

                  {amcStatus === true ? (
                    <Box>
                      <CusIconButton
                        size="sm"
                        variant="outlined"
                        color="primary"
                        clickable="true"
                        onClick={AddAMCMaster}
                      >
                        <LinkSharpIcon fontSize="small" />
                      </CusIconButton>
                    </Box>
                  ) : cmcStatus === true ? (
                    <Box>
                      <CusIconButton
                        size="sm"
                        variant="outlined"
                        color="primary"
                        clickable="true"
                        onClick={AddCMCMaster}
                      >
                        <LinkSharpIcon fontSize="small" />
                      </CusIconButton>
                    </Box>
                  ) : (
                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true">
                      <LinkSharpIcon fontSize="small" sx={{ color: 'grey' }} />
                    </CusIconButton>
                  )}

                  <Box>
                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={CloseAmcCmc}>
                      <CloseIcon fontSize="small" />
                    </CusIconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flex: 1, py: 0.5, px: 1 }}>
              {SupplerModal === 1 ? (
                <Box sx={{ flex: 1 }}>
                  <AMCCMCAddingModal AmcCmcArray={AmcCmcArray} rowSelect={rowSelect} />
                </Box>
              ) : SupplerModal === 2 ? (
                <Box
                  sx={{
                    border: 1,
                    borderColor: 'lightgrey',
                    height: 130,
                    overflow: 'auto',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box>
                    <TextComponent
                      text={'No  Matched  Details'}
                      sx={{
                        flex: 1,
                        fontSize: 32,
                        fontWeight: 700,
                        color: 'lightgrey',
                        pt: 1
                      }}
                    />
                    <Box
                      sx={{
                        bgcolor: '#3D86D0',
                        width: 130,
                        textAlign: 'center',
                        margin: 'auto',
                        borderRadius: 4,
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer',
                        py: 0.3,
                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.6)',
                        transform: 'translateZ(0)',
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                          boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.4), -3px -3px 6px rgba(255, 255, 255, 0.7)'
                        }
                      }}
                      onClick={AddAMCMaster}
                    >
                      Add New
                    </Box>
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Box>
        ) : null}
        {amccmcAddFlag === 1 ? (
          <Box sx={{ flex: 1, display: 'flex' }}>
            <Box sx={{ width: 500 }}>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <TextComponent
                  text={'Supplier'}
                  sx={{
                    fontWeight: 600,
                    color: '#727B8C',
                    pt: 1,
                    width: 130
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    name="sup_name"
                    value={sup_name}
                    disabled={true}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <TextComponent
                  text={'From Date'}
                  sx={{
                    fontWeight: 600,
                    color: '#727B8C',
                    pt: 1,
                    width: 130
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <TextFieldCustom
                    type="date"
                    size="sm"
                    name="amccmc_from"
                    value={amccmc_from}
                    disabled={true}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <TextComponent
                  text={'To date'}
                  sx={{
                    fontWeight: 600,
                    color: '#727B8C',
                    pt: 1,
                    width: 130
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    name="amccmc_to"
                    value={amccmc_to}
                    disabled={true}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: 130 }}></Box>
                <Box sx={{ flex: 1, my: 0.5 }}>
                  {amcImage === 1 ? (
                    <Box
                      sx={{
                        bgcolor: '#7AB75E',
                        width: 120,
                        textAlign: 'center',
                        borderRadius: 4,
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer',
                        py: 0.3,
                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.6)',
                        transform: 'translateZ(0)',
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                          boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.4), -3px -3px 6px rgba(255, 255, 255, 0.7)'
                        }
                      }}
                      onClick={ViewAmcCmcImage}
                    >
                      Attached Bill
                    </Box>
                  ) : null}
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: 130 }}></Box>
                <Box sx={{ flex: 1, gap: 0.5, display: 'flex' }}>
                  <Box>
                    <CusIconButton
                      size="sm"
                      variant="outlined"
                      color="primary"
                      clickable="true"
                      onClick={SaveAMCPMDetails}
                    >
                      <LibraryAddIcon fontSize="small" />
                    </CusIconButton>
                  </Box>
                  <Box>
                    <CusIconButton
                      size="sm"
                      variant="outlined"
                      color="primary"
                      clickable="true"
                      onClick={CloseDetailAdd}
                    >
                      <CloseIcon fontSize="small" />
                    </CusIconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }}></Box>
          </Box>
        ) : null}
      </Box>
      <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, px: 2, mt: 0.5 }}>
        <TextComponent
          text={'AMC/CMC DETAILS LIST'}
          sx={{
            flex: 1,
            fontWeight: 500,
            color: 'black',
            fontSize: 15
          }}
        />

        <Box sx={{ flex: 1, pr: 1, pt: 1 }}>
          {amccmcDetailList.length === 0 ? (
            <Box
              sx={{
                height: 160,
                fontSize: 24,
                fontWeight: 600,
                color: 'lightgrey',
                textAlign: 'center',
                pt: 5
              }}
            >
              Empty AMC/CMC Details
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  borderTop: 1,
                  borderBottom: 1,
                  borderColor: 'lightgrey',
                  pl: 1,
                  py: 0.5
                }}
              >
                <Box sx={{ flex: 0.1 }}>#</Box>
                <Box sx={{ flex: 0.3 }}>Files</Box>
                <Box sx={{ flex: 0.3 }}>AMC/CMC</Box>
                <Box sx={{ flex: 1 }}>Supplier</Box>
                <Box sx={{ flex: 0.4 }}>From Date</Box>
                <Box sx={{ flex: 0.4 }}>To Date</Box>

                <Box sx={{ flex: 0.3 }}>Status</Box>
              </Box>
              <Virtuoso
                style={{ height: '35vh' }}
                totalCount={amccmcDetailList?.length}
                itemContent={index => {
                  const sortedList = [...amccmcDetailList].sort(
                    (a, b) => (b.status === 1 ? 1 : 0) - (a.status === 1 ? 1 : 0)
                  )
                  const val = sortedList[index]

                  return (
                    <Box
                      key={index}
                      sx={{
                        flex: 1,
                        display: 'flex',
                        borderBottom: 1,
                        borderColor: 'lightgrey',
                        pl: 1,
                        py: 0.6
                      }}
                    >
                      <Box sx={{ flex: 0.1, fontWeight: 600 }}>{index + 1}</Box>
                      <Box sx={{ flex: 0.3, fontWeight: 600, display: 'flex' }}>
                        {val.image_upload === 1 ? (
                          <FilePresentRoundedIcon
                            sx={{ color: '#41729F', cursor: 'pointer' }}
                            onClick={() => ViewAmcCmcAttachments(val)}
                          />
                        ) : (
                          <FilePresentRoundedIcon sx={{ color: 'grey', cursor: 'pointer' }} />
                        )}
                      </Box>
                      <Box sx={{ flex: 0.3, fontWeight: 600 }}>
                        {val.master_amc_status === 1 ? 'AMC' : val.master_cmc_status === 1 ? 'CMC' : 'Not Updated'}
                      </Box>
                      <Box sx={{ flex: 1, fontWeight: 600 }}>{val.it_supplier_name}</Box>
                      <Box sx={{ flex: 0.4, fontWeight: 600 }}>
                        {val.from_date ? format(new Date(val.from_date), 'dd MMM yyyy') : ''}
                      </Box>
                      <Box sx={{ flex: 0.4, fontWeight: 600 }}>
                        {val.to_date ? format(new Date(val.to_date), 'dd MMM yyyy') : ''}
                      </Box>
                      <Box
                        sx={{
                          flex: 0.3,
                          fontWeight: 600,
                          color: val.status === 1 ? 'darkgreen' : val.status === 0 ? '#523A28' : 'black'
                        }}
                      >
                        {val.status === 1
                          ? 'Active *'
                          : val.status === 2
                            ? 'Inactive'
                            : val.status === 0
                              ? 'Expired'
                              : 'NotUpdated'}
                      </Box>
                    </Box>
                  )
                }}
              />
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default memo(AMCCMCDetailAdding)
