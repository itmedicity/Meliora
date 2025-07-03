import React, { Fragment, memo, useCallback, useState } from 'react'
import { axioskmc } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import { PUBLIC_NAS_FOLDER_KMC } from 'src/views/Constant/Static'
import ImageDisplayModal from '../ImageUploadCmp/ImageDisplayModal'
import { Paper } from '@mui/material'
import { Box, Chip, Typography } from '@mui/joy'
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone'
import CustomToolTipForCRF from '../Components/CustomToolTipForCRF'
import { format } from 'date-fns'

const CommonMangingApprvComp = ({ DetailViewData, company }) => {
  const {
    req_slno,
    managing_director_approve,
    managing_director_remarks,
    managing_director_analysis,
    managing_director_approve_date,
    managing_director_user,
    managing_director_image,
    managing,
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
  const ViewManageUploadImage = useCallback(() => {
    const getImage = async req_slno => {
      const result = await axioskmc.get(`/newCRFRegisterImages/crfManageImageGet/${req_slno}`)
      const { success, data } = result.data
      if (success === 1) {
        const fileNames = data
        const fileUrls = fileNames.map(fileName => {
          return `${PUBLIC_NAS_FOLDER_KMC}/CRF/crf_registration/${req_slno}/ManageUpload/${fileName}`
        })
        setImageArry(fileUrls)
        setImageShowFlag(1)
        setImageShow(true)
      } else {
        warningNotify('Error Occured to display image')
        setImageShowFlag(0)
        setImageShow(false)
        setImageArry([])
      }
    }
    getImage(req_slno)
  }, [req_slno])

  return (
    <Fragment>
      {imageshowFlag === 1 ? (
        <ImageDisplayModal open={imageshow} handleClose={handleClose} images={imagearray} />
      ) : null}
      <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}>
          <Typography
            sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}
          >
            {company?.managing_director_name}
          </Typography>
          <Box sx={{ flex: 1, py: 0.4, ml: 2 }}>
            <Chip
              size="md"
              variant="outlined"
              sx={{
                color:
                  managing_director_approve === 1
                    ? '#2e7d32'
                    : managing_director_approve === 2
                    ? '#bf360c'
                    : managing_director_approve === 3
                    ? '#FF9800'
                    : managing_director_approve === 4
                    ? '#009688'
                    : '#607D8B',
                height: 25,
                pb: 0.5,
                fontSize: 12,
                fontWeight: 550,
              }}
            >
              {managing}
            </Chip>
          </Box>
        </Box>
        <Box sx={{ pt: 0.1 }}>
          {managing_director_approve === 1 && managing_director_remarks !== null ? (
            <Box sx={{ pt: 0.5 }}>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                  Justification/ Requirement Description{' '}
                </Typography>
                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                <Typography
                  sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}
                >
                  {managing_director_remarks === null ? 'Not Updated' : managing_director_remarks}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', pt: 1 }}>
                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                  Detailed Analysis of Requirement
                </Typography>
                <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                <Typography
                  sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}
                >
                  {managing_director_analysis === null ? 'Not Updated' : managing_director_analysis}
                </Typography>
              </Box>
            </Box>
          ) : managing_director_approve === 2 && managing_director_remarks !== null ? (
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                Justification for Reject{' '}
              </Typography>
              <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
              <Typography
                sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}
              >
                {managing_director_remarks === null ? 'Not Updated' : managing_director_remarks}
              </Typography>
            </Box>
          ) : managing_director_approve === 3 && managing_director_remarks !== null ? (
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>
                Justification for On-Hold
              </Typography>
              <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
              <Typography
                sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}
              >
                : &nbsp;{' '}
                {managing_director_remarks === null ? 'Not Updated' : managing_director_remarks}
              </Typography>
            </Box>
          ) : managing_director_approve === 4 && managing_director_remarks !== null ? (
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Remarks</Typography>
              <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
              <Typography
                sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}
              >
                {managing_director_remarks === null ? 'Not Updated' : managing_director_remarks}{' '}
              </Typography>
            </Box>
          ) : null}
          {managing_director_approve_date !== null ? (
            <Box sx={{ display: 'flex', py: 1 }}>
              {managing_director_approve === 1 || managing_director_approve === 4 ? (
                <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>Approved by </Typography>
              ) : managing_director_approve === 2 ? (
                <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>Rejected by </Typography>
              ) : managing_director_approve === 3 ? (
                <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>On-Hold by </Typography>
              ) : null}
              <Box sx={{ display: 'flex', flex: 1 }}>
                <Typography> :&nbsp;</Typography>
                <Typography
                  sx={{ height: 'auto', fontSize: 13, fontWeight: 550, pt: 0.3, pl: 0.2 }}
                >
                  {capitalizeWords(managing_director_user)}
                </Typography>
                <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, pl: 2, pt: 0.3 }}>
                  {format(new Date(managing_director_approve_date), 'dd-MM-yyyy hh:mm:ss a')}
                </Typography>
                {managing_director_image === 1 ? (
                  <Box sx={{ display: 'flex', pl: 2 }}>
                    <CustomToolTipForCRF title="File View" placement="top">
                      <AttachmentTwoToneIcon
                        fontSize="small"
                        sx={{ cursor: 'pointer', color: '#0277bd', width: 35, height: 25 }}
                        onClick={ViewManageUploadImage}
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

export default memo(CommonMangingApprvComp)
