import React, { memo, Fragment } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Box } from '@mui/material'
const CRFDataItemOrginal = ({ dataPost }) => {
  return (
    <Fragment>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box>
          <TableContainer sx={{ maxHeight: 250 }}>
            <Table size="small" stickyHeader aria-label="sticky table" sx={{ border: '0.2px solid' }}>
              <TableHead sx={{ border: '1px ' }}>
                <TableRow>
                  <TableCell align="center">Slno</TableCell>
                  <TableCell align="center"> Description</TableCell>
                  <TableCell align="center">Req. Brand</TableCell>
                  <TableCell align="center">Qty</TableCell>
                  <TableCell align="center">Unit</TableCell>
                  <TableCell align="center">Specification</TableCell>
                  <TableCell align="center">approx.cost </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataPost &&
                  dataPost.map((val, index) => {
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          maxHeight: 60,
                          minHeight: 5
                        }}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{val.item_desc}</TableCell>
                        <TableCell align="center">{val.item_brand}</TableCell>
                        <TableCell align="center">{val.item_qnty}</TableCell>
                        <TableCell align="center">{val.item_unit}</TableCell>
                        <TableCell align="center">{val.item_specification}</TableCell>
                        <TableCell align="center">{val.aprox_cost}</TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Fragment>
  )
}

export default memo(CRFDataItemOrginal)
