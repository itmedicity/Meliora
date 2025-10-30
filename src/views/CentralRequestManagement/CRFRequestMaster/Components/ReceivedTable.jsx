import { Box, CssVarsProvider, Table, Tooltip } from '@mui/joy'
import { Paper } from '@mui/material'
import { format } from 'date-fns'
import React, { Fragment, memo, useCallback, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { GetItemDetailsOfCRFCmp } from '../../ComonComponent/GetItemDetailsOfCRFCmp'
import BeenhereTwoToneIcon from '@mui/icons-material/BeenhereTwoTone'
import CRFApprovalView from './CRFApprovalView'
import JSZip from 'jszip'

const ReceivedTable = ({ receivedData, company }) => {
  const [modalData, setModalData] = useState([])
  const [modalopen, setModalOpen] = useState(false)
  const [modFlag, setModFlag] = useState(0)
  const [imagearray, setImageArry] = useState([])
  const [poDetails, setPoDetails] = useState([])
  const [reqItems, setReqItems] = useState([])
  const [approveTableData, setApproveTableData] = useState([])
  const { company_name } = company

  const viewDetails = useCallback(val => {
    setModalData(val)
    setModalOpen(true)
    setModFlag(1)
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
          // });
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
        console.error('Error fetching or processing images:', error);
      }
    }
    getImage(req_slno)
    GetItemDetailsOfCRFCmp(req_slno, setReqItems, setApproveTableData, setPoDetails)
  }, [])
  const handleClose = useCallback(() => {
    setModalOpen(false)
    setModFlag(0)
    setModalData([])
  }, [setModalOpen])

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
      {receivedData.length !== 0 ? (
        <Paper
          variant="outlined"
          sx={{
            overflowX: 'auto',
            height: window.innerHeight - 210,
            flexWrap: 'wrap',
            '&::-webkit-scrollbar': { height: 8 }
          }}
        >
          <Box sx={{ pb: 0.5, px: 0.5 }}>
            <CssVarsProvider>
              <Table
                aria-label="table with sticky header"
                padding={'none'}
                stickyHeader
                sx={{ width: '100%', tableLayout: 'fixed', minWidth: 800 }}
              >
                <thead style={{ height: 4 }} size="small">
                  <tr style={{ height: 4 }} size="small">
                    <th size="sm" style={{ width: 60, textAlign: 'center' }}></th>
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
                    <th size="sm" style={{ width: 150, textAlign: 'left' }}>
                      Received User
                    </th>
                    <th size="sm" style={{ width: 170, textAlign: 'left' }}>
                      Received Date
                    </th>
                    <th size="sm" style={{ width: 200, textAlign: 'left' }}>
                      Received Remarks
                    </th>
                  </tr>
                </thead>
                <tbody size="small" style={{ height: 4 }}>
                  {receivedData?.map((val, index) => (
                    <tr key={index} style={{ height: 4 }} size="small">
                      <td style={{ textAlign: 'center' }}>
                        <Tooltip title="View Details" placement="right">
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
                        </Tooltip>
                      </td>
                      <td style={{ fontSize: 13 }}>
                        CRF/{company_name}/{val.req_slno}
                      </td>
                      <td style={{ fontSize: 13 }}>{val.req_deptsec}</td>
                      <td style={{ fontSize: 13 }}>{format(new Date(val.req_date), 'dd-MM-yyyy hh:mm:ss a')}</td>
                      <td style={{ fontSize: 13 }}>{val.category_name}</td>
                      <td style={{ fontSize: 13 }}>{val.user_deptsection}</td>
                      <td style={{ fontSize: 13 }}>{val.location}</td>
                      <td style={{ fontSize: 13 }}>{val.acknowUser}</td>
                      <td style={{ fontSize: 13 }}>{format(new Date(val.user_ack_date), 'dd-MM-yyyy hh:mm:ss a')}</td>
                      <td style={{ fontSize: 13 }}>{val.user_acknldge_remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CssVarsProvider>
          </Box>
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

export default memo(ReceivedTable)
