import React, { Fragment, memo, useCallback } from 'react'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { Box, Textarea, Typography } from '@mui/joy'
import { Paper } from '@mui/material'

const InchargeApprvalCmp = ({ heading, apprvlDetails, updateOnchangeState, updateApprovalState }) => {
  const { reject, pending, remark, detailAnalis } = apprvlDetails
  const remarkBox = useCallback(() => {
    if (reject) {
      return 'Detail Justification for Reject'
    } else if (pending) {
      return 'Detail Justification for On-Hold'
    }
    return 'Detail Justification/ Requirement Description'
  }, [reject, pending])
  return (
    <Fragment>
      <Paper variant="outlined" sx={{ flexWrap: 'wrap', my: 0.5, pb: 1, mx: 0.3 }}>
        <Typography sx={{ fontWeight: 'bold', m: 1, color: '#145DA0', fontSize: 14 }}>{heading}</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 550, pl: 1 }}>{remarkBox()}</Typography>
        <Box sx={{ flex: 1, m: 0.5, px: 0.5 }}>
          <Textarea
            required
            placeholder={reject ? 'Reject Remark' : pending ? 'On-Hold Remarks' : 'Remarks'}
            value={remark}
            autoComplete="off"
            name="remark"
            minRows={2}
            maxRows={3}
            onChange={updateOnchangeState}
            sx={{ fontSize: 14, borderRadius: 7 }}
          />
        </Box>
        {!reject && !pending && (
          <>
            <Typography sx={{ fontSize: 14, fontWeight: 550, pl: 1 }}>Detailed Analysis of Requirement</Typography>
            <Box sx={{ flex: 1, m: 0.5, px: 0.5 }}>
              <Textarea
                required
                placeholder="Detail Analysis"
                value={detailAnalis}
                autoComplete="off"
                name="detailAnalis"
                minRows={2}
                maxRows={3}
                onChange={updateOnchangeState}
                sx={{ fontSize: 14, borderRadius: 7 }}
              />
            </Box>
          </>
        )}
        <Box sx={{ display: 'flex', flex: 1, pl: 10 }}>
          {['approve', 'reject', 'pending'].map(type => (
            <Box key={type} sx={{ m: 1 }}>
              <CusCheckBox
                label={type.charAt(0).toUpperCase() + type.slice(1)}
                color="primary"
                size="md"
                name={type}
                checked={apprvlDetails[type]}
                onCheked={() => updateApprovalState(type)}
              />
            </Box>
          ))}
        </Box>
      </Paper>
    </Fragment>
  )
}

export default memo(InchargeApprvalCmp)
