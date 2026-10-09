import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNurseStationMeli } from 'src/redux/actions/NuseStationMeli.action';
import { Box, FormControl, Select, Option } from '@mui/joy';

const NursingStationMeliSelect = ({ value, setValue }) => {
  const dispatch = useDispatch();

  const nursestationdata = useSelector((state) => {
    return state.getNusringStationMeli.nusreStationList || [];
  });

  useEffect(() => {
    dispatch(setNurseStationMeli());
  }, [dispatch]);

  return (
    <Box>
      <FormControl size="sm" sx={{ width: '100%' }}>
        <Select
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          sx={{ height: 32, p: .5, m: 0, lineHeight: 1.2 }}
          placeholder="Select Nursing Station"
        >
          <Option value={0} disabled>
            Select Nursing Station
          </Option>

          {nursestationdata?.map((val, index) => (
            <Option key={index} value={val.co_ora_nurse}>
              {val.co_nurse_desc}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default memo(NursingStationMeliSelect);

