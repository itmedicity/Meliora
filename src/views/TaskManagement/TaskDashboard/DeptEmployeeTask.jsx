import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { Box, Table } from '@mui/joy'
import { Paper } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
const DeptEmployeeTask = () => {
    const [allEmpTask, setallEmpTask] = useState([])


    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })



    useEffect(() => {
        const getAllEmployeeTask = async () => {
            const result = await axioslogin.get(`/TmTableView/viewAllEmployeeTask/${empsecid}`);
            const { success, data } = result.data;

            if (success === 2) {
                setallEmpTask(data)
            }
        }
        getAllEmployeeTask(empsecid)
    }, [empsecid])


    return (
        <Box variant="outlined" sx={{ height: 490, maxWidth: '100%', overflow: 'auto', mt: .5, }}>
            <Paper variant="outlined" sx={{ maxHeight: 480, maxWidth: '100%', overflow: 'auto', mt: .5, }}>
                <Table borderAxis='x'
                >
                    <thead>
                        <tr>
                            <th style={{ width: '4%', }}>#</th>
                            <th style={{ width: '5%', }}>Id</th>
                            <th style={{ width: '80%', textAlign: 'left', }}>Employee</th>
                            <th style={{ width: '10%', textAlign: 'center', }}>Completed</th>
                            <th style={{ width: '10%', textAlign: 'center', }}>Total</th>

                        </tr>
                    </thead>
                    <tbody>
                        {allEmpTask?.map((val, index) => {
                            return (
                                <tr key={index}
                                >
                                    <td style={{ fontWeight: 600, }}> {index + 1}</td>
                                    <td style={{ fontWeight: 600, }}> {val.emslno || 'not given'}</td>
                                    <td style={{ fontWeight: 600, color: '#887BB0' }} ><PersonIcon sx={{ color: '#6A4973' }} /> {val.empname || 'not given'}</td>
                                    <td style={{ textAlign: 'center', fontWeight: 600, color: 'green' }}>[

                                        {val.TC || '0'}]</td>
                                    <td style={{ textAlign: 'center', fontWeight: 600, color: '#3B0404' }}> [{val.TT || '0'}]</td>

                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Paper>
        </Box>
    )
}

export default memo(DeptEmployeeTask)