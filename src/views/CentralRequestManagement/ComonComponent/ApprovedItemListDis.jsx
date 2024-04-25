import React, { memo, Fragment } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TypoHeadColor } from 'src/color/Color';

const ApprovedItemListDis = ({ ApproveData }) => {
    return (
        <Fragment>
            <TableContainer sx={{ maxHeight: 250, p: 1 }}>
                <Table size="small"
                    stickyHeader aria-label="sticky table"

                    sx={{ border: "0.1px solid", color: TypoHeadColor }}>
                    <TableHead sx={{ border: "1px " }}>
                        <TableRow  >
                            <TableCell align="center" >#</TableCell>
                            <TableCell align="center" >Item slno</TableCell>
                            <TableCell align="left" > Old Slno</TableCell>
                            <TableCell align="left" > Description</TableCell>
                            <TableCell align="center">Req. Brand</TableCell>
                            <TableCell align="center">Qty</TableCell>
                            <TableCell align="center">Unit</TableCell>
                            <TableCell align="center">Specification</TableCell>
                            <TableCell align="center">approx.cost </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ApproveData && ApproveData.map((val, index) => {
                            return <TableRow
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                    minHeight: 5
                                }}
                            >
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{val.item_slno}</TableCell>
                                <TableCell align="left">{val.old_item_slno}</TableCell>
                                <TableCell align="left">{val.approve_item_desc}</TableCell>
                                <TableCell align="center">{val.approve_item_brand}</TableCell>
                                <TableCell align="center">{val.item_qnty_approved}</TableCell>
                                <TableCell align="center">{val.approved_itemunit}</TableCell>
                                <TableCell align="center">{val.approve_item_specification}</TableCell>
                                <TableCell align="center">{val.approve_aprox_cost}</TableCell>

                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}

export default memo(ApprovedItemListDis)