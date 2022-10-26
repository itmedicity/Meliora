import React, { memo, Fragment } from 'react'
import { editicon } from 'src/color/Color'
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';

const DietMenuSettCmp = ({ dataPost, setdataPost }) => {
    //array data delete
    const rowSelect = (id) => {
        const newdata = dataPost.filter((val) => {
            return val.id !== id
        })
        setdataPost(newdata)
    }

    return (
        <Fragment>
            <TableContainer sx={{ maxHeight: 250 }}>
                <Table size="small"
                    stickyHeader aria-label="sticky table"

                    sx={{ border: "0.5px solid" }}>
                    <TableHead sx={{ border: "1px " }}>
                        <TableRow >
                            <TableCell align="center">Diet</TableCell>
                            <TableCell align="center">Diet Type</TableCell>
                            <TableCell align="center">Day</TableCell>
                            <TableCell align="center">Item Group</TableCell>
                            <TableCell align="center">Item </TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataPost && dataPost.map((val, index) => {
                            return <TableRow
                                key={val.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{val.dietname}</TableCell>
                                <TableCell align="center">{val.typename}</TableCell>
                                <TableCell align="center">{val.dayname}</TableCell>
                                <TableCell align="center">{val.groupname}</TableCell>
                                <TableCell align="center">{val.itemname}</TableCell>
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

export default memo(DietMenuSettCmp)