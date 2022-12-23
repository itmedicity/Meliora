import React, { Fragment, Suspense, memo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { LinearProgress } from '@mui/material'
import ComDashCount from './ComDashCount';

const CompDashTable = ({ deptwiseemp }) => {




    return (
        <Fragment>
            <TableContainer sx={{ maxHeight: 200 }}>
                <Table size="small"
                    stickyHeader aria-label="sticky table"
                    sx={{ border: "0.5px solid", borderColor: '#F0F3F5' }}>
                    <TableHead sx={{ border: "1px " }}>
                        <TableRow >
                            <TableCell align="center">Emp No</TableCell>
                            <TableCell align="center">Employee Name</TableCell>
                            <TableCell align="center">Assigned </TableCell>
                            <TableCell align="center">Pending </TableCell>
                            <TableCell align="center">Pending For Verify</TableCell>
                            <TableCell align="center">Completed </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {deptwiseemp && deptwiseemp.map((val, index) => {
                            return < TableRow key={val.em_id} >
                                <TableCell align="center">{val.em_no}</TableCell>
                                <TableCell align="center">{val.em_name}</TableCell>
                                <Suspense fallback={<LinearProgress />} >

                                    <ComDashCount

                                        empid={val.em_id}
                                    />
                                </Suspense>
                            </TableRow>
                        })

                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment >
    )
}

export default memo(CompDashTable)