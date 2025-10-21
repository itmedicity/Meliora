import { Box, CssVarsProvider, Table } from '@mui/joy'
import React from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import EditIcon from '@mui/icons-material/Edit';
import { useQuery } from '@tanstack/react-query';

const CondemUnitMastTable = ({ RowSelect }) => {

    const getCondemUnitQuantity = async () => {
        const { data } = await axioslogin.get('condemMasters/QuantityUnitView')
        if (data.success === 2) {
            return data.data
        } else {
            return
        }
    }

    const { data: tableData } = useQuery({
        queryKey: ['CondemquantityUnit'],
        queryFn: () => getCondemUnitQuantity(),
    });

    return (
        <Box sx={{ flex: 1 }}>
            <CssVarsProvider>
                <Table size='sm' borderAxis='both' style={{ p: 1 }}>
                    <thead style={{ backgroundColor: '#f0f0f0' }}>
                        <tr>
                            <th style={{ width: 60, textAlign: 'center' }}>Sl. No</th>
                            <th style={{ width: 60, textAlign: 'center' }}>Edit</th>
                            <th style={{ width: 'auto' }}>Quantity Unit</th>
                            <th style={{ width: 100, textAlign: 'center' }}>Status</th>
                        </tr>
                    </thead>

                    {tableData?.length > 0 ?
                        <tbody>
                            {tableData?.map((val, index) => (
                                <tr key={val.condem_quantity_slno || index}>
                                    <td style={{ width: 60, textAlign: 'center' }} >{index + 1}</td>
                                    <td style={{ width: 60, textAlign: 'center' }} ><EditIcon sx={{ color: '#196eb6', cursor: 'pointer' }} onClick={() => RowSelect(val)} /> </td>
                                    <td style={{ width: 'auto' }}>{val.condem_quantity_name}</td>
                                    <td style={{ width: 100, textAlign: 'center' }}>{val.condem_quantity_status === 1 ? 'Active' : 'Inactive'}</td>
                                </tr>
                            ))}
                        </tbody> :
                        <tbody>
                            <tr style={{ textAlign: 'center', height: 40 }} >
                            </tr>
                        </tbody>}


                </Table>
            </CssVarsProvider>

        </Box >


    )
}

export default CondemUnitMastTable
