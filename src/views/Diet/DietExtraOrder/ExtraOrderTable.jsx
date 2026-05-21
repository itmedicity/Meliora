import React, { Fragment, memo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Table,
  Sheet,
  IconButton,
  Tooltip,
} from '@mui/joy';
import { editicon } from 'src/color/Color';

const ExtraOrderTable = ({
  newfood,
  setNewdata,
  setHospital,
  setCanteen,
  sumCanteen,
  sumHosptial,
  editdatas,
}) => {
  const rowSelect = (value) => {
    const newArr = newfood.filter((val) => val.item_slno !== value.item_slno);
    setNewdata(newArr);
    setCanteen(sumCanteen - value.rate_cant * value.count);
    setHospital(sumHosptial - value.rate_hos * value.count);
  };

  return (
    <Fragment>
      <Sheet
        variant="outlined"
        sx={{
          height: 200,
          overflow: 'auto',
          borderRadius: 'sm',
        }}
      >
        <Table
          stickyHeader
          size="sm"
          borderAxis="both"
          hoverRow
          sx={{
            minWidth: 650,
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Item Slno</th>
              <th style={{ textAlign: 'center' }}>Item Name</th>
              <th style={{ textAlign: 'center' }}>Hospital Rate</th>
              <th style={{ textAlign: 'center' }}>Count</th>
              <th style={{ textAlign: 'center' }}>Total</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {newfood?.map((val) => (
              <tr key={val.item_slno}>
                <td align="center">{val.item_slno}</td>
                <td align="center">{val.item_name}</td>
                <td align="center">{val.rate_hos}</td>
                <td align="center">{val.count}</td>
                <td align="center">{val.total_hos}</td>

                <td align="center">
                  <Tooltip title="Edit" arrow>
                    <IconButton
                      variant="outlined"
                      size="sm"
                      sx={{ color: editicon, mx: 0.5 }}
                      onClick={() => editdatas(val)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" arrow>
                    <IconButton
                      variant="outlined"
                      size="sm"
                      sx={{ color: editicon, mx: 0.5 }}
                      onClick={() => rowSelect(val)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Fragment>
  );
};

export default memo(ExtraOrderTable);
