import { Box, Grid, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { errorNotify } from 'src/views/Common/CommonCode'
import FileViewSingle from 'src/views/Components/FileViewSingle'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import InsertPhotoSharpIcon from '@mui/icons-material/InsertPhotoSharp'
import { getFilesFromZip } from 'src/api/FileViewsFn'

const DocumentsList = ({ serviceDetails }) => {
  const { am_lease_mast_slno, am_bill_mastslno, item_asset_no, amccmc_slno, am_item_wargar_slno } = serviceDetails

  const [leaseDocuments, setleaseDocuments] = useState([])
  const [billdetailsView, setBilldetailsView] = useState([])
  const [amcCmcDocuments, setamcCmcDocuments] = useState([])
  const [wargarDocument, setwargarDocument] = useState([])



  useEffect(() => {
    if (!am_lease_mast_slno) return;
    let isMounted = true;
    const getLeaseDocuments = async () => {
      try {
        const images = await getFilesFromZip('/AssetFileUpload/LeaseMasterImageView', am_lease_mast_slno);
        if (isMounted) {
          setleaseDocuments(images);
        }
      } catch (error) {
        errorNotify('Error fetching lease documents:', error);
      }
    };
    getLeaseDocuments();
    return () => {
      isMounted = false;
    };
  }, [am_lease_mast_slno]);


  useEffect(() => {
    if (!am_bill_mastslno) return;
    let isMounted = true;
    const getDocumentViewBill = async () => {
      try {
        const images = await getFilesFromZip('/AssetFileUpload/BillMasterImageView', am_bill_mastslno);
        if (isMounted) {
          setBilldetailsView(images);
        }
      } catch (error) {
        errorNotify('Error fetching  documents:', error);
      }
    };
    getDocumentViewBill();
    return () => {
      isMounted = false;
    };
  }, [am_bill_mastslno]);



  useEffect(() => {
    if (!amccmc_slno) return;
    let isMounted = true;
    const getamcCmcDocuments = async () => {
      try {
        const images = await getFilesFromZip('/AssetFileUpload/AmcCmcImageView', amccmc_slno);
        if (isMounted) {
          setamcCmcDocuments(images);
        }
      } catch (error) {
        errorNotify('Error fetching documents:', error);
      }
    };
    getamcCmcDocuments();
    return () => {
      isMounted = false;
    };
  }, [amccmc_slno]);

  useEffect(() => {
    if (!am_item_wargar_slno) return;
    let isMounted = true;
    const getWarrentyImage = async () => {
      try {
        const images = await getFilesFromZip('/AssetFileUpload/GaurenteeWarrenteefileView', am_item_wargar_slno);
        if (isMounted) {
          setwargarDocument(images);
        }
      } catch (error) {
        errorNotify('Error fetching documents:', error);
      }
    };
    getWarrentyImage();
    return () => {
      isMounted = false;
    };
  }, [am_item_wargar_slno]);



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

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: 0.5,
        mt: 1
      }}
    >
      <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1 }}>
        <Typography
          sx={{
            flex: 1,
            fontWeight: 600,
            color: '#394060',
            fontSize: 16,
            mb: 0.5,
            pl: 0.5
          }}
        >
          Purchase Bills
        </Typography>
        <Box
          sx={{
            cursor: 'pointer',
            p: 0.5
          }}
        >
          {imageShowsingleFlag === 1 ? (
            <Box>
              <FileViewSingle previewFile={uploadedFile} imageShow={imageShowSingle} CloseFile={CloseSingleFile} />
            </Box>
          ) : null}
          {billdetailsView.length !== 0 ? (
            <Box sx={{ display: 'flex', gap: 0.8 }}>
              {billdetailsView.map((url, index) => {
                const isPdf = url.toLowerCase().endsWith('.pdf')
                const isImage = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url)
                return (
                  <Box
                    key={index}
                    sx={{
                      p: 0.5,
                      border: 1,
                      borderRadius: 4,
                      borderColor: '#E0E1E3'
                    }}
                  >
                    {isImage ? (
                      <img
                        src={url}
                        alt={`Complaint file ${index}`}
                        style={{
                          width: 75,
                          height: 50,
                          color: '#e53935',
                          cursor: 'pointer'
                        }}
                        onClick={() => SingleView({ url })}
                      />
                    ) : isPdf ? (
                      <PictureAsPdfIcon
                        sx={{
                          width: 75,
                          height: 50,
                          color: '#e53935',
                          cursor: 'pointer'
                        }}
                        onClick={() => SingleView({ url })}
                      />
                    ) : (
                      <InsertDriveFileIcon
                        sx={{
                          width: 75,
                          height: 50,
                          color: '#e53935',
                          cursor: 'pointer'
                        }}
                        onClick={() => SingleView({ url })}
                      />
                    )}
                    <Box
                      sx={{
                        fontSize: 13,
                        color: '#333',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: 75
                      }}
                    >
                      {url.split('/').pop() || 'N/A'}
                    </Box>
                  </Box>
                )
              })}
            </Box>
          ) : (
            <Box
              sx={{
                alignItems: 'center'
              }}
            >
              <InsertPhotoSharpIcon
                sx={{
                  width: 75,
                  height: 75,
                  color: '#E3E8F0',
                  cursor: 'default'
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
      {item_asset_no !== undefined ? (
        <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1 }}>
          <Box
            sx={{
              flex: 1,
              fontWeight: 600,
              color: '#394060',
              fontSize: 16,
              mb: 0.5,
              pl: 0.5
            }}
          >
            AMC/CMC Details
          </Box>
          <Box
            sx={{
              cursor: 'pointer',
              p: 0.5
            }}
          >
            {imageShowsingleFlag === 1 ? (
              <Box>
                <FileViewSingle previewFile={uploadedFile} imageShow={imageShowSingle} CloseFile={CloseSingleFile} />
              </Box>
            ) : null}
            {amcCmcDocuments.length !== 0 ? (
              <Box sx={{ display: 'flex', gap: 0.8 }}>
                {amcCmcDocuments.map((url, index) => {
                  const isPdf = url.toLowerCase().endsWith('.pdf')
                  const isImage = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url)
                  return (
                    <Box
                      key={index}
                      sx={{
                        p: 0.5,
                        border: 1,
                        borderRadius: 4,
                        borderColor: '#E0E1E3'
                      }}
                    >
                      {isImage ? (
                        <img
                          src={url}
                          alt={`Complaint file ${index}`}
                          style={{
                            width: 75,
                            height: 50,
                            color: '#e53935',
                            cursor: 'pointer'
                          }}
                          onClick={() => SingleView({ url })}
                        />
                      ) : isPdf ? (
                        <PictureAsPdfIcon
                          sx={{
                            width: 75,
                            height: 50,
                            color: '#e53935',
                            cursor: 'pointer'
                          }}
                          onClick={() => SingleView({ url })}
                        />
                      ) : (
                        <InsertDriveFileIcon
                          sx={{
                            width: 75,
                            height: 50,
                            color: '#e53935',
                            cursor: 'pointer'
                          }}
                          onClick={() => SingleView({ url })}
                        />
                      )}
                      <Box
                        sx={{
                          fontSize: 13,
                          color: '#333',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          width: 75
                        }}
                      >
                        {url.split('/').pop() || 'N/A'}
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            ) : (
              <Box
                sx={{
                  alignItems: 'center'
                }}
              >
                <InsertPhotoSharpIcon
                  sx={{
                    width: 75,
                    height: 75,
                    color: '#E3E8F0',
                    cursor: 'default'
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      ) : null}
      {item_asset_no !== undefined ? (
        <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1 }}>
          <Typography
            sx={{
              flex: 1,
              fontWeight: 600,
              color: '#394060',
              fontSize: 16,
              mb: 0.5,
              pl: 0.5
            }}
          >
            Lease Details
          </Typography>
          <Box sx={{ cursor: 'pointer', p: 0.5 }}>
            {imageShowsingleFlag === 1 ? (
              <Box>
                <FileViewSingle previewFile={uploadedFile} imageShow={imageShowSingle} CloseFile={CloseSingleFile} />
              </Box>
            ) : null}
            {leaseDocuments.length !== 0 ? (
              <Box sx={{ display: 'flex', gap: 0.8 }}>
                {leaseDocuments.map((url, index) => {
                  const isPdf = url.toLowerCase().endsWith('.pdf')
                  const isImage = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url)
                  return (
                    <Box
                      key={index}
                      sx={{
                        p: 0.5,
                        border: 1,
                        borderRadius: 4,
                        borderColor: '#E0E1E3'
                      }}
                    >
                      {isImage ? (
                        <img
                          src={url}
                          alt={`Complaint file ${index}`}
                          style={{
                            width: 75,
                            height: 50,
                            color: '#e53935',
                            cursor: 'pointer'
                          }}
                          onClick={() => SingleView({ url })}
                        />
                      ) : isPdf ? (
                        <PictureAsPdfIcon
                          sx={{
                            width: 75,
                            height: 50,
                            color: '#e53935',
                            cursor: 'pointer'
                          }}
                          onClick={() => SingleView({ url })}
                        />
                      ) : (
                        <InsertDriveFileIcon
                          sx={{
                            width: 75,
                            height: 50,
                            color: '#e53935',
                            cursor: 'pointer'
                          }}
                          onClick={() => SingleView({ url })}
                        />
                      )}
                      <Box
                        sx={{
                          fontSize: 13,
                          color: '#333',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          width: 75
                        }}
                      >
                        {url.split('/').pop() || 'N/A'}
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            ) : (
              <Box
                sx={{
                  alignItems: 'center'
                }}
              >
                <InsertPhotoSharpIcon
                  sx={{
                    width: 75,
                    height: 75,
                    color: '#E3E8F0',
                    cursor: 'default'
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      ) : null}
      <Box sx={{ flex: 1, border: 1, borderRadius: 3, borderColor: '#EBEFFB', p: 1 }}>
        <Typography
          sx={{
            flex: 1,
            fontWeight: 600,
            color: '#394060',
            fontSize: 16,
            mb: 0.5,
            pl: 0.5
          }}
        >
          Warrenty/Guarantee Details
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.8 }}>
          {imageShowsingleFlag === 1 ? (
            <Box>
              <FileViewSingle previewFile={uploadedFile} imageShow={imageShowSingle} CloseFile={CloseSingleFile} />
            </Box>
          ) : null}
          {wargarDocument.length !== 0 ? (
            <Grid container spacing={0.5}>
              {wargarDocument.map((url, index) => {
                const isPdf = url.toLowerCase().endsWith('.pdf')
                const isImage = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url)
                return (
                  <Box
                    key={index}
                    sx={{
                      p: 0.5,
                      border: 1,
                      borderRadius: 4,
                      borderColor: '#E0E1E3'
                    }}
                  >
                    {isImage ? (
                      <img
                        src={url}
                        alt={`Complaint file ${index}`}
                        style={{
                          width: 75,
                          height: 50,
                          color: '#e53935',
                          cursor: 'pointer'
                        }}
                        onClick={() => SingleView({ url })}
                      />
                    ) : isPdf ? (
                      <PictureAsPdfIcon
                        sx={{
                          width: 75,
                          height: 50,
                          color: '#e53935',
                          cursor: 'pointer'
                        }}
                        onClick={() => SingleView({ url })}
                      />
                    ) : (
                      <InsertDriveFileIcon
                        sx={{
                          width: 75,
                          height: 50,
                          color: '#e53935',
                          cursor: 'pointer'
                        }}
                        onClick={() => SingleView({ url })}
                      />
                    )}
                    <Box
                      sx={{
                        fontSize: 13,
                        color: '#333',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: 90
                      }}
                    >
                      {url.split('/').pop()}
                    </Box>
                  </Box>
                )
              })}
            </Grid>
          ) : (
            <Box
              sx={{
                alignItems: 'center'
              }}
            >
              <InsertPhotoSharpIcon
                sx={{
                  width: 75,
                  height: 75,
                  color: '#E3E8F0',
                  cursor: 'default'
                }}
              />
            </Box>
          )}
        </Box>
        <Box sx={{ flex: 1, pl: 1 }}></Box>
      </Box>
    </Box>
  )
}
export default memo(DocumentsList)
