import React, { memo } from 'react'
import { CssVarsProvider } from '@mui/joy/'
import Table from '@mui/joy/Table';
import { Box } from '@mui/material'

const DashRoomAssetList = ({ RoomAssetList }) => {

    return (
        <Box sx={{
            borderBottom: 1, borderWidth: 0.1, borderColor: 'black', minHeight: 600, maxHeight: 500,
            overflow: 'auto'
        }} >
            <CssVarsProvider>
                <Table stickyHeader>
                    <thead>
                        <tr>
                            <th style={{ width: '20%', align: "center" }}>Sl No</th>
                            <th style={{ width: '70%', align: "center" }}>Item Name</th>
                            <th style={{ width: '30%', align: "center" }}>Primary Custodian</th>
                            <th style={{ width: '30%', align: "center" }}>Secondary Custodian</th>
                            <th style={{ width: '20%', align: "center" }}>Room</th>
                            <th style={{ width: '20%', align: "center" }}>Sub Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        {RoomAssetList && RoomAssetList.map((val, index) => {
                            return <tr
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                    minHeight: 5
                                }}
                            >
                                <td> {index + 1}</td>
                                <td> {val.item_name}</td>
                                <td> {val.cus_primary}</td>
                                <td> {val.cus_second}</td>
                                <td> {val.rm_room_name}</td>
                                <td> {val.subroom_name}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </CssVarsProvider>
        </Box>
    )
}

export default memo(DashRoomAssetList)