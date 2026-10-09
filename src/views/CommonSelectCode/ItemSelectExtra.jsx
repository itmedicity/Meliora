import React, { useEffect, memo } from 'react';
import { Box, FormControl, Select, Option } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import { getItemExtra } from 'src/redux/actions/ItemMasterExtra.action ';


const ItemSelectExtra = ({ value, setValue, setName }) => {
  const dispatch = useDispatch();

  const itemdata = useSelector((state) => {
    return state.setItemExtra.itemExtraList || [];
  });

  useEffect(() => {
    dispatch(getItemExtra());
  }, [dispatch]);

  return (
    <Box>
      <FormControl size="sm" sx={{ width: '100%' }}>
        <Select
          value={value}
          placeholder="Select Item"
          onChange={(e, newValue) => {
            setValue(newValue);

            // find item name for setName
            const selected = itemdata.find((x) => x.item_slno === newValue);
            if (selected) {
              setName(selected.item_name);
            }
          }}
          sx={{
            minHeight: 32,
            p: 0,
            m: 0,
            fontSize: 14,
          }}
        >
          <Option value={0} disabled>
            Select Item
          </Option>

          {itemdata?.map((val, index) => (
            <Option key={index} value={val.item_slno}>
              {val.item_name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default memo(ItemSelectExtra);
