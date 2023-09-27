import React, { useEffect, useState, memo } from 'react'
import { CssVarsProvider } from '@mui/joy/'
import Table from '@mui/joy/Table';
import { Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ItemCreateMapping = ({ itemList, rowSelect }) => {
    const [showArry, setShowArry] = useState([])
    useEffect(() => {
        if (itemList.length !== 0) {
            const mappingarry = itemList && itemList.map((val, index) => {
                const obj = {
                    id: index + 1,
                    slno: val.item_creation_slno,
                    Item_name: val.item_name
                }
                return obj
            })
            setShowArry(mappingarry);
        }
    }, [itemList])
    return (
        <Paper sx={{ height: 200, overflow: 'auto' }}>
            <CssVarsProvider>
                <Table stickyHeader>
                    <thead>
                        <tr>
                            <th style={{ width: '20%', align: "center" }}>Sl No</th>
                            <th style={{ width: '60%', align: "center" }}>Item Name</th>
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
                                <td>
                                    <AddCircleOutlineIcon size={6} onClick={() => rowSelect(val)} />
                                </td>
                            </tr>
                        })}


                    </tbody>
                </Table>
            </CssVarsProvider>
        </Paper>

    );
}

export default memo(ItemCreateMapping)

