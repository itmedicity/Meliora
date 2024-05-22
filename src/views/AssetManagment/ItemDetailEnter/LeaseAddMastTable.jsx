import React, { useEffect, memo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import { CssVarsProvider } from '@mui/joy/'
import Table from '@mui/joy/Table';
import { Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

const LeaseAddMastTable = ({ count, rowSelect }) => {
    const [tabledata, setTabledata] = useState([])
    useEffect(() => {
        const getAMCCMC = async () => {
            const result = await axioslogin.get('ItemMapDetails/LeaseMasterview')
            const { success, data } = result.data
            if (success === 2) {
                setTabledata(data)
            } else {
                warningNotify('error occured')
            }
        }
        getAMCCMC()
    }, [count])


    return (
        <Box sx={{
            borderBottom: 1, borderWidth: 0.1, borderColor: 'black', minHeight: 80, maxHeight: 200,
            overflow: 'auto', borderLeft: 1, borderRight: 1, borderTop: 1
        }} >
            <CssVarsProvider>
                <Table stickyHeader>
                    <thead>
                        <tr>
                            <th style={{ width: '7%', align: "center" }}>Action</th>
                            <th style={{ width: '7%', align: "center" }}>Sl No</th>
                            <th style={{ width: '50%', align: "center" }}>Supplier</th>
                            <th style={{ width: '10%', align: "center" }}>From Date</th>
                            <th style={{ width: '10%', align: "center" }}>To Date</th>
                            <th style={{ width: '10%', align: "center" }}>Amount</th>
                            <th style={{ width: '10%', align: "center" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tabledata && tabledata.map((val, index) => {
                            return <tr
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                    minHeight: 5
                                }}
                            > <td>
                                    <EditIcon size={6} onClick={() => rowSelect(val)} />
                                </td>
                                <td> {val.am_lease_mastslno}</td>
                                <td> {val.it_supplier_name}</td>
                                <td> {val.lease_fromdate}</td>
                                <td> {val.lease_todate}</td>
                                <td> {val.lease_amount}</td>
                                <td> {val.status}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </CssVarsProvider>
        </Box>
    )
}

export default memo(LeaseAddMastTable)