import React, { Fragment, Suspense, memo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { LinearProgress } from '@mui/material'
import ComDashCountAll from './ComDashCountAll';

const ComDashTableAll = ({ compdept }) => {


    return (
        <Fragment>
            <TableContainer sx={{ maxHeight: 200 }}>
                <Table size="small"
                    stickyHeader aria-label="sticky table"
                    sx={{ border: "0.5px solid" }}>
                    <TableHead sx={{ border: "1px " }}>
                        <TableRow >
                            <TableCell align="center">Sl No</TableCell>
                            <TableCell align="center">Compaint Department</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center"> For Assign</TableCell>
                            <TableCell align="center">Assigned</TableCell>
                            <TableCell align="center">Pending</TableCell>
                            <TableCell align="center">OnHold</TableCell>
                            <TableCell align="center">For Verify</TableCell>
                            <TableCell align="center">Completed </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {compdept && compdept.map((val, index) => {
                            return < TableRow key={val.complaint_dept_slno} >
                                <TableCell align="center">{val.complaint_dept_slno}</TableCell>
                                <TableCell align="center">{val.complaint_dept_name}</TableCell>
                                <Suspense fallback={<LinearProgress />} >

                                    <ComDashCountAll

                                        deptid={val.complaint_dept_slno}
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

export default memo(ComDashTableAll)