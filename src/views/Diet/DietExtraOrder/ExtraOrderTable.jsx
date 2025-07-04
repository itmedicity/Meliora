import React, { Fragment, memo } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from '@mui/material'
import { editicon } from 'src/color/Color'
import EditIcon from '@mui/icons-material/Edit'
const ExtraOrderTable = ({
  newfood,
  setNewdata,
  setHospital,
  setCanteen,
  sumCanteen,
  sumHosptial,
  editdatas,
}) => {
  const rowSelect = value => {
    const newarry = newfood.filter(val => {
      return val.item_slno !== value.item_slno
    })
    setNewdata(newarry)
    setCanteen(sumCanteen - value.rate_cant * value.count)
    setHospital(sumHosptial - value.rate_hos * value.count)
  }

  return (
    <Fragment>
      <TableContainer sx={{ maxHeight: 200 }}>
        <Table size="small" stickyHeader aria-label="sticky table" sx={{ border: '0.5px solid' }}>
          <TableHead sx={{ border: '1px ' }}>
            <TableRow>
              <TableCell align="center">Item Slno</TableCell>
              <TableCell align="center">Item Name</TableCell>
              <TableCell align="center">Hospital Rate</TableCell>
              <TableCell align="center">Count</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newfood &&
              newfood.map((val,) => {
                return (
                  <TableRow
                    key={val.item_slno}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{val.item_slno}</TableCell>
                    <TableCell align="center">{val.item_name}</TableCell>
                    <TableCell align="center">{val.rate_hos}</TableCell>
                    <TableCell align="center">{val.count}</TableCell>
                    <TableCell align="center">{val.total_hos}</TableCell>

                    <TableCell align="center">
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          sx={{ color: editicon, paddingY: 0.5 }}
                          onClick={() => editdatas(val)}
                        >
                          <EditIcon size={25} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          sx={{ color: editicon, paddingY: 0.5 }}
                          onClick={() => rowSelect(val)}
                        >
                          <DeleteIcon size={25} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  )
}

export default memo(ExtraOrderTable)
