import React, { useEffect, memo, useState } from 'react';
import { Box, FormControl, Select, Option } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';

const ExtraRoomMeliSelect = ({ nurse, setValue, value }) => {
  const [room, setRoom] = useState([]);

  useEffect(() => {
    const postdata = { ns_code: nurse };

    const getRoom = async () => {
      if (nurse !== 0) {
        const result1 = await axioslogin.post('/delivery/getRoom/nurse', postdata);
        const { succes, dataa } = result1.data;

        if (succes === 1) {
          setRoom(dataa);
        } else {
          warningNotify('Error occurred, contact EDP');
        }
      }
    };
    getRoom();
  }, [nurse]);

  return (
    <Box>
      <FormControl size="sm" sx={{ width: '100%' }}>
        <Select
          value={value}
          placeholder="Select Room"
          onChange={(event, newValue) => setValue(newValue)}
          sx={{ minHeight: 32, p: 0, m: 0, fontSize: 14 }}
        >
          <Option value={0} disabled>
            Select Room
          </Option>

          {room?.map((val, index) => (
            <Option key={index} value={val.rm_code}>
              {val.rmc_name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default memo(ExtraRoomMeliSelect);
