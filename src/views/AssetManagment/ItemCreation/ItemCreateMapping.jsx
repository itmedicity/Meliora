import React, { useEffect, useState, memo } from 'react'
import { CssVarsProvider } from '@mui/joy/'
import Table from '@mui/joy/Table';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, } from '@mui/material'

const ItemCreateMapping = ({ itemList, rowSelect }) => {
    const [showArry, setShowArry] = useState([])

    useEffect(() => {
        if (itemList.length !== 0) {
            const mappingarry = itemList && itemList.map((val, index) => {
                const obj = {
                    id: index + 1,
                    slno: val.item_creation_slno,
                    Item_name: val.item_name,
                    Item_types: val.asset_spare === 1 ? "Asset" : "Spare",
                    type: val.asset_spare
                }
                return obj
            })
            setShowArry(mappingarry);
        }
    }, [itemList])
    return (
        <Box sx={{
            borderBottom: 1, borderWidth: 0.1, borderColor: 'black', minHeight: 80, maxHeight: 200,
            overflow: 'auto'
        }} >
            <CssVarsProvider>
                <Table stickyHeader>
                    <thead>
                        <tr>
                            <th style={{ width: '20%', align: "center" }}>Sl No</th>
                            <th style={{ width: '60%', align: "center" }}>Item Name</th>
                            <th style={{ width: '60%', align: "center" }}>Item Type</th>
                            <th style={{ width: '10%', align: "center" }}>Add</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showArry && showArry.map((val, index) => {
                            return <tr
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                    minHeight: 5
                                }}
                            >
                                <td> {val.id}</td>
                                <td> {val.Item_name}</td>
                                <td> {val.Item_types}</td>
                                <td>
                                    <AddCircleOutlineIcon size={6} onClick={() => rowSelect(val)} />
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </CssVarsProvider>
        </Box>
    );
}

export default memo(ItemCreateMapping)

