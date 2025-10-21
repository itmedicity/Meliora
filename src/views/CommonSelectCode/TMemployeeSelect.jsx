// 
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { axioslogin } from '../Axios/Axios';
import { Autocomplete, Box, CssVarsProvider } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';

const sortEmployeesBySection = (employees = []) => {
  return [...employees].sort((a, b) => {
    if (a.sec_id === b.sec_id) {
      return a.em_name.localeCompare(b.em_name);
    }
    return a.sec_id - b.sec_id;
  });
};

const TMemployeeSelect = ({ employee = 0, setEmployee }) => {
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

  const selectedObject =
    employee === 0
      ? null
      : sortedOptions.find((emp) => emp.em_id === employee) || null;

  return (
    <CssVarsProvider>
      <Box>
        <Autocomplete
          options={sortedOptions}
          value={selectedObject}
          onChange={(event, newValue) => {
            setEmployee(newValue ? newValue.em_id : 0);
          }}
          getOptionLabel={(option) => option.em_name}
          groupBy={(option) => option.sec_id?.toString() || '0'}
          placeholder="Select Employee"
          slotProps={{
            input: {
              placeholder: 'Search…',
            },
          }}
          sx={{

            bgcolor: 'transparent',
            '--Input-radius': '0px',
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
            borderBottom: 0,
            pl: 0,
            borderColor: 'neutral.outlinedBorder',
            '&:hover': {
              borderColor: 'neutral.outlinedHoverBorder',
            },
            '&::before': {
              transform: 'scaleX(0)',
              left: 0,
              right: 0,
              top: 'unset',
              transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
              borderRadius: 0,
            },
            '&:focus-within::before': {
              transform: 'scaleX(1)',
            },
          }}
          renderGroup={(params) => {
            const sample = sortedOptions.find(
              (emp) => emp.sec_id?.toString() === params.group
            );
            const sectionName = sample?.sec_name || 'OTHERS';

            return (
              <li key={params.key}>
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
                <ul style={{ paddingLeft: 10 }}>{params.children}</ul>
              </li>
            );
          }}
        />
      </Box>
    </CssVarsProvider>

  );
};

export default memo(TMemployeeSelect);
