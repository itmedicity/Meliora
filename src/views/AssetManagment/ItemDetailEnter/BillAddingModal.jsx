import React, { memo, } from 'react'
import Table from '@mui/joy/Table';
import { Box } from '@mui/material'
import { CssVarsProvider } from '@mui/joy';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const BillAddingModal = ({ BillArray, rowSelect }) => {
    return (
        <Box sx={{
            borderBottom: 1, borderWidth: 0.1, borderColor: 'black', minHeight: 150, maxHeight: 200,
            overflow: 'auto', borderLeft: 1, borderRight: 1, borderTop: 1
        }} >
            <CssVarsProvider>
                <Table stickyHeader>
                    <thead>
                        <tr>
                            <th style={{ width: '15%', align: "center" }}>Bill No</th>
                            <th style={{ width: '50%', align: "center" }}>Supplier</th>
                            <th style={{ width: '15%', align: "center" }}>Bill Amount</th>
                            <th style={{ width: '10%', align: "center" }}>Bill Date</th>
                            <th style={{ width: '10%', align: "center" }}>Add</th>
                        </tr>
                    </thead>
                    <tbody>
                        {BillArray && BillArray.map((val, index) => {
                            return <tr
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                    minHeight: 5
                                }}
                            >
                                <td> {val.am_bill_no}</td>
                                <td> {val.it_supplier_name}</td>
                                <td> {val.am_bill_amount}</td>
                                <td> {val.am_bill_date}</td>
                                <td>
                                    <AddCircleOutlineIcon size={6} color='primary' onClick={() => rowSelect(val)} />
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </CssVarsProvider>
        </Box>
    )
}

export default memo(BillAddingModal)