import { Box, Chip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { format } from 'date-fns'
import React, { Fragment, memo } from 'react'

const CommonCRFClosed = ({ closedData }) => {
  const { crf_close_remark, closed_user, close_date, crf_close } = closedData
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
      <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap', height: 135 }}>
        <Box sx={{ display: 'flex', py: 0.2, borderBottom: '1px solid lightgrey' }}>
          <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}>
            {/* {crf_closed_one === 'MD' ? 'Medical Director' : crf_closed_one === 'ED' ? 'Executive Director' : crf_closed_one} */}
            CRF Closed Details
          </Typography>
          <Box sx={{ flex: 1, pl: 2 }}>
            <Chip
              size="md"
              variant="outlined"
              sx={{
                color: crf_close === 1 ? '#d50000' : '#ff3d00',
                height: 25,
                fontSize: 12,
                fontWeight: 550,
                px: 2
              }}
            >
              {/* {crf_close === 1 ? " CRF Closed" : "Interanally Arranged"} */}
              Closed
            </Chip>
          </Box>
        </Box>
        <Box sx={{ pt: 0.5 }}>
          <Box sx={{ display: 'flex', pt: 0.5 }}>
            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Remarks </Typography>
            <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
            <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
              {crf_close_remark}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', pt: 0.5 }}>
            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Closed By </Typography>
            <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
            <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
              {capitalizeWords(closed_user)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', pt: 0.5 }}>
            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Closed Date </Typography>
            <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
            <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
              {format(new Date(close_date), 'dd-MM-yyyy hh:mm:ss a')}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Fragment>
  )
}

export default memo(CommonCRFClosed)
