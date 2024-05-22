import React, { memo } from 'react'
import { CssVarsProvider } from '@mui/joy/'
import Table from '@mui/joy/Table';
import { Box } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const BillSupplerListOracle = ({ OracleList, SuppAddMeliora }) => {
    return (
        <Box sx={{
            borderBottom: 1, borderWidth: 0.1, borderColor: 'black', minHeight: 80, maxHeight: 200,
            overflow: 'auto', borderLeft: 1, borderRight: 1, borderTop: 1, width: '100%'
        }} >
            <CssVarsProvider>
                <Table stickyHeader>
                    <thead>
                        <tr>
                            <th style={{ width: '5%', align: "center" }}>#</th>
                            <th style={{ width: '25%', align: "center" }}>Supplier Name</th>
                            <th style={{ width: '25%', align: "center" }}>Address</th>
                            <th style={{ width: '15%', align: "center" }}>Number</th>
                            <th style={{ width: '10%', align: "center" }}>Contact Person</th>

                            <th style={{ width: '7%', align: "center" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {OracleList && OracleList.map((val, index) => {
                            return <tr
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                    minHeight: 5
                                }}
                            >
                                <td> {index + 1}</td>
                                <td> {val.SUC_NAME}</td>
                                <td> {val.SUC_ADD1}</td>
                                <td> {val.SUC_MOBILE}</td>
                                <td> {val.SUC_PERSON}</td>

                                <td>
                                    <AddCircleOutlineIcon size={6} color='primary' onClick={() => SuppAddMeliora(val)} />
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </CssVarsProvider>
        </Box>
    )
}

export default memo(BillSupplerListOracle)