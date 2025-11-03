import { Box, CssVarsProvider, Table } from '@mui/joy'
import React from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import EditIcon from '@mui/icons-material/Edit';
import { useQuery } from '@tanstack/react-query';

const ScrapLevelApproveMastTable = ({ RowSelect }) => {

    const getscrapFormLevels = async () => {
        const { data } = await axioslogin.get('condemMasters/getScraplevels')
        if (data.success === 2) {
            return data.data
        } else {
            return
        }
    }

    const { data: tableData } = useQuery({
        queryKey: ['getScrapFormApprovalLevels'],
        queryFn: () => getscrapFormLevels(),
    });


    return (
        <Box sx={{ overflow: 'auto' }}>
            <CssVarsProvider>
                <Table size='sm' borderAxis='both' style={{ p: 1, }}>
                    <thead style={{ backgroundColor: '#f0f0f0' }}>
                        <tr>
                            <th style={{ width: 60, textAlign: 'center' }}>Edit</th>
                            <th style={{ width: 80, textAlign: 'center' }}>Level No.</th>
                            <th style={{ width: 'auto' }}>Level Name</th>
                            <th style={{ width: 'auto' }}>Employee</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Bill Generation & Payment</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Gate Pass Generation</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Gate Pass Approval</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Clearance Level</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Status</th>
                        </tr>
                    </thead>

                    {tableData?.length > 0 ?
                        <tbody>
                            {tableData?.map((val, index) => (
                                <tr key={val.yard_slno || index}>
                                    <td style={{ width: 60, textAlign: 'center' }} ><EditIcon sx={{ color: '#196eb6', cursor: 'pointer' }} onClick={() => RowSelect(val)} /> </td>
                                    <td style={{ width: 80, textAlign: 'center' }} >{val.level_no}</td>
                                    <td style={{ width: 'auto', }} >{val.level_name}</td>
                                    <td style={{ width: 'auto', }} >{val.em_name}</td>
                                    <td style={{ width: 'auto', textAlign: 'center' }} >{val.bill_generation_payment_status}</td>
                                    <td style={{ width: 'auto', textAlign: 'center' }} >{val.gate_pass_generation_status}</td>
                                    <td style={{ width: 'auto', textAlign: 'center' }} >{val.gate_pass_approval_status}</td>
                                    <td style={{ width: 'auto', textAlign: 'center' }} >{val.clearance_level_status}</td>
                                    <td style={{ width: 'auto', textAlign: 'center' }} >{val.scrap_level_status}</td>
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

export default ScrapLevelApproveMastTable
