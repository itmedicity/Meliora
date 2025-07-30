import React, { memo } from 'react';
import { Box } from '@mui/joy';
import TabComponent from './Components/TabComponent';
import { TfiViewListAlt } from "react-icons/tfi";
import CardHeader from './Components/CardHeader';

const IncidentList = () => {
  return (

    <Box sx={{ width: '100%' }}>
      <CardHeader icon={TfiViewListAlt} text="Incident View" size={28} textsize={30} />
      <TabComponent />
</Box>
  )
}

export default memo(IncidentList)
