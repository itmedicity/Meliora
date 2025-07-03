import React, { Fragment, memo } from 'react'
import { Box, Typography } from '@mui/material'
import CustomTextarea from 'src/views/Components/CustomTextarea'
import CusCheckBox from 'src/views/Components/CusCheckBox'
const HallApprovalcmpnt = ({
  heading,
  approve,
  reject,
  updateApprove,
  updateReject,
  remark,
  updateRemark,
}) => {
  return (
    <Fragment>
      <Box sx={{ width: '100%', pb: 2 }}>
        <Box sx={{ pt: 0 }}>
          <Typography variant="h8">{heading} </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            // p: 1,
            width: '100%',
          }}
        >
          <CustomTextarea
            required
            type="text"
            size="sm"
            style={{
              width: '100%',
              height: 70,
              boardColor: '#E0E0E0',
            }}
            placeholder=" Remarks"
            value={remark}
            onchange={updateRemark}
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '20%', pr: 1, mt: 1 }}>
            <CusCheckBox
              label="Approve"
              color="primary"
              size="md"
              name="approve"
              value={approve}
              checked={approve}
              onCheked={updateApprove}
            />
          </Box>
          <Box sx={{ width: '20%', mt: 1 }}>
            <CusCheckBox
              label="Reject"
              color="primary"
              size="md"
              name="reject"
              value={reject}
              checked={reject}
              onCheked={updateReject}
            />
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}

export default memo(HallApprovalcmpnt)
