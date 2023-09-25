import { Box } from '@mui/joy'
import { Paper } from '@mui/material';
import React, { memo } from 'react'
import { innerHeight } from 'src/views/Constant/Constant';
import DashBordTile from '../Components/DashBordTile';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { taskColor } from '../Styles/taskColor';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import FormatOverlineIcon from '@mui/icons-material/FormatOverline';
import DoNotDisturbOnTotalSilenceIcon from '@mui/icons-material/DoNotDisturbOnTotalSilence';
import MyTaskTable from './MyTaskTable';

const TaskHomePage = () => {

  const data = [
    { taskName: 'Completed task', count: 10, icon: <AccountTreeIcon /> },
    { taskName: 'Incomplete task', count: 121, icon: <AlignHorizontalLeftIcon /> },
    { taskName: 'Overdue task', count: 18, icon: <FormatOverlineIcon /> },
    { taskName: 'Total task', count: 215, icon: <DoNotDisturbOnTotalSilenceIcon /> }
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: `${innerHeight - 80}px`,
        borderRadius: 2,
        overflow: 'hidden',
        flexDirection: 'column',
        border: 1,
        borderWidth: 1.5,
        borderColor: taskColor.bgIndigo,
      }} >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#ffffff',
          maxHeight: 40,
          alignItems: 'center',
          // borderLeftWidth: 0,
          // borderRightWidth: 0,
          borderBottom: 1,
          borderColor: '#b5b3ca',
          pl: 2
        }}
      >
        <DashboardOutlinedIcon fontSize='medium' sx={{ color: '#262065' }} />
        <Box sx={{ pl: 1, color: '#262065', display: 'flex', pt: 0.3 }} >My Dashboard</Box>
      </Box>
      <Box sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: 1,
        backgroundColor: '#ffffff',
        overflow: 'hidden'
      }} >
        <Box
          sx={{ display: 'flex', paddingX: 3, paddingTop: 1 }}
          gap={1}
        >
          {
            data?.map((e, idx) => (
              <DashBordTile
                key={idx}
                taskName={e.taskName}
                count={e.count}
                Icons={e.icon}
              />
            ))
          }

        </Box>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
          }}
        >
          <MyTaskTable />
        </Box>
      </Box>
    </Box>
  )
}

export default memo(TaskHomePage) 
