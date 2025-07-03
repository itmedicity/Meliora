import {
  Box,
  Button,
  Checkbox,
  CssVarsProvider,
  Grid,
  Modal,
  ModalDialog,
  Textarea,
  Typography,
} from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import TextComponent from 'src/views/Components/TextComponent'
import CancelIcon from '@mui/icons-material/Cancel'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import MoreIcon from '@mui/icons-material/More'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import AddDetailOnItem from './AddDetailOnItem'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { format } from 'date-fns'
import { Popover } from '@mui/material'
import { getCondemAddedDetails } from 'src/api/AssetApis'
import { useQuery } from 'react-query'
import { axioslogin } from 'src/views/Axios/Axios'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import FileViewSingle from 'src/views/Components/FileViewSingle'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import AssetDetailsModal from './AssetDetailsView/AssetDetailsModal'
import { useRef } from 'react'

const CondemSubmitionModal = ({
  open,
  setmodalFlag,
  setmodalOpen,
  setitemList,
  itemList,
  empId,
  condemMastslno,
  empdept,
  setcondemCount,
  condemCount,
}) => {
  const [addModalOpen, setaddModalOpen] = useState(false)
  const [addModalFlag, setaddModalFlag] = useState(0)
  const [itemDetails, setitemDetails] = useState([])
  const [reqRegDate, setReqRegDate] = useState(format(new Date(), 'yyyy-MM-dd'))

  const AddDetailsModal = useCallback(
    val => {
      setaddModalFlag(1)
      setaddModalOpen(true)
      setitemDetails(val)
    },
    [setaddModalFlag, setaddModalOpen]
  )

  const CloseModal = useCallback(() => {
    setmodalOpen(false)
    setmodalFlag(0)
    setitemList([])
  }, [setmodalOpen, setmodalFlag, setitemList])

  const buttonStyle = {
    fontSize: 16,
    color: '#523A28',
    cursor: 'pointer',
    boxShadow: 5,
    border: 'none',
    transition: 'transform 0.2s, bgcolor 0.2s',
    '&:hover': {
      bgcolor: 'white',
      color: '#523A28',
      transform: 'scale(1.1)',
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
  }

  const [checkedItems, setCheckedItems] = useState({})
  const [reasons, setReasons] = useState({})
  const [checkPopover, setCheckPopover] = useState(null)
  const [uncheckPopover, setUncheckPopover] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [deatilSlno, setDeatilSlno] = useState(0)
  const [addedCondemFiles, setaddedCondemFiles] = useState([])

  const handleCheckboxChange = (event, index, val) => {
    const { am_condem_detail_slno } = val
    const isChecked = event.target.checked
    setCheckedItems(prev => ({ ...prev, [index]: isChecked }))
    setCurrentIndex(index)

    if (isChecked) {
      setCheckPopover(event.currentTarget)
      setUncheckPopover(null)
      setDeatilSlno(am_condem_detail_slno)
    } else {
      setUncheckPopover(event.currentTarget)
      setCheckPopover(null)
      setDeatilSlno(am_condem_detail_slno)
    }
  }

  const handleCloseCheck = () => {
    setCheckPopover(null)
    if (currentIndex !== null) {
      setCheckedItems(prev => ({ ...prev, [currentIndex]: false }))
      setCurrentIndex(null)
    }
  }

  const handleCloseUncheck = () => {
    setUncheckPopover(null)
    if (currentIndex !== null) {
      setCheckedItems(prev => ({ ...prev, [currentIndex]: false }))
      setCurrentIndex(null)
    }
  }

  const handleCloseCheckWithData = () => setCheckPopover(null)

  const handleAddReason = index => {
    const singleItemData = {
      am_condem_detail_slno: deatilSlno,
      keep_inscarp_status: 1,
      keep_in_srap_store_reason: reasons[index] || '',
      scarp_store_emp: empId,
    }

    const scarpStoreUpdate = async singleItemData => {
      const result = await axioslogin.patch(
        '/AssetCondemnation/updateScarpStoreData',
        singleItemData
      )
      const { message, success } = result.data
      if (success === 2) {
        succesNotify(message)
        handleCloseCheckWithData()
        setReasons({})
      } else {
        infoNotify(message)
      }
    }
    scarpStoreUpdate(singleItemData)
  }
  const RemoveFromScrapStore = () => {
    const singleItemData = {
      am_condem_detail_slno: deatilSlno,
      keep_inscarp_status: 0,
      keep_in_srap_store_reason: null,
      scarp_store_emp: empId,
    }
    const scarpStoreUpdate = async singleItemData => {
      const result = await axioslogin.patch(
        '/AssetCondemnation/updateScarpStoreData',
        singleItemData
      )
      const { success } = result.data
      if (success === 2) {
        succesNotify('Item Removed From Keeping in Scapstore and Submitted for Condemnation ')
        handleCloseUncheck()
        setReasons({})
      } else {
        infoNotify('Unable to Update')
      }
    }
    scarpStoreUpdate(singleItemData)
  }

  const postCondemSlno = useMemo(() => {
    return {
      condemMastslno,
    }
  }, [condemMastslno])

  const [count, setcount] = useState(0)

  const { data: CondemData } = useQuery({
    queryKey: ['getCondemAddedDetails', count],
    queryFn: () => getCondemAddedDetails(postCondemSlno),
    enabled: condemMastslno !== undefined,
  })

  const [formPrefix, setFormPrefix] = useState('')
  const [formNumber, setFormNumber] = useState('')

  const handleFormNoChange = event => {
    let value = event.target.value.toUpperCase()
    const match = value.match(/^([A-Z]+\/[A-Z]+)\/(\d+)$/)
    if (match) {
      setFormPrefix(match[1])
      setFormNumber(match[2])
    } else {
      setFormPrefix(value)
      setFormNumber('')
    }
  }

  const handleDateChange = event => {
    setReqRegDate(event.target.value)
  }

  const fetchCondemFiles = useCallback(async () => {
    if (CondemData?.length > 0) {
      const requests = CondemData.map(async row => {
        const postData = {
          id: row.condem_mast_slno || null,
          detailId: row.am_condem_detail_slno || null,
        }
        try {
          const result = await axioslogin.post(
            '/AssetFileUpload/uploadFile/getCondemnation',
            postData
          )
          const { success, data } = result.data
          if (success === 1 && data && Array.isArray(data)) {
            return {
              [row.am_condem_detail_slno]: data.map(
                fileName =>
                  `${PUBLIC_NAS_FOLDER}/AssetCondemDetails/${postData.id}/${postData.detailId}/${fileName}`
              ),
            }
          } else {
            return { [row.am_condem_detail_slno]: [] }
          }
        } catch (error) {
          if (error.response?.data?.message?.includes('ENOENT')) {
            return { [row.am_condem_detail_slno]: null }
          }
          return { [row.am_condem_detail_slno]: [] }
        }
      })

      const resultsArray = await Promise.all(requests)
      const filesMap = resultsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {})
      setaddedCondemFiles(filesMap)
    } else {
      setaddedCondemFiles({})
    }
  }, [CondemData])

  useEffect(() => {
    fetchCondemFiles()
  }, [fetchCondemFiles])

  const [imageShowsingleFlag, setImagesingle] = useState(0)
  const [imageShowSingle, setImageShowSingle] = useState(false)
  const [uploadedFile, setUplodedFile] = useState({ url: '', type: '' })

  const SingleView = useCallback(file => {
    const fileType = file.url
      ? file.url.endsWith('.pdf')
        ? 'pdf'
        : 'image'
      : file.type && file.type.includes('application/pdf')
      ? 'image'
      : 'pdf'

    const fileUrl = file.url || URL.createObjectURL(file)
    setUplodedFile({ url: fileUrl, type: fileType })
    setImageShowSingle(true)
    setImagesingle(1)

    const modalElement = document.querySelector('.MuiModal-root')
    if (
      modalElement &&
      modalElement.hasAttribute('aria-hidden') &&
      modalElement.getAttribute('aria-hidden') === 'true'
    ) {
      document.activeElement.blur()
    }
  }, [])

  const CloseSingleFile = useCallback(() => {
    setImagesingle(0)
    setImageShowSingle(false)
  }, [])

  const [isLoading, setIsLoading] = useState(false)
  const loadingRef = useRef(false)

  const submitForm = async () => {
    if (loadingRef.current || isLoading) return

    if (!formNumber || !formPrefix) {
      infoNotify('Enter Form Number ')
      return
    }

    loadingRef.current = true
    setIsLoading(true)

    try {
      const spareItems = itemList.filter(item => item.am_spare_item_map_slno !== undefined)
      const assetItems = itemList.filter(item => item.am_item_map_slno !== undefined)

      const patchdata = {
        condem_mast_slno: condemMastslno,
        reg_date: reqRegDate,
        condem_form_prefix: formPrefix,
        condem_form_no: formNumber,
        edit_user: empId,
        condem_status: 1,
        req_dept: empdept,
      }

      await FormUpdate(patchdata)

      if (assetItems.length > 0) {
        const assetPostForm = {
          assetItems: assetItems.map(item => ({
            am_item_map_slno: item.am_item_map_slno,
            submited_condemnation: 1,
          })),
        }
        await UpdateAssetStatus(assetPostForm)
      }

      if (spareItems.length > 0) {
        const sparePostForm = {
          spareItems: spareItems.map(item => ({
            am_spare_item_map_slno: item.am_spare_item_map_slno,
            submited_condemnation: 1,
          })),
        }
        await UpdateSpareStatus(sparePostForm)
      }

      succesNotify('Form Submitted Successfully')
      CloseModal()
    } catch (error) {
      infoNotify('An error occurred while submitting the form.')
    } finally {
      loadingRef.current = false
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadingRef.current = false
  }, [])

  const FormUpdate = async patchdata => {
    try {
      const result = await axioslogin.patch('/AssetCondemnation/updateCondemMasterData', patchdata)
      const { success, message } = result.data

      if (success !== 2) {
        throw new Error(message || 'Failed to update master data.')
      }
    } catch (error) {
      infoNotify(error.message)
      throw error
    }
  }

  const UpdateAssetStatus = async PostForm => {
    try {
      const result = await axioslogin.patch('/AssetCondemnation/UpdateAssetStatus', PostForm)
      const { success, message } = result.data

      if (success !== 1) {
        throw new Error(message || 'Failed to update asset status.')
      }
    } catch (error) {
      infoNotify(error.message)
      throw error
    }
  }

  const UpdateSpareStatus = async PostForm => {
    try {
      const result = await axioslogin.patch('/AssetCondemnation/UpdateSpareStatus', PostForm)
      const { success, message } = result.data

      if (success !== 1) {
        throw new Error(message || 'Failed to update spare status.')
      }
    } catch (error) {
      infoNotify(error.message)
      throw error
    }
  }

  const [AssetOpenModal, setAssetOpenModal] = useState(false)
  const [AssetModalFlag, setAssetModalFlag] = useState(0)
  const [AssetDetails, setAssetDetails] = useState([])

  const AssetDetailsView = useCallback(val => {
    setAssetOpenModal(true)
    setAssetDetails(val)
    setAssetModalFlag(1)
  }, [])

  return (
    <Box>
      {/* {isLoading ? (
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                    <ModalDialog variant="outlined" sx={{ width: '95vw', p: 0, overflow: 'auto', height: '90vh', justifyContent: 'center', bgcolor: 'transparent' }}>
                        <Box>
                            Processing...
                        </Box>
                    </ModalDialog>
                </Modal>
            ) : ( */}

      <CssVarsProvider>
        {addModalFlag === 1 ? (
          <Box>
            <AddDetailOnItem
              addModalOpen={addModalOpen}
              setaddModalOpen={setaddModalOpen}
              setaddModalFlag={setaddModalFlag}
              itemDetails={itemDetails}
              empId={empId}
              reqRegDate={reqRegDate}
              condemMastslno={condemMastslno}
              setcount={setcount}
              count={count}
              setcondemCount={setcondemCount}
              condemCount={condemCount}
            />
          </Box>
        ) : null}
        {AssetModalFlag === 1 ? (
          <Box>
            <AssetDetailsModal
              AssetOpenModal={AssetOpenModal}
              setAssetOpenModal={setAssetOpenModal}
              AssetModalFlag={AssetModalFlag}
              setAssetModalFlag={setAssetModalFlag}
              AssetDetails={AssetDetails}
            />
          </Box>
        ) : null}
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pl: 1,
            borderRadius: 10,
          }}
        >
          <ModalDialog variant="outlined" sx={{ width: '95vw', p: 0, overflow: 'auto' }}>
            <Box sx={{ border: 0.1, borderColor: '#E8E6E5', m: 1, height: '99%' }}>
              <Box sx={{ flex: 1, display: 'flex', ml: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <TextComponent
                    text={'Condemnation Request Form'}
                    sx={{ fontWeight: 600, color: '#6A5546', pl: 0.8, pt: 1, fontSize: 21 }}
                  />
                  <TextComponent
                    text={'Information Technpology'}
                    sx={{ fontWeight: 500, color: 'black', pl: 0.8, fontSize: 15 }}
                  />
                </Box>
                <Box sx={{ pr: 1, pt: 1 }}>
                  <CancelIcon
                    sx={{ width: 30, height: 30, color: '#6A5546', cursor: 'pointer' }}
                    onClick={CloseModal}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mx: 1,
                  mt: 2,
                }}
              >
                <Box>
                  <TextComponent
                    text={'Request Date'}
                    sx={{ fontWeight: 400, pl: 0.5, color: 'Black' }}
                  />
                  <TextFieldCustom
                    style={{ width: 200 }}
                    type="date"
                    name="reqRegDate"
                    value={reqRegDate}
                    onchange={handleDateChange}
                  />
                </Box>

                <Box>
                  <TextComponent
                    text={
                      <>
                        Form No.<span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                      </>
                    }
                    sx={{ fontWeight: 400, pl: 0.5, color: 'black' }}
                  />

                  <TextFieldCustom
                    style={{ width: 200 }}
                    type="text"
                    value={`${formPrefix}${formNumber ? `/${formNumber}` : ''}`}
                    name="FromNo"
                    onchange={handleFormNoChange}
                  />
                </Box>
              </Box>
              <Box sx={{ flex: 1, mx: 1, mt: 2 }}>
                <Box sx={{ flex: 1, color: '#735F51', fontWeight: 600 }}>Item List</Box>
                <Box
                  sx={{
                    flex: 1,
                    borderTop: 1,
                    borderRight: 1,
                    borderLeft: 1,
                    borderColor: 'lightgray',
                  }}
                >
                  <Box
                    sx={{
                      height: 32,
                      display: 'flex',
                      bgcolor: '#DCD2CC',
                      alignItems: 'center',
                      borderBottom: 1,
                      borderColor: 'lightgray',
                    }}
                  >
                    <Box
                      sx={{ width: 40, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1.5 }}
                    >
                      #
                    </Box>
                    <Box
                      sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1 }}
                    >
                      Keep in Scarp Store
                    </Box>
                    <Box sx={{ width: 120, fontWeight: 600, color: '#444444', fontSize: 14 }}>
                      Asset/Spare No.
                    </Box>
                    <Box
                      sx={{ width: 160, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1 }}
                    >
                      Item Purchase Value
                    </Box>
                    <Box sx={{ width: 100, fontWeight: 600, color: '#444444', fontSize: 14 }}>
                      Ticket No.
                    </Box>
                    <Box sx={{ flex: 2, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1 }}>
                      Condem Reason
                    </Box>
                    <Box sx={{ width: 60, fontWeight: 600, color: '#444444', fontSize: 14 }}>
                      Details
                    </Box>
                    <Box sx={{ width: 50, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1 }}>
                      Add
                    </Box>
                  </Box>

                  <Box sx={{ width: '100%', overflow: 'auto' }}>
                    <Box sx={{ minHeight: 10, overflowY: 'auto' }}>
                      {itemList?.map((val, index) => (
                        <Box
                          key={index}
                          sx={{
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            borderBottom: 1,
                            borderColor: 'lightgray',
                            bgcolor: val.keep_inscarp_status === 1 ? '#EDF2F3' : 'white',
                          }}
                        >
                          <Box
                            sx={{
                              width: 40,
                              fontWeight: 600,
                              color: '#444444',
                              fontSize: 14,
                              pl: 1.5,
                            }}
                          >
                            {index + 1}
                          </Box>
                          <Box
                            sx={{
                              width: 150,
                              fontWeight: 600,
                              color: '#444444',
                              fontSize: 14,
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <Box>
                              <Checkbox
                                variant="outlined"
                                color="neutral"
                                onChange={e => handleCheckboxChange(e, index, val)}
                                checked={checkedItems[index] || val.keep_inscarp_status === 1}
                                sx={{ mt: 0.5 }}
                              />
                              <Popover open={Boolean(checkPopover)} anchorEl={checkPopover}>
                                <Box sx={{ width: 250, p: 2, bgcolor: 'white' }}>
                                  <Typography sx={{ mb: 1, color: 'black', fontSize: 14 }}>
                                    Why do you want to keep this in the scrap store?
                                    <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                                  </Typography>
                                  <Textarea
                                    minRows={3}
                                    placeholder="Enter reason..."
                                    value={reasons[index] || ''}
                                    onChange={e =>
                                      setReasons(prev => ({ ...prev, [index]: e.target.value }))
                                    }
                                    sx={{ width: '100%' }}
                                  />
                                  <Box
                                    sx={{ display: 'flex', justifyContent: 'right', mt: 1, gap: 1 }}
                                  >
                                    <Button
                                      variant="outlined"
                                      color="neutral"
                                      onClick={() => handleAddReason(index, val)}
                                    >
                                      Add
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      color="neutral"
                                      onClick={handleCloseCheck}
                                    >
                                      Close
                                    </Button>
                                  </Box>
                                </Box>
                              </Popover>
                              <Popover open={Boolean(uncheckPopover)} anchorEl={uncheckPopover}>
                                <Box sx={{ width: 250, p: 2, bgcolor: 'white' }}>
                                  <Typography sx={{ mb: 1, color: 'black', fontSize: 15 }}>
                                    Do you want to submit this for condemnation by removing it from
                                    the scrap store?
                                  </Typography>
                                  <Box
                                    sx={{ display: 'flex', justifyContent: 'right', mt: 1, gap: 1 }}
                                  >
                                    <Button
                                      variant="outlined"
                                      color="neutral"
                                      onClick={() => RemoveFromScrapStore(index, val)}
                                    >
                                      Yes
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      color="neutral"
                                      onClick={handleCloseUncheck}
                                    >
                                      No
                                    </Button>
                                  </Box>
                                </Box>
                              </Popover>
                            </Box>
                          </Box>
                          <Box sx={{ width: 120, fontWeight: 600, color: '#444444', fontSize: 14 }}>
                            {val.spare_asset_no
                              ? `${val.spare_asset_no}/${val.spare_asset_no_only
                                  .toString()
                                  .padStart(6, '0')}`
                              : `${val.item_asset_no}/${val.item_asset_no_only
                                  .toString()
                                  .padStart(6, '0')}`}
                          </Box>
                          <Box
                            sx={{
                              width: 160,
                              fontWeight: 600,
                              color: '#444444',
                              fontSize: 14,
                              pl: 1,
                            }}
                          >
                            {new Intl.NumberFormat('en-IN', {
                              style: 'currency',
                              currency: 'INR',
                            }).format(val.am_bill_amount)}
                          </Box>
                          <Box sx={{ width: 100, fontWeight: 600, color: '#444444', fontSize: 14 }}>
                            {val.complaint_slno}
                          </Box>
                          <Box
                            sx={{ flex: 2, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1 }}
                          >
                            {val.condm_transf_remarks}
                          </Box>
                          <Box
                            sx={{
                              width: 60,
                              fontWeight: 600,
                              color: '#444444',
                              fontSize: 14,
                              pl: 1,
                            }}
                          >
                            <MoreIcon
                              sx={{ cursor: 'pointer', color: '#41729F' }}
                              onClick={() => AssetDetailsView(val)}
                            />
                          </Box>
                          <Box
                            sx={{
                              width: 50,
                              fontWeight: 600,
                              color: '#444444',
                              fontSize: 14,
                              pl: 1,
                            }}
                          >
                            <AddCircleIcon
                              sx={{ cursor: 'pointer', color: '#A45C40' }}
                              onClick={() => AddDetailsModal(val)}
                            />
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>

              {(CondemData?.some(item => item.am_condem_reason !== null) ||
                addedCondemFiles.length > 0) && (
                <Box sx={{ flex: 1, border: 1, borderColor: 'lightgray', mx: 1, mt: 1, pb: 0.5 }}>
                  <TextComponent
                    text={'Item Details and Attachments'}
                    sx={{ fontWeight: 500, color: '#6A5546', pl: 0.8, pt: 0.5, fontSize: 15 }}
                  />
                  {CondemData?.filter(
                    val =>
                      val.am_condem_reason !== null ||
                      addedCondemFiles[val.am_condem_detail_slno]?.length > 0
                  ).map((val, index) => (
                    <Box
                      key={index}
                      sx={{
                        flex: 1,
                        mx: 0.5,
                        border: 1,
                        borderColor: 'lightgray',
                        mt: 0.5,
                        p: 0.5,
                      }}
                    >
                      <Box sx={{ flex: 1, display: 'flex' }}>
                        <TextComponent
                          text={
                            val.spare_asset_no
                              ? `${val.spare_asset_no}/${val.spare_asset_no_only
                                  .toString()
                                  .padStart(6, '0')}`
                              : `${val.item_asset_no}/${val.item_asset_no_only
                                  .toString()
                                  .padStart(6, '0')}`
                          }
                          sx={{ fontWeight: 500, color: '#0C2D48', pl: 0.8, pt: 0.5, fontSize: 14 }}
                        />
                        <TextComponent
                          text={`(${
                            val.cat_asset_name !== null
                              ? val.cat_asset_name
                              : val.cat_spare_name !== null
                              ? val.cat_spare_name
                              : ''
                          })`}
                          sx={{ fontWeight: 500, color: '#0C2D48', pl: 0.8, pt: 0.5, fontSize: 14 }}
                        />
                        <TextComponent
                          text={
                            val.item_asset_name !== null
                              ? val.item_asset_name
                              : val.item_spare_name !== null
                              ? val.item_spare_name
                              : ''
                          }
                          sx={{ fontWeight: 500, color: '#0C2D48', pl: 0.8, pt: 0.5, fontSize: 14 }}
                        />
                      </Box>
                      <Box sx={{ flex: 1, display: 'flex' }}>
                        <TextComponent
                          text={'Reason :'}
                          sx={{ fontWeight: 500, color: 'black', pl: 0.8, pt: 0.5, fontSize: 14 }}
                        />
                        <TextComponent
                          text={val.am_condem_reason || null}
                          sx={{ color: 'black', pl: 0.8, pt: 0.5, fontSize: 14 }}
                        />
                      </Box>
                      <Box sx={{ flex: 1, mr: 1, my: 0.5, ml: 0.5 }}>
                        {imageShowsingleFlag === 1 && (
                          <Box>
                            <FileViewSingle
                              previewFile={uploadedFile}
                              imageShow={imageShowSingle}
                              CloseFile={CloseSingleFile}
                            />
                          </Box>
                        )}
                        {addedCondemFiles[val.am_condem_detail_slno]?.length > 0 && (
                          <Grid container spacing={0.5}>
                            {addedCondemFiles[val.am_condem_detail_slno].map((url, fileIndex) => {
                              if (!url || typeof url !== 'string') return null
                              const isPdf = url.toLowerCase().endsWith('.pdf')
                              const isImage = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url)

                              return (
                                <Box key={fileIndex} sx={{ display: 'flex' }}>
                                  {isImage ? (
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        border: 0.5,
                                        borderColor: '#E0E1E3',
                                        mr: 0.5,
                                      }}
                                    >
                                      <Box sx={{ p: 0.5 }}>
                                        <img
                                          src={url}
                                          alt={`Complaint file ${fileIndex}`}
                                          style={{
                                            width: 48,
                                            height: 48,
                                            color: '#e53935',
                                            cursor: 'pointer',
                                          }}
                                          onClick={() => SingleView({ url })}
                                        />
                                      </Box>
                                      <Box
                                        sx={{
                                          fontSize: 12,
                                          color: '#333',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap',
                                          width: 90,
                                          pt: 2,
                                        }}
                                      >
                                        {url.split('/').pop() || 'N/A'}
                                      </Box>
                                    </Box>
                                  ) : isPdf ? (
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        border: 0.5,
                                        borderColor: '#E0E1E3',
                                        mr: 0.5,
                                      }}
                                    >
                                      <PictureAsPdfIcon
                                        sx={{
                                          width: 48,
                                          height: 48,
                                          color: '#e53935',
                                          cursor: 'pointer',
                                          mt: 0.5,
                                        }}
                                        onClick={() => SingleView({ url })}
                                      />
                                      <Box
                                        sx={{
                                          fontSize: 12,
                                          color: '#333',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap',
                                          width: 90,
                                          pt: 2,
                                        }}
                                      >
                                        {url.split('/').pop() || 'N/A'}
                                      </Box>
                                    </Box>
                                  ) : (
                                    <InsertDriveFileIcon
                                      sx={{
                                        width: 50,
                                        height: 50,
                                        color: '#e53935',
                                        cursor: 'pointer',
                                      }}
                                      onClick={() => SingleView({ url })}
                                    />
                                  )}
                                </Box>
                              )
                            })}
                          </Grid>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
              <Box
                sx={{
                  bottom: 0,
                  left: 0,
                  textAlign: 'right',
                  py: 1,
                  mr: 2,
                  backgroundColor: 'white',
                }}
              >
                <Button variant="outlined" sx={buttonStyle} onClick={submitForm}>
                  Submit
                </Button>
                <Button variant="outlined" sx={buttonStyle} onClick={CloseModal}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(CondemSubmitionModal)
