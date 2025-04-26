import React, { useState, useEffect, useRef, memo } from 'react';
import { Box, Input, Typography } from '@mui/joy';

const TimeInputDecor = ({ onChange, label, value = 0, maxLimit = Infinity }) => {
  const [week, setWeek] = useState(0);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const initialized = useRef(false);

  const handleInput = (setter) => (e) => {
    const val = parseInt(e.target.value, 10) || 0;
    setter(val);
  };

  const totalMinutes = week * 10080 + day * 1440 + hour * 60 + minute;
  const isOverLimit = totalMinutes >= maxLimit;

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }

    if (!isOverLimit) {
      onChange?.(totalMinutes);
    }
  }, [week, day, hour, minute]);

  useEffect(() => {
    if (!initialized.current || value === 0) return;
    const newWeek = Math.floor(value / 10080);
    const remainingAfterWeek = value % 10080;
    const newDay = Math.floor(remainingAfterWeek / 1440);
    const remainingAfterDay = remainingAfterWeek % 1440;
    const newHour = Math.floor(remainingAfterDay / 60);
    const newMinute = remainingAfterDay % 60;

    if (
      newWeek !== week ||
      newDay !== day ||
      newHour !== hour ||
      newMinute !== minute
    ) {
      setWeek(newWeek);
      setDay(newDay);
      setHour(newHour);
      setMinute(newMinute);
    }
  }, [value]);

  return (
    <Box sx={{ border: '1px solid #ccc', borderRadius: 'md', p: 1 }}>
      {label && (
        <Typography level="title-sm" sx={{ mb: 0.5, ml: 1 }}>
          {label}
        </Typography>
      )}
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flex: 1, pl: 0.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Input
            type="number"
            size="sm"
            sx={{ width: 150 }}
            value={week}
            variant="outlined"
            onChange={handleInput(setWeek)}
            endDecorator="Weeks"
            disabled={isOverLimit}
          />
          <Input
            type="number"
            size="sm"
            sx={{ width: 150 }}
            value={day}
            variant="outlined"
            onChange={handleInput(setDay)}
            endDecorator="Days"
            disabled={isOverLimit}
          />
          <Input
            type="number"
            size="sm"
            sx={{ width: 150 }}
            value={hour}
            variant="outlined"
            onChange={handleInput(setHour)}
            endDecorator="Hours"
            disabled={isOverLimit}
          />
          <Input
            type="number"
            size="sm"
            sx={{ width: 150 }}
            value={minute}
            variant="outlined"
            onChange={handleInput(setMinute)}
            endDecorator="Minutes"
            disabled={isOverLimit}
          />
        </Box>
      </Box>
      {isOverLimit && (
        <Typography level="body-sm" color="danger" sx={{ mt: 1, ml: 1 }}>
          Total time must be less than the escalation max time.
        </Typography>
      )}
    </Box>
  );
};

export default memo(TimeInputDecor)


// import React, { useState, useEffect, useRef } from 'react';
// import { Box, Input, Typography } from '@mui/joy';

// const TimeInputDecor = ({ onChange, label, value = 0 }) => {

//   const [week, setWeek] = useState(0);
//   const [day, setDay] = useState(0);
//   const [hour, setHour] = useState(0);
//   const [minute, setMinute] = useState(0);
//   const initialized = useRef(false);

//   const handleInput = (setter) => (e) => {
//     const val = parseInt(e.target.value, 10) || 0;
//     setter(val);
//   };

//   useEffect(() => {
//     if (!initialized.current) {
//       initialized.current = true;
//       return;
//     }

//     const totalMinutes = week * 10080 + day * 1440 + hour * 60 + minute;
//     onChange?.(totalMinutes);
//   }, [week, day, hour, minute]);
  
//   useEffect(() => {
//     if (!initialized.current || value === 0) return;
//     const newWeek = Math.floor(value / 10080);
//     const remainingAfterWeek = value % 10080;
//     const newDay = Math.floor(remainingAfterWeek / 1440);
//     const remainingAfterDay = remainingAfterWeek % 1440;
//     const newHour = Math.floor(remainingAfterDay / 60);
//     const newMinute = remainingAfterDay % 60;

//     if (
//       newWeek !== week ||
//       newDay !== day ||
//       newHour !== hour ||
//       newMinute !== minute
//     ) {
//       setWeek(newWeek);
//       setDay(newDay);
//       setHour(newHour);
//       setMinute(newMinute);
//     }
//   }, [value]);

//   return (
//     <Box sx={{ border: '1px solid #ccc', borderRadius: 'md', p: 1 }}>
//       {label && (
//         <Typography level="title-sm" sx={{ mb: 0.5, ml: 1 }}>
//           {label}
//         </Typography>
//       )}
//       <Box sx={{ display: 'flex' }}>
//         <Box sx={{ flex: 1, pl: 0.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
//           <Input
//             type="number"
//             size="sm"
//             sx={{ width: 150 }}
//             value={week}
//             variant="outlined"
//             onChange={handleInput(setWeek)}
//             endDecorator="Week"
//           />
//           <Input
//             type="number"
//             size="sm"
//             sx={{ width: 150 }}
//             value={day}
//             variant="outlined"
//             onChange={handleInput(setDay)}
//             endDecorator="Day"
//           />
//           <Input
//             type="number"
//             size="sm"
//             sx={{ width: 150 }}
//             value={hour}
//             variant="outlined"
//             onChange={handleInput(setHour)}
//             endDecorator="Hour"
//           />
//           <Input
//             type="number"
//             size="sm"
//             sx={{ width: 150 }}
//             value={minute}
//             variant="outlined"
//             onChange={handleInput(setMinute)}
//             endDecorator="Minute"
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default TimeInputDecor;




