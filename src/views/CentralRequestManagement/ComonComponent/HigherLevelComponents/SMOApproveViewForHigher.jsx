import { Box, Chip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { format } from 'date-fns'
import React, { Fragment, memo, useCallback, useState } from 'react'
import { axioskmc, axioslogin } from 'src/views/Axios/Axios'
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone'
import ImageDisplayModal from '../ImageUploadCmp/ImageDisplayModal'
import CustomToolTipForCRF from '../Components/CustomToolTipForCRF'
import JSZip from 'jszip'

const SMOApproveViewForHigher = ({ DetailViewData, selectedCompany, company }) => {
  const {
    req_slno,
    senior_manage_approv,
    smo,
    senior_manage_remarks,
    smo_detial_analysis,
    som_aprrov_date,
    senior_manage_user,
    smo_image
  } = DetailViewData
  const [imageshowFlag, setImageShowFlag] = useState(0)
  const [imageshow, setImageShow] = useState(false)
  const [imagearray, setImageArry] = useState([])
  const handleClose = useCallback(() => {
    setImageShowFlag(0)
    setImageShow(false)
  }, [])
  const capitalizeWords = str =>
    str
      ? str
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      : ''
  const ViewSMOUploadImage = useCallback(() => {
    if (selectedCompany === '1') {
      const getImage = async req_slno => {
        // const result = await axioslogin.get(`/newCRFRegisterImages/crfSMOImageGet/${req_slno}`)
        // const { success, data } = result.data
        // if (success === 1) {
        //   const fileNames = data
        //   const fileUrls = fileNames.map(fileName => {
        //     return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/SMOUpload/${fileName}`
        //   })
        //   setImageArry(fileUrls)
        //   setImageShowFlag(1)
        //   setImageShow(true)
        // } else {
        //   warningNotify('Error Occured to display image')
        //   setImageShowFlag(0)
        //   setImageShow(false)
        //   setImageArry([])
        // }
        try {
          const result = await axioslogin.get(`/newCRFRegisterImages/crfSMOImageGet/${req_slno}`, {
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
            setImageArry(images)
            setImageShowFlag(1)
            setImageShow(true)
          }
        } catch (error) {
          console.error('Error fetching or processing images:', error);
        }
      }
      getImage(req_slno)
    } else if (selectedCompany === '2') {
      const getImage = async req_slno => {
        // const result = await axioskmc.get(`/newCRFRegisterImages/crfSMOImageGet/${req_slno}`)
        // const { success, data } = result.data
        // if (success === 1) {
        //   const fileNames = data
        //   const fileUrls = fileNames.map(fileName => {
        //     return `${PUBLIC_NAS_FOLDER_KMC}/CRF/crf_registration/${req_slno}/SMOUpload/${fileName}`
        //   })
        //   setImageArry(fileUrls)
        //   setImageShowFlag(1)
        //   setImageShow(true)
        // } else {
        //   warningNotify('Error Occured to display image')
        //   setImageShowFlag(0)
        //   setImageShow(false)
        //   setImageArry([])
        // }
        try {
          const result = await axioskmc.get(`/newCRFRegisterImages/crfSMOImageGet/${req_slno}`, {
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
            setImageArry(images)
            setImageShowFlag(1)
            setImageShow(true)
          }
        } catch (error) {
          console.error('Error fetching or processing images:', error);
        }
      }
      getImage(req_slno)
    }
  }, [req_slno, selectedCompany])

  return (
    <Fragment>
      {imageshowFlag === 1 ? (
        <ImageDisplayModal open={imageshow} handleClose={handleClose} images={imagearray} />
      ) : null}
      <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}>
          <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}>
            {company?.smo_status_name}
          </Typography>
          <Box sx={{ flex: 1, py: 0.4, ml: 2 }}>
            <Chip
              size="md"
              variant="outlined"
              sx={{
                color:
                  senior_manage_approv === 1
                    ? '#2e7d32'
                    : senior_manage_approv === 2
                      ? '#bf360c'
                      : senior_manage_approv === 3
                        ? '#FF9800'
                        : senior_manage_approv === 4
                          ? '#009688'
                          : '#607D8B',
                height: 25,
                pb: 0.5,
                fontSize: 12,
                fontWeight: 550
              }}
            >
              {smo}
            </Chip>
          </Box>
        </Box>
        <Box sx={{ pt: 0.1 }}>
          {senior_manage_approv === 1 && senior_manage_remarks !== null ? (
            <Box sx={{ pt: 0.5 }}>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Justification/ Requirement Description </Typography>
                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                  {senior_manage_remarks === null ? 'Not Updated' : senior_manage_remarks}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', pt: 1 }}>
                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Detailed Analysis of Requirement</Typography>
                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                  {smo_detial_analysis === null ? 'Not Updated' : smo_detial_analysis}
                </Typography>
              </Box>
            </Box>
          ) : senior_manage_approv === 2 && senior_manage_remarks !== null ? (
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Justification for Reject </Typography>
              <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
              <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                {senior_manage_remarks === null ? 'Not Updated' : senior_manage_remarks}
              </Typography>
            </Box>
          ) : senior_manage_approv === 3 && senior_manage_remarks !== null ? (
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Justification for On-Hold</Typography>
              <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
              <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                {senior_manage_remarks === null ? 'Not Updated' : senior_manage_remarks}
              </Typography>
            </Box>
          ) : senior_manage_approv === 4 && senior_manage_remarks !== null ? (
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Remarks</Typography>
              <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
              <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                {senior_manage_remarks === null ? 'Not Updated' : senior_manage_remarks}
              </Typography>
            </Box>
          ) : null}
          {som_aprrov_date !== null ? (
            <Box sx={{ display: 'flex', py: 1 }}>
              {senior_manage_approv === 1 || senior_manage_approv === 4 ? (
                <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>Approved by </Typography>
              ) : senior_manage_approv === 2 ? (
                <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>Rejected by </Typography>
              ) : senior_manage_approv === 3 ? (
                <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>On-Hold by </Typography>
              ) : null}
              <Box sx={{ display: 'flex', flex: 1 }}>
                <Typography sx={{}}> :&nbsp;</Typography>
                <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, pt: 0.3, pl: 0.2 }}>
                  {capitalizeWords(senior_manage_user)}
                </Typography>
                <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, pl: 2, pt: 0.3 }}>
                  {format(new Date(som_aprrov_date), 'dd-MM-yyyy hh:mm:ss a')}
                </Typography>
                {smo_image === 1 ? (
                  <Box sx={{ display: 'flex', pl: 2 }}>
                    <CustomToolTipForCRF title="File View" placement="top">
                      <AttachmentTwoToneIcon
                        fontSize="small"
                        sx={{ cursor: 'pointer', color: '#0277bd', width: 35, height: 25 }}
                        onClick={ViewSMOUploadImage}
                      ></AttachmentTwoToneIcon>
                    </CustomToolTipForCRF>
                  </Box>
                ) : null}
              </Box>
            </Box>
          ) : null}
        </Box>
      </Paper>
    </Fragment>
  )
}
export default memo(SMOApproveViewForHigher)
