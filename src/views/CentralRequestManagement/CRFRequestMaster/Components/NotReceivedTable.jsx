import { Box, CssVarsProvider, IconButton, Table } from '@mui/joy'
import { keyframes, Paper } from '@mui/material'
import { format } from 'date-fns'
import React, { Fragment, memo, useCallback, useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CRFApprovalView from './CRFApprovalView'
import GppGoodTwoToneIcon from '@mui/icons-material/GppGoodTwoTone'
import UserAckModal from './UserAckModal'
import BeenhereTwoToneIcon from '@mui/icons-material/BeenhereTwoTone'
import { axioslogin } from 'src/views/Axios/Axios'
import { GetItemDetailsOfCRFCmp } from '../../ComonComponent/GetItemDetailsOfCRFCmp'
import CustomToolTipForCRF from '../../ComonComponent/Components/CustomToolTipForCRF'
import JSZip from 'jszip'

const NotReceivedTable = ({ disData, rowSelect, company }) => {
  const [modalData, setModalData] = useState([])
  const [modalopen, setModalOpen] = useState(false)
  const [modFlag, setModFlag] = useState(0)
  const [ackModal, setAckModal] = useState(false)
  const [ackFlag, setackFlag] = useState(0)
  const [req_slno, setReq_slno] = useState(0)
  const [imagearray, setImageArry] = useState([])
  const [poDetails, setPoDetails] = useState([])
  const [reqItems, setReqItems] = useState([])
  const [approveTableData, setApproveTableData] = useState([])

  const { company_name } = company
  const blinkAnimation = keyframes`0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; }`
  const viewDetails = useCallback(val => {
    setModalData(val)
    const { req_slno } = val
    const getImage = async req_slno => {
      // const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
      // const { success, data } = result.data
      // if (success === 1) {
      //   const fileNames = data
      //   const fileUrls = fileNames.map(fileName => {
      //     return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`
      //   })
      //   const savedFiles = fileUrls.map(val => {
      //     const parts = val.split('/')
      //     const fileNamePart = parts[parts.length - 1]
      //     const obj = {
      //       imageName: fileNamePart,
      //       url: val
      //     }
      //     return obj
      //   })
      //   setImageArry(savedFiles)
      // }
      setImageArry([]);
      try {
        const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`, {
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
          // Convert each to a Blob URL
          // const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
          //   const blob = await fileObj.async('blob');
          //   const url = URL.createObjectURL(blob);
          //   return { imageName: filename, url };
          // })
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
          setImageArry(images);
        }
      } catch (error) {
        setImageArry([]);
        console.error('Error fetching or processing images:', error);
      }
    }
    getImage(req_slno)
    GetItemDetailsOfCRFCmp(req_slno, setReqItems, setApproveTableData, setPoDetails)
    setModalOpen(true)
    setModFlag(1)
  }, [])
  const handleClose = useCallback(() => {
    setModalOpen(false)
    setModFlag(0)
    setModalData([])
    setAckModal(false)
    setackFlag(0)
  }, [setModalOpen, setAckModal])
  const userAcknowledge = useCallback(
    val => {
      const { req_slno } = val
      setReq_slno(req_slno)
      GetItemDetailsOfCRFCmp(req_slno, setReqItems, setApproveTableData, setPoDetails)
      setAckModal(true)
      setackFlag(1)
    },
    [setAckModal]
  )

  return (
    <Fragment>
      {modFlag === 1 ? (
        <CRFApprovalView
          modalData={modalData}
          handleClose={handleClose}
          open={modalopen}
          imagearray={imagearray}
          poDetails={poDetails}
          approveTableData={approveTableData}
          reqItems={reqItems}
          company={company}
        />
      ) : null}
      {ackFlag === 1 ? (
        <UserAckModal
          handleClose={handleClose}
          open={ackModal}
          req_slno={req_slno}
          approveTableData={approveTableData}
          reqItems={reqItems}
          company={company}
        />
      ) : null}
      {disData?.length !== 0 ? (
        <Paper
          variant="outlined"
          sx={{
            overflow: 'auto',
            height: window.innerHeight - 210,
            flexWrap: 'wrap',
            '&::-webkit-scrollbar': { height: 8 }
          }}
        >
          <CssVarsProvider>
            <Table padding={'none'} stickyHeader>
              <thead style={{ height: 4 }} size="small">
                <tr style={{ height: 4 }} size="small">
                  <th size="sm" style={{ width: 50, textAlign: 'center' }}></th>
                  <th size="sm" style={{ width: 50, textAlign: 'center' }}></th>
                  <th size="sm" style={{ width: 50, textAlign: 'center' }}></th>
                  <th size="sm" style={{ width: 100, textAlign: 'left' }}>
                    CRF No
                  </th>
                  <th size="sm" style={{ width: 200, textAlign: 'left' }}>
                    Req.Dpt
                  </th>
                  <th size="sm" style={{ width: 200, textAlign: 'left' }}>
                    Req.Date
                  </th>
                  <th size="sm" style={{ width: 350, textAlign: 'left' }}>
                    Category
                  </th>
                  <th size="sm" style={{ width: 200, textAlign: 'left' }}>
                    User Dpt
                  </th>
                  <th size="sm" style={{ width: 200, textAlign: 'left' }}>
                    Location
                  </th>
                  <th size="sm" style={{ width: 200, textAlign: 'left' }}>
                    Approval Status
                  </th>
                </tr>
              </thead>
              <tbody size="small" style={{ height: 4 }}>
                {disData?.map((val, index) => (
                  <tr
                    key={index}
                    style={{
                      height: 4,
                      background:
                        val?.sub_store_recieve === 1 ||
                          val?.internally_arranged_status === 1 ||
                          val?.work_order_status === 1
                          ? '#B1D8B7'
                          : val?.store_recieve === 0 || val?.store_recieve === 1
                            ? '#BFD7ED'
                            : 'transparent'
                    }}
                    size="small"
                  >
                    <td>
                      {/* (val.hod_approve !== null || val.incharge_approve !== null) */}
                      {val?.req_status === 'C' ||
                        val?.incharge_approve === 1 ||
                        val?.dms_approve === 1 ||
                        val?.ms_approve === 1 ? (
                        <EditOutlinedIcon
                          sx={{
                            fontSize: 'lg',
                            color: 'grey',
                            height: 25,
                            width: 30,
                            borderRadius: 2,
                            boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      ) : (
                        <CustomToolTipForCRF title="Edit" placement="right">
                          <EditOutlinedIcon
                            sx={{
                              fontSize: 'lg',
                              color: '#3e2723',
                              height: 25,
                              width: 30,
                              borderRadius: 2,
                              boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                              cursor: 'pointer',
                              transition: 'transform 0.2s',
                              '&:hover': {
                                transform: 'scale(1.1)'
                              }
                            }}
                            onClick={() => rowSelect(val)}
                          />
                        </CustomToolTipForCRF>
                      )}
                    </td>
                    <td>
                      {val.sub_store_recieve === 1 ||
                        val?.internally_arranged_status === 1 ||
                        val?.work_order_status === 1 ? (
                        <CustomToolTipForCRF title="Acknowledgement " placement="right">
                          <GppGoodTwoToneIcon
                            sx={{
                              animation: `${blinkAnimation} 1s infinite`,
                              fontSize: 'lg',
                              color: '#1b5e20',
                              height: 25,
                              width: 30,
                              borderRadius: 2,
                              boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                              cursor: 'pointer',
                              transition: 'transform 0.2s',
                              '&:hover': {
                                transform: 'scale(1.1)'
                              }
                            }}
                            onClick={() => userAcknowledge(val)}
                          />
                        </CustomToolTipForCRF>
                      ) : (
                        <GppGoodTwoToneIcon
                          sx={{
                            fontSize: 'lg',
                            color: '#B1B1B1',
                            height: 25,
                            width: 30,
                            borderRadius: 2,
                            boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      )}
                    </td>
                    <td style={{ fontSize: 12 }}>
                      <CustomToolTipForCRF title="View Details" placement="right">
                        <BeenhereTwoToneIcon
                          sx={{
                            fontSize: 'lg',
                            color: '#01579b',
                            height: 23,
                            width: 25,
                            borderRadius: 2,
                            boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            '&:hover': {
                              transform: 'scale(1.1)'
                            }
                          }}
                          onClick={() => viewDetails(val)}
                        />
                      </CustomToolTipForCRF>
                    </td>
                    <td style={{ fontSize: 13 }}>
                      CRF/{company_name}/{val?.req_slno}
                    </td>
                    <td style={{ fontSize: 13 }}>{val?.req_deptsec}</td>
                    <td style={{ fontSize: 13 }}>{format(new Date(val?.req_date), 'dd-MM-yyyy hh:mm:ss a')}</td>
                    <td style={{ fontSize: 13 }}>{val?.category_name}</td>
                    <td style={{ fontSize: 13 }}>{val?.user_deptsection}</td>
                    <td style={{ fontSize: 13 }}>{val?.location}</td>
                    <td style={{ fontSize: 12 }}>
                      <CssVarsProvider>
                        <IconButton
                          sx={{
                            fontSize: 12,
                            minHeight: '40px',
                            lineHeight: '1.2',
                            fontWeight: 'bold',
                            maxHeight: '60px',
                            width: '180px',
                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                            borderRadius: 5,
                            bgcolor: '#D4F1F4',
                            border: '1px solid #a5d6a7'
                          }}
                        >
                          {val?.now_who}&nbsp;&nbsp;
                          {val?.now_who_status === 1
                            ? 'Approved'
                            : val?.now_who_status === 2
                              ? 'Rejected'
                              : val?.now_who_status === 3
                                ? 'On-Hold'
                                : ''}
                          &nbsp;&nbsp;{val?.req_status === 'I' ? '(Internally arranged)' : ''}
                          &nbsp;
                          {val?.work_order_status === 1 && val?.now_who === 'Purchase Acknowledged'
                            ? '(Quotation Fixed)'
                            : ''}
                        </IconButton>
                      </CssVarsProvider>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CssVarsProvider>
        </Paper>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: 25,
            opacity: 0.5,
            pt: 10,
            color: 'grey'
          }}
        >
          No Report Found
        </Box>
      )}
    </Fragment>
  )
}

export default memo(NotReceivedTable)
