import React, { memo, Fragment } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TypoHeadColor } from 'src/color/Color';

const ReqItemDisplay = ({ detailData }) => {
    return (
        <Fragment>
            <TableContainer sx={{ maxHeight: 250, p: 1 }}>
                <Table size="small"
                    stickyHeader aria-label="sticky table"

                    sx={{ border: "0.1px solid", color: TypoHeadColor }}>
                    <TableHead sx={{ border: "1px " }}>
                        <TableRow  >
                            <TableCell align="center" >Slno</TableCell>
                            <TableCell align="left" > Description</TableCell>
                            <TableCell align="center">Req. Brand</TableCell>
                            <TableCell align="center">Qty</TableCell>
                            <TableCell align="center">Unit</TableCell>
                            <TableCell align="center">Specification</TableCell>
                            <TableCell align="center">Unit price</TableCell>
                            <TableCell align="center">approx.cost </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {detailData && detailData.map((val, index) => {
                            return <TableRow
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                    minHeight: 5
                                }}
                            >
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="left">{val.item_desc}</TableCell>
                                <TableCell align="center">{val.item_brand !== '' ? val.item_brand : "Not Given"}</TableCell>
                                <TableCell align="center">{val.item_qnty}</TableCell>
                                <TableCell align="center">{val.uom_name !== null ? val.uom_name : "Not Given"}</TableCell>
                                <TableCell align="center">{val.item_specification !== '' ? val.item_specification : "Not Given"}</TableCell>
                                <TableCell align="center">{val.item_unit_price !== 0 ? val.item_unit_price : "Not Given"}</TableCell>
                                <TableCell align="center">{val.aprox_cost !== 0 ? val.aprox_cost : "Not Given"}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}

export default memo(ReqItemDisplay)