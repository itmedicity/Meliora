import { Box, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback } from 'react'
import CustomInputDateCmp from 'src/views/CentralRequestManagement/ComonComponent/Components/CustomInputDateCmp'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'

const CommonName = ({ setCrfName, crfName }) => {
  const {
    Hod_approval,
    Incharge_approval,
    DMS_approval,
    MS_approval,
    MO_approval,
    SMO_approval,
    GMO_approval,
    MD_approval,
    ED_approval,
    Managing_Director_approval
  } = crfName

  const updateOnchangeState = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setCrfName({ ...crfName, [e.target.name]: value })
    },
    [crfName, setCrfName]
  )

  return (
    <Box sx={{ mt: 2 }}>
      <Paper variant="outlined" sx={{ width: '100%', pl: 0.5, bgcolor: '#f0f3f5' }}>
        <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>
          Default Name Master
        </Typography>
      </Paper>

      <Box sx={{ mt: 1 }}>
        <Box sx={{}}>
          <CustomPaperTitle heading="Incharge Name" />
        </Box>
        <CustomInputDateCmp
          className={{ width: '100%', height: 35, bgcolor: 'white' }}
          size={'sm'}
          type="text"
          autoComplete={'off'}
          name={'Incharge_approval'}
          placeholder={'Incharge Name'}
          value={Incharge_approval}
          handleChange={updateOnchangeState}
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Box sx={{}}>
          <CustomPaperTitle heading="Hod Name" />
        </Box>
        <CustomInputDateCmp
          className={{ width: '100%', height: 35, bgcolor: 'white' }}
          size={'sm'}
          type="text"
          autoComplete={'off'}
          name={'Hod_approval'}
          placeholder={'Hod Name'}
          value={Hod_approval}
          handleChange={updateOnchangeState}
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Box sx={{}}>
          <CustomPaperTitle heading="DMS Name" />
        </Box>
        <CustomInputDateCmp
          className={{ width: '100%', height: 35, bgcolor: 'white' }}
          size={'sm'}
          type="text"
          autoComplete={'off'}
          name={'DMS_approval'}
          placeholder={'DMS Name'}
          value={DMS_approval}
          handleChange={updateOnchangeState}
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Box sx={{}}>
          <CustomPaperTitle heading="MS Name" />
        </Box>
        <CustomInputDateCmp
          className={{ width: '100%', height: 35, bgcolor: 'white' }}
          size={'sm'}
          type="text"
          autoComplete={'off'}
          name={'MS_approval'}
          placeholder={'MS Name'}
          value={MS_approval}
          handleChange={updateOnchangeState}
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Box sx={{}}>
          <CustomPaperTitle heading="MO Name" />
        </Box>
        <CustomInputDateCmp
          className={{ width: '100%', height: 35, bgcolor: 'white' }}
          size={'sm'}
          type="text"
          autoComplete={'off'}
          name={'MO_approval'}
          placeholder={'MO Name'}
          value={MO_approval}
          handleChange={updateOnchangeState}
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Box sx={{}}>
          <CustomPaperTitle heading="SMO Name" />
        </Box>
        <CustomInputDateCmp
          className={{ width: '100%', height: 35, bgcolor: 'white' }}
          size={'sm'}
          type="text"
          autoComplete={'off'}
          name={'SMO_approval'}
          placeholder={'SMO Name'}
          value={SMO_approval}
          handleChange={updateOnchangeState}
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Box sx={{}}>
          <CustomPaperTitle heading="GMO Name" />
        </Box>
        <CustomInputDateCmp
          className={{ width: '100%', height: 35, bgcolor: 'white' }}
          size={'sm'}
          type="text"
          autoComplete={'off'}
          name={'GMO_approval'}
          placeholder={'GMO Name'}
          value={GMO_approval}
          handleChange={updateOnchangeState}
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Box sx={{}}>
          <CustomPaperTitle heading="MD Name" />
        </Box>
        <CustomInputDateCmp
          className={{ width: '100%', height: 35, bgcolor: 'white' }}
          size={'sm'}
          type="text"
          autoComplete={'off'}
          name={'MD_approval'}
          placeholder={'MD Name'}
          value={MD_approval}
          handleChange={updateOnchangeState}
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Box sx={{}}>
          <CustomPaperTitle heading="ED Name" />
        </Box>
        <CustomInputDateCmp
          className={{ width: '100%', height: 35, bgcolor: 'white' }}
          size={'sm'}
          type="text"
          autoComplete={'off'}
          name={'ED_approval'}
          placeholder={'ED Name'}
          value={ED_approval}
          handleChange={updateOnchangeState}
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Box sx={{}}>
          <CustomPaperTitle heading="Managing Director Name" />
        </Box>
        <CustomInputDateCmp
          className={{ width: '100%', height: 35, bgcolor: 'white' }}
          size={'sm'}
          type="text"
          autoComplete={'off'}
          name={'Managing_Director_approval'}
          placeholder={'Managing Director Name'}
          value={Managing_Director_approval}
          handleChange={updateOnchangeState}
        />
      </Box>
    </Box>
  )
}

export default memo(CommonName)
