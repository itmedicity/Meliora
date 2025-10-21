import React, { useCallback, useState, memo } from 'react'
import { axiosellider, axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { Box, Button, Input } from '@mui/joy'
import { useSelector } from 'react-redux'
import imageCompression from 'browser-image-compression'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import AmcCmcAddedTable from './AmcCmcAddedTable'
import { getAmcCmcMaster } from 'src/redux/actions/AmAmcCmcSlect.action'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'
import CusIconButton from '../../Components/CusIconButton'
import BillSupplerListOracle from './BillSupplerListOracle'
import { getSupplierList } from 'src/redux/actions/AmSupplierListSelect'
import SupplierSelectMaster from './SupplierSelectMaster'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { format } from 'date-fns'
import TextComponent from 'src/views/Components/TextComponent'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import CloseIcon from '@mui/icons-material/Close'
import RefreshIcon from '@mui/icons-material/Refresh'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import FileView from '../AssetFileView/FileView'
import FileViewSingle from 'src/views/Components/FileViewSingle'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ClearSharpIcon from '@mui/icons-material/ClearSharp'
import { getFilesFromZip } from 'src/api/FileViewsFn'

const AmcCmcAdding = ({ setNewAMCFlg, setSupplierdetl, setBillDate }) => {
  const dispatch = useDispatch()
  const [selectFile, setSelectFile] = useState([])
  const [imageshowFlag, setImageShowFlag] = useState(0)
  const [imagearray, setImageArry] = useState([])
  const [imageshow, setImageShow] = useState(false)
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [amcStatus, setamcStatus] = useState(false)
  const [cmcStatus, setcmcStatus] = useState(false)
  const [supplier, setSupplier] = useState(0)
  const [amcCmcStatus, setamcCmcStatus] = useState(false)

  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const [amcfrm, setamcfrm] = useState({
    fromDate: '',
    toDate: '',
    FileStatus: '',
    Slno: ''
  })

  const { fromDate, toDate, FileStatus, Slno } = amcfrm

  const updateamcFrm = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setamcfrm({ ...amcfrm, [e.target.name]: value })
    },
    [amcfrm]
  )

  const updateamcStatus = useCallback(e => {
    if (e.target.checked === true) {
      setamcStatus(true)
      setcmcStatus(false)
    } else {
      setamcStatus(false)
      setcmcStatus(false)
    }
  }, [])

  const updatecmcStatus = useCallback(e => {
    if (e.target.checked === true) {
      setcmcStatus(true)
      setamcStatus(false)
    } else {
      setcmcStatus(false)
      setamcStatus(false)
    }
  }, [])

  const updateamcCmcStatus = useCallback(e => {
    if (e.target.checked === true) {
      setamcCmcStatus(true)
    } else {
      setamcCmcStatus(false)
    }
  }, [])

  const uploadFile = useCallback(
    async e => {
      if (e.target.files[0].type === 'application/pdf') {
        if (e.target.files[0].size > 2000000) {
          warningNotify('File Size Is to Large')
        } else {
          const newFiles = [...selectFile]
          newFiles.push(e.target.files[0])
          setSelectFile(newFiles)
        }
      } else {
        const newFiles = [...selectFile]
        newFiles.push(e.target.files[0])
        setSelectFile(newFiles)
      }
    },
    [selectFile, setSelectFile]
  )

  const handleImageUpload = useCallback(async imageFile => {
    const options = {
      maxSizeMB: 25,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    const compressedFile = await imageCompression(imageFile, options)
    return compressedFile
  }, [])

  const handleRemoveFile = index => {
    setSelectFile(prevFiles => {
      const updatedFiles = [...prevFiles]
      updatedFiles.splice(index, 1)
      return updatedFiles
    })
  }

  const postdata = useMemo(() => {
    return {
      suplier_slno: supplier,
      amc_status: amcStatus === true ? 1 : 0,
      cmc_status: cmcStatus === true ? 1 : 0,
      from_date: fromDate,
      to_date: toDate,
      amccmc_status: amcCmcStatus === true ? 1 : 0,
      create_user: id
    }
  }, [supplier, fromDate, toDate, id, amcStatus, cmcStatus, amcCmcStatus])

  const patch = useMemo(() => {
    return {
      suplier_slno: supplier,
      amc_status: amcStatus === true ? 1 : 0,
      cmc_status: cmcStatus === true ? 1 : 0,
      from_date: fromDate,
      to_date: toDate,
      amccmc_status: amcCmcStatus === true ? 1 : 0,
      edit_user: id,
      amccmc_slno: Slno
    }
  }, [supplier, fromDate, toDate, id, amcStatus, cmcStatus, Slno, amcCmcStatus])

  const reset = useCallback(() => {
    setSelectFile([])
    setImageShowFlag(0)
    setImageArry([])
    setValue(0)
    setCount(0)
    setamcStatus(false)
    setcmcStatus(false)
    setImageShow(false)
    const frmdata = {
      fromDate: '',
      toDate: '',
      FileStatus: '',
      Slno: ''
    }
    setamcfrm(frmdata)
    setNewAMCFlg(0)
    setamcCmcStatus(false)
    setSupplierdetl(0)
    setBillDate(format(new Date(), 'yyyy-MM-dd'))
  }, [setNewAMCFlg, setSupplierdetl, setBillDate])

  const submitAmcCmcAdding = useCallback(
    e => {
      e.preventDefault()
      const FileInsert = async (selectFile, insertid) => {
        try {
          const formData = new FormData()
          formData.append('id', insertid)
          for (const file of selectFile) {
            if (file.type.startsWith('image')) {
              const compressedFile = await handleImageUpload(file)
              formData.append('files', compressedFile, compressedFile.name)
            } else {
              formData.append('files', file, file.name)
            }
          }
          // Use the Axios instance and endpoint that matches your server setup
          const result = await axioslogin.post('/AssetFileUpload/asset/AmcCmcImage', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          return result.data
        } catch (error) {
          warningNotify('An error occurred during file upload.')
        }
      }

      const InsertAmcCmc = async postdata => {
        const result = await axioslogin.post('/ItemMapDetails/AmcCMCInsert', postdata)
        const { message, success, insertid } = result.data
        if (success === 1) {
          if (selectFile.length !== 0) {
            FileInsert(selectFile, insertid).then(val => {
              const { success, message } = val
              if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                setSelectFile([])
                reset()
                dispatch(getAmcCmcMaster())
              } else {
                warningNotify(message)
              }
            })
          } else {
            succesNotify(message)
            setCount(count + 1)
            reset()
            dispatch(getAmcCmcMaster())
          }
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      const UpdateCustodiandept = async patch => {
        const result = await axioslogin.patch('/ItemMapDetails/AmcCmcUpdate', patch)
        const { message, success } = result.data
        if (success === 2) {
          if (selectFile.length !== 0) {
            FileInsert(selectFile, Slno).then(val => {
              const { success, message } = val
              if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                setSelectFile([])
                reset()
                dispatch(getAmcCmcMaster())
              } else {
                warningNotify(message)
              }
            })
          } else {
            succesNotify(message)
            setCount(count + 1)
            reset()
            dispatch(getAmcCmcMaster())
          }
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }

      if (amcStatus === false && cmcStatus === false) {
        warningNotify('Please select AMC or CMC')
      } else {
        if (value === 0) {
          InsertAmcCmc(postdata)
        } else {
          UpdateCustodiandept(patch)
        }
      }
    },
    [postdata, value, selectFile, Slno, patch, dispatch, amcStatus, cmcStatus, count, reset, handleImageUpload]
  )

  const rowSelect = useCallback(val => {
    setValue(1)
    const { amccmc_slno, suplier_slno, amc_status, cmc_status, from_date, to_date, image_upload, amccmc_status } = val
    setamcStatus(amc_status === 1 ? true : false)
    setcmcStatus(cmc_status === 1 ? true : false)
    setamcCmcStatus(amccmc_status === 1 ? true : false)
    const frmdata = {
      fromDate: from_date,
      toDate: to_date,
      FileStatus: image_upload,
      Slno: amccmc_slno
    }
    setamcfrm(frmdata)
    setSupplier(suplier_slno)
  }, [])



  const ViewAmcCmcImage = async () => {
    setImageShowFlag(1)
    setImageShow(true)
    const images = await getFilesFromZip('/AssetFileUpload/AmcCmcImageView', Slno);
    setImageArry(images);
  };


  const handleClose = useCallback(() => {
    setImageShowFlag(0)
    setImageShow(false)
  }, [])

  const [oracleFlag, setOracleFlag] = useState(0)
  const [suppName, setSupName] = useState('')
  const [OracleList, setOracleList] = useState([])
  const [OracleListFlag, setOracleListFlag] = useState(0)

  const updateSuppName = useCallback(e => {
    setSupName(e.target.value.toUpperCase())
  }, [])

  const searchBillList = useCallback(() => {
    setOracleFlag(1)
  }, [])

  const searchdata = useMemo(() => {
    return {
      SUC_NAME: suppName
    }
  }, [suppName])

  const SearchSupplOrcle = useCallback(() => {
    const gettingOrcleData = async searchdata => {
      const result = await axiosellider.post('/supplierList/supplier', searchdata)
      const { success, data } = result.data
      if (success === 1) {
        setOracleList(data)
        setOracleListFlag(1)
      } else {
        warningNotify('No supplier found')
        setOracleList([])
        setOracleListFlag(0)
      }
    }
    gettingOrcleData(searchdata)
  }, [searchdata])

  const SuppAddMeliora = useCallback(
    val => {
      const { SUC_NAME, SUC_PHONE, SUC_MOBILE, SUC_EMAIL, SUC_PERSON1, SUC_PERSON2 } = val

      const postdata = {
        it_supplier_name: SUC_NAME,
        it_supplier_land_one: parseInt(SUC_PHONE),
        it_supplier_mob_one: parseInt(SUC_MOBILE),
        it_supplier_email_one: SUC_EMAIL,
        it_supplier_escl_mob_one: parseInt(SUC_PERSON2),
        it_supplier_escl_land_one: parseInt(SUC_PERSON1),
        supplier_status: 1
      }
      const InsertSupplierInMeli = async postdata => {
        const result = await axioslogin.post('/ItemMapDetails/SupplierAdding', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setOracleList([])
          setOracleListFlag(0)
          dispatch(getSupplierList())
          setSupName('')
        } else {
          warningNotify(message)
        }
      }
      InsertSupplierInMeli(postdata)
      setOracleFlag(0)
    },
    [dispatch]
  )

  const [imageShowsingle, setImagesingle] = useState(0)
  const [imageShowSingle, setImageShowSingle] = useState(false)
  const [previewFile, setPreviewFile] = useState({ url: '', type: '' })
  const ViewImage = useCallback(file => {
    const fileType = file.url
      ? file.url.endsWith('.pdf')
        ? 'pdf'
        : 'image'
      : file.type.includes('application/pdf')
        ? 'pdf'
        : 'image'

    const fileUrl = file.url || URL.createObjectURL(file)
    setPreviewFile({ url: fileUrl, type: fileType })
    setImageShowSingle(true)
    setImagesingle(1)
  }, [])

  const CloseFile = useCallback(() => {
    setImagesingle(0)
    setImageShowSingle(false)
  }, [])

  const close = useCallback(() => {
    setNewAMCFlg(0)
  }, [setNewAMCFlg])

  const CloseOracleSearch = useCallback(() => {
    setOracleFlag(0)
    setOracleListFlag(0)
  }, [setOracleFlag, setOracleListFlag])

  return (
    <Box
      sx={{
        borderTop: 1,
        borderRight: 1,
        borderBottom: 1,
        borderLeft: 1,
        borderColor: '#0B6BCB',
        px: 2,
        pb: 1,
        mr: 1,
        my: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        borderRadius: 2,
        backgroundColor: '#ffffff',
        boxShadow: `
      0px 2px 4px rgba(0, 0, 0, 0.15),    /* Bottom right shadow */
      0px -2px 4px rgba(0, 0, 0, 0.1),    /* Top shadow */
      -2px 0px 4px rgba(0, 0, 0, 0.1),    /* Left shadow */
      2px 0px 4px rgba(0, 0, 0, 0.1)      /* Right shadow */
          `,
        transition: 'all 0.3s ease'
      }}
    >
      {imageshowFlag === 1 ? <FileView open={imageshow} handleClose={handleClose} images={imagearray} /> : null}

      {imageShowsingle === 1 ? (
        <Box>
          <FileViewSingle previewFile={previewFile} imageShow={imageShowSingle} CloseFile={CloseFile} />
        </Box>
      ) : null}
      <TextComponent
        text={'Add New Bill Details'}
        sx={{
          fontWeight: 600,
          color: 'black',
          py: 1
        }}
      />

      <Box sx={{ flex: 1, display: 'flex', gap: 1 }}>
        <Box sx={{ width: 400 }}>
          {oracleFlag !== 1 ? (
            <>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <TextComponent
                  text={'Supplier'}
                  sx={{
                    fontWeight: 600,
                    color: '#727B8C',
                    pt: 0.5,
                    width: 100
                  }}
                />
                <Box
                  sx={{
                    flex: 1
                  }}
                >
                  {OracleListFlag === 1 ? (
                    <SupplierSelectMaster supplier={supplier} setSupplier={setSupplier} />
                  ) : (
                    <SupplierSelectMaster supplier={supplier} setSupplier={setSupplier} />
                  )}
                </Box>
              </Box>

              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <TextComponent
                  text={'From Date'}
                  sx={{
                    fontWeight: 600,
                    color: '#727B8C',
                    pt: 0.5,
                    width: 100
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <TextFieldCustom
                    type="date"
                    size="sm"
                    name="fromDate"
                    value={fromDate}
                    onchange={updateamcFrm}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <TextComponent
                  text={'To Date'}
                  sx={{
                    fontWeight: 600,
                    color: '#727B8C',
                    pt: 0.5,
                    width: 100
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <TextFieldCustom
                    type="date"
                    size="sm"
                    name="toDate"
                    value={toDate}
                    onchange={updateamcFrm}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <Box sx={{ width: 100 }}></Box>
                <Box
                  sx={{
                    flex: 1
                  }}
                >
                  <Button
                    onClick={searchBillList}
                    variant="outlined"
                    color="neutral"
                    startDecorator={<SearchOutlinedIcon />}
                    sx={{
                      '--Button-gap': '8px',
                      width: '100%'
                    }}
                  >
                    Search Supplier From Ellider{' '}
                  </Button>
                </Box>
              </Box>
            </>
          ) : null}
          {oracleFlag === 1 ? (
            <Box sx={{ mt: 0.5, mb: 1 }}>
              <TextComponent
                text={'Find Supplier From Oracle'}
                sx={{
                  fontWeight: 600,
                  color: '#0B6BCB',
                  pt: 0.5,
                  pl: 0.3
                }}
              />
              <Box sx={{ flex: 1, display: 'flex' }}>
                <Box sx={{ flex: 1, pr: 0.5 }}>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    name="suppName"
                    value={suppName}
                    onchange={updateSuppName}
                    placeholder={'Enter Supplier'}
                  ></TextFieldCustom>
                </Box>
                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={SearchSupplOrcle}>
                  <ManageSearchIcon fontSize="small" />
                </CusIconButton>
                &nbsp;
                <CusIconButton
                  size="sm"
                  variant="outlined"
                  color="primary"
                  clickable="true"
                  onClick={CloseOracleSearch}
                >
                  <CloseIcon fontSize="small" />
                </CusIconButton>
              </Box>
            </Box>
          ) : null}
          {oracleFlag !== 1 ? (
            <>
              {selectFile.length !== 0 ? (
                <Box
                  sx={{
                    display: 'flex',
                    flex: 1,
                    overflowY: 'auto',
                    border: 1,
                    borderColor: 'lightgrey',
                    p: 0.4,
                    mt: 0.5
                  }}
                >
                  {selectFile.length !== 0 &&
                    selectFile.map((file, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid #e0e0e0',
                          borderRadius: '4px',
                          p: 0.5,
                          mr: 0.5
                        }}
                      >
                        {file.type.includes('image') ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            style={{
                              width: '40px',
                              height: '40px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                              marginRight: '8px',
                              cursor: 'pointer'
                            }}
                            onClick={() => ViewImage(file)}
                          />
                        ) : file.type === 'application/pdf' ? (
                          <PictureAsPdfIcon
                            sx={{
                              width: '40px',
                              height: '40px',
                              color: '#e53935',
                              marginRight: '8px',
                              cursor: 'pointer'
                            }}
                            onClick={() => ViewImage(file)}
                          />
                        ) : (
                          <InsertDriveFileIcon
                            sx={{
                              width: '40px',
                              height: '40px',
                              color: '#9e9e9e',
                              marginRight: '8px',
                              cursor: 'pointer'
                            }}
                            onClick={() => ViewImage(file)}
                          />
                        )}
                        <Box sx={{ fontSize: 14, cursor: 'pointer', flexGrow: 1 }}>{file.name}</Box>
                        <ClearSharpIcon
                          sx={{
                            pl: 0.3,
                            pb: 0.3,
                            height: 20,
                            width: 20,
                            cursor: 'pointer',
                            color: '#4D0011',
                            mx: 0.5,
                            '&:hover': { color: '#BA0F30' }
                          }}
                          onClick={() => handleRemoveFile(index)}
                        />
                      </Box>
                    ))}
                </Box>
              ) : null}
            </>
          ) : null}

          {oracleFlag !== 1 ? (
            <Box
              sx={{
                flex: 1,
                border: 0.1,
                borderRadius: 3,
                borderStyle: 'dashed',
                mt: 0.8,
                textAlign: 'center',
                borderColor: '#0B6BCB',
                bgcolor: '#F3F5F7',
                pt: 1,
                cursor: 'pointer'
              }}
            >
              <label htmlFor="file-input">
                <UploadFileIcon sx={{ color: '#0B6BCB', cursor: 'pointer' }} />
                <TextComponent
                  text={'Attach Bill'}
                  sx={{
                    fontWeight: 600,
                    color: '#0B6BCB',
                    pb: 1,
                    cursor: 'pointer'
                  }}
                />
              </label>
              <Input
                id="file-input"
                type="file"
                accept=".jpg, .jpeg, .png, .pdf"
                style={{ display: 'none' }}
                onChange={uploadFile}
              />
            </Box>
          ) : null}
          {oracleFlag !== 1 ? (
            <>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ flex: 1, pt: 1.5 }}>
                  <CusCheckBox
                    variant="outlined"
                    color="primary"
                    size="md"
                    name="amcStatus"
                    label="AMC"
                    value={amcStatus}
                    onCheked={updateamcStatus}
                    checked={amcStatus}
                  />
                  &nbsp; &nbsp; &nbsp;
                  <CusCheckBox
                    variant="outlined"
                    color="primary"
                    size="md"
                    name="cmcStatus"
                    label="CMC"
                    value={cmcStatus}
                    onCheked={updatecmcStatus}
                    checked={cmcStatus}
                  />
                </Box>
                {FileStatus === 1 ? (
                  <Box
                    onClick={ViewAmcCmcImage}
                    sx={{
                      bgcolor: '#76BC58',
                      width: 120,
                      textAlign: 'center',
                      borderRadius: 4,
                      color: 'white',
                      fontWeight: 600,
                      cursor: 'pointer',
                      my: 1,
                      py: 0.3,
                      boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.6)',
                      transform: 'translateZ(0)',
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.4), -3px -3px 6px rgba(255, 255, 255, 0.7)'
                      }
                    }}
                  >
                    Attached Bill
                  </Box>
                ) : null}
              </Box>
              <Box sx={{ flex: 1 }}>
                <CusCheckBox
                  variant="outlined"
                  color="primary"
                  size="md"
                  name="amcCmcStatus"
                  label="Status"
                  value={amcCmcStatus}
                  onCheked={updateamcCmcStatus}
                  checked={amcCmcStatus}
                />
              </Box>
            </>
          ) : null}
          {oracleFlag !== 1 ? (
            <Box sx={{ display: 'flex', pt: 2.5, gap: 0.5 }}>
              <Box>
                <CusIconButton
                  size="sm"
                  variant="outlined"
                  color="primary"
                  clickable="true"
                  onClick={submitAmcCmcAdding}
                >
                  <LibraryAddIcon fontSize="small" />
                </CusIconButton>
              </Box>
              <Box>
                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={reset}>
                  <RefreshIcon fontSize="small" />
                </CusIconButton>
              </Box>
              <Box>
                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={close}>
                  <CloseIcon fontSize="small" />
                </CusIconButton>
              </Box>
            </Box>
          ) : null}
        </Box>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {oracleFlag !== 1 ? <AmcCmcAddedTable count={count} rowSelect={rowSelect} /> : null}
        </Box>
      </Box>
      {OracleListFlag === 1 ? (
        <Box
          sx={{
            flex: 1,
            my: 1,
            mx: 0.2
          }}
        >
          <BillSupplerListOracle OracleList={OracleList} SuppAddMeliora={SuppAddMeliora} />
        </Box>
      ) : null}
    </Box>
  )
}

export default memo(AmcCmcAdding)
