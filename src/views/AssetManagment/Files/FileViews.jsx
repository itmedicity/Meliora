import React, { memo, useCallback, useEffect, useState } from 'react'
import { Box, Modal, ModalDialog, Typography, Tooltip, Button, IconButton } from '@mui/joy'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { fetchFilesFromZipWithFolder } from 'src/api/FileViewWithFolderFn'

const FileViews = ({ fileModalOpen, fileData, setfileOpenFlag, setfileModalOpen }) => {

  const [filePaths, setFilePaths] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)


  const fetchCondemFiles = useCallback(async () => {
    if (!fileData?.length) {
      setFilePaths({});
      return;
    }

    await fetchFilesFromZipWithFolder(
      '/AssetFileUpload/uploadFile/getCondemnation',
      fileData.map((row) => ({
        id: row.condem_mast_slno,
        detailId: row.am_condem_detail_slno,
      })),
      setFilePaths,
      ['id', 'detailId']
    );
  }, [fileData]);

  useEffect(() => {
    fetchCondemFiles();
  }, [fetchCondemFiles]);


  /** Close modal */
  const CloseFile = useCallback(() => {
    setfileOpenFlag(0)
    setfileModalOpen(false)
  }, [setfileOpenFlag, setfileModalOpen])

  /** Navigation */
  const handlePrev = () =>
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : filePaths.length - 1))

  const handleNext = () =>
    setCurrentIndex(prev => (prev < filePaths.length - 1 ? prev + 1 : 0))

  const currentFile = filePaths[currentIndex]

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
          width: '70vw',
          height: '80vh',
          p: 2,
          borderRadius: 'md',
          boxShadow: 'lg',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography level="h5" fontWeight={600}>
            Attachments ({filePaths.length > 0 ? currentIndex + 1 : 0}/{filePaths.length})
          </Typography>
          <Tooltip title="Close">
            <HighlightOffSharpIcon
              sx={{
                cursor: 'pointer',
                color: 'grey',
                '&:hover': { color: 'black' }
              }}
              onClick={CloseFile}
            />
          </Tooltip>
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
          {filePaths.length > 1 && (
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
                alt={currentFile.name}
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

          {filePaths.length > 1 && (
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
        </Box>

        {/* Footer */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="outlined" color="neutral" onClick={CloseFile}>
            Close
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  )
}

export default memo(FileViews)
