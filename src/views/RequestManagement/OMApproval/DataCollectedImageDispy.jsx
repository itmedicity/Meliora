import React, { memo, useEffect, useMemo, useState } from 'react'
import Modal from '@mui/joy/Modal'
import Sheet from '@mui/joy/Sheet'
import { CssVarsProvider } from '@mui/joy'
import { Box } from '@mui/material'
import Button from '@mui/joy/Button'
import { axioslogin } from 'src/views/Axios/Axios'
import JSZip from 'jszip'

const DataCollectedImageDispy = ({ open, handleCloseCollect, dataCollSlno, req_slno }) => {
  const postdata = useMemo(() => {
    return {
      req_slno: req_slno,
      crf_data_collect_slno: dataCollSlno
    }
  }, [req_slno, dataCollSlno])

  const [disArry, setDissArry] = useState([])
  const [imagearray, setImageArry] = useState([])
  useEffect(() => {
    const getImage = async () => {
      // const result = await axioslogin.post('/CrfImageUpload/crf/getDataCollectionImage', postdata)
      // const { success, data } = result.data
      // if (success === 1) {
      //   const fileNames = data
      //   const fileUrls = fileNames.map(fileName => {
      //     return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/datacollection/${dataCollSlno}/${fileName}`
      //   })
      //   setImageArry(fileUrls)
      // }

      setImageArry([])
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
        }
      } catch (error) {
        console.error('Error fetching or processing images:', error);
        setImageArry([])
      }
    }

    getImage(postdata)
  }, [postdata, dataCollSlno, req_slno])

  useEffect(() => {
    if (imagearray.length !== 0) {
      const disimage = imagearray.map(val => {
        const parts = val.split('/')
        const fileNamePart = parts[parts.length - 1]
        const obj = {
          imageName: fileNamePart,
          url: val
        }
        return obj
      })
      setDissArry(disimage)
    }
  }, [imagearray])

  return (
    <CssVarsProvider>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          maxHeight: 700
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            minWidth: '50%',
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            minHeight: 500,
            maxWidth: 300,
            maxHeight: 700
          }}
        >
          <Box
            sx={{
              width: '100%',
              flex: 1,
              borderRadius: 1,
              border: '0.1px solid #454545',
              minHeight: 500,
              margin: 'auto',
              height: window.innerHeight - 350,
              overflowX: 'auto',
              '::-webkit-scrollbar': { display: 'none' }
            }}
          >
            {disArry &&
              disArry.map((value, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
                  {value.imageName.endsWith('.pdf') ? (
                    <embed src={value.url} type="application/pdf" height={820} width="100%" />
                  ) : (
                    <img alt="" src={value.url} height={820} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                  )}
                </Box>
              ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" color="secondary" size="md" onClick={handleCloseCollect}>
              Cancel
            </Button>
          </Box>
        </Sheet>
      </Modal>
    </CssVarsProvider>
  )
}

export default memo(DataCollectedImageDispy)
