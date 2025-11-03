import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { axioslogin } from '../Axios/Axios';
import { Autocomplete, Box, Chip } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';

const sortEmployeesBySection = (employees = []) => {
  return [...employees].sort((a, b) => {
    if (a.sec_id === b.sec_id) {
      return a.em_name.localeCompare(b.em_name);
    }
    return a.sec_id - b.sec_id;
  });
};

const TmMultAssigneesSelect = ({ value = [], setValue }) => {


  const empDept = useSelector((state) => state.LoginUserData.empdept);
  const { data: getAllEmpUnderdept = [] } = useQuery(
    ['getAllEmployeesUnderDepartment', empDept],
    async () => {
      const result = await axioslogin.get(
        `/taskManagement/getAllEmpUnderdept/${empDept}`
      );
      return result.data?.data || [];
    },
    { enabled: !!empDept }
  );

  const sortedOptions = sortEmployeesBySection(getAllEmpUnderdept);

  let safeValue = [];
  if (Array.isArray(value)) {
    safeValue = value.map(Number);
  } else if (typeof value === "string") {
    try {
      safeValue = JSON.parse(value);
    } catch {
      safeValue = value.split(",").map((id) => Number(id.trim()));
    }
  }

  const selectedObjects = sortedOptions.filter((emp) =>
    safeValue.includes(Number(emp.em_id))
  );



  return (
    <Box>
      <Autocomplete
        multiple
        options={sortedOptions}


        value={selectedObjects}
        onChange={(event, newValue) => {
          setValue(newValue.map((emp) => emp.em_id));
        }}
        getOptionLabel={(option) => option.em_name}
        isOptionEqualToValue={(option, val) => option.em_id === val.em_id}
        groupBy={(option) => option.sec_id?.toString() || '0'}
        placeholder="Select Employees"
        slotProps={{
          input: {
            placeholder: 'Search…',
          },
        }}
        sx={{
          width: '100%',
          minHeight: 50,
          bgcolor: 'transparent',
          '--Input-radius': '0px',
          borderTop: 0,
          borderLeft: 0,
          borderRight: 0,
          borderBottom: '2px solid',
          borderColor: 'neutral.outlinedBorder',
          '&:hover': {
            borderColor: 'neutral.outlinedHoverBorder',
          },
          '&::before': {
            border: '1px solid var(--Input-focusedHighlight)',
            transform: 'scaleX(0)',
            left: 0,
            right: 0,
            bottom: '-2px',
            top: 'unset',
            transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
            borderRadius: 0,
          },
          '&:focus-within::before': {
            transform: 'scaleX(1)',
          },
        }}
        renderTags={(selected, getTagProps) =>
          selected.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option.em_id}
              variant="soft"
              color="primary"
            >
              {option.em_name}
            </Chip>
          ))
        }
        renderGroup={(params) => {
          const sample = sortedOptions.find(
            (emp) => emp.sec_id?.toString() === params.group
          );
          const sectionName = sample?.sec_name || 'OTHERS';

          return (
            <Box key={params.key}>
              <Box
                sx={{
                  pl: 2.5,
                  py: 0.5,
                  color: '#3270adff',
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  fontWeight: 700,
                  fontSize: 13,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                }}
              >
                {sectionName}
              </Box>
              <Box sx={{ paddingLeft: 1 }}>{params.children}</Box>
            </Box>
          );
        }}
      />


    </Box>
  );
};

export default memo(TmMultAssigneesSelect);
