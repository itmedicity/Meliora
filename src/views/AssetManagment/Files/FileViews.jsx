import React, { memo, useCallback, useEffect, useState } from 'react'
import { Box, Modal, ModalDialog, Typography, Button, IconButton, CircularProgress } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { fetchFilesFromZipWithFolder } from 'src/api/FileViewWithFolderFn'
import { errorNotify } from 'src/views/Common/CommonCode'

const FileViews = ({ fileModalOpen, fileData, setfileOpenFlag, setfileModalOpen }) => {
  const [filePaths, setFilePaths] = useState({})
  const [flatFiles, setFlatFiles] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchCondemFiles = useCallback(async () => {
    if (!fileData) {
      setFilePaths({})
      return
    }

    try {
      setLoading(true)

      const normalizedData = Array.isArray(fileData) ? fileData : [fileData]
      const result = await fetchFilesFromZipWithFolder(
        '/AssetFileUpload/uploadFile/getCondemnation',
        normalizedData.map(row => ({
          id: row.condem_mast_slno,
          detailId: row.am_condem_detail_slno,
        })),
        setFilePaths,
        ['id', 'detailId']
      )

    } catch (error) {
      errorNotify("Error", error)
    } finally {
      setLoading(false)
    }
  }, [fileData])

  /** Auto-fetch when fileData changes */
  useEffect(() => {
    fetchCondemFiles()
  }, [fetchCondemFiles])

  /** Flatten filePaths object to array */
  useEffect(() => {
    if (filePaths && Object.keys(filePaths).length > 0) {
      const allFiles = Object.values(filePaths).flat()
      setFlatFiles(allFiles)
    } else {
      setFlatFiles([])
    }
  }, [filePaths])

  /** Close modal */
  const CloseFile = useCallback(() => {
    setfileOpenFlag(0)
    setfileModalOpen(false)
  }, [setfileOpenFlag, setfileModalOpen])

  /** Navigation handlers */
  const handlePrev = () =>
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : flatFiles.length - 1))

  const handleNext = () =>
    setCurrentIndex(prev => (prev < flatFiles.length - 1 ? prev + 1 : 0))

  const currentFile = flatFiles[currentIndex]


  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={fileModalOpen}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ModalDialog
        sx={{
          overflow: 'hidden',
          width: '80vw',
          height: '85vh',
          px: 2,
          borderRadius: 'md',
          boxShadow: 'lg',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1
          }}
        >
          <Typography level="title-md" fontWeight={600}>
            File Attachments
          </Typography>
          <IconButton
            onClick={CloseFile}
            sx={{
              color: '#555',
              backgroundColor: '#ffffff',
              border: '1px solid #ccc',
              boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: '#f0f0f0',
                color: '#000'
              },
              p: 1
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>


        {/* Viewer Area */}
        <Box
          sx={{
            flexGrow: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ccc',
            borderRadius: 'sm',
            overflow: 'hidden'
          }}
        >
          {/* ✅ Loading Spinner */}
          {loading ? (
            <CircularProgress size="lg" color="neutral" thickness={4} />
          ) : (
            <>
              {flatFiles.length > 1 && (
                <IconButton
                  variant="soft"
                  color="neutral"
                  onClick={handlePrev}
                  sx={{
                    position: 'absolute',
                    left: 10,
                    zIndex: 10,
                    bgcolor: 'white',
                    '&:hover': { bgcolor: '#f0f0f0' }
                  }}
                >
                  <ChevronLeft />
                </IconButton>
              )}

              {/* File Display */}
              {currentFile ? (
                currentFile.type === 'application/pdf' ? (
                  <embed
                    src={currentFile.url}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    style={{ borderRadius: 8 }}
                  />
                ) : (
                  <img
                    src={currentFile.url}
                    alt={currentFile.imageName}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      borderRadius: 8,
                      objectFit: 'contain'
                    }}
                  />
                )
              ) : (
                <Typography>No attachments found</Typography>
              )}

              {flatFiles.length > 1 && (
                <IconButton
                  variant="soft"
                  color="neutral"
                  onClick={handleNext}
                  sx={{
                    position: 'absolute',
                    right: 10,
                    zIndex: 10,
                    bgcolor: 'white',
                    '&:hover': { bgcolor: '#f0f0f0' }
                  }}
                >
                  <ChevronRight />
                </IconButton>
              )}
            </>
          )}
        </Box>

        <Box sx={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, }}>
          <Typography>
            Attachments ({flatFiles.length > 0 ? currentIndex + 1 : 0}/{flatFiles.length})
          </Typography>
          <Button variant="outlined" color="neutral" onClick={CloseFile}>
            Close
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  )
}

export default memo(FileViews)
