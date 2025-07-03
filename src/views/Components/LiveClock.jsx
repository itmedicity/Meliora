import React, { memo, useEffect, useState } from 'react';
import { Typography,Box } from '@mui/material';

const LiveClock = () => {
   const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString(); // e.g., 11:38:12 AM
  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: 'short', // e.g., Mon
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }); // e.g., Jul 3, 2025

  return (
    <Box sx={{ display: 'flex', textAlign: 'right',flexDirection:'row',gap:1 }}>
      <Typography sx={{ fontWeight: 600,fontSize:12,fontFamily: 'var(--roboto-font)'  }}>{formattedDate}</Typography>
      <Typography sx={{ fontWeight: 600,fontSize:12,fontFamily: 'var(--roboto-font)'  }}>
        {formattedTime}
      </Typography>
    </Box>
  );
}

export default memo(LiveClock) 