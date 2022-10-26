import React, { Fragment, memo } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { editicon } from 'src/color/Color'
const ExtraOrderTable = ({ newfood, setNewdata }) => {

    const rowSelect = (id) => {
        const newarry = newfood.filter((val) => {
            return val.id !== id
        })
        setNewdata(newarry)
    }
    return (
        <Fragment>
            <TableContainer sx={{ maxHeight: 250 }}>
                <Table size="small"
                    stickyHeader aria-label="sticky table"
                    sx={{ border: "0.5px solid" }}>
                    <TableHead sx={{ border: "1px " }}>
                        <TableRow >
                            <TableCell align="center">Item Slno</TableCell>
                            <TableCell align="center">Item Name</TableCell>
                            <TableCell align="center">Hospital Rate</TableCell>
                            <TableCell align="center">Canteen Rate</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newfood && newfood.map((val, index) => {
                            return <TableRow
                                key={val.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{val.item_slno}</TableCell>
                                <TableCell align="center">{val.item_name}</TableCell>
                                <TableCell align="center">{val.rate_hos}</TableCell>
                                <TableCell align="center">{val.rate_cant}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        sx={{ color: editicon, paddingY: 0.5 }}
                                        onClick={() => rowSelect(val.id)} >
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

export default memo(ExtraOrderTable)