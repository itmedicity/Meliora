import React, { memo } from 'react'
import { Sheet, Table } from '@mui/joy'

const CustomTable = ({ tableHeaderCol, children }) => {
    return (
        <Sheet
            variant="outlined"
            sx={{
                width: '100%',
                maxHeight: 450,
                overflow: 'auto',
                borderRadius: 'sm',
                mt: 2
            }}
        >
            <Table
                stickyHeader
                hoverRow
                sx={{
                    '& thead th': {
                        backgroundColor: '#f0f4f8',
                        fontWeight: 600,
                        fontSize: '0.85rem'
                    },
                    '& tbody td': {
                        fontSize: '0.85rem'
                    }
                }}
            >
                <thead>
                    <tr>
                        {tableHeaderCol?.map((col, index) => (
                            <th
                                key={index}
                                style={{
                                    textAlign: col === 'Action' || col === 'ACTION' ? 'center' : 'left'
                                }}
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </Table>
        </Sheet>
    )
}

export default memo(CustomTable)
