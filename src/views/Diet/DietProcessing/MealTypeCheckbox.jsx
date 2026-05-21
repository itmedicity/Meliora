import React, { memo } from 'react';
import { Box, Checkbox, Typography } from '@mui/joy';

const MealTypeCheckbox = ({
  item,
  // selectedDiets,
  selectedDietTimes,
  handleTimeToggle,
}) => {
  const isChecked = selectedDietTimes[item.dietId]?.includes(item.type_id)

  return (
    <Box
      key={`$-${item.type_id}`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        flex: '0 0 calc(50% - 8px)',
        mb: 0.5,
      }}
    >
      <Checkbox
        size="sm"
        variant="outlined"
        onChange={() => handleTimeToggle(item.type_id)}
        checked={isChecked}
        sx={{
          '--Checkbox-radius': '4px',
          '--Checkbox-gap': '6px',
          '--Checkbox-size': '20px',
          '--joy-palette-primary': '#7c51a1',
          '& .MuiCheckbox-root': {
            borderColor: '#7c51a1',
          },
          '& .Mui-checked': {
            color: '#7c51a1',
          },
        }}
      />
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: 'black',
          fontFamily: 'Bahnschrift',
          whiteSpace: 'nowrap',
        }}
      >
        {item.type_desc || item.type} {/* fallback if type_desc missing */}
      </Typography>
    </Box>
  );
};

export default memo(MealTypeCheckbox);