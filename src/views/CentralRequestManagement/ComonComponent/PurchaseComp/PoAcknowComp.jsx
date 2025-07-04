import { Box, Chip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { format } from 'date-fns'
import React, { Fragment } from 'react'

const PoAcknowComp = ({ poData }) => {
  const { ack_remarks, purchase_ackuser, ack_date } = poData
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
      <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}>
          <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}>
            CRF Acknowledgement
          </Typography>
          <Box sx={{ flex: 1 }}>
            <Chip
              size="md"
              variant="outlined"
              sx={{
                color: '#2e7d32',
                height: 25,
                pb: 0.5,
                fontSize: 12,
                fontWeight: 550
              }}
            >
              Yes
            </Chip>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', mx: 0.3, p: 1 }}>
          <Typography sx={{ fontSize: 14, flex: 0.4, pt: 0.1 }}>Remarks</Typography>
          <Box sx={{ flex: 1, display: 'flex' }}>
            <Typography sx={{}}> :&nbsp;</Typography>
            <Typography sx={{ fontSize: 13, flex: 1, fontWeight: 550, pt: 0.2 }}>
              {ack_remarks === null ? 'Not Updated' : ack_remarks}
            </Typography>
            <Typography
              sx={{
                display: 'flex',
                flex: 0.3,
                justifyContent: 'flex-end',
                fontSize: 13,
                textTransform: 'capitalize',
                fontWeight: 550,
                pr: 1,
                pt: 0.2
              }}
            >
              {capitalizeWords(purchase_ackuser)}&nbsp; /
            </Typography>
            <Typography
              sx={{
                pr: 2,
                display: 'flex',
                justifyContent: 'flex-start',
                fontSize: 13,
                fontWeight: 550,
                pt: 0.2
              }}
            >
              {format(new Date(ack_date), 'dd-MM-yyyy hh:mm:ss a')}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Fragment>
  )
}

export default PoAcknowComp
