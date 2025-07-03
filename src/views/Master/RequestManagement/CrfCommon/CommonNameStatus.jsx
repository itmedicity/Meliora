import { Box, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback } from 'react'
import CustomInputDateCmp from 'src/views/CentralRequestManagement/ComonComponent/Components/CustomInputDateCmp'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'

const CommonNameStatus = ({ setCrfName, crfName }) => {
  const {
    hod_name,
    incharge_name,
    dms_name,
    ms_name,
    mo_name,
    smo_name,
    gmo_name,
    md_name,
    ed_name,
    managing_director_name,
  } = crfName
  const updateOnchangeState = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setCrfName({ ...crfName, [e.target.name]: value })
    },
    [crfName, setCrfName]
  )
  return (
    <Box sx={{}}>
      <Paper variant="outlined" sx={{ width: '100%', pl: 0.5, bgcolor: '#f0f3f5' }}>
        <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>
          Status Name Master
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
          name={'incharge_name'}
          placeholder={'Incharge Name'}
          value={incharge_name}
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
          name={'hod_name'}
          placeholder={'Hod Name'}
          value={hod_name}
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
          name={'dms_name'}
          placeholder={'DMS Name'}
          value={dms_name}
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
          name={'ms_name'}
          placeholder={'MS Name'}
          value={ms_name}
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
          name={'mo_name'}
          placeholder={'MO Name'}
          value={mo_name}
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
          name={'smo_name'}
          placeholder={'SMO Name'}
          value={smo_name}
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
          name={'gmo_name'}
          placeholder={'GMO Name'}
          value={gmo_name}
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
          name={'md_name'}
          placeholder={'MD Name'}
          value={md_name}
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
          name={'ed_name'}
          placeholder={'ED Name'}
          value={ed_name}
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
          name={'managing_director_name'}
          placeholder={'Managing Director Name'}
          value={managing_director_name}
          handleChange={updateOnchangeState}
        />
      </Box>
    </Box>
  )
}

export default memo(CommonNameStatus)
