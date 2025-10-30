import { Box, Chip, Typography } from '@mui/joy'
import { format } from 'date-fns'
import React, { Fragment, memo } from 'react'
const QuotationCallComp = ({ poData }) => {
  const { quatation_calling_remarks, quatation_user, quatation_calling_date } = poData
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
      <Box variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}>
          <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}>
            Quotation Process Started
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
            <Typography sx={{ fontSize: 12, flex: 1, fontWeight: 550, pt: 0.2 }}>
              {quatation_calling_remarks === null ? 'Not Updated' : quatation_calling_remarks}
            </Typography>
            <Typography
              sx={{
                display: 'flex',
                flex: 0.3,
                justifyContent: 'flex-end',
                fontSize: 12,
                textTransform: 'capitalize',
                fontWeight: 550,
                pr: 1,
                pt: 0.2
              }}
            >
              {capitalizeWords(quatation_user)}&nbsp; /
            </Typography>
            <Typography
              sx={{
                pr: 2,
                display: 'flex',
                justifyContent: 'flex-start',
                fontSize: 12,
                fontWeight: 550,
                pt: 0.2
              }}
            >
              {format(new Date(quatation_calling_date), 'dd-MM-yyyy hh:mm:ss a')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}

export default memo(QuotationCallComp)
