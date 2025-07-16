import { Box, Checkbox, CssVarsProvider, Grid, Modal, ModalDialog, Table } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCondemAddedDetails, getItemUnderForm } from 'src/api/AssetApis'
import { axioslogin } from 'src/views/Axios/Axios'
import TextComponent from 'src/views/Components/TextComponent'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import MoreIcon from '@mui/icons-material/More'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import FileViewSingle from 'src/views/Components/FileViewSingle'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import DirectionsIcon from '@mui/icons-material/Directions'
import { format } from 'date-fns'
import AssetDetailsModal from './AssetDetailsView/AssetDetailsModal'

const ViewSubmittedModal = ({ modalViewOpen, setmodalViewOpen, setmodalViewFlag, formDetails }) => {
  const {
    condem_mast_slno,
    condem_form_prefix,
    condem_form_no,
    reg_date,
    incharge_approve_status,
    incharge_remarks,
    hod_approve_status,
    hod_remarks,
    gm_approve_remarks,
    acc_approve_status,
    acc_approve_remarks,
    material_mangmnt_mangr_apprv_status,
    material_mangmnt_mangr_apprv_remark,
    inch_apprv_reject_date,
    incharge_employee,
    hod_apprv_reject_date,
    hod_employee,
    store_approve_remarks,
    store_approve_status,
    gm_approve_status,
    gm_apprv_reject_date,
    gm_opr_employee,
    accounts_employee,
    acc_apprv_reject_date,
    store_approve_employee,
    store_approve_reject_date,
    material_mange_apprv_reject_date,
    material_mangm_employee
  } = formDetails

  const [addedCondemFiles, setaddedCondemFiles] = useState([])

  const postCondemSlno = useMemo(() => {
    return {
      condemMastslno: condem_mast_slno
    }
  }, [condem_mast_slno])

  const { data: itemUnderForm } = useQuery({
    queryKey: ['getItemUnderForm'],
    queryFn: () => getItemUnderForm(postCondemSlno),
    enabled: condem_mast_slno !== undefined
  })

  const CloseModal = useCallback(() => {
    setmodalViewOpen(false)
    setmodalViewFlag(0)
  }, [setmodalViewOpen, setmodalViewFlag])

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

  const { data: CondemData } = useQuery({
    queryKey: ['getCondemAddedDetails'],
    queryFn: () => getCondemAddedDetails(postCondemSlno),
    enabled: condem_mast_slno !== undefined
  })

  const [checkedItems, setCheckedItems] = useState({})
  const handleCheckboxChange = (event, index) => {
    const isChecked = event.target.checked
    setCheckedItems(prev => ({ ...prev, [index]: isChecked }))
  }

  const fetchCondemFiles = useCallback(async () => {
    if (CondemData?.length > 0) {
      const requests = CondemData.map(async row => {
        const postData = {
          id: row.condem_mast_slno || null,
          detailId: row.am_condem_detail_slno || null
        }
        try {
          const result = await axioslogin.post('/AssetFileUpload/uploadFile/getCondemnation', postData)
          const { success, data } = result.data
          if (success === 1 && data && Array.isArray(data)) {
            return {
              [row.am_condem_detail_slno]: data.map(
                fileName => `${PUBLIC_NAS_FOLDER}/AssetCondemDetails/${postData.id}/${postData.detailId}/${fileName}`
              )
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

  const CloseSingleFile = useCallback(() => {
    setImagesingle(0)
    setImageShowSingle(false)
  }, [])

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
      <CssVarsProvider>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={modalViewOpen}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pl: 1,
            borderRadius: 10
          }}
        >
          <ModalDialog variant="outlined" sx={{ width: '95vw', p: 0, overflow: 'auto', height: '100vh' }}>
            <Box sx={{ border: 0.1, borderColor: '#E8E6E5', m: 1 }}>
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
                  mt: 2
                }}
              >
                <Box>
                  <TextComponent text={'Request Date'} sx={{ fontWeight: 400, pl: 0.5, color: 'Black' }} />
                  <TextFieldCustom style={{ width: 200 }} type="date" name="reg_date" value={reg_date} readOnly />
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
                    value={`${condem_form_prefix}${condem_form_no ? `/${condem_form_no}` : ''}`}
                    name="FromNo"
                    readOnly
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
                    borderColor: 'lightgray'
                  }}
                >
                  <Box
                    sx={{
                      height: 32,
                      display: 'flex',
                      bgcolor: '#DCD2CC',
                      alignItems: 'center',
                      borderBottom: 1,
                      borderColor: 'lightgray'
                    }}
                  >
                    <Box sx={{ width: 40, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1.5 }}>#</Box>
                    <Box sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1 }}>
                      Keep in Scarp Store
                    </Box>
                    <Box sx={{ width: 120, fontWeight: 600, color: '#444444', fontSize: 14 }}>Asset/Spare No.</Box>
                    <Box sx={{ width: 160, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1 }}>
                      Item Purchase Value
                    </Box>
                    <Box sx={{ width: 100, fontWeight: 600, color: '#444444', fontSize: 14 }}>Ticket No.</Box>
                    <Box sx={{ flex: 2, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1 }}>Condem Reason</Box>
                    <Box sx={{ width: 60, fontWeight: 600, color: '#444444', fontSize: 14 }}>Details</Box>
                    <Box sx={{ width: 50, fontWeight: 600, color: '#444444', fontSize: 14, pl: 1 }}>Add</Box>
                  </Box>

                  <Box sx={{ width: '100%', overflow: 'auto' }}>
                    <Box sx={{ minHeight: 10, overflowY: 'auto' }}>
                      {itemUnderForm?.map((val, index) => {
                        const billamount = val.asset_bill_amount
                          ? val.asset_bill_amount
                          : val.spare_bill_amount
                            ? val.spare_bill_amount
                            : ''

                        return (
                          <Box
                            key={index}
                            sx={{
                              height: 32,
                              display: 'flex',
                              alignItems: 'center',
                              borderBottom: 1,
                              borderColor: 'lightgray',
                              bgcolor: val.keep_inscarp_status === 1 ? '#EDF2F3' : 'white'
                            }}
                          >
                            <Box
                              sx={{
                                width: 40,
                                fontWeight: 600,
                                color: '#444444',
                                fontSize: 14,
                                pl: 1.5
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
                                justifyContent: 'center'
                              }}
                            >
                              <Box>
                                <Checkbox
                                  disabled
                                  variant="outlined"
                                  color="neutral"
                                  onChange={e => handleCheckboxChange(e, index, val)}
                                  checked={checkedItems[index] || val.keep_inscarp_status === 1}
                                  sx={{ mt: 0.5 }}
                                />
                              </Box>
                            </Box>
                            <Box sx={{ width: 120, fontWeight: 600, color: '#444444', fontSize: 14 }}>
                              {val.spare_asset_no
                                ? `${val.spare_asset_no}/${val.spare_asset_no_only.toString().padStart(6, '0')}`
                                : `${val.item_asset_no}/${val.item_asset_no_only.toString().padStart(6, '0')}`}
                            </Box>
                            <Box
                              sx={{
                                width: 160,
                                fontWeight: 600,
                                color: '#444444',
                                fontSize: 14,
                                pl: 1
                              }}
                            >
                              {new Intl.NumberFormat('en-IN', {
                                style: 'currency',
                                currency: 'INR'
                              }).format(billamount)}
                            </Box>
                            <Box sx={{ width: 100, fontWeight: 600, color: '#444444', fontSize: 14 }}>
                              {val.asset_complaint_slno
                                ? val.asset_complaint_slno
                                : val.spare_complaint_slno
                                  ? val.spare_complaint_slno
                                  : ''}
                            </Box>
                            <Box
                              sx={{
                                flex: 2,
                                fontWeight: 600,
                                color: '#444444',
                                fontSize: 14,
                                pl: 1
                              }}
                            >
                              {val.asset_condm_transf_remarks
                                ? val.asset_condm_transf_remarks
                                : val.spare_condm_transf_remarks
                                  ? val.spare_condm_transf_remarks
                                  : ''}
                            </Box>
                            <Box
                              sx={{
                                width: 60,
                                fontWeight: 600,
                                color: '#444444',
                                fontSize: 14,
                                pl: 1
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
                                pl: 1
                              }}
                            >
                              <AddCircleIcon sx={{ cursor: 'pointer', color: 'lightgrey' }} />
                            </Box>
                          </Box>
                        )
                      })}
                    </Box>
                  </Box>
                </Box>
              </Box>
              {(CondemData?.some(item => item.am_condem_reason !== null || item.keep_inscarp_status === 1) ||
                addedCondemFiles.length > 0) && (
                  <Box sx={{ flex: 1, border: 1, borderColor: 'lightgray', mx: 1, mt: 1, pb: 0.5 }}>
                    <TextComponent
                      text={'Item Details and Attachments'}
                      sx={{ fontWeight: 500, color: '#6A5546', pl: 0.8, pt: 0.5, fontSize: 15 }}
                    />
                    {CondemData?.filter(
                      val =>
                        val.am_condem_reason !== null ||
                        addedCondemFiles[val.am_condem_detail_slno]?.length > 0 ||
                        val.keep_inscarp_status === 1
                    ).map((val, index) => (
                      <Box
                        key={index}
                        sx={{
                          flex: 1,
                          mx: 0.5,
                          border: 1,
                          borderColor: 'lightgray',
                          mt: 0.5,
                          p: 0.5
                        }}
                      >
                        {val.keep_inscarp_status === 1 ? (
                          <Box sx={{ flex: 1, display: 'flex', bgcolor: '#F7F9A7', pl: 0.5 }}>
                            <DirectionsIcon sx={{ color: 'black' }} />
                            <Box sx={{ fontWeight: 600, pl: 0.5, color: 'black' }}>
                              Keeped In Department Scrap Store :
                            </Box>

                            <Box sx={{ pl: 1, fontWeight: 600, fontsize: 12, color: 'black' }}>
                              {val.keep_in_srap_store_reason}
                            </Box>
                          </Box>
                        ) : null}
                        <Box sx={{ flex: 1, display: 'flex' }}>
                          <TextComponent
                            text={
                              val.spare_asset_no
                                ? `${val.spare_asset_no}/${val.spare_asset_no_only.toString().padStart(6, '0')}`
                                : `${val.item_asset_no}/${val.item_asset_no_only.toString().padStart(6, '0')}`
                            }
                            sx={{ fontWeight: 500, color: '#0C2D48', pl: 0.8, pt: 0.5, fontSize: 14 }}
                          />
                          <TextComponent
                            text={`(${val.cat_asset_name !== null
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
                        {val.am_condem_reason !== null ? (
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
                        ) : null}
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
                                          mr: 0.5
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
                                              cursor: 'pointer'
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
                                            pt: 2
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
                                          mr: 0.5
                                        }}
                                      >
                                        <PictureAsPdfIcon
                                          sx={{
                                            width: 48,
                                            height: 48,
                                            color: '#e53935',
                                            cursor: 'pointer',
                                            mt: 0.5
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
                                            pt: 2
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
                                          cursor: 'pointer'
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
              <Box sx={{ flex: 1, border: 1, borderColor: 'lightgray', mx: 1, mt: 1, pb: 0.5 }}>
                <TextComponent
                  text={'Verification and Approvals'}
                  sx={{ fontWeight: 500, color: '#003060', pl: 1.5, py: 1, fontSize: 15 }}
                />
                <Table stickyHeader size="sm" sx={{ my: 1, ml: 1, width: '99%' }} borderAxis="both">
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'center', width: 10 }}>Approval Panels</th>
                      <th style={{ textAlign: 'center', width: 15 }}>Name</th>
                      <th style={{ textAlign: 'center', width: 10 }}>Status</th>
                      <th style={{ textAlign: 'center', width: 30 }}>Remarks</th>
                      <th style={{ textAlign: 'center', width: 10 }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: 'center', fontsize: 14 }}>Incharge</td>
                      <td style={{ textAlign: 'center', fontsize: 12 }}>{incharge_employee || '-'}</td>
                      <td
                        style={{
                          textAlign: 'center',
                          color:
                            incharge_approve_status === 1 ? 'green' : incharge_approve_status === 2 ? 'red' : 'black'
                        }}
                      >
                        {incharge_approve_status === 1 ? 'Approved' : incharge_approve_status === 2 ? 'Rejected' : '-'}
                      </td>
                      <td style={{ textAlign: 'center' }}>{incharge_remarks || '-'}</td>
                      <td style={{ textAlign: 'center' }}>
                        {inch_apprv_reject_date
                          ? format(new Date(inch_apprv_reject_date), 'dd MMM yyyy,  hh:mm a')
                          : '-'}
                      </td>
                    </tr>

                    <tr>
                      <td style={{ textAlign: 'center', fontsize: 14 }}>Hod</td>
                      <td style={{ textAlign: 'center' }}>{hod_employee || '-'}</td>
                      <td
                        style={{
                          textAlign: 'center',
                          color: hod_approve_status === 1 ? 'green' : hod_approve_status === 2 ? 'red' : 'black'
                        }}
                      >
                        {hod_approve_status === 1 ? 'Approved' : hod_approve_status === 2 ? 'Rejected' : '-'}
                      </td>
                      <td style={{ textAlign: 'center' }}>{hod_remarks || '-'}</td>
                      <td style={{ textAlign: 'center' }}>
                        {hod_apprv_reject_date ? format(new Date(hod_apprv_reject_date), 'dd MMM yyyy,  hh:mm a') : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'center', fontsize: 14 }}>GM Operations</td>
                      <td style={{ textAlign: 'center' }}>{gm_opr_employee || '-'}</td>
                      <td
                        style={{
                          textAlign: 'center',
                          color: gm_approve_status === 1 ? 'green' : gm_approve_status === 2 ? 'red' : 'black'
                        }}
                      >
                        {gm_approve_status === 1 ? 'Approved' : gm_approve_status === 2 ? 'Rejected' : '-'}
                      </td>
                      <td style={{ textAlign: 'center' }}>{gm_approve_remarks || '-'}</td>
                      <td style={{ textAlign: 'center' }}>
                        {gm_apprv_reject_date ? format(new Date(gm_apprv_reject_date), 'dd MMM yyyy,  hh:mm a') : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'center', fontsize: 14 }}>Accounts</td>
                      <td style={{ textAlign: 'center' }}>{accounts_employee || '-'}</td>
                      <td
                        style={{
                          textAlign: 'center',
                          color: acc_approve_status === 1 ? 'green' : acc_approve_status === 2 ? 'red' : 'black'
                        }}
                      >
                        {acc_approve_status === 1 ? 'Approved' : acc_approve_status === 2 ? 'Rejected' : '-'}
                      </td>
                      <td style={{ textAlign: 'center' }}>{acc_approve_remarks || '-'}</td>
                      <td style={{ textAlign: 'center' }}>
                        {acc_apprv_reject_date ? format(new Date(acc_apprv_reject_date), 'dd MMM yyyy,  hh:mm a') : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'center', fontsize: 14 }}>General Store</td>
                      <td style={{ textAlign: 'center' }}>{store_approve_employee || '-'}</td>
                      <td
                        style={{
                          textAlign: 'center',
                          color: store_approve_status === 1 ? 'green' : store_approve_status === 2 ? 'red' : 'black'
                        }}
                      >
                        {store_approve_status === 1 ? 'Approved' : store_approve_status === 2 ? 'Rejected' : '-'}
                      </td>
                      <td style={{ textAlign: 'center' }}>{store_approve_remarks || '-'}</td>
                      <td style={{ textAlign: 'center' }}>
                        {store_approve_reject_date
                          ? format(new Date(store_approve_reject_date), 'dd MMM yyyy,  hh:mm a')
                          : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'center', fontsize: 14 }}>Materials Management Manager</td>
                      <td style={{ textAlign: 'center' }}>{material_mangm_employee || '-'}</td>
                      <td
                        style={{
                          textAlign: 'center',
                          color:
                            material_mangmnt_mangr_apprv_status === 1
                              ? 'green'
                              : material_mangmnt_mangr_apprv_status === 2
                                ? 'red'
                                : 'black'
                        }}
                      >
                        {material_mangmnt_mangr_apprv_status === 1
                          ? 'Approved'
                          : material_mangmnt_mangr_apprv_status === 2
                            ? 'Rejected'
                            : '-'}
                      </td>
                      <td style={{ textAlign: 'center' }}>{material_mangmnt_mangr_apprv_remark || '-'}</td>
                      <td style={{ textAlign: 'center' }}>
                        {material_mange_apprv_reject_date
                          ? format(new Date(material_mange_apprv_reject_date), 'dd MMM yyyy,  hh:mm a')
                          : '-'}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Box>
              <Box sx={{ height: 30 }}></Box>
            </Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Box>
  )
}
export default memo(ViewSubmittedModal)
