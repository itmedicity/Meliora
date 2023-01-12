import React, { Fragment, memo } from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'


const ToplevelTable = ({ complaints }) => {
    return (
        <Fragment>
            <Box sx={{ display: 'flex' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 650, border: '1px solid', borderColor: '#F0F3F5' }} aria-label="simple table">
                        <TableHead sx={{
                            bgcolor: '#F0F3F5',
                            mt: 1,
                            height: 25
                        }}>
                            <TableRow
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'gray'
                                }}>
                                <TableCell
                                    size='small'
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'gray'
                                    }}
                                >Slno</TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'gray'
                                    }}
                                >Complaint</TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'gray'
                                    }}
                                >Date</TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'gray'
                                    }}
                                >Department</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                complaints && complaints.map((val) => (
                                    <TableRow key={val.complaint_slno}>
                                        <TableCell>{val.complaint_slno}</TableCell>
                                        <TableCell>{val.complaint_desc}</TableCell>
                                        <TableCell>{val.compalint_date}</TableCell>
                                        <TableCell>{val.sec_name}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Fragment>
    )
}
export default memo(ToplevelTable)