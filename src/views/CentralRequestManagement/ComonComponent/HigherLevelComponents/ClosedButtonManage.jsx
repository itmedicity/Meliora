import React, { Fragment, memo, useCallback, useState } from 'react'
import { Box } from '@mui/joy'
import { Button } from '@mui/material'
import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff'
import { PUBLIC_NAS_FOLDER, PUBLIC_NAS_FOLDER_KMC } from 'src/views/Constant/Static'
import { axioskmc, axioslogin } from 'src/views/Axios/Axios'
import { GetKMCItemDetails } from '../ComponentsKMC/GetKMCItemDetails'
import { GetItemDetailsOfCRFCmp } from '../GetItemDetailsOfCRFCmp'
import HigherClosedDetailsView from './HigherClosedDetailsView'

const ClosedButtonManage = ({ val, setPoDetails, imagearray, setImageArry, selectedCompany }) => {
  const [closeViewFlag, setCloseViewFlag] = useState(0)
  const [closeViewModal, setCloseViewModal] = useState(false)
  const [crfClosedDetails, setCrfClosedDetails] = useState([])
  const [reqItems, setReqItems] = useState([])
  const [approveTableData, setApproveTableData] = useState([])
  const { crf_close } = val
  const ModalOpenfctn = useCallback(() => {
    const { req_slno } = val
    if (selectedCompany === '1') {
      const getImage = async req_slno => {
        const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
        const { success, data } = result.data
        if (success === 1) {
          const fileNames = data
          const fileUrls = fileNames.map(fileName => {
            return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`
          })

          const savedFiles = fileUrls.map(val => {
            const parts = val.split('/')
            const fileNamePart = parts[parts.length - 1]
            const obj = {
              imageName: fileNamePart,
              url: val
            }
            return obj
          })
          setImageArry(savedFiles)
        } else {
          setImageArry([])
        }
      }
      getImage(req_slno)
      GetItemDetailsOfCRFCmp(req_slno, setReqItems, setApproveTableData, setPoDetails)
    } else if (selectedCompany === '2') {
      const getImage = async req_slno => {
        const result = await axioskmc.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
        const { success, data } = result.data
        if (success === 1) {
          const fileNames = data
          const fileUrls = fileNames.map(fileName => {
            return `${PUBLIC_NAS_FOLDER_KMC}/CRF/crf_registration/${req_slno}/${fileName}`
          })

          const savedFiles = fileUrls.map(val => {
            const parts = val.split('/')
            const fileNamePart = parts[parts.length - 1]
            const obj = {
              imageName: fileNamePart,
              url: val
            }
            return obj
          })
          setImageArry(savedFiles)
        } else {
          setImageArry([])
        }
      }
      getImage(req_slno)
      GetKMCItemDetails(req_slno, setReqItems, setApproveTableData, setPoDetails)
    }
    setCloseViewFlag(1)
    setCloseViewModal(true)
    setCrfClosedDetails(val)
  }, [val, setPoDetails, setImageArry, selectedCompany])

  const buttonstyle = {
    px: 2,
    fontSize: 12,
    height: '30px',
    minHeight: '30px',
    lineHeight: '1.2',
    color: '#01579b',
    bgcolor: 'white',
    '&:hover': {
      bgcolor: '#F0F4F8'
    },
    borderRadius: 1
  }
  const handleCloseModal = useCallback(() => {
    setCloseViewFlag(0)
    setCloseViewModal(false)
    setCrfClosedDetails([])
  }, [setCloseViewFlag, setCloseViewModal, setCrfClosedDetails])

  return (
    <Fragment>
      {closeViewFlag === 1 ? (
        <HigherClosedDetailsView
          open={closeViewModal}
          crfClosedDetails={crfClosedDetails}
          handleCloseModal={handleCloseModal}
          reqItems={reqItems}
          approveTableData={approveTableData}
          selectedCompany={selectedCompany}
          imagearray={imagearray}
        />
      ) : null}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          bgcolor: '#e3f2fd',
          borderRadius: 2,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}
      >
        <Box sx={{ p: 0.5, pl: 1, flex: 1 }}>
          <Button
            variant="contained"
            startIcon={
              <SubtitlesOffIcon
                sx={{
                  height: 19,
                  width: 19,
                  color: '#0277bd'
                }}
              />
            }
            sx={buttonstyle}
            onClick={ModalOpenfctn}
          >
            View CRF Details
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, p: 0.5, mr: 2 }}>
          {crf_close === 2 ? (
            <Button
              variant="plain"
              sx={{
                px: 1,
                height: '30px',
                minHeight: '30px',
                lineHeight: '1.2',
                bgcolor: '#0277bd',
                borderRadius: 1,
                fontSize: 13,
                pr: 1,
                textTransform: 'capitalize',
                fontWeight: 550,
                color: 'white',
                '&:hover': {
                  bgcolor: '#0277bd'
                }
              }}
            >
              {' '}
              Internally Arranged
            </Button>
          ) : null}
        </Box>
      </Box>
    </Fragment>
  )
}

export default memo(ClosedButtonManage)
