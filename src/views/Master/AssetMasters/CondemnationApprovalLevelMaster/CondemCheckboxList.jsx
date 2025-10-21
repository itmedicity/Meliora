import React from 'react';
import { Checkbox, CssVarsProvider, Grid } from '@mui/joy';

const CondemCheckboxList = ({ activeLevels, selectedLevels, setSelectedLevels }) => {

  const handleToggle = (level_no) => {
    // Make sure level_no is number
    const level = Number(level_no);

    setSelectedLevels((prev) => {
      const current = Array.isArray(prev) ? prev : [];

      return current.includes(level)
        ? current.filter((val) => val !== level)
        : [...current, level];
    });
  };

  return (
    <CssVarsProvider>
      <Grid container>
        {activeLevels.map(({ level_name, level_no }) => (
          <Grid key={level_no} xs={6}>
            <Checkbox
              sx={{ fontSize: 13 }}
              size="sm"
              label={level_name}
              checked={selectedLevels.includes(level_no)}
              onChange={() => handleToggle(level_no)}
            />
          </Grid>
        ))}
      </Grid>
    </CssVarsProvider>
  );
};

export default CondemCheckboxList;

