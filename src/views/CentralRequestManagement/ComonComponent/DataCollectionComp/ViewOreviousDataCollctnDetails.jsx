import { Box, Grid, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { format } from 'date-fns'
import React, { Fragment, memo, useCallback, useState } from 'react'
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone'
import DataCollectnImageDis from './DataCollectnImageDis'
import { infoNotify } from 'src/views/Common/CommonCode'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import { axioslogin } from 'src/views/Axios/Axios'

const ViewOreviousDataCollctnDetails = ({ datacolData }) => {
  const [collImageShowFlag, setCollImageShowFlag] = useState(0)
  const [collImageShow, setCollImageShow] = useState(false)
  const [imagearray, setImageArray] = useState([])

  const ViewImageDataColection = useCallback((dataClno, req_slno) => {
    setCollImageShowFlag(1)
    setCollImageShow(true)
    const postdata = {
      req_slno: req_slno,
      crf_data_collect_slno: dataClno,
    }
    const getImage = async postdata => {
      try {
        const result = await axioslogin.post(
          '/newCRFRegisterImages/crf/getDataCollectionImage',
          postdata
        )
        const { success, data } = result.data

        if (success === 1) {
          const fileNames = data
          const fileUrls = fileNames.map(fileName => {
            return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/datacollection/${dataClno}/${fileName}`
          })
          setImageArray(fileUrls)
        } else {
          infoNotify('No Files Found')
          setImageArray([])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        infoNotify('An error occurred while fetching the files.')
        setImageArray([])
      }
    }
    getImage(postdata)
  }, [])

  const handleCloseCollect = useCallback(() => {
    setCollImageShow(false)
    setCollImageShowFlag(1)
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
  return (
    <Fragment>
      {collImageShowFlag === 1 ? (
        <DataCollectnImageDis
          open={collImageShow}
          handleCloseCollect={handleCloseCollect}
          imagearray={imagearray}
        />
      ) : null}
      <Paper variant="outlined" sx={{ mx: 0.5 }}>
        <Box sx={{ display: 'flex', borderBottom: '1px solid lightgrey' }}>
          <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14 }}>
            Data Collection Details
          </Typography>
        </Box>
        <Grid container spacing={0.5} sx={{ flexGrow: 1, p: 0.5 }}>
          {datacolData?.map((val, index) => (
            <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }} key={index}>
              <Paper variant="outlined">
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ fontSize: 14, flex: 0.4, pl: 1, pt: 0.5 }}>
                    Requested To
                  </Typography>
                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                  <Typography
                    sx={{
                      height: 'auto',
                      fontSize: 13,
                      fontWeight: 550,
                      flex: 1,
                      pr: 0.5,
                      pt: 0.3,
                    }}
                  >
                    {capitalizeWords(val.data_entered)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', pt: 0.5 }}>
                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Requested by</Typography>
                  <Box sx={{ display: 'flex', flex: 1 }}>
                    <Typography> :&nbsp;</Typography>
                    <Typography
                      sx={{ height: 'auto', fontSize: 13, fontWeight: 550, pt: 0.3, pl: 0.2 }}
                    >
                      {capitalizeWords(val.req_user)}
                    </Typography>
                    <Typography
                      sx={{ height: 'auto', fontSize: 13, fontWeight: 550, pl: 3, pt: 0.3 }}
                    >
                      {format(new Date(val.create_date), 'dd-MM-yyyy hh:mm:ss a')}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', pt: 0.5 }}>
                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Requested Remarks</Typography>
                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                  <Typography
                    sx={{
                      height: 'auto',
                      fontSize: 13,
                      fontWeight: 550,
                      flex: 1,
                      pr: 0.5,
                      pt: 0.3,
                    }}
                  >
                    {val.crf_req_remark}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', pt: 0.5 }}>
                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Reply Remarks</Typography>
                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                  <Typography
                    sx={{
                      height: 'auto',
                      fontSize: 13,
                      fontWeight: 550,
                      flex: 1,
                      pr: 0.5,
                      pt: 0.3,
                    }}
                  >
                    {val.crf_dept_remarks}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', pt: 0.5 }}>
                  <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Replied by</Typography>
                  <Box sx={{ display: 'flex', flex: 1 }}>
                    <Typography> :&nbsp;</Typography>
                    <Typography
                      sx={{ height: 'auto', fontSize: 13, fontWeight: 550, pt: 0.3, pl: 0.2 }}
                    >
                      {capitalizeWords(val.datagive_user)}
                    </Typography>
                    <Typography
                      sx={{ height: 'auto', fontSize: 13, fontWeight: 550, pl: 3, pt: 0.3 }}
                    >
                      {format(new Date(val.update_date), 'dd-MM-yyyy hh:mm:ss a')}
                    </Typography>
                    {val.data_coll_image_status === 1 ? (
                      <Box sx={{ display: 'flex', pl: 2 }}>
                        <Tooltip
                          title="File View"
                          placement="bottom"
                          sx={{ bgcolor: '#D4F1F4', color: 'darkblue' }}
                        >
                          <AttachmentTwoToneIcon
                            fontSize="small"
                            sx={{ cursor: 'pointer', color: '#0277bd', width: 35, height: 25 }}
                            onClick={() =>
                              ViewImageDataColection(val.crf_data_collect_slno, val.req_slno)
                            }
                          ></AttachmentTwoToneIcon>
                        </Tooltip>
                      </Box>
                    ) : null}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Fragment>
  )
}

export default memo(ViewOreviousDataCollctnDetails)
