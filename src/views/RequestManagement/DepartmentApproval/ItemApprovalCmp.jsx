import React, { memo, Fragment } from 'react'
import { editicon } from 'src/color/Color'
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';


const ItemApprovalCmp = ({ dataPost, setdataPost, dataPostdelete, setdataPostdelete }) => {

    //array data delete
    const rowSelect = (id) => {
        const newdata = dataPost.filter((val) => {
            return val.item_slno !== id
        })
        setdataPost(newdata)

    }


    return (
        <Fragment>
            <TableContainer sx={{ maxHeight: 250 }}>
                <Table size="small"
                    stickyHeader aria-label="sticky table"

                    sx={{ border: "0.2px solid" }}>
                    <TableHead sx={{ border: "1px " }}>
                        <TableRow  >
                            <TableCell align="center" style={{ width: '60%' }}>Slno</TableCell>
                            <TableCell align="center" > Description</TableCell>
                            <TableCell align="center">Req. Brand</TableCell>
                            <TableCell align="center">Unit</TableCell>
                            <TableCell align="center">Qty</TableCell>
                            <TableCell align="center">Specification</TableCell>
                            <TableCell align="center">approx.cost </TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataPost && dataPost.map((val, index) => {
                            return <TableRow
                                key={val.item_slno}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{val.item_slno}</TableCell>
                                <TableCell align="center">{val.item_desc}</TableCell>
                                <TableCell align="center">{val.item_brand}</TableCell>
                                <TableCell align="center">{val.item_unit}</TableCell>
                                <TableCell align="center">{val.item_qnty}</TableCell>
                                <TableCell align="center">{val.item_specification}</TableCell>
                                <TableCell align="center">{val.aprox_cost}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        sx={{ color: editicon, paddingY: 0.5 }}
                                        onClick={() => rowSelect(val.item_slno)} >
                                        <DeleteIcon size={25} />
                                    </IconButton >
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}

export default memo(ItemApprovalCmp)