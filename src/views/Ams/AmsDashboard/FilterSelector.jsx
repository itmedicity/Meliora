import React, { memo, useState, useEffect, useMemo } from 'react';
import { Box, Select, Option } from '@mui/joy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import TextComponent from 'src/views/Components/TextComponent';
import { startOfMonth, endOfMonth, startOfYear, endOfYear, format } from 'date-fns';

const FilterSelector = ({ onDateRangeChange }) => {
  const options = ['Today', 'Month', 'Year', 'All'];
  const monthList = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getLastTenYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());
  };

  // ? Default states so month/year always have valid values
  const [selected, setSelected] = useState('Month');
  const [month, setMonth] = useState(monthList[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear().toString());


  const yearList = useMemo(() => getLastTenYears(), []);

  useEffect(() => {
    const today = new Date();
    let startDate = '', endDate = '';

    if (selected === 'Today') {
      startDate = format(today, 'yyyy-MM-dd 00:00:00');
      endDate = format(today, 'yyyy-MM-dd 23:59:59');
    }

    if (selected === 'Month' && month && year) {
      const monthIndex = monthList.indexOf(month);
      const start = startOfMonth(new Date(year, monthIndex));
      const end = endOfMonth(new Date(year, monthIndex));
      startDate = format(start, 'yyyy-MM-dd 00:00:00');
      endDate = format(end, 'yyyy-MM-dd 23:59:59');
    }

    if (selected === 'Year' && year) {
      const start = startOfYear(new Date(year));
      const end = endOfYear(new Date(year));
      startDate = format(start, 'yyyy-MM-dd 00:00:00');
      endDate = format(end, 'yyyy-MM-dd 23:59:59');
    }

    if (selected === 'All') {
      startDate = '1970-01-01 00:00:00';
      endDate = format(today, 'yyyy-MM-dd 23:59:59');
    }

    if (startDate && endDate && typeof onDateRangeChange === 'function') {
      onDateRangeChange(startDate, endDate);
    }
  }, [selected, month, year, onDateRangeChange, monthList]);

  return (
    <Box display="flex" gap={0.5}>
      {/* Main Filter */}
      <Box width={110}>
        <Select
          value={selected}
          onChange={(e, newValue) => setSelected(newValue)}
          variant="plain"
          indicator={<KeyboardArrowDownIcon sx={{ color: '#196eb6' }} />}
          renderValue={() => (
            <Box display="flex" alignItems="center">
              <FilterAltOutlinedIcon fontSize="small" sx={{ color: '#196eb6', width: 15, height: 15 }} />
              <TextComponent
                text={selected}
                sx={{ fontWeight: 500, fontFamily: 'Arial', fontSize: 14, color: '#196eb6' }}
              />
            </Box>
          )}
        >
          {options.map((option) => (
            <Option key={option} value={option}>
              <TextComponent text={option} sx={{ fontWeight: 500, fontSize: 14 }} />
            </Option>
          ))}
        </Select>
      </Box>

      {/* Month + Year selection */}
      {selected === 'Month' && (
        <>
          <Box width={120}>
            <Select
              value={month}
              onChange={(e, newValue) => setMonth(newValue)}
              placeholder="Select Month"
              indicator={<KeyboardArrowDownIcon sx={{ color: '#196eb6' }} />}
              variant="plain"
              sx={{ color: '#196eb6', fontWeight: 500 }}
            >
              {monthList.map((m) => (
                <Option key={m} value={m}>{m}</Option>
              ))}
            </Select>
          </Box>
          <Box width={100}>
            <Select
              value={year}
              onChange={(e, newValue) => setYear(newValue)}
              variant="plain"
              indicator={<KeyboardArrowDownIcon sx={{ color: '#196eb6' }} />}
              sx={{ color: '#196eb6', fontWeight: 500 }}
            >
              {yearList.map((yr) => (
                <Option key={yr} value={yr}>{yr}</Option>
              ))}
            </Select>
          </Box>
        </>
      )}

      {/* Year-only selection */}
      {selected === 'Year' && (
        <Box width={100}>
          <Select
            value={year}
            onChange={(e, newValue) => setYear(newValue)}
            variant="plain"
            indicator={<KeyboardArrowDownIcon sx={{ color: '#196eb6' }} />}
            sx={{ color: '#196eb6', fontWeight: 500 }}
          >
            {yearList.map((yr) => (
              <Option key={yr} value={yr}>{yr}</Option>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default memo(FilterSelector);


