import React, { useEffect, useState, memo } from 'react';
import { Box, FormControl, Select, Option } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';

const ExtraDietTypeSelect = ({ value, setValue, proc_slno, process_date }) => {
  const [diettypedata, setdiettypedata] = useState([]);

  useEffect(() => {
    if (proc_slno !== '') {
      const getDietType = async () => {
        const postdata = {
          proc_slno: proc_slno,
          process_date: process_date,
        };

        const result = await axioslogin.post('/extraorder/dietType/get', postdata);
        const { success, data } = result.data;

        if (success === 1) {
          setdiettypedata(data);
        } else {
          warningNotify('Error occurred, contact EDP');
        }
      };

      getDietType();
    }
  }, [proc_slno, process_date]);

  return (
    <Box>
      <FormControl size="sm" sx={{ width: '100%' }}>
        <Select
          value={value}
          placeholder="Select Diet Type"
          onChange={(event, newValue) => setValue(newValue)}
          sx={{
            minHeight: 32,
            p: 0,
            m: 0,
            fontSize: 14,
          }}
        >
          <Option value={0} disabled>
            Select Diet Type
          </Option>

          {diettypedata?.map((val, index) => (
            <Option key={index} value={val.type_slno}>
              {val.type_desc}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default memo(ExtraDietTypeSelect);
